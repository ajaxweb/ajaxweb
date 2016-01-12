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
 Class('VisualJS.DelFile', 'linb.Com',{
    Instance:{
        customAppend:function(parent){
            var self=this,
                prop = self.properties,
                dlg=self.dialog;
            if(prop.fromRegion)
                dlg.setFromRegion(prop.fromRegion);

            if(!dlg.get(0).root)
                dlg.render();

            self.treebar.resetValue();

            //asy
            dlg.show(parent, true);

            var arr = _.clone(prop.items, function(o,i){return (i+'').charAt(0)!='_'}),
                f=function(o){
                    var self=arguments.callee;
                    _.filter(o,function(o,i){
                        delete o.group;
                        if(o.sub && o.sub.length)
                           self(o.sub);
                    });
                };
            f(arr);
            self.treebar.clearItems().insertItems(arr);
        },
        _dialog_beforeclose:function(profile){
            this.dialog.hide();
            return false;
        },
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var t=this, n=[], u=linb.UI, f=function(c){n.push(c.get(0))};

            f(
            (new u.Dialog)
            .host(t,"dialog")
            .setLeft(247)
            .setTop(120)
            .setWidth(433)
            .setHeight(210)
            .setResizer(false)
            .setMinBtn(false)
            .setMaxBtn(false)
            .setPinBtn(false)
            .setCaption("$VisualJS.tool2.del")
            .setImage('@CONF.img_app')
            .setImagePos('-80px -16px')
            .onHotKeydown("_dialog_onhotkey")
            .beforeClose("_dialog_beforeclose")
            );

            t.dialog.append(
            (new u.Button)
            .host(t,"btnCancel")
            .setLeft(80)
            .setTop(150)
            .setWidth(90)
            .setCaption("$VisualJS.cancel")
            .setImage('@CONF.img_app')
            .setImagePos("-16px -16px")
            .onClick("_btncancel_onclick")
            );

            t.dialog.append(
            (new u.Button)
            .host(t,"btnOK")
            .setLeft(250)
            .setTop(150)
            .setWidth(90)
            .setCaption("$VisualJS.ok")
            .setImage('@CONF.img_app')
            .setImagePos("-64px -16px")
            .onClick("_btnok_onclick")
            );

            t.dialog.append(
            (new u.Panel)
            .host(t,"panelbar2")
            .setDock("top")
            .setHeight(140)
            .setZIndex(1)
            .setCaption("$VisualJS.delfile.sel")
            .setCloseBtn(false)
            .setLandBtn(false)
            );

            t.panelbar2.append(
            (new u.TreeBar)
            .host(t,"treebar")
            .setDock('none')
            .setPosition('relative')
            .setItems([])
            .setIniFold(false)
            .setSelMode("multi")
            .beforeUIValueSet("_treebar_beforevalueupdated")
            .onItemSelected("_treebar_onitemselected")
            );

            return n;
            // ]]code created by jsLinb UI Builder
        },
        _btncancel_onclick:function (profile, e, value) {
            this.dialog.close();
        },
        _btnok_onclick:function (profile, e, value) {
            var s = this.treebar.getUIValue(), self=this;;
            if(!s){
                linb.message(linb.getRes('VisualJS.delfile.notarget'));
            }else{
                linb.UI.Dialog.confirm(linb.getRes('VisualJS.delfile.confirmdel'), linb.getRes('VisualJS.delfile.confirmdel2', s.split(';').length), function(){
                    _.tryF(self.properties.onOK, [s], self.host);
                    self.dialog.close();
                });
            }
        },
        _treebar_beforevalueupdated:function (profile, oldValue, newValue) {
            var arr = newValue.split(';');
            arr.sort();
            _.filter(arr,function(o,j){
                for(var i=0,l=this.length;i<l;i++){
                    if(i==j)break;
                    if(_.str.startWith(this[j],this[i]))
                        return false;
                }
            });
            return arr.join(';');
        },
        _dialog_onhotkey:function(profile, key, control, shift, alt){
            if(key=='esc')
                profile.boxing().close();
        }
    }
});
