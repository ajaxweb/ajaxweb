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
Class('VisualJS.AddFile', 'linb.Com',{
    Instance:{
        customAppend:function(parent){
            var self=this,
                dlg=self.dialog,
                prop = self.properties;
            if(prop.fromRegion)
                dlg.setFromRegion(prop.fromRegion);

            if(!dlg.get(0).root)
                dlg.render();

            self.treebar.resetValue();
            self.input.resetValue();
            self.inputTarget.resetValue();
            self.comboinput.setValue('.js',true);

            //asy
            dlg.show(parent, true);

            var  arr = _.clone(prop.items||[], function(o,i){return (i+'').charAt(0)!='_'}),f=function(o){
                var self=arguments.callee;
                _.filter(o,function(o,i){
                    var k=o.sub;
                    if(k)
                       self(o.sub);
                    if(k && !k.length)
                        delete o.sub;
                    return !!k;
                });
            };
            f(arr);
            self.treebar.clearItems().insertItems(arr);
        },
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var t=this, n=[], u=linb.UI, f=function(c){n.push(c.get(0))};

            f(
            (new u.Dialog)
            .host(t,"dialog")
            .setLeft(240)
            .setTop(80)
            .setWidth(430)
            .setHeight(270)
            .setResizer(false)
            .setMinBtn(false)
            .setMaxBtn(false)
            .setPinBtn(false)
            .setCaption("$VisualJS.tool2.new")
            .setImage('@CONF.img_app')
            .setImagePos('-0px -16px')
            .onHotKeydown("_dialog_onhotkey")
            .beforeClose("_dialog_beforeclose")
            );

            t.dialog.append(
            (new u.Button)
            .host(t,"btnCancel")
            .setLeft(80)
            .setTop(210)
            .setWidth(90)
            .setCaption("$VisualJS.cancel")
            .setImage('@CONF.img_app')
            .setImagePos("-16px -16px")
            .onClick("_btncancel_onclick")
            );

            t.dialog.append(
            (new u.Label)
            .host(t,"label4")
            .setLeft(10)
            .setTop(180)
            .setWidth(70)
            .setCaption("$VisualJS.addfile.target")
            );

            t.dialog.append(
            (new u.ComboInput)
            .host(t,"comboinput")
            .setValue(".js")
            .setLeft(300)
            .setTop(150)
            .setWidth(110)
            .setReadonly(true)
            .setType("listbox")
            .setItems([{"id":"/","caption":"$VisualJS.addfile.iDir"},{"id":".html","caption":"$VisualJS.addfile.iHtml"},{"id":".css","caption":"$VisualJS.addfile.iCSS"},{"id":".js","caption":"$VisualJS.addfile.iJs"},{"id":".php","caption":"$VisualJS.addfile.iPhp"}])
            .afterUIValueSet("_refresh")
            );

            t.dialog.append(
            (new u.Panel)
            .host(t,"panelbar2")
            .setDock("top")
            .setHeight(140)
            .setZIndex(1)
            .setCaption("$VisualJS.addfile.sel")
            );

            t.panelbar2.append(
            (new u.TreeBar)
            .host(t,"treebar")
            .setDock("none")
            .setPosition("relative")
            .setItems([])
            .setIniFold(false)
            .onItemSelected("_refresh")
            );

            t.dialog.append(
            (new u.Label)
            .host(t,"label1")
            .setLeft(10)
            .setTop(150)
            .setWidth(70)
            .setCaption("$VisualJS.addfile.filename")
            );

            t.dialog.append(
            (new u.Button)
            .host(t,"btnOK")
            .setLeft(250)
            .setTop(210)
            .setWidth(90)
            .setCaption("$VisualJS.ok")
            .setImage('@CONF.img_app')
            .setImagePos("-64px -16px")
            .onClick("_btnok_onclick")
            );

            t.dialog.append(
            (new u.Label)
            .host(t,"label3")
            .setLeft(230)
            .setTop(150)
            .setWidth(70)
            .setCaption("$VisualJS.addfile.filetype")
            );

            t.dialog.append(
            (new u.Input)
            .host(t,"input")
            .setLeft(80)
            .setTop(150)
            .setWidth(140)
            .setValueFormat("^[\\w_]{2,18}$")
            .setTipsErr("$VisualJS.addfile.filenameformat")
            .afterUIValueSet("_refresh")
            );

            t.dialog.append(
            (new u.Input)
            .host(t,"inputTarget")
            .setLeft(80)
            .setTop(180)
            .setWidth(330)
            .setReadonly(true)
            );

            return n;
            
        },
        _dialog_beforeclose:function(profile){
            this.dialog.hide();
            return false;
        },
        _btncancel_onclick:function (profile, e, value) {
            this.dialog.close();
        },
        _refresh:function(){
            var self=this,
                s1=self.treebar.getUIValue(),
                s2=self.input.getUIValue(),
                s3=self.comboinput.getUIValue()
            ;
            if(s1&&s2&&s3)
                self.inputTarget.setValue(s1+'/'+s2+s3, true);
            return false;
        },
        _btnok_onclick:function (profile, e, value) {
            var self=this,
                s = self.inputTarget.getValue();
            if(!s){
                linb.message(linb.getRes('VisualJS.addfile.notarget'));
            }else{
                _.tryF(self.properties.onOK, [self.treebar.getUIValue(), self.treebar.getUIValue(), self.input.getUIValue(), self.comboinput.getUIValue()], self.host);
                self.dialog.close();
            }
        },
        _dialog_onhotkey:function(profile, key, control, shift, alt){
            if(key=='esc')
                profile.boxing().close();
        }
    }
});
