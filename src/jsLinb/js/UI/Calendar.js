Class('linb.UI.Calendar', 'linb.UI.DatePicker', {
    Initialize:function(){
        var self=this,
            e=linb.Event.$EVENTHANDLER,
            e2=linb.Event.$EVENTHANDLER2,
            id=linb.UI.$ID,
            cls=linb.UI.$CLS,
            cls2=cls+'-td-free',
            key=self.KEY;

        self.addTemplateKeys(['H', 'W','DH','DAY','DC','TBODY', 'TD']);
        var colgroup = '<colgroup><col width="2%"/><col width="14%"/><col width="14%"/><col width="14%"/><col width="14%"/><col width="14%"/><col width="14%"/><col width="14%"/></colgroup>',
            thead1='<thead><tr height="1%"><th id="'+key+'-H:'+id+':7" class="'+cls+'-h #H_CC#"></th>',
            thead2='</tr></thead>',
            th='<th id="'+key+'-H:'+id+':@" class="'+cls+'-h #H_CC#">@</th>',
            tbody1 = '<tbody id="'+key+'-TBODY:'+id +':" >',
            tbody2 = '</tbody>',
            tr1='<tr>',
            tr2='</tr>',
            td1='<th id="'+key+'-W:'+id+':@"  class="'+cls+'-w #W_CC#">@</th>',
            td2='<td id="'+key+'-TD:'+id+':@" class="'+cls+'-td ! #TD_CC#"  unselectable="on" onclick="'+e+'" >'+
                '<div id="'+key+'-DAY:'+id+':@" class="'+cls+'-day #DAY_CC#" unselectable="on" onmouseover="'+e2+'" onmouseout="'+e2+'" ondrop="'+e2+'" >'+
                    '<div id="'+key+'-DH:'+id+':@" class="'+cls+'-dh #DH_CC#" ></div>'+
                    '<div id="'+key+'-DC:'+id+':@" class="'+cls+'-dc #DC_CC#" ></div>'+
                '</div>'+
                '</td>',
            body,i,j,k,l,a=[],b=[];
        for(i=0;i<7;i++)
            b[b.length]= th.replace(/@/g,i);

        k=l=0;
        for(i=0;i<48;i++){
            j=i%8;
            a[a.length]= (j==0?tr1:'') + (j==0?td1:td2).replace(/@/g,j==0?l:k).replace('!',(j==1||j==7)?cls2:'') + (j==7?tr2:'');
            if(j!==0)k++;
            else l++;
        }

        body=colgroup+thead1+b.join('')+thead2+tbody1+a.join('')+tbody2;

        self.setTemplate({
            tagName : 'div',
            style:'{_style}',
            onselectstart:'return false',
            BORDER:{
                tagName : 'div',
                BODY:{
                    $order:1,
                    tagName:'table',
                    cellpadding:"0",
                    cellspacing:"0",
                    width:'100%',
                    text:body
                }
            }
        });
    },
    Static:{
        Behaviors:{        
            DropableKeys:['DAY'],
            HoverEffected:{},
            ClickEffected:{},
            onSize:function(profile,e){
                var o = profile.domNode.style,f=parseInt, n=null, w=n, h=n;
                if(e.height)h=f(o.height)||n;
                if(e.width)w=f(o.width)||n;
                if(h||w)linb.UI.$tryResize(profile, w, h);
            },
            TD:{onClick:null}
        },
        DataModel:{
            handleHeight : null,
            tipsHeight :null,
            closeBtn:null,
            dock:'fill',
            $borderW:1
        },
        _getLabelNodes:function(profile){
            return profile.$day1 || (profile.$day1=profile.getSubNode('DH',true));
        },
        _getDayNodes:function(profile){
            return profile.$day2 || (profile.$day2=profile.getSubNode('DAY',true));
        },
        Appearances:{
            'DAY, DC':{
                position:'relative'
            },
            DAY:{
                overflow:'hidden'
            },
            DC:{
                'text-align':'left'
            },
            'TD-checked':{}
        },
        _onresize:function(profile,width,height){
            var p=profile.properties,
                f=function(k){return profile.getSubNode(k)},
                off=2*p.$borderW,
                t;
            //for border, view and items
            if(height){
                f('BORDER').height(t=height-off);
                f('BODY').height(t);
                t=(t-16)/6-1;
                profile.box._getDayNodes(profile).height(t);
            }
        }
    }
});