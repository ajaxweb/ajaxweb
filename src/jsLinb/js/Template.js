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
Class('linb.Template','linb.absProfile',{
    Constructor:function(template,properties,events,domId){
        var self=this;
        self.$id = self.$domId = self.KEY + ':' + (self.serialId=self._pickSerialId()) + ':';
        self.domId = typeof domId == 'string'?domId:self.$domId;
        self._links={};
        self.template={'':[['<div></div>'],[]]};
        self.properties={};
        self.events={};
        self.$template={};
        self.link(self.constructor._cache,'self').link(linb._pool,'linb');
        self.box=self.constructor;
        self.boxing=function(){return this};

        if(template)self.setTemplate(typeof template=='string'?{'':template}:template);
        if(events)self.setEvents(events);
        if(properties)self.setProperties(properties);
        return self;
    },
    Instance : {
        rendered:false,
        __gc:function(){
            //no detach event here. so, don't add event using addEventlis...
            //use innerHTML way only
            //template has no memory leak, ignore it when window.unload
            this.destroy();
        },
        _reg:/^\w[\w_-]*$/,
        getRootNode:function(){
            return this.domNode || (this.domNode=document.getElementById(this.domId));
        },
        setDomId:function(id){
            var t=this, c=linb.cache.dom, reg=t._reg;
            //ensure the value
            if(typeof id== 'string' && reg.test(id) && !document.getElementById(id)){
                //delete the original one
                if(t.domId!=t.$domId)delete c[t.domId];
                //set profile's domId
                t.domId=id;
                //change the domNode id value
                if(t.getRootNode())t.getRootNode().id=id;
                //if doesn't create yet, don't set it to linb.cache:
                if(c[t.$domId])c[id]=t;
            }
            return t;
        },
        destroy:function(){
            var self=this,
                t=linb.cache.domId;
            if(self.domNode){
                var me=this.constructor, c=me.c||(me.c=document.createElement('div'));
                c.appendChild(self.domNode);
                self.domNode=null;
                c.innerHTML='';
            }

            (t[self.KEY] || (t[self.KEY]=[])).push(self.serialId);
            delete linb.cache.dom[self.domId];
            delete linb.cache.dom[self.$domId];
            self.unLinkAll();
            _.breakO(self);
        },
        setEvents:function(key,value){
            var self=this;
            if(typeof key == 'object')
                self.events=key;
            else
                self.events[key]=value;
            return self;
        },
        setTemplate:function(key,value){
            var self=this, t=self.template,$t=self.$template,f=self._buildTemplate,h;
            if(typeof key == 'object'){
                self.template=key;
                h={};
                for(var i in key)
                    h[i]=f(key[i]);
                self.$template=h;
            }else if(typeof value == 'string')
                $t[key]=f(t[key]=value);
            else
                $t['']=f(t['']=key);
            return self;
        },
        setProperties:function(key,value){
            var self=this;
            if(typeof key == 'object')
                self.properties=key;
            else
                self.properties[key]=value;
            return self;
        },
        getItem:function(src){
            if(typeof src=='string')src=document.getElementById(src);
            if(!src)return;
            var id=src.getAttribute('evid'), evkey=src.getAttribute('evkey');
            if(!id || !evkey)return;

            var me=arguments.callee,
                f = me.f || (me.f = function(data, evkey, id){
                    var i,o,j,v;
                    for(j in data){
                        o=data[j];
                        if(o  && o.constructor==Array && (evkey==j||evkey.indexOf((data._evkey||j)+'.')===0))
                            for(i=0;v=o[i];i++){
                                if(v._evkey==evkey&&v.id==id)return v;
                                else if(v=f(v,evkey,id)) return v;
                            }
                    }
                });
            return f(this.properties, evkey, id);
        } ,
        _pickSerialId:function(){
            //get id from cache or id
            var arr = linb.cache.domId[this.KEY];
            if(arr && arr[0])return arr.shift();
            return this.constructor._ctrlId.next();
        },
        render:function(){
            var self=this,
                str = self.toHtml(),
                o;
            if(o=self.getRootNode()){
                var b,r = (b=o.previousSibling)?o.previousSibling:o.parentNode;
                if(linb.browser.gek){
                    o.id='';
                    var range = o.ownerDocument.createRange();
                    range.setStartBefore(o);
                    o.parentNode.replaceChild(range.createContextualFragment(str), o);
                }else
                    o.outerHTML=str;
                if(r)
                    self.domNode = b?r.nextSibling:r.firstChild;
            }else{
                var me=this.constructor, c=me.c||(me.c=document.createElement('div'));
                linb.cache.dom[self.domId]=linb.cache.dom[self.$domId]=this;
                self.rendered=true;
                c.innerHTML = str;
                self.domNode = c.removeChild(c.firstChild);
            }
            return self;
        },
        renderOnto:function(node){
            var id,domNode,style='style',t;
            if(typeof node=='string')node=document.getElementById(node);
            id=node.id||(node.id=_.id());
            domNode=this.domNode;
            node.parentNode.replaceChild(domNode,node);

            if(domNode.tabIndex!=node.tabIndex)
                domNode.tabIndex!=node.tabIndex;
            if(node.className)
                domNode.className += node.className;
            if(linb.browser.ie && (t=node.style.cssText))
                domNode.style.cssText += t+'';
            else if(t=node.getAttribute(style))
                domNode.setAttribute(style, (domNode.getAttribute(style)||'') + t);

            this.setDomId(id);
        },
        toHtml:function(properties){
            return this._doTemplate(properties||this.properties||{});
        },
        _buildTemplate:function(str){
            if(typeof str=='string'){
                var me=arguments.callee,
                reg = me._reg || (me._reg=/([^{}]*)\{([\w]+)\}([^{}]*)/g),
                reg2 = me._reg2 || (me._reg2=/(<[^>]+\[\$e\])([^>]*[>])/g),
                obj=[[],[]],
                a0=obj[0],
                a1=obj[1]
                ;
                str=str.replace(reg2,'$1 evid={id} evkey={_evkey}$2');
                str.replace(reg,function(a,b,c,d){
                    if(b)a0[a0.length]=b;
                    a1[a0.length]=a0[a0.length]=c;
                    if(d)a0[a0.length]=d;
                    return '';
                });
                return obj;
            }else
                return str;
        },
        _getEV:function(id, name, src){
            var evs = this.events,
                evkey = src.getAttribute('evkey'),
                evg = evkey&&evs&&evs[evkey]||evs,
                ev = evg&&evg[name];
            return typeof ev=='function'?[ev]:[];
        },
        _doTemplate:function(properties, tag, result){
            if(!properties)return '';

            var self=this, me=arguments.callee,s,t,n,isA = properties.constructor == Array,
            r1=me.r1||(me.r1=/(\[\$e\])/g),
            r2=me.r2||(me.r2=/(^\s*<\w+)(\s|>)(.*)/),
            template = self.$template,
            temp = template[tag||''],
            r = !result;

            result= result || [];
            if(isA){
                if(typeof temp != 'function')temp = me;
                for(var i=0;t=properties[i++];){
                    t._evkey=tag;
                    temp.call(self, t, tag, result);
                }
            }else{
                if(typeof temp == 'function')
                    temp.call(self, properties, tag, result);
                else{
                    tag = tag?tag+'.':'';
                    var a0=temp[0], a1=temp[1];
                    for(var i=0,l=a0.length;i<l;i++){
                        if(n=a1[i]){
                            if(n in properties){
                                t=properties[n];
                                //if sub template exists
                                if(template[s=tag+n])
                                    me.call(self, t, s, result);
                                else
                                    result[result.length]=t;
                            }
                        }else
                            result[result.length]=a0[i];
                    }
                }
            }
            if(r){
                return result.join('')
                    .replace(r1,  '"return linb.Event(arguments[0],this,0,\'' + self.domId +'\')"')
                    .replace(r2, '$1 id="'+self.domId+'" $2$3');
            }
        },
        serialize:function(){
            var self=this,
                s=_.serialize,
                t=linb.absObj.$specialChars,
                properties = _.isEmpty(self.properties)?null:_.clone(self.properties,function(o,i){return !t[(i+'').charAt(0)]});            
            return 'new linb.Template(' + 
            s(self.template||null) + "," + 
            s(properties) + "," + 
            s(_.isEmpty(self.events)?null:self.events) + "," + 
            s(self.$domId!=self.domId?self.domId:null) + 
            ')';
        }
    },
    Static : {
        getFromDomId:function(id){
            var o=linb.cache.dom[id];
            if(o&&o.boxing)return o.boxing();
        },
        _cache:[],
        _ctrlId : new _.id()
    }
});
