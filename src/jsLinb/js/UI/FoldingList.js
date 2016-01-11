Class("linb.UI.FoldingList", ["linb.UI.List"],{
    Instance:{
        fillContent:function(id, obj){
            var profile=this.get(0),t,item;
            if(profile.domNode){
                if(item=profile.getItemByItemId(id)){                    
                    t=profile.getSubNodeByItemId('BODYI',id).html('');
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
        toggle:function(id){
            var profile=this.get(0);
            if(profile.domNode){
                var properties = profile.properties,
                    items=properties.items,
                    item = profile.getItemByItemId(id),
                    subId = profile.getSubIdByItemId(id),
                    node = profile.getSubNode('ITEM',subId),
                    toggle = profile.getSubNode('TOGGLE',subId),
                    nodenext = node.next(),t
                    ;
                if(item._show){
                    if(properties.activeLast && items.length)
                        if(items[items.length-1].id==item.id)
                            return false;
    
                    node.tagClass('-checked',false);
                    toggle.tagClass('-checked',false);
                    if(nodenext)
                        nodenext.tagClass('-prechecked',false);
                }else{
                    node.tagClass('-checked');
                    toggle.tagClass('-checked');
                    if(nodenext)
                        nodenext.tagClass('-prechecked');
                    //fill value
                    if(!item._fill){
                        var callback=function(o){
                            profile.boxing().fillContent(item.id, item._body=o);
                        };
                        if(profile.onGetContent)
                            linb.Thread.observableRun(
                                function(threadId){
                                    var r = profile.boxing().onGetContent(profile, item, callback, threadId);
                                    if(r) callback(r);
                                }
                            );
                        else
                            callback(profile.box._buildBody(profile, item));
                    }
                }
                item._show=!item._show
             }
            return this;
        }
    },
    Initialize:function(){
        //modify default template fro shell
        var t = this.getTemplate();
        t.$dynamic={
            items:{
                ITEM:{
                    tagName : 'div',
                    className:'{_checked} {_precheked} {itemClass}',
                    style:'{itemStyle}',
                    HEAD:{
                        tagName : 'div',
                        HL:{tagName : 'div'},
                        HR:{tagName : 'div'},
                        TITLE:{
                            tagName : 'a',
                            href:linb.$href,
                            TLEFT:{
                                $order:0,
                                tagName:'div',
                                TOGGLE:{
                                    $order:0,
                                    className:'uicmd-toggle {_tlgchecked}'
                                },
                                CAP1:{
                                    $order:1,
                                    text:'{title}'
                                }
                            },
                            TRIGHT:{
                                $order:1,
                                tagName:'div',
                                style:'{_capDisplay}',
                                CAP2:{
                                    $order:0,
                                    text:'{caption}'
                                },
                                OPT:{
                                    $order:1,
                                    className:'uicmd-opt',
                                    style:'{_opt}'
                                }
                            }/*,
                            TCLEAR:{
                                $order:2,
                                tagName:'div'
                            }*/
                        }
                    },
                    BODY:{
                        $order:1,
                        tagName : 'div',
                        className:'ui-content',
                        BODYI:{
                            $order:0,
                            tagName : 'div',
                            text:'{_body}'
                        },
                        CMDS:{
                            $order:1,
                            tagName : 'div',
                            text:"{cmds}"
                        }
                    },
                    TAIL:{
                        $order:4,
                        tagName : 'div',
                        TL:{tagName : 'div'},
                        TR:{tagName : 'div'}
                    }
                }
            },
            'items.cmds':{
                $order:2,
                CMD:{
                    //tagName:'button',
                    tagName:'a',
                    href:linb.$href,
                    text:'{caption}'
                }
            }
        };
        this.setTemplate(t);
    },
    Static:{
        Appearances:{
            KEY:{
                padding:'2px'
            },
            ITEMS:{
                border:0,
                position:'relative',
                zoom:linb.browser.ie?1:null,
                'padding-top':'8px'//,
                //for ie6 1px bug,  HR/TR(position:absolute;right:0;)
                //'margin-right':linb.browser.ie6?'expression(this.parentNode.offsetWidth?(this.parentNode.offsetWidth-(parseInt(this.parentNode.style.paddingLeft)||0)-(parseInt(this.parentNode.style.paddingRight)||0) )%2+"px":"auto")':null
            },
            ITEM:{
                border:0,
                //for ie6 bug
                zoom:linb.browser.ie?1:null,
                'margin-top':'-9px',
                padding:0,
                'font-family': '"Verdana", "Helvetica", "sans-serif"',
                position:'relative',
                overflow:'hidden'
            },
            'HEAD, BODY, BODYI, TAIL':{
                position:'relative'
            },

            CMDS:{
                padding:'2px 8px 4px 14px',
                'font-weight':'bold',
                position:'relative',
                background: linb.UI.$bg('l.gif', 'repeat-y left top #EEE')
            },
            CMD:{
                margin:'2px 4px 2px 4px',
                padding:'0 3px 0 3px'
            },
            BODY:{
                display:'none',
                'border-right': 'solid 1px #CCC',
                zoom:linb.browser.ie?1:null,
                position:'relative',
                overflow:'auto',
                background: linb.UI.$bg('l.gif', 'repeat-y left top')
            },
            BODYI:{
                padding:'2px 8px 0 8px',
                background: linb.UI.$bg('l.gif', 'repeat-y left top'),
                position:'relative'
            },
            'ITEM-checked':{
                $order:2,
                'margin-bottom':'12px'
             },
            'ITEM-checked BODY':{
                $order:2,
                display:'block'
            },
            'HL, HR, TL, TR':{
                position:'absolute',
                '_font-size':0,
                '_line-height':0,
                width:'8px'
            },
            'HL, HR':{
                height:'30px'
            },
            'ITEM-prechecked HL':{
                'background-position': 'left top'
            },
            'ITEM-prechecked HR':{
                'background-position': 'right top'
            },
            'TL, TR':{
                height:'20px'
            },
            HL:{
                top:0,
                left:0,
                background: linb.UI.$bg('corner.gif', ' no-repeat left -37px')
            },
            HR:{
                top:0,
                right:0,
                background: linb.UI.$bg('corner.gif', ' no-repeat right -37px')
            },
            TL:{
                bottom:0,
                left:0,
                background: linb.UI.$bg('corner.gif', ' no-repeat left bottom')
            },
            TR:{
                bottom:0,
                right:0,
                background: linb.UI.$bg('corner.gif', ' no-repeat right bottom')
            },
            HEAD:{
                position:'relative',
                zoom:linb.browser.ie?1:null,
                background: linb.UI.$bg('t.gif', '#fff repeat-x left top'),
                overflow:'hidden'
            },
            TITLE:{
                $order:1,
                height:'24px',
                display:'block',
                position:'relative',
                'white-space':'nowrap',
                overflow:'hidden'
            },
            TAIL:{
                '_font-size':0,
                '_line-height':0,
                position:'relative',
                height:'5px',
                background: linb.UI.$bg('b.gif', ' repeat-x left bottom #EEE')
            },
            'CAP1, CAP2':{
                padding:'3px'
            },
            CAP1:{
                color:'#666',
                'white-space':'nowrap',
            	font: 'bold 12px arial,sans-serif',
            	color: '#00681C'
            },
            'ITEM-checked CAP1':{
                $order:2,
                'font-weight':'normal'
            },
            TLEFT:{
                //position:linb.browser.ie6?'relative':null,
                //'float':'left',
                position:'absolute',
                left:'4px',
                top:'2px',

                'white-space':'nowrap',
                overflow:'hidden'
            },
            TRIGHT:{
                //position:linb.browser.ie6?'relative':null,
                //'float':'right',

                position:'absolute',
                right:'4px',
                top:'2px',

                'white-space':'nowrap',
                overflow:'hidden'
            }
        },
        Behaviors:{
            HoverEffected:{ITEM:null,HEAD:'HEAD',OPT:'OPT'},
            ClickEffected:{ITEM:null,HEAD:'HEAD'},
            ITEM:{onClick:null,onKeydown:null},
            HEAD:{
                onClick:function(profile, e, src){
                    profile.boxing().toggle(profile.getItemIdByDom(src));
                    return false;
                }
            },
            CMD:{
                onClick:function(profile,e,src){
                    if(profile.onClickButton)
                        profile.boxing().onClickButton(profile,profile.getItemByDom(src.parentNode),src.id.split('_')[1],src);
                    return false;
                }
            },
            OPT:{
                onMousedown:function(){
                    return false;
                },
                onClick:function(profile, e, src){
                    profile.boxing().onShowOptions(profile, profile.getItemByDom(src), e, src);
                    return false;
                }
            }
        },
        DataModel:({
            tabindex:{
                action:function(value){
                    if(this.domNode)
                        this.getSubNode('HEAD',true).attr('tabIndex',value);
                }
            },
            cmds:{
                ini:[]
            },
            activeLast:false
        }),
        EventHandlers:{
            onGetContent:function(profile,item,onEnd){},
            onClickButton:function(profile,item,cmdkey,src){},
            onShowOptions:function(profile,item,e,src){}
        },
         RenderTrigger:function(){
            var self=this, pro=self.properties, items=pro.items, item;
            if(pro.activeLast && items.length>0){
                item=items[items.length-1];
                self.boxing().fillContent(item.id, item._body);
            }
        },
        _prepareItems:function(profile, arr, pid){
            if(arr.length){
                arr[0]._precheked = profile.getClass('ITEM','-prechecked');
                if(profile.properties.activeLast){
                    //for properties.data
                    var item = arr[arr.length-1];
                    item._show = true;
                    item._fill = true;
                    item._body = profile.onGetContent?profile.boxing().onGetContent(profile,item) : profile.box._buildBody(profile, item);
                }
            }
            return arguments.callee.upper.apply(this, arguments);
        },
        _prepareItem:function(profile, item){
            var p = profile.properties,o,
                dpn = 'display:none';
            item._tabindex = p.tabindex;
            if(!item.caption)
                item._capDisplay=dpn;
            else
                item.caption = item.caption.replace(/</g,"&lt;");
            item._opt = item.optBtn?'':dpn;
            item._body= item._body || 'Loading...'

            if(item._show){
                item._checked = profile.getClass('ITEM','-checked');
                item._tlgchecked = profile.getClass('TOGGLE','-checked');
            }
            var cmds = item.cmds || p.cmds;
            if(cmds && cmds.length){
                var sid=linb.UI.$tag_subId,a;
                a=item.cmds=[];
                for(var i=0,t=cmds,l=t.length;i<l;i++){
                    o=linb.UI.adjustData(profile,t[i]);
                    a.push(o);
                    o[sid]=item[sid] + '_' + o.id;
                }
            }
        },
        _buildBody:function(profile,item){
            return item.text?'<pre>'+item.text.replace(/</g,"&lt;")+'</pre>':'';
        }
    }
});
