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
Class('VisualJS.ObjectEditor', 'linb.Com',{
    Instance:{
        $PageEditor:null,
        $bakValue:null,

        iniExComs:function(com, threadid){
            var self=this;
            linb.ComFactory.newCom('VisualJS.PageEditor',function(){
                var inn=this;
                inn.host = self;
                inn.$checkType='js';
                inn.create(function(o,threadid){
                    self.dialog.append(inn.getUIComponents());
                },threadid);
                self.$PageEditor=inn;
            },threadid);
        },
        activate:function(){
            this.$PageEditor.activate();
        },
        check:function(txt){
            return this.$PageEditor.check(txt);
        },
        setValue:function(text){
            this.$PageEditor.setValue(text);
        },
        _dialog_beforeclose:function(profile){
            this.dialog.hide();
            return false;
        },
        _btncancel_onclick:function(){
            this.dialog.close();
        },
        _btnok_onclick:function(){
            var self=this,
                prop=self.properties,
                txt = self.$PageEditor.getValue();
            if(txt===false)return false;
            //check dirty
            if(prop.text != txt){
                //check first
                if(false === self.check(txt))return false;
                //parse comments and code, check code in the process
                prop.result = VisualJS.ClassTool.parseSingleBlock(txt);

                if(false === prop.result){
                    linb.message(linb.getRes('VisualJS.classtool.err1'));
                    return false;
                }

                //set back
                prop.text = txt;

                prop.object = _.unserialize(prop.text) || null;

                _.tryF(prop.onOK,[self],self.host);
            }
            self.dialog.close();
        },
        customAppend:function(parent){
            var page=this,
                prop = page.properties,
                dlg=page.dialog;
            dlg.setCaption(prop.caption).setImage(prop.image).setImagePos(prop.imagePos);


            page.$PageEditor.setValue(prop.text);
            if(prop.fromRegion)
                dlg.setFromRegion(prop.fromRegion);

            if(!dlg.get(0).root)
                dlg.render(true);

            dlg.show(parent, true);

            return false;
        },
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var t=this, n=[], u=linb.UI, f=function(c){n.push(c.get(0))};

            f(
            (new u.Dialog)
            .host(t,"dialog")
            .setLeft(216)
            .setTop(80)
            .setWidth(500)
            .setMaxBtn(false)
            .setMinBtn(false)
            .setCaption("dialog")
            .beforeClose("_dialog_beforeclose")
            );

            t.dialog.append(
            (new u.Block)
            .host(t,"panelB")
            .setDock("bottom")
            .setHeight(35)
            );

            t.panelB.append(
            (new u.Pane)
            .host(t,"panelR")
            .setDock("right")
            .setWidth(284)
            );

            t.panelR.append(
            (new u.Button)
            .host(t,"btnCancel")
            .setLeft(64)
            .setTop(8)
            .setWidth("100")
            .setCaption("Cancel")
            .setImage('@CONF.img_app')
            .setImagePos("-16px -16px")
            .onClick("_btncancel_onclick")
            );

            t.panelR.append(
            (new u.Button)
            .host(t,"btnOK")
            .setLeft(176)
            .setTop(8)
            .setWidth("100")
            .setCaption("OK")
            .setImage('@CONF.img_app')
            .setImagePos("-64px -16px")
            .onClick("_btnok_onclick")
            );

            return n;
            // ]]code created by jsLinb UI Builder
        }
    }
});
