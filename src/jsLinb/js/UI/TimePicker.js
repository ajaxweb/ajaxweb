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
Class('linb.UI.TimePicker', ['linb.UI',"linb.absValue"], {
    Dependency:['linb.Date'],
    Instance:{
        _setCtrlValue:function(value){
            return this.each(function(profile){
                if(!profile.domNode)return;

                var instance = profile.boxing(),
                    cls = profile.box,
                    p = profile.properties,
                    uiv = p.$UIvalue,
                    arr1=cls._v2a(uiv),
                    arr2=cls._v2a(value);
                profile.$hour=arr2[0];
                if(arr1[1])
                    cls._uncheck(profile.getSubNode('MI',arr1[1]).get(0));
                cls._check(profile.getSubNode('MI',arr2[1]).get(0));

                profile.getSubNode('HOUR').html(arr2[0],false);
                profile.getSubNode('CAPTION').html(profile.box._showV(profile,profile.box._v2a(arr2)),false);
            });
        }
    },
    Initialize:function(){
        this.addTemplateKeys(['MI']);

        var a=[],
            cls=this._excls,
            cls2=this._excls2,
            id=linb.UI.$ID,
            e=linb.Event.$EVENTHANDLER,
            t='<span id="'+this.KEY+'-MI:'+id+':@" class="'+cls+' !" onmouseover="'+e+'" onmouseout="'+e+'" onclick="'+e+'"   unselectable="on" >@</span>',
            i,m;

        for(i=0;i<60;i++)
            a[a.length]=t.replace(/@/g,i<10?'0'+i:i).replace('!',(i%5===0)?cls2:'');
        m=a.join('');
        a.length=0;

        this.setTemplate({
            tagName : 'div',
            onselectstart:'return false',
            style:'{_style}',
            BORDER:{
                tagName : 'div',
                BAR:{
                    tagName:'div',
                    className:'uibar-bar',
                    style:'{barDisplay};height:22px;',
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
                        PRE:{$order:0},
                        HOUR:{
                            $order:1,
                            unselectable:'on',
                            className:'ui-dragable'
                        },
//                        HOURTXT:{$order:2,style:'display:inline'},
                        NEXT:{$order:3}
                    },
                    BARCMDR:{
                        tagName: 'div',
                        className:'uibar-cmdr',
                        onselectstart:'return false',
                        unselectable:'on',
                        CLOSE:{
                            className:'uicmd-close ',
                            style:'{closeDisplay}'
                        }
                    }
                },
                M:{
                    $order:1,
                    className:'ui-content',
                    tagName:'div',
                    text:m
                },
                TAIL:{
                    $order:2,
                    tagName:'div',
                    className:'ui-content',
                    CAPTION:{
                        text : '{caption}'
                    },
                    OK:{
                        tagName:'button',
                        className:'ui-btn',
                        text:linb.wrapRes('inline.ok')
                    }
                }
            }
        });
    },
    Static:{
        _excls:'linbex-timepicker',
        _excls2:'linbex-timepicker2',
        _excls_mo:'linbex-timepicker-mouseover',
        _excls_c:'linbex-timepicker-checked',
        _mover:function(src){
            var b=this,cn=src.className;
            if(cn.indexOf(b._excls_mo)==-1)
                src.className=cn + ' ' + b._excls_mo;
        },
        _mout:function(src){
            var b=this,cn=src.className;
            if(cn.indexOf(b._excls_mo)!=-1)
                src.className=cn.replace(b._excls_mo,'');
        },
        _check:function(src){
            var b=this,cn=src.className;
            if(cn.indexOf(b._excls_c)==-1)
                src.className=cn + ' ' + b._excls_c;
            b._mout(src);
        },
        _uncheck:function(src){
            var b=this,cn=src.className;
            if(cn.indexOf(b._excls_c)!=-1)
                src.className=cn.replace(b._excls_c,'');
        },
        Appearances:{
            KEY:{
                '-moz-user-select': 'none'
            },
            BAR:{
                position:'relative'
            },
            BART:{
                background: linb.UI.$bg('barvbg.gif', ' repeat-x left top', true),
                border: 'solid #C1C1C1',
                'border-collapse':'separate',
               'border-width': '0 1px 0 1px'
            },
            BARCMDL:{
                top:'1px'
            },
            PRE:{
                background: linb.UI.$bg('cmds.gif', ' no-repeat  0 -65px', true)
            },
            'PRE-mouseover':{
                $order:2,
                'background-position': '0 -80px'
            },
            'PRE-mousedown':{
                $order:3,
                'background-position': '0 -95px'
            },
            NEXT:{
                background: linb.UI.$bg('cmds.gif', ' no-repeat  -16px -65px', true)
            },
            'NEXT-mouseover':{
                $order:2,
                'background-position': '-16px -80px'
            },
            'NEXT-mousedown':{
                $order:3,
                'background-position': '-16px -95px'
            },
            HOUR:{
                $order:3,
                margin:'2px',
                height:'15px',
                width:'16px',
                'font-weight':'bold',
                border:'1px solid #7F9DB9',
                'background-color':'#FFFACD',
                cursor:'e-resize',
                'padding-left':'2px'
            },
            'PRE, NEXT':{
                $order:0,
                position:'relative',
                margin:'2px',
                width:'15px',
                height:'15px',
                'vertical-align': 'middle',
                cursor:'default'
            },
            M: {
                position:'relative',
                'border-left':'1px solid #91A7B4',
                'border-top':'1px solid #91A7B4',
                width:'220px',
                'margin-top':'-1px'
            },
            OK:{
                position:'absolute',
                top:'2px',
                right:'2px'
            },
            TAIL:{
                height:'20px',
                'padding-top':'3px',
                position:'relative',
                'white-space':'nowrap',
                'text-align':'center',
                border: 'solid #C1C1C1',
                'border-width': '0 1px 1px 1px'
            },
            '.linbex-timepicker2':{
                'background-color':'#FFFACD'
            },
            '.linbex-timepicker':{
                'font-size':"12px",
                'padding-left':'3px',
                width:'18px',
                height:'16px',
                'border-right':'1px solid #91A7B4',
                'border-bottom':'1px solid #91A7B4'
            },
            '.linbex-timepicker-mouseover':{
                $order:1,
                'background-color': '#d9e8fb'
            },
            '.linbex-timepicker-checked':{
                $order:2,
                'background-color':'#316AC5',
                color:'#fff'
            }
        },
        Behaviors:{
            HoverEffected:{CLOSE:'CLOSE',PRE:'PRE',NEXT:'NEXT'},
            ClickEffected:{CLOSE:'CLOSE',PRE:'PRE',NEXT:'NEXT'},
            KEY:{onClick:function(){return false}},
            HOUR:{
                onMousedown:function(profile, e, src){
                    linb(src).startDrag(e, {
                        dragType:'blank',
                        targetReposition:false,
                        widthIncrement:5,
                        dragCursor:true
                    });
                    profile.$temp2=0;
                },
                onDrag:function(profile, e, src){
                    var count,off = linb.DragDrop.getProfile().offset,v=profile.properties.$UIvalue,a=v.split(':');
                    a[0]=(parseFloat(a[0])||0)+parseInt(off.x/10);
                    a[0]=(a[0]%24+24)%24;
                    profile.$temp2=(a[0]<=9?'0':'')+a[0];

                    if(v[0]!=profile.$temp2)
                        profile.getSubNode('HOUR').html(profile.$temp2,false);
                },
                onDragstop:function(profile, e, src){
                    if(profile.$temp2)
                        profile.$hour=profile.$temp2;
                    profile.$temp2=0;
                }
            },
            OK:{
                onClick:function(profile){
                    var pro=profile.properties,
                        v=pro.$UIvalue,
                        a=v.split(':');
                    a[0]=profile.$hour;
                    profile.boxing().setUIValue(a.join(':'),true);

                    if(pro.closeBtn)
                        profile.getSubNode('CLOSE').onClick();
                }
            },
            MI:{
                onMouseover:function(profile, e, src){
                    profile.box._mover(src);
                },
                onMouseout:function(profile, e, src){
                    profile.box._mout(src);
                },
                onClick:function(profile, e, src){
                    var a=[];
                    a[0]=profile.$hour;
                    a[1]=profile.getSubId(src.id);
                    profile.boxing().setUIValue(a.join(':'),true);
                }
            },
            PRE:{
                onClick:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled)return;
                    var v=profile.$hour;
                    v=(parseFloat(v)||0)-1;
                    v=(v%24+24)%24;
                    profile.$hour=v=(v<=9?'0':'')+v;
                    profile.getSubNode('HOUR').html(v,false);
                }
            },
            NEXT:{
                onClick:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled)return;
                    var v=profile.$hour;
                    v=(parseFloat(v)||0)+1;
                    v=(v%24+24)%24;
                    profile.$hour=v=(v<=9?'0':'')+v;
                    profile.getSubNode('HOUR').html(v,false);
                }
            },
            CLOSE:{
                onClick:function(profile, e, src){
                    var properties = profile.properties,
                        instance = profile.boxing();
                    if(properties.disabled)return;
                    if(false===instance.beforeClose(profile, src)) return;
                    instance.destroy();
                    //for design mode in firefox
                    return false;
                }
            }
        },
        DataModel:{
            width:221,
            value:'00:00',
            closeBtn:{
                ini:true,
                action:function(v){
                    this.getSubNode('CLOSE').css('display',v?'':'none');
                }
            }
        },
        EventHandlers:{
            beforeClose:function(profile, src){}
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile);
            var nodisplay='display:none';
            data.closeDisplay = data.closeBtn?'':nodisplay;
            return data;
        },
//        RenderTrigger:function(){
//            this.getSubNode('HOURTXT').html(linb.wrapRes('date.H'),false);
//        },
        _ensureValue:function(profile, value){
            var a,b=[];
            if(value&& typeof value == 'string')
                a=value.split(':')
            else if(value && typeof value=='object' && value.constructor==Array)
                a=value;
            else a=[];

            b[0]= parseFloat(a[0])||0;
            b[1]=parseFloat(a[1])||0;
            if(b[0]<0)b[0]=0;
            if(b[0]>23)b[0]=23;
            if(b[1]<0)b[1]=0;
            if(b[1]>59)b[1]=59;

            b[0]=(b[0]<=9?'0':'')+b[0];
            b[1]=(b[1]<=9?'0':'')+b[1];

            return b.join(':');
        },
        formatValue:function(value){
            return value.join(':');
        },        
        _v2a:function(v){
            return typeof v == 'string'? v.split(':') : v;
        },
        _showV:function(profile, a){
            var f=profile.CF;
            if(typeof f.formatCaption == 'function')
                return f.formatCaption(a);
            else
                return a.join(':');
        }
    }
});
