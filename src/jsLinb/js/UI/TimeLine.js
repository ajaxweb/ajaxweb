/*
*to do: background div
*to do: special div
*/

Class('linb.UI.TimeLine', ['linb.UI','linb.absList',"linb.absValue"], {
    Dependency:['linb.Date'],
    Instance:{
        _setCtrlValue:function(value){
            if(!value)return;
            if(value.indexOf(':')==-1)return;
            var profile=this.get(0),
                p=profile.properties,
                box=this.constructor,
                a=value.split(':'),
                from=new Date(parseInt(a[0])),
                to=new Date(parseInt(a[1])),
                pxStart=box._getX(profile,from),
                pxEnd=box._getX(profile,to),
                task;
            if(p.items.length===0)
                this.insertItems([{id:'$', caption:p.dftTaskName, from:from, to:to}],null,true);
            else
                box._resetItem(profile,{left:pxStart,width:pxEnd-pxStart},profile.getSubNodeByItemId('ITEM',p.items[0].id).get(0));
        },
        visibleTask:function(){
            var profile=this.get(0),
                p=profile.properties,
                date=linb.Date,
                items=p.items;
            if(items.length && !p.multiTasks){
                target=new Date(items[0].from);
                if(target<p.dateStart || target>date.add(p.dateStart,'ms',p.width*p._rate)){
                    p.dateStart=target;
                    var k=p.$UIvalue;
                    this.refresh().setUIValue(k);
                }
            }
            return this;
        },
        _afterInsertItems:function(profile){
           profile.box._reArrage(profile);
        },
        _afterRemoveItems:function(profile){
            profile.box._reArrage(profile);
        },
        _cache:function(){
            var profile=this.get(0),
                cls=this.constructor,
                picker=cls._picker;
            if(picker && picker.domNode)
                profile.getSubNode('POOL').append(picker.root.css('display','none'));
        },
        getTimeRange:function(){
            var profile=this.get(0), p=profile.properties;
            return [p._smallLabelStart, p._smallLabelEnd];
        },
        iniContent:function(){
            return this.each(function(profile){
                var p=profile.properties;
                profile.boxing()._getContent(p._smallLabelStart,p._smallLabelEnd,p._rate,'ini');
            });
        },

        addTasks:function(arr){
            return this.insertItems(arr,null,true);
        },
        removeTasks:function(ids){
            this.removeItems(ids);
            return this;
        },
        _getContent:function(from,to,rate,type){
            return this.each(function(profile){
                if(profile.onGetContent){
                    var p=profile.properties,
                        ins=profile.boxing(),
                        callback=function(arr){
                            profile.boxing().addTasks(arr);
                        };
                    linb.Thread(null,[
                        function(threadId){
                            var r = ins.onGetContent(profile, from, to, rate, type, callback, threadId);
                            if(r) callback(r);
                        }
                        ],null,null,
                        function(threadId){ins.busy()},
                        function(){ins.free()}
                    ).start();
                }
            });
        } 
    },
    Static:{
        Templates:{
            tagName:'div',
            style:'{_style}',
            BORDER:{
                tagName:'div',
                style:'height:{_bHeight}px;width:{_bWidth}px;',
                FOCUS:{tagName:'button'},
                POOL:{
                    tagName:'div',
                    style:'position:absolute;left:0;top:0;width:0;height:0;display:none;'
                },
                BAR:{
                    tagName:'div',
                    className:'uibar-bar',
                    style:'{_bardisplay};height:{_barHeight}px;',
                    BART:{
                        cellpadding:"0",
                        cellspacing:"0",
                        width:'100%',
                        height:'100%',
                        border:'0',
                        tagName:'table',
                        className:'uibar-t',
                        BARTR:{
                            tagName:'tr',
                            BARTDL:{
                                tagName:'td',
                                className:'uibar-tdl'
                            },
                            BARTDM:{
                                $order:1,
                                width:'100%',
                                tagName:'td',
                                className:'uibar-tdm'
                            },
                            BARTDR:{
                                $order:2,
                                tagName:'td',
                                className:'uibar-tdr'
                            }
                        }
                    },
                    BARCMDL:{
                        tagName:'div',
                        className:'uibar-cmdl',
                        DATE:{$order:0,style:'{dateDisplay}'},
                        PRE:{$order:2},
                        'ZOOMIN':{$order:3,style:'{zoomDisplay}'},
                        'ZOOMOUT':{$order:4,style:'{zoomDisplay}'},
                        NEXT:{$order:5}
                    },
                    BARCMDR:{
                        tagName: 'div',
                        className:'uibar-cmdr',
                        onselectstart:'return false',
                        unselectable:'on',
                        OPT:{
                            className:'uicmd-opt',
                            style:'{optDisplay}',
                            $order:0
                        },
                        CLOSE:{
                            $order:4,
                            className:'uicmd-close ',
                            style:'{closeDisplay}'
                        }
                    }
                },
                BAND:{
                    $order:2,
                    tagName:'div',
                    style:'left:{_band_left}px;width:{_band_width}px;',
                    BIGLABEL:{
                        tagName:'div',
                        style:'height:{_bigLabelHeight}px;z-index:3;{_showBigLabel}',
                        text:"{_bigMarks}"
                    },
                    SMALLLABEL:{
                        $order:1,
                        tagName:'div',
                        style:'height:{_smallLabelHeight}px;z-index:4;',
                        text:"{_smallMarks}"
                    }
                },
                VIEW:{
                    $order:3,
                        tagName:'div',
                        style:'height:{_viewHeight}px;',
                        ITEMS:{
                            tagName:'div',
                            style:'left:{_band_left}px;width:{_band_width}px;',
                            text:'{items}',
                            ACTIVE:{
                                $order:3,
                                tagName:'div'
                            }
                        },
                        SCROLL:{
                            tagName:'div',
                            SCROLLI:{
                                tagName:'div'
                            }
                        }
                },
                TIPS:{
                    $order:4,
                    style:'z-index:2;{_tipsdisplay};height:{_tipsHeight}px',
                    tagName:'div'
                }
            },
            $dynamic : {
                _bigMarks:{
                    LABELT:{
                        id:null,
                        className:null,
                        tagName:'div',
                        onselectstart:'return false',
                        unselectable:'on',
                        style:'width:{width}px;left:{left}px;',
                        text:'{text}'
                    }
                },
                _smallMarks:{
                    LABELB:{
                        id:null,
                        className:null,
                        tagName:'div',
                        onselectstart:'return false',
                        unselectable:'on',
                        style:'width:{width}px;left:{left}px;',
                        text:'{text}'
                    }
                },
                items:{
                    ITEM:{
                        tagName:'div',
                        className:'{itemClass}',
                        style:'left:{_left}px;width:{_width}px;{_top};{_height};{itemStyle}',
                        MIN:{
                            $order:0,
                            tagName:'div',
                            style:'{_minDisplay}'
                        },
                        NORMAL:{
                            $order:1,
                            tagName:'div',
                            style:'{_normalDisplay};{_height};{_border}{_background}',
                            LEFT:{
                                $order:1,
                                tagName:'div'
                            },
                            HEAD:{
                                $order:2,
                                tagName:'div'
                            },
                            CON:{
                                $order:3,
                                tagName:'div',
                                text:'{caption}'
                            },
                            RIGHT:{
                                $order:4,
                                tagName:'div'
                            }
                        }
                    }
                }
            }
        },
        Behaviors:{
            DropableKeys:['ITEMS'],
            HoverEffected:{PRE:'PRE',NEXT:'NEXT',ZOOMIN:'ZOOMIN',ZOOMOUT:'ZOOMOUT',DATE:'DATE',OPT:'OPT',CLOSE:'CLOSE',MIN:'MIN',NORMAL:'NORMAL'},
            ClickEffected:{PRE:'PRE',NEXT:'NEXT',ZOOMIN:'ZOOMIN',ZOOMOUT:'ZOOMOUT',DATE:'DATE',OPT:'OPT',CLOSE:'CLOSE',MIN:'MIN'},
            onSize:function(profile,e){
                var o = profile.domNode.style,f=parseInt, n=null, w=n, h=n;
                if(e.height)h=f(o.height)||n;
                if(e.width)w=f(o.width)||n;
                if(h)linb.UI.$tryResize(profile, w, h);
            },
            CLOSE:{
                onClick:function(profile, e, src){
                    if(profile.properties.disabled)return;
                    var instance = profile.boxing();

                    if(false===instance.beforeClose(profile, src)) return;

                    instance.destroy();

                    //for design mode in firefox
                    return false;
                }
            },
            OPT:{
                onClick:function(profile, e, src){
                    if(profile.properties.disabled)return;
                    profile.boxing().onShowOptions(profile, e, src);
                }
            },
            onClick:function(profile, e){
                profile.box._focus(profile);
            },
            BAND:{
                onMousedown:function(profile, e, src){
                    if(profile.pauseA||profile.pause)return;
                    var t=profile.properties,
                        r=-t._band_left,
                        date=linb.Date,
                        rate=t._rate,
                        ep=linb.Event.getPos(e),
                        l=t._band_width-r-t.width;
                    ;
                    if(t.minDate && t._smallLabelStart<t.minDate)
                        r-=date.diff(t._smallLabelStart,t.minDate,'ms')/rate;
                    if(t.maxDate && t._smallLabelEnd>t.maxDate)
                        l-=date.diff(t.maxDate,t._smallLabelEnd,'ms')/rate;
                    if(r<0)r=0;
                    if(l<0)l=0;

                    linb([src]).startDrag(e, {
                        targetReposition:false,
                        dragType:'blank',
                        horizontalOnly:true,
                        targetLeft:ep.left,
                        targetTop:ep.top,
                        maxLeftOffset:l,
                        maxRightOffset:r
                     });
                },
                onDragstop:function(profile, e, src){
                    profile.box._rePosition(profile);
                    profile.box._focus(profile);
                },
                onDrag:function(profile, e, src){
                    var ns=profile.box._getMoveNodes(profile),
                        dd=linb.DragDrop.getProfile();
                    ns.left(profile.properties._band_left +  dd.offset.x);
                }
            },
            SCROLL:{
                onScroll:function(profile, e, src){
                    profile.getSubNode('ITEMS').top(-linb([src]).scrollTop() );
                }
            },
            ITEMS:{
                onMouseover:function(profile,e,src){
                    if(linb.DragDrop.getProfile().isWorking)return;
                    profile.$itemspos = linb([src]).offset();
                },
                onMousemove:function(profile,e){
                    if(linb.DragDrop.getProfile().isWorking){
                        //ondrag add here, for performance of 'dont-use-dropable situation'.
                        if(profile.$$ondrag){
                            var d=linb.DragDrop.getProfile();
                            profile.box._moveActive(profile, profile.$active, d.x-profile.$dd_ox, profile.properties._unitPixs);
                        }
                    }else{
                        var t=profile.properties,
                            date=linb.Date,
                            s=t._smallLabelStart,
                            r=t._rate,
                            u=t._timeFormat,
                            p1=linb.Event.getPos(e),
                            p2=profile.$itemspos;
                        if(p2 && t.showTips)
                            profile.box._setTips(profile, date.getText(date.add(s, 'ms', (p1.left-p2.left)*r),u));
                    }
                },
                onMouseout:function(profile,e,src){
                    if(linb.DragDrop.getProfile().isWorking)return;
                    if(profile.properties.showTips)
                        profile.box._setTips(profile, '');
                },
                onMousedown:function(profile, e, src){
                    var pro=profile.properties;
                    if(pro.disabled || pro.readonly)return;
                    if(profile.pauseA||profile.pause)return;
                    if(linb.Event.getSrc(e)!=src)return;

                    var o = profile.getSubNode('ACTIVE'),
                        x = linb.Event.getPos(e).left;
                    o.css({
                        display:'block',
                        width:'0'
                    })
                    .offset({left :x,  top :null});
                    o.startDrag(e, {dragType:'none'});
                },
                onMouseup:function(profile, e, src){
                    profile.box._focus(profile);
                }
            },
            ACTIVE:{
                onDragbegin:function(profile, e, src){
                    profile.$dd_ox = linb.DragDrop.getProfile().x;
                    profile.$dd_oleft = parseInt(src.style.left)||0;
                    linb([src,src.parentNode]).css('cursor','e-resize');
                },
                onDrag:function(profile, e, src){
                    var x=profile.$dd_oleft,
                        ddx=linb.DragDrop.getProfile().x,
                        w,
                        offset;
                    if((offset =ddx-profile.$dd_ox)>=0){
                        w = offset;
                    }else{
                        x = x+offset; w = -offset;
                    }
                    profile.box._moveActive(profile, src, x, w);
                },
                onDragstop:function(profile, e, src){
                    var r = profile.box._deActive(profile);
                    linb([src,src.parentNode]).css('cursor','');

                    var box=profile.box,
                        from=box._getTime(profile, r.left),
                        to=box._getTime(profile, r.left+r.width),
                        p=profile.properties,
                        task,t,
                        b=profile.boxing();

                    if(profile.properties.multiTasks){
                        task={id:_.id(),caption:p.dftTaskName,from:from,to:to};
                        if(profile.beforeNewTasks && false===b.beforeNewTasks(profile, [task])){}else
                            b.addTasks([task]);
                    }else
                        b.setUIValue(from+":"+to);

                    profile.$dd_ox =profile.$dd_oleft=null;
                }
            },
            FOCUS:{
                onFocus:function(profile, e, src){
                    _.resetRun(profile.KEY+':focus',function(){
                        profile.getSubNode('BAR').tagClass('-focus');
                    });
                },
                onBlur:function(profile, e, src){
                    _.resetRun(profile.KEY+':focus',function(){
                        profile.getSubNode('BAR').tagClass('-focus',false);
                    });
                },
                onKeydown:function(profile, e, src){
                    if(profile.pauseA||profile.pause)return;
                    profile.pause=true;

                    // speed
                    var t=profile.properties,
                        date=linb.Date,
                        rate=t._rate,
                        maxOffset = 30,
                        o=profile.box._getMoveNodes(profile),
                        x=o.left(),
                        xx=t._band_left,
                        off=t._scroll_offset
                        ;

                    off = t._scroll_offset = off>maxOffset ? off :off*1.05;

                    switch(linb.Event.getKey(e)[0]){
                        case 'left':
                        case 'up':
                            if(t.minDate && date.add(t.dateStart,'ms',(xx-x-off)*rate)<t.minDate)
                                off=date.diff(t.minDate, t.dateStart,'ms')/rate + (xx-x);
                            if(off<0)off=0;
                            o.left(x + off);
                            break;
                        case 'right':
                        case 'down':
                            if(t.maxDate && date.add(t.dateStart,'ms',(xx-x+off+t.width)*rate)>t.maxDate)
                                off=date.diff(t.dateStart,t.maxDate,'ms')/rate - (xx-x+t.width);
                            if(off<0)off=0;
                            o.left(x - off);
                            break;
                    }

                    if((x + maxOffset > 0) || (x + o.width() - t.width - maxOffset < 0))
                        profile.box._rePosition(profile);
                    profile.pause=false;
                    return false;
                },
                onKeyup:function(profile, e){
                    var p=profile.properties;
                    p._scroll_offset = p._scrollRate;
                    profile.box._rePosition(profile);
                }
            },
            PRE:{
                onClick:function(profile, e){
                    if(profile.pauseA||profile.pause)return;

                    var t=profile.properties,
                        date=linb.Date,
                        rate=t._rate,
                        o=profile.box._getMoveNodes(profile),
                        x1=t._band_left,
                        x2=0;
                    ;
                    if(t.minDate && t._smallLabelStart<t.minDate)
                        x2-=date.diff(t._smallLabelStart,t.minDate,'ms')/rate;

                    profile.pause=true;
                    o.animate({left:[x1,x2]}, null, function(){
                        profile.box._rePosition(profile);
                        profile.pause=false;
                    },200,Math.max(5,(x2-x1)/100),'inoutsine').start();
                }
            },
            NEXT:{
                onClick:function(profile, e){
                    if(profile.pauseA||profile.pause)return;
                    var t=profile.properties,
                        date=linb.Date,
                        rate=t._rate,
                        o=profile.box._getMoveNodes(profile),
                        x1=t._band_left,
                        x2=t.width-t._band_width;
                    ;
                    if(t.maxDate && t._smallLabelEnd>t.maxDate)
                       x2+=date.diff(t.maxDate,t._smallLabelEnd,'ms')/rate;

                    if(x1>x2){
                        profile.pause=true;
                        o.animate({left:[x1,x2]}, null, function(){
                            profile.box._rePosition(profile);
                            profile.pause=false;
                        },200,Math.max(5,(x1-x2)/100),'inoutsine').start();
                    }
                }
            },
            ZOOMIN:{
                onClick:function(profile, e){
                    if(profile.pauseA||profile.pause)return;
                    var p=profile.properties,
                        box=profile.box,
                        z=box.$zoom,
                        index = _.arr.indexOf(z,p._unitParas),
                        o;
                    if(index > 0){
                        profile.pause=true;
                        p.timeSpanKey =  z[index- 1][0];

                        o = profile.getSubNodes(['VIEW','BAND']);
                        o.animate( {opacity:[1,0.2]}, null, function(){
                            profile.box._refresh(profile)._focus(profile);
                            profile.pause=false;
                        },200,5,'insine').start();
                    }
                }
            },
            ZOOMOUT:{
                onClick:function(profile, e){
                    if(profile.pauseA||profile.pause)return;
                    var p=profile.properties,
                        box=profile.box,
                        z=box.$zoom,
                        index = _.arr.indexOf(z,p._unitParas),
                        o;
                    if(index < z.length -1){
                        profile.pause=true;
                        p.timeSpanKey = z[index + 1][0];

                        o = profile.getSubNodes(['VIEW','BAND']);
                        o.animate( {opacity:[1,0.2]}, null, function(){
                            //if multiTasks, setUIValue will be ignored
                            profile.box._refresh(profile)._focus(profile);
                            profile.pause=false;
                        },200,5,'insine').start();
                    }
                }
            },
            DATE:{
                onClick:function(profile, e, src){
                    if(profile.pauseA||profile.pause)return;
                    var cls=profile.box,
                        box=profile.boxing(),
                        from=profile.properties.dateStart,
                        o,node;

                    if(cls._picker && cls._picker.domNode){
                       o=cls._picker.boxing();
                    }else{
                        o=linb.create('DatePicker');
                        cls._picker=o.get(0);
                        o.beforeClose(function(){
                            this.boxing()._cache();
                            return false;
                        })
                        .beforeUIValueSet(function(p, ov, v){
                            var profile=this,
                                obj = profile.getSubNodes(['VIEW','BAND']),
                                box=profile.boxing(),
                                p=profile.properties;
                            p.dateStart=v;
                            //obj.animate( {opacity:[1,0.2]}, null, function(){
                                //if multiTasks, setUIValue will be ignored
                                profile.box._refresh(profile)._focus(profile);
                            //    profile.pause=false;
                            //},200,5,'insine').start()
                            box._cache();
                        });
                    }
                    o.setValue(from,true).host(profile);
                    node=o.reBoxing();
                    node.popToTop(src);

                    //for on blur disappear
                    node.setBlurTrigger(profile.key+" - "+profile.$id, function(){
                        box._cache();
                    });

                    //for esc
                    linb.Event.keyboardHook('esc',0,0,0,function(){
                        box._cache();
                        cls._focus(profile);
                        //unhook
                        linb.Event.keyboardHook('esc');
                    });
                }
            },
            ITEM:{
                onClick:function(profile, e, src){
                    if(profile.onClickTask)
                        profile.boxing().onClickTask(profile, profile.getItemByDom(src), e, src);
                },
                onDragbegin:function(profile, e, src){
                    var t=profile.getItemByDom(src),
                        type=profile.$dd_type,
                        cursor=type?'e-resize':'move',
                        ac=profile.$active;
                    profile.$dd_ox = linb.DragDrop.getProfile().x;
                    profile.$dd_oleft = parseInt(src.style.left);
                    profile.$dd_owidth = parseInt(src.style.width);
                    linb([ac]).css('display','block').cssPos({left :profile.$dd_oleft,  top :null}).width(profile.$dd_owidth-2);
                    linb([ac,ac.parentNode]).css('cursor',cursor);
                },
                onDrag:function(profile, e, src){
                    var x,w,
                        offset =linb.DragDrop.getProfile().x-profile.$dd_ox,
                        ddl=profile.$dd_oleft,
                        ddw=profile.$dd_owidth,
                        type=profile.$dd_type;
                    if(type=="left"){
                        if(offset < ddw){
                            x = ddl + offset;
                            w = ddl + ddw - x;
                        }else{
                            x = ddl + ddw;
                            w = offset - ddw;
                        }
                    }else if(type == "right"){
                        if(-offset < ddw){
                            x = ddl;
                            w = ddw + offset;
                        }else{
                            x = ddl + offset + ddw;
                            w = -offset - ddw;
                        }
                    }else{
                        x = ddl + offset;
                        w = ddw;
                    }
                    profile.box._moveActive(profile, profile.$active, x, w);
                },
                onDragstop:function(profile, e, src){
                    var box=profile.box,
                        r = profile.box._deActive(profile),
                        ac=profile.$active;

                        var from=box._getTime(profile, r.left),
                            to=box._getTime(profile,r.left+r.width);
                    if(profile.properties.multiTasks){
                        if(profile.beforeTaskUpdated && false===profile.boxing().beforeTaskUpdated(profile, profile.getItemByDom(src), from, to)){}else
                            box._resetItem(profile,r,src);
                    }else
                        profile.boxing().setUIValue(from+":"+to);

                    profile.$dd_type = null;

                    linb([ac,ac.parentNode]).css('cursor','');
                }
            },
            HEAD:{
                onMousedown:function(profile, e, src){
                    var ps=profile.properties, item=profile.getItemByDom(src);
                    if(ps.disabled  || item.disabled)return;
                    if(profile.beforeDragTask && false===profile.boxing().beforeDragTask(profile, item, e, src))
                        return;
                    if(ps.readonly||item.readonly)return;
                    linb([src]).parent(2).startDrag(e, {
                        dragDefer:1,
                        dragType:'none'
                    });
                }
            },
            LEFT:{
                onMousedown:function(profile, e, src){
                    var ps=profile.properties, item=profile.getItemByDom(src);
                    if(ps.disabled || ps.readonly || item.readonly || item.disabled)return;
                    profile.$dd_type='left';
                    linb([src]).parent(2).startDrag(e, {
                        dragDefer:1,
                        dragType:'none'
                    });
                }
            },
            RIGHT:{
                onMousedown:function(profile, e, src){
                    var ps=profile.properties, item=profile.getItemByDom(src);
                    if(ps.disabled || ps.readonly || item.readonly || item.disabled)return;
                    profile.$dd_type='right';
                    linb([src]).parent(2).startDrag(e, {
                        dragDefer:1,
                        dragType:'none'
                    });
                }
            }
        },
        DataModel:{
            $borderW : 1,
            readonly:false,
            // control width and height
            width : 400,
            height : 200,
            //invisible band count (left,right)
            //if it's zero, leftSpanCount will be equal to the visible span count(based on widget width)
            leftSpanCount:{
                ini:0,
                inner:1
            },
            rightSpanCount:{
                ini:0,
                inner:1
            },
            increment:0,
            zoomable:{
                ini:true,
                action:function(v){
                    if(this.properties.timeSpanKey)
                        this.getSubNodes(['ZOOMIN','ZOOMOUT']).css('display',v?'':'none');
                }
            },
            dftTaskName:'task',
            taskHeight:{
                ini:16,
                action:function(v){
                    this.getSubNode('ITEM',true).height(v);
                }
            },

            //time span key
            timeSpanKey : {
                ini:'1 d',
                action:function(){
                    this.box._refresh(this);
                }
            },
            // how much px to represent a unit
            // defalut value is from timeSpanKey
            unitPixs : {
                action:function(){
                    this.box._refresh(this);
                }
            },

/*
*inner properties
*defalut value is from timeSpanKey
*/
            //time span count
            smallLabelCount:{
                inner:1
            },
            //time span unit
            smallLabelUnit:{
                inner:1,
                listbox:_.toArr(linb.Date.$TIMEUNIT,true)
            },
            //small label format
            smallLabelFormat:{
                inner:1,
                listbox:_.toArr(linb.Date.$TEXTFORMAT,true)
            },
            bigLabelCount:{
                inner:1
            },
            //time span unit
            bigLabelUnit:{
                inner:1,
                listbox:_.toArr(linb.Date.$TIMEUNIT,true)
            },

            //big label format
            bigLabelFormat:{
                inner:1,
                listbox:_.toArr(linb.Date.$TEXTFORMAT,true)
            },
            //time format
            timeFormat:{
                inner:1,
                listbox:_.toArr(linb.Date.$TEXTFORMAT,true)
            },
/*inner properties*/
            //bar
            showBar:{
                ini:true,
                action:function(v){
                    this.getSubNode('BAR').css('display',v?'':'none');
                    var p=this.properties,w=p.width,h=p.height;
                    p.width=p.height=0;
                    linb.UI.$tryResize(this,w,h);
                    p.width=w,p.height=h;
                }
            },
            //tips
            showTips:{
                ini:true,
                action:function(v){
                    this.getSubNode('TIPS').css('display',v?'':'none');
                    var p=this.properties,w=p.width,h=p.height;
                    p.width=p.height=0;
                    linb.UI.$tryResize(this,w,h);
                    p.width=w,p.height=h;
                }
            },
            //big label
            showBigLabel: {
                ini:true,
                action:function(v){
                    this.getSubNode('BIGLABEL').css('display',v?'':'none');
                    var p=this.properties,w=p.width,h=p.height;
                    p.width=p.height=0;
                    linb.UI.$tryResize(this,w,h);
                    p.width=w,p.height=h;
                }
            },

            _barHeight : 22,
            _tipsHeight : 16,
            _bigLabelHeight : 16,
            _smallLabelHeight : 14,
            _scrollRate:5,

            multiTasks: {
                ini:false,
                action:function(){
                    this.box._refresh(this);
                }
            },

            minDate:{
                ini:null,
                action:function(value){
                    if(value>this.properties.dateStart)
                        this.box._refresh(this);
                }
            },
            maxDate:{
                ini:null,
                action:function(value){
                    var p=this.properties;
                    if(value<linb.Date.add(p.dateStart,'ms',p.width*p._rate))
                        this.box._refresh(this);
                }
            },
            
            dateBtn:{
                ini:true,
                action:function(v){
                    this.getSubNode('DATE').css('display',v?'':'none');
                }
            },
            closeBtn:{
                ini:false,
                action:function(v){
                    this.getSubNode('CLOSE').css('display',v?'':'none');
                }
            },
            optBtn:{
                ini:false,
                action:function(v){
                    this.getSubNode('OPT').css('display',v?'':'none');
                }
            },
 
            fixWidth:true,
            dateStart : {
                ini:new Date,
                action:function(){
                    this.box._refresh(this);
                }
            }
        },
        EventHandlers:{
            beforeClose:function(profile, src){},
            onShowOptions:function(profile, e, src){},
            onGetContent:function(profile, from, to, minMs, type, callback, threadid){},
            beforeTaskUpdated:function(profile, task, from, to){},
            beforeNewTasks:function(profile, tasks){},
            beforeDelTasks:function(profile, arr){},
            beforeDragTask:function(profile, task, e, src){},
            onClickTask:function(profile, task, e, src){}
        },
        Appearances:{
            BORDER:{
                overflow: 'hidden',
                position: 'relative',
                'border-bottom':'solid 1px #C1C1C1'
            },
            'BAR-focus BART':{
                $order:2,
                'background-position' : 'right -22px'
            },
            'BART':{
                border:0
            },
            'BARCMDL span':{
                $order:0,
                position:'relative',
                width:'15px',
                height:'15px',
                'vertical-align': 'middle',
                cursor:'default'
            },
            TIPS:{
                'background-color':'#ECE9D8'
            },
            FOCUS:{
                position:'absolute',
                'font-size':'0',
                width:'1px',
                height:'1px',
                left:'-100px',
                top:'-100px',
                'line-height':'0',
                border:'0'
            },
            'BAND, VIEW, BIGLABEL, SMALLLABEL, TIPS':{
                position:'relative'
            },
            'BAND, VIEW, TIPS':{
                'border-left': 'solid 1px #C1C1C1',
                'border-right': 'solid 1px #C1C1C1'
            },
            VIEW:{
                width:linb.browser.ie6?'100%':null,
                overflow:'hidden'
            },
            SCROLL:{
                'z-index':500,
                position:'absolute',
                'font-size':'0',
                'line-height':'0',
                right:0,
                top:0,
                height:'100%',
                width:'18px',
                overflow:'auto',
                'overflow-x':linb.browser.opr?null:'hidden'
            },
            SCROLLI:{
                height:'1000px',
                width:'1px'
            },
            'BIGLABEL, SMALLLABEL':{
                'background-color':'#ECE9D8',
                cursor:'move'
            },
            'BIGLABEL,SMALLLABEL':{
                'border-bottom':'solid 1px #505050'
            },
            ITEMS:{
                position:'relative',
                background: linb.UI.$bg('bars.gif',' left top')
            },
            'BIGLABEL div, SMALLLABEL div':{
                'border-left':'solid 1px #505050',
                'text-align':'center',
                position:'absolute',
                cursor:'move',
                "-moz-user-select":linb.browser.gek?'none':'',
                top:0,
                overflow:'visible',
                height:'100%'
            },
            'BIGLABEL div':{
                $order:2,
                'text-align':'left',
                'padding-left':'4px'
            },

            ACTIVE:{
                'z-index':300,
                position:'relative',
                'border-left': '1px dashed',
                'border-right': '1px dashed',
                left:'-100px',
                width:'0',
                background:0,
                height:'100%'
            },

            ZOOMIN:{
                background: linb.UI.$bg('cmds.gif', ' no-repeat  -271px top', true)
            },
            'ZOOMIN-mouseover':{
                $order:2,
                'background-position': '-271px -16px'
            },
            'ZOOMIN-mousedown':{
                $order:3,
                'background-position': '-271px -31px'
            },
            ZOOMOUT:{
                background: linb.UI.$bg('cmds.gif', ' no-repeat  -256px top', true)
            },
            'ZOOMOUT-mouseover':{
                $order:2,
                'background-position': '-256px -16px'
            },
            'ZOOMOUT-mousedown':{
                $order:3,
                'background-position': '-256px -31px'
            },
            DATE:{
                background: linb.UI.$bg('cmds.gif', ' no-repeat  -46px -65px', true)
            },
            'DATE-mouseover':{
                $order:2,
                'background-position':' -46px -80px'
            },
            'DATE-mousedown':{
                $order:3,
                'background-position':' -46px -95px'
            },
            MIN:{
                background: linb.UI.$bg('cmds.gif', ' no-repeat  -31px -65px', true)
            },
            PRE:{
                background: linb.UI.$bg('cmds.gif', ' no-repeat  0 -65px', true),
                top:'0'
            },
            'PRE-mouseover':{
                $order:2,
                'background-position': '0 -80px'
            },
            'PRE-mousedown':{
                $order:3,
                'background-position': '0 -95px'
            },
            NEXT:{
                position:'absolute',
                background: linb.UI.$bg('cmds.gif', ' no-repeat  -16px -65px', true),
                top:'0'
            },
            'NEXT-mouseover':{
                $order:2,
                'background-position': '-16px -80px'
            },
            'NEXT-mousedown':{
                $order:3,
                'background-position': '-16px -95px'
            },
            ITEM:{
                position:'absolute',
                overflow:'visible'
            },
            'MIN, NORMAL':{
                //position:'absolute',
                //top:0,
                //left:0,
                position:'relative',
                height:'16px',
                overflow:'hidden',
                'z-index':'1'
            },
            'MIN':{
                width:'16px',
                background: linb.UI.$bg('cmds.gif', ' no-repeat -30px -65px', true),
                cursor:'pointer'
            },
            'MIN-mouseover':{
                'background-position': '-30px -80px'
            },
            'MIN-mousedown':{
                'background-position': '-30px -95px'
            },
            NORMAL:{
                cursor:'pointer',
                'background-color': '#C6D6F7',
                border:'solid 1px #203A83'
            },
            'NORMAL-mouseover':{
                $order:2,
                'border-color': 'red'
            },
            'LEFT, HEAD, RIGHT':{
                position:'absolute',
                top:0,
                height:'100%'
            },
            HEAD:{
                background: linb.UI.$bg('handler.gif', ' left top', true),
                width:'6px',
                left:'3px',
                cursor:'move',
                'z-index':5
            },
            'LEFT, RIGHT':{
                width:'2px',
                'z-index':10
            },
            'LEFT':{
                cursor:'e-resize',
                left:0
            },
            'RIGHT':{
                cursor:'w-resize',
                right:0
            },
            CON:{
                'padding-left':'12px',
                position:'relative',
                height:'100%',
                overflow:'hidden'
            }
        },
        RenderTrigger:function(){
            var self=this, p=self.properties,cls=self.box;
            self.$active = self.getSubNode('ACTIVE').get(0);
            cls._ajustHeight(self);
            self.boxing().iniContent();
        },
        _onDropMarkShow:function(){linb.DragDrop.setDragIcon('add');return false},
        _onDropMarkClear:function(){linb.DragDrop.setDragIcon();return false},
        _onDragEnter:function(profile,e,src){
            var t=profile.properties,
                ep=linb.Event.getPos(e),
                _left = t._unitPixs/2
            ;
            linb(profile.$active).css('display','block');
            profile.$dd_ox =linb([src]).offset().left+_left;

            profile.$$ondrag=true;
        },
        _onDragLeave:function(profile){
            profile.$$ondrag=profile.$dd_ox=null;

            profile.box._deActive(profile);
        },
        _onDrop:function(profile){
            profile.$$ondrag=profile.$dd_ox=null;

            var r = profile.box._deActive(profile),
                task={id:_.id(),caption:profile.properties.dftTaskName},
                box=profile.box,
                b=profile.boxing();

            task.from = box._getTime(profile, r.left);
            task.to = box._getTime(profile, r.left+r.width);
            task._dropData=linb.DragDrop.getProfile().dragData;

            if(profile.beforeNewTasks && false===b.beforeNewTasks(profile, [task])){}else
                b.addTasks([task]);
        },
        _prepareData:function(profile){
            var p=profile.properties,
                d={},
                date=linb.Date,
                us=date.$TIMEUNIT,
                nodisplay='display:none',
                zoom=profile.box.$zoom,
                m=0,u,
                i,t,label,temp,_date,width,rate,
                _unitParas,
                _dateStart,
                _barCount,_leftBarCount,_rightBarCount,_barCountall,

                smallMarks,smallLabelStart,smallLabelEnd,smallLabelUnit,smallLabelCount,smallLabelFormat
                ;


            d.dateDisplay = p.dateBtn?'':nodisplay;
            d.closeDisplay = p.closeBtn?'':nodisplay;
            d.optDisplay = p.optBtn?'':nodisplay;
            d._showBigLabel=p.showBigLabel?'':nodisplay;

            // for quick move
            p._scroll_offset = p._scrollRate;

            p._lines=[{}];

            //border
            d._bWidth = p.width - 2*p.$borderW;
            d._bHeight = p.height - 2*p.$borderW;
            //view
            p._viewHeight = d._bHeight - (p.showTips&&p._tipsHeight) - (p.showBigLabel?p._bigLabelHeight:0) - p._smallLabelHeight - (p.showBar&&p._barHeight);
            d._tipsdisplay=p.showTips?'':nodisplay;
            d._bardisplay = p.showBar?'':nodisplay;

            //get unitparas from timespan key
            if(p.timeSpanKey){
                _.arr.each(zoom,function(o){
                    if(o[0]===p.timeSpanKey){
                        _unitParas=p._unitParas=o;
                        return false;
                    }
                });
                //give a default key
                if(!_unitParas)
                    _unitParas=p._unitParas=zoom[p.timeSpanKey='1 d'];
            }
            //if no timeSpanKey( _unitParas) input,
            d.zoomDisplay = (p.zoomable && _unitParas)?'':nodisplay

            if(_unitParas){
                p._unitPixs = p.unitPixs||_unitParas[1];
                p._smallLabelCount = p.smallLabelCount||_unitParas[2];
                p._smallLabelUnit = p.smallLabelUnit||_unitParas[3];
                p._smallLabelFormat = p.smallLabelFormat||_unitParas[4];
                p._bigLabelCount = p.bigLabelCount||_unitParas[5];
                p._bigLabelUnit = p.bigLabelUnit||_unitParas[6];
                p._bigLabelFormat = p.bigLabelFormat||_unitParas[7];
                p._timeFormat = p.timeFormat||_unitParas[8];
            }
            u=p._unitPixs;
            smallLabelCount = p._smallLabelCount;
            smallLabelUnit = p._smallLabelUnit;
            smallLabelFormat = p._smallLabelFormat;

            // get bar count in view
            _barCount = (Math.ceil(p.width / u)||0);
            _leftBarCount = p.leftSpanCount?p.leftSpanCount:_barCount;
            _rightBarCount = p.rightSpanCount?p.rightSpanCount:_barCount;
            _barCountall =  _barCount + _leftBarCount + _rightBarCount;

            // ms per px
            rate = p._rate = us[smallLabelUnit]*smallLabelCount/u;

            //adjust dateStart
            if(p.maxDate&& date.add(p.dateStart,'ms',p.width*rate) > p.maxDate)
                p.dateStart=date.add(p.maxDate,'ms',-p.width*rate);
            if(p.minDate&& p.dateStart<p.minDate)
                p.dateStart=p.minDate;

            // get the round start from the approximate start
            _dateStart = date.getTimSpanStart(p.dateStart, smallLabelUnit, smallLabelCount);
            // rel start in band
            smallLabelStart=p._smallLabelStart = date.add(_dateStart, smallLabelUnit, -_leftBarCount*smallLabelCount);
            // rel to in band
            smallLabelEnd = p._smallLabelEnd = date.add(smallLabelStart, smallLabelUnit, _barCountall*smallLabelCount);

            // get band with
            p._band_width = Math.ceil(date.diff(smallLabelStart,smallLabelEnd, 'ms')/rate);

            // set band left
            p._band_left_fix = p._band_left = - Math.ceil(date.diff(smallLabelStart, p.dateStart, 'ms')/rate);

            // build bars
            smallMarks = p._smallMarks = [];

            temp=0;
            label=date.get(smallLabelStart, smallLabelFormat);
            for(i=0; i< _barCountall; i++){
                _date = date.add(smallLabelStart, smallLabelUnit, smallLabelCount*(i+1));
                width = Math.ceil(date.diff(smallLabelStart, _date, 'ms')/rate);
                smallMarks.push({
                    left : temp,
                    width : width - temp,
                    text : label
                });
                temp=width;
                label=date.getText(_date, smallLabelFormat);
            }


            if(p.showBigLabel){
                var _barCount2,off,
                    bigMarks,bigLabelStart,bigLabelEnd,

                    bigLabelCount = p._bigLabelCount,
                    bigLabelUnit = p._bigLabelUnit,
                    bigLabelFormat = p._bigLabelFormat
                    ;

                bigMarks = p._bigMarks = [];
                bigLabelStart=p._bigLabelStart =date.getTimSpanStart(smallLabelStart, bigLabelUnit, bigLabelCount);
                bigLabelEnd=p._bigLabelEnd = date.getTimSpanEnd(smallLabelEnd, bigLabelUnit, bigLabelCount);
                _barCount2 = date.diff(bigLabelStart, bigLabelEnd, bigLabelUnit)/bigLabelCount;
                off=date.diff(smallLabelStart, bigLabelStart, 'ms')/rate;
                label=date.getText(bigLabelStart, bigLabelFormat);
                temp=0;
                for(i=0; i< _barCount2; i++){
                    _date = date.add(bigLabelStart, bigLabelUnit, bigLabelCount*(i+1));
                    width = date.diff(bigLabelStart, _date, 'ms')/rate;
                    bigMarks.push({
                        left : Math.ceil(temp + off),
                        width : Math.ceil(width - temp),
                        text : label
                    });
                    temp=width;
                    label=date.getText(_date, bigLabelFormat);
                }
            }
            return arguments.callee.upper.call(this, profile, d);
        },
        _prepareItem:function(profile, item, oitem, pid){
            var self=this,
                t=profile.properties,
                index;
            if(!item.id)item.id=_.id();
            if(!item.caption)item.caption=t.dftTaskName;
            item._min=false;
            // caculate left and width
            item._left = self._getX(profile, item.from);
            item._width=Math.max(self._getX(profile, item.to) - item._left, 0);
            if(t.multiTasks){
                if(item._width<=16){
                    item._width=16;
                    item._min=true;
                }
            }
            item._minDisplay=item._min?'':'display:none';
            item._normalDisplay=item._min?'display:none':'';

            // caculate top and set task to lines cache
            index = self._getLinePos(profile, item);
//min region is alway 16 + 3
            item._top = t.multiTasks? 'top:' + (item._min?0:((t.taskHeight+3) * (index-1) + 16 + 3)) + 'px' : '';

            item._height = 'height:' + (t.multiTasks?item._min?'16px':t.taskHeight+'px':'100%');
            item._border = t.multiTasks?'':'border-top:0;border-bottom:0';

            item._background = item.background?'background:'+item.background+';':'';

            t._lines = t._lines || [{}];

            //set double link
            t._lines[index][item.id]=item;
            item._line = index;

            oitem._left=item._left;
            oitem._width=item._width;
            oitem._min=item._min;
            oitem._line=item._line;
        },
        $zoom:[
            /*
            *[
            *  id,
            *  small span unit count,
            *  small span unit,
            *  small span to big span function,
            *  small span lable format,
            *  big span lable format,
            *  value format
            *]
            */
            ['10 ms', 54, 10, 'ms', 'ms', 100, 'ms','hnsms','hnsms'],
            ['100 ms',54,  100, 'ms', 'ms', 1, 's','hns','hnsms'],
            ['1 s',30,  1, 's','s', 10, 's','hns','hnsms'],
            ['10 s', 30, 10, 's', 's',60, 's','hns','hnsms'],
            ['1 n',30,  1, 'n','n', 10, 'n','dhn','hns'],
            ['5 n', 30, 5, 'n','n', 30, 'n','mdhn','hns'],
            ['10 n', 30, 10, 'n','n', 60, 'n','mdhn','hns'],
            ['30 n', 30, 30, 'n','n', 4, 'h','ymdh','mdhn'],
            ['1 h', 30, 1, 'h','h',  6, 'h','ymdh','mdhn'],
            ['2 h', 30, 2, 'h','h', 12, 'h','ymdh','mdhn'],
            ['6 h', 30, 6, 'h','h', 24, 'h','ymd','mdhn'],
            ['1 d', 24, 1, 'd','w', 1, 'ww','ymd','ymdh'],
            ['1 w', 30, 1, 'ww','ww', 4, 'ww','ymd','ymd'],
            ['15 d', 30, 15, 'd','d', 2, 'm','ymd','ymd'],

//Not every unit width is the same value:
            ['1 m',  30,1, 'm','m', 1, 'q','yq','ymd'],
            ['1 q',  30,1, 'q','q', 1, 'y','y','ymd'],
            ['1 y',  48,1, 'y','y', 10, 'y','y','ym'],
            ['1 de',  48, 1, 'de','de', 100, 'y','y','ym'],
            ['1 c',  48, 1, 'c', 'c', 1000, 'y','y','y']

        ],
        _focus:function(profile){
            profile.getSubNode('FOCUS').focus(1);
        },
        _getTips:function(profile){
            var t,s='$dd_tooltip';
            if(t = profile[s] || (profile[s] = profile.getSubNode('TIPS').get(0).childNodes[0]))
                return t.nodeValue;
            else
                return profile.getSubNode('TIPS').get(0).innerHTML;
        },
        _rr:/\<[^>]*\>/g,
        _setTips:function(profile, text, force){
            if(!force && profile.pauseA)return;
            var t,s='$dd_tooltip';
            text=text.replace(this._rr,'');
            if(t = profile[s] || (profile[s] = profile.getSubNode('TIPS').get(0).childNodes[0])){
                if(t.nodeValue!=text)t.nodeValue=text;
            }else
                profile.getSubNode('TIPS').get(0).innerHTML=text;
        },
        _getX:function(profile, time){
            var t=profile.properties,d=new Date;
            d.setTime(time);
            return (Math.ceil(linb.Date.diff(t._smallLabelStart, d, 'ms')||0) / t._rate);
        },
        _getTime:function(profile, x, flag){
            var t=profile.properties;
            t = linb.Date.add(t._smallLabelStart, 'ms', x*t._rate);
            return flag?t:t.getTime();
        },
        _moveActive:function(profile, src, x, w){
            var p=Math.ceil,
                t=profile.properties,
                d=linb.Date,
                s=t._smallLabelStart,
                r=t._rate,
                u=t._timeFormat,
                ms='ms',
                y=src.style,
                z='px',
                m,n,increment;

            if(increment=t.increment){
                m=x;
                x=Math.floor(x/increment)*increment;
                w=Math.floor((w-x+m+increment-1)/increment)*increment;
            }

            m = (p(x)||0);
            n = ((p(w)||0)-2);
            if(n>0){
                y.left= m+z;
                y.width= n+z;
                if(t.showTips)
                    profile.box._setTips(profile, d.getText(d.add(s, ms, x*r),u)
                        + " - "
                        + d.getText(d.add(s, ms, (x+w)*r),u)
                    )
            }
        },
        _deActive:function(profile){
            var t=profile.$active.style, x=parseInt(t.left)||0, w=(parseInt(t.width)||0)+2;
            t.left='-1000px';
            if(profile.properties.showTips)
                profile.box._setTips(profile, '');
            return {left :x, width :w};
        },
        _minusLeft:function(profile,marks,node,offsetCount){
            var t=profile.properties;
            while((offsetCount--)>0){
                node.first().remove();
                temp=marks.shift();
            }
        },
        _minusRight:function(profile,marks,node,offsetCount){
            var t=profile.properties;
            while((offsetCount--)>0){
                node.last().remove();
                temp=marks.pop();
            }
        },
        _addLeft:function(profile, tag, node, offsetCount,  offset){
            // get additional bars
            var t=profile.properties,
                date=linb.Date,
                key=tag+'Marks',
                marks=t[key],
                labelStart=t[tag+'LabelStart'],
                labelUnit=t[tag+'LabelUnit'],
                labelCount=t[tag+'LabelCount'],
                labelFormat=t[tag+'LabelFormat'],
                rate=t._rate,
                addLb=[],
                temp,label,_date,i;

            temp=0;
            label=date.getText(labelStart, labelFormat);
            for(i=0; i< offsetCount; i++){
                _date = date.add(labelStart, labelUnit, labelCount*(i+1));
                width = date.diff(labelStart, _date, 'ms')/rate;
                addLb.push({
                    left : Math.ceil(temp + (offset||0)-0.0000000000003),
                    width : Math.ceil(width - temp),
                    text : label
                });
                temp=width;
                label=date.getText(_date, labelFormat);
            }
            addLb.reverse();
            // add to band UI
            node.prepend(_.str.toDom(profile.buildItems(key, addLb)));
            // add to memory list
            _.arr.insertAny(marks,addLb.reverse(),0);
        },
        _addRight:function(profile, labelEnd, tag, node, offsetCount,  offset){
            var t=profile.properties,
                date=linb.Date,
                key=tag+'Marks',
                marks=t[key],
                labelStart=t[tag+'LabelStart'],
                labelUnit=t[tag+'LabelUnit'],
                labelCount=t[tag+'LabelCount'],
                labelFormat=t[tag+'LabelFormat'],
                rate=t._rate,
                addLb=[],_d1,
                _date,i;
            _d1=labelEnd;
            for(i=0; i<offsetCount; i++){
                _date = date.add(labelEnd, labelUnit, labelCount*(i+1));
                addLb.push({
                    left : Math.ceil(date.diff(labelStart,_d1,'ms')/rate+ (offset||0)-0.0000000000003),
                    width : Math.ceil(date.diff(_d1, _date, 'ms')/rate),
                    text : date.getText(_d1, labelFormat)
                });
                _d1=_date;
            }
            // build
            // add to band UI
            node.append(_.str.toDom(profile.buildItems(key, addLb)));
            // add to memory list
            _.arr.insertAny(marks,addLb,-1);
        },
        _getMoveNodes:function(profile){
            return profile.$moveban = profile.$moveban || profile.getSubNodes(['BAND','ITEMS']);
        },
        //if left is numb, force to move
        _rePosition:function(profile, left){
            profile.pause=true;
            var self=this,
                date = linb.Date,
                t=profile.properties,
                rate=t._rate,
                label,m,n,
                labelsBottom = profile.getSubNode('SMALLLABEL'),
                band = self._getMoveNodes(profile),
                x = left || band.left(),
                //ralated to the fix position
                offset = x - t._band_left_fix;

            // if offset out a bar width
            if(Math.abs(offset)/t._unitPixs >=1 || left){
                var offsetCount = parseInt(offset/t._unitPixs),
                    bak_s = t._smallLabelStart,
                    bak_e = t._smallLabelEnd,
                    _c=-offsetCount*t._smallLabelCount,
                    offsetPxs,
                    _smallLabelStart,
                    _smallLabelEnd;

                _smallLabelStart=t._smallLabelStart = date.add(t._smallLabelStart, t._smallLabelUnit, _c);
                _smallLabelEnd=t._smallLabelEnd = date.add(t._smallLabelEnd, t._smallLabelUnit, _c);
                offsetPxs = Math.ceil(date.diff(_smallLabelStart, bak_s, 'ms')/rate);

                band.left(x - offsetPxs);

                // reset band paras
                t._band_width = Math.ceil(date.diff(_smallLabelStart, _smallLabelEnd, 'ms')/rate);

                //reset tasks position var
                _.arr.each(t.items,function(o){
                    o._left += offsetPxs;
                    profile.box._trimTask(profile,o);
                });
                labelsBottom.children().each(function(o){
                    o.style.left = (parseFloat(o.style.left)||0) + offsetPxs + "px";
                });
                _.arr.each(t._smallMarks,function(o){
                    o.left += offsetPxs;
                });

                // delete out, andd add to blank
                if(offsetCount>0){
                    self._minusRight(profile,t._smallMarks, labelsBottom,offsetCount);
                    self._addLeft(profile, '_small', labelsBottom, offsetCount);
                }else{
                    self._minusLeft(profile,t._smallMarks, labelsBottom, -offsetCount);
                    self._addRight(profile, bak_e, '_small', labelsBottom, -offsetCount);
                }

                if(t.multiTasks){
                    var arr=[];
                    // remove tasks
                    _.arr.each(t.items,function(o){
                        if(o._left >= t._band_width ||  (o._left+o._width) <= 0){
                            //delete from lines
                            delete t._lines[o._line][o.id];
                            arr.push(o.id);
                        }
                    });
                    profile.boxing().removeItems(arr);

                    if(profile.onGetContent)
                        profile.boxing()._getContent(offsetCount>0 ? _smallLabelStart : bak_e,
                            offsetCount>0 ? bak_s : _smallLabelEnd,
                            t._rate,
                            offsetCount>0 ? 'left' : 'right');
                    
                    //adjust the items
                    self._reArrage(profile);
                }

                if(t.showBigLabel){
                    var labelsTop = profile.getSubNode('BIGLABEL'),
                        bigLabelUnit=t._bigLabelUnit,
                        bigLabelCount=t._bigLabelCount,
                        off,
                        offsetCount2,offsetCount3,
                        bigLabelStart,bigLabelEnd;
                    bak_e=t._bigLabelEnd;

                    labelsTop.children().each(function(o){
                        o.style.left = (parseFloat(o.style.left)||0) + offsetPxs + "px";
                    });
                    _.arr.each(t._bigMarks,function(o){
                        o.left += offsetPxs;
                    });
                    bigLabelStart=date.getTimSpanStart(_smallLabelStart, bigLabelUnit, bigLabelCount);

                    offsetCount2 = Math.ceil(date.diff(_smallLabelStart, t._bigLabelStart, bigLabelUnit)/bigLabelCount);
                    offsetCount3 = Math.ceil(date.diff(t._bigLabelEnd, _smallLabelEnd, bigLabelUnit)/bigLabelCount);

                    //reset offset of big and small
                    if(offsetCount2){
                        off = date.diff(_smallLabelStart, bigLabelStart, 'ms')/rate;
                        t._bigLabelStart=bigLabelStart;
                        if(offsetCount2>0)
                            self._addLeft(profile, '_big',labelsTop, offsetCount2, off);
                        else
                            self._minusLeft(profile,t._bigMarks, labelsTop, -offsetCount2);
                    }
                    //reset offset of big and small
                    if(offsetCount3){
                        off = date.diff(_smallLabelStart, bigLabelStart, 'ms')/rate;
                        t._bigLabelEnd=date.add(t._bigLabelEnd, bigLabelUnit, offsetCount3*bigLabelCount);
                        if(offsetCount3<0)
                            self._minusRight(profile,t._bigMarks, labelsTop, -offsetCount3);
                        else
                            self._addRight(profile, bak_e, '_big',labelsTop, offsetCount3, off);
                    }
                }
            }
            // reset date start point
            t._band_left = band.left();
            t.dateStart = self._getTime(profile, -t._band_left, 1);

            profile.pause = false;
        },
        _trimTask:function(profile, o){
            //****
            // if too long, cut left
            var l=-12,
                x=o._left,
                w=o._width,
                bw=profile.properties._band_width;
            if(x < l){
                if(x+w<l)
                    w=0;
                else
                    w = w + x - l;
                x = l;
            }
            if(x>bw+12)x=bw+12;
            this._setItemNode(profile, o,'left',x+'px');
            // if too long, cut right
            if(x + w > bw - l)
                w = bw - l - x;
            if(w>=0)
                this._setItemNode(profile, o,'width',w+'px');
        },
        _setItemNode:function(profile, item, key, value){
            var t=profile.getSubNodeByItemId('ITEM',item.id).get(0);
            t.style[key]=value;
        },
        _getLinePos:function(profile,o){
            if(o._min)return 0;

            var t=profile.properties,
                b=false,
                index=0;
            _.arr.each(t._lines,function(v,i){
                if(i===0)return;
                b=true;
                _.each(v,function(v){
                    if(o.id!==v.id)
                        if(((o._left + o._width)>=v._left) && ((v._left + v._width)>=o._left))
                            return b=false;
                });
                if(b){index=i;return false;}
            });
            if(!b)
                index = t._lines.push({})-1;
            return index;
        },
        // _reArrage tasks for top position
        _reArrage:function(profile){
            var self=this, o, h,
                t=profile.properties;
            t._lines.length = 1;
            t.items.sort(function(x,y){
                return x.from>y.from?1:x.from==y.from?0:-1;
            });
            //re caculate from current line
            _.arr.each(t.items,function(v){
                if(v._line===0)return;

                //get pos from current line
                index = self._getLinePos(profile, v);
                t._lines[index][v.id]=v;
                // if has space, reset position
                if(v._line !== index){
                    // reset double link
                    v._line = index;
                    // set top
                    if(t.multiTasks)
                        self._setItemNode(profile, v,'top',((t.taskHeight+3) * (index-1) + 16 + 3) +'px');
                };
            });

            h = t._linesHeight =  (t._lines.length+1) * (t.taskHeight);

            self._ajustHeight(profile);
        },
        _resetItem:function(profile,o,src){
            var p=profile.properties,
                t=profile.getItemByDom(src),
                bandW=p._band_width + 12,
                f=function(k,i){return profile.getSubNodeByItemId(k,i)},
                timeline=profile.box,
                max=Math.max;

            if(o.left){
                t._left=o.left;
                t.from = timeline._getTime(profile,o.left);
                src.style.left=o.left+'px';
            }
            if(o.width){
                t._width=max(o.width, 0);
                t.to = timeline._getTime(profile,o.left+o.width);
                if(p.multiTasks){
                    // if too small, show min
                    if(t._width<=16){
                        t._width=o.width=16;
                        if(!t._min){
                            t._min=true;
                            f('NORMAL',t.id).css('display','none');
                            f('MIN',t.id).css('display','block');
                        }
                    // else show normal
                    }else{
                        if(t._min){
                            delete t._line;
                            t._min=false;
                            f('NORMAL',t.id).css('display','block');
                            f('MIN',t.id).css('display','none');
                        }
                        // if too long ,cut right
                        if(o.left + o.width > bandW)
                            o.width = bandW - o.left;
                    }
                }
                src.style.width=o.width+'px';
                if(linb.browser.ie && !p.multiTasks)
                    linb([src.parentNode]).ieRemedy();
            }
            // _reArrage top position
            timeline._reArrage(profile);
        },
        _ajustHeight:function(profile){
            var p=profile.properties,
                f=function(p){return profile.getSubNode(p)},
                view = f('VIEW'),
                items = f('ITEMS'),
                scroll = f('SCROLL'),
                scrolli= f('SCROLLI'),
                h,b,
                ih=p._linesHeight||0,
                vh=view.height();

            h=Math.max(ih,vh);
            items.height(h);
            scrolli.height(h);
            b=ih>vh;
            scroll.css('display',b?'block':'none');
            items.top(b?-scroll.scrollTop():0);
        },
        _showTips:function(profile, node, pos){
            if(profile.onShowTips)
                return profile.boxing().onShowTips(profile, node, pos);
             
             var t=profile.properties,
                id=node.id,
                format=t._timeFormat,
                sid=profile.getSubId(id),
                map=profile.SubSerialIdMapItem,
                item=map&&map[sid],
                date=linb.Date;

            if(t.disabled)return;
            if(item && item.disabled)return;
            if(item){
                item.tips = '<p style="font-weight:bold">'+item.caption +'</p>'+ date.getText(new Date(item.from),format)+" - "+date.getText(new Date(item.to),format);
                linb.Tips.show(pos, item);
                return true;
            }else
                return false;
        },
        _beforeSerialized:function(profile){
            var w=profile.properties.width,
                o=arguments.callee.upper.call(this, profile);
            o.properties.width=w;
            return o;
        },
        _onresize:function(profile,width,height){
            var p=profile.properties,
                f=function(k){return profile.getSubNode(k)},
                off1=2*p.$borderW,
                off2=3,
                t;
            //for border, view and items
            if(height && height!=p.height && parseInt(profile.domNode.style.height)){
                f('BORDER').height(t=height-off1);
                f('VIEW').height(t=t - (p.showTips&&p._tipsHeight) -off2 - (p.showBigLabel?p._bigLabelHeight:0) - p._smallLabelHeight - (p.showBar&&p._barHeight));
                this._ajustHeight(profile);

                if(p.height!=height)p.height=height;
            }
            if(width && width!=p.width){
                f('BORDER').width(width-off1);
                p.width=width;

                //if width changed, refresh the timeline
                if(!p.fixWidth){
                    _.resetRun(profile.$id+":refresh",function(){
                        //if multiTasks, setUIValue will be ignored
                        profile.box._refresh(profile)._focus(profile);
                    });
                }
            }
        },
        _refresh:function(profile){
            //if multiTasks, setUIValue will be ignored
            profile.boxing().clearItems().refresh().setUIValue(profile.properties.$UIvalue);
            return this;
        }
    }
});