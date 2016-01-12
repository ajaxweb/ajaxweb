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
//Profile Class
Class('linb.Profile','linb.absProfile',{
    Constructor:function(host,key,alias,box,properties,events,options){
        arguments.callee.upper.apply(this,arguments);
        var self=this;
        _.merge(self,options);

        self.key=key||self.key||'';
        self.alias=alias||self.alias||'',
        self.properties=properties||self.properties||{};
        self.events=events||self.events||{};
        self.host=host||self.host||self;
        self.box=box||self.box||self.constructor;
        if(self.events){
            self.setEvents(self.events);
            delete self.events;
        }
        self._links={};
    },
    Instance:{
        setEvents:function(events){
            var evs=this.box.$EventHandlers;
            return _.merge(this,events,'all',function(o,i){return evs[i]});
        },
        getEvents:function(){
            var self=this, t,hash={};
            _.each(self.box.$EventHandlers,function(o,i){
                if(self[i])hash[i]=self[i];
            });
            return hash;
        },
        _applySetAction:function(fun, value){
            return fun.call(this,value);
        },
        __gc:function(){
            this.unLinkAll();
            _.tryF(this.clearCache,[],this);
            var o=_.get(this,['box','_namePool']);
            if(o)delete o[self.alias];
            _.breakO(this);
        },
        boxing:function(){
            //cache boxing
            var self=this, t;
            if(!((t=self.object) && t._nodes[0]==self && t._nodes.length==1))
                t = self.object = self.box.pack([self],false);
            return t;
        },
        serialize:function(rtnString, keepHost){
            var t,
                self = this,
                o = (t=self.box._beforeSerialized)?t(self):self,
                r={
                    alias:o.alias,
                    key:o.key,
                    host:o.host
                };
            //host
            if(r.host===self){
                delete r.host;
            }else if(o.host && !keepHost ){
                if(rtnString!==false)
                    r.host='@this';
                else
                    delete r.host;
            }

            //properties
            var c={}, p=o.box.$DataStruct, map=linb.absObj.$specialChars;
            _.merge(c,o.properties, function(o,i){return (i in p) &&  p[i]!==o && !map[i.charAt(0)]});
            if(!_.isEmpty(c))r.properties=c;

            //events
            if(!_.isEmpty(t=this.getEvents()))r.events=t;
            var eh = o.box.$EventHandlers;
            _.filter(r.events, function(o,i){
                return o!=eh[i];
            });
            if(_.isEmpty(r.events))delete r.events;
            return rtnString===false?r:_.serialize(r);
        }
    }
});
//absObj Class
Class('linb.absObj',"linb.absBox",{
    //properties, events, host
    Constructor:function(){
        arguments.callee.upper.apply(this,arguments);
        //for pack function
        if(arguments[0]!==false && typeof this._ini=='function')
            return this._ini.apply(this,arguments);
    },
    Before:function(key, parent_key, o){
        linb.absBox.$type[key]=key;
        return true;
    },
    After:function(){
        var self=this, me=arguments.callee,
            temp,t,k,u,m,i,j,l,v,n,b;
        self._nameId=0;
        self._namePool={};
        self._nameTag=(t=self.KEY.split('.'))[t.length-1].toLowerCase();
        self._cache=[];

        if(self===linb.absObj || self===linb.absObj)return;

        m=me.a1 || (me.a1=_.toArr('$Keys,$DataStruct,$EventHandlers,$DataModel'));
        for(j=0;v=m[j++];){
            k={};
            if((t=self.$parent) && (i=t.length))
                while(i--)
                    _.merge(k, t[i][v]);
            self[v]=k;
        }

        self.setDataModel(self.DataModel);
        delete self.DataModel;

        self.setEventHandlers(self.EventHandlers);
        delete self.EventHandlers;

        m=me.a5 || (me.a5=_.toArr('RenderTrigger,LayoutTrigger'));
        for(j=0;v=m[j++];){
            temp=[];
             if((t=self.$parent) && (l=t.length))
                for(i=0;i<l;i++){
                    u=t[i]
                    if(u=u['$'+v])
                        temp.push.apply(temp,u);
                }
            if(self[v])
                temp.push(self[v]);
            self['$'+v] = temp;
            delete self[v];
        }
    },
    //don't add any other function or member to absObj
    Static:{
        $abstract:true,
        $specialChars:{_:1,$:1},
        getAll:function(){
          return this.pack(this._cache);
        },
        pickAlias:function(){
            var t,p=this._namePool,a=this._nameTag;
            while(p[t=(a+(++this._nameId))]){}
            return  t;
        },
        setDataModel:function(hash){
            var self=this,
                sc=linb.absObj.$specialChars,
                ds=self.$DataStruct,
                properties=self.$DataModel,
                ps=self.prototype,
                i,j,t,o,n,m,r;

            //merge default value and properties
            for(i in hash){
                if(!properties[i])properties[i]={};
                o=hash[i];
                if(null===o || undefined===o){
                    r=_.str.initial(i);
                    delete ds[i];
                    delete properties[i]
                    delete ps['get'+r];
                    delete ps['set'+r];
                //Here, if $DataModel inherites from it's parent class, properties[i] will pointer to parent's object.
                }else{
                    t=typeof o;
                    if(t!='object' || o.constructor!=Object)
                        o={ini:o};
                    ds[i] = ('ini' in o)?o.ini:(i in ds)?ds[i]:'';

                    t=properties[i];
                    for(j in t)
                        if(!(j in o))
                            o[j]=t[j];
                    properties[i]=o;
                }
            }

            _.each(hash,function(o,i){
                if(null===o || undefined===o || sc[i.charAt(0)])return;
                r=_.str.initial(i);
                //readonly properties
                if(!(o && (o.readonly || o.inner))){
                    //custom set
                    t = o.set;
                    n = 'set'+r;
                    m = ps[n];
                    ps[n] = typeof t=='function' ? Class._fun(t,n,self.KEY) : typeof m=='function' ? m : Class._fun(function(value,flag){
                        return this.each(function(v){
                            if(!v.properties)return;
                            //if same return
                            if(v.properties[i] === value && !flag)return;
                            var ovalue = v.properties[i],
                                m = _.get(v.box.$DataModel, [i, 'action']);
                            v.properties[i] = value;
                            if(typeof m == 'function' && v._applySetAction(m, value, ovalue) === false)
                                v.properties[i] = ovalue;
                        });
                    },n,self.KEY);
                    delete o.set;
                    if(ps[n]!==m)ps[n].$auto$=1;
                }
                if(!(o && o.inner)){
                    // get custom getter
                    t = o.get;
                    n = 'get'+r;
                    m = ps[n];
                    ps[n] = typeof t=='function' ? Class._fun(t,n,self.KEY) : typeof m=='function' ? m : Class._fun(function(){
                        return this.get(0).properties[i];
                    },n,self.KEY);
                    delete o.get;
                    if(ps[n]!==m)ps[n].$auto$=1;
                }
            });
            return self;
        },
        setEventHandlers:function(hash){
            var self=this;
            _.each(hash,function(o,i){
                if(null===o){
                    delete self.$EventHandlers[i];
                    delete self.prototype[i];
                }else{
                    self.$EventHandlers[i]=o;
                    var f=function(fun){
                        var l=arguments.length;
                        if(l==1 && (typeof fun == 'function' || typeof fun == 'string'))
                            return this.each(function(v){
                                if(v.domNode)
                                    v.clearCache();
                                v[i] =fun;
                            });
                        else if(l==1 && null===fun)
                            return this.each(function(v){
                                v.clearCache();
                                delete v[i];
                            });
                        else{
                            var args=[], v=this.get(0), t=v[i], k=v.host || v,j;
                            if(v.$ignore)return;
                            if(arguments[0]!=v)args[0]=v;
                            for(j=0;j<l;j++)args[args.length]=arguments[j];
                            v.$lastEvent=i;
                            if(typeof t=='string')t=k[t];
                            if(typeof t=='function')return _.tryF(t, args, k);
                        }
                    };
                    f.$event$=1;
                    f.$original$=o.$original$||self.KEY;
                    self.plugIn(i,f);
                }
            });
            return self;
        }
    },
    Instance:{
        alias:function(str){
            var self=this,pro=this.get(0),old;
            if(str){
                if(old=pro.alias){
                    if(pro.host){try{delete pro.host[old]}catch(e){pro.host[old]=undefined}}
                    delete self.constructor._namePool[old];
                }
                self.constructor._namePool[pro.alias=str]=1;
                if(pro.host)
                    pro.host[str]=self;
                return self;
            }else
                return pro.alias;
        },
        host:function(value, alias){
            var self=this;
            if(value){
                self.get(0).host=value;
                if(alias){
                    self.alias(alias);
                    value[alias]=self;
                }
                return self;
            }else
                return self.get(0).host;
        }
        /*non-abstract inheritance must have those functions:*/
        //1. destroy:function(){delete this.box._namePool[this.alias];this.get(0).__gc();}
        //2. _ini(properties, events, host, .....){/*set _nodes with profile*/return this;}
        //3. render(){return this}
    }
});
//DataBinder Class
Class("linb.DataBinder","linb.absObj",{
    Instance:{
        _ini:function(properties, events, host){
            var self=this,
                c=self.constructor,
                profile,
                options,
                np=c._namePool,
                alias;
            if(properties && properties['linb.Profile']){
                profile=properties;
                alias = profile.alias || c.pickAlias();
            }else{
                if(properties && properties.key && linb.absBox.$type[properties.key]){
                    options=properties;
                    properties=null;
                    alias = options.alias;
                    alias = (alias&&!np[alias])?alias:c.pickAlias();
                }else
                    alias = c.pickAlias();
                profile=new linb.Profile(host,self.$key,alias,c,properties,events, options);
            }
            np[alias]=1;
            profile._n=profile._n||[];

            //set anti-links
            profile.link(c._cache,'self').link(linb._pool,'linb');

            self._nodes.push(profile);
            return self;
        },
        destroy:function(){
            this.each(function(profile){
                var box=profile.box,name=profile.properties.name;
                //unlink
                _.arr.each(profile._n, function(v){box._unBind(name,v)});
                //delete from pool
                delete box._pool[name];
                //free profile
                profile.__gc();
            });
        },
        resetValue:function(hash){
            return this.each(function(o,i){
                _.arr.each(o._n,function(profile){
                    var p=profile.properties;
                    profile.boxing().resetValue((hash && p.dataField in hash)?hash[p.dataField]:'');
                });
            })
        },
        getUI:function(){
            return linb.UI.pack(this.get(0)._n,false);
        },
        checkValid:function(){
            return linb.absValue.pack(this.get(0)._n,false).checkValid();
        },
        getValue:function(){
            var o=this.get(0);
            if( this.checkValid() ){
                var hash={};
                _.arr.each(o._n,function(profile){
                    var p=profile.properties, b = profile.boxing(),v;
                    if(profile.domNode)b.updateValue();
                    v = b.getValue();
                    hash[p.dataField]=v;
                });
                return hash;
            }else return null;
        },
        host:function(value, alias){
            var self=this;
            if(value && alias)
                self.setName(alias);
            return arguments.callee.upper.apply(self,arguments);
        }
    },
    Static:{
        _pool:{},
        destroyAll:function(){
            this.pack(this._pool,false).destroy();
            this._pool={};
        },
        getFromName:function(name){
            var o=this._pool[name];
            return o && o.boxing();
        },
        _bind:function(name, pro){
            var o=this._pool[name];
            if(!o){
                o=new linb.DataBinder();
                o.setName(name);
                o=o.get(0);
            }
            if(pro && _.arr.indexOf(o._n,pro)==-1)
                //use link for 'destroy UIProfile' trigger 'auto unbind function '
                pro.link(o._n, 'databinder.'+name);
        },
        _unBind:function(name, pro){
            if(this._pool[name])
                pro.unLink('databinder.'+name);
        },
        DataModel:{
            name:{
                set:function(value){
                    var o=this.get(0),
                        ov=o.properties.name;
                    if(ov!==value){
                        var c=linb.DataBinder,
                            _p=c._pool,
                            to=_p[ov],
                            t=_p[value];
                        if(to && t)
                            throw new Error(value+' exists!');

                        _p[o.properties.name=value]=o;
                        //modify name
                        if(to && !t){
                            linb.absValue.pack(o._n).setDataBinder(value);
                            _.arr.each(o._n, function(v){c._unBind(ov,v)});
                        }
                        //pointer to the old one
                        if(t && !to) o._n=t._n;
                        //delete the old name from pool
                        if(to)delete _p[ov];
                    }
                    return this;
                }
            }
        }
    }
});
//UIProfile Class
Class('linb.UIProfile','linb.Profile', {
    Instance:{
        //readonly please
        rendered:false,
        _render:function(){
            var self=this,t,ele=linb.Dom.byId(self.domId);
            //for dynRender
            if(!ele)return;

            //link dom
            self.root = linb([self.domNode = ele]);
            linb.cache.dom[self.domId] = linb.cache.dom[self.$domId] = self;

            //RenderTrigger
            if(t=self.RenderTrigger){
                for(var i=0,l=t.length;i<l;i++)
                    t[i].call(self);
                delete self.RenderTrigger;
            }
            if(arguments[0]===true && (t=self.LayoutTrigger))
                for(var i=0,l=t.length;i<l;i++)
                    t[i].call(self);
            if(self.children)
                for(var i=0,v;v=self.children[i++];)
                    v[0]._render(true);
            if(self.$attached){
                for(var i=0,v;v=self.$attached[i++];)
                    //avoid to _render linb.Template
                    if(v['linb.UIProfile'])
                        v._render(true);
                delete self.$attached;
            }
        },
        __gc:function(){
            var self=this, t;
            if(self.onDestroy)self.boxing().onDestroy();
            if(self.destroyTrigger)self.destroyTrigger();

            //gc already
            if(!self.serialId)return;
            //clear cache things
            self.clearCache();

            //for dock case
            if(t=self.$dockParent)
                if(t=self.constructor.getFromDomId(t))
                    _.tryF(t.clearCache,[],t);

            //clear dom link
            if(self.nodeVars && (t=self.domNode))
                for(var i in self.nodeVars)
                    t[i]=null;

            //for refresh function
            if(!self.$exID){
                //restore dom id
                t=linb.cache.domId;
                (t[self.key] || (t[self.key]=[])).push(self.serialId);
            }else delete self.$exID

            //clear cache point
            delete linb.cache.dom[self.domId];
            delete linb.cache.dom[self.$domId];
            delete self.box._namePool[self.alias];

            //clear anti link
            self.unLinkAll();
            _.tryF(self.$ondestory);

            _.breakO(self);
        },
        unlinkParent:function(){
            var profile=this;
            delete profile.parent;
            delete profile.childrenId;
            profile.unLink('$parent');
            return profile;
        },
        getRootNode:function(){
            return this.domNode || (this.domNode=document.getElementById(this.domId));
        },
        getRoot:function(){
            return this.root || null;
        },
        linkParent:function(parentProfile, linkId){
            var profile=this;
            //unlink first
            profile.unlinkParent();

            //link
            profile.parent = parentProfile;
            profile.childrenId = linkId;
            profile.link(parentProfile.children, '$parent', [profile, linkId]);
            return profile;
        },
        _reg:/^\w[\w_-]*$/,
        setDomId:function(id){
            var t=this, c=linb.cache.dom, reg=t._reg;
            //ensure the value
            if(typeof id== 'string' && (reg.test(id)||id==t.$domId) && !linb.Dom.byId(id)){
                //delete the original one
                if(t.domId!=t.$domId)delete c[t.domId];
                //set profile's domId
                t.domId=id;
                //change the domNode id value
                if(t.domNode)t.domNode.id=id;
                //if doesn't create yet, don't set it to linb.cache:
                if(c[t.$domId])c[id]=t;
            }
            return t;
        },
        getDomId:function(){
            return this.domId;
        },
        clearCache:function(){
            var ns=this,a='$_egetter',b='$_domid',t=ns[a];
            for(var i in t)
                t[i].length=0;
            t=ns[b];
            for(var i in t)
                t[i]=null;
            ns[a]=ns[b]=null;
        },
        //get events function from profile
        _getEV:function(id, name){
            var self=this,
                $k = id+"+"+name,
                g = self.$_egetter ||(self.$_egetter={});
            if(g[$k])return g[$k];

            var dom=linb.cache.dom,
                funs=[],
                t,key
                ;
            //for event attached on dom node
            if( (t=dom[id]) && (t=t.events) && (t=t[name]) )
                for(var i=0,l=t.length;i<l;i++)
                    if(typeof t[t[i]]=='function')
                        funs[funs.length]=t[t[i]];


            //for event attached on linb widgets
            //get event function path of cache
            key = id.split(":")[0].split("-")[1];

            //for priority intercept
            if(typeof (((t=self._CB) && (key?(t=t[key]):1)) && (t=t[name]))=='function')
                funs[funs.length]=t;
            else{
                //get event function from customBehavior first
                if(typeof (((t=self.CB) && (key?(t=t[key]):1)) && (t=t[name]))=='function')
                    funs[funs.length]=t;
                else{
                    //get event function from public behavior
                    if(typeof (((t=self.behavior) && (key?(t=t[key]):1)) && (t=t[name]))=='function')
                        funs[funs.length]=t;
                }
            }
            return g[$k] = funs;
        },
        toHtml:function(){
            var self=this,
                me=arguments.callee,
                reg = me._reg || ( me._reg = /<!--([^>^\s]*)-->/g),
                c = self.box,
                h={},
                str,
                k1='linb.UIProfile',
                k2='linb.Profile',
                id, i, o, m, a, b, data;
            //before _dynamicTemplate
            data=c._prepareData(self);
            if(c._dynamicTemplate)c._dynamicTemplate(self);
            str = c._build(self, data);

            if(m=c._getChildren(self)){
                for(i=0; o=m[i++];)
                    if(o[0][k1]){
                        id=o[1]||'';
                        a=h[id]||(h[id]=[]);
                        a[a.length]=o[0].toHtml();
                    }else if(!o[0][k2]){
                        b.ini.call(b,o[0]);
                        o[0]=b.get(0);
                    }
            }

            return str.replace(reg, function(a,b){
                return h[b]?h[b].join(''):'';
            });
        },
        buildItems:function(key, items){
            var self=this,box=self.box,str,reg= self.toHtml._reg;
            str=box._rpt(self, linb.UI.$doTemplate(self, _.get(linb.cache.template,[box.KEY, self._hash]), items, key));
            return str.replace(reg,'')
        },
        serialize:function(rtnString, keepHost){
            var t,m,
                self=this,
                o=(t=self.box._beforeSerialized)?t(self):self,
                r={
                    alias:o.alias,
                    key:o.key,
                    host:o.host
                };
            //host
            if(r.host===self){
                delete r.host;
            }else if(o.host && !keepHost ){
                if(rtnString!==false)
                    r.host='@this';
                else
                    delete r.host;
            }

            //domId
            if(o.$domId!=o.domId)r.domId=o.domId;

            //properties
            var c={}, p=o.box.$DataStruct, map=linb.absObj.$specialChars;
            _.merge(c,o.properties, function(o,i){return (i in p) &&  p[i]!==o && !map[i.charAt(0)]});
            if(!_.isEmpty(c))r.properties=c;

            //events
            if(!_.isEmpty(t=this.getEvents()))r.events=t;
            var eh = o.box.$EventHandlers;
            _.filter(r.events, function(o,i){
                return o!=eh[i];
            });
            if(_.isEmpty(r.events))delete r.events;

            if(!_.isEmpty(o.CS)) r.CS=_.copy(o.CS);
            if(!_.isEmpty(o.CB)) r.CB=_.copy(o.CB);
            if(!_.isEmpty(o.CC)) r.CC=_.copy(o.CC);
            if(!_.isEmpty(o.CF)) r.CF=_.copy(o.CF);

            //children
            if(o.children && o.children.length){
                o.children.sort(function(x,y){
                    x=parseInt(x[0].properties.tabindex);y=parseInt(y[0].properties.tabindex);
                    return x>y?1:x==y?0:-1;
                });
                t=r.children=[];
                _.arr.each(o.children,function(v){
                    m=[v[0].serialize(false, keepHost)];
                    if(v[1])m[1]=v[1];
                    t[t.length]=m
                });
            }
            return rtnString===false?r:_.serialize(r);
        },
        _applySetAction:function(fun, value, ovalue){
            if(this.domNode)
                return fun.call(this, value, ovalue);
        },
        getKey:function(id){
            var t;
            if(id.indexOf(':')==-1)id=(t=linb.cache.dom[id])&&(t.$domId);
            return id?id.split(":")[0]:"";
        },
        getSubId:function(id){
            var t;
            if(id.indexOf(':')==-1)id=(t=linb.cache.dom[id])&&(t.$domId);
            return id?id.split(":")[2]:"";
        },
        pickSubId:function(key){
            var self=this, r,o = self.cache_subid || (self.cache_subid={});
            if((o[key] || (o[key]=[]))[0])return o[key].shift();
            o = self.subId || (self.subId={});
            r=(o[key] || (o[key]=new _.id)).next();
            return r;
        },
        reclaimSubId:function(id, key){
            var o = this.cache_subid || (this.cache_subid={});
            (o[key] || (o[key]=[])).push(id);
        },
        /*
        *('KEY','-mouseover',false);
        */
        getClass:function(key, tag){
            key=this.keys[key] || key;
            var self=this,
                me=arguments.callee,
                map=me._map||(me._map={}),
                reg=me._reg||(me._reg=/\./g),
                hash=key+":"+tag;

            return map[hash] || (map[hash]=key.replace(reg,'-').toLowerCase().replace('linb-ui','linb') + (tag||''));
        },
        _getSubNodeId:function(key, subId){
            var arr = this.$domId.split(':');
            arr[0]=key;
            arr[2]=subId||'';
            key=arr.join(':');
            if(key==this.$domId)return linb.cache.dom[key].domId;
            else return key;
        },
        //flag : remove from cache
        getSubNode:function(key, subId){
            var self=this;
                key=self.keys[key] || key;
            var r,t,s,h=self.$_domid||(self.$_domid={});

            // by key only
            if(subId===true)
                //key==self.keys.KEY for domId!=$domId
                r =linb([self.domNode]).query('*', 'id', key==self.keys.KEY?self.domId:new RegExp('^'+key+':'+self.serialId));
            else{
                if(!subId && h[key] && h[key]._nodes.length==1)return h[key];
                r = (t=linb.Dom.byId(s=self._getSubNodeId(key, subId))) ? linb([t]) : ((t=self.domNode) && linb([t]).query('*', 'id', s));
                if(!subId)h[key]=r;
            }
            return r;
        },
        getSubNodes:function(arr,subId){
            var i=0,a=[],o;
            for(;o=arr[i++];)
                Array.prototype.push.apply(a,this.getSubNode(o,subId).get());
            return linb(a);
        },
        getSubNodeByItemId:function(key, itemId){
            return (itemId=this.getSubIdByItemId(itemId)) ? this.getSubNode(key, itemId) : linb();
        },
        getItemByItemId:function(itemId){
            var t;
            if((t=this.ItemIdMapSubSerialId) && (t=t[itemId]))
                return this.SubSerialIdMapItem[t];
        },
        getItemByDom:function(src){
            return this.SubSerialIdMapItem && this.SubSerialIdMapItem[this.getSubId(src.id || src)];
        },
        getItemIdByDom:function(src){
            var t;
            return (t=this.getItemByDom(src)) && t.id;
        },
        getSubIdByItemId:function(itemId){
            var t;
            return (t=this.ItemIdMapSubSerialId) && t[itemId];
        },
        queryItems:function(items, fun, deep, single){
            var r=[],
                me=arguments.callee,
                f = me.f || (me.f = function(items, fun, deep, single, r){
                    _.arr.each(items,function(o){
                        if(fun===true || fun.call(null, o)){
                            r.push(o);
                            if(single)
                                return false;
                        }
                        if(deep && o.sub && o.sub.length)
                            f(o.sub, fun, deep, single, r);
                    });
                });
            f(items, fun, deep, single, r);
            return r;
        }
    },
    Static:{
        getFromDomId:function(id){
            return linb.cache.dom[id.replace(linb.Event._reg,'$1$3')];
        }
    }
});

