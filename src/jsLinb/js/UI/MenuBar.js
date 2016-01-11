Class("linb.UI.MenuBar",["linb.UI","linb.absList" ],{
    Instance:{
        _pop:function(id,src){
            var menu, 
                self=this,
                profile=self.get(0),
                pro=profile.properties,
                all='$allPops';
            //hide first
            if(profile.$curPop)self.hide();

            linb([src]).tagClass('-mousedown');

            profile[all] = profile[all] || {};
            if(!(menu = profile[all][id])){
                var item=profile.getItemByItemId(id),
                    sub = item.sub;
                sub  = sub ||[];

                menu = linb.create('PopMenu',{position:'absolute', items:sub, autoHide:!!pro.autoShowTime});
                profile.getSubNode('POOL').append(menu);

                menu.onHide(function(pro){
                    self.hide(false);
                }).onMenuSelected(function(pro, item, src){
                    return profile.boxing().onMenuSelected(profile, pro, item, src);
                }).onShowSubMenu(function(pro, item, src){
                    return profile.boxing().onShowSubMenu(profile, pro, item, src);
                });
                menu.get(0).$hideMenuPool = profile.getSubNode('POOL');
                menu.get(0)[all] = profile[all];

                profile[all][id] = menu;
            }
            var target = linb(src);
            menu.pop(target, 1, linb(pro.parentID));

            profile.$curPop=id;
            profile.$curElem=src;
        },
        _afterInsertItems:function(){
            this.clearPopCache();
        },
        hide:function(){
            var profile=this.get(0),menu,
            id = profile.$curPop,
            node = profile.$curElem;

            if(menu = profile.$allPops[id]){
                //To avoid trigger recursive call
                if(false!==arguments[0])
                    menu.hide(false);
                // collect
                profile.getSubNode('POOL').append(menu.reBoxing());
                linb([node]).tagClass('-mousedown',false);
            }
            profile.$menuPop=profile.$curPop=profile.$curElem=null;
        },
        clearPopCache:function(){
            var profile=this.get(0);
            profile.getSubNode('POOL').empty();
            profile.$allPops=profile.$curPop=profile.$curElem=null;
        }
    },
    Initialize:function(){
        linb.SC('linb.UI.PopMenu');
    },
    Static:{
        Templates:{
            tagName:'div',
            POOL:{
                tagName:'div'
            },
            BORDER:{
                tagName:'div',
                LIST:{
                    tagName:'div',
                    HANDLER:{
                        style:'{handler}'
                    },
                    ITEMS:{
                        $order:1,
                        text:"{items}"
                    }
                }
            },
            $dynamic:{
                items:{
                    ITEM:{
                        tagName:'a',
                        href :linb.$href,
                        tabindex: '{_tabindex}',
                        className:' {typeCls} ',
                        ICON:{
                            $order:1,
                            className:'ui-icon',
                            style:'background:url({image}) transparent no-repeat  {imagePos}; {iconDisplay}'
                        },
                        CAPTION:{
                            $order:2,
                            text : '{caption}',
                            style:'{captionDisplay}'
                        }
                    }
                }
            }
        },
        Appearances:{
            KEY:{
                'font-size':0,
                'line-height':0,
                position:'absolute',
                'background-color':'#EBEADB',
                left:0,
                top:0
            },
            POOL:{
                width:0,
                height:0,
                visibility:'hidden',
                position:'absolute',
                left:'-10000px'
            },
            BORDER:{
                left:0,
                top:0,
                border: 'solid 1px',
                'border-color':'#fff #A7A6AA #A7A6AA #fff',
                'font-size':0,
                'line-height':0
            },
            HANDLER:{
                height:'22px',
                width:'6px',
                'vertical-align':'middle',
                background: linb.UI.$bg('handler.gif', ' left top #EBEADB ', true),
                cursor:'move'
            },
            LIST:{
                'padding':'1px 4px 1px 2px'
            },
            'LIST-disabled':{
                'background-color':'#E4E4E4'
            },
            ITEM:{
                display:linb.$inlineBlock,
                zoom:linb.browser.ie6?1:null,
                'vertical-align':'baseline',
                margin:'0  4px 0 4px',
                padding:'1px 2px',
                cursor:'default',
                border:'solid 1px #EBEADB'
            },
            'ITEM-mouseover':{
                $order:2,
                'border-color':'#cdcdcd' ,
                'background-color':'#FFFFE0'
            },
            'ITEM-mousedown':{
                $order:2,
                'border-color':'#A7A6AA #FFF #FFF #A7A6AA',
                'background-color':'#FFFFE0'
            },
            CAPTION:{
                height:'16px',
                'margin-left':'1px',
                'font-size':'12px',
                'line-height':'14px',
                'vertical-align':'middle'
            }
        },
        Behaviors:{
            ITEM:{
                onMouseover:function(profile, e, src){
                    var p = profile.properties, ns=this;
                    if(p.disabled)return;
                    var item = profile.getItemByDom(src),
                        itemId = item.id;
                    if(profile.$menuPop){
                        if(profile.$menuPop != itemId){
                            linb([ns]).tagClass('-mousedown');
                            //show current popmenu
                            profile.boxing()._pop(itemId, ns);
                            profile.$menuPop = itemId;
                        }
                    }else{
                        linb([ns]).tagClass('-mouseover');

                        if(p.autoShowTime)
                            _.resetRun(profile.$id+':autoShowTime', function(){
                                profile.boxing()._pop(itemId, ns);
                            },p.autoShowTime);
                    }
                },
                onMouseout:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled)return;
                    linb([this]).tagClass('-mouseover',false);

                    if(p.autoShowTime){
                        var pop = profile.$allPops;
                        if(pop=pop && pop[profile.$curPop]){
                            var node=pop.get(0).root,
                                p1=linb.Event.getPos(e),
                                size=node.cssSize(),
                                add=3,
                                p2=node.offset();

                            if(p1.left>p2.left && p1.top>p2.top-add && p1.left<p2.left+size.width && p1.top<p2.top+size.height){}else
                                pop.hide();
                        }
                        _.resetRun(profile.$id+':autoShowTime', null);
                    }
                },
                onMousedown:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled)return;
                    var item = profile.getItemByDom(src),
                        itemId = item.id;
                     if(profile.$menuPop){
                        profile.$menuPop=null;
                        profile.boxing().hide(itemId);
                     }else{
                        profile.$menuPop=itemId;
                        profile.boxing()._pop(itemId, this);

                        //stop bubble to document.body
                        //popmenu will add blue trigger to document.body.beforeMousedown
                        return false;
                     }
                },
                onKeydown:function(profile, e, src){
                    var keys=linb.Event.getKey(e), key = keys[0], shift=keys[2],
                    cur = linb(src),
                    first = profile.root.nextFocus(true, true, false),
                    last = profile.root.nextFocus(false, true, false);

                    switch(linb.Event.getKey(e)[0]){
                        case 'tab':
                            if(shift){
                                if(src!=first.get(0)){
                                    first.focus();
                                    return false;
                                }
                            }else{
                                if(src!=last.get(0)){
                                    last.focus();
                                    return false;
                                }
                            }
                            break;
                        case 'left':
                        case 'up':
                            var next = cur.nextFocus(false, true, false);
                            if(cur.get(0)==first.get(0))
                                last.focus();
                            else
                                cur.nextFocus(false);
                            return false;
                            break;
                        case 'right':
                        case 'down':
                            var next = cur.nextFocus(true, false, false);
                            if(cur.get(0)==last.get(0))
                                first.focus();
                            else
                                cur.nextFocus();
                            return false;
                            break;
                        case 'enter':
                            linb(src).onMousedown();
                            return false;
                            break;
                    }
                },
                onClick:function(){
                    return false;
                }
            }
        },
        DataModel:{
            listKey:null,

            //can't change height
            height:null,
            tabindex:{
                action:function(value){
                    if(this.domNode)
                        this.getSubNode('ITEM', true).attr('tabIndex',value);
                }
            },
            parentID:'',
            $border:1,
            left:0,
            top:0,

            autoShowTime:200,

            handler:{
                ini:true,
                action:function(v){
                    this.getSubNode('HANDLER').css('display',v?'':'none');
                }
            },
            position:'absolute',
            dock:{
                ini:'top',
                listbox:['top','bottom']
            }
        },
        EventHandlers:{
            onShowSubMenu:function(profile, popProfile, item, src){},
            onMenuSelected:function(profile, popProfile, item, src){}
        },
        RenderTrigger:function(){
            if(this.properties.disabled)this.boxing().setDisabled(true,true);
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile);
            data.handler = data.handler?'':'display:none';
            return data;
        }
    }
});

