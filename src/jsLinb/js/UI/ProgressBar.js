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
Class("linb.UI.ProgressBar", ["linb.UI.Widget","linb.absValue"] ,{
    Instance:{
        _setCtrlValue:function(value){
            return this.each(function(profile){
                profile.getSubNode('FILL').width(value+"%");
                profile.getSubNode('CAP').text(profile.properties.captionTpl.replace(/\{value\}/g,value));
            });
        }
    },
    Initialize:function(){
        var self=this,
            t = self.getTemplate();
        //modify
        _.merge(t.FRAME.BORDER,{
            FILL:{
                tagName:'div',
                style:'width:{value}%;',
                text:'{html}'+linb.UI.$childTag
            },
            INN:{
                $order:2,
                tagName:'div',
                CAP:{
                    tagName:'div'
                }
            }
        },'all');
        //set back
        self.setTemplate(t);

        //get default Appearance
        t = self.getAppearance();
        //modify
        _.merge(t,{
            BORDER:{
                border:'1px solid #91A7B4',
                'font-size':0,
                'line-height':0,
                //in ie6, if no overflow:hidden, children with height:100% will not work.
                overflow:'hidden'
            },
            INN:{
                display:'table',
                position:'absolute',
                left:0,
                top:0,
                width:'100%',
                height:'100%'
            },
            CAP:{
                display:'table-cell',
                'text-align':'center',
                'vertical-align':'middle'
            },
            FILL:{
                position:'absolute',

                width:'1px',
                left:0,
                top:0,
                height:'100%',
                background: linb.UI.$bg('accordion.gif', ' repeat-x 0 0', true),
                width:0
            }
        });
        //set back
        self.setAppearance(t);
    },
    Static:{
        DataModel:{
            //delete those properties
            value:0,
            width:300,
            height:22,
            captionTpl:{
                ini:'{value}%',
                action:function(){
                    this.boxing()._setCtrlValue(this.properties.$UIvalue);
                }
            },
            fillBG:{
                ini:'',
                action:function(v){
                    this.getSubNode('FILL').css('background',v);
                }
            },
            $border:1
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile);
            data.fillBG = data.fillBG?'background:'+data.fillBG:'';
            return data;
        },
        _ensureValue:function(profile,value){
            return parseInt(value)||0;
        }
    }
});

