Class("linb.UI.CheckBox", "linb.UI.Button",{
    Instance:{
        _setCtrlValue:function(value){
            return this.each(function(profile){
               profile.getSubNode('MARK').tagClass('-checked', !!value);
            });
        },
        //update UI face
        _setDirtyMark:function(){
            return this.each(function(profile){
                if(!profile.domNode)return;
                var properties = profile.properties,
                    o=profile.getSubNode('CAPTION'),
                    flag=properties.value !== properties.$UIvalue,
                    d = linb.UI.$css_tag_dirty;

                if(o.beforeDirtyMark && false===o.boxing().beforeDirtyMark(profile,flag))
                    return;

                if(flag)
                    o.addClass(d);
                else
                    o.removeClass(d);
            });
        }
    },
    Initialize:function(){
        //modify default template for shell
        var t = this.getTemplate();
        _.merge(t.FRAME.BORDER.FOCUS.TB.TR.TD.BOX,{
            MARK:{
                $order:0
            }
        },'all');
        this.setTemplate(t);
    },
    Static:{
        Appearances:{
            KEY:{
                'font-family': '"Verdana", "Helvetica", "sans-serif"',
                'font-size':'12px',
                border:0,
                cursor:'pointer'
            },
            BORDER:{},
            /*a*/
            FOCUS:{
                overflow:'hidden',
                display:'block',
                position:'absolute',
                left:0,
                top:0,
                'z-index':'200',
                width:'100%',
                height:'100%',
                '-moz-outline-offset':'-1px !important'
            },
            /*span*/
            BOX:{
                display:linb.$inlineBlock,
                zoom:linb.browser.ie6?1:null,
                'font-size':'12px',
                'line-height':'14px',
                overflow:'hidden',
                'vertical-align':'middle',
                'white-space':'nowrap'
            },
            TD:{
                background:'transparent'
            },
            TDR:{
                background:'transparent'
            },
            TDL:{
                background:'transparent'
            },
            MARK:{
               cursor:'pointer',
                'vertical-align':'middle',
               width:'16px',
               height:'16px',
               background: linb.UI.$bg('cmds.gif', ' no-repeat -112px top', true)
            },
            'MARK-mouseover':{
                $order:1,
                'background-position': '-112px -17px'
            },
            'MARK-mousedown':{
                $order:2,
                'background-position': '-112px -34px'
            },
            'MARK-checked':{
                $order:3,
                'background-position': '-96px top'
            },
            'MARK-checked-mouseover':{
                $order:4,
                'background-position': '-96px -17px'
            },
            'MARK-checked-mousedown':{
                $order:5,
                'background-position': '-96px -34px'
            },
            CAPTION:{
                display:'inline',
                'white-space':'normal',
                'vertical-align':'middle',
                cursor:'pointer',
                zoom:linb.browser.ie?0:null
            }
        },
        Behaviors:{
            HoverEffected:{KEY:'MARK'},
            ClickEffected:{KEY:'MARK'},
            onClick:function(profile, e, src){
                var p=profile.properties,b=profile.boxing();
                if(p.disabled)return false;
                //onClick event
                b.setUIValue(!p.$UIvalue);

                if(profile.onChecked)b.onChecked(profile, p.$UIvalue);
                profile.getSubNode('FOCUS').focus();
            },
            FOCUS:{
                onKeydown:function(profile, e, src){
                    var key = linb.Event.getKey(e)[0];
                    if(key ==' ' || key=='enter'){
                        profile.root.onClick(true);
                        return false;
                    }
                }
            }
        },
        DataModel:{
            type:null,
            value:false,
            hAlign:'left'
        },
        EventHandlers:{
            onClick:null
        },
        _ensureValue:function(profile, value){
            return !!value;
        }
    }
});
