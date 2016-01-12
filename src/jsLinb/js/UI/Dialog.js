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
Class("linb.UI.Dialog","linb.UI.Widget",{
    Instance:{
        show:function(parent, modal, left, top){
            parent = parent || linb('body');
            return this.each(function(profile){
                var t,
                    pro=profile.properties,
                    instance = profile.boxing(),
                    fun = function(){
                        parent.append(profile.boxing());

                        var box=profile.box,
                            root=profile.root,
                            //in ie, .children can't get the same thread added node(modal div,  here)
                            t1=root.topZindex(),
                            t2=root.css('zIndex');

                        root.css('zIndex',t1>t2?t1:t2).show(left?(parseInt(left)||0)+'px':null, top?(parseInt(top)||0)+'px':null);

                        if(modal && !profile.$inModal)
                            box._modal(profile);

                        box._active(profile);

                        if(profile.onShow)profile.boxing().onShow(profile);
                        box._refreshRegion(profile);
                    };

                if(t=pro.fromRegion)
                    linb.Dom.animate({border:'dashed 1px #ff0000'},{left:[t.left,pro.left],top:[t.top,pro.top],width:[t.width,pro.width],height:[t.height,pro.height]}, null,fun,360,12,'inexp').start();
                else
                    fun();
            });
        },
        hide:function(){
            this.each(function(profile){
                var pro=profile.properties,
                    box=profile.box;

                if(profile.$inModal)
                    box._unModal(profile);
                //max has dock prop
                if(pro.status=='max' || pro.status=='min')
                    box._restore(profile);

                profile.root.hide();

                var t=pro.fromRegion;
                if(t)
                    linb.Dom.animate({border:'dashed 1px #ff0000'},{left:[pro.left,t.left],top:[pro.top,t.top],width:[pro.width,t.width],height:[pro.height,t.height]},  null, null,360,12,'outexp').start();
            });
            return this;
        },
        close:function(){
            return this.each(function(profile){
                if(profile.beforeClose && false === profile.boxing().beforeClose(profile))
                    return;
                var pro=profile.properties, t=pro.fromRegion, fun=function(){
                    profile.boxing().destroy();
                };

                if(t)
                    linb.Dom.animate({border:'dashed 1px #ff0000'},{left:[pro.left,t.left],top:[pro.top,t.top],width:[pro.width,t.width],height:[pro.height,t.height]}, null,fun,360,12,'outexp').start();
                else
                    fun();
            });
        }
    },
    Initialize:function(){
        var t = this.getTemplate();
        _.merge(t.FRAME.BORDER,{
            BAR:{
                tagName:'div',
                className:'uibar-bar',
                style:'{barDisplay};height:{_barHeight}px;',
                BART:{
                    cellpadding:"0",
                    cellspacing:"0",
                    width:'100%',
                    height:'100%',
                    border:'0',
                    tagName:'table',
                    className:'uibar-t',
                    BARTR:{
                        tagName:'tr',
                        BARTDL:{
                            tagName:'td',
                            className:'uibar-tdl'
                        },
                        BARTDM:{
                            $order:1,
                            width:'100%',
                            tagName:'td',
                            className:'uibar-tdm'
                        },
                        BARTDR:{
                            $order:2,
                            tagName:'td',
                            className:'uibar-tdr'
                        }
                    }
                },
                BARCMDL:{
                    tagName: 'div',
                    className:'uibar-cmdl',
                    ICON:{
                        $order:0,
                        className:'ui-icon',
                        style:'background:url({image}) transparent no-repeat  {imagePos};{iconDisplay}'
                    },
                    CAPTION:{
                        $order:1,
                        text:'{caption}'
                    }
                },
                BARCMDR:{
                    tagName: 'div',
                    className:'uibar-cmdr',
                    onselectstart:'return false',
                    unselectable:'on',
                    OPT:{
                        className:'uicmd-opt',
                        style:'{optDisplay}',
                        $order:1
                    },
                    PIN:{
                        $order:2,
                        className:'uicmd-pin',
                        style:'{pinDisplay}'
                    },
                    LAND:{
                        $order:3,
                        className:'uicmd-land',
                        style:'{landDisplay}'
                    },
                    
                    MIN:{
                        $order:4,
                        className:'uicmd-min',
                        style:'{minDisplay}'
                    },
                    RESTORE:{
                        $order:5,
                        className:'uicmd-restore',
                        style:'display:none;'
                    },
                    MAX:{
                        $order:6,
                        className:'uicmd-max',
                        style:'{maxDisplay}'
                    },
                    CLOSE:{
                        $order:7,
                        className:'uicmd-close ',
                        style:'{closeDisplay}'
                    }
                }
            },
            PANEL:{
                tagName:'div',
                $order:2,
                className:'ui-content',
                text:'{html}'+linb.UI.$childTag
            },
            STATUS:{
                tagName:'div',
                $order:3
            }
        },'all');
        this.setTemplate(t)
    },
    Static:{
        Appearances:{
            KEY:{
                overflow:'visible'
            },
            PANEL:{
                position:'absolute',
                left:0,
                overflow:'auto',
                'background-color':'#FFF',
                border:'solid 1px #BBB',
                'border-top':0
            },
            STATUS:{
                position:'absolute',
                left:0,
                bottom:0,
                height:0,

                '*font-size':0,
                '*line-height':0
            },
            CAPTION:{
                'font-size':'12px',
                display:'inline',
                'vertical-align':'middle'
            },
            'BAR-focus BART':{
                $order:1,
                'background-position' : 'right -22px'
            },
            MIN:{
                background: linb.UI.$bg('cmds.gif', ' -16px 0', true),
                $order:0
            },
            'MIN-mouseover':{
                $order:1,
               'background-position': ' -16px -16px'
            },
            'MIN-mousedown':{
                $order:2,
               'background-position':  '-16px -32px'
            },
            RESTORE:{
                background: linb.UI.$bg('cmds.gif', ' -32px 0', true)
            },
            'RESTORE-mouseover':{
                $order:1,
               'background-position':  '-32px -16px'
            },
            'RESTORE-mousedown':{
                $order:2,
               'background-position':  '-32px -32px'
            },
            MAX:{
                background: linb.UI.$bg('cmds.gif', ' -48px 0', true)
            },
            'MAX-mouseover':{
                $order:1,
               'background-position':  '-48px -16px'
            },
            'MAX-mousedown':{
                $order:2,
               'background-position':  '-48px -32px'
            },
            PIN:{
                background: linb.UI.$bg('cmds.gif', ' 0 0', true)
            },
            'PIN-mouseover':{
                $order:1,
                'background-position': '0 -16px'
            },
            'PIN-mousedown':{
                $order:2,
                'background-position': ' 0 -32px'
            },
            'PIN-checked, PIN-checked-mouseover':{
                $order:2,
                'background-position':  '0 -32px'
            }
        },
        Behaviors:{
            DropableKeys:['PANEL'],
            DragableKeys:['LAND'],
            HoverEffected:{OPT:'OPT', PIN:'PIN',MIN:'MIN',MAX:'MAX',RESTORE:'RESTORE',CLOSE:'CLOSE',LAND:'LAND'},
            ClickEffected:{OPT:'OPT', PIN:'PIN',MIN:'MIN',MAX:'MAX',RESTORE:'RESTORE',CLOSE:'CLOSE',LAND:'LAND'},
            onMousedown:function(profile, e){
                profile.box._active(profile);
            },

            onDragstop:function(profile){
                var pos = profile.root.cssPos(),p=profile.properties;
                p.left = pos.left;
                p.top = pos.top;
            },
            BAR:{
                onMousedown:function(profile, e, src){
                    if(profile.getKey(linb.Event.getSrc(e).parentNode.id)==profile.keys.BARCMDR)return;

                    if(profile.properties.movable && !profile._locked){
                        profile.box._active(profile);
                        profile.root.startDrag(e, {
                            dragDefer:1,
                            targetOffsetParent:profile.root.parent()
                        });
                    }
                },
                onDblclick:function(profile, e, src){
                    if(profile.getKey(linb.Event.getSrc(e).parentNode.id)==profile.keys.BARCMDR)return;
                    if(!profile.properties.maxBtn)return;
                    if(profile.properties.status=='max')
                        profile.box._restore(profile);
                    else
                        profile.box._max(profile);
                }
            },
            PIN:{
                onClick:function(profile, e, src){
                    var key=profile.keys.PIN, t=profile.properties;
                    //set pinned status
                    t.pinned = !t.pinned;
                    //set appea
                    profile.getSubNode('PIN').tagClass('-checked', t.pinned);
                    //set lock flag for not movable
                    profile._locked = t.pinned;

                    // add/remove resize
                    if(t.resizer){
                        if(!t.pinned){
                            // if not in min mode
                            if(t.status != 'min' && profile.$resizer)
                                profile.$resizer.show();
                        }else
                            if(profile.$resizer)
                                //profile.boxing().setResizer(false);
                                profile.$resizer.hide();
                    }
                }
            },
            MIN:{
                onClick:function(profile, e, src){
                    profile.box._min(profile);
                }
            },
            MAX:{
                onClick:function(profile, e, src){
                    profile.box._max(profile);
                }
            },
            RESTORE:{
                onClick:function(profile, e, src){
                    profile.box._restore(profile);
                }
            },
            OPT:{
                onClick:function(profile, e, src){
                    profile.boxing().onShowOptions(profile, e, src);
                }
            },
            CLOSE:{
                onClick:function(profile, e, src){
                    profile.boxing().close();
                }
            }
        },
        DataModel:{
            $border:0,
            tips:null,
            border:null,
            disabled:null,
            dock:{
                hidden:true
            },
            html:{
                action:function(v){
                    this.getSubNode('PANEL').html(v);
                }
            },
            // setCaption and getCaption
            caption:{
                ini:undefined,
                // ui update function when setCaption
                action: function(value){
                    this.getSubNode('CAPTION').get(0).innerHTML = value;
                }
            },
            image:{
                action: function(value){
                    this.getSubNode('ICON')
                        .css('display',value?'':'none')
                        .css('backgroundImage','url('+(value||'')+')');
                }
            },
            imagePos:{
                action: function(value){
                    this.getSubNode('ICON')
                        .css('backgroundPosition', value);
                }
            },
            // setCaption and getCaption
            shadow: true,
            resizer:true,
            movable: true ,

            minBtn:{
                ini:true,
                action:function(v){
                    var o = this.getSubNode('MIN');
                    if(v)
                        o.setInlineBlock();
                    else
                        o.css('display','none');
                }
            },
            maxBtn:{
                ini:true,
                action:function(v){
                    var o = this.getSubNode('MAX');
                    if(v)
                        o.setInlineBlock();
                    else
                        o.css('display','none');
                }
            },
            optBtn:{
                ini:false,
                action:function(v){
                    this.getSubNode('OPT').css('display',v?'':'none');
                }
            },
            closeBtn:{
                ini:true,
                action:function(v){
                    var o = this.getSubNode('CLOSE');
                    if(v)
                        o.setInlineBlock();
                    else
                        o.css('display','none');
                }
            },
            pinBtn:{
                ini:true,
                action:function(v){
                    var o = this.getSubNode('PIN');
                    if(v)
                        o.setInlineBlock();
                    else
                        o.css('display','none');
                }
            },
            landBtn:{
                ini:false,
                action:function(v){
                    var o = this.getSubNode('LAND');
                    if(v)
                        o.setInlineBlock();
                    else
                        o.css('display','none');
                }
            },
            width:300,
            height:300,
            minWidth : 200,
            minHeight : 100,
            _barHeight: 22,

            position:'absolute',
            fromRegion:{
                hidden:true,
                ini:null
            },
            status:{
                ini:'normal',
                listbox:['normal','min','max'],
                action:function(v,o){
                    var self=this, b=self.box;
                    if(v=='min')b._min(self,o);
                    else if(v=='max')b._max(self,o);
                    else b._restore(self,o);
                }
            }
        },
        EventHandlers:{
            onShow:function(profile){},
            beforeClose:function(profile){},
            onShowOptions:function(profile, e, src){}
        },
        RenderTrigger:function(){
            this.destroyTrigger = function(){
                var s=this;
                if(s.$inModal)s.box._unModal(s);
            };
        },
        LayoutTrigger:function(){
            var self=this, t=self.properties, b=self.box;
            if(t.status=='min') b._min(self);
            else if(t.status=='max') b._max(self);
            else linb.UI.$tryResize(self, t.width, t.height);
        },
        _prepareData:function(profile){
            var data = arguments.callee.upper.call(this, profile),
                nodisplay='display:none';
            data.minDisplay = data.minBtn?'':nodisplay;
            data.maxDisplay = data.maxBtn?'':nodisplay;
            data.optDisplay = data.optBtn?'':nodisplay;
            data.closeDisplay = data.closeBtn?'':nodisplay;
            data.pinDisplay = data.pinBtn?'':nodisplay;
            data.landDisplay = data.landBtn?'':nodisplay;
            var status=profile.properties.status;
            if(status=='min'||status=='max')
                profile.$noR=profile.$noS=1;
            return data;
        },

        //ov from design mode
        _min:function(profile){
            var o=profile.root,
                box=profile.box,
                p=o.parent(),
                t=profile.properties;
            // unMax
            if(t.status=='max')
                box._unMax(profile);
            // keep restore values
            else
                box._refreshRegion(profile);

            // hide those
            profile.getSubNodes(['PANEL','STATUS']).css('display','none');

            if(t.minBtn){
                // show restore button
                profile.getSubNode('RESTORE').setInlineBlock();
                // hide min button
                profile.getSubNode('MIN').css('display','none');
            }

            // lockResize function
            if(t.resizer && profile.$resizer)
                profile.$resizer.hide();


            if(t.shadow)
                profile.boxing()._unShadow(false);

            //set it before resize
            t.status='min';

            var h1=o.height(),
                h2=profile.getSubNode('BORDER').height(),
                h=profile.getSubNode('BAR').height();
            // resize
            o.cssSize({ width :t.minWidth, height :h+h1-h2},true);
        },
        _max:function(profile){
            var o=profile.root,
                box=profile.box,
                ins=profile.boxing(),
                p=o.parent(),
                t=profile.properties;
            // if from normal status
            if((t.status)=='min')
                //unset min
                box._unMin(profile);
            else
                box._refreshRegion(profile);

            // hide pin button
            if(t.pinBtn)
                profile.getSubNode('PIN').css('display','none');
            if(t.maxBtn){
                // hide max button
                profile.getSubNode('MAX').css('display','none');
                // show restore button
                profile.getSubNode('RESTORE').setInlineBlock();
            }

            // set not movable
            profile.old_m = t.movable;
            t.movable=false;

            if(t.resizer && profile.$resizer)
                profile.$resizer.hide();

            if(t.shadow)
                //ins.setShadow(false);
                ins._unShadow(false);

            t.status='max';

            ins.setDock('fill');
        },
        _restore:function(profile){
            var o=profile.root,
                box=profile.box,
                t=profile.properties;
            // if from max
            if(t.status=='max')box._unMax(profile);
            if(t.status=='min')box._unMin(profile);

            // hide restore button
            profile.getSubNode('RESTORE').css('display','none');

            t.status='normal';
        },
        _unMax:function(profile){
            var t=profile.properties,
                ins=profile.boxing();
            profile.getSubNode('MAX').setInlineBlock();
            if(t.pinBtn)
                profile.getSubNode('PIN').setInlineBlock();

            t.movable=profile.old_m;

            if(t.shadow)
                ins._shadow();

            if(t.resizer && !t.pinned && profile.$resizer)
                profile.$resizer.show();

            ins.setDock('none');
            
            // resize
            linb.UI.$tryResize(profile, t.width, t.height);
        },
        _unMin:function(profile){
            var t=profile.properties;
            profile.getSubNodes(['PANEL','STATUS']).css('display','block');
            profile.getSubNode('MIN').setInlineBlock();

            if(t.shadow)
                profile.boxing()._shadow();

            if(t.resizer && !t.pinned &&profile.$resizer)
                    profile.$resizer.show();

            profile.root.cssSize({width:t.width, height:t.height});
            // resize
            linb.UI.$tryResize(profile, t.width, t.height);
        },
        _active:function(profile){
            var self=this;
            if(self.activeWndId == profile.$id)return;

            self._deActive();

            var o=linb(profile.domId),
                //in ie, .children can't get the same thread added node(modal div,  here)
                t1=o.topZindex(),
                t2=o.css('zIndex');
            o.css('zIndex',t1>t2?t1:t2);

            profile.getSubNode('BAR').tagClass('-focus');
            self.activeWndId = profile.$id;
        },
        _deActive:function(){
            var profile;
            if(profile=linb.UI._cache['$'+this.activeWndId])
                profile.getSubNode('BAR').tagClass('-focus',false);
            delete this.activeWndId;
        },
        _modal:function(profile){
            var s=profile.root,temp,p=s.parent(),cover;
            if(!p.isEmpty()){
                if(!profile.$inModal){
                    if(!profile.$modalDiv)
                        profile.$modalDiv=new linb.UI.Div({
                            position:'absolute'
                        }).setCustomStyle({
                            KEY:'overflow:hidden;display:block;z-index:0;cursor:wait;background-image:url('+linb.ini.path+'bg.gif)'
                        });

                    cover = profile.$modalDiv;
                    p.append(cover);
                    cover.setDock('cover',true);
                    cover=cover.reBoxing();
                    cover.css('display','block').onMousedown(function(){return false}).topZindex(true);
                    s.css('zIndex',(parseInt(cover.css('zIndex'))||0)+1);

                    //bak dlg tabzindnex
                    var hash={},a=profile.root.query('*',function(o){return o.tabIndex>0}).get();
                    for(var i=0,o;o=a[i++];){
                        (hash[o.tabIndex] = hash[o.tabIndex]||[]).push(o);
                        o.tabIndex=-1;
                    }
                    //save others tabzindex
                    var h = profile.$focusHash={}, b=linb('body').query('*',function(o){return o.tabIndex>0}).get();
                    for(var i=0,o;o=b[i++];){
                        (h[o.tabIndex] = h[o.tabIndex]||[]).push(o);
                        o.tabIndex=-1;
                    }
                    //restore dlg tabzindnex
                    for(var i in hash){
                        h=hash[i];
                        for(var j in h)
                            h[j].tabIndex=i;
                    }
                    linb.Event.pushTabOutTrigger(profile.domNode, function(){linb([profile.domNode]).nextFocus()});

                    profile.$inModal=true;
                }
            }
        },
        _unModal:function(profile){
            if(profile.$inModal){
                profile.$modalDiv.setDock('none');
                profile.root.css('zIndex',0);
                profile.getSubNode('BORDER').append(profile.$modalDiv.reBoxing().css('display','none'));

                profile.$inModal=false;

                var hash=profile.$focusHash,h;
                for(var i in hash){
                    h=hash[i];
                    for(var j in h)
                        h[j].tabIndex=i;
                }
                _.breakO(profile.$focusHash,2);
                linb.Event.popTabOutTrigger();
            }
        },
        _refreshRegion:function(profile){
            if(!profile.root) return;
            return _.merge(profile.properties, profile.root.cssRegion(), 'all');
        },

        _adjust:function(dialog,caption, content){
            caption = caption ||'';
            if(!content){
                content = caption;
                caption = "";
            }

            var node = dialog.$div.reBoxing(),
            ID='linb:temp:dialog',
            me=arguments.callee;

            if(!linb.Dom.byId(ID)){
                n2 = me._cache=node.clone(false);
                linb('body').append(n2);
                n2.css({width:'auto',height:'auto',overflow:'visible',position:'absolute',visibility:'visible',left:linb.Dom.HIDE_VALUE})
                .id(ID,true);
            }
            var n2 = me._cache;
            n2.html(content,false);
            var size = n2.cssSize();

            node.html(content);

            if(size.width>500){
                size.width=500;
                n2.width(500);
                size.height = n2.offsetHeight() + 10;
                n2.width('auto');
            }
            if(size.height>400)size.height=400;
            if(size.width<150)size.width=150;
            if(size.height<30)size.height=30;

            node.cssSize(size).css('overflow','auto').show();

            dialog.setCaption(caption).setWidth(size.width + 30).setHeight(size.height+80);
            dialog.$cmd.reBoxing().left((size.width + 30 - dialog.$cmd.reBoxing().width())/2);
        },
        alert:function(title, content, onOK){
            var me=arguments.callee, dialog;
            if(!(dialog=me.dialog)){
                dialog = me.dialog = new linb.UI.Dialog({
                    minBtn:false,
                    maxBtn:false,
                    pinBtn:false,
                    resizer:false,
                    left:200,
                    top:200
                },{
                    beforeClose:function(){
                        dialog.hide();
                        _.tryF(me.onOK);
                        me.onOK=null;
                        return false;
                    }
                });

                var cmd = dialog.$cmd = new linb.UI.Div({
                    bottom:10,
                    width:60,
                    height:24
                }),

                btn = dialog.$btn = new linb.UI.Button({
                    caption:'$inline.ok',
                    width: 60,
                    tabindex:1
                },
                {
                    onClick:function(){
                        dialog.hide();
                        _.tryF(onOK);
                    }
                });
                cmd.append(btn);

                var div = dialog.$div = new linb.UI.Div({
                    left:10,
                    top:10
                });
                dialog.append(cmd).append(div).render();
            }
            me.onOK=onOK;
            this._adjust(dialog,title, content);
            dialog.show(linb('body'),true);
            _.asyRun(function(){
                dialog.$btn.activate();
            });
        },
        confirm:function(title, caption, onYes, onNo){
            var me=arguments.callee, dialog;

            if(!(dialog=me.dialog)){
                dialog = me.dialog = new linb.UI.Dialog({
                    minBtn:false,
                    maxBtn:false,
                    pinBtn:false,
                    resizer:false,
                    left:200,
                    top:200
                },{
                    beforeClose:function(){
                        dialog.hide();
                        _.tryF(me.onNo);
                        me.onYest=me.onNo=null;
                        return false;
                    }
                });

                var cmd = dialog.$cmd=new linb.UI.Div({
                    bottom:10,
                    width:140,
                    height:24
                }),
                btn = new linb.UI.Button({
                    caption:'$inline.yes',
                    width: 60,
                    tabindex:1,
                    left:0
                },
                {
                    onClick:function(){
                        dialog.hide();
                        _.tryF(me.onYes);
                        me.onYest=me.onNo=null;
                    }
                });
                cmd.append(btn);

                btn = dialog.$btn=new linb.UI.Button({
                    caption:'$inline.no',
                    tabindex:1,
                    width: 60,
                    left:80
                },
                {
                    onClick:function(){
                        dialog.hide();
                        _.tryF(me.onNo);
                        me.onYest=me.onNo=null;
                    }
                });
                cmd.append(btn);

                var div = dialog.$div=new linb.UI.Div({
                    left:10,
                    top:10
                });
                dialog.append(cmd).append(div).render();
            }
            me.onYes=onYes;
            me.onNo=onNo;
            this._adjust(dialog, title, caption);
            dialog.show(linb('body'), true);
            _.asyRun(function(){
                dialog.$btn.activate();
            });
        },
        pop:function(title, content, cmdStr, left, top){
            var dialog = new linb.UI.Dialog({
                minBtn:false,
                maxBtn:false,
                pinBtn:false,
                resizer:false,
                left:200 || left,
                top:200 || top
            }),

            cmd = dialog.$cmd = new linb.UI.Div({
                bottom:10,
                width:60,
                height:24
            })
            .append( dialog.$btn = new linb.UI.Button({
                caption: cmdStr || '$inline.ok',
                tabindex:1,
                width: 60
            },
            {
                onClick:function(){
                    dialog.destroy();
                }
            })),

            div = dialog.$div = new linb.UI.Div({
                left:10,
                top:10
            }).setCustomStyle({
                KEY:'overflow:visible'
            });

            dialog.append(cmd).append(div).render();;

            this._adjust(dialog, title, content);
            dialog.show(linb('body'),false,left, top);

            _.asyRun(function(){
                dialog.$btn.activate();
            });
            return dialog;
        },
        prompt:function(title, caption, content, onYes, onNo){
            var dialog,
                me=arguments.callee;
            if(!(dialog=me.dialog)){
                var close=function(){
                    me.$inp.setValue('');
                    me.onYes=me.onNo=null;
                    me.dialog.hide();
                    return false;
                };
                dialog = me.dialog = new linb.UI.Dialog({
                    minBtn:false,
                    maxBtn:false,
                    pinBtn:false,
                    resizer:false,
                    left:200,
                    top:200,
                    width:300,
                    height:130
                },{
                    beforeClose:function(){
                        _.tryF(me.onNo);
                        return close();
                    }
                });
                var con = me.$con = new linb.UI.Div({
                    top:4,
                    left:10,
                    width:270,
                    height:18
                }),
                cmd = new linb.UI.Div({
                    top:65,
                    width:270,
                    height:24
                })
                .setCustomStyle('KEY',"text-align:center;")
                .append(new linb.UI.Button({
                    caption:'$inline.yes',
                    width: 60,
                    left:70,
                    tabindex:1
                },
                {
                    onClick:function(){
                        _.tryF(me.onYes,[me.$inp.getUIValue()]);
                        return close();
                    }
                }));

                cmd.append(new linb.UI.Button({
                    caption:'$inline.no',
                    tabindex:1,
                    left:140,
                    width: 60
                },
                {
                    onClick:function(){
                        _.tryF(me.onNo);
                        return close();
                    }
                }));
                var inp=me.$inp=new linb.UI.Input({
                    left:10,
                    top:22,
                    width:270,
                    height:36,
                    multiLines:true
                })
                dialog.append(con).append(cmd).append(inp).render();
            }
            dialog.setCaption(title||'Prompt');
            me.$con.setHtml(caption||"");
            me.$inp.setValue(content||"");
            me.onYes=onYes;
            me.onNo=onNo;

            dialog.show(linb('body'), true);
            _.asyRun(function(){
                me.$inp.activate();
            });
        },
        //
        _onresize:function(profile,width,height){
            var size = arguments.callee.upper.apply(this,arguments),
                region={},
                v1=profile.getSubNode('BAR'),
                v2=profile.getSubNode('PANEL'),
                v3=profile.getSubNode('STATUS'),
                bh,bw,h1,h3;
            if(height){
                bh = size.height,
                h1=v1.height(), h3=v3.height();
                region.top=h1;
                if(bh-h1-h3>0)
                    region.height = bh-h1-h3;
            }
            if(width){
                bw = size.width;
                region.width=bw-2;
            }
            v2.cssRegion(region, true);

            if(bw)
                v3.width(bw);
        }
    }
});
