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
};