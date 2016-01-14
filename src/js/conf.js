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
new function(){
    var _img_app=linb.getPath('img/','App.gif');
    var _img_widgets=linb.getPath('img/','widgets.gif');
    window.CONF={
        dftLang:'en',

        img_app:_img_app,
        img_widgets:_img_widgets,

        phpPath:linb.ini.appPath + 'request.php',
        testphpPath:linb.ini.appPath + 'debug.php',

        prjPath:'projects/',
        requestKey:'VisualJS',

        path_link:"http://www.sigmawidgets.com",
        //path_video:'http://linb.googlecode.com/files/video.html',
        path_forum:'http://groups.google.com/group/linb',
        path_download:'http://code.google.com/p/linb/downloads/list',
        path_gpllicence:'http://www.gnu.org/licenses/lgpl-3.0-standalone.html',
        path_licence:'http://www.sigmawidgets.com/license.html',
        path_purchase:'http://www.sigmawidgets.com/buy_now2.html',

        mapWidgets:{},
        widgets: [
            {id:'linb.Data',caption:'Data', group:true, image:'img/App.gif', imagePos:'-48px -48px', sub:[
                {id:'linb.DataBinder', caption:'DataBinder', image:'img/widgets.gif', imagePos:'-640px top', dragable:true}
            ]},
            {id:'linb.UI.absForm',caption:'Form Elements',group:true, image:_img_app, imagePos:'-48px -48px',sub:[
                {id:'linb.UI.Tag', caption:'Tag Element', image:_img_widgets, imagePos:'left top', dragable:true},
                {id:'linb.UI.Div', caption:'Div Element', image:_img_widgets, imagePos:'-624px top', dragable:true},

                {id:'linb.UI.Label', caption:'Label', image:_img_widgets, imagePos:'-16px top', dragable:true},
                {id:'linb.UI.Link', caption:'Link', image:_img_widgets, imagePos:'-32px top', dragable:true},
                {id:'linb.UI.Button', caption:'Button', image:_img_widgets, imagePos:'-48px top', dragable:true/*, Appearances:['default','link','block']*/},
                {id:'linb.UI.CheckBox', caption:'CheckBox', image:_img_widgets, imagePos:'-96px top', dragable:true},
                {id:'linb.UI.Input', caption:'Input', image:_img_widgets, imagePos:'-112px top', dragable:true},
                {id:'linb.UI.TextEditor', caption:'TextEditor', image:_img_widgets, imagePos:'-128px top', dragable:true},
                {id:'linb.UI.List', caption:'List', image:_img_widgets, imagePos:'-192px top', dragable:true},
                {id:'linb.UI.ComboInput', caption:'ComboInput', image:_img_widgets, imagePos:'-144px top', dragable:true},

                {id:'linb.UI.ProgressBar', caption:'ProgressBar', image:_img_widgets, imagePos:'-608px top', dragable:true},

                {id:'linb.UI.Range', caption:'Range', image:_img_widgets, imagePos:'left -16px', dragable:true},
                //{id:'linb.UI.ComboButton', caption:'ComboButton', image:_img_widgets, imagePos:'-80px top', dragable:true},
                {id:'linb.UI.TimePicker', caption:'TimePicker', image:_img_widgets, imagePos:'-240px top', dragable:true},
                {id:'linb.UI.DatePicker', caption:'DatePicker', image:_img_widgets, imagePos:'-256px top', dragable:true},
                {id:'linb.UI.ColorPicker', caption:'ColorPicker', image:_img_widgets, imagePos:'-272px top', dragable:true},
                {id:'linb.UI.RadioBox', caption:'RadioBox', image:_img_widgets, imagePos:'-208px top', dragable:true},
                {id:'linb.UI.Poll', caption:'Poll', image:_img_widgets, imagePos:'-208px -16px', dragable:true},
                {id:'linb.UI.Group', caption:'Group', image:_img_widgets, imagePos:'-224px top', dragable:true}
            ]},
            {id:'linb.UI.absContainer',caption:'Containers',group:true, image:_img_app, imagePos:'-48px -48px',sub:[
                {id:'linb.UI.Pane', caption:'Pane', image:_img_widgets, imagePos:'-288px top', dragable:true},
                {id:'linb.UI.Panel', caption:'Panel', image:_img_widgets, imagePos:'-672px top', dragable:true},
                {id:'linb.UI.Block', caption:'Block', image:_img_widgets, imagePos:'-304px top', dragable:true},
                {id:'linb.UI.Layout', caption:'Layout', image:_img_widgets, imagePos:'-336px top', dragable:true},

                {id:'linb.UI.Tabs', caption:'Tabs', image:_img_widgets, imagePos:'-352px top', dragable:true},

                {id:'linb.UI.Stacks', caption:'Stacks', image:_img_widgets, imagePos:'-368px top', dragable:true},
                {id:'linb.UI.ButtonViews', caption:'ButtonViews', image:_img_widgets, imagePos:'-384px top', dragable:true},
                {id:'linb.UI.IconList', caption:'IconList', image:_img_widgets, imagePos:'-384px top', dragable:true},
                {id:'linb.UI.Dialog', caption:'Dialog', image:_img_widgets, imagePos:'-320px top', dragable:true}
            ]},
            {id:'linb.UI.absNavigator',caption:'Navigators',group:true, image:_img_app, imagePos:'-48px -48px', sub:[
                {id:'linb.UI.PageBar', caption:'PageBar', image:_img_widgets, imagePos:'-48px -16px', dragable:true},

                {id:'linb.UI.PopMenu', caption:'PopMenu', image:_img_widgets, imagePos:'-400px top', dragable:true},
                {id:'linb.UI.MenuBar', caption:'MenuBar', image:_img_widgets, imagePos:'-416px top', dragable:true},
                {id:'linb.UI.ToolBar', caption:'ToolBar', image:_img_widgets, imagePos:'-432px top', dragable:true},
                {id:'linb.UI.LinkList', caption:'LinkList', image:_img_widgets, imagePos:'-16px -16px', dragable:true},
                {id:'linb.UI.FoldingList', caption:'FoldingList', image:_img_widgets, imagePos:'-32px -16px', dragable:true},
                {id:'linb.UI.Gallery', caption:'Gallery', image:_img_widgets, imagePos:'-448px top', dragable:true},
				{id:'linb.UI.jsTree', caption:'jsTree', image:_img_widgets, imagePos:'-464px top', dragable:true},
                {id:'linb.UI.TreeBar', caption:'TreeBar', image:_img_widgets, imagePos:'-464px top', dragable:true},
                {id:'linb.UI.TreeGrid', caption:'TreeGrid', image:_img_widgets, imagePos:'-480px top', dragable:true}
            ]},
            {id:'linb.UI.absSchedule',caption:'Schedules',group:true, image:_img_app, imagePos:'-48px -48px', sub:[
                {id:'linb.UI.Calendar', caption:'Calendar', image:_img_widgets, imagePos:'-496px top', dragable:true},
                {id:'linb.UI.TimeLine', caption:'TimeLine', image:_img_widgets, imagePos:'-528px top', dragable:true}
            ]},
            {id:'linb.UI.absMisc',caption:'Medias',group:true, image:_img_app, imagePos:'-48px -48px', sub:[
                {id:'linb.UI.Image', caption:'Image Element', image:_img_widgets, imagePos:'-624px top', dragable:true}

/*
                {id:'linb.UI.Media', caption:'Media', image:_img_widgets, imagePos:'-576px top', dragable:true},
                {id:'linb.UI.Shape', caption:'Shape', image:_img_widgets, imagePos:'-544px top', dragable:true},
                {id:'linb.UI.Chart', caption:'Chart', image:_img_widgets, imagePos:'-560px top', dragable:true}
*/
            ]}
        ],
        ComFactoryProfile:{
            about:{
                cls:'VisualJS.About'
            },
            addFile:{
                cls:'VisualJS.AddFile'
            },
            delFile:{
                cls:'VisualJS.DelFile'
            },
            prjPro:{
                cls:'VisualJS.ProjectPro'
            },
            prjSel:{
                cls:'VisualJS.ProjectSelector'
            },
            
            objEditor:{
                cls:'VisualJS.ObjectEditor'
            }
        }
    };
    var fun=function(items,hash){
        var self=arguments.callee;
        _.arr.each(items,function(o){
            hash[o.id]=o;
            if(o.sub && o.sub.length){
                self(o.sub, hash);
                o.tips='$VisualJS.designer.openwidgets';
            }else
                o.tips='$VisualJS.designer.dragwidget';
        });
    };
    CONF.mapWidgets = {};
    fun(CONF.widgets, CONF.mapWidgets);
    linb.ini.appLangKey="VisualJS";
};
