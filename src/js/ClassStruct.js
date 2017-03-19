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
Class('VisualJS.ClassStruct', 'linb.Com',{
    Instance:{
        $PageEditor:null,
        $curBlock:null, 
        $bakValue:null,
        $bakCurCode:null,
        
        iniExComs:function(com, threadid){
            var self=this;
            linb.ComFactory.newCom('VisualJS.PageEditor',function(){
                var inn=this;
                inn.host = self;
                inn.$data={text:''};
                inn.$checkType='js';

                inn.setEvents('onValueChanged',function(ipagprofile, e, b){
                    _.tryF(self.events.onValueChanged, [ipagprofile, e, b], self.host);
                });
                inn.create(function(o,threadid){
                    self.layoutFill.append(inn.getUIComponents(),'main');
                },threadid);

                self.$PageEditor=inn;
            },threadid);
        },
        activate:function(){
            this.$PageEditor.activate();
        },
        check:function(txt){
            return this.$PageEditor.check(txt);
        },
        getValue:function(resetBak){
            var self=this,
                data=self.$data,
                r=self.$curBlock,

                txt = self.$PageEditor.getValue();
            if(txt===false)return false;
            //check dirty
            if(data.$bakCurCode != txt){
                if(!self.$readonly){
                    if(false === self.check(txt))
                        return false;
                    //parse comments and code, check code in the process
                    var result = VisualJS.ClassTool.parseSingleBlock(txt);
                    if(false === result){
                        linb.message(linb.getRes('VisualJS.classtool.err1'));
                        return false;
                    }
                    //set back
                    data.$bakCurCode = txt;
    
                    //set back and get new class text
                    r.comments = result.comments;
                    r.code = result.code;
                }

                txt = VisualJS.ClassTool.getCodeFromStruct(data.clsStruct);
                txt=data.clsStruct.comments.replace(/^[\r\n]*/, '') + txt;

                if(resetBak)
                    self.$bakValue = txt;                
                return txt;
            }
            return data.text;
        },
        refreshView:function(){
            var self=this,
                data=self.$data,
                clsStruct = data.clsStruct,
                clsObject = data.clsObject;
                value=self.treebarClass.getUIValue();
            if(self.$bakValue != data.text){
                self.treebarClass.setValue(null,true);
                var items=[
                    {id:'Class',caption:'Class', caption:clsStruct.name, image:'img/App.gif', imagePos:'-16px -48px', group:true, sub:[
                        {id:'Constructor',caption:'Constructor', image:'img/App.gif', imagePos:'-32px -32px'},
                        {id:'Instance',caption:'Instance', image:'img/App.gif', imagePos:'-16px -32px', sub:[]},
                        {id:'Static',caption:'Static',  image:'img/App.gif', imagePos:'-16px -32px', sub:[]},
                        {id:'Initialize',caption:'Initialize', image:'img/App.gif', imagePos:'-32px -32px'},
                        {id:'Before',caption:'Before', image:'img/App.gif', imagePos:'-32px -32px'},
                        {id:'After',caption:'After', image:'img/App.gif', imagePos:'-32px -32px'}
                ]}];
    
                var t=clsStruct.sub,
                    j=items[0].sub,
                    m,icon;
    
                if(t){
                    m=t.Instance;
                    if(m && (m = m.sub)){
                        _.each(m,function(o,i){
                            icon = 'img/App.gif';
                            iconPos = (typeof clsObject.Instance[i] == 'function')?'-32px -32px':'0 -32px';
                            if(_.isHash(clsObject.Instance[i]))icon = 'block.gif';
                            j[1].sub.push({id:'Instance.'+i, caption:i, image:icon, imagePos:iconPos});
                        });
                    }
                    m=t.Static;
                    if(m && (m = m.sub)){
                        _.each(m,function(o,i){
                            icon = (typeof clsObject.Static[i] == 'function')?'function.gif':'property.gif';
                            if(_.isHash(clsObject.Static[i]))icon = 'block.gif';
                            j[2].sub.push({id:'Static.'+i, caption:i,  image:'img/'+icon});
                        });
                    }
                }
    
                //reset
                delete self.$curBlock;
    
                self.treebarClass.setItems(items);
                if(value && self.treebarClass.getItemByItemId(value)){
                    self.treebarClass.selectItem(value);
                    self.$readonly=false;
                }else{
                    self.$PageEditor.setValue(data.text).setReadonly(true);
                    self.$readonly=true;
                }
            }
            return self;
        },
 
        _treebarclass_beforevalueupdated:function(profile, ov, nv){
            var self=this,
                p=self.$PageEditor;
            if(!self.$curBlock)return;

            //get frm $PageEditor
            var txt = p.getValue();
            if(txt===false)return false;
            //check dirty
            if(self.$bakCurCode != txt){
                if(false === self.check(txt))return false;
                //parse comments and code, check code in the process
                var result = VisualJS.ClassTool.parseSingleBlock(txt);
                if(false === result){
                    linb.message(linb.getRes('VisualJS.classtool.err1'));
                    return false;
                }

                //set back and get new class text
                self.$curBlock.comments = result.comments;
                self.$curBlock.code = result.code;
            }
        },
        _treebarclass_onitemselected:function(profile, item, node){
                if(!item.id)return;
                var self=this,
                    data=self.$data,
                    p=self.$PageEditor,
                    value = item.id;
                _.observableRun(function(threadid){
                    var o=data.clsStruct,t,m,arr;
                    var comments, code;
                    switch(value){
                        case 'Class':
                            code = VisualJS.ClassTool.getCodeFromStruct(o);
                            break;
                        case 'Static':
                        case 'Instance':
                        case 'Constructor':
                        case 'Initialize':
                        case 'Before':
                        case 'After':
                            o=o.sub;
                            if(o=o[value]){
                                if(o.sub)code = VisualJS.ClassTool.getCodeFromStruct(o);
                            }
                            break;
                        default:
                            o=o.sub;
                            arr = value.split('.');
                            o=o[arr[0]];
                            o=o.sub;
                            o=o[arr[1]];
                    }
                    comments = (o? (o.comments || '') :'');
                    //delete the first \n first
                    if(comments)comments = comments.replace(/^[\r\n]*/, '');
                    code = code || (o&&o.code) || '';

                    linb.Thread.suspend(threadid);
                    var t = linb([node]).cssRegion(true),
                        pro = p.texteditor.reBoxing().cssRegion(true);

                    linb.Dom.animate({border:'dashed 1px #ff0000'},{left:[t.left,pro.left],top:[t.top,pro.top],width:[t.width,pro.width],height:[t.height,pro.height]}
                        ,null,function(){
                            //keep old value
                            p.setValue(self.$bakCurCode = comments+code).activate();
                            p.setReadonly(self.$readonly = value=='Class' || value=='Instance' || value=='Static')

                        },240,8,'inexp').start();
                    self.$curBlock=o;
                    linb.Thread.resume(threadid);
                });
        },
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var t=this, n=[], u=linb.UI, f=function(c){n.push(c.get(0))};

            f(
            (new u.Layout)
            .host(t,"layoutFill")
            .setLeft(0)
            .setTop(0)
            .setItems([
            {
                "id" : "before",
                "pos" : "before",
                "locked" : false,
                "size" : 150,
                "min" : 50,
                "max" : 200,
                "cmd" : false
            }])
            .setType("horizontal")
            );

            t.layoutFill.append(
            (new u.TreeBar)
            .host(t,"treebarClass")
            .setLeft(0)
            .setTop(0)
            .setGroup(false)
            .setItems([])
            .setIniFold(false)
            .onItemSelected("_treebarclass_onitemselected")
            .beforeUIValueSet("_treebarclass_beforevalueupdated")
            ,'before');
            return n;
            
        }
    }
});

