/* event
*  dependency: base _ ; Class ; linb ;
*
*
*/
Class('linb.Event',null,{
    Constructor:function(event,node,fordrag,tid){
        var self = linb.Event,
            dd=0,id,
            dragdrop=linb.DragDrop,
            src, type,  pre, obj;

        //get event object , and src of event
        if(!(event=event||window.event) || !(src=node))return false;
        //type
        type = event.type;
        //template id
        if(tid)src._tid=tid;

        //for correct mouse hover problems;
        if('mouseover'==type || 'mouseout'==type){
            dd=(dragdrop&&dragdrop._profile.isWorking)?1:2;
            //for dropable
            if(dd!=1 && fordrag)return self.$FALSE;
            //don't return flase, here, opera will stop the system event hander => cursor not change
            if(!self._handleMouseHover(event, src, self.getSrc(event), dd==1))
                return self.$FALSE;
            if(dd==1)
                pre=dragdrop&&dragdrop._dropElement;
        }

        //for tab focusHook
        if((obj=self._tabHookStack).length &&
            self._kb[type] &&
            (event.$key || event.keyCode || event.charCode)==9 &&
            false === self._handleTabHook(self.getSrc(event), obj=obj[obj.length-1]))
                return;

        id = tid || self.getId(src);
        //get profile from dom cache
        if(obj = self._getProfile(id)){
            //for setBlurTrigger
            if(type=='mousedown')
                _.tryF(linb.Dom._blurTrigger,[obj,event,src],src);
            //for resize
            if(type=="resize"){
                type='size';
                //for IE, always fire window onresize event after any innerHTML action
                if(linb.browser.ie && window===src){
                    var w=linb.browser.contentBox && document.documentElement.clientWidth || document.body.clientWidth,
                        h=linb.browser.contentBox && document.documentElement.clientHeight || document.body.clientHeight;
                    if(obj._w==w&&obj._h==h)
                        return;
                    obj._w=w;obj._h=h;
                }
            }

            var j, f, name, r=true, funs=[];
            //order by: before, on, after
            for(j=0; j<=2; ++j){
                //if in dd, get before Mouse.. only
                if(dd==1 && j!==0 && !event.$force)break;
                //if not in dd, get on/after Mouse.. only
                if(dd==2 && j===0)continue;
                //get event name from event type
                name = self._type[type+j] || ( self._type[type+j] = self._getEventName(type, self._eventtag[j]));
                /*
                event.$e : called by fireEvent
                event.$all : fire all events of the type: before/on/after
                event.$name : fire one group of event of the type.
                */
                if(!event.$e || event.$all || (name==event.$name))Array.prototype.push.apply(funs, obj._getEV(id, name, src));
            }

            /*call function by order
             widget before -> dom before -> widget on -> dom on -> widget after -> dom after
            */
            f=function(a){
                var i, v, k = arguments.callee.funs;
                for(i=0;v=k[i++];)
                    //if any fun return false, stop event bubble
                    if(false === v.call(src, obj, a||event, src))
                        return false;
                return true;
            };
            f.funs=funs;
            r = f();

            if(dragdrop){
                //shortcut for onDrag('mousemove')
                if(type=='drag')
                    dragdrop._onDrag=f;
                else if(type=='dragover')
                    dragdrop._onDragover=f;
            }

            if(dd==1){
                //From parent dropable node to child dropable node, fire parent node's mouseout manually
                if('mouseover'==type && dragdrop._dropElement==src && pre && pre!=src){
                    self({
                        type: 'mouseout',
                        target: pre,
                        $e:true,
                        $name:'beforeMouseout',
                        preventDefault:function(){this.returnValue=false},
                        stopPropagation:function(){this.cancelBubble=true}
                        },pre);
                    dragdrop.setDropElement(src);
                }
                
                //Out of dropable node, 'dragdrop._dropElement' will be set to null in beforeMouseover
                //set _preDropable flag, for parent node is dropable too
                if('mouseout'==type && !dragdrop._dropElement && pre && pre==src){
                    self._preDropable=id;
                    _.asyRun(function(){delete linb.Event._preDropable});
                }

                //if fire dd, prevent to fire parent dd
                //notice: this dont trigger cursor changing in opera
                if(src==dragdrop._dropElement)
                    r=false;
            }
            if(r===false)self.stopBubble(event);
            return r;
        }
    },
    Static:{
        $FALSE:linb.browser.opr?undefined:false,
        _type:{},
        _kb:{keydown:1,keypress:1,keyup:1},
        _reg:/([\.\w]+)(-[\.\w]+)?(:[\.\w]+:)([\.\w]*)/,
        $eventhandler:function(){return linb.Event(arguments[0],this)},
        $eventhandler2:function(){return linb.Event(arguments[0],this,1)},
        _eventtag:'before,on,after'.split(','),
        //collection
        _events : ("mouseover,mouseout,mousedown,mouseup,mousemove,click,dblclick," +
                "keydown,keypress,keyup,scroll,"+
                "blur,focus,"+
                "load,unload,"+
                "change,select,submit,error,"+

                //customized handlers:
                //dont use resize in IE
                "location,size," +
                //dragstart dragdrop dragout will not work in IE(using innerHTML)
                "dragbegin,drag,dragstop,dragleave,dragenter,dragover,drop")
                .split(','),
        //_dragMap:{'drag':1,'dragstop':1,'dragleave':1,'dragenter':1,'dragover':1,'drop':1},
        _getEventName:function(name,pos){
            var me=arguments.callee, map = me.map || (me.map={});
            return map[name+pos] || (name=name.charAt(0).toUpperCase()+name.substring(1))  &&
                (map[name+pos] = pos ?
                    (pos+name.charAt(0).toUpperCase()+name.substring(1)):
                    function(name){
                        var i,j,a=[];
                        for(i=0; j=linb.Event._eventtag[i]; i++)a[i]=j+name;
                        return a;
                    }(name)
                );
        },
        _getEventType:function(name){
            var me=arguments.callee, map = me.map || (me.map={});
            return map[name] || (map[name] = name.replace(/^(on|before|after)/,'').toLowerCase())
        },

        _getProfile:function(id){
            return id && linb.cache.dom[id.replace(this._reg,'$1$3')];
        },
        _handleTabHook:function(src, target){
            if(src===document)return true;
            var node=src,r;
            do{
                if(node==target[0])return true;
            }while(node && (node=node.parentNode) && node!==document && node!==window)

            r=_.tryF(target[1],[target[0]],src);
            return false;
        },
        _handleMouseHover:function(event,target,src,dd){
            if(target==document)return true;
            var node = (event.type=='mouseover'?event.fromElement:event.toElement)||event.relatedTarget;

            //When out of dropable node, if the parent node is dropable return true;
            if(dd && event.type=='mouseover' &&this._preDropable)
                try{
                    do{
                        if(node && node.id && node.id==this._preDropable){return true}
                    }while(node && (node=node.parentNode) && node!==document && node!==window)
                }catch(a){}

            //for firefox wearing anynomous div in input/textarea
            //related to 'div.anonymous-div' always return true
            if(linb.browser.gek)
                try{
                    do{if(node==target)return false;}while(node && (node=node.parentNode))
                }catch(a){
                    var pos=this.getPos(event),
                        node=linb([target]),
                        p=node.offset(),
                        s=node.cssSize(),
                        out=(pos.left<p.left||pos.left>p.left+s.width||pos.top<p.top||pos.top>p.top+s.height);
                    return event.type=='mouseover'?!out:out;
                }
            else
                do{if(node==target)return false;}while(node && (node=node.parentNode))
            return true;
        },

        _tabHookStack:[],
        pushTabOutTrigger:function(boundary, trigger){this._tabHookStack.push([boundary, trigger]);return this},
        popTabOutTrigger:function(flag){if(flag)this._tabHookStack=[];else this._tabHookStack.pop();return this},
        $EVENTHANDLER:"return linb.Event(arguments[0],this)",
        $EVENTHANDLER2:"return linb.Event(arguments[0],this,1)",
        getSrc:function(event){
            var a;
            return ((a=event.target||event.srcElement||null) && linb.browser.kde && a.nodeType == 3)?a.parentNode:a
        },
        getId:function(node){
            return window===node?"___window":document===node?"___document":node?node.id:'';
        },
        // only for mousedown and mouseup
        // return 1 : left button, else not left button
        getBtn:function(event){
	        return linb.browser.ie ?
	                event.button==4 ?
	                    'middle' :
	                        event.button==2 ?
	                            'right' :
	                                'left' :
	                event.which==2 ?
	                    'middle':
	                        event.which==3 ?
	                            'right':
	                                'left';
        },
        getPos:function(event){
            event = event || window.event;
            if(typeof event.pageX == 'number')
                return {left:event.pageX, top:event.pageY};
            else{
                var m = linb.browser.contentBox?document.documentElement:document.body;
                return {left:event.clientX + m.scrollLeft, top:event.clientY + m.scrollTop};
            }
        },
        /*return array(key, control, shift, alt)
        ['k','1','',''] : 'k' pressed, 'control' pressed, 'shift' and 'alt' not pressed
        */
        /*
        opear in window:
            ' = right (39)
            - = insert (45)
            . = del (46)
        */
        getKey:function(event){
            event=event||window.event;
            // use keyCode first for newer safari
            var res=[],t, k= event.$key || event.keyCode || event.charCode || 0;
            //from linb event
            if(typeof k == 'string')
                res[0]=k;
            else{
                var key= String.fromCharCode(k),
                    type=event.type;
                if(
                 //visible char
                 (type=='keypress' && k>=33 && k<=128)
                 //0-9, A-Z
                 ||((k>=48&&k<=57) || (k>=65&&k<=90))
                 )res[0]=key;
                else{
                    if(!(t=arguments.callee.map)){
                        t = arguments.callee.map ={};
                        var k,arr =
                        ("3,enter,8,backspace,9,tab,12,numlock,13,enter,19,pause,20,capslock," +
                        "27,esc,32, ,33,pageup,34,pagedown,35,end,36,home,37,left,38,up,39,right,40,down,44,printscreen," +
                        "45,insert,46,delete,50,down,52,left,54,right,56,up," +
                        "91,win,92,win,93,apps," +
                        "96,0,97,1,98,2,99,3,100,4,101,5,102,6,103,7,104,8,105,9," +
                        "106,*,107,+,109,-,110,.,111,/," +
                        "112,f1,113,f2,114,f3,115,f4,116,f5,117,f6,118,f7,119,f8,120,f9,121,f10,122,f11,123,f12," +
                        "144,numlock,145,scroll," +
                        "186,;,187,=,189,-,190,.,191,/,192,`,"+
                        "219,[,220,\\,221,],222,'," +
                        "224,meta,"+ //Apple Meta and Windows key
                        //safari
                        "63289,numlock,63276,pageup,63277,pagedown,63275,end,63273,home,63234,left,63232,up,63235,right,63233,down,63272,delete,63302,insert,63236,f1,63237,f2,63238,f3,63239,f4,63240,f5,63241,f6,63242,f7,63243,f8,63244,f9,63245,f10,63246,f11,63247,f12,63248,print"
                        ).split(',')
                        for(var i=1,l=arr.length; i<l; i=i+2)
                            t[arr[i-1]]=arr[i]
                        arr.length=0;
                        //add
                        t[188]=',';
                    }
                    res[0]= t[k] || key;
                }
            }

            //control
            if((event.modifiers)?(event.modifiers&Event.CONTROL_MASK):(event.ctrlKey||event.ctrlLeft||k==17||k==57391)){
                if(k==17||k==57391)
                    res[0]='';
                res.push('1');
            }else
                res.push('');

            //shift
            if((event.modifiers)?(event.modifiers&Event.SHIFT_MASK):(event.shiftKey||event.shiftLeft||k==16||k==57390)){
                if(k==16||k==57390)
                    res[0]='';
                res.push('1');
            }else
                res.push('');

            //alt
            if((event.modifiers)?false:(event.altKey||event.altLeft||k==18||k==57388)){
                if(k==18||k==57388)
                    res[0]='';
                res.push('1');
            }else
                res.push('');

            return res;
        },
        getEventPara:function(event){
            var pos=this.getPos(event), keys = this.getKey(event), h={
                pageX:pos.left,
                pageY:pos.top,
                keyCode:keys[0],
                ctrlKey:keys[1],
                shiftKey:keys[2],
                altKey:keys[3]
            };
            for(var i in event)if(i.charAt(0)=='$')h[i]=event[i];
            return h;
        },
        stopBubble:function(event){
            event=event||window.event;
            if(event.stopPropagation)event.stopPropagation();
            event.cancelBubble = true;
            this.stopDefault(event);
        },
        stopDefault:function(event){
            event=event||window.event;
            if(event.preventDefault)event.preventDefault();
            event.returnValue = false;
        },
        //key:control:shift:alt
        keyboardHook:function(key, ctrl, shift, alt, fun,args,scope){
            if(key){
                var p = linb.cache.hookKey, k = (key||'').toLowerCase() + ":"  + (ctrl?'1':'') + ":"  +(shift?'1':'')+ ":" + (alt?'1':'');
                if(typeof fun!='function')delete p[k];
                else p[k]=[fun,args,scope];
             }
            return this;
        }
    }
});