//UI Class
Class("linb.UI",  "linb.absObj", {
    Before:function(key, parent_key, o){
        linb.absBox.$type[key.replace("linb.UI.","").replace("linb.","")]=linb.absBox.$type[key]=key;
        return true;
    },
    After:function(){
        linb.absObj.After.apply(this,arguments);
        var self=this,me=arguments.callee,
            temp,t,k,u,c,i,j,e,w,v,b,d;

        self._ctrlId = new _.id();
        self._idCache=[];
        self.$cssKeys={};

        /*change keys*/
        t=self.$Keys;
        t.KEY = t.$key = self.KEY;
        self.addTemplateKeys(_.toArr(t,true));

        //Inheriates Behaviors
        v='$Behaviors';
        k={};
        if((t=self.$parent) && (e=t.length)){
            while(e--){
                b=t[e][v];
                for(i in b){
                    if(typeof b[i]=='object'){
                        if(b[i].constructor==Array){
                            u=k[i]||(k[i]=[]);
                            u.push.apply(u,b[i]);
                        }else{
                            u=k[i]||(k[i]={});
                            _.merge(u,b[i]);
                        }
                    }else
                        k[i]=b[i];
               }
            }
        }
        self[v]=k;

        //Inheriates Templates
        v='$Templates';
        k={};
        if((t=self.$parent) && (e=t[0]))
            for(i in e[v])
                if(i.charAt(0)!='$')
                    k[i]=e[v][i];
        self[v]=_.clone(k);

        //Inheriates Appearances
        v='$Appearances';
        k={};
        if((t=self.$parent) && (e=t.length))
        while(e--){
            b=t[e];
            for(i in b[v]){
                t=b[v][i];
                u=k[i]||(k[i]={});
                _.merge(u,t);
            }
        }
        self[v]=k;

        self.setTemplate(self.Templates);
        delete self.Templates;

        self.setBehavior(self.Behaviors);
        delete self.Behaviors;

        self.setAppearance(self.Appearances);
        delete self.Appearances;

        if(t=self.PublicAppearance){
            linb.UI.$cache_css += self.buildCSSText(t);
            delete self.PublicAppearance;
        }
    },
    Instance:{
        destroy:function(){
            this.each(function(o){
                if(o.beforeDestroy && false===o.boxing().beforeDestroy())return;

                if(o.root)o.root.remove();
                else o.__gc();
            });
        },
        serialize:function(rtnString, keepHost){
            var a=[];
            this.each(function(o){
                a[a.length]=o.serialize(false, keepHost);
            });
            return rtnString===false?a:a.length==1?" new "+a[0].key+"("+_.serialize(a[0])+")":"linb.UI.unserialize("+_.serialize(a)+")";
        },

        _toDomElems:function(){
            this.render();
            var t, arr=[];
            _.arr.each(this._nodes,function(o){
                if(t=o.domNode)arr.push(t);
            });
            return arr;
        },

        _ini:function(properties, events, host, CS, CC, CB, CF){
            var self=this,
                c=self.constructor,
                profile,
                t='default',
                options,
                np=c._namePool,
                alias,temp;
            if(properties && properties['linb.Profile']){
                profile=properties;
                alias = profile.alias || c.pickAlias();
                linb.UIProfile.apply(profile,[host,self.$key,alias,c,null,events]);
            }else{
                if(properties && properties.key && linb.absBox.$type[properties.key]){
                    options=properties;
                    properties=null;
                    alias = options.alias;
                    alias = (alias&&!np[alias])?alias:c.pickAlias();
                }else
                    alias = c.pickAlias();
                profile=new linb.UIProfile(host,self.$key,alias,c,properties,events, options);
            }
            np[alias]=1;
            for(var i in (temp=c.$DataStruct))
                if(!(i in profile.properties))
                    profile.properties[i]=typeof temp[i]=='object'?_.copy(temp[i]):temp[i];

            profile.keys = c.$Keys;

            // custom
            profile.CS = CS || profile.CS || {};
            profile.CB = CB || profile.CB || {};
            profile.CC = CC || profile.CC || {};
            profile.CF = CF || profile.CF || {};

            profile.template = c.getTemplate();
            profile.behavior = c.$Behaviors;

            if(!profile.serialId)profile.serialId=c._pickSerialId();

            profile.$domId = profile.key + ":" + profile.serialId + ":";
            profile.domId = profile.domId || profile.$domId;

            profile.RenderTrigger=_.copy(c.$RenderTrigger);
            profile.LayoutTrigger=_.copy(c.$LayoutTrigger);

            //not register subcontrols id / dom cache
            //attribute in innerHTML won't cause memory leak in IE.
            profile.nodeVars = profile.behavior?profile.behavior.$eventhandler:null;

            //set links
            profile.link(linb.UI._cache,'UI').link(c._cache,'self').link(linb._pool,'linb');

            temp=profile.children;
            profile.children=[];
            if(temp && temp.length){
                for(var i=0,v;v=temp[i++];){
                    //from serialize
                    if(!v[0]['linb.UIProfile'])
                        v[0]=new (linb.SC(v[0].key))(v[0]).get(0);
                    v[0].linkParent(profile,v[1]);
                }
            }
            self._nodes.push(profile);

            return self;
        },
        busy:function(message,html,key){
            message=message||'Loading...';
            html=html||'<span style="background:'+ linb.UI.$bg('busy.gif',' no-repeat left center')('linb.UI.Public') +';padding-left:16px;">'+message+'</span>';
            return this.each(function(profile){
                _.resetRun(profile.$id+':busy',function(){
                    var keys=profile.keys;
                    key=keys[key]||keys['BORDER']||keys['PANEL']||keys['KEY'];

                    var parentNode=profile.getSubNode(key),
                        size=parentNode.cssSize(),
                        node;
                    if(!(node=profile.$busy)){
                        node=profile.$busy=linb.create('<div style="left:0;top:0;z-index:10;position:absolute;background-color:#DDD;"></div><div style="left:0;top:0;z-index:20;text-align:center;position:absolute;">'+html+'</div>');
                        linb([node.get(0)]).css({opacity:0.5});
                        linb(parentNode).append(node);
                    }
                    node.css({display:'',width:size.width+'px',height:size.height+'px',lineHeight:size.height+'px'});
                    linb([node.get(1)]).html(html,false);
                },50);
            });
        },
        free:function(){
            return this.each(function(profile){
                _.resetRun(profile.$id+':busy');
                if(profile.$busy)profile.$busy.css('display','none');
            });
        },
        resize:function(){
            return this.each(function(o){_.tryF(o.$resizeFun)});
        },
        toHtml:function(){
            var a=[];
            _.arr.each(this._nodes,function(o){
                a[a.length]=o.toHtml();
            });
            return a.join('');
        },
        render:function(triggerLayOut){
            var self=this, arr=[], i, l, o, t, m, div, matix,n=self._nodes, a=[],byId=linb.Dom.byId;

            linb.UI.$applyCSS();

            for(i=0;o=n[i++];)
                if(!byId(o.domId))
                    arr[arr.length]=o;
            if(l=arr.length){
                for(i=0;i<l;i++) a[a.length]=arr[i].toHtml();
                //get dom node
                m=_.str.toDom(a.join(''));
                m=m.get();
                l=m.length;
                //must add to DOM page first
                matix=linb.Dom.getEmptyDiv().get(0);
                t=document.createDocumentFragment?document.createDocumentFragment():matix;
                for(i=0;i<l;i++) t.appendChild(m[i]);
                if(t!=matix)matix.appendChild(t);
            }
            for(i=0;o=n[i++];) o._render(triggerLayOut);
            return self;
        },
        renderOnto:function(node, host){
            node=linb(node);
            if(node.isEmpty())return this;

            var self=this,
                pro=self.get(0),
                me=arguments.callee,
                para=me.para||(me.para=function(node){
                    var r = node.cssRegion();
                    r.tabindex=node.attr('tabIndex');
                    r.zIndex=node.css('zIndex');
                    r.position=node.css('position');
                    return r;
                });
            _.merge(pro.properties, para(node),'all');
            node.outerHTML(pro.toHtml());
            pro.boxing().host(host||window, node.get(0).id || pro.alias);
            pro._render(true);
            return self;
        },
        setDomId:function(id){
            this.get(0).setDomId(id);
            return this;
        },
        hide:function(){
            return this.each(function(o){
                if(o.domNode){
                    o.root.hide();
                    o.properties.top=o.properties.left=-10000;
                    o.properties.dockIgnore=true;
                }
            });
        },
        show:function(left,top){
            return this.each(function(o){
                if(o.domNode){
                    var t=o.properties;
                    t.dockIgnore=false;
                    o.root.show(left,top);
                    
                    if(t.dock && t.dock!='none')
                        linb.UI.$dock(o,true);
                }
            });
        },
        clone:function(){
            var arr=[],f=function(p){
                //remove those
                delete p.alias;delete p.domId;
                if(p.children)
                    for(var i=0,c;c=children[i];i++)
                        f(c);
            };
            this.each(function(o){
                o=o.serialize(false,true);
                f(o);
                arr.push(o);
            });
            return this.constructor.unserialize(arr);
        },
        refreshDom:function(){
            (function(arr){
                var me=arguments.callee;
                _.arr.each(arr,function(o){
                    if(o.constructor==Array)o=o[0];
                    o.clearCache();
                    if(o.children&&o.children.length)
                        me(o.children);
                })
            })(this._nodes);
            return this.each(function(o){
                if(o.domNode){
                    var root=o.getRoot(),size=root.cssSize();
                    root.outerHTML(o.toHtml());
                    linb.UI.$tryResize(o,size.width,size.height,o.properties.$UIvalue,true);
                }
            });
        },
        refresh:function(){
            var para,b,p,s,$id,serialId,fun,box,children;
            return this.each(function(o){
                if(!o.domNode)return;

                box=o.box;

                //save related id
                $id=o.$id;
                serialId=o.serialId;

                //keep parent
                if(b=!!o.parent){
                    p=o.parent.boxing();
                    para=o.childrenId;
                }else
                    p=o.root.parent();

                //replace
                var replace = linb.create('span');
                o.root.replace(replace,true);

                //keep children
                children = _.copy(o.children);
                o.children.length=0;
                _.arr.each(children,function(o){
                    //for flush dock
                    delete o[0].$dockParent;

                    //keep it in dom
                    replace.append(o[0].root);
                });

                //unserialize
                s = o.serialize(false, true);
                fun = o.$addOns;

                //destroy it
                //avoid cache serialId back
                o.$exID=1;
                o.boxing().destroy();
                //call gc to clear immediately
                linb.Dom.__gc();

                //set back
                _.merge(o,s,'all');
                o.$id=$id;
                o.serialId=serialId;

                //create
                o=new box(o).render();

                //for functions like: UI refresh itself
                if(fun)
                    fun.call(fun.target,o.get(0));

                //replace back
                //empty, but keep the children
                replace.empty(false);
                replace.replace(o.get(0).root);

                //restore to parent
                if(b)
                    p.append(o,para);
                else
                    p.append(o);

                //restore children
                _.arr.each(children,function(v){
                    o.append.apply(o,v);
                });
                replace.remove();
            });
        },
        append:function(target, subId){
            if(target['linb.UIProfile'])target=target.boxing();
            var pro=this.get(0),parentNode;
            if(subId!==false){
                target.each(function(profile){
                    profile.linkParent(pro,subId);
                });
            }
            if(pro.domNode){
                if(subId=typeof subId=='string'?subId:null)subId=pro.getSubIdByItemId(subId);
                parentNode=pro.keys.PANEL?pro.getSubNode(pro.keys.PANEL, subId):pro.root;
                if(!parentNode.isEmpty())
                    parentNode.append(target);
            }
            return this;
        },
        getChildren:function(subId){
            var a=[];
            _.arr.each(this.get(0).children,function(v){
                if(subId?v[1]==subId:1)
                    a.push(v[0]);
            });
            return linb.UI.pack(a);
        },
        removeChildren:function(subId){
            return this.each(function(o){
                _.arr.each(o.children,function(v){
                    if(subId?v[1]==subId:1)
                        v[0].unlinkParent();
                        if(v[0].root)
                            v[0].root.remove();
                        else
                            v[0].__gc();
                });
            });
        },
        dragable:function(dragKey, dragData, key){
            return this.each(function(o){
                o.getSubNode(o.keys[key] || 'KEY', true)
                .beforeMousedown(dragKey?function(pro,e,src){
                    if(pro.properties.disabled)return;
                    linb([src]).startDrag(e, {
                        dragKey:dragKey,
                        dragData:typeof dragData == 'function'?dragData():dragData,
                        dragCursor:'pointer',
                        dragType:'icon',
                        dragDefer:1
                    });
                }:null,'_d',-1)
                .beforeDragbegin(dragKey?function(profile, e, src){
                    linb([src]).onMouseout(true,{$force:true}).onMouseup(true);
                }:null,'_d',-1);
                if(!dragKey)
                    o.clearCache();
            });
        },
        setCustomFunction:function(key, value){
            return this.each(function(o){
                if(typeof key=='string'){
                    if(value) o.CF[key]=value;
                    else delete o.CF[key];
                }else
                    o.CF=key||{};
            });
        },
        setCustomClass:function(key, value){
            var me=arguments.callee,
                fun=(me.fun||(me.fun=function(pro,i, h, flag){
                    if(!h[i])return;
                    var node=pro.getSubNode(i,true),b;
                    if(!node.isEmpty())
                        _.arr.each(h[i].split(/\s+/),function(o){
                            node[flag?'removeClass':'addClass'](o);
                        });
                }));
            return this.each(function(o){
                var bak = _.copy(o.CC);

                //set key and value
                if(typeof key=='string'){
                    if(o.domNode)
                        if(key in bak)
                            fun(o, key, bak, true);

                    if(!value)
                        delete o.CC[key];
                    else{
                        o.CC[key]=value;
                        if(o.domNode)
                            fun(o, key, o.CC);
                    }
                //set hash dir
                }else if(!!key && typeof key=='object'){
                    if(o.domNode){
                        for(var i in key)
                            fun(o, i, bak, true);
                        for(var i in key)
                            fun(o, i, key);
                    }
                    o.CC=key;
                //clear all
                }else{
                    if(o.domNode)
                        for(var i in bak)
                            fun(o, i, bak, true);
                    o.CC={};
                }
            });
        },
        setCustomStyle:function(key,value){
            var me=arguments.callee,
                fun=(me.fun||(me.fun=function(pro,i,h, flag){
                    if(!h[i])return;
                    var node=pro.getSubNode(i,true),b;
                    if(!node.isEmpty())
                        _.arr.each(h[i].split(';'),function(o,i){
                            if((b=o.split(':')).length==2){
                                b[0]=b[0].replace(/\-(\w)/g,function(a,b){return b.toUpperCase()});
                                try{node.css(b[0], flag?'':b[1])}catch(e){}
                            }
                        });
                }));
            return this.each(function(o){
                var bak = _.copy(o.CS);

                //set key and value
                if(typeof key=='string'){
                    if(o.domNode)
                        if(key in bak)
                            fun(o, key, bak, true);

                    if(!value)
                        delete o.CS[key];
                    else{
                        o.CS[key]=value;
                        if(o.domNode)
                            fun(o, key, o.CS);
                    }
                //set hash dir
                }else if(!!key && typeof key=='object'){
                    if(o.domNode){
                        for(var i in key)
                            fun(o, i, bak, true);
                        for(var i in key)
                            fun(o, i, key);
                    }
                    o.CS=key;
                //clear all
                }else{
                    if(o.domNode)
                        for(var i in bak)
                            fun(o, i, bak, true);
                    o.CS={};
                }
            });
        },
        setCustomBehavior:function(key, value){
            return this.each(function(o){
                if(typeof key=='string'){
                    if(o.keys[key])
                        o.CB[key]=value||{};
                }else
                    o.CB=key||{};
                if(o.CB.KEY){
                    _.merge(o.CB, o.CB.KEY, 'all');
                    delete o.CB.KEY;
                }
                o.clearCache();
            });
        }
    },
    Initialize:function(){
        var ns=this.prototype;
        _.arr.each('getSubNode,getDomId,getRootNode,getRoot'.split(','),function(o){
            if(!ns[o])
                ns[o]=function(){
                    var p=this.get(0);
                    return p[o].apply(p,arguments);
                };
                ns[o].$original$='linb.UI';
        });

        var self=this, hash={};
        _.arr.each(_.toArr('left,top,width,height,right,bottom'),function(o){
            hash[o] = {
                ini:'auto',
                action:function(value){
                    var self=this,
                        p=self.properties,b=false,
                        args={$type:p.dock};
                    if(self.domNode){
                        switch(p.dock){
                            case 'top':
                                if(o!='height'&&o!='top')return;
                                args.width=args.height=1;
                                break;
                            case 'bottom':
                                if(o!='height'&&o!='bottom')return;
                                args.width=args.height=1;
                                break;
                            case 'left':
                                if(o!='width'&&o!='left')return;
                                args.width=args.height=1;
                                break;
                            case 'right':
                                if(o!='width'&&o!='right')return;
                                args.width=args.height=1;
                                break;
                            case 'width':
                                if('width'==o)return;
                                args.width=1;
                                break;
                            case 'height':
                                if('height'==o)return;
                                args.height=1;
                                break;
                            case 'fill':
                            case 'cover':
                                if(o=='width'&&o=='height')return;
                                args.width=args.height=1;
                                break;
                        }
                        self.root[o]?self.root[o](value):linb.Dom._setPxStyle(self.domNode,o,value);
                        if(p.dock!='none')_.tryF(self.$dock,[self, args],self);
                    }
                }
            }
        });
        _.merge(hash,{
            renderer:{
                ini:null
            },
            //invalid after dom domNode
            zIndex:{
                ini:1,
                action:function(value){
                    if(this.domNode)
                        this.root.css('zIndex',value);
                }
            },
            tabindex:{
                ini:1
            },
            position:{
                ini : 'absolute',
                listbox:['','static','relative','absolute'],
                action:function(value){
                    if(this.domNode)
                        this.root.css('position',value);
                }
            },
            visibility:{
                listbox:['','visible','hidden'],
                action:function(value){
                    if(this.domNode)
                        this.root.css('visibility',value);
                }
            },
            display:{
                listbox:['','none','block','inline','inline-block'],
                action:function(value){
                    if(this.domNode){
                        if(value=='inline-block')
                            this.root.setInlineBlock();
                        else
                            this.root.css('display',value);
                    }
                }
            }
        });

        self.setDataModel(hash);

        linb.UI.$cache_css += linb.UI.buildCSSText({
            '.ui-ctrl':{
            },
            '.ui-content':{
                'background-color':'#fff'
            },
            '.ui-btn':{
                background:linb.UI.$bg('button.gif', ' repeat-x left -26px',true),
                border:'solid 1px #616161',
                padding:'0 3px',
                cursor:'default',
                'font-size':'12px',
                'vertical-align':'middle'
            },
            '.ui-icon':{
                'vertical-align':'middle',
                width:'16px',
                height:'16px',
                margin:'0 4px 0 2px'
            },
            '.uicmd-close, .uicmd-opt, .uicmd-land, .uicmd-toggle, .uicmd-min, .uicmd-max,.uicmd-restore,.uicmd-pin':{
                width:'15px',
                height:'15px',
                cursor:'default',
                'vertical-align':'middle'
            },
            '.uicmd-close':{
                background: linb.UI.$bg('cmds.gif', ' no-repeat -64px 0', true)
            },
            '.uicmd-close-mouseover':{
                $order:1,
                'background-position' : '-64px -16px'
            },
            '.uicmd-close-mousedown':{
                $order:2,
                'background-position' : '-64px -32px'
            },
            '.uicmd-opt':{
                background: linb.UI.$bg('cmds.gif', ' no-repeat -240px 0', true)
            },
            '.uicmd-opt-mouseover':{
                $order:1,
                'background-position' : '-240px -16px'
            },
            '.uicmd-opt-mousedown':{
                $order:2,
                'background-position' : '-240px -32px'
            },
            '.uicmd-land':{
                background: linb.UI.$bg('cmds.gif', ' no-repeat -220px 0', true)
            },
            '.uicmd-land-mouseover':{
                $order:1,
                'background-position' : '-220px -16px'
            },
            '.uicmd-land-mousedown':{
                $order:2,
                'background-position' : '-220px -32px'
            },
            '.uicmd-toggle':{
                background: linb.UI.$bg('cmds.gif', ' no-repeat -161px 0', true)
            },
            '.uicmd-toggle-mouseover':{
                $order:2,
                'background-position': '-161px -16px'
            },
            '.uicmd-toggle-mousedown':{
                $order:3,
                'background-position': '-161px -32px'
            },
            '.uicmd-toggle-checked':{
                $order:4,
                'background-position': '-176px top'
            },
            '.uicmd-toggle-checked-mouseover':{
                $order:5,
                'background-position': '-176px -16px'
            },
            '.uicmd-toggle-checked-mousedown':{
                $order:6,
                'background-position': '-176px -32px'
            },
            '.uicmd-toggle-busy':{
                $order:7,
                background: linb.UI.$bg('busy.gif', ' no-repeat center center', true)
            },
            '.uibar-bar':{
                position:'relative'
            },
            '.uibar-t':{
                background: linb.UI.$bg('barvbg.gif', ' repeat-x left top', true),
                border: 'solid #C1C1C1',
                'border-collapse':'separate',
               'border-width': '0 1px 0 1px'
            },
            '.uibar-cmdl':{
                '-moz-user-select':'none',
                overflow:'hidden',
                position:'absolute',
                left:0,
                top:'3px',
                width:'60%',
                'padding-left':'3px',
                'white-space': 'nowrap'
            },
            '.uibar-cmdr':{
                '-moz-user-select':'none',
                position:'absolute',
                top:'3px',
                right:'4px',
                'text-align':'right'
            }
        })
        + linb.UI.buildCSSText({
            '.widget-shell':{
                background:'transparent',
                display:linb.$inlineBlock,
                zoom:linb.browser.ie6?1:null,
                //overflow:'hidden',
                /*opera must be 0 not 'none'*/
                border:0,
                padding:0,
                margin:0
            },
            /*span*/
            '.widget-frame':{
                $order:1,
                display:'block',
                position:'relative',
                //overflow:'hidden',
                border:0,
                padding:0,
                margin:0,
                width:'100%',
                height:'100%',
                '-moz-box-flex':'1'
            },
            /*span*/
            '.widget-border':{
                $order:2,
                display:'block',
                position:'absolute',
                border:0,
                padding:0,
                margin:0,
                left:0,
                top:0,
                width:'100%',
                height:'100%'
            },
            '.ui-dirty':{
                background: linb.UI.$bg('dirty.gif', ' no-repeat left top', true)
            },
            '.ui-disabled, .ui-disabled *':{
                color: '#808080'
            },
            '.ui-invalid, .ui-invalid *':{
                'background-color': '#FFEBCD'
            },
            '#linblangkey':{
                'vertical-align':'baseline'
            }
        });
    },
    $End:function(){
        linb.UI.$cache_css += this.buildCSSText(this.$Appearances);
    },
    Static:{
        $cache_css:'',
        $css_tag_dirty: "ui-dirty",
        $css_tag_invalid: "ui-invalid",
        $tag_left:"{",
        $tag_right:"}",
        $tag_special:'#',
        $ID:"#id#",
        $DOMID:'#domid#',
        $CLS:"#cls#",
        $tag_subId:"_serialId",
        $childTag:"<!--{id}-->",

        $theme:'default',
        _getChildren:function(profile){
            return profile.children;
        },
        unserialize:function(target,keepSerialId){
            if(typeof target=='string')target=_.unserialize(str);
            var f=function(o){
                if(o && o.constructor==Array)o=o[0];
                delete o.serialId;
                if(o.children)_.arr.each(o.children,f);
            }, a=[];
            _.arr.each(target,function(o){
                if(!keepSerialId)f(o);
                a.push((new (linb.SC(o.key))(o)).get(0));
            });
            return this.pack(a,false);
        },

        _ensureValues:function(arr){
            var a=[],i=0,k=0,o,key=this.KEY,cache=linb.cache.dom;
            if(arr['linb.absBox'])arr=arr._nodes;
            for(;o=arr[i++];)
                if((o.box && o.box[key]) || ((o=cache[o.domNode?o.domNode.id:o.id]) && o.box && o.box[key]))
                    a[k++]=o;
            return a.length<=1?a:this._unique(a);
        },

        __gc:function(){
            var self=this, k=self.$key, cache=linb.cache;
            //clear templates memory in linb.cache
            _.breakO([cache.template[k], cache.domId[k], self._cache, self._idCache, self.$DataModel, self.$Templates,  self.$Behaviors, self],2);
            delete linb.absBox.$type[k.replace("linb.UI.","")];
            // add for base class
            Class.__gc(k);
        },
        _pickSerialId:function(){
            //get id from cache or id
            var arr = linb.cache.domId[this.$key];
            if(arr && arr[0])return arr.pop();
            return this._ctrlId.next();
        },
        $bg:function(path, para, forceKey){
            return function(key){
                var p = linb.getPath(typeof forceKey=='string'?forceKey:forceKey?'linb.Public':key.replace('UI.',''),null,'appearance/default') +   path;
                _.asyRun(function(){new Image().src=p;});
                return 'url(' + p +') '+ (para||'');
            }
        },
        $ieBg:function(path,  forceKey){
            return function(key){
                var s = linb.getPath(typeof forceKey=='string'?forceKey:forceKey?'linb.Public':key.replace('UI.',''), '/' + path,'appearance/default');
                _.asyRun(function(){new Image().src=s;});
                return 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+s+'",sizingMethod="crop")';
            }
        },

       /* deep template function
          template: string
          properties: hash

          $doTemplate("{a}{b}{c}{a}{b}{/c}", {a:'*',b:'#',c:[{a:'1',b:'.'},{a:'2',b:'.'},{a:'3',b:'.'},{a:'4',b:'.'}]})
              will return "*#1.2.3.4."
          doTemplate("{a}{b}{c}{}{/c}", {a:'*',b:'#',c:['1','2','3','4']})
              will return "*#1234"

          flag: default flase => no clear not mactched symbols
        */
        $doTemplate:function(profile, template, properties, tag, result){
            var self=arguments.callee,
                s,t,n,
                isA = properties.constructor == Array,
                temp = template[tag||''],
                r = !result,
                result= result || [];
            if(isA){
                if(typeof temp != 'function')temp = self;
                for(var i=0;t=properties[i++];)
                    temp(profile, template, t, tag, result);
            }else{
                if(t=properties.object){
                    //[properties] is for linb.Template
                    result[result.length]=t.toHtml();
                }else{
                    if(typeof temp == 'function')
                        temp(profile, template, properties, tag, result);
                    else{
                        tag = tag?tag+'.':'';
                        var a0=temp[0], a1=temp[1];
                        for(var i=0,l=a0.length;i<l;i++){
                            if(n=a1[i]){
                                if(n in properties){
                                    t=properties[n];
                                    //if sub template exists
                                    if(template[s=tag+n] && t)
                                        self(profile, template, t, s, result);
                                    else
                                        result[result.length]=t;
                                }
                            }else
                                result[result.length]=a0[i];
                        }
                    }
                }
            }
            if(r)return result.join('');
        },
        /*
        set properties default map and set properties handler
        It's a merge function, not replace

        this.$DataStruct: {a:,b:,c}
        this.$DataModel: from hash, for example:
        hash:{
            key1:{
                ini:xx,
                set:fun..,
                get:fun..,
                action: fun
            },
            key2:null,
            key3:'abc,
        }
        */
        $buildTemplate:function(profile, template, key, obj, arr){
            if(template && String(template.tagName).toLowerCase()=='text'){
                arr[arr.length] = template.text;
                return;
            }
            var self =arguments.callee,
                behavior = profile.behavior?key?profile.behavior[key]:profile.behavior:null,
                map1 = self.map1 ||(self.map1={tagName:1,text:1}),
                map2 = self.map2 ||(self.map2={image:1,input:1}),
                r2=self.r2||(self.r2=/[a-z]/),
                r3=self.r3 || (self.r3=/^(on|before|after)/),
                r7=self.r7 || (self.r7=/([^{}]*)\{([\w]+)\}([^{}]*)/g),
                first=false,
                u=linb.UI,
                t, o , bak, lkey;

            if(!template)template=profile.template;
            lkey = key?profile.keys[key]:profile.key;

            //tagName
            if(!template.tagName)template.tagName="span";

            if(template.id!==null)
                //id
                template.id = key?lkey + ":" + u.$ID + ":" + u.$tag_left + u.$tag_subId + u.$tag_right:u.$DOMID;
            else
                delete template.id;

            if(template.className!==null){
                //className
                t = u.$CLS + (key?'-'+key.toLowerCase():'');
                //save bak
                bak = template.className || '';

                //default class first
                template['class'] =  t+' '+
                    //custom class here
                    bak+' '+
                    //add a special for root
                    (lkey==profile.key?' ui-ctrl ':'') +
                    //custom class
                    u.$tag_special + (key||'KEY') + '_CC'+u.$tag_special
                    ;
            }
            delete template.className;

            template.style = (template.style||'')+';'+ u.$tag_special + (key||'KEY') + '_CS'+u.$tag_special;

            var a=[], b={}, tagName=template.tagName, text= template.text, sc=linb.absObj.$specialChars;
            for(var i in template){
                if(!template[i])continue;
                if(!sc[i.charAt(0)] && !map1[i]){
                    o=template[i];
                    if(!r2.test(i)){
                        // collect sub node
                        if(typeof o == 'object'){
                            if(!o.$order)o.$order=0;
                            o.$key=i;
                            a[a.length]=o;
                        }
                    }else
                        b[i]=o;
                }
            }
            // sort sub node
            a.sort(function(x,y){
                x=x.$order;y=y.$order;
                return x>y?1:x==y?0:-1;
            });

            //first
            if(!arr){
                first=true;
                arr=[];
            }
            //<span id="" style="">
            arr[arr.length]='<'+tagName+' ';
            for(var i in b)
                arr[arr.length]=i+'="'+b[i]+'" ';

            //set className bak
            if(template.className!==null)
                template.className = bak;

            delete template['class'];

            // add event handler
            if(behavior && (t=behavior.$eventhandler))
                for(var i in t)
                    if(t[i])
                        arr[arr.length]=i+'="'+t[i]+'" ';

            arr[arr.length]='{attributes}>';

            if(!map2[tagName] && text)
                arr[arr.length]=text;

            // add sub node
            for(var i=0,l=a.length;i<l;){
                o=a[i++];
                self(profile, o, o.$key, obj, arr)
            }

            if(!map2[tagName])
                arr[arr.length]='</'+tagName+'>';

            if(first){
                var a0=obj[0],a1=obj[1];
                arr.join('').replace(r7,function(a,b,c,d){
                    if(b)a0[a0.length]=b;
                    a1[a0.length]=a0[a0.length]=c;
                    if(d)a0[a0.length]=d;
                    return '';
                });
            }
        },
        _rpt:function(profile,temp){
            var me=arguments.callee,
                tag=linb.UI.$tag_special,
                r=me._r||(me._r=new RegExp( tag+'([A-Z0-9]+)_C([SC])'+tag + '|'+ tag+'([\\w_\\-\\.]*)'+tag, 'img')),
                h1={
                    id:profile.serialId,
                    cls:profile.getClass('KEY'),
                    domid:profile.domId
                },
                h2={
                    S:profile.CS,
                    C:profile.CC
                };
            return temp.replace(r, function(a,b,c,d){return h1[d] || h2[c][b] || ''});
        },
        _build:function(profile, data){
            var template, t, m,
                u=linb.UI,
                temp=[[],[]],
                self=this,
                key=self.KEY,
                cache=linb.cache.template,
                hash = profile._hash =
                    'b:' + (profile.template._subid||'') + ';' +
                    '!' + (profile._exhash||'');

            //get template
            if(!(template = _.get(cache,[key, hash]))){
                //get main template
                u.$buildTemplate(profile,null,null,temp);
                //split sub template from main template

                //set main template
                _.set(cache, [key, hash, ''], temp);
                //set sub template
                if(t=profile.template.$dynamic)
                    for(var i in t){
                        if(typeof (m=t[i])!='function'){
                            var temp=[[],[]];
                            for(var j in m)
                                if(typeof m[j] == 'object')
                                    u.$buildTemplate(profile, m[j], j, temp);
                            m=temp;
                        }
                        _.set(cache, [key,hash,i], m);
                    }

                template = _.get(cache,[key, hash]);
            }
            if(!template)return '';

            //replace main template
            return self._rpt(profile, u.$doTemplate(profile, template, data));
        },
        /*
        allow function input, for some css bug
        */
        _setDefaultBehavior:function(hash){
            var self=this,
                me=arguments.callee,
                map=me._m||(me._m={'':1,KEY:1,$key:1}),
                f=me._f1||(me._f1=function(arr, type, mode){
                    var fun = function(profile, e, src){
                        var t,
                            id=src.id,item,
                            cid = profile.getSubId(id),
                            prop = profile.properties,nodes,funs,box;
                        if(prop.disabled)return;
                        item = profile.SubSerialIdMapItem && profile.SubSerialIdMapItem[cid];
                        if(item && item.disabled)return;
                        switch(typeof arr){
                            case 'string':
                                nodes=profile.getSubNode(arr,cid).get();
                                break;
                            case 'function':
                                funs=[arr];
                                break;
                            case 'object':
                                nodes=[];funs=[];
                                for(var o,i=0,l=arr.length;i<l;i++){
                                    o=arr[i];
                                    if(typeof o=='string')
                                        nodes.push.apply(nodes,profile.getSubNode(o,cid).get());
                                    else
                                        funs.push(o);
                                }
                        }

                        if(nodes&&nodes.length){
                            nodes=linb(nodes);
                            box=profile.boxing();
                            if(mode==1){
                                if(type=='mouseover' && profile.beforeHoverEffect)
                                    if(false == box.beforeHoverEffect(profile, item, e, src, 'mouseover'))
                                        return;
                                if(type=='mousedown' && profile.beforeClickEffect)
                                    if(false == box.beforeClickEffect(profile, item, e, src, 'mousedown'))
                                        return;

                                //default action
                                nodes.tagClass('-'+type);
                            }else{
                                if(type=='mouseup'){
                                    if(profile.beforeClickEffect && false == box.beforeClickEffect(profile, item, e, src, 'mouseup'))
                                        return;
                                    nodes.tagClass('-mousedown', false);
                                }else{
                                    if(profile.beforeHoverEffect && false == box.beforeHoverEffect(profile, item, e, src, 'mouseout'))
                                        return;
                                    nodes.tagClass('(-mouseover|-mousedown)', false);
                                }
                            }
                            nodes.length=0;
                        }
                        if(funs&&funs.length){
                            _.arr.each(funs,function(o){
                                _.tryF(o,[profile],profile)
                            });
                            funs.length=0;
                        }
                   };
                    return fun;
                }),
                hls={},t;
            if(!linb.SC.get('linb.absPlus'))
                Class('linb.absPlus','linb.absObj',{
                    Instance:{
                        addPanel:function(para, children, item){
                            var pro = _.copy(linb.UI.Panel.$DataStruct);
                            _.merge(pro, para, 'with');
                            _.merge(pro,{
                                left:0,
                                top:0,
                                dock:'fill',
                                tag:para.tag||para.id
                            },'all');

                            var pb = new linb.UI.Panel(pro),arr=[];
                            this.append(pb, item&&item.id);
                            _.arr.each(children,function(o){
                                arr.push(o[0]);
                            });
                            pb.append(linb.UI.pack(arr,false));
                        },
                        removePanel:function(){
                            this.destroy();
                        },
                        getPanelPara:function(){
                            return _.copy(this.get(0).properties);
                        },
                        getPanelChildren:function(){
                            return this.get(0).children;
                        },
                        e1:function(profile, item, e, src, type){},
                        e2:function(profile, key, control, shift, alt, e, src){},
                        e3:function(profile, e, shift, src){},
                        e4:function(profile, e, src, key, data, item){},
                        e5:function(profile, e, src){}
                    },
                    Static:{
                        DataModel:{
                            dragKey:'',
                            dropKeys:''
                        },
                        $abstract:true
                    }
                });
            var src=linb.absPlus.prototype;

            if(hash.HoverEffected){
                _.each(hash.HoverEffected,function(o,i){
                    t=map[i]?hash:(hash[i]||(hash[i]={}));
                    if(!o)
                        t.afterMouseover = t.afterMouseout = null;
                    else{
                        t.afterMouseover = f(o,'mouseover', 1);
                        t.afterMouseout = f(o,'mouseout', 2);
                    }
                });
                hls.beforeHoverEffect=src.e1;
            }
            if(hash.ClickEffected){
                _.each(hash.ClickEffected,function(o,i){
                    t=map[i]?hash:(hash[i]||(hash[i]={}));
                    if(!o)
                        t.afterMousedown = t.afterMouseup = null;
                    else{
                        t.afterMousedown = f(o,'mousedown', 1);
                        t.afterMouseup = f(o,'mouseup', 2);
                    }
                });
                hls.beforeClickEffect=src.e1;
            }
            //for onHotKey
            if(hash.KeyHook){
                _.merge(hash,{
                    afterKeydown:function(profile, e, src){
                        if(profile.onHotKeydown){
                            var key = linb.Event.getKey(e);
                            return false !== profile.boxing().onHotKeydown(profile,key[0], !!key[1], !!key[2], !!key[3], e, src);
                        }
                    },
                    afterKeypress:function(profile, e, src){
                        if(profile.onHotKeypress){
                            var key = linb.Event.getKey(e);
                            return false !== profile.boxing().onHotKeypress(profile,key[0], !!key[1], !!key[2], !!key[3], e, src);
                        }
                    },
                    afterKeyup: function(profile, e, src){
                        if(profile.onHotKeyup){
                            var key = linb.Event.getKey(e);
                            return false !== profile.boxing().onHotKeyup(profile,key[0], !!key[1], !!key[2], !!key[3], e, src);
                        }
                    }
                },'all');
                hls.onHotKeydown=hls.onHotKeypress=hls.onHotKeyup=src.e2;
            }
            //for focus action
            if(hash.NavKeys){
                _.each(hash.NavKeys,function(o,i){
                    var map=arguments.callee, k, m1=map.m1||(map.m1={KEY:1,$key:1});
                    if(m1[i])return;
                    var m2=map.m2||(map.m2={input:1,textarea:1}),
                    m3=map.m3||(map.m3={tab:1,enter:1,up:1,down:1,left:1,right:1}),
                    m4=map.m4||(map.m4={tab:1,up:1,down:1,left:1,right:1}),
                    t=hash[i]||(hash[i]={});

                    if(null===o)
                        t.afterKeydown = null;
                    else{
                        t.afterKeydown = function(profile, e, src){
                            var k=linb.Event.getKey(e), key = k[0], shift=k[2], alt=k[3], b=false;
                            if(m2[k=src.tagName.toLowerCase()]){
                                if(m3[key]){
                                    var reg = linb([src]).caret(),txt=src.value;

                                    switch(key){
                                        case 'up':
                                            if(!/[\n\r]/.test(txt.substr(0,reg[0]))) b=true;
                                            break;
                                        case 'left':
                                            if(reg[0]===0 && (reg[1]!==txt.length || reg[1]===0)) b=true;
                                            break;
                                        case 'down':
                                            if(!/[\n\r]/.test(txt.substr(reg[1],txt.length))) b=true;
                                            break;
                                        case 'right':
                                            if(reg[1]===txt.length && (reg[0]!==0 || reg[1]===0)) b=true;
                                            break;
                                        default:
                                            if(k=='input'|| alt)b=true;
                                            break;
                                        case "tab":
                                            b=true;
                                            break;
                                    }
                                }
                            }else
                                if(m4[key])
                                    b=true;
                            //hanlder focus
                            if(b){
                                //export event
                                if(profile.beforeNextFocus && false === profile.boxing().beforeNextFocus(profile,key,!!shift,e))return false;

                                if(key!='tab')
                                    linb(src).nextFocus(('up'==key || 'left'==key)?false:true);
                            }
                        }
                    }
                });
                hls.beforeNextFocus=src.e3;
            }
            if((t=hash.DropableKeys) && t.length){
                _.arr.each(t,function(o){
                    self._dropable(o)
                });

                t=self.prototype;
                _.arr.each('addPanel,removePanel,getPanelPara,getPanelChildren,getDropKeys,setDropKeys'.split(','),function(o){
                    if(!t[o])t[o]=src[o];
                });
                self.$DataModel.dropKeys=self.$DataStruct.dropKeys='';
                hls.onDragEnter=hls.onDragLeave=hls.onDrop=hls.onDropTest=hls.onDropMarkShow=hls.onDropMarkClear=src.e4;
            }
            if((t=hash.DragableKeys)&& t.length){
                _.arr.each(t,function(o){
                    self._dragable(o)
                });
                t=self.prototype;
                _.arr.each('getDragKey,setDragKey'.split(','),function(o){
                    if(!t[o])t[o]=src[o];
                });
                self.$DataModel.dragKey=self.$DataStruct.dragKey='';
                hls.onStartDrag=hls.onDragStop=src.e5;
            }
            self.setEventHandlers(hls);
        },

        addTemplateKeys:function(arr){
            var self=this, key=self.KEY, me=arguments.callee, reg=me._reg||(me._reg=/\./g);
            _.arr.each(arr,function(i){
                self.$cssKeys[i]=(self.$Keys[i]=i=='KEY'?key:key+"-"+i).replace(reg,'-').toLowerCase().replace('linb-ui','linb');
            });
            return self;
        },
        getTheme:function(){
            return this.$theme;
        },
        setTheme:function(key){
            key=key||'default';
            if(key!=this.$theme){
                if(key!='default')
                    linb.CSS.includeLink(linb.getPath('linb.appearance.'+key,'/theme.css'),'theme:'+key);
                var o=linb.CSS.get('id','theme:'+this.$theme);
                if(o){
                    o.disabled=true;
                    linb(o).remove(false);
                }
                this.$theme=key;
            }
            return this;
        },
        setAppearance:function(hash){
            _.merge(this.$Appearances,hash,'all');
            return this;
        },
        getAppearance:function(){
            return this.$Appearances;
        },
        /*replace mode*/
        setTemplate:function(hash, cacheId){
            if(hash){
                var self=this,
                    me=arguments.callee,
                    r2=me.r2||(me.r2=/[a-z]/),
                    sc=linb.absObj.$specialChars,
                    _ks=['KEY'],
                    fun = me._fun || (me._fun=function(hash, arr){
                        var o,i;
                        for(i in hash){
                            if(!sc[i.charAt(0)])
                                if(!r2.test(i)){
                                    arr[arr.length]=i;
                                    o=hash[i];
                                    if(typeof o == 'object')
                                        arguments.callee(o, arr)
                                }
                        };
                    })
                    ,t;
                fun(hash,_ks);
                self.addTemplateKeys(_ks);

                t = self.$Templates;

                // for sub template,
                if(typeof cacheId=='string'){
                    hash._subid = cacheId;
                    t[cacheId]=hash;
                }else
                    t._=hash;

                //set sub
                if(t=hash.$dynamic)
                    for(var i in t)
                        for(var j in t[i])
                            me.call(self, t[i], j);
            }
            return this;
        },
        getTemplate:function(cacheId){
            return this.$Templates[cacheId||'_'];
        },
        /*replace mode*/
        setBehavior:function(hash){
            if(hash){
                var self=this,
                    check=linb.absObj.$specialChars,
                    handler = linb.Event.$EVENTHANDLER,
                    ehs='$eventhandler',
                    eventType=linb.Event._getEventType,
                    me=arguments.callee,
                    r1=me.r1||(me.r1=/[a-z]/),
                    r2=me.r2||(me.r2=/^(on|before|after)/),
                    t= self.$Behaviors,
                    m,i,j,o,v, type;
                //set shortcut first
                self._setDefaultBehavior(hash);
                //merge KEY
                if(hash.KEY){
                    _.merge(hash, hash.KEY, 'all');
                    delete hash.KEY;
                }
                //attach event handler
                for(i in hash){
                    o=hash[i];
                    if(!check[i.charAt(0)]){
                        //only two layer
                        if(!r1.test(i)){
                            m=t[i]||(t[i]={});
                            for(j in o){
                                v=o[j];
                                if(!check[j.charAt(0)]){
                                    type = eventType(j);
                                    if(v){
                                        /*set to behavior*/
                                        m[j]=v;
                                        /*add handler*/
                                        (m[ehs] || (m[ehs]={}))['on'+type]=handler;
                                    }else{
                                        delete m[j];
                                        if(t[ehs])delete t[ehs]['on'+type];
                                    }
                                }
                            }
                        }else if(r2.test(i)){
                            type = eventType(i);
                            if(o){
                                /*set to behavior*/
                                t[i]=o;
                                /*add handler*/
                                (t[ehs] || (t[ehs]={}))['on'+type]=handler;
                            }else{
                                delete t[i];
                                if(t[ehs])delete t[ehs]['on'+type];
                            }
                        //for those special keys
                        }else
                            t[i]=o;
                    }
                }
            }

            return self;
        },
        getBehavior:function(){
            return this.$Behaviors;
        },
        $applyCSS:function( ){
            var self=linb.UI, cache=self.$cache_css;
            if(cache){
                if(!self.$cssNo)self.$cssNo=1;
                linb.CSS.addStyleSheet(cache, 'linb.UI-CSS'+(self.$cssNo++));
                self.$cache_css='';
            }
        },
        buildCSSText:function(hash){
            var self=this,
                me=arguments.callee,
                r1=me._r1||(me._r1=/(^|\s|,)([0-9A-Z_]+)/g),
                h=[], r=[],
                browser=linb.browser,
                ie6=browser.ie6,
                ie=browser.ie,
                gek=browser.gek,
                ks=self.$cssKeys,
                t,v,o;

            for(var i in hash){
                o=hash[i];
                t=i.replace(r1,function(a,b,c){return  b + '.' + (ks[c]||c)}).toLowerCase();
                o.$order=parseInt(o.$order)||0;
                o.$=t;
                h[h.length]=o;
            };
            h.sort(function(x,y){
                x=x.$order;y=y.$order;
                return x>y?1:x==y?0:-1;
            });

            for(var i=0,l=h.length;i<l;){
                o=h[i++];
                r[r.length]=o.$+"{";
                if(t=o.$before)r[r.length]=t;
                if(t=o.$text)r[r.length]=t;
                for(var j in o){
                    switch(j.charAt(0)){
                        case '$':continue;break;
                        case '_':if(!ie6)continue;break;
                        case '*':if(!ie)continue;break;
                        case '-':if(!gek)continue;break;
                    }
                    //neglect '' or null
                    if((v=o[j])||o[j]===0){
                        //put string dir
                        switch(typeof v){
                        case 'string':
                        case 'number':
                            r[r.length]=j+":"+v+";";break;
                        case 'function':
                            r[r.length]=j+":"+v(self.KEY)+";";break;
                        //arrray
                        default:
                            _.arr.each(v,function(k){
                                //neglect '' or null
                                if(k)r[r.length]=j+":"+k+";";
                            });
                        }
                    }
                }
                if(v=o.$after)r[r.length]=v;
                r[r.length]="}";
            }
            return r.join('');
        },
        _dropable:function(key){
            var self=this,
                h2=linb.Event.$EVENTHANDLER2,
                o=self.$Behaviors,
                v=key=='KEY'?o:(o[key]||(o[key]={}));
            //attach Behaviors
            _.merge(v, {
                beforeMouseover:function(profile, e, src){
                    if(profile.properties.disabled||profile.properties.readonly)return;
                    var self=this,
                        dd = linb.DragDrop,
                        pp = dd.getProfile(),
                        key = pp.dragKey,
                        data = pp.dragData,
                        item,box,t,args
                        ;

                    //not include the dragkey
                    if(!key
                    || !data
                    || !(new RegExp('\\b'+key+'\\b')).test(profile.box.getDropKeys(profile, self))
                    )return;

                    box=profile.boxing();
                    if(box.getItemByDom)
                        item=box.getItemByDom(src);

                    args=[profile, e, self, key, data, item];
                    if((t=profile.onDropTest) && (false===box.onDropTest.apply(box,args)))
                        return;
                    if((t=profile.box._onDropTest) && (false===t.apply(profile.host||profile, args)))
                        return;
                    //for trigger onDrop
                    dd.setDropElement(src);
                    if(profile.onDropMarkShow && (false===box.onDropMarkShow.apply(box,args))){}
                    else if((t=profile.box._onDropMarkShow) && (false===t.apply(profile.host||profile, args))){}
                    else
                        //show region
                        _.resetRun('setDropFace', dd.setDropFace, 0, [self], dd);

                    if(t=profile.box._onDragEnter)t.apply(profile.host||profile, args);
                    if(profile.onDragEnter)box.onDragEnter.apply(box,args);
                    //dont return false, multi layer dd wont work well
                    //return false;
                },
                beforeMouseout:function(profile, e, src){
                    if(profile.properties.disabled||profile.properties.readonly)return;
                    var self=this,
                        dd = linb.DragDrop,
                        pp = dd.getProfile(),
                        key = pp.dragKey,
                        data = pp.dragData,
                        item, box, args;
                    //not include the dragkey
                    if(pp.dropElement==src.id){
                        box=profile.boxing();
                        if(box.getItemByDom)
                            item=box.getItemByDom(src);

                        args=[profile, e, self, key, data, item];
                        if(profile.onDropMarkClear && (false===box.onDropMarkClear.apply(box,args))){}
                        else if((t=profile.box._onDropMarkClear) && (false===t.apply(profile.host||profile, args))){}
                        else _.resetRun('setDropFace', dd.setDropFace, 0, [null], linb.DragDrop);

                        if(t=profile.box._onDragLeave)t.apply(profile.host||profile, args);
                        if(profile.onDragLeave)box.onDragLeave.apply(box,args);
                        dd.setDropElement(null);
                    }
                    //return false;
                },
                beforeDrop:function(profile, e, src){
                    var self=this,
                        dd = linb.DragDrop,
                        pp = dd.getProfile(),
                        key = pp.dragKey,
                        data = pp.dragData,
                        item,t,args,
                        box=profile.boxing();
                    if(box.getItemByDom)
                        item=box.getItemByDom(src);
                    args=[profile, e, self, key, data, item];

                    if(profile.onDropMarkClear && (false===box.onDropMarkClear.apply(box,args))){}
                    else if((t=profile.box._onDropMarkClear) && (false===t.apply(profile.host||profile, args))){}

                    if(profile.onDrop && (false===box.onDrop.apply(box,args))){}
                    else if((t=profile.box._onDrop) && (false===t.apply(profile.host||profile, args))){}
                }
            }, 'all');
            _.merge(v.$eventhandler||(v.$eventhandler={}),{
                onmouseover:h2,
                onmouseout:h2,
                ondrop:h2
            });
            return self;
        },
        _dragable:function(key){
            var self=this,
                h2=linb.Event.$EVENTHANDLER2,
                o=self.$Behaviors,
                v=key=='KEY'?o:(o[key]||(o[key]={}));
            //attach Behaviors
            _.merge(v, {
                beforeMousedown:function(profile, e, src){
                    if(profile.properties.disabled)return;
                    //not resizable or drag
                    if(!profile.properties.dragKey)return;
                    var pos=linb.Event.getPos(e),box=profile.boxing(),args=[profile,e,src],t;
                    if(profile.onStartDrag && (false===box.onStartDrag.apply(box,args))){}
                    else if((t=profile.box._onStartDrag) && (false===t.apply(profile.host||profile, args))){}
                    else{
                        linb([src]).startDrag(e, {
                            dragType:'icon',
                            targetLeft:pos.left+12,
                            targetTop:pos.top+12,
                            dragCursor:'pointer',
                            dragDefer:1,
                            dragKey: profile.box.getDragKey(profile, this),
                            dragData: profile.box.getDragData(profile, this)
                        });
                    }
                },
                beforeDragbegin:function(profile, e, src){
                    linb(src).onMouseout(true,{$force:true}).onMouseup(true);
                },
                beforeDragstop:function(profile, e, src){
                    var t;
                    if(profile.onDragStop)profile.boxing().onDragStop(profile.e,src);
                    if(t=profile.box._onDragStop)t.apply(profile.host||profile, arguments);
                }
            }, 'all');
            _.merge(v.$eventhandler||(v.$eventhandler={}),{
                onmousedown:h2,
                ondragbegin:h2
            });

            return self;
        },
        /*copy item to hash, use 'without'
        exception: key start with $
        value(start with $) get a change to get value from lang setting
        */
        adjustData:function(profile, hashIn, hashOut){
            if(!hashOut)hashOut={};
            var i,o,w=linb.wrapRes,me=arguments.callee,r=me._r||(me._r=/\B\$([\w]+[\.][\w\.]+[\w])/g);
            for(i in hashIn){
                if(i.charAt(0)=='$')continue;
                if(!(i in hashOut))
                    hashOut[i] = typeof (o=hashIn[i])=='string' ?
                              (
                                  ((o.indexOf('$')!=-1) ? (o=o.replace(r, function(a,b){return w(b)})) : o)
                                &&((o.charAt(0)=='@') ? (linb.SC.get(o.substr(1,o.length)) || o) : o)
                              ) : o;
            }
            if((typeof (o=hashOut.renderer)=='function') || (typeof (o=hashIn.renderer)=='function'))
                hashOut.caption=o(hashIn,hashOut,profile);

            if('disabled' in hashIn)
                hashOut.disabled=hashIn.disabled?'ui-disabled':'';

            //todo: change it
            hashOut.iconDisplay = hashIn.image?'':'display:none';
            return hashOut;
        },

        cacheData:function(key, obj){
            _.set(linb.cache,['UIDATA', key], obj);
            return this;
        },
        getCachedData:function(key){
            var r = _.get(linb.cache,['UIDATA', key]);
            if(typeof r == 'function')r=r();
            return _.clone(r);
        },


        DataModel:{
            tag:'',
            tagVar:{
                ini:{}
            },
            disabled:{
                ini:false,
                action: function(v){
                    this.root.css('opacity',v?0.5:1);
                }
            },
            dock:{
                ini:'none',
                listbox:['none','top','bottom','left','right','center','middle','origin','width','height','fill','cover'],
                action:function(v){
                    var self=this;
                    if(self.domNode)
                        linb.UI.$dock(self,true);
                }
            },
            dockIgnore:{
                ini:false,
                action:function(v){
                    var self=this;
                    if(!v && self.domNode && self.properties.dock!='none')
                            linb.UI.$dock(self,true,true);
                }
            },
            dockOrder:{
                ini: 1,
                action:function(v){
                    var self=this;
                    if(self.domNode && self.properties.dock!='none')
                        linb.UI.$dock(self,true,true);
                }
            },
            dockMargin:{
                ini:{left:0,top:0,right:0,bottom:0},
                action:function(v){
                    var self=this;
                    if(self.domNode && self.properties.dock!='none')
                        linb.UI.$dock(self,true,true);
                }
            },
            dockFloat:{
                ini:false,
                action:function(v){
                    var self=this;
                    if(self.domNode && self.properties.dock!='none')
                        linb.UI.$dock(self,true,true);
                }
            },
            dockMinW:0,
            dockMinH:0,
            tips:''
        },
        EventHandlers:{
            onRender:function(profile){},
            onLayout:function(profile){},
            onDestroy:function(profile){},
            beforeDestroy:function(profile){},
            onShowTips:function(profile, node, pos){}
        },
        RenderTrigger:function(){
            var self=this, b=self.boxing(),p=self.properties;
            //avoid the resize blazzing
            if(self.box._onresize){
                var style=self.domNode.style,t
                if((t=style.visibility)!='hidden'){
                   self._$v=t;
                   style.visibility='hidden';
                }
                linb.UI.$tryResize(self,p.width,p.height);
            }

            if(p.disabled)
                b.setDisabled(true,true);

            self.inValid=1;
            self.rendered=true;
            if(self.onRender)
                b.onRender(self);
        },
        $tryResize:function(profile,w,h,key,force){
            var s=profile.box,t=s._onresize,args=profile.$rs_args;
            if(t&&(w||h)){
                if(!args){
                    args=profile.$rs_args=[profile,null,null];
                    _.asyRun(profile.$resizeFun=function(){
                        delete profile.$rs_args;
                        delete profile.$resizeFun;
                        //destroyed before resize
                        if(!linb.Dom.byId(profile.domId))return;
                        t.apply(s,args);
                        var style=profile.domNode.style;
                        if('_$v' in profile){
                            //some control will set visible to recover the css class
                            if(style.visibility!='visible')
                                style.visibility=profile._$v;
                            delete profile._$v;
                        }
                    });
                }
                //keep the last one
                if(w)args[1]=w;
                if(h)args[2]=h;
                args[3]=key;
            }
            if(force)_.tryF(profile.$resizeFun);
        },
        LayoutTrigger:function(){
            var self=this, b=self.boxing(),p=self.properties;
            if(p.dock && p.dock != 'none'){
                //first time, ensure _onresize to be executed.
                if(!self.$laidout){
                    self.$laidout=1;
                    var stl=self.domNode.style;
                    switch(p.dock){
                        case 'top':
                        case 'bottom':
                        case 'width':
                            stl.width=0;
                            break;
                        case 'left':
                        case 'right':
                        case 'height':
                            stl.height=0;
                            break;
                        default:
                            stl.width=stl.height=0;
                    }
                }
                linb.UI.$dock(this,true);
            }
            if(self.onLayout)
                b.onLayout(self);
        },
        $dock:function(profile, flag, force){
            var prop = profile.properties,
                margin=prop.dockMargin,
                node = profile.root,
                value = prop.dock || 'none',
                p= node.parent(),
                auto = 'auto',
                pid=p.id(),
                order=function(x,y){
                    x=parseInt(x.properties.dockOrder)||0;y=parseInt(y.properties.dockOrder)||0;
                    return x>y?1:x==y?0:-1;
                },
                win=false,
                region,
                inMatix='$inMatix',
                f,t,
                //for ie6 1px bug
                _adjust=function(v){return linb.browser.ie6?v-v%2:v}


            //attached to matix
            if(pid && _.str.startWith(pid,linb.Dom._matixid))
                return;

            if(profile.$dockParent!=pid || profile.$dockType != value || force){
                profile.$dockParent=pid;
                profile.$dockType = value;

                //unlink first
                profile.unLink('$dock');
                profile.unLink('$dock1');
                profile.unLink('$dock2');

                //set the fix value first
                switch(value){
                    case 'middle':
                        region={right:auto, bottom:auto,left:prop.left||'',width:prop.width||'',height:prop.height||''};
                        break;
                    case 'center':
                        region={right:auto, bottom:auto,top:prop.top||'',width:prop.width||'',height:prop.height||''};
                        break;
                    case 'origin':
                        region={right:auto, bottom:auto,width:prop.width||'',height:prop.height||''};
                        break;
                    case 'top':
                        region={left:margin.left, right:margin.right, bottom:auto, height:prop.height||''};
                        //width top
                        break;
                    case 'bottom':
                        region={left:margin.left, right:margin.right, top:auto, height:prop.height||''};
                        //width bottom
                        break;
                    case 'left':
                        region={right:auto,width:prop.width||''};
                        //height top left
                        break;
                    case 'right':
                        region={left:auto,width:prop.width||''};
                        //height top right
                        break;
                    case 'width':
                        region={bottom:auto,height:prop.height||'',top:prop.top||''};
                        //width left
                        break;
                    case 'height':
                        region={right:auto,width:prop.width||'',left:prop.left||''};
                        //height top
                        break;
                    case 'fill':
                    case 'cover':
                        region={right:auto,bottom:auto};
                        break;
                    case 'none':
                        region={left:prop.left, top:prop.top, width:prop.width||'',height:prop.height||''};
                        break;
                }
                node.cssRegion(region,true);
                //if in body, set to window
                if(p.get(0)===document.body){
                    p=linb.win;
                    win=true;
                    if(win && !linb.cache._resizeTime)linb.cache._resizeTime=1;
                }
                //set dynamic part
                if(value != 'none'){
//                        if(!win)p.css('overflow','hidden');

                    f = p.$getEvent('onSize','dock');
                    if(!f){
                        f=function(p,arg){
                            //get self vars
                            var me=arguments.callee,
                                map=me.map ||(me.map={middle:1,center:1}),
                                arr = me.arr,
                                rePos=me.rePos,
                                node=me.node,
                                style=node.get(0).style,
                                win=me.win,
                                obj,i,k,o,key,target
                            ;
                            //window resize: check time span, for window resize in firefox
                            //force call when input $dockid
                            //any node resize
                            if( arg.$dockid || !win || (_() - linb.cache._resizeTime > 100)){
                                //recruit call, give a short change
                                obj = {left:0,top:0,right:0,bottom:0,width:parseInt(style&&style.width)||node.width(),height:parseInt(style&&style.height)||node.height()};

                                for(k=0;key=arr[k++];){
                                    target = me[key];
                                    if(target.length){
                                        if(!map[key])arg.width=arg.height=1;
                                        for(i=0;o=target[i++];)
                                            if(!o.properties.dockIgnore)
                                                rePos(o, obj, key, arg.$dockid, win||arg.width, win||arg.height);

                                    }
                                }
                                if(obj.later){
                                    _.each(obj.later, function(o){
                                        //for safari
                                        try{
                                            o.node.cssRegion(o, true);
                                        }catch(e){
                                            _.asyRun(function(){
                                                o.width+=1;o.height+=1;
                                                o.node.cssRegion(o, true);
                                            })
                                        }
                                    });
                                }

                                //if window resize, keep the timestamp
                                if(win)
                                    linb.cache._resizeTime = _();
                            }
                        };
                        //self refrence
                        f.node=p;
                        f.arr=['top','bottom','left','right','center','middle','width','height'];
                        _.arr.each(f.arr,function(key){
                            f[key]=[];
                        });
                        //is window resizer
                        f.win = win;
                        f.rePos=function(profile, obj, value, id, w, h){
                            //if $dockid input, and not the specific node, return
                            var flag=false;
                            if(id && profile.$id!=id)flag=true;
                            var prop = profile.properties,
                                flt=prop.dockFloat,
                                margin = prop.dockMargin,
                                node = profile.root,
                                style = profile.domNode.style,
                                left, top, right, bottom,temp, other,
                                x = parseInt(prop._dockBorderWidth) || 0,
                                y = parseInt(prop._dockBorderHeight) || 0,
                                region={}
                                ;
                            //top/bottom/left/right must be set by order first
                            switch(value){
                                case 'middle':
                                    //use height() is ok
                                    node.top((obj.height - node.height())/2);
                                    break;
                                case 'center':
                                    node.left((obj.width - node.width())/2);
                                    break;
                                case 'top':
                                    if(!flag){
                                        left=margin.left;
                                        right=margin.right;
                                        top=(flt?0:obj.top)+margin.top;
                                        if(parseFloat(style.top)!=top)region.top=top;
                                        temp=obj.width - left - right - x;
                                        if(parseFloat(style.width)!=temp)region.width=_adjust(temp);
                                        if(!_.isEmpty(region))node.cssRegion(region,true);
                                    }

                                    if(!flt)
                                        obj.top += (node.offsetHeight() + margin.top + margin.bottom);
                                    break;
                                case 'bottom':
                                    if(!flag){
                                        left=margin.left;
                                        right=margin.right;
                                        bottom=(flt?0:obj.bottom)+margin.bottom;
                                        if(parseFloat(style.bottom)!=bottom)region.bottom=bottom;
                                        temp=obj.width - left - right - x;
                                        if(parseFloat(style.width)!=temp)region.width=_adjust(temp);
                                        if(!_.isEmpty(region))node.cssRegion(region,true);
                                    }
                                    if(!flt)
                                        obj.bottom += (node.offsetHeight() + margin.top + margin.bottom);
                                    break;
                                case 'left':
                                    if(!flag){
                                        left=(flt?0:obj.left)+margin.left;
                                        top=(flt?0:obj.top)+margin.top;
                                        bottom=(flt?0:obj.bottom)+margin.bottom;
                                        if(parseFloat(style.left)!=left)region.left=left;
                                        if(parseFloat(style.top)!=top)region.top=top;
                                        temp=obj.height - top - bottom - y;
                                        if(parseFloat(style.height)!=temp)region.height=_adjust(temp);
                                        if(!_.isEmpty(region))node.cssRegion(region,true);
                                    }
                                    if(!flt)
                                        obj.left += (node.offsetWidth() + margin.left + margin.right);
                                    break;
                                case 'right':
                                    //if no top/bottom and change w only
                                    if(!flag){
                                        right=(flt?0:obj.right)+margin.right;
                                        top=(flt?0:obj.top)+margin.top;
                                        bottom=(flt?0:obj.bottom)+margin.bottom;
                                        if(parseFloat(style.right)!=right)region.right=right;
                                        if(parseFloat(style.top)!=top)region.top=top;
                                        temp=obj.height - top - bottom - y;
                                        if(parseFloat(style.height)!=temp)region.height=_adjust(temp);
                                        if(!_.isEmpty(region))node.cssRegion(region,true);
                                    }
                                    if(!flt)
                                        obj.right += (node.offsetWidth() + margin.left + margin.right);
                                    break;
                                case 'width':
                                    //if no top/bottom/left/right and change h only
                                    if(!w)return;
                                    left = (prop.dock=='cover'?0:(flt?0:obj.left)) + margin.left;
                                    right = (prop.dock=='cover'?0:(flt?0:obj.right))  + margin.right;
                                    top = prop.dock=='width'?(parseInt(prop.top) || 0):( (prop.dock=='cover'?0:(flt?0:obj.top)) + margin.top);
                                    //later call for w/h change once
                                    temp=obj.width - left - right - x;
                                    obj.later=obj.later||{};
                                    obj.later[profile.$id] = obj.later[profile.$id] || {};
                                    _.merge(obj.later[profile.$id],{
                                        node:node,
                                        width: _adjust(prop.dockMinW?Math.max(prop.dockMinW,temp):temp),
                                        left:left,
                                        top:top
                                    },'all');
                                    break;
                                case 'height':
                                    //if no top/bottom/left/right and change w only
                                    if(!h)return;
                                    top = (prop.dock=='cover'?0:(flt?0:obj.top)) + margin.top;
                                    bottom = (prop.dock=='cover'?0:(flt?0:obj.bottom))  + margin.bottom;
                                    left = prop.dock=='height'?(parseInt(prop.left) || 0):((prop.dock=='cover'?0:(flt?0:obj.left))+ margin.left);
                                    //later call for w/h change once
                                    temp=obj.height - top - bottom - y;
                                    obj.later=obj.later||{};
                                    obj.later[profile.$id] = obj.later[profile.$id] || {};
                                    _.merge(obj.later[profile.$id],{
                                        node:node,
                                        height: _adjust(prop.dockMinH?Math.max(prop.dockMinH,temp):temp),
                                        left:left,
                                        top:top
                                    },'all');

                                    break;
                            }
                        };

                        //add handler to window or node
                        p.onSize(f,'dock');
                    }
                    //set link to node
                    if(value=='fill' || value=='cover'){
                        profile.link(f.height, '$dock1');
                        profile.link(f.width, '$dock2');
                        f.height.sort(order);
                        f.width.sort(order);
                    }else if(value=='origin'){
                        profile.link(f.center, '$dock1');
                        profile.link(f.middle, '$dock2');
                    }else{
                        profile.link(f[value], '$dock');
                        f[value].sort(order);
                    }

                    //
                    linb.cache._resizeTime=1;

                    //set shortuct
                    profile.$dock=f;
                }//else{
                    //delete overflow form style
//                        if(!win)p.css('overflow', '');
                //}
            }
            //run once now
            if(value != 'none' && flag)
                profile.$dock(profile, {width:1, height:1, $dockid:_.arr.indexOf(['width','height','fill','cover'],value)!=-1?profile.$id:null, $type: value});
        },

        _beforeSerialized:function(profile){
            var r=profile.boxing(),b,t,o={};
            _.merge(o, profile, 'all');
            var p = o.properties = _.copy(profile.properties);
            switch(p.dock){
                case 'top':
                case 'bottom':
                    delete p.width;delete p.left;delete p.top;delete p.right;delete p.bottom;
                    break;
                case 'left':
                case 'right':
                    delete p.height;delete p.left;delete p.top;delete p.right;delete p.bottom;
                    break;
                case 'width':
                    delete p.width;delete p.left;delete p.right;
                    break;
                case 'height':
                    delete p.height;delete p.top;delete p.bottom;
                    break;
                case 'fill':
                case 'cover':
                    delete p.width;delete p.height;delete p.left;delete p.top;delete p.right;delete p.bottom;
                    break;
            }

            if(p.items && p.items.length){
                t=linb.absObj.$specialChars;
                p.items = _.clone(p.items,function(o,i){return !t[(i+'').charAt(0)]&&o!=undefined});
            }
            if(_.isEmpty(p.tagVar))
                delete p.tagVar;
            if((t=p.dockMargin)&&!t.left&&!t.top&&!t.right&&!t.bottom)
                delete p.dockMargin;
            if(p.items&&(p.items.length==0||p.listKey))
                delete p.items;

            return o;
        },
        getDropKeys:function(profile,node){
            return profile.properties.dropKeys;
        },
        getDragKey:function(profile,node){
            return profile.properties.dragKey;
        },
        getDragData:function(profile,node){
            return {
                profile:profile,
                domId:node.id
            };
        },
        _prepareData:function(profile, data){
            var prop = profile.properties,
                dm = this.$DataModel,
                me = arguments.callee,
                map = me.map || (me.map=_.toArr('left,top,bottom,right,width,height')),
                a=[],
                ajd=linb.UI.adjustData,
                t
                ;
            data = data||{};
            //can't input id in properties
            if(prop.id)delete prop.id;

            //give default caption
            if('caption' in dm && prop.caption!==null)
                prop.caption = prop.caption===undefined ? profile.alias : prop.caption;

            //give border width
            if('$border' in dm){
                data.bWidth=prop.width - (t=(prop.$border||0)*2);
                data.bHeight=prop.height - t;
            }
            //set left,top,bottom,right,width,height,position,z-index,visibility,display
            for(var j=0,i;i=map[j];j++){
                if(prop[i] || prop[i]===0){
                    if(String(parseFloat(prop[i]))==String(prop[i]))
                        a[a.length]=i+':'+(parseInt(prop[i])||0)+'px';
                    else if(prop[i]!='auto' && prop[i])
                        a[a.length]=i+':'+prop[i];
                }
            }
            if(prop.position)a[a.length] = 'position:'+prop.position;
            if(prop.visibility)a[a.length]= 'visibility:'+prop.visibility;
            if(prop.zIndex)a[a.length]= 'z-index:'+prop.zIndex;
            if(prop.display)a[a.length]= 'display:'+ (prop.display=='inline-block'? linb.browser.gek?'-moz-inline-block;display:-moz-inline-box;display:inline-block;':'inline-block' :prop.display)

            data._style = ';'+a.join(';')+';';

            if('href' in dm)data.href = prop.href || linb.$href;
            if('tabindex' in dm)data.tabindex = prop.tabindex || '-1';
            if('items' in dm){
                profile.ItemIdMapSubSerialId = {};
                profile.SubSerialIdMapItem = {};
                data.items = this._prepareItems(profile, prop.items);
            }

            //default prepare
            data =  ajd(profile, prop, data);

            profile.prepared=true;
            return data;
        },
        _prepareItems:function(profile, items, pid, mapCache, serialId){
            var result=[],
                item,dataItem,t,
                SubID=linb.UI.$tag_subId,id ,
                tabindex = profile.properties.tabindex,
                ajd=linb.UI.adjustData;
            //set map
            for(var i=0,l=items.length;i<l;i++){
                if(typeof items[i]!='object')
                    items[i]={id:items[i]};
                item=items[i];
                if(!('caption' in item))item.caption=item.id;

                dataItem={id: item.id};
                if(pid)dataItem._pid = pid;

                id=dataItem[SubID]=typeof serialId=='string'?serialId:profile.pickSubId('items');

                if(false!==mapCache){
                    profile.ItemIdMapSubSerialId[item.id] = id;
                    profile.SubSerialIdMapItem[id] = item;
                }
                if(t=item.object){
                    t=dataItem.object=t['linb.absBox']?t.get(0):t;
                    //relative it.
                    if(t['linb.UIProfile'])
                        t.properties.position='relative';
                    item.$id=t.$id;
                    t.$item=item;
                    t.$holder=profile;
                    if(!profile.$attached)profile.$attached=[];
                    profile.$attached.push(t);
                }else{
                    dataItem._tabindex=tabindex;
                    //others
                    ajd(profile, item, dataItem);
                    if(this._prepareItem)
                        this._prepareItem(profile, dataItem, item, pid, mapCache, serialId);
                }
                result.push(dataItem);
            }

            return result;
        },
        _showTips:function(profile, node, pos){
            if(profile.onShowTips)
                return profile.boxing().onShowTips(profile, node, pos);
        }
    }
});
//absList cls
Class("linb.absList", "linb.absObj",{
    Instance:{
        activate:function(){
            var profile = this.get(0),
                items = profile.getSubNode('ITEM',true);
            if(!items.isEmpty())
                items.focus();
            return this;
        },
        /*
        [x] ,valid id   ,true  => insert [x] before node
        [x] ,valid id   ,false => insert [x ]after node
        [x] ,null ,true  => insert [x ] to head
        [x] ,null ,false => insert [x ] to tail
        [x] => html([x ])
        */
        insertItems:function(arr, base, before){
            if(!arr || !arr.length)return;
            var node,
                items, index, r,
                data,box,
                b=this._afterInsertItems;
            return this.each(function(profile){
                box=profile.box;
                items = profile.properties.items;
                index = _.arr.subIndexOf(items,'id',base);
                if(index==-1){
                    items.push.apply(items,arr);
                }else
                    _.arr.insertAny(items,arr, before?index:index+1);

                //if in dom, create it now
                if(profile.domNode){
                    // prepare properties format
                    data = box._prepareItems(profile, arr, base);

                    var ss=profile.buildItems('items', data);
                    if(index==-1){
                        //if no base specified, use innerHtml dir
                        node = profile.getSubNode(box.ITEMSKEY || profile.keys.ITEMS || profile.keys.KEY);

                        if(typeof before=="boolean"){
                            r=_.str.toDom(ss);
                            //items.length==1 for that one have fake item(for example: editable poll)
                            if(before||items.length==1)
                                node.prepend(r);
                            else
                                node.append(r);
                        }else
                            node.html(ss);
                    }else{
                        r = _.str.toDom(ss);
                        node=profile.getSubNodeByItemId(box.ITEMKEY || 'ITEM', base);
                        if(before===true)
                            node.addPrev(r);
                        else
                            node.addNext(r);
                    }
                    if(b)profile.boxing()._afterInsertItems(profile, data, base, before);
                }
            });
        },
        removeItems:function(arr, key){
            if(!(arr instanceof Array))arr=[arr];
            var obj,v,
                b=this._afterRemoveItems;
                remove=function(profile, arr, target, ns, force){
                    var self=arguments.callee;
                    if(!ns)ns=linb();
                    _.filter(arr,function(o){
                        var serialId,b;
                        if(force || (b=(_.arr.indexOf(target,o.id)!=-1))){
                            if(profile.domNode){
                                if(serialId=profile.ItemIdMapSubSerialId[o.id]){
                                    // clear maps
                                    delete profile.SubSerialIdMapItem[serialId];
                                    delete profile.ItemIdMapSubSerialId[o.id];
                                    profile.reclaimSubId(serialId, 'items');

                                    //parent node is deleted
                                    if(!force){
                                        if(!(obj = profile.getSubNode(profile.keys[key]?key:'ITEM', serialId) ).isEmpty() )
                                            ns.merge(obj);
                                        //for inner template or linb.UI
                                        if(o.$id)ns.get().push(linb.getObject(o.$id).getRootNode());
                                    }
                                }
                            }
                        }
                        //check sub
                        if(o.sub)self(profile, o.sub, target, ns, force || b);
                        //filter it
                        if(b){
                            for(var i in o)o[i]=null;
                            return false;
                        }
                    });
                    ns.remove();
                };
            return this.each(function(profile){
                var p=profile.properties;
                // clear properties
                remove(profile, p.items, arr);
                // clear value
                if(v=p.value){
                    if((v=v.split(';')).length>1){
                        _.filter(v,function(o){
                            return _.arr.indexOf(arr,o)==-1;
                        });
                        p.value=v.join(';');
                    }else{
                        if(_.arr.indexOf(arr,p.value)!=-1)
                            p.value=null;
                    }
                }
                if(b && profile.domNode)
                    profile.boxing()._afterRemoveItems(profile, arr);
            });
        },
        clearItems:function(key){
            return this.each(function(profile){
                if(!profile.SubSerialIdMapItem)return;
                //empty dom
                profile.getSubNode(profile.keys[key] || profile.keys.ITEMS || 'KEY', true).empty();
                //save subid
                _.each(profile.SubSerialIdMapItem, function(o,serialId){
                    profile.reclaimSubId(serialId, 'items');
                });
                //delete items
                profile.properties.items.length=0;
                //clear cache
                profile.SubSerialIdMapItem={};
                profile.ItemIdMapSubSerialId={};

                //keep the value
                //profile.properties.value=null;
            });
        },
        updateItem:function(subId,options){
            var self=this,
                profile=self.get(0),
                box=profile.box,
                items=profile.properties.items,
                item=profile.queryItems(items,function(o){return o.id==subId},true,true),
                serialId,node;
            if(item.length){
                item=item[0];
                _.merge(item, options, 'all');
                item.id=subId;

                //prepared already?
                serialId=_.get(profile,['ItemIdMapSubSerialId',subId]);
                arr=box._prepareItems(profile, [item],item._pid,false, serialId);

                //in dom already?
                node=profile.getSubNodeByItemId('ITEM',subId);
                if(!node.isEmpty()){
                    //for the sub node
                    if(items.sub){
                        delete item._created;
                        delete item._checked;
                    }
                    node.outerHTML(profile.buildItems(arguments[2]||'items',arr));
                }
            }
            return self;
        },
        fireItemClickEvent:function(subId){
            var profile = this.get(0),
                node =profile.getSubNodeByItemId('ITEM', subId);
            if(node.isEmpty()){
                profile.boxing().setUIValue(null);
            }else
                node.onClick();
            return this;
        }
    },
    Initialize:function(){
        var o=this.prototype;
        _.arr.each(_.toArr('getItemByItemId,getItemByDom,getSubIdByItemId,getSubNodeByItemId'),function(s){
            o[s]=function(){
                var t=this.get(0);
                return t[s].apply(t,arguments);
            };
            Class._fun(o[s],s,o.KEY);
        });
    },
    Static:{
        $abstract:true,
        DataModel:{
            listKey:{
                set:function(value, flag){
                    return this.each(function(o){
                        if(o.properties.listKey != value || flag){
                            var t = o.box.getCachedData(value);
                            if(t)
                                o.boxing().setItems(t);
                            else
                                o.boxing().setItems(o.properties.items);
                            o.properties.listKey = value;
                        }
                    });
                }
            },
            items:{
                ini:[],
                set:function(value){
                    return this.each(function(o){
                        if(o.domNode)o.boxing().clearItems().insertItems(value);
                        o.properties.items = value;
                    });
                }
            }
        },
        //
        _showTips:function(profile, node, pos){
            if(profile.onShowTips)
                return profile.boxing().onShowTips(profile, node, pos);

            var t=profile.properties,
                id=node.id,
                sid=profile.getSubId(id),
                map=profile.SubSerialIdMapItem,
                item=map&&map[sid];

            if(t.disabled)return;
            if(item && item.disabled)return;
            if(item && item.tips){
                linb.Tips.show(pos, item);
                return true;
            }else
                return false;
        }
    }
});

