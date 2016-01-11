Class('App', 'linb.Com',{
        Initialize:function(){
            var arr=[];

            arr.push('.ccss-item{text-decoration: line-through;}');

            arr.push('h1{margin:10px 2px 2px 10px; padding-bottom:10px; font: bold 24px "Trebuchet MS","Lucida Grande",Verdana,sans-serif; color: #D00000; border-bottom: 1px dashed #aca899;}');
            arr.push('h2{margin:10px 2px 10px 2px; font: bold 18px "Trebuchet MS","Lucida Grande",Verdana,sans-serif;  color:#134275; border-bottom: 1px dashed #aca899;}');
            arr.push('h2.notice{color:#000}');
            arr.push('h2.inherite{color:#D2691E}');
            arr.push('h3{margin:10px 2px 10px 2px; font: bold 16px Bookman Old Style, Helvetica, sans-serif; color: #4C4B43; border-bottom: 1px dashed #aca899;}');
            arr.push('h4{position:relative;padding-left:20px;font: bold 12px "Trebuchet MS","Lucida Grande",Verdana,sans-serif;background:#F9FFE9;}');
            arr.push('.totop{position:absolute;padding-left:3px;padding-right:3px;left:4px;top:4px;}');

            arr.push('.linb-custom-block{margin:2px 2px 2px 18px;display:none;}');
            arr.push('.linb-custom-icon{margin:2px;width:16px;height:16px;background-image:url(img/img.gif);vertical-align: bottom;}');

            arr.push('.inndiv {margin:3px;}');
            arr.push('.inndiv li{padding-left:20px;}');
            
            arr.push('.required{color:red;}');

            arr.push('.linb-custom-block .p{margin:2px;border: 1px solid #E9D3F4;position:relative;}');
            arr.push('.linb-custom-block .con{display:none;padding:8px; font: 12px "Trebuchet MS","Lucida Grande",Verdana,sans-serif;background:#FFF;border-top: 1px solid #E9D3F4;}');

            arr.push('.linb-custom-list{background:#E5ECF9;border:1px solid #3366CC;margin:2px;padding:5px;}');

            arr.push('.linb-custom-list a{text-decoration: underline;}');

            arr.push('.linb-custom-cmd{cursor:pointer;margin:2px;width:16px;height:16px;line-height:0;font-size:0;background-image:url(img/img.gif)}');

            linb.CSS.addStyleSheet(arr.join(''),'',true);
            
            //dont want to show original function code
            _.id.$auto$=1;

        },
        Instance:{
        $S_CLS:{'Namespace':1,'Class':1,'_':1,'_.fun':1,'_.arr':1,'_.str':1,'linb':1},
        $CLS_FUN:{'Namespace':1,'Class':1,'_':1,'_.fun':1,'linb':1,'linb.Thread':1,'linb.Ajax':1,'linb.SAjax':1,'linb.IAjax':1,'linb.SC':1},
        $CLS_STATIC:{'_.fun':1,'linb':1,'linb.Thread':1,'linb.Ajax':1,'linb.SAjax':1,'linb.IAjax':1,'linb.SC':1,'linb.Event':1,'linb.DragDrop':1,'linb.CSS':1,'linb.History':1,'linb.Cookies':1,'linb.ComFactory':1,'linb.Debugger':1,'linb.Date':1,'linb.Tips':1,'linb.Coder':1},
        events:{onRender:'_onrender'},
        _onrender:function(){
            SPA=this;
            SPA.btnLang.setCaption(linb.getRes('app.'+linb.$lang));
            linb.UI.Border.$abstract=linb.UI.Shadow.$abstract=linb.UI.Resizer.$abstract=true;
            linb.History.setCallback(function(str){
                str=str.replace('#','');
                if(!str)return;
                var obj, t, id1, id2, id3, id4;
                obj=linb.SC.get(str);
//input must be a valid object path
                while(!obj && str.indexOf('.')!=-1){
                    t=str.split('.');
                    t.pop();
                    str=t.join('.');
                    obj=linb.SC.get(str);
                }
                //if same
                if(SPA.__vid==str)return;
                //if return to list
                if(SPA.__vid && _.str.endWith(SPA.__vid, '._list'))
                    return;

                SPA.__vid=str;

                if(str.indexOf('.prototype.')!=-1){
                    id1=str.split('.prototype.')[0];
                    if(obj){
                        id2= id1 + (obj.$event$?'._event':'._prototype');
                        if(obj.$original$)
                            id3= obj.$original$==linb.SC.get(id1).KEY? null: (id2 + '.' + obj.$original$.replace(/\./g,'_'));
                    }
                    id4=str;
                }else{
                    //show to class layer only
                    if(SPA.$S_CLS[str] || obj.$linb$){
                        id1=str;
                        //construcotr or global function
                        id2=id1+'.constructor';
                        id4=id1+'._global';

                        id3=id2+'.'+id1.replace(/\./g,'_');
                    //show to static method
                    }else if(typeof obj=='function'){
                        id1=str.slice(0,str.lastIndexOf('.'));
                        id2=id1+'._staticM';
                        if(obj && obj.$original$)
                            id3=obj.$original$==linb.SC.get(id1).KEY?null:id2+'.'+obj.$original$.replace(/\./g,'_');
                        id4=str;
                    //show to static property
                    }else{
                        id1=str.slice(0,str.lastIndexOf('.'));
                        id2=id1+'._staticP';
                        //properties: no super
                        id3=null;
                        id4=str;
                    }
                }
 

                if(id1){
                    if(SPA._curId!=id1){
                        SPA._curId=id1;
                        SPA.objTree.openToNode(id1).setValue(id1);
                        var node=SPA.divHead.getRoot(),
                            ics=SPA._iconPosMap,
                            f=SPA._clickForToggle
                            ;
                        //build html
                        SPA.divHead.setHtml( SPA._format( SPA._parse(id1) ) );
                        //attach event
                        node.query('h2').css('cursor','pointer').onClick(f).first().css('backgroundPosition',ics.close);
                        node.query('h3').css('cursor','pointer').onClick(f).first().css('backgroundPosition',ics.close);
                    }
                    //open
                    _.arr.each([id2,id3,id4],function(id){
                        var t;
                        if(id && (t=linb.Dom.byId(id)) && _.get(t,['nextSibling', 'style', 'display'])!='block')linb(id).onClick();
                    });
                    //focus
                    if(id4 && (t=linb.Dom.byId(id4)))
                        _.asyRun(function(){
                            SPA.divHead.getRoot().scrollTop(linb(id4).offset(null,SPA.divHead.getRoot()).top);
                        });
                }
            });            
        },
        showCode:function(e, key){
            var txt = linb.getRes('app.oCodeDesc') + 
                      key + ' = ' + 
                      linb.SC(key).toString();
            txt = linb.Coder.formatAll(txt, 'js', ['plain']);
            var node=linb.create("<div style='visibiliy:hidden;left:-10000px;width:600px;background:#fff;border:solid 1px #aaa;overflow:auto;'>"+txt+"</div>");
            //add first
            linb('body').append(node);
            //adjust height
            if(node.first().height()>400)node.height(400);
            //pop
            node.popToTop(linb.Event.getPos(e));

            node.setBlurTrigger(_()+"", function(){
                node.remove();
            });

            return false;
        },
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};

            append((new linb.UI.PopMenu)
                .host(host,"popLang")
                .setItems([{"id":"en", "caption":"$app.en"}, {"id":"cn", "caption":"$app.cn"}])
                .onMenuSelected("_pop_onmenuselected")
            );


            append((new linb.UI.Pane)
                .host(host,"paneTop")
                .setDock("top")
                .setHeight("38")
                .setCustomStyle({"KEY":"border:solid 1px;border-color:#fff #ccc #ccc #fff;background-color:#EBEADB;"})
            );
            
            host.paneTop.append((new linb.UI.Label)
                .host(host,"labelName")
                .setLeft(10)
                .setTop(10)
                .setWidth(270)
                .setCaption("$app.apititle")
                .setFontSize("16px")
                .setFontWeight("bold")
                .setHAlign('left')
            );
            
            host.paneTop.append((new linb.UI.Button)
                .host(host,"btnLang")
                .setTop(10)
                .setWidth("80")
                .setRight("10")
                .setType("drop")
                .onClickDrop("_butlang_onclickdrop")
                .onClick("_butlang_onclickdrop")
            );

            append((new linb.UI.Layout)
                .host(host,"mainLayout")
                .setItems([{"id":"before", "pos":"before", "locked":false, "size":240, "min":100, "max":400, "hide":false, "cmd":true, "caption":"before"}, {"id":"main", "min":10, "caption":"main"}])
                .setType("horizontal")
            );
            
            host.mainLayout.append((new linb.UI.TreeBar)
                .host(host,"objTree")
                .onRender("_objtree_aftercreated")
            ,'before');
            
            host.mainLayout.append((new linb.UI.Div)
                .host(host,"divHead")
                .setDock("fill")
                .setCustomStyle({"KEY":"overflow:auto;"})
            , 'main');

            return children;
            // ]]code created by jsLinb UI Builder
        },
        _pop_onmenuselected:function (profile, item, src) {
            if(linb.$lang==item.id)return;

            linb.reLang(item.id,function(){
                SPA.btnLang.setCaption(linb.getRes('app.'+linb.$lang));
                if(SPA.__vid){
                    var s=SPA.__vid;
                    delete SPA.__vid;
                    delete SPA._curId;
                    linb.History._callback(s);
                }
            });
        },
        _butlang_onclickdrop:function(profile, e, src) {
            SPA.popLang.refresh();
            SPA.popLang.pop(src);
        },
        _objtree_aftercreated:function (profile) {
            var items=[
                {id:'Namespace', href:'#Namespace', caption:'Namespace', image:'img/img.gif', imagePos:'left -48px'},
                {id:'Class', href:'#Class', caption:'Class', image:'img/img.gif', imagePos:'left -48px'},
                {id:'_', href:'#_', caption:'_', image:'img/img.gif', imagePos:'left -48px', sub:[]},
                {id:'linb', href:'#linb', caption:'linb',image:'img/img.gif', imagePos:'left top', sub:[]}
            ];
            var self=this,
                o=items[2], id=o.id, sub=o.sub,
                getClass=function(o, ref, id){
                    var arr=[],temp,id=id||o.KEY, temp, sub;
                    for(var i in o)
                        if('prototype'!=i && 'constructor' != i&& 'upper' !=i)
                            if(typeof o[i]=='function'&& o[i].$linb$){
                                
                                temp={id:id+'.'+i, href:'#'+id+'.'+i, caption:id+'.'+i, image:'img/img.gif',imagePos:ref._iconPosMap['cls']};
                                if(typeof linb.getRes('doc.'+id+'.'+i)!='object')
                                    temp.itemClass='ccss-item';
                                sub=arguments.callee(linb.SC.get(id+'.'+i),ref);
                                if(sub.length) temp.sub=sub;
                                arr.push(temp);
                            }
                    arr.sort(function(x,y){
                        return x.id>y.id?1:-1;
                    });
                    return arr;
                };
            o=linb.SC.get(id);
            for(var i in o){
                for(var j in o[i]){
                     if('prototype'!=j&&'constructor'!=j&&j.charAt(0)!='_'&&j.charAt(0)!='$'){
                        sub.push({id:id+'.'+i, href:'#'+id+'.'+i, caption:id+'.'+i, image:'img/img.gif', imagePos:self._iconPosMap[typeof o[i]=='function'?'fun':'hash']});
                        break;
                    }
                }
            }

            o=items[3];
            sub=o.sub; 
            id='linb'; 
            o.sub=getClass(linb, self, id);

            profile.boxing().setItems(items);
        },
        _getFunArgs:function(f,i){
            with (''+(i?f[i]:f)) return (i||'') + ' ( ' + slice(indexOf("(") + 1, indexOf(")")) + ' )';
        },
        _getItem:function(pos, head, key, okey, flag){
            var con = this.getDoc(key),t;
            okey=okey||key;
            return '<a name="'+okey+'" ></a> <div class="p"> <h4 id="'+okey+'">' + 
                    (con?'<span class="linb-custom-icon" style="background-position:' +pos+';"></span>':'') + 
                    head +
                    (flag !==false?((t=linb.SC(key)).$linb$||t.$auto$ ?"":'<a href="javascript:;" onclick="return SPA.showCode(event,\''+key+'\');">&nbsp;&nbsp;&nbsp;&nbsp;['+linb.getRes('app.oCode')+']</a>'):"") + 
                    '</h4>' + 
                    (con?'<div class="con">'+con+'</div>':"") + 
                    (flag!==false?'<a class="totop" href="#'+okey+'._list"> ^ </a>':'')+
                    '</div>'
                    ;
        },
        _format:function(obj){
            var key=obj.key,
                dot=".",
                pdot='.prototype.',
                ipm=this._iconPosMap;
            var ns=this,arr=[],getItem=function(){return ns._getItem.apply(ns,arguments);}

            arr.push('<h1><img src="img/work.gif" style="vertical-align: bottom;margin-right:4px;">'+obj.key+'</h1>');
            arr.push('<div>')
            if(obj.parent){
                obj.parent.sort();
                arr.push('<h2 id="'+key+'._parent'+'" class="inherite"><span class="linb-custom-cmd"></span>'+linb.getRes('app.supCls')+'</h2>');
                arr.push('<div class="linb-custom-block">')
                _.arr.each(obj.parent,function(o){
                    arr.push('<div class="p"><a href="#'+o+'"><div><span class="linb-custom-icon" style="background-position:' +ipm.cls+';"></span>'+ o +'</div></a></div>');
                });
                arr.push('</div>')
            }
            if(obj.children){
                obj.children.sort();
                arr.push('<h2 id="'+key+'._children'+'" class="inherite"><span class="linb-custom-cmd"></span>'+linb.getRes('app.subCls')+'</h2>');
                arr.push('<div class="linb-custom-block">')
                _.arr.each(obj.children,function(o){
                    arr.push('<div class="p"><a href="#'+o+'"><div><span class="linb-custom-icon" style="background-position:' +ipm.cls+';"></span>'+ o +'</div></a></div>');
                });
                arr.push('</div>')
            }
            if(this.$CLS_FUN[key]){
                arr.push('<h2 id="'+key+'._global'+'" class="notice"><span class="linb-custom-cmd"></span>'+linb.getRes('app.gFun')+'</h2>');
                arr.push('<div class="linb-custom-block">');
                arr.push(getItem(ipm.fun, obj.key + ' ' + this._getFunArgs(linb.SC(obj.key)), obj.key));
                arr.push('</div>')
            }

            if(this.$CLS_STATIC[key]){
                arr.push('<h2 id="'+_.id()+'" class="notice">&nbsp;&nbsp;&nbsp;&nbsp;'+linb.getRes('app.noCons')+'</h2>');
                arr.push('<div class="linb-custom-block"></div>');
            }

            if(obj.con && !this.$CLS_FUN[key] && !this.$CLS_STATIC[key]){
                arr.push('<h2 id="'+key+'.construcotr'+'" ><span class="linb-custom-cmd"></span>'+linb.getRes('app.constructor')+'</h2>');
                arr.push('<div class="linb-custom-block">');
                arr.push(getItem(ipm.con,obj.key + obj.con, obj.key+'.constructor', null, false));
                arr.push('</div>')
            }
            if(obj.vars){
                obj.vars.sort();
                arr.push('<h2 id="'+key+'._staticP'+'" ><span class="linb-custom-cmd"></span>'+linb.getRes('app.staticProperties')+'</h2>');
                var a1=[],a2=[],tt;
                _.arr.each(obj.vars,function(o){
                    tt=key + dot + o;
                    a1.push(getItem(ipm.mem,o, tt, tt, false));
                    a2.push("<a id='short-abc' href='#"+tt+"' >"+o+"</a> &nbsp;&nbsp;&nbsp;");
                });
                arr.push('<div class="linb-custom-block">'+'<div class="linb-custom-list">'+a2.join('')+'</div>'+a1.join('')+'</div>')
            }
            if(obj.funs){
                arr.push('<h2 id="'+key+'._staticM'+'" ><span class="linb-custom-cmd"></span>'+linb.getRes('app.staticMethods')+'</h2>');
                arr.push('<div class="linb-custom-block">');
                if(obj.funs.self){
                    obj.funs.self.sort();
                    var a1=[],a2=[],tt;
                    _.arr.each(obj.funs.self,function(o){
                        tt=key + dot + o[0];
                        a1.push(getItem(ipm.fun,o[1], tt));
                        a2.push("<a id='short-abc' name='"+tt+"._list' href='#"+tt+"' >"+o[0]+"</a> &nbsp;&nbsp;&nbsp;");
                    });
                    arr.push('<div class="linb-custom-list">'+a2.join('')+'</div>'+a1.join(''))
                }
                for(var i in obj.funs){
                    if(i!='self'){
                        arr.push('<h3 id="'+key+'._staticM.'+i.replace(/\./g,'_')+'"><span class="linb-custom-cmd"></span>'+linb.getRes('app.inhFrom')+' '+i+'</h3>');
                        obj.funs[i].sort();
                        var a1=[],a2=[],tt;
                        _.arr.each(obj.funs[i],function(o){
                            tt=i + dot + o[0];
                            a1.push(getItem(ipm.fun,o[1], tt, key+dot+o[0]));
                            tt=key + dot + o[0];
                            a2.push("<a id='short-abc' name='"+tt+"._list' href='#"+tt+"' >"+o[0]+"</a> &nbsp;&nbsp;&nbsp;");
                        });
                        arr.push('<div class="linb-custom-block">'+'<div class="linb-custom-list">'+a2.join('')+'</div>'+a1.join('')+'</div>')
                    }
                }
                arr.push('</div>');
            }
            if(obj.provars){
                obj.provars.sort();
                arr.push('<h2 id="'+key+'._prototypeP'+'" ><span class="linb-custom-cmd"></span>'+linb.getRes('app.insProperties')+'</h2>');
                var a1=[],a2=[],tt;
                _.arr.each(obj.provars,function(o){
                    tt=key + pdot + o;
                    a1.push(getItem(ipm.mem,o, tt, tt,false));
                    a2.push("<a id='short-abc' href='#"+tt+"' >"+o+"</a> &nbsp;&nbsp;&nbsp;");
                });
                arr.push('<div class="linb-custom-block">'+'<div class="linb-custom-list">'+a2.join('')+'</div>'+a1.join('')+'</div>')
            }
            if(obj.profuns){
                arr.push('<h2 id="'+key+'._prototype'+'" ><span class="linb-custom-cmd"></span>'+linb.getRes('app.insMethods')+'</h2>');
                arr.push('<div class="linb-custom-block">');
                if(obj.profuns.self){
                    obj.profuns.self.sort();
                    var a1=[],a2=[],tt;
                    _.arr.each(obj.profuns.self,function(o){
                        tt=key + pdot + o[0];
                        a1.push(getItem(ipm.fun,o[1], tt));
                        a2.push("<a id='short-abc' name='"+tt+"._list' href='#"+tt+"' >"+o[0]+"</a> &nbsp;&nbsp;&nbsp;");
                    });
                    arr.push('<div class="linb-custom-list">'+a2.join('')+'</div>'+a1.join(''))
                }
                for(var i in obj.profuns){
                    if(i!='self'){
                        arr.push('<h3 id="'+key+'._prototype.'+i.replace(/\./g,'_')+'" ><span class="linb-custom-cmd"></span>'+linb.getRes('app.inhFrom')+' ' +i+'</h3>');
                        obj.profuns[i].sort();
                        var a1=[],a2=[],tt;
                        _.arr.each(obj.profuns[i],function(o){
                            tt=i + pdot + o[0];
                            a1.push(getItem(ipm.fun,o[1], tt,key+pdot+o[0]));
                            tt=key + pdot + o[0];
                            a2.push("<a id='short-abc' name='"+tt+"._list' href='#"+tt+"' >"+o[0]+"</a> &nbsp;&nbsp;&nbsp;");
                        });
                        arr.push('<div class="linb-custom-block">'+'<div class="linb-custom-list">'+a2.join('')+'</div>'+a1.join('')+'</div>')
                    }
                }
                arr.push('</div>')
            }
            if(obj.events){
                arr.push('<h2 id="'+key+'._event'+'" ><span class="linb-custom-cmd"></span>'+linb.getRes('app.events')+'</h2>');
                arr.push('<div class="linb-custom-block">');
                arr.push('<div>'+SPA.getDoc(obj.key=='linb.Dom'?'linb.Dom.Events':'linb.UI.Events')+'</div>');

                if(obj.events.self){
                    obj.events.self.sort();
                    var a1=[],a2=[],tt;
                    _.arr.each(obj.events.self,function(o){
                        tt=key + pdot + o[0];
                        a1.push(getItem(ipm.event,o[1], tt, tt,false));
                        a2.push("<a id='short-abc' name='"+tt+"._list' href='#"+tt+"' >"+o[0]+"</a> &nbsp;&nbsp;&nbsp;");
                    });
                    arr.push('<div class="linb-custom-list">'+a2.join('')+'</div>'+a1.join(''))
                }
                for(var i in obj.events){
                    if(i!='self'){
                        obj.events[i].sort();
                        var a1=[],a2=[],tt;
                        arr.push('<h3 id="'+key+'._event.'+i.replace(/\./g,'_')+'" ><span class="linb-custom-cmd"></span>'+linb.getRes('app.inhFrom')+' ' +i+'</h3>');
                        _.arr.each(obj.events[i],function(o){
                            tt=i + pdot + o[0];
                            a1.push(getItem(ipm.event,o[1], tt,key+pdot+o[0],false));
                            tt=key + pdot + o[0];
                            a2.push("<a id='short-abc' name='"+tt+"._list' href='#"+tt+"' >"+o[0]+"</a> &nbsp;&nbsp;&nbsp;");
                        });
                        arr.push('<div class="linb-custom-block">'+'<div class="linb-custom-list">'+a2.join('')+'</div>'+a1.join('')+'</div>')
                    }
                }
                arr.push('</div>');
            }
            arr.push('</div>')

            if(obj.$abstract)
              arr.push('<h3 id="'+_.id()+'"> ==== Abstract Virtual Class or Inner Class ==== </h3>');

            return arr.join('');
        },
        _iconPosMap:{
            cls:'left -16px',
            con:'left -145px',
            fun:'left -48px',
            hash:'left top',
            arr:'left -128px',
            mem:'left -96px',
            event:'left -32px',
            close:'left -160px',
            open: 'left -176px'
        },
        _parse:function(id){
            var o = linb.SC.get(id), cls, key, obj={},filter=function(s,o){
                var me=arguments.callee, h=me.h||(me.h={upper:1,Constructor:1,Before:1,After:1,prototype:1}),
                c=s.charAt(0);
                if(s=='KEY')return false;
                if(c=='_'||c=="$")return false;
                if(/\./.test(s))return false;
                if(h[s])return false;
                if(o && o.$linb$)return false;
                return true;
            };
            if(!o)return '';

            if(typeof o == 'function' && o.$linb$)cls=true;
            obj.key = id;

            if(cls){
                _.arr.each(o.$parent,function(o,i){
                    if(!obj.parent)obj.parent=[];
                    obj.parent.push(o.KEY);
                });
                _.arr.each(o.$children,function(o){
                    if(!obj.children)obj.children=[];
                    obj.children.push(o);
                });
                if(o.$abstract)
                    obj.$abstract=o.$abstract;
                else{

                    obj.con = this._getFunArgs(o);

                    key = o.KEY;
                    for(var i in o){
                        if(filter(i,o[i])){
                            if(typeof o[i]=='function'){
                                if(!obj.funs)obj.funs={};
                                if((!o[i].$original$) || o[i].$original$==key){
                                    if(!obj.funs.self)obj.funs.self=[];
                                    obj.funs.self.push([i, this._getFunArgs(o,i)]);
                                }else{
                                    if(!obj.funs[o[i].$original$])obj.funs[o[i].$original$]=[];
                                    obj.funs[o[i].$original$].push([i,this._getFunArgs(o,i)]);
                                }
                            }else{
                                if(!obj.vars)obj.vars=[];
                                obj.vars.push(i);
                            }
                        }
                    }
                    
                    o=o.prototype;
                    for(var i in o){
                        if(filter(i,o[i])){
                            if(typeof o[i]=='function'){
                                if(o[i].$event$){
                                    if(!obj.events)obj.events={};
                                    if((!o[i].$original$) || o[i].$original$==key){
                                        if(!obj.events.self)obj.events.self=[];
                                        obj.events.self.push([i,this._getFunArgs(o.constructor.$EventHandlers||o,i)]);
                                    }else{
                                        if(!obj.events[o[i].$original$])obj.events[o[i].$original$]=[];
                                        obj.events[o[i].$original$].push([i, this._getFunArgs(o.constructor.$EventHandlers||o,i)]);
                                    }
                                }else{
                                    if(!obj.profuns)obj.profuns={};
                                    if((!o[i].$original$) || o[i].$original$==key){
                                        if(!obj.profuns.self)obj.profuns.self=[];
                                        obj.profuns.self.push([i, this._getFunArgs(o,i)]);
                                    }else{
                                        if(!obj.profuns[o[i].$original$])obj.profuns[o[i].$original$]=[];
                                        obj.profuns[o[i].$original$].push([i, this._getFunArgs(o,i)]);
                                    }
                                }
                            }else{
                                if(!obj.provars)obj.provars=[];
                                obj.provars.push(i);
                            }
                        }
                    }
                    
                    //add linb.Com event
                    if(o.KEY=='linb.Com'){
                        if(!obj.events)obj.events={};
                        if(!obj.events.self)obj.events.self=[];
                        var es=linb.Com.$EventHandlers;
                        for(var i in es){
                            o=es[i];
                            obj.events.self.push([i,this._getFunArgs(es,i)]);
                        }
                    }
                }
            }else{
                for(var i in o){
                    if(filter(i,o[i])){
                        if(typeof o[i]=='function'){
                            if(!obj.funs)obj.funs = {self:[]};
                            obj.funs.self.push([i, this._getFunArgs(o,i)]);
                        }else{
                            if(!obj.vars)obj.vars=[];
                            obj.vars.push(i);
                        }
                    }
                }
                if(o.prototype){
                    o=o.prototype;
                    for(var i in o){
                        if(!obj.profuns)obj.profuns = {self:[]};
                        obj.profuns.self.push([i, this._getFunArgs(o,i)]);
                    }
                }
            }
            return  obj ;
        },
        _clickForToggle:function(p,e,s,n){
            var f=SPA._clickForToggle,ff=SPA._clickForLoca, ics=SPA._iconPosMap, ths=linb([this]);
            if(linb.Event.getSrc(e).nodeName=='A')return;
            var a=ths.next(),b,ta,t,id;
            if(s.nodeName=='H4'){
                ta=a.query('textarea');
                if(!ta.isEmpty())
                    ta.each(function(o){
                        if(o.id!='code')return;
                        t=linb([o]);
                        o=_.str.toDom(linb.Coder.formatAll(t.text(), 'js', ['plain','run']));
                        t.replace(o);
                    });
            }
            if(s.nodeName=='H2'){
                if(!s.__set){
                    ths.next().query('h4').css('cursor','pointer').onClick(f).first().css('backgroundPosition',ics.close);
                    ths.next().query('*','id','short-abc').onClick(ff);
                    s.__set=1;
                }
            }
            a.css('display', (b=a.css('display')=='none')?'block':'none' );
            ths.first().css('backgroundPosition', b?ics.open:ics.close);
        },
        _clickForLoca:function(){
            var a=this,
                id = a.href.split('#')[1],
                node = linb([this]).parent(2).query('a','name',id).next().first();
            if(!node.isEmpty()){
                node.animate({opacity:[0,1]}, 0,0, 2000, 20).start();
                if(node.next().css('display')=='none')node.onClick();
            }
        },
        getDoc:function(key){
            if(!key)return '';
            var o = linb.getRes("doc."+key);
            if(typeof o == 'string')
                return o;
            return this.buildDoc(o);
        },
        buildDoc:function(o){
            var arr=[];
            if(o){
                if(o.$desc)
                    arr.push('<div class="inndiv">' + o.$desc + '</div>');
                if(o.$rtn)
                    arr.push('<div class="inndiv">' + '<strong>'+linb.getRes('app.retV')+': </strong>' + o.$rtn + '</div>');
                if(o.$paras){
                    arr.push('<div class="inndiv">' + '<div><strong>'+linb.getRes('app.param')+': </strong></div><ul>');
                    _.arr.each(o.$paras,function(v){
                        v=v.replace(/^([^:\[]*)([^:]*):(.*)$/,"<strong>$1</strong> $2 : $3");
                        arr.push('<li> ' + v + ' </li>');
                    })
                    arr.push("</ul></div>");
                }

                if(o.$snippet){
                    arr.push('<div class="inndiv">' + '<div><strong>'+linb.getRes('app.codesnip')+': </strong></div>');
                    _.arr.each(o.$snippet,function(v){
                        arr.push('<textarea id="code" class="js plain-run">' + v + '</textarea><p>&nbsp;</p>');
                    })
                    arr.push("</div>");
                }
                if(o.$memo)
                    arr.push('<div class="inndiv">' + '<strong>'+linb.getRes('app.memo')+': </strong>' + o.$memo + '</div>');

                if(o.$links){
                    arr.push('<div class="inndiv">' + '<div><strong>'+linb.getRes('app.seealso')+': </strong></div><ul>');
                    _.arr.each(o.$links,function(v){
                        arr.push('<li><a target="'+(v[2]||'')+'" href="' +v[1]+ '">' + v[0] + '</a></li>');
                    })
                    arr.push("</ul></div>");
                }
            }
            return arr.join('');
        }
    }
});