/*
jsLinb 2.0
Copyright(c) 2008 Yingbo Li(www.sigmawidgets.com, sigmawidgets.com[at]gmail.com)
Open Source under LGPL (http://www.gnu.org/licenses/lgpl-3.0-standalone.html)
Contact sigmawidgets.com[at]gmail.com for Commercial issues
*/

undefined;
//window.onerror will be redefined in linb.Debugger
//window.onerror=function(){return true};

//time stamp
_=function(){return +new Date()};

/*merge hash from source to target
  target:hash
  source:hash
  type:'all', 'with', 'without'[default], or function <return true will trigger merge>
  return: merged target
*/
_.merge=function(target, source, type){
    var i,f;
    if(typeof type == "function"){
        f=type;
        type='fun';
    }
    switch(type){
        case 'fun':
            for(i in source)if(true===f(source[i],i))target[i]=source[i];
            break;
        case 'all':
            for(i in source)target[i]=source[i];
            break;
        case 'with':
            for(i in source)if(i in target)target[i]=source[i];
            break;
        default:
            for(i in source)if(!(i in target))target[i]=source[i];
    }
    return target;
};
_.merge(_,{
    fun:function(){return function(){}},
    exec:function(script){
        var me=this,
            d=document,
            h=me.h||(me.h=d.getElementsByTagName("head")[0] || d.documentElement),
            s=d.createElement("script");
        s.type = "text/javascript";
        if(linb.browser.ie)
            s.text=script;
        else
            s.appendChild(d.createTextNode(script));
        h.insertBefore(s, h.firstChild);
        h.removeChild(s);
    },
    /*
    get something from deep hash
    hash:target hash
    arr:path array,
    example:
    _.get({a:{b:{c:1}}},['a','b']) => {c:1};
        _.get({a:{b:{c:1}}},['a','b','c']) => 1;
        _.get({a:{b:{c:1}}},['a','b','c','d']) => undefined;
    */
    get:function(hash,arr){
        for(var i=0,l=arr.length;i<l;)
            if(!hash || (hash=hash[arr[i++]])===undefined )return;
        return hash;
    },
    /*
    set/unset a value to deep hash
    example:
        _.set({a:{b:{c:1}}},['a','b','c'],2) => {a:{b:{c:2}}}
        _.set({a:{b:{c:1}}},['a','b','c']) => {a:{b:{}}}
    */
    set:function(hash,arr,value){
        var v,i=0,m,last=arr.length-1,key = arr[last];
        for(;i<last;){
            v=arr[i++];
            if(hash[v]&&((m=typeof hash[v])=='object' || m=='function')) hash=hash[v];
            else hash=hash[v]={};
        }
        if(value===undefined)
            delete hash[key];
        else
            return hash[key]=value;
    },
    /* try to excute a function
    fun:target function
    args:arguments for fun
    scope:[this] pointer for fun
    df:default return vale
    */
    tryF:function(fun, args, scope, df){
        return (fun && typeof fun=='function') ? fun.apply(scope||null, args||[]) : df
    },
    /*asynchronous run function
    fun:target function
    defer: setTimeout defer time
    args: arguments for fun
    scope: [this] pointer for fun
    */
    asyRun:function(fun, defer, args, scope){
        //defer must set in opera
        return setTimeout(typeof fun=='string' ? fun : function(){fun.apply(scope,args||[]);fun=args=null;}, defer||0);
    },
    isEmpty:function(hash){for(var i in hash)return false; return true},

    /*
    this will always run newer function
    key: for identify
    fun: to run
    defer: setTimeout defer time
    args: arguments for fun
    scope: 'this' for fun
    */
    resetRun:function(key, fun, defer ,args, scope){
        var me=arguments.callee, k=key, cache = me.$cache || (me.$cache = {});
        if(cache[k]){clearTimeout(cache[k])}
        if(typeof fun=='function')
            cache[k] = setTimeout(function(){delete cache[k];fun.apply(scope||null,args||[])},defer||0);
        else delete cache[k];
    },
    //Dependency: linb.Dom linb.Thread
    observableRun:function(tasks,onEnd,threadid){
        linb.Thread.observableRun(tasks,onEnd,threadid);
    },

    /*break object memory link
    target: target object
    n: depth, default 1
    */
    breakO:function(target,depth){
        var n=depth||1, l=1+(arguments[2]||0), self=arguments.callee, _t='___gc_',_o=self._o||(self._o={}), i, b, p;
        if(target && (typeof target=='object' || typeof target=='function') && target!==window&&target!==Object&&target!==Date&&target!==Array&&target!==document){
            if(_t in target)return; else try{target[_t]=1;}catch(e){return}
            p=(p=target.constructor)?p.prototype:_o;
            for(i in target)
                if(i!=_t){
                    if(l<n && target[i] && (typeof target[i]=='object' || typeof target[i]=='function'))self(target[i],n,l);
                    if(!(p && p[i]) && i!="prototype" && i!="constructor")try{delete target[i]}catch(e){}
                }
            try{delete target[_t]}catch(e){}
            if(target.constructor==Array)target.length=0;
        }
    },

    /*each function for hash
    fun: fun to exec, if return false, stop the $iterator
    scope: 'this' pointer;
    */
    each:function(hash,fun,scope){
        scope = scope||hash;
        for(var i in hash)
            if(false===fun.call(scope, hash[i], i, hash))
                break;
        return hash;
    },
    /*shadow copy for hash/array
    * var a=[]; a.b='b'; a.b will not be copied
    */
    copy:function(hash,fun){
        return _.clone(hash,fun,1);
    },
    /*deep copy for hash/array, and hash/array only
    * var a=[]; a.b='b'; a.b will not be cloned
    *be careful for dead lock
    */
    clone:function(hash,fun,deep){
        if(hash && typeof hash=='object'){
            var c=hash.constructor,a=c==Array;
            if(a||c==Object){
                var me=arguments.callee,h=a?[]:{},v,i=0,l;
                if(!deep){
                    if(deep===0)return hash;
                    else deep=100;
                }
                if(a){
                    l=hash.length;
                    for(;i<l;i++)
                        if(fun?fun(hash[i],i):1)
                            h[h.length]=((v=hash[i]) && deep && typeof v=='object')?me(v,fun,deep-1):v;
                }else{
                    for(i in hash)
                        if(fun?fun(hash[i],i):1)
                            h[i]=((v=hash[i]) && deep && typeof v=='object')?me(v,fun,deep-1):v;
                }
                return h;
            }else return hash;
        }else return hash;
    },
    /*filter hash/array
    fun: filter function(will delete "return false")
    */
    filter:function(obj, fun, scope,force){
        if(!force && obj && obj.constructor == Array){
            var i,l,a=[],o;
            for(i=0, l=obj.length; i<l; i++)a[a.length]=obj[i];
            obj.length=0;
            scope=scope||a;
            for(i=0, l=a.length; i<l; i++)
                if(fun.call(scope,a[i],i,a)!==false)
                    obj[obj.length]=a[i];
        }else{
            var i, bak={};
            scope=scope||obj;
            for(i in obj)
                if(false===fun.call(scope, obj[i], i, obj))
                    bak[i]=1;
            for(i in bak)
                delete obj[i];
        }
        return obj;
    },
    /*convert iterator to Array
    value: something can be iteratorred
    _.toArr({a:1},true) => [a];
    _.toArr({a:1},false) => [1];
    _.toArr('a,b') => ['a','b'];
    _.toArr('a;b',';') => ['a','b'];
    */
    toArr:function(value, flag){
        if(!value)return [];
        var arr=[];
        //hash
        if(typeof flag == 'boolean')
            for(var i in value)
                arr[arr.length]=flag?i:value[i];
        //other like arguments
        else{
            if(typeof value=='string')
                arr=value.split(flag||',');
            else
                for(var i=0,l=value.length; i<l; ++i)
                    arr[i]=value[i];
        }
        return arr;
    },
    toUTF8:function(str){
        return str.replace(/[^\x00-\xff]/g, function(a,b) {
            b=a.charCodeAt();
            return '\\u' + Math.floor(b/16).toString(16)+(b%16).toString(16);
        })
    },
    fromUTF8:function(str){
        return str.replace(/\\u([0-9a-f]{3})([0-9a-f])/g,function(a,b,c){return String.fromCharCode((parseInt(b,16)*16+parseInt(c,16)))})
    },
    urlEncode:function(hash){
        var a=[],i,o;
        for(i in hash){
            o=hash[i];
            a.push(encodeURIComponent(i)+'='+encodeURIComponent(typeof o=='string'?o:_.serialize(o)));
        }
        return a.join('&');
    },
    urlDecode:function(str, key){
        if(!str)return key?'':{};
        var arr,hash={},a=str.split('&'),o;
        for(var i=0,l=a.length;i<l;i++){
            o=a[i];
            arr=o.split('=');
            hash[decodeURIComponent(arr[0])]=decodeURIComponent(arr[1]);
        }
        return key?hash[key]:hash;
    },

    // type detection
    exists:function(target)  {return target!==undefined},
    isNull:function(target)  {return (typeof target == 'object') && !target },
    isObj:function(target)   {return !!target  && (typeof target == 'object' || typeof target == 'function')},
    isBool:function(target)  {return typeof target == 'boolean'},
    isNumb:function(target)  {return typeof target == 'number' && isFinite(target)},
    isDate:function(target)  {return !!target && target.constructor == Date},
    isFun:function(target)   {return typeof target == "function" && target.constructor != RegExp},
    isArr:function(target)   {return !!target && target.constructor == Array},
    isHash:function(target)  {return !!target && typeof target == 'object' && target.constructor == Object},
    isReg:function(target)   {return !!target && target.constructor == RegExp},
    isStr:function(target)   {return typeof target == "string"},
    isArguments:function(target)   {return !!(target && target.callee && target.callee.arguments===target)},
    //for handling String
    str:{
        startWith:function(str,sStr){
            return str.indexOf(sStr) === 0;
        },
        endWith:function (str,eStr) {
            var l=str.length-eStr.length;
            return l>=0 && str.lastIndexOf(eStr) === l;
        },
        repeat:function(str,times){
            return new Array(times+1).join(str);
        },
        initial:function(str){
            return str.charAt(0).toUpperCase() + str.substring(1);
        },
        trim:function(str){
            return this.ltrim(this.rtrim(str));
        },
        ltrim:function(str){
            return str.replace(/^ */,"");
        },
        rtrim:function(str){
            return str.replace(/ *$/,"");
        },
/*
        blen : function(s){
            var _t=s.match(/[^\x00-\xff]/ig);
            return s.length+(null===_t?0:_t.length);
        },
*/
        //Dependency: linb.Dom
        toDom:function(str,flag){
            var me=arguments.callee, pool=me._pool||(me._pool=[]),i=0,l=pool.length,p,r=[];
            do{p=pool[i++]}while(i<l && (p&&p.firstChild))
            if(!p || p.firstChild){
                p=document.createElement('div');
                pool.push(p);
            }
            p.innerHTML=str;
            for(var i=0,t=p.childNodes,l=t.length;i<l;i++)r[r.length]=t[i];
            return linb(r);
        }
    },
    //for handling Array
    arr:{
        subIndexOf:function(arr,key,value){
            if(value===undefined)return -1;
            for(var i=0, l=arr.length; i<l; i++)
                if(arr[i] && arr[i][key] === value)
                    return i;
            return -1;
        },
        removeFrom:function(arr, index,length){
            arr.splice(index, length || 1);
            return arr;
        },
        removeValue:function(arr, value){
            for(var l=arr.length,i=l-1; i>=0; i--)
                if(arr[i]===value)
                    arr.splice(i,1);
            return arr;
        },
        /*
         insert something to array
         arr: any
         index:default is length-1
         flag: is add array

         For example:
         [1,2].insertAny(3)
            will return [1,2,3]
         [1,2].insertAny(3,0)
            will return [3,1,2]
         [1,2].insertAny([3,4])
            will return [1,2,3,4]
         [1,2].insertAny([3,4],3,true)
            will return [1,2,[3,4]]
        */
        insertAny:function (arr, target,index, flag) {
            var l=arr.length;
            flag=target.constructor!=Array || flag;
            if(index===0){
                if(flag)
                    arr.unshift(target);
                else
                    arr.unshift.apply(arr, target);
            }else{
                var a;
                if(!index || index<0 || index>l)index=l;
                if(index!=l)
                    a=arr.splice(index,l-index);
                if(flag)
                    arr[arr.length]=target;
                else
                    arr.push.apply(arr, target);
                if(a)
                    arr.push.apply(arr, a);
            }
            return index;
        },
        indexOf:function(arr, value) {
            for(var i=0, l=arr.length; i<l; i++)
                if(arr[i] === value)
                    return i;
            return -1;
        },
        /*
        fun: fun to apply
        desc: true - max to min , or min to max
        atarget: for this
        */
        each:function(arr,fun,scope,desc){
            var i, l, a=arr;
            if(a.constructor!=Array){
                if((a=a._nodes) || a.constructor!=Array)
                    throw new Error('errNotArray');
                if(desc===undefined)
                    desc=1;
            }
            l=a.length;
            scope = scope||arr;
            if(!desc){
                for(i=0; i<l; i++)
                    if(fun.call(scope, a[i], i, a)===false)
                        break;
            }else
                for(i=l-1; i>=0; i--)
                    if(fun.call(scope, a[i], i, a)===false)
                        break;
            return arr;
        }
    }
});
_.merge(_.fun,{
    body:function(fun){
        with (String(fun))return slice(indexOf("{") + 1, lastIndexOf("}"));
    },
    args:function(fun){
        with (String(fun)) return slice(indexOf("(") + 1, indexOf(")")).split(',');
    },
    clone:function(fun){
        return new Function(_.fun.args(fun),_.fun.body(fun));
    }
});


Namespace=function(key){
    var a=key.split('.'),w=window;
    return _.get(w, a) || _.set(w, a, {});
};

Class=function(key, pkey, obj){
    var _Static, _parent=[], self=Class, w=window, env=self._fun, reg=self._reg, parent0, _this,i,t,_t;
    obj=obj||{};
    //exists?
    if(t=_.get(w, key.split('.')))return t;

    //multi parents mode
    pkey = ( !pkey?[]:typeof pkey=='string'?[pkey]:pkey);
    for(i=0; t=pkey[i]; i++)
        if(!(_parent[i]=(_.get(w, t.split('.')) || (linb&&linb.SC&&linb.SC(t)))))
            throw new Error('errNoParent:'+ t);
    if(obj.Dependency)
        for(i=0; t=obj.Dependency[i]; i++)
            if(!(_.get(w, t.split('.')) || (linb&&linb.SC&&linb.SC(t))))
                throw new Error('errNoDependency:'+ t);
    parent0=_parent[0];

    // collect items
    _Static=obj.Static||{};
    t={};
    for(i in _Static)
        if(reg[i])t[i]=1;
    for(i in t)
        delete _Static[i];

    //before and after will pass to children
    _Static.Before = obj.Before || (parent0&&parent0.Before);
    _Static.After = obj.After || (parent0&&parent0.After);
    _Static.$End = obj.$End || (parent0&&parent0.$End);
    _Static.__gc = obj.__gc || _Static.__gc || function(){Class.__gc(this.$key);};

    /*set constructor first and create _this
    upper is the first parent Class
    */
    if(typeof obj.Constructor == 'function'){
        _this = env(obj.Constructor, 'Constructor', key, parent0||_.fun());
        _this.Constructor = String(obj.Constructor);
    }else{
        if(parent0){
            // Constructor is for opera, in opear fun.toString can't get arguments sometime
            var f=_.fun(),str = parent0.Constructor;
            if(str)f=new Function(str.slice(str.indexOf("(") + 1, str.indexOf(")")).split(','), str.slice(str.indexOf("{") + 1, str.lastIndexOf("}")));
            _this = env(f, 'Constructor', key, parent0.upper);
            _this.Constructor = str;
        }else
            _this = _.fun();
    }

    //collect parent items, keep the last one
    _t=_.fun();
    for(i=_parent.length-1; t=_parent[i--];){
        _.merge(_t,t);
        _.merge(_t.prototype,t.prototype);
    }
    //set keys
    _this.KEY=_this.$key=_this.prototype.KEY=_this.prototype.$key=key;
    //envelop
    //  from Static
    self._wrap(_this,_Static,0,_t);
    //  from Instance
    if(t=obj.Instance)
        self._wrap(_this.prototype,t,1,_t.prototype);
    //inherite from parents
    self._inherit(_this,_t);
    self._inherit(_this.prototype,_t.prototype);
    _t=null;

    //exe before functoin
    if(_.tryF(_this.Before, arguments, _this)===false)
        return false;

    //add child key to parents
    for(i=0; t=_parent[i]; i++){
        t=(t.$children || (t.$children=[]));
        for(var j=0,k=t.length,b;j<k;j++)
            if(t[k]==key){
                b=true;
                break;
            }
        if(!b)t[t.length]=key;
    }

    //set symbol
    _this.$linb$ = 1;
    _this.$children = [];
    _this.$parent = _parent;

    //set constructor
    _this.prototype.constructor = _this;
    //set key
    _this[key] = _this.prototype[key] = true;

    //attached to global
    _.set(w, key.split('.'), _this);
    //exe after function
    _.tryF(_this.After, [], _this);
    //exe ini function
    _.tryF(obj.Initialize, [], _this);
    _.tryF(_this.$End, [], _this);

    //return Class
    return _this;
};
_.merge(Class, {
    _reg:{$key:1,$parent:1,$children:1,KEY:1,Static:1,Instance:1,Constructor:1,Initialize:1},
    _reg2:{'constructor':1,'prototype':1,'toString':1,'valueOf':1},
    /*envelop a function by some keys
    */
    _fun:function(fun, name, original, upper){
        fun.$name$=name;
        fun.$original$=original;
        if(upper)fun.upper = upper;
        return fun;
    },
    _other:["toString", "valueOf"],
    /*envelop object's item from an object
    target: target object
    src: from object
     i: key in hash
    limit: envelop values in a hash
    */
    _o:{},
    //inherit from parents
    _inherit:function (target, src, instance){
        var i, o, r=this._reg;
        for(i in src){
            if(i in target || (!instance && r[i]) || i.charAt(0)=='$')continue;
            o=src[i];
            if(o && o.$linb$)continue;
            target[i]=o;
        }
    },
    //wrap
    _wrap:function (target, src, instance, parent){
        var self=this, i,j,o,k=target.KEY,r=self._reg,r2=self._reg2,f=self._fun,oo=self._other;
        for(i in src){
            if(r2[i] || (!instance && r[i]))continue;
            o=src[i];
            target[i] = (typeof o != 'function') ? o : f(o, i, k, typeof parent[i]=='function'&&parent[i]);
        }
        for(j=0;i=oo[j++];){
            o=src[i];
            if(o && (o == self._o[i]))continue;
            target[i] = (typeof o != 'function') ? o : f(o, i, k, typeof parent[i]=='function'&&parent[i]);
        }
    },
    __gc:function(key){
        if(typeof key=='object')key=key.KEY||"";
        var t = _.get(window, key.split('.')),s;
        if(t){
            //remove from SC cache
            if(s=_.get(window,['linb','cache','SC']))delete s[key];
            //destroy children
            for(var i=0,o; o=t.$children[i];i++)
                if(o=_.get(window,o.split('.')))
                    CLASS.__gc(o);
            t.$parent.length=t.$children.length=0;
            _.set(window, key.split('.'));
        }
    }
});

//function dependency: linb.Dom linb.Thread
/*
    linb(window)
    linb(document)
    linb("id")
    linb(["id1","id2","id3"...])
    linb(linb(...))
    linb(node)
    linb([node,node,node,...])
    linb(fun):fun will reutun dom node array
*/
linb=function(nodes,flag){return linb.Dom.pack(nodes, flag)};
_.merge(linb,{
    cache:{dom:{},domId:{},template:{},hookKey:{},thread:{},SC:{},text:{}},
    Locale:{en:{}},
    $lang:'en',
    $href:'javascript:;',
    $langId:'linblangkey',
    reLang:function(key,callback){
        var l=linb.Locale,g=linb.getRes,t,v,i,j,f,m,z,a=[];
        linb.$lang=key;
        v = linb.browser.ie ? document.all.tags('span') : document.getElementsByTagName('span');
        for(i=0;t=v[i];i++)if(t.id==linb.$langId)a[a.length]=t;
        f=function(){
            (function(){
                j=a.splice(0,100);
                for(i=0;t=j[i];i++)
                    if(typeof(v=g(t.className))=='string')
                        t.innerHTML=v;
                if(a.length)
                    setTimeout(arguments.callee,0);
                _.tryF(callback);
            }())
        },
        z = 'linb.Locale.' + key,
        m=function(){
            linb.include(z+'.'+linb.ini.appLangKey,linb.getPath('Locale.' + key, '.js'),f,f);
        };
        linb.include(z,linb.getPath(z, '.js'),m,m);
    },
    _r:/\x24(\d+)/g,
    getRes:function(id){
        var d,
            b= id.indexOf('-')!=-1?((d=id.split('-'))&&(id=d[0])&&d):arguments ,
            c=_.get(linb.Locale[linb.$lang], id.split('.'));
        return (d=typeof c)=='string'
               ? c.replace(linb._r,function(z,id){return b[parseInt(id)+1]||z})
               : d=='function'
               ? c.apply(null,b) :
               c ? c : id.substr(id.lastIndexOf('.')+1)
    },
    wrapRes:function(id){
        var i=id, s,r;
        if(i.charAt(0)=='$')arguments[0]=i.substr(1,i.length-1);
        s=id;
        r= linb.getRes.apply(null,arguments);
        if(s==r)r=i;
        return '<span id="'+linb.$langId+'" class="'+s+'">'+r+'</span>';
    },
    request:function(uri, query, onSuccess, onFail, threadid, options){
        if(!query)
            query=''+_();
            return ((options&&options.method.toLowerCase()=='post')?linb.IAjax:linb.absIO.isCrossDomain(uri)?linb.SAjax:linb.Ajax).apply(null, arguments).start()
    },
    include:function(id,path,onSuccess,onFail){if(id&&linb.SC.get(id))_.tryF(onSuccess); else linb.SAjax(path,'',onSuccess,onFail,0,{rspType:'script'}).start()},
    /*
    set application main function
    example:
        linb.main(function(){
            ...
        });
    */
    _m:[],
    main:function(fun){linb._m.push(fun)},
    /*
    key: linb.UI.xxx
    tag: file tag
    add: appearance or bahavior
    example:
        linb.getPath('linb.UI.Button','','appearance') => linb.ini.path + /appearance/UI/Button/
        linb.getPath('linb.UI.Button','.gif','appearance') => linb.ini.path + /appearance/UI/Button.gif
        linb.getPath('a.b','','appearance') => linb.ini.appPath + /a/appearance/b/"
        linb.getPath('a.b','.gif','appearance') => linb.ini.appPath + /a/appearance/b.gif"
    */
    getPath : function(key, tag, folder){
        key=key.split('.');
        if(folder){
            var a=[key[0],folder];
            for(var i=1,l=key.length;i<l;i++)
                a.push(key[i]);
            key.length=0;
            key=a;
        }

        var pre,ini=linb.ini;
        if(key[0]=='linb'){
            pre=ini.path;
            key.shift();
            if(key.length==(folder?1:0))key.push('linb');
        }else{
            pre=ini.appPath;
            if(key.length==((folder?1:0)+1) && tag=='.js')key.push('index');
            if(ini.verPath) pre += ini.verPath + '/';
            if(ini.ver) pre += ini.ver + '/';
        }
        return pre + key.join('\/') + (tag||'\/');
    },
    log:_.fun(),
    message:_.fun(),

    //profile object cache
    _pool:[],
    getObject:function(id){return linb._pool['$'+id]},

    //Dependency: linb.absBox
    //create:function(tag, properties, events, host){
    create:function(tag, id){
        var arr,o,t,me=arguments.callee,r1=me.r1||(me.r1=/</);
        if(typeof tag == 'string'){
            //HTML text node
            if(id===true)
                o = linb([document.createTextNode(tag)]);
            //Any class inherited from linb.absBox
            else if(t=linb.absBox.$type[tag]){
                arr=[];
                //shift will crash in opera
                for(var i=1,l=arguments.length;i<l;i++)
                    arr[i-1]=arguments[i];
                o =new (linb.SC(t))(false);
                if(o._ini)o._ini.apply(o, arr);
                if(o.render)o.render();
            //from HTML string
            }else if(r1.test(tag))
                o = _.str.toDom(tag);
            //from HTML element tagName
            else{
                o=document.createElement(tag);
                o.id = typeof id=='string'?id:_.id();
                o=linb([o]);
            }
        //Any class inherited from linb.absBox
        }else
            o =new (linb.SC(tag.key))(tag).render();
        return o;
    }
});

/* linb.ini linb.browser dom ready
*/

new function(){
    //browser sniffer
    var w=window, u = navigator.userAgent.toLowerCase(), d=document, b=linb.browser={
        kde:/webkit/.test(u),
        opr:/opera/.test(u),
        ie:/msie/.test(u) && !/opera/.test(u),
        gek:/mozilla/.test(u) && !/(compatible|webkit)/.test(u),

        isWin:/(windows|win32)/.test(u),
        isMac:/(macintosh|mac os x)/.test(u),
        isAir:/adobeair/.test(u),
        isLinux:/linux/.test(u),
        isSecure:location.href.toLowerCase().indexOf("https")==0
    },v=function(k,s){return k + (b.ver=u.split(s)[1].split('.')[0])};
    _.filter(b,function(o){return !!o});
    if(b.ie){
        b[v('ie','msie ')]=true;
        if(b.ie6){
            //ex funs for ie6
            try {document.execCommand('BackgroundImageCache', false, true)}catch(e){}
            w.XMLHttpRequest = function(){return new ActiveXObject("Msxml2.XMLHTTP")};
        }
    }else if(b.gek)
        b[v('gek','firefox/')]=true;
    else if(b.opr)
        b[v('opr','opera/')]=true;
    else if(b.kde)
        b[v('kde','webkit/')]=true;

    b.contentBox = function(n){
        return (b.ie||b.opr) ?
                !/BackCompat|QuirksMode/.test(d.compatMode) :
                (n = (n=n||d.documentElement).style["-moz-box-sizing"] || n.style["box-sizing"]) ? (n=="content-box") : true;
    }();

    var ini=linb.ini={};
    //special var
    if(window.linb_ini)
        _.merge(ini,window.linb_ini);

    if(!ini.path){
        var s,arr = document.getElementsByTagName('script'), reg = /js\/linb(-[\w]+)?\.js$/,l=arr.length;
        while(--l>=0){
            s=arr[l].src;
            if(s.match(reg)){
                ini.path = s.replace(reg,'');
                break;
            }
        }
    }
    _.merge(ini,{
        appPath:location.href.split('?')[0].replace(/[^\\\/]+$/,''),
        appLangKey:'app',
        file_bg:ini.path+'bg.gif',
        dummy_tag:'$_dummy_$'
    });
    if(!ini.path)
        ini.path=ini.appPath+'/jsLinb';


    //for dom ready
    var f = function(){
        if(d.addEventListener && !b.kde)
            d.removeEventListener("DOMContentLoaded",arguments.callee,false);
        try{
            for(var i=0,l=linb._m.length;i<l;i++)
                _.tryF(linb._m[i])
            linb._m.length=0;
            linb.isDomReady=true;
        }catch(e){
            _.asyRun(function(){throw e})
        }
    };

    /* for Mozilla/Opera9 */
    if (d.addEventListener && !b.kde)
        d.addEventListener("DOMContentLoaded", f, false);
    //for ie
    else if (b.ie)
        (function(){try{
            //for ie7 iframe(doScroll is always ok)
            d.activeElement.id;
            d.documentElement.doScroll('left');f()}catch(e){setTimeout(arguments.callee,1)}})();
    //kde
    else
        (function(){/loaded|complete/.test(d.readyState)?f():setTimeout(arguments.callee,1)})()
};

/*linb.Thread
*  dependency: _ ; Class ; linb
parameters:
id: id of this thread, if input null, thread will create a new id
tasks: [task,task,task ...] or [{},{},{} ...]
    task: function
    or
    {
      task,      //function
      args,      //args array for task
      scope,     //this object for task
      delay ,    //ms number
      callback   //function for callback
   }
delay:default delay time;
callback:default calback function;
onStart: on start function
onEnd: on end function
cycle: is the thread circular
*/
Class('linb.Thread',null,{
    Constructor:function(id, tasks, delay, callback, onStart, onEnd, cycle){
        //for api call directly
        var self=this,me=arguments.callee,t=linb.cache.thread;
        // linb.Thread() => self.constructor!==me
        // in an inner method => !!self.id is true
        if(self.constructor!==me || !!self.id)
            return new me(id, tasks, delay, callback, onStart, onEnd, cycle);

        if(typeof id!='string')id='$' + (self.constructor.$id++);
        self.id=id;
        //thread profile
        self.profile = t[id] || (t[id] = {
            id:id,
            _start:false,
            time:0,
            _left:0,
            _asy:-1,
            //sleep_flag:-1,
            index:0,

            tasks:tasks||[],
            delay: delay || 0,
            callback:callback,
            onStart:onStart,
            onEnd:onEnd,
            cache:{},
            status:"run",
            cycle:!!cycle
        });
    },
    Instance:{
        _fun:_.fun(),
        __gc:function(){
            var m=linb.cache.thread,t=m[this.id];
            if(t){
                delete m[this.id];
                t.tasks.length=0;
                for(var i in t)t[i]=null;
            }
        },
        _task:function(){
            var self=this,p=self.profile,t={args:[]}, value=p.tasks[p.index],r,i,type=typeof value;
            p._asy=-1;

            //maybe aborted
            if(!p.status)return;

            //function
            if(type=='function') t.task=value;
            //hash
            else if(type=='object')
                for(i in value) t[i]=value[i];
            //others, give all default

            //defalut task
            if(typeof t.task!='function')t.task=self._fun;
            //default callback
            if(typeof t.callback!='function')t.callback=p.callback

            //last arg is threadid
            t.args.push(p.id);
            //to next pointer
            p.index++;
            p.time=_();
            //if error raise in the process, abort the thread
            //try{
                r = _.tryF(t.task, t.args || [p.id], t.scope||self, null);
                //called abort in [task]
                if(!p.status)return;

                //cache return value
                if(t.id)p.cache[t.id] = r;
                // call back function
                // if callback return false, stop.
                if(t.callback)
                    if(false===_.tryF(t.callback, [p.id], self, true)){
                      self.abort();
                      return;
                    }
                //called suspend in [task]
                if(p.status!=="run")return;
            //}catch(e){
           //     self.abort();
            //    linb.Debugger && linb.Debugger.trace(e);
           // }
            // if set Sleep at t.task or t.callback , stop continue running
            if(!p || p.status!=="run")return;
            self.start();
        },
        start:function(time){
            var self=this, p=self.profile, task,delay;
            if(p._start===false){
                p._start=true;
                //call onstart
                if(false===_.tryF(p.onStart,[p.id],self))
                    return self.abort();
            }
            if(!p.tasks.length)return self.abort();
            if(p.index>=p.tasks.length)
                if(p.cycle===true)
                    self.profile.index = 0;
                else
                    return self.abort();
            task=p.tasks[p.index];

            delay=typeof task=='number'?task:typeof task.delay=='number'?task.delay:p.delay;
            p._left= (time || time===0)?time:delay;

            if(p._asy!=-1)clearTimeout(p._asy);
            p._asy = _.asyRun(self._task, p._left, [], self);
            p.time=_();
            return self;
        },
        suspend:function(){
            var n,p=this.profile;
            if(p.status=="pause")return;
            p.status="pause";
            if(p._asy!==-1){
                clearTimeout(p._asy);
                if(p.index>0)p.index--;
            }
            n=p._left-(_() - p.time);

            p._left=(n>=0?n:0);
            return this;
        },
        /*time
        number:set timeout to number
        true:set timeout to default
        false:set timeout to 0
        undefined: timetou to left
        */
        resume:function(time){
            var self=this;
            if(self.profile.status=="run")return;

            time = time===undefined ? self.profile._left :
                        time===true ? self.profile.delay :
                        time===false ? 0 :
                        (Number(time) || 0);

            self.profile.status="run";
            self.start(time);
            return self;
        },
        abort:function(){
            var t=this.profile;
            t.status="stop";
            clearTimeout(t._asy);
            _.tryF(t.onEnd, [t.id]);
            this.__gc();
        },
        links:function(thread){
            var p=this.profile, onEnd=p.onEnd, id=p.id;
            p.onEnd=function(){_.tryF(onEnd,[id]); thread.start()};
            return this;
        },
        insert:function(arr, index){
            var self=this,o=self.profile.tasks,l=o.length,a;
            if(arr.constructor!=Array)arr=[arr];
            index= index || self.profile.index;
            if(index<0 || index>l)index=l;
            a=o.splice(index,l-index);
            o.push.apply(o, arr);
            o.push.apply(o, a);
            return self;
        },
        getCache:function(key){
            return this.profile.cache[key];
        },
        setCache:function(key,value){
            this.profile.cache[key] = value;
            return this;
        }
    },
    After:function(){
        /*
        give shortcut to some functions
        */
        var self=this, f=function(i){
            self[i]=function(id){
                var t;
                if(linb.cache.thread[id])
                    (t=linb.Thread(id))[i].apply(t,Array.prototype.slice.call(arguments,1));
            }
        },
        a = 'start,suspend,resume,abort'.split(',');
        for(var i=0,l=a.length;i<l;i++)f(a[i]);
    },
    Static:{
        $id:1,
        __gc : function(){
            linb.cache.thread={};
        },
        isAlive:function(id){
            return !!linb.cache.thread[id];
        },
        //Dependency: linb.Dom
        observableRun:function(tasks,onEnd,threadid){
            var thread=linb.Thread, dom=linb.Dom;
            if(!_.isArr(tasks))tasks=[tasks];
            //if thread exists, just inset task to the next positiong
            if(linb.cache.thread[threadid]){
                if(typeof onEnd=='function')
                    tasks.push(onEnd);
                thread(threadid).insert(tasks);
            //if does not exist, create a new thread
            }else{
                thread(threadid, tasks,
                    0,null,
                    //set busy status to UI
                    function(threadid){
                        if(dom)dom.busy(threadid)
                    },
                    //set free status to UI
                    function(threadid){
                        _.tryF(onEnd,arguments,this);
                        if(dom)dom.free(threadid)
                    }
                ).start();
            }
        },
        /*group thread run once
        group: hash include thread or threadid
        callback: call after a thread finish
        onStart:before all threads start
        onEnd:after all threads end
        */
        group:function(id, group, callback,onStart,onEnd){
            var bak={},
                thread=linb.Thread,
                f=function(o,i,threadid){
                    if(typeof o == 'string')o=thread(o);
                    if(o){
                        var f = function(){
                            var me=arguments.callee;
                            _.tryF(me.onEnd,arguments,this);
                            me.onEnd=null;
                            delete bak[i];
                            //call callback here
                            _.tryF(callback,[i, threadid],this);
                            if(_.isEmpty(bak))
                                thread.resume(threadid);
                        };
                        f.onEnd = o.profile.onEnd;
                        o.profile.onEnd = f;
                        o.start();
                    }
                };
            for(var i in group)bak[i]=1;
            return thread(id, [function(threadid){
                if(!_.isEmpty(group)){
                    thread.suspend(threadid);
                    for(var i in group)f(group[i],i, threadid);
                }
            }],0,null,onStart,onEnd);
        }
    }
});


