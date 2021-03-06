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
Class("linb.UI.LinkList", ["linb.UI.List"],{
    Initialize:function(){
        //modify default template fro shell
        var t = this.getTemplate();
        t.$dynamic={
            items:{
                ITEM:{
                    className:'{itemClass}',
                    style:'margin:{itemMargin}px;{itemStyle}',
                    LINK:{
                        $order:1,
                        tagName : 'a',
                        href :"{href1}",
                        tabindex: '{_tabindex}',
                        text:'{caption}'
                    }
                }
            }
        };
        this.setTemplate(t);
    },
    Static:{
        Appearances:{
            ITEMS:{
                position:'relative',
                overflow:'auto',
                'overflow-x': (linb.browser.ie || linb.browser.gek)?'hidden':''
            },
            ITEM:{
                'vertical-align':'middle',
                position:'relative',
                background: linb.UI.$bg('cmds.gif', ' no-repeat left -202px', true),
                'border-right':'solid 1px #C2C1C1',
                height:'16px',
                'white-space':'nowrap'
            },
            'ITEM-mouseover':{},
            'ITEM-checked':{},
            LINK:{
                display:linb.$inlineBlock,
                zoom:linb.browser.ie6?1:null,
                'vertical-align':'middle',
                padding:'1pt 4px 1pt 12px'
            }
        },
        DataModel:({
            itemMargin:{
                ini:0,
                action:function(value){
                    this.getSubNode('ITEM',true).css('margin',value+'px');
                }
            },
            tabindex:{
                action:function(value){
                    var self=this,
                        keys = self.keys,
                        fun = function(l,v){self.getSubNode(l,true).attr('tabIndex',v)}
                    if(self.domNode)
                        fun('LINK', value);
                }
            }
        }),
        Behaviors:{
            ITEM:{onClick:null,onKeydown:null},
            LINK:{
                onClick:function(profile, e){return !!linb.Event.getKey(e)[2]},
                onMousedown:function(profile, e, src){
                    if(linb.Event.getBtn(e)!='left')return;
                    var properties = profile.properties,
                        item = profile.getItemByDom(src),
                        box = profile.boxing();
                    if(properties.disabled|| item.disabled)return false;
                        box.onItemClick(profile, item, src);
                }
            }
        },
        EventHandlers:{
            onItemSelected:null,
            onItemClick:function(profile, item, src){}
        },
        _prepareItem:function(profile, item){
            var p = profile.properties;
            item._tabindex = p.tabindex;
            item.itemMargin = p.itemMargin;
        }
    }
});
