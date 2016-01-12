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
Class('VisualJS.About', 'linb.Com',{
    Instance:{
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.Dialog)
                .host(host,"dialog")
                .setLeft(250)
                .setTop(150)
                .setHeight(170)
                .setResizer(false)
                .setCaption("$VisualJS.menu.about")
                .setMinBtn(false)
                .setMaxBtn(false)
                .setPinBtn(false)
                .onHotKeydown("_dialog_onhotkey")
                .beforeClose("_dialog2_beforeclose")
            );
            
            host.dialog.append((new linb.UI.Div)
                .host(host,"div12")
                .setLeft(10)
                .setTop(10)
                .setWidth(260)
                .setHeight(80)
                .setHtml("Powered by jsLinb and phpLINB <br /> <br />&copy;2006-2008 <a href=\"mailto:&#108;&#105;&#110;&#98;&#46;&#110;&#101;&#116;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;\">Jack Y.B. Lee</a> All rights reserved")
            );
            
            host.dialog.append((new linb.UI.Button)
                .host(host,"button3")
                .setLeft(120)
                .setTop(100)
                .setWidth(50)
                .setZIndex("10")
                .setCaption("$inline.ok")
                .onClick("_button3_onclick")
            );
            
            host.dialog.append((new linb.UI.Div)
                .host(host,"div9")
                .setLeft(90)
                .setTop(65)
                .setWidth("120")
                .setHeight("60")
                .setZIndex("8")
                .onRender("_div9_aftercreated")
                .setCustomStyle({"KEY":"background:url(img/logo.gif);cursor:pointer;"})
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _div9_aftercreated:function (profile) {
            profile.root.onClick(function(){
                linb.Dom.submit('http://www.sigmawidgets.com/VisualJS/');
            });
        }, 
        _dialog2_beforeclose:function (profile) {
            profile.boxing().hide();
            return false;
        }, 
        _dialog_onhotkey:function(profile, key, control, shift, alt){
            if(key=='esc')
                profile.boxing().close();
        }, 
        _button3_onclick:function (profile, e, value) {
            this.dialog.close();
        }
    }
});
