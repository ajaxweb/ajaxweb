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
//shadow class, add a plugin to linb.Dom
Class("linb.UI.Shadow","linb.UI",{
    Instance:{
        _attachTo:function(obj){
            //to linb.Dom
            obj=obj.reBoxing();
            var self=this;
            //set target first
            self.get(0)._target=obj.get(0);
            // add dom for dom node
            obj.append(self);
            return obj;
        }
    },
    Initialize:function(){
        //for linb.Dom
        _.each({
            addShadow :function(properties){
                return new linb.UI.Shadow(properties)._attachTo(linb([this.get(0)],false));
            },
            $getShadow:function(){
                var s=this.get(0),b;
                _.arr.each(linb.UI.Shadow._cache,function(o){
                    if(o._target==s){b=o;return false;}
                });
                return b && b.boxing();
            },
            removeShadow:function(){
                var s = this.get();
                _.arr.each(linb.UI.Shadow._cache,function(o){
                    if(_.arr.indexOf(s,linb(o._target).get(0))!=-1)
                        o.boxing().destroy();
                });
                return this;
            }
        },function(o,i){
            linb.Dom.plugIn(i,o);
        });
        //for linb.UI.Widget
        _.each({
            _shadow:function(key){
                return this.each(function(o){
                    var target = o.getSubNode('BORDER');
                    if(target.$getShadow())return;

                    var v = o.boxing(),
                        d = o.properties,
                        n = v.reBoxing(),
                        w = n.width(),
                        h = n.height()
                        ;

                    o.$shadow=target.addShadow({shadowSize:d._shadowSize, shadowOffset:d.$paddingBottom||d.$border});

                    d.$paddingBottom +=d._shadowSize;
                    d.$paddingRight +=d._shadowSize;

                    if(d.$fix){
                        w=d.width=w+d._shadowSize;
                        h=d.height=h+d._shadowSize;
                    }
                    linb.UI.$tryResize(o,w,h);

                });
            },
            _unShadow:function(){
                return this.each(function(o){
                    var target = o.getSubNode('BORDER');
                    if(!target.$getShadow())return;
                    target.removeShadow();

                    var v = o.boxing(),
                        d = o.properties,
                        n = v.reBoxing(),
                        w = n.width(),
                        h = n.height()
                        ;
                    d.$paddingBottom -=d._shadowSize;
                    d.$paddingRight -=d._shadowSize;
                    linb.UI.$tryResize(o,w,h);
                    delete o.$shadow
                });
            }
        },function(o,i){
            linb.UI.Widget.plugIn(i,o);
        });
        linb.UI.Widget.setDataModel({
            shadow:{
                ini:false,
                action: function(v){
                    var b=this.boxing();
                    if(v)b._shadow(v);
                    else b._unShadow();
                }
            },
            _shadowSize:this.SIZE
        });
    },
    Static:{
        SIZE:8,
        Templates:{
            tagName:'div',
            R:{
                tagName: 'div',
                style:'top:{shadowOffset}px;width:{shadowSize}px;right:-{pos}px;'
            },
            RB:{
                tagName: 'div',
                style:'height:{shadowSize}px;width:{shadowSize}px;right:-{rbpos}px;bottom:-{rbpos}px;'
            },
            B:{
                tagName: 'div',
                style: 'left:{shadowOffset}px;height:{shadowSize}px;bottom:-{pos}px;'
            }
        },
        Appearances:{
            KEY:{
               width:0,
               height:0,
               _display:'inline',
               '_font-size':0,
               '_line-height':0
            },
            'B, RB, R':{
                position:'absolute',
                display:'block',
                '*font-size':0,
                '*line-height':0
            },
            B:{
                left:0,
                width:'100%',
                background: linb.browser.ie6 ? '' : linb.UI.$bg('B.png', 'repeat-x left bottom'),
                _filter: linb.UI.$ieBg('B.png')
            },
            RB:{
                background: linb.browser.ie6?'':linb.UI.$bg('RB.png', 'left top'),
                _filter: linb.UI.$ieBg('RB.png')
            },
            R:{
                top:0,
                height:'100%',
                background: linb.browser.ie6?'': linb.UI.$bg('R.png', 'repeat-y right top'),
                _filter: linb.UI.$ieBg('R.png')
            }
        },
        DataModel:{
            shadowSize:{
                ini:8,
                action: function(value){
                    var self=this,
                    shadowOffset =self.properties.shadowOffset;
                    self.getSubNode('R').cssRegion({width:value,top:shadowOffset,right:-value-shadowOffset});
                    self.getSubNode('RB').cssRegion({width:value,height:value,right:-value-shadowOffset+1,bottom:-value-shadowOffset+1});
                self.getSubNode('B').cssRegion({height:value,left:shadowOffset,bottom:-value-shadowOffset});
                }
            },
            shadowOffset:{
                ini:0,
                action: function(value){
                    this.boxing().setShadowSize(this.properties.shadowSize, true);
                }
            }
        },
        _prepareData:function(profile){
            var t = arguments.callee.upper.call(this, profile);
            t.pos = (parseInt(t.shadowSize)||0) + (parseInt(t.shadowOffset)||0);
            t.rbpos = t.pos-1;
            return t;
        },
        LayoutTrigger:function(){
            // refresh height for IE6
            if(linb.browser.ie) this.root.ieRemedy()
        } 
    }
});
