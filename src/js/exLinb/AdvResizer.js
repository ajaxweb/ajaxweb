
//resizer class, add a plug in to linb.Dom
Class("linb.UI.AdvResizer","linb.UI.Resizer",{
    Instance:{
        //get Region for one/multi target
        cssRegion:function(){
            var profile=this.get(0),
            target = profile._target,
            l,t,b,r,
            ll,tt,ww,hh,
            c=[];

            if(target){
                target._nodes.sort(function(x,y){
                    x=parseInt(x.style.zIndex)||0;
                    y=parseInt(y.style.zIndex)||0;
                    return x>y?1:x==y?0:-1;
                });

                target.each(function(o,i){
                    var o=linb([o]);
                    if(i===0){
                        l=o.offsetLeft();
                        t=o.offsetTop();
                        r=l+(ww=o.offsetWidth());
                        b=t+(hh=o.offsetHeight());
                        c.push([{left :l, top :t},{ width :ww, height :hh},o.id()]);
                    }else{
                        l=Math.min(l,ll=o.offsetLeft());
                        t=Math.min(t,tt=o.offsetTop());
                        r=Math.max(r,ll+(ww=o.offsetWidth()));
                        b=Math.max(b,tt+(hh=o.offsetHeight()));
                        c.push([{left :ll, top :tt},{ width :ww, height :hh},o.id()]);
                    }
                });
            }
            profile.regionBlocks = c;
            //ajust border
            _.arr.each(c,function(o){
                o[0].left -=l;//+1;
                o[0].top -=t;//+1;
                o[1].width-=2;
                o[1].height-=2;
            });
            return {l:l, t:t, b:b, r:r};
        },
        // reset position and size
        rePosSize:function(){
            var self=this;
            self.each(function(o){
                var t,
                    t1=o.root,
                    t2=o._target;
                if(!t2 || t2.isEmpty())return;
                if(!o.properties._attached){
                    t = o.region=o.boxing().cssRegion();
                    t1
                    .cssPos({left :t.l, top :t.t})
                    .offsetWidth(t.r-t.l)
                    .offsetHeight(t.b-t.t);
                }
                if(!o.regPool)o.regPool=linb();
                if(t=o.regions){
                    o.regPool.merge(t);
                    t.css('display','none');
                }
                o.regions=linb();

                if(o.regionBlocks){
                    var t,fun=function(p,e){
                        var b = o.boxing(),
                            t = b.getTarget(),
                            key = linb.Event.$keyboard;
                        if(o.onRegionClick && false!==b.onRegionClick(o,e))
                            if(t._nodes.length>1){
                                if(key && key[2]){
                                    //t.minus(linb(this.tid));
                                    t._nodes.removeValue(linb(this.tid).get(0));
                                    b.resetTarget(t);
                                }else
                                    b.focus(this.tid);
                            }
                    };
                    _.arr.each(o.regionBlocks,function(v){
                        if(!o.regPool.isEmpty()){
                            t=o.regPool._nodes.pop();
                            linb(t).cssPos(v[0]).cssSize(v[1]);
                        }else{
                            t = _.str.toDom('<div style="position:absolute;border:dashed 1px blue;left:{l}px;top:{t}px;width:{w}px;height:{h}px;"></div>'
                            .replace('{l}',v[0].left)
                            .replace('{t}',v[0].top)
                            .replace('{w}',v[1].width)
                            .replace('{h}',v[1].height)
                            );
                            t.onClick(fun);
                            t=t.get(0)
                        }
                        o.regions._nodes.push(t);
                        t.tid=v[2];
                    });
                    o.root.append(o.regions.css('display','block'));
                }
            });
            self.focus();
            return self;
        },
        // get target
        getTarget:function(){
            return this.get(0)._target;
        },
        // reset target and refresh
        resetTarget:function(target,flag){
            var self=this,
                profile = self.get(0),
                rb = self.reBoxing(),
                ids;
            if(profile.properties._attached)return;
            delete profile.$focus;

            if(target && !target.isEmpty()){
                profile._target = target;
                self.rePosSize();
                rb.css({zIndex:linb.Dom.TOP_ZINDEX, display:'block'});
            }else{
                profile._target = linb();
                rb.css({zIndex:0,display:'none'});
            }
            if(target && !target.isEmpty()){
                ids=[];
                target.reBoxing('UI').each(function(o,i){
                    ids.push(o.$id);
                });
            }else
                ids=null;
            if(flag!==false)
                profile.boxing().onItemsSelected(profile, ids, profile.$id);

            return self;
        },
        focus:function(id){
           var profile=this.get(0), index=-1;

           if(!profile.regions)return;
           profile.regions.css('border','dashed 1px blue');

           var arr = profile._target.get();

           if(id)index = _.arr.subIndexOf(arr,'id',id);
           if(index==-1 && profile.$focus !== undefined)index=profile.$focus;
           if(index==-1 && arr.length>1)index = arr.length-1;

           if(index!=-1){
                profile.regions.css('border','dashed 1px blue');
                linb([profile.regions.get(index)]).css('border','solid 1px red');

                profile.$focus=index;
                if(profile.onFocusChange)profile.boxing().onFocusChange(profile,index);
            }

           return this;
        },
        getFocus:function(){
            return this.get(0).$focus;
        },
        active:function(flag){
            return this.each(function(profile){
                profile.getSubNode('MOVE').css('backgroundPosition','-17px top');
                profile.getSubNodes(['LT','T','RT','R','RB','B','LB','L'])
                .css('background',linb.browser.ie ? 'url('+linb.ini.path+'bg.gif)' : '#fff');
                if(flag!==false)profile.boxing().onActive(profile);
            });
        },
        inActive:function(){
            return this.each(function(profile){
                if(profile.$onDrag)return;
                profile.getSubNode('MOVE').css('backgroundPosition','-17px -17px');
                profile.getSubNodes(['LT','T','RT','R','RB','B','LB','L']).css('background','#808080');
            });
        }
    },
    Static:{
        DataModel:{
            dragArgs:null
        },
        EventHandlers:{
            onActive:function(profile){},
            onFocusChange:function(profile, index){},
            onItemsSelected:function(profile,ids){},
            onRegionClick:function(profile,e){}
        },
        _onMousedown:function(profile, e, src, ddparas){
            var ck=linb.Event.$keyboard;
             // begin drag use blank
            if(ck && (ck[1] || (linb.browser.kde&&ck[0]==' '))){
                profile.boxing().resetTarget(null);
                var pos=linb.Event.getPos(e);

                var hash = {
                    dragDefer:1, 
                    dragType:'icon', 
                    targetLeft:pos.left+12,
                    targetTop:pos.top+12, 
                    dragCursor:'pointer'
                };
                // set other args for drag
                _.merge(hash,profile.properties.dragArgs,'all');
                hash.widthIncrement=hash.heightIncrement=0;
                hash.dragData.pos = profile.root.cssPos();

                linb().startDrag(e,hash);
            }else{
                var hash,o,absPos,pos,posbak,size;
                if(profile.properties._attached){
                    pos=linb.Event.getPos(e);
                    linb([src]).startDrag(e,{
                        dragDefer:1,
                        targetReposition:false, 
                        dragType:'blank',
                        dragCursor:true,
                        targetLeft:pos.left, 
                        targetTop:pos.top
                    });
                }else{
                    o = profile.root;
                    absPos = o.offset();
                    pos=o.cssPos();
                    posbak=_.copy(pos);

                    if(ddparas.move){
                        absPos=linb.Event.getPos(e);
                    }else{
                        size=o.cssSize();

                        if(ddparas.left){
                            if(ddparas.top){
                            }else if(ddparas.bottom){
                                pos.top = pos.top + size.height;
                            }else{
                                pos.top = pos.top + size.height/2;
                            }
                        }
                        if(ddparas.right){
                            pos.left = pos.left + size.width;
                            if(ddparas.top){
                            }else if(ddparas.bottom){
                                pos.top = pos.top + size.height;
                            }else{
                                pos.top = pos.top + size.height/2;
                            }
                        }
                        if(ddparas.top && !ddparas.left && !ddparas.right){
                            pos.left = pos.left + size.width/2;
                        }
                        if(ddparas.bottom && !ddparas.left && !ddparas.right){
                            pos.left = pos.left + size.width/2;
                            pos.top = pos.top + size.height;
                        }
                    }

                    if((t=profile.properties.dragArgs) && (t=t.widthIncrement)){
                        var offx = linb.DragDrop.$proxySize % t;
                        if(ddparas.left){
                            pos.left += offx;
                        }else if(ddparas.right){
                            pos.left += offx;// + 2;
                        }else if(ddparas.move){
                            pos.left += offx;
                        }

                        pos.left += parseInt((absPos.left-posbak.left)/t)*t;
                    }
                    if((t=profile.properties.dragArgs) && (t=t.heightIncrement)){
                        var offy = linb.DragDrop.$proxySize % t;
                        if(ddparas.top){
                            pos.top += offy;
                        }else if(ddparas.bottom){
                            pos.top += offy;// + 2;
                        }else if(ddparas.move){
                            pos.top += offy;
                        }

                        pos.top += parseInt((absPos.top-posbak.top)/t)*t;
                    }

                    var hash = {
                        dragDefer:1,
                        targetReposition:false, 
                        dragType:'blank', 
                        dragCursor:true, 
                        targetLeft:pos.left, 
                        targetTop:pos.top
                    };
                    _.merge(hash,profile.properties.dragArgs,'all');
                    hash.targetOffsetParent=profile._parent;
                    hash.dragKey=null;

                    linb([src]).startDrag(e,hash);
                }
            }
            profile.boxing().active();
        },
        LayoutTrigger:function(){
            this.boxing().rePosSize();
        }
    }
});