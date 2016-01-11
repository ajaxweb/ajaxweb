Class("linb.UI.Block", "linb.UI.Widget",{
    Initialize:function(){
        var self=this,
            t = self.getTemplate();
        //modify
        _.merge(t.FRAME.BORDER,{
            PANEL:{
                tagName:'div',
                className:'ui-content',
                text:'{html}'+linb.UI.$childTag
            }
        },'all');
        //set back
        self.setTemplate(t);

        //get default Appearance
        t = self.getAppearance();
        //modify
        _.merge(t,{
            PANEL:{
                position:'absolute',
                left:0,
                top:0,
                overflow:'auto'
            }
        });
        //set back
        self.setAppearance(t);
    },
    Static:{
        Behaviors:{
            DropableKeys:['PANEL']
        },
        DataModel:{
            //delete those properties
            disabled:null,
            tips:null,
            html:{
                action:function(v){
                    this.getSubNode('PANEL').html(v);
                }
            },

            width:100,
            height:100
        },
        _onresize:function(profile,width,height){
            var size = arguments.callee.upper.apply(this,arguments);
            profile.getSubNode('PANEL').cssSize(size,true);
        }
    }
});

