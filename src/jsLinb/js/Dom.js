Class('linb.absProfile',null,{
    Constructor:function(){
        if(!this.$id)this.$id=linb.absProfile.$id.next();
    },
    Instance:{
        getId:function(){
            return this.$id;
        },
        link:function(obj,id,target){
            var self=this,
                //avoid Number;
                uid='$'+self.$id;

            target = target||self;
            if(obj[uid])self.unLink(id);

            //double link
            obj[uid]=target;
            if(obj instanceof Array)obj.push(target);

            //antilink track
            self._links[id]=obj;
            return self;
        },
        unLink:function(id){
            var self=this,
                o,
                //avoid Number;
                uid='$'+self.$id;
            if(!self._links)return;
            if(!(o=self._links[id]))return;

            //remove from target
            if(o instanceof Array)_.arr.removeValue(o,o[uid]);
            delete o[uid];

            //remove from self
            delete self._links[id];

            return self;
        },
        unLinkAll:function(){
            var self=this,
                id='$'+self.$id,
                l=self._links,
                o,i;
            for(i in l){
                o=l[i];
                if(o instanceof Array)_.arr.removeValue(o,o[id]);
                delete o[id];
            }
            self._links={};
            return self;
        }
    },
    Static:{
        $id:new _.id,
        $abstract:true
    }
});
Class('linb.DomProfile', 'linb.absProfile', {
    Constructor:function(domId, domNode){
        arguments.callee.upper.call(this);
        var self=this;
        self.domNode=domNode;
        linb.cache.dom[self.domId=domId]=self;
        self.nodeVars={};
    },
    Instance:{
        __gc:function(){
            var self=this,t;
            if(self.nodeVars&&(t=self.domNode))
                _.each(self.nodeVars,function(o,i){
                    t[i]=null;
                });
            delete linb.cache.dom[self.domId];
            _.breakO(self);
        },
        _getEV:function(id, name){
            var funs=[],t=linb.cache.dom[id];
            if(t&&(t=t.events)&&(t=t[name]))
                for(var i=0,l=t.length;i<l;i++)
                    if(typeof t[t[i]]=='function')
                        funs[funs.length]=t[t[i]];
            return funs;
        }
    },
    Static:{
        get:function(id){
            return linb.cache.dom[id];
        },
        $abstract:true
    }
});

//linb.absBox
Class('linb.absBox',null, {
    Constructor:function(){
        this._nodes=[];
    },
    Before:function(key){
        var t=linb.absBox;
        if(t)(t=t.$type)[key.replace('linb.','')]=t[key]=key;
    },
    Instance:{
        get:function(index){
            var t=this._nodes;
            return  t[index]||t;
        },
        each:function(fun){
            var self=this;
            for(var i=0,j=self._nodes,l=j.length;i<l;i++)
                if(false===fun.call(self,j[i],i))
                    break;
            return self;
        },
        isEmpty:function(){
            return !this._nodes.length;
        },
        merge:function(obj){
            if(this==linb.win||this==linb.doc||this==linb('body'))return this;
            var self=this, c=self.constructor, obj=obj._nodes, i=0, t, n=self._nodes;
            if(obj.length){
                for(;t=obj[i++];)n[n.length]=t;
                self._nodes=c._unique(n);
            }
            return self;
        },
        reBoxing:function(key,ensureValue){
            var self=this, t=linb.absBox.$type[key||'Dom'];
            if(t==self.KEY)return self;
            if(t=linb.SC(t))return t.pack(self._nodes, ensureValue);
        }
    },
    Static:{
        $abstract:true,
        $type:{},
        pack:function(arr, ensureValue){
            var o = new this(false);
            o._nodes = arr ? ensureValue===false ? arr : typeof this._ensureValues=='function'? this._ensureValues(arr) : arr : [];
            return o;
        },
        _unique:function(arr){
            var h={},a=[],i=0,t,m;
            for(;t=arr[i++];){
                m=t.$id;
                if(!h[m]){
                    h[m]=1;
                    a[a.length]=t;
                }
            }
            return a;
        },
        plugIn:function(name, fun){
            this.prototype[name]=fun;
            return this;
        }
    }
});

/*linb.Dom
*/
Class('linb.Dom','linb.absBox',{
    Instance:{
        serialize:function(){
            var a=[];
            this.each(function(o){
                a[a.length]=o.id;
            });
            return "linb(['"+a.join("','")+"'])";
        },
        //Need to consider the cache in linb.cache.dom
        id:function(value, ignoreCache){
            var t,i,cache=linb.cache.dom;
            if(typeof value == 'string')
                return this.each(function(o){
                    if((i=o.id)!==value){
                        if(!ignoreCache&&(t=cache[i])){
                            cache[value] = t;
                            delete cache[i];
                        }
                        o.id=value;
                    }
                });
            else
                return this.get(0).id;
        },

        /*dom collection
        fun: fun to run
        args: arguments for fun
        */
        $sum:function(fun, args){
            var arr=[],r,i;
            this.each(function(o){
                r=fun.apply(o, args||[]);
                if(r){
                    if(r.constructor==Array)
                        for(i=0;o=r[i];i++)
                            arr[arr.length]=o;
                    else
                        arr[arr.length]=r;
                }
            });
            return linb(arr);
        },
        /*get all dir children
        */
        children:function(){
            return this.$sum(function(){
                return _.toArr(this.childNodes)
            });
        },
        /* clone
         deep for clone all children
        */
        clone:function(deep){
            return this.$sum(function(){
                return this.cloneNode(deep?true:false);
            },arguments);
        },
        /* iterator
        // type: left : x-axis,  top :y-axis, xy: x-axis and y-axis
        // dir : true => left to right; top to buttom, false => right to left ; bottom to top
        // inn: does start consider children
         fun : number or function => number is iterator index; function is "return true ->stop"
        */
        $iterator:function(type, dir, inn, fun, top){
            return this.$sum(function(type, dir, inn, fun, top){
                var self=arguments.callee;
                if(typeof fun != 'function'){
                    var count=fun||0;
                    fun = function(n,index){return index==count;}
                }
                var index=0,m,n=this,flag=0,t;
                while(n){
                    if(n.nodeType==1)
                        if(fun(n, index++)===true)break;

                    //x-axis true: right ;false: left
                    if(type=='x')
                        n= dir?n.nextSibling:n.previousSibling;
                    //y-axis true: down ;false: up
                    else if(type=='y')
                        n= dir ? self.call(dir===1?n.lastChild:n.firstChild, 'x',(dir!==1), true, 0, top) : n.parentNode;
                    else{
                        inn=_.isBool(inn)?inn:true;
                        m=null;
                        n= dir ?
                                 (t = inn && n.firstChild ) ? t
                                              : (t = n.nextSibling ) ? t
                                                              :(m=n.parentNode)
                               : (t = inn && n.lastChild) ? t
                                              : (t = n.previousSibling ) ? t
                                                              :(m=n.parentNode);
                        if(m){
                            while(!( m = dir ? n.nextSibling: n.previousSibling)){
                                n=n.parentNode;
                                //to the top node
                                if(!n)
                                    if(flag)
                                        return null;
                                    else{
                                        flag=true;
                                        m = dir ? document.body.firstChild : document.body.lastChild;
                                        break;
                                    }
                            }
                            n=m;
                        }
                        inn=true;
                    }
                }
                return n;
            },arguments);
        },
        /*
        query('div');
        query('div','id');
        query('div','id','a');
        query('div','id',/^a/);
        query('div',function(){return true});
        */
        query:function(tagName, property, expr){
            tagName = tagName||'*';
            var f='getElementsByTagName',
                me=arguments.callee, f1=me.f1||(me.f1=function(tag, attr, expr){
                var all = this[f](tag), arr=[];
                if(expr.test(this[attr]))
                    arr[arr.length]=this;
                for(var o,i=0; o=all[i]; i++)
                    if(expr.test(o[attr]))
                        arr[arr.length]=o;
                return arr;
            }),f2=me.f2||(me.f2=function(tag, attr, expr){
                var all = this[f](tag), arr=[];
                if(this[attr]==expr)
                    arr[arr.length]=this;
                for(var o,i=0; o=all[i]; i++)
                    if(o[attr]==expr)
                        arr[arr.length]=o;
                return arr;
            }),f3=me.f3||(me.f3=function(tag, attr, expr){
                var all = this[f](tag), arr=[];
                if(this[attr])
                    arr[arr.length]=this;
                for(var o,i=0; o=all[i]; i++)
                    if(o[attr])
                        arr[arr.length]=o;
                return arr;
            }),f4=me.f4||(me.f4=function(tag){
                return _.toArr(this[f](tag));
            }),f5=me.f5||(me.f5=function(tag, attr){
                var all = this[f](tag), arr=[];
                if(attr(this))
                    arr[arr.length]=this;
                for(var o,i=0; o=all[i]; i++)
                    if(attr(o))
                        arr[arr.length]=o;
                return arr;
            });
            return this.$sum(property?typeof property=='function'?f5:expr?expr.constructor == RegExp?f1:f2:f3:f4, [tagName, property, expr]);
        },

        /*
        dom add implementation
        for addPrev prepend addNext append
        fun :for wrap
        o: to added target
        flag: false for add one only, not clone
        */
        $add:function(fun,target){
            target=linb(target);
            var v=this.get(0),dom=linb.Dom,cache=linb.cache.dom,uiObj,p;//,s,b,k;
            target.each(function(target){
                //two &&p.LayoutTrigger for performance
                uiObj=(p=target.id)&&(p=cache[p])&&p.LayoutTrigger&&dom.getStyle(v,'display')!='none'&&p.LayoutTrigger;
                //if(uiObj){
                    //s=target.style;
                    //if(s.visibility!='hidden'){
                     //   b=1;
                       // k=s.visibility;
                        //s.visibility='hidden';
                    //}else b=0;
                //}
                //add dom node
                fun.call(v,target);
                if(uiObj){
                    for(var i=0,l=uiObj.length;i<l;i++)
                        uiObj[i].call(p);
                    //if(b)s.visibility=k;
                }
            });
            return this;
        },
        prepend:function(target){
            var temp;
            return this.$add(function(target){
                var self=this;
                if(self.firstChild!=target){
                    if(self.firstChild)
                        self.insertBefore(target, temp||(temp=self.firstChild));
                    else
                        self.appendChild(target);
                }
            },target);
        },
        append:function(target){
            return this.$add(function(target){
                if(this.lastChild!=target)
                    this.appendChild(target);
            },target);
        },
        addPrev:function(target){
            return this.$add(function(target){
                if(this.previousSibling!=target)
                    this.parentNode.insertBefore(target,this);
            },target);
        },
        addNext:function(target){
            var t;
            return this.$add(function(target){
                var self=this;
                if((t=self.nextSibling)!=target){
                    if(t)
                        self.parentNode.insertBefore(target, t);
                    else
                        self.parentNode.appendChild(target);
                }
            },target);
        },

        //flag: false => no remove this from momery(IE)
        replace:function(target, triggerGC){
            target=linb(target);
            var v,i,c=this.get(0),ns=target.get(),l=ns.length;
            if(l>0 && (v=ns[l-1])){
                c.parentNode.replaceChild(v,c);
                for(i=0;i<l-1;i++)
                    v.parentNode.insertBefore(ns[i],v);
                //for memory __gc
                if(triggerGC)
                    this.remove(triggerGC);
            }
            return target;
        },
        swap:function(target){
            var self=this,t = linb.Dom.getEmptyDiv().html('*',false);

            target=linb(target);

            self.replace(t,false);
            target.replace(self,false);
            t.replace(target,false);

            t.get(0).innerHTML='';
            document.body.insertBefore(t.get(0), document.body.firstChild);
            return self;
        },
        //flag : false => remove from dom tree, not free memory
        remove:function(triggerGC){
            var me=arguments.callee,c=me._c||(me._c=document.createElement('div'));
            if(triggerGC===false)
                this.each(function(o,i){
                    if(o.parentNode)o.parentNode.removeChild(o);
                });
            else{
                this.each(function(o){
                    c.appendChild(o);
                });
                c.innerHTML='';
                _.resetRun('dom.__gc', linb.Dom.__gc, 300);
            }
            return this;
        },
        //set innerHTML empty
        //flag = false: no gc
        empty:function(triggerGC){
            return this.each(function(o){
                linb([o]).html('',triggerGC);
            });
        },

        //flag = false: no gc
        html:function(content,triggerGC){
            var s='',t,bak,o=this.get(0);triggerGC=triggerGC!==false;
            if(content!==undefined){
                if(o.nodeType==3)
                    o.nodeValue=content;
                else{
                     if(!(bak=o.firstChild) && content=="")return this;
                     // innerHTML='' in IE, will clear it's childNodes innerHTML
                     if(!triggerGC && linb.browser.ie)while(t=o.firstChild)o.removeChild(t);
                     //clear first
                     if(triggerGC)o.innerHTML='';

                     o.innerHTML=content;
                     // set triggerGC->true will not gc
                     // no original innerHTML will not gc
                     // use resetRun for performance
                     if(triggerGC && bak)
                        _.resetRun('dom.__gc', linb.Dom.__gc, 300);
                }
                return this;
            }else
                return (o.nodeType==3)?o.nodeValue:o.innerHTML;
        },
        outerHTML:function(content, triggerGC){
            var self=this, t,s='', o=self.get(0),id=o.id;
            if(content!==undefined){
                //clear ehandler
                if(o.nodeVars&&(t=o.domNode))
                    _.each(o.nodeVars,function(o,i){
                        t[i]=null;
                    });

                if(linb.browser.gek){
                    var n=self.replace(_.str.toDom(content),false);
                    self._nodes[0]=n.get(0);
                }else{
                    var b,r = (b=o.previousSibling)?o.previousSibling:o.parentNode;
                    o.outerHTML=content;
                    if(r)
                        self._nodes[0] = b?r.nextSibling:r.firstChild;
                }

                //avoid inner nodes memory leak
                linb([o]).remove(triggerGC);
                return self;
            }else{
                if(linb.browser.gek){
                    var dom=linb.Dom, m = dom.getEmptyDiv(), n = dom.getEmptyDiv(2), np=n.parent(), p;
                    //has parentNode, need keep node in this way
                    if(p=o.parentNode)self.replace(n, false);
                    //set to box
                    m.append(o);
                    //get string
                    s = m.html();
                    //set back
                    if(p)n.replace(o, false);
                    m.empty();
                    np.prepend(n);
                    return s;
                }else
                    return o.outerHTML;
            }
        },
        text:function(content){
            if(content!==undefined){
                var self=this, arr=[];
                self.each(function(o){
                    var t=o.childNodes[0];
                     if(t&&t.nodeType!=1)
                        t.nodeValue = content;
                     else
                        arr[arr.length]=o;
                });
                if(arr.length){
                    linb(arr).empty().each(function(o){
                        o.appendChild(document.createTextNode(content));
                    })
                }
                return self;
            }else{
               return (function(o){
                  var i,a=o.childNodes,l=a.length,content='',me=arguments.callee;
                  for(i=0;i<l;i++)
                    if(a[i].nodeType!= 8)
                      content += (a[i].nodeType!=1) ? a[i].nodeValue : me(a[i]);
                  return content;
                })(this.get(0));
            }
        },
        /*
        .attr(name)=>get attr
        .attr(name,value)=>set attr
        .attr(name,null)=>remove attr
        */
        attr:function(name, value){
            //set one time only
            var self=this,
                me = arguments.callee,
                map1 = me.map1 || (me.map1 = {
                    'class':'className',
                    readonly: "readOnly",
                    tabindex: "tabIndex",
                    'for':'htmlFor',
                    maxlength: "maxLength",
                    cellspacing: "cellSpacing",
                    rowspan: "rowSpan",
                    value:'value'
                }),
                map2 = me.map2||(me.map2={
                    href:1,src:1,style:1
                });

            if(typeof name=='object'){
                for(var i in name)
                    me.call(self,i,name[i]);
                return self;
            }

            var iestyle = linb.browser.ie && name=='style',
                normal=!map2[name=map1[name]||name];
            if(value!==undefined){
                return self.each(function(o){
                    //remove attr
                    if(value===null){
                        if(iestyle)o.style.cssText='';
                        else if(normal){
                            try{
                                o[name]=null;
                                if(o.nodeType==1)o.removeAttribute(name)
                            }catch(e){}
                        }
                    //set attr
                    }else{
                        if(iestyle)o.style.cssText=''+value;
                        else if(normal){
                             o[name]=value;
                             if(o.nodeType==1 && typeof value=='string')o.setAttribute(name, value);
                        }else
                            o.setAttribute(name, value);
                    }
                 });
            //get attr
            }else{
                var o=self.get(0);
                if(iestyle) return o.style.cssText;
                if(name=="selected"&&linb.browser.kde) o.parentNode.selectedIndex;
                return ((name in o) && normal)?o[name]:o.getAttribute(name, linb.browser.ie && !normal ? 2 : undefined );
            }
        },
        /*
        name format: 'xxxYxx', not 'xxx-yyy'
        left/top/width/height like, must specify 'px'
        Does't fire onResize onlocation event
        */
        css:function(name, value){
            return (typeof name=='object' || value!==undefined)
                ?
                this.each(function(o){
                    linb.Dom.setStyle(o,name,value)
                })
                :
                linb.Dom.getStyle(this.get(0), name)
        },
        /*
        *IE/opera \r\n will take 2 chars
        *in IE: '/r/n'.lenght is 2, but range.moveEnd/moveStart will take '/r/n' as 1.
        */
        caret:function(begin,end){
            var input =this.get(0), tn=input.tagName, type=typeof begin,ie=linb.browser.ie, pos;
            if(!/^(input|textarea)$/i.test(tn))return this;
            input.focus();
            //set caret
            if(type=='number'){
                if(ie){
                    var r = input.createTextRange();
                    r.collapse(true);
                    r.moveEnd('character', end);
                    r.moveStart('character', begin);
                    r.select();
                }else
                    input.setSelectionRange(begin, end);
                return this;
            //replace text
            }else if(type=='string'){
                    var r=this.caret(),l=0,m=0,ret,
                        v=input.value,
                        reg1=/\r/g;
                    //for IE, minus \r
                    if(ie){
                        l=v.substr(0,r[0]).match(reg1);
                        l=(l && l.length) || 0;
                        m=begin.match(reg1);
                        m=(m && m.length) || 0;
                    }
                    //opera will add \r to \n, automatically
                    if(linb.browser.opr){
                        l=begin.match(/\n/g);
                        l=(l && l.length) || 0;
                        m=begin.match(/\r\n/g);
                        m=(m && m.length) || 0;
                        m=l-m;l=0;
                    }
                    input.value=v.substr(0,r[0])+begin+v.substr(r[1],v.length);
                    ret= r[0] - l + m + begin.length;
                    this.caret(ret,ret);
                    return ret;
            //get caret
            }else{
                if(ie){
                    var r=document.selection.createRange(),
                        txt=r.text,
                        l=txt.length,
                        e,m;
                    if(tn.toLowerCase()=='input'){
                        r.moveStart('character', -input.value.length);
                        e=r.text.length;
                        return [e-l,e];
                    }else{
                    	var rb=r.duplicate();
                    	rb.moveToElementText(input);
                    	rb.setEndPoint('EndToEnd',r);
                    	e=rb.text.length;
                    	return [e-l, e];
                    }
                //firefox opera safari
                }else
                    return [input.selectionStart, input.selectionEnd];
            }
        },
        //left,top format: "23px"
        show:function(left,top){
            var style,t,auto='auto',v=linb.Dom.HIDE_VALUE;
            return this.each(function(o){
                if(o.nodeType != 1)return;
                style=o.style;
                if( t = (top || (style.top==v && (o._top || auto))))style.top = t;
                if( t = (left || (style.left==v && (o._left || auto))))style.left = t;
                if(t=o._position)if(style.position!=t)style.position=t;
                if(style.visibility!='visible')style.visibility='visible';
                //ie6 bug
              /*  if(linb.browser.ie6){
                    t=style.wordWrap=='normal';
                    _.asyRun(function(){
                        style.wordWrap=t?'break-word':'normal'
                    })
                }*/
            });
        },
        hide:function(){
            var style,t;
            return this.each(function(o){
                if(o.nodeType != 1)return;
                style=o.style;t=linb([o]);
                o._position = style.position;
                o._top = style.top;
                o._left = style.left;
                if(style.position!='absolute')style.position = 'absolute';
                style.top = style.left = linb.Dom.HIDE_VALUE;
            });
        },
        cssRegion:function(region,triggerEvent) {
            var self=this
            if(typeof region=='object'){
                var i,t,m,  node=self._nodes[0], dom=linb.Dom, f=dom._setPxStyle,m={};
                for(var j=0,c=dom._boxArr;i=c[j++];)
                    m[i] = ((i in region) && region[i]!==null)?f(node,i,region[i]):false;
                if(triggerEvent){
                    var f=dom.$hasEventHandler;
                    if(f(node,'onsize') && (m.width||m.height))self.onSize(true, {width:m.width,height:m.height});
                    if(f(node,'onlocation') && (m.left||m.top))self.onLocation(true, {left:m.left,top:m.top});
                }
                return self;
            }else{
                var offset=region,parent=triggerEvent,
                    pos = offset?self.offset(null,parent):self.cssPos(),
                    size = self.cssSize();
                return {
                    left:pos.left,
                    top:pos.top,
                    width:size.width,
                    height:size.height
                };
            }
        },
        //for quick size
        cssSize:function(size,triggerEvent) {
            var self=this, node=self._nodes[0],dom=linb.Dom,f=dom._setPxStyle,b1,b2;
           if(size){
                var t;
                b1 = size.width!==null?f(node,'width',size.width):false;
                b2 = size.height!==null?f(node,'height',size.height):false;
                if(triggerEvent && (b1||b2) && dom.$hasEventHandler(node,'onsize'))self.onSize(true, {width:b1,height:b2});
                return self;
            }else
                return { width :self._W(node,1)||0,  height :self._H(node,1)};
        },
        //for quick move
        cssPos:function(pos, triggerEvent){
            var node=this._nodes[0],dom=linb.Dom,f=dom._setPxStyle,b1,b2;
            if(pos){
                var t;
                b1 = pos.left!=null?f(node,'left',pos.left):false;
                b2 = pos.top!==null?f(node,'top',pos.top):false;
                if(triggerEvent && (b1||b2) && dom.$hasEventHandler(node,'onlocation'))this.onLocation(true, {left:b1,top:b2});
                return this;
            }else{
                f=dom.getStyle;
                return {left :parseInt(f(node, 'left'))||0,  top :parseInt(f(node, 'top'))||0};
            }
        },
/*
+--------------------------+
|margin                    |
| #----------------------+ |
| |border                | |
| | +------------------+ | |
| | |padding           | | |
| | | +--------------+ | | |
| | | |   content    | | | |

# is the offset position in jsLinb
*/
        offset:function (pos,boundary){
            var r,t,
            browser = linb.browser,
            ns=this,
            node = ns.get(0),
            keepNode=node,
            parent =node.parentNode,
            op=node.offsetParent,
            doc=node.ownerDocument,
            dd=doc.documentElement,
            db=doc.body,
            _d=/^inline|table.*$/i,
            getStyle=linb.Dom.getStyle,
            fixed = getStyle(node, "position") == "fixed",

            me=arguments.callee,
            add= me.add || (me.add=function(pos, l, t){
                pos.left += parseInt(l,10)||0;
                pos.top += parseInt(t,10)||0;
            }),
            border=me.border || ( me.border = function(node, pos){
                add(pos, getStyle(node,'borderLeftWidth'), getStyle(node,'borderTopWidth'));
            }),
            TTAG=me.TTAG||(me.TTAG={TABLE:1,TD:1,TH:1}),
            HTAG = me.HTAG ||(me.HTAG={BODY:1,HTML:1}),
            posDiff=me.posDiff ||(me.posDiff=function(o,target){
                var cssPos = o.cssPos(),absPos = o.offset(null,target);
                return {left :absPos.left-cssPos.left, top :absPos.top-cssPos.top};
            });

            boundary=boundary?linb(boundary).get(0):doc;

            if(pos){
                //all null, return dir
                if(pos.left===null&&pos.top===null)return ns;
                var d = posDiff(ns,boundary);
                ns.cssPos({left :pos.left===null?null:(pos.left - d.left),  top :pos.top===null?null:(pos.top - d.top)});
                r=ns;
            }else{
                //for IE, firefox3(except document.body)
                if(!(linb.browser.gek && node==document.body) && node.getBoundingClientRect){
                    t = node.getBoundingClientRect();
                    pos = {left :t.left, top :t.top};
                    if(boundary.nodeType==1)
                        add(pos, -(t=boundary.getBoundingClientRect()).left+boundary.scrollLeft, -t.top+boundary.scrollTop);
                    else
                        add(pos, Math.max(dd.scrollLeft, db.scrollLeft)-dd.clientLeft, Math.max(dd.scrollTop,  db.scrollTop)-dd.clientTop);
                }else{
                    pos = {left :0, top :0};
                    add(pos, node.offsetLeft, node.offsetTop );
                    //get offset, stop by boundary or boundary.offsetParent
                    while(op && op!=boundary && op!=boundary.offsetParent){
                        add(pos, op.offsetLeft, op.offsetTop);
                        if(browser.kde || (browser.gek && !TTAG[op.tagName]))
                            border(op, pos);
                        if ( !fixed && getStyle(op,"position")== "fixed")
                            fixed = true;
                        if(op.tagName!='BODY')
                            keepNode=op.tagName=='BODY'?keepNode:op;
                        op = op.offsetParent;
                    }

                    //get scroll offset, stop by boundary
                    while (parent && parent.tagName && parent!=boundary && !HTAG[parent.tagName]){
                        if(!_d.test(getStyle(parent, "display")) )
                            add(pos, -parent.scrollLeft, -parent.scrollTop );
                        if(browser.gek && getStyle(parent,"overflow")!= "visible" )
                            border(parent,pos);
                        parent = parent.parentNode;
                    }
                    if((browser.gek && getStyle(keepNode,"position")!="absolute"))
                        add(pos, -db.offsetLeft, -db.offsetTop);
                    if(fixed)
                        add(pos, Math.max(dd.scrollLeft, db.scrollLeft), Math.max(dd.scrollTop,  db.scrollTop));
                }
                r=pos;
            }
            return r;
        },

//class and src
        hasClass:function(name){
            var arr = this.get(0).className.split(/\s+/);
            return _.arr.indexOf(arr,name)!=-1;
        },
        addClass:function(name){
            var arr, t, me=arguments.callee,reg=(me.reg||(me.reg=/\s+/));
            return this.each(function(o){
                arr = (t=o.className).split(reg);
                if(_.arr.indexOf(arr,name)==-1)
                    o.className = t + " " +name;
            });
        },
        removeClass:function(name){
            var arr, i,l,a, t, bs=typeof name=='string', me=arguments.callee,reg=(me.reg||(me.reg=/\s+/));
            return this.each(function(o){
                arr = o.className.split(reg);
                l=arr.length;
                a=[];
                for(i=0;t=arr[i];i++)
                    if(bs?(t!=name):(!name.test(String(t))))
                        a[a.length]=t;
                if(l!=a.length)o.className=a.join(' ');
            });
        },
        replaceClass:function(regexp,replace){
            var n,r;
            return this.each(function(o){
                r = (n=o.className).replace(regexp, replace);
                if(n!=r)o.className=r;
            });
        },
        tagClass:function(tag, isAdd){
            var self=this,
                me=arguments.callee,
                r1=me["_r1_"+tag]||(me["_r1_"+tag]=new RegExp("([-\\w]+" + tag + "[-\\w]*)")),
                r2=me["_r2"]||(me["_r2"]=/([-\w]+)/g);
            self.removeClass(r1);
            return (false===isAdd)? self : self.replaceClass(r2, '$1 $1' + tag);
        },
//events:
        /*
        $addEvent('onClick',fun,'idforthisclick';)
        $addEvent([['onClick',fun,'idforthisclick'],[...]...])

        will
            add onclick to dom
            add onclick to dom attribute
            append fun to linb.cache.dom.id.events.onClick array
            append 'onclick' to linb.cache.dom.id.add array
        */
        _ajustType:function(o,type){return (window===o||document===o) && type=="onsize" ? "onresize" :type},
        $addEventHandler:function(name, flag){
            var id,
                c,
                event=linb.Event,
                type='on'+event._getEventType(name),
                f=event.$eventhandler,
                fs=event.$EVENTHANDLER,
                fi=event.getId,
                _a=this._ajustType;

            return this.each(function(o){
                if(o.nodeType==3)return;
                id=fi(o);
                if(!id)id=o.id=_.id();
                type=_a(o,type);
                if(flag===false){
                    //for before innerHTML
                    if(o.setAttribute)o.setAttribute(type, fs);
                }else{
                    //if exists
                    if(o[type])return;
                    o[type]=f;
                }
                if(!(c = linb.DomProfile.get(id)))
                    c =new linb.DomProfile(id,o);
                (c.nodeVars||(c.nodeVars={}))[type]=fs;
            });
        },
        $removeEventHandler:function(name){
            var type='on'+linb.Event._getEventType(name),_a=this._ajustType;
            return this.each(function(o){
                type=_a(o,type);
               if(o[type])o[type]=null;
               if(o.getAttribute && o.getAttribute(type))o.removeAttribute(type);
            });
        },
        $addEvent:function(name, fun, label, index){
            var self=this,c,t,id,type,fi=linb.Event.getId,dom=linb.cache.dom,event=linb.Event,arv=_.arr.removeValue,ari=_.arr.insertAny;
            if(!(name  instanceof Array))
                name=[[name,fun,label]];
            if(!index && index!==0)index=-1;

            _.arr.each(name,function(o,i){
                name=o[0];fun=o[1];label=o[2];
                if(typeof label=='string')
                    label="$"+label;
                else label=undefined;

                self.$addEventHandler(name).each(function(o){
                    if(o.nodeType==3)return;
                    id=fi(o);
                    if(!id)id=o.id=_.id();

                    c = dom[id];

                    t = c.events || (c.events = {});
                    c = t[name] || (t[name]=[]);

                    //if no label input, clear all, and add a single
                    if(label===undefined){
                        c.length=0;c=t[name]=[];
                        index=-1;
                        label='_';
                    }
                    c[label]=fun;
                    arv(c,label);
                    if(index==-1)c[c.length]=label;
                    else
                        ari(c,label, index);

                    if(t=(c=dom[id]).clearCache)t.call(c);
                });
            });
            return self;
        },
        /*
        $removeEvent('onClick','idforthisclick')
        $removeEvent('onClick')
            will remove all onClick in linb.cache.dom.id.events.
        $removeEvent('onClick',null,true)
            will remove all onClick/beforeClick/afterClick in linb.cache.dom.id.events.
        */
        $removeEvent:function(name, label, flag){
            var self=this,c,t,k,id,i,type,fi=linb.Event.getId,dom=linb.cache.dom,event=linb.Event;
            if(!(name instanceof Array))
                name=[[name,label]];

            _.arr.each(name,function(o,i){
                name=o[0];label=o[1];
                type=event._getEventType(name);
                self.each(function(o){
                    if(!(id=fi(o)))return;

                    if(!(c=dom[id]))return;
                    if(!(t=c.events))return;
                    if(flag)
                        _.arr.each(event._getEventName(type),function(o){
                            delete t[o];
                        });
                    else{
                        if(typeof label == 'string'){
                            label='$'+label;
                            if(k=t[name]){
                                if(_.arr.indexOf(k,label)!=-1)
                                    _.arr.removeValue(k,label);
                                delete k[label];
                            }
                        }else
                            delete t[name];
                    }
                    if(t=(c=dom[id]).clearCache)t.call(c);
// Removes events handler too:
//                    if(_.isEmpty(t) || flag){
//                        o[linb.Dom._ajustType(o,"on"+type)]=null;
//                        delete c.nodeVars["on"+type];
//                    }
                });
            });
            return self;
        },
        $getEvent:function(name, label){
            var id;
            if(!(id=linb.Event.getId(this.get(0))))return;

            if(label)
                return _.get(linb.cache.dom,[id,'events',name,'$' + label]);
            else{
                var r=[],arr = _.get(linb.cache.dom,[id,'events',name]);
                _.arr.each(arr,function(o,i){
                    r[r.length]=[o,arr[o]];
                });
                return r;
            }
        },
        $clearEventHandler:function(){
            return this.each(function(o){
                _.arr.each(linb.Event._events,function(s){
                   if(o[s="on"+s])o[s]=null;
                   if(o.getAttribute && o.getAttribute(s))o.removeAttribute(s);
                });
            });
        },
        $clearEvent:function(){
            this.$clearEventHandler();
            return this.each(function(o){
                var id,c;
                if(!(id=linb.Event.getId(o)))return;
                if(!(c=linb.cache.dom[id]))return;
                _.filter(c.nodeVars, function(i,v){
                    if(_.str.startWith(v,"on"))return false;
                });
                _.breakO(c.events,2);
                delete c.events;
            });
        },
        $fireEvent:function(name, args){
            var type=linb.Event._getEventType(name),
            t,s='on'+type,
            me=arguments.callee,
            f=linb.Event.$eventhandler,
            f1=me.f1||(me.f1=function(){this.returnValue=false}),
            f2=me.f2||(me.f2=function(){this.cancelBubble=true}),
            _a=this._ajustType;

            args= args || {};
            return this.each(function(o){
                s=_a(o,s);
                //for no standard events, like onDrag
                if(typeof o[s]!='function'){
                    if(!o[s] && !(o.getAttribute && o.getAttribute(s)))
                        return;
                     o[s] = f;
                }
                _.merge(args,{
                    type: type,
                    target: o,
                    button : 1,
                    $e:true,
                    $name:name,
                    preventDefault:f1,
                    stopPropagation:f2
                },'all');

                if('blur'==type || 'focus'==type)
                    //try{
                        o[type].call(o,args);
                    //}catch(e){}
                else
                   o[s].call(o,args);
            });
        },

//functions
        $canFocus:function(){
            var me=arguments.callee, getStyle=linb.Dom.getStyle, map = me.map || (me.map={a:1,input:1,select:1,textarea:1,button:1}),t,node;
            return !!(
                (node = this._nodes[0]) &&
                node.focus &&
                //IE bug: It can't be focused with 'default tabIndex 0'; but if you set it to 0, it can be focused.
                //So, for cross browser, don't set tabIndex to 0
                (((t=map[node.tagName.toLowerCase()]) && !(parseInt(node.tabIndex)<=-1)) || (!t && parseInt(node.tabIndex)>=(linb.browser.ie?1:0))) &&
                getStyle(node,'display')!='none' &&
                getStyle(node,'visibility')!='hidden' &&
                node.offsetWidth>0 &&
                node.offsetHeight>0
            );
        },
        focus:function(force){
            var ns=this;
            if(force || ns.$canFocus())
                try{ns.get(0).focus()}catch(e){}
            return ns;
        },
        setSelectable:function(value){
            var me=arguments.callee, _f = me._f || (me._f=function(){return false});
             return this.each(function(o){
                if(linb.browser.gek)
                    o.style.MozUserSelect=value?"all":"none"
                else{
                    o.unselectable=value?"off":"on";
                    o.onselectstart=value?null:_f;
                }
            })
        },
        setInlineBlock:function(){
            var ns=this;
            if(linb.browser.gek)
                ns.css('display','-moz-inline-block').css('display','-moz-inline-box').css('display','inline-block');
            else
                ns.css('display','inline-block');
            return ns;
        },
        topZindex:function(flag){
            //set the minimum to 1000
            var i=1000, j=0, k, node = this.get(0), p = node.offsetParent, t, o;
            if(node.nodeType !=1 || !p)return 1;

            t=p.childNodes;
            for(k=0;o=t[k];k++){
                if(o==node || o.nodeType !=1 || o.style.display=='none' || o.style.visibility=='hidden' || o.zIndexIgnore)continue;
                j = parseInt(o.style && o.style.zIndex) || 0 ;
                i=i>j?i:j;
            }
            i++;
            if(i>=linb.Dom.TOP_ZINDEX)
                linb.Dom.TOP_ZINDEX =i+1000;

            if(flag)
                 node.style.zIndex = i;
            else{
                j = parseInt(node.style.zIndex) || 0;
                return i>j?i:j;
            }
            return this;
        },
        /*
        dir:true for next, false for prev
        inn:true for include the inner node
        set:true for give focus
        */
        nextFocus:function(downwards, includeChild, setFocus){
            downwards=_.isBool(downwards)?downwards:true;
            var self=this.get(0),node = this.$iterator('',downwards,includeChild,function(node){return node!==self && linb([node]).$canFocus()});
            if(!node.isEmpty() && setFocus!==false)node.focus();
            return node;
        },

        /*
        args:{
            with:[0,100],
            height:[0,100],
            left:[0,100]
            top:[0,100]
            opacity:[0,1],
            backgroundColor:['#ffffff','#000000']
            scrollTop:[0,100]
            scrollLeft:[0,100]
            fontSize:[12,18]
        }
        */
        animate: function(args, onStart, onEnd, time, step, type, threadid){
            var me=arguments.callee,
            hash = me.lib ||  (me.lib = {
                line:function(x){return x},
                inexp:function(x){return (x==0)?0:Math.pow(2,10*(x-1))},
                outexp:function(x){return (x==1)?1:-Math.pow(2,-10*x)+1},
                insine:function(x){return -1*Math.cos(x*(Math.PI/2))+1},
                outsine:function(x){return Math.sin(x*(Math.PI/2))},
                inoutsine:function(x){return -1/2*(Math.cos(Math.PI*x)-1)}
            }),
            color = me.color || (me.color = function(type, args, step, j){
                var f,fun,value = 0 + (100-0)*hash[type](j/step), from = args[0], to = args[1];

                if(typeof from !='string' || typeof to != 'string')return '#fff';
                if(value<0)
                    return from;
                else if(value>100)
                    return to;

                f=function(str){
                    return (str.charAt(0)!='#')?('#'+str):str;
                };
                from=f(from);to=f(to);

                f=function(str, i, j){
                    return parseInt(str.slice(i,j),16)||0;
                };
                fun=function(o){
                    return {red:f(o,1,3),green:f(o,3,5),blue:f(o,5,7)}
                };
                from = fun(from);to = fun(to);

                f=function(from, to, value,c){
                    var r= from[c]+Math.round((value/100)*(to[c]-from[c]));
                    return (r < 16 ? '0' : '') + r.toString(16)
                };
                return '#' + f(from,to, value, 'red') + f(from,to, value, 'green') + f(from,to, value, 'blue');
            });

            time = time||100;
            step = step||5;
            type = hash[type]!==undefined?type:'inexp';

            var self=this, count=0,
                funs=[function(threadid){
                    //try{
                       // if(++count > step)throw new Error;
                        if(++count > step){
                            linb.Thread(threadid).abort();
                            return false;
                        }
                        _.each(args,function(o,i){
                            if(typeof o == 'function') o(hash[type](count/step));
                            else{
                                var value = String( _.str.endWith(i.toLowerCase(),'color') ? color(type, o, step, count) : (o[0] + (o[1]-o[0])*hash[type](count/step)));
                                (self[i]) ? (self[i](value)) :(self.css(i, value));
                            }
                        });
                    //}catch(e){
                    //    linb.Thread(threadid).abort();
                    //    color=hash=null;
                   // }
                }];
            return linb.Thread(threadid||_.id(), funs, Math.max(time/step-9,0), null, onStart, onEnd ,true);
        },
        /*
        pos: {left:,top:} or domNode
        parent:parent node
        type:1,2,3,4
        */
        popToTop : function(pos, type, parent){
            var region, target=this,  t;

            parent=linb(parent);
            if(parent.isEmpty())parent=linb('body');

            //prepare
            target.css({position:'absolute',left:linb.Dom.HIDE_VALUE, top:linb.Dom.HIDE_VALUE,display:'block', zIndex:linb.Dom.TOP_ZINDEX});

            if(pos['linb.Dom'] || pos.nodeType){
                type = (type || 1).toString();
                var node=linb(pos),
                    //base region
                    abspos = node.offset(null, parent);
                region = {
                    left:abspos.left,
                    top:abspos.top,
                    width:node.offsetWidth(),
                    height:node.offsetHeight()
                };
             }else{
                type = type?'3':'0';
                t=type=='0'?0:8;
                region = pos.region || {
                    left:pos.left-t,
                    top:pos.top-t,
                    width:t*2,
                    height:t*2
                };
            }
            pos={left :0, top :0};

            //window edge
            var t=linb.win, box = {};
            box.left=t.scrollLeft();
            box.top=t.scrollTop();
            box.width =t.width()+box.left;
            box.height =t.height()+box.top;
/*
type:1
    +------------------+    +------------------+
    |        3         |    |        4         |
    +--------------+---+    +---+--------------+
    |              |            |              |
    |              |            |              |
    +--------------+---+    +---+--------------+
    |        1         |    |        2         |
    +------------------+    +------------------+
type:2
                         +---+              +---+
                         |   |              |   |
+---+--------------+---+ |   +--------------+   |
|   |              |   | | 3 |              | 4 |
| 2 |              | 1 | |   |              |   |
|   +--------------+   | +---+--------------+---+
|   |              |   |
+---+              +---+
type:3
                         +---+              +---+
                         | 3 |              | 4 |
    +--------------+     +---+--------------+---+
    |              |         |              |
    |              |         |              |
+---+--------------+---+     +--------------+
| 2 |              | 1 |
+---+              +---+
type:4
                     +------------------+
                     | 3                |
+--------------+---+ |   +--------------+ +----+--------------+ +--------------+----+
|              |   | |   |              | |    |              | |              |    |
|              |   | |   |              | |    |              | |              |    |
+--------------+   | +---+--------------+ |    +--------------+ +--------------+    |
|                1 |                      |  2                | |               4   |
+------------------+                      +-------------------- +-------------------+
*/

            //target size
            var w = target.offsetWidth(), h = target.offsetHeight(),
                hi,wi;
            switch(type){
                case '1':
                    hi=false;wi=true;
                break;
                case '2':
                    hi=true;wi=false;
                break;
                case '3':
                    hi=false;wi=false;
                break;
                case '4':
                    hi=wi=true;
                break;
            }

            if(hi){
                if(region.top + h < box.height)
                    pos.top=region.top;
                else
                    pos.top=region.top+region.height-h;
            }else{
                if(region.top + region.height + h < box.height)
                    pos.top=region.top + region.height;
                else
                    pos.top=region.top - h;
            }
            if(wi){
                if(region.left + w < box.width)
                    pos.left=region.left;
                else
                    pos.left=region.left+region.width-w;
            }else{
                if(region.left + region.width + w < box.width)
                    pos.left=region.left + region.width;
                else
                    pos.left=region.left - w;
            }

            //over right
            if(pos.left + w>  box.width)pos.left = box.width - w;
            //over left
            if(pos.left < box.left)pos.left = box.left;
            //over bottom
            if(pos.top + h>  box.height)pos.top = box.height - h;
            //over top
            if(pos.top < box.top)pos.top = box.top;
            //show
            target.cssPos(pos).css({visibility:'visible',display:'block'});

            //ensure show target on the top of the other elements with the same zindex
            parent.get(0).appendChild(target.get(0))

            return this;
        },
        //for remove obj when blur
        setBlurTrigger : function(id, trigger, group){
            var ns=this,
                doc=document,
                sid='$blur_triggers$',
                target = linb(group?group:ns.get()),
                fun=linb.Dom._blurTrigger||(linb.Dom._blurTrigger=function(p,e){
                    var me=arguments.callee,
                        p=linb.Event.getPos(e),
                        arr=me.arr,
                        a=_.copy(arr),
                        b, pos, w, h, v;
                    //filter first
                    _.arr.each(a,function(i){
                        b=true;
                        if(!(v=arr[i].target))b=false;
                        else
                            v.each(function(o){
                                if(!linb.Dom.byId(o.id))
                                    return b=false;
                            });
                        if(!b){
                            _.arr.removeValue(arr,i);
                            delete arr[i];
                        };
                    });
                    a=_.copy(arr);
                    _.arr.each(a,function(i){
                        v=arr[i];
                        b=true;
                        v.target.each(function(o){
                            if(o.parentNode && (w=o.offsetWidth) && (h=o.offsetHeight)){
                                pos=linb([o]).offset();
                                if(p.left>=pos.left && p.top>=pos.top && p.left<=(pos.left+w) && p.top<=(pos.top+h))
                                    return b=false;
                            }
                        });
                        if(b){
                            _.tryF(v.trigger,[],v.target);
                            _.arr.removeValue(arr,i);
                            delete arr[i];
                        }else
                            //if the top layer popwnd cant be triggerred, prevent the other layer popwnd trigger
                            return false;
                    },null,true);
                    a.length=0;
                }),
                arr=fun.arr||(fun.arr=[]);
            if(!doc.onmousedown)doc.onmousedown=linb.Event.$eventhandler;
            target.each(function(o){if(!o.id)o.id=_.id()});
            //remove this trigger
            if(!trigger){
                _.arr.removeValue(arr,id);
                delete arr[id];
            //double link
            }else
                if(arr[id]){
                    _.arr.removeValue(arr,id);
                    delete arr[id];
                }
                arr[id]={
                    trigger:trigger,
                    target:target
                };
                arr.push(id);
            return this;
        },
        //for firefox disappeared cursor bug in input/textarea
        $firfox2:function(){
            if(!linb.browser.gek2)return this;
            var ns=this;
            ns.css('overflow','hidden');
            _.asyRun(function(){ns.css('overflow','auto')});
            return ns;
        },
        //IE not trigger dimension change, when change height only in overflow=visible.
        ieRemedy:function(){
            if(linb.browser.ie){
                var self=this;
                _.asyRun(function(){self.css('wordWrap','break-word')});
                _.asyRun(function(){self.css('wordWrap','normal');});
            }
            return this;
        },
        //for ie6
        fixPng:function(type){
            if(linb.browser.ie6)
                return this.each(function(n){
                    if(n.tagName=='IMG'){
                        n.style.height = n.height;
                        n.style.width = n.width;
                        n.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + n.src + "',sizingMethod='"+type+"')";
                        n.src = linb.ini.file_bg;
                    }
                });
        }
        /*,
        gekRemedy:function(){
            if(linb.browser.gek)
                return this.each(function(o,i){
                    if(i=o.style){
                        var b=i.zIndex||0;
                        i.zIndex=++b;
                        i.zIndex=b;
                    }
                });
        }*/
    },
    Static:{
        HIDE_VALUE : '-10000px',
        TOP_ZINDEX:10000,

        _boxArr:_.toArr('width,height,left,top,right,bottom'),
        _cursor:{},

        __gc:function(){
            var i,o,t,w,cache=linb.cache.dom,bak=[];
            for(i in cache){
                 o=cache[i];
                 if(!o)continue;
                 t=o.domNode;
                 if(window===t||document===t||document.body===t)continue;
                 if(!document.getElementById(o.domId)){
                     if(t)t.$id=null;
                     o.__gc();
                     //clear the cache
                     bak[bak.length]=i;
                     //clear the cache shadow
                     if(o.$domId && o.$domId!=o.domId)
                        bak[bak.length]=o.$domId;
                 }
             }
             for(i=0;i<bak.length;)
                 delete cache[bak[i++]];
             if(linb.browser.ie6)CollectGarbage();
        },
        $linbid:0,
        _map:{
            'html':1,
            'head':1,
            'body':1
        },
        _ff:function(n){return document.getElementsByTagName(n)[0]},
        _ensureValues:function(obj){
            var t,i,a,map=this._map,fun=this._ff,
            //can't be obj, or opera will crash
            arr = window===obj ? [window] :
                    document===obj ? [obj] :
                    obj.constructor == Array ? obj :
                    obj['linb.Dom'] ? obj._nodes :
                    obj._toDomElems?obj._toDomElems():
                    typeof obj == 'function' ? obj() :
                    typeof obj!='string' ? [obj] :
                    obj.charAt(0)=='{' ? linb.SC(obj.slice(1,obj.length-1)).getAll().reBoxing()._nodes :
                    [obj]
            ;
            //for performance
            //Can't input mix value
            if(arr[0] && !arr[0].nodeType){
                a=[];
                //can't be e, or opera will crash
                for(i=0;i<arr.length;i++)
                    if( t = typeof (t=arr[i])=='string' ? map[t]? fun(t):document.getElementById(t) : t ? t.nodeType ? t : (t['linb.UIProfile']||t['linb.Template']) ? t.domNode ? t.domNode : (t.boxing().render() && t.domNode) : t===window ? t : 0 : 0)
                        a[a.length]=t;
            }else
                a=arr;
            for(i=0;t=a[i++];)
                if(t.nodeType==1){
//                    if(!t.id)t.id=_.id();
                    if(!t.$id)t.$id='$'+this.$linbid++;
                }
            return a.length<=1?a:this._unique(a);
        },
        getStyle:function(node, name){
            if(node.nodeType != 1)return '';

            var value,b;
            if(name=='opacity' && linb.browser.ie)
                b = name = 'filter';

            value= node.style[name];
            if(!value){
                var me = arguments.callee,t,
                map = me.map || (me.map = {'float':1,'cssFloat':1,'styleFloat':1}),
                c1 = me._c1 || (me._c1={}),
                c2 = me._c2 || (me._c2={}),
                name = c1[name] || (c1[name] = name.replace(/\-(\w)/g, function(a,b){return b.toUpperCase()})),
                name2 = c2[name] || (c2[name] = name.replace(/([A-Z])/g, "-$1" ).toLowerCase())
                ;
                if(map[name])
                    name = linb.browser.ie?"styleFloat":"cssFloat";
                //document.defaultView first, for opera 9.0
                value = ((t=document.defaultView) && t.getComputedStyle)?(t=t.getComputedStyle(node,null))?t.getPropertyValue(name2):'':(node.currentStyle&&(node.currentStyle[name]||node.currentStyle[name2]));
/*
                if(linb.browser.opr){
                    var map2 = me.map2 || (me.map2={left:1,top:1,right:1,bottom:1});
                    if(map2[name] && (linb.Dom.getStyle(node,'position')=='static'))
                        value = 'auto';
                }
*/
            }
            return b?value?(parseFloat(value.match(/alpha\(opacity=(.*)\)/)[1] )||0)/100:1:(value||'');
        },
        setStyle:function(node, name , value){
            if(node.nodeType != 1)return;
            if(typeof name == 'string'){
                var me=this.getStyle,
                c1 = me._c1 || (me._c1={}),
                r1 = me._r1 || (me._r1=/alpha\([^\)]*\)/ig);
                name = c1[name] || (c1[name] = name.replace(/\-(\w)/g, function(a,b){return b.toUpperCase()}));
                if(name=='opacity'){
                    value=parseFloat(value)||0;
                    value= value >0.9999 ? '' : linb.browser.ie ? "alpha(opacity="+ 100*value +")" : value;
                    if(linb.browser.ie){
                        node.zoom=1;
                        name='filter';
                        value = node.style.filter.replace(r1, "") + value;
                    }
                }
                node.style[name]=value;
            }else
                for(var i in name)
                    arguments.callee.call(this,node, i, name[i]);
        },
        _setPxStyle:function(node, key, value){
            if(node.nodeType != 1)return false;
            var style=node.style;
            if(value || value===0){
                value = ((''+parseFloat(value))==(''+value)) ? (parseInt(value)||0) + "px" : value +'';
                if((key=='width'||key=='height') && value.charAt(0)=='-')value='0';
                if(style[key]!=value){
                    style[key]=value;
                    return true;
                }
            }return false;
        },
        _matrixid:"linb.matrix::",
        /* Get available DOM matrix(a special empty DOM div)
         sequence: Number, sequence number. Default is 1;
            e.g. 2 => get the second available matrix
        */
        getEmptyDiv:function(sequence){
            var i=1,id,style,o,t,count=0,doc=document,body=doc.body,ini=function(o){
                o.id=id;
                linb([o]).attr('style','position:absolute;visibility:hidden;overflow:visible;left:'+linb.Dom.HIDE_VALUE+';top:'+linb.Dom.HIDE_VALUE+';');
            };
            sequence=sequence || 1;
            while(1){
                id = this._matrixid + i;
                //don't remove this {
                if(o=linb.Dom.byId(id)){
                    //Using firstChild, for performance
                    if(!o.firstChild && ++count == sequence)
                        return linb([o]);
                }else{
                    o=doc.createElement('div');
                    ini(o,id);
                    if(body.firstChild)
                        body.insertBefore(o, body.firstChild);
                    else
                        body.appendChild(o);
                    return linb([o]);
                }
                i++;
            }
        },
        setCover:function(visible,label){
            // get or create first
            var me=arguments.callee,
                id="linb.temp:cover:",
                id2="linb.temp:message:",
                content = typeof visible=='string'?visible:'',
                o1,o2;

            if((o1=linb(id)).isEmpty()){
                linb('body').prepend(o1=linb.create('<div id="'+ id +'" style="position:absolute;display:none;left:0;top:0;background-image:url('+linb.ini.file_bg+')"><div id="'+id2+'" style="position:absolute;font-size:12px"></div></div>'));
                o1.get(0).zIndexIgnore=1;
            }
            o2=linb(id2);

            //clear
            if(!visible){
                if(typeof me._label =='string' && me._label!==label)
                    return;
                if(me._showed){
                    o2.empty(false);
                    o1.css({zIndex:0,cursor:'',display:'none'});
                    me._showed=false;
                }
                delete me._label;
            }else{
                if(typeof label=='string')me._label=label;
                var t = linb.win;
                if(!me._showed){
                    o1.css({zIndex:linb.Dom.TOP_ZINDEX*2,display:'',width:t.scrollWidth()+'px',height:t.scrollHeight()+'px',cursor:'wait'});
                    me._showed=true;
                }
                //show content
                if(content){
                    o2.css({left :t.scrollLeft()+t.width()/2+'px', top: t.scrollTop()+t.height()/2+'px'});
                    o2.html(content +'',false);
                }
            }
        },

        byId:function(id){
            return  document.getElementById(id||"");
        },
        $hasEventHandler:function(node, name){
            return !!(node[name] || (node.getAttribute && node.getAttribute(name)));
        },
        /*
        action: uri
        data:hash{key:value}
        method:'post'(default) or 'get'
        target: uri target: _blank etc.
        */
        submit:function(action, data, method, target, enctype){
            data=_.isHash(data)?data:{};method=method||'get';action=action||'';target=target||'_blank';
            var _t=[];
            _.each(data,function(o,i){
                _t.push('<textarea name="'+i+'">'+(typeof o=='object'?_.serialize(o):o)+'</textarea>');
            });
            if(!_.isEmpty(data))_t.push('<input type="hidden" name="rnd" value="'+_()+'">');
            var d=_.str.toDom('<form target="'+target+'" action="'+action+'" method="'+method  + (enctype?'" enctype="' +enctype:'') +  '">'+_t.join('')+'</form>');
            linb.Dom.getEmptyDiv().append(d);
            d.get(0).submit();
            d.remove();
        },
        busy:function(label){
            linb.Dom.setCover(true,label);
        },
        free:function(label){
           linb.Dom.setCover(false,label);
        },
        animate:function(css, args, onStart, onEnd, time, step, type, threadid){
            var node = document.createElement('div');
            _.merge(css,{position:'absolute', left:this.HIDE_VALUE, zIndex:this.TOP_ZINDEX+10});
            linb.Dom.setStyle(node, css);
            document.body.appendChild(node);
            return linb([node]).animate(args, onStart, function(){
                _.tryF(onEnd);
                if(node.parentNode)
                    node.parentNode.removeChild(node);
            }, time, step, type, threadid);
        },
        //plugin event function to linb.Dom
        $enableEvents:function(name){
            if(!(name instanceof Array))name=[name];
            var self=this,f;
            _.arr.each(name,function(o){
                f=function(fun, label, flag){
                    if(typeof fun  == 'function')
                        return this.$addEvent(o, fun, label, flag);
                    else if(fun===null)
                        return this.$removeEvent(o, label, flag);
                    var args = arguments[1] || {};
                    args.$all = (arguments[0]===true);
                    return this.$fireEvent(o, args)
                };
                f.$event$=1;
                self.plugIn(o, f)
            });
        }
    },
    After:function(d){
        var self=this;
       //getter
        _.each({ parent:['y',false], prev:['x',false], next:['x',true], first:['y',true], last:['y',1]},function(o,i){
            self.plugIn(i, function(index){
                return this.$iterator(o[0], o[1], true, index || 1)
            });
        });

        //readonly profile
        _.arr.each(_.toArr('offsetLeft,offsetTop,scrollWidth,scrollHeight'),function(o){
            self.plugIn(o,function(){
                var t=this.get(0),w=window,d=document;
                if(t==w||t==d){
                    if("scrollWidth"==o||"scrollHeight"==o){
                        var a=d.documentElement,b=d.body;
                        return Math.max(a[o], b[o]);
                    }else
                        t = linb.browser.contentBox ? d.documentElement : d.body;
                }
                return t[o];
            })
        });

        var p='padding',m='margin',b='border',c='inner',o='offset',r='outer',w='width',h='height',W='Width',H='Height',T='Top',L='Left',t='top',l='left',R='Right',B='Bottom';
        //dimesion
        _.arr.each([['_'+p+'H',p+T,p+B],
            ['_'+p+'W',p+L,p+R],
            ['_'+b+'H',b+T+W,b+B+W],
            ['_'+b+'W',b+L+W,b+R+W],
            ['_'+m+'W',m+L,m+R],
            ['_'+m+'H',m+T,m+B]
        ],function(o){
            //use get Style dir
            var node,fun=linb.Dom.getStyle;
            self.plugIn(o[0],function(){
                node = this.get(0);
                return (parseInt(fun(node, o[1])) + parseInt(fun(node, o[2]))) || 0;
            })
        });
        /*
        get W/H for

        1:width
        2:innerWidth
        3:offsetWidth
        4:outerWidth

        content-box
        +--------------------------+
        |margin                    |
        | +----------------------+ |
        | |border                | |
        | | +------------------+ | |
        | | |padding           | | |
        | | | +--------------+ | | |
        | | | |   content    | | | |
        |-|-|-|--------------|-|-|-|
        | | | |<-css width ->| | | |
        | | |<-  innerWidth  ->| | |
        | |<--  offsetWidth   -->| |
        |<--    outerWidth      -->|

        border-box
        +--------------------------+
        |margin                    |
        | +----------------------+ |
        | |border                | |
        | | +------------------+ | |
        | | |padding           | | |
        | | | +--------------+ | | |
        | | | |   content    | | | |
        |-|-|-|--------------|-|-|-|
        | | |<-   css width  ->| | |
        | | |<-  innerWidth  ->| | |
        | |<--  offsetWidth   -->| |
        |<--    outerWidth      -->|
        */

        _.arr.each([['_W',w, '_'+p+'W', '_'+b+'W', '_'+m+'W', c+W, o+W],
        ['_H',h, '_'+p+'H', '_'+b+'H', '_'+m+'H', c+H, o+H]],function(o){
            self.plugIn(o[0],function(node,index,value){
                var n,r,t,style=node.style,me=arguments.callee,contentBox=linb.browser.contentBox,
                r1=me.r1 || (me.r1=/%$/),
                getStyle=linb.Dom.getStyle,
                f=linb.Dom._setPxStyle,type=typeof value,t1;
                if(type=='undefined' || type=='boolean'){
                    if(value===true){
                        n=(getStyle(node,'display')=='none');
                        if(n){
                            var temp = linb.Dom.getEmptyDiv().html('*',false);
                            linb([node]).swap(temp);
                            var b,p,d;
                            b = style.visibility,p = style.position,d = style.display; p=p||'';b=b||'';d=d||'';
                            style.visibility = 'hidden'; style.position ='absolute';style.display = 'block';
                        }
                    }
                    switch(index){
                        case 1:
                            r=getStyle(node,o[1]);
                            if(isNaN(parseInt(r)) || r1.test(r))
                                r = me(node,2) - (contentBox?linb([node])[o[2]]():0);
                            r=parseInt(r)||0;
                            break;
                        case 2:
                            r=node[o[6]]-linb([node])[o[3]]();
                            break;
                        case 3:
                            //for in firefox, offsetHeight/Width's bad performance
                            //if(node._bp)
                            //    r=node['_'+o[6]];
                            //else{
                            //    t1=_();
                                r=node[o[6]];
                            //    if(_()-t1>60){
                            //        node['_'+o[6]]=r;
                            //        node._bp=1;
                            //    }
                            //}
                            if(!r)
                                //get from css setting before css applied
                                r=me(node,1)+(contentBox?(t=linb([node]))[o[2]]():0)+t[o[3]]();
                            break;
                        case 4:
                            r=me(node,3);
                            r+=linb([node])[o[4]]();
                            break;
                    }
                    if(n){
                        style.display = d; style.position = p;style.visibility = b;
                        linb([node]).swap(temp);
                        temp.empty(false);
                    }
                    return parseInt(r)||0;
                }else{
                    switch(index){
                        case 1:
                            if(f(node, o[1], value))
                                if(linb.Dom.$hasEventHandler(node,'onsize')){
                                    var args={};args[o[1]]=1;
                                    linb([node]).onSize(true, args);
                                }
                            break;
                        case 2:
                            me(node, 1, value - (contentBox?linb([node])[o[2]]():0));
                            break;
                        case 3:
                            //back value for offsetHeight/offsetWidth slowly
                            me(node, 1, value - (t=linb([node]))[o[3]]() - (contentBox?t[o[2]]():0));
                            break;
                        case 4:
                            me(node, 1, value - (t=linb([node]))[o[4]]() - t[o[3]]() - (contentBox?t[o[2]]():0));
                            break;
                    }
                    //if(node._bp)
                    //    node['_'+o[6]]=null;
                }
            })
        });
        _.arr.each([[c+W,'_W',2],[o+W,'_W',3],[r+W,'_W',4],
         [c+H,'_H',2],[o+H,'_H',3],[r+H,'_H',4]],function(o){
            self.plugIn(o[0],function(value){
                var type=typeof value;
                if(type=='undefined' || type=='boolean')
                    return this[o[1]](this.get(0), o[2]);
                else
                    return this.each(function(v){
                        this[o[1]](v, o[2],value);
                    });
            })
        });
        _.arr.each([[l+'By',l],[t+'By',t],[w+'By',w],[h+'By',h]],function(o){
            self.plugIn(o[0],function(offset,triggerEvent){
                if(offset===0)return this;
                var m,args,k=o[1],fun=linb.Dom.getStyle;
                return this.each(function(node){
                    m=fun(node,k);
                    m=(parseInt(m)||0)+offset;
                    if(k=='width'||k=='height')m=m>0?m:0;
                    node.style[k]=m+'px';
                    if(triggerEvent){
                        args={};args[k]=1;
                        var f=linb.Dom.$hasEventHandler;
                        if((k=='left' || k=='top')&& f(node,'onlocation'))
                            linb([node]).onLocation(true, args);
                        if((k=='width' || k=='height')&& f(node,'onsize')){
                            linb([node]).onSize(true, args);
                        }
                    }
                },this)
            });
        });
        _.arr.each(['scrollLeft','scrollTop'],function(o){
            self.plugIn(o,function(value){
                if(value !==undefined)
                    return this.each(function(v){
                        v[o]=value;
                    });
                else{
                    var v=this.get(0);
                    if(v===window || v===document){
                        var a=document.documentElement,b=document.body;
                        if("scrollTop"==o)return window.pageYOffset || Math.max(a[o], b[o]);
                        if("scrollLeft"==o)return window.pageXOffset || Math.max(a[o], b[o]);
                    }
                    return v[o];
                }
            })
        });
        _.arr.each('width,height,left,top'.split(','),function(o){
            self.plugIn(o,function(value){
                var self=this, node=self._nodes[0],b=linb.browser,type=typeof value,doc=document,t;
                if(!node || node.nodeType==3)return;
                if(type=='undefined'||type=='boolean'){
                    if((o=='width' && (t='Width'))||(o=='height' && (t='Height'))){
                        if(doc===node)return Math.max( doc.body['scroll'+t], doc.body['offset'+t], doc.documentElement['scroll'+t], doc.documentElement['offset'+t]);
                        if(window===node)return b.opr?(doc.body['client'+t]||window['inner'+t]):b.kde?window['inner'+t]:(linb.browser.contentBox && doc.documentElement['client'+t]) ||doc.body['client'+t];
                    }
                    //give shortcut
                    if(o=='width')value=parseInt(node.style.width)||self._W(node,1,value);
                    else if(o=='height')value=parseInt(node.style.height)||self._H(node,1,value);
                    else
                        value = linb.Dom.getStyle(node, o);
                    return value=='auto'?value:(parseInt(value)||0);
                }else{
                    var f=linb.Dom._setPxStyle,t,a;
                    return self.each(function(v){
                        if(v.nodeType!=1)return;
                            if(v.style[o]!==value){
                                if(o=='width')self._W(v,1,value);
                                else if(o=='height')self._H(v,1,value);
                                else{
                                    if(f(v, o, value))
                                        if((o=='top' || o=='left') && linb.Dom.$hasEventHandler(node,'onlocation')){
                                            a={};a[o]=1;
                                            linb([v]).onLocation(true, a);
                                        }
                                }
                            }
                    });
                }
            });
        });

        //linb.Dom event
        _.arr.each(linb.Event._events,function(o){
            _.arr.each(linb.Event._getEventName(o),function(o){
                self.$enableEvents(o);
            })
        });
    },
    Initialize:function(){
        linb.win=linb([window]);
        linb.doc=linb([document]);
        linb.$inlineBlock=linb.browser.gek?['-moz-inline-block', '-moz-inline-box','inline-block'] : linb.browser.ie6? ['inline-block', 'inline'] : 'inline-block',
        //hot keys
        linb.doc.onKeydown(function(p,e){
            var event=linb.Event,set,
                ks=event.$keyboard=event.getKey(e);
            if(ks){
                if(ks[0].length==1)ks[0]=ks[0].toLowerCase();
                set = linb.cache.hookKey[ks.join(":")];
                //if hot function return false, stop bubble
                if(set)
//                    try{
                        if(_.tryF(set[0],set[1],set[2])===false){
                            event.stopBubble(e);
                            return false;
                        }
//                    }catch(e){}
            }
            return true;
        },"document")
        .onKeyup(function(p,e){
            delete linb.Event.$keyboard;
        },"document");

        //free memory
        linb.win.afterUnload(function(){
            //unlink link 'App'
            linb.SC.__gc();
            linb.Thread.__gc();
            linb([window, document]).$clearEvent();
            linb('body').empty();
            linb.Dom.__gc();
            _.breakO([linb,Class,_],3);
            window.Class=window.linb=window._=undefined;
        },"window",-1);
    }
});