/*linb.absIO/ajax
*  dependency: _ ; Class ; linb ; linb.Thread
*/
/*
        get     post    get(cross domain)   post(corss domain)  post file   return big data(corss domain)
ajax    +       +       -                   -                   -           -
sajax   +       -       +                   -                   -           *
iajax   +       +       +                   *                   *           *
*/
Class('linb.absIO',null,{
    Constructor:function(uri, query, onSuccess, onFail, threadid, options){
        //get properties
        if(typeof uri=='object')
            options=uri;
        else{
            options=options||{};
            _.merge(options, {
                uri:uri,
                query:query,
                onSuccess:onSuccess,
                onFail:onFail,
                threadid:threadid
            });
        }
        //for cache
        var self=this,  me=arguments.callee,con=self.constructor;
        if((con !== me) || self.id)
            return new me(options);

        //give defalut value to those members
        _.merge(options,{
            id : options.id || (_()+ '' +(con._id++)),
            uri : options.uri||'',
            query : options.query||'',
            asy : options.asy!==false,
            method : 'POST'==(options.method||con.method).toUpperCase()?'POST':'GET'
        },'all');
        var a='retry,timeout,rspType,customQS'.split(',');
        for(var i=0,l=a.length;i<l;i++)
            options[a[i]] = (a[i] in options)?options[a[i]]:con[a[i]];

        _.merge(self, options, 'all');
        if(con.events)
            _.merge(self, con.events);

        self.query = self.customQS(self.query);

        if(!self._useForm && typeof self.query!='string')
            self.query = con._buildQS(self.query, self._single);

        return self;
    },
    Instance:{
        _fun:_.fun(),
        _flag:0,
        _response:'',
        _retryNo:0,
        _end:false,

        _time:function() {
            var self=this,c=self.constructor;
            self._clear();
            if (self._retryNo < self.retry) {
                self._retryNo++;
                _.tryF(self.onRetry,[self._retryNo],self);
                self.start();
            }else{
                _.tryF(self.onTimeout,[],self);
                self._onError(new Error("errTimout"));
            }
        },
        _onEnd:function(){
            var self=this;
            self._end=true;
            if(self._flag>0){
                clearTimeout(self._flag);
                self._flag=0
            }
            linb.Thread.resume(self.threadid);
            _.tryF(self.onEnd,[],self);
            self._clear();
        },
        _onStart:function(){
            var self=this;
            linb.Thread.suspend(self.threadid);
            _.tryF(self.onStart,[],self);
        },
        _onResponse:function(){
            var self=this;
            if(false!==_.tryF(self.beforeSuccess,[self._response, self.rspType, self.threadid], self))
                _.tryF(self.onSuccess,[self._response, self.rspType, self.threadid], self);
            self._onEnd();
        },
        _onError:function(e){
            var self=this;
            if(false!==_.tryF(self.beforeFail,[e, self.threadid],self))
                _.tryF(self.onFail,[String(e), self.rspType, self.threadid], self);
            self._onEnd();
        },
        abort:function(){
            this._onEnd();
        }
    },
    Static:{
        $abstract:true,
        _id:1,
        method:'GET',
        retry:2,
        timeout:60000,
        rspType:'text',

        //paras in request object
        type:'type',
        randkey:'id',
        callback:'callback',

        _buildQS:function(hash, flag){
            return flag?_.serialize(hash):_.urlEncode(hash);
        },
        customQS:function(obj){
            return obj;
        },
        _if:function(doc,id,onLoad){
            var e=linb.browser.ie,n = doc.createElement(e?"<iframe name='"+id+"' "+(onLoad?"onload='linb.IAjax._o(\""+id+"\")'":"")+">":"iframe"),w;
            if(id)n.id=n.name=id;
            if(!e&&onLoad)n.onload=onLoad;
            n.style.display = "none";
            doc.body.appendChild(n);
            w=frames[frames.length-1];
            return [n,w,w.document];
        },
        isCrossDomain:function(uri){
            uri=uri||'';
            var me=arguments.callee,
                r=me.r || (me.r=/(http(s)?\:\/\/)?([\w\.]+(:[\d]+)?)(.*)/),t;
            if((t=uri.indexOf(':'))==-1||t>uri.indexOf('/'))return false;
            if(uri.indexOf('file:')===0)return !!location.host;
            return  location.host != uri.replace(r,'$3')
        },
        //get multi ajax results once
        groupCall:function(hash, callback, onStart, onEnd, threadid){
            var i,f=function(o,i,hash){
                hash[i]=linb.Thread(null,[function(threadid){
                    o.threadid=threadid;
                    o.start();
                }]);
            };
            for(i in hash)f(hash[i],i,hash);
            return linb.Thread.group(null, hash, callback, function(){
                linb.Thread(threadid).suspend();
                _.tryF(onStart,arguments,this);
            }, function(){
                _.tryF(onEnd,arguments,this);
                linb.Thread(threadid).resume();
            }).start();
        }
    }
});
Class('linb.Ajax','linb.absIO',{
    Instance:{
        _single:true,
        _XML:null,
        start:function() {
            var self=this;
            if(false===_.tryF(self.beforeStart,[],self)){
                self._onEnd();
                return;
            }
            if (!self._retryNo)
                self._onStart();
            try {
                with(self){
                    //must use "self._XML", else opera will not set the new one
                   var x = self._XML = new window.XMLHttpRequest();
                   if(asy)
                       x.onreadystatechange = function(){
                           if(self && x && x.readyState==4) {
                               self._complete.apply(self);
                               //must clear here, else memory leak
                               self._clear();
                           }
                       };

                    if (!_retryNo && method != "POST"){
                        if(query)
                            uri = uri.split("?")[0] + "?" + query;
                        query=null;
                    }

                    if(x.overrideMimeType)
                          x.overrideMimeType('text/xml');

                    x.open(method, uri, asy);
                    if(method != "POST")
                        x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    x.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                        if(x.overrideMimeType )
                    x.setRequestHeader("Connection", "close");

                    //for firefox syc GET bug
                    try{x.send(query);}catch(e){}

                    if(asy){
                      if(x&&timeout > 0)
                        _flag = _.asyRun(function(){if(self && !self._end){self._time()}}, self.timeout);
                    }else
                        _complete();
                }
            }catch(e){
                self._onError(e);
            }
            return self;
        },
        abort:function(){
            var self=this, x = self._XML;
            if(x){
                x.onreadystatechange=self._fun;
                x.abort();
                self._XML=null;
            }
            arguments.callee.upper.call(self);
        },
        _clear:function(){
            var self=this,x = self._XML;
            if(x){
                x.onreadystatechange=self._fun;
                self._XML=null;
            }
        },
        _complete:function() {
            with(this){
                //this is for opera
                var x= this._XML,status = x.status;
                _response = rspType=='text'?x.responseText:x.responseXML;
                if(status===undefined || status===0 || status==304 || (status >= 200 && status < 300 ))
                    _onResponse();
                else
                    _onError(new Error('errXMLHTTP:' +status));
            }
        }
    }
});
Class('linb.SAjax','linb.absIO',{
    Instance:{
        start:function(){
            var self=this,id,c=self.constructor, t, n, ok=false;
            if(false===_.tryF(self.beforeStart,[],self)){
                self._onEnd();
                return;
            }
            if (!self._retryNo)
                self._onStart();

            //first
            id=self.id;
            if(c._pool[id])
                c._pool[id].push(self);
            else
                c._pool[id]=[self];

            var w=c._n=document;
            n = self.node = w.createElement("script");
            n.src = self.uri + (self.query?'?'+self.query:'');
            n.type= 'text/javascript';
            n.charset='utf-8';
            n.id='linb:script:'+self.id;
            n.onload = n.onreadystatechange = function(){
                var t=this.readyState;
                if(!ok && (!t || t == "loaded" || t == "complete") ) {
                    ok=true;
                    if(self.rspType=='script')
                        self._onResponse();
                    else self._loaded();
                }
            };
            //firefox only
            n.onerror=function(){
                self._loaded();
            };

            //w.getElementsByTagName("head")[0].appendChild(n);
            w.body.appendChild(n);

            //set timeout
            if(self.timeout > 0)
                self._flag = _.asyRun(function(){if(self && !self._end){self._time()}}, self.timeout);
        },
        _clear:function(){
            var self=this, n=self.node, c=self.constructor, div=c.div||(c.div=c._n.createElement('div')),_pool=self.constructor._pool;
            _pool.length=0;
            delete _pool[self.id];
            if(n){
                self.node=n.id=n.onload=n.onreadystatechange=n.onerror=null;

                if(self.rspType!='script'){
                    //in ie + add script with url(remove script immediately) + add the same script(remove script immediately) => crash
                    //so, always clear it later
                    div.appendChild(n.parentNode&&n.parentNode.removeChild(n)||n);
                    if(linb.browser.ie)
                        _.asyRun(function(){div.innerHTML='';n.removeNode()});
                    else
                        div.innerHTML='';
                }
            }
        },
        _loaded:function(){
            var self=this;
            _.asyRun(function(){
                if(self.id && self.constructor._pool[self.id])
                    self._onError(new Error("errInData"));
            },500);
        }
    },
    Static : {
        _pool:{},
        $response:function(obj) {
            var self=this;
            try{
                if(obj && (o = self._pool[obj[self.randkey]])){
                    for(var i=0,l=o.length;i<l;i++){
                        o[i]._response=obj;
                        o[i]._onResponse();
                    }
                }else
                    self._onError(new Error("errInData:"+obj));
            }catch(e){
                linb.Debugger && linb.Debugger.trace(e);
            }
        },
        customQS:function(obj){
            var c=this.constructor, t=c.type, k=c.randkey, b=c.callback,nr=(this.rspType!='script'),rand=nr?k + '=' + this.id + '&type=script&':'';
            if(typeof obj=='string')
                return (obj && obj + '&') + rand + (nr?b + '=linb.SAjax.$response':'');
            else{
                if(nr){
                    obj[t]='script';
                    obj[k]=this.id;
                    obj[b]="linb.SAjax.$response";
                }
                return obj;
            }
        }
    }
});
Class('linb.IAjax','linb.absIO',{
    Instance:{
        _useForm:true,
        $e:function(s){this._onError(new Error("errInData:"+s));},
        start:function(){
            var self=this,c=self.constructor, i, id, t, n, k, o, b, form,onload;
            if(false===_.tryF(self.beforeStart,[],self)){
                self._onEnd();
                return;
            }
            if (!self._retryNo)
                self._onStart();

            //first
            id=self.id;
            if(c._pool[id])
                c._pool[id].push(self);
            else
                c._pool[id]=[self];
            //use window.name
            self._onload = onload = function(id){
                //in some situation, this function will be triggered twice.
                //in IE/opera, "setting an image file as dummy" will trigger the second onload event with 'self.node == null'
                if(!self.node)return;
                var w=self.node.contentWindow,c=linb.IAjax,o,t;
                //in opera, "set location" will trigger location=='about:blank' at first
                if(linb.browser.opr)try{if(w.location=='about:blank')return}catch(e){}
                try{
                    w.location=c._getDummy()+'#'+linb.ini.dummy_tag;
                    if(w.name==self.id)
                        self.$e('no response');
                    else{
                        try{
                            o=_.unserialize(decodeURIComponent(w.name));
                            if(o&&(t=c._pool[o[c.randkey]]))
                                for(var i=0,l=t.length;i<l;i++){
                                    t[i]._response=o;
                                    t[i]._onResponse();
                                }
                            else
                                self.$e(w.name);
                         }catch(a){
                            self.$e(w.name);
                         }
                    }
                }catch(e){}
            };

            //create form
            var a=c._if(document,id, onload);
            self.node=a[0];
            self.frm=a[1];
            //create form
            form = self.form = document.createElement('form');
            form.style.display='none';
            form.action=self.uri;
            form.method=self.method;
            form.target=id;

            k=self.query||{};
            for(i in k){
                if(k[i] && k[i].nodeName=="INPUT"){
                    k[i].id=k[i].name=i;
                    form.appendChild(k[i]);
                    b=true;
                }else{
                    t=document.createElement('input');
                    t.id=t.name=i;
                    t.value= typeof k[i]=='string'?k[i]:_.serialize(k[i]);
                    form.appendChild(t);
                }
            }
            if(self.method=='POST' && b){
                form.enctype = 'multipart/form-data';
                if(form.encoding)
                    form.encoding = form.enctype;
            }
            document.body.appendChild(form);
            //submit
            form.submit();
            //set timeout
            if(self.timeout > 0)
                self._flag = _.asyRun(function(){if(self && !self._end){self._time()}}, self.timeout);
        },
        _clear:function(){
            var self=this, n=self.node,f=self.form, c=self.constructor, div=c.div||(c.div=document.createElement('div'));
			if(linb.browser.gek&&n)try{n.onload=null;var d=n.contentWindow.document;d.write(" ");d.close()}catch(e){}
            self.form=self.node=self.frm=null;
            clearTimeout(self._tf);
            if(n)div.appendChild(n.parentNode.removeChild(n));
            if(f)div.appendChild(f.parentNode.removeChild(f));
            div.innerHTML='';
        }
    },
    Static : {
        method:'POST',
        _pool:{},
        _o:function(id){
            var self=this,p=self._pool[id],o=p[p.length-1];
            _.tryF(o._onload);
        },
        _getDummy:function(win){
            win=win||window;
            var ns=this,
                arr,o,
                d=win.document,
                ini=linb.ini,
                b=linb.browser,
                f=ns.isCrossDomain;
            if(ns.dummy)return ns.dummy;
            //can get from linb.ini;
            if(ini.dummy)return ns.dummy=ini.dummy;
            if(b.gek){
                arr=d.getElementsByTagName("link");
                for(var i=0,j=arr.length; i<j; i++){
                    o = arr[i];
                    if (o.rel == "stylesheet" && !f(o.href))
                        return ns.dummy=o.href.split('#')[0];
                }
            }
            if(!f(ini.path)){
                //not for 'ex-domain include jslinb' case
                if(!d.getElementById('linb:img:bg')){
                    o=d.createElement('img');
                    o.id='linb:img:bg';
                    o.src=ini.file_bg;
                    o.style.display='none';
                    d.body.appendChild(o);
                }
            }
            arr=d.getElementsByTagName("img");
            for(var i=0,j=arr.length; i<j; i++){
                o = arr[i];
                if(!f(o.src))
                    return ns.dummy=o.src.split('#')[0];
            }
            //get from parent, not for opera in this case
            try{
                if(win!=win.parent)
                    if((win=win.parent) && !f(''+win.document.location.href))
                        return ns._getDummy(win);
            }catch(e){}
            //for the last change, return a file name whether it existes or does not exist, and not cache it.
            return '/favicon.ico';
        },
        customQS:function(obj){
            var s=this,c=s.constructor,t=c.type;
            obj[t]='iframe';
            obj[c.randkey]=s.id;
            return obj;
        }
    }
});

/*linb.SC for straight call
*  dependency: _ ; Class ; linb ; linb.Thread ; linb.absIO/ajax
*/
Class('linb.SC',null,{
    Constructor:function(path, callback, isAsy, threadid, options){
        var p = linb.cache.SC,r;
        if(r=p[path]||(p[path]=_.get(window,path.split('.'))))
            _.tryF(callback,[path,null,threadid],r);
        else{
            options=options||{};
            options.$cb=callback;
            if(isAsy)options.threadid=threadid;
            r=p[path]=linb.SC._call(path||'', options, isAsy);
        }
        return r;
    },
    Static:{
        __gc:function(k){
            linb.cache.SC={};
        },

        //get object from obj string
        get : function (path, obj){
            return _.get(obj||window,(path||'').split('.'));
        },
        /* function for "Straight Call"
        *   asy     loadSnips use
        *   true    true    ajax
        *   true    false   sajax
        *   false   ture    ajax
        *   false   false   ajax
        */
        _call : function (s, options, isAsy){
            isAsy = !!isAsy;
            var i,t,r,o,funs=[],ep=linb.SC.get,ct=linb.cache.text,
            f= function(text,n,threadid){
                var self=this;
                if(text){
                    //test again when asy end.
                    if(!ep(s)){
                        //loadSnips only
                        if(self.$p)
                            (self.$cache || ct)[self.$tag]=text;
                        else
                            //for sy xmlhttp ajax
                            try{_.exec(text)}catch(e){throw new Error('errInEval:"'+e + self.$tag)}
                    }
                }
                _.tryF(self.$cb,[self.$tag,text,threadid],ep(s)||{});
            },fe=function(text){
                var self=this;
                //for loadSnips resume with error too
                _.tryF(self.$cb,[null,null,self.threadid],self);
            };
            //get from object first
            if(!(r=ep(s))){
                //if script in cache
                if(t=ct[s]){
                    isAsy=false;
                    f.call({$cb: options.$cb},t);
                    //delete it
                    delete ct[s];
                }
                //get from object second
                if(!(r=ep(s))){
                     //load from sy ajax
                     o=linb.getPath(s,'.js','js');
                     options = options ||{};
                     options.$tag = s;
                     var ajax;
                     //asy and not for loadSnips
                     if(isAsy && !options.$p){
                        options.rspType="script";
                        ajax=linb.SAjax;
                     }else{
                        options.asy=isAsy;
                        ajax=linb.Ajax;
                    }
                    //get text from sy ajax
                    ajax(o, "", f, fe, null, options).start();
                    //for asy once only
                    if(!isAsy)
                        r=ep(s);
                }
            }else
                if(options.$cb)
                    f.call(options);
            return r;
        },
        /*
        arr: key array, ['linb.UI.Button','linb.UI.Input']
        callback: fire this function after all js loaded
        */
        loadSnips:function(pathArr,cache,callback,onEnd,threadid){
            if(!pathArr || !pathArr.length){
                _.tryF(onEnd,[threadid]);
                return;
            }
            var bak={}, options={$p:1,$cache:cache||linb.cache.text};
            for(var i=0,l=pathArr.length;i<l;i++)
                bak[pathArr[i]]=1;

            if(callback||onEnd){
                options.$cb=function(path){
                    //give callback call
                    if(callback)_.tryF(callback,arguments,this);
                    delete bak[path||this.$tag];
                    if(_.isEmpty(bak)){
                        _.tryF(onEnd,[threadid]);
                        onEnd=null;
                        linb.Thread.resume(threadid);
                    }
                };
            }
            linb.Thread.suspend(threadid);
            for(var i=0,s; s=pathArr[i++];)
                this._call(s, _.merge({$tag:s},options), true);
        },
        runInBG:function(pathArr, callback, onStart, onEnd){
            var i=0,j,t,self=this,fun=function(threadid){
                while(pathArr.length>i && (t=self.get(j=pathArr[i++])));
                if(!t)
                    self._call(j, {threadid:threadid},true);
                //set abort function to the next step
                if(pathArr.length<i)
                    linb.Thread(threadid).abort();
                if(pathArr.length==i)i++;
            };
            linb.Thread(null, [fun], 1000, callback, onStart, onEnd, true).start();
        },
        execSnips:function(cache){
            var i,h=cache||linb.cache.text;
            for(i in h)
                try{_.exec(h[i])}catch(e){throw new Error('errInEval:"'+e)}
            h={};
        },
        //asy load multi js file, whatever dependency
        /*
        *1.busy UI
        *3.linb.SC.groupCall some js/class
        *4.resume thread
        *5.linb.SC.loadSnips other js/class
        *6.execute other ..
        *7.free UI
        */
        groupCall:function(pathArr, callback, onEnd, threadid){
            if(pathArr){
                //clear first
                var self=this;
                self.execSnips();
                linb.Thread.suspend(threadid);
                self.loadSnips(pathArr, 0, callback, function(){
                    self.execSnips();
                    _.tryF(onEnd,[threadid]);
                    onEnd=null;
                    linb.Thread.resume(threadid);
                });
            }else
                _.tryF(onEnd,[threadid]);
        }
    }
});

