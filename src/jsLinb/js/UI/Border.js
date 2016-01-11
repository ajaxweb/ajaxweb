//add/get/remove border to a dom node(display:block;position:absolute) / or a widget inherite from linb.UI.Widget
Class("linb.UI.Border","linb.UI",{
    Instance:{
        _attachTo:function(target, eventTrigger){
            var self=this, v=self.get(0);
            //add to dom
            target.append(self);
            //save id
            v.$edgeId = linb(target).id();
            v.$tieId = eventTrigger;
            //add event
            if(v.properties.borderActive){
                var t = v.behavior.TAG, tag='tag',n=v.domNode;
                if(linb.Dom.byId(eventTrigger))
                    linb(eventTrigger).afterMouseover(function(p,e){
                        _.tryF(t.afterMouseover,[v,e,n],this)
                    },tag).afterMouseout(function(p,e){
                        _.tryF(t.afterMouseout,[v,e,n],this)
                    },tag).afterMousedown(function(p,e){
                        _.tryF(t.afterMousedown,[v,e,n],this)
                    },tag).afterMouseup(function(p,e){
                        _.tryF(t.afterMouseup,[v,e,n],this)
                    },tag);
            }
            return target;
        },
        _detach:function(){
            var self=this, v=self.get(0),n,nl=null,tag='tag';
            if(n=v.$tieId)
                if(n=linb.Dom.byId(n))
                    linb(n).afterMouseover(nl,tag).afterMouseout(nl,tag).afterMousedown(nl,tag).afterMouseup(nl,tag);
            return self;
        }
    },
    Initialize:function(){
        //for linb.Dom
        _.each({
            addBorder :function(properties){
                var target = linb([this.get(0)]), eventTrigger=arguments[1]||target.id();
                return new linb.UI.Border(properties)._attachTo(target, eventTrigger);
            },
            $getBorder:function(){
                var s = this.id(), b;
                _.arr.each(linb.UI.Border._cache,function(o){
                    if(o.$edgeId==s){b=o;return false;}
                });
                return b && b.boxing();
            },
            removeBorder:function(){
                var s = this.id();
                _.arr.each(linb.UI.Border._cache,function(o){
                    if(o.$edgeId==s)
                        o.boxing()._detach().destroy();
                });
                return this;
            }
        },function(o,i){
            linb.Dom.plugIn(i,o);
        });
        //for linb.UI.Widget
        _.each({
            _border:function(key, args){
                return this.each(function(o){
                    var target = o.getSubNode('BORDER');
                    if(target.$getBorder())return;

                    var v = o.boxing(),
                        d = o.properties,
                        n = v.reBoxing(),
                        w = n.width(),
                        h = n.height(),
                        bs=d._borderSize
                        ;
                    d.$paddingLeft+=bs;
                    d.$paddingTop+=bs;
                    d.$paddingBottom+=bs;
                    d.$paddingRight+=bs;
                    args = args || {};
                    _.merge(args,{
                        _borderSize:bs,
                        _extend:bs
                    },'without');

                    o.$border = target.addBorder(args, o.domId);

                    if(d.$fix){
                        w=o.width=w+bs;
                        h=o.height=h+bs;
                    }
                    linb.UI.$tryResize(o,w,h);

                    o.clearCache();

                    if(target.$getShadow){
                        var o= target.$getShadow();
                        if(o)o.setOffset(o.getOffset()+bs/2+1);
                    }
                });
            },
            _unBorder:function(){
                return this.each(function(o){
                    var target = o.getSubNode('BORDER');
                    if(!target.$getBorder())return;

                    var v = o.boxing(),
                        d = o.properties,
                        n = v.reBoxing(),
                        w = n.width(),
                        h = n.height(),
                        bs=d._borderSize
                        ;
                    d.$paddingLeft-=bs;
                    d.$paddingTop-=bs;
                    d.$paddingBottom-=bs;
                    d.$paddingRight-=bs;
                    target.removeBorder();
                    linb.UI.$tryResize(o,w,h);

                    delete o.$border;
                    if(target.$getShadow){
                        var o= target.$getShadow();
                        if(o)o.setOffset(o.getOffset()-bs/2-1);
                    }

                });
            }
        },function(o,i){
            linb.UI.Widget.plugIn(i,o);
        });
        linb.UI.Widget.setDataModel({
            border:{
                ini:false,
                action: function(v){
                    var b=this.boxing();
                    if(v)
                        b._border(v);
                    else
                        b._unBorder();
                }
            },
            _borderSize:this.SIZE
        });
    },
    Static:{
        SIZE:4,
        Templates:{
            tagName:'div',
            TAG:{},
            T:{style:'width:100%;left:0;top:-{_extend}px;height:{_borderSize}px;'},
            RT:{style:'top:-{_extend}px;right:-{_extend}px;width:{_borderSize}px;height:{_borderSize}px;'},
            R:{style:'height:100%;top:0;right:-{_extend}px;width:{_borderSize}px;' },
            RB:{style:'right:-{_extend}px;bottom:-{_extend}px;width:{_borderSize}px;height:{_borderSize}px;'},
            B:{style:'width:100%;left:0;bottom:-{_extend}px;height:{_borderSize}px;'},
            LB:{style:'left:-{_extend}px;bottom:-{_extend}px;width:{_borderSize}px;height:{_borderSize}px;'},
            L:{style:'height:100%;top:0;left:-{_extend}px;width:{_borderSize}px;' },
            LT:{style:'top:-{_extend}px;left:-{_extend}px;width:{_borderSize}px;height:{_borderSize}px;'}
        },
        Appearances:{
            KEY:{
                position:'static',
                display:'inline',

                //don't use width/height to trigger hasLayout in IE6
                width:0,
                height:0,

                '_font-size':0,
                '_line-height':0,
                visibility: 'hidden',
                /*for get top Index, when it's static*/
                'z-index':'50'
            },
            TAG:{
                '_font-size':0,
                '_line-height':0
            },
            'T, RT, R, RB, B, LB, L, LT':{
                $order:1,
                position:'absolute',
                display:'block',
                border:0,
                'z-index':30,
                visibility: 'visible',
                '_font-size':0,
                '_line-height':0
            },
            'RT, RB, LB, LT':{
                'z-index':40
            },
            T:{
                background: linb.UI.$bg('v.gif', ' repeat-x left top')
            },
            B:{
                background: linb.UI.$bg('v.gif', ' repeat-x left bottom')
            },
            'KEY-mouseover T, KEY-mouseover B':{
                $order:1,
                'background-image':linb.UI.$bg('v_mouseover.gif')
            },
            'KEY-checked T, KEY-checked B, KEY-mousedown T, KEY-mousedown B':{
                $order:2,
                'background-image':linb.UI.$bg('v_mousedown.gif')
            },
            L:{
                background: linb.UI.$bg('h.gif', ' repeat-y left top')
            },
            R:{
               background: linb.UI.$bg('h.gif', ' repeat-y right top')
            },
            'KEY-mouseover L, KEY-mouseover R':{
                $order:1,
                'background-image': linb.UI.$bg('h_mouseover.gif')
            },
            'KEY-checked L, KEY-checked R, KEY-mousedown L, KEY-mousedown R':{
                $order:2,
                'background-image': linb.UI.$bg('h_mousedown.gif')
            },
            LT:{
                background: linb.UI.$bg('corner.gif', ' no-repeat left top')
            },
            RT:{
               background: linb.UI.$bg('corner.gif', ' no-repeat right top')
            },
            RB:{
                background: linb.UI.$bg('corner.gif', ' no-repeat right bottom')
            },
            LB:{
                background: linb.UI.$bg('corner.gif', ' no-repeat left bottom')
            },
            'KEY-mouseover LT, KEY-mouseover RT, KEY-mouseover RB, KEY-mouseover LB':{
                $order:1,
                'background-image': linb.UI.$bg('corner_mouseover.gif')
            },
            'KEY-checked LT, KEY-checked RT, KEY-checked RB, KEY-checked LB, KEY-mousedown LT, KEY-mousedown RT, KEY-mousedown RB, KEY-mousedown LB':{
                $order:2,
                'background-image' : linb.UI.$bg('corner_mousedown.gif')
            }
        },
        Behaviors:{
            HoverEffected:{TAG:'KEY'},
            ClickEffected:{TAG:'KEY'}
        },
        DataModel:{
            _borderSize:4,
            _extend:4,
            borderActive:false
        }
    }
});