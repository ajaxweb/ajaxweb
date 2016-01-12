/*
    This file is part of Ajax Web Developer.

    Ajax Web Developer is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Ajax Web Developer is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Ajax Web Developer.  If not, see <http://www.gnu.org/licenses/>.
*/
Class('linb.ComFactory',null,{
    Static:{
        _pro:{},
        _cache:{},
        _domId:'linb:ComFactory:',
        getProfile:function(key){
            return key?this._pro[key]:this._pro;
        },
        setProfile:function(key, value){
            if(typeof key=='string')
                this._pro[key]=value;
            else
                this._pro=key;
            return this;
        },
        destroyAll:function(){
            _.each(this._cache,function(o){
                _.tryF(o.destroy,[],o);
            });
            this._cache={};
        },
        broadcast:function(fun){
            if(typeof fun=='function'){
                var i,c=this._cache;
                for(i in c)
                    fun.call(c[i],i);
            }
        },

        setCom:function(id, obj){
            this._cache[id]=obj;
            if(obj)obj.comRefId=id;
            return this;
        },
        getComFromCache:function(id){
            return this._cache[id]||null;
        },
        //singleton:false->don't get it from cache, and don't cache the result.
        getCom:function(id, onEnd, threadid, singleton){
            singleton=singleton!==false;
            var c=this._cache,p=this._pro,ini=p._iniMethod;
            if(singleton && c[id]){
                _.tryF(onEnd, [threadid,c[id]], c[id]);
                return c[id];
            }else{
                if(!(p=p[id]))return null;
                var self=arguments.callee, me=this, children=p.children;
                //ensure array
                var iniMethod = p.iniMethod || ini || 'create',
                    clsPath = p.cls || p,
                    properties = p.properties,
                    events = p.events,
                    singleton=p.singleton!==false,
                    cls,
                    task=function(cls,properties,threadid){
                        var o = new cls();
                        if(properties)
                            _.merge(o.properties,properties,'all');
                        if(events)
                            _.merge(o.events,event,'all');

                        if(singleton)
                            linb.ComFactory.setCom(id, o);

                        var args = [function(com){
                            var arr = com.getUIComponents().get(),
                                fun=function(arr,firstlayer){
                                    var self1 = arguments.callee;
                                    _.arr.each(arr,function(v,i){
                                        //if tag exists, replace tag with com from linb.ComFactory
                                        if(v.key=='linb.UI.Tag'){
                                            var tag=v, cid=tag.properties.tagKey;

                                            if(cid && children && children[cid])
                                                self.apply(me, [children[cid], function(){
                                                    //set link to parent com(linb.Com)
                                                    com[cid]=this;
                                                    //set com parent
                                                    this.parent=com;

                                                    //replace tag with this
                                                    var ui = this.getUIComponents(), root;
                                                    // no UI in this com
                                                    if(!(root=ui.get(0)))return;

                                                    linb.UI.Tag.replace(tag,root,firstlayer?com:null);
                                                },threadid]);
                                        }
                                        if(v.children){
                                            var a=[];
                                            _.arr.each(v.children,function(o){
                                                a[a.length]=o[0];
                                            });
                                            self1(a);
                                        }
                                    });
                                };
                            //handle tag sub from com
                            fun(arr,1);
                        }];
                        args.push(threadid||null);

                        //insert first
                        if(onEnd)
                            linb.Thread(threadid).insert({
                                task:onEnd,
                                args:[threadid,o],
                                scope:o
                            });
                        //latter
                        _.tryF(o[iniMethod], args, o);
                    };
                linb.Thread.observableRun(function(threadid){
                        var f=function(a,b,threadid){
                            var cls;
                            if(cls=linb.SC.get(clsPath)){
                                linb.Thread(threadid).insert({
                                    task:task,
                                    args:[cls, properties, threadid]
                                });
                            }
                        };
                        linb.SC(clsPath, function(path){
                            if(path)
                                f(0,0,threadid);
                            else
                                throw new Error(cls+' doesnt exists!');
                        }, true,threadid);

                    },null,threadid
                );
            }
        },
        newCom:function(cls, onEnd,threadid){
            var o=linb.SC.get(cls);
            o=typeof o == 'function' ?new o():null;
            if(o)
                _.tryF(onEnd,[threadid,o],o);
            else
                linb.Thread.observableRun(function(threadid){
                    linb.SC(cls, function(path,txt){
                        if(path){
                            var o=linb.SC.get(cls);
                            o=typeof o == 'function' ?new o():null;
                            _.tryF(onEnd,[threadid,o],o);
                        }else
                             throw new Error(cls+' doesnt exists!');
                    }, true,threadid);
                },null,threadid);
        },
        storeCom:function(id){
            var m,t,c=this._cache,domId=this._domId;
            if(t=c[id]){
                if(!(m=linb.Dom.byId(domId)))
                    //using display:none here for performance, when appendchild, it'll not trigger layout etc.
                    linb('body').prepend(linb.create('<div id="'+domId+'" style="display:none;"></div>'));
                m=linb(domId);
                t=t.getUIComponents();
                if(!t.isEmpty()){
                    //detach
                    t.get(0).unlinkParent();
                    //move to hide
                    m.append(t);
                }
            }
        },

        //prepare widget (build css string and add css to head, build template)
        prepareWidgets:function(){
            //prepare UI Ctrl
            var self=this,
                fun=function(threadid){
                    var r=false;
                    _.each(linb.UI, function(o){
                        if(o.$linb$ && o['linb.UI'] && o.$Appearances['default']){
                            var path = linb.getPath(o.KEY, '/default/css.css','appearance');
                            if(!linb.UI.$cache_csspath[path]){
                                o=(new o).get(0);
                                o.toString();
                                o.destroy();
                                r=true;
                                return false;
                            }
                        }
                    });
                    if(!r)linb.Thread(threadid).abort()
                };
            linb.Thread(null,[fun],100,null,null,null,true).start();
            return this;
        },
        prepareComs:function(arr){
            var self=this,funs=[];
            _.arr.each(arr, function(i){
                funs.push(function(){
                    self.getCom(i);
                });
            });
            linb.Thread(null, funs, 500).start();
            return this;
        }
    }
});
