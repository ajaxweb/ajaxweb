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
Class("linb.UI.TreeBar",["linb.UI","linb.absList","linb.absValue"],{
    Instance:{
        _setCtrlValue:function(value, flag){
            return this.each(function(profile){
                if(!profile.domNode)return;

                var box = profile.boxing(),
                    uiv = box.getUIValue(),
                    properties = profile.properties,
                    fun=function(key,o,b){
                        profile.getSubNodeByItemId(key, o).tagClass('-checked', b);
                    },
                    selmode=properties.selMode
                    ;
                if(selmode=='single'){
                    var itemId = profile.getSubIdByItemId(uiv);
                    if(uiv && itemId)
                        profile.getSubNodes(['BAR','MARK2'],itemId).tagClass('-checked',false);

                    itemId = profile.getSubIdByItemId(value);
                    if(itemId)
                        profile.getSubNodes(['BAR','MARK2'],itemId).tagClass('-checked');
                }else if(selmode=='multi'){
                    uiv = uiv?uiv.split(';'):[];
                    value = value?value.split(';'):[];
                    if(flag){
                        _.arr.each(value,function(o){
                            fun('BAR', o);
                            fun('MARK2', o);
                        });
                    }else{
                        //check all
                        _.arr.each(uiv,function(o){
                            if(_.arr.indexOf(value,o)==-1){
                                fun('BAR', o, false);
                                fun('MARK2', o, false);
                            }
                        });
                        _.arr.each(value,function(o){
                            if(_.arr.indexOf(uiv,o)==-1){
                                fun('BAR', o);
                                fun('MARK2', o);
                            }
                        });
                    }
                }
            });
        },
        insertItems:function(arr, pid, base ,before){
            var node;
            return this.each(function(profile){
                // prepare properties format
                var tar,r,k;

                if(!pid){
                    k=profile.properties;
                    tar = k.items ||(k.items=[])
                }else{
                    k=profile.getItemByItemId(pid);
                    tar = k.sub || (k.sub= []);
                }
                if(!base)
                    _.arr.insertAny(tar,arr, before?0:-1);
                else{
                    var index = _.arr.subIndexOf(tar, 'id', base);
                    _.arr.insertAny(tar,arr, before?index:(index+1));
                }
                if(profile.domNode){
                    if(!base){
                        if(!pid)
                            node=profile.getSubNode('ITEMS');
                        else if(pid && k._created)
                            node=profile.getSubNodeByItemId('SUB', pid);
                        if(node){
                            r=_.str.toDom(profile.buildItems('items', profile.box._prepareItems(profile, arr, pid)));
                            if(before)
                                node.prepend(r);
                            else
                                node.append(r);
                        }
                    }else{
                        node=profile.getSubNodeByItemId('ITEM', base);
                        if(node){
                            r=_.str.toDom(profile.buildItems('items', profile.box._prepareItems(profile, arr, pid)));
                            if(before)
                                node.addPrev(r);
                            else
                                node.addNext(r);
                        }
                    }
                }
                var obj;
                if(pid)
                    if((obj=profile.getSubNodeByItemId('TOGGLE', pid)).css('display')=='none')
                        obj.setInlineBlock();

                //open parent node
                if(!(('iniFold' in k)?k.iniFold:profile.properties.iniFold))
                    if(!pid || profile.getItemByItemId(pid)._created)
                        profile.boxing()._toggleNodes(arr, true);

            });
        },
        _toggleNodes:function(items, expend, recursive){
            var self=this;
            _.arr.each(items,function(o){
                self.toggleNode(o.id, expend, recursive)
            });
            return self;
        },
        /*
        *expend:true->expend false->fold
        *recursive:true open recursively
        */
        toggleNode:function(id, expend, recursive){
            var profile=this.get(0),
                o=profile.getItemByItemId(id);
            if(o.sub && o.sub.length && ((expend&&!o._checked)||(!expend&&o._checked)))
                profile.box._setSub(profile, o, expend, recursive);
            return self;
        },
        /*
        *open to deep node
        */
        openToNode:function(id){
            return this.each(function(profile){
                var res=false, a=[],
                    fun=function(arr, catId, layer){
                        layer = layer || 0;
                        var me=arguments.callee;
                        _.arr.each(arr,function(o){
                            if(o.id==catId){
                                a.push(o);
                                res=true;
                                return false;
                            }
                            if(o.sub){
                                res = me.call(me, o.sub, catId, ++layer)
                                if(res){
                                    a.push(o);
                                    return false;
                                }
                            }
                        });
                        return res;
                    }
                fun(profile.properties.items, id);
                if(res){
                    a.reverse();
                    _.arr.each(a,function(o){
                        if(o.sub){
                            if(!o._checked)
                                profile.box._setSub(profile, o, true);
                        }else
                            profile.boxing().selectItem(o.id);
                    });
                }
            });
        },
        selectItem:function(id){
            var profile = this.get(0);
            //fire dom event
            var node =profile.getSubNodeByItemId('BAR', id);
            //no this one, set to null
            if(!node.isEmpty()){
                node.onClick();
                return this;
            }else return false;
        }
    },
    Initialize:function(){
        this.addTemplateKeys(['DISABLED']);
    },
    Static:{
        Templates:{
            tagName : 'div',
            style:'{_style}',
            ondrag:'return false',
            onselectstart:'return false',
            BORDER:{
                tagName : 'div',
                BOX:{
                    tagName : 'div',
                    onselectstart:'return false',
                    ITEMS:{
                        tagName : 'div',
                        text:"{items}"
                    }
                }
            },
            $dynamic:{
                items:{
                    ITEM:{
                        className:'{itemClass}',
                        style:'{itemStyle}',
                        tagName : 'div',
                        onselectstart:'return false',
                        unselectable:'on',
                        BAR:{
                            $order:0,
                            tagName: 'a',
                            href :"{href}",
                            tabindex: '{_tabindex}',
                            className:'{cls_group} ',
                            onselectstart:'return false',
                            unselectable:'on',
                            TOGGLE:{
                                $order:0,
                                className:'uicmd-toggle',
                                style:'{mark}'
                            },
                            MARK2:{
                                $order:1,
                                style:'{mark2Display}'
                            },
                            ITEMICON:{
                                style:'background:url({image}) transparent  no-repeat   {imagePos}; {iconDisplay}',
                                className:'ui-icon',
                                $order:2
                            },
                            ITEMCAPTION:{
                                text : '&nbsp;{caption}',
                                className:"{disabled} ",
                                $order:3
                            }
                        },
                        SUB:{
                            $order:1,
                            tagName : 'div',
                            text:linb.UI.$childTag
                        }
                    }
                }
            }
        },
        Appearances:{
            KEY: {
                'font-family': 'Verdana, Helvetica, sans-serif',
                'border':0
            },
            BOX:{
                left:0,
                overflow: 'auto',
                'overflow-x':(linb.browser.ie ||linb.browser.gek)?'hidden':'',
                position:'relative'
            },
            ITEMS:{
                overflow: 'hidden',
                'border-bottom': '1px solid #e5e5e5',
                'border-right': '1px solid #e5e5e5'
            },
            ITEM:{
                'border-left': '1px solid #e5e5e5',
                'white-space': 'nowrap',
                position:'relative',
                overflow:'hidden'
            },
            BAR:{
               cursor:'pointer',
               zoom:linb.browser.ie?1:null,
               position:'relative',
               display:'block',
               overflow: 'hidden',
               'font-size':'12px',
               'border-top': '1px solid #e5e5e5'
            },
            DISABLED:{
                color:'#808080'
            },
            'BAR-mouseover':{
                $order:1,
               'background-color': '#d9e8fb'
            },
            'BAR-checked':{
                $order:2,
               'background-color': '#f6f6f6'
            },
            'BAR-GROUP':{
                $order:2,
                background: linb.UI.$bg('accordion.gif',' repeat-x left top', true)
            },
            'BAR-GROUP-mouseover':{
                $order:3,
                'background-position': 'left -30px'
            },
            'BAR-GROUP-checked':{
                $order:4,
                'background-position': 'left -60px'
            },
            SUB:{
                display:'none',
                overflow:'hidden',
                'margin-left':'12px'
            },

            MARK2:{
                'vertical-align':'middle',
                cursor:'pointer',
                width:'16px',
                height:'16px',
                margin:'0 4px 0 0'
            },
            'MARK2-checked':{
                $order:2,
                background: linb.UI.$bg('icon.gif', ' no-repeat -50px 0', true)
            },
            ITEMCAPTION:{
                'vertical-align':'middle',
                padding:'2px'
            }
        },
        Behaviors:{
            HoverEffected:{TOGGLE:'TOGGLE', BAR:'BAR'},
            ClickEffected:{TOGGLE:'TOGGLE', BAR:'BAR'},
            DragableKeys:["BAR"],
            DropableKeys:["BAR","TOGGLE","BOX"],
            onSize:function(profile,e){
                var o = profile.root,w=null,h=null;
                if(e.height)h=o.height();
                if(e.width)w=o.width();
                linb.UI.$tryResize(profile, w, h);
            },
            TOGGLE:{
                onClick:function(profile, e, src){
                    var properties = profile.properties,
                        item = profile.getItemByDom(src);

                    if(properties.disabled || item.disabled)return false;
                    if(!('sub' in item))return false;
                    profile.box._setSub(profile, item, !item._checked);

                    // not to fire BAR's onclick event;
                    return false;
                }
            },
            BAR:{
                onClick:function(profile, e, src){
                    var properties = profile.properties,
                        item = profile.getItemByDom(src),
                        itemId =profile.getSubId(src.id),
                        box = profile.boxing(),
                        ks=linb.Event.getKey(e),
                        rt,rt2;

                    if(properties.disabled|| item.disabled)return false;
                    //group not fire event
                    if(item.sub && (item.group!==undefined?item.group:properties.group)){
                        profile.getSubNode('TOGGLE', itemId).onClick();
                        return false;
                    }

                    switch(properties.selMode){
                    case 'none':
                        rt=box.onItemSelected(profile, item, src);
                        break;
                    case 'multi':
                        var value = box.getUIValue(),
                            arr = value?value.split(';'):[];
                        if(arr.length&&(ks[1]||ks[2])){
                            //for select
                            rt2=false;
                            if(ks[2]){
                                if(profile.$firstV._pid!=item._pid)return false;
                                var items=properties.items;
                                if(item._pid){
                                    var pitem=profile.getItemByItemId(item._pid);
                                    if(pitem)items=pitem.sub;
                                }
                                var i1=_.arr.subIndexOf(items,'id',profile.$firstV.id),
                                    i2=_.arr.subIndexOf(items,'id',item.id),
                                    i;
                                arr.length=0;
                                for(i=Math.min(i1,i2);i<=Math.max(i1,i2);i++)
                                    arr.push(items[i].id);
                            }else{
                                if(_.arr.indexOf(arr,item.id)!=-1)
                                    _.arr.removeValue(arr,item.id);
                                else
                                    arr.push(item.id);
                            }
                            arr.sort();
                            value = arr.join(';');

                            //update string value only for _setCtrlValue
                            if(box.getUIValue() == value)
                                rt=false;
                            else{
                                box.setUIValue(value);
                                if(box.getUIValue() == value)
                                    rt=box.onItemSelected(profile, item, src)||rt2;
                            }
                            break;
                        }
                    case 'single':
                        if(box.getUIValue() == item.id)
                            rt=false;
                        else{
                            profile.$firstV=item;
                            box.setUIValue(item.id);
                            if(box.getUIValue() == item.id)
                                rt=box.onItemSelected(profile, item, src);
                        }
                        break;
                    }

                    profile.getSubNode('BAR', itemId).focus();
                    return rt;
                },
                onKeydown:function(profile, e, src){
                    var keys=linb.Event.getKey(e), key = keys[0], shift=keys[2],
                    cur = linb(src),
                    first = profile.root.nextFocus(true, true, false),
                    last = profile.root.nextFocus(false, true, false);

                    switch(linb.Event.getKey(e)[0]){
                        case 'tab':
                            if(shift){
                                if(src!=first.get(0)){
                                    first.focus();
                                    return false;
                                }
                            }else{
                                if(src!=last.get(0)){
                                    last.focus();
                                    return false;
                                }
                            }
                            break;
                        case 'up':
                            var next = cur.nextFocus(false, true, false);
                            if(cur.get(0)==first.get(0))
                                last.focus();
                            else
                                cur.nextFocus(false);
                             return false;
                             break;
                        case 'down':
                            var next = cur.nextFocus(true, false, false);
                             if(cur.get(0)==last.get(0))
                                first.focus();
                             else
                                cur.nextFocus();
                             return false;
                             break;
                        case 'right':
                        case 'left':
                            profile.getSubNode('TOGGLE',profile.getSubId(src.id)).onClick();
                            return false;
                    }
                }
            },
            BOX:{
                onScroll:function(profile, e, src){
                    //for ie 'href focus' will scroll view
                    if(linb([src]).scrollLeft()!==0)
                        linb([src]).scrollLeft(0);
                }
            }
        },
        EventHandlers:{
            onGetContent:function(profile, item, callback, threadid){},
            onItemSelected:function(profile, item, src){}
        },
        DataModel:{
            listKey:null,
            tabindex:{
                action:function(value){
                    if(this.domNode)
                        this.getSubNode('BAR', true).attr('tabIndex',value);
                }
            },
            iniFold:true,
            animCollapse:false,
            dock:'fill',
            group:{
                ini:false,
                action:function(v){
                    var self = this,
                        items = self.properties.items,
                        results = self.queryItems(items, function(o){return o.sub && o.group===undefined }),
                        nodes=linb();
                    _.arr.each(results,function(o){
                        nodes.merge( self.getSubNodeByItemId('BAR', o.id) );
                    });
                    var cls1=self.getClass('BAR'), cls2 = self.getClass('BAR', '-group');
                    if(v)
                       nodes.replaceClass(new RegExp('(\\b)' + cls1 + '([^b]*\\b)','g'), '$1'+cls2+'$2');
                    else
                       nodes.replaceClass(new RegExp('(\\b)' + cls2 + '([^b]*\\b)','g'), '$1'+cls1+'$2');
                }
            },
            selMode:{
                ini:'single',
                listbox:['single','none','multi'],
                action:function(v,ov){
                    var n=this.getSubNode('MARK2',true);
                    if(ov=='none')
                        n.setInlineBlock();
                    if(v=='none')
                        n.css('display','none');
                }
            },
            singleOpen:false,
            dynDestory:false,
            position:'absolute'

        },
        RenderTrigger:function(){
            var self=this, pro=self.properties;
            if(!pro.iniFold)
                self.boxing()._toggleNodes(pro.items, true);
        },
        _onStartDrag:function(profile, e, src, pos){
            var pos=linb.Event.getPos(e);
            linb([src]).startDrag(e, {
                dragType:'icon',
                shadowFrom:src,
                targetLeft:pos.left+12,
                targetTop:pos.top+12,
                dragCursor:'pointer',
                dragDefer:1,
                dragKey: profile.box.getDragKey(profile, src),
                dragData: profile.box.getDragData(profile, src)
            });
            return false;
        },
        _onDropTest:function(profile, e, src, key, data, item){
            var fid=data&&data.domId, tid=src.id;
            if(fid){
                if(fid==tid)return false;
                if(_.get(src,['parentNode','previousSibling','firstChild','id'])==fid)return false;
            }
        },
        _onDrop:function(profile, e, src, key, data, item){
            linb.DragDrop.setDragIcon('none');

            var k=profile.getKey(src.id),
                po=data.profile,
                ps=data.domId,
                oitem,
                ks=profile.keys,
                t=linb.absObj.$specialChars,
                b=profile.boxing();
            //remove
            oitem=_.clone(po.getItemByDom(ps),function(o,i){return !t[(i+'').charAt(0)]});
            po.boxing().removeItems([oitem.id]);

            //add
            if(k==ks.BOX)
                b.insertItems([oitem], null, null, false);
            else if(k==ks.BAR)
                b.insertItems([oitem], item._pid, item.id, true);
            else if(k==ks.TOGGLE)
                b.insertItems([oitem], item.id, null, false);

            return false;
        },
        _ensureValue:function(profile,value){
            if(profile.properties.selMode=='multi'){
                var arr = (value||"").split(';');
                arr.sort();
                return arr.join(';');
            }else
                return value;
        },
        _prepareItem:function(profile, item, oitem, pid){
            var p=profile.properties;

            if(pid)oitem._pid=pid;
            // set 'visible' will show when parent call .height()
            item.mark = item.sub?'':'display:none';
            item.disabled = item.disabled?profile.getClass('KEY', '-disabled'):'';
            item.mark2Display = (p.selMode=='none')?'display:none':'';
            item._tabindex = p.tabindex;
            item.href = item.href || linb.$href;
            //change css class
            if(item.sub && (item.group!==undefined?item.group:p.group)){
                item.cls_group = profile.getClass('BAR', '-group');
                item.mark2Display = 'display:none';
            }
        },
        _setSub:function(profile, item, flag, recursive){
            var id=profile.domId,
                itemId = profile.getSubIdByItemId(item.id),
                properties = profile.properties,
                barNode = profile.getSubNode('BAR', itemId),
                markNode = profile.getSubNode('TOGGLE', itemId),
                subNs = profile.getSubNode('SUB', itemId);
                ;

            if(linb.Thread.isAlive(profile.key+profile.id)) return;
            //close
            if(item._checked){
                if(!flag){
                    var h=subNs.height(),fun=function(){
                        subNs.css('display','none').height('auto');
                    };
                    if(properties.animCollapse)
                        subNs.animate({'height':[h,0]},function(){subNs.height(h)},function(){fun()}, 100, 5, 'inexp', profile.key+profile.id).start();
                    else
                        fun();

                    markNode.tagClass('-checked', false);
                    item._checked = false;

                    if(item.group || properties.group)
                        barNode.tagClass('-checked', false);
                    if(properties.dynDestory){
                        var s=item.sub, arr=[];
                        for(var i=0,l=s.length;i<l;i++)
                            arr.push(s[i].id);
                        profile.boxing().removeItems(arr);
                        item.sub=true;
                        delete item._created;
                    }
                }
                if(recursive && item.sub && !properties.dynDestory){
                    _.arr.each(item.sub,function(o){
                        if(o.sub && o.sub.length)
                            profile.box._setSub(profile, o, false, true);
                    });
                }
            }else{
                //open
                if(flag){
                    var openSub = function(profile, item, id, markNode, subNs, barNode, sub, recursive){
                            var b=profile.boxing(),
                                p=profile.properties;
                            //created
                            if(!item._created){
                                delete item.sub;
                                //before insertRows
                                item._created=true;
                                subNs.css('display','none');
                                if(typeof sub=='string')
                                    subNs.html(item.sub=sub,false);
                                else if(sub.constructor==Array)
                                    b.insertItems(sub, item.id);
                                else if(sub['linb.Template']||sub['linb.UI'])
                                    subNs.append(item.sub=sub.render(true));

                                //set checked items
                                b._setCtrlValue(b.getUIValue(), true);
                            }

                            if(p.singleOpen)
                                b._toggleNodes(item._pid?profile.getItemByItemId(item._pid).sub:p.items, false)

                            if(!recursive){
                                var h = subNs.height(true);
                                if(p.animCollapse)
                                    subNs.animate({'height':[0,h]},function(){subNs.height('0').css('display','block')},function(){subNs.height('auto')}, 100, 5, 'outexp', profile.key+profile.id).start();
                                else
                                    subNs.css('display','block').height('auto');
                            }else
                                subNs.css('display','block');

                            markNode.tagClass('-checked');
                            if(item.group || properties.group)
                                barNode.tagClass('-checked');

                            item._checked = true;
                        },
                        sub=item.sub,
                        callback=function(sub){
                            openSub(profile, item, id, markNode, subNs, barNode, sub, recursive)
                        },
                        t;
                    if((t=typeof sub)=='string'||t=='object')
                        callback(sub);
                    else if(profile.onGetContent){
                        linb.Thread(null,[
                            function(threadId){
                                var r = profile.boxing().onGetContent(profile, item, callback, threadId);
                                if(r) callback(r);
                            }
                        ],null,null,
                        //set busy status to UI
                        function(threadId){markNode.tagClass('-busy')},
                        //set free status to UI
                        function(){markNode.tagClass('-busy',false)}
                        ).start();
                    }
                }
                if(recursive && item.sub){
                    _.arr.each(item.sub,function(o){
                        if(o.sub && o.sub.length && !o._checked)
                            profile.box._setSub(profile, o, true, true);
                    });
                }
            }
        },
        _onresize:function(profile,width,height){
            profile.getSubNode('BORDER').cssSize({ width :width?width:null, height :height?height:null});
            profile.getSubNode('BOX').cssSize({ width :width?width:null, height : height?height:null});
        }
    }
});
