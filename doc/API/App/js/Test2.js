Class('App.Test2', 'linb.Com',{
    Instance:{
        properties:{
            pro1:'pro1'
        },
        iniComponents:function(){
            return (new linb.UI.Dialog({
                caption:"From 'App.Test2; class!"
            })).get();
        }
    }
});