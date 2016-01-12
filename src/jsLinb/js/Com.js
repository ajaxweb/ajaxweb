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
/*
beforeCreated
onCreated
onLoadBaseClass
onIniResource
    iniResource (asy)
beforeIniComponents
    iniComponents (asy)
afterIniComponents
    iniExComs (asy)
onLoadReqiredClass
onReady
onRender
*/

Class('linb.Com',null,{
    Constructor:function(properties, events, host){
        var self=this;
        self._nodes=[];
        self.host=host||self;

        self.properties = properties || {};
        //copy those from class setting
        self.events = _.copy(self.events) || {};
        if(events)
            _.merge(self.events, events, 'all');
    },
    Instance:{
        setHost:function(value, alias){
            this.host=value;
            return value[alias]=this;
        },
        getHost:function(){
            return this.host;
        },
        setProperties:function(key,value){
            var self=this;
            if(!key)
                self.properties={};
            else if(typeof key=='string')
                self.properties[key]=value;
            else
                _.merge(self.properties, key, 'all');
            return self;
        },
        getProperties:function(key){
            return key?this.properties[key]:this.properties;
        },
        setEvents:function(key,value){
            var self=this;
            if(!key)
                self.events={};
            else if(typeof key=='string')
                self.events[key]=value;
            else
                _.merge(self.events, key, 'all');
            return self;
        },
        getEvents:function(key){
            return key?this.events[key]:this.events;
        },

        _fireEvent:function(name, args){
            var t, self=this;
            if(t=self.events[name]){
                if(typeof t=='string')t=self.host[t];
                args=args||[];
                args.splice(0,0,self,self.threadid);
                self.$lastEvent=name;
                if(typeof t=='function')
                    return t.apply(self.host, args);
            }
        },
        _innerCall:function(name){
            var self=this;
            return _.tryF(self[name],[self, self.threadid],self);
        },
        show:function(onEnd,parent,subId,threadid){
            var self=this,f=function(){
                self.render();
                if(self.customAppend)
                    self.customAppend.call(self, parent,subId,threadid);
                else
                    (parent||linb('body')).append(self.getUIComponents(),subId);
                _.tryF(onEnd,[self, threadid],self.host);
            };
            self.threadid=threadid;
            
            if(self.created)
                f();
            else
                self.create(f,threadid);
        },
        render:function(triggerLayOut){
            var self=this;
            self.getUIComponents().render(triggerLayOut);
            self._fireEvent('onRender');
            self.rendered=true;
        },
        create:function(onEnd, threadid){
            //get paras
            var self=this,
                t,funs=[]
                ;
            self.threadid=threadid;

            if(false===self._fireEvent('beforeCreated'))return;
            //if no threadid or threadid doesnt exist, reset threadid to self
            funs.push(function(threadid){
                self.threadid=threadid;
                self._fireEvent('onCreated');
            });
            //base classes
            if((t=self.base) && t.length)
                funs.push(function(threadid){
                    linb.SC.groupCall(self.base,function(key){
                        self._fireEvent('onLoadBaseClass', [key]);
                    },null,threadid);
                });
            //load resource here
            if(self.iniResource)
                funs.push(function(){
                    self._fireEvent('onIniResource');
                    self._innerCall('iniResource');
                });
            //load required class
            if((t=self.required) && t.length)
                funs.push(function(threadid){
                    linb.SC.groupCall(self.required,function(key){
                        self._fireEvent('onLoadReqiredClass', [key]);
                    },null,threadid);
                });
            //inner components
            if(self.iniComponents)
                funs.push(function(){
                    if(false===self._fireEvent('beforeIniComponents'))return;
                    Array.prototype.push.apply(self._nodes, self._innerCall('iniComponents')||[]);
                    self._fireEvent('afterIniComponents');
                });
            //Outer components
            if(self.iniExComs)
                funs.push(function(){
                    self._innerCall('iniExComs');
                });
            //core
            funs.push(function(threadid){
                self.loaded=true;
                //lazy load
                if(self.background)
                    linb.SC.runInBG(self.background);
                self._fireEvent('onReady');
            });
            funs.push(function(threadid){
                _.tryF(onEnd,[self, threadid],self.host);
            });
            //use asyUI to insert tasks
            linb.Thread.observableRun(funs, function(){
                self.created=true;
            },threadid);
        },

        iniComponents:function(){},

//<<<todo:

        requestData:function(group, onEnd, threadid){
            var thread=linb.Thread;
            thread.observableRun(function(t){
                linb.absIO.groupCall(group, null, null, onEnd,thread||t);
            },null,threadid);
        },
        /* build order:
        +-----------+
        |  +-------+|
        |  |  +---+||
        |a |ab|abc|||
        |  |  +---+||
        |  +-------+|
        +-----------+
        1.thread start
        2.build a UI
            build ab UI
                build abc UI
        3.fill a data
            fill ab data
                fill abc data
        4.thread end
        */
        //buid UI
        composeUI:function(onEnd, threadid, flag){
            _.tryF(onEnd);
        },
        //fill data
        fillUI:function(onEnd, threadid, flag){
            _.tryF(onEnd);
        },
//>>>todo end



        getUIComponents:function(){
            var nodes = _.copy(this._nodes),t,k='linb.UI';
            _.filter(nodes,function(o){
                return !!(o.box[k] && !o.box.$noDomRoot);
            });
            return linb.UI.pack(nodes, false);
        },
        getComponents:function(){
            return linb.absObj.pack(_.copy(this._nodes),false);
        },
        setComponents:function(obj){
            var self=this,t;
            _.arr.each(self._nodes,function(o){
                if((t=self[o.alias]) &&t.get(0)==o)
                    delete self[o.alias];
            });
            _.arr.each(self._nodes=obj.get(),function(o){
                self[o.alias]=o.boxing();
            });
            return self;
        },
        destroy:function(threadid){
            var self=this;
            self.threadid=threadid;
            self._fireEvent('onDestroy');
            _.arr.each(self._nodes, function(o){
                if(o.box)
                    o.boxing().destroy();
            });
            self._nodes.length=0;
            _.breakO(self);
        }
    },
    Static:{
        load:function(cls, onEnd, lang, showUI){
            var fun=function(){
                //get app class
                linb.SC(cls,function(path){
                    //if successes
                    if(path){
                        var a=this,f=function(){
                            var o=new a();
                            if(showUI!==false)o.show(onEnd);
                            else _.tryF(onEnd,[o],o);
                        };
                        //get locale info
                        if(lang) linb.reLang(lang, f);
                        else f();
                    }else
                        throw new Error(cls+' doesnt exists!');
                },true);
            };
            if(linb.isDomReady)
                fun();
            else
                linb.main(fun);
        },
        $EventHandlers:{
            beforeCreated:function(com, threadid){},
            onLoadBaseClass:function(com, threadid, key){},
            onIniResource:function(com, threadid){},
            beforeIniComponents:function(com, threadid){},
            afterIniComponents:function(com, threadid){},
            onLoadRequiredClass:function(com, threadid, key){},
            onReady:function(com, threadid){},
            onRender:function(com, threadid){}
        }
    }
});