Class("linb.absValue", "linb.absObj",{
    Instance:{
        /*
        getUIValue:         return $UIvalue
        setUIValue:         set $UIvalue,and _setCtrlValue                   beforeUIValueSet/afterUIValueSet
        getValue:           return value
        setValue:           set value, set $UIvalue, and _setCtrlValue       beforeValueSet/afterValueSet
        resetValue:         reset value,UIvalue,Ctrlvalue not trigger event
        updateValue:        set $UIvalue to value

        _setCtrlValue:      change control value                *nedd to be overwritten
        _getCtrlValue:      get value from control              *nedd to be overwritten
        _setDirtyMark:      mark UI ctrl when value!==UIvalue   *nedd to be overwritten
        */
        _getCtrlValue:function(){return this.getUIValue()},
        _setCtrlValue:function(value){return this},
        _setDirtyMark:function(){return this},

        getValue:function(){return this.get(0).properties.value},
        getUIValue:function(){return this.get(0).properties.$UIvalue},
        resetValue:function(value){
            var self=this;
            self.each(function(profile){
                var r;
                if(typeof (r=profile.box._ensureValue)=='function')
                    value = r.call(profile.box, profile, value);
                profile.boxing()._setCtrlValue(profile.properties.$UIvalue = profile.properties.value = value);
                if(typeof(r=profile.$onValueSet)=='function')r.call(profile,value);
                profile.inValid=1;
            });
            self._setDirtyMark();
            return self;
        },
        setUIValue:function(value, force){
            var self=this;
            this.each(function(profile){
                var prop=profile.properties, r,
                    ovalue = prop.$UIvalue,
                    box = profile.boxing();
                if(ovalue !== value || force){
                    if(
                        false===profile.box._checkValid(profile, value) ||
                        (profile.beforeUIValueSet && false===(r=box.beforeUIValueSet(profile, ovalue, value)))
                      )
                        return;
                    //can get return value
                    if(r!==undefined)value=r;
                    //before _setCtrlValue
                    if(typeof (r=profile.box._ensureValue)=='function')
                        value = r.call(profile.box, profile, value);
                    if(typeof(r=profile.$onValueUpdated)=='function')r.call(profile,value);
                    //before value copy
                    if(profile.domNode)box._setCtrlValue(value);
                    //value copy
                    prop.$UIvalue = value;

                    if(profile.domNode)box._setDirtyMark();
                    if(profile.afterUIValueSet)box.afterUIValueSet(profile, ovalue, value);
                }
            });
            return this;
        },
        updateValue:function(){
            this.each(function(profile){
                var prop = profile.properties;
                if(profile.boxing().checkValid())
                    prop.value = prop.$UIvalue;
            });
            return this._setDirtyMark();
        },
        isDirtied:function(){
            var p = this.get(0).properties;
            return p.value !== p.$UIvalue;
        },
        checkValid:function(){
            var r=true;
            this.each(function(profile){
                var prop=profile.properties;
                //r must be at the end
                r = profile.box._checkValid(profile, prop.$UIvalue) && r;
                if(profile.domNode)
                    profile.boxing()._setDirtyMark();
            });
            return r;
        }
    },
    Static:{
        $abstract:true,
        DataModel:{
            dataBinder:{
                combobox:function(){
                    return _.toArr(linb.DataBinder._pool,true);
                },
                set:function(value,flag){
                    var ds,r;
                    return this.each(function(profile){
                        var p=profile.properties,
                            old = p.dataBinder;
                        if(old==value && !flag)return;
                        if(old)
                            linb.DataBinder._unBind(old, profile);
                        p.dataBinder=value;
                        linb.DataBinder._bind(value, profile);
                    });
                }
            },
            dataField:'',

            // setValue and getValue
            value:{
                ini:null,
                set:function(value, flag){
                    this.each(function(profile){
                        var p=profile.properties,r,
                            ovalue = p.value,
                            box=profile.boxing(),
                            nv=value;
                        //check value
                        if(ovalue!==nv || flag){
                            //check format
                            if(profile.box._checkValid(profile, nv)===false)return;
                            //if return false in beforeValueSet, not set
                            if(profile.beforeValueSet && false=== (r=box.beforeValueSet(profile, ovalue, nv)))return;
                            // can get return value
                            if(r!==undefined)nv=r;
                            //before _setCtrlValue
                            //ensure value
                            if(typeof (r=profile.box._ensureValue)=='function')
                                nv = r.call(profile.box, profile, nv);
                            if(typeof(r=profile.$onValueSet)=='function')r.call(profile,nv);
                            //before value copy
                            if(profile.domNode)box._setCtrlValue(nv);
                            //value copy
                            p.value = p.$UIvalue = nv;

                            profile.inValid=1;
                            if(profile.domNode)box._setDirtyMark();
                            if(profile.afterValueSet)box.afterValueSet(profile, ovalue, nv);
                        }
                    });
                    return this;
                }
            }
        },
        EventHandlers:{
           //$onValueSet
            beforeValueSet:function(profile, oldValue, newValue){},
            afterValueSet:function(profile, oldValue, newValue){},
            //$onValueUpdated
            beforeUIValueSet:function(profile, oldValue, newValue){},
            afterUIValueSet:function(profile, oldValue, newValue){},

            beforeDirtyMark:function(profile, dirty){}
        },
        RenderTrigger:function(){
            var self=this, b=self.boxing(),p=self.properties,t,value;
            p.$UIvalue = p.value;
            if(p.value !==undefined){
                value=p.value;
                if(typeof (t=self.box._ensureValue)=='function')
                    value = t.call(self.box, self, value);
                b._setCtrlValue(value);
            }

            if(t=p.dataBinder)b.setDataBinder(t,true);
            if(t=p.dataField)b.setDataField(t);
        },
        _checkValid:function(profile, value){
            return true;
        }
    }
});

