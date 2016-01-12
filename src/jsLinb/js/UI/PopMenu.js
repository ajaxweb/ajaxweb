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
Class("linb.UI.PopMenu",["linb.UI.Widget","linb.absList"],{
    Instance:{
        _adjustSize:function(){
            this.each(function(profile){
                var
                root = profile.root,
                items = profile.getSubNode('ITEMS'),
                border = profile.getSubNode('BORDER'),
                size1 = root.cssSize(),
                size2 = border.cssSize(),
                pro=profile.properties,
                h = Math.min(pro._maxHeight, items.height() + size1.height - size2.height+1),
                w = Math.min(pro._maxWidth, items.width() + size1.width - size2.width+1)
                ;

                pro.width=w;
                pro.height=h;
                //set size first, for adding shadow later
                root.cssSize({width:w,height:h});

                //avoid blazing(shadow elements) when resize the border
                linb.UI.$tryResize(profile,w,h,null,true);
                if(pro.shadow){
                    profile.$noS=true;
                    var ins=profile.boxing();
                    if(ins._shadow)
                        ins._shadow(true);
                 }
            });
            return this._setScroll();
        },
        _setScroll:function(){
            return this.each(function(profile){
                var
                o=profile.getSubNode('ITEMS'),
                t=o.offsetTop(),
                h=o.offsetHeight(),
                b = profile.getSubNode('BORDER'),
                hh=b.offsetHeight();
                profile.getSubNode('TOP').css('display',t===0?'none':'block');
                profile.getSubNode('BOTTOM').css('display',(hh>h+t)?'none':'block');
            })
        },
        _scrollToBottom:function(){
            return this.each(function(profile){
                var o = profile.getSubNode('ITEMS'),
                border = profile.getSubNode('BORDER'),
                y = o.offsetTop(),
                offset,
                h = o.offsetHeight(),
                b=false,
                bh = border.height();
                if(bh<h+y){
                    if(!profile.$scrollStep)profile.$scrollStep=1;

                    if(profile.$scrollStep<30)
                        profile.$scrollStep = profile.$scrollStep*1.1;

                    y -= profile.$scrollStep;
                    if(bh>h+y){
                        y=bh-h;
                        b=true;
                    }
                    o.top(y);
                    if(b){
                        profile.getSubNode('BOTTOM').css('display','none');
                        profile.$scrollTobottom=false;
                        profile.$scrollStep=null;
                    }else{
                        profile.getSubNode('TOP').css('display','block');
                        if(profile.$scrollTobottom)
                            _.asyRun(arguments.callee, 0, [profile], this);
                    }
                }
            });
        },
        _scrollToTop:function(){
            return this.each(function(profile){
                var o = profile.getSubNode('ITEMS'),
                y = o.offsetTop(),
                b=false;

                if(y<0){
                    if(!profile.$scrollStep)profile.$scrollStep=1;

                    if(profile.$scrollStep<10)
                        profile.$scrollStep = profile.$scrollStep*1.03;

                    y += profile.$scrollStep;
                    if(y>=-1){
                        y=0;
                        b=true;
                    }
                    o.top(y);
                    if(b){
                        profile.getSubNode('TOP').css('display','none');
                        profile.$scrollToTop=false;
                        profile.$scrollStep=null;
                    }else{
                        profile.getSubNode('BOTTOM').css('display','block');
                        if(profile.$scrollToTop)
                            _.asyRun(arguments.callee, 0, [profile], this);
                    }
                }
            });
        },
        pop:function(obj, type, parent){
            var profile=this.get(0);
            //ensure rendered
            if(!profile.rendered){
                var o=profile.boxing().render(true);
                //LayoutTrigger
                linb.Dom.getEmptyDiv().append(o);
            }
            var root = profile.root;

            //clear highLight first
            if(profile.$highLight)
                linb([profile.$highLight]).tagClass('-mouseover',false);
            profile._conainer=parent;

            root.popToTop(obj, type, parent);

            var f=function(){
                var p=arguments.callee.profile;
                p.boxing().hide();
                p.$popGrp.length=0;
            };
            f.profile=profile;

            if(!profile.$popGrp || !profile.$popGrp.length){
                profile.$popGrp = [root.get(0)];
                //group blur trigger
                root.setBlurTrigger(profile.$id, null);
                root.setBlurTrigger(profile.$id, f, profile.$popGrp);
            }
            return this;
        },
        hide:function(triggerEvent){
            var t,
                profile=this.get(0),
                root=profile.root,
                sms='$subPopMenuShowed',
                cm='$childPopMenu';

            if(false!==triggerEvent)
                if(false===profile.boxing().beforeHide(profile))
                    return this;

            if(!root || root.css('display')=='none')return;

            //remove trigger
            root.setBlurTrigger(profile.$id,null);

            if(profile.$hideMenuPool)
                profile.$hideMenuPool.append(root);
            else
                root.css('display','none');

            //hide all parent pop
            var p=profile[cm],q;
            if(t=profile[sms])t.hide();
            while(p){
                p.boxing().hide();
                p=(q=p)[cm];
                q[cm] = q[sms] = null;
            }
            profile[cm]=profile[sms]=null;
            if(t=profile.$parentPopMenu)t[sms]=null;

            _.arr.removeValue(profile.$popGrp,root.get(0));

            if(false!==triggerEvent)
                profile.boxing().onHide(profile);
            return this;
        }
    },
    Initialize:function(){
        //modify default template fro shell
        var t = this.getTemplate();
        _.merge(t.FRAME.BORDER,{
             TOP:{},
             BOTTOM:{},
             BOX:{
                tagName:'div',
                 ITEMS:{
                    tagName:'div',
                    className:'{itemClass}',
                    style:'{itemStyle}',
                    text:"{items}"
                 }
             },
             POOL:{
                tagName : 'div',
                style:'display:none;'
             }
        },'all');
        t.$dynamic = {
            'items':function(profile,template,v,tag,result){
                var t;
                tag = tag+'.'+v.type;
                //for linb.UI or linb.Template
                if(t=v.object){
                    //[v] is for linb.Template
                    result[result.length]=t.build(v);
                }else{
                    if(template[tag])
                        linb.UI.$doTemplate(profile,template,v,tag,result);
                }
             },
            'items.split':{
                ITEMSPLIT:{
                    tagName : 'a'
                }
            },
            'items.button':{
                ITEM:{
                    tagName : 'a',
                    href :linb.$href,
                    tabindex: 1,
                    className: '{cls} {disabled}',
                    ICON:{
                        style:'background:url({image}) transparent  no-repeat {imagePos};',
                        className:'ui-icon',
                        $order:0
                    },
                    CAPTION:{
                        text : '{caption}',
                        $order:1
                    },
                    RULER:{
                        style:'{displayAdd}',
                        $order:2
                    },
                    ADD:{
                        tagName : 'div',
                        style:'{displayAdd}',
                        text : '{add}',
                        $order:2
                    },
                    SUB:{style:'{tagClass}'}
                }
            },
            'items.checkbox':{
                ITEM:{
                    tagName : 'a',
                    href :linb.$href,
                    tabindex: 1,
                    className: '{cls}',
                    CHECKBOX:{
                        $order:0,
                         className:'ui-icon {checkboxCls}'
                    },
                    CAPTION:{
                        text : '{caption}',
                        $order:1
                    },
                    RULER:{
                        style:'{displayAdd}',
                        $order:2
                    },
                    ADD:{
                        tagName : 'div',
                        style:'{displayAdd}',
                        text : '{add}',
                        $order:2
                    }
                }
            }
        };
        this.setTemplate(t);
    },
    Static:{
        $noDomRoot:true,
        Appearances:{
            KEY:{
                'font-size':'12px',
                visibility:'hidden'
            },
            BORDER:{
                border:'1px solid',
                'border-color':'#FFF #ACA899 #ACA899 #FFF'
            },
            BOX:{
                'background-color':'#EBEADB',
                overflow:'hidden',
                position:'absolute',
                left:0,
                top:0,
                'font-size':'12px',
                'z-index':'3'
            },
            ITEMS:{
                position:'absolute',
                top:0,
                left:0,
                overflow:'visible',
                background: linb.UI.$bg('bg.gif', ' repeat-y left top')
            },
            ITEM:{
                display:'block',
                position:'relative',
                overflow:'visible',
                'white-space': 'nowrap',
                color:'#000',
                'font-family': '"Verdana", "Helvetica", "sans-serif"',
                cursor:'pointer',
                padding:'2px 20px 2px 2px'
            },
            ITEMSPLIT:{
                display:'block',
                position:'relative',
                overflow:'visible',
                'white-space': 'nowrap',
                'font-size':'1px',
                'line-height':'1px',
                padding:'1px',
                margin:'2px 2px 2px 26px',
                background: linb.UI.$bg('hsplit.gif', ' repeat-x left top', true)
            },
            'ITEM-mouseover':{
                $order:1,
                'background-color':'#B6BDD2'
            },
            'ITEM-checked':{
                $order:2,
                'background-color':'#B6BDD2'
            },
            CHECKBOX:{
               background: linb.UI.$bg('cmds.gif', ' no-repeat -112px 1px', true),
               margin:0
            },
            ICON:{
                margin:0
            },
            'CHECKBOX-checked':{
               $order:1,
               background: linb.UI.$bg('cmds.gif', ' no-repeat -96px 1px', true)
            },
            TOP:{
                cursor:'pointer',
                display:'none',
                position:'absolute',
                'margin-left':'-8px',
                right:0,
                height:'16px',
                width:'16px',
                'z-index':'10',
                top:0,
                background: linb.UI.$bg('icon.gif', ' no-repeat -33px 0', true)
            },
            BOTTOM:{
                cursor:'pointer',
                display:'none',
                position:'absolute',
                'margin-left':'-8px',
                right:0,
                height:'16px',
                width:'16px',
                'z-index':'10',
                bottom:0,
                background: linb.UI.$bg('icon.gif', ' no-repeat -33px -17px', true)
            },
            'CHECKBOX, CHECKBOX-checked':{
                cursor:'pointer',
                'vertical-align':'middle',
                width:'16px',
                height:'16px'
            },
            CAPTION:{
                'vertical-align':'middle',
                'padding-left':'6px'
            },
            RULER:{
                width:'100px',
                'font-size':0,
                'line-height':0
            },
            ADD:{
                position:'absolute',
                top:'3px',
                right:0,
                width:'80px',
                'padding-right':'20px',
                'text-align':'right',
                'z-index':'10'
            },
            SUB:{
                position:'absolute',
                top:'4px',
                right:0,
                width:'8px',
                height:'16px',
                background: linb.UI.$bg('icon.gif', ' no-repeat left -16px', true)
            }
        },
        Behaviors:{
            ITEM:{
                onMouseover:function(profile, e, src){
                    var sms='$subPopMenuShowed',
                        all='$allPops',
                        hl='$highLight',
                        showp='$showpops',
                        popgrp='$popGrp';
                    //for stop second trigger by focus event
                    if(profile[hl] == src)return;

                    var properties = profile.properties,
                        item = profile.getItemByDom(src),
                        itemId = item.id,
                        Cancel = false,
                        pop,popp,t;
                    //if sub pop menu showed
                    if(t=profile[sms]){
                        //if the showed menu is self
                        if(t == _.get(profile,[all,itemId]))
                            Cancel=true;
                        else{
                            t.hide();
                            profile[sms] = null;
                        }
                    }
                    if(!Cancel){
                        if(t=profile[hl])
                            linb([t]).tagClass( '-mouseover',false);
                        profile[hl] = src;
                        linb([src]).tagClass('-mouseover');
                        //don't fire events here
                        try{src.focus()}catch(e){}
                    }

                    if(!Cancel && item.sub){
                        if(item.sub.constructor==Array && item.sub.length){
                            profile[all] = profile[all] || {};

                            //no create
                            if(!(pop = profile[all][itemId])){
                                pop = (new linb.UI.PopMenu({position:'absolute', items:item.sub, autoHide:profile.properties.autoHide})).render(true);
                                pop.onMenuSelected(function(pro, item, src){
                                    profile.boxing().onMenuSelected(profile, item, src);
                                });
                                popp=pop.get(0);
                                //set pool to parent
                                popp.$hideMenuPool = profile.$hideMenuPool || profile.getSubNode('POOL');

                                profile[all][itemId] = pop;

                                //collect
                                profile[showp] = profile[showp] || [profile];
                                popp[showp] = profile[showp];
                                profile[showp].push(popp);
                            }else popp=pop.get(0);

                            //input a copy of root for group trigger
                            profile[popgrp].push(popp.root.get(0));
                            popp[popgrp] = profile[popgrp];

                            //set parent pop
                            popp.$parentPopMenu = profile;
                            profile.$childPopMenu = popp;

                            pop.pop(src, 2);
                            profile[sms] = pop;
                        }else
                            if(profile.onShowSubMenu){
                                var r=profile['$sub:'+item.id];
                                if(r && r['linb.UI'] && !r.isEmpty()){}
                                else
                                    r=profile.boxing().onShowSubMenu(profile, item, src);
                                if(r && r['linb.UI'] && !r.isEmpty()){
                                    profile[sms] = r;
                                    r=r.reBoxing();
                                    r.onMouseout(function(p,e,src){
                                        profile.box._mouseout(profile, e, src);
                                    },null,-1);
                                    profile[popgrp].push(r.get(0));

                                    r.popToTop(src,2,profile._conainer);
                                }
                            }
                    }
                },
                onMouseout:function(profile, e, src){
                    var properties = profile.properties,
                        item = profile.getItemByDom(src),
                        itemId = item.id,
                        action = true,
                        t;
                    //if cursor move to submenu, keep the hover face
                    if(t=profile.$subPopMenuShowed){
                        var node = e.toElement||e.relatedTarget,
                            target = t.get(0).root.get(0);
                        try{
                            do{
                                if(node==target)
                                    return;
                            }while((node && (node=node.parentNode)))
                        }catch(a){}
                    }
                    linb([src]).tagClass('-mouseover',false);
                    profile.$highLight = null;
                },
                onClick:function(profile, e, src){
                    var prop = profile.properties,
                        item = profile.getItemByDom(src),
                        itemId = item.id;
                    if(prop.disabled || item.disabled)return false;

                    if(!item.sub){
                        if(item.type=='checkbox')
                            profile.getSubNodeByItemId('CHECKBOX',item.id).tagClass('-checked', item.value = !item.value);

                        if(profile.onMenuSelected)profile.boxing().onMenuSelected(profile, item, src);

                        if(prop.hideAfterClick){
                            linb([src]).tagClass('-mouseover',false);
                            //hide all parent pop
                            _.asyRun(function(){
                                var p=profile,q;
                                while(p){
                                    p.boxing().hide();
                                    p=(q=p).$parentPopMenu;
                                    q.$parentPopMenu = q.$subPopMenuShowed = null;
                                }
                                //reset
                                profile.$subPopMenuShowed = null;
                                profile.$popGrp.length=0;
                            },100);
                        }
                    }
                    return false;
                },
                onFocus:function(profile, e, src){
                    var box = profile.getSubNode('BOX'),
                        top=box.scrollTop(), h=box.scrollHeight(),
                        n = linb([src]).offsetTop();

                    if(n<top || n>top+h)
                        linb(src).offsetTop(top);

                    linb(src).onMouseover();
                },
                onKeydown : function(profile, e, src){
                    var item = profile.getItemByDom(src),
                        items = profile.properties.items,
                        key = linb.Event.getKey(e)[0],
                        itemId = item.id,
                        flag,r,tid,node,t;

                    switch(key){
                        case 'up':
                            r=true;
                            flag=false;
                            _.arr.each(items,function(o,i){
                                if(o.type == 'split')return;
                                if(flag){
                                    tid=o.id;
                                    return r=false;
                                }
                                if(o.id == itemId)flag=true;
                            },null,true);
                            //last
                            if(r)tid=items[items.length-1].id;
                            node = profile.getSubNodeByItemId('ITEM', tid).get(0);
                            break;
                        case 'down':
                            r=true;
                            flag=false;
                            _.arr.each(items,function(o,i){
                                if(o.type == 'split')return;
                                if(flag){
                                    tid=o.id;
                                    return r=false;
                                }
                                if(o.id == itemId)flag=true;
                            });
                            //first
                            if(r)tid=items[0].id;
                            node = profile.getSubNodeByItemId('ITEM', tid).get(0);
                            break;
                        case 'left':
                            if(t=profile.$parentPopMenu){
                                if(t=profile.$parentPopMenu.$highLight)
                                    node = t;
                            }
                            break;
                        case 'right':
                            if((t=profile.$subPopMenuShowed) && t == profile.$allPops[itemId])
                                t.activate();
                            break;
                    }
                     if(node&&node.tagName)try{node.focus()}catch(e){}
                }
            },
            TOP:{
                onMouseover:function(profile, e, src){
                    profile.$scrollToTop=true;
                    profile.boxing()._scrollToTop();
                },
                onMouseout:function(profile, e, src){
                    profile.$scrollToTop=false;
                    profile.$scrollStep=null;
                },
                onClick:function(profile, e, src){
                    profile.$scrollStep=1000;
                }
            },
            BOTTOM:{
                onMouseover:function(profile, e, src){
                    profile.$scrollTobottom=true;
                    profile.boxing()._scrollToBottom();
                },
                onMouseout:function(profile, e, src){
                    profile.$scrollTobottom=false;
                    profile.$scrollStep=null;
                },
                onClick:function(profile, e, src){
                    profile.$scrollStep=1000;
                }
            },
            ITEMS:{
                beforeKeydown:function(profile, e){
                    var key=linb.Event.getKey(e)[0];
                    if(key=='tab' || key=='enter')
                        return true;
                    else if(key=='esc'){
                        //top
                        do{
                            profile.boxing().hide();
                        }while(profile = profile.$parentPopMenu)

                        return false;
                    }else return false;
                }
            },
            BORDER:{
                onMouseout:function(profile, e, src){
                    profile.box._mouseout(profile, e, src);
                }
            }
        },
        DataModel:({
            dock:null,
            tabindex:null,
            tips:null,
            border:null,
            resizer:null,

            $fix:true,

            shadow:true,
            _maxHeight:260,
            _maxWidth:300,
            left:-10000,

            hideAfterClick:true,

            autoHide:false,

            height:100,
            //opera needs more space for initialize
            width:300,
            position:'absolute',
            $border:1
        }),
        EventHandlers:{
            onShowSubMenu:function(profile, item, src){},
            beforeHide:function(profile){},
            onHide:function(profile){},
            onMenuSelected:function(profile, item, src){}
        },
        RenderTrigger:function(){
            this.boxing()._adjustSize();
        },
        _mouseout:function(profile, e, src){
            if(profile.properties.autoHide){
                var p1=linb.Event.getPos(e),
                    size, p2, b;
                _.arr.each(profile.$popGrp,function(o){
                    o=linb([o]);
                    p2=o.offset();
                    size=o.cssSize();
                    if(p1.left>p2.left && p1.top>p2.top && p1.left<p2.left+size.width && p1.top<p2.top+size.height)
                        return b=1;
                });
                if(!b){
                    while(b=profile.$parentPopMenu)profile=b;
                    profile.boxing().hide();
                    profile.$popGrp.length=0;
                }
            }
        },
        _prepareItem:function(profile, item){
            item.add = item.add || '';
            item.displayAdd = item.add?'':'display:none';
            item.tagClass = item.sub?'':'display:none';

            item.type=item.type||'button';
            if(item.type=='checkbox'){
                item.checkboxCls =profile.getClass('CHECKBOX', item.value?'-checked':'');
            }
        },

        _onresize:function(profile,width,height){
            var size = arguments.callee.upper.apply(this,arguments);
            profile.getSubNode('BOX').cssSize(size);
        }
    }
});
