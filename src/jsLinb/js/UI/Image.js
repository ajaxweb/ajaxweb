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
Class("linb.UI.Image", "linb.UI",{
    Instance:{
        getRate:function(){
            return parseFloat(this.get(0)._rate) || 1;
        }
    },
    Static:{
        Templates:{
            tagName:'image',
            style:'{_style}',
            border:"0",
            width:"{width}",
            height:"{height}"
        },
        Behaviors:{
            HoverEffected:{KEY:'KEY'},
            ClickEffected:{KEY:'KEY'},
            DragableKeys:["KEY"],
            onError:function(profile, e, src){
                profile.boxing().onError(profile);
            },
            onLoad:function(profile, e, src){
                var i=new Image(), path=i.src=src.src,
                    size=profile.box._adjust(profile,i.width,i.height);
                profile.boxing().afterLoad(profile, path, size[0], size[1]);
            }
        },
        RenderTrigger:function(){
            var self=this, pro=self.properties, v=pro.src;
            if(v){
                pro.value=pro.$UIvalue='';
                self.boxing().setSrc(v,true);
            }
        },
        EventHandlers:{
            onError:function(profile){},
            beforeLoad:function(profile){},
            afterLoad:function(profile, path, width, height){}
        },
        _adjust:function(profile,width,height){
            var pro=profile.properties,
                src=profile.getRootNode();
            if(width>0 && height>0){
                var r1=pro.maxWidth/width, r2=pro.maxHeight/height,r= r1<r2?r1:r2;
                if(r>=1)r=1;
                profile._rate=r;
                src.width=width*r;
                src.height=height*r;
                return [width*r, height*r];
            }
            return [0,0];
        },
        DataModel:{
            maxWidth:{
                ini:800,
                action:function(v){
                    var src=this.getRootNode();
                    this.box._adjust(this,src.width,src.height);
                }
            },
            maxHeight:{
                ini:600,
                action:function(v){
                    var src=this.getRootNode();
                    this.box._adjust(this,src.width,src.height);
                }
            },
            width:{
                ini:'auto',
                action:function(v){
                    var src=this.getRootNode();
                    src.width=v;
                }
            },
            height:{
                ini:'auto',
                action:function(v){
                    var src=this.getRootNode();
                    src.height=v;
                }
            },

            src:{
                //use asyn mode
                action:function(v){
                    var self=this;
                    if(false!==self.boxing().beforeLoad(this))
                        _.asyRun(function(){self.root.attr({width:'0',height:'0',src:v})});
                }
            }
        }
    }
});
