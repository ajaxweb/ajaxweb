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
Class("linb.UI.Poll", "linb.UI.List",{
    Instance:{
        fillContent:function(id, obj){
            var profile=this.get(0),t,item;
            if(profile.domNode){
                if(item=profile.getItemByItemId(id)){
                    t=profile.getSubNodeByItemId('BODY',id).html('');
                    if(obj){
                        item._obj = obj;
                        item._fill=true;
                        if(typeof obj=='string')t.html(obj);
                        else t.append(obj.render(true));
                    }else
                        item._obj=item._fill=null;
                }
            }
            return this;
        },
        _setOptCap:function(item, value){
            return this.each(function(pro){
                var items = pro.properties.items,
                i = pro.queryItems(pro.properties.items, function(o){
                    return o.id==item.id;
                },false,true);
                if(i && (i=i[0])){
                    i.caption=value;
                    if(pro.domNode)
                        pro.getSubNodeByItemId('CAPTION',i.id).html(value);
                }
            });
        },
        getBindEditor:function(){
            return this.get(0)._bind;
        },
        _insertOpt:function(opt){
            if(!opt.id)opt.id='$'+_();
            this.insertItems([opt],null, false);
            return this;
        },
        _removeOpt:function(id){
            this.removeItems([id],'OUTER');
            return this;
        },
        _setDirtyMark:function(){return this}
    },
    Initialize:function(){
        var self=this;
        self.addTemplateKeys(['MARK2','MARK3','EDIT']);
        //modify default template fro shell
        var t = self.getTemplate();
        t.TITLE={
            $order:'0',
            tagName : 'DIV',
            style:'{titleDisplay}',
            text : '{title}',
            className:"{disabled} {_cls}"
        };
        t.TAIL={
            $order:'20',
            tagName : 'DIV',
            className:"{disabled} ",
            text:"{cmds}"
        };
        t.$dynamic={
            items:{
                OUTER:{
                    tagName:'div',
                    TOGGLE:{
                        className:'uicmd-toggle',
                        style:'{_togdisplay}'
                    },
                    ITEM:{
                        tagName: 'a',
                        href :linb.$href,
                        tabindex: '{_tabindex}',
                        className:'{itemClass}',
                        style:'{itemStyle}',
                        OPTION:{
                            $order:0,
                            tagName : 'DIV',
                            MARK:{$order:1,className:'{_optclass}'}
                        },
                        CAPTION:{
                            $order:1,
                            tagName : 'DIV',
                            text : '{caption}',
                            className:"{disabled} {_itemcls}"
                        },
                        CHART:{
                            $order:2,
                            tagName : 'DIV',
                            style:'{_display}',
                            CAST:{
                                $order:0,
                                text:'{message}'
                            },
                            BAR:{
                                $order:1,
                                style:'background-position: -{_per}px -190px;',
                                BARI:{}
                            },
                            DEL:{
                                $order:2,
                                tagName : 'BUTTON',
                                className:'ui-btn',
                                style:'{_del}',
                                text:'{removeText}'
                            }
                        },
                        CLEAR:{
                            $order:3,
                            tagName : 'DIV'
                        }
                    },
                    BODY:{
                        $order:1,
                        tagName : 'DIV',
                        text:'{_body}'
                    }
                }
            },
            cmds:{
                CMD:{
                    tagName: '{tagName}',
                    tabindex: '{_tabindex}',
                    className:'ui-btn',
                    text:'{caption}'
                }
            }
        };
        self.setTemplate(t);

        //for modify
        var inlineEdit=function(profile,node,flag,value,item){
            var o,useC,prop=profile.properties,
                callback=function(v){
                    var b=profile.boxing();
                    switch(flag){
                        //edit option
                        case '1':
                            if(b.beforeItemChanged(profile, item, v)!==false)
                                b._setOptCap(item,v);
                        break;
                        //new option
                        case '2':
                            if(b.beforeOptionAdded(profile, v)!==false ){
                                var id="["+v.replace(/[^\w_]*/g,'')+"]";
                                b._insertOpt({caption:v,id:id});
                                if(!profile.properties.editable){
                                    profile.boxing().fireItemClickEvent(id);
                                }
                            }
                        break;
                        //edit title
                        default:
                            if(b.beforeTitleChanged(profile, v)!==false)
                                b.setTitle(v);
                    }
                };

            if(profile.onCustomEdit)
                if(o=profile._bind=profile.boxing().onCustomEdit(profile, node, flag, value, item, callback))
                    useC=true;
            if(!useC){
                o=profile._bind;
                if(!o){
                    var pp={type:prop.editorType,saveBtn:true,left:-10000,top:-10000};
                    profile._bind=o=linb.create('ComboInput', pp);
                    o.onHotKeydown(function(p,key){
                        if(key=='enter'){
                            p.boxing().onSave(p);
                            return false;
                        }else if(key=='esc'){
                            o.hide();
                            return false;
                        }
                    })
                    profile.root.append(o);
                }

                var r=node.cssRegion(true,profile.root);
                if(r.height>o.getHeight())
                    o.setHeight(r.height);
                else
                    r.top-=3;
                if(r.top<0)r.top=0;

                o.setValue(value||'',true)
                .setWidth(r.width + (parseInt(node.css('paddingLeft'))||0)+ (parseInt(node.css('paddingRight'))||0))
                .show(r.left+'px',r.top+'px')
                .onSave(function(p){
                    var pro=p.properties,v=pro.$UIvalue, ov=pro.value;
                    if(v!=ov)
                        callback(v);
                    _.asyRun(function(){
                        o.hide();
                    });
                })
                .reBoxing().setBlurTrigger(o.KEY+":"+o.$id, function(){
                    o.hide();
                });
                _.asyRun(function(){
                    o.activate()
                });
            }
        };

        t = self.getBehavior();
        var old=t.ITEM.onClick;
        t.ITEM.onClick = function(profile, e, src){
            var p = profile.properties,
                item = profile.getItemByDom(src),
                editable=item.id=='$custom' || item.editable;
            if(p.disabled)return;

            if(p.editable)
                inlineEdit(profile, profile.getSubNodeByItemId('CAPTION',item.id), editable?'2':'1', editable?'':item.caption, item);
            else{
                if(editable)
                    inlineEdit(profile, profile.getSubNodeByItemId('CAPTION',item.id), '2');
                else
                    old.apply(this, arguments);
            }
        };
        t.TITLE={
            onClick : function(profile, e, src){
                var p = profile.properties,
                    item = profile.getItemByDom(src);
                if(p.disabled)return;

                if(p.editable)
                    inlineEdit(profile, profile.getSubNode('TITLE'), '3', p.title);
            }
        };
        t.DEL={
            onClick : function(profile, e, src){
                var p = profile.properties,
                    b = profile.boxing(),
                    item = profile.getItemByDom(src);
                if(p.disabled)return;
                if(b.beforeOptionRemoved(profile, item)!==false )
                    b._removeOpt(item.id);
                return false;
            }
        }
        t.CMD={
            onClick : function(profile, e, src){
                var p = profile.properties,
                    key = profile.getSubId(src.id);
                if(p.disabled)return;
                profile.boxing().onClickButton(profile, key, src);
            }
        };
        t.TOGGLE={
            onClick:function(profile, e, src){
                var properties = profile.properties,
                    items=properties.items,
                    item = profile.getItemByDom(src),
                    itemId = profile.getSubId(src.id),
                    node = linb([src]),
                    body = profile.getSubNode('BODY',itemId),t
                    ;
                if(item._show){
                    node.tagClass('-checked',false);
                    body.css('display','none');
                }else{
                    node.tagClass('-checked');
                    body.css('display','block');
                    //fill value
                    if(!item._fill){
                        item._fill=true;
                        var callback=function(o){
                            profile.boxing().fillContent(item.id, item._body=o);
                        };
                        if(profile.onGetContent)
                            linb.Thread.observableRun(
                                function(threadId){
                                    var r = profile.boxing().onGetContent(profile, item, callback, threadId);
                                    if(r) callback(r);
                                });
                        else
                            callback(profile.box._buildBody(profile, item));
                    }
                }

                item._show=!item._show;

                //prevent href default action
                //return false;
            }
        };

        self.setBehavior(t);
    },
    Static:{
        ITEMKEY:'OUTER',
        Appearances:{
            KEY:{
                'font-size':'12px',
                zoom:linb.browser.ie?1:null
            },
            'TITLE, ITEMS, TAIL':{
                position:'relative',
                overflow:'auto',
                'line-height':'12px'
            },
            TAIL:{
                zoom:linb.browser.ie?1:null,
                'padding':'5px 0 5px 40px'
            },
            CMD:{
                margin:'3px',
                'white-space':'nowrap',
                'vertical-align':'middle'
            },
            TITLE:{
                'font-weight':'bold',
                padding:'4px',
                'border-bottom':'1px solid #CDCDCD'
            },
            ITEMS:{
                'overflow-x': (linb.browser.ie || linb.browser.gek)?'hidden':'',
                zoom:linb.browser.ie?1:null,
                margin:'4px 4px 4px 5px'
            },
            OUTER:{
                position:'relative',
                zoom:linb.browser.ie?1:null,
                'padding-left':'15px',
                'border-bottom':'1px dashed #CDCDCD'
            },
            TOGGLE:{
                position:'absolute',
                left:0,
                top:'4px'
            },
            BODY:{
                display:'none',
                'padding-left':'27px'
            },
            ITEM:{
                display:'block',
                position:'relative',
                zoom:linb.browser.ie?1:null,
                padding:'4px 2px 4px 2px'
            },
            'ITEM-checked':{},
            OPTION:{
                position:'absolute',
                left:'2px',
                top:'4px'
            },
            CAPTION:{
                'float':'left',
                zoom:linb.browser.ie?1:null,
                'margin-left':'24px',
                //{*1*}for: ie6 double margin bug
                display:linb.browser.ie6?'inline':null
            },
            'EDIT, EDITS':{
                $order:2,
                'float':'none',
                'background-color':'#EBEADB',
                cursor:'pointer',
                //{*1*}for: ie6 double margin bug
                display:linb.browser.ie6?'block':null
            },

            CHART:{
                'float':'right'
            },
            CLEAR:{
                clear:'both',
                'text-align':'right'
            },
            'BAR, BARI':{
                width:'150px',
                height:'12px',
                border:0,
                'line-height':0,
                'font-size':0
            },
            BAR:{
                'margin-left':'2px',
                background: linb.UI.$bg('cmds.gif', ' no-repeat -130px -190px', true)
            },
            BARI:{
                background: linb.UI.$bg('cmds.gif', ' no-repeat -150px -225px ', true)
            },
            'MARK, MARK2, MARK3' : {
               cursor:'pointer',
               width:'16px',
               height:'16px',
                'vertical-align':'middle',
               'margin-right':'6px'
            },
            MARK:{
               background: linb.UI.$bg('cmds.gif', ' no-repeat -144px top', true)
            },
           'ITEM-mouseover MARK':{
                $order:1,
                'background-position':' -144px -17px'
           },
           'ITEM-mousedown MARK':{
                $order:2,
                'background-position':' -144px -34px'
           },
           'ITEM-checked MARK':{
                $order:3,
                'background-position':' -128px top'
           },
           'ITEM-checked-mouseover MARK':{
                $order:4,
                'background-position':' -128px -17px'
           },
           'ITEM-checked-mousedown MARK':{
                $order:5,
                'background-position':' -128px -34px'
            },
            MARK2:{
               background: linb.UI.$bg('cmds.gif', ' no-repeat -112px top', true)
            },
           'ITEM-mouseover MARK2':{
                $order:1,
                'background-position':' -112px -17px'
           },
           'ITEM-mousedown MARK2':{
                $order:2,
                'background-position':' -112px -34px'
           },
           'ITEM-checked MARK2':{
                $order:3,
                'background-position':' -96px top'
           },
           'ITEM-checked-mouseover MARK2':{
                $order:4,
                'background-position':' -96px -17px'
           },
           'ITEM-checked-mousedown MARK2':{
                $order:5,
                'background-position':' -96px -34px'
            },
            MARK3:{
                $order:11,
               background: linb.UI.$bg('cmds.gif', ' no-repeat -56px -222px', true)
            },
           'ITEM-mouseover MARK3':{
                $order:11,
                'background-position':' -56px -222px'
           },
           'ITEM-mousedown MARK3':{
                $order:11,
                'background-position':' -56px -222px'
           },
            DEL:{
                margin:'0 0 0 4px'
            }
        },
        DataModel:{
            $checkbox:1,
            title:{
                action:function(v){
                    this.getSubNode('TITLE').html(v);
                }
            },
            selMode:{
                ini:'single',
                listbox:['single','multi'],
                action:function(){
                    this.boxing().refresh();
                }
            },
            cmds:{
                ini:null
            },
            noTitle:{
              ini:false,
              action:function(v){
                 this.getSubNode('TITLE').css('display',v?'none':'');
              }
            },
            toggle:{
                ini:false,
                action:function(v){
                    this.getSubNode('TOGGLE',true).css('display',v?'':'none');
                }
            },
            removeText:{
                ini:'remove',
                action:function(v){
                    this.getSubNode('DEL',true).text(v);
                }
            },
            editable:{
                ini:false,
                action:function(v){
                    var self=this,t,cls;
                    self.getSubNode('DEL',true).css('display',v?'':'none');
                    t=self.getSubNode('CAPTION',true).merge(self.getSubNode('TITLE'));
                    cls=self.getClass('EDIT');
                    if(v)
                        t.addClass(cls);
                    else
                        t.removeClass(cls);
                }
            },
            newOption:{
                ini:'',
                action:function(v){
                    var self=this,
                        id='$custom',
                        sid='_special',
                        t,
                        cs=self._cs;
                    if(!v){
                        if(cs)
                            cs.remove();
                    }else{
                        if(!cs){
                            t={
                                id:id,
                                caption:v
                            };
                            t[linb.UI.$tag_subId]=sid;
                            cs=self.buildItems('items',self.box._prepareItems(self,[t]));
                            self.getSubNode('ITEMS').addNext(self._cs=_.str.toDom(cs));
                        }else
                            self.getSubNodeByItemId('CAPTION',sid).html(v);
                    }
                }
            },
            editorType:'none'
        },
        EventHandlers:{
            beforeTitleChanged:function(profile, value){},
            beforeOptionAdded:function(profile, value){},
            beforeOptionRemoved:function(profile, item){},
            beforeOptionChanged:function(profile, item, value){},
            onCustomEdit:function(profile, node, flag, value, item, callback){},
            onClickButton:function(profile, key, src){},
            onGetContent:function(profile,item,callback){}
        },
        RenderTrigger:function(){
            var self=this,t=self.properties.newOption;
            if(t)
                self.boxing().setNewOption(t,true);
        },
        _dynamicTemplate:function(profile){
            var properties = profile.properties,
                hash = profile._exhash = "$" + 'selMode:'+properties.selMode+';',
                template = profile.box.getTemplate(hash);

            properties.$UIvalue = properties.value;

            // set template dynamic
            if(!template){
                template = _.clone(profile.box.getTemplate());
                if(properties.selMode=='multi'){
                    template.$dynamic.items.OUTER.ITEM.OPTION.MARK2={$order:1,className:'{_optclass}'};
                    delete template.$dynamic.items.OUTER.ITEM.OPTION.MARK;
                }
                // set template
                profile.box.setTemplate(template, hash);
            }
            profile.template = template;
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile),
                p=profile.properties
            if(p.editable)
                data._cls = profile.getClass('EDIT');
            data.titleDisplay=p.noTitle?'display:none':'';

            var cmds = p.cmds, o;
            if(cmds && cmds.length){
                var sid=linb.UI.$tag_subId,a;
                a=data.cmds=[];
                for(var i=0,t=cmds,l=t.length;i<l;i++){
                    o=linb.UI.adjustData(profile,t[i]);
                    o.tagName = o.tagName||'button';
                    a.push(o);
                    o._tabindex=p.tabindex;
                    o[sid]=o.id;
                }
            }
            return data;
        },
        _prepareItem:function(profile, item){
            var p = profile.properties, f=profile.CF;
            item._tabindex = p.tabindex;

            if(typeof f.formatCaption == 'function')
                item.caption = f.formatCaption(item.caption);

            item._body= item._body || 'Loading...'
            if(item.id!='$custom'){
                item._togdisplay=((p.toggle && item.toggle!==false) || item.toggle)?'':'display:none;';

                item._display='';
                item.percent = parseFloat(item.percent)||0;
                if(item.percent<0)item.percent=0;
                if(item.percent>1)item.percent=1;
                item._per = 150*(1-item.percent);
            }else{
                item._optclass=profile.getClass('MARK3');
                item._togdisplay=item._display='display:none;';
                item._per = 0;
                item._itemcls=profile.getClass('EDITS');
            }
            item.removeText=p.removeText;
            item._del='display:none;';
            if((('editable' in item) && item.editable)||p.editable){
                item._itemcls=profile.getClass('EDIT');
                item._del = '';
            }


        },
        _buildBody:function(profile,item){
            return item.text?'<pre>'+item.text.replace(/</g,"&lt;")+'</pre>':'';
        }
    }
});
