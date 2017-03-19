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
Class('VisualJS.OpenFile', 'linb.Com',{
    Instance:{
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.Dialog)
                .host(host,"dlg")
                .setWidth(690)
                .setHeight(100)
                .setResizer(false)
                .setCaption("Open jsLinb Class File")
                .setMinBtn(false)
                .setMaxBtn(false)
                .setPinBtn(false)
                .beforeClose("_beforeClose")
            );
            
            host.dlg.append((new linb.UI.Pane)
                .host(host,"pane6")
                .setWidth("auto")
                .setHeight("40")
                .setPosition("relative")
            );
            
            host.pane6.append((new linb.UI.ComboInput)
                .host(host,"combo")
                .setLeft(50)
                .setTop(10)
                .setWidth(517)
                .setValueFormat("^(http|https)\\:\\/\\/[\\w\\-\\_\\.]+[\\w\\-\\_](:[\\w]*)?\\/?([\\w\\-\\._\\?\\,\\'\\/\\\\\\+&amp;%\\$#\\=~])*$")
                .setType("none")
            );
            
            host.pane6.append((new linb.UI.Div)
                .host(host,"div19")
                .setLeft(20)
                .setTop(10)
                .setWidth("40")
                .setHeight(20)
                .setHtml("URL:")
            );
            
            host.pane6.append((new linb.UI.Button)
                .host(host,"button5")
                .setLeft(570)
                .setTop(9)
                .setWidth(90)
                .setCaption("Open it")
                .onClick("_open")
            );
            
            host.dlg.append((new linb.UI.Pane)
                .host(host,"pane7")
                .setWidth("auto")
                .setHeight("auto")
                .setPosition("relative")
            );
            
            host.pane7.append((new linb.UI.Group)
                .host(host,"group1")
                .setLeft("20")
                .setWidth(640)
                .setHeight("auto")
                .setPosition("relative")
                .setCaption("Open from samples")
                .setToggle(false)
                .onIniPanelView("_grp_iniview")
                .onFold("_grp_onfold")
                .onExpend("_grp_onexpend")
            );
            
            host.group1.append((new linb.UI.TreeBar)
                .host(host,"treebar")
                .setDock("none")
                .setLeft(10)
                .setWidth(620)
                .setHeight(140)
                .setPosition("relative")
                .setSelMode("none")
                .onItemSelected("_tb_onsel")
            );
            
            return children;
            
        }, 
        _open:function (profile, item, group, e, src) {
            if(!this.combo.checkValid())return false;
            var url=this.combo.getUIValue();
            if(!/\.js/.test(url)){
                linb.message('Not a js file.');
                return;
            }
            _.tryF(this.onOpenFile,[url],this);
        }, 
        _beforeClose:function(profile){
            profile.boxing().hide();
            return false;
        }, 
        _grp_onexpend:function(profile){
            this.dlg.setHeight(240);
        }, 
        _grp_onfold:function(profile){
            this.dlg.setHeight(100);
        }, 
        _grp_iniview:function(profile){
            var ins=profile.boxing(),
            self=this;
            ins.busy();
            linb.Thread.observableRun(function(threadid){
                linb.Ajax('js/ClsSamples.js','',function(txt){
                    var items = _.unserialize(txt);
                    if(false===items){
                        linb.message('Data source format error!');
                    }else
                        self.treebar.setItems(items);
                    ins.free();
                },function(msg){
                    linb.message(msg);
                    ins.free();
                },threadid).start();
            });
        }, 
        _tb_onsel:function(profile, item){
            _.tryF(this.onOpenFile,[item.value],this);
        }
    }
});
