Class("linb.UI.ComboInput", "linb.UI.Input",{
    /*Instance*/
    Instance:{
        _setCtrlValue:function(value, flag){
            var me=arguments.callee, r1=me._r1||(me._r1=/\</),r2=me._r2||(me._r2=/\<\/?[^>]+\>/g);
            return this.each(function(profile){
                var o=profile.getSubNode('INPUT'), type=profile.properties.type;
                value=flag?value:profile.boxing()._getShowValue(value);
                if(type!=='none'&& !profile.properties.multiLines && typeof value=='string' && r1.test(value))value=value.replace(r2,'');
                o.attr('value',value);
                if(type=='colorpicker'){
                    profile.getSubNode('BORDER').css('backgroundColor',value);
                    o.css('color',linb.UI.ColorPicker.getTextColor(value));
                }
            })
        },
        _compareValue:function(v1,v2){
            var profile=this.get(0),t;
            if(t= profile.$compareValue|| profile.CF.compareValue)
                return t(profile, v1, v2);

            return v1===v2;
        },
        _getShowValue:function(value){
            var profile=this.get(0),
                pro=profile.properties,v,t;

            if(t= profile.$getShowValue|| profile.CF.getShowValue)
                v = t(profile, value);
            else{
                //get from items
                if('listbox'==pro.type || 'combobox' == pro.type){
                    if( (v=_.arr.subIndexOf(pro.items,'id',value))!=-1){
                        v=pro.items[v].caption;
                        v=v.charAt(0)=='$'?linb.getRes(v.slice(1)):v;
                    }else
                        v='';
                }else
                    v = profile.$showValue;
            }
            v=v||value||'';

            if(v!==value)profile.$caption=v;
            else delete profile.$caption;
            return v;
        },
        _getEditValue:function(value){
            var profile=this.get(0),
                pro=profile.properties,t;

                if(t= profile.$getEditValue|| profile.CF.getEditValue)
                    return t(profile, value);
            return value;
        },
        _fromEditValue:function(value){
            var profile=this.get(0),
                pro=profile.properties,t;

                if(t= profile.$fromEditValue|| profile.CF.fromEditValue)
                    return t(profile, value);
            return value;
        },
        _cache:function(){
            var profile=this.get(0),drop=profile.$drop;
            if(drop){
                if(linb.browser.opr)
                    drop.root.css('display','none');
                _.asyRun(function(){
                    profile.getSubNode('POOL').append(drop.root)
                });
            }
            delete profile.$poplink;
        },
        clearPopCache:function(){
            var profile=this.get(0);
            if(profile.domNode)
                profile.getSubNode('POOL').empty();
            delete profile.$drop;
            return this;
        },
        //for upload ,special must get the original node
        getUploadObj:function(){
            var profile=this.get(0);
            if(profile.domNode && profile.properties.type=='upload'){
                var o = profile.getSubNode('UPLOAD'),c=o.clone();

                //a special node, must delete if from cache here:
                delete profile.$_domid[profile.keys['UPLOAD']];
                o.addPrev(c).remove(false);
                this.setValue('',true);

                return o.get(0);
            }
        },
        resetValue:function(value){
            this.each(function(p){
                if(p.properties.type=='upload')
                    p.getSubNode('UPLOAD').attr('value','');
            });
            return arguments.callee.upper.apply(this,arguments);
        },
        _drop:function(e,src){
            return this.each(function(profile){
                var pro = profile.properties;
                if(pro.disabled)return;
                if(pro.type=='upload'||pro.type=='none'||pro.type=='spin')return;
                //open already
                if(profile.$poplink)return;

                var o,v,
                box = profile.boxing(),
                main = profile.root,
                pos = main.offset(),
                size = main.cssSize()
                ;
                size.width += 2;
                pos.top += main.offsetHeight();

                //get list
                //not normal pop
                switch(pro.type){
                    case 'getter':
                    case 'cmdbox':
                    case 'popbox':
                        box.onClickButton(profile, pos, e, src);
                        return;
                }

                //get cache key
                var cachekey;
                switch(pro.type){
                    case 'timepicker':
                    case 'datepicker':
                    case 'colorpicker':
                        cachekey=pro.type;
                        break;
                    default:
                        if(pro.listKey)
                            //function no cache
                            if(typeof _.get(linb.cache,['UIDATA', pro.listKey])=='function')
                                profile.$drop = cachekey = null;
                            else
                                cachekey = pro.listKey;
                        else
                            cachekey = profile.$id;
                }
                //get from global cache
                if(cachekey){
                    //filter first
                    _.filter(profile.box.$drop,function(o){
                        return !!o.domNode;
                    });
                    profile.$drop = profile.box.$drop[cachekey];
                }

                //cache pop
                if(!profile.$drop){
                    switch(pro.type){
                        case 'combobox':
                        case 'listbox':
                        case 'helpinput':
                            linb.SC('linb.UI.List');
                            o = linb.create('List');
                            o.host(profile).setItems(_.copy(pro.items)).setListKey(pro.listKey||'').adjustSize();
                            o.beforeUIValueSet(function(pro, ovalue, value){
                                var b2=this.boxing();
                                //update value
                                b2.setUIValue(value);
                                //cache pop
                                b2._cache();
                                //set activate
                                b2.activate();
                                return false;
                            });
                            break;
                        case 'timepicker':
                            linb.SC('linb.UI.TimePicker');
                            o = linb.create('TimePicker');
                            o.host(profile);
                            o.beforeClose(function(){this.boxing()._cache();return false});
                            o.beforeUIValueSet(function(p, o, v){
                                //update value
                                this.boxing().setUIValue(v)._cache();
                            });
                            break;
                        case 'datepicker':
                            linb.SC('linb.UI.DatePicker');
                            o = linb.create('DatePicker');
                            o.host(profile);
                            o.beforeClose(function(){this.boxing()._cache();return false});
                            o.beforeUIValueSet(function(p, o, v){
                                //update value
                                this.boxing().setUIValue(String(v.getTime()))._cache();
                            });

                            break;

                        case 'colorpicker':
                            linb.SC('linb.UI.ColorPicker');
                            o = linb.create('ColorPicker');
                            o.host(profile);
                            o.beforeClose(function(){this.boxing()._cache();return false});
                            o.beforeUIValueSet(function(p, o, v){
                                //update value
                                this.boxing().setUIValue('#'+v)._cache();
                            });
                            break;
                    }

                    profile.$drop = o.get(0);

                    //set to global cache
                    if(cachekey)
                        profile.box.$drop[cachekey]=profile.$drop;
                }

                o=profile.$drop.boxing();
                o.host(profile);

                //set pop
                switch(pro.type){
                    case 'combobox':
                    case 'listbox':
                    case 'helpinput':
                        o.setWidth(profile.root.width());
                    case 'timepicker':
                        o.setValue(box.getUIValue(), true);
                        break;
                    case 'datepicker':
                        var t = profile.$drop.properties;
                        t.WEEK_FIRST=pro.WEEK_FIRST;
                        if(t=box.getUIValue())
                            o.setValue(new Date( parseInt(t) ), true);
                        break;
                    case 'colorpicker':
                        o.setValue(box.getUIValue().replace('#',''), true);
                        break;
                }

                profile.$poplink = o.get(0);

                //pop
                var node=o.reBoxing();
                node.popToTop(profile.root);

                _.tryF(o.activate,[],o);

                //for on blur disappear
                node.setBlurTrigger(profile.key+":"+profile.$id, function(){
                    box._cache();
                }, null, profile.$id);

                //for esc
                linb.Event.keyboardHook('esc',0,0,0,function(){
                    box._cache();
                    box.activate();
                    //unhook
                    linb.Event.keyboardHook('esc');
                });
            });
        }
    },
    /*Initialize*/
    Initialize:function(){
        this.addTemplateKeys(['UPLOAD','BTN','TOP','MID','RBTN','R1','R1T','R1B','R2','R2T','R2B']);
        //modify default template for shell
        var t = this.getTemplate();
        _.merge(t.FRAME.BORDER,{
            SBTN:{
                $order:5,
                style:"{saveDisplay}",
                STOP:{},
                SMID:{}
            }
        },'all');
        t.FRAME.POOL={};
        this.setTemplate(t);
    },
    Static:{
        _iniType:function(profile){
            var pro=profile.properties, value=pro.type;
            if(value=='listbox'||value=='upload')
                profile.boxing().setReadonly(true);

            if(value!='listbox' && value!='combobox')
                if(!pro.items)
                    pro.items=[];

            if(value=='timepicker'){
                var  o=linb.SC('linb.UI.TimePicker');
                _.merge(profile,{
                    $compareValue : null,
                    $getShowValue : function(profile,value){
                        return value?o._ensureValue(profile,value):'';
                    },
                    $getEditValue : null,
                    $fromEditValue : function(profile,value){
                        return o._ensureValue(profile,value);
                    }
                },'all');
                if(pro.value)
                    pro.$UIvalue=pro.value=o._ensureValue(profile,pro.value);
            }else if(value=='datepicker'){
                var date=linb.Date;
                _.merge(profile,{
                    $compareValue : function(p,a,b){
                        return String(a)==String(b)
                    },
                    $getShowValue : function(profile,value){
                        return value?date.getText(new Date(parseInt(value)), 'ymd'):'';
                    },
                    $getEditValue : function(profile,value){
                        var v=new Date(parseInt(value));
                        return value?(date.get(v,'m')+1)+'/'+date.get(v,'d')+'/'+date.get(v,'y'):'';
                    },
                    $fromEditValue : function(profile,value){
                        //parse from local text mm/dd/yyyy
                        var v=linb.Date.parse(value);
                        if(v)v=linb.Date.getTimSpanStart(v,'d',1);
                        return v?String(v.getTime()):'0';
                    }
                },'all');
                if(pro.value){
                    var d=new Date(parseInt(pro.value)||0);
                    pro.$UIvalue=pro.value=String(date.getTimSpanStart(d,'d',1).getTime());
                }
            }else{
                delete profile.$compareValue;
                delete profile.$getShowValue;
                delete profile.$getEditValue;
                delete profile.$fromEditValue;
                if(_.isDate(pro.value))
                    pro.$UIvalue=pro.value=String(pro.value);
            }
        },
        $drop:{},
        Appearances:{
            POOL:{
                position:'absolute',
                left:0,
                top:0,
                width:0,
                height:0,
                display:'none',
                visibility:'hidden'
            },
            UPLOAD:{
                opacity:0,
                '*filter':'alpha(opacity=0)',

                'z-index':'3',
                border:0,
                height:'100%',
                position:'absolute',
                top:0,
                right:0,
                cursor:'pointer',
                'font-size':'12px',
                overflow:'hidden'
            },
            'RBTN,SBTN,BTN':{
                display:'block',
                'z-index':'1',
                cursor:'pointer',
                width:'13px',
                'font-size':0,
                'line-height':0,
                position:'relative',
                'float':'right'
            },
            'SBTN,BTN':{
                background: linb.UI.$bg('combo.gif', ' left bottom no-repeat',true)
            },
            'R1,R2':{
                display:'block',
                'font-size':0,
                'line-height':0,
                cursor:'pointer',
                width:'13px',
                position:'absolute',
                height:'50%',
                background: linb.UI.$bg('combo.gif', ' left bottom no-repeat',true)
            },
            R1:{
                top:0
            },
            R2:{
                bottom:0
            },

            'BTN-mouseover, SBTN-mouseover, R1-mouseover, R2-mouseover':{
                $order:1,
                'background-position': '-14px bottom'
            },
            'BTN-mousedown, SBTN-mousedown, R1-mousedown, R2-mousedown':{
                $order:2,
                'background-position': '-27px bottom'
            },
            'STOP, TOP, R1T, R2T':{
                cursor:'pointer',
                width:'13px',
                'font-size':0,
                'line-height':0,
                position:'absolute',
                top:0,
                left:0,
                height:'4px',
                background: linb.UI.$bg('combo.gif', ' left -104px no-repeat',true)
            },
            'BTN-mouseover TOP,SBTN-mouseover STOP, R1-mouseover R1T, R2-mouseover R2T':{
                $order:1,
                'background-position': '-14px -104px'
            },
            'BTN-mousedown TOP,SBTN-mousedown STOP, R1-mousedown R1T, R2-mousedown R2T':{
                $order:2,
                'background-position': '-27px -104px'
            },
            'R1B,R2B':{
                cursor:'pointer',
                width:'13px',
                'font-size':0,
                'line-height':0,
                position:'absolute',
                left:0,
                top:'50%',
                'margin-top':'-3px',
                height:'6px'
            },
            R1B:{
                background: linb.UI.$bg('combo.gif', ' -14px -31px no-repeat',true)
            },
            R2B:{
                background: linb.UI.$bg('combo.gif', ' left -5px no-repeat',true)
            },
            'SMID,MID':{
                cursor:'pointer',
                width:'13px',
                'font-size':0,
                'line-height':0,
                position:'absolute',
                bottom:'3px',
                left:0,
                height:'13px',
                background: linb.UI.$bg('combo.gif', ' left top no-repeat',true)
            },
            SMID:{
                $order:3,
                'background-position': '-14px -14px'
            }
        },
        Behaviors:{
            HoverEffected:{KEY:'BORDER',BTN:'BTN',SBTN:'SBTN',R1:'R1',R2:'R2'},
            ClickEffected:{BTN:'BTN',SBTN:'SBTN',R1:'R1',R2:'R2'},
            UPLOAD:{
                onClick : function(profile, e, src){
                    if(profile.onFileDlgOpen)profile.boxing().onFileDlgOpen(profile,src);
                },
                onChange:function(profile, e, src){
                    profile.getSubNode('INPUT').attr('value',src.value).onChange();
                }
            },
            BTN:{
                onClick : function(profile, e, src){
                    profile.boxing()._drop(e,src);
                }
            },
            SBTN:{
                onClick : function(profile, e, src){
                    if(profile.onSave)profile.boxing().onSave(profile,src);
                }
            },
            INPUT:{
                onChange:function(profile, e, src){
                    if(profile.$_onedit||profile.$_inner)return;

                    var o=profile.inValid,
                        instance=profile.boxing(),
                        v = instance._fromEditValue(src.value),
                        uiv=profile.properties.$UIvalue;
                    if(!instance._compareValue(uiv,v)){
                        profile.$_inner=1;
                        delete profile.$_inner;

                        //give a invalid value in edit mode
                        if(v===null)
                            instance._setCtrlValue(uiv);
                        else{
                            instance.setUIValue(v);
                            //input/textarea is special, ctrl value will be set before the $UIvalue
                            profile.properties.$UIvalue=v;
                            if(o!==profile.inValid) if(profile.domNode)instance._setDirtyMark();
                        }
                    }
                },
                onKeyup:function(profile, e, src){
                    var p=profile.properties;
                    if(p.dynCheck){
                        if(p.$UIvalue!=src.value)
                            profile.box._checkValid(profile, src.value);
                        profile.boxing()._setDirtyMark();
                    }
                },
                onFocus:function(profile, e, src){
                    var p=profile.properties, uiv=p.$UIvalue;
                    if(p.disabled)return false;

                    var instance=profile.boxing(),
                        v = instance._getEditValue(uiv);
                    //string compare
                    if(v!==uiv){
                        //here, dont use $valueFormat, valueFormat or onValueFormat
                        //use $getShowValue, $getEditValue, $fromEditValue related functions
                        profile.$_onedit=true;
                        src.value=v;
                        delete profile.$_onedit;
                    }

                    //set css class
                    if(profile.onFocus)profile.boxing().onFocus(profile);
                    profile.getSubNode('BORDER').tagClass('-focus');
                    //show tips color
                    profile.boxing()._setTB(3);
                },
                onBlur:function(profile, e, src){
                    var p=profile.properties,
                        instance=profile.boxing(),
                        uiv=p.$UIvalue,
                        v = instance._fromEditValue(src.value)
                        ;
                    if(p.disabled)return false;
                    if(profile.onFocus)instance.onFocus(profile);
                    profile.getSubNode('BORDER').tagClass('-focus',false);

                    //onblur check it
                    if(instance._compareValue(p.$UIvalue,v)){
                        profile.box._checkValid(profile, v);
                        instance._setCtrlValue(uiv);
                    }
                    instance._setDirtyMark();
                },
                onKeydown : function(profile, e, src){
                    var prop=profile.properties,
                        m=prop.multiLines,
                        key=linb.Event.getKey(e);
                    //fire onchange first
                    if(key[0]=='enter'&& (!m||key[3]))
                        linb([src]).onChange();
                    if(key[0]=='down'|| key[0]=='up'){
                        if(prop.type=='spin'){
                            profile.box._spin(profile, key[0]=='up');
                            return false;
                        }if(key[1] && prop.type){
                            profile.boxing()._drop(e,src);
                            return false;
                        }
                    }
                },
                onKeyup : function(profile, e, src){
                    var prop=profile.properties,
                        key=linb.Event.getKey(e);
                    if(key[0]=='down'|| key[0]=='up'){
                        if(prop.type=='spin'){
                            linb.Thread.abort(profile.$id+':spin');
                            return false;
                        }
                    }                    
                },
                onClick : function(profile, e, src){
                    if(src.readOnly)
                        profile.boxing()._drop(e, src);
                }
            },
            R1:{
                onMousedown:function(profile){
                    profile.box._spin(profile, true);
                },
                onMouseout:function(profile){
                    linb.Thread.abort(profile.$id+':spin');
                },
                onMouseup:function(profile){
                    linb.Thread.abort(profile.$id+':spin');
                }
            },
            R2:{
                onMousedown:function(profile){
                    profile.box._spin(profile, false);
                },
                onMouseout:function(profile){
                    linb.Thread.abort(profile.$id+':spin');
                },
                onMouseup:function(profile){
                    linb.Thread.abort(profile.$id+':spin');
                }
            }
        },
        EventHandlers:{
            onFileDlgOpen:function(profile, node){},
            onSave:function(profile, node){},
            onClickButton:function(profile, pos, e, src){}
        },
        _posMap:{
            none:'',
            combobox:'left top',
            listbox:'left top',
            upload:'-16px top',
            getter:'left -27px',
            helpinput:'left -91px',
            cmdbox:'left -14px',
            popbox:'left -40px',
            timepicker:'left -53px',
            datepicker:'left -66px',
            colorpicker:'left -79px'
        },
        DataModel:{
            listKey:{
                set:function(v){
                    var t = this.constructor.getCachedData(v);
                    return this.each(function(o){
                        o.boxing().setItems(t?t:o.properties.items);
                        o.properties.listKey = v;
                    });
                }
            },
            items:{
                ini:[],
                action:function(v){
                    var self=this;
                    self.boxing().setValue(null,true);
                    self.SubSerialIdMapItem={};
                    self.ItemIdMapSubSerialId={};
                    //for memory map
                    self.box._prepareItems(self, v);

                    if(v.domNode)
                        self.boxing().clearPopCache();
                }
            },
            readonly:{
                ini:false,
                action:function(v){
                    if(!v && this.properties.type=='listbox')return;
                    this.getSubNode('INPUT').css('cursor',v?'pointer':'default').attr('readonly',v);
                }
            },
            type:{
                ini:'combobox',
                listbox:_.toArr('none,combobox,listbox,upload,getter,helpinput,cmdbox,popbox,timepicker,datepicker,colorpicker,spin'),
                set:function(value, flag){
                    return this.each(function(pro){
                        if(pro.properties.type!=value||flag){
                            pro.properties.type=value;
                            pro.box._iniType(pro);
                            if(pro.domNode)
                                pro.boxing().refresh();
                        }
                    });
                }
            },
            scale:2,
            increment:0.01,
            min:0,
            max:1,
            saveBtn:{
                ini:false,
                action:function(v){
                    this.boxing().refresh();
                }
            },
            $border:1
        },
        RenderTrigger:function(){
            var self=this,
                instance=self.boxing(),
                p=self.properties;
            self.box._iniType(self);
            if(p.readonly)
                instance.setReadonly(true,true);
        },
        _spin:function(profile, flag){
            var id=profile.$id+':spin';
            if(linb.Thread.isAlive(id))return;
            var prop=profile.properties,
                off=prop.increment*(flag?1:-1),
                task={delay:300},
                fun=function(){
                    profile.boxing().setUIValue(String((+prop.$UIvalue||0)+off));
                    task.delay *=0.9;
                };
            task.task=fun;
            linb.Thread(id,[task],500,null,fun,null,true).start();
        },
        _dynamicTemplate:function(profile){
            var properties = profile.properties,
                hash = profile._exhash = "$" +
                    'multiLines:'+properties.multiLines+';'+
                    'type:'+properties.type+';',
                template = profile.box.getTemplate(hash);

            properties.$UIvalue = properties.value;

            // set template dynamic
            if(!template){
                template = _.clone(profile.box.getTemplate());
                var t=template.FRAME.BORDER;

                if(properties.multiLines){
                    t.BOX.INPUT.tagName='textarea';
                    delete t.BOX.INPUT.type;
                }

                switch(properties.type){
                case 'spin':
                    t.RBTN={
                        $order:5,
                        style:"{rDisplay}",
                        R1:{
                            R1T:{},
                            R1B:{}
                        },
                        R2:{
                            R2T:{},
                            R2B:{}
                        }
                    };
                break;
                case 'none':
                break;
                case 'upload':
                    t.UPLOAD={
                        $order:2,
                        tagName:'input',
                        type:'file',
                        size:'1'
                    };
                default:
                    t.BTN={
                        $order:4,
                        style:"{popbtnDisplay}",
                        TOP:{},
                        MID:{
                            style:'{typePos}'
                        }
                    };
                }

                // set template
                profile.box.setTemplate(template, hash);
            }
            profile.template = template;
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile),
                map=profile.box._posMap;
            if(map[data.type])
                data.typePos = 'background-position:'+map[data.type];

            data.saveDisplay = data.saveBtn?'':'display:none';
            data.popbtnDisplay = data.type!='none'?'':'display:none';
            return data;
        },
        _ensureValue:function(profile, value){
            var me=arguments.callee, reg=me._reg||(me._reg=/^#[\w]{6}$/),prop=profile.properties;
            switch(profile.properties.type){
                case 'datepicker':
                    return (value.constructor==Date?value.getTime():value) + "";
                case 'colorpicker':
                    return '#'+linb.UI.ColorPicker._ensureValue(null,value);
                case 'timepicker':
                    return linb.UI.TimePicker._ensureValue(null,value);
                case 'spin':
                    var n=Math.pow(10,prop.scale);
                    value=+value||0;
                    value=Math.ceil((value-0.0000000000003)*n)/n;
                    return String(value>prop.max?prop.max:value<prop.min?prop.min:value);
                default:
                    return String(value);
            }
        },
        _onresize:function(profile,width,height){
            var size=linb.UI.Widget._onresize.apply(this,arguments),
                prop=profile.properties,
                px='px',
                f=function(k){return k?profile.getSubNode(k)._nodes[0]:null},
                type=prop.type,
                input=f('INPUT'),
                save=f(prop.saveBtn?'SBTN':null),
                btn=f(type=='spin'?'RBTN':type=='none'?null:'BTN')
                ;

            if(!_.isNull(width))
                input.style.width = (size.width-(save?save.offsetWidth:0)-(btn?btn.offsetWidth:0))+px;

            if(!_.isNull(height)){
                height=size.height+px;
                /*-(linb.browser.ie6?2:linb.browser.ie?1:linb.browser.kde?1:0)*/
                input.style.height=height;
                if(save)save.style.height=height;
                if(btn)
                    btn.style.height=height;

                if(prop.type=='spin'){
                    height=size.height/2+px;
                    f('R1').style.height=height;
                    f('R2').style.height=height;
                }
            }
        }
    }
});
