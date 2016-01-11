Class("linb.UI.Layout",["linb.UI", "linb.absList"],{
    Instance:{
        getPanel:function(subId){
            return this.get(0).getSubNodeByItemId('PANEL', subId);
        },
        append:function(target, subId){
            var pro=this.get(0);
            return arguments.callee.upper.call(this, target, subId||'main');
        }
    },
    Static:{
        Templates:{
            tagName:'div',
            style:'{_style}',
            text:"{items}",
            $dynamic:{
                items:{
                    ITEM:{
                        tagName:'div',
                        className:'{cls1} {itemClass}',
                        style:'{size};{itemStyle}',
                        MOVE:{
                            $order:0,
                            tagName:'div',
                            className:'{cls2} ',
                            style:'{display}'
                        },
                        CMD:{
                            $order:1,
                            tagName:'div',
                            style:'{cmdDisplay}',
                            className:'{cls3} '
                        },
                        PANEL:{
                            tagName:'div',
                            className:'ui-content',
                            style:'position:absolute;left:0;top:0;',
                            text:linb.UI.$childTag
                        }
                    }
                }
            }
        },
        Appearances:{
            KEY:{
                position:'absolute',
                overflow:'hidden',
                left:0,
                top:0,
                'font-size':linb.browser.ie?0:null,
                'line-height':linb.browser.ie?0:null
            },
            MOVE:{
                $order:0,
                position:'absolute',
                'background-color':'#EBEADB',
                'z-index':'10',
                'font-size':linb.browser.ie?0:null,
                'line-height':linb.browser.ie?0:null
            },
            'MOVE-mouseover':{
                $order:1,
                'background-color':'#f8f8f8'
            },
            CMD:{
                position:'absolute',
                border:'solid 1px #cdcdcd',
                cursor:'pointer',
                'z-index':'20',
                'font-size':linb.browser.ie?0:null,
                'line-height':linb.browser.ie?0:null
            },
            ITEM:{
                position:'absolute',
                overflow:'hidden',
                'border-width':linb.browser.opr?'0px':null,
                'font-size':linb.browser.ie?0:null,
                'line-height':linb.browser.ie?0:null
            },
            PANEL:{
                position:'absolute',
                overflow:'hidden',
                /*for opera, opera defalut set border to 3 ;( */
                'border-width':linb.browser.opr?'0px':null,
                'font-size':linb.browser.ie?0:null,
                'line-height':linb.browser.ie?0:null
            },
            'ITEM-MAIN':{
                left:0,
                right:0,
                top:0,
                bottom:0
            },
            'ITEM-TOP, ITEM-BOTTOM':{
                left:0,
                right:0
            },
            'ITEM-LEFT, ITEM-RIGHT':{
                top:0,
                bottom:0
            },
            'MOVE-TOP':{
                'border-top':'solid 1px #fff',
                'border-bottom':'solid 1px #cdcdcd',
                width:'100%',
                bottom:0,
                height:'4px',
                cursor:'n-resize'
            },
            'MOVE-BOTTOM':{
                'border-top':'solid 1px #fff',
                'border-bottom':'solid 1px #cdcdcd',
                width:'100%',
                top:0,
                height:'4px',
                cursor:'n-resize'
            },
            'MOVE-LEFT':{
                'border-left':'solid 1px #fff',
                'border-right':'solid 1px #cdcdcd',
                height:'100%',
                right:0,
                width:'4px',
                cursor:'w-resize'
            },
            'MOVE-RIGHT':{
                'border-left':'solid 1px #fff',
                'border-right':'solid 1px #cdcdcd',
                height:'100%',
                left:0,
                width:'4px',
                cursor:'w-resize'
            },
            'MOVE-TOP-checked, MOVE-BOTTOM-checked, MOVE-LEFT-checked, MOVE-RIGHT-checked':{
                $order:1,
                'background-color':'#cdcdcd'
            },
            'CMD-TOP':{
                $order:0,
                left:'50%',
                'margin-left':'-15px',
                bottom:0,
                width:'30px',
                height:'4px',
                background: linb.UI.$bg('icon.gif', ' no-repeat left -52px', true)
            },
            'CMD-TOP-mouseover, CMD-BOTTOM-mouseover, CMD-LEFT-mouseover, CMD-RIGHT-mouseover':{
                $order:1,
                'background-color':'#ffff00'
            },
            'CMD-TOP-mouseover, CMD-BOTTOM-mouseover, CMD-LEFT-mouseover, CMD-RIGHT-mouseover':{
                $order:2,
                'background-color':'#ffff00'
            },
            'CMD-BOTTOM':{
                $order:0,
                left:'50%',
                'margin-left':'-15px',
                top:0,
                width:'30px',
                height:'4px',
                background: linb.UI.$bg('icon.gif', ' no-repeat left -60px', true)
            },
            'CMD-LEFT':{
                $order:0,
                top:'50%',
                'margin-top':'-15px',
                right:0,
                height:'30px',
                width:'4px',
                background: linb.UI.$bg('icon.gif', ' no-repeat -84px 0px', true)

            },
            'CMD-RIGHT':{
                $order:0,
                top:'50%',
                'margin-top':'-15px',
                left:0,
                height:'30px',
                width:'4px',
                background: linb.UI.$bg('icon.gif', ' no-repeat -92px -0px', true)

            },
            'MOVE-MAIN':{
                $order:5,
                display:'none'
            },
            'CMD-MAIN':{
                $order:5,
                display:'none'
            }
        },
        Behaviors:{
            DropableKeys:['PANEL'],
            HoverEffected:{MOVE:'MOVE',CMD:'CMD'},
            onSize:function(profile,e){
                var o=profile.root;
                linb.UI.$tryResize(profile, e.width?o.width():null, e.height?o.height():null);
            },
            MOVE:{
                onMousedown:function(profile, e, src){
                    var id=src.id,
                        itemId = profile.getSubId(id),
                        item = profile.getItemByDom(src);
                    if(item.hide)return;

                    var main = profile.getItemByItemId('main'),
                        o=profile.getSubNode('ITEM', itemId),
                        m=profile.getSubNodeByItemId('ITEM', 'main'),
                        cursor=linb([src]).css('cursor'),
                        t=profile.properties,
                        h,w,mh,mw,offset1,offset2;

                    profile.pos=item.pos;

                    if(t.type=='vertical'){
                        h = profile._cur = o.height();
                        mh = m.height();
                        if(item.pos=='before'){
                            offset1 = h - item.min;
                            offset2 = item.max?Math.min(parseInt(item.max)-h, (mh-main.min)):(mh-main.min);
                        }else{
                            offset1 = item.max?Math.min(parseInt(item.max)-h, (mh-main.min)):(mh-main.min);
                            offset2 = h - item.min;
                        }

                        linb([src]).startDrag(e,{
                            dragType:'copy',
                            targetReposition:false,
                            verticalOnly:true,
                            maxTopOffset:offset1,
                            maxBottomOffset:offset2,
                            dragCursor:cursor
                        });
                    }else{
                        w = profile._cur = o.width();
                        mw = m.width();
                        if(item.pos=='before'){
                            offset1 = w - item.min;
                            offset2 = item.max?Math.min(parseInt(item.max)-w, (mw-main.min)):(mw-main.min);
                        }else{
                            offset1 = item.max?Math.min(parseInt(item.max)-w, (mw-main.min)):(mw-main.min);
                            offset2 = w - item.min;
                        }

                        linb([src]).startDrag(e,{
                            dragType:'copy',
                            targetReposition:false,
                            horizontalOnly:true,
                            maxLeftOffset:offset1,
                            maxRightOffset:offset2,
                            dragCursor:cursor
                        });
                    }

                    profile._limited=0;
                },
                onDrag:function(profile, e, src){
                    var t=profile.properties,
                        d=linb.DragDrop,
                        p=linb.DragDrop._profile,
                        b=0;
                    if(t.type=='vertical'){
                        if((p.y<=p.restrictedTop) || (p.y>=p.restrictedBottom))b=true;
                    }else{
                        if(p.x<=p.restrictedLeft || p.x>=p.restrictedRight)b=true;
                    }

                    if(b){
                        if(!profile._limited){
                            profile._bg=p.proxyNode.css('backgroundColor');
                            p.proxyNode.css('backgroundColor','#ff6600');
                            profile._limited=true;
                        }
                    }else{
                        if(profile._limited){
                            p.proxyNode.css('backgroundColor',profile._bg);
                            profile._limited=0;
                        }
                    }

                },
                onDragstop:function(profile, e, src){
                    var t=profile.properties,
                        o=linb([src]).parent(),
                        r=profile.root,
                        item = profile.getItemByDom(src);

                    //add offset and refresh
                    if(t.type=='vertical'){
                        //use size to ignore onresize event once
                        o.height(item.size =  profile._cur + (profile.pos=='before'?1:-1)*linb.DragDrop.getProfile().offset.y);
                        linb.UI.$tryResize(profile,null,r.height());
                    }else{
                        o.width(item.size = profile._cur + (profile.pos=='before'?1:-1)*linb.DragDrop.getProfile().offset.x);
                        //use size to ignore onresize event once
                        linb.UI.$tryResize(profile,r.width(),null);
                    }
                    profile._limited=0;
                }
            },
            CMD:{
                onMousedown:function(profile, e, src){
                    var t=profile.properties,
                        id=src.id,
                        self=linb([src]),
                        itemId = profile.getSubId(id),
                        item = profile.getItemByDom(src),
                        r=profile.root,
                        main = profile.getItemByItemId('main'),
                        m=profile.getSubNodeByItemId('ITEM', 'main'),
                        o = profile.getSubNode('ITEM',itemId),
                        panel = profile.getSubNode('PANEL',itemId),
                        move = profile.getSubNode('MOVE',itemId);

                    if(t.type=='vertical'){
                        // restore resize mode
                        if(item.hide){
                            if(item.size <= m.height() - main.min + t._handlerSize){
                                //restore h
                                o.height(item.size);
                                panel.show();

                                item.hide=false;
                                //set appearance
                                if(item.pos=='before')
                                    self.replaceClass(/bottom/g,'top');
                                else
                                    self.replaceClass(/top/g,'bottom');

                                //hidden 'move'
                                if(!item.locked)move.css('cursor','n-resize');
                                profile.getSubNode('MOVE').tagClass('-checked',false);
                            }else
                                linb.message('no enough space!');
                        // to min and fix mode
                        }else{
                            o.height(t._handlerSize);
                            panel.hide();

                            item.hide=true;
                            if(item.pos=='before')
                                self.replaceClass(/top/g,'bottom');
                            else
                                self.replaceClass(/bottom/g,'top');

                            if(!item.locked)
                                move.css('cursor','default');
                            profile.getSubNode('MOVE').tagClass('-checked');
                        }
                        linb.UI.$tryResize(profile,null,r.height());
                    }else{
                        if(item.hide){
                            if(item.size <= m.width()-main.min + t._handlerSize){
                                o.width(item.size);
                                panel.show();
                                item.hide=false;
                                if(item.pos=='before')
                                    self.replaceClass(/right/g,'left');
                                else
                                    self.replaceClass(/left/g,'right');

                                if(!item.locked)move.css('cursor','w-resize');
                                profile.getSubNode('MOVE').tagClass('-checked',false);
                            }else
                                linb.message('no enough space!');
                        }else{
                            o.width(t._handlerSize);
                            panel.hide();
                            item.hide=true;
                            if(item.pos=='before')
                                self.replaceClass(/left/g,'right');
                            else
                                self.replaceClass(/right/g,'left');


                            if(!item.locked)
                                move.css('cursor','default');
                            profile.getSubNode('MOVE').tagClass('-checked');
                        }
                        linb.UI.$tryResize(profile,r.width(),null);
                    }

                    return false;
                }
            }
        },
        DataModel:{
            disabled:null,
            position:'absolute',
            type:{
                listbox:['vertical', 'horizontal'],
                ini:'vertical',
                action:function(value, ovalue){
                    if(value != ovalue){
                        var self=this, auto='auto',
                        nodes2 = self.getSubNode('ITEM',true),
                        nodes1 = self.getSubNode('MOVE',true),
                        nodes3 = self.getSubNode('CMD',true);
                        nodes1.merge(nodes2).merge(nodes3);

                        if(value=='vertical'){
                            nodes1.replaceClass(/(-left)(\b)/ig,'-top$2');
                            nodes1.replaceClass(/(-right)(\b)/ig,'-bottom$2');
                            nodes2.each(function(o){
                                linb(o).height(linb(o).width());
                            })
                            .cssRegion({left:0,top:auto,right:auto,bottom:auto})
                            ;
                        }else{
                            nodes1.replaceClass(/(-top)(\b)/ig,'-left$2');
                            nodes1.replaceClass(/(-bottom)(\b)/ig,'-right$2');
                            nodes2.each(function(o){
                                linb(o).width(linb(o).height());
                            })
                            .cssRegion({left:auto,top:0,right:auto,bottom:auto})
                            ;

                        }

                        var size = self.root.cssSize();
                        linb.UI.$tryResize(self, size.width, size.height);
                    }
                }
            },
            dock:'fill',
            listKey:null,
            width:200,
            height:200,
            _handlerSize:6,

            items:{
                ini:[],
                set:function(value){
                    return this.each(function(o){
                        if(o.domNode){
                            var box = o.boxing(),
                                temp = linb.Dom.getEmptyDiv(),
                                //keep children
                                children = _.copy(o.children),
                                p,vv
                            ;
                            o.children.length=0;
                            _.arr.each(children,function(o){
                                //for flush dock
                                delete o[0].$dockParent;
                                //keep it in dom
                                temp.append(o[0].root);
                            });

                            //bak value

                            //clear all
                            box.clearItems();
                            //call gc to clear onresize setting
                            linb.Dom.__gc();

                            //set items
                            //for adjust 'main'
                            vv = o.box._prepareV(o, value);
                            //inset items
                            box.insertItems(vv);

                            //restore children
                            _.arr.each(children,function(v){
                                box.append.apply(box,v);
                            });

                            //clear
                            temp.empty();
                            //set value

                            //resize
                            var size = o.root.cssSize();
                            linb.UI.$tryResize(o, size.width, size.height);
                        }else
                            o.properties.items = _.copy(value);
                    });
                }
            }
        },
        _prepareV:function(profile, items){
            var main, before=[], after=[];
            //arrage items
            _.arr.each(items,function(o){
                if(o.id=='main'){
                    main=o
                }else{
                    if(o.pos=='before')
                        before.push(o);
                    else{
                        o.pos='after';
                        after.push(o);
                    }
                }
            });

            main = main || {};
            main.id = 'main';
            main.min = main.min || 10;

            //reset items
            items.length = 0;
            _.arr.insertAny(items, before,0);
            _.arr.insertAny(items, main);
            _.arr.insertAny(items, after);

            //set the items to default value
            _.arr.each(items,function(o){
                o.id = _.isStr(o.id)?o.id:profile.$id+':'+_.id();
                o.min = o.min || 10;
                if(o.id!='main'){
                    o.size = parseInt(o.size) || 20;
                    o.locked= typeof o.locked=='boolean'?o.locked:false;
                    o.hide = typeof o.hide=='boolean'?o.hide:false;
                    o.cmd = typeof o.cmd=='boolean'?o.cmd:false;
                }
            });
            return items;
        },
        _prepareData:function(profile){
            var prop=profile.properties;
            if(!prop.items || prop.items.constructor != Array)
            prop.items = _.clone([
                {id:'before', pos:'before', locked:false, size:60, min: 50, max:200},
                {id:'after',pos:'after', locked:false, size:60, min: 50, max:200}
            ]);

            prop.items = this._prepareV(profile, prop.items);
            return arguments.callee.upper.call(this, profile);
        },
        _prepareItem:function(profile, item){
            var pp=profile.properties;
            if(item.id=='main'){
                item.cls1=profile.getClass('ITEM', '-main');
                item.cls2  = profile.getClass('MOVE', '-main');
                item.cls3  = profile.getClass('CMD', '-main' );
                return;
            }

            if(pp.type=='vertical')
                item.size = 'height:'+item.size+'px';
            else
                item.size = 'width:'+item.size+'px';

            var pos;
            if(pp.type=='vertical'){
                if(item.pos=='before')
                    pos='top';
                else
                    pos='bottom';
            }else{
                if(item.pos=='before')
                    pos='left';
                else
                    pos='right';
            }

            item.cls1  = profile.getClass('ITEM', '-' + pos );
            item.cls2  = profile.getClass('MOVE', '-' + pos );
            item.cls3  = profile.getClass('CMD', '-' + pos );
            item.display = item.locked?'display:none':'';
            item.cmdDisplay = item.cmd?'':'display:none';
        },
        RenderTrigger:function(){
            var t, profile=this;
            _.arr.each(profile.properties.items,function(item){
                if(item.id!='main'){
                    if(item.hide && (t=profile.getSubIdByItemId(item.id))){
                            item.hide=false;
                            profile.getSubNode('CMD',t).onMousedown();
                        }
                }
            });
        },
        _onresize:function(profile,width,height){
            var _t,t=profile.properties, m,n, itemId, temp1,temp2,temp, key=profile.keys.ITEM, panel=profile.keys.PANEL;

            var obj={}, obj2={};
            _.arr.each(t.items,function(o){
                itemId = profile.getSubIdByItemId(o.id);
                obj[itemId] = {};
                obj2[itemId] = {};
            });
            if(t.type!='vertical'){
                if(!_.isNull(width)){
                    //get left
                    temp=temp1=temp2=0;
                    _.arr.each(t.items,function(o){
                        if(o.id=='main')return;
                        itemId = profile.getSubIdByItemId(o.id);
                        if(o.pos=='before'){
                            n=profile.getSubNode('ITEM', itemId);
                            m= n.width();//offsetWidth();

                            obj2[itemId].left=temp1;
                            temp1 +=m;
                            obj2[itemId].right='auto';
                            obj[itemId].right='auto';
                            obj[itemId].left=0;
                            obj[itemId].width = m - (o.locked?0:t._handlerSize);
                        }
                    });
                    _.arr.each(t.items,function(o){
                        if(o.id=='main')return;
                        itemId = profile.getSubIdByItemId(o.id);
                        if(o.pos=='after'){
                            n =profile.getSubNode('ITEM', itemId);
                            m= n.width();//offsetWidth();

                            obj2[itemId].right=temp2;
                            temp2 +=m;
                            obj2[itemId].left='auto';
                            obj[itemId].right=0;
                            obj[itemId].left='auto';
                            obj[itemId].width = m-(o.locked?0:t._handlerSize);
                        }
                    },null,true);
                    temp = temp1+temp2;

                    //set main
                    //specify widht/height first,
                    if(width-temp>=0){
                        _t=profile.getSubIdByItemId('main');
                        obj[_t].width=width-temp;
                        obj2[_t].width=width-temp;
                        obj2[_t].left=temp1;
                    }
                }
                if(!_.isNull(height)){
                    _.each(obj,function(o,id){
                        o.height=height;
                        obj2[id].height=height;
                    });
                }
            }else{
                if(!_.isNull(height)){
                    //get top
                    temp=temp1=temp2=0;
                    _.arr.each(t.items,function(o){
                        if(o.id=='main')return;
                        itemId=profile.getSubIdByItemId(o.id);
                        if(o.pos=='before'){
                            n=profile.getSubNode('ITEM', itemId);
                            m = n.height();//offsetHeight();

                            obj2[itemId].top=temp1;
                            temp1 += m;
                            obj2[itemId].bottom='auto';
                            obj[itemId].top=0;
                            obj[itemId].bottom='auto';
                            obj[itemId].height=m-(o.locked?0:t._handlerSize);
                        }
                    });
                    _.arr.each(t.items,function(o){
                        if(o.id=='main')return;
                        itemId=profile.getSubIdByItemId(o.id);
                        if(o.pos=='after'){
                            n=profile.getSubNode('ITEM', itemId);
                            m=n.height();//offsetHeight();

                            obj2[itemId].bottom=temp2;
                            temp2 += m;
                            obj2[itemId].top='auto';
                            obj[itemId].bottom=0;
                            obj[itemId].top='auto';
                            obj[itemId].height=m-(o.locked?0:t._handlerSize);
                        }
                    },null,true);

                    temp =temp1+temp2;
                    //set main
                    if(height-temp>=0){
                        _t=profile.getSubIdByItemId('main');

                        obj[_t].height=height-temp;
                        obj2[_t].height=height-temp;
                        obj2[_t].top=temp1;
                    }
                }
                if(!_.isNull(width)){
                    _.each(obj,function(o, id){
                        o.width=width;
                        obj2[id].width=width;
                    });
                }
            }
            //collect width/height in size
            _.each(obj, function(o, id){
                profile.getSubNode('PANEL', id).cssRegion(o, true);
            });
            _.each(obj2, function(o, id){
                profile.getSubNode('ITEM', id).cssRegion(o);
            });
        }
    }
});
