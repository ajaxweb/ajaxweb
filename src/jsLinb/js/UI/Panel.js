Class("linb.UI.Panel", "linb.UI.Div",{
    Static:{
        Templates:{
            tagName : 'div',
            style:'{_style}',
            BORDER:{
                tagName : 'div',
                BAR:{
                    tagName:'div',
                    className:'uibar-bar',
                    style:'{barDisplay};height:{barHeight}px',
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
                        TOGGLE:{
                            className: 'uicmd-toggle {toggleCls}',
                            style:'{toggleDisplay}',
                            $order:0
                        },
                        ICON:{
                            style:'background:url({image}) transparent  no-repeat {imagePos}; {iconDisplay}',
                            className:'ui-icon',
                            $order:0
                        },
                        CAPTION:{
                            tagName: 'a',
                            href :"{href}",
                            tabindex: '{tabindex}',
                            text : '{caption}',
                            $order:1
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
                        LAND:{
                            className:'uicmd-land',
                            style:'{landDisplay}',
                            $order:1
                        },
                        CLOSE:{
                            className:'uicmd-close ',
                            style:'{closeDisplay}',
                            $order:2
                        }
                    }
                },
                PANEL:{
                    $order:1,
                    tagName : 'div',
                    className:'ui-content',
                    style:'{panelDisplay}',
                    text:'{html}'+linb.UI.$childTag
                }
            }
        },
        Appearances:{
            KEY:{
                overflow:'hidden',
                background:'transparent'
            },
            'KEY BORDER':{
                zoom:linb.browser.ie6?1:null
            },
            PANEL:{
                position:'relative',
                left:0,
                top:0,
                overflow:'auto',
                zoom:linb.browser.ie6?1:null
            },

            CAPTION:{
                'font-size':'12px',
                display:'inline',
                'vertical-align':'middle'
            }
        },
        Behaviors:{
            DropableKeys:['PANEL'],
            DragableKeys:['BAR'],
            HoverEffected:{OPT:'OPT', CLOSE:'CLOSE',LAND:'LAND', TOGGLE:'TOGGLE'},
            ClickEffected:{CLOSE:'CLOSE', OPT:'OPT', LAND:'LAND', TOGGLE:'TOGGLE'},
            onSize:function(profile,e){
                var o = profile.root,w=null,h=null;
                if(e.height)h=o.height();
                if(e.width)w=o.width();
                linb.UI.$tryResize(profile, w, h);
            },
            OPT:{
                onClick:function(profile, e, src){
                    profile.boxing().onShowOptions(profile, e, src);
                }
            },
            TOGGLE:{
                onClick:function(profile, e, src){
                    profile.box._toggle(profile, !profile.properties.toggle);
                    return false;
                }
            },
            CAPTION:{
                onClick:function(profile, e, src){
                    if(!profile.onClickBar || false===profile.boxing().onClickBar(profile,src))
                        return !!linb.Event.getKey(e)[2];
                }
            },
            CLOSE:{
                onClick:function(profile, e, src){
                    var properties = profile.properties;
                    if(properties.disabled)return;
                    var instance = profile.boxing();

                    if(false===instance.beforeClose(profile)) return;

                    instance.destroy();

                    //for design mode in firefox
                    return false;
                }
            },
            LAND:{
                onClick:function(profile, e, src){
                    var properties=profile.properties;
                    if(properties.disabled)return;
                    var pos = profile.root.offset(), size=profile.root.cssSize();

                    var pro = _.copy(linb.UI.Dialog.$DataStruct);
                    _.merge(pro, properties, 'with');
                    _.merge(pro,{
                        dock:'none',
                        width:Math.max(size.width,200),
                        height:Math.max(size.height,100),
                        left:pos.left,
                        top:pos.top
                    },'all');
                    var dialog = new linb.UI.Dialog(pro),arr=[];
                    linb('body').append(dialog);

                    _.arr.each(profile.children,function(o){
                        arr.push(o[0]);
                    });
                    dialog.append(linb.UI.pack(arr,false));

                    profile.boxing().destroy();

                    //for design mode in firefox
                    return false;
                }
            }
        },
        DataModel:{
            position:'absolute',
            zIndex:0,
            dock:'fill',
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
            tabindex:{
                action:function(value){
                    if(this.domNode)
                        this.getSubNode('CAPTION').attr('tabIndex',value);
                }
            },
            href:{
                ini:linb.$href,
                action:function(v){
                    if(this.domNode)
                        this.getSubNode('CAPTION').attr('href',v);
                }
            },
            html:{
                action:function(v){
                    this.getSubNode('PANEL').html(v);
                }
            },
            barHeight:{
                ini:22,
                action:function(v){
                    this.getSubNode('TB').height(v);
                    this.getSubNode('BAR').css('display',v?'':'none');
                }
            },
            toggle:{
                ini:true,
                action:function(v){
                    this.box._toggle(this, v);
                }
            },
            optBtn:{
                ini:false,
                action:function(v){
                    this.getSubNode('OPT').css('display',v?'':'none');
                }
            },
            toggleBtn:{
                ini:false,
                action:function(v){
                    this.getSubNode('TOGGLE').css('display',v?'':'none');
                }
            },
            closeBtn:{
                ini:false,
                action:function(v){
                    this.getSubNode('CLOSE').css('display',v?'':'none');
                }
            },
            landBtn:{
                ini:false,
                action:function(v){
                    this.getSubNode('LAND').css('display',v?'':'none');
                }
            }
        },
        EventHandlers:{
            beforeClose:function(profile, src){},
            onIniPanelView:function(profile){},
            onFold:function(profile){},
            onExpend:function(profile){},
            onShowOptions:function(profile, e, src){},
            onClickBar:function(profile, src){}
        },
        LayoutTrigger:function(){
            var self=this, t=self.properties, b=self.box;
            if(t.toggle)
                b._toggle(self,t.toggle);
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile);
            var nodisplay='display:none';

            data.panelDisplay = data.toggle?'':nodisplay;
            data.toggleCls = data.toggle?'':profile.getClass('TOGGLE','-checked');

            data.toggleDisplay = data.toggleBtn?'':nodisplay;
            data.optDisplay = data.optBtn?'':nodisplay;
            data.closeDisplay = data.closeBtn?'':nodisplay;
            data.landDisplay = data.landBtn?'':nodisplay;
            data.barDisplay = data.barHeight?'':nodisplay;
            return data;
        },
        _onresize:function(profile,width,height){
            if(height && parseInt(profile.domNode.style.height)){
                profile.getSubNode('BORDER').height(height);
                profile.getSubNode('PANEL').height(height-profile.properties.barHeight);
            }
            //for performance
            if(width && parseInt(profile.domNode.style.width))
                profile.getSubNode('PANEL').width(width);
        },

        _toggle:function(profile, value){
            var p=profile.properties, b=profile.boxing();
            //set toggle mark
            p.toggle = value;

            //event
            if(value &&!profile.$ini)
                if(b.onIniPanelView)
                    if(b.onIniPanelView(profile)!==false)
                        profile.$ini=true;

            if(value){
                if(false===b.onExpend(profile))return;
            }else{
                if(false===b.onFold(profile))return;
            }

            //show/hide/panel
            profile.getSubNode('PANEL').css('display',value?'':'none');
            //chang toggle button
            if(p.toggleBtn)
                profile.getSubNode('TOGGLE').tagClass('-checked', !value);
        }
    }
});
