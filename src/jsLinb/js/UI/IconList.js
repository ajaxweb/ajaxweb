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
Class("linb.UI.IconList", "linb.UI.List",{
    Instance:{
        getStatus:function(id){
            var item=this.get(0).getItemByItemId(id);
            return (item && item._status)||'ini';
        }
    },
    Initialize:function(){
        //modify default template fro shell
        var t = this.getTemplate();
        t.$dynamic={
            items:{
                ITEM:{
                    className:'{itemClass}',
                    style:'padding:{itemPadding}px;margin:{itemMargin}px;{itemStyle}',
                    //for firefox2 image in -moz-inline-box cant change height bug
                    IBWRAP:{
                        tagName:'div',
                        IMAGE:{
                            tagName:'img',
                            src:'{image}',
                            width:'{itemWidth}',
                            height:'{itemHeight}'
                        }
                    }
                }
            }
        };
        this.setTemplate(t);
    },
    Static:{
        Appearances:{
            KEY:{
                overflow:'auto',
                'overflow-x': (linb.browser.ie || linb.browser.gek)?'hidden':''
            },
            ITEMS:{
                overflow:'auto',
                'overflow-x': (linb.browser.ie || linb.browser.gek)?'hidden':'',
                position:'relative',
                'line-height':'14px',
                zoom:linb.browser.ie6?1:null,
                background: 'url('+linb.ini.file_bg+') no-repeat left top'
            },
            ITEM:{
                display:linb.$inlineBlock,
                zoom:linb.browser.ie6?1:null,
                position:'relative',
                overflow:'hidden',
                cursor:'pointer',
                'vertical-align':'top'
            },
            IMAGE:{
                border:'1px solid #CDCDCD'
            }
        },
        Behaviors:{
            IMAGE:{
                onLoad:function(profile,e,src){
                    var item=profile.getItemByDom(src);
                    item._status='loaded';
                },
                onError:function(profile,e,src){
                    var item=profile.getItemByDom(src);
                    item._status='error';
                }
            }
        },
        DataModel:({
            itemMargin:{
                ini:6,
                action:function(v){
                    if(typeof v!='object')
                        this.getSubNode('ITEM',true).css('margin',(''+parseFloat(v))==(''+v)?v+'px':v);
                    else
                        this.getSubNode('ITEM',true).css(v);
                }
            },
            itemPadding:{
                ini:2,
                action:function(v){
                    if(typeof v!='object')
                        this.getSubNode('ITEM',true).css('padding',(''+parseFloat(v))==(''+v)?v+'px':v);
                    else
                        this.getSubNode('ITEM',true).css(v);
                }
            },
            itemWidth:{
                ini:16,
                action:function(v){
                    this.getSubNode('IMAGE',true).width(v);
                }
            },
            itemHeight:{
                ini:16,
                action:function(v){
                    this.getSubNode('IMAGE',true).height(v);
                }
            },
            tabindex:{
                action:function(value){
                    if(this.domNode)
                        this.getSubNode('ITEM',true).attr('tabIndex',value);
                }
            },
            width:200,
            height:200
        }),
        _prepareItem:function(profile, item){
            var p = profile.properties;
            _.arr.each(_.toArr('itemWidth,itemHeight,itemPadding,itemMargin'),function(i){
                item[i] = item[i] || p[i];
            });
            item._tabindex = p.tabindex;
        },
        _onresize:function(){}
    }
});
