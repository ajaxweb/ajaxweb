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
Class('VisualJS.ProjectSelector', 'linb.Com',{
    Instance:{
        customAppend:function(){
            var self=this,
                dlg=self.dialog,
                prop = self.properties;
            self.listName.setItems([]).setUIValue('',true);
            if(prop.fromRegion)
                dlg.setFromRegion(prop.fromRegion);
            dlg.show(self.parent, true);

            linb.Dom.setCover(linb.getRes('VisualJS.ps.getting'));
            linb.request(CONF.phpPath, ({
                    key:CONF.requestKey,
                    para:{
                        action:'open',
                        hashCode:_.id(),
                        path:'projects',
                        deep:'0'
                    }
                }),
                function(txt){
                    var arr = typeof txt=='string'?_.unserialize(txt):txt;
                    if(arr.error)
                        linb.message(arr.error.message);
                    else{
                        arr=arr.data;
                        self.properties.projectList=[];
                        if(arr && arr.length){
                            _.arr.each(arr,function(i){
                                if(i.type===0){
                                    self.properties.projectList.push({id:i.location,caption:i.name})
                                }
                            });
                        }
                        self.listName.setItems(prop.projectList);
                        linb.Dom.setCover(false);
                    }
                },
                function(){
                    linb.Dom.setCover(false);
                }
            );
        }, 
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.Dialog)
                .host(host,"dialog")
                .setLeft(140)
                .setTop(100)
                .setWidth(340)
                .setHeight(190)
                .setResizer(false)
                .setCaption("$VisualJS.dialog.select")
                .setImage("@CONF.img_app")
                .setImagePos("-48px top")
                .setMinBtn(false)
                .setMaxBtn(false)
                .onHotKeydown("_dialog_onhotkey")
                .beforeClose("_dialog_beforeclose")
            );
            
            host.dialog.append((new linb.UI.List)
                .host(host,"listName")
                .setDock("top")
                .setHeight(120)
                .onDblclick("_listname_ondblclick")
            );
            
            host.dialog.append((new linb.UI.Button)
                .host(host,"btnCancel")
                .setLeft(121)
                .setTop(130)
                .setWidth(90)
                .setZIndex("1")
                .setCaption("$VisualJS.cancel")
                .setImage("@CONF.img_app")
                .setImagePos("-16px -16px")
                .onClick("_btncancel_onclick")
            );
            
            host.dialog.append((new linb.UI.Button)
                .host(host,"btnOK")
                .setLeft(221)
                .setTop(130)
                .setWidth(90)
                .setZIndex("1")
                .setCaption("$VisualJS.ok")
                .setImage("@CONF.img_app")
                .setImagePos("-64px -16px")
                .onClick("_btnok_onclick")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _btncancel_onclick:function(){
            this.dialog.close();
        }, 
        _btnok_onclick:function(){
            var self=this,
                pm = self.projectName = self.listName.getUIValue();

            if(!self.projectName){
                linb.message(linb.getRes('VisualJS.ps.noselected'));
                return;
            }

            linb.request(CONF.phpPath,({
                key:CONF.requestKey,
                para:{
                    action:'open',
                    hashCode:_.id(),
                    path:this.projectName
                }
            }),function(txt){
                var obj = typeof txt=='string'?_.unserialize(txt):txt;
                if(!obj || obj.error)
                    linb.message(obj.error.message);
                else
                    _.tryF(self.properties.onOK, [pm, obj.data], self.host);
                self.dialog.close();
            });
        }, 
        _dialog_beforeclose:function(profile){
            this.dialog.hide();
            return false;
        }, 
        _dialog_onhotkey:function(profile, key, control, shift, alt){
            if(key=='esc')
                profile.boxing().close();
        }, 
        _listname_ondblclick:function (profile, item, src) {
            this.btnOK.onClick();
        }
    }
});
