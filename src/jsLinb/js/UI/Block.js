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
Class("linb.UI.Block", "linb.UI.Widget",{
    Initialize:function(){
        var self=this,
            t = self.getTemplate();
        //modify
        _.merge(t.FRAME.BORDER,{
            PANEL:{
                tagName:'div',
                className:'ui-content',
                text:'{html}'+linb.UI.$childTag
            }
        },'all');
        //set back
        self.setTemplate(t);

        //get default Appearance
        t = self.getAppearance();
        //modify
        _.merge(t,{
            PANEL:{
                position:'absolute',
                left:0,
                top:0,
                overflow:'auto'
            }
        });
        //set back
        self.setAppearance(t);
    },
    Static:{
        Behaviors:{
            DropableKeys:['PANEL']
        },
        DataModel:{
            //delete those properties
            disabled:null,
            tips:null,
            html:{
                action:function(v){
                    this.getSubNode('PANEL').html(v);
                }
            },

            width:100,
            height:100
        },
        _onresize:function(profile,width,height){
            var size = arguments.callee.upper.apply(this,arguments);
            profile.getSubNode('PANEL').cssSize(size,true);
        }
    }
});

