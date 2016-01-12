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
Class('linb.Debugger', null, {
    Static:{
        $time:_(),
        _id1:'linb:dbg::_frm',
        _id4:'linb:dbg::_head',
        _id2:'linb:dbg::_con',
        _id3:'linb:dbg::_inp',
        err:function(sMsg,sUrl,sLine){
            if(linb.browser.gek && sMsg=='Error loading script')
                return true;
            linb.Debugger.log( '*** An error raised ***', ' >> Location: '+ sUrl + ' ( line ' + sLine + ' )', ' >> Message: '+sMsg);
        },
        trace:function(obj){
            var args=arguments,
                fun=args[1]||arguments.callee.caller,
                arr=args[2]||[];
            if(fun){
                arr.push('function "' + (fun.$name$||'') + '" in Class "' + (fun.$original$||'') +'"');
                if(fun.caller){
                    try{
                        arguments.callee(null,fun.caller,arr,1);
                    }catch(e){}
                }
            }
            if(!args[3]){
                var a=[];
                a.push(' >> Object Info:');
                if(typeof obj == 'object')
                    for(var i in obj)
                        a.push(' -- ' + i + " : " + obj[i]);
                else
                    a.push(obj);
                a.push(' >> Function Trace: ' + arr.join(' <= '));
                linb.Debugger.log.apply(linb.Debugger,a);
            }
        },
        log:function(){
            var t1,t2,time,self=this,arr=arguments,str;
            if(!arr.length)return;

            t1 = document.createElement("div");
            t2 = document.createElement("div");
            t2.className='linb-dbg-con1';
            time=_();
            t2.appendChild(document.createTextNode('Time stamp : '+time +'('+(time-self.$time)+')' ));
            self.$time=time;
            t1.appendChild(t2);
            for(var i=0,l=arr.length;i<l;i++){
                str=arr[i];
                t2 = document.createElement("div");
                t2.className='linb-dbg-con2';
                t2.appendChild(document.createTextNode(" "+_.serialize(_.isArguments(str)?_.toArr(str):str)));
                t1.appendChild(t2);
            }

            if(!linb.Dom.byId(self._id2)){
                var ns=linb.create('<div id='+self._id1+' style="left:5px;top:'+(linb.win.scrollTop()+5)+'px;" class="linb-dbg-frm"><div class="linb-dbg-box"><div id='+self._id4+' class="linb-dbg-header">&nbsp;&nbsp;:&nbsp;)&nbsp;&nbsp;jsLINB Debug Window <span class="linb-dbg-cmds"><a href="javascript:;" onclick="linb(\''+self._id2+'\').empty(false);">Clear</a><a href="javascript:;" onclick="linb(\''+self._id1+'\').remove();"> &Chi; </a></span></div><div id='+self._id2+' class="linb-dbg-content"></div><div class="linb-dbg-tail"><table><tr><td style="font-family:serif;">&nbsp;>>>&nbsp;</td><td style="width:100%"><input id='+self._id3+' /></td></tr></table></div></div></div>');
                linb('body').append(ns);
                self.$con=linb(self._id2);
                linb(self._id4).onMousedown(function(p,e){
                    if(linb.Event.getSrc(e)!=this)return;
                    linb(this).parent(2).startDrag(e);
                });

                if(linb.browser.ie6)ns.height(ns.offsetHeight());
                if(ns.addShadow)ns.addShadow();
                var bak='',temp;
                linb(self._id3).onKeydown(function(p,e,s){
                    var k=linb.Event.getKey(e)[0];
                    if(k=='enter'){
                        switch(s.value){
                            case '?':
                            case 'help':
                                self.$con.append(linb.create("<div class='linb-dbg-con3'><p><strong>vailable commands:</strong></p><ul><li> -- <strong>[clr]</strong> or <strong>[clear]</strong> : clears the message</li><li> -- <strong>[?]</strong> or <strong>[help]</strong> : shows this message</li><li> -- <strong>any other</strong>: shows its string representation</li></ul></div>"));
                                break;
                            case 'clr':
                            case 'clear':
                                linb(self._id2).empty();
                                break;
                            default:
                                try{
                                    temp=s.value;
                                    if(/^\s*\x7b/.test(temp))temp='('+temp+')';
                                    self.log(eval(temp));
                                }catch(e){self.$con.append(linb.create("<div  class='linb-dbg-con4'>"+String(e)+"</div>"));return;}
                        }
                        bak=s.value;
                        s.value='';
                    }else if(k=='up'||k=='down'){
                        var a=s.value;
                        s.value=bak||'';
                        bak=a;
                    }
                });
            }
            self.$con.append(t1).scrollTop(self.$con.scrollHeight());
        }
    },
    Initialize:function(){
        //window.onerror=(linb.browser.gek && window.console)?null:this.err;

        linb.CSS.addStyleSheet(
            '.linb-dbg-frm{position:absolute;width:300px;z-index:2000;}'+
            '.linb-dbg-header{cursor:move;height:18px;padding-top:2px;position:relative;border-bottom:solid 1px #CCC;background-color:#FFAB3F;font-weight:bold;}'+
            '.linb-dbg-cmds{position:absolute;right:2px;top:2px;}'+
            '.linb-dbg-cmds a{margin:2px;}'+
            '.linb-dbg-box{position:relative;overflow:hidden;border:solid 1px #AAA;}'+
            '.linb-dbg-content{position:relative;width:100%;overflow:auto;height:300px;background:#fff;}'+
            '.linb-dbg-con1{background-color:#CCC}'+
            '.linb-dbg-con2{padding-left:6px;border-bottom:dashed 1px #CCC}'+
            '.linb-dbg-con3{padding-left:6px;border-bottom:dashed 1px #CCC;background:#EEE;color:#0000ff;}'+
            '.linb-dbg-con4{padding-left:6px;border-bottom:dashed 1px #CCC;background:#EEE;color:#ff0000;}'+
            '.linb-dbg-tail{overflow:hidden;position:relative;border-top:solid 1px #CCC;height:16px;background:#fff;color:#0000ff;}'+
            '.linb-dbg-tail input{width:100%;border:0;background:transparent;}'
        ,this.KEY);
        //fix ie6:

        //shorcut
        linb.log = function(){
            if(linb.browser.gek && window.console)
                console.log.apply(console,arguments);
            linb.Debugger.log.apply(linb.Debugger,arguments);
        };
        linb.message = function(body, head, width, time){
           width = width || 200;
           if(linb.browser.ie)width=width+(width%2);
           var div, h, me=arguments.callee,
           stack=me.stack||(me.stack=[]),
           t=linb.win, left = t.scrollLeft() + t.width()/2 - width/2, height=t.height(), st=t.scrollTop();

           if(!(div=stack.pop())){
               div =
               '<div style="font-size:0;line-height:0;border:solid 1px #cdcdcd;position:absolute;overflow:visible;top:-50px;z-index:'+linb.Dom.TOP_ZINDEX+'; background:#fefefe">' +
               '<div style="font-size:14px;overflow:hidden;font-weight:bold;padding:2px;"></div>'+
               '<div style="padding:5px;overflow:hidden;"></div>'+
               '</div>';
               div = linb.create(div);
               if(div.addBorder)div.addBorder();
               linb('body').append(div);
            }
            div.css({left:left+'px', width:width+'px', visibility:'visible'})
            .first().html(head||'')
            .next().html(body||'');

            if(me.last && div!=me.last){
                var l=me.last.left();
                me.last.animate({left:[l,l+(me.last.width+width)/2+20]},null,null,100,5).start();
            }
            me.last = div;
            me.last.width = width;

            //height() is ok
            h = div.height();

            if(linb.browser.ie6)div.cssSize({ height :h, width :width+2});

            div.animate({top:[st-h-20,st+20]},null,null,100,5,'outexp').start();
            _.asyRun(function(){
                div.animate({top:[st+20, height+20]},null,function(){stack.push(div); div.hide()},100,10).start();
            }, time||5000);
        };
    }
});
