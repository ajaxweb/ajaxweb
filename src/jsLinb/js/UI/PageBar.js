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
Class("linb.UI.PageBar",["linb.UI","linb.absValue"] ,{
    Instance:{
        _setCtrlValue:function(value){
            return this.each(function(profile){
                if(!profile.domNode)return;
                var t,
                    prop = profile.properties,
                    arr = profile.box._v2a(value),
                    min=arr[0],
                    cur=arr[1],
                    max=arr[2],
                    keys = profile.keys,
                    fun = function(p,k){return p.getSubNode(k)},

                    first = fun(profile, 'FIRST'),
                    prev = fun(profile, 'PREV'),
                    prehide = fun(profile, 'PREM'),
                    current = fun(profile, 'CUR'),
                    next = fun(profile, 'NEXT'),
                    nexthide = fun(profile, 'NEXTM'),
                    last = fun(profile, 'LAST'),

                    change = function(n,i,j){if(i)n.attr('href',prop.uriTpl.replace('*',i));if(j)n.text(prop.textTpl.replace('*',j))},
                    display = function(n,f){n.css('display',f?'':'none')}
                    ;
                //change href and text
                change(first, min, min);
                change(prehide, '','..' + _.str.repeat('.',String(cur-1-min).length) );
                change(prev, cur-1);
                change(current, cur, cur);
                change(next, cur+1);
                change(nexthide, '','..' + _.str.repeat('.',String(max-cur-1).length) );
                change(last, max, max);

                //show or hide
                if((t=cur-min)<=0){
                    display(first,0);display(prehide,0);display(prev,0);
                }else if(t==1){
                    display(first,1);display(prehide,0);display(prev,0);
                }else if(t==2){
                    display(first,1);display(prehide,0);display(prev,1);
                }else{
                    display(first,1);display(prehide,1);display(prev,1);
                }
                if((t=max-cur)<=0){
                    display(last,0);display(nexthide,0);display(next,0);
                }else if(t==1){
                    display(last,1);display(nexthide,0);display(next,0);
                }else if(t==2){
                    display(last,1);display(nexthide,0);display(next,1);
                }else{
                    display(last,1);display(nexthide,1);display(next,1);
                }
            });
        },
        setPage:function(value){
            return this.each(function(o){
                var v=o.properties.value,
                    a=v.split(':');
                a[1]=value;
                o.boxing().setValue(a.join(':'));
            });
        }
    },
    Static:{
        Templates:{
            style:'{_style}',
            POOL:{
                style:'position:absolute;display:none;',
                POP:{
                    tagName:'div',
                    className:'ui-content'
                }
            },
            LABEL:{
                text:'{caption}'
            },
            FIRST:{
                tagName:'a',
                tabindex: '{tabindex}',
                $order:1
            },
            PREM:{
                tagName:'a',
                tabindex: '{tabindex}',
                href:'#',
                $order:2
            },
            PREV:{
                tagName:'a',
                tabindex: '{tabindex}',
                text:'{prevMark}',
                $order:3
            },
            CUR:{
                tagName:'a',
                tabindex: '{tabindex}',
                $order:4
            },
            NEXT:{
                tagName:'a',
                tabindex: '{tabindex}',
                text:'{nextMark}',
                $order:5
            },
            NEXTM:{
                tagName:'a',
                tabindex: '{tabindex}',
                href:'#',
                $order:6
            },
            LAST:{
                tagName:'a',
                tabindex: '{tabindex}',
                $order:7
            }
        },
        Appearances:{
            LABEL:{
                display:'inline',
                'white-space':'nowrap'
            },
            KEY:{
                padding: linb.browser.ie?'3px':'',
                display:'inline'
            },
            'KEY a:focus, POP a:focus':{
                '-moz-outline-offset': ''
            },
            'KEY a, POP a':{
                $order:1,
                'font-size':'12px',
                border:'solid 1px gray',
                'padding':'0 3px 0 3px',
                'vertical-align':'middle',
                margin: '3px'
            },
            'PREV,CUR,NEXT':{
                'font-weight' : 'bold'
            },
            CUR:{
                $order:1,
                background:'#316AC5',
                color:'#fff'
            },
            POP:{
                border:'dotted 1px gray',
                background:'#fff',
                position:'absolute',
                padding:'3px',
                'line-height':'22px'
            }
        },
        Behaviors:{
            POP:{
                onClick:function(profile, e, src){
                    var o=linb(src),
                        r = linb.Event.getSrc(e)
                        ;
                    o.setBlurTrigger(profile.key+":"+profile.$id, null);
                    profile.getSubNode('POOL').append(o);
                    if(r.tagName.toLowerCase()=='a')
                        return profile.box._click(profile,r);
                }
            },
            FIRST:{
                onClick:function(profile, e, src){
                    return profile.box._click(profile,src);
                }
            },
            PREM:{
                onClick:function(profile, e){return !!linb.Event.getKey(e)[2]},
                onMousedown:function(profile, e, src){
                    profile.box._show(profile,e,src,0);
                    return false;
                }
            },
            PREV:{
                onClick:function(profile, e, src){
                    return profile.box._click(profile,src);
                }
            },
            CUR:{
                onClick:function(profile, e, src){
                    return profile.box._click(profile,src);
                }
            },
            NEXT:{
                onClick:function(profile, e, src){
                    return profile.box._click(profile,src);
                }
            },
            NEXTM:{
                onClick:function(profile, e){return !!linb.Event.getKey(e)[2]},
                onMousedown:function(profile, e, src){
                    profile.box._show(profile,e,src,1);
                    return false;
                }
            },
            LAST:{
                onClick:function(profile, e, src){
                    return profile.box._click(profile,src);
                }
            }
        },
        DataModel:{
            dataField:null,
            dataBinder:null,

            caption:' Page: ',
            value:"1:1:1",
            uriTpl:"#*",
            textTpl:"*",
            prevMark:'&lt;',
            nextMark:'&gt;',
            _moreStep:100,

            tabindex:{
                action:function(value){
                    if(this.domNode)
                        this.root.query('a').attr('tabIndex',value);
                }
            }
        },
        EventHandlers:{
            onClick:function(profile, src){}
        },
        _ensureValue:function(profile,value){
            var a = value.split(':'),
                b=[],
                fun=function(a){return parseInt(a)||1};
            b[0]=fun(a[0]);
            b[1]=fun(a[1]);
            b[2]=fun(a[2]);

            b[0] = Math.max(b[0],1);
            b[0] = Math.min(b[0],b[1]);
            b[2] = Math.max(b[1],b[2]);

            return b.join(':');
        },
        _v2a:function(v){
            v = typeof v == 'string'? v.split(':') : v;
            v[0]=parseInt(v[0]);v[1]=parseInt(v[1]);v[2]=parseInt(v[2]);
            return v;
        },
        _click:function(profile, src){
            var r = profile.boxing().onClick(profile, src);
            return typeof r=="boolean"?r:false;
        },
        _show:function(profile, e, src, flag){
            var prop = profile.properties,
                arr = profile.box._v2a(prop.value),
                min=arr[0],
                cur=arr[1],
                max=arr[2],

                keys = profile.keys,
                fun = function(p,k){return p.getSubNode(k)},
                pool = fun(profile, 'POOL'),
                pop = fun(profile, 'POP'),
                ceil = function(n){return Math.ceil((n+1)/10)*10},
                a=[],
                t,m,n,i,l
                ;

            if(flag){
                if((t=max-1-cur)<=0)return;
                n=cur + 1;
                l=max;
            }else{
                if((t=cur-1-min)<=0)return;
                n=1;
                l=cur-1;
            }
            m=Math.ceil(t/prop._moreStep);
            if(m>10){
                n=ceil(n);
                l=ceil(l)-1;
                m=ceil(m);
            }else
                n=n+m;
            while(n<l){
                a.push('<a href="'+prop.uriTpl.replace('*',n)+'">'+prop.textTpl.replace('*',n)+'</a>')
                n=n+m;
            }
            pop.width('auto');
            pop.html(a.join(' '));
            linb('body').append(pop);
            if(pop.width()>300)pop.width(300);
            pop.popToTop(src);
            pop.setBlurTrigger(profile.key+":"+profile.$id, function(){
                pool.append(pop);
            });
        }
    }
});
