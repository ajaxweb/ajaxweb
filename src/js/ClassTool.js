Class('VisualJS.ClassTool',null,{
    Static:{
        getClassName:function(str){
            var reg = new RegExp("^(\\s*\\/\\*[^*@]*\\*+([^\\/][^*]*\\*+)*\\/\\s*)|^(\\s*\\/\\/[^\\n]*\\s*)");
            while(reg.test(str))
                str = str.replace(reg,'');
            var match=/^\s*Class\s*\(\s*[\'\"]([^\'\"]+)[\'\"]\s*\,/.exec(str);
            return (match && match[1]);
        },
        //get class object from a Class declare, include comments words
        getClassObject : function(str){
//set try out
//            try{
            str = str.slice(str.indexOf('{')+1, str.lastIndexOf('}'));
            var obj = eval('({'+str+'})');
            return obj;
//            }catch(e){linb.message(linb.getRes('VisualJS.classtool.err1'))+":"+String(e);return false}
        },
        getCodeFromStruct:function(o){
            try{
                var self = arguments.callee, arr=[];
                if(o){
                    if(o.sub){
                        if(o.frame){
                            _.each(o.sub,function(o,i){
                                if(!_.isNull(o.comments))
                                    arr.push((o.comments ||'') + i + ':' + (o.code?o.code:o.sub?self.call(this,o):''));
                            },this);
                            return o.frame.replace('*1', o.name||'').replace('*2', o.pname||'').replace('*3', arr.join(', ').replace(/\$/g,'$$$'));
                        }else return '';
                    }else
                        return (o.code ||'').replace(/^[\r\n]*/, '');
                }else return '';
            }catch(e){linb.message(linb.getRes('VisualJS.classtool.err2'))+":"+String(e);return false}
        },
        parseSingleBlock:function(txt){
            try{
                var reg1 = new RegExp("^(\\s*\\/\\*[^*@]*\\*+([^\\/][^*]*\\*+)*\\/\\s*)|^(\\s*\\/\\/[^\\n]*\\s*)"),
                    reg2 = new RegExp("(\\s*\\/\\*[^*@]*\\*+([^\\/][^*]*\\*+)*\\/\\s*)|^(\\s*\\/\\/[^\\n]*\\s*)$"),
                    str,
                    comments,
                    code;

                while(reg2.test(txt))
                    txt = txt.replace(reg2,'');

                str = txt;
                while(reg1.test(str))
                    str = str.replace(reg1,'');

                str = str.replace(/\s*/,'');
                if(!str)return {comments:null, code:null};

                comments = '\n'+txt.replace(str,'');
                code = str.replace(/\s*$/,'');

                //comments/reg
                str = linb.Coder.replace(str, [
                    ["(^|\\n)\\s*\\/\\*[^*@]*\\*+([^\\/][^*]*\\*+)*\\/\\s*", ''],
                    ["\\n\\s*\\/\\/[^\\n]*\\s*", ''],
                    [/([^\w\x24\/\'\"*)\]\?:]\s*)(\/(\\[\/\\]|[^*\/])(\\.|[^\/\n\\])*\/[gim]*)\s*([\)\}\]:,;\r\n])/.source,function(arg,i){
                        return str[i+1]+ str[i+5];
                    }]
                ]);

                code = code.replace(/([}\]])[^}\]]*$/,'$1');

                //check it's a single block
                //in '' or ""
                str = linb.Coder.replace(code, [
            		["'(\\\\.|[^'\\\\])*'", ''],
            		['"(\\\\.|[^"\\\\])*"', '']
                ]);

                while(/(\{([^\{\}]*)\})|(\[([^\[\]]*)\])/.test(str)){
                    str = str.replace(/\s*(((function\s*([\w$]+\s*)?\(\s*([\w$\s,]*)\s*\)\s*)?(\{([^\{\}]*)\}))|(\[([^\[\]]*)\]))/g, '');
                }
                if (_.str.trim(str)!='') return false;

                return {comments: comments, code:code};
            }catch(e){linb.message(linb.getRes('VisualJS.classtool.err3')+":"+String(e));return false}
        },
        //get class struct from a Class declare, include comments words
        getClassStruct : function(str){
//set try out
//            try{
                str = str.replace(/(\r\n|\r)/g, "\n").replace(/( +)(\n)/g, "$2").replace(/\t/g, "    ");

                //clear mash
                var t,
                    index=1,
                    index1=1,
                    cache={},
                    cache1={},
                    result,
                    result2,
                    code = function(str,i) {
                		var ret = "#" + (index++) +"#";
                		cache[ret] = str[0];
                		return ret;
                	},
                	//special for regexp source string
                    _code = function(str,i) {
                        var ret = "#" + (index++) +"#";
                		cache[ret] = str[i+2];
                		return str[i+1]+ret+str[i+5];
                	},
                	code1 = function(str) {
                		var ret = "`" + (index1++);
                		cache1[ret] = str[0];
                		return ret;
                	},
                	restore = function(str){
                    	return str.replace(/#(\d+)#/g, function(m){
                    		return cache[m];
                    	});
                    },
                	restore1 = function(str){
                    	return str.replace(/`(\d+)/g, function(m){
                    		return cache1[m];
                    	});
                    };

                str = linb.Coder.replace(str, [
                    ["(^|\\n)\\s*\\/\\*[^*@]*\\*+([^\\/][^*]*\\*+)*\\/[^\\n]*", code],
                    ["(^|\\n)\\s*\\/\\/[^\\n]*", code],
                    [/([^\w\x24\/\'\"*)\]\?:]\s*)(\/(\\[\/\\]|[^*\/])(\\.|[^\/\n\\])*\/[gim]*)\s*([\)\}\]:,;\r\n])/g.source,_code]
                ]);

                str = linb.Coder.replace(str, [
            		["'(\\\\.|[^'\\\\])*'", code1],
            		['"(\\\\.|[^"\\\\])*"', code1]
                ]);

                var frame = str.replace(/(^[^{]*\{)\s*((.|[\r\n])*)([^\s])(\s*}[^}]*$)/,'$1*3$5').replace(/(#\d+#)+/g,''),
                    o = {sub:{}};

                if(t=str.match(/^((#\d+#)+)/))
                    o.comments = restore(t[0]);
                else o.comments = '';

                t =  str.split(',');
                o.name = restore1(cache1['`1'].replace(/[\'\" ]*/g,''));
                o.pname =  restore(restore1(t[1]).replace(/[\'\" ]*/g,''));
                o.frame = restore1(frame.replace(o.name,'*1').replace(o.pname,'*2'));

                str = str.slice(str.indexOf('{')+1, str.lastIndexOf('}'));

                result = o.sub;

                //get {}
                var index2=1,
                    cache2={},
                    code2 = function(str) {
                		var ret = "'~" + index2++ +"'";
                		cache2[ret] = str;
                		return ret;
                	},
                    code3 = function(a,b,str) {
                        if(a.indexOf('~')!=-1)return a;

                		var ret = "'~" + index2++ +"'";
                		cache2[ret] = str;
                		return b + ret;
                	},
                	restore2 = function(str){
                        if(str.indexOf('~')==-1)return str;

                        str = cache2["'"+str+"'"];
                        while(/'~\d+'/.test(str))
                            str = str.replace(/'~\d+'/g, function(m){
                    		    return cache2[m];
                    	    });
                    	return str;
                    };

                while(/(\{([^\{\}]*)\})|(\[([^\[\]]*)\])/.test(str)){
                    str = str.replace(/\s*(((function\s*([\w$]+\s*)?\(\s*([\w$\s,]*)\s*\)\s*)?(\{([^\{\}\[\]]*)\}))|(\[([^\[\]\{\}]*)\]))/g, code2);
                }

                // handler any \s for comments
                str = linb.Coder.replace(str, ['\\s+', code]);

                //get comments first , 'Constructor', 'Initialize', 'Before', 'After', 'Instance', 'Static'
                str = str.replace(/((#\d+#)+)([\w]+)((#\d+#)*):/g, function(z,a,b,c){
                    result[c] = {comments: restore(a)};
                    return c+':';
                });
                str = str.replace(/(#\d+#)/g, '');

                var obj = eval('({' + str + '})');
                //get code of those
                _.arr.each(['Constructor', 'Initialize', 'Before', 'After'],function(i){
                    if(obj[i]){
                        result[i] = result[i] || {};
                        result[i].code = restore(restore1(restore2(obj[i])));
                    }else
                        result[i] = {};
                    _.arr.each(_.toArr('code,comments'),function(j){
                        result[i][j] = _.exists(result[i][j])?result[i][j]:null;
                    });
                });

                var obj2;
                _.arr.each(['Instance', 'Static'],function(i){
                    if(obj[i]){
                        //for not function/{}/[] vars
                        var temp = cache2["'"+obj[i]+"'"];
                        var frame = temp.replace(/(^[^{]*\{)\s*((.|[\r\n])*)([^\s])(\s*}[^}]*$)/,'$1*3$5');
                        //delete the last comment
                        temp = temp.replace(/(#\d+#)*\s*(\})$/g, '$2');

                        temp = '(' + temp + ')';

                        // handler any \s for comments
                        temp = linb.Coder.replace(temp, ['\\s+', code]);

                        result[i] = result[i] || {};
                        result2 = result[i].sub = {};
                        result[i].frame = frame;

                        temp = temp.replace(/(:)([^,\}]+)/g, code3);
                        temp = restore1(temp);

                        //get comments first
                        temp = temp.replace(/((#\d+#)+)([\w]+)((#\d+#)*):/g, function(z,a,b,c){
                            result2[c] = {comments: restore(a)};
                            return c+':';
                        });
                        //for multi comments
                        temp = temp.replace(/(#\d+#)/g, '');

                        obj2 = eval(temp);
                        _.each(obj2,function(o,j){
                            result2[j] = result2[j] || {};
                            result2[j].code = restore(restore1(restore2(o)));
                        });
                    }else
                        result[i] = {};
                    _.arr.each(_.toArr('code,comments,sub,frame'),function(j){
                        result[i][j] = _.exists(result[i][j])?result[i][j]:null;
                    });
                });

                return o;
//            }catch(e){linb.message(linb.getRes('VisualJS.classtool.err4'))+":"+String(e);return false}
        }
    }
});