
Class('VisualJS.PageEditor', 'linb.Com',{
    Instance:{
        events:{
            onReady:function(page){
                page.setValue(page.properties.text);
           },
           onRender:function(page){
                if(page.$checkType!='js')
                    page.toolbar.showItem('check',false);
           }
        },
        eval2:function(txt){
            if(typeof txt!='string' || !txt){
                alert('No conent!');
                return false;
            }
            var r=true,
                iframe = document.createElement("iframe");
            iframe.style.display = "none";
            document.body.appendChild(iframe);
            frames[frames.length - 1].document.write(
                "<script>"+
                "var Class=parent._.fun.clone(parent.Class,null,10), _=parent._.clone(parent._,null,10), linb=parent._.clone(parent.linb,null,10);"+
                "var MSIE/*@cc_on =1@*/;"+
                "parent.sandbox=MSIE?this:{eval:function(s){return eval(s)}}"+
                "<\/script>"
            );
            txt=_.str.trim(txt);
            if((txt.charAt(0)=='{' || txt.slice(0,8)=='function') && txt.charAt(txt.length-1)=='}')
                txt='('+txt+')';
            try{
                sandbox.eval(txt);
            }catch(e){
                var line=e.line||e.lineNumber;
                alert((e.name?e.name+' : ':'') + (e.description||e.message||'') + (line?'\n line : '+line:'') );

                if(_.isNumb(line=parseInt(line))){
                    var inp=this.texteditor.getSubNode('INPUT').get(0),
                    str=inp.value,
                    l=str.length,
                    count=0,
                    from=0,
                    to=l;
                	for(var i=0;i<l;i++){
                		if(str.charAt(i)=='\n')
                		    count++;
                		if(count==line-1){
                		    count++;
                		    from=i;
                		}
                		if(count==line+1){
                		    to=i;
                		    break;
                		}
                	}
                	_.asyRun(function(){
                	    linb([inp]).caret(from+1,to);
                	    inp.scrollTop = from*14-inp.offsetHeight;
                    });
                }
                r=false;
            }finally{
                document.body.removeChild(iframe);
            }
            return r;
        },
        check:function(txt){
            switch(this.$checkType){
                case 'js':
                    return this.eval2(txt);
                break;
            }
            return true;
        },

        getValue:function(resetBak, forceCheck){
            var self=this,
                txt = self.texteditor.getUIValue().replace(/\r\n/g,'\n');
            if(self.$bakValue != txt || forceCheck){
                if(self.check(txt)===false)
                    return false;

                if(resetBak)
                    self.$bakValue = txt;
                return txt;
            }else
                return self.$bakValue;
        },
        activate:function(){
            this.texteditor.activate();
        },
        setReadonly:function(b){
            this.texteditor.setReadonly(b);
        },
        setValue:function(txt){
            var self=this;
            txt = (txt||'').replace(/\r\n/g,'\n');

            self.$bakValue=txt;
            self.texteditor.setValue(txt,true);
            return self;
        },
        refreshView:function(txt){
            var self=this;
            if(self.$data.text!=self.getValue())
                self.setValue(self.$data.text);
            return self;
        },
        _texteditor_onChange:function(profile, oV, nV){
            var self=this;
           _.tryF(self.events.onValueChanged, [self, profile, self.$bakValue!==nV, nV], self.host);
        },
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var t=this, n=[], u=linb.UI, f=function(c){n.push(c.get(0))};

            f(
            (new u.Pane)
            .host(t,"panel")
            .setDock("fill")
            );

            t.panel.append(
            (new u.ToolBar)
            .host(t,"toolbar")
            .setItems([{"id":"only","sub":[{"id":"format","caption":"$VisualJS.pageEditor.format","image":'@CONF.img_app',"imagePos":"-32px -48px","type":"button","tips":"$VisualJS.pageEditor.formattips"},{"id":"check","caption":"$VisualJS.pageEditor.check","image":'@CONF.img_app',"imagePos":"0 -48px","type":"button","tips":"$VisualJS.pageEditor.checktips"}]}])
            .onClick("_toolbar_onclick")
            );

            t.panel.append(
            (new u.TextEditor)
            .host(t,"texteditor")
            .setDock("fill")
            .onChange("_texteditor_onChange")
            );

            return n;
            // ]]code created by jsLinb UI Builder
        }
        ,_toolbar_onclick: function(profile, item){
            var self=this;
            switch(item.id){
                case 'format':
                    var code=linb.Coder.formatHTML(self.texteditor.getUIValue(), self.$checkType,['plain']),                    
            	        dialog = self.$codeDlg || (self.$codeDlg=new linb.UI.Dialog({left:100,top:100,width:600,height:400,minBtn:false,caption:'$VisualJS.pageEditor.formatted'},{beforeClose:function(p){p.boxing().hide();return false}}));
            	    dialog.setHtml(code);
                    dialog.show(linb('body'),true);
                    break;
                case 'check':
                    var txt = self.getValue();
                    if(txt!==false)
                        linb.message(linb.getRes('VisualJS.checkOK'));
                    break;
            }
        }
    }
});