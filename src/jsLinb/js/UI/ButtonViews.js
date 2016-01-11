Class("linb.UI.ButtonViews", "linb.UI.Tabs",{
    Static:{
        Appearances:{
            LIST:{
                'z-index':'2',
                position:'absolute',
                'background-color': '#EBEADB'
            },
            ITEMS:{
                'z-index':'2',
                position:'absolute',
                left:0,
                top:0
            },
            ITEM:{
                margin:'2px',
                position:'relative'
            },
            'ITEM-checked':{
                //clear tabs ITEM-checked
            },
            LEFT:{
                'border-right': '1px solid #A7A6AA'
            },
            RIGHT:{
                'border-left': '1px solid #A7A6AA'
            },
            TOP:{
                'border-bottom': '1px solid #A7A6AA'
            },
            BOTTOM:{
                'border-top': '1px solid #A7A6AA'
            },
            BOX:{
                $order:0,
                border:'solid 1px #cdcdcd',
                'vertical-align':'top'
            },
            'BOX-mouseover':{
                $order:1,
                'background-color':'#FFFFE0'
            },
            'BOX-mousedown, BOX-checked':{
                $order:2,
                'border-color':'#A7A6AA #FFF #FFF #A7A6AA',
                'background-color':'#C4C4C4'
            },
            HANDLE:{
                display:linb.$inlineBlock,
                zoom:linb.browser.ie6?1:null,
                cursor:'pointer',
                'vertical-align':'middle',
                'font-size':'12px',
                margin:'1px'
            }
        },
        DataModel:{
            barLocation:{
                ini:'top',
                listbox:['top','bottom','left','right'],
                action:function(v){
                    var self=this,
                        hs = self.getSubNode('LIST'),
                        h = self.getSubNode('ITEM',true),
                        b = self.getSubNode('BOX',true);
                    switch(v){
                        case 'left':
                        case 'top':
                            hs.cssRegion({left:0,top:0,right:'auto',bottom:'auto'});
                        break;
                        case 'right':
                        case 'bottom':
                            hs.cssRegion({left:'auto',top:'auto',right:0,bottom:0});
                       break;
                    }
                    switch(v){
                        case 'left':
                        case 'right':
                            h.css('display','block');
                            b.css('display','block');
                            break;
                        case 'top':
                        case 'bottom':
                            h.setInlineBlock();
                            b.setInlineBlock();
                            hs.height('auto');
                            break;
                    }
                    self.boxing().setBarSize(self.properties.barSize,true);
                }
            },
            barHAlign:{
                ini:'left',
                listbox:['left','center', 'right'],
                action:function(v){
                    var hl = this.getSubNode('ITEMS');
                    hl.css('textAlign',v);
                }
            },
            barVAlign:{
                ini:'top',
                listbox:['top','bottom'],
                action:function(v){
                    var hl = this.getSubNode('ITEMS');
                    if(v=='top')
                        hl.cssRegion({top:0,bottom:'auto'});
                    else
                        hl.cssRegion({bottom:0,top:'auto'});
                }
            },
            barSize:{
                ini:50,
                action:function(v){
                    var self=this,
                        t=self.properties,
                        hs = self.getSubNode('LIST'),
                        hl = self.getSubNode('ITEMS');
                    if(t.barLocation=='left'||t.barLocation=='right'){
                        hs.merge(hl).width(v);
                    }else{
                        hs.height(v);
                    }
                    linb.UI.$tryResize(self,self.root.width(), self.root.height(), self.properties.$UIvalue );
                }
            }
        },
        LayoutTrigger:function(){
            var pro = this.properties;
            this.boxing().setBarLocation(pro.barLocation,true)
            .setBarHAlign(pro.barHAlign,true)
            .setBarVAlign(pro.barVAlign,true);
        },
        _onresize:function(profile,width,height,key){
            var o = profile.boxing().getPanel(key),
                t=profile.properties,  top, left,
                hs = profile.getSubNode('LIST'),
                hl = profile.getSubNode('ITEMS'),
                wc=null,hc=null;

            if(t.barLocation=='top'||t.barLocation=='bottom'){
                if(width){
                    hs.width(width);
                    hl.width(width);
                    left = 0;
                    wc=width;
                }
                if(height-t.barSize>0)hc=height-t.barSize;
                top = t.barLocation=='top'?t.barSize:0;
            }else{
                if(height){
                    hs.height(height);
                    top=0;
                    hc=height;
                }
                if(width){
                    left = t.barLocation=='left'?t.barSize:0;
                    wc=width-t.barSize;
                }
            }
            if(o && !o.isEmpty())o.cssRegion({width:wc?wc:null,height:hc?hc:null,left:left,top:top},true);
        }
    }
});