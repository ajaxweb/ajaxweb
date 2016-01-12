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
Class("linb.UI.Input", ["linb.UI.Widget","linb.absValue"] ,{
    Instance:{
        _setTB:function(type){
            var profile=this.get(0), p=profile.properties, o, t;
            if(!profile.host|| !p.tipsBinder)return;

            t = profile.tips = profile.tips||p.tips||'';
            o = profile.host[p.tipsBinder];
            if(o && o.KEY=='linb.UI.Div'){
                //use innerHTML, not setHtml
                o.get(0).domNode.innerHTML =  t.charAt(0)=='$'?linb.wrapRes(t):t;
                o.reBoxing().css('color', type==1?'gray':type==2?'red':'#000');
            }
        },
        activate:function(){
            var profile = this.get(0);
            if(profile.domNode){
                var node=profile.getSubNode('INPUT').get(0);
                node.focus();
                if(!node.readOnly && node.select)node.select();
            }
            return this;
        },
        _setCtrlValue:function(value){
            if(_.isNull(value) || !_.exists(value))value='';
            return this.each(function(profile){
                profile.getSubNode('INPUT').attr('value',value+"");
            });
        },
        _getCtrlValue:function(){
            var profile=this.get(0);
            return profile.getSubNode('INPUT').attr('value');
        },
        _setDirtyMark:function(){
            return this.each(function(profile){
                var properties = profile.properties,
                    o=profile.getSubNode('INPUT'),
                    cls=profile.box,
                    box=profile.boxing(),
                    d=linb.UI.$css_tag_dirty,
                    v=linb.UI.$css_tag_invalid,
                    flag=properties.value !== properties.$UIvalue;
                //dirty mark
                if(profile.beforeDirtyMark && false===box.beforeDirtyMark(profile,flag)){}
                else{
                    if(flag)
                        o.addClass(d);
                    else
                        o.removeClass(d);
                }
                //format statux
                if(profile.beforeFormatMark && false===box.beforeFormatMark(profile, profile.inValid==2)){}
                else{
                    var err = profile.getSubNode('ERROR');
                    if(profile.inValid==2){
                        o.addClass(v);
                        err.css('display','block');
                    }else{
                        o.removeClass(v);
                        err.css('display','none');
                    }
                }
                if(profile.inValid==2){
                    //display tips
                    profile.tips = properties.tipsErr || properties.tips;
                    if(properties.mask)
                        _.asyRun(function(){
                            box.setUIValue(o.get(0).value=profile.$Mask)
                        });
                }else{
                    if(profile.inValid==1)
                        profile.tips = properties.tips;
                    else{
                        profile.tips = properties.tipsOK || properties.tips;
                    }
                }
                box._setTB(profile.inValid);
            });
        }
    },
    Initialize:function(){
        //modify default template fro shell
        var t = this.getTemplate();
        _.merge(t.FRAME.BORDER,{
            BOX:{
                tagName : 'div',
                INPUT:{
                    tagName : 'input',
                    type : '{type}',
                    tabindex:'{tabindex}',
                    cursor:'{cursor}',
                    style:'{_css}'
                }
            }
        },'all');
        t.FRAME.ERROR = {};
        this.setTemplate(t)
    },
    Static:{
        _maskMap:{
            '~':'[+-]',
    		'1':'[0-9]',
    		'a':'[A-Za-z]',
    		'*':'[A-Za-z0-9]'
        },
        _maskSpace:'_',
        Appearances:{
            KEY:{
                'font-family': '"Verdana", "Helvetica", "sans-serif"',
                position:'relative'
            },
            BORDER:{
                'line-height':'0px',
                'font-size':'0px',
                'background-color':'#fff',
                border: '1px solid #7F9DB9'
            },
            'BORDER-focus, BORDER-mouseover':{
                $order:1,
                border: '1px solid #FFD700'
            },
            BOX:{
                left:0,
                top:0,

                //for firefox bug: cursor not show
                position:'absolute',
                overflow:linb.browser.gek?'auto':'',
                'z-index':'10'
            },
            INPUT:{
               border:0,
               padding:0,
               margin:0,
               'font-size':'12px',
               position:'relative',
               overflow:'auto',
               'background-color':'transparent',
               'overflow-y':(linb.browser.gek||linb.browser.ie)?'auto':'',
               'overflow-x':(linb.browser.gek||linb.browser.ie)?'hidden':''
            },
            ERROR:{
                width:'16px',
                height:'16px',
                position:'absolute',
                right:0,
                top:0,
                display:'none',
                'font-size':0,
                background: linb.UI.$bg('icon.gif', ' no-repeat left top', true),
                'z-index':'50'
            }
        },
        Behaviors:{
            HoverEffected:{KEY:['BORDER']},
            NavKeys:{INPUT:1},
            INPUT:{
                onChange:function(profile, e, src){
                    var o=profile.inValid;
                    profile.boxing().setUIValue(src.value);
                    //input/textarea is special, ctrl value will be set before the $UIvalue
                    profile.properties.$UIvalue=src.value;
                    if(o!==profile.inValid) if(profile.domNode)profile.boxing()._setDirtyMark();
                },
                //if properties.mask exists, onHotKeyxxx wont be tigger any more
                onKeydown:function(profile, e, src){
                    var p=profile.properties,
                        m=p.multiLines,
                        b=profile.box,
                        evt=linb.Event,
                        k=evt.getKey(e);
                    //fire onchange first
                    if(k[0]=='enter'&& (!m||k[3]))
                        linb([src]).onChange();
                    if(p.mask){
                        if(k[0].length>1)profile.$ignore=true;
                        else delete profile.$ignore;
                        switch(k[0]){
                            case 'backspace':
                                b._changeMask(profile,src,'',false);
                                return false;
                            case 'delete':
                                b._changeMask(profile,src,'');
                                return false;
                        }
                    }
                },
                onKeypress:function(profile, e, src){
                    var p=profile.properties,cls=profile.box,map=cls._maskMap;
                    if(p.mask){
                        if(profile.$ignore){
                            delete profile.$ignore;
                            return true;
                        }
                        var evt=linb.Event,
                            k=evt.getKey(e);
                        if(k[1]||k[3])return true;

                        cls._changeMask(profile,src,k[0],true);
                        return false;
                    }
                },
                onKeyup:function(profile, e, src){
                    var p=profile.properties;
                    if(p.dynCheck){
                        profile.box._checkValid(profile, src.value);
                        profile.boxing()._setDirtyMark();
                    }
                },
                onFocus:function(profile, e, src){
                    var p=profile.properties,b=profile.box;
                    if(p.disabled)return false;
                    if(profile.onFocus)profile.boxing().onFocus(profile);
                    profile.getSubNode('BORDER').tagClass('-focus');
                    //if no value, add mask
                    if(p.mask){
                        //ondrop in opera or safari will trigger onfocus event.
                        if(linb.browser.opr ||linb.browser.kde)
                             b._maskF(profile,src);
                        if(!src.value)
                            _.asyRun(function(){
                                profile.boxing().setUIValue(src.value=profile.$Mask);
                                b._setCaret(profile,src)
                            });
                    }
                    //show tips color
                    profile.boxing()._setTB(3);
                },
                onBlur:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled)return false;
                    if(profile.onBlur)profile.boxing().onBlur(profile);

                    profile.getSubNode('BORDER').tagClass('-focus',false);
                    //onblur check it
                    if(p.$UIvalue==src.value)
                        profile.box._checkValid(profile, src.value);
                    profile.boxing()._setDirtyMark();
                }
            }
        },
        DataModel:{

            tipsErr:'',
            tipsOK:'',

            dynCheck:false,
            valueFormat:{
                helpinput:[
                    {caption : 'required', id: "[^.*]"},
                    {caption : 'email',id:"^[\\w\\.=-]+@[\\w\\.-]+\\.[\\w\\.-]{2,4}$"},
                    {caption : 'charOnly',id:"^[a-zA-Z]*$"},
                    {caption : 'words',id:"^[\\w ]*$"},
                    {caption : 'integer',id:"^-?\\d\\d*$"},
                    {caption : 'positiveInteger',id:"^\\d\\d*$"},
                    {caption : 'number',id:"^-?(\\d\\d*\\.\\d*$)|(^-?\\d\\d*$)|(^-?\\.\\d\\d*$)"},
                    {caption : 'filepath',id:"([\\/]?[\\w_]+)+\\.\\w{1,9}$"},
                    {caption : 'URL', id:"^(http|https|ftp)\\:\\/\\/[\\w\\-\\_\\.]+[\\w\\-\\_](:[\\w]*)?\\/?([\\w\\-\\._\\?\\,\\'\\/\\\\\\+&amp;%\\$#\\=~])*$"},
                    {caption : 'color',id:"^\\#[0-9A-Fa-f]{6}$"},
                    {caption : "HH:MM", id:"^\(\([0-1][0-9]\)|\([2][0-3])\)\:\([0-5][0-9]\)$"},
                    {caption : "HH:MM:SS", id:"^\(\([0-1][0-9]\)|\([2][0-3])\)\:\([0-5][0-9]\)\\:\([0-5][0-9]\)$"},
                    {caption : "YYYY-MM-DD",id:"^\([0-9]{4}\)\\-\(\([0][0-9]\)|\([1][0-2]\)\)\\-\([0-3][0-9]\)$"},
                    {caption : "DD/MM/YYYY",id:"^\(\([0-2][0-9]\)|\([3][0-1]\)\)\/\(\([0][0-9]\)|\([1][0-2]\)\)\/\([0-9]{4}\)$"}
                ]
            },
            mask:{
                action:function(value){
                    var ns=this,
                        b=ns.box;
                    if(value){
                        ns.$MaskFormat=function(ns, v){
                            var m=ns._maskMap,a=[],r=/[A-Za-z0-9]/;
                            _.arr.each(v.split(''),function(o,i){
                                a.push(m[o]||(r.test(o)?"":"\\")+o)
                            });
                            return '^'+a.join('')+'$';
                        }(b, value);
                        ns.$Mask = function(ns, v){
                            var m=ns._maskMap,a=[],s=ns._maskSpace;
                            _.arr.each(v.split(''),function(o,i){
                                a.push(m[o]?s:o);
                            });
                            return  a.join('');
                        }(b,value);

                        //add event for cut/paste text
                        if(ns.domNode){
                            var ie=linb.browser.ie,
                                src=ns.getSubNode('INPUT').get(0),
                                f=function(o){
                                    b._maskF(ns, src, ie&&o.propertyName);
                                };
                            if(ie){
                                src.attachEvent("onpropertychange",f);
                                src.attachEvent("ondrop",f);
                                ns.$ondestory=function(){
                                    src.detachEvent("onpropertychange",f);
                                    src.detachEvent("ondrop",f);
                                }
                            }else{
                                src.addEventListener("input",f,false);
                                //firefox drop
                                if(linb.browser.gek)
                                    src.addEventListener("dragdrop",f,false);

                                ns.$ondestory=function(){
                                    src.removeEventListener("input",f,false);
                                    src.addEventListener("dragdrop",f,false);
                                }
                            }
                        }
                   }else{
                        delete ns.$MaskFormat;
                        delete ns.$Mask;
                        if(ns.domNode)
                            _.tryF(ns.$ondestory);
                   }
                }
            },
            value:'',
            width:120,
            height:20,
            tabindex:{
                action:function(value){
                    if(this.domNode)
                        this.getSubNode('INPUT').attr('tabIndex',value);
                }
            },
            disabled:{
                ini:false,
                action: function(v){
                    this.root.css('opacity',v?0.5:1);
                    this.getSubNode('INPUT').attr('disabled',v);
                }
            },
            readonly:{
                ini:false,
                action: function(v){
                    this.getSubNode('INPUT').attr('readonly',v).css('cursor',v?'default':'');
                }
            },
            type:{
                ini:'text',
                listbox:['text','password'],
                action: function(value){
                    this.getSubNode('INPUT').attr('type',value);
                }
            },
            multiLines:{
                ini:false,
                action: function(value){
                    var str = this.getSubNode('INPUT').outerHTML();
                    str = str.replace(/^(<)[a-zA-Z]+(\s)/i, '$1'+(value?'textarea':'input')+'$2');

                    var v = this.boxing().getValue();
                    this.getSubNode('INPUT').outerHTML(str);
                    this.boxing().setUIValue(v);
                }
            },
            tipsBinder:'',

            $border:1
        },
        EventHandlers:{
            onFocus:function(profile){},
            onBlur:function(profile){},
            beforeFormatCheck:function(profile, value){},
            beforeFormatMark:function(profile, formatErr){}
        },
        _prepareData:function(profile){
            var d=arguments.callee.upper.call(this, profile);
            d.cursor = d.readonly?'default':'';
            d.type = d.type || '';
            if(linb.browser.kde)
                d._css='resize:none;';
            return d;
        },
        _dynamicTemplate:function(profile){
            var properties = profile.properties,
                hash = profile._exhash = "$" +'multiLines:'+properties.multiLines,
                template = profile.box.getTemplate(hash);

            properties.$UIvalue = properties.value;

            // set template dynamic
            if(!template){
                template = _.clone(profile.box.getTemplate());
                if(properties.multiLines){
                    template.FRAME.BORDER.BOX.INPUT.tagName='textarea';
                    delete template.FRAME.BORDER.BOX.INPUT.type;
                }

                // set template
                profile.box.setTemplate(template, hash);
            }
            profile.template = template;
        },
        RenderTrigger:function(){
            var ns=this,p=ns.properties;
            _.asyRun(function(){
                ns.boxing()._setTB(1);
            });
            ns.getSubNode('BOX').$firfox2();
        },
        LayoutTrigger:function(){
            var p = this.properties;
            if(p.mask)this.boxing().setMask(p.mask,true);
        },
    //v=value.substr(0,caret);
    //i=v.lastIndexOf(ms);

        _changeMask:function(profile,src,v,dir){
            var ns=this,
                p=profile.properties,
                map=ns._maskMap,
                ms=ns._maskSpace,
                maskTxt=p.mask,
                maskStr = profile.$Mask,
                input = linb([src]),
                caret = input.caret();
            //for backspace
            if(dir===false && caret[0]==caret[1] && caret[0]>0)
                input.caret(caret[0]-1,caret[0]);

            //for delete
            if(dir===undefined && caret[0]==caret[1])
                input.caret(caret[0],caret[0]+1);

            //for caret is from a fix char, nav to the next 'input allow' char
            if(dir===true){
                if(maskStr.charAt(caret[0])!=ms){
                    var from = caret[0] + maskStr.substr(caret[0],maskStr.length).indexOf(ms);
                    input.caret(from,Math.max(caret[1],from))
                }
            }

            var caret = input.caret(),
                value=src.value,
                reg = ns._maskMap[p.mask.charAt(caret[0])],
                i,t;
            if(reg && new RegExp('^'+reg+'$').test(v) || v==''){
                t=value;
                //if select some text
                if(caret[0]!=caret[1])
                    t=t.substr(0,caret[0]) + maskStr.substr(caret[0],caret[1]-caret[0]) + t.substr(caret[1],t.length-caret[1]);
                //if any char input
                if(v)
                    t=t.substr(0,caret[0])+v+t.substr(caret[0]+1,t.length-caret[0]-1);

                //get corret string according to maskTxt
                var a=[];
                _.arr.each(maskTxt.split(''),function(o,i){
                    a.push( (new RegExp('^'+(map[o]?map[o]:'\\'+o)+'$').test(t.charAt(i))) ? t.charAt(i) : maskStr.charAt(i))
                });

                //if input visible char
                if(dir===true){
                    v=maskStr.substr(caret[0]+1,value.length-caret[0]-1);
                    i=v.indexOf(ms);
                    i=caret[0] + (i==-1?0:i) + 1;
                }else
                    i=caret[0];
                //in opera, delete/backspace cant be stopbubbled
                //add a dummy maskSpace
                if(linb.browser.opr){
                    //delete
                    if(dir===undefined)
                        _.arr.insertAny(a,ms,i);
                    //backspace
                    if(dir===false)
                        _.arr.insertAny(a,ms,i++);
                }
                profile.boxing().setUIValue(src.value=a.join(''));
                ns._setCaret(profile,src,i);
            }

        },
        _setCaret:function(profile, src, pos){
            if(profile.properties.mask){
                if(typeof pos !='number')
                    pos=src.value.indexOf(this._maskSpace);
                linb([src]).caret(pos,pos);
            }
        },
        //check valid manually
        _checkValid:function(profile, value){
            var p=profile.properties,
                vf1 = (p.mask&&profile.$MaskFormat) ,
                vf2 = p.valueFormat || profile.$valueFormat;
            if( (profile.beforeFormatCheck && (profile.boxing().beforeFormatCheck(profile, value)===false)) ||
                (vf1 && typeof vf1=='string' && !(new RegExp(vf1)).test(value||'')) ||
                (vf2 && typeof vf2=='string' && !(new RegExp(vf2)).test(value||''))
            ){
                profile.inValid=2;
                return false;
            }{
                profile.inValid=3;
                return true;
            }
        },
        _maskF:function(profile,src, pro){
            var id=src.id;
            _.resetRun(profile.$id+"_mask",function(){
                if(linb.browser.ie && pro!='value')return;
                var src=linb.Dom.byId(id);
                if(src.value.length != profile.$Mask.length)
                    profile.box._changeMask(profile,src,'',true);
            });
        },
        _onresize:function(profile,width,height){
            var size = arguments.callee.upper.apply(this,arguments),
                v=profile.getSubNodes(['INPUT','BOX']),
                b=linb.browser;

            if(null!==width)
                v.width(size.width);
            if(null!==height)
                v.height(size.height/* -(b.ie6?2:b.ie?1:b.kde?1:0)*/);

            return size;
        }
    }
});
