//singleton
Class("linb.Tips", null,{
    Constructor:function(){return null},
    Initialize:function(){
        var dd=linb.DragDrop,
            tips=this;
        if(dd)
            dd.$reset=function(){
                tips._pos={left:dd._profile.x,top:dd._profile.y}
            };

        //for: span(display:-moz-inline-box) cant wrap in firefox
        linb.CSS.addStyleSheet(
            ".linb-tips{font-size:0;line-height:0;position:absolute;overflow:visible;} "+
            ".linb-tips-i{font-size:12px;overflow:hidden;}"+
            ".linb-tips-i span{display:inline;}"
        , this.KEY);

        linb.doc
        .afterMousedown(function(){
            tips._cancel();
        },'$Tips',-1)
        .afterMousemove(function(obj, e, src){
            if(dd.isWorking)return;
            var event=linb.Event,
                p,n;

            //if ready to show in settimeout(resetRun)
            if((p=_.resetRun.$cache) && p['$Tips'])
                tips._pos=event.getPos(e);

            //it's first show
            if(tips._from){
                _.resetRun('$Tips3', null);
                tips._showF();
            //after show, before hide
            }else if(tips._showed && tips.MOVABLE){
                p=event.getPos(e);
                n=tips._Node.style;
                n.left = (parseInt(n.left)||0) + (p.left-tips._pos.left) +'px';
                n.top = (parseInt(n.top)||0) + (p.top-tips._pos.top) +'px';
                tips._pos=p;
            }
        },'$Tips',-1)
        .afterMouseover(function(obj, e, src){
            var event=linb.Event,
                rt=event.$FALSE,
                node=event.getSrc(e),
                id,
                rn = e.fromElement||e.relatedTarget,
                _from,
                tempid,evid,
                index=0,
                pass
            ;

            if(!node)
                return rt;
            try{
                //for inner renderer
                while((!node.id || node.id==linb.$langId) && node.parentNode!==document && index++<10)
                    node=node.parentNode;
                if(!(id=node.id))
                    return rt;
            }catch(e){}

            //check id
            if((_from=event._getProfile(id)) && _from.box && _from.KEY=='linb.UIProfile'){
                //if onShowTips exists, use custom tips id region, or use item region
                tempid=_from.onShowTips?id:id.replace(event._reg,'$1$3$4');
                if(tips._markId && tempid==tips._markId)
                    return rt;

                //set mark src id
                tips._markId = tempid;
                tips._pos=event.getPos(e);
                
                if(tips._showed){
                    tips._from=_from;
                    tips._enode=node;
                    tips._showF();
                }else
                    _.resetRun('$Tips', function(){
                        tips._from=_from;
                        tips._enode=node;
                        _.resetRun('$Tips3', function(){
                            if(tips._from)
                                tips._showF();
                        },100);
                    }, tips.DELAYTIME);
            }else
                tips._cancel();

            return rt;
        },'$Tips',-1)
        .afterMouseout(function(obj, e, src){
            if(tips._markId){
                var event=linb.Event,
                    id,
                    tempid,
                    evid,
                    _from=tips._from,
                    clear,
                    index=0,
                    node = e.toElement||e.relatedTarget;

                if(!node)
                    clear=1;
                else{
                    //for firefox wearing anynomous div in input/textarea
                    try{
                        //for inner renderer
                        while((!node.id || node.id==linb.$langId) && node.parentNode!==document && index++<10)
                            node=node.parentNode;
                        if(!(id=node.id))
                            clear=1
                    }catch(e){clear=1}
                }
                if(clear)
                    tips._cancel();
                else
                    tempid=(_from && _from.onShowTips)?id:id.replace(event._reg,'$1$3$4');

                return event.$FALSE;
            }
        },'$Tips',-1);

        this._Types = {
            'default' : new function(){
                this._r=/(\$)([\w\.]+)/g;
                this.show=function(item, pos, key){
                    //if trigger onmouseover before onmousemove, pos will be undefined
                    if(!pos)return;

                    var self=this,node,_ruler,s,w,h;
                    if(!(node=self.node)){
                        node = self.node = linb.create('<div class="linb-tips"><div class="linb-tips-i"></div></div>');
                        _ruler = self._ruler = linb.create('<div class="linb-tips" style="position:absolute;visibility:hidden;left:-10000px;"><div class="linb-tips-i" style="position:relative;"></div></div>');
                        self.n = node.first();
                        self._n = _ruler.first();
                        if(typeof node.addShadow == 'function'){
                            node.addShadow();
                            _ruler.addShadow();
                        }
                        linb('body').append(_ruler);
                    }
                    _ruler = self._ruler;
                    //ensure zindex is the top
                    if(document.body.lastChild!=node.get(0))
                        linb('body').append(node);

                    s = typeof item=='object'? item[key||linb.Tips.TIPSKEY] :item ;
                    if(typeof s=='function')
                        s=s();
                    if(s+=""){
                        var html=/^\s*\</.test(s);
                        //get string
                        s=s.replace(self._r, function(a,b,c){
                            return linb.getRes(c);
                        });
                        linb.Tips._curTips=s;
                        if(!item.transTips || !html)
                            s='<div style="border:solid gray 1px;background-color:#FFF8DC;padding:1px 2px 2px 2px;">'+s+'</div>';
                        //set to this one
                        self._n.get(0).innerHTML=s;

                        //get width
                        w=_ruler.get(0).offsetWidth;
                        if(!html)
                            w=Math.min(tips.MAXWIDTH, w);

                        //set content, AND dimension
                        var style=node.get(0).style, t1=self.n.get(0), t2,styleI=t1.style;
                        //hide first
                        style.visibility='hidden';
                        //set content
                        t1.innerHTML=s;
                        //set dimension
                        if(linb.browser.ie){
                            style.width=styleI.width=w+(w%2)+'px';
                            h=t1.offsetHeight;
                            style.height=h-(h%2)+'px';
                        }else
                            styleI.width=w+'px';

                        //pop(visible too)
                        node.popToTop({left:pos.left,top:pos.top,region:{
                            left:pos.left,
                            top:pos.top-12,
                            width:24,height:32
                        }},1);
                    }else
                        node.css('zIndex',0).hide();
                };
                this.hide = function(){
                    this.node.css('zIndex',0).hide();
                };
            }/*,
            'animate' : new function(){
                this.threadid='$tips:1$';
                this.show=function(item, pos){
                    if(!this.node){
                        this.node = linb.create('<div style="position:absolute;border:solid gray 1px;background-color:#FFFACD;font-size:12px;padding:3px;overflow:hidden;"></div>');
                        linb('body').append(this.node);
                    }
                    pos.left+=12;
                    pos.top+=12;
                    var s=item.tips;
                    s = s.charAt(0)=='$'?linb.wrapRes(s.slice(1)):s;
                    this.node.html(s).css('zIndex',linb.Dom.TOP_ZINDEX).cssPos(pos);
                    var w=this.node.width(),h=this.node.height();
                    this.node.cssSize({ width :0, height :0}).css('display','block').animate({width:[0,w],height:[0,h]},0,0,240,8,'outexp',this.threadid).start();
                };
                this.hide = function(){
                    linb.Thread.abort(this.threadid);
                    this.node.height('auto').width('auto').css('display','none').css('zIndex',0);
                };
            }*/
        };
    },
    Static:{
        TIPSKEY:'tips',
        MAXWIDTH:300,
        MOVABLE:true,
        DELAYTIME:200,
        AUTOHIDETIME:5000,

        _showF:function(){
            var self=this,
                _from=self._from,
                node=self._enode,
                pos=self._pos,
                id,
                o,t,b=false;

            self._from=self._enode=null;

            if(!node || !_from || !pos || !(o=_from.box))return;

            //keep older
            self._pos=pos;
            //1.CF.showTips
            b=((t=_from.CF) && (t=t.showTips) && t(_from, node, pos));
            //2._showTips / onShowTips
            //check if showTips works
            if(!b)b=(o._showTips && o._showTips(_from, node, pos));

            //default tips var(profile.tips > profile.properties.tips)
            if(!b && ((t=_from) && t.tips)||(t && (t=t.properties) && (t.tips))){
                self.show(pos, t);
                b=true;
            }

            //no work hide it
            if(!b)self.hide();
            else {
                if(!self.MOVABLE)
                    _.resetRun('$Tips2', self.hide,self.AUTOHIDETIME,null,self);
            }
        },
        getTips:function(){
            return this._curTips;
        },
        show:function(pos, item, key){
            var self=this,t;
            //for mousemove
            self._pos=pos;
            //same item, return
            if(self._item === item)return;

            //hide first
            //if(self._tpl)self._tpl.hide();

            //base check
            if(typeof item =='string' || (item && (item[key||linb.Tips.TIPSKEY]))){
                //get template
                t = self._tpl = self._Types[item.tipsTemplate] || self._Types['default'];
                t.show(item,pos,key);
                self._Node=t.node.get(0);
                self._item=item;
                self._showed = true;
            }else
                self._cancel();
        },
        hide:function(){
            var self=this;
            if(self._showed){
                if(self._tpl)self._tpl.hide();
                self._clear();
            }
        },
        _cancel:function(){
            var self=this;
            if(self._markId){
                if(self._showed)
                    self.hide();
                else{
                    _.resetRun('$Tips', null);
                    _.resetRun('$Tips3', null);
                    self._clear();
                }
            }            
        },
        _clear:function(){
            var self=this;
            self._curTips=self._markId = self._from=self._tpl = self._item = self._showed = null;
        }
    }
});