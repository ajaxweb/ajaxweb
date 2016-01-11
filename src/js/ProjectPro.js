Class('VisualJS.ProjectPro', 'linb.Com',{
    Instance:{
        customAppend:function(){
            var self=this,
                prop = self.properties;

            self.inputName.setValue(prop.projectName, true);
            self.inputClassName.setValue(prop.className, true);
            self._refreshLabel(prop.projectName);

            if(prop.fromRegion){
                self.dialog.setFromRegion(prop.fromRegion);
            }

            self.inputName.setDisabled(prop.readonly);
            self.inputClassName.setDisabled(prop.readonly);

            self.dialog.show(self.parent, true);
        }, 
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.Dialog)
                .host(host,"dialog")
                .setLeft(100)
                .setTop(100)
                .setWidth(540)
                .setHeight(220)
                .setResizer(false)
                .setCaption("$VisualJS.dialog.newone")
                .setImage("@CONF.img_app")
                .setImagePos("-32px top")
                .setMinBtn(false)
                .setMaxBtn(false)
                .onHotKeydown("_dialog_onhotkey")
                .beforeClose("_dialog_beforeclose")
            );
            
            host.dialog.append((new linb.UI.Input)
                .host(host,"inputName")
                .setLeft(126)
                .setTop(16)
                .setTipsErr("$VisualJS.projectPro.onlyword")
                .setValueFormat("^\\w{3,15}$")
                .afterUIValueSet("_inputname_aftervalueupdated")
            );
            
            host.dialog.append((new linb.UI.Label)
                .host(host,"label1")
                .setLeft(14)
                .setTop(18)
                .setWidth(104)
                .setCaption("$VisualJS.projectPro.name")
            );
            
            host.dialog.append((new linb.UI.Label)
                .host(host,"label3")
                .setLeft(30)
                .setTop(82)
                .setWidth(88)
                .setCaption("$VisualJS.projectPro.classfile")
            );
            
            host.dialog.append((new linb.UI.Label)
                .host(host,"label5")
                .setLeft(38)
                .setTop(50)
                .setWidth(80)
                .setCaption("$VisualJS.projectPro.class")
            );
            
            host.dialog.append((new linb.UI.Button)
                .host(host,"btnCancel")
                .setLeft(262)
                .setTop(152)
                .setWidth(90)
                .setTabindex("0")
                .setCaption("$VisualJS.cancel")
                .setImage("@CONF.img_app")
                .setImagePos("-16px -16px")
                .onClick("_btncancel_onclick")
            );
            
            host.dialog.append((new linb.UI.Input)
                .host(host,"inputClassName")
                .setLeft(126)
                .setTop(48)
                .setTipsErr("$VisualJS.projectPro.onlyword")
                .setValueFormat("^\\w{3,15}$")
            );
            
            host.dialog.append((new linb.UI.Label)
                .host(host,"label7")
                .setLeft(126)
                .setTop(114)
                .setWidth(384)
                .setCaption("label7")
                .setHAlign("left")
            );
            
            host.dialog.append((new linb.UI.Label)
                .host(host,"label2")
                .setLeft(30)
                .setTop(114)
                .setWidth(88)
                .setCaption("$VisualJS.projectPro.pagefile")
            );
            
            host.dialog.append((new linb.UI.Label)
                .host(host,"label8")
                .setLeft(126)
                .setTop(82)
                .setWidth(384)
                .setCaption("label8")
                .setHAlign("left")
            );
            
            host.dialog.append((new linb.UI.Button)
                .host(host,"btnOK")
                .setLeft(374)
                .setTop(152)
                .setWidth(90)
                .setCaption("$VisualJS.ok")
                .setImage("@CONF.img_app")
                .setImagePos("-64px -16px")
                .onClick("_btnok_onclick")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _dialog_beforeclose:function(profile){
            this.dialog.hide();
            return false;
        }, 
        _btncancel_onclick:function(){
            this.dialog.close();
        }, 
        _btnok_onclick:function(){
            var self=this;
            if(self.inputName.checkValid()===false ||
                self.inputClassName.checkValid()===false){
                    linb.message(linb.getRes('VisualJS.projectPro.invalid'));
                    return;
            }

            var pm = self.projectName = self.inputName.updateValue().getValue();
            self.className = self.inputClassName.updateValue().getValue();

            linb.request(CONF.phpPath,({
                key:CONF.requestKey,
                para:{
                    action:'new',
                    hashCode:_.id(),
                    path:this.projectName,
                    className: this.className
                }
            }),function(txt){
                var obj = typeof txt=='string'?_.unserialize(txt):txt;
                if(obj.error)
                    linb.message(obj.error.message);
                else
                    _.tryF(self.properties.onOK, ['projects/'+pm, obj.data], self.host);
                self.dialog.close();
            },function(txt){
                linb.message(txt);
            });
        }, 
        _inputname_aftervalueupdated:function(profile, oldValue,newValue){
            this._refreshLabel(newValue);
        }, 
        _refreshLabel:function(prjname, filename){
            var self=this;
            filename = filename || 'index';
            self.label7.setCaption(linb.ini.appPath+'projects/'+prjname +'/'+filename+'.html');
            self.label8.setCaption(linb.ini.appPath+'projects/'+prjname +'/VisualJS/js/'+filename+'.js');
        }, 
        _dialog_onhotkey:function(profile, key, control, shift, alt){
            if(key=='esc')
                profile.boxing().close();
        }
    }
});