/*serialize/unserialize
*/
new function(){
    var M ={
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"' : '\\"',
        '\\': '\\\\'
    },
    H={'@window':'window','@this':'this'},
    A=/[\x00-\x1f\x7f-\x9f\\\"]/g,
    C=/^\s*\x7b/, // /^\s*\{/,
    D=/^(-\d+|\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?((?:[+-](\d{2}):(\d{2}))|Z)?$/,
    E=function(t,i,a,v,m,n){
        for(i in t)
            if((a=typeof (v=t[i]))=='string' && (v=D.exec(v))){
                m=v[8]&&v[8].charAt(0);
                if(m!='Z')n=(m=='-'?-1:1)*((+v[9]||0)*60)+(+v[10]||0);
                else n=0;
                m=new Date(+v[1],+v[2]-1,+v[3],+v[4],+v[5],+v[6],+v[7]||0);
                n-=m.getTimezoneOffset();
                if(n)m.setTime(m.getTime()+n*60000);
                t[i]=m;
            }else if(a=='object' &&a.constructor===Object) E(t[i]);
        return t;
    },
    R=function(n){return n<10?'0'+n:n},

    F='function',
    N='number',
    L='boolean',
    S='string',
    O='object',
    T={},
    S16=function(b){return Math.floor(b/16).toString(16)+(b%16).toString(16)},
    MS=function(x,s){return '.'+((s=x[s]())?s<10?'00'+s:s<100?'0'+s:s:'000')},
    Z=(function(a,b){a=-(new Date).getTimezoneOffset()/60; b=a>0?'+':'-'; a=''+Math.abs(a); return b+a+(a.length==1?'0':'')+':00'})();
    T['undefined']=function(){return 'undefined'};
    T[L]=function(x){return String(x)};
    T[N]=function(x){return isFinite(x) ? String(x) : 'null'};
    T[S]=function(x){
        return H[x] ||
            '"' +
            (
            A.test(x)
            ?
            x.replace(A, function(a,b) {
                if(b=M[a])return b;
                b=a.charCodeAt();
                return '\\u00' + S16(b)
            })
            :
            x
            )
            + '"'
    };
    T[O]=function(x,dateformat,deep){
        var me=arguments.callee, map = me.map || (me.map={prototype:1,constructor:1,toString:1,valueOf:1});
        deep=deep||1;
        if(deep>99)return '"too much recursion!"';
        if (x){
            var a=[], b=[], c=x.constructor, f, i, l, v;
            if(x===window)return "window";
            if(x===document)return "document";
            //for ie alien
            if((typeof x==O || typeof x==F) && typeof c != F)
                return x.nodeType? "document.getElementById('"+x.id+"')" :"$alien";
            else if(c==Array){
                a[0] = '[';
                l = x.length;
                for(i=0;i<l;++i)
                    if(f=T[typeof (v=x[i])])
                        if(typeof (v=f(v,dateformat,deep+1))==S)
                            b[b.length]=v;

                a[2]=']';
            }else if(c==Date){
                if(dateformat=='utc')
                    return '"'+ x.getUTCFullYear() + '-' +
                        R(x.getUTCMonth() + 1) + '-' +
                         R(x.getUTCDate()) + 'T' +
                         R(x.getUTCHours()) + ':' +
                         R(x.getUTCMinutes()) + ':' +
                         R(x.getUTCSeconds()) +
                         MS(x,'getUTCMilliseconds')+
                         'Z"';
                else if(dateformat=='gmt')
                    return '"'+ x.getFullYear() + '-' +
                        R(x.getMonth() + 1) + '-' +
                         R(x.getDate()) + 'T' +
                         R(x.getHours()) + ':' +
                         R(x.getMinutes()) + ':' +
                         R(x.getSeconds()) +
                         MS(x,'getMilliseconds')+
                         Z+'"';
                else
                    return 'new Date('+[x.getFullYear(),x.getMonth(),x.getDate(),x.getHours(),x.getMinutes(),x.getSeconds(),x.getMilliseconds()].join(',')+')';
            }else if(c==RegExp){
                return String(x);
            }else{
                if(typeof x.serialize == F)
                    x = x.serialize();
                if(typeof x==O){
                    if(x.nodeType){
                        return "document.getElementById('"+x.id+"')";
                    }else{
                        a[0] = '{';
                        for(i in x)
                            if(!map[i])
                                if (f=T[typeof (v=x[i])])
                                    if (typeof (v=f(v,dateformat,deep+1))==S)
                                        b[b.length] = T.string(i) + ':' + v;
                        a[2]='}';
                    }
                }else return String(x);
            }
            a[1]=b.join(', ');
            return a[0]+a[1]+a[2];
        }
        return 'null'
    };
    T[F]=function(x){return x.$path?x.$path:String(x)};

    //serialize object to string (bool/string/number/array/hash/simple function)
    _.serialize = function (obj,dateformat){
        return T[typeof obj](obj,dateformat)||'';
    };
    //unserialize string to object
    _.unserialize = function(str, dateformat){
        try{
            str=eval(C.test(str) ? '('+str+')' : str);
            if(dateformat){if(typeof str==='object')E(str);else if(typeof str==='string')return E({a:str}).a}
            return str;
        }catch(e){
            return false;
        }
    };
};
/*26 based id, some number id can crash opera9
*/
_.id=function(){
    var self=this, me=arguments.callee;
    if(self.constructor!==me || self.a)
        return (me._ || (me._= new me)).next();
    self.a=[-1];
    self.b=[''];
    self.value='';
};
_.id.prototype = {
    constructor:_.id,
    _chars  :"abcdefghijklmnopqrstuvwxyz".split(''),
    next : function(i){
        with(this){
            var m,k,l,i = (i||i===0)?i:b.length-1;
            if((m=a[i]) >= 25){
                m=0;
                if(i===0){
                    a.splice(0,0,1);
                    b.splice(0,0,'a');
                    l=a.length;
                    for(k=1;k<l;++k){
                        a[k]=0;
                        b[k]='0';
                    }
                    ++i;
                }else
                  next(i-1);
            }else ++m;
            a[i]=m;
            b[i]=_chars[m];
            return value = b.join('');
        }
    }
};/* event
*  dependency: base _ ; Class ; linb ;
*
*
*/
Class('linb.Event',null,{
    Constructor:function(event,node,fordrag,tid){
        var self = linb.Event,
            dd=0,id,
            dragdrop=linb.DragDrop,
            src, type,  pre, obj;

        //get event object , and src of event
        if(!(event=event||window.event) || !(src=node))return false;
        //type
        type = event.type;
        //template id
        if(tid)src._tid=tid;

        //for correct mouse hover problems;
        if('mouseover'==type || 'mouseout'==type){
            dd=(dragdrop&&dragdrop._profile.isWorking)?1:2;
            //for dropable
            if(dd!=1 && fordrag)return self.$FALSE;
            //don't return flase, here, opera will stop the system event hander => cursor not change
            if(!self._handleMouseHover(event, src, self.getSrc(event), dd==1))
                return self.$FALSE;
            if(dd==1)
                pre=dragdrop&&dragdrop._dropElement;
        }

        //for tab focusHook
        if((obj=self._tabHookStack).length &&
            self._kb[type] &&
            (event.$key || event.keyCode || event.charCode)==9 &&
            false === self._handleTabHook(self.getSrc(event), obj=obj[obj.length-1]))
                return;

        id = tid || self.getId(src);
        //get profile from dom cache
        if(obj = self._getProfile(id)){
            //for setBlurTrigger
            if(type=='mousedown')
                _.tryF(linb.Dom._blurTrigger,[obj,event,src],src);
            //for resize
            if(type=="resize"){
                type='size';
                //for IE, always fire window onresize event after any innerHTML action
                if(linb.browser.ie && window===src){
                    var w=linb.browser.contentBox && document.documentElement.clientWidth || document.body.clientWidth,
                        h=linb.browser.contentBox && document.documentElement.clientHeight || document.body.clientHeight;
                    if(obj._w==w&&obj._h==h)
                        return;
                    obj._w=w;obj._h=h;
                }
            }

            var j, f, name, r=true, funs=[];
            //order by: before, on, after
            for(j=0; j<=2; ++j){
                //if in dd, get before Mouse.. only
                if(dd==1 && j!==0 && !event.$force)break;
                //if not in dd, get on/after Mouse.. only
                if(dd==2 && j===0)continue;
                //get event name from event type
                name = self._type[type+j] || ( self._type[type+j] = self._getEventName(type, self._eventtag[j]));
                /*
                event.$e : called by fireEvent
                event.$all : fire all events of the type: before/on/after
                event.$name : fire one group of event of the type.
                */
                if(!event.$e || event.$all || (name==event.$name))Array.prototype.push.apply(funs, obj._getEV(id, name, src));
            }

            /*call function by order
             widget before -> dom before -> widget on -> dom on -> widget after -> dom after
            */
            f=function(a){
                var i, v, k = arguments.callee.funs;
                for(i=0;v=k[i++];)
                    //if any fun return false, stop event bubble
                    if(false === v.call(src, obj, a||event, src))
                        return false;
                return true;
            };
            f.funs=funs;
            r = f();

            if(dragdrop){
                //shortcut for onDrag('mousemove')
                if(type=='drag')
                    dragdrop._onDrag=f;
                else if(type=='dragover')
                    dragdrop._onDragover=f;
            }

            if(dd==1){
                //From parent dropable node to child dropable node, fire parent node's mouseout manually
                if('mouseover'==type && dragdrop._dropElement==src && pre && pre!=src){
                    self({
                        type: 'mouseout',
                        target: pre,
                        $e:true,
                        $name:'beforeMouseout',
                        preventDefault:function(){this.returnValue=false},
                        stopPropagation:function(){this.cancelBubble=true}
                        },pre);
                    dragdrop.setDropElement(src);
                }
                
                //Out of dropable node, 'dragdrop._dropElement' will be set to null in beforeMouseover
                //set _preDropable flag, for parent node is dropable too
                if('mouseout'==type && !dragdrop._dropElement && pre && pre==src){
                    self._preDropable=id;
                    _.asyRun(function(){delete linb.Event._preDropable});
                }

                //if fire dd, prevent to fire parent dd
                //notice: this dont trigger cursor changing in opera
                if(src==dragdrop._dropElement)
                    r=false;
            }
            if(r===false)self.stopBubble(event);
            return r;
        }
    },
    Static:{
        $FALSE:linb.browser.opr?undefined:false,
        _type:{},
        _kb:{keydown:1,keypress:1,keyup:1},
        _reg:/([\.\w]+)(-[\.\w]+)?(:[\.\w]+:)([\.\w]*)/,
        $eventhandler:function(){return linb.Event(arguments[0],this)},
        $eventhandler2:function(){return linb.Event(arguments[0],this,1)},
        _eventtag:'before,on,after'.split(','),
        //collection
        _events : ("mouseover,mouseout,mousedown,mouseup,mousemove,click,dblclick," +
                "keydown,keypress,keyup,scroll,"+
                "blur,focus,"+
                "load,unload,"+
                "change,select,submit,error,"+

                //customized handlers:
                //dont use resize in IE
                "location,size," +
                //dragstart dragdrop dragout will not work in IE(using innerHTML)
                "dragbegin,drag,dragstop,dragleave,dragenter,dragover,drop")
                .split(','),
        //_dragMap:{'drag':1,'dragstop':1,'dragleave':1,'dragenter':1,'dragover':1,'drop':1},
        _getEventName:function(name,pos){
            var me=arguments.callee, map = me.map || (me.map={});
            return map[name+pos] || (name=name.charAt(0).toUpperCase()+name.substring(1))  &&
                (map[name+pos] = pos ?
                    (pos+name.charAt(0).toUpperCase()+name.substring(1)):
                    function(name){
                        var i,j,a=[];
                        for(i=0; j=linb.Event._eventtag[i]; i++)a[i]=j+name;
                        return a;
                    }(name)
                );
        },
        _getEventType:function(name){
            var me=arguments.callee, map = me.map || (me.map={});
            return map[name] || (map[name] = name.replace(/^(on|before|after)/,'').toLowerCase())
        },

        _getProfile:function(id){
            return id && linb.cache.dom[id.replace(this._reg,'$1$3')];
        },
        _handleTabHook:function(src, target){
            if(src===document)return true;
            var node=src,r;
            do{
                if(node==target[0])return true;
            }while(node && (node=node.parentNode) && node!==document && node!==window)

            r=_.tryF(target[1],[target[0]],src);
            return false;
        },
        _handleMouseHover:function(event,target,src,dd){
            if(target==document)return true;
            var node = (event.type=='mouseover'?event.fromElement:event.toElement)||event.relatedTarget;

            //When out of dropable node, if the parent node is dropable return true;
            if(dd && event.type=='mouseover' &&this._preDropable)
                try{
                    do{
                        if(node && node.id && node.id==this._preDropable){return true}
                    }while(node && (node=node.parentNode) && node!==document && node!==window)
                }catch(a){}

            //for firefox wearing anynomous div in input/textarea
            //related to 'div.anonymous-div' always return true
            if(linb.browser.gek)
                try{
                    do{if(node==target)return false;}while(node && (node=node.parentNode))
                }catch(a){
                    var pos=this.getPos(event),
                        node=linb([target]),
                        p=node.offset(),
                        s=node.cssSize(),
                        out=(pos.left<p.left||pos.left>p.left+s.width||pos.top<p.top||pos.top>p.top+s.height);
                    return event.type=='mouseover'?!out:out;
                }
            else
                do{if(node==target)return false;}while(node && (node=node.parentNode))
            return true;
        },

        _tabHookStack:[],
        pushTabOutTrigger:function(boundary, trigger){this._tabHookStack.push([boundary, trigger]);return this},
        popTabOutTrigger:function(flag){if(flag)this._tabHookStack=[];else this._tabHookStack.pop();return this},
        $EVENTHANDLER:"return linb.Event(arguments[0],this)",
        $EVENTHANDLER2:"return linb.Event(arguments[0],this,1)",
        getSrc:function(event){
            var a;
            return ((a=event.target||event.srcElement||null) && linb.browser.kde && a.nodeType == 3)?a.parentNode:a
        },
        getId:function(node){
            return window===node?"___window":document===node?"___document":node?node.id:'';
        },
        // only for mousedown and mouseup
        // return 1 : left button, else not left button
        getBtn:function(event){
	        return linb.browser.ie ?
	                event.button==4 ?
	                    'middle' :
	                        event.button==2 ?
	                            'right' :
	                                'left' :
	                event.which==2 ?
	                    'middle':
	                        event.which==3 ?
	                            'right':
	                                'left';
        },
        getPos:function(event){
            event = event || window.event;
            if(typeof event.pageX == 'number')
                return {left:event.pageX, top:event.pageY};
            else{
                var m = linb.browser.contentBox?document.documentElement:document.body;
                return {left:event.clientX + m.scrollLeft, top:event.clientY + m.scrollTop};
            }
        },
        /*return array(key, control, shift, alt)
        ['k','1','',''] : 'k' pressed, 'control' pressed, 'shift' and 'alt' not pressed
        */
        /*
        opear in window:
            ' = right (39)
            - = insert (45)
            . = del (46)
        */
        getKey:function(event){
            event=event||window.event;
            // use keyCode first for newer safari
            var res=[],t, k= event.$key || event.keyCode || event.charCode || 0;
            //from linb event
            if(typeof k == 'string')
                res[0]=k;
            else{
                var key= String.fromCharCode(k),
                    type=event.type;
                if(
                 //visible char
                 (type=='keypress' && k>=33 && k<=128)
                 //0-9, A-Z
                 ||((k>=48&&k<=57) || (k>=65&&k<=90))
                 )res[0]=key;
                else{
                    if(!(t=arguments.callee.map)){
                        t = arguments.callee.map ={};
                        var k,arr =
                        ("3,enter,8,backspace,9,tab,12,numlock,13,enter,19,pause,20,capslock," +
                        "27,esc,32, ,33,pageup,34,pagedown,35,end,36,home,37,left,38,up,39,right,40,down,44,printscreen," +
                        "45,insert,46,delete,50,down,52,left,54,right,56,up," +
                        "91,win,92,win,93,apps," +
                        "96,0,97,1,98,2,99,3,100,4,101,5,102,6,103,7,104,8,105,9," +
                        "106,*,107,+,109,-,110,.,111,/," +
                        "112,f1,113,f2,114,f3,115,f4,116,f5,117,f6,118,f7,119,f8,120,f9,121,f10,122,f11,123,f12," +
                        "144,numlock,145,scroll," +
                        "186,;,187,=,189,-,190,.,191,/,192,`,"+
                        "219,[,220,\\,221,],222,'," +
                        "224,meta,"+ //Apple Meta and Windows key
                        //safari
                        "63289,numlock,63276,pageup,63277,pagedown,63275,end,63273,home,63234,left,63232,up,63235,right,63233,down,63272,delete,63302,insert,63236,f1,63237,f2,63238,f3,63239,f4,63240,f5,63241,f6,63242,f7,63243,f8,63244,f9,63245,f10,63246,f11,63247,f12,63248,print"
                        ).split(',')
                        for(var i=1,l=arr.length; i<l; i=i+2)
                            t[arr[i-1]]=arr[i]
                        arr.length=0;
                        //add
                        t[188]=',';
                    }
                    res[0]= t[k] || key;
                }
            }

            //control
            if((event.modifiers)?(event.modifiers&Event.CONTROL_MASK):(event.ctrlKey||event.ctrlLeft||k==17||k==57391)){
                if(k==17||k==57391)
                    res[0]='';
                res.push('1');
            }else
                res.push('');

            //shift
            if((event.modifiers)?(event.modifiers&Event.SHIFT_MASK):(event.shiftKey||event.shiftLeft||k==16||k==57390)){
                if(k==16||k==57390)
                    res[0]='';
                res.push('1');
            }else
                res.push('');

            //alt
            if((event.modifiers)?false:(event.altKey||event.altLeft||k==18||k==57388)){
                if(k==18||k==57388)
                    res[0]='';
                res.push('1');
            }else
                res.push('');

            return res;
        },
        getEventPara:function(event){
            var pos=this.getPos(event), keys = this.getKey(event), h={
                pageX:pos.left,
                pageY:pos.top,
                keyCode:keys[0],
                ctrlKey:keys[1],
                shiftKey:keys[2],
                altKey:keys[3]
            };
            for(var i in event)if(i.charAt(0)=='$')h[i]=event[i];
            return h;
        },
        stopBubble:function(event){
            event=event||window.event;
            if(event.stopPropagation)event.stopPropagation();
            event.cancelBubble = true;
            this.stopDefault(event);
        },
        stopDefault:function(event){
            event=event||window.event;
            if(event.preventDefault)event.preventDefault();
            event.returnValue = false;
        },
        //key:control:shift:alt
        keyboardHook:function(key, ctrl, shift, alt, fun,args,scope){
            if(key){
                var p = linb.cache.hookKey, k = (key||'').toLowerCase() + ":"  + (ctrl?'1':'') + ":"  +(shift?'1':'')+ ":" + (alt?'1':'');
                if(typeof fun!='function')delete p[k];
                else p[k]=[fun,args,scope];
             }
            return this;
        }
    }
});Class('linb.Date',null,{
    Initialize:function(){
        var self=this;
        self._mapKeys(self.$TIMEUNIT);
        var a=self._key1,b=self._key2,u=self.$UNIT={};
        for(var i=0,l=a.length;i<l;i++)u[a[i]]=1;
        for(var i=0,l=b.length;i<l;i++)u[b[i]]=1;
        u.w=1;
    },
    Static:{
        _key1:'MILLISECOND,SECOND,MINUTE,HOUR,DAY,WEEK,MONTH,QUARTER,YEAR,DECADE,CENTURY'.split(','),
        _key2:'ms,s,n,h,d,ww,m,q,y,de,c'.split(','),
        // Conversion factors
        $TIMEUNIT : {
            MILLISECOND : 1,
            SECOND      : 1000,           //SECONDS
            MINUTE      : 60000,          //MINUTES 60 * 1000
            HOUR        : 3600000,        //HOURS 60 * 60 * 1000
            DAY         : 86400000,       //DAYS 24 * 60 * 60 * 1000
            WEEK        : 604800000,      //WEEKS 7 * 24 * 60 * 60 * 1000
            MONTH       : 2592000000,     //MONTHS 30 * 24 * 60 * 60 * 1000  (approx = 1 month)
            QUARTER     : 7776000000,     //QUARTERS 90 * 24 * 60 * 60 * 1000  (approx = 3 months)
            YEAR        : 31557600000,    //YEARS 365 * 24 * 60 * 60 * 1000 (approx = 1 year)
            DECADE      : 315576000000,   //DECADES 10 * 365 * 24 * 60 * 60 * 1000 (approx = 1 decade)
            CENTURY     : 3155760000000   //CENTURIES 100 * 365 * 24 * 60 * 60 * 1000 (approx = 1 century)
        },
        $TEXTFORMAT:{
            utciso:function(d,f){f=linb.Date._fix; return d.getUTCFullYear() + '-' +f(d.getUTCMonth() + 1) + '-' +f(d.getUTCDate()) + 'T' +f(d.getUTCHours()) + ':' +f(d.getUTCMinutes()) + ':' +f(d.getUTCSeconds()) + 'Z'},
            iso:function(d,f){f=linb.Date._fix; return d.getFullYear() + '-' +f(d.getMonth() + 1) + '-' +f(d.getDate()) + 'T' +f(d.getHours()) + ':' +f(d.getMinutes()) + ':' +f(d.getSeconds())},
            ms:function(d){return linb.Date._fix(d.getMilliseconds(),3)+ linb.wrapRes('date.MS')},
            s:function(d){return linb.Date._fix(d.getSeconds())+ linb.wrapRes('date.S')},
            n:function(d){return linb.Date._fix(d.getMinutes())+ linb.wrapRes('date.N')},
            h :function(d){return linb.Date._fix(d.getHours())+ linb.wrapRes('date.H')},
            d:function(d){return d.getDate()+ linb.wrapRes('date.D')},
            w : function(d,firstDayOfWeek){return linb.wrapRes('date.WEEKS.'+(d.getDay() - firstDayOfWeek +7)%7 )},
            ww : function(d,firstDayOfWeek){return linb.Date.getWeek(d, firstDayOfWeek) + linb.wrapRes('date.W')},
            m:function(d){return (d.getMonth()+1) + linb.wrapRes('date.M')},
            q : function(d){return (parseInt((d.getMonth()+3)/3-1) + 1) + linb.wrapRes('date.Q')},
            y :function(d){return d.getFullYear() + linb.wrapRes('date.Y')},
            de:function(d){return parseInt(d.getFullYear()/10) + linb.wrapRes('date.DE')},
            c:function(d){return parseInt(d.getFullYear()/100) + linb.wrapRes('date.C')},

            hn:function(d){return linb.wrapRes('date.HN-'+d.getHours()+"-"+d.getMinutes())},
            dhn:function(d){return linb.wrapRes('date.DHN-'+d.getDate()+"-"+d.getHours()+"-"+d.getMinutes())},
            mdhn:function(d){return linb.wrapRes('date.MDHN-'+(d.getMonth()+1)+"-"+d.getDate()+"-"+d.getHours()+"-"+d.getMinutes())},
            hns:function(d){return linb.wrapRes('date.HNS-'+d.getHours()+"-"+d.getMinutes()+"-"+d.getSeconds())},
            hnsms:function(d){return linb.wrapRes('date.HNSMS-'+d.getHours()+"-"+d.getMinutes()+"-"+d.getSeconds()+"-"+d.getMilliseconds())},

            yq:function(d){return linb.wrapRes('date.YQ-'+d.getFullYear()+"-"+(parseInt((d.getMonth()+3)/3-1)+1))},

            ym :   function(d){return linb.wrapRes('date.YM-'+d.getFullYear()+"-"+(d.getMonth()+1))},
            md :  function(d){return linb.wrapRes('date.MD-'+(d.getMonth()+1)+"-"+d.getDate())},
            ymd :  function(d){return linb.wrapRes('date.YMD-'+d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate())},
            ymd2 :  function(d){return linb.wrapRes('date.YMD2-'+d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate())},
            ymdh:  function(d){return linb.wrapRes('date.YMDH-'+d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+"-"+d.getHours())},
            ymdhn: function(d){return linb.wrapRes('date.YMDHN-'+d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+"-"+d.getHours()+"-"+d.getMinutes())},
            ymdhns:function(d){return linb.wrapRes('date.YMDHNS-'+d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+"-"+d.getHours()+"-"+d.getMinutes()+"-"+d.getSeconds())},
            'all' :  function(d){return linb.wrapRes('date.ALL-'+d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+"-"+d.getHours()+"-"+d.getMinutes()+"-"+d.getSeconds()+"-"+d.getMilliseconds())}
        },
        $TIMEZONE:[{
            id:"Asia(East,North)",
            sub:[{
                    id:"Brunei",
                    v:"+0800"
                },{
                    id:"Burma",
                    v:"+0630"
                },{
                    id:"Cambodia",
                    v:"+0700"
                },{
                    id:"China",
                    v:"+0800"
                },{
                    id:"China(HK,Macau)",
                    v:"+0800"
                },{
                    id:"China(TaiWan)",
                    v:"+0800"
                },{
                    id:"China(Urumchi)",
                    v:"+0700"
                },{
                    id:"East Timor",
                    v:"+0800"
                },{
                    id:"Indonesia",
                    v:"+0700"
                },{
                    id:"Japan",
                    v:"+0900"
                },{
                    id:"Kazakhstan(Aqtau)",
                    v:"+0400"
                },{
                    id:"Kazakhstan(Aqtobe)",
                    v:"+0500"
                },{
                    id:"Kazakhstan(Astana)",
                    v:"+0600"
                },{
                    id:"Kirghizia",
                    v:"+0500"
                },{
                    id:"Korea",
                    v:"+0900"
                },{
                    id:"Laos",
                    v:"+0700"
                },{
                    id:"Malaysia",
                    v:"+0800"
                },{
                    id:"Mongolia",
                    v:"+0800",
                    tag:"03L03|09L03"
                },{
                    id:"Philippines",
                    v:"+0800"
                },{
                    id:"Russia(Anadyr)",
                    v:"+1300",
                    tag:"03L03|10L03"
                },{
                    id:"Russia(Kamchatka)",
                    v:"+1200",
                    tag:"03L03|10L03"
                },{
                    id:"Russia(Magadan)",
                    v:"+1100",
                    tag:"03L03|10L03"
                },{
                    id:"Russia(Vladivostok)",
                    v:"+1000",
                    tag:"03L03|10L03"
                },{
                    id:"Russia(Yakutsk)",
                    v:"+0900",
                    tag:"03L03|10L03"
                },{
                    id:"Singapore",
                    v:"+0800"
                },{
                    id:"Thailand",
                    v:"+0700"
                },{
                    id:"Vietnam",
                    v:"+0700"
                }]
            },{
                id:"Asia(South,West)",
                sub:[{
                    id:"Afghanistan",
                    v:"+0430"
                },{
                    id:"Arab Emirates",
                    v:"+0400"
                },{
                    id:"Bahrain",
                    v:"+0300"
                },{
                    id:"Bangladesh",
                    v:"+0600"
                },{
                    id:"Bhutan",
                    v:"+0600"
                },{
                    id:"Cyprus",
                    v:"+0200"
                },{
                    id:"Georgia",
                    v:"+0500"
                },{
                    id:"India",
                    v:"+0530"
                },{
                    id:"Iran",
                    v:"+0330",
                    tag:"04 13|10 13"
                },{
                    id:"Iraq",
                    v:"+0300",
                    tag:"04 13|10 13"
                },{
                    id:"Israel",
                    v:"+0200",
                    tag:"04F53|09F53"
                },{
                    id:"Jordan",
                    v:"+0200"
                },{
                    id:"Kuwait",
                    v:"+0300"
                },{
                    id:"Lebanon",
                    v:"+0200",
                    tag:"03L03|10L03"
                },{
                    id:"Maldives",
                    v:"+0500"
                },{
                    id:"Nepal",
                    v:"+0545"
                },{
                    id:"Oman",
                    v:"+0400"
                },{
                    id:"Pakistan",
                    v:"+0500"
                },{
                    id:"Palestine",
                    v:"+0200"
                },{
                    id:"Qatar",
                    v:"+0300"
                },{
                    id:"Saudi Arabia",
                    v:"+0300"
                },{
                    id:"Sri Lanka",
                    v:"+0600"
                },{
                    id:"Syria",
                    v:"+0200",
                    tag:"04 13|10 13"
                },{
                    id:"Tajikistan",
                    v:"+0500"
                },{
                    id:"Turkey",
                    v:"+0200"
                },{
                    id:"Turkmenistan",
                    v:"+0500"
                },{
                    id:"Uzbekistan",
                    v:"+0500"
                },{
                    id:"Yemen",
                    v:"+0300"
                }]
            },{
                id:"North Europe",
                sub:[{
                    id:"Denmark",
                    v:"+0100",
                    tag:"04F03|10L03"
                },{
                    id:"Faroe Is.(DK)",
                    v:"+0100"
                },{
                    id:"Finland",
                    v:"+0200",
                    tag:"03L01|10L01"
                },{
                    id:"Iceland",
                    v:"+0000"
                },{
                    id:"Jan Mayen(Norway)",
                    v:"-0100"
                },{
                    id:"Norwegian",
                    v:"+0100"
                },{
                    id:"Svalbard(NORWAY)",
                    v:"+0100"
                },{
                    id:"Sweden",
                    v:"+0100",
                    tag:"03L01|10L01"
                }]
            },{
                id:"Eastern Europe",
                sub:[{
                    id:"Armenia",
                    v:"+0400"
                },{
                    id:"Austria",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"Azerbaijan",
                    v:"+0400"
                },{
                    id:"Belarus",
                    v:"+0200",
                    tag:"03L03|10L03"
                },{
                    id:"Czech",
                    v:"+0100"
                },{
                    id:"Estonia",
                    v:"+0200"
                },{
                    id:"Georgia",
                    v:"+0500"
                },{
                    id:"Germany",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"Hungarian",
                    v:"+0100"
                },{
                    id:"Latvia",
                    v:"+0200"
                },{
                    id:"Liechtenstein",
                    v:"+0100"
                },{
                    id:"Lithuania",
                    v:"+0200"
                },{
                    id:"Moldova",
                    v:"+0200"
                },{
                    id:"Poland",
                    v:"+0100"
                },{
                    id:"Rumania",
                    v:"+0200"
                },{
                    id:"Russia(Moscow)",
                    v:"+0300",
                    tag:"03L03|10L03"
                },{
                    id:"Slovakia",
                    v:"+0100"
                },{
                    id:"Switzerland",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"Ukraine",
                    v:"+0200"
                },{
                    id:"Ukraine(Simferopol)",
                    v:"+0300"
                }]
            },{
                id:"Western Europe",
                sub:[{
                    id:"Andorra",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"Belgium",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"Channel Is.(UK)",
                    v:"+0000",
                    tag:"03L01|10L01"
                },{
                    id:"France",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"Gibraltar(UK)",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"Ireland",
                    v:"+0000",
                    tag:"03L01|10L01"
                },{
                    id:"Isle of Man(UK)",
                    v:"+0000",
                    tag:"03L01|10L01"
                },{
                    id:"Luxembourg",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"Monaco",
                    v:"+0100"
                },{
                    id:"Netherlands",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"United Kingdom",
                    v:"+0000",
                    tag:"03L01|10L01"
                }]
            },{
                id:"South Europe",
                sub:[{
                    id:"Albania",
                    v:"+0100"
                },{
                    id:"Bosnia",
                    v:"+0100"
                },{
                    id:"Bulgaria",
                    v:"+0200"
                },{
                    id:"Croatia",
                    v:"+0100"
                },{
                    id:"Greece",
                    v:"+0200",
                    tag:"03L01|10L01"
                },{
                    id:"Holy See",
                    v:"+0100"
                },{
                    id:"Italy",
                    v:"+0100",
                    tag:"03L01|10L01"
                },{
                    id:"Macedonia",
                    v:"+0100"
                },{
                    id:"Malta",
                    v:"+0100"
                },{
                    id:"Montenegro",
                    v:"+0100"
                },{
                    id:"Portugal",
                    v:"+0000",
                    tag:"03L01|10L01"
                },{
                    id:"San Marino",
                    v:"+0100"
                },{
                    id:"Serbia",
                    v:"+0100"
                },{
                    id:"Slovenia",
                    v:"+0100"
                },{
                    id:"Span",
                    v:"+0100",
                    tag:"03L01|10L01"
                }]
            },{
                id:"North America",
                sub:[{
                    id:"Canada(AST)",
                    v:"-0400",
                    tag:"04F02|10L02"
                },{
                    id:"Canada(CST)",
                    v:"-0600",
                    tag:"04F02|10L02"
                },{
                    id:"Canada(EST)",
                    v:"-0500",
                    tag:"04F02|10L02"
                },{
                    id:"Canada(MST)",
                    v:"-0700",
                    tag:"04F02|10L02"
                },{
                    id:"Canada(NST)",
                    v:"-0330",
                    tag:"04F02|10L02"
                },{
                    id:"Canada(PST)",
                    v:"-0800",
                    tag:"04F02|10L02"
                },{
                    id:"Greenland(DK)",
                    v:"-0300"
                },{
                    id:"US(Central)",
                    v:"-0600",
                    tag:"03S02|11F02"
                },{
                    id:"US(Eastern)",
                    v:"-0500",
                    tag:"03S02|11F02"
                },{
                    id:"US(Mountain)",
                    v:"-0700",
                    tag:"03S02|11F02"
                },{
                    id:"US(Pacific)",
                    v:"-0800",
                    tag:"03S02|11F02"
                },{
                    id:"US(Alaska)",
                    v:"-0900"
                },{
                    id:"US(Arizona)",
                    v:"-0700"
                }]
            },{
                id:"South America",
                sub:[{
                    id:"Anguilla(UK)",
                    v:"-0400"
                },{
                    id:"Antigua&amp;Barbuda",
                    v:"-0400"
                },{
                    id:"Antilles(NL)",
                    v:"-0400"
                },{
                    id:"Argentina",
                    v:"-0300"
                },{
                    id:"Aruba(NL)",
                    v:"-0400"
                },{
                    id:"Bahamas",
                    v:"-0500"
                },{
                    id:"Barbados",
                    v:"-0400"
                },{
                    id:"Belize",
                    v:"-0600"
                },{
                    id:"Bolivia",
                    v:"-0400"
                },{
                    id:"Brazil(AST)",
                    v:"-0500",
                    tag:"10F03|02L03"
                },{
                    id:"Brazil(EST)",
                    v:"-0300",
                    tag:"10F03|02L03"
                },{
                    id:"Brazil(FST)",
                    v:"-0200",
                    tag:"10F03|02L03"
                },{
                    id:"Brazil(WST)",
                    v:"-0400",
                    tag:"10F03|02L03"
                },{
                    id:"British Virgin Is.(UK)",
                    v:"-0400"
                },{
                    id:"Cayman Is.(UK)",
                    v:"-0500"
                },{
                    id:"Chilean",
                    v:"-0300",
                    tag:"10F03|03F03"
                },{
                    id:"Chilean(Hanga Roa)",
                    v:"-0500",
                    tag:"10F03|03F03"
                },{
                    id:"Colombia",
                    v:"-0500"
                },{
                    id:"Costa Rica",
                    v:"-0600"
                },{
                    id:"Cuba",
                    v:"-0500",
                    tag:"04 13|10L03"
                },{
                    id:"Dominican",
                    v:"-0400"
                },{
                    id:"Ecuador",
                    v:"-0500"
                },{
                    id:"El Salvador",
                    v:"-0600"
                },{
                    id:"Falklands",
                    v:"-0300",
                    tag:"09F03|04F03"
                },{
                    id:"Grenada",
                    v:"-0400"
                },{
                    id:"Guadeloupe(FR)",
                    v:"-0400"
                },{
                    id:"Guatemala",
                    v:"-0600"
                },{
                    id:"Guiana(FR)",
                    v:"-0300"
                },{
                    id:"Guyana",
                    v:"-0400"
                },{
                    id:"Haiti",
                    v:"-0500"
                },{
                    id:"Honduras",
                    v:"-0600"
                },{
                    id:"Jamaica",
                    v:"-0500"
                },{
                    id:"Martinique(FR)",
                    v:"-0400"
                },{
                    id:"Mexico(Mazatlan)",
                    v:"-0700"
                },{
                    id:"Mexico(Tijuana)",
                    v:"-0800"
                },{
                    id:"Mexico(Mexico)",
                    v:"-0600"
                },{
                    id:"Montserrat(UK)",
                    v:"-0400"
                },{
                    id:"Nicaragua",
                    v:"-0500"
                },{
                    id:"Panama",
                    v:"-0500"
                },{
                    id:"Paraguay",
                    v:"-0400",
                    tag:"10F03|02L03"
                },{
                    id:"Peru",
                    v:"-0500"
                },{
                    id:"Puerto Rico(US)",
                    v:"-0400"
                },{
                    id:"So. Georgia&amp;So. Sandwich Is.(UK)",
                    v:"-0200"
                },{
                    id:"St. Kitts&amp;Nevis",
                    v:"-0400"
                },{
                    id:"St. Lucia",
                    v:"-0400"
                },{
                    id:"St. Vincent&amp;Grenadines",
                    v:"-0400"
                },{
                    id:"Suriname",
                    v:"-0300"
                },{
                    id:"Trinidad&amp;Tobago",
                    v:"-0400"
                },{
                    id:"Turks&amp;Caicos Is.(UK)",
                    v:"-0500"
                },{
                    id:"Uruguay",
                    v:"-0300"
                },{
                    id:"Venezuela",
                    v:"-0400"
                },{
                    id:"Virgin Is.(US)",
                    v:"-0400"
                }]
            },{
                id:"Africa(North)",
                sub:[{
                    id:"Algeria",
                    v:"+0100"
                },{
                    id:"Egypt",
                    v:"+0200",
                    tag:"04L53|09L43"
                },{
                    id:"Libyan",
                    v:"+0200"
                },{
                    id:"Morocco",
                    v:"+0000"
                },{
                    id:"Sudan",
                    v:"+0200"
                },{
                    id:"Tunisia",
                    v:"+0100"
                }]
            },{
                id:"Africa(Western)",
                sub:[{
                    id:"Benin",
                    v:"+0100"
                },{
                    id:"Burkina Faso",
                    v:"+0000"
                },{
                    id:"Canary Is.(SP)",
                    v:"-0100"
                },{
                    id:"Cape Verde",
                    v:"-0100"
                },{
                    id:"Chad",
                    v:"+0100"
                },{
                    id:"Gambia",
                    v:"+0000"
                },{
                    id:"Ghana",
                    v:"+0000"
                },{
                    id:"Guinea",
                    v:"+0000"
                },{
                    id:"Guinea-Bissau",
                    v:"+0000"
                },{
                    id:"Ivory Coast",
                    v:"+0000"
                },{
                    id:"Liberia",
                    v:"+0000"
                },{
                    id:"Mali",
                    v:"+0000"
                },{
                    id:"Mauritania",
                    v:"+0000"
                },{
                    id:"Niger",
                    v:"+0100"
                },{
                    id:"Nigeria",
                    v:"+0100"
                },{
                    id:"Senegal",
                    v:"+0000"
                },{
                    id:"Sierra Leone",
                    v:"+0000"
                },{
                    id:"Togo",
                    v:"+0000"
                },{
                    id:"Western Sahara",
                    v:"+0000"
                }]
            },{
                id:"Africa(Central)",
                sub:[{
                    id:"Cameroon",
                    v:"+0100"
                },{
                    id:"Cen.African Rep.",
                    v:"+0100"
                },{
                    id:"Congo,Democratic",
                    v:"+0100"
                },{
                    id:"Congo,Republic",
                    v:"+0100"
                },{
                    id:"Equatorial Guinea",
                    v:"+0100"
                },{
                    id:"Gabon",
                    v:"+0100"
                },{
                    id:"Sao Tome&amp;Principe",
                    v:"+0000"
                }]
            },{
                id:"Africa(East)",
                sub:[{
                    id:"Burundi",
                    v:"+0200"
                },{
                    id:"Comoros",
                    v:"+0300"
                },{
                    id:"Djibouti",
                    v:"+0300"
                },{
                    id:"Eritrea",
                    v:"+0300"
                },{
                    id:"Ethiopia",
                    v:"+0300"
                },{
                    id:"Kenya",
                    v:"+0300"
                },{
                    id:"Madagascar",
                    v:"+0300"
                },{
                    id:"Malawi",
                    v:"+0200"
                },{
                    id:"Mauritius",
                    v:"+0400"
                },{
                    id:"Mayotte(FR)",
                    v:"+0300"
                },{
                    id:"Mozambique",
                    v:"+0200"
                },{
                    id:"Reunion(FR)",
                    v:"+0400"
                },{
                    id:"Rwanda",
                    v:"+0200"
                },{
                    id:"Seychelles",
                    v:"+0300"
                },{
                    id:"Somalia",
                    v:"+0300"
                },{
                    id:"Tanzania",
                    v:"+0300"
                },{
                    id:"Uganda",
                    v:"+0300"
                }]
            },{
                id:"Africa(South)",
                sub:[{
                    id:"Angola",
                    v:"+0100"
                },{
                    id:"Botswana",
                    v:"+0200"
                },{
                    id:"Lesotho",
                    v:"+0200"
                },{
                    id:"Namibia",
                    v:"+0200",
                    tag:"09F03|04F03"
                },{
                    id:"Saint Helena(UK)",
                    v:"-0100"
                },{
                    id:"South Africa",
                    v:"+0200"
                },{
                    id:"Swaziland",
                    v:"+0200"
                },{
                    id:"Zambia",
                    v:"+0200"
                },{
                    id:"Zimbabwe",
                    v:"+0200"
                }]
            },{
                id:"Oceania",
                sub:[{
                    id:"American Samoa(US)",
                    v:"-1100"
                },{
                    id:"Australia(Adelaide)",
                    v:"+0930",
                    sub:"10L03|03L03"
                },{
                    id:"Australia(Brisbane)",
                    v:"+1000"
                },{
                    id:"Australia(Darwin)",
                    v:"+0930"
                },{
                    id:"Australia(Hobart)",
                    v:"+1000",
                    sub:"10L03|03L03"
                },{
                    id:"Australia(Perth)",
                    v:"+0800"
                },{
                    id:"Australia(Sydney)",
                    v:"+1000",
                    sub:"10L03|03L03"
                },{
                    id:"Cook Islands(NZ)",
                    v:"-1000"
                },{
                    id:"Eniwetok",
                    v:"-1200"
                },{
                    id:"Fiji",
                    v:"+1200",
                    sub:"11F03|02L03"
                },{
                    id:"Guam",
                    v:"+1000"
                },{
                    id:"Hawaii(US)",
                    v:"-1000"
                },{
                    id:"Kiribati",
                    v:"+1100"
                },{
                    id:"Marshall Is.",
                    v:"+1200"
                },{
                    id:"Micronesia",
                    v:"+1000"
                },{
                    id:"Midway Is.(US)",
                    v:"-1100"
                },{
                    id:"Nauru Rep.",
                    v:"+1200"
                },{
                    id:"New Calednia(FR)",
                    v:"+1100"
                },{
                    id:"New Zealand",
                    v:"+1200",
                    sub:"10F03|04F63"
                },{
                    id:"New Zealand(CHADT)",
                    v:"+1245",
                    sub:"10F03|04F63"
                },{
                    id:"Niue(NZ)",
                    v:"-1100"
                },{
                    id:"Nor. Mariana Is.",
                    v:"+1000"
                },{
                    id:"Palau",
                    v:"+0900"
                },{
                    id:"Papua New Guinea",
                    v:"+1000"
                },{
                    id:"Pitcairn Is.(UK)",
                    v:"-0830"
                },{
                    id:"Polynesia(FR)",
                    v:"-1000"
                },{
                    id:"Solomon Is.",
                    v:"+1100"
                },{
                    id:"Tahiti",
                    v:"-1000"
                },{
                    id:"Tokelau(NZ)",
                    v:"-1100"
                },{
                    id:"Tonga",
                    v:"+1300",
                    tag:"10F63|04F63"
                },{
                    id:"Tuvalu",
                    v:"+1200"
                },{
                    id:"Vanuatu",
                    v:"+1100"
                },{
                    id:"Western Samoa",
                    v:"-1100"
                },{
                    id:"Data Line",
                    v:"-1200"
                }]
            }
        ],
        //map like: MILLISECOND <=> ms
        _mapKeys:function(obj){
            var self=this, t=self._key2, m=self._key1;
            for(var i=0,l=m.length;i<l;i++)
                obj[t[i]]=obj[m[i]];
        },
        //get valid datepart
        _validUnit:function(datepart){
            return this.$UNIT[datepart]?datepart:'d';
        },
        _isDate:function(target)  {return !!target && target.constructor == Date},
        _date:function(value,df){return this._isDate(value)?value:this._isDate(df)?df:new Date},
        _isNumb:function(target)  {return typeof target == 'number' && isFinite(target)},
        _numb:function(value,df){return this._isNumb(value)?value:this._isNumb(df)?df:0},
        //time Zone like: -8
        _timeZone:-((new Date).getTimezoneOffset()/60),

        /*get specific date datepart
        *
        */
        get:function(date, datepart, firstDayOfWeek){
            var self=this;
            date = self._date(date);
            datepart = self._validUnit(datepart);
            firstDayOfWeek = self._numb(firstDayOfWeek);

            var map = arguments.callee.map || ( arguments.callee.map = {
                    ms:function(d){return d.getMilliseconds()},
                    s:function(d){return d.getSeconds()},
                    n:function(d){return d.getMinutes()},
                    h :function(d){return d.getHours()},
                    d:function(d){return d.getDate()},
                    ww:function(d,fd){return linb.Date.getWeek(d, fd)},
                    w :function(d,fd){return (7+d.getDay()-fd)%7},
                    m:function(d){return d.getMonth()},
                    q:function(d){return parseInt((d.getMonth()+3)/3-1)},
                    y :function(d){return d.getFullYear()},
                    de:function(d){return parseInt(d.getFullYear()/10)},
                    c:function(d){return parseInt(d.getFullYear()/100)}
                });
            return map[datepart](date,firstDayOfWeek);
        },
        /*
        * _fix(1,3,'0') => '100'
        */
        _fix:function(str,len,chr){
            len=len||2;
            chr=chr||'0';
            str+="";
            if(str.length<len)
                for(var i=str.length;i<len;i++)
                    str=chr+str;
            return str;
        },
        /*add specific datepart to date
        *
        */
        add: function(date, datepart, count ){
            var self=this,
                tu=self.$TIMEUNIT,
                map,
                date2;
            date = self._date(date);
            datepart = self._validUnit(datepart);


            if(!(map=arguments.callee.map)){
                map=arguments.callee.map = {
                    MILLISECOND:function(date,count){date.setTime(date.getTime() + count*tu.ms)},
                    SECOND:function(date,count){date.setTime(date.getTime() + count*tu.s)},
                    MINUTE:function(date,count){date.setTime(date.getTime() + count*tu.n)},
                    HOUR:function(date,count){date.setTime(date.getTime() + count*tu.h)},
                    DAY:function(date,count){date.setTime(date.getTime() + count*tu.d)},
                    WEEK:function(date,count){date.setTime(date.getTime() + count*tu.ww)},
                    MONTH:function(date,count){
                        var a=date.getDate(),b;
                        count = date.getMonth() + count;
                        this.YEAR(date, Math.floor(count/12));
                        date.setMonth((count%12+12)%12);
                        if((b=date.getDate())!=a)
                            this.DAY(date, -b)
                    },
                    QUARTER:function(date,count){this.MONTH(date,count*3)},
                    YEAR:function(date,count){
                        var a=date.getDate(),b;
                        date.setFullYear(date.getFullYear() + count)
                        if((b=date.getDate())!=a)
                            this.DAY(date, -b)
                    },
                    DECADE:function(date,count){this.YEAR(date,10*count)},
                    CENTURY:function(date,count){this.YEAR(date,100*count)}
                };
                self._mapKeys(map);
            }
            map[datepart](date2=new Date(date), count);
            return date2;
        },
        /*get specific datepart diff between startdate and date2
        *
        */
        diff:function(startdate, enddate, datepart, firstDayOfWeek) {
            var self=this;
            startdate = self._date(startdate);
            enddate = self._date(enddate);
            datepart = self._validUnit(datepart);
            firstDayOfWeek = self._numb(firstDayOfWeek);

            var tu=self.$TIMEUNIT,
                map;

            if(!(map=arguments.callee.map)){
                map = arguments.callee.map = {
                    MILLISECOND:function(startdate,enddate){return enddate.getTime()-startdate.getTime()},
                    SECOND:function(startdate,enddate){
                        var startdate = self.getTimSpanStart(startdate,'s'),
                            enddate = self.getTimSpanStart(enddate,'s'),
                            t=enddate.getTime()-startdate.getTime();
                        return t/tu.s;
                    },
                    MINUTE:function(startdate,enddate){
                        var startdate = self.getTimSpanStart(startdate,'n'),
                            enddate = self.getTimSpanStart(enddate,'n'),
                            t=enddate.getTime()-startdate.getTime();
                        return t/tu.n;
                    },
                    HOUR:function(startdate,enddate){
                        var startdate = self.getTimSpanStart(startdate,'h'),
                            enddate = self.getTimSpanStart(enddate,'h'),
                            t=enddate.getTime()-startdate.getTime();
                        return t/tu.h;
                    },
                    DAY:function(startdate,enddate){
                        var startdate = self.getTimSpanStart(startdate,'d',1),
                            enddate = self.getTimSpanStart(enddate,'d',1),
                            t=enddate.getTime()-startdate.getTime();
                        return t/tu.d;
                    },
                    WEEK:function(startdate,enddate,firstDayOfWeek){
                        var startdate = self.getTimSpanStart(startdate,'ww',1,firstDayOfWeek),
                            enddate = self.getTimSpanStart(enddate,'ww',1,firstDayOfWeek),
                            t=enddate.getTime()-startdate.getTime();
                        return t/tu.ww;
                    },
                    MONTH:function(startdate,enddate){return (enddate.getFullYear()-startdate.getFullYear())*12 + (enddate.getMonth()-startdate.getMonth())},
                    QUARTER:function(startdate,enddate){return (enddate.getFullYear()-startdate.getFullYear())*4 + parseInt((enddate.getMonth()-startdate.getMonth())/3)},
                    YEAR:function(startdate,enddate){return parseInt((enddate.getFullYear()-startdate.getFullYear()))},
                    DECADE:function(startdate,enddate){return parseInt((enddate.getFullYear()-startdate.getFullYear())/10)},
                    CENTURY:function(startdate,enddate){return parseInt((enddate.getFullYear()-startdate.getFullYear())/100)}
                };
                self._mapKeys(map);
            }
            return map[datepart](new Date(startdate),new Date(enddate),firstDayOfWeek);
        },
        /*get the first datepart begin of certain datepart
        *
        */
        getTimSpanStart: function(date, datepart, count, firstDayOfWeek) {
            var self=this,
                tu=self.$TIMEUNIT,
                map,date2;
            date = self._date(date);
            datepart = self._validUnit(datepart);
            firstDayOfWeek = self._numb(firstDayOfWeek);
            count=self._numb(count,1);
            if(!(map=arguments.callee.map)){
                var clearInDay = function(d) {
                        d.setMilliseconds(0);
                        d.setSeconds(0);
                        d.setMinutes(0);
                        d.setHours(0);
                    },
                    clearInYear = function(d) {
                        clearInDay(d);
                        d.setDate(1);
                        d.setMonth(0);
                    };

                map = arguments.callee.map = {
                    MILLISECOND:function(date,count){
                        var x = date.getMilliseconds();
                        date.setMilliseconds(x - (x % count));
                    },
                    SECOND:function(date,count){
                        date.setMilliseconds(0);
                        var x = date.getSeconds();
                        date.setSeconds(x - (x % count));
                    },
                    MINUTE:function(date,count){
                        date.setMilliseconds(0);
                        date.setSeconds(0);
                        var x = date.getMinutes();
                        date.setTime(date.getTime() - (x % count) * tu.n);
                    },
                    HOUR:function(date,count){
                        date.setMilliseconds(0);
                        date.setSeconds(0);
                        date.setMinutes(0);

                        var x = date.getHours();
                        date.setHours(x - (x % count));
                    },
                    DAY:function(date,count){
                        clearInDay(date);
                        var x=date.getDate();
                        date.setDate(x - (x % count));
                    },
                    WEEK:function(date,count,firstDayOfWeek){
                        clearInDay(date);

                        var d = (date.getDay() + 7 - firstDayOfWeek) % 7,date2,x, a=new Date();
                        date.setTime(date.getTime() - d * tu.d);
                        clearInYear(a);
                        a.setFullYear(date.getFullYear());
                        date2 = (a.getDay() + 7 - firstDayOfWeek) % 7;
                        a.setTime(a.getTime() - date2 * tu.d);

                        x= (date.getTime()-a.getTime())/tu.d/7;

                        date.setTime(date.getTime() - (x % count) * tu.ww);
                    },
                    MONTH:function(date,count){
                        clearInDay(date);
                        date.setDate(1);
                        var x = date.getMonth();
                        date.setMonth(x - (x % count));
                    },
                    QUARTER:function(date,count){
                        count=self._numb(count,1);
                        return this.MONTH(date, count*3);
                    },
                    YEAR:function(date,count){
                        clearInYear(date);
                        var x = date.getFullYear();
                        date.setFullYear(x - (x % count));
                    },
                    DECADE:function(date,count){
                        clearInYear(date);
                        date.setFullYear(Math.floor(date.getFullYear() / 10) * 10);
                    },
                    CENTURY:function(date,count){
                        clearInYear(date);
                        date.setFullYear(Math.floor(date.getFullYear() / 100) * 100);
                    }
                };
                self._mapKeys(map);

            }
            map[datepart](date2=new Date(date),count, firstDayOfWeek);
            return date2;
        },
        /*get the last datepart begin of certain datepart
        *
        */
        getTimSpanEnd : function(date, datepart, count,firstDayOfWeek) {
            var self=this;

            date = self._date(date);
            datepart = self._validUnit(datepart);
            firstDayOfWeek = self._numb(firstDayOfWeek);

            count=self._numb(count,1);

            var originalTime = date.getTime(),
                date2 = self.getTimSpanStart(date, datepart, count, firstDayOfWeek);
            if (date2.getTime() < originalTime)
                date2=self.add(date2, datepart, count);
            return date2;
        },
        /*fake a date for a certain timezone (based on the current timezone of "Date object")
        * You have to offset back it, if you expect a total real date:
        *   var localDate = new Date, timezone9Date=linb.Date.offsetTimeZone(localDate, 9);
        *   localDate.toString() == linb.Date.offsetTimeZone(timezone9Date, -9);
        */
        offsetTimeZone:function(date, timeZone, back){
            var self=this;
            date=self._date(date);
            return new Date(date.getTime() + (back?-1:1)*(timeZone - self._timeZone)*self.$TIMEUNIT.h);
        },

        /*get week
        *
        */
        getWeek:function(date, firstDayOfWeek){
            var self=this, date2, y;
            date=self._date(date);
            firstDayOfWeek = self._numb(firstDayOfWeek),
            y=date.getFullYear();

            date = self.add(self.getTimSpanStart(date, 'ww', 1, firstDayOfWeek),'d',6);

            if(date.getFullYear()!=y)return 1;

            date2 = self.getTimSpanStart(date, 'y', 1);
            date2 = self.add(self.getTimSpanStart(date2, 'ww', 1, firstDayOfWeek),'d',6);

            return self.diff(date2, date, 'ww')+1;
        },
        parse:function(str){
            str+="";
            var self=this,utc,
                me=arguments.callee,
                dp=me.dp||(me.dp={
                  FullYear: 2,
                  Month: 4,
                  Date: 6,
                  Hours: 8,
                  Minutes: 10,
                  Seconds: 12,
                  Milliseconds: 14
                }),
                match = str.match(me.iso||(me.iso=/^((-\d+|\d{4,})(-(\d{2})(-(\d{2}))?)?)?T((\d{2})(:(\d{2})(:(\d{2})(\.(\d{1,3})(\d)?\d*)?)?)?)?(([+-])(\d{2})(:(\d{2}))?|Z)?$/)),
                date = new Date(0)
                ;
            if(match){
                //month
                if(match[4])match[4]--;
                //ms to 3 digits
                if (match[15]>=5)match[14]++;
                utc = match[16]||match[18]?"UTC":"";
                for (var i in dp) {
                    var v = match[dp[i]];
                    if(!v)continue;
                    date["set" + utc + i](v);
                    if (date["get" + utc + i]() != match[dp[i]])
                        return null;
                }
                if(match[18]){
                    var h = Number(match[17] + match[18]),
                        m = Number(match[17] + (match[20] || 0));
                    date.setUTCMinutes(date.getUTCMinutes() + (h * 60) + m);
                }
                return date;
            }else{
                var r=Date.parse(str);
                return r?date.setTime(r) && date:null;
            }
        },
        getText:function(date, datepart, firstDayOfWeek){
            var self=this;
            date = self._date(date);
            firstDayOfWeek = self._numb(firstDayOfWeek);
            datepart=datepart||'';
            return self.$TEXTFORMAT[datepart](date, firstDayOfWeek);
        }
    }
});/* css
*  dependency: base _ ; Class ; linb ;
*/
Class("linb.CSS", null,{
    Static:{
        _r:linb.browser.ie?'rules':'cssRules',
        _baseid:'linb:css:base',
        _firstid:'linb:css:first',
        _lastid:'linb:css:last',
        _createCss:function(id, last){
            var ns=this,
                head=this._getHead(),
                fid=ns._firstid,
                lid=ns._lastid,
                fc,
                c;
            fc=document.createElement('style');
            fc.type="text/css";
            fc.id=id;
            if(!last){
                c= document.getElementById(fid) || head.firstChild;
                while((c=c.nextSibling) && !/^(script|link|style)$/i.test(''+c.tagName));
                if(c)
                    head.insertBefore(fc, c);
                else{
                    if(c= document.getElementById(lid))
                        head.insertBefore(fc, c);
                    else
                        head.appendChild(fc);
                }
            }else
                head.appendChild(fc);
            return fc;
        },
        _getCss:function(id, last){
            return document.getElementById(id) || this._createCss(id, last);
        },
        _getBase:function(){
            return this._getCss(this._baseid);
        },
        _getFirst:function(){
            return this._getCss(this._firstid);
        },
        _getLast:function(){
            return this._getCss(this._lastid, true);
        },
        _getHead:function(){
            return this._head || (this._head=document.getElementsByTagName("head")[0]||document.documentElement);
        },
        _check:function(){
            if(!linb.browser.ie)return;
            var count=0;
            for(var head = this._getHead(),i=0,t=head.childNodes,l;l=t[i++];)
                if(l.type=="text/css" )
                    count++
            return count>20;
        },
        get:function(property, value){
            for(var head = this._getHead(),i=0,t=head.childNodes,l;l=t[i++];)
                if(l.type=="text/css" && property in l && l[property]==value)
                    return l;
            return false;
        },
        //if backOf==true, add to head last node
        //else add to the before position of the base styleSheet
        addStyleSheet:function(txt, id, backOf ){
            var e, ns=this, head = ns._getHead(),add=function(txt,id,backOf){
                var e = document.createElement('style');
                e.type="text/css";
                if(id)e.id=id;
                //for ie
                if(linb.browser.ie)
                    e.styleSheet.cssText = txt||'';
                else
                    try{e.appendChild(document.createTextNode(txt||''))}catch(p){e.styleSheet.cssText = txt||''}
                head.insertBefore(e, backOf  ?ns._getLast():ns._getBase());
                e.disabled=true;
                e.disabled=false;
                return e;
            },merge=function(txt,backOf){
                var e=backOf ?ns._getLast():ns._getBase();
                e.styleSheet.cssText +=txt;
                return e;
            };
            if(id && (id=id.replace(/[^\w\-\_\.\:]/g,'_')) && (e=ns.get('id',id)))
                return e;

            if(ns._check()){
                return merge(txt, backOf);
            }else
                return add(txt,id,backOf);
        },
        //if front==true, add to the before position of the base styleSheet
        //else add to the last postion
        includeLink:function(href, id, front, attr){
            var e, ns=this, head = ns._getHead();
            if(href && (e=ns.get('href',href))){}else{
                e = document.createElement('link');
                e.type = 'text/css';
                e.rel = 'stylesheet';
                e.href = href;
                if(id)
                    e.id=id;
                e.media = 'all';
                _.each(attr,function(o,i){
                    e.setAttribute(i,o);
                });
            }
            head.insertBefore(e, front?ns._getBase():ns._getLast());
            e.disabled=true;
            e.disabled=false;
            return e;
        },
        remove:function(property,value){
            var head = this._getHead();
            if(value=this.get(property,value)){
                value.disabled=true;
                head.removeChild(value);
            }
        },
        replaceLink:function(href, property, oValue, nValue){
            var ns=this,
                head=ns._getHead(),
                attr={},e,v;
            attr[property]=nValue;
            e=ns.includeLink(href,null,false,attr);
            if(v=ns.get(property,oValue))
                head.replaceChild(e,v);
            e.disabled=true;
            e.disabled=false;
        },
        _build:function(selector, value, flag){
            var t='';
            _.each(value,function(o,i){
                t += i.replace(/([A-Z])/g,"-$1").toLowerCase() + ":" + o +";";
            });
            return flag?t:selector+"{" + t + "}";
        },
        //selector: single css exp without ','; not allow '.a, .b{}'
        //  for *** IE *** allow single css exp only
        setStyleRules:function(selector, value, force){
            var ns=this,
                add=true,
                ds=document.styleSheets,
                target, target2, selectorText, bak, h, e, t, _t;
            selector = _.str.trim(selector.replace(/\s+/g,' '));
            if(!(value&&force)){
                bak=selector.toLowerCase();
                _.arr.each(_.toArr(ds),function(o){
                    try{o[ns._r]}catch(e){return}
                    _.arr.each(_.toArr(o[ns._r]),function(v,i){
                        if(!v.selectorText)return;
                        selectorText =  v.selectorText.replace(/\.(\w+)\[CLASS~="\1"\]/g,'.$1')
                                         .replace(/\[ID"([^"]+)"\]/g,'#$1')
                                         .replace(/\*([.#])/g,'$1')
                                         .replace(/\s+/g,' ')
                                         .replace(/\*\|/g,'')
                                         .replace(/(\s*,\s*)/g,',').toLowerCase();
                        /*Notice: in IE, no ',' in any selectorTExt*/
                        _t=_.toArr(selectorText);
                        //null=>remove
                        if(!value){
                            add=false;
                            if(_.arr.indexOf(_t,bak)!=-1 && _t.length>1){
                                _t=_.arr.removeFrom(_t,_.arr.indexOf(_t,bak)).join(',');
                                t=v.cssText.slice(v.cssText.indexOf("{")+1,v.cssText.lastIndexOf("}"));
                                if(o.insertRule)
                                    o.insertRule(_t+"{" + t + "}", o[ns._r].length);
                                else if(o.addRule )
                                    o.addRule(_t, t);
                                if(o.deleteRule)
                                    o.deleteRule(i);
                                else
                                    o.removeRule(i);
                                o.disabled=true;
                                o.disabled=false;
                            }else if(selectorText == bak){
                                if(o.deleteRule)
                                    o.deleteRule(i);
                                else
                                    o.removeRule(i);
                                o.disabled=true;
                                o.disabled=false;
                            }
                        //modify the last one
                        }else{
                            //for single css exp, (all single css exp in IE)
                            if(selectorText==bak){target=v;return false}
                            //for multi css exps, not in IE
                            if(_.arr.indexOf(_t,bak)!=-1){target2=v;return false}
                        }
                    },null,true);
                    if(target){
                        add=false;
                        try{
                            _.each(value,function(o,i){
                                i=i.replace(/(-[a-z])/gi, function(m,a){return a.charAt(1).toUpperCase()});
                                target.style[i]= typeof o=='function'?o(target.style[i]):o;
                            })
                        }catch(e){}
                        o.disabled=true;
                        o.disabled=false;
                        return false;
                    //not in IE
                    }else if(target2){
                        add=false;
                        o.insertRule(ns._build(selector,value), o[ns._r].length);
                        o.disabled=true;
                        o.disabled=false;
                        return false;
                    }
                },null,true);
            }
            //need to add
            if(force || add)
                ns._addRules(selector,value);
            return ns;
        },
        _addRules:function(selector,value){
            var ns=this,
                target=ns._getLast(),
                changed=target.sheet || target.styleSheet;
            if(changed.insertRule)
                changed.insertRule(ns._build(selector,value), changed[ns._r].length);
            else if(changed.addRule )
                changed.addRule(selector, ns._build(selector,value,true));
            target.disabled=true;
            target.disabled=false;
            return ns;
        }
    },
    Initialize:function(){
        var b=linb.browser;
        this.addStyleSheet(""+
            "html{color:#000;background:#FFF;}"+
            "body{cursor:default;font:13px/1.231 arial,helvetica,clean,sans-serif;}"+
            (linb.browser.ie?"body{font-size:small;font:x-small;}":"")+
            "body *{line-height:1.22em;}"+
            "body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td{margin:0;padding:0;}"+
            "table{border-collapse:collapse;border-spacing:0;empty-cells:show;font-size:inherit;font:100%;}"+
            "fieldset,img{border:0;}"+
            "address,caption,cite,code,dfn,em,strong,th,var{font-style:normal;font-weight:normal;}"+
            "ol,ul,li{list-style:none;}"+
            "caption,th{text-align:left;}"+
            "h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal;}"+
            "q:before,q:after{content:'';}"+
            "abbr,acronym {border:0;font-variant:normal;}"+
            "sup {vertical-align:text-top;}"+
            "sub {vertical-align:text-bottom;}"+
            "input,textarea,select{font-family:inherit;font-size:inherit;font-weight:inherit;}"+
            (b.ie?"input,textarea,select{font-size:100%;}":"")+
            "legend{color:#000;}"+
            "del,ins{text-decoration:none;}"+
            "pre,code,kbd,samp,tt{font-family:monospace;"+(b.ie?"font-size:108%;":"")+"line-height:100%;}"+
            "select,input,button,textarea{font:99% arial,helvetica,clean,sans-serif;border-width:1px;}"+

            "a{text-decoration:none;"+(b.gek?"-moz-user-select:none;":"")+"}"+
            "a:hover{color:red}"+
            (b.gek?"a:focus{-moz-outline-offset:-1px !important}":"")+
            "div{font-size:12px;}"+
            "span{"+
            (b.gek?"display:-moz-inline-block;display:-moz-inline-box;display:inline-block;":
                b.ie6?"display:inline-box;display:inline;":"display:inline-block;")+
            (b.ie?"zoom:1;":"")+
            (b.gek3?"":"vertical-align:middle;")+
            "}"+
            "h1{font-size:138.5%;}"+
            "h2{font-size:123.1%;}"+
            "h3{font-size:108%;}"+
            "h1,h2,h3{margin:1em 0;}"+
            "h1,h2,h3,h4,h5,h6,strong {font-weight:bold;}"+
            "em{font-style:italic;}"
        , 'linb.CSS');
    }   
});Class('linb.absProfile',null,{
    Constructor:function(){
        if(!this.$id)this.$id=linb.absProfile.$id.next();
    },
    Instance:{
        getId:function(){
            return this.$id;
        },
        link:function(obj,id,target){
            var self=this,
                //avoid Number;
                uid='$'+self.$id;

            target = target||self;
            if(obj[uid])self.unLink(id);

            //double link
            obj[uid]=target;
            if(obj instanceof Array)obj.push(target);

            //antilink track
            self._links[id]=obj;
            return self;
        },
        unLink:function(id){
            var self=this,
                o,
                //avoid Number;
                uid='$'+self.$id;
            if(!self._links)return;
            if(!(o=self._links[id]))return;

            //remove from target
            if(o instanceof Array)_.arr.removeValue(o,o[uid]);
            delete o[uid];

            //remove from self
            delete self._links[id];

            return self;
        },
        unLinkAll:function(){
            var self=this,
                id='$'+self.$id,
                l=self._links,
                o,i;
            for(i in l){
                o=l[i];
                if(o instanceof Array)_.arr.removeValue(o,o[id]);
                delete o[id];
            }
            self._links={};
            return self;
        }
    },
    Static:{
        $id:new _.id,
        $abstract:true
    }
});
Class('linb.DomProfile', 'linb.absProfile', {
    Constructor:function(domId, domNode){
        arguments.callee.upper.call(this);
        var self=this;
        self.domNode=domNode;
        linb.cache.dom[self.domId=domId]=self;
        self.nodeVars={};
    },
    Instance:{
        __gc:function(){
            var self=this,t;
            if(self.nodeVars&&(t=self.domNode))
                _.each(self.nodeVars,function(o,i){
                    t[i]=null;
                });
            delete linb.cache.dom[self.domId];
            _.breakO(self);
        },
        _getEV:function(id, name){
            var funs=[],t=linb.cache.dom[id];
            if(t&&(t=t.events)&&(t=t[name]))
                for(var i=0,l=t.length;i<l;i++)
                    if(typeof t[t[i]]=='function')
                        funs[funs.length]=t[t[i]];
            return funs;
        }
    },
    Static:{
        get:function(id){
            return linb.cache.dom[id];
        },
        $abstract:true
    }
});

//linb.absBox
Class('linb.absBox',null, {
    Constructor:function(){
        this._nodes=[];
    },
    Before:function(key){
        var t=linb.absBox;
        if(t)(t=t.$type)[key.replace('linb.','')]=t[key]=key;
    },
    Instance:{
        get:function(index){
            var t=this._nodes;
            return  t[index]||t;
        },
        each:function(fun){
            var self=this;
            for(var i=0,j=self._nodes,l=j.length;i<l;i++)
                if(false===fun.call(self,j[i],i))
                    break;
            return self;
        },
        isEmpty:function(){
            return !this._nodes.length;
        },
        merge:function(obj){
            if(this==linb.win||this==linb.doc||this==linb('body'))return this;
            var self=this, c=self.constructor, obj=obj._nodes, i=0, t, n=self._nodes;
            if(obj.length){
                for(;t=obj[i++];)n[n.length]=t;
                self._nodes=c._unique(n);
            }
            return self;
        },
        reBoxing:function(key,ensureValue){
            var self=this, t=linb.absBox.$type[key||'Dom'];
            if(t==self.KEY)return self;
            if(t=linb.SC(t))return t.pack(self._nodes, ensureValue);
        }
    },
    Static:{
        $abstract:true,
        $type:{},
        pack:function(arr, ensureValue){
            var o = new this(false);
            o._nodes = arr ? ensureValue===false ? arr : typeof this._ensureValues=='function'? this._ensureValues(arr) : arr : [];
            return o;
        },
        _unique:function(arr){
            var h={},a=[],i=0,t,m;
            for(;t=arr[i++];){
                m=t.$id;
                if(!h[m]){
                    h[m]=1;
                    a[a.length]=t;
                }
            }
            return a;
        },
        plugIn:function(name, fun){
            this.prototype[name]=fun;
            return this;
        }
    }
});

/*linb.Dom
*/
Class('linb.Dom','linb.absBox',{
    Instance:{
        serialize:function(){
            var a=[];
            this.each(function(o){
                a[a.length]=o.id;
            });
            return "linb(['"+a.join("','")+"'])";
        },
        //Need to consider the cache in linb.cache.dom
        id:function(value, ignoreCache){
            var t,i,cache=linb.cache.dom;
            if(typeof value == 'string')
                return this.each(function(o){
                    if((i=o.id)!==value){
                        if(!ignoreCache&&(t=cache[i])){
                            cache[value] = t;
                            delete cache[i];
                        }
                        o.id=value;
                    }
                });
            else
                return this.get(0).id;
        },

        /*dom collection
        fun: fun to run
        args: arguments for fun
        */
        $sum:function(fun, args){
            var arr=[],r,i;
            this.each(function(o){
                r=fun.apply(o, args||[]);
                if(r){
                    if(r.constructor==Array)
                        for(i=0;o=r[i];i++)
                            arr[arr.length]=o;
                    else
                        arr[arr.length]=r;
                }
            });
            return linb(arr);
        },
        /*get all dir children
        */
        children:function(){
            return this.$sum(function(){
                return _.toArr(this.childNodes)
            });
        },
        /* clone
         deep for clone all children
        */
        clone:function(deep){
            return this.$sum(function(){
                return this.cloneNode(deep?true:false);
            },arguments);
        },
        /* iterator
        // type: left : x-axis,  top :y-axis, xy: x-axis and y-axis
        // dir : true => left to right; top to buttom, false => right to left ; bottom to top
        // inn: does start consider children
         fun : number or function => number is iterator index; function is "return true ->stop"
        */
        $iterator:function(type, dir, inn, fun, top){
            return this.$sum(function(type, dir, inn, fun, top){
                var self=arguments.callee;
                if(typeof fun != 'function'){
                    var count=fun||0;
                    fun = function(n,index){return index==count;}
                }
                var index=0,m,n=this,flag=0,t;
                while(n){
                    if(n.nodeType==1)
                        if(fun(n, index++)===true)break;

                    //x-axis true: right ;false: left
                    if(type=='x')
                        n= dir?n.nextSibling:n.previousSibling;
                    //y-axis true: down ;false: up
                    else if(type=='y')
                        n= dir ? self.call(dir===1?n.lastChild:n.firstChild, 'x',(dir!==1), true, 0, top) : n.parentNode;
                    else{
                        inn=_.isBool(inn)?inn:true;
                        m=null;
                        n= dir ?
                                 (t = inn && n.firstChild ) ? t
                                              : (t = n.nextSibling ) ? t
                                                              :(m=n.parentNode)
                               : (t = inn && n.lastChild) ? t
                                              : (t = n.previousSibling ) ? t
                                                              :(m=n.parentNode);
                        if(m){
                            while(!( m = dir ? n.nextSibling: n.previousSibling)){
                                n=n.parentNode;
                                //to the top node
                                if(!n)
                                    if(flag)
                                        return null;
                                    else{
                                        flag=true;
                                        m = dir ? document.body.firstChild : document.body.lastChild;
                                        break;
                                    }
                            }
                            n=m;
                        }
                        inn=true;
                    }
                }
                return n;
            },arguments);
        },
        /*
        query('div');
        query('div','id');
        query('div','id','a');
        query('div','id',/^a/);
        query('div',function(){return true});
        */
        query:function(tagName, property, expr){
            tagName = tagName||'*';
            var f='getElementsByTagName',
                me=arguments.callee, f1=me.f1||(me.f1=function(tag, attr, expr){
                var all = this[f](tag), arr=[];
                if(expr.test(this[attr]))
                    arr[arr.length]=this;
                for(var o,i=0; o=all[i]; i++)
                    if(expr.test(o[attr]))
                        arr[arr.length]=o;
                return arr;
            }),f2=me.f2||(me.f2=function(tag, attr, expr){
                var all = this[f](tag), arr=[];
                if(this[attr]==expr)
                    arr[arr.length]=this;
                for(var o,i=0; o=all[i]; i++)
                    if(o[attr]==expr)
                        arr[arr.length]=o;
                return arr;
            }),f3=me.f3||(me.f3=function(tag, attr, expr){
                var all = this[f](tag), arr=[];
                if(this[attr])
                    arr[arr.length]=this;
                for(var o,i=0; o=all[i]; i++)
                    if(o[attr])
                        arr[arr.length]=o;
                return arr;
            }),f4=me.f4||(me.f4=function(tag){
                return _.toArr(this[f](tag));
            }),f5=me.f5||(me.f5=function(tag, attr){
                var all = this[f](tag), arr=[];
                if(attr(this))
                    arr[arr.length]=this;
                for(var o,i=0; o=all[i]; i++)
                    if(attr(o))
                        arr[arr.length]=o;
                return arr;
            });
            return this.$sum(property?typeof property=='function'?f5:expr?expr.constructor == RegExp?f1:f2:f3:f4, [tagName, property, expr]);
        },

        /*
        dom add implementation
        for addPrev prepend addNext append
        fun :for wrap
        o: to added target
        flag: false for add one only, not clone
        */
        $add:function(fun,target){
            target=linb(target);
            var v=this.get(0),dom=linb.Dom,cache=linb.cache.dom,uiObj,p;//,s,b,k;
            target.each(function(target){
                //two &&p.LayoutTrigger for performance
                uiObj=(p=target.id)&&(p=cache[p])&&p.LayoutTrigger&&dom.getStyle(v,'display')!='none'&&p.LayoutTrigger;
                //if(uiObj){
                    //s=target.style;
                    //if(s.visibility!='hidden'){
                     //   b=1;
                       // k=s.visibility;
                        //s.visibility='hidden';
                    //}else b=0;
                //}
                //add dom node
                fun.call(v,target);
                if(uiObj){
                    for(var i=0,l=uiObj.length;i<l;i++)
                        uiObj[i].call(p);
                    //if(b)s.visibility=k;
                }
            });
            return this;
        },
        prepend:function(target){
            var temp;
            return this.$add(function(target){
                var self=this;
                if(self.firstChild!=target){
                    if(self.firstChild)
                        self.insertBefore(target, temp||(temp=self.firstChild));
                    else
                        self.appendChild(target);
                }
            },target);
        },
        append:function(target){
            return this.$add(function(target){
                if(this.lastChild!=target)
                    this.appendChild(target);
            },target);
        },
        addPrev:function(target){
            return this.$add(function(target){
                if(this.previousSibling!=target)
                    this.parentNode.insertBefore(target,this);
            },target);
        },
        addNext:function(target){
            var t;
            return this.$add(function(target){
                var self=this;
                if((t=self.nextSibling)!=target){
                    if(t)
                        self.parentNode.insertBefore(target, t);
                    else
                        self.parentNode.appendChild(target);
                }
            },target);
        },

        //flag: false => no remove this from momery(IE)
        replace:function(target, triggerGC){
            target=linb(target);
            var v,i,c=this.get(0),ns=target.get(),l=ns.length;
            if(l>0 && (v=ns[l-1])){
                c.parentNode.replaceChild(v,c);
                for(i=0;i<l-1;i++)
                    v.parentNode.insertBefore(ns[i],v);
                //for memory __gc
                if(triggerGC)
                    this.remove(triggerGC);
            }
            return target;
        },
        swap:function(target){
            var self=this,t = linb.Dom.getEmptyDiv().html('*',false);

            target=linb(target);

            self.replace(t,false);
            target.replace(self,false);
            t.replace(target,false);

            t.get(0).innerHTML='';
            document.body.insertBefore(t.get(0), document.body.firstChild);
            return self;
        },
        //flag : false => remove from dom tree, not free memory
        remove:function(triggerGC){
            var me=arguments.callee,c=me._c||(me._c=document.createElement('div'));
            if(triggerGC===false)
                this.each(function(o,i){
                    if(o.parentNode)o.parentNode.removeChild(o);
                });
            else{
                this.each(function(o){
                    c.appendChild(o);
                });
                c.innerHTML='';
                _.resetRun('dom.__gc', linb.Dom.__gc, 300);
            }
            return this;
        },
        //set innerHTML empty
        //flag = false: no gc
        empty:function(triggerGC){
            return this.each(function(o){
                linb([o]).html('',triggerGC);
            });
        },

        //flag = false: no gc
        html:function(content,triggerGC){
            var s='',t,bak,o=this.get(0);triggerGC=triggerGC!==false;
            if(content!==undefined){
                if(o.nodeType==3)
                    o.nodeValue=content;
                else{
                     if(!(bak=o.firstChild) && content=="")return this;
                     // innerHTML='' in IE, will clear it's childNodes innerHTML
                     if(!triggerGC && linb.browser.ie)while(t=o.firstChild)o.removeChild(t);
                     //clear first
                     if(triggerGC)o.innerHTML='';

                     o.innerHTML=content;
                     // set triggerGC->true will not gc
                     // no original innerHTML will not gc
                     // use resetRun for performance
                     if(triggerGC && bak)
                        _.resetRun('dom.__gc', linb.Dom.__gc, 300);
                }
                return this;
            }else
                return (o.nodeType==3)?o.nodeValue:o.innerHTML;
        },
        outerHTML:function(content, triggerGC){
            var self=this, t,s='', o=self.get(0),id=o.id;
            if(content!==undefined){
                //clear ehandler
                if(o.nodeVars&&(t=o.domNode))
                    _.each(o.nodeVars,function(o,i){
                        t[i]=null;
                    });

                if(linb.browser.gek){
                    var n=self.replace(_.str.toDom(content),false);
                    self._nodes[0]=n.get(0);
                }else{
                    var b,r = (b=o.previousSibling)?o.previousSibling:o.parentNode;
                    o.outerHTML=content;
                    if(r)
                        self._nodes[0] = b?r.nextSibling:r.firstChild;
                }

                //avoid inner nodes memory leak
                linb([o]).remove(triggerGC);
                return self;
            }else{
                if(linb.browser.gek){
                    var dom=linb.Dom, m = dom.getEmptyDiv(), n = dom.getEmptyDiv(2), np=n.parent(), p;
                    //has parentNode, need keep node in this way
                    if(p=o.parentNode)self.replace(n, false);
                    //set to box
                    m.append(o);
                    //get string
                    s = m.html();
                    //set back
                    if(p)n.replace(o, false);
                    m.empty();
                    np.prepend(n);
                    return s;
                }else
                    return o.outerHTML;
            }
        },
        text:function(content){
            if(content!==undefined){
                var self=this, arr=[];
                self.each(function(o){
                    var t=o.childNodes[0];
                     if(t&&t.nodeType!=1)
                        t.nodeValue = content;
                     else
                        arr[arr.length]=o;
                });
                if(arr.length){
                    linb(arr).empty().each(function(o){
                        o.appendChild(document.createTextNode(content));
                    })
                }
                return self;
            }else{
               return (function(o){
                  var i,a=o.childNodes,l=a.length,content='',me=arguments.callee;
                  for(i=0;i<l;i++)
                    if(a[i].nodeType!= 8)
                      content += (a[i].nodeType!=1) ? a[i].nodeValue : me(a[i]);
                  return content;
                })(this.get(0));
            }
        },
        /*
        .attr(name)=>get attr
        .attr(name,value)=>set attr
        .attr(name,null)=>remove attr
        */
        attr:function(name, value){
            //set one time only
            var self=this,
                me = arguments.callee,
                map1 = me.map1 || (me.map1 = {
                    'class':'className',
                    readonly: "readOnly",
                    tabindex: "tabIndex",
                    'for':'htmlFor',
                    maxlength: "maxLength",
                    cellspacing: "cellSpacing",
                    rowspan: "rowSpan",
                    value:'value'
                }),
                map2 = me.map2||(me.map2={
                    href:1,src:1,style:1
                });

            if(typeof name=='object'){
                for(var i in name)
                    me.call(self,i,name[i]);
                return self;
            }

            var iestyle = linb.browser.ie && name=='style',
                normal=!map2[name=map1[name]||name];
            if(value!==undefined){
                return self.each(function(o){
                    //remove attr
                    if(value===null){
                        if(iestyle)o.style.cssText='';
                        else if(normal){
                            try{
                                o[name]=null;
                                if(o.nodeType==1)o.removeAttribute(name)
                            }catch(e){}
                        }
                    //set attr
                    }else{
                        if(iestyle)o.style.cssText=''+value;
                        else if(normal){
                             o[name]=value;
                             if(o.nodeType==1 && typeof value=='string')o.setAttribute(name, value);
                        }else
                            o.setAttribute(name, value);
                    }
                 });
            //get attr
            }else{
                var o=self.get(0);
                if(iestyle) return o.style.cssText;
                if(name=="selected"&&linb.browser.kde) o.parentNode.selectedIndex;
                return ((name in o) && normal)?o[name]:o.getAttribute(name, linb.browser.ie && !normal ? 2 : undefined );
            }
        },
        /*
        name format: 'xxxYxx', not 'xxx-yyy'
        left/top/width/height like, must specify 'px'
        Does't fire onResize onlocation event
        */
        css:function(name, value){
            return (typeof name=='object' || value!==undefined)
                ?
                this.each(function(o){
                    linb.Dom.setStyle(o,name,value)
                })
                :
                linb.Dom.getStyle(this.get(0), name)
        },
        /*
        *IE/opera \r\n will take 2 chars
        *in IE: '/r/n'.lenght is 2, but range.moveEnd/moveStart will take '/r/n' as 1.
        */
        caret:function(begin,end){
            var input =this.get(0), tn=input.tagName, type=typeof begin,ie=linb.browser.ie, pos;
            if(!/^(input|textarea)$/i.test(tn))return this;
            input.focus();
            //set caret
            if(type=='number'){
                if(ie){
                    var r = input.createTextRange();
                    r.collapse(true);
                    r.moveEnd('character', end);
                    r.moveStart('character', begin);
                    r.select();
                }else
                    input.setSelectionRange(begin, end);
                return this;
            //replace text
            }else if(type=='string'){
                    var r=this.caret(),l=0,m=0,ret,
                        v=input.value,
                        reg1=/\r/g;
                    //for IE, minus \r
                    if(ie){
                        l=v.substr(0,r[0]).match(reg1);
                        l=(l && l.length) || 0;
                        m=begin.match(reg1);
                        m=(m && m.length) || 0;
                    }
                    //opera will add \r to \n, automatically
                    if(linb.browser.opr){
                        l=begin.match(/\n/g);
                        l=(l && l.length) || 0;
                        m=begin.match(/\r\n/g);
                        m=(m && m.length) || 0;
                        m=l-m;l=0;
                    }
                    input.value=v.substr(0,r[0])+begin+v.substr(r[1],v.length);
                    ret= r[0] - l + m + begin.length;
                    this.caret(ret,ret);
                    return ret;
            //get caret
            }else{
                if(ie){
                    var r=document.selection.createRange(),
                        txt=r.text,
                        l=txt.length,
                        e,m;
                    if(tn.toLowerCase()=='input'){
                        r.moveStart('character', -input.value.length);
                        e=r.text.length;
                        return [e-l,e];
                    }else{
                    	var rb=r.duplicate();
                    	rb.moveToElementText(input);
                    	rb.setEndPoint('EndToEnd',r);
                    	e=rb.text.length;
                    	return [e-l, e];
                    }
                //firefox opera safari
                }else
                    return [input.selectionStart, input.selectionEnd];
            }
        },
        //left,top format: "23px"
        show:function(left,top){
            var style,t,auto='auto',v=linb.Dom.HIDE_VALUE;
            return this.each(function(o){
                if(o.nodeType != 1)return;
                style=o.style;
                if( t = (top || (style.top==v && (o._top || auto))))style.top = t;
                if( t = (left || (style.left==v && (o._left || auto))))style.left = t;
                if(t=o._position)if(style.position!=t)style.position=t;
                if(style.visibility!='visible')style.visibility='visible';
                //ie6 bug
              /*  if(linb.browser.ie6){
                    t=style.wordWrap=='normal';
                    _.asyRun(function(){
                        style.wordWrap=t?'break-word':'normal'
                    })
                }*/
            });
        },
        hide:function(){
            var style,t;
            return this.each(function(o){
                if(o.nodeType != 1)return;
                style=o.style;t=linb([o]);
                o._position = style.position;
                o._top = style.top;
                o._left = style.left;
                if(style.position!='absolute')style.position = 'absolute';
                style.top = style.left = linb.Dom.HIDE_VALUE;
            });
        },
        cssRegion:function(region,triggerEvent) {
            var self=this
            if(typeof region=='object'){
                var i,t,m,  node=self._nodes[0], dom=linb.Dom, f=dom._setPxStyle,m={};
                for(var j=0,c=dom._boxArr;i=c[j++];)
                    m[i] = ((i in region) && region[i]!==null)?f(node,i,region[i]):false;
                if(triggerEvent){
                    var f=dom.$hasEventHandler;
                    if(f(node,'onsize') && (m.width||m.height))self.onSize(true, {width:m.width,height:m.height});
                    if(f(node,'onlocation') && (m.left||m.top))self.onLocation(true, {left:m.left,top:m.top});
                }
                return self;
            }else{
                var offset=region,parent=triggerEvent,
                    pos = offset?self.offset(null,parent):self.cssPos(),
                    size = self.cssSize();
                return {
                    left:pos.left,
                    top:pos.top,
                    width:size.width,
                    height:size.height
                };
            }
        },
        //for quick size
        cssSize:function(size,triggerEvent) {
            var self=this, node=self._nodes[0],dom=linb.Dom,f=dom._setPxStyle,b1,b2;
           if(size){
                var t;
                b1 = size.width!==null?f(node,'width',size.width):false;
                b2 = size.height!==null?f(node,'height',size.height):false;
                if(triggerEvent && (b1||b2) && dom.$hasEventHandler(node,'onsize'))self.onSize(true, {width:b1,height:b2});
                return self;
            }else
                return { width :self._W(node,1)||0,  height :self._H(node,1)};
        },
        //for quick move
        cssPos:function(pos, triggerEvent){
            var node=this._nodes[0],dom=linb.Dom,f=dom._setPxStyle,b1,b2;
            if(pos){
                var t;
                b1 = pos.left!=null?f(node,'left',pos.left):false;
                b2 = pos.top!==null?f(node,'top',pos.top):false;
                if(triggerEvent && (b1||b2) && dom.$hasEventHandler(node,'onlocation'))this.onLocation(true, {left:b1,top:b2});
                return this;
            }else{
                f=dom.getStyle;
                return {left :parseInt(f(node, 'left'))||0,  top :parseInt(f(node, 'top'))||0};
            }
        },
/*
+--------------------------+
|margin                    |
| #----------------------+ |
| |border                | |
| | +------------------+ | |
| | |padding           | | |
| | | +--------------+ | | |
| | | |   content    | | | |

# is the offset position in jsLinb
*/
        offset:function (pos,boundary){
            var r,t,
            browser = linb.browser,
            ns=this,
            node = ns.get(0),
            keepNode=node,
            parent =node.parentNode,
            op=node.offsetParent,
            doc=node.ownerDocument,
            dd=doc.documentElement,
            db=doc.body,
            _d=/^inline|table.*$/i,
            getStyle=linb.Dom.getStyle,
            fixed = getStyle(node, "position") == "fixed",

            me=arguments.callee,
            add= me.add || (me.add=function(pos, l, t){
                pos.left += parseInt(l,10)||0;
                pos.top += parseInt(t,10)||0;
            }),
            border=me.border || ( me.border = function(node, pos){
                add(pos, getStyle(node,'borderLeftWidth'), getStyle(node,'borderTopWidth'));
            }),
            TTAG=me.TTAG||(me.TTAG={TABLE:1,TD:1,TH:1}),
            HTAG = me.HTAG ||(me.HTAG={BODY:1,HTML:1}),
            posDiff=me.posDiff ||(me.posDiff=function(o,target){
                var cssPos = o.cssPos(),absPos = o.offset(null,target);
                return {left :absPos.left-cssPos.left, top :absPos.top-cssPos.top};
            });

            boundary=boundary?linb(boundary).get(0):doc;

            if(pos){
                //all null, return dir
                if(pos.left===null&&pos.top===null)return ns;
                var d = posDiff(ns,boundary);
                ns.cssPos({left :pos.left===null?null:(pos.left - d.left),  top :pos.top===null?null:(pos.top - d.top)});
                r=ns;
            }else{
                //for IE, firefox3(except document.body)
                if(!(linb.browser.gek && node==document.body) && node.getBoundingClientRect){
                    t = node.getBoundingClientRect();
                    pos = {left :t.left, top :t.top};
                    if(boundary.nodeType==1)
                        add(pos, -(t=boundary.getBoundingClientRect()).left+boundary.scrollLeft, -t.top+boundary.scrollTop);
                    else
                        add(pos, Math.max(dd.scrollLeft, db.scrollLeft)-dd.clientLeft, Math.max(dd.scrollTop,  db.scrollTop)-dd.clientTop);
                }else{
                    pos = {left :0, top :0};
                    add(pos, node.offsetLeft, node.offsetTop );
                    //get offset, stop by boundary or boundary.offsetParent
                    while(op && op!=boundary && op!=boundary.offsetParent){
                        add(pos, op.offsetLeft, op.offsetTop);
                        if(browser.kde || (browser.gek && !TTAG[op.tagName]))
                            border(op, pos);
                        if ( !fixed && getStyle(op,"position")== "fixed")
                            fixed = true;
                        if(op.tagName!='BODY')
                            keepNode=op.tagName=='BODY'?keepNode:op;
                        op = op.offsetParent;
                    }

                    //get scroll offset, stop by boundary
                    while (parent && parent.tagName && parent!=boundary && !HTAG[parent.tagName]){
                        if(!_d.test(getStyle(parent, "display")) )
                            add(pos, -parent.scrollLeft, -parent.scrollTop );
                        if(browser.gek && getStyle(parent,"overflow")!= "visible" )
                            border(parent,pos);
                        parent = parent.parentNode;
                    }
                    if((browser.gek && getStyle(keepNode,"position")!="absolute"))
                        add(pos, -db.offsetLeft, -db.offsetTop);
                    if(fixed)
                        add(pos, Math.max(dd.scrollLeft, db.scrollLeft), Math.max(dd.scrollTop,  db.scrollTop));
                }
                r=pos;
            }
            return r;
        },

//class and src
        hasClass:function(name){
            var arr = this.get(0).className.split(/\s+/);
            return _.arr.indexOf(arr,name)!=-1;
        },
        addClass:function(name){
            var arr, t, me=arguments.callee,reg=(me.reg||(me.reg=/\s+/));
            return this.each(function(o){
                arr = (t=o.className).split(reg);
                if(_.arr.indexOf(arr,name)==-1)
                    o.className = t + " " +name;
            });
        },
        removeClass:function(name){
            var arr, i,l,a, t, bs=typeof name=='string', me=arguments.callee,reg=(me.reg||(me.reg=/\s+/));
            return this.each(function(o){
                arr = o.className.split(reg);
                l=arr.length;
                a=[];
                for(i=0;t=arr[i];i++)
                    if(bs?(t!=name):(!name.test(String(t))))
                        a[a.length]=t;
                if(l!=a.length)o.className=a.join(' ');
            });
        },
        replaceClass:function(regexp,replace){
            var n,r;
            return this.each(function(o){
                r = (n=o.className).replace(regexp, replace);
                if(n!=r)o.className=r;
            });
        },
        tagClass:function(tag, isAdd){
            var self=this,
                me=arguments.callee,
                r1=me["_r1_"+tag]||(me["_r1_"+tag]=new RegExp("([-\\w]+" + tag + "[-\\w]*)")),
                r2=me["_r2"]||(me["_r2"]=/([-\w]+)/g);
            self.removeClass(r1);
            return (false===isAdd)? self : self.replaceClass(r2, '$1 $1' + tag);
        },
//events:
        /*
        $addEvent('onClick',fun,'idforthisclick';)
        $addEvent([['onClick',fun,'idforthisclick'],[...]...])

        will
            add onclick to dom
            add onclick to dom attribute
            append fun to linb.cache.dom.id.events.onClick array
            append 'onclick' to linb.cache.dom.id.add array
        */
        _ajustType:function(o,type){return (window===o||document===o) && type=="onsize" ? "onresize" :type},
        $addEventHandler:function(name, flag){
            var id,
                c,
                event=linb.Event,
                type='on'+event._getEventType(name),
                f=event.$eventhandler,
                fs=event.$EVENTHANDLER,
                fi=event.getId,
                _a=this._ajustType;

            return this.each(function(o){
                if(o.nodeType==3)return;
                id=fi(o);
                if(!id)id=o.id=_.id();
                type=_a(o,type);
                if(flag===false){
                    //for before innerHTML
                    if(o.setAttribute)o.setAttribute(type, fs);
                }else{
                    //if exists
                    if(o[type])return;
                    o[type]=f;
                }
                if(!(c = linb.DomProfile.get(id)))
                    c =new linb.DomProfile(id,o);
                (c.nodeVars||(c.nodeVars={}))[type]=fs;
            });
        },
        $removeEventHandler:function(name){
            var type='on'+linb.Event._getEventType(name),_a=this._ajustType;
            return this.each(function(o){
                type=_a(o,type);
               if(o[type])o[type]=null;
               if(o.getAttribute && o.getAttribute(type))o.removeAttribute(type);
            });
        },
        $addEvent:function(name, fun, label, index){
            var self=this,c,t,id,type,fi=linb.Event.getId,dom=linb.cache.dom,event=linb.Event,arv=_.arr.removeValue,ari=_.arr.insertAny;
            if(!(name  instanceof Array))
                name=[[name,fun,label]];
            if(!index && index!==0)index=-1;

            _.arr.each(name,function(o,i){
                name=o[0];fun=o[1];label=o[2];
                if(typeof label=='string')
                    label="$"+label;
                else label=undefined;

                self.$addEventHandler(name).each(function(o){
                    if(o.nodeType==3)return;
                    id=fi(o);
                    if(!id)id=o.id=_.id();

                    c = dom[id];

                    t = c.events || (c.events = {});
                    c = t[name] || (t[name]=[]);

                    //if no label input, clear all, and add a single
                    if(label===undefined){
                        c.length=0;c=t[name]=[];
                        index=-1;
                        label='_';
                    }
                    c[label]=fun;
                    arv(c,label);
                    if(index==-1)c[c.length]=label;
                    else
                        ari(c,label, index);

                    if(t=(c=dom[id]).clearCache)t.call(c);
                });
            });
            return self;
        },
        /*
        $removeEvent('onClick','idforthisclick')
        $removeEvent('onClick')
            will remove all onClick in linb.cache.dom.id.events.
        $removeEvent('onClick',null,true)
            will remove all onClick/beforeClick/afterClick in linb.cache.dom.id.events.
        */
        $removeEvent:function(name, label, flag){
            var self=this,c,t,k,id,i,type,fi=linb.Event.getId,dom=linb.cache.dom,event=linb.Event;
            if(!(name instanceof Array))
                name=[[name,label]];

            _.arr.each(name,function(o,i){
                name=o[0];label=o[1];
                type=event._getEventType(name);
                self.each(function(o){
                    if(!(id=fi(o)))return;

                    if(!(c=dom[id]))return;
                    if(!(t=c.events))return;
                    if(flag)
                        _.arr.each(event._getEventName(type),function(o){
                            delete t[o];
                        });
                    else{
                        if(typeof label == 'string'){
                            label='$'+label;
                            if(k=t[name]){
                                if(_.arr.indexOf(k,label)!=-1)
                                    _.arr.removeValue(k,label);
                                delete k[label];
                            }
                        }else
                            delete t[name];
                    }
                    if(t=(c=dom[id]).clearCache)t.call(c);
// Removes events handler too:
//                    if(_.isEmpty(t) || flag){
//                        o[linb.Dom._ajustType(o,"on"+type)]=null;
//                        delete c.nodeVars["on"+type];
//                    }
                });
            });
            return self;
        },
        $getEvent:function(name, label){
            var id;
            if(!(id=linb.Event.getId(this.get(0))))return;

            if(label)
                return _.get(linb.cache.dom,[id,'events',name,'$' + label]);
            else{
                var r=[],arr = _.get(linb.cache.dom,[id,'events',name]);
                _.arr.each(arr,function(o,i){
                    r[r.length]=[o,arr[o]];
                });
                return r;
            }
        },
        $clearEventHandler:function(){
            return this.each(function(o){
                _.arr.each(linb.Event._events,function(s){
                   if(o[s="on"+s])o[s]=null;
                   if(o.getAttribute && o.getAttribute(s))o.removeAttribute(s);
                });
            });
        },
        $clearEvent:function(){
            this.$clearEventHandler();
            return this.each(function(o){
                var id,c;
                if(!(id=linb.Event.getId(o)))return;
                if(!(c=linb.cache.dom[id]))return;
                _.filter(c.nodeVars, function(i,v){
                    if(_.str.startWith(v,"on"))return false;
                });
                _.breakO(c.events,2);
                delete c.events;
            });
        },
        $fireEvent:function(name, args){
            var type=linb.Event._getEventType(name),
            t,s='on'+type,
            me=arguments.callee,
            f=linb.Event.$eventhandler,
            f1=me.f1||(me.f1=function(){this.returnValue=false}),
            f2=me.f2||(me.f2=function(){this.cancelBubble=true}),
            _a=this._ajustType;

            args= args || {};
            return this.each(function(o){
                s=_a(o,s);
                //for no standard events, like onDrag
                if(typeof o[s]!='function'){
                    if(!o[s] && !(o.getAttribute && o.getAttribute(s)))
                        return;
                     o[s] = f;
                }
                _.merge(args,{
                    type: type,
                    target: o,
                    button : 1,
                    $e:true,
                    $name:name,
                    preventDefault:f1,
                    stopPropagation:f2
                },'all');

                if('blur'==type || 'focus'==type)
                    //try{
                        o[type].call(o,args);
                    //}catch(e){}
                else
                   o[s].call(o,args);
            });
        },

//functions
        $canFocus:function(){
            var me=arguments.callee, getStyle=linb.Dom.getStyle, map = me.map || (me.map={a:1,input:1,select:1,textarea:1,button:1}),t,node;
            return !!(
                (node = this._nodes[0]) &&
                node.focus &&
                //IE bug: It can't be focused with 'default tabIndex 0'; but if you set it to 0, it can be focused.
                //So, for cross browser, don't set tabIndex to 0
                (((t=map[node.tagName.toLowerCase()]) && !(parseInt(node.tabIndex)<=-1)) || (!t && parseInt(node.tabIndex)>=(linb.browser.ie?1:0))) &&
                getStyle(node,'display')!='none' &&
                getStyle(node,'visibility')!='hidden' &&
                node.offsetWidth>0 &&
                node.offsetHeight>0
            );
        },
        focus:function(force){
            var ns=this;
            if(force || ns.$canFocus())
                try{ns.get(0).focus()}catch(e){}
            return ns;
        },
        setSelectable:function(value){
            var me=arguments.callee, _f = me._f || (me._f=function(){return false});
             return this.each(function(o){
                if(linb.browser.gek)
                    o.style.MozUserSelect=value?"all":"none"
                else{
                    o.unselectable=value?"off":"on";
                    o.onselectstart=value?null:_f;
                }
            })
        },
        setInlineBlock:function(){
            var ns=this;
            if(linb.browser.gek)
                ns.css('display','-moz-inline-block').css('display','-moz-inline-box').css('display','inline-block');
            else
                ns.css('display','inline-block');
            return ns;
        },
        topZindex:function(flag){
            //set the minimum to 1000
            var i=1000, j=0, k, node = this.get(0), p = node.offsetParent, t, o;
            if(node.nodeType !=1 || !p)return 1;

            t=p.childNodes;
            for(k=0;o=t[k];k++){
                if(o==node || o.nodeType !=1 || o.style.display=='none' || o.style.visibility=='hidden' || o.zIndexIgnore)continue;
                j = parseInt(o.style && o.style.zIndex) || 0 ;
                i=i>j?i:j;
            }
            i++;
            if(i>=linb.Dom.TOP_ZINDEX)
                linb.Dom.TOP_ZINDEX =i+1000;

            if(flag)
                 node.style.zIndex = i;
            else{
                j = parseInt(node.style.zIndex) || 0;
                return i>j?i:j;
            }
            return this;
        },
        /*
        dir:true for next, false for prev
        inn:true for include the inner node
        set:true for give focus
        */
        nextFocus:function(downwards, includeChild, setFocus){
            downwards=_.isBool(downwards)?downwards:true;
            var self=this.get(0),node = this.$iterator('',downwards,includeChild,function(node){return node!==self && linb([node]).$canFocus()});
            if(!node.isEmpty() && setFocus!==false)node.focus();
            return node;
        },

        /*
        args:{
            with:[0,100],
            height:[0,100],
            left:[0,100]
            top:[0,100]
            opacity:[0,1],
            backgroundColor:['#ffffff','#000000']
            scrollTop:[0,100]
            scrollLeft:[0,100]
            fontSize:[12,18]
        }
        */
        animate: function(args, onStart, onEnd, time, step, type, threadid){
            var me=arguments.callee,
            hash = me.lib ||  (me.lib = {
                line:function(x){return x},
                inexp:function(x){return (x==0)?0:Math.pow(2,10*(x-1))},
                outexp:function(x){return (x==1)?1:-Math.pow(2,-10*x)+1},
                insine:function(x){return -1*Math.cos(x*(Math.PI/2))+1},
                outsine:function(x){return Math.sin(x*(Math.PI/2))},
                inoutsine:function(x){return -1/2*(Math.cos(Math.PI*x)-1)}
            }),
            color = me.color || (me.color = function(type, args, step, j){
                var f,fun,value = 0 + (100-0)*hash[type](j/step), from = args[0], to = args[1];

                if(typeof from !='string' || typeof to != 'string')return '#fff';
                if(value<0)
                    return from;
                else if(value>100)
                    return to;

                f=function(str){
                    return (str.charAt(0)!='#')?('#'+str):str;
                };
                from=f(from);to=f(to);

                f=function(str, i, j){
                    return parseInt(str.slice(i,j),16)||0;
                };
                fun=function(o){
                    return {red:f(o,1,3),green:f(o,3,5),blue:f(o,5,7)}
                };
                from = fun(from);to = fun(to);

                f=function(from, to, value,c){
                    var r= from[c]+Math.round((value/100)*(to[c]-from[c]));
                    return (r < 16 ? '0' : '') + r.toString(16)
                };
                return '#' + f(from,to, value, 'red') + f(from,to, value, 'green') + f(from,to, value, 'blue');
            });

            time = time||100;
            step = step||5;
            type = hash[type]!==undefined?type:'inexp';

            var self=this, count=0,
                funs=[function(threadid){
                    //try{
                       // if(++count > step)throw new Error;
                        if(++count > step){
                            linb.Thread(threadid).abort();
                            return false;
                        }
                        _.each(args,function(o,i){
                            if(typeof o == 'function') o(hash[type](count/step));
                            else{
                                var value = String( _.str.endWith(i.toLowerCase(),'color') ? color(type, o, step, count) : (o[0] + (o[1]-o[0])*hash[type](count/step)));
                                (self[i]) ? (self[i](value)) :(self.css(i, value));
                            }
                        });
                    //}catch(e){
                    //    linb.Thread(threadid).abort();
                    //    color=hash=null;
                   // }
                }];
            return linb.Thread(threadid||_.id(), funs, Math.max(time/step-9,0), null, onStart, onEnd ,true);
        },
        /*
        pos: {left:,top:} or domNode
        parent:parent node
        type:1,2,3,4
        */
        popToTop : function(pos, type, parent){
            var region, target=this,  t;

            parent=linb(parent);
            if(parent.isEmpty())parent=linb('body');

            //prepare
            target.css({position:'absolute',left:linb.Dom.HIDE_VALUE, top:linb.Dom.HIDE_VALUE,display:'block', zIndex:linb.Dom.TOP_ZINDEX});

            if(pos['linb.Dom'] || pos.nodeType){
                type = (type || 1).toString();
                var node=linb(pos),
                    //base region
                    abspos = node.offset(null, parent);
                region = {
                    left:abspos.left,
                    top:abspos.top,
                    width:node.offsetWidth(),
                    height:node.offsetHeight()
                };
             }else{
                type = type?'3':'0';
                t=type=='0'?0:8;
                region = pos.region || {
                    left:pos.left-t,
                    top:pos.top-t,
                    width:t*2,
                    height:t*2
                };
            }
            pos={left :0, top :0};

            //window edge
            var t=linb.win, box = {};
            box.left=t.scrollLeft();
            box.top=t.scrollTop();
            box.width =t.width()+box.left;
            box.height =t.height()+box.top;
/*
type:1
    +------------------+    +------------------+
    |        3         |    |        4         |
    +--------------+---+    +---+--------------+
    |              |            |              |
    |              |            |              |
    +--------------+---+    +---+--------------+
    |        1         |    |        2         |
    +------------------+    +------------------+
type:2
                         +---+              +---+
                         |   |              |   |
+---+--------------+---+ |   +--------------+   |
|   |              |   | | 3 |              | 4 |
| 2 |              | 1 | |   |              |   |
|   +--------------+   | +---+--------------+---+
|   |              |   |
+---+              +---+
type:3
                         +---+              +---+
                         | 3 |              | 4 |
    +--------------+     +---+--------------+---+
    |              |         |              |
    |              |         |              |
+---+--------------+---+     +--------------+
| 2 |              | 1 |
+---+              +---+
type:4
                     +------------------+
                     | 3                |
+--------------+---+ |   +--------------+ +----+--------------+ +--------------+----+
|              |   | |   |              | |    |              | |              |    |
|              |   | |   |              | |    |              | |              |    |
+--------------+   | +---+--------------+ |    +--------------+ +--------------+    |
|                1 |                      |  2                | |               4   |
+------------------+                      +-------------------- +-------------------+
*/

            //target size
            var w = target.offsetWidth(), h = target.offsetHeight(),
                hi,wi;
            switch(type){
                case '1':
                    hi=false;wi=true;
                break;
                case '2':
                    hi=true;wi=false;
                break;
                case '3':
                    hi=false;wi=false;
                break;
                case '4':
                    hi=wi=true;
                break;
            }

            if(hi){
                if(region.top + h < box.height)
                    pos.top=region.top;
                else
                    pos.top=region.top+region.height-h;
            }else{
                if(region.top + region.height + h < box.height)
                    pos.top=region.top + region.height;
                else
                    pos.top=region.top - h;
            }
            if(wi){
                if(region.left + w < box.width)
                    pos.left=region.left;
                else
                    pos.left=region.left+region.width-w;
            }else{
                if(region.left + region.width + w < box.width)
                    pos.left=region.left + region.width;
                else
                    pos.left=region.left - w;
            }

            //over right
            if(pos.left + w>  box.width)pos.left = box.width - w;
            //over left
            if(pos.left < box.left)pos.left = box.left;
            //over bottom
            if(pos.top + h>  box.height)pos.top = box.height - h;
            //over top
            if(pos.top < box.top)pos.top = box.top;
            //show
            target.cssPos(pos).css({visibility:'visible',display:'block'});

            //ensure show target on the top of the other elements with the same zindex
            parent.get(0).appendChild(target.get(0))

            return this;
        },
        //for remove obj when blur
        setBlurTrigger : function(id, trigger, group){
            var ns=this,
                doc=document,
                sid='$blur_triggers$',
                target = linb(group?group:ns.get()),
                fun=linb.Dom._blurTrigger||(linb.Dom._blurTrigger=function(p,e){
                    var me=arguments.callee,
                        p=linb.Event.getPos(e),
                        arr=me.arr,
                        a=_.copy(arr),
                        b, pos, w, h, v;
                    //filter first
                    _.arr.each(a,function(i){
                        b=true;
                        if(!(v=arr[i].target))b=false;
                        else
                            v.each(function(o){
                                if(!linb.Dom.byId(o.id))
                                    return b=false;
                            });
                        if(!b){
                            _.arr.removeValue(arr,i);
                            delete arr[i];
                        };
                    });
                    a=_.copy(arr);
                    _.arr.each(a,function(i){
                        v=arr[i];
                        b=true;
                        v.target.each(function(o){
                            if(o.parentNode && (w=o.offsetWidth) && (h=o.offsetHeight)){
                                pos=linb([o]).offset();
                                if(p.left>=pos.left && p.top>=pos.top && p.left<=(pos.left+w) && p.top<=(pos.top+h))
                                    return b=false;
                            }
                        });
                        if(b){
                            _.tryF(v.trigger,[],v.target);
                            _.arr.removeValue(arr,i);
                            delete arr[i];
                        }else
                            //if the top layer popwnd cant be triggerred, prevent the other layer popwnd trigger
                            return false;
                    },null,true);
                    a.length=0;
                }),
                arr=fun.arr||(fun.arr=[]);
            if(!doc.onmousedown)doc.onmousedown=linb.Event.$eventhandler;
            target.each(function(o){if(!o.id)o.id=_.id()});
            //remove this trigger
            if(!trigger){
                _.arr.removeValue(arr,id);
                delete arr[id];
            //double link
            }else
                if(arr[id]){
                    _.arr.removeValue(arr,id);
                    delete arr[id];
                }
                arr[id]={
                    trigger:trigger,
                    target:target
                };
                arr.push(id);
            return this;
        },
        //for firefox disappeared cursor bug in input/textarea
        $firfox2:function(){
            if(!linb.browser.gek2)return this;
            var ns=this;
            ns.css('overflow','hidden');
            _.asyRun(function(){ns.css('overflow','auto')});
            return ns;
        },
        //IE not trigger dimension change, when change height only in overflow=visible.
        ieRemedy:function(){
            if(linb.browser.ie){
                var self=this;
                _.asyRun(function(){self.css('wordWrap','break-word')});
                _.asyRun(function(){self.css('wordWrap','normal');});
            }
            return this;
        },
        //for ie6
        fixPng:function(type){
            if(linb.browser.ie6)
                return this.each(function(n){
                    if(n.tagName=='IMG'){
                        n.style.height = n.height;
                        n.style.width = n.width;
                        n.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + n.src + "',sizingMethod='"+type+"')";
                        n.src = linb.ini.file_bg;
                    }
                });
        }
        /*,
        gekRemedy:function(){
            if(linb.browser.gek)
                return this.each(function(o,i){
                    if(i=o.style){
                        var b=i.zIndex||0;
                        i.zIndex=++b;
                        i.zIndex=b;
                    }
                });
        }*/
    },
    Static:{
        HIDE_VALUE : '-10000px',
        TOP_ZINDEX:10000,

        _boxArr:_.toArr('width,height,left,top,right,bottom'),
        _cursor:{},

        __gc:function(){
            var i,o,t,w,cache=linb.cache.dom,bak=[];
            for(i in cache){
                 o=cache[i];
                 if(!o)continue;
                 t=o.domNode;
                 if(window===t||document===t||document.body===t)continue;
                 if(!document.getElementById(o.domId)){
                     if(t)t.$id=null;
                     o.__gc();
                     //clear the cache
                     bak[bak.length]=i;
                     //clear the cache shadow
                     if(o.$domId && o.$domId!=o.domId)
                        bak[bak.length]=o.$domId;
                 }
             }
             for(i=0;i<bak.length;)
                 delete cache[bak[i++]];
             if(linb.browser.ie6)CollectGarbage();
        },
        $linbid:0,
        _map:{
            'html':1,
            'head':1,
            'body':1
        },
        _ff:function(n){return document.getElementsByTagName(n)[0]},
        _ensureValues:function(obj){
            var t,i,a,map=this._map,fun=this._ff,
            //can't be obj, or opera will crash
            arr = window===obj ? [window] :
                    document===obj ? [obj] :
                    obj.constructor == Array ? obj :
                    obj['linb.Dom'] ? obj._nodes :
                    obj._toDomElems?obj._toDomElems():
                    typeof obj == 'function' ? obj() :
                    typeof obj!='string' ? [obj] :
                    obj.charAt(0)=='{' ? linb.SC(obj.slice(1,obj.length-1)).getAll().reBoxing()._nodes :
                    [obj]
            ;
            //for performance
            //Can't input mix value
            if(arr[0] && !arr[0].nodeType){
                a=[];
                //can't be e, or opera will crash
                for(i=0;i<arr.length;i++)
                    if( t = typeof (t=arr[i])=='string' ? map[t]? fun(t):document.getElementById(t) : t ? t.nodeType ? t : (t['linb.UIProfile']||t['linb.Template']) ? t.domNode ? t.domNode : (t.boxing().render() && t.domNode) : t===window ? t : 0 : 0)
                        a[a.length]=t;
            }else
                a=arr;
            for(i=0;t=a[i++];)
                if(t.nodeType==1){
//                    if(!t.id)t.id=_.id();
                    if(!t.$id)t.$id='$'+this.$linbid++;
                }
            return a.length<=1?a:this._unique(a);
        },
        getStyle:function(node, name){
            if(node.nodeType != 1)return '';

            var value,b;
            if(name=='opacity' && linb.browser.ie)
                b = name = 'filter';

            value= node.style[name];
            if(!value){
                var me = arguments.callee,t,
                map = me.map || (me.map = {'float':1,'cssFloat':1,'styleFloat':1}),
                c1 = me._c1 || (me._c1={}),
                c2 = me._c2 || (me._c2={}),
                name = c1[name] || (c1[name] = name.replace(/\-(\w)/g, function(a,b){return b.toUpperCase()})),
                name2 = c2[name] || (c2[name] = name.replace(/([A-Z])/g, "-$1" ).toLowerCase())
                ;
                if(map[name])
                    name = linb.browser.ie?"styleFloat":"cssFloat";
                //document.defaultView first, for opera 9.0
                value = ((t=document.defaultView) && t.getComputedStyle)?(t=t.getComputedStyle(node,null))?t.getPropertyValue(name2):'':(node.currentStyle&&(node.currentStyle[name]||node.currentStyle[name2]));
/*
                if(linb.browser.opr){
                    var map2 = me.map2 || (me.map2={left:1,top:1,right:1,bottom:1});
                    if(map2[name] && (linb.Dom.getStyle(node,'position')=='static'))
                        value = 'auto';
                }
*/
            }
            return b?value?(parseFloat(value.match(/alpha\(opacity=(.*)\)/)[1] )||0)/100:1:(value||'');
        },
        setStyle:function(node, name , value){
            if(node.nodeType != 1)return;
            if(typeof name == 'string'){
                var me=this.getStyle,
                c1 = me._c1 || (me._c1={}),
                r1 = me._r1 || (me._r1=/alpha\([^\)]*\)/ig);
                name = c1[name] || (c1[name] = name.replace(/\-(\w)/g, function(a,b){return b.toUpperCase()}));
                if(name=='opacity'){
                    value=parseFloat(value)||0;
                    value= value >0.9999 ? '' : linb.browser.ie ? "alpha(opacity="+ 100*value +")" : value;
                    if(linb.browser.ie){
                        node.zoom=1;
                        name='filter';
                        value = node.style.filter.replace(r1, "") + value;
                    }
                }
                node.style[name]=value;
            }else
                for(var i in name)
                    arguments.callee.call(this,node, i, name[i]);
        },
        _setPxStyle:function(node, key, value){
            if(node.nodeType != 1)return false;
            var style=node.style;
            if(value || value===0){
                value = ((''+parseFloat(value))==(''+value)) ? (parseInt(value)||0) + "px" : value +'';
                if((key=='width'||key=='height') && value.charAt(0)=='-')value='0';
                if(style[key]!=value){
                    style[key]=value;
                    return true;
                }
            }return false;
        },
        _matrixid:"linb.matrix::",
        /* Get available DOM matrix(a special empty DOM div)
         sequence: Number, sequence number. Default is 1;
            e.g. 2 => get the second available matrix
        */
        getEmptyDiv:function(sequence){
            var i=1,id,style,o,t,count=0,doc=document,body=doc.body,ini=function(o){
                o.id=id;
                linb([o]).attr('style','position:absolute;visibility:hidden;overflow:visible;left:'+linb.Dom.HIDE_VALUE+';top:'+linb.Dom.HIDE_VALUE+';');
            };
            sequence=sequence || 1;
            while(1){
                id = this._matrixid + i;
                //don't remove this {
                if(o=linb.Dom.byId(id)){
                    //Using firstChild, for performance
                    if(!o.firstChild && ++count == sequence)
                        return linb([o]);
                }else{
                    o=doc.createElement('div');
                    ini(o,id);
                    if(body.firstChild)
                        body.insertBefore(o, body.firstChild);
                    else
                        body.appendChild(o);
                    return linb([o]);
                }
                i++;
            }
        },
        setCover:function(visible,label){
            // get or create first
            var me=arguments.callee,
                id="linb.temp:cover:",
                id2="linb.temp:message:",
                content = typeof visible=='string'?visible:'',
                o1,o2;

            if((o1=linb(id)).isEmpty()){
                linb('body').prepend(o1=linb.create('<div id="'+ id +'" style="position:absolute;display:none;left:0;top:0;background-image:url('+linb.ini.file_bg+')"><div id="'+id2+'" style="position:absolute;font-size:12px"></div></div>'));
                o1.get(0).zIndexIgnore=1;
            }
            o2=linb(id2);

            //clear
            if(!visible){
                if(typeof me._label =='string' && me._label!==label)
                    return;
                if(me._showed){
                    o2.empty(false);
                    o1.css({zIndex:0,cursor:'',display:'none'});
                    me._showed=false;
                }
                delete me._label;
            }else{
                if(typeof label=='string')me._label=label;
                var t = linb.win;
                if(!me._showed){
                    o1.css({zIndex:linb.Dom.TOP_ZINDEX*2,display:'',width:t.scrollWidth()+'px',height:t.scrollHeight()+'px',cursor:'wait'});
                    me._showed=true;
                }
                //show content
                if(content){
                    o2.css({left :t.scrollLeft()+t.width()/2+'px', top: t.scrollTop()+t.height()/2+'px'});
                    o2.html(content +'',false);
                }
            }
        },

        byId:function(id){
            return  document.getElementById(id||"");
        },
        $hasEventHandler:function(node, name){
            return !!(node[name] || (node.getAttribute && node.getAttribute(name)));
        },
        /*
        action: uri
        data:hash{key:value}
        method:'post'(default) or 'get'
        target: uri target: _blank etc.
        */
        submit:function(action, data, method, target, enctype){
            data=_.isHash(data)?data:{};method=method||'get';action=action||'';target=target||'_blank';
            var _t=[];
            _.each(data,function(o,i){
                _t.push('<textarea name="'+i+'">'+(typeof o=='object'?_.serialize(o):o)+'</textarea>');
            });
            if(!_.isEmpty(data))_t.push('<input type="hidden" name="rnd" value="'+_()+'">');
            var d=_.str.toDom('<form target="'+target+'" action="'+action+'" method="'+method  + (enctype?'" enctype="' +enctype:'') +  '">'+_t.join('')+'</form>');
            linb.Dom.getEmptyDiv().append(d);
            d.get(0).submit();
            d.remove();
        },
        busy:function(label){
            linb.Dom.setCover(true,label);
        },
        free:function(label){
           linb.Dom.setCover(false,label);
        },
        animate:function(css, args, onStart, onEnd, time, step, type, threadid){
            var node = document.createElement('div');
            _.merge(css,{position:'absolute', left:this.HIDE_VALUE, zIndex:this.TOP_ZINDEX+10});
            linb.Dom.setStyle(node, css);
            document.body.appendChild(node);
            return linb([node]).animate(args, onStart, function(){
                _.tryF(onEnd);
                if(node.parentNode)
                    node.parentNode.removeChild(node);
            }, time, step, type, threadid);
        },
        //plugin event function to linb.Dom
        $enableEvents:function(name){
            if(!(name instanceof Array))name=[name];
            var self=this,f;
            _.arr.each(name,function(o){
                f=function(fun, label, flag){
                    if(typeof fun  == 'function')
                        return this.$addEvent(o, fun, label, flag);
                    else if(fun===null)
                        return this.$removeEvent(o, label, flag);
                    var args = arguments[1] || {};
                    args.$all = (arguments[0]===true);
                    return this.$fireEvent(o, args)
                };
                f.$event$=1;
                self.plugIn(o, f)
            });
        }
    },
    After:function(d){
        var self=this;
       //getter
        _.each({ parent:['y',false], prev:['x',false], next:['x',true], first:['y',true], last:['y',1]},function(o,i){
            self.plugIn(i, function(index){
                return this.$iterator(o[0], o[1], true, index || 1)
            });
        });

        //readonly profile
        _.arr.each(_.toArr('offsetLeft,offsetTop,scrollWidth,scrollHeight'),function(o){
            self.plugIn(o,function(){
                var t=this.get(0),w=window,d=document;
                if(t==w||t==d){
                    if("scrollWidth"==o||"scrollHeight"==o){
                        var a=d.documentElement,b=d.body;
                        return Math.max(a[o], b[o]);
                    }else
                        t = linb.browser.contentBox ? d.documentElement : d.body;
                }
                return t[o];
            })
        });

        var p='padding',m='margin',b='border',c='inner',o='offset',r='outer',w='width',h='height',W='Width',H='Height',T='Top',L='Left',t='top',l='left',R='Right',B='Bottom';
        //dimesion
        _.arr.each([['_'+p+'H',p+T,p+B],
            ['_'+p+'W',p+L,p+R],
            ['_'+b+'H',b+T+W,b+B+W],
            ['_'+b+'W',b+L+W,b+R+W],
            ['_'+m+'W',m+L,m+R],
            ['_'+m+'H',m+T,m+B]
        ],function(o){
            //use get Style dir
            var node,fun=linb.Dom.getStyle;
            self.plugIn(o[0],function(){
                node = this.get(0);
                return (parseInt(fun(node, o[1])) + parseInt(fun(node, o[2]))) || 0;
            })
        });
        /*
        get W/H for

        1:width
        2:innerWidth
        3:offsetWidth
        4:outerWidth

        content-box
        +--------------------------+
        |margin                    |
        | +----------------------+ |
        | |border                | |
        | | +------------------+ | |
        | | |padding           | | |
        | | | +--------------+ | | |
        | | | |   content    | | | |
        |-|-|-|--------------|-|-|-|
        | | | |<-css width ->| | | |
        | | |<-  innerWidth  ->| | |
        | |<--  offsetWidth   -->| |
        |<--    outerWidth      -->|

        border-box
        +--------------------------+
        |margin                    |
        | +----------------------+ |
        | |border                | |
        | | +------------------+ | |
        | | |padding           | | |
        | | | +--------------+ | | |
        | | | |   content    | | | |
        |-|-|-|--------------|-|-|-|
        | | |<-   css width  ->| | |
        | | |<-  innerWidth  ->| | |
        | |<--  offsetWidth   -->| |
        |<--    outerWidth      -->|
        */

        _.arr.each([['_W',w, '_'+p+'W', '_'+b+'W', '_'+m+'W', c+W, o+W],
        ['_H',h, '_'+p+'H', '_'+b+'H', '_'+m+'H', c+H, o+H]],function(o){
            self.plugIn(o[0],function(node,index,value){
                var n,r,t,style=node.style,me=arguments.callee,contentBox=linb.browser.contentBox,
                r1=me.r1 || (me.r1=/%$/),
                getStyle=linb.Dom.getStyle,
                f=linb.Dom._setPxStyle,type=typeof value,t1;
                if(type=='undefined' || type=='boolean'){
                    if(value===true){
                        n=(getStyle(node,'display')=='none');
                        if(n){
                            var temp = linb.Dom.getEmptyDiv().html('*',false);
                            linb([node]).swap(temp);
                            var b,p,d;
                            b = style.visibility,p = style.position,d = style.display; p=p||'';b=b||'';d=d||'';
                            style.visibility = 'hidden'; style.position ='absolute';style.display = 'block';
                        }
                    }
                    switch(index){
                        case 1:
                            r=getStyle(node,o[1]);
                            if(isNaN(parseInt(r)) || r1.test(r))
                                r = me(node,2) - (contentBox?linb([node])[o[2]]():0);
                            r=parseInt(r)||0;
                            break;
                        case 2:
                            r=node[o[6]]-linb([node])[o[3]]();
                            break;
                        case 3:
                            //for in firefox, offsetHeight/Width's bad performance
                            //if(node._bp)
                            //    r=node['_'+o[6]];
                            //else{
                            //    t1=_();
                                r=node[o[6]];
                            //    if(_()-t1>60){
                            //        node['_'+o[6]]=r;
                            //        node._bp=1;
                            //    }
                            //}
                            if(!r)
                                //get from css setting before css applied
                                r=me(node,1)+(contentBox?(t=linb([node]))[o[2]]():0)+t[o[3]]();
                            break;
                        case 4:
                            r=me(node,3);
                            r+=linb([node])[o[4]]();
                            break;
                    }
                    if(n){
                        style.display = d; style.position = p;style.visibility = b;
                        linb([node]).swap(temp);
                        temp.empty(false);
                    }
                    return parseInt(r)||0;
                }else{
                    switch(index){
                        case 1:
                            if(f(node, o[1], value))
                                if(linb.Dom.$hasEventHandler(node,'onsize')){
                                    var args={};args[o[1]]=1;
                                    linb([node]).onSize(true, args);
                                }
                            break;
                        case 2:
                            me(node, 1, value - (contentBox?linb([node])[o[2]]():0));
                            break;
                        case 3:
                            //back value for offsetHeight/offsetWidth slowly
                            me(node, 1, value - (t=linb([node]))[o[3]]() - (contentBox?t[o[2]]():0));
                            break;
                        case 4:
                            me(node, 1, value - (t=linb([node]))[o[4]]() - t[o[3]]() - (contentBox?t[o[2]]():0));
                            break;
                    }
                    //if(node._bp)
                    //    node['_'+o[6]]=null;
                }
            })
        });
        _.arr.each([[c+W,'_W',2],[o+W,'_W',3],[r+W,'_W',4],
         [c+H,'_H',2],[o+H,'_H',3],[r+H,'_H',4]],function(o){
            self.plugIn(o[0],function(value){
                var type=typeof value;
                if(type=='undefined' || type=='boolean')
                    return this[o[1]](this.get(0), o[2]);
                else
                    return this.each(function(v){
                        this[o[1]](v, o[2],value);
                    });
            })
        });
        _.arr.each([[l+'By',l],[t+'By',t],[w+'By',w],[h+'By',h]],function(o){
            self.plugIn(o[0],function(offset,triggerEvent){
                if(offset===0)return this;
                var m,args,k=o[1],fun=linb.Dom.getStyle;
                return this.each(function(node){
                    m=fun(node,k);
                    m=(parseInt(m)||0)+offset;
                    if(k=='width'||k=='height')m=m>0?m:0;
                    node.style[k]=m+'px';
                    if(triggerEvent){
                        args={};args[k]=1;
                        var f=linb.Dom.$hasEventHandler;
                        if((k=='left' || k=='top')&& f(node,'onlocation'))
                            linb([node]).onLocation(true, args);
                        if((k=='width' || k=='height')&& f(node,'onsize')){
                            linb([node]).onSize(true, args);
                        }
                    }
                },this)
            });
        });
        _.arr.each(['scrollLeft','scrollTop'],function(o){
            self.plugIn(o,function(value){
                if(value !==undefined)
                    return this.each(function(v){
                        v[o]=value;
                    });
                else{
                    var v=this.get(0);
                    if(v===window || v===document){
                        var a=document.documentElement,b=document.body;
                        if("scrollTop"==o)return window.pageYOffset || Math.max(a[o], b[o]);
                        if("scrollLeft"==o)return window.pageXOffset || Math.max(a[o], b[o]);
                    }
                    return v[o];
                }
            })
        });
        _.arr.each('width,height,left,top'.split(','),function(o){
            self.plugIn(o,function(value){
                var self=this, node=self._nodes[0],b=linb.browser,type=typeof value,doc=document,t;
                if(!node || node.nodeType==3)return;
                if(type=='undefined'||type=='boolean'){
                    if((o=='width' && (t='Width'))||(o=='height' && (t='Height'))){
                        if(doc===node)return Math.max( doc.body['scroll'+t], doc.body['offset'+t], doc.documentElement['scroll'+t], doc.documentElement['offset'+t]);
                        if(window===node)return b.opr?(doc.body['client'+t]||window['inner'+t]):b.kde?window['inner'+t]:(linb.browser.contentBox && doc.documentElement['client'+t]) ||doc.body['client'+t];
                    }
                    //give shortcut
                    if(o=='width')value=parseInt(node.style.width)||self._W(node,1,value);
                    else if(o=='height')value=parseInt(node.style.height)||self._H(node,1,value);
                    else
                        value = linb.Dom.getStyle(node, o);
                    return value=='auto'?value:(parseInt(value)||0);
                }else{
                    var f=linb.Dom._setPxStyle,t,a;
                    return self.each(function(v){
                        if(v.nodeType!=1)return;
                            if(v.style[o]!==value){
                                if(o=='width')self._W(v,1,value);
                                else if(o=='height')self._H(v,1,value);
                                else{
                                    if(f(v, o, value))
                                        if((o=='top' || o=='left') && linb.Dom.$hasEventHandler(node,'onlocation')){
                                            a={};a[o]=1;
                                            linb([v]).onLocation(true, a);
                                        }
                                }
                            }
                    });
                }
            });
        });

        //linb.Dom event
        _.arr.each(linb.Event._events,function(o){
            _.arr.each(linb.Event._getEventName(o),function(o){
                self.$enableEvents(o);
            })
        });
    },
    Initialize:function(){
        linb.win=linb([window]);
        linb.doc=linb([document]);
        linb.$inlineBlock=linb.browser.gek?['-moz-inline-block', '-moz-inline-box','inline-block'] : linb.browser.ie6? ['inline-block', 'inline'] : 'inline-block',
        //hot keys
        linb.doc.onKeydown(function(p,e){
            var event=linb.Event,set,
                ks=event.$keyboard=event.getKey(e);
            if(ks){
                if(ks[0].length==1)ks[0]=ks[0].toLowerCase();
                set = linb.cache.hookKey[ks.join(":")];
                //if hot function return false, stop bubble
                if(set)
//                    try{
                        if(_.tryF(set[0],set[1],set[2])===false){
                            event.stopBubble(e);
                            return false;
                        }
//                    }catch(e){}
            }
            return true;
        },"document")
        .onKeyup(function(p,e){
            delete linb.Event.$keyboard;
        },"document");

        //free memory
        linb.win.afterUnload(function(){
            //unlink link 'App'
            linb.SC.__gc();
            linb.Thread.__gc();
            linb([window, document]).$clearEvent();
            linb('body').empty();
            linb.Dom.__gc();
            _.breakO([linb,Class,_],3);
            window.Class=window.linb=window._=undefined;
        },"window",-1);
    }
});Class('linb.Template','linb.absProfile',{
    Constructor:function(template,properties,events,domId){
        var self=this;
        self.$id = self.$domId = self.KEY + ':' + (self.serialId=self._pickSerialId()) + ':';
        self.domId = typeof domId == 'string'?domId:self.$domId;
        self._links={};
        self.template={'':[['<div></div>'],[]]};
        self.properties={};
        self.events={};
        self.$template={};
        self.link(self.constructor._cache,'self').link(linb._pool,'linb');
        self.box=self.constructor;
        self.boxing=function(){return this};

        if(template)self.setTemplate(typeof template=='string'?{'':template}:template);
        if(events)self.setEvents(events);
        if(properties)self.setProperties(properties);
        return self;
    },
    Instance : {
        rendered:false,
        __gc:function(){
            //no detach event here. so, don't add event using addEventlis...
            //use innerHTML way only
            //template has no memory leak, ignore it when window.unload
            this.destroy();
        },
        _reg:/^\w[\w_-]*$/,
        getRootNode:function(){
            return this.domNode || (this.domNode=document.getElementById(this.domId));
        },
        setDomId:function(id){
            var t=this, c=linb.cache.dom, reg=t._reg;
            //ensure the value
            if(typeof id== 'string' && reg.test(id) && !document.getElementById(id)){
                //delete the original one
                if(t.domId!=t.$domId)delete c[t.domId];
                //set profile's domId
                t.domId=id;
                //change the domNode id value
                if(t.getRootNode())t.getRootNode().id=id;
                //if doesn't create yet, don't set it to linb.cache:
                if(c[t.$domId])c[id]=t;
            }
            return t;
        },
        destroy:function(){
            var self=this,
                t=linb.cache.domId;
            if(self.domNode){
                var me=this.constructor, c=me.c||(me.c=document.createElement('div'));
                c.appendChild(self.domNode);
                self.domNode=null;
                c.innerHTML='';
            }

            (t[self.KEY] || (t[self.KEY]=[])).push(self.serialId);
            delete linb.cache.dom[self.domId];
            delete linb.cache.dom[self.$domId];
            self.unLinkAll();
            _.breakO(self);
        },
        setEvents:function(key,value){
            var self=this;
            if(typeof key == 'object')
                self.events=key;
            else
                self.events[key]=value;
            return self;
        },
        setTemplate:function(key,value){
            var self=this, t=self.template,$t=self.$template,f=self._buildTemplate,h;
            if(typeof key == 'object'){
                self.template=key;
                h={};
                for(var i in key)
                    h[i]=f(key[i]);
                self.$template=h;
            }else if(typeof value == 'string')
                $t[key]=f(t[key]=value);
            else
                $t['']=f(t['']=key);
            return self;
        },
        setProperties:function(key,value){
            var self=this;
            if(typeof key == 'object')
                self.properties=key;
            else
                self.properties[key]=value;
            return self;
        },
        getItem:function(src){
            if(typeof src=='string')src=document.getElementById(src);
            if(!src)return;
            var id=src.getAttribute('evid'), evkey=src.getAttribute('evkey');
            if(!id || !evkey)return;

            var me=arguments.callee,
                f = me.f || (me.f = function(data, evkey, id){
                    var i,o,j,v;
                    for(j in data){
                        o=data[j];
                        if(o  && o.constructor==Array && (evkey==j||evkey.indexOf((data._evkey||j)+'.')===0))
                            for(i=0;v=o[i];i++){
                                if(v._evkey==evkey&&v.id==id)return v;
                                else if(v=f(v,evkey,id)) return v;
                            }
                    }
                });
            return f(this.properties, evkey, id);
        } ,
        _pickSerialId:function(){
            //get id from cache or id
            var arr = linb.cache.domId[this.KEY];
            if(arr && arr[0])return arr.shift();
            return this.constructor._ctrlId.next();
        },
        render:function(){
            var self=this,
                str = self.toHtml(),
                o;
            if(o=self.getRootNode()){
                var b,r = (b=o.previousSibling)?o.previousSibling:o.parentNode;
                if(linb.browser.gek){
                    o.id='';
                    var range = o.ownerDocument.createRange();
                    range.setStartBefore(o);
                    o.parentNode.replaceChild(range.createContextualFragment(str), o);
                }else
                    o.outerHTML=str;
                if(r)
                    self.domNode = b?r.nextSibling:r.firstChild;
            }else{
                var me=this.constructor, c=me.c||(me.c=document.createElement('div'));
                linb.cache.dom[self.domId]=linb.cache.dom[self.$domId]=this;
                self.rendered=true;
                c.innerHTML = str;
                self.domNode = c.removeChild(c.firstChild);
            }
            return self;
        },
        renderOnto:function(node){
            var id,domNode,style='style',t;
            if(typeof node=='string')node=document.getElementById(node);
            id=node.id||(node.id=_.id());
            domNode=this.domNode;
            node.parentNode.replaceChild(domNode,node);

            if(domNode.tabIndex!=node.tabIndex)
                domNode.tabIndex!=node.tabIndex;
            if(node.className)
                domNode.className += node.className;
            if(linb.browser.ie && (t=node.style.cssText))
                domNode.style.cssText += t+'';
            else if(t=node.getAttribute(style))
                domNode.setAttribute(style, (domNode.getAttribute(style)||'') + t);

            this.setDomId(id);
        },
        toHtml:function(properties){
            return this._doTemplate(properties||this.properties||{});
        },
        _buildTemplate:function(str){
            if(typeof str=='string'){
                var me=arguments.callee,
                reg = me._reg || (me._reg=/([^{}]*)\{([\w]+)\}([^{}]*)/g),
                reg2 = me._reg2 || (me._reg2=/(<[^>]+\[\$e\])([^>]*[>])/g),
                obj=[[],[]],
                a0=obj[0],
                a1=obj[1]
                ;
                str=str.replace(reg2,'$1 evid={id} evkey={_evkey}$2');
                str.replace(reg,function(a,b,c,d){
                    if(b)a0[a0.length]=b;
                    a1[a0.length]=a0[a0.length]=c;
                    if(d)a0[a0.length]=d;
                    return '';
                });
                return obj;
            }else
                return str;
        },
        _getEV:function(id, name, src){
            var evs = this.events,
                evkey = src.getAttribute('evkey'),
                evg = evkey&&evs&&evs[evkey]||evs,
                ev = evg&&evg[name];
            return typeof ev=='function'?[ev]:[];
        },
        _doTemplate:function(properties, tag, result){
            if(!properties)return '';

            var self=this, me=arguments.callee,s,t,n,isA = properties.constructor == Array,
            r1=me.r1||(me.r1=/(\[\$e\])/g),
            r2=me.r2||(me.r2=/(^\s*<\w+)(\s|>)(.*)/),
            template = self.$template,
            temp = template[tag||''],
            r = !result;

            result= result || [];
            if(isA){
                if(typeof temp != 'function')temp = me;
                for(var i=0;t=properties[i++];){
                    t._evkey=tag;
                    temp.call(self, t, tag, result);
                }
            }else{
                if(typeof temp == 'function')
                    temp.call(self, properties, tag, result);
                else{
                    tag = tag?tag+'.':'';
                    var a0=temp[0], a1=temp[1];
                    for(var i=0,l=a0.length;i<l;i++){
                        if(n=a1[i]){
                            if(n in properties){
                                t=properties[n];
                                //if sub template exists
                                if(template[s=tag+n])
                                    me.call(self, t, s, result);
                                else
                                    result[result.length]=t;
                            }
                        }else
                            result[result.length]=a0[i];
                    }
                }
            }
            if(r){
                return result.join('')
                    .replace(r1,  '"return linb.Event(arguments[0],this,0,\'' + self.domId +'\')"')
                    .replace(r2, '$1 id="'+self.domId+'" $2$3');
            }
        },
        serialize:function(){
            var self=this,
                s=_.serialize,
                t=linb.absObj.$specialChars,
                properties = _.isEmpty(self.properties)?null:_.clone(self.properties,function(o,i){return !t[(i+'').charAt(0)]});            
            return 'new linb.Template(' + 
            s(self.template||null) + "," + 
            s(properties) + "," + 
            s(_.isEmpty(self.events)?null:self.events) + "," + 
            s(self.$domId!=self.domId?self.domId:null) + 
            ')';
        }
    },
    Static : {
        getFromDomId:function(id){
            var o=linb.cache.dom[id];
            if(o&&o.boxing)return o.boxing();
        },
        _cache:[],
        _ctrlId : new _.id()
    }
});/*
beforeCreated
onCreated
onLoadBaseClass
onIniResource
    iniResource (asy)
beforeIniComponents
    iniComponents (asy)
afterIniComponents
    iniExComs (asy)
onLoadReqiredClass
onReady
onRender
*/

Class('linb.Com',null,{
    Constructor:function(properties, events, host){
        var self=this;
        self._nodes=[];
        self.host=host||self;

        self.properties = properties || {};
        //copy those from class setting
        self.events = _.copy(self.events) || {};
        if(events)
            _.merge(self.events, events, 'all');
    },
    Instance:{
        setHost:function(value, alias){
            this.host=value;
            return value[alias]=this;
        },
        getHost:function(){
            return this.host;
        },
        setProperties:function(key,value){
            var self=this;
            if(!key)
                self.properties={};
            else if(typeof key=='string')
                self.properties[key]=value;
            else
                _.merge(self.properties, key, 'all');
            return self;
        },
        getProperties:function(key){
            return key?this.properties[key]:this.properties;
        },
        setEvents:function(key,value){
            var self=this;
            if(!key)
                self.events={};
            else if(typeof key=='string')
                self.events[key]=value;
            else
                _.merge(self.events, key, 'all');
            return self;
        },
        getEvents:function(key){
            return key?this.events[key]:this.events;
        },

        _fireEvent:function(name, args){
            var t, self=this;
            if(t=self.events[name]){
                if(typeof t=='string')t=self.host[t];
                args=args||[];
                args.splice(0,0,self,self.threadid);
                self.$lastEvent=name;
                if(typeof t=='function')
                    return t.apply(self.host, args);
            }
        },
        _innerCall:function(name){
            var self=this;
            return _.tryF(self[name],[self, self.threadid],self);
        },
        show:function(onEnd,parent,subId,threadid){
            var self=this,f=function(){
                self.render();
                if(self.customAppend)
                    self.customAppend.call(self, parent,subId,threadid);
                else
                    (parent||linb('body')).append(self.getUIComponents(),subId);
                _.tryF(onEnd,[self, threadid],self.host);
            };
            self.threadid=threadid;
            
            if(self.created)
                f();
            else
                self.create(f,threadid);
        },
        render:function(triggerLayOut){
            var self=this;
            self.getUIComponents().render(triggerLayOut);
            self._fireEvent('onRender');
            self.rendered=true;
        },
        create:function(onEnd, threadid){
            //get paras
            var self=this,
                t,funs=[]
                ;
            self.threadid=threadid;

            if(false===self._fireEvent('beforeCreated'))return;
            //if no threadid or threadid doesnt exist, reset threadid to self
            funs.push(function(threadid){
                self.threadid=threadid;
                self._fireEvent('onCreated');
            });
            //base classes
            if((t=self.base) && t.length)
                funs.push(function(threadid){
                    linb.SC.groupCall(self.base,function(key){
                        self._fireEvent('onLoadBaseClass', [key]);
                    },null,threadid);
                });
            //load resource here
            if(self.iniResource)
                funs.push(function(){
                    self._fireEvent('onIniResource');
                    self._innerCall('iniResource');
                });
            //load required class
            if((t=self.required) && t.length)
                funs.push(function(threadid){
                    linb.SC.groupCall(self.required,function(key){
                        self._fireEvent('onLoadReqiredClass', [key]);
                    },null,threadid);
                });
            //inner components
            if(self.iniComponents)
                funs.push(function(){
                    if(false===self._fireEvent('beforeIniComponents'))return;
                    Array.prototype.push.apply(self._nodes, self._innerCall('iniComponents')||[]);
                    self._fireEvent('afterIniComponents');
                });
            //Outer components
            if(self.iniExComs)
                funs.push(function(){
                    self._innerCall('iniExComs');
                });
            //core
            funs.push(function(threadid){
                self.loaded=true;
                //lazy load
                if(self.background)
                    linb.SC.runInBG(self.background);
                self._fireEvent('onReady');
            });
            funs.push(function(threadid){
                _.tryF(onEnd,[self, threadid],self.host);
            });
            //use asyUI to insert tasks
            linb.Thread.observableRun(funs, function(){
                self.created=true;
            },threadid);
        },

        iniComponents:function(){},

//<<<todo:

        requestData:function(group, onEnd, threadid){
            var thread=linb.Thread;
            thread.observableRun(function(t){
                linb.absIO.groupCall(group, null, null, onEnd,thread||t);
            },null,threadid);
        },
        /* build order:
        +-----------+
        |  +-------+|
        |  |  +---+||
        |a |ab|abc|||
        |  |  +---+||
        |  +-------+|
        +-----------+
        1.thread start
        2.build a UI
            build ab UI
                build abc UI
        3.fill a data
            fill ab data
                fill abc data
        4.thread end
        */
        //buid UI
        composeUI:function(onEnd, threadid, flag){
            _.tryF(onEnd);
        },
        //fill data
        fillUI:function(onEnd, threadid, flag){
            _.tryF(onEnd);
        },
//>>>todo end



        getUIComponents:function(){
            var nodes = _.copy(this._nodes),t,k='linb.UI';
            _.filter(nodes,function(o){
                return !!(o.box[k] && !o.box.$noDomRoot);
            });
            return linb.UI.pack(nodes, false);
        },
        getComponents:function(){
            return linb.absObj.pack(_.copy(this._nodes),false);
        },
        setComponents:function(obj){
            var self=this,t;
            _.arr.each(self._nodes,function(o){
                if((t=self[o.alias]) &&t.get(0)==o)
                    delete self[o.alias];
            });
            _.arr.each(self._nodes=obj.get(),function(o){
                self[o.alias]=o.boxing();
            });
            return self;
        },
        destroy:function(threadid){
            var self=this;
            self.threadid=threadid;
            self._fireEvent('onDestroy');
            _.arr.each(self._nodes, function(o){
                if(o.box)
                    o.boxing().destroy();
            });
            self._nodes.length=0;
            _.breakO(self);
        }
    },
    Static:{
        load:function(cls, onEnd, lang, showUI){
            var fun=function(){
                //get app class
                linb.SC(cls,function(path){
                    //if successes
                    if(path){
                        var a=this,f=function(){
                            var o=new a();
                            if(showUI!==false)o.show(onEnd);
                            else _.tryF(onEnd,[o],o);
                        };
                        //get locale info
                        if(lang) linb.reLang(lang, f);
                        else f();
                    }else
                        throw new Error(cls+' doesnt exists!');
                },true);
            };
            if(linb.isDomReady)
                fun();
            else
                linb.main(fun);
        },
        $EventHandlers:{
            beforeCreated:function(com, threadid){},
            onLoadBaseClass:function(com, threadid, key){},
            onIniResource:function(com, threadid){},
            beforeIniComponents:function(com, threadid){},
            afterIniComponents:function(com, threadid){},
            onLoadRequiredClass:function(com, threadid, key){},
            onReady:function(com, threadid){},
            onRender:function(com, threadid){}
        }
    }
});
Class("linb.Cookies", null,{
    Static:{
        set:function(name,value,days,path,domain,isSecure){
	        if(name){
    	        document.cookie = escape(name) + "=" + escape(value) +
    		        (days?";expires="+(new Date((new Date()).getTime()+(24*60*60*1000*days))).toGMTString():"")+
    		        (path?";path="+path:"")+
    		        (domain?";domain="+domain:"")+ 
    		        (isSecure?";secure":"");
    		}
    		return this;
        },
        get:function(name){
        	var i,a,ca = document.cookie.split( "; " );
        	for(i=0;i<ca.length;i++){
        		a=ca[i].split("=");
        		if(a[0]==escape(name))
        		    return a[1]?unescape(a[1]):'';
        	}
        	return null;
        },
        remove:function(name){
        	return this.set(name,"",-1).set(name,"/",-1);
        }
    }
});/*
profile input:
===========================
    [dragType]: String , "move","copy","deep_copy","shape","icon","blank" and "none", default is "shape"
        "blank": moves a empty proxy when mouse moves
        "move": moves target object directly when mouse moves
        "copy": moves a copy of target object when mouse moves
        "deep_copy": moves a deep copy of target object when mouse moves
        "shape": moves a shape of target object when mouse moves
        "icon": moves a icon that represents target object when mouse moves
        "none": moves mouse only
-------------------------
    [dragDefer] :  Number, when [linb.DragDrop.startDrag] is called, the real drag action will be triggered after [document.onmousemove] runs [dragDefer] times, default is 0;
-------------------------
    [magneticDistance]: Number,
    [xMagneticLines]: Array of Number,
    [yMagneticLines]: Array of Number,
        Magnetic setting:
        yMagneticLines 1                      2                     3
              |                      |                     |       xMagneticLines
          ----+----------------------+---------------------+-------1
              |                      |                     |
              |                      |                     |
              |                      |                     |
              |                      |                     |
          ----+----------------------+---------------------+-------2
              |                      |                     |
              |                      |                     |
              |                      |                     |
          ----+----------------------+---------------------+-------3
              |                      |                     |

        magneticDistance
         +-------------
         |*************
         |*************
         |**
         |**
         |**
-------------------------
    [widthIncrement]: Number,
    [heightIncrement]: Number,
        Increment setting:
                   widthIncrement
               <-------------------->
              |                      |                     |
          ----+----------------------+---------------------+-------
              |                      |                     |
heightIncrement|                      |                     |
              |                      |                     |
              |                      |                     |
          ----+----------------------+---------------------+-------
              |                      |                     |
              |                      |                     |
              |                      |                     |
              |                      |                     |
          ----+----------------------+---------------------+-------
              |                      |                     |
              |                      |                     |
-------------------------
    [horizontalOnly]: Number,
    [verticalOnly]: Number,
    horizontalOnly
    ------------------------------------------
                ****************
                ****************
                ****************
                ****************
                ****************
                ****************
    ------------------------------------------
    verticalOnly
               |                |
               |                |
               |****************|
               |****************|
               |****************|
               |****************|
               |****************|
               |****************|
               |                |
               |                |
-------------------------
    [maxBottomOffset]: Number,
    [maxLeftOffset]: Number,
    [maxRightOffset]: Number,
    [maxTopOffset]: Number,
        you can set the limited offset region
        +----------------------------------------------+
        |              |                               |
        |              |maxTopOffset                   |
        |<------------>****************<-------------->|
        |maxLeftOffset**************** maxRightOffset  |
        |              ****************                |
        |              ****************                |
        |              ****************                |
        |              ****************                |
        |              |maxBottomOffset                |
        |              |                               |
        +----------------------------------------------+
-------------------------
    [targetReposition]: <bool>,

    //ini pos and size
    [targetLeft]: Number
    [targetTop]: Number
    [targetWidth]: Number
    [targetHeight]: Number
    [targetCSS]: <object>
        You can set position and size when drag start:
                      targetLeft
                      |
                      |
        targetTop  ---**************** |
                      **************** |
                      **************** |
                      **************** |targetHeight
                      **************** |
                      **************** |
                     |<--targetWidth ->+
-------------------------
    //properties
    [dragCursor]: <string>
-------------------------
    //for drag data
    [dragKey]
    [dragData]

profile output: readonly
===========================
linb.DragDrop.getProfile():
    x  :current X value of mouse;
    y  :current Y value of mouse;
    ox: mouse original X when drag start;
    oy: mouse original Y when drag start;
    curPos:{left:xx,top:xx}: current css pos of the dragging node;
    offset : {x:,y}: offset from now to origin
    restrictedLeft : Number
    restrictedRight : Number
    restrictedTop : Number
    restrictedBottom : Number
    isWorking: Bool.
    proxyNode: linb.Dom object,
    dropElement: String, DOM element id.
*/
Class('linb.DragDrop',null,{
    Static:{
        _eh:"_dd",
        _id:"linb.dd:proxy:",
        _idi:"linb.dd:td:",
        _type:{blank:1,move:1,shape:1,deep_copy:1,copy:1,icon:1,none:1},
        _Icons:{none:'top', move:'-16px', link:'-32px',add:'-48px'},
        _profile:{},

        //get left for cssPos
        _left:function(value){
            with(this._profile){
                if(magneticDistance>0 && xMagneticLines.length){
                    var l=xMagneticLines.length;
                    while(l--)
                        if(Math.abs(value - xMagneticLines[l])<=magneticDistance)
                            return xMagneticLines[l];
                }
                if(widthIncrement>1)
                   return Math.floor(value/widthIncrement)*widthIncrement;
                return value;
            }
        },
        //get top for cssPos
        _top:function(value){
            with(this._profile){
                if(magneticDistance>0 && yMagneticLines.length){
                    var l=yMagneticLines.length;
                    while(l--)
                        if(Math.abs(value - yMagneticLines[l])<=magneticDistance)
                            return yMagneticLines[l];
                }
                if(heightIncrement>1)
                    return Math.floor(value/heightIncrement)*heightIncrement;
                return value;
            }
        },

        _ini:function(o){
            var d=this,p=d._profile,_t=linb.win;

            d._box = { width :_t.width()+_t.scrollLeft(),  height :_t.height()+_t.scrollTop()};

            p.ox = p.x;
            p.oy = p.y;

            if(d._proxy = o){
                d._proxystyle=o.get(0).style;

                //ini cssPos here
                d._profile.curPos = d._cssPos= d._proxy.cssPos();

                d._cssPos_x = p.x - d._cssPos.left;
                d._cssPos_y = p.y - d._cssPos.top;

                p.restrictedLeft = p.x - (p.maxLeftOffset||0);
                p.restrictedRight =  p.x + (p.maxRightOffset||0);
                p.restrictedTop = p.y - (p.maxTopOffset||0);
                p.restrictedBottom = p.y + (p.maxBottomOffset||0);

                //here
                d._proxyLeft = d._pre.left = d._cssPos.left;
                d._proxyTop = d._pre.top = d._cssPos.top;

                if("move" !== p.dragType)
                    d._proxy.css('zIndex',linb.Dom.TOP_ZINDEX*10);
            }

        },
        _reset:function(){
            var d=this,NULL=null,FALSE=false;
            //reset
            _.tryF(d.$reset);
            d.setDropFace();
            d._resetProxy();

            d.$proxySize=50;
            //event
            d.$mousemove=d.$mouseup=d.$onselectstart=d.$ondragstart='*';

            //reset private vars
            d._cursor='';
            d._pre={};
            d._proxyLeft=d._proxyTop=d._cssPos_x=d._cssPos_y=0;
            d._stop=FALSE;
            d._cssPos=d._box=d._dropElement=d._source=d._proxy=d._proxystyle=d._onDrag=d._onDragover=NULL;

            //reset profile
            d._profile={
                dragType:'shape',
                dragCursor:'move',
                targetReposition:true,

                dragIcon:linb.ini.path+'ondrag.gif',
                magneticDistance:0,
                xMagneticLines:[],
                yMagneticLines:[],
                widthIncrement:0,
                heightIncrement:0,
                dragDefer:0,

                horizontalOnly:FALSE,
                verticalOnly:FALSE,
                maxBottomOffset:NULL,
                maxLeftOffset:NULL,
                maxRightOffset:NULL,
                maxTopOffset:NULL,

                targetNode:NULL,
                targetCSS:NULL,
                dragKey:NULL,
                dragData:NULL,
                targetLeft:NULL,
                targetTop:NULL,
                targetWidth:NULL,
                targetHeight:NULL,
                targetOffsetParent:NULL,

                shadowFrom:NULL,

                //Cant input the following items:
                proxyNode:NULL,
                x:0,
                y:0,
                ox:0,
                oy:0,
                curPos:{},
                offset:{},
                isWorking:FALSE,
                restrictedLeft:NULL,
                restrictedRight:NULL,
                restrictedTop:NULL,
                restrictedBottom:NULL,
                dropElement:NULL
            };
            return d;
        },
        abort:function(){
            this._stop=true;
        },
        _end:function(){
            var d=this,doc=document;

            if(d._proxy) d._unpack();

            //must here
            //if bak, restore
            if(d.$onselectstart!='*')doc.body.onselectstart=d.$onselectstart;
            if(d.$ondragstart!='*')doc.ondragstart=d.$ondragstart;
            //if bak, restore
            if(d.$mousemove!='*')doc.onmousemove=d.$mousemove;
            if(d.$mouseup!='*')doc.onmouseup=d.$mouseup;

            return  d;
        },
        startDrag:function(e, targetNode, profile, dragKey, dragData){
            var d=this;
            profile=_.isHash(profile)?profile:{};

            //clear
            d._end()._reset();

            e = e || window.event;
            // not left button
            if(linb.Event.getBtn(e) !== 'left')
               return true;

            d._source = profile.targetNode = linb(targetNode);
            d._cursor = d._source.css('cursor');

            if(!profile.targetNode.id())profile.targetNode.id(_.id(),true);

            //must set here
            d._defer = profile.dragDefer = _.isNumb(profile.dragDefer) ? profile.dragDefer : 0;
            if(true===profile.dragCursor)profile.dragCursor=d._cursor;
            if(typeof profile.dragIcon == 'string') profile.dragType="icon";

            var doc=document, _pos = linb.Event.getPos(e);
            profile.x = _pos.left;
            profile.y = _pos.top;

            profile.dragKey= dragKey || profile.dragKey || null;
            profile.dragData= dragData  || profile.dragData|| null;
            
            var fromN=linb.Event.getSrc(e);

            d._start=function(e){
//ie6: mousemove - mousedown =>78 ms
//delay is related to window size, weird
            //                  try{
                var p=d._profile;
                //set profile
                _.merge(p, profile, "with");

                //call event, you can call abort(set _stoop)
                d._source.beforeDragbegin();

                if(p.isWorking || d._stop){d._end()._reset();return false}

                //set linb.Event._preDropable at the begining of drag, for a dd from a child in a dropable node
                if(linb.Event)linb.Event._preDropable=d._source.get(0).id;

                //set default icon
                if(p.dragType=='icon')p.targetReposition=false;

                //ini
                d._ini(p.dragType=='none'?null:d._pack(_pos, p.targetNode));
                // on scrollbar
                if(profile.x >= d._box.width  || profile.y >= d._box.height ){d._end()._reset();return true}

                //set isWorking flag
                p.isWorking = true;

                d._source.onDragbegin();

                //set back first
                if(p.dragDefer<1){
                    d.$mousemove = doc.onmousemove;
                    d.$mouseup = doc.onmouseup;
                }
                //avoid setcapture
                if(linb.browser.ie)
                    setTimeout(function(){fromN.releaseCapture()});

                //back up
                doc.onmousemove = d.$onDrag;
                doc.onmouseup = d.$onDrop;
                //for events
                d._source.afterDragbegin();
                //for delay, call ondrag now
                if(p.dragDefer>0)d.$onDrag.call(d, e);
            //                  }catch(e){d._end()._reset();}
            };
            if(linb.browser.ie){
                d.$ondragstart=doc.ondragstart;
                d.$onselectstart=doc.body.onselectstart;
                doc.ondragstart = doc.body.onselectstart = null;
                if(doc.selection)_.tryF(doc.selection.empty);
            }

            //avoid select
            linb.Event.stopBubble(e);

            //fire document onmousedown event
            if(profile.targetNode.get(0)!==doc)
                linb(doc).onMousedown(true, linb.Event.getEventPara(e));

            if(profile.dragDefer<1){
                _.tryF(d._start,[e],d);
                return false;
            }else{
                //for mouseup before drag
                d.$mouseup = doc.onmouseup;
                doc.onmouseup = function(e){
                    linb.DragDrop._end()._reset();
                    return _.tryF(document.onmouseup,[e],null,true);
                };
                //for mousemove before drag
                d.$mousemove = doc.onmousemove;
                var pbak={};
                doc.onmousemove = function(e){
                    var p=linb.Event.getPos(e);
                    if(p.left===pbak.left&&p.top===pbak.top)return;
                    pbak=p;
                    if(--d._defer<=0)linb.DragDrop._start(e);
                    return false;
                };
            }
//ie6: mousemove - mousedown =>78 ms
        },
        $onDrag:function(e){
            var d=linb.DragDrop,p=d._profile;

           //try{
                e = e || window.event;
                //set _stop or in IE, show alert
                if((!p.isWorking) || d._stop || (linb.browser.ie && (!e.button) )){
                    d.$onDrop(e);
                    return true;
                }

                var _pos=linb.Event.getPos(e);
                p.x=_pos.left;
                p.y=_pos.top;

                if(!p.isWorking)return false;

                if(d._proxy){
                    if(!p.verticalOnly){
                        d._proxyLeft=Math.floor(d._left(
                            ((p.maxLeftOffset!==null||p.maxRightOffset!==null)?
                                ((p.x<=p.restrictedLeft)?p.restrictedLeft:(p.x>=p.restrictedRight)?p.restrictedRight:p.x):
                                p.x)
                            - d._cssPos_x)
                        );
                        if(d._proxyLeft-d._pre.left)
                            d._proxystyle.left=d._proxyLeft+'px';
                        d._pre.left=d._proxyLeft;
                        p.curPos.left = d._proxyLeft + d.$proxySize;
                    }
                    if(!p.horizontalOnly){
                        d._proxyTop=Math.floor(d._top(
                            ((p.maxTopOffset!==null||p.maxBottomOffset!==null)?
                                ((p.y<=p.restrictedTop)?p.restrictedTop:(p.y>=p.restrictedBottom)?p.restrictedBottom:p.y):
                                p.y)
                            - d._cssPos_y)
                        );
                        if(d._proxyTop-d._pre.top)
                            d._proxystyle.top=d._proxyTop+'px';
                        d._pre.top=d._proxyTop;
                        p.curPos.top = d._proxyTop + d.$proxySize;
                    }
                }else{
                    p.curPos.left = p.x;
                    p.curPos.top = p.y;
                    //style='none', no dd.current dd._pre provided
                    //fireEvent
                    //d._source.onDrag(true); //shortcut for mousemove
                }
                if(d._onDrag!=1){
                    if(d._onDrag)d._onDrag(e);
                    else{
                        //ensure to run once only
                        d._onDrag=1;
                        //if any ondrag event exists, this function will set _onDrag
                        d._source.onDrag(true,linb.Event.getEventPara(e));
                    }
                }
            //}catch(e){linb.DragDrop._end()._reset();}finally{
               return false;
            //}
        },
        $onDrop:function(e){
            var d=linb.DragDrop,p=d._profile,evt=linb.Event;
//                try{
                e = e || window.event;

                // opera 9 down with
                // if(!isWorking){evt.stopBubble(e);return false;}
                d._end();
                if(p.isWorking){
                    var r = d._source.onDragstop(true,evt.getEventPara(e));
                    if(d._dropElement)
                        linb([d._dropElement]).onDrop(true,evt.getEventPara(e));
                }
//                }catch(a){}finally{
                d._reset();
                evt.stopBubble(e);
                _.tryF(document.onmouseup,[e]);
                return !!r;
//                }
        },
        setDropElement:function(src){
            this._profile.dropElement=(this._dropElement=src) && src.id;
            return this;
        },
        getProfile:function(){
            var d=this,p=d._profile;
            p.offset=d._proxy
            ?
            { x : d._proxyLeft-p.ox+d._cssPos_x,  y : d._proxyTop-p.oy+d._cssPos_y}
            :
            { x : p.x-p.ox,  y : p.y-p.oy}
            ;
            return p;
        },
        setDropFace:function(target, dragIcon){
            var d=this,
                s1='<div style="position:absolute;z-index:'+linb.Dom.TOP_ZINDEX+';font-size:0;line-height:0;border-',
                s2=":dashed 1px #ff6600;",
                region=d._Region,rh=d._rh,
                bg='backgroundColor';
            if(region && region.parent())
                region.remove(false);
            if(d._R){
                d._R.css(bg, d._RB);
                delete d._R;
                delete d._RB;
            }

            if(target){
                if(!region){
                    region=d._Region=linb.create(s1+'top'+s2+'left:0;top:0;width:100%;height:0;"></div>'+s1+'right'+s2+'right:0;top:0;height:100%;width:0;"></div>'+s1+'bottom'+s2+'bottom:0;left:0;width:100%;height:0;"></div>'+s1+'left:solid 2px #ff6600;width:0;left:0;top:0;height:100%;"></div>');
                    rh=d._rh=linb([region.get(1),region.get(3)]);
                }target=linb(target);
                if(linb.browser.ie6)rh.height('100%');
                if(target.css('display')=='block'){
                    target.append(region);
                    if(linb.browser.ie6 && !rh.get(0).offsetHeight)
                        rh.height(target.get(0).offsetHeight);
                }else{
                    d._RB = target.get(0).style[bg];
                    d._R=target;
                    target.css(bg, '#FA8072');
                }
                d.setDragIcon(dragIcon||'move');
            }else
                d.setDragIcon('none');
            return d;
        },
        setDragIcon:function(key){
            //avoid other dropable targetNode's setDropFace disturbing.
            _.resetRun('setDropFace', null);
            var d=this,p=d._profile,i=p.proxyNode,ic=d._Icons;
            if(i && p.dragType=='icon')
                i.first(4).css('backgroundPosition', 'left ' + (ic[key]||ic.none));
            return d;
        },
        _setProxy:function(child, pos){
            var t,temp,d=this,p=d._profile,dom=linb.Dom;
            if(!dom.byId(d._id))
                linb('body').prepend(
                    //&nbsp; for IE6
                    linb.create('<div id="' + d._id + '" style="left:0;top:0;border:0;font-size:0;line-height:0;padding:'+d.$proxySize+'px; position: absolute;"><div style="font-size:0;line-height:0;" id="' +d._idi+ '">'+(linb.browser.ie6?'&nbsp;':'')+'</div></div>')
                );
            t=linb(d._id);
            if(p.dragKey){
                d.$proxySize=0;
                t.css('padding',0);
            }else{
                pos.left -=  d.$proxySize;
                pos.top -= d.$proxySize;
                if(!p.targetOffsetParent)
                    dom.setCover(true);
            }
            if(temp=p.targetOffsetParent)
                linb(temp).append(t);

            if(child){
                linb(d._idi).empty(false).append(child);
                p.proxyNode = child;
            }else
                p.proxyNode = linb(d._idi);
            t.css({display:'',zIndex:dom.TOP_ZINDEX*10,cursor:p.dragCursor}).offset(pos, temp);

            return t;
        },
        _resetProxy:function(){
            var d=this, p=d._profile,
                dom=linb.Dom,
                id1=d._id,
                id2=d._idi;
            if(dom.byId(id1)){
                var t,k,o=linb(id2),t=linb(id1);
                //&nbsp; for IE6
                if(linb.browser.ie6)
                    o.html('&nbsp;',false);
                else o.empty(false);
                o.attr('style','font-size:0;line-height:0;');

                linb('body').prepend(
                    t
                    .css({
                        zIndex:0,
                        cursor:'',
                        display:'none',
                        padding:d.$proxySize+'px'
                    })
                );
                p.proxyNode=d._proxystyle=null;
                dom.setCover(false);
            }
        },
        _pack:function(mousePos,targetNode){
            var target, pos={}, size={}, d=this, p=d._profile, t;
            // get abs pos (border corner)
            if(p.targetLeft===null || null===p.targetTop)
                t=targetNode.offset(null, p.targetOffsetParent);
            pos.left = null!==p.targetLeft?p.targetLeft: t.left;
            pos.top = null!==p.targetTop?p.targetTop: t.top;

            switch(p.dragType){
                case 'deep_copy':
                case 'copy':
                   var t;
                    size.width =  _.isNumb(p.targetWidth)? p.targetWidth:(targetNode.cssSize().width||0);
                    size.height = _.isNumb(p.targetHeight)?p.targetHeight:(targetNode.cssSize().height||0);
                    var n=targetNode.clone(p.dragType=='deep_copy').id('', true).css({position:'relative',cursor:p.dragCursor,margin:0,'cssFloat':'none'}).cssSize(size);
                    n.css('opacity',0.5);
                    if(p.targetCSS)
                        n.css(p.targetCSS);
                    n.cssPos({margin:'0',left:'0',top:'0'}).query().id('',true);
                    target = d._setProxy(n,pos);
                    break;
                case 'shape':
                    // get size
                    size.width = null!==p.targetWidth?p.targetWidth:targetNode.offsetWidth();
                    size.height = null!==p.targetHeight?p.targetHeight:targetNode.offsetHeight();
                    size.width-=2;size.height-=2;
                    target = d._setProxy(
                        linb.create('div').css({border:'dashed 1px',fontSize:'0',lineHeight:'0'}).cssSize(size)
                        ,pos);
                    break;
                case 'blank':
                    target = d._setProxy(null,pos);
                    break;
                case 'icon':
                    pos.left=_.isNumb(p.targetLeft)?p.targetLeft:(mousePos.left - linb.win.scrollLeft() + 16);
                    pos.top=_.isNumb(p.targetTop)?p.targetTop:(mousePos.top - linb.win.scrollTop() + 16);
                    t='<table border="0"><tr><td valign="top"><span style="background:url('+p.dragIcon+') no-repeat left top;width:'+(_.isNumb(p.targetWidth)?p.targetWidth:16)+'px;height:'+(_.isNumb(p.targetHeight)?p.targetHeight:16)+'px;" ></span></td><td id="linb:dd:shadow" '+(p.shadowFrom?'style="border:solid 1px #e5e5e5;"':'')+'>'+(p.shadowFrom?linb(p.shadowFrom).clone(true).cssPos({left:'auto',top:'auto',padding:0,margin:0}).outerHTML().replace(/\s*id\=[^\s\>]*/g,''):'')+'</td></tr></table>';
                    target = d._setProxy(linb.create(t), pos);
                    break;
                case 'move':
                    d.$proxySize=0;
                    target=targetNode;
                    if(target.css('position') != 'absolute')
                        target.css('position','absolute').offset(pos);
                    target.css('cursor',p.dragCursor);
            }

            return target;
        },
        _unpack:function(){
            var d=this, p=d._profile, t,f;
            if(p.targetReposition && ("move" != p.dragType)){
                if((t=linb(d._source)))
                    if(!t.isEmpty()){
                        if(t.css('position')!= 'absolute')
                            t.css('position','absolute').cssPos(t.offset(null,t.get(0).offsetParent ));

                        //for ie bug
                        if(linb.browser.ie)
                            t.cssRegion({right:'auto',bottom:'auto'});
                        t.offset(p.curPos, p.targetOffsetParent||document.body);
                    }
            }
            if("move" == p.dragType)
                d._source.css('cursor',d._cursor);
        },
        _unRegister:function(id, key){
            var o=linb(id), eh=this._eh;
            o.$removeEvent('beforeMouseover', eh)
              .$removeEvent('beforeMouseout', eh)
              .$removeEvent('beforeMousemove', eh)
            ;
            o.each(function(o){
                var c = linb.cache.dom[o.id];
                if(c=c.nodeVars)delete c._dropKeys;
                o._dropKeys=null;
            });
        },
        _register:function(id, key){
            var o=linb(id),eh=this._eh;
            o.beforeMouseover(function(){
                var t=linb.DragDrop,p=t._profile,self=this;
                if(p.dragKey && self._dropKeys[p.dragKey]){
                    t.setDropElement(self);
                    t._onDragover=null;
                    linb([self]).onDragenter(true);
                    if(t._dropElement)_.resetRun('setDropFace', t.setDropFace, 0, [self], t);
                }
            }, eh);
            o.beforeMouseout(function(){
                var t=linb.DragDrop,p=t._profile,self=this;
                 if(p.dragKey && self._dropKeys[p.dragKey]){
                    linb([self]).onDragleave(true);
                    t.setDropElement(t._onDragover=null);
                    _.resetRun('setDropFace', t.setDropFace, 0, [null], t);
                }
            }, eh)
            .beforeMousemove(function(a,e){
                var t=linb.DragDrop, h=t._onDragover, p=t._profile,self=this;
                //no dragover event
                if(h==1)return;
                if(t._dropElement==self && p.dragKey && self._dropKeys[p.dragKey]){
                    if(h)h(e);
                    else{
                        //ensure to run once only
                        t._onDragover=1;
                        //if any dragover event exists, this function will set _onDragover
                        linb([self]).onDragover(true,linb.Event.getEventPara(e));
                    }
                }
            }, eh);
            o.each(function(o){
                //attach a hash to dom targetNode
                (o._dropKeys || (o._dropKeys={}))[key]=true;
                var c = linb.cache.dom[o.id].nodeVars._dropKeys=1;
            });
            return this;
        }
    },
    After:function(){
        this._reset();
        //add dom dd functions
        _.each({
            startDrag:function(e, profile, dragKey, dragData){
                linb.DragDrop.startDrag(e, this.get(0), profile, dragKey||'', dragData||null);
                return this;
            },
            dragable:function(flag, profile, dragKey, dragData){
                var self=this, dd=linb.DragDrop;
                if(flag===undefined)
                    flag=true;
                else if(typeof flag=='object'){
                    profile=flag;
                    flag=true;
                }
                if(!!flag)
                    self.$addEvent('onMousedown',function(p,e){
                        if(linb.Event.getSrc(e)!=this)return true;
                        linb([this]).startDrag(e, profile, dragKey, dragData)
                    }, dd._eh, -1);
                else
                    self.$removeEvent('onMousedown', dd._eh);

                return self;
            },
            dropable:function(flag, key){
                if(flag===undefined)flag=true;
                key = key || 'default';
                var d=linb.DragDrop;
                return this.each(function(o){
                    if(!!flag)
                        d._register(o, key);
                    else
                        d._unRegister(o, key);
                });
            }
        },function(o,i){
            linb.Dom.plugIn(i,o);
        });
    }
});Class("linb.History",null,{
    Static:{
        _fid:'linb:history',
        /* set callback function
        callback: function(hashStr<"string after #">)
        */
    	setCallback: function(callback){
    	    var self=this;
    		self._callback = callback;
    		var hash = location.hash;
            if(callback){
        		self._lastFI = hash;
        		if(linb.browser.ie) {
        			if(self._lastFI=='')self._lastFI = '#';
    
                    var n=document.createElement("div");
                    n.style.display = "none";
                    document.body.appendChild(n);
        			n.innerHTML = '<iframe id="'+this._fid+'" style="display: none;"></iframe>';
        			var ihistory = document.getElementById(this._fid), iframe = ihistory.contentWindow.document;
        			iframe.open();
        			iframe.close();
        			iframe.location.hash = hash;
        		}else if(linb.browser.kde) {
        			// etablish back/forward stacks
        			self.backStack = [];
        			self.backStack.length = history.length;
        			self.forwardStack = [];
        		}
        		self._callback(hash.replace(/^#/, ''));
                clearInterval(self._itimer);
                self._itimer = setInterval(self._timer,100);
            }else
                clearInterval(self._itimer);

    		return self;
    	},
        //cross case=>
	    //  1: goto another url, and back
	    //  2: back to another url, and forward
        //check location.hash change periodically
    	_timer: function(){
    	    var self=linb.History;
    	    if(typeof self._callback!='function'){
    	        clearInterval(self._itimer);
    	        return;
    	    }

    		if(linb.browser.ie) {
    		    var ihistory = document.getElementById(self._fid), iframe = ihistory.contentWindow.document;
    			hash = iframe.location.hash;
    			if(hash != self._lastFI) {
    				self._lastFI = location.hash = hash;
    				self._callback(hash.replace(/^#/, ''));
    			}
    		}else if(linb.browser.kde) {
    			if(!self.dontCheck) {
    			    var backStack=self.backStack,
    			        forwardStack=self.forwardStack,
    				    historyDelta = history.length - backStack.length;
    				//for back button or forward button
    				if(historyDelta) {
                        //back button case
    					if(historyDelta<0)
    						for (var i = 0; i < Math.abs(historyDelta); i++) forwardStack.unshift(backStack.pop());
    					//forward button case
    					else
    						for (var i = 0; i < historyDelta; i++) backStack.push(forwardStack.shift())
    					
    					var cachedHash = backStack[backStack.length-1];
    					if (cachedHash !== undefined) {
    						self._lastFI = location.hash;
    						self._callback(cachedHash);
    					}else{
    					    //cross case=>
    					}
    				}else if(backStack[backStack.length-1]===undefined){
    				    if(self._lastFI != location.hash){
    				        //cross case=>
        				    self._lastFI = location.hash;
        				    self._callback(location.hash);
        				}
    				}
    			}
    		}else{
    			// otherwise, check for location.hash
    			var hash = location.hash;
    			if(hash != self._lastFI) {
    				self._lastFI = hash;
    				self._callback(hash.replace(/^#/, ''));
    			}
    		}
    	},
    	getFI:function(){
    	    return this._lastFI;
    	},
        /*change Fragement Identifier(string after '#')
        */
    	setFI:function(fi,triggerCallback){
    	    var self=this;
    	    if(!self._callback)return;
    	    if(fi)fi=fi.replace(/^#+/,'');
            if(self._lastFI == '#' + fi)return false;

    		if(linb.browser.ie) {
    			var ihistory = document.getElementById(self._fid), iframe = ihistory.contentWindow.document;
                iframe.open();
    			iframe.close();
    			iframe.location.hash = location.hash = self._lastFI = '#' + fi;
    		}else if(linb.browser.kde) {
    			self.dontCheck = true;
        		self.backStack.push(fi);
        		self.forwardStack.length = 0;
    			var t=self;
    			_.asyRun(function(){t.dontCheck=false;t=null;},300);
    			location.hash = self._lastFI = fi;
    		}else
    		    location.hash = self._lastFI = '#' + fi;
            if(triggerCallback!==false)
		        _.tryF(self._callback,[fi]);
    	}
    },
	Initialize:function(){
        //hook link(<a ...>xxx</a>) click action
        if(linb.browser.ie || linb.browser.kde)
            linb.doc.onClick(function(p,e,src){
                var s = location.href.split('#')[0],
                    t=linb.Event,
                    o = t.getSrc(e),b,i=0,
                    b
                ;
                do{
                    if(o.tagName == 'A'){
                        b=true;
                        break;
                    }
                    if(++i>8)break;
                }while(o=o.parentNode)
                if(b){
                    if(o.href.indexOf('javascript:')==0)return false;
                    if(!t.getKey(e)[2] && t.getBtn(e)=='left' && (o.href.indexOf(s+'#')==0||o.href.indexOf('#')==0)){
                        linb.History.setFI(o.href.replace(s,''));
                        return false;
                    }
                }
            },'hookA',0);
	}
});Class('linb.ComFactory',null,{
    Static:{
        _pro:{},
        _cache:{},
        _domId:'linb:ComFactory:',
        getProfile:function(key){
            return key?this._pro[key]:this._pro;
        },
        setProfile:function(key, value){
            if(typeof key=='string')
                this._pro[key]=value;
            else
                this._pro=key;
            return this;
        },
        destroyAll:function(){
            _.each(this._cache,function(o){
                _.tryF(o.destroy,[],o);
            });
            this._cache={};
        },
        broadcast:function(fun){
            if(typeof fun=='function'){
                var i,c=this._cache;
                for(i in c)
                    fun.call(c[i],i);
            }
        },

        setCom:function(id, obj){
            this._cache[id]=obj;
            if(obj)obj.comRefId=id;
            return this;
        },
        getComFromCache:function(id){
            return this._cache[id]||null;
        },
        //singleton:false->don't get it from cache, and don't cache the result.
        getCom:function(id, onEnd, threadid, singleton){
            singleton=singleton!==false;
            var c=this._cache,p=this._pro,ini=p._iniMethod;
            if(singleton && c[id]){
                _.tryF(onEnd, [threadid,c[id]], c[id]);
                return c[id];
            }else{
                if(!(p=p[id]))return null;
                var self=arguments.callee, me=this, children=p.children;
                //ensure array
                var iniMethod = p.iniMethod || ini || 'create',
                    clsPath = p.cls || p,
                    properties = p.properties,
                    events = p.events,
                    singleton=p.singleton!==false,
                    cls,
                    task=function(cls,properties,threadid){
                        var o = new cls();
                        if(properties)
                            _.merge(o.properties,properties,'all');
                        if(events)
                            _.merge(o.events,event,'all');

                        if(singleton)
                            linb.ComFactory.setCom(id, o);

                        var args = [function(com){
                            var arr = com.getUIComponents().get(),
                                fun=function(arr,firstlayer){
                                    var self1 = arguments.callee;
                                    _.arr.each(arr,function(v,i){
                                        //if tag exists, replace tag with com from linb.ComFactory
                                        if(v.key=='linb.UI.Tag'){
                                            var tag=v, cid=tag.properties.tagKey;

                                            if(cid && children && children[cid])
                                                self.apply(me, [children[cid], function(){
                                                    //set link to parent com(linb.Com)
                                                    com[cid]=this;
                                                    //set com parent
                                                    this.parent=com;

                                                    //replace tag with this
                                                    var ui = this.getUIComponents(), root;
                                                    // no UI in this com
                                                    if(!(root=ui.get(0)))return;

                                                    linb.UI.Tag.replace(tag,root,firstlayer?com:null);
                                                },threadid]);
                                        }
                                        if(v.children){
                                            var a=[];
                                            _.arr.each(v.children,function(o){
                                                a[a.length]=o[0];
                                            });
                                            self1(a);
                                        }
                                    });
                                };
                            //handle tag sub from com
                            fun(arr,1);
                        }];
                        args.push(threadid||null);

                        //insert first
                        if(onEnd)
                            linb.Thread(threadid).insert({
                                task:onEnd,
                                args:[threadid,o],
                                scope:o
                            });
                        //latter
                        _.tryF(o[iniMethod], args, o);
                    };
                linb.Thread.observableRun(function(threadid){
                        var f=function(a,b,threadid){
                            var cls;
                            if(cls=linb.SC.get(clsPath)){
                                linb.Thread(threadid).insert({
                                    task:task,
                                    args:[cls, properties, threadid]
                                });
                            }
                        };
                        linb.SC(clsPath, function(path){
                            if(path)
                                f(0,0,threadid);
                            else
                                throw new Error(cls+' doesnt exists!');
                        }, true,threadid);

                    },null,threadid
                );
            }
        },
        newCom:function(cls, onEnd,threadid){
            var o=linb.SC.get(cls);
            o=typeof o == 'function' ?new o():null;
            if(o)
                _.tryF(onEnd,[threadid,o],o);
            else
                linb.Thread.observableRun(function(threadid){
                    linb.SC(cls, function(path,txt){
                        if(path){
                            var o=linb.SC.get(cls);
                            o=typeof o == 'function' ?new o():null;
                            _.tryF(onEnd,[threadid,o],o);
                        }else
                             throw new Error(cls+' doesnt exists!');
                    }, true,threadid);
                },null,threadid);
        },
        storeCom:function(id){
            var m,t,c=this._cache,domId=this._domId;
            if(t=c[id]){
                if(!(m=linb.Dom.byId(domId)))
                    //using display:none here for performance, when appendchild, it'll not trigger layout etc.
                    linb('body').prepend(linb.create('<div id="'+domId+'" style="display:none;"></div>'));
                m=linb(domId);
                t=t.getUIComponents();
                if(!t.isEmpty()){
                    //detach
                    t.get(0).unlinkParent();
                    //move to hide
                    m.append(t);
                }
            }
        },

        //prepare widget (build css string and add css to head, build template)
        prepareWidgets:function(){
            //prepare UI Ctrl
            var self=this,
                fun=function(threadid){
                    var r=false;
                    _.each(linb.UI, function(o){
                        if(o.$linb$ && o['linb.UI'] && o.$Appearances['default']){
                            var path = linb.getPath(o.KEY, '/default/css.css','appearance');
                            if(!linb.UI.$cache_csspath[path]){
                                o=(new o).get(0);
                                o.toString();
                                o.destroy();
                                r=true;
                                return false;
                            }
                        }
                    });
                    if(!r)linb.Thread(threadid).abort()
                };
            linb.Thread(null,[fun],100,null,null,null,true).start();
            return this;
        },
        prepareComs:function(arr){
            var self=this,funs=[];
            _.arr.each(arr, function(i){
                funs.push(function(){
                    self.getCom(i);
                });
            });
            linb.Thread(null, funs, 500).start();
            return this;
        }
    }
});(linb.Locale.en||(linb.Locale.en={})).inline={
    ok:'O K',
    cancel:'Cancel',
    today:'Today',
    yes:'Yes',
    no:'No'
};
linb.Locale.en.date={
    WEEKS:{
        '0':'Su',
        '1':'Mo',
        '2':'Tu',
        '3':'We',
        '4':'Th',
        '5':'Fr',
        '6':'Sa',
        '7':'WK'
    },
    VIEWS:{
        '10 ms':'10 millisecond',
        '100 ms':'100 milliseconds',
        '1 s':'1 second',
        '10 s':'10 seconds',
        '1 n':'1 minute',
        '5 n':'5 minutes',
        '10 n':'10 minutes',
        '30 n':'30 minutes',
        '1 h':'1 hour',
        '2 h':'2 hours',
        '6 h':'6 hours',
        '1 d':'1 day',
        '1 w':'1 week',
        '15 d':'15 days',
        '1 m':'1 month',
        '1 q':'1 quarter',
        '1 y':'1 year',
        '1 de':'10 years',
        '1 c':'1 century'
    },
    MONTHS:{
        '1':'Jan.',
        '2':'Feb.',
        '3':'Mar.',
        '4':'Apr.',
        '5':'May.',
        '6':'Jun.',
        '7':'Jul.',
        '8':'Aug.',
        '9':'Sep.',
        '10':'Oct.',
        '11':'Nov.',
        '12':'Dec.'
    },
    MS:'ms',
    S:'s',
    N:'n',
    H:'h',
    D:'d',
    W:'w',
    M:'m',
    Q:'q',
    Y:'y',
    DE:'de',
    C:'c',
    HN:function(n,a,b){return a+":"+b},
    DHN:function(n,a,b,c){return a +'th '+ b + ":" +c },
    MDHN:function(n,a,b,c,d){return b+ 'th ' + linb.getRes('date.MONTHS.'+a) + " " + c + ":" + d},
    HNS:function(n,a,b,c){return a+":"+b+":"+c},
    HNSMS:function(n,a,b,c,d){return a+":"+b+":"+c + ' ' +d},
    YM:function(n,a,b){return linb.getRes('date.MONTHS.'+b)+' '+a},
    YQ:function(n,a,b){return b+'Q ' + a},
    YMD:function(n,a,b,c){return b+'/'+c+'/'+a},
    YMD2:function(n,a,b,c){return linb.getRes('date.MONTHS.'+b)+' '+c+', '+a},
    MD:function(n,a,b){return linb.getRes('date.MONTHS.'+a) + " "+ b},
    YMDH:function(n,a,b,c,d){return c+'/'+b+'/'+a + ' ' +d+':00'},
    YMDHN:function(n,a,b,c,d,e){return b+'/'+c+'/'+a + ' ' +d+":"+e},
    YMDHNS:function(n,a,b,c,d,e,f){return b+'/'+c+'/'+a + ' ' +d+":"+e+":"+f},
    ALL:function(n,a,b,c,d,e,f,g){return b+'/'+c+'/'+a + ' ' +d+":"+e+":"+f +" " +g}
};
linb.Locale.en.color={
  LIST:{
    "FFFFFF":"White",
    "FFFFF0":"Ivory",
    "FFFFE0":"Light Yellow",
    "FFFF00":"Yellow",
    "FFFAFA":"Snow",
    "FFFAF0":"Floral White",
    "FFFACD":"Lemon Chiffon",
    "FFF8DC":"Cornislk",
    "FFF5EE":"Sea Shell",
    "FFF0F5":"Lavender Blush",
    "FFEFD5":"Papaya Whip",
    "FFEBCD":"Blanched Almond",
    "FFE4E1":"Misty Rose",
    "FFE4C4":"Bisque",
    "FFE4B5":"Moccasin",
    "FFDEAD":"Navajo White",
    "FFDAB9":"Peach Puff",
    "FFD700":"Gold",
    "FFC0CB":"Pink",
    "FFB6C1 ":"Light Pink",
    "FFA500":"Orange",
    "FFA07A":"Light Salmon",
    "FF8C00":"Dark Orange",
    "FF7F50":"Coral",
    "FF69B4":"Hot Pink",
    "FF6347":"Tomato",
    "FF4500":"Orange Red",
    "FF1493":"Deep Pink",
    "FF00FF":"Magenta",
    "FF00FF":"Fuchsia",
    "FF0000":"Red",
    "FDF5E6":"Old Lace",
    "FAFAD2":"Light Goldenrod Yellow",
    "FAF0E6":"Linen",
    "FAEBD7":"Antique White",
    "FA8072":"Salmon",
    "F8F8FF":"Ghost White",
    "F5FFFA":"Medium Spring Green",
    "F5F5F5":"White Smoke",
    "F5DEB3":"Wheat",
    "F4A460":"Sandy Brown",
    "F0FFFF":"Azure",
    "F0FFF0":"Honeydew",
    "F0F8FF":"Alice Blue",
    "F0E68C":"Khaki",
    "F08080":"Light Coral",
    "EEE8AA":"Pale Godenrod",
    "EE82EE":"Violet",
    "E9967A":"Dark Salmon",
    "E6E6FA":"Lavender",
    "E1FFFF":"Light Cyan",
    "DEB887":"Bruly Wood",
    "DDA0DD":"plum",
    "DCDCDC":"Gainsboro",
    "DC143C":"Crimson",
    "DB7093":"Pale Violet Red",
    "DAA520":"Gold Enrod",
    "DA70D6":"Orchid",
    "D8BFD8":"Thistle",
    "D3D3D3":"Light Grey",
    "D2B48C":"Tan",
    "D2691E":"Chocolate",
    "CD853F":"Peru",
    "CD5C5C":"Indian Red",
    "C71585":"Medium Violet Red",
    "C0C0C0":"Silver",
    "BDB76B":"Dark Khaki",
    "BC8F8F":"Rosy Brown",
    "BA55D3":"Medium Orchid",
    "B22222":"Fire Brick",
    "B0E0E6":"Pow Der Blue",
    "B0C4DE":"Light Steel Blue",
    "AFEEEE":"Pale Turquoise",
    "ADFF2F":"Green Yellow",
    "ADD8E6":"Light BLue",
    "A9A9A9":"Dark Gray",
    "A52A2A":"Brown",
    "A0522D":"Sienna",
    "9932CC":"Dark Orchid",
    "98FB98":"Pale Green",
    "9400D3":"Dark Voilet",
    "9370DB":"Medium Purple",
    "90EE90":"Light Green",
    "8FBC8F":"Dark Sea Green",
    "8B4513":"Saddle Brown",
    "8B008B":"Dark Magenta",
    "8B0000":"Dark Red",
    "8A2BE2":"Blue Violet",
    "87CEFA":"Light Sky Blue",
    "87CEEB":"Sky Blue",
    "808080":"Gray",
    "808000":"Olive",
    "800080":"Purple",
    "800000":"Maroon",
    "7FFFAA":"Auqamarin",
    "7FFF00":"Chartreuse",
    "7CFC00":"Lawn Green",
    "7B68EE":"Medium Slate Blue",
    "778899":"Light Slate Gray",
    "708090":"Slate Gray",
    "6B8E23":"Beige",
    "6A5ACD":"Slate Blue",
    "696969":"Dim Gray",
    "6495ED":"Cornflower Blue",
    "5F9EA0":"Cadet Blue",
    "556B2F":"Olive Drab",
    "4B0082":"Indigo",
    "48D1CC":"Medium Turquoise",
    "483D8B":"Dark Slate Blue",
    "4682B4":"Steel Blue",
    "4169E1":"Royal Blue",
    "40E0D0":"Turquoise",
    "3CB371":"Spring Green",
    "32CD32":"Lime Green",
    "2F4F4F":"Dark Slate Gray",
    "2E8B57":"Sea Green",
    "228B22":"Forest Green",
    "20B2AA":"Light Sea Green",
    "1E90FF":"Doder Blue",
    "191970":"Midnight Blue",
    "00FFFF":"Cyan",
    "00FFFF":"Aqua",
    "00FF7F":"Mint Cream",
    "00FF00":"Lime",
    "00FA9A":"Medium Aquamarine",
    "00CED1":"Dark Turquoise",
    "00BFFF":"Deep Sky Blue",
    "008B8B":"Dark Cyan",
    "008080":"Teal",
    "008000":"Green",
    "006400":"Dark Green",
    "0000FF":"Blue",
    "0000CD":"Medium Blue",
    "00008B":"Dark Blue",
    "000080":"Navy",
    "000000":"Black"
  }
};Class('linb.Debugger', null, {
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
});new function(){
    var _img_app=linb.getPath('img/','App.gif');
    var _img_widgets=linb.getPath('img/','widgets.gif');
    window.CONF={
        dftLang:'en',

        img_app:_img_app,
        img_widgets:_img_widgets,

        phpPath:linb.ini.appPath + 'request.php',
        testphpPath:linb.ini.appPath + 'debug.php',

        prjPath:'projects/',
        requestKey:'VisualJS',

        path_link:"http://www.sigmawidgets.com",
        //path_video:'http://linb.googlecode.com/files/video.html',
        path_forum:'http://groups.google.com/group/linb',
        path_download:'http://code.google.com/p/linb/downloads/list',
        path_gpllicence:'http://www.gnu.org/licenses/lgpl-3.0-standalone.html',
        path_licence:'http://www.sigmawidgets.com/license.html',
        path_purchase:'http://www.sigmawidgets.com/buy_now2.html',

        mapWidgets:{},
        widgets: [
            {id:'linb.Data',caption:'Data', group:true, image:'img/App.gif', imagePos:'-48px -48px', sub:[
                {id:'linb.DataBinder', caption:'DataBinder', image:'img/widgets.gif', imagePos:'-640px top', dragable:true}
            ]},
            {id:'linb.UI.absForm',caption:'Form Elements',group:true, image:_img_app, imagePos:'-48px -48px',sub:[
                {id:'linb.UI.Tag', caption:'Tag Element', image:_img_widgets, imagePos:'left top', dragable:true},
                {id:'linb.UI.Div', caption:'Div Element', image:_img_widgets, imagePos:'-624px top', dragable:true},

                {id:'linb.UI.Label', caption:'Label', image:_img_widgets, imagePos:'-16px top', dragable:true},
                {id:'linb.UI.Link', caption:'Link', image:_img_widgets, imagePos:'-32px top', dragable:true},
                {id:'linb.UI.Button', caption:'Button', image:_img_widgets, imagePos:'-48px top', dragable:true/*, Appearances:['default','link','block']*/},
                {id:'linb.UI.CheckBox', caption:'CheckBox', image:_img_widgets, imagePos:'-96px top', dragable:true},
                {id:'linb.UI.Input', caption:'Input', image:_img_widgets, imagePos:'-112px top', dragable:true},
                {id:'linb.UI.TextEditor', caption:'TextEditor', image:_img_widgets, imagePos:'-128px top', dragable:true},
                {id:'linb.UI.List', caption:'List', image:_img_widgets, imagePos:'-192px top', dragable:true},
                {id:'linb.UI.ComboInput', caption:'ComboInput', image:_img_widgets, imagePos:'-144px top', dragable:true},

                {id:'linb.UI.ProgressBar', caption:'ProgressBar', image:_img_widgets, imagePos:'-608px top', dragable:true},

                {id:'linb.UI.Range', caption:'Range', image:_img_widgets, imagePos:'left -16px', dragable:true},
                //{id:'linb.UI.ComboButton', caption:'ComboButton', image:_img_widgets, imagePos:'-80px top', dragable:true},
                {id:'linb.UI.TimePicker', caption:'TimePicker', image:_img_widgets, imagePos:'-240px top', dragable:true},
                {id:'linb.UI.DatePicker', caption:'DatePicker', image:_img_widgets, imagePos:'-256px top', dragable:true},
                {id:'linb.UI.ColorPicker', caption:'ColorPicker', image:_img_widgets, imagePos:'-272px top', dragable:true},
                {id:'linb.UI.RadioBox', caption:'RadioBox', image:_img_widgets, imagePos:'-208px top', dragable:true},
                {id:'linb.UI.Poll', caption:'Poll', image:_img_widgets, imagePos:'-208px -16px', dragable:true},
                {id:'linb.UI.Group', caption:'Group', image:_img_widgets, imagePos:'-224px top', dragable:true}
            ]},
            {id:'linb.UI.absContainer',caption:'Containers',group:true, image:_img_app, imagePos:'-48px -48px',sub:[
                {id:'linb.UI.Pane', caption:'Pane', image:_img_widgets, imagePos:'-288px top', dragable:true},
                {id:'linb.UI.Panel', caption:'Panel', image:_img_widgets, imagePos:'-672px top', dragable:true},
                {id:'linb.UI.Block', caption:'Block', image:_img_widgets, imagePos:'-304px top', dragable:true},
                {id:'linb.UI.Layout', caption:'Layout', image:_img_widgets, imagePos:'-336px top', dragable:true},

                {id:'linb.UI.Tabs', caption:'Tabs', image:_img_widgets, imagePos:'-352px top', dragable:true},

                {id:'linb.UI.Stacks', caption:'Stacks', image:_img_widgets, imagePos:'-368px top', dragable:true},
                {id:'linb.UI.ButtonViews', caption:'ButtonViews', image:_img_widgets, imagePos:'-384px top', dragable:true},
                {id:'linb.UI.IconList', caption:'IconList', image:_img_widgets, imagePos:'-384px top', dragable:true},
                {id:'linb.UI.Dialog', caption:'Dialog', image:_img_widgets, imagePos:'-320px top', dragable:true}
            ]},
            {id:'linb.UI.absNavigator',caption:'Navigators',group:true, image:_img_app, imagePos:'-48px -48px', sub:[
                {id:'linb.UI.PageBar', caption:'PageBar', image:_img_widgets, imagePos:'-48px -16px', dragable:true},

                {id:'linb.UI.PopMenu', caption:'PopMenu', image:_img_widgets, imagePos:'-400px top', dragable:true},
                {id:'linb.UI.MenuBar', caption:'MenuBar', image:_img_widgets, imagePos:'-416px top', dragable:true},
                {id:'linb.UI.ToolBar', caption:'ToolBar', image:_img_widgets, imagePos:'-432px top', dragable:true},
                {id:'linb.UI.LinkList', caption:'LinkList', image:_img_widgets, imagePos:'-16px -16px', dragable:true},
                {id:'linb.UI.FoldingList', caption:'FoldingList', image:_img_widgets, imagePos:'-32px -16px', dragable:true},
                {id:'linb.UI.Gallery', caption:'Gallery', image:_img_widgets, imagePos:'-448px top', dragable:true},
                {id:'linb.UI.TreeBar', caption:'TreeBar', image:_img_widgets, imagePos:'-464px top', dragable:true},
                {id:'linb.UI.TreeGrid', caption:'TreeGrid', image:_img_widgets, imagePos:'-480px top', dragable:true}
            ]},
            {id:'linb.UI.absSchedule',caption:'Schedules',group:true, image:_img_app, imagePos:'-48px -48px', sub:[
                {id:'linb.UI.Calendar', caption:'Calendar', image:_img_widgets, imagePos:'-496px top', dragable:true},
                {id:'linb.UI.TimeLine', caption:'TimeLine', image:_img_widgets, imagePos:'-528px top', dragable:true}
            ]},
            {id:'linb.UI.absMisc',caption:'Medias',group:true, image:_img_app, imagePos:'-48px -48px', sub:[
                {id:'linb.UI.Image', caption:'Image Element', image:_img_widgets, imagePos:'-624px top', dragable:true}

/*
                {id:'linb.UI.Media', caption:'Media', image:_img_widgets, imagePos:'-576px top', dragable:true},
                {id:'linb.UI.Shape', caption:'Shape', image:_img_widgets, imagePos:'-544px top', dragable:true},
                {id:'linb.UI.Chart', caption:'Chart', image:_img_widgets, imagePos:'-560px top', dragable:true}
*/
            ]}
        ],
        ComFactoryProfile:{
            about:{
                cls:'VisualJS.About'
            },
            addFile:{
                cls:'VisualJS.AddFile'
            },
            delFile:{
                cls:'VisualJS.DelFile'
            },
            prjPro:{
                cls:'VisualJS.ProjectPro'
            },
            prjSel:{
                cls:'VisualJS.ProjectSelector'
            },
            
            objEditor:{
                cls:'VisualJS.ObjectEditor'
            }
        }
    };
    var fun=function(items,hash){
        var self=arguments.callee;
        _.arr.each(items,function(o){
            hash[o.id]=o;
            if(o.sub && o.sub.length){
                self(o.sub, hash);
                o.tips='$VisualJS.designer.openwidgets';
            }else
                o.tips='$VisualJS.designer.dragwidget';
        });
    };
    CONF.mapWidgets = {};
    fun(CONF.widgets, CONF.mapWidgets);
    linb.ini.appLangKey="VisualJS";
};