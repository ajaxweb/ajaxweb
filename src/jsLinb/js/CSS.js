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
/* css
*  dependency: base _ ; Class ; linb ;
*/
Class("linb.CSS", null,{
    Static:{
        _r:linb.browser.ie?'rules':'cssRules',
        _baseid:'linb:css:base',
        _firstid:'linb:css:first',
        _lastid:'linb:css:last',
        _createCss:function(id, last){
            var ns=this,
                head=this._getHead(),
                fid=ns._firstid,
                lid=ns._lastid,
                fc,
                c;
            fc=document.createElement('style');
            fc.type="text/css";
            fc.id=id;
            if(!last){
                c= document.getElementById(fid) || head.firstChild;
                while((c=c.nextSibling) && !/^(script|link|style)$/i.test(''+c.tagName));
                if(c)
                    head.insertBefore(fc, c);
                else{
                    if(c= document.getElementById(lid))
                        head.insertBefore(fc, c);
                    else
                        head.appendChild(fc);
                }
            }else
                head.appendChild(fc);
            return fc;
        },
        _getCss:function(id, last){
            return document.getElementById(id) || this._createCss(id, last);
        },
        _getBase:function(){
            return this._getCss(this._baseid);
        },
        _getFirst:function(){
            return this._getCss(this._firstid);
        },
        _getLast:function(){
            return this._getCss(this._lastid, true);
        },
        _getHead:function(){
            return this._head || (this._head=document.getElementsByTagName("head")[0]||document.documentElement);
        },
        _check:function(){
            if(!linb.browser.ie)return;
            var count=0;
            for(var head = this._getHead(),i=0,t=head.childNodes,l;l=t[i++];)
                if(l.type=="text/css" )
                    count++
            return count>20;
        },
        get:function(property, value){
            for(var head = this._getHead(),i=0,t=head.childNodes,l;l=t[i++];)
                if(l.type=="text/css" && property in l && l[property]==value)
                    return l;
            return false;
        },
        //if backOf==true, add to head last node
        //else add to the before position of the base styleSheet
        addStyleSheet:function(txt, id, backOf ){
            var e, ns=this, head = ns._getHead(),add=function(txt,id,backOf){
                var e = document.createElement('style');
                e.type="text/css";
                if(id)e.id=id;
                //for ie
                if(linb.browser.ie)
                    e.styleSheet.cssText = txt||'';
                else
                    try{e.appendChild(document.createTextNode(txt||''))}catch(p){e.styleSheet.cssText = txt||''}
                head.insertBefore(e, backOf  ?ns._getLast():ns._getBase());
                e.disabled=true;
                e.disabled=false;
                return e;
            },merge=function(txt,backOf){
                var e=backOf ?ns._getLast():ns._getBase();
                e.styleSheet.cssText +=txt;
                return e;
            };
            if(id && (id=id.replace(/[^\w\-\_\.\:]/g,'_')) && (e=ns.get('id',id)))
                return e;

            if(ns._check()){
                return merge(txt, backOf);
            }else
                return add(txt,id,backOf);
        },
        //if front==true, add to the before position of the base styleSheet
        //else add to the last postion
        includeLink:function(href, id, front, attr){
            var e, ns=this, head = ns._getHead();
            if(href && (e=ns.get('href',href))){}else{
                e = document.createElement('link');
                e.type = 'text/css';
                e.rel = 'stylesheet';
                e.href = href;
                if(id)
                    e.id=id;
                e.media = 'all';
                _.each(attr,function(o,i){
                    e.setAttribute(i,o);
                });
            }
            head.insertBefore(e, front?ns._getBase():ns._getLast());
            e.disabled=true;
            e.disabled=false;
            return e;
        },
        remove:function(property,value){
            var head = this._getHead();
            if(value=this.get(property,value)){
                value.disabled=true;
                head.removeChild(value);
            }
        },
        replaceLink:function(href, property, oValue, nValue){
            var ns=this,
                head=ns._getHead(),
                attr={},e,v;
            attr[property]=nValue;
            e=ns.includeLink(href,null,false,attr);
            if(v=ns.get(property,oValue))
                head.replaceChild(e,v);
            e.disabled=true;
            e.disabled=false;
        },
        _build:function(selector, value, flag){
            var t='';
            _.each(value,function(o,i){
                t += i.replace(/([A-Z])/g,"-$1").toLowerCase() + ":" + o +";";
            });
            return flag?t:selector+"{" + t + "}";
        },
        //selector: single css exp without ','; not allow '.a, .b{}'
        //  for *** IE *** allow single css exp only
        setStyleRules:function(selector, value, force){
            var ns=this,
                add=true,
                ds=document.styleSheets,
                target, target2, selectorText, bak, h, e, t, _t;
            selector = _.str.trim(selector.replace(/\s+/g,' '));
            if(!(value&&force)){
                bak=selector.toLowerCase();
                _.arr.each(_.toArr(ds),function(o){
                    try{o[ns._r]}catch(e){return}
                    _.arr.each(_.toArr(o[ns._r]),function(v,i){
                        if(!v.selectorText)return;
                        selectorText =  v.selectorText.replace(/\.(\w+)\[CLASS~="\1"\]/g,'.$1')
                                         .replace(/\[ID"([^"]+)"\]/g,'#$1')
                                         .replace(/\*([.#])/g,'$1')
                                         .replace(/\s+/g,' ')
                                         .replace(/\*\|/g,'')
                                         .replace(/(\s*,\s*)/g,',').toLowerCase();
                        /*Notice: in IE, no ',' in any selectorTExt*/
                        _t=_.toArr(selectorText);
                        //null=>remove
                        if(!value){
                            add=false;
                            if(_.arr.indexOf(_t,bak)!=-1 && _t.length>1){
                                _t=_.arr.removeFrom(_t,_.arr.indexOf(_t,bak)).join(',');
                                t=v.cssText.slice(v.cssText.indexOf("{")+1,v.cssText.lastIndexOf("}"));
                                if(o.insertRule)
                                    o.insertRule(_t+"{" + t + "}", o[ns._r].length);
                                else if(o.addRule )
                                    o.addRule(_t, t);
                                if(o.deleteRule)
                                    o.deleteRule(i);
                                else
                                    o.removeRule(i);
                                o.disabled=true;
                                o.disabled=false;
                            }else if(selectorText == bak){
                                if(o.deleteRule)
                                    o.deleteRule(i);
                                else
                                    o.removeRule(i);
                                o.disabled=true;
                                o.disabled=false;
                            }
                        //modify the last one
                        }else{
                            //for single css exp, (all single css exp in IE)
                            if(selectorText==bak){target=v;return false}
                            //for multi css exps, not in IE
                            if(_.arr.indexOf(_t,bak)!=-1){target2=v;return false}
                        }
                    },null,true);
                    if(target){
                        add=false;
                        try{
                            _.each(value,function(o,i){
                                i=i.replace(/(-[a-z])/gi, function(m,a){return a.charAt(1).toUpperCase()});
                                target.style[i]= typeof o=='function'?o(target.style[i]):o;
                            })
                        }catch(e){}
                        o.disabled=true;
                        o.disabled=false;
                        return false;
                    //not in IE
                    }else if(target2){
                        add=false;
                        o.insertRule(ns._build(selector,value), o[ns._r].length);
                        o.disabled=true;
                        o.disabled=false;
                        return false;
                    }
                },null,true);
            }
            //need to add
            if(force || add)
                ns._addRules(selector,value);
            return ns;
        },
        _addRules:function(selector,value){
            var ns=this,
                target=ns._getLast(),
                changed=target.sheet || target.styleSheet;
            if(changed.insertRule)
                changed.insertRule(ns._build(selector,value), changed[ns._r].length);
            else if(changed.addRule )
                changed.addRule(selector, ns._build(selector,value,true));
            target.disabled=true;
            target.disabled=false;
            return ns;
        }
    },
    Initialize:function(){
        var b=linb.browser;
        this.addStyleSheet(""+
            "html{color:#000;background:#FFF;}"+
            "body{cursor:default;font:13px/1.231 arial,helvetica,clean,sans-serif;}"+
            (linb.browser.ie?"body{font-size:small;font:x-small;}":"")+
            "body *{line-height:1.22em;}"+
            "body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td{margin:0;padding:0;}"+
            "table{border-collapse:collapse;border-spacing:0;empty-cells:show;font-size:inherit;font:100%;}"+
            "fieldset,img{border:0;}"+
            "address,caption,cite,code,dfn,em,strong,th,var{font-style:normal;font-weight:normal;}"+
            "ol,ul,li{list-style:none;}"+
            "caption,th{text-align:left;}"+
            "h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal;}"+
            "q:before,q:after{content:'';}"+
            "abbr,acronym {border:0;font-variant:normal;}"+
            "sup {vertical-align:text-top;}"+
            "sub {vertical-align:text-bottom;}"+
            "input,textarea,select{font-family:inherit;font-size:inherit;font-weight:inherit;}"+
            (b.ie?"input,textarea,select{font-size:100%;}":"")+
            "legend{color:#000;}"+
            "del,ins{text-decoration:none;}"+
            "pre,code,kbd,samp,tt{font-family:monospace;"+(b.ie?"font-size:108%;":"")+"line-height:100%;}"+
            "select,input,button,textarea{font:99% arial,helvetica,clean,sans-serif;border-width:1px;}"+

            "a{text-decoration:none;"+(b.gek?"-moz-user-select:none;":"")+"}"+
            "a:hover{color:red}"+
            (b.gek?"a:focus{-moz-outline-offset:-1px !important}":"")+
            "div{font-size:12px;}"+
            "span{"+
            (b.gek?"display:-moz-inline-block;display:-moz-inline-box;display:inline-block;":
                b.ie6?"display:inline-box;display:inline;":"display:inline-block;")+
            (b.ie?"zoom:1;":"")+
            (b.gek3?"":"vertical-align:middle;")+
            "}"+
            "h1{font-size:138.5%;}"+
            "h2{font-size:123.1%;}"+
            "h3{font-size:108%;}"+
            "h1,h2,h3{margin:1em 0;}"+
            "h1,h2,h3,h4,h5,h6,strong {font-weight:bold;}"+
            "em{font-style:italic;}"
        , 'linb.CSS');
    }   
});
