Class('VisualJS', 'linb.Com',{
    Constructor:function(){
        var self=this,
            o=linb.message;
        arguments.callee.upper.apply(self,arguments);
        SPA=this;
        self.curProject = null;
        self.Message=[];
        linb.message = function(content){
            if(self.Message.length>20)self.Message.pop();

            if(typeof content != 'string')
                content=String(content);

            if(/</.test(content))
               while(content!=(content=content.replace(/<[^<>]*>/g, "")));

            self.Message.unshift({id:_.id(), caption: content.length>50?content.substr(0,50)+'...':content, tips:content, image:CONF.img_app, imagePos:'-64px -64px'});

            self.toolbar.updateItem('info', {caption:content.length>50?content.substr(0,50)+'...':content});

            o.apply(null,arguments);
        };

        linb('body').css({height:'100%',overflow:'hidden'});
    },
    Instance:{
        events:{
            beforeCreated:function(){
                linb.Dom.setCover('<img src="'+linb.getPath('img/','loading.gif') + '" border="0"/><div>Created</div>');
            },
            onLoadBaseClass:function(com,threadid,key){
                linb.Dom.setCover('<img src="'+linb.getPath('img/','loading.gif') + '" border="0"/><div>'+'Load Base Class: '+ key+'</div>');
            },
            onIniResource:function(){
                linb.Dom.setCover('<img src="'+linb.getPath('img/','loading.gif') + '" border="0"/><div>Load Resource</div>');
            },
            onLoadReqiredClass:function(com,threadid,key){
                linb.Dom.setCover('<img src="'+linb.getPath('img/','loading.gif') + '" border="0"/><div>'+'Load widgets: '+ com.KEY+ key+'</div>');
            },
            onReady:function(page){
                linb.ComFactory.setProfile(CONF.ComFactoryProfile);
                this.menubar.setItems([
                    {id:'file', caption:'$VisualJS.menu.file', sub:[
                        {id:'newproject', caption:'$VisualJS.menu.newproject', image:CONF.img_app, imagePos:'-32px top'},
                        {id:'openproject', caption:'$VisualJS.menu.openproject', add:'Ctrl+Alt+O', image:CONF.img_app, imagePos:'-48px top'},
                        {id:'closeproject', caption:'$VisualJS.menu.closeproject'},
                        {type:'split'},
                        {id:'saveall', caption:'$VisualJS.menu.saveall', add:'Ctrl+Alt+S', image:CONF.img_app, imagePos:'-96px top'}
                    ]},
                    {id:'build',caption:'$VisualJS.menu.build', sub:[
                        {id:'debug', caption:'$VisualJS.menu.debug', image:CONF.img_app, imagePos:'-239px -64px',add:'F9'},
                        {id:'release', caption:'$VisualJS.menu.release', image:CONF.img_app, imagePos:'-144px top',add:'Ctrl+F9'}
                    ]},
                    {id:'help',caption:'$VisualJS.menu.help', sub:[
                        {id:'forum', caption:'$VisualJS.menu.forum'},
                        {type:'split'},
                        {id:'license', caption:'$VisualJS.menu.license', sub:[
                            {id:'gpllicense', caption:'$VisualJS.menu.gpllicense'},
                            {id:'clicense', caption:'$VisualJS.menu.clicense'},
                            {id:'purchase', caption:'$VisualJS.menu.purchase'}
                        ]},
                        {type:'split'},
//                        {id:'flash', image:CONF.img_app, imagePos:'-128px -17px', caption:'$VisualJS.tool.flash'},
//                        {id:'demo', image:CONF.img_app, imagePos:'-48px -64px ', caption:'$VisualJS.tool.demo'},
//                        {type:'split'},
                        {id:'about', caption:'$VisualJS.menu.about'}
                    ]}
                ]);
                this.toolbar.setItems([{id:'only', sub:[
                    {id:'newproject', image:CONF.img_app, imagePos:'-32px top', tips:'$VisualJS.tool.newp'},
                    {id:'openproject', image:CONF.img_app, imagePos:'-48px top', tips:'$VisualJS.tool.open'},
                    {split:true},
                    {id:'saveall', image:CONF.img_app, imagePos:'-96px top', tips:'$VisualJS.tool.saveall'},
                    {split:true},
                    {id:'debug', image:CONF.img_app, imagePos:'-239px -64px', tips:'$VisualJS.tool.debug'},
                    {id:'release', image:CONF.img_app, imagePos:'-144px top', tips:'$VisualJS.tool.release'},
/*                    {split:true},
                    {id:'flash', image:CONF.img_app, imagePos:'-128px -17px', tips:'$VisualJS.tool.flash'},
                    {id:'demo', image:CONF.img_app, imagePos:'-48px -64px ', tips:'$VisualJS.tool.demo'},
*/
                    {split:true},
                    {id:'ec', image:CONF.img_app, imagePos:'-98px -16px', tips:'$VisualJS.tool.ec'},
                    {split:true},
                    {id:'info', image:CONF.img_app, imagePos:'-286px -64px ', caption:'$VisualJS.noMessage', tips:'$VisualJS.message'}
                ]}]);
                this.floatLogo.setCustomStyle({"KEY":"background-image:url("+linb.getPath('img/','logo.gif')+");position:absolute;top:0px;right:0px;width:120px;height:60px;z-index:100;cursor:pointer;"})
            },
            onRender:function(page){
                var key = 'prj',
                    r ='([&|\?|#]|\\b)('+ key +'=)([^&]*)([&]?)',
                    a = location.href.match(new RegExp(r)),
                    prj = _.isNull(a)?'':decodeURIComponent(a[3]);
                if(prj){
                    prj=CONF.prjPath+prj;
                    linb.request(CONF.phpPath,({
                        key:CONF.requestKey,
                        para:{
                            action:'open',
                            hashCode:_.id(),
                            path:prj
                        }
                    }),function(txt){
                        var obj = typeof txt=='string'?_.unserialize(txt):txt;
                        if(obj && !obj.error)
                            page._openproject(prj, obj.data);
                        else linb.message(obj.error.message);
                    });
                }
                /*
                //use appearance
                var appea = linb.UI.List.getAppearance('custom');
                if(!appea){
                    appea = _.clone(linb.UI.List.getAppearance('default'));
                    appea.ITEM['border-bottom']='dashed 1px gray';
                    linb.UI.List.setAppearance('custom', appea);
                }
                page.$infoList = new linb.UI.List({shadow:true, resizable:true, width:400},null,null,null,null,'custom').render();
                */
                //use customApperance
                page.$infoList = new linb.UI.List({width:400}).setCustomStyle('ITEM', 'border-bottom:dashed 1px gray').render();

                //linb.Dom.addHeadNode('js','','',{id:'linb:msg',src:'http://www.sigmawidgets.com/message?ver='+_.version+'&rnd='+_()});
            }
        },

        base:['linb.UI','linb.Date'],
        required:["linb.UI.List","linb.UI.PopMenu","linb.UI.MenuBar","linb.UI.ToolBar","linb.UI.Layout","linb.UI.Tabs","linb.UI.TreeBar","linb.UI.Dialog","linb.UI.Panel","linb.Tips","linb.UI.Shadow","linb.UI.Resizer","linb.UI.Border","linb.UI.Div"],
        //back ground lazy load
        background:[

//VisualJS Class
            "VisualJS.ProjectSelector",
            "VisualJS.ProjectPro",

            "VisualJS.PageEditor",
            "VisualJS.ClassTool",
            "VisualJS.ClassEditor",
            "VisualJS.ClassStruct",

            "VisualJS.ObjectEditor",

            "VisualJS.Designer",
            "VisualJS.AddFile",
            "VisualJS.DelFile",
            "VisualJS.About",

//coder
            "linb.Coder",

//normal class
            "linb.UI.Label",
            "linb.UI.Button",
            "linb.UI.CheckBox",
            "linb.UI.Input",
            "linb.UI.ComboInput",
            "linb.UI.Group",
            "linb.UI.IconList",
            "linb.UI.RadioBox",
            "linb.UI.Block",
            "linb.UI.Stacks",
            "linb.UI.ButtonViews",

            "linb.UI.TextEditor",
            "linb.UI.TreeGrid"
        ],
        _addfile:function(id, path, name, type){
            var tb = this.treebarPrj,pathadd;
            if(type!='/'){
                name=name+type;
                pathadd=path+'/'+name;
            }else{
                pathadd=path=path+'/'+name;
            }
            linb.request(CONF.phpPath, ({
                key:CONF.requestKey,
                para:{
                    action:'add',
                    hashCode:_.id(),
                    type:type=='/'?'dir':'file',
                    path:path,
                    filename:name
                }
            }),function(txt){
                var obj = typeof txt=='string'?_.unserialize(txt):txt;
                if(obj && !obj.error && obj.data && obj.data.OK){
                        var imagePos;
                        if(type=='/')
                            imagePos='-48px top';
                        else{
                            var a = name.split('.');
                            switch(a[1].toLowerCase()){
                                case 'html':
                                    imagePos='-112px -48px';
                                    break;
                                case 'css':
                                    imagePos='-208px -48px';
                                    break;
                                case 'js':
                                    imagePos='-16px -48px';
                                    break;
                                default:
                                    imagePos='-96px -48px';
                            }
                        }
                        tb.insertItems([{id: pathadd, caption: name , image:CONF.img_app, imagePos:imagePos, value:pathadd, sub:type=='/'?[]:null}], id)
                }else
                    linb.message(obj.error.message);
            });
        },
        _delfile:function(id){
            var tb = this.treebarPrj, 
                tab=this.tabsMain,
                arr = id.split(';'), 
                a=[];
            _.arr.each(arr,function(o,i){
                a[i]=o;
            });
            linb.request(CONF.phpPath, {
                key:CONF.requestKey,
                para:{
                    action:'del',
                    hashCode:_.id(),
                    path:a
                }
            },function(txt){
                var obj = typeof txt=='string'?_.unserialize(txt):txt;
                if(obj && !obj.error && obj.data && obj.data.OK){
                    tb.removeItems(arr);
                    var items = tab.getItems(),b=[];
                    _.arr.each(items,function(o){
                        if(!tb.getSubIdByItemId(o.id))
                            b.push(o.id);
                    },null,true);
                    tab.removeItems(b);
                }else
                    linb.message(obj.error.message);
            });
        },
        _projecttool_onclick:function(profile,item, group, e, src){
            var self=this;
            switch(item.id){
                case 'new':
                    linb.ComFactory.getCom('addFile',function(){
                        this.host = self;
                        this.setProperties({
                            onOK: self._addfile,
                            fromRegion:linb(src).cssRegion(true),
                            items: self.curPrjFiles
                        });
                        this.show(linb('body'));
                    });
                    break;
                case 'delete':
                    linb.ComFactory.getCom('delFile',function(){
                        this.host = self;
                        this.setProperties({
                            fromRegion:linb(src).cssRegion(true),
                            items:self.curPrjFiles,
                            onOK: self._delfile
                        });
                        this.show(linb('body'));
                    });
                    break;
                case 'refresh':
                    linb.request(CONF.phpPath,  {
                        key:CONF.requestKey,
                        para:{
                            action:'open',
                            hashCode:_.id(),
                            path:self.curProject
                        }
                    } ,function(txt){
                        var obj = typeof txt=='string'?_.unserialize(txt):txt;
                        if(!obj || obj.error)
                            linb.message(obj.error.message);
                        else{
                            _.tryF(self._openproject, [self.curProject, obj.data], self);
                            linb.message(linb.getRes('VisualJS.tool2.refreshOK'));
                        }
                    });
                break;
            }
        },
        _dirtyWarn:function(callback){
            var self=this, dirty,tb = this.tabsMain, items = tb.getItems(),tree = this.treebarPrj;
            _.arr.each(items,function(o){
                if(o._dirty)return !(dirty=true);
            });
            if(dirty)
                linb.UI.Dialog.confirm(linb.getRes('VisualJS.notsave'), linb.getRes('VisualJS.notsave3'), callback);
            else
                callback();
        },
        _closeproject:function(callback){
            var self=this, dirty,tb = this.tabsMain, items = tb.getItems(),tree = this.treebarPrj;
            _.arr.each(items,function(o){
                if(o && o._dirty)return !(dirty=true);
            });
            var fun = function(){
                tb.clearItems();
                tree.clearItems();
                self.curProject = null;
                this.curPrjFiles=[];
                self.projecttool.setDisabled(true);
                if(typeof callback=='function')callback();
            };

            if(dirty)
                linb.UI.Dialog.confirm(linb.getRes('VisualJS.notsave'), linb.getRes('VisualJS.notsave2'), fun);
            else
                fun();
        },
        _tabsmain_beforepageclose:function(profile, item, src){
            if(item._dirty){
                linb.UI.Dialog.confirm(linb.getRes('VisualJS.notsave'), linb.getRes('VisualJS.notsave2'), function(){
                    profile.boxing().removeItems(item.id);
                });
                return false;
            }
        },
        _tabsmain_afterpageclose:function(profile, item, src){
            if(item.$obj)item.$obj.destroy();
        },
        _tabsmain_beforeValueUpdated:function(profile, ov, nv){
            var item = this.tabsMain.getItemByItemId(ov);
            if(!item)return;
            if(t=item.$obj){
                if(t.getValue()===false)return false;
            }
        },
        _tabmain_onitemselected:function(profile,item,src){
            _.tryF(function(){
                if(item.$obj)item.$obj.activate();
            });
        },
        _treebarprj_onitemselected:function(profile, item, src){
            if(!item.id)return;
            var page=this,
                arr = item.caption.split('.'),
                type=arr[arr.length-1];
            if(type!='js' && type!='html' && type!='css' && type!='php'){
                linb.Dom.submit(item.id);
                return;
            }

            var value = item.value,
                arr = value.split('/'),
                filename = arr[arr.length-1],
                filetype = filename.split('.')[1],
                imagePos = filetype=='js'?'-16px -48px':'-128px -48px';

            filetype = filetype=='js'?'class':filetype;

            var tb=page.tabsMain,
                t = linb(src).cssRegion(true),
            pro = tb.reBoxing().cssRegion(true);
            if(tb.getItemByItemId(value)){
                tb.fireItemClickEvent(value);
            }else{
                //animate
                linb.Dom.animate({border:'dashed 1px #ff0000'},{left:[t.left,pro.left],top:[t.top,pro.top],width:[t.width,pro.width],height:[t.height,pro.height]},null,function(){},240,8,'inexp').start();

                var filecon;
                _.observableRun([
                    //get file content
                    function(threadid){
                        var funOK = function(txt){
                            txt = typeof txt=='string'?_.unserialize(txt):txt;
                            if(txt.error){
                                linb.message(txt.error.message);
                                return;
                            }
                            filecon=txt.data.file;
                        }, 
                        funFail=function(msg){
                            linb.message(msg);
                        };
                        linb.request(CONF.phpPath,{
                            key:CONF.requestKey,
                            para:{
                                action:'getfile',
                                hashCode:_.id(),
                                path:value
                        }},funOK,funFail,threadid);
                    },
                    //add tab page
                    function(threadid){
                        if(filecon){
                            var item = {
                                    id:value, tips:value, caption:filename , closeBtn:true, image:CONF.img_app, imagePos:imagePos,
                                    newText:filecon,
                                    text:filecon
                                },
                                items = tb.getItems(),
                                itemid=item.id,
                                callback=function(pagprofile, pro, b){
                                    tb.markItemCaption(pagprofile.properties.keyId, b);
                                };
                            tb.insertItems([item], items.length?items[items.length-1].id:null);
                            tb.fireItemClickEvent(value);
    
                            if(filetype != 'class'){
                                linb.ComFactory.newCom('VisualJS.PageEditor',function(){
                                    var tabPage=tb.getPanel(item.id);
                                    if(tabPage.isEmpty())return;

                                    var inn=this;
                                    inn.host = page;
                                    inn.setProperties({
                                        keyId:itemid
                                    });
                                    inn.$checkType=filetype;
                                    inn.setEvents('onValueChanged',callback);
                                    inn.show(function(com){
                                        com.setValue(filecon);
                                    }, tabPage);
                                    item.$obj=inn;
                                },threadid);
                            }else{
                                linb.ComFactory.newCom('VisualJS.ClassEditor',function(){
                                    var tabPage=tb.getPanel(item.id);
                                    if(tabPage.isEmpty())return;
                                    
                                    var inn=this;
                                    inn.host = page;
                                    inn.setProperties({
                                        keyId:itemid
                                    });
                                    inn.setEvents('onValueChanged',callback);
                                    inn.show(function(com){
                                        com.setValue(filecon);
                                        com.showPage('normal');
                                    }, tabPage);
                                    item.$obj=inn;
                                },threadid);
                            }
                        }
                    }
                ]);
            }
        },
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var t=this, n=[], u=linb.UI, f=function(c){n.push(c.get(0))};

            f(
            (new u.ToolBar)
            .host(t,"toolbar")
            .setDockOrder("2")
            .setItems([])
            .onClick("_toolbar_onclick")
            );

            f(
            (new u.MenuBar)
            .host(t,"menubar")
            .setDockOrder("1")
            .setItems([])
            .onMenuSelected("_menubar_onclick")
            );

            f(
            (new u.Div)
            .host(t,"floatLogo")
            .onRender(function (pro) {
                pro.root.onClick(function () {linb.Dom.submit(CONF.path_link);});
            })
            );

            f(
            (new u.Layout)
            .host(t,"layout")
            .setLeft(0)
            .setTop(0)
            .setItems([{"id":"before","pos":"before","locked":false,"size":150,"min":50,"max":300,"cmd":true,"hide":false},{"id":"main","min":10}])
            .setType("horizontal")
            );

            t.layout.append(
            (new u.Panel)
            .host(t,"panelbar2")
            .setCaption("$VisualJS.pm.title")
            .setImage('@CONF.img_app')
            .setImagePos("-128px -48px")
            , 'before');

            t.panelbar2.append(
            (new u.TreeBar)
            .host(t,"treebarPrj")
            .setSelMode("none")
            .setPosition("relative")
            .setDock("none")
            .setItems([])
            .setIniFold(false)
            .setGroup(true)
            .onItemSelected("_treebarprj_onitemselected")
            );

            t.layout.append(
            (new u.Tabs)
            .host(t,"tabsMain")
            .setLeft(0)
            .setTop(0)
            .setItems([])
            .beforeUIValueSet("_tabsmain_beforeValueUpdated")
            .beforePageClose("_tabsmain_beforepageclose")
            .afterPageClose("_tabsmain_afterpageclose")
            .onItemSelected("_tabmain_onitemselected")
            .setCustomStyle({PANEL:'overflow:hidden;'})
            , 'main');

            t.layout.append(
            (new u.ToolBar)
            .host(t,"projecttool")
            .setDock("bottom")
            .setHandler(false)
            .setHAlign("right")
            .setDisabled(true)
            .setItems([{id:'only', sub:[
                {id:'refresh', image:'@CONF.img_app', imagePos:'-113px -16px', tips:'$VisualJS.tool2.refresh'},
                {type:'split'},
                {id:'new', image:'@CONF.img_app', imagePos:'-0px -16px', tips:'$VisualJS.tool2.new'},
                {id:'delete', image:'@CONF.img_app', imagePos:'-80px -16px', tips:'$VisualJS.tool2.del'}
            ]}])
            .onRender(function (profile) {
                profile.getSubNode("ITEMS").css({borderLeftWidth:0, borderRightWidth:0, borderBottomWidth:0});
            })
            .onClick("_projecttool_onclick")
            , 'before');

            return n;
            // ]]code created by jsLinb UI Builder
        },
        _toolbar_onclick: function(profile,item, group, e, src){
            this._menubar_onclick(this.menubar.get(0), null, item, src);
        },_openproject: function(pm, obj){
            this.curProject = pm;
            var tb = this.treebarPrj;
            //sort to appropriate order
            obj.sort(function(x,y){
                return x.layer<y.layer?1:x.layer==y.layer?(
                    x.type>y.type?1:x.type==y.type?(
                        x.location>y.location?1:-1
                    ):-1
                ):-1;
            });
            //root
            var names=pm.split('/'), name=names[names.length-1], imagePos,
            hash={
                '*':{id:pm, caption: name , image:CONF.img_app, imagePos:'-128px -48px', value:pm, sub:[]}
            },
            arr=[hash['*']];
            //add sub
            _.arr.each(obj,function(o){
                if(!o.type)
                    imagePos='-48px top';
                else{
                    var a = o.name.split('.');
                    switch(a[1].toLowerCase()){
                        case 'html':
                            imagePos='-112px -48px';
                            break;
                        case 'css':
                            imagePos='-208px -48px';
                            break;
                        case 'js':
                            imagePos='-16px -48px';
                            break;
                        default:
                            imagePos='-96px -48px';
                    }
                }
                hash[o.id] = {id:o.location, caption: o.name , image:CONF.img_app, imagePos:imagePos, value:o.location};
                if(!o.type)
                    hash[o.id].sub=[];

                hash[o.pid].sub.push(hash[o.id]);
            });
            tb.clearItems();
            tb.insertItems(arr);
            this.curPrjFiles=tb.getItems();
            this.projecttool.setDisabled(false);
        },
        _menubar_onclick: function(profile, popPro, item, src){
            var self=this;
            switch(item.id){
                case 'newproject':
                    var callback=function(){
                        linb.ComFactory.getCom('prjPro',function(){
                            this.host = self;
                            this.setProperties({
                                projectName : 'SPA_'+parseInt(Math.random()*10000000000),
                                jsLINBPath : '',
                                className : 'App',
                                readonly : false,
                                fromRegion:linb(src).cssRegion(true),
                                onOK: self._openproject
                            });
                            this.show(linb('body'));
                        });
                    };
                    if(this.curProject)
                        this._closeproject(callback);
                    else
                        callback();
                    break;
                case 'closeproject':
                    if(!this.curProject){
                        linb.message(linb.getRes('VisualJS.ps.noprj'));
                        return;
                    }
                    this._closeproject();
                    break;
                case 'openproject':
                    var callback=function(){
                        linb.ComFactory.getCom('prjSel',function(){
                            this.host = self;
                            this.setProperties({
                                fromRegion:linb(src).cssRegion(true),
                                onOK: self._openproject
                            });
                            this.show(linb('body'));
                        });
                    };
                    if(this.curProject)
                        this._closeproject(callback);
                    else
                        callback();
                    break;
                case 'saveall':
                    if(!this.curProject){
                        linb.message(linb.getRes('VisualJS.ps.noprj'));
                        return;
                    }
                    var tb=this.tabsMain, 
                        count=0,
                        items=tb.getItems(),
                        hash={};
                    _.arr.each(items,function(o){
                        if(o._dirty){
                            var newText = o.$obj.getValue();
                            if(false===newText)
                                return false;

                            hash[o.id]=linb.IAjax(CONF.phpPath, {key:CONF.requestKey, para:{
                                    action:'save',
                                    hashCode:_.id(),
                                    path: o.id,
                                    content:newText
                                }}, 
                                function(txt){
                                    var obj = typeof txt=='string'?_.unserialize(txt):txt;
                                    if(obj && !obj.error && obj.data && obj.data.OK){
                                        o.$obj.setValue(newText);
                                        tb.markItemCaption(o.id,false,true);
                                        count++;
                                    }else
                                        linb.message(obj.error.message);
                                },function(txt){
                                    linb.message(txt);
                                }
                            );
                        }
                    });

                    if(!_.isEmpty(hash))
                        _.observableRun(function(threadid){
                            linb.absIO.groupCall(hash,null,null,function(){
                                linb.message(linb.getRes('VisualJS.ps.saved', count));
                            },threadid);
                        });
                    break;
                case 'ec':
                    linb.reLang(linb.$lang=='en'?'cn':'en',function(){
                        self.menubar.clearPopCache();
                    });
                    break;
//                case 'flash':
//                    linb.Dom.submit(CONF.path_video);
//                    break;
//                case 'demo':
//                    linb.Dom.submit('demo.html');
//                    break;
                case 'info':
                    if(!this.Message.length)
                        return;
                    var list=this.$infoList, node=list.reBoxing();
                    list.setItems(_.copy(this.Message));
                    node.popToTop(src,4);
                    var unFun=function(){
                        node.hide();
                        //unhook
                        linb.Event.keyboardHook('esc');
                    };
                    //for on blur disappear
                    node.setBlurTrigger(list.get(0).$id, unFun);
                    //for esc
                    linb.Event.keyboardHook('esc',0,0,0,unFun);

                    break;
                case 'debug':
                    if(!self.curProject){
                        linb.message(linb.getRes('VisualJS.ps.noprj'));
                        return;
                    }
                    self._dirtyWarn(function(){
                        linb.Dom.submit(linb.ini.appPath+self.curProject);
                    });
                    break;
                case 'release':
                    if(!self.curProject){
                        linb.message(linb.getRes('VisualJS.ps.noprj'));
                        return;
                    }
                    self._dirtyWarn(function(){
                        linb.IAjax(CONF.phpPath, {key:CONF.requestKey, para:{path: self.curProject, action:'release'}}, null, {method:'POST'}).start();
                    });
                    break;
                case 'forum':
                    linb.Dom.submit(CONF.path_forum);
                    break;
                case 'download':
                    linb.Dom.submit(CONF.path_download);
                    break;

                case 'gpllicense':
                    linb.Dom.submit(CONF.path_gpllicence);
                    break;
                case 'clicense':
                    linb.Dom.submit(CONF.path_licence);
                    break;
                case 'purchase':
                    linb.Dom.submit(CONF.path_purchase);
                    break;
                case 'about':
                    linb.ComFactory.getCom('about',function(){
                        this.dialog.show(null,true);
                    });
                    break;
                default:
                    linb.message(linb.getRes('VisualJS.soon'));
            }
        }
    }
});