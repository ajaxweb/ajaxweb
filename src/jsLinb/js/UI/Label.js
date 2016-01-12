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
Class("linb.UI.Label", "linb.UI.Widget",{
    Instance:{
        _shadowText:function(key){
            return this.each(function(o){
                o.getSubNode('SHADOW').css('display','block');
            });
        },
        _unShadowText:function(key){
            return this.each(function(o){
                o.getSubNode('SHADOW').css('display','none');
            });
        }
    },
    Initialize:function(){
        //modify default template from parent
        var t = this.getTemplate();
        _.merge(t.FRAME.BORDER,{
            SHADOW:{
                $order:1,
                style:'display:none;',
                SICON:{
                    style:'background:url({image}) transparent no-repeat {imagePos};{iconDisplay}',
                    className:'ui-icon',
                    $order:0
                },
                SCAPTION:{
                    text : '{caption}',
                    style:'color:#cdcdcd;',
                    $order:1
                }
            },
            BOX:{
                $order:2,
                ICON:{
                    style:'background:url({image}) transparent no-repeat {imagePos};{iconDisplay}',
                    className:'ui-icon',
                    $order:0
                },
                CAPTION:{
                    text : '{caption}',
                    $order:1
                }
            }
        },'all');
        this.setTemplate(t);
    },
    Static:{
        Appearances:{
            KEY:{
                'font-size':'12px',
                'line-height':'12px'
            },
            BOX:{
                position:'absolute'
            },
            SHADOW:{
                position:'absolute',
                top:'4px'
            }
        },
        DataModel:{
            tabindex:null,
            // setCaption and getCaption
            caption:{
                ini:undefined,
                // ui update function when setCaption
                action: function(value){
                    var self=this,p=self.properties,b=self.boxing(),k=self.keys;
                    self.getSubNodes(['CAPTION','SCAPTION']).html(value,false);
                    if(p.hAlign!='left')b.setHAlign(p.hAlign,true);
                    if(p.vAlign!='top')b.setVAlign(p.vAlign,true);
                }
            },
            image:{
                action: function(value){
                    var self=this,k=self.keys;
                    self.getSubNodes(['ICON','SICON'])
                        .css('display',value?'':'none')
                        .css('backgroundImage','url('+(value||'')+')');
                }
            },
            imagePos:{
                action: function(value){
                    var self=this,k=self.keys;
                    self.getSubNodes(['ICON','SICON'])
                        .css('backgroundPosition', value);
                }
            },
            shadowText:{
                ini:false,
                action: function(v){
                    var b=this.boxing();
                    //for string input
                    v = String(v).toLowerCase()!='false';
                    if(v)
                        b._shadowText(v);
                    else
                        b._unShadowText();
                }
            },
            hAlign:{
                ini:'right',
                listbox:['left','center','right'],
                action: function(v){
                    var self=this,c=self.getSubNode('BOX'),
                        d=self.getSubNode('SHADOW'),
                        t=self.properties;
                    switch(v){
                        case 'left':
                            c.css({left:0,right:'auto','marginLeft':'auto'});
                            d.css({left:t._textSshadowSize+'px',right:'auto','marginLeft':'auto'});
                            break;
                        case 'right':
                            c.css({left:'auto',right:t._textSshadowSize+'px','marginLeft':'auto'});
                            d.css({left:'auto',right:0,'marginLeft':'auto'});
                            break;
                        case 'center':
                            c.css({left:'50%',right:'auto','marginLeft':-1*c.get(0).offsetWidth/2+'px'});
                            d.css({left:'50%',right:'auto','marginLeft':-1*c.get(0).offsetWidth/2 + t._textSshadowSize+'px'});
                            break;
                    }
                }
            },
            vAlign:{
                ini:'top',
                listbox:['top','middle','bottom'],
                action: function(v){
                    var self=this,c=self.getSubNode('BOX'),
                        d=self.getSubNode('SHADOW'),
                        t=self.properties;
                    switch(v){
                        case 'top':
                            c.css({top:0,bottom:'auto','marginTop':'auto'});
                            d.css({top:t._textSshadowSize+'px',bottom:'auto','marginTop':'auto'});
                            break;
                        case 'bottom':
                            c.css({top:'auto',bottom:t._textSshadowSize+'px','marginTop':'auto'});
                            d.css({top:'auto',bottom:0,'marginTop':'auto'});
                            break;
                        case 'middle':
                            c.css({top:'50%',bottom:'auto','marginTop':-1*c.get(0).offsetHeight/2+'px'});
                            d.css({top:'50%',bottom:'auto','marginTop':-1*c.get(0).offsetHeight/2+ t._textSshadowSize+'px'});
                            break;
                    }
                }
            },
            'fontSize':{
                action: function(value){
                    var self=this;
                    self.getSubNodes(['CAPTION','SCAPTION'])
                        .css('fontSize', value);
                }
            },
            'fontWeight':{
                action: function(value){
                    var self=this;
                    self.getSubNodes(['CAPTION','SCAPTION'])
                        .css('fontWeight', value);
                }
            },
            width:120,
            height:20,

            _textSshadowSize:4
        },
        RenderTrigger:function(){
            var p = this.properties, o=this.boxing();
            if(p.fontSize)o.setFontSize(p.fontSize,true);
            if(p.fontWeight)o.setFontWeight(p.fontWeight,true);
            if(p.shadowText)o.setShadowText(true,true);
        },
        LayoutTrigger:function(){
            var p = this.properties, o=this.boxing(),s=p.shadowText;
            if(p.hAlign!='left' || s)o.setHAlign(p.hAlign,true);
            if(p.vAlign!='top'|| s)o.setVAlign(p.vAlign,true);
        }
    }
});
