Class("linb.UI.Stacks", "linb.UI.Tabs",{
    Static:{
        Appearances:{
            KEY:{
                overflow:'visible'
            },
            LIST:{
                position:'static'
            },
            ITEMS:{
                position:'static'
            },
            ITEM:{
                $order:0,
                display:'block',
                position:'absolute',
                cursor:'pointer',
                background: linb.UI.$bg('barvbg.gif', ' repeat-x left top', true),
                height:'22px',
                width:'100%',
                left:0
            },
            BOX:{
                display:'block'
            },
            'ITEM-mouseover':{
                $order:1,
                'background-position' : 'right -22px'
            },
            'ITEM-mousedown':{
                $order:1,
                'background-position' : 'right -44px'
            },
            'ITEM-checked':{
                $order:1,
                'background-position' : 'right -44px'
            },
            HANDLE:{
                cursor:'pointer',
                display:'block',
                'font-size':'12px',
                height:'100%',
                'padding-left':'6px',
                'white-space':'nowrap'
            },
            CAPTION:{
                margin: '2px'
            },
            PANEL:{
                position:'absolute',
                visibility:'hidden',
                top:'-10000px',
                left:'-10000px',
                overflow:'auto'
            },
            CMDS:{
                position:'absolute',
                top:'3px',
                right:'2px',
                'text-align':'right',
                'vertical-align': 'middle'
            }
        },
        _onresize:function(profile,width,height,key){
            var t=profile.properties, temp,t1,t2,obj,top,
                wc=null,hc=null,
                o = profile.boxing().getPanel(key);
            if(!o || o.isEmpty())return;

            // change value
            if(height){
                t2=t1=0;
                _.arr.each(t.items,function(o){
                    obj = profile.getSubNodeByItemId('ITEM', o.id);
                    obj.cssRegion({bottom:'auto',top:t1});

                    // offsetHeight maybe not set here
                    t1 += obj.height();
                    if(o.id == key)return false;
                });
                _.arr.each(t.items,function(o){
                    if(o.id == key)return false;
                    obj = profile.getSubNodeByItemId('ITEM', o.id);
                    obj.cssRegion({top:'auto',bottom:t2});
                    t2+= obj.height();
                },null,true);

                temp = height - t1 - t2;
                if(temp>0){
                    top=t1;
                    hc=temp;
                }
            }
            if(width)wc=width;

            o.cssRegion({width:wc?wc:null,height:hc?hc:null,top:top,left:0},true);
            if(wc)profile.getSubNode('LIST').width(wc);
        }
    }
});
