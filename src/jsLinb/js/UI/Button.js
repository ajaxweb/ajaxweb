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
Class("linb.UI.Button", ["linb.UI.Widget","linb.absValue"],{
    Instance:{
        _border:function(key, args){
            args = args || {};
            args.borderActive=true;
            return arguments.callee.upper.call(this, key, args);
        },
        activate:function(){
            var profile = this.get(0);
            profile.getSubNode('FOCUS').focus();
            return this;
        },
        _setCtrlValue:function(value){
            if(_.isNull(value) || !_.exists(value))value=false;
            return this.each(function(profile){
                var pp=profile.properties;
                if(pp.type!='status')return;
                profile.getSubNode('BORDER').tagClass('-checked', value);

                if(pp.border){
                    var b = profile.getSubNode('BORDER').$getBorder();
                    if(b)b.get(0).root.tagClass('-checked', value);
                }
            });
        }
    },
    Initialize:function(){
        this.addTemplateKeys(['DROP']);
        //modify default template for shell
        var t = this.getTemplate();
        _.merge(t.FRAME.BORDER,{
            FOCUS:{
                tagName:'a',
                href :"{href}",
                tabindex: '{tabindex}',
                TB:{
                    cellpadding:"0",
                    cellspacing:"0",
                    width:'100%',
                    height:'100%',
                    border:'0',
                    tagName:'table',
                    TR:{
                        tagName:'tr',
                        TDL:{
                            tagName:'td'
                        },
                        TD:{
                            $order:1,
                            align:'{hAlign}',
                            valign:'{vAlign}',
                            tagName:'td',
                            width:'100%',
                            height:'100%',
                            BOX:{
                                ICON:{
                                    $order:1,
                                    className:'ui-icon',
                                    style:'background:url({image}) transparent no-repeat  {imagePos};{iconDisplay}'
                                },
                                CAPTION:{
                                    $order:2,
                                    text: '{caption}'
                                }
                            }
                        },
                        TDR:{
                            $order:2,
                            tagName:'td',
                            className:'{dropCls}',
                            TDRI:{}
                        }
                    }
                }
            }
        },'all');
        t.className='{customCls}';
        this.setTemplate(t);
    },
    Static:{
        Appearances:{
            KEY:{
                'font-size':'12px',
                'line-height':'12px'
            },
            'CUSTOM':{
                background:'transparent'
            },
            'CUSTOM BOX':{
                'white-space':'normal'
            },
            'CUSTOM td':{
                $order:20,
                background:'none'
            },
            BORDER:{
                'font-size':0,
                'line-height':0
            },
            TDL:{
                background: linb.UI.$bg('button.gif', ' no-repeat left top',true),
                'padding-left':'3px'
            },
            'TD':{
                background: linb.UI.$bg('button.gif', ' repeat-x left -25px',true)
            },
            TDR:{
                background: linb.UI.$bg('button.gif', ' no-repeat right -50px',true),
                'padding-left':'3px'
            },
            'DROP':{
                $order:10,
                background: linb.UI.$bg('button.gif', ' no-repeat right -225px',true),
                'padding-left':'16px'
            },
            'BORDER-mouseover DROP':{
                $order:11,
                'background-position':'right -250px'
            },
            'BORDER-mouseover DROP-mousedown':{
                $order:12,
                'background-position':'right -275px'
            },


            'BORDER-mouseover TDL':{
                $order:1,
                'background-position':'left -75px'
            },
            'BORDER-mouseover TD':{
                $order:1,
                'background-position':'left -100px'
            },
            'BORDER-mouseover TDR':{
                $order:1,
                'background-position':'right -125px'
            },
            'BORDER-mousedown TDL, BORDER-checked TDL':{
                $order:2,
                'background-position':'left -150px'
            },
            'BORDER-mousedown TD, BORDER-checked TD':{
                $order:2,
                'background-position':'left -175px'
            },
            'BORDER-mousedown TDR, BORDER-checked TDR':{
                $order:2,
                'background-position':'right -200px'
            },
            /*a*/
            FOCUS:{
                overflow:'hidden',
                display:'block',
                position:'absolute',
                left:0,
                top:0,
                'z-index':'20',
                width:'100%',
                height:'100%',
                '-moz-outline-offset':'-1px !important'
            },
            /*span*/
            BOX:{
                display:'inline',
                'white-space':'nowrap'
            },
            CAPTION:{
                cursor:'pointer',
                'vertical-align':'middle',
                display:'inline',
                'font-size':'12px',
                'line-height':'14px'
            }
        },
        Behaviors:{
            HoverEffected:{KEY:['BORDER']},
            ClickEffected:{KEY:['BORDER']},
            NavKeys:{FOCUS:1},
            onClick:function(profile, e, src){
                var p=profile.properties;
                if(p.disabled)return false;

                //before event
                profile.getSubNode('FOCUS').focus();

                var b=profile.boxing();

                if(p.type=='status'){
                    b.setUIValue(!p.$UIvalue);
                    if(profile.onChecked)
                        b.onChecked(profile, e, p.$UIvalue);
                }

                //onClick event
                if(profile.onClick)
                    b.onClick(profile, e, src, p.$UIvalue);

            },
            TDR:{
                onMousedown:function(profile){
                    if(profile.properties.type!='drop')return;
                    linb([this]).addClass(profile.getClass('DROP','-mousedown'));
                    return false;
                },
                onMouseup:function(profile){
                    if(profile.properties.type!='drop')return;
                    linb([this]).removeClass(profile.getClass('DROP','-mousedown'));
                    return false;
                },
                onClick:function(profile, e, src){
                    if(profile.properties.type!='drop')return;
                    profile.boxing().onClickDrop(profile, e, src);
                    return false;
                }
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
            hAlign:{
                ini:'center',
                listbox:['left','center','right'],
                action: function(v){
                    var self=this, c=self.getSubNode('TD'), t=self.properties;
                    c.attr('align',v);
                }
            },
            vAlign:{
                ini:'middle',
                listbox:['top','middle','bottom'],
                action: function(v){
                    var self=this, c=self.getSubNode('TD'), t=self.properties;
                    c.attr('valign',v);
                }
            },
            tabindex:{
                action:function(value){
                    this.getSubNode('FOCUS').attr('tabIndex',value);
                }
            },
            href:linb.$href,
            value:false,
            type:{
                ini:'normal',
                listbox:['normal','status','drop','custom'],
                action:function(value){
                    var self=this,
                        root=self.getRoot(),
                        tdr=self.getSubNode('TDR'),
                        drop=self.getClass('DROP'),custom=self.getClass('CUSTOM');
                    if(value=='drop')
                        tdr.addClass(drop);
                    else
                        tdr.removeClass(drop);
                    if(value=='custom')
                        root.addClass(custom);
                    else
                        root.removeClass(custom);
                }
            },
            width:120,
            height:22,
            $border:0
        },
        _ensureValue:function(profile,value){
            return !!value;
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile);
            data.customCls = data.type=='custom'?profile.getClass('CUSTOM'):'';
            data.dropCls = data.type=='drop'?profile.getClass('DROP'):'';
            return data;
        },
        RenderTrigger:function(){
            var p = this.properties, o=this.boxing();
            //set value later
            if(p.type=='status' && p.value)
                o.setValue(true, true);
        },
        EventHandlers:{
            onClick:function(profile, e, src, value){},
            onClickDrop:function(profile, e, src){},
            onChecked:function(profile, e, value){}
        }
    }
});