//som base widgets Classes
new function(){
    var u='linb.UI';
    //Widget cls
    Class(u+".Widget", u,{
        Static:{
            Appearances:{
                KEY:{
                    'font-size':linb.browser.ie?0:null,
                    'line-height':linb.browser.ie?0:null
                }
            },
            Templates:{
                className:'widget-shell ',
                style:'{_style}',
                FRAME:{
                    className:'widget-frame ',
                    BORDER:{
                        style:'width:{bWidth}px;height:{bHeight}px;',
                        className:'widget-border'
                    }
                }
            },
            Behaviors:{
                KeyHook:true,
                onSize:function(profile,e){
                    //if fire onresize ,w/h must be set to style
                    var style = profile.domNode.style ,w=null,h=null;
                    if(e.width)
                        w=parseInt(style.width)||w;
                    if(e.height)
                        h=parseInt(style.height)||h;
                    linb.UI.$tryResize(profile,w,h);
                }
            },
            DataModel:{
                width:100,
                height:100,
                //hide props
                $paddingTop:0,
                $paddingLeft:0,
                $paddingBottom:0,
                $paddingRight:0,
                $border:0
            },
            RenderTrigger:function(){
                var self=this, p=self.properties, o=self.boxing();
                //for performance
                _.asyRun(function(){
                    if(!linb.Dom.byId(self.domId))return;
                    if((!self.$noB) && p.border && o._border)o._border(p.border);
                    if((!self.$noR) && p.resizer && o.setResizer)o.setResizer(p.resizer,true);
                    if((!self.$noS) && p.shadow && o._shadow)o._shadow(p.shadow);
                });
            },
            _onresize:function(profile,width,height){
                var o = profile.getSubNode('BORDER'), t = profile.properties,
                    left=null,top=null,ww=null,hh=null;
                if(null!==width){
                    width -= (t.$border*2 + t.$paddingLeft + t.$paddingRight);
                    /*for ie6 bug*/
                    /*for example, if single number, 100% width will add 1*/
                    /*for example, if single number, attached shadow will overlap*/
                    if(linb.browser.ie6)width=(parseInt(width/2))*2;
                    left=t.$paddingLeft;
                    ww=width;
                }
                if(null!==height){
                    height -= (t.$border*2 + t.$paddingTop + t.$paddingBottom);
                    if(linb.browser.ie6)height=(parseInt(height/2))*2;
                    top = t.$paddingTop;
                    hh=height;

                    /*for ie6 bug*/
                    if(linb.browser.ie6&&null===width)o.ieRemedy();
                }
                o.cssRegion({left:left,top:top,width:ww,height:hh});
                profile.getSubNode('CON').height(profile.getSubNode('TR1TD2').height());
                return { width :ww, height :hh};
            }
        }
    });
    Class(u+".Link", u,{
        Static:{
            Appearances:{
                KEY:{
                   'font-size':linb.browser.ie?'12px':null,
                   'line-height':linb.browser.ie?'14px':null
                }
            },
            Templates:{
                tagName:'a',
                style: '{_style}',
                href :"{href}",
                target:'{target}',
                tabindex: '{tabindex}',
                text:'{caption}'
            },
            Behaviors:{
                onClick:function(profile, e, src){
                    var r;
                    if(!profile.properties.disabled && profile.onClick)
                        r = profile.boxing().onClick(profile, e, src);
                    //**** if dont return false, this click will break sajax in IE
                    //**** In IE, click a href(not return false) will break the current script downloading
                    return r !==undefined?r:false;
                }
            },
            DataModel:{
                caption:{
                    ini:undefined,
                    action:function(v){
                        this.root.get(0).innerHTML = v;
                    }
                },
                href:{
                    ini:linb.$href,
                    action:function(v){
                        if(this.domNode)
                            this.root.attr('href',v);
                    }
                },
                target:{
                    action:function(v){
                        if(this.domNode)
                            this.root.attr('target',v);
                    }
                }
            },
            EventHandlers:{
                onClick:function(profile, e){}
            }
        }
    });
    Class(u+".Div", u,{
        Static:{
            Appearances:{
                KEY:{
                   // overflow:(linb.browser.gek && !linb.browser.gek3)?'auto':null,
                    outline:linb.browser.gek?'none':null,
                    zoom:linb.browser.ie6?'1':null,
                    background:linb.browser.ie?'url('+linb.ini.file_bg+') no-repeat left top':null
                }
            },
            Templates:{
                tagName:'div',
                style:'{_style}',
                //for firefox div focus bug: outline:none; tabindex:'-1'
                tabindex:'-1',
                text:'{html}'+linb.UI.$childTag
            },
            DataModel:{
                disabled:null,
                width:'100',
                height:'100',
                html:{
                    action:function(v){
                        //dont use .html() here
                        this.domNode.innerHTML = v;
                    }
                }
            }
        }
    });
    Class(u+".Tag", u+".Div",{
        Static:{
            Templates:{
                tagName:'div',
                style:'overflow:auto;border:dashed blue 1px;text-align:center;background:#EBEADB;{_style}',
                text:'{tagKey}'+linb.UI.$childTag
            },
            DataModel:{
                html:null,
                tagKey:{
                    action:function(v){
                        this.root.html(v);
                    }
                }
            },
            _l:_.toArr('left,top,bottom,right,width,height,zIndex,tabindex,position,dock,dockFloat,dockMinW,dockMinH,dockOrder,dockMargin'),
            //replace tag profile with other UI profile
            replace:function(tagProfile, profile, com){
                //reset properties
                _.arr.each(this._l,function(s){
                    if(s in tagProfile.properties)profile.properties[s]=tagProfile.properties[s];
                });
                _.merge(profile.CS,tagProfile.CS,'all');
                _.merge(profile.CC,tagProfile.CC,'all');

                //if parent exist, replace
                if(tagProfile.parent){
                    //get tag link
                    var clink = tagProfile.parent.children,
                        linkObj = clink['$'+tagProfile.$id],
                        index = _.arr.indexOf(clink,linkObj);
                    tagProfile.parent.boxing().append(profile, linkObj[1]);
                    // set to tag index
                    clink[index] = clink.pop();

                    //detach tag from parent
                    tagProfile.unLink('$parent');
                    delete tagProfile.parent;
                //for _nodes in com
                }else if(com){
                    _.arr.each(com._nodes,function(o,i){
                        if(o===tagProfile){
                            com._nodes[i]=profile;
                            return false;
                        }
                    });
                }

                if(tagProfile.domNode)
                    profile.boxing().renderOnto(tagProfile.domNode);
            }
        }
    });
    Class(u+".Pane", u+".Div",{
        Static:{
            Behaviors:{
                DropableKeys:['KEY']
            }
        }
    });
};
