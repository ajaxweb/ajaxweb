//resizer class, add a plug in to linb.Dom
Class("linb.UI.Resizer","linb.UI",{
    Instance:{
        _attachTo:function(target, parent){
            var self=this, v=self.get(0);

            //set target first
            v._target= linb(target);
            v._parent= parent || linb('body');

            //add to dom
            v._parent.append(self);

            v.$resizeId = linb(target).id();

            return self;
        },
        show:function(){
            var self=this;
            self.each(function(o){
                o.root.css('display',o.$display||'block');
            });
            if(linb.browser.ie)
                self.reBoxing().ieRemedy();
            return self;
        },
        hide:function(){
            var self=this;
            self.each(function(o){
                o.$display = o.root.css('display');
            });
            self.reBoxing().css('display','none');
            return self;
        }
    },
    Initialize:function(){
        this.addTemplateKeys(['HANDLER','HIDDEN','MOVE','L','R','T','B','LT','RB','LB','RB']);
        _.each({
            // add resizer to linb.Dom plugin
            addResizer:function(properties, onUpdate){
                var target=linb([this.get(0)]);
                properties=properties||{};
                _.merge(properties,{
                    _attached:true
                });

                var r = new linb.UI.Resizer(properties)._attachTo(target, target);

                //set event
                if(onUpdate) r.onUpdate(onUpdate);
                return r;
            },
            removeResizer:function(){
                var s = this.id();
                _.arr.each(linb.UI.Resizer._cache,function(o){
                    if(o.$resizeId==s)
                        o.boxing().destroy();
                });
                return this;
            },
            $getResizer:function(){
                var s = this.id(), b;
                _.arr.each(linb.UI.Resizer._cache,function(o){
                    if(o.$resizeId==s){b=o;return false;}
                });
                return b && b.boxing();
            }
        },function(o,i){
            linb.Dom.plugIn(i,o);
        });

        //for linb.UI.Widget
        _.each({
            _resize:function(key, args){
                return this.each(function(o){
                    var target = o.getSubNode('BORDER'),
                        d = o.properties;
                    if(target.$getResizer())return;
                    args = args || {};
                    var update = function(pro, target, size, cssPos){
                        var profile=arguments.callee.profile,
                            node=profile.root,
                            prop=profile.properties,
                            t
                        ;
                        if(size){
                            var w=null,h=null;
                            if(t=size.width){
                                node.widthBy(t);
                                prop.width = w = node.width();
                            }
                            if(t=size.height){
                                node.heightBy(t);
                                prop.height = h = node.height();
                            }
                            linb.UI.$tryResize(profile,w,h);
                        }
                        if(cssPos){
                            if((t=cssPos.left) && !(prop.left=='auto'&&parseInt(prop.right)>=0)){
                                node.leftBy(t);
                                prop.left= node.left();
                            }
                            if((t=cssPos.top) && !(prop.top=='auto'&&parseInt(prop.bottom)>=0)){
                                node.topBy(t);
                                prop.top = node.top();
                            }
                        }
                    };
                    update.profile = o;

                    o.$resizer = target.addResizer(args, update);
                });
            },
            _unResize:function(){
                return this.each(function(o){
                    var target = o.getSubNode('BORDER');
                    if(!target.$getResizer())return;
                    target.removeResizer();
                    delete o.$resizer;
                });
            } 
        },function(o,i){
            linb.UI.Widget.plugIn(i,o);
        });
        linb.UI.Widget.setDataModel({
            resizer:{
                ini:false,
                action: function(v){
                    var b=this.boxing();
                    if(v){
                        var t = this.properties,
                            arg={};
                        _.each('minHeight,minWidth,maxHeight,maxWidth'.split(','),function(i){
                            if(i in t)arg[i]=t[i];
                        });
                        b._resize(v,arg);
                    }else
                        b._unResize();
                }
            }
        });

    },
    Static:{
        Templates:{
            tagName:'div',
            style:'{_style};'
        },
        Appearances:{
            KEY:{
                position:'absolute',
                margin:'0 -1px -1px 0',
                visibility: 'visible',
                '_font-size':0,
                '_line-height':0,

                //for ie
                '*background': 'url('+linb.ini.path+'bg.gif)',
                /*for get top Index, when it's static*/
                'z-index':60,
                cursor:'move'
            },
            MOVE:{
                position:'absolute',
                display:'block',
                'z-index':100,
                visibility: 'visible',
                background: linb.UI.$bg('icon.gif', ' no-repeat -17px top', true),
                '_font-size':0,
                '_line-height':0
            },
            HANDLER:{
                $order:0,
                position:'absolute',
                display:'block',
                border:'solid 1px',
                'background-color':'#fff',
                'z-index':100,
                visibility: 'visible',
                '_font-size':0,
                '_line-height':0
            },
            T:{
               $order:1,
               left:'50%',
               cursor: 'n-resize'
            },
            RT:{
               $order:1,
               cursor: 'ne-resize',
               'z-index': 110
            },
            R:{
               $order:1,
               top:'50%',
               cursor: 'e-resize'
            },
            RB:{
               $order:1,
                cursor: 'se-resize',
                'z-index': 110
            },
            B:{
               $order:1,
                left:'50%',
                cursor: 's-resize'
            },
            LB:{
               $order:1,
                cursor: 'sw-resize',
                'z-index': 110
            },
            L:{
               $order:1,
                top:'50%',
                cursor: 'w-resize'
            },
            LT:{
               $order:1,
                cursor: 'nw-resize',
                'z-index': 110
            },
            //must after HANDLER
            HIDDEN:{
                $order:10,
                'background-color':'transparent',
                'border-width': 0
            }
        },
        Behaviors:{
            onMousedown:function(profile, e, src){
                profile.box._onMousedown(profile, e, src, {move:true});
            },
            onDragbegin:function(profile, e, src){
                profile.box._onDragbegin(profile, e, src);
            },
            onDrag:function(profile, e, src){
                profile.box._onDrag(profile, e, src, {move:true});
            },
            onDragstop:function(profile, e, src){
                profile.box._onDragstop(profile, e, src, {move:true} );
            },
            LT:{
                onMousedown:function(profile, e, src){
                    profile.box._onMousedown(profile, e, src, {left:true, top:true});
                },
                onDragbegin:function(profile, e, src){
                    profile.box._onDragbegin(profile, e, src);
                },
                onDrag:function(profile, e, src){
                    profile.box._onDrag(profile, e, src, {left:true, top:true});
                },
                onDragstop:function(profile, e, src){
                    profile.box._onDragstop(profile, e, src, {left:true, top:true});
                }
            },
            RT:{
                onMousedown:function(profile, e, src){
                    profile.box._onMousedown(profile, e, src, {right:true, top:true});
                },
                onDragbegin:function(profile, e, src){
                    profile.box._onDragbegin(profile, e, src);
                },
                onDrag:function(profile, e, src){
                    profile.box._onDrag(profile, e, src, {right:true, top:true});
                },
                onDragstop:function(profile, e, src){
                    profile.box._onDragstop(profile, e, src, {right:true, top:true});
                }
            },
            LB:{
                onMousedown:function(profile, e, src){
                    profile.box._onMousedown(profile, e, src, {left:true, bottom:true});
                },
                onDragbegin:function(profile, e, src){
                    profile.box._onDragbegin(profile, e, src);
                },
                onDrag:function(profile, e, src){
                    profile.box._onDrag(profile, e, src, {left:true, bottom:true});
                },
                onDragstop:function(profile, e, src){
                    profile.box._onDragstop(profile, e, src, {left:true, bottom:true});
                }
            },
            RB:{
                onMousedown:function(profile, e, src){
                    profile.box._onMousedown(profile, e, src, {right:true, bottom:true});
                },
                onDragbegin:function(profile, e, src){
                    profile.box._onDragbegin(profile, e, src);
                },
                onDrag:function(profile, e, src){
                    profile.box._onDrag(profile, e, src, {right:true, bottom:true});
                },
                onDragstop:function(profile, e, src){
                    profile.box._onDragstop(profile, e, src, {right:true, bottom:true});
                }
            },
            L:{
                onMousedown:function(profile, e, src){
                    profile.box._onMousedown(profile, e, src, {left:true});
                },
                onDragbegin:function(profile, e, src){
                    profile.box._onDragbegin(profile, e, src);
                },
                onDrag:function(profile, e, src){
                    profile.box._onDrag(profile, e, src, {left:true});
                },
                onDragstop:function(profile, e, src){
                    profile.box._onDragstop(profile, e, src, {left:true});
                }
            },
            T:{
                onMousedown:function(profile, e, src){
                    profile.box._onMousedown(profile, e, src, {top:true});
                },
                onDragbegin:function(profile, e, src){
                    profile.box._onDragbegin(profile, e, src);
                },
                onDrag:function(profile, e, src){
                    profile.box._onDrag(profile, e, src, {top:true});
                },
                onDragstop:function(profile, e, src){
                    profile.box._onDragstop(profile, e, src, {top:true});
                }
            },
            R:{
                onMousedown:function(profile, e, src){
                    profile.box._onMousedown(profile, e, src, {right:true});
                },
                onDragbegin:function(profile, e, src){
                    profile.box._onDragbegin(profile, e, src);
                },
                onDrag:function(profile, e, src){
                    profile.box._onDrag(profile, e, src, {right:true});
                },
                onDragstop:function(profile, e, src){
                    profile.box._onDragstop(profile, e, src, {right:true});
                }
            },
            B:{
                onMousedown:function(profile, e, src){
                    profile.box._onMousedown(profile, e, src, {bottom:true});
                },
                onDragbegin:function(profile, e, src){
                    profile.box._onDragbegin(profile, e, src);
                },
                onDrag:function(profile, e, src){
                    profile.box._onDrag(profile, e, src, {bottom:true});
                },
                onDragstop:function(profile, e, src){
                    profile.box._onDragstop(profile, e, src, {bottom:true});
                }
            }
        },
        DataModel:{
            // attached to a dom node for resizer function.
            _attached:false,

//<< can be used in addResizer({*})
            // handler visible?
            forceVisible:false,
            // movable
            forceMovable:false,

            // only show right/bottom handlers
            singleDir:false,
            // can change width
            vertical :true,
            // can chang height
            horizontal :true,

            minHeight: 12,
            minWidth: 12,
            maxHeight: 5000,
            maxWidth: 5000,

            handlerSize:4,
            handlerOffset:0,
//>>

            left: 100,
            top: 100,
            height: 100,
            width: 100,
            position:'absolute',
            display:'block'
        },
        EventHandlers:{
            onUpdate:function(profile, target, size, cssPos){}
        },
        _dynamicTemplate:function(profile){
            var pro = profile.properties,size,pos,temp,
                hash = profile._exhash =
                    "$" +
                    '_attached:' + pro._attached + ';' +
                    'forceVisible:' + pro.forceVisible + ';' +
                    'singleDir:' + pro.singleDir + ';' +
                    'vertical:' + pro.vertical + ';' +
                    'horizontal:' + pro.horizontal + ';' +
                    'forceMovable:' + pro.forceMovable + ';'
            ;

            var map= arguments.callee.map || (arguments.callee.map={
                //move icon size 13*13
                MOVE:{tagName:'div', style:'top:50%;left:50%;margin-left:-6px;margin-top:-6px;width:13px;height:13px;'},
                T:{tagName:'div', style:'top:-{extend}px;margin-left:-{extend}px;width:{handlerSize}px;height:{handlerSize}px;'},
                RT:{tagName:'div', style:'top:-{extend}px;right:-{extend}px;width:{handlerSize}px;height:{handlerSize}px;'},
                R:{tagName:'div', style:'right:-{extend}px;margin-top:-{extend}px;width:{handlerSize}px;height:{handlerSize}px;'},
                RB:{tagName:'div', style:'bottom:-{extend}px;right:-{extend}px;width:{handlerSize}px;height:{handlerSize}px;'},
                B:{tagName:'div', style:'bottom:-{extend}px;margin-left:-{extend}px;width:{handlerSize}px;height:{handlerSize}px;'},
                LB:{tagName:'div',style:'bottom:-{extend}px;left:-{extend}px;width:{handlerSize}px;height:{handlerSize}px;'},
                L:{tagName:'div', style:'left:-{extend}px;margin-top:-{extend}px;width:{handlerSize}px;height:{handlerSize}px;'},
                LT:{tagName:'div', style:'left:-{extend}px;top:-{extend}px;width:{handlerSize}px;height:{handlerSize}px;'},
                cover:{
                    T:{tagName:'div', style:'width:100%;left:0;top:-{extend}px;height:{handlerSize}px;'},
                    RT:{tagName:'div', style:'top:-{extend}px;right:-{extend}px;width:{handlerSize}px;height:{handlerSize}px;'},
                    R:{tagName:'div', style:'height:100%;top:0;right:-{extend}px;width:{handlerSize}px;' },
                    RB:{tagName:'div', style:'right:-{extend}px;bottom:-{extend}px;width:{handlerSize}px;height:{handlerSize}px;'},
                    B:{tagName:'div', style:'width:100%;left:0;bottom:-{extend}px;height:{handlerSize}px;'},
                    LB:{tagName:'div', style:'left:-{extend}px;bottom:-{extend}px;width:{handlerSize}px;height:{handlerSize}px;'},
                    L:{tagName:'div', style:'height:100%;top:0;left:-{extend}px;width:{handlerSize}px;' },
                    LT:{tagName:'div', style:'top:-{extend}px;left:-{extend}px;width:{handlerSize}px;height:{handlerSize}px;'}
                }
            });

            /* dynamic template set here
                template._id is main id, which can input by create arg
                template._did is sub id, which must be built on fly, and cached
            */
            var template = profile.box.getTemplate(hash);
            // set template dynamic
            if(!template){
                var t,n;
                template = _.clone(profile.box.getTemplate());

                // cover or not?
                t = pro._cover?map.cover:map;
                // can move?
                if(pro._move)template.MOVE = map.MOVE;

                // change height only
                if(pro.vertical){
                    if(!pro.singleDir)
                        template.T = t.T;
                    template.B = t.B;
                }
                // change width only
                if(pro.horizontal){
                    if(!pro.singleDir)
                        template.L = t.L;
                    template.R = t.R;
                    // change height and width
                    if(pro.vertical){
                        if(!pro.singleDir){
                            template.LB = t.LB;
                            template.RT = t.RT;
                            template.LT = t.LT;
                        }
                        template.RB = t.RB;
                    }
                }

                n = profile.getClass('KEY', '-handler') + " ";
                if(t=template.T)t.className = n;
                if(t=template.RT)t.className = n;
                if(t=template.R)t.className = n;
                if(t=template.RB)t.className = n;
                if(t=template.B)t.className = n;
                if(t=template.LB)t.className = n;
                if(t=template.L)t.className = n;
                if(t=template.LT)t.className = n;

                // if hidden
                if(!pro._visible){
                    n = profile.getClass('KEY', '-hidden') + " ";
                    if(t=template.T)t.className += n;
                    if(t=template.RT)t.className += n;
                    if(t=template.R)t.className += n;
                    if(t=template.RB)t.className += n;
                    if(t=template.B)t.className += n;
                    if(t=template.LB)t.className += n;
                    if(t=template.L)t.className += n;
                    if(t=template.LT)t.className += n;

                }
                // set template
                profile.box.setTemplate(template, hash);
            }
            profile.template = template;
        },
        _prepareData:function(profile){
            var t = profile.properties;
            //default is true
            t._visible=true;
            t._cover=false;
            t._move=true;
            // for _attached type
            if(t._attached){
                t._visible=false;
                t._cover=true;
                t._move=false;

                t.position = 'static';
                t.display = 'inline';
                t.left = t.top = t.width = t.height = 0;
            }
            if(t.forceVisible){
                t._visible=true;
                t._cover=false;
            }
            if(t.forceMovable)
                t._move=true;

            t.extend =  (parseInt(t.handlerSize)||0)/2 + (parseInt(t.handlerOffset)||0);

            return arguments.callee.upper.call(this, profile);
        },
        RenderTrigger:function(){
            var self=this;
            self.domNode.zIndexIgnore=true;
            // set ini update function
            if(!self.onUpdate)
                self.onUpdate = self.constructor.onUpdate;
        },
        onUpdate:function(profile, target, size, cssPos){
            if(target){
                if(size)target.widthBy(size.width,true).heightBy(size.height,true);
                if(cssPos){
                    var t=target.get(0).style;
                    if(t.left=='auto'&&(parseInt(t.right)>=0)){}else
                    target.leftBy(cssPos.left)
                    if(t.top=='auto'&&(parseInt(t.bottom)>=0)){}else
                    target.topBy(cssPos.top);
                }
            }
        },
        //
        _onMousedown:function(profile, e, src, ddparas){
            var pos=linb.Event.getPos(e);
            linb([src]).startDrag(e,{
                dragDefer:1,
                targetReposition:false, 
                dragType:'blank',
                dragCursor:true,
                targetLeft:pos.left, 
                targetTop:pos.top
            });
        },
        _onDragbegin:function(profile, e){
            if(profile.properties._attached){
                //set target to specific target
                var o=profile._target,
                pos =o.offset(),
                w = o.offsetWidth(),
                h = o.offsetHeight()
                ;

                //custom proxy
                profile.proxy = linb.Dom.getEmptyDiv();
                profile.proxy
                .html(' ',false)
                .css({border:'1px dashed',visibility:'visible'})
                .offset(pos)
                .offsetWidth(w)
                .offsetHeight(h)
                .css('zIndex',linb.Dom.TOP_ZINDEX+20);
            }else{
                //set target to resizer
                var o  = linb([profile.domNode]);
                //set proxy to itself
                profile.proxy = o;
            }
            //get pos for target and proxy
            profile.o_pos = profile.proxy.cssPos();
            //get current w h from target
            profile.o_w2 =profile.o_w = o.width();
            profile.o_h2 =profile.o_h = o.height();

            profile.$onDrag = true;
        },
        _onDrag:function(profile, e,src, ddparas){
            var o=ddparas;
            //get dragdop off set
            profile.oos = profile.oos ||{};
            var os = linb.DragDrop.getProfile().offset;
            if(os.x == profile.oos.width && os.y == profile.oos.height)return;
            profile.oos=os;

            var x,y,w,h,t=profile.properties;

            if(o.left){
                // width of proxy
                w = profile.o_w - os.x;
                // left of proxy
                x = profile.o_pos.left + os.x;
                if(w<t.minWidth){
                    w=t.minWidth;
                    x = profile.o_w+profile.o_pos.left - w;
                }else if(w>t.maxWidth){
                    w=t.maxWidth;
                    x= profile.o_w+profile.o_pos.left - w;
                }
                profile.proxy.width(w).left(x);
            }else if(o.right){
                w = profile.o_w + os.x;
                if(w<t.minWidth)w=t.minWidth;
                else if(w>t.maxWidth)w=t.maxWidth;
                profile.proxy.width(w);
            }
            if(o.left || o.right){
                //resize inner region block
                var byw = w-profile.o_w2;
                if(profile.regions && byw!==0){
                    profile.regions.widthBy(byw);
                    profile.o_w2=w;
                }
            }

            if(o.top){
                h = profile.o_h - os.y;
                y = profile.o_pos.top + os.y;
                if(h<t.minHeight){
                    h=t.minHeight;
                    y=profile.o_h+profile.o_pos.top - h;
                }else if(h>t.maxHeight){
                    h=t.maxHeight;
                    y=profile.o_h+profile.o_pos.top - h;
                }
                profile.proxy.height(h).top(y);
            }else if(o.bottom){
                h= profile.o_h + os.y;
                if(h<t.minHeight)h=t.minHeight;
                else if(h>t.maxHeight)h=t.maxHeight;
                profile.proxy.height(h);
            }
            if(o.top || o.bottom){
                //resize inner region block
                var byh = h-profile.o_h2;
                if(profile.regions && byh!==0){
                    profile.regions.heightBy(byh);
                    profile.o_h2=h;
                }
            }

            if(o.move){
                x = profile.o_pos.left + os.x;
                y = profile.o_pos.top + os.y;
                profile.proxy.top(y).left(x);
            }
        },
        _onDragstop:function(profile, e, src, args){
            var cssPos,size,pos,o=profile.proxy;

            if(!args.move)
                size = { width :o.width()-profile.o_w, height :o.height()-profile.o_h};

            if(args.left || args.top || args.move){
                cssPos = o.cssPos();
                pos = {left :cssPos.left-profile.o_pos.left,  top :cssPos.top-profile.o_pos.top};
            }
            profile.boxing().onUpdate(profile, profile._target, size, pos);

            if(profile.properties._attached){
                if(linb.browser.ie6)profile._target.ieRemedy();
                profile.proxy.html('',false).css({visibility:'hidden',zIndex:'0',width:'0',height:'0'});
            }
            //profile.boxing().active();
            profile.$onDrag = false;
        }
    }
});