Class("linb.UI.Group", "linb.UI.Div",{
    Instance:{
        activate:function(){
            var profile = this.get(0);
            profile.getSubNode('HANDLE').focus();
            return this;
        }
    },
    Static:{
        Behaviors:{
            NavKeys:{CAPTION:1},
            DropableKeys:['PANEL'],
            DragableKeys:['HANDLE'],
            onSize:function(profile,e){
                //if fire onresize ,w/h must be set to style
                var style = profile.domNode.style ,w=null,h=null;
                if(e.width)
                    w=parseInt(style.width)||w;
                if(e.height)
                    h=parseInt(style.height)||h;
                linb.UI.$tryResize(profile, w, h);
            },
            HANDLE:{
                onClick:function(profile, e, src){
                    if(profile.properties.toggleBtn){
                        profile.box._toggle(profile, !profile.properties.toggle);
                        return false;
                    }
                }
            }
        },
        Templates:{
            tagName : 'div',
            style:'{_style}',
            FIELDSET:{
                tagName : 'fieldset',
                className: ' {toggleCls}',
                LEGEND:{
                    tagName : 'legend',
                    HANDLE:{
                        tagName: 'a',
                        href :linb.$href,
                        tabindex: '{tabindex}',
                        TOGGLE:{
                            className: 'uicmd-toggle {toggleCls}',
                            style:"{toggleDispplay}"
                        },
                        ICON:{
                            style:'background:url({image}) transparent  no-repeat {imagePos};{iconDisplay}',
                            className:'ui-icon',
                            $order:1
                        },
                        CAPTION : {
                            text:   '{caption}',
                            $order:2
                        }
                    }
                },
                PANEL:{
                    $order:1,
                    tagName:'div',
                    style:'{panelDisplay}',
                    text:'{html}'+linb.UI.$childTag
                }
            }
        },
        Appearances:{
            KEY:{
                zoom:linb.browser.ie6?"1":null
            },
            FIELDSET:{
                border:'1px solid #CCCCCC',
                position:'relative',
                overflow:'hidden',
                zoom:linb.browser.ie6?"1":null
            },
            'FIELDSET-checked':{
                $order:2,
                'padding-left':'2px',
                'border-left':'0',
                'border-right':'0',
                'border-bottom':'0'
            },
            LEGEND:{
                'margin-left':'3px'
            },
            HANDLE:{
                cursor:'default'
            },
            PANEL:{
                position:'relative',
                overflow:'auto',
                 background:linb.browser.ie?'url('+linb.ini.file_bg+') no-repeat left top':null
            },
            'FIELDSET-checked PANEL':{
                $order:4,
                display:'none'
            },
            CAPTION:{
                'vertical-align':'middle',
                'font-family': '"Verdana", "Helvetica", "sans-serif"',
                'font-size':'12px',
                'line-height':'18px'
            }
        },

        DataModel:{
            caption:{
                ini:undefined,
                // ui update function when setCaption
                action: function(value){
                    this.getSubNode('CAPTION').get(0).innerHTML = value;
                }
            },
            tabindex:{
                action:function(value){
                    if(this.domNode)
                        this.getSubNode('HANDLE').attr('tabIndex',value);
                }
            },
            html:{
                action:function(v){
                    this.getSubNode('PANEL').html(v);
                }
            },
            toggleBtn:{
                ini:true,
                action:function(v){
                    this.getSubNode('TOGGLE').css('display',v?'':'none');
                }
            },
            toggle:{
                ini:true,
                action:function(v){
                    this.box._toggle(this, v);
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
            }
        },
        LayoutTrigger:function(){
            var self=this, t=self.properties, b=self.box;
            if(t.toggle)
                b._toggle(self,t.toggle);
        },        
        EventHandlers:{
            onIniPanelView:function(profile){},
            onFold:function(profile){},
            onExpend:function(profile){}
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile),
                nodisplay='display:none';

            data.toggleDispplay=data.toggleBtn?'':nodisplay;

            data.panelDisplay = data.toggleBtn&&!data.toggle?nodisplay:'';
            data.toggleCls = data.toggleBtn&&!data.toggle?profile.getClass('FIELDSET','-checked'):'';
            data.toggleCls2 = data.toggleBtn&&!data.toggle?profile.getClass('TOGGLE','-checked'):'';
            return data;
        },
        _onresize:function(profile,width,height){
            if(height && parseInt(profile.domNode.style.height)){
                profile.getSubNode('FIELDSET').height(height);
                profile.getSubNode('PANEL').height(height-(profile.getSubNode('LEGEND').height()||18));
            }
            if(width && parseInt(profile.domNode.style.width))
                profile.getSubNode('PANEL').width(width-2);
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

            profile.getSubNodes(['TOGGLE','FIELDSET']).tagClass('-checked', !value);
        }
    }
});