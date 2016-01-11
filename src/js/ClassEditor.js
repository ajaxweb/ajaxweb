/*
An editor for js jsLinb class
*/
Class('VisualJS.ClassEditor', 'linb.Com',{
    Constructor:function(){
        arguments.callee.upper.apply(this,arguments);
        this.$data={};
        this.views={};
    },
    Instance:{
        $pageviewType:'linb.UI.ButtonViews',
        
        activate:function(){
            var self=this,t;
            var view = self.buttonview.getUIValue();
            if(t=self.views[view])
                t.activate();
        },
        onDestroy:function(){
             _.each(this.views,function(o){
                o.destroy();
            });
        },
        getValue:function(resetBak){
            var view = this.buttonview.getUIValue();
            return this.views[view].getValue(resetBak);
        },

        showPage:function(key){
            //need to trigger beforeUIValueSet
            this.buttonview.setUIValue(key,true);
        },
        setValue:function(txt){
            var self=this,
                data=self.$data,
                $ov;
            txt=(txt||'').replace(/\r\n/g,'\n');

            //get view
            var view = self.buttonview.getUIValue();
            //get current value
            if(self.views[view])
                $ov=self.getValue();

            //set value
            self.$bakValue=data.text=txt;
            if(false==self._adjustData(txt,false))
                view='normal';

            //need to refresh?
            if(self.views[view])
                if($ov!=txt)
                    self.views[view].refreshView();
        },
        _beforeValueUpdated:function(profile, ov, nv){
            var self=this,
                data=self.$data,
                t,str=data.text;
            if(t=self.views[ov]){
                //getvalue and reset the bak value
                var r = t.getValue(true);
                if(r===false)return false;

                if(r!==data.text){
                    if(ov=='normal'){
                        //not a class
                        if(!VisualJS.ClassTool.getClassName(r)){
                            linb.message(linb.getRes('VisualJS.classtool.noClass'));
                            return false;
                        }
                    }
                    if(false===r)
                        return false;
                    data.text=r;
                }
            }
            
            //adjust data
            if(nv=='struct' || nv=='design')
                if(false==self._adjustData(data.text))
                    return false;

            if(!self.views[nv].rendered)
                self.views[nv].render();
            self.views[nv].refreshView();
        },
        _adjustData:function(str, showErr){
            var self=this,
                data=self.$data;
            showErr=showErr!==false;
            try{
                if(!VisualJS.ClassTool.getClassName(str))
                    throw Error(linb.getRes('VisualJS.classtool.noClass'));
                data.clsStruct = VisualJS.ClassTool.getClassStruct(str);
                data.clsObject = VisualJS.ClassTool.getClassObject(str);
                data.text = str;
            }catch(e){
                data.clsStruct = data.clsObject = null;
                if(showErr)
                    linb.message(linb.getRes('VisualJS.classEditor.codeerr',String(e)));
                return false;
            }
        },
        iniExComs:function(com, threadid){
            // [[code created by jsLinb UI Builder
            var self = this,
                data=self.$data,
                children = self._nodes,
                pageview = (new (linb.SC.get(self.$pageviewType)))
                    .host(self,"buttonview")
                    .setItems([{"id":"normal","caption":"$VisualJS.classEditor.nv","image":'@CONF.img_app',"imagePos":"-80px -48px","tips":"$VisualJS.classEditor.nvtips"},{"id":"struct","caption":"$VisualJS.classEditor.sv","image":'@CONF.img_app',"imagePos":"-32px -48px","tips":"$VisualJS.classEditor.svtips"},{"id":"design","caption":"$VisualJS.classEditor.dv","image":'@CONF.img_app',"imagePos":"-192px -48px","tips":"$VisualJS.classEditor.dvtips"}])
                    .beforeUIValueSet("_beforeValueUpdated")

            if(self.$pageviewType=='linb.UI.ButtonViews')
                pageview.setBarSize(28);

            children.push(pageview.get(0));

            linb.ComFactory.newCom('VisualJS.PageEditor',function(threadid){
                var inn=this;
                inn.host = self;
                inn.$data=data;
                inn.$checkType='js';
                inn.setEvents('onValueChanged',function(ipage, profile, b){
                     _.tryF(self.events.onValueChanged, [self, ipage,  (self.$bakValue != data.text) || b], self.host);
                });
                inn.create(function(o,threadid){
                    self.buttonview.append(inn.getUIComponents(),'normal');
                },threadid);
                self.views['normal']=inn
            },threadid);
            linb.ComFactory.newCom('VisualJS.ClassStruct',function(threadid){
                var inn=this;
                inn.host = self;
                inn.$data=data;
                inn.setEvents('onValueChanged',function(ipage, profile, b, r){
                     _.tryF(self.events.onValueChanged, [self, ipage, (self.$bakValue != data.text) || b], self.host);
                });
                inn.create(function(o,threadid){
                    self.buttonview.append(inn.getUIComponents(),'struct');
                },threadid);
                self.views['struct']=inn;
            },threadid);
            linb.ComFactory.newCom('VisualJS.Designer',function(){
                var inn=this;
                inn.host = self;
                inn.$data=data;
                inn.setEvents('onValueChanged',function(ipage, profile, b, r){
                     _.tryF(self.events.onValueChanged, [self, ipage, (self.$bakValue != data.text) || b], self.host);
                });
                inn.create(function(o,threadid){
                    self.buttonview.append(inn.getUIComponents(),'design');
                },threadid);
                self.views['design']=inn;
            },threadid);

        }
    }
});
