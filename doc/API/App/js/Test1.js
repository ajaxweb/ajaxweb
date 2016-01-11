Class('App.Test1', 'linb.Com',{
    Instance:{
        showDlg:function(){
            if(this.properties.dlgCaption)
                this.dlg.setCaption(this.properties.dlgCaption);
            this.dlg.show();
        },
        events:{
            beforeCreated : function(com){
            },
            onReady : function(com){
            }
        },
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var t=this, n=[], u=linb.UI, f=function(c){n.push(c.get(0))};
            f(
            (new u.Dialog)
            .host(t,"dlg")
            .setCaption("From 'App.Test1; class!")
            .setTop(100)
            .setLeft(100)
            );
            return n;
            // ]]code created by jsLinb UI Builder
        }
    }
});