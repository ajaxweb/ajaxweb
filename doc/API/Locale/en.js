_.set(linb.Locale,["en","app"], {
    en:'English',
    cn:'Chinese',
    apititle:"jsLINB 2.0 - API Documentation",
    staticMethods:"Static Methods",
    staticProperties:"Static Properties",
    gFun:'Global Function',
    constructor:"Constructor",
    noCons:'No Constructor, Dont use "new" operation',
    supCls:'Direct Super Classes',
    subCls:'Direct Sub Classes',
    inhFrom:"Inherite from ",
    insProperties:"Instance Properties",
    insMethods:"Instance Methods",
    events:'Events',
    retV:'Return Value',
    param:'Parameters',
    codesnip:'Code snippet',
    memo:'Memo',
    seealso:'See Also',
    oCode:'Original Code',
    oCodeDesc:'/*\n * Original code in jsLinb \n * With it, maybe you can understand the function easily \n*/'
});
/*
$desc string
$paras array
$rtn string
$snippet array
$links array
$memo string
*/
_.set(linb.Locale,["en","doc"], {
    Namespace:{
        $desc:"Desclares a namespace.",
        $paras:[
            "key [Required]: String, namespace string."
        ],
        $snippet:["Namespace('Test.NS'); alert(typeof Test.NS)"]
    },
    Class:{
        $desc:"Desclares a class.",
        $paras:[
            "key [Required]: String, class string.",
            "pkey [Required]: String/Array, parent class key , array for inheriting multi parent class in order.",
            "obj [Optional]: Object, class object. Default is {}."
        ],
        $snippet:["// Equals to declare a Namespae 'Test.NS' and declare a Class 'Test.NS.Cls'; \n  Class('Test.NS.Cls'); Class('Test.NS.Cls.Subcls', 'Test.NS.Cls', {}); alert(typeof Test.NS); alert(typeof Test.NS.Cls); alert(typeof Test.NS.Cls.Subcls);"],
        $links:[
        ]
    },
    _:{
        $desc:"Gets local time stamp.",
        $rtn:"Integer",
        $snippet:["alert(_()); linb.message(_())"],

        arr:{
            each:{
                $desc:"Applys a function to each element of the array in specified order.",
                $rtn:'Array',
                $paras: [
                    "arr [Required]: Array, target array.",
                    "fun [Required]: Function, arguments: [array element, array index]. The function to apply to array item.",
                    "scope [Optional]: Object, [this] pointer for [fun]. Default is [arr].",
                    "order [Optional]: Bool, iterate by descend order. Default is false."
                ],
                $snippet:[
                    "_.arr.each(['a','b'], function(o,i){alert(i+':'+o);} )",
                    "_.arr.each(['a','b'], function(o,i){alert(i+':'+o);alert(this===window);},window,true)"
                ]
            },
            indexOf:{
                $desc:"Returns the first index at which a given element can be found in the array, or -1 if it is not present.",
                $rtn:'Number',
                $paras: [
                    "arr [Required]: Array, target array.",
                    "value [Required]: Any, element to locate in the array."
                ],
                $snippet:[
                    "var a=[1,2,3,4];alert(_.arr.indexOf(a, 3))"
                ]
            },
            insertAny:{
                $desc:"Adds one or more elements to the specified position of an array.",
                $rtn:'Number',
                $paras: [
                    "arr [Required]: Array, target array.",
                    "target [Required]: Any, elements to add.",
                    "index [Optional]: Number, the specified position. Default is -1.",
                    "flag [Optional]: Bool, force to take [target] as a single element.  Default is false."
                ],
                $snippet:[
                    "var a=[1,2,3]; _.arr.insertAny(a,5,1);alert(a)",
                    "var a=[1,2,3]; _.arr.insertAny(a,[5,5],1);alert(_.serialize(a))",
                    "var a=[1,2,3]; _.arr.insertAny(a,[5,5],1,true);alert(_.serialize(a))"
                ]
            },
            removeFrom:{
                $desc:"Removes a section of elements from an array.",
                $rtn:'Array',
                $paras: [
                    "arr [Required]: Array, target array.",
                    "index [Required]: Number, the specified position. ",
                    "length [Optional]: Number, how many elements to be removed. Default is 1."
                ],
                $snippet:[
                    "var a=[1,2,3,4,5]; _.arr.removeFrom(a, 2,2 ); alert(a);"
                ]
            },
            removeValue:{
                $desc:"Removes a specified element from an array.",
                $rtn:'Array',
                $paras: [
                    "arr [Required] [Required]: Array, target array.",
                    "value: Any, element to be removed."
                ],
                $snippet:[
                    "var a=[1,2,3,4,5]; _.arr.removeValue(a, 4); alert(a);"
                ]
            },
            subIndexOf:{
                $desc:"Returns the first index at which a given key and value can be found in the object element of the array, or -1 if it is not present.",
                $rtn:'Number',
                $paras: [
                    "arr [Required]: Array, target array.",
                    "key [Required]: String, a specified key in the hash element.",
                    "value [Required]: Any, a specified value in the hash element."
                ],
                $snippet:[
                    "var a=[1,2,{k:'v'},4]; var i=_.arr.subIndexOf(a,'k','v'); alert(i);"
                ]
            }
        },
        asyRun:{
            $desc:"Asynchronous Function Call.",
            $paras:[
                "fun [Required]: Funcition, target function.",
                "defer [Optional]: Number, setTimeout defer time. Default is 0",
                "args [Optional]: Array, arguments for fun. Default is []",
                "scope [Optional]: Object, [this] pointer for [fun]. Default is [window]"
            ],
            $snippet:[
                "_.asyRun(function(a,b){alert(this===window);alert(a+b)}, 300, ['a','b'], window)"
            ]
        },
        breakO:{
            $desc:"Breaks object reference[for memory release].",
            $paras:[
                "target [Required]: Object, target object to break.",
                "depth [Optional]: Number, depth value. Default is 1."
            ],
            $snippet:[
                "var a={b:1}, o={a:a}; _.breakO(o); alert(a && a.b);",
                "var a={b:1}, o={a:a}; _.breakO(o,2); alert(a && a.b);"
            ]
        },
        clone:{
            $desc:"Clones object, deep copy.",
            $rtn:"Cloned object",
            $paras:[
                "hash [Required]: Object, target object to clone.",
                "fun [Optional]: Function, arguments: [hash value, hash key]. to Determines whether or not it clones certain item.",
                "deep [Optional]: Number, default is 100."
            ],
            $snippet:[
                "var a=1, b='s'; alert(_.clone(a)); alert(_.clone(b));",
                "var o={a:1,b:{b:{c:2}}}; alert(_.serialize(_.clone(o))); alert(_.serialize(_.clone(o,function(o,i){return i!='c'}))); ",
                "var o=['1','2','3']; alert(_.serialize(_.clone(o))); alert(_.serialize(_.clone(o,function(o){return o!='2'}))); "
            ]
        },
        copy:{
            $desc:"Shadow copy, just clones the fist layer of object.",
            $rtn:"Copied object",
            $paras:[
                "hash [Required]: Object, target object to copy.",
                "fun [Optional]: Function, to Determines whether or not it clones certain item."
            ],
            $memo:"Sees <a href='#_.clone'>_.clone</a>"
        },
        each:{
            $desc:"Loops through each element of the object, and apply fun.",
            $rtn:"the first parameter",
            $paras:[
                "hash [Required]: Object, object to loop.",
                "fun [Required]: Function, arguments: [hash value, hash key]. The Function for apply.",
                "scope [Optional]: Object, [this] pointer for [fun]."
            ],
            $snippet:[
                "var h={a:1,b:2}; _.each(h,function(o,i){alert(i+':'+o)})"
            ]
        },
        'exec':{
            $desc:"Executes script string.",
            $rtn:"The return of script",
            $paras:[
                "script [Required]: String, script string."
            ],
            $snippet:[
                "_.exec('alert(\"a\")')"
            ]
        },
        exists:{
            $desc:"Equals to [target==undefined].",
            $rtn:"Bool",
            $paras:[
                "target [Required]: Object, target object."
            ],
            $snippet:[
                "alert(_.exists(window.aaaa))"
            ]
        },
        filter:{
            $desc:"Filters items out of a object({} or []).",
            $rtn:"the object",
            $paras:[
                "obj [Required]: Object, object to filter.",
                "fun [Required]: Function, filter function.",
                "scope [Optional]: Object, [this] pointer for [fun].",
                "force [Optional]: Bool, force to take [obj] as a {}. Default is false."
            ],
            $snippet:[
                "var o={a:1,b:2}; _.filter(o,function(o,i){return i!='b'}); alert(_.serialize(o))",
                "var o=[1,2,3]; _.filter(o,function(o,i){return o!=2}); alert(_.serialize(o))"
            ]
        },
        fun:{
            $desc:"Gets empty function.",
            $rtn:"Function",
            $snippet:[
                "alert(_.serialize(_.fun()));"
            ],
            args:{
                $desc:"Gets function arguments.",
                $rtn:"Array",
                $paras:[
                    "fun [Required]: Function, target function."
                ],
                $snippet:[
                    "alert(_.fun.args(function(a,b,c){var body=1;}))"
                ]
            },
            body:{
                $desc:"Gets function body.",
                $rtn:"String",
                $paras:[
                    "fun [Required]: Function, target function."
                ],
                $snippet:[
                    "alert(_.fun.body(function(a,b,c){var body=1;}))"
                ]
            },
            clone:{
                $desc:"Clones function.",
                $rtn:"Function",
                $paras:[
                    "fun [Required]: Function, target function."
                ],
                $snippet:[
                    "var fun=function(a,b,c){var body=1;}, fun_cloned =  _.fun.clone(fun); alert(_.fun.args(fun_cloned));alert(_.fun.body(fun_cloned));alert(fun_cloned.toString()); alert(fun==fun_cloned); "
                ]
            }
        },
        get:{
            $desc:"Gets something from deep hash.",
            $rtn:"variable",
            $paras:[
                "hash [Required]: Object, deep hash object.",
                "arr [Required]: Array, path array, ['a','b','c'] => {a:{b:{c:[variable]}}}."
            ],
            $snippet:[
                "alert(_.get({a:{b:{c:1}}},['a','b']))",
                "alert(_.get({a:{b:{c:1}}},['a','b','c']))",
                "alert(_.get({a:{b:{c:1}}},['a','b','c','d']))"
            ]
        },
        id:{
            $desc:"Gets unique system id string. 26 chars: /a-z/. It can be used as a class too.",
            $rtn:"String",
            $snippet:[
                "alert('system id: ' + _.id());",
                "var test=new _.id(); var out=[]; for(var i=0;i<100;i++){out.push(test.next())}; alert(out);"
            ]
        },
        isArr :{
            $desc:"To Determines whether or not the target is Array.",
            $rtn:"Bool",
            $paras:[
                "target [Required]: any"
            ],
            $snippet:[
                "alert(_.isArr('s')+':'+_.isArr(//)+':'+_.isArr(function(){})+':'+_.isArr(1)+':'+_.isArr(NaN)+':'+_.isArr({})+':'+_.isArr(new Date)+':'+_.isArr(null)+':'+_.isArr(undefined)+':'+_.isArr(true)+':'+_.isArr([]));"
            ]
        },
        isBool :{
            $desc:"To Determines whether or not the target is Bool.",
            $rtn:"Bool",
            $paras:[
                "target [Required]: any"
            ],
            $snippet:[
                "alert(_.isBool('s')+':'+_.isBool(//)+':'+_.isBool(function(){})+':'+_.isBool(1)+':'+_.isBool(NaN)+':'+_.isBool({})+':'+_.isBool(new Date)+':'+_.isBool(null)+':'+_.isBool(undefined)+':'+_.isBool(true)+':'+_.isBool([]));"
            ]
        },
        isDate :{
            $desc:"To Determines whether or not the target is Date.",
            $rtn:"Bool",
            $paras:[
                "target [Required]: any"
            ],
            $snippet:[
                "alert(_.isDate('s')+':'+_.isDate(//)+':'+_.isDate(function(){})+':'+_.isDate(1)+':'+_.isDate(NaN)+':'+_.isDate({})+':'+_.isDate(new Date)+':'+_.isDate(null)+':'+_.isDate(undefined)+':'+_.isDate(true)+':'+_.isDate([]));"
            ]
        },
        isEmpty :{
            $desc:"To Determines whether or not the target is empty Object.",
            $rtn:"Bool",
            $paras:[
                "target [Required]: any"
            ],
            $snippet:[
                "alert(_.isEmpty('s')+':'+_.isEmpty(//)+':'+_.isEmpty(function(){})+':'+_.isEmpty(1)+':'+_.isEmpty(NaN)+':'+_.isEmpty({})+':'+_.isEmpty(new Date)+':'+_.isEmpty(null)+':'+_.isEmpty(undefined)+':'+_.isEmpty(true)+':'+_.isEmpty([]));"
            ],
            $memo:"It's only for hash object"
        },
        isFun :{
            $desc:"To Determines whether or not the target is a Function.",
            $rtn:"Bool",
            $paras:[
                "target [Required]: any"
            ],
            $snippet:[
                "alert(_.isFun('s')+':'+_.isFun(//)+':'+_.isFun(function(){})+':'+_.isFun(1)+':'+_.isFun(NaN)+':'+_.isFun({})+':'+_.isFun(new Date)+':'+_.isFun(null)+':'+_.isFun(undefined)+':'+_.isFun(true)+':'+_.isFun([]));"
            ]
        },
        isArguments:{
            $desc:"To Determines whether or not the target is an arguments object.",
            $rtn:"Bool",
            $paras:[
                "target [Required]: any"
            ],
            $snippet:[
                "(function(){alert(_.isArguments(arguments));alert(_.isArguments({}));alert(_.isArguments([]));}())"
            ]
        },
        isHash:{
            $desc:"To Determines whether or not the target is a hash Object.",
            $rtn:"Bool",
            $paras:[
                "target [Required]: any"
            ],
            $snippet:[
                "alert(_.isHash('s')+':'+_.isHash(//)+':'+_.isHash(function(){})+':'+_.isHash()+':'+_.isHash(1)+':'+_.isHash(NaN)+':'+_.isHash({})+':'+_.isHash(new Date)+':'+_.isHash(null)+':'+_.isHash(undefined)+':'+_.isHash(true)+':'+_.isHash([]));"
            ]
        },
        isNull:{
            $desc:"To Determines whether or not the target is null.",
            $rtn:"Bool",
            $paras:[
                "targe [Required]t: any"
            ],
            $snippet:[
                "alert(_.isNull('s')+':'+_.isNull(//)+':'+_.isNull(function(){})+':'+_.isNull(1)+':'+_.isNull(NaN)+':'+_.isNull({})+':'+_.isNull(new Date)+':'+_.isNull(null)+':'+_.isNull(undefined)+':'+_.isNull(true)+':'+_.isNull([]));"
            ]
        },
        isNumb:{
            $desc:"To Determines whether or not the target is Number.",
            $rtn:"Bool",
            $paras:[
                "target [Required]: any"
            ],
            $snippet:[
                "alert(_.isNumb('s')+':'+_.isNumb(//)+':'+_.isNumb(function(){})+':'+_.isNumb(1)+':'+_.isNumb(NaN)+':'+_.isNumb({})+':'+_.isNumb(new Date)+':'+_.isNumb(null)+':'+_.isNumb(undefined)+':'+_.isNumb(true)+':'+_.isNumb([]));"
            ]
        },
        isObj :{
            $desc:"To Determines whether or not the target is Object.",
            $rtn:"Bool",
            $paras:[
                "target [Required]: any"
            ],
            $snippet:[
                "alert(_.isObj('s')+':'+_.isObj(//)+':'+_.isObj(function(){})+':'+_.isObj(1)+':'+_.isObj(NaN)+':'+_.isObj({})+':'+_.isObj(new Date)+':'+_.isObj(null)+':'+_.isObj(undefined)+':'+_.isObj(true)+':'+_.isObj([]));"
            ]
        },
        isReg :{
            $desc:"To Determines whether or not the target is regular expression.",
            $rtn:"Bool",
            $paras:[
                "target [Required]: any"
            ],
            $snippet:[
                "alert(_.isReg('s')+':'+_.isReg(//)+':'+_.isReg(function(){})+':'+_.isReg(1)+':'+_.isReg(NaN)+':'+_.isReg({})+':'+_.isReg(new Date)+':'+_.isReg(null)+':'+_.isReg(undefined)+':'+_.isReg(true)+':'+_.isReg([]));"
            ]
        },
        isStr :{
            $desc:"To Determines whether or not the target is String.",
            $rtn:"Bool",
            $paras:[
                "target [Required]: any"
            ],
            $snippet:[
                "alert(_.isStr('s')+':'+_.isStr(//)+':'+_.isStr(function(){})+':'+_.isStr(1)+':'+_.isStr(NaN)+':'+_.isStr({})+':'+_.isStr(new Date)+':'+_.isStr(null)+':'+_.isStr(undefined)+':'+_.isStr(true)+':'+_.isStr([]));"
            ]
        },
        merge:{
            $desc:"Merges hash from source to target.",
            $rtn:"merged target",
            $paras:[
                "target [Required]: Object, target hash Object.",
                "source [Required]: Object, source hash Object.",
                "type [Optional]: String/Function,arguments: [hash value, hash key]. one of 'all', 'with', 'without'[default], or function."
            ],
            $snippet:[
                "var a={a:1},b={b:1}; alert(_.serialize(_.merge(a,b)))",
                "var a={a:1},b={a:2,b:1}; alert(_.serialize(_.merge(a,b,'with')))",
                "var a={a:1},b={a:2,b:1}; alert(_.serialize(_.merge(a,b,'all')))",
                "var a={a:1},b={a:2,b:1}; alert(_.serialize(_.merge(a,b,function(o,i){return o!=1})))"
            ]
        },
        resetRun:{
            $desc:"This will always run the newer function in asynchronous mode.",
            $paras:[
                "key [Required]: String, Key for identify.",
                "fun [Required]: Function, Function to run.",
                "defer [Optional]: Number,. Timeout defer time. Default is 0",
                "args [Optional]: Array, Arguments for fun.",
                "scope [Optional]: Object, [this] pointer for [fun]."
            ],
            $snippet:[
                "_.resetRun('id',function(){alert(1)},200);_.resetRun('id',function(){alert(2)},200);_.resetRun('id',function(){alert(3)},200);"
            ]
        },
        observableRun:{
            $desc:"Wraps a function/a set of functions to an UI-Observable thread and executes it. ",
            $paras:[
                "tasks [Required]: Funtion or Array, A single task(function) or a set of tasks(functions).",
                "onEnd [Optional]: Function, 'on end' callback function.",
                "threadid [Required]: Stirng, thread id. If this thread exists, all [tasks] will be insert into this thread."
            ],
            $snippet:[
                "_.observableRun(_.fun());",
                "//To keep the busy UI 1 second: \n"+
                "_.observableRun(function(threadid){linb.Thread(threadid).suspend(); _.asyRun(function(){linb.Thread(threadid).resume()},1000)});"
            ]
        },
        serialize:{
            $desc: "To serialize object to JSON string.",
            $rtn: "String",
            $paras:[
                "obj [Required]: Object, target object. ",
                "dateformat  [Optional]: String, 'utc' or 'gmt'. Force to serialize all the [Date]in the target object into ISO UTC string, ISO GMT string, or the default format( new Date(yyyy,mm,dd,hh,nn,ss,ms) )."
            ],
            $snippet:[
                "alert(_.serialize('a'));"+
                "alert(_.serialize({a:1}));"+
                "alert(_.serialize([1,2,{a:1}]));"+
                "alert(_.serialize({d:new Date}));"+
                "alert(_.serialize({d:new Date},'utc'))",
                "alert(_.serialize({d:new Date},'gmt'))",
                "alert(_.serialize(linb('logo')))",
                "alert(_.serialize(linb.Dom.byId('logo')))",
                "alert(_.serialize(linb.UIProfile.getFromDomId('logo')))",
                "alert(_.serialize(linb.UIProfile.getFromDomId('logo').boxing()))"
            ]
        },
        set:{
            $desc:"Sets/Unsets something to deep hash.",
            $rtn:"set value",
            $paras:[
                "hash [Required]: Object, deep hash object.",
                "arr [Required]: Array, path array, ['a','b','c'] => {a:{b:{c:[variable]}}}.",
                "value [Optional]: any, value to set. Default is undefined => Unsets value."
            ],
            $snippet:[
                "var o={}; _.set(o,['a','b','c'], 1); alert(_.serialize(o)); _.set(o,['a','b','c']); alert(_.serialize(o));"
            ]
        },
        toUTF8:{
            $desc:"Converts a string to UTF8 string.",
            $rtn:"String",
            $paras:[
                "str [Required] : String."
            ],
            $snippet:[
                "alert(_.toUTF8('\u6c49\u5b57'));",
                "alert(_.fromUTF8(_.toUTF8('\u6c49\u5b57')));"
            ]
        },
        fromUTF8:{
            $desc:"Converts a UTF8 string back.",
            $rtn:"String",
            $paras:[
                "str [Required] : String."
            ],
            $snippet:[
                "alert(_.toUTF8('\u6c49\u5b57'));",
                "alert(_.fromUTF8(_.toUTF8('\u6c49\u5b57')));"
            ]
        },
        urlEncode:{
            $desc:"Converts a key/value pairs object to URL query string.",
            $rtn:"String",
            $paras:[
                "hash [Required] : a key/value pairs object."
            ],
            $snippet:[
                "alert(_.urlEncode({a:1,b:2}));"+
                "alert(_.urlEncode({a:1,b:{b1:1,b2:2}}));"+
                "alert(_.serialize(_.urlDecode(_.urlEncode({a:1,b:{b1:1,b2:2}}))))"
            ]
        },
        urlDecode:{
            $desc:"Gets a value from a given query string.",
            $rtn:"String or key/value pairs.",
            $paras:[
                "str [Required] : String, query string.",
                "key [Optional] : String."
            ],
            $snippet:[
                "var qs='a=1&b=2&c=3'; alert(_.serialize(_.urlDecode(qs)));alert(_.urlDecode(qs,'a'));"
            ]
        },
        str:{
            endWith :{
                $desc:"Tests if this string ends with the specified str.",
                $rtn:'Bool',
                $paras:[
                    "str [Required]: String, target string.",
                    "eStr [Required]: String, test string."
                ],
                $snippet:[
                    "alert(_.str.endWith('abc','c'))"
                ]
            },
            initial:{
                $desc:"Makes Initial letter of the specified string to capital letter.",
                $rtn:'String',
                $paras:[
                    "str [Required]: String, target string."
                ],
                $snippet:[
                    "alert(_.str.initial('abc'))"
                ]
            },
            ltrim :{
                $desc:"Returns a copy of the string, with leading whitespace omitted.",
                $rtn:'String',
                $paras:[
                    "str [Required]: String, target string."
                ],
                $snippet:[
                    "alert(_.str.ltrim(' abc ').length)"
                ]
            },
            repeat:{
                $desc:"To repeat the specified string with specified times, and returns the result.",
                $rtn:'String',
                $paras:[
                    "str [Required]: String, target string.",
                    "times [Required]: repeat time"
                ],
                $snippet:[
                    "alert(_.str.repeat('abc',3))"
                ]
            },
            rtrim :{
                $desc:"Returns a copy of the string, with trailing whitespace omitted.",
                $rtn:'String',
                $paras:[
                    "str [Required]: String, target string."
                ],
                $snippet:[
                    "alert(_.str.rtrim(' abc ').length)"
                ]
            },
            startWith :{
                    $desc:"Tests if this string starts with the specified str.",
                    $rtn:'Bool',
                    $paras:[
                        "str [Required]: String, target string.",
                        "sStr [Required]: String, test string."
                    ],
                    $snippet:[
                        "alert(_.str.startWith('abc','a'))"
                    ]
            },
            toDom:{
                $desc:"To create DOM element based on the specified string.",
                $rtn:'Array of DOM element',
                $paras:[
                    "str [Required]: String, target string."
                ],
                $snippet:[
                    "var node = _.str.toDom('<div>a</div>'); alert(node.outerHTML())"
                ]
            },
            trim :{
                $desc:"Returns a copy of the string, with leading and trailing whitespace omitted.",
                $rtn:'String',
                $paras:[
                    "str [Required]: String, target string."
                ],
                $snippet:[
                    "alert(_.str.trim(' abc ').length)"
                ]
            }
        },
        toArr:{
            $desc:"Makes an Array object from input value.",
            $rtn:"Array",
            $paras:[
                "value [Required]: Object, target object.",
                "flag [Optional]: Bool , char, or [undefined]. [undefined] for trans arguments to Array, char for trans String to Arry, Bool for trans hash object to Array. Default is [undefined]."
            ],
            $snippet:[
                "var s='a,b,c', a=_.toArr(s); alert(_.serialize(a));",
                "var s='a:b:c', a=_.toArr(s,':'); alert(_.serialize(a));",
                "var f=function(a,b,c){ var a=_.toArr(arguments);alert(_.serialize(a));}; f(1,2,3); ",
                "var hash={a:1,b:2}, a=_.toArr(hash,true); alert(_.serialize(a));",
                "var hash={a:1,b:2}, a=_.toArr(hash,false); alert(_.serialize(a));"
            ]
        },
        tryF:{
            $desc:"To try to run a function.",
            $rtn:"function return",
            $paras:[
                "fun [Required]: Function. Function to run.",
                "args [Optional]: Array, Arguments for fun.",
                "scope [Optional]: Object, [this] pointer for [fun].",
                "df [Optional]: Any. Default return value of fun( if [fun] is not a Function)"
            ],
            $snippet:[
                "alert(_.tryF()); alert(_.tryF('s')); alert(_.tryF(4,null,null,true)); ",
                "var f=function(){return 'a';}; alert(_.tryF(f));",
                "var f=function(v){alert(v);return this.a;}, o={a:true}; alert(_.tryF(f,['parameter'],o));"
            ]
        },
        unserialize:{
            $desc:"To unserialize JSON string to a javascript object.",
            $rtn:"Object",
            $paras:[
                "str [Required]: String, string to unserialize.",
                "dateformat [Optional]: String, to Determines unserialize Date string representing or not."
            ],
            $snippet:[
                "var o={a:[1,{k:1}],s:'s',d:new Date},str; alert(str=_.serialize(o)); var o2=_.unserialize(str); alert(o2.d)",
                "var o={a:[1,,{k:1}],s:'s',d:new Date},str; alert(str=_.serialize(o)); var o2=_.unserialize(str, true); alert(o2.d)",
                "alert(typeof _.unserialize(_.serialize(linb('logo'))))",
                "alert(typeof _.unserialize(_.serialize(linb.Dom.byId('logo'))))",
                "alert(typeof _.unserialize(_.serialize(linb.UIProfile.getFromDomId('logo'))))",
                "alert(typeof _.unserialize(_.serialize(linb.UIProfile.getFromDomId('logo').boxing())))"
            ]
        }
     }
});

_.set(linb.Locale,["en","doc","linb"], {
    $desc:"A shortcut function to create a linb.Dom object to wrap a set of DOM elements.",
    $rtn:"linb.Dom object",
    $paras:[
        "nodes [Optional]: Any, any variable to match a set of DOM elements. Maybe a [DOM element], a [DOM element] array, a [DOM element id] or a [DOM element id] array. Default is [].",
        "flag [Optional]: Bool, ignore clean function(for better performance) or not. Default is false."
    ],
    $snippet:[
        "//Input DOM element id \n var n=linb('logo'); alert(n.get(0).id);",
        "//Input DOM element \n var n=linb(document.getElementById('logo')); alert(n.get(0).id);",
        "//Input DOM element id array\n var n=linb(['logo']); alert(n.get(0).id);",
        "//Input DOM element array\n var n=linb([document.getElementById('logo')]); alert(n.get(0).id);",
        "//Input linb.Dom object \n var n=linb(linb('logo')); alert(n.get(0).id);",
        "//Input linb.UI object \n var n=linb(linb.UI.Div.getAll()); alert(n.get(0).id);",
        "//Input a function that can return DOM elements array\n var n=linb(function(){return [document.getElementById('logo')]}); alert(n.get(0).id);",
        "//Input '{linb.UI key}' \n var n=linb('{linb.UI.Div}'); alert(n.get(0).id);"
    ],
    isDomReady:{
        $desc:"Indicates whether or not the DOM is ready.",
        $snippet:[
            "alert(linb.isDomReady)"
        ]
    },
    Locale: {
        $desc:"linb.Locale is an hash object for locale related info.",
        $snippet:[
            "_.each(linb.Locale.en,function(o,i){alert(i+':'+o)})"
        ],
        $memo:"Use linb.getRes([resource key]) to get Locale value"
    },
    browser:{
        $desc:"linb.browser is an hash object for browser related info.",
        $snippet:[
            "alert(_.serialize(linb.browser))"
        ]
    },
    cache:{
        $desc:"linb.cache is an hash object for cache related info.",
        $snippet:[
            "_.each(linb.cache,function(o,i){alert(i+':'+o)})"
        ]
    },
    ini:{
        $desc:"linb.ini is an hash object collection for jsLinb path, application path and other path name. And, jsLinb will merge customized [linb_ini](You must declare [linb_ini] before jsLinb lib is loaded.) object into [linb.ini] too.",
        $snippet:[
            "alert(_.serialize(linb.ini))"
        ]
    },
    win:{
        $desc:"The shortcut of linb([window])."
    },
    doc:{
        $desc:"The shortcut of linb([document])."
    },

    create:{
        $desc:"To create DOM element or linb.UI object.",
        $rtn:"linb.Dom object or linb.UI object",
        $snippet:[
            "//create DOM element \n var a=linb.create('div'); alert(a.get(0).nodeName)",
            "//create DOM element \n var a=linb.create('<div>node</div>'); alert(a.get(0).nodeName)",
            "//create text DOM element \n var a=linb.create('text node',true); alert(a.get(0).nodeName)",
            "//create linb.UI object \n var a=linb.create('linb.UI.Button'); alert(a.get(0).key)",
            "//create linb.UI object \n //parameters: // key,properties, events, host \n var a=linb.create('linb.UI.Button',{caption:'btn'}); alert(a.get(0).key)",
            "//create linb.UI object \n var profile = (new linb.UI.Button()).get(0); var a=linb.create(profile); alert(a.get(0).key)"
        ]
    },
    getObject:{
        $desc:"Each linb.UIProfile/linb.Template object has an unique id, this function enables you to get UIProfile/linb.Template object by the unique id.",
        $rtn:'linb.UIProfile',
        $paras:[
            "id [Required]: String, linb.UI object unique id."
        ],
        $snippet:[
            "var id=linb.UI.getAll().get(0).getId(); alert(linb.getObject(id).key);"
        ]
    },
    getPath:{
        $desc:"Gets the absolute URL path from its class path key.",
        $rtn:'String',
        $paras:[
            "key [Required]: String, class path key.",
            "tag [Optional]: String, file postfix.",
            "folder [Optional]: String, folder name."
        ],
        $snippet:[
            "alert(linb.getPath('a.b.c')); alert(linb.getPath('a.b.c','.js')); alert(linb.getPath('a.b.c','.gif','img')); ",
            "alert(linb.getPath('linb.b.c')); alert(linb.getPath('linb.b.c','.js')); alert(linb.getPath('linb.b.c','.gif','img')); "
        ]
    },
    getRes:{
        $desc:"Gets the resource string from resource id.",
        $rtn:'String',
        $paras:[
            "id [Required]: String, resource id."
        ],
        $snippet:[
            "alert(linb.getRes('doc.Namespace.$desc')); alert(linb.Locale[linb.$lang].doc.Namespace.$desc); ",
            "alert(linb.getRes('color.LIST.E1FFFF')); alert(linb.Locale[linb.$lang].color.LIST.E1FFFF); ",
            "// if does't exist, return the last word \n alert(linb.getRes('doesnt.exist'))"

        ],
        $memo:"All the resource string is in [linb.Locale] <br \> [<a href='#linb.reLang'>linb.reLang</a>], [<a href='#linb.getRes'>linb.getRes</a>/<a href='#linb.wrapRes'>linb.wrapRes</a>] often used together."
    },
    include:{
        $desc:"Includes the target class .js file to the current document.",
        $paras:[
            "id [Required]: String, class key. Uses '' if you dont want to check whether or not it exists.",
            "path [Required]: String, .js file path",
            "onSuccess [Optional]: Function, if includes the file successfully, call this function. ",
            "onFail [Optional]: Function, if doesn't include the file, call this function."
        ],
        $snippet:[
            "////This will include .js file to document \n"+
            "//linb.include('App.clsname', '../js/clsname.js') \n" +
            "////The class have been included already, jsLinb will ignore this line. \n"+
            "linb.include('linb.Thread', '../js/clsname.js',function(){alert(1)},function(){alert(1)});",
            "////This path doesn't exist \n " +
            "linb.include('App.doesntexist', '../js/doesntexist.js', null, function(txt){alert('File doesnt exist!');});"
        ],
        $memo:"All the resource string is in [linb.Locale]"
    },
    request:{
        $desc:"To get/set data from/to server. It can switch between linb.Ajax, linb.SAjax and linb.IAjax automatically according to url and request method. "+
              "<>default=>linb.Ajax; if(isCrossDomain(uri))=>linb.SAjax;if(method=='POST')=>linb.IAjax;</strong>",
        $paras:[
            "uri [Required]: String, The URL of the request target.",
            "query [Optional]:  Object[Key/value pairs], request data. Defalut is {}.",
            "onSuccess [Optional]: Function, arguments:[response object, response type, threadid]. A function to be executed whenever a request is done successfully.",
            "onFail [Optional]: Function, arguments:[response object, response type, threadid]. A function to be executed whenever a request fails.",
            "threadid [Optional]: String, a thread id to be bound to the current request. [suspend the thread -> execute request -> resume thread]",
            "options [Optional]: Object, a set of key/value pairs that configure the request. All options are optional. <strong>Values in Parameters has high priority</strong>."
        ],
        $memo:"Sees <a href='#a=linb.Ajax'>linb.Ajax</a>, <a href='#a=linb.SAjax'>linb.SAjax</a> and <a href='#a=linb.IAjax'>linb.IAjax</a> please!"
    },
    log:{
        $desc:"Logs information into firebug(if you are in firefox and the firebug is active).",
        $paras:[
            "arguments: Arguments, you can input as many parameters as you like, [linb.log] will tak arguments as an array."
        ],
        $memo:"You must include linb.Debugger.js to enable this function."
    },
    main:{
        $desc:"Binds a function to be executed whenever the DOM is ready. You can have as many main functions on your page as you like. The functions are then executed in the order they were added.",
        $paras:[
            'fun [Required]: Function, function to be bound.'
        ],
        $snippet:[
            "//linb.main(function(){alert('first')}); \n//linb.main(function(){alert('second')}); \n ////The above code will bind two functions to DOM ready event."
        ]
    },
    message:{
        $desc:"Shows a message into browser window.",
        $paras:[
            "body [Required]: String, message body.",
            "head [Optional]: String, message head.",
            "width [Optional]: Number, message box width with px. Default is 200px.",
            "time [Optional]: Number, message box will be removed after [time] ms. Default is 5000ms."
        ],
        $snippet:[
            "linb.message('A message')",
            "//This will show message box with 100px width, and it will be removed after 1 second. \n" +
            "linb.message('Body', 'Head', 100, 1000)"
        ],
        $memo:"You must include linb.Debugger.js to enable this function."
    },
    reLang:{
        $desc:"Resets the language for the whole page. System will find and load the jsLinb locale file (in [linb.ini.path]/Locale/), and the application location file (in [linb.ini.appPath]/Locale/).",
        $paras:[
            "key [Required]: String, lang key.",
            "callback [Optional]: Function, callback function."
        ],
        $snippet:[
            "linb.reLang('cn',function(){linb.message('cn');linb.reLang('en',function(){linb.message('en')})});"
        ],
        $memo:"[<a href='#linb.reLang'>linb.reLang</a>], [<a href='#linb.getRes'>linb.getRes</a>/<a href='#linb.wrapRes'>linb.wrapRes</a>] often used together."
    },
    //request ( uri, query, onSuccess, onFail, threadid, args ),
    wrapRes:{
        $desc:"Gets the resource string from resource id, and wrap it with the specified HTML content.",
        $rtn:'String',
        $paras:[
            "id [Required]: String, resource id."
        ],
        $snippet:[
            "alert(linb.wrapRes('doc.Namespace.$desc')); alert(linb.Locale[linb.$lang].doc.Namespace.$desc); ",
            "alert(linb.wrapRes('color.LIST.E1FFFF')); alert(linb.Locale[linb.$lang].color.LIST.E1FFFF); ",
            "// if does't exist, return the last word \n alert(linb.wrapRes('doesnt.exist'))"

        ],
        $memo:"All the resource string is in [linb.Locale]. <br \> [<a href='#linb.reLang'>linb.reLang</a>], [<a href='#linb.getRes'>linb.getRes</a>/<a href='#linb.wrapRes'>linb.wrapRes</a>] often used together. <br \> [linb.reLang] works only with [linb.wrapRes] format HTML(id=[linb.$langId]) only."
    }
});

_.set(linb.Locale,["en","doc","linb","Thread"], {
    $desc:"To Get/Create a linb.Thread object. <br /> linb.Thread model: <strong>[onStart function]--delay 1-->[task function 1][callback function 1]--delay 2-->[task function 2][callback function 2]--delay 3-->[task function ...n][callback function ...n][onEnd function]</strong>",
    $rtn:"linb.tread object",
    $paras:[
        "id [Required]: String, for identify a thead. If system finds an existing linb.Thread object with this id, this function will return that object ; If system does not find it, or this function doesn't specify id, system will create a new linb.Thread object, assign an unique id to it, and return it. Uses null if you don't want to specify it.",
        "tasks [Required]: Array, functions/'function package' to execute. package format:<br> { <br>"+
                "task [Required],      //Function, arguments: args or [threadid]. task function.<br>"+
                "args [Optional],      //Array, arguments for task function.<br>"+
                "scope [Optional],    //Object, [this] pointer for [task] function.<br>"+
                "delay [Optional],     //Number, delay time(ms) before the current function will be triggered. Default is 0.<br>"+
                "callback [Optional]   //Function, arguments: [threadid]. callback to call after this task function is called. if callback return false, the thread will abort. <br>"+
            "}",
        "delay [Optional]: Number, default delay time(ms) before task function will be triggered. Default is 0.",
        "callback [Optional]: Function, arguments: [threadid]. default callback to call after each function is called.",
        "onStart [Optional]: Function, arguments: [threadid]. this function will be called before the thread triggered the first task.",
        "onEnd [Optional]: Function, arguments: [threadid]. this function will be called after the thread finishes the last task.",
        "cycle [Optional]: To Determines whether or not the current linb.Thread is in circular mode. Default is false."
    ],
    $snippet:[
        "var s=1; linb.Thread(null, [function(){linb.message(s)},2000,{task:function(){linb.message(s)}}],200,function(){s++}).start()",
        "linb.Thread(null, [function(){linb.message(1)},function(){linb.message(2)}],2000).start()",
        "linb.Thread('_id', [function(){linb.message(1);linb.Thread('_id').abort();},function(){linb.message(2)}]).start();",
        "linb.Thread(null, [function(){linb.message(1)},2000,{task:function(){},callback:function(){return false}},function(){linb.message(2)}]).start()",
        "var a=[];linb.Thread(null, [function(threadid){a.push(threadid+' task1')},function(threadid){a.push(threadid+' task2')}],null,function(threadid){a.push(threadid+' callback')},function(threadid){a.push(threadid+' start')},function(threadid){a.push(threadid+' end'); alert(a);}).start()",
        "var a=[];linb.Thread(null, [function(threadid){a.push(threadid+' task1')},{task:function(threadid){a.push(threadid+' task2')},callback:function(threadid){a.push(threadid+' not the default callback')}}],null,function(threadid){a.push(threadid+' callback')},function(threadid){a.push(threadid+' start')},function(threadid){a.push(threadid+' end'); alert(a);}).start()",
        "var a=[],i=3; linb.Thread(null, [function(){a.push(1)},function(){a.push(2)}],0,function(){i--;if(!i)return false;},null,function(){alert(a);},true).start()"
    ],
    $memo:"Dont use [new linb.tread] to create a [linb.tread] object.",
    abort:{
        $desc:"To abort the specified thread.",
        $paras:[
            "id [Required]: String, thread id."
        ],
        $snippet:[
            "linb.Thread('_id', [function(){linb.message(1);linb.Thread.abort('_id')},function(){linb.message(2)}]).start();"
        ]
    },
    observableRun:{
        $desc:"Wraps a set of functions and an onEnd function to an UI-Observable thread and executes this thread. <br /> If specified [threadid] does not exist, create a new linb.Thread, set 'dom.busy' to [thread onStart] function, and 'dom.free' to [thread onEnd] function. <br /> If specified [threadid] exists, inserts tasks and onEnd function to this existing thread.",
        $paras:[
            "tasks [Required]: Funtion or Array, A single task(function) or a set of tasks(functions).",
            "onEnd [Optional]: Function, 'on end' callback function.",
            "threadid [Required]: Stirng, thread id. If this thread exists, all [tasks] will be insert into this thread."
        ],
        $snippet:[
            "linb.Thread.observableRun(function(){linb.message('fun')},function(){alert('end')});",
            "linb.Thread.observableRun(2000,function(){alert('end')});",
            "linb.Thread.observableRun([function(){linb.message('fun')},2000],function(){alert('end')});",
            "var a=[];linb.Thread.observableRun([{task:function(){a.push(3);},delay:2000}],function(){a.push(4);alert(a);},'__id'); linb.Thread.observableRun([function(){a.push(1)}],function(){a.push(2)},'__id');"
        ]
    },

    isAlive:{
        $desc:"Gets a specified thread object by threadid.",
        $rtn:"linb.Thread",
        $paras:[
            "id [Required]: String, thread id."
        ],
        $snippet:[
            "alert(linb.Thread.isAlive('_id'))",
            "var a=[];linb.Thread('_id', [function(){a.push(1);a.push(linb.Thread.isAlive('_id'));},function(){a.push(2)}],0,null,null,function(){alert(a)}).start();"
        ]
    },
    group:{
        $desc:"To group a set of linb.Thread object(or threadid), wrap them to a shell thread. You can execute them in parallel.",
        $rtn:"linb.Thread",
        $paras:[
            "id [Required]: String, thread id. Uses [null] if you don't want to specify it.",
            "group [Required]: Array, a set of linb.Thread object(or threadid).",
            "callback [Optional]: Function, arguments: [threadid]. Callback function for the shell thread.",
            "onStart [Optional]: Function, arguments: [threadid].  onStart function for the shell thread.",
            "onEnd [Optional]:  Function, arguments: [threadid].  onEnd function for the shell thread."
        ],
        $snippet:[
            "var a=[]; var t1=linb.Thread('t1',[function(){a.push(1)},function(){a.push(2)}]), t2=linb.Thread('t2',[function(){a.push('a')},function(){a.push('b')}]);"+
            "linb.Thread.group(null,[t1,'t2'],function(){a.push('|')},function(){a.push('<')},function(){a.push('>');alert(a);}).start();"
        ],
        $memo:"You have to use start function to start [thread group]!"
    },
    suspend:{
        $desc:"Suspends the specified thread until the [resume] function will be called.",
        $paras:[
            "id [Required]: String, thread id."
        ],
        $snippet:[
            "linb.Thread('_bb',[function(){linb.message(1)},function(){linb.Thread.suspend('_bb');_.asyRun(function(){linb.Thread.resume('_bb')},3000)},function(){linb.message(2)}]).start();"
        ]
    },
    resume:{
        $desc:"Resumes to execute a thread that is suspended.",
        $paras:[
            "id [Required]: String, thread id."
        ],
        $snippet:[
            "linb.Thread('_bb',[function(){linb.message(1)},function(){linb.Thread.suspend('_bb');_.asyRun(function(){linb.Thread.resume('_bb')},3000)},function(){linb.message(2)}]).start();"
        ]
    },
    start:{
        $desc:"Starts to execute a thread",
        $paras:[
            "id [Required]: String, thread id."
        ],
        $snippet:[
            "linb.Thread('_t1', [function(){linb.message(1)},function(){linb.message(2)}]); linb.Thread.start('_t1')"
        ]
    },
    prototype:{
        links:{
            $desc:"Links another thread(the target thread) to the current one, the target thread will be started after the [onEnd] function of the current thread finishes. ",
            $rtn:"self",
            $paras:[
                "thread [Required] : linb.Thread object, the target thread to be linked."
            ],
            $snippet:[
                "var out=[];var t1=linb.Thread(null,[function(){out.push(2)},function(){out.push(3)}],null,null,function(){out.push(1)},function(){out.push(4)});" +
                "var t2=linb.Thread(null,[function(){out.push(6)},function(){out.push(7)}],null,null,function(){out.push(5)},function(){out.push(8);alert(out);});" +
                "t1.links(t2); t1.start();"
            ]
        },
        abort:{
            $desc:"To abort the thread.",
            $snippet:[
                "linb.Thread('_id', [function(){linb.message(1);linb.Thread('_id').abort()},function(){linb.message(2)}]).start();"
            ]
        },
        suspend:{
            $desc:"Suspends the thread until the [resume] function will be called.",
            $rtn:"linb.Thread",
            $snippet:[
                "linb.Thread('_bb',[function(){linb.message(1)},function(){linb.Thread('_bb').suspend();_.asyRun(function(){linb.Thread('_bb').resume()},3000)},function(){linb.message(2)}]).start();"
            ]
        },
        resume:{
            $desc:"Resumes to execute the suspended thread.",
            $rtn:"linb.Thread",
            $paras:[
                "time [Optional]: undefined/Number/Bool.<br> "+
                    "Number: Resumes to execute the next task after [time]ms. <br> "+
                    "true: Resumes to execute the next task after [default delay]ms. <br> "+
                    "false: Resumes to execute the next task after 0ms. <br> "+
                    "undefined: Resumes to execute the next task after [the remaining time]. <br> "
            ],
            $snippet:[
                "linb.Thread('_bb',[function(){linb.message(1)},function(){linb.Thread('_bb').suspend();_.asyRun(function(){linb.Thread('_bb').resume()},3000)},function(){linb.message(2)}]).start();"
            ]
        },
        start:{
            $desc:"Starts to execute a thread",
            $rtn:"linb.Thread",
            $paras:[
                "id [Required]: String, thread id."
            ],
            $snippet:[
                "linb.Thread('_t1', [function(){linb.message(1)},function(){linb.message(2)}]); linb.Thread.start('_t1')"
            ]
        },
        getCache:{
            $desc:"Get a cache value from thread object according to a key.",
            $rtn:"Any",
            $paras:[
                "key [Required]: String, cache key."
            ],
            $snippet:[
                "linb.Thread(null, [function(){this.setCache('k','v')},function(){linb.message(this.getCache('k'))}]).start();"
            ]
        },
        setCache:{
            $desc:"Set a cache value to thread object.",
            $rtn:"linb.Thread",
            $paras:[
                "key [Required]: String, cache key.",
                "value [Required]: String, cache value."
            ],
            $snippet:[
                "linb.Thread(null, [function(){this.setCache('k','v')},function(){linb.message(this.getCache('k'))}]).start();"
            ]
        },
        insert:{
            $desc:"Inserts a set of tasks[function] to the currrent thread.",
            $rtn:"self",
            $paras:[
                "arr [Required]: Array, a set of tasks[function].",
                "index [Optional]: Nubmer, the target postion. Default is the inner current index(the position before the next task to be executed)."
            ],
            $snippet:[
                "var out=[];linb.Thread(null,[function(){out.push(1)},function(){this.insert([function(){out.push(1.5)}])},function(){out.push(2)}],null,null,null,function(){alert(out)}).start();"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","absIO"], {
    /*buildQS:{
        $desc:"To build query string.",
        $rtn:"String",
        $paras:[
            "hash [Required]: Object, target object to build query string.",
            "flag [Optional]: Bool, true: to return 'a serialized String'. false: to return a 'A URL query string'."
        ],
        $snippet:[
            "alert(linb.absIO.buildQS({a:1,b:{aa:1,bb:2}},true)); alert(linb.absIO.buildQS({a:1,b:{aa:1,bb:2}}));"
        ]
    },*/
    groupCall:{
        $desc:"To group a set of linb.absIO object, wrap them to a shell thread. You can execute them in parallel.",
        $rtn:"linb.Thread",
        $paras:[
            "hash [Required]: hash object, A set of linb.absIO object",
            "callback [Optional]: Function,  this function will be triggered after each linb.absIO object has ended.",
            "onStart [Optional]: Function, onStart function for the shell thread.",
            "onEnd [Optional]: Function, onEnd function for the shell thread.",
            "threadid [Optional]: String, a thread id to be bound to the current request. [suspend the thread -> execute the request -> resume the thread]"
        ],
        $snippet:[
            "var out=[];var a=linb.Ajax('uri1',0,0,0,0,{retry:0,timeout:500}), b=linb.SAjax('uri2',0,0,0,0,{retry:0,timeout:500}), c=linb.IAjax('uri3',0,0,0,0,{retry:0,timeout:500}); linb.absIO.group({a:a,b:b,c:c},function(id){out.push(id+' end')},function(){out.push('start')},function(){out.push('end');alert(out)})"
        ]
    },
    isCrossDomain:{
        $desc:"To Determines whether  or not the given path is a cross domain URI.",
        $rtn:"Bool",
        $paras:[
            "uri [Required]: String, URI path String."
        ],
        $snippet:[
            "alert(linb.absIO.isCrossDomain(location.href));alert(linb.absIO.isCrossDomain('http://www.google.com'));"
        ]
    },
    customQS: {
        $desc:"To customize query string object. Subclass can overwrite it for adding extra variables or something.",
        $paras:[
            "obj [Required]: Object or String, query original value."
        ]
    },
    prototype:{
        start:{
            $desc:"Starts to execute a linb.absIO object",
            $snippet:[
                "//linb.Ajax('uri').start();"
            ]
        },
        abort:{
            $desc:'To abort a linb.absIO process.',
            $snippet:[
                "//var a=linb.Ajax('uri').start(); \n //a.abort();"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","Ajax"], {
    $desc:"To Create a linb.Ajax object. <strong>linb.Ajax can handle GET/POST request in the current domain; linb.Ajax is the only one can handle the synchronous request.</strong>",
    $rtn:"linb.Ajax object",
    $paras:[
        "uri [Required]: String/Object. String -- The URL of the request target; Object(to see options) -- a set of key/value pairs that configure the request. If this parameter is object, other parameters will be ignored.",
        "query [Optional]:  Object[Key/value pairs], request data.",
        "onSuccess [Optional]: Function, arguments:[response object, response type, threadid]. A function to be executed whenever the request is done successfully.",
        "onFail [Optional]: Function, arguments:[response object, response type, threadid]. A function to be executed whenever the request fails.",
        "threadid [Optional]: String, a thread id to be bound to the current request. [suspend the thread -> execute the request -> resume the thread]",
        "options [Optional]: Object, a set of key/value pairs that configure the request. All options are optional. <strong>Values in Parameters has high priority</strong>." +
            "<br>{"+
            "<br><em>//variables</em>"+
            "<br>&nbsp;&nbsp;uri: String, The URL of the request target."+
            "<br>&nbsp;&nbsp;query: Object[Key/value pairs], request data."+
            "<br>&nbsp;&nbsp;threadid: String, a thread id to be bound to the current request."+
            "<br>&nbsp;&nbsp;asy: Bool, to Determines whether or not  the request is asynchronous. Default is [false]."+
            "<br>&nbsp;&nbsp;<strong>method: 'GET' or 'POST', the request method. Default is 'GET'.</strong>"+
            "<br>&nbsp;&nbsp;retry: Number, how many times it is tried when the request is timeout."+
            "<br>&nbsp;&nbsp;timeout: Number, the timeout time(ms) for this request."+
            "<strong><br>&nbsp;&nbsp;resType: String 'text' or 'xml', Response type of the request.</strong>"+
            "<br><em>//functions</em>"+
            "<br>&nbsp;&nbsp;cusomQS: Function, arguments: [obj, type]. A function to customize query string object."+
            "<br><em>//normal events</em>"+
            "<br>&nbsp;&nbsp;onSuccess: Function, arguments:[response object, response type, threadid]. A function to be executed whenever the request is done successfully."+
            "<br>&nbsp;&nbsp;onFail: Function, arguments:[response object, response type, threadid]. Afunction to be executed whenever the request fails."+
            "<br><em>//trace events</em>"+
            "<br>&nbsp;&nbsp;onRetry: Function, arguments:[the current retry time], A function will be triggered when the request retries."+
            "<br>&nbsp;&nbsp;onTimeout: Function, , A function will be triggered when the request the request is timeout."+
            "<br>&nbsp;&nbsp;onStart: Function,  , A function will be triggered when the request starts."+
            "<br>&nbsp;&nbsp;onEnd: Function,  , A function will be triggered when the request ends."+
            "<br><em>//before events</em>"+
            "<br>&nbsp;&nbsp;beforeStart: Function. A function to be executed before onStart, if it returns [false], the request will be End."+
            "<br>&nbsp;&nbsp;beforeFail: Function, arguments:[error object, threadid]. A function to be executed before onFail, if it returns [false], the request will not call onFail function."+
            "<br>&nbsp;&nbsp;beforeSuccess: Function, arguments:[response, response type, threadid]. A function to be executed before onSuccess, if it returns [false], the request will not call onSuccess function."+
            "<br>}"
    ],
    $snippet:[
        "var out=[]; linb.Ajax('no.js','', function(){out.push('ok')}, function(){out.push('fail');alert(out);}, null, { onStart:function(){out.push('onStart')}, onEnd:function(){out.push('onEnd') }, onTimeout:function(){out.push('onTimeout')}, onRetry:function(){out.push('onRetry')} }).start();",
        "/*\n//The most common usage: \n"+
         "linb.Thread.observableRun(function(threadid){\n"+
         "       linb.Ajax('request.php',hash, function(response){\n"+
         "               //setResponse(_.unserialize(response));\n"+
         "           }, function(msg){\n"+
         "               //show error msg\n"+
         "           },\n"+
         "       threadid).start();\n"+
         "   });*/"
    ],
    $memo:"Uses [linb.request] to handle simple request, it can switch ajax/sajax/iajax automatically according to url and request method.",
    callback:{
        $desc:"String, default callback function name. <strong>Server needs to match it in the response struct.</strong>.",
        $snippet:["alert(linb.Ajax.callback)"]
    },
    method:{
        $desc:"String, default request method name('GET' or 'POST') for instance.",
        $snippet:["alert(linb.Ajax.method)"]
    },
    randkey:{
        $desc:"String, default randkey name. <strong>Server needs to match it in the response struct.</strong>.",
        $snippet:["alert(linb.Ajax.randkey)"]
    },
    retry:{
        $desc:"Number, default retry times.",
        $snippet:["alert(linb.Ajax.retry)"]
    },
    rspType:{
        $desc:"String, default respond type.",
        $snippet:["alert(linb.Ajax.rspType)"]
    },
    timeout:{
        $desc:"Number, default timeout time.",
        $snippet:["alert(linb.Ajax.timeout)"]
    },
    type:{
        $desc:"Number, default type name. <strong>Server needs to match it in the response struct.</strong>.",
        $snippet:["alert(linb.Ajax.type)"]
    },
    prototype:{
        start:{
            $desc:"Starts to execute a linb.absIO object",
            $snippet:[
                "//linb.Ajax('uri').start();"
            ]
        },
        abort:{
            $desc:'To abort a linb.absIO process.',
            $snippet:[
                "//var a=linb.Ajax('uri').start(); \n //a.abort();"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","SAjax"], {
    $desc:"To Create a linb.SAjax object. <strong>linb.SAjax can handle GET request cross domain, but cant POST data.</strong>.",
    $rtn:"linb.SAjax object",
    $paras:[
        "uri [Required]: String/Object. String -- The URL of the request target; Object(to see options) -- a set of key/value pairs that configure the request. If this parameter is object, other parameters will be ignored.",
        "query [Optional]:  Object[Key/value pairs], request data.",
        "onSuccess [Optional]: Function, arguments:[response object, response type, threadid]. A function to be executed whenever the request is done successfully.",
        "onFail [Optional]: Function, arguments:[response object, response type, threadid]. A function to be executed whenever the request fails.",
        "threadid [Optional]: String, a thread id to be bound to the current request. [suspend the thread -> execute the request -> resume the thread]",
        "options [Optional]: Object, a set of key/value pairs that configure the request. All options are optional. <strong>Values in Parameters has high priority</strong>." +
            "<br>{"+
            "<br><em>//variables</em>"+
            "<br>&nbsp;&nbsp;uri: String, The URL of the request target."+
            "<br>&nbsp;&nbsp;query: Object[Key/value pairs], request data."+
            "<br>&nbsp;&nbsp;threadid: String, a thread id to be bound to the current request."+
            "<br>&nbsp;&nbsp;retry: Number, how many times it is tried when the request is timeout."+
            "<br>&nbsp;&nbsp;timeout: Number, the timeout time(ms) for this request."+
            "<strong><br>&nbsp;&nbsp;resType: String, 'json' or 'script'. Response type of the request.</strong>"+
            "<br><em>//functions</em>"+
            "<br>&nbsp;&nbsp;cusomQS: Function, arguments: [obj, type]. A function to customize query string object."+
            "<br><em>//normal events</em>"+
            "<br>&nbsp;&nbsp;onSuccess: Function, arguments:[response object, response type, threadid]. A function to be executed whenever the request is done successfully."+
            "<br>&nbsp;&nbsp;onFail: Function, arguments:[response object, response type, threadid]. Afunction to be executed whenever the request fails."+
            "<br><em>//trace events</em>"+
            "<br>&nbsp;&nbsp;onRetry: Function, arguments:[the current retry time], A function will be triggered when the request retries."+
            "<br>&nbsp;&nbsp;onTimeout: Function, , A function will be triggered when the request the request is timeout."+
            "<br>&nbsp;&nbsp;onStart: Function,  , A function will be triggered when the request starts."+
            "<br>&nbsp;&nbsp;onEnd: Function,  , A function will be triggered when the request ends."+
            "<br><em>//before events</em>"+
            "<br>&nbsp;&nbsp;beforeStart: Function. A function to be executed before onStart, if it returns [false], the request will be End."+
            "<br>&nbsp;&nbsp;beforeFail: Function, arguments:[error object, threadid]. A function to be executed before onFail, if it returns [false], the request will not call onFail function."+
            "<br>&nbsp;&nbsp;beforeSuccess: Function, arguments:[response, response type, threadid]. A function to be executed before onSuccess, if it returns [false], the request will not call onSuccess function."+
            "<br>}"
    ],
    $snippet:[
        "/*\n//The most common usage: \n"+
         "linb.Thread.observableRun(function(threadid){\n"+
         "       linb.SAjax('request.php',hash, function(response){\n"+
         "               //setResponse(response);\n"+
         "           }, function(msg){\n"+
         "               //show error msg\n"+
         "           },\n"+
         "       threadid).start();\n"+
         "   });*/"
    ],
    $memo:"<br />1.Uses [linb.include] to include a .js file.<br />2.Uses [linb.request] to handle simple request, it can switch ajax/sajax automatically according to url.",
    callback:{
        $desc:"String, default callback function name. <strong>Server needs to match it in the response struct.</strong>.",
        $snippet:["alert(linb.SAjax.callback)"]
    },
    method:{
        $desc:"String, default request method name('GET' or 'POST') for instance.",
        $snippet:["alert(linb.SAjax.method)"]
    },
    randkey:{
        $desc:"String, default randkey name. <strong>Server needs to match it in the response struct.</strong>.",
        $snippet:["alert(linb.SAjax.randkey)"]
    },
    retry:{
        $desc:"Number, default retry times.",
        $snippet:["alert(linb.SAjax.retry)"]
    },
    rspType:{
        $desc:"String, default respond type.",
        $snippet:["alert(linb.SAjax.rspType)"]
    },
    timeout:{
        $desc:"Number, default timeout time.",
        $snippet:["alert(linb.SAjax.timeout)"]
    },
    type:{
        $desc:"Number, default type name. <strong>Server needs to match it in the response struct.</strong>.",
        $snippet:["alert(linb.SAjax.type)"]
    },

    customQS: {
        $desc:"To customize query string object. Subclass can overwrite it for adding extra variables or something.",
        $paras:[
            "obj [Required]: Object, original object."
        ]
    },

    prototype:{
        start:{
            $desc:"Starts to execute a linb.SAjax object",
            $snippet:[
                "//linb.SAjax('uri').start();"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","IAjax"], {
    $desc:"To Create a linb.IAjax object. <strong>linb.IAjax can handle GET/POST request cross domain, and can post binary file to server too.</strong>",
    $rtn:"linb.IAjax object",
    $paras:[
        "uri [Required]: String/Object. String -- The URL of the request target; Object(to see options) -- a set of key/value pairs that configure the request. If this parameter is object, other parameters will be ignored.",
        "query [Optional]:  Object[Key/value pairs], request data.",
        "onSuccess [Optional]: Function, arguments:[response object, response type, threadid]. A function to be executed whenever the request is done successfully.",
        "onFail [Optional]: Function, arguments:[response object, response type, threadid]. A function to be executed whenever the request fails.",
        "threadid [Optional]: String, a thread id to be bound to the current request. [suspend the thread -> execute the request -> resume the thread]",
        "options [Optional]: Object, a set of key/value pairs that configure the request. All options are optional. <strong>Values in Parameters has high priority</strong>." +
            "<br>{"+
            "<br><em>//variables</em>"+
            "<br>&nbsp;&nbsp;uri: String, The URL of the request target."+
            "<br>&nbsp;&nbsp;query: Object[Key/value pairs], request data."+
            "<br>&nbsp;&nbsp;threadid: String, a thread id to be bound to the current request."+
            "<br>&nbsp;&nbsp;<strong>method: 'GET' or 'POST', the request method. Default is 'POST'.</strong>"+
            "<br>&nbsp;&nbsp;retry: Number, how many times it is tried when the request is timeout."+
            "<br>&nbsp;&nbsp;timeout: Number, the timeout time(ms) for this request."+
            "<br><em>//functions</em>"+
            "<br>&nbsp;&nbsp;cusomQS: Function, arguments: [obj]. A function to customize query string object."+
            "<br><em>//normal events</em>"+
            "<br>&nbsp;&nbsp;onSuccess: Function, arguments:[response object, response type, threadid]. A function to be executed whenever the request is done successfully."+
            "<br>&nbsp;&nbsp;onFail: Function, arguments:[response object, response type, threadid]. Afunction to be executed whenever the request fails."+
            "<br><em>//trace events</em>"+
            "<br>&nbsp;&nbsp;onRetry: Function, arguments:[the current retry time], A function will be triggered when the request retries."+
            "<br>&nbsp;&nbsp;onTimeout: Function, , A function will be triggered when the request the request is timeout."+
            "<br>&nbsp;&nbsp;onStart: Function,  , A function will be triggered when the request starts."+
            "<br>&nbsp;&nbsp;onEnd: Function,  , A function will be triggered when the request ends."+
            "<br><em>//before events</em>"+
            "<br>&nbsp;&nbsp;beforeStart: Function. A function to be executed before onStart, if it returns [false], the request will be End."+
            "<br>&nbsp;&nbsp;beforeFail: Function, arguments:[error object, threadid]. A function to be executed before onFail, if it returns [false], the request will not call onFail function."+
            "<br>&nbsp;&nbsp;beforeSuccess: Function, arguments:[response, response type, threadid]. A function to be executed before onSuccess, if it returns [false], the request will not call onSuccess function."+
            "<br>}"
    ],
    $snippet:[
        "/*\n//The most common usage: \n"+
         "linb.Thread.observableRun(function(threadid){\n"+
         "       linb.IAjax('request.php',hash, function(response){\n"+
         "               //setResponse(response);\n"+
         "           }, function(msg){\n"+
         "               //show error msg\n"+
         "           },\n"+
         "       threadid).start();\n"+
         "   });*/",
        "/*\n//The most common usage: \n"+
         "linb.Thread.observableRun(function(threadid){\n"+
         "       linb.SAjax('request.php',hash, function(response){\n"+
         "               //setResponse(response);\n"+
         "           }, function(msg){\n"+
         "               //show error msg\n"+
         "           },\n"+
         "       threadid).start();\n"+
         "   },{method:'GET'});*/"
    ],
    $memo:"You have to use linb.IAjax to post cross domain data, or to upload an iamge file.",

    callback:{
        $desc:"String, default callback function name. <strong>Server needs to match it in the response struct.</strong>.",
        $snippet:["alert(linb.IAjax.callback)"]
    },
    method:{
        $desc:"String, default request method name('GET' or 'POST') for instance.",
        $snippet:["alert(linb.IAjax.method)"]
    },
    randkey:{
        $desc:"String, default randkey name. <strong>Server needs to match it in the response struct.</strong>.",
        $snippet:["alert(linb.IAjax.randkey)"]
    },
    retry:{
        $desc:"Number, default retry times.",
        $snippet:["alert(linb.IAjax.retry)"]
    },
    rspType:{
        $desc:"String, default respond type.",
        $snippet:["alert(linb.IAjax.rspType)"]
    },
    timeout:{
        $desc:"Number, default timeout time.",
        $snippet:["alert(linb.IAjax.timeout)"]
    },
    type:{
        $desc:"Number, default type name. <strong>Server needs to match it in the response struct.</strong>.",
        $snippet:["alert(linb.IAjax.type)"]
    },

    customQS: {
        $desc:"To customize query string object. Subclass can overwrite it for adding extra variables or something.",
        $paras:[
            "obj: Object, original object."
        ]
    },
    prototype:{
        start:{
            $desc:"Starts to execute a linb.IAjax object",
            $snippet:[
                "//linb.IAjax('uri').start();"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","SC"], {
    $desc:"Straight Call. Uses path name to call a specified class/object. If the target class/object exists, returns it directly, but if the target class/object does not exist, loads it from code(in memory or in the remote file[linb.Ajax/linb.SAjax]) first, returns it, and executes the callback function(if it exists).",
    $rtn:"class/object[in synchronous mode], undefined[in asynchronous mode]",
    $paras:[
        "path [Required]: String, path name of a class/object(e.g. 'linb.UI.Button').",
        "callback [Optional]: Function, arguments:[path, code, threadid]. A function to be executed whenever the straight call returns. If returns successfully, [path] will be the [path name], and [this] pointer will be the result class/object; if fails, [path] will be [null], and [this] pointer will be the inner linb.Ajax/iajax object.",
        "isAsy [Optional]: Bool, to Determines whether or not  the current SC is in asynchronous Mode. If the target class exists, this parameter is invalide. Default is [false].",
        "threadid [Optional]: String, a thread id to be bound to the current request. [suspend the thread -> execute the request -> resume the thread]",
        "options [Optional]: Object, a set of key/value pairs that configure the inner linb.Ajax(asynchronous mode) or linb.SAjax(synchronous mode)."
    ],
    $snippet:[
        "alert(linb.SC('linb.SC'));linb.SC('linb.absIO',function(){alert(this===linb.absIO)});",
        "linb.SC('linb.UI.LoadFromRemoteFile',function(path,code,threaid){alert('You can know the calling result in firefox only!'); if(!path)alert('Fail to load '+ this.uri)},true);"
    ],
    get:{
        $desc:"Gets value from an object according to a path name.",
        $rtn:"Any",
        $paras:[
            "path [Required]: String, path name (e.g. 'linb.SC.get', '_.isArr', 'linb.ini.path').",
            "obj [Optional]: Object, target object. Default is [window]."
        ],
        $snippet:[
            "alert(linb.SC.get('linb.ini.path')); alert(_.get(window,'linb.ini.path'.split('.'))); "
        ],
        $memo:"It's a wrap of [_.get]."
    },
    groupCall:{
        $desc:"To group a set of path names to load code snippet and execute them in parallel.",
        $paras:[
            "pathArr [Required]: Array, a set of path names(String).",
            "callback [Optional]: Function, arguments:[path, code]. A function to be executed whenever the code snip returns. If returns successfully, [path] will be the [path name], and [this] pointer will be an empty object/{}; if fails, [path] will be [null], and [this] pointer will be the inner linb.Ajax/iajax object.",
            "onEnd [Optional]: Function, arguments:[the process id]. A function to be executed after all the code snippet are loaded and executed.",
            "threadid [Optional]: String, a thread id to be bound to the current request. [suspend the thread -> execute the request -> resume the thread]"
        ],
        $snippet:[
            "/*\n//The most common usage: \n"+
            "linb.SC.groupCall(['linb.UI.Button','linb.UI.Input','linb.UI.List'],function(path){alert(path+' loaded.')},function(){alert('ends.')});"+
            "\n*/"
        ]
    },
    runInBG:{
        $desc:"To load a set of code snippet and execute them one by one in the background. (wrap them to a shell thread).",
        $paras:[
            "pathArr [Required]: Array, a set of path names(String).",
            "callback [Optional]: Function, arguments:[path, code]. A function to be executed whenever the code snip returns. If returns successfully, [path] will be the [path name], and [this] pointer will be an empty object/{}; if fails, [path] will be [null], and [this] pointer will be the inner linb.Ajax/iajax object.",
            "onStart [Optional]: Function, onStart function for the shell thread.",
            "onEnd [Optional]: Function, onEnd function for the shell thread."
        ],
        $snippet:[
            "/*\n//The most common usage: \n"+
            "linb.SC.runInBG(['linb.UI.Button','linb.UI.Input','linb.UI.List'],null,null,function(){alert('ends.')});"+
            "\n*/"
        ]
    },
    loadSnips:{
        $desc:"To get a set of code snippets according to the [pathArry] in asynchronous mode, and cache them in the [cache] pool",
        $paras:[
            "pathArr [Required]: Array, a set of path names(String).",
            "cache [Optional]: Object[Key/value pairs], target cache pool. Defalut is [linb.cache.text].",
            "callback [Optional]: Function, arguments:[path, code]. A function to be executed whenever the code returns. If returns successfully, [path] will be the [path name], and [this] pointer will be an empty object/{}; if fails, [path] will be [null], and [this] pointer will be the inner linb.Ajax/iajax object.",
            "onEnd [Optional]: Function, arguments:[the process id]. A function to be executed whenever all the code snippets returned.",
            "threadid [Optional]: String, a thread id to be bound to the current request. [suspend the thread -> execute the request -> resume the thread]"
        ],
        $snippet:[
            "/*\n//The most common usage: \n"+
            "var flag=false; linb.SC.loadSnips(['linb.UI.Button','linb.UI.Input','linb.UI.List'],null,null,function(){flag=true;}); \n //.... \n if(flag)linb.SC.execSnips();"+
            "\n*/"
        ]
    },
    execSnips:{
        $desc:"To execute all the code snippets that [linb.SC.loadSnips] cached, and clear the cache pool.",
        $paras:[
            "cache [Optional]: Object[Key/value pairs], target cache pool. defalut is [linb.cache.text]."
        ],
        $snippet:[
            "/*\n//The most common usage: \n"+
            "var flag=false; linb.SC.loadSnips(['linb.UI.Button','linb.UI.Input','linb.UI.List'],null,null,function(){flag=true;}); \n //.... \n if(flag)linb.SC.execSnips();"+
            "\n*/"
        ]
    }
});

_.set(linb.Locale,["en","doc","linb","Event"], {
    getBtn :{
        $desc:"Gets mouse button name from event object.",
        $rtn:"String",
        $paras:[
            "event [Required] : DOM event object."
        ],
        $snippet:[
            "var id='linb.temp.e1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">click here ' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "linb(id).onClick(function(p,e){linb('logo').onClick(null); alert(linb.Event.getBtn(e));});"+
            "}"
        ]
    },
    getEventPara:{
        $desc:"Gets event parameters object.",
        $paras:[
            "event [Required] : DOM event object."
        ],
        $snippet:[
            "var id='linb.temp.e2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">click here ' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "linb(id).onClick(function(p,e){linb('logo').onClick(null); alert(_.serialize(linb.Event.getEventPara(e)));});"+
            "}"
        ]
    },
    getId:{
        $desc:"Gets DOM element id string(include window and document object).",
        $paras:[
            "node [Required] : DOM element, window or document object."
        ],
        $snippet:[
            "alert(linb.Event.getId(document.getElementById('logo')));alert(linb.Event.getId(document));alert(linb.Event.getId(window));"
        ]
    },
    getKey:{
        $desc:"Get keyboard related value from event object.",
        $rtn:"Array. [keycode string, ctrl status, shift status, alt status]",
        $paras:[
            "event [Required] : DOM event object."
        ],
        $snippet:[
            "//'Run' the code, and press any keyboars please!\n"+
            "linb('body').onKeypress(function(p,e){linb('body').onKeypress(null); alert(linb.Event.getKey(e))});"
        ]
    },
    getPos:{
        $desc:"Gets mouse postion from event object.",
        $rtn:"key/value pairs. {left:xx,top:xx}",
        $paras:[
            "event [Required] : DOM event object."
        ],
        $snippet:[
            "var id='linb.temp.e4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">click here ' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "linb(id).onClick(function(p,e){linb('logo').onClick(null); alert(_.serialize(linb.Event.getPos(e)));});"+
            "}"
        ]
    },
    getSrc:{
        $desc:"Gets DOM element from event object.",
        $rtn:"DOM element",
        $paras:[
            "event [Required] : DOM event object."
        ],
        $snippet:[
            "var id='linb.temp.e5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">click here ' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "linb(id).onClick(function(p,e){linb('logo').onClick(null); alert(linb.Event.getSrc(e).id);});"+
            "}"
        ]
    },
    keyboardHook :{
        $desc:" To add/remove a global keyboard event hook.",
        $rtn:'[self]',
        $paras:[
            "key [Required] : String, keyboard name to be monitored.",
            "ctrl [Optional] : Bool, to Determines whether or not it monitors 'CTRL' status. Default is [false].",
            "shift [Optional] : Bool, to Determines whether or not it monitors 'SHIFT' status. Default is [false].",
            "alt [Optional] : Bool, to Determines whether or not it monitors 'ALT' status. Default is [false].",
            "fun [Optional] : Function, the hook function that will be executed whenever the pre-defined condition is triggered. If you do not specify this parameter, or enter a non-function variable, system will remove the event hook by the [key](keyboard name).",
            "args [Optional]: Array, arguments for fun. Default is []",
            "scope [Optional]: Object, [this] pointer for [fun]. Default is [window]"
        ],
        $snippet:[
            "//'Run' the code, and click keyboard 'a' please! \n"+
            "linb.Event.keyboardHook('a',0,0,0,function(){linb.message('you pressed a!');linb.Event.keyboardHook('a');})",
            "//'Run' the code, and You can't input 'a' in this input! \n"+
            "if(!linb.Dom.byId('linb.temp.1')){this.prepend(linb.create('<div><input /><button id=\"linb.temp.1\" onclick=\"linb.Event.keyboardHook(\\\'a\\\');linb(this).parent().remove()\">remove this example</button></div>'));}" +
            "linb.Event.keyboardHook('a',0,0,0,function(){return false;});"
        ]
    },
    popTabOutTrigger:{
         $desc:"Pops the latest 'TAB boundary DOM element' from the inner 'stack', and activates the previous one if it exists. Take a look at <a href='#linb.Event.pushTabOutTrigger'>linb.Event.pushTabOutTrigger</a>",
         $paras:[
            "flag [Optional] : Bool, to force to clear the inner 'stack'(pops all 'TAB boundary DOM elements' out).Default is [false]."
         ],
         $rtn:'[self]'
    },
    pushTabOutTrigger:{
        $desc:"Pushes 'a TAB boundary DOM element with a trigger function' to a inner 'stack', and activate it(inactivate the previous one if it exists). This [trigger] funtion will be executed whenever user uses 'TAB' keyboard to let the [focus] go out the 'boundary DOM element'.",
        $rtn:'[self]',
        $paras:[
            "boundary [Required] : DOM element, boundary DOM element.",
            "trigger [Required] : Function, arguments[boundary DOM element]. The trigger funtion whenever user uses 'TAB' keyboard to go out the 'boundary DOM element'. "
        ],
        $snippet:[
            "if(!linb.Dom.byId('linb.temp.out')){this.prepend(linb.create('<div><div id=\"linb.temp.out\" style=\"border:solid 1px;padding:10px;\">linb.temp.out<input id=\"linb.temp.out.first\"><input /><input /><input /><div id=\"linb.temp.in\"  style=\"border:solid 1px;padding:10px;\">linb.temp.in<input id=\"linb.temp.in.first\" /><input /><input /><input /><input /></div></div><div><button onclick=\"_.arr.each(linb.Event._tabHookStack,function(o){alert(o[0].id)})\">Click here to show inner stack content!</button><br /><br /><button onclick=\"linb.Event.popTabOutTrigger();\">popTabOutTrigger</button><br /><br /></div><div><button onclick=\"linb.Event.popTabOutTrigger(1);linb(this).parent(2).remove();\">remove this example</button></div></div>'));\n"+
            "linb.Event.pushTabOutTrigger(document.getElementById('linb.temp.out'),function(){document.getElementById('linb.temp.out.first').focus()});"+"linb.Event.pushTabOutTrigger(document.getElementById('linb.temp.in'),function(){document.getElementById('linb.temp.in.first').focus()});}"
        ]
    },
    stopBubble:{
        $desc:"To stop both default action and event bubbling.",
        $paras:[
            "event [Required] : DOM event object."
        ],
        $snippet:[
            "if(!linb.Dom.byId('linb.temp.3')){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\" onclick=\"alert(\\\'onclick event on the div\\\')\"><p>You can click here to fire onclick event on the div </p><a id=\"linb.temp.3\" href=\"http://www.sigmawidgets.com\" onclick=\"linb.message(\\\'Event bubble is stopped. You cant fire onclick event on the outter div !\\\');linb.Event.stopBubble(event);\" >Event bubble to outter div is stopped here. Click me to try it!</a><button onclick=\"linb(this).parent().remove()\">remove this example</button></div>'))}"
        ]
    },
    stopDefault:{
        $desc:"To stop both default action.",
        $paras:[
            "event [Required] : DOM event object."
        ],
        $snippet:[
            "if(!linb.Dom.byId('linb.temp.4')){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\" ><a id=\"linb.temp.4\" href=\"http://www.sigmawidgets.com\" onclick=\"linb.message(\\\'Default action is stopped here. You cant go to \\\'+this.href);linb.Event.stopDefault(event);\" >My default action is stopped. Click me to try it!</a><button onclick=\"linb(this).parent().remove()\">remove this example</button></div>'))}"
        ]
    }
});

_.set(linb.Locale,["en","doc","linb","absBox"],{
    pack:{
        $desc: "To create a [linb.absBox] object, and pack a set of value to this object. ",
        $rtn: "linb.absBox",
        $paras:[
            "arr [Required] : Array, a set of value. ",
            "ensureValue [Optional] : Bool, force to ensure value. Default is true. "
        ],
        $snippet:[
            "var nodes = linb.Dom.pack(['logo',document.getElementById('logo')]); alert(nodes.get(0).id)"
        ]
    },
    plugIn:{
        $desc:"To add a a plug-in function to the current class.",
        $rtn:"[self]",
        $paras:[
            "name [Required] : String, plug-in function name.",
            "fun [Required] : Function, plug-in function."
        ],
        $snippet:[
            "var n=linb('logo'); alert(n.getBackgroundImg); linb.Dom.plugIn('getBackgroundImg',function(){return this.css('backgroundImage')}); alert(n.getBackgroundImg());"
        ]
    },
    prototype:{
        each:{
            $desc:"To apply a function to each element of the current linb.absBox object.",
            $rtn:'[self]',
            $paras:[
                "fun [Required]: Function, [this] pointer is the linb.absBox object, arguments: [element, array index]. The function to apply to inner array item."
            ],
            $snippet:[
                "linb(['linb.UI.Layout:a:','logo']).each(function(o,i){alert(i+' -> #'+o.id)})"
            ]
        },
        get:{
            $desc:"To get a specified element from the linb.absBox object by index, or get all elements.",
            $rtn:"element or array of elements.",
            $paras:[
                "index [Optional] : Number."
            ],
            $snippet:[
                "var n=linb(['linb.UI.Layout:a:','logo']); alert(n.get(1).id); alert(n.get()[0].id+' , '+n.get()[1].id);"
            ]
        },
        isEmpty:{
            $desc:"To Determines if the current linb.absBox object includes any element.",
            $rtn:"Bool.",
            $snippet:[
                "var n=linb(['linb.UI.Layout:a:','logo']); alert(n.isEmpty()); alert(linb().isEmpty())"
            ]
        },
        merge:{
            $desc:"To merge a target linb.absBox object to the current one.",
            $rtn:"[self].",
            $paras:[
                "obj [Required] : linb.absBox objcet, the target object"
            ],
            $snippet:[
                "alert(linb('linb.UI.Layout:a:').merge(linb('logo')).get().length)"
            ]
        },
        reBoxing:{
            $desc:"To pack all the elements in the current object to another linb.absBox object.",
            $trn:"the new linb.absBox object",
            $paras:[
                "key [Optional] : new linb.absBox class name.",
                "ensureValue [Optional] : Bool, force to ensure value. Default is true. "
            ],
            $snippet:[
                "alert(linb('linb.UI.Layout:a:').KEY);alert(linb('linb.UI.Layout:a:').reBoxing('linb.UI.Layout').KEY);"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","Dom"], {
    constructor:{
        $desc:"Generally, don't use [new linb.Dom()], but [linb(nodes, flag)] to create a linb.Dom object."
    },
    Events:{
        $desc:  "<strong>Description</strong>: to add, remove or fire the specified event. There are three group of event functions are designed for a DOM event: [before-], [on-] and [after-]. "+
                "<ul>"+
                    "<li><strong>linb(/**/).onClick([function], 'label')</strong> => adds the [function] to [onclick] group.</li>"+
                    "<li><strong>linb(/**/).onClick([function]) </strong> => removes all event functions in [onclick] group, and adds the [function] to [onclick] group.</li>"+

                    "<li><strong>linb(/**/).onClick(null, 'label') </strong> => removes the event function labelled with 'label' from the [onclick] group.</li>"+
                    "<li><strong>linb(/**/).onClick(null) </strong> => removes all event functions in [onclick] group.</li>"+
                    "<li><strong>linb(/**/).onClick(null,null,true) </strong> => removes all event functions in [beforeclick] group, [onclick] group and [afterclick] group.</li>"+

                    "<li><strong>linb(/**/).onClick() </strong> => fire event, executes all event functions in [onclick] group in order. <strong>If any of those functions returns [false], the remaining functions will be ignored.</strong></li>"+
                    "<li><strong>linb(/**/).onClick(true) </strong> => fire event, executes all event functions in [beforeclick] group, [onclick] group and [afterclick] group in order.</li>"+
                "</ul>"+

                "<p><strong>Returns</strong>: Add: return [self]; Remove: return [self]; Fire: no return.</p>"+
                "<p><strong>Parameters</strong>: </p>"+
                "<ul>"+
                    "<li><strong>fun [Optional] </strong>: Function, [this] pointer is the current element, arguments are [linb.DomProfile object, DOM event object, the current element].</li>"+
                    "<li><strong>label [Optional]</strong> : String, the event label.</li>"+
                    "<li><strong>flag [Optional]</strong> : Bool, for remove event only. to indicate if remove all related event.</li>"+
                "</ul>"+
                "<p style='padding:5px;'><a href='#linb.Dom.prototype.afterClick' onclick='var n =linb(this).parent(5).query(\"a\",\"name\",\"linb.Dom.prototype.afterClick\").next().first(); if(n.next().css(\"display\")==\"none\")n.onClick()'><strong>Go to [onClick] for getting the code snippets!</strong></a></p>"
    },
    HIDE_VALUE:{
        $desc:"String, a constant value for hidding a DOM element( [element.style.left=linb.Dom.HIDE_VALUE] or [element.style.top=linb.Dom.HIDE_VALUE]). ",
        $snippet:[
            "alert(linb.Dom.HIDE_VALUE)"
        ]
    },
    TOP_ZINDEX:{
        $desc:"Number, a constant value for the top/max z-index number. ",
        $snippet:[
            "alert(linb.Dom.TOP_ZINDEX)"
        ]
    },
    busy:{
        $desc:"Shows busy-UI(A special top zindex div covers the whole window). ",
        $paras:[
            "label [Optional] : String, the busy label. Calls [linb.Dom.free(the latest label)] to release the busy UI."
        ],
        $snippet:[
            "linb.Thread(null,[_.fun()],1000,null,function(){linb.Dom.busy()},function(){linb.Dom.free()}).start()",
            "linb.Thread(null,[function(){linb.Dom.busy('b');linb.message('Changes [label] to \\\'b\\\' ')}, function(){linb.Dom.free();linb.message('Still busy')},function(){linb.Dom.free('a');linb.message('Still busy')},_.fun()],1000,null,function(){linb.Dom.busy('a')},function(){linb.Dom.free('b');linb.message('free now')}).start()"
        ]
    },
    free:{
        $desc:"Releases busy-UI.",
        $paras:[
            "label [Optional] : String, the busy label."
        ],
        $memo:"Sees <a href='#linb.Dom.busy'>linb.Dom.busy</a> please!"
    },
    byId:{
        $desc:"Gets the DOM element according to its id. Equivals to [document.getElementById]. ",
        $rtn:"DOM element",
        $paras:[
            "id [Required] : String, id value"
        ],
        $snippet:[
            "alert( linb.Dom.byId('logo') === document.getElementById ('logo') )"
        ]
    },
    animate:{
        $desc:"Wraps a 'Special Effects' animation into a linb.Thread object(shell thread).",
        $rtn:"linb.Thread object",
        $paras:[
            "css [Required] : Object[CSS Key/value pairs].",
            "args [Required] : Object[Key/value([from value, to value]) pairs] .",
            "onStart [Optional]: Function, arguments: [threadid]. this function will be called before the shell thread triggered the first task.",
            "onEnd [Optional]: Function, arguments: [threadid]. this function will be called after the shell thread finishes the last task.",
            "time [Optional]: Number(ms), the duration of this animation. Default is 200.",
            "step [Optional]: Number, the step number of this animation. Default is 5.",
            "type [Optional]: String, the animate type. Default is 'line'.",
            "threadid [Optional]: String, Assigns an unique id to the shell thread object."
        ],
        $snippet:[
            "linb.Dom.animate({backgroundColor:'#ff0000'},{left:[0,200],top:[0,300],width:[30,300],height:[30,300],opacity:[1,0]}, null, null, 500, 50, 'outsine').start()"
        ]
    },
    getEmptyDiv:{
        $desc:"Gets an empty div in DOM, which DOM id starts with 'linb.matrix::'. ",
        $rtn:"linb.Dom object",
        $paras:[
            "sequence [Optional] : Number, sequence number. Default is 1."
        ],
        $snippet:[
            "var m1=linb.Dom.getEmptyDiv(); alert(m1.id())",
            "var m1=linb.Dom.getEmptyDiv(), m2=linb.Dom.getEmptyDiv(2); alert(m1.id());alert(m2.id()) "
        ],
        $memo:"When you on longer need the matrix div, empty the matrix div to let it 'available for [linb.Dom.getEmptyDiv]'. "
    },
    getStyle:{
        $desc:"To get the specified css property from the target DOM element.",
        $rtn:"String",
        $paras:[
            "node [Required] : Dom element, target Dom element.",
            "name [Required] : String, the specified css property name."
        ],
        $snippet:[
            "var n=linb.Dom.byId('logo'); alert(linb.Dom.getStyle(n,'width')); alert(linb.Dom.getStyle(n,'overflow'))"
        ]
    },
    setStyle:{
        $desc:"To set the specified css property to the target DOM element.",
        $paras:[
            "node [Required] : Dom element, target Dom element.",
            "name [Required] : String, the specified css property name.",
            "value [Required] : String, the css property value to be set."
        ],
        $snippet:[
            "var n=linb.Dom.byId('logo'); linb.Dom.setStyle(n,'top', '100px'); _.asyRun(function(){linb.Dom.setStyle(n,'top', '0px')}, 2000)"
        ]
    },
    setCover:{
        $desc:"To set a special cover div to the top of the page, or to hide it.",
        $paras:[
            "visible [Required] : Bool or String, true=>show the cover; false=>hide the cover; 'string'=>show the cover and the 'string'.",
            "label [Optional] : String, the busy label. "
        ],
        $snippet:[
            "linb.Dom.setCover(true); _.asyRun(function(){linb.Dom.setCover(false)},2000);",
            "linb.Dom.setCover('a'); _.asyRun(function(){linb.Dom.setCover('b')},1000); _.asyRun(function(){linb.Dom.setCover('c')},2000); _.asyRun(function(){linb.Dom.setCover(false)},3000);",
            "linb.Dom.setCover('<div style=\\\'font-weight:bold;padding:5px;border:solid 1px;background:#CCC;\\\'> Loading... </div>'); _.asyRun(function(){linb.Dom.setCover(false)},2000);",
            "linb.Dom.setCover(true,'key'); _.asyRun(function(){linb.message('The cover is still visible');linb.Dom.setCover(false)},1000); _.asyRun(function(){linb.message('The cover is hidded.');linb.Dom.setCover(false,'key')},5000);"
        ]
    },
    submit:{
        $desc:"To simulate a HTML form submit action. ",
        $paras:[
            "action [Required] : String(URL), form action property. To define where to send the data when the form is submitted.",
            "data [Required] : Object[Key/value pairs], the data object will be submitted.",
            "method [Optional] : String, form method property. The HTTP method for sending data to the server(the action URL). [get|post], default is 'get'.",
            "target [Optional] : String, form target property. [_blank|_parent|_self|_top], default is '_blank'.",
            "enctype [Optional] : String, form enctype property(The enctype property sets the MIME type used to encode the content of the form), The default value is 'application/x-www-form-urlencoded'. When the [data] includes [file] type data, the value should be 'multipart/form-data'."
        ],
        $snippet:[
            "linb.Dom.submit('http://www.google.com/search',{q:'ajax ria'},'get')",
            "linb.Dom.submit('http://www.google.com/search',{q:{a:1,b:2}},'get')"
        ]
    },
    prototype:{
        addBorder:{
            $desc:"To add a border to the first element. ",
            $rtn:"linb.UI.Border object.",
            $paras:[
                "properties [Optional] : key/value pairs, the properties of border. The most common usage: {borderActive: [bool]}."
            ],
            $snippet:[
                "var div=linb.create('<div style=\\\'background:#fff;position:absolute;border:solid 1px;width:100px;height:100px;left:100px;top:100px;z-index:20000;\\\'></div>');linb('body').append(div);_.asyRun(function(){div.addBorder()},1000);_.asyRun(function(){div.removeBorder()},2000);_.asyRun(function(){div.remove()},3000);",
                "var div=linb.create('<div style=\\\'background:#fff;position:absolute;border:solid 1px;width:100px;height:100px;left:100px;top:100px;z-index:20000;\\\'></div>');linb('body').append(div);div.addBorder({borderActive:true});_.asyRun(function(){div.remove()},5000);"
            ],
            $memo:"Dependency: linb.UI.Border."
        },
        removeBorder:{
            $desc:"To remove an existing border from the first element. ",
            $rtn:"[self]",
            $snippet:[
                "var div=linb.create('<div style=\\\'background:#fff;position:absolute;border:solid 1px;width:100px;height:100px;left:100px;top:100px;z-index:20000;\\\'></div>');linb('body').append(div);_.asyRun(function(){div.addBorder()},1000);_.asyRun(function(){div.removeBorder()},2000);_.asyRun(function(){div.remove()},3000);"
            ],
            $memo:"Dependency: linb.UI.Border."
        },
        addResizer:{
            $desc:"To add a resizer to the first element. ",
            $rtn:"linb.UI.Resizer object.",
            $paras:[
                "properties [Optional] : key/value pairs, the properties of border.",
                "onUpdate [Optional] : Function, the callback function."
            ],
            $snippet:[
                "//You can resize the following div: \n" +
                "var div=linb.create('<div style=\\\'background:#fff;position:absolute;border:solid 1px;width:100px;height:100px;left:100px;top:100px;\\\'>Use mouse to resize me!</div>');linb('body').append(div);div.topZindex(true).addResizer();_.asyRun(function(){div.remove()},10000);",
                "var div=linb.create('<div style=\\\'background:#fff;position:absolute;border:solid 1px;width:100px;height:100px;left:100px;top:100px;\\\'>Use mouse to resize me!</div>');linb('body').append(div);div.topZindex(true).addResizer({forceVisible:true,forceMovable:true,singleDir:true,vertical:false,minWidth:50,maxWidth:200,handlerSize:10});_.asyRun(function(){div.remove()},10000);"
            ],
            $memo:"Dependency: linb.UI.Resizer."
        },
        removeResizer:{
            $desc:"To remove an existing resizer from the first element. ",
            $rtn:"[self]",
            $snippet:[
                "var div=linb.create('<div style=\\\'background:#fff;position:absolute;border:solid 1px;width:100px;height:100px;left:100px;top:100px;z-index:20000;\\\'></div>');linb('body').append(div);_.asyRun(function(){div.addResizer({forceVisible:true})},1000);_.asyRun(function(){div.removeResizer()},2000);_.asyRun(function(){div.remove()},3000);"
            ],
            $memo:"Dependency: linb.UI.Resizer."
        },
        addShadow:{
            $desc:"To add a shadow to the first element. ",
            $rtn:"linb.UI.Shadow object.",
            $paras:[
                "properties [Optional] : key/value pairs, the properties of border."
            ],
            $snippet:[
                "//You can resize the following div: \n" +
                "var div=linb.create('<div style=\\\'background:#fff;position:absolute;border:solid 1px;width:100px;height:100px;left:100px;top:100px;\\\'></div>');linb('body').append(div);div.topZindex(true).addShadow();_.asyRun(function(){div.remove()},10000);",
                "var div=linb.create('<div style=\\\'background:#fff;position:absolute;border:solid 10px #00ff00;width:100px;height:100px;left:100px;top:100px;\\\'></div>');linb('body').append(div);div.topZindex(true).addShadow({shadowOffset:10});_.asyRun(function(){div.remove()},10000);"
            ],
            $memo:"Dependency: linb.UI.Shadow."
        },
        removeShadow:{
            $desc:"To remove an existing shadow from the first element. ",
            $rtn:"[self]",
            $snippet:[
                "var div=linb.create('<div style=\\\'background:#fff;position:absolute;border:solid 1px;width:100px;height:100px;left:100px;top:100px;z-index:20000;\\\'></div>');linb('body').append(div);_.asyRun(function(){div.addShadow()},1000);_.asyRun(function(){div.removeShadow()},2000);_.asyRun(function(){div.remove()},3000);"
            ],
            $memo:"Dependency: linb.UI.Shadow."
        },
        addClass:{
            $desc:"To add a specified class name to each of the current elements.",
            $rtn:"[self]",
            $paras:[
                "name [Required] : String, class name."
            ],
            $snippet:[
                "var n=linb('logo');alert(n.attr('className'));n.addClass('cls');alert(n.attr('className'));n.removeClass('cls');alert(n.attr('className'));"
            ]
        },
        removeClass:{
            $desc:"To remove a specified class name from each of the current elements.",
            $rtn:"[self]",
            $paras:[
                "name [Required] : String, class name."
            ],
            $snippet:[
                "var n=linb('logo');alert(n.attr('className'));n.addClass('cls');alert(n.attr('className'));n.removeClass('cls');alert(n.attr('className'));"
            ]
        },
        hasClass:{
            $desc:"Returns true if the specified class name is present on the first element.",
            $rtn:"Bool",
            $paras:[
                "name [Required] : String, class name."
            ],
            $snippet:[
                "var n=linb('logo');alert(n.attr('className'));alert(n.hasClass('linb-div'));alert(n.hasClass('cls'));"
            ]
        },
        replaceClass:{
            $desc:"To replace the className attribute for each of the current elements.",
            $rtn:"[self]",
            $paras:[
                "regexp [Required] : Regexp object.",
                "replace [Required] : String."
            ],
            $snippet:[
                "var n=linb('logo');alert(n.attr('className'));n.replaceClass(/ui/,'cls');alert(n.attr('className'));n.replaceClass(/cls/,'ui');"
            ]
        },
        tagClass:{
            $desc:"Copies each of the class names(from 'className' property) on the each of elements, adds a tag string to each of those copies, and sets all the [original names + copies] back(set back to 'className' property). Or, clears(reverses) those copied css calss names on the each of elements according to a given tag name.",
            $rtn:"[self]",
            $paras:[
                "tag [Required] : String, tag name.",
                "isAdd [Optional] : Bool, adds or removes. Default is [true]."
            ],
            $snippet:[
                "var n=linb('logo');n.tagClass('-checked').tagClass('-mouseover');alert(n.attr('className')); n.tagClass('-checked',false).tagClass('-mouseover',false);alert(n.attr('className'));"
            ]
        },
        append:{
            $desc:"Appends a linb.Dom object(including a set of DOM elements or linb.UIProile objects) to the inside of the first element.",
            $rtn:"[self]",
            $paras:[
                "target [Required] : a linb.Dom object(including a set of DOM elements or linb.UIProile objects)."
            ],
            $snippet:[
            "var id='linb.temp.1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "linb(id).append(linb.create('1',true));"+
            "linb(id).append(new linb.UI.Button({position:'relative'}));"+
            "linb(id).append(linb.create('3',true));"+
            "}"
            ]
        },
        prepend:{
            $desc:"Prepends a linb.Dom object(including a set of DOM elements or linb.UIProile objects) to the inside of the first element.",
            $rtn:"[self]",
            $paras:[
                "target [Required] : a linb.Dom object(including a set of DOM elements or linb.UIProile objects)."
            ],
            $snippet:[
            "var id='linb.temp.2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "linb(id).prepend(linb.create('1',true));"+
            "linb(id).prepend(new linb.UI.Button({position:'relative'}));"+
            "linb(id).prepend(linb.create('3',true));"+
            "}"
            ]
        },
        addPrev:{
            $desc:"Adds a linb.Dom object(including a set of DOM elements or linb.UIProile objects) to the previous position of the first element.",
            $rtn:"[self]",
            $paras:[
                "target [Required] : a linb.Dom object(including a set of DOM elements or linb.UIProile objects)."
            ],
            $snippet:[
            "var id='linb.temp.3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "var node = linb(id).last();"+
            "node.addPrev(linb.create('1',true));"+
            "node.addPrev(new linb.UI.Button({position:'relative'}));"+
            "node.addPrev(linb.create('3',true));"+
            "}"
            ]
        },
        addNext:{
            $desc:"Adds a linb.Dom object(including a set of DOM elements or linb.UIProile objects) to the following position of the first element.",
            $rtn:"[self]",
            $paras:[
                "target [Required] : a linb.Dom object(including a set of DOM elements or linb.UIProile objects)."
            ],
            $snippet:[
            "var id='linb.temp.4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "var node = linb(id).last();"+
            "node.addNext(linb.create('1',true));"+
            "node.addNext(new linb.UI.Button({position:'relative'}));"+
            "node.addNext(linb.create('3',true));"+
            "}"
            ]
        },
        offset:{
            $desc:"Gets(the first element)/Sets(all elements) the offset relative to the boundary.",
            $rtn:"{left:value,top:value}/[self]",
            $paras:[
                "pos [Optional] : {left:value,top:value}, the target abs position.",
                "boundary [Optional] : the boundary (DOM element or document.body). Default is document.body."
            ],
            $snippet:[
                "alert(_.serialize(linb(this).offset()));alert(_.serialize(linb(this).offset()));",
                "var n=linb(this),pos=n.offset(); pos.top+=20; n.css('position','relative').offset(pos); _.asyRun(function(){n.css({top:'',position:''})},1000)"
            ]
        },
        cssPos:{
            $desc:"Gets(the first element)/Sets(all elements) the css offset.",
            $rtn:"{left:value,top:value}/[self]",
            $paras:[
                "pos [Optional] : {left:value,top:value}, the target abs position.",
                "flag [Optional] : Bool, to trigger element onLocation event. Default is false."
            ],
            $snippet:[
                "var n=linb(this),pos=n.cssPos(); pos.top+=20;pos.left+=20; n.css('position','relative').cssPos(pos); n.onLocation(function(){linb.message('Fired onlocation event')});pos.top+=20;pos.left+=20; n.cssPos(pos,true); _.asyRun(function(){n.css({top:'',position:''}).onLocation(null)},1000)"
            ]
        },
        animate:{
            $desc:"Wraps a 'Special Effects' animation into a linb.Thread object(shell thread).",
            $rtn:"linb.Thread object",
            $paras:[
                "args [Required] : Object[Key/value([from value, to value]) pairs] .",
                "onStart [Optional]: Function, arguments: [threadid]. this function will be called before the shell thread triggered the first task.",
                "onEnd [Optional]: Function, arguments: [threadid]. this function will be called after the shell thread finishes the last task.",
                "time [Optional]: Number(ms), the duration of this animation. Default is 200.",
                "step [Optional]: Number, the step number of this animation. Default is 5.",
                "type [Optional]: String, the type. Default is 'line'.",
                "threadid [Optional]: String, Assigns an unique id to the shell thread object."
            ],
            $snippet:[
                "var node=linb.create('div').css({opacity:0,zIndex:linb.Dom.TOP_ZINDEX, backgroundColor:'#0000ff', position:'absolute',left:'100px', top:'100px',width:'100px',height:'100px'});"+
                "linb('body').append(node);"+
                "var fx1 = node.animate({opacity:[0,1]},null,null,1000,10,'insine');"+
                "var fx2 = node.animate({left:[100,300],top:[100,300]},null,null,500,20,'outsine');"+
                "var fx3 = node.animate({left:[300,100],top:[300,100]});"+
                "var fx4 = node.animate({opacity:[1,0]},null,function(){node.remove()});"+
                "fx1.links(fx2.links(fx3.links(fx4))).start();"
            ]
        },
        attr:{
            $desc:"Gets a property on the first element, or sets a property(or key/value object as properties) to all elements, or removes a property from all elements.",
            $rtn:"Gets:property value; Sets:[self]; Removes:[self].",
            $paras:[
                "name [Required] : property name or a key/value object as properties.",
                "value [Optional] : property value, [null] for 'remove'."
            ],
            $snippet:[
                "var n=linb('logo'); alert(n.attr('style')); alert(n.attr('tagName')); alert(n.attr('className'));",
                "var n=linb('logo'); n.attr('abc','abc'); alert(n.attr('abc')); n.attr('abc',null);  n.attr('tagName',null); alert(n.attr('abc'));",
                "var n=linb('logo'); n.attr('onclick',function(){alert('hi')}); _.asyRun(function(){n.attr('onclick',null)},5000); ",
                "var n=linb('logo'); n.attr({a:'a',b:'b'}); alert(n.attr('a')); n.attr({a:null,b:null}); alert(n.attr('a'));"
            ]
        },
        caret:{
            $desc:"Gets or sets Caret position in the first element ( must be an Input or Textarea element).",
            $rtn:"Gets: Array [begin position, end position]; Sets: [self]",
            $paras:[
                "begin [Optional] : Number, the Caret begin position.",
                "end [Optional] : Number, the Caret end position."
            ],
            $snippet:[
                "var id='linb.temp.caret'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\">' + '<input id='+id+'1 value=0123456789/><'+'textarea id='+id+'2></'+'textarea><br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id+'2').attr('value','1111\\n2222\\n3333\\n4444');_.asyRun(function(){linb(id+'1').caret(2,6);alert(linb(id+'1').caret());linb(id+'2').caret(2,16);alert(linb(id+'2').caret());},1000)"+
                "}"
            ]
        },
        children:{
            $desc:"Gets a set of elements containing all of the immediate children of all elements.",
            $rtn:"linb.Dom object including all children elements.",
            $snippet:[
                "var id='linb.temp.children'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<input/><input/><div style=\"padding:5px;\"><input/><input/></div> <br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id).children().css('border','solid 4px')"+
                "}"
            ]
        },
        width:{
            $desc:"Gets(the first element) or sets(all elements) the css width value.",
            $rtn:"Gets: Number; Sets:[self].",
            $paras:[
                "value [Optional] : Number."
            ],
            $snippet:[
                "var id='linb.temp.w1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var n=linb(id); n.width(20).height(20); alert(n.width()+':'+n.innerWidth()+':'+n.offsetWidth()+':'+n.outerWidth()+':'+n.scrollWidth());"+
                "}"
            ]
        },
        scrollWidth:{
            $desc:"Gets(the first element) the scroll width.",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.w2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var n=linb(id); n.width(20).height(20); alert(n.width()+':'+n.innerWidth()+':'+n.offsetWidth()+':'+n.outerWidth()+':'+n.scrollWidth());"+
                "}"
            ]
        },
        innerWidth:{
            $desc:"Gets(the first element) or sets(all elements) the inner width(includes the padding).",
            $rtn:"Gets: Number; Sets:[self].",
            $paras:[
                "value [Optional] : Number."
            ],
            $snippet:[
                "var id='linb.temp.w3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var n=linb(id); n.innerWidth(40).innerHeight(40); alert(n.width()+':'+n.innerWidth()+':'+n.offsetWidth()+':'+n.outerWidth()+':'+n.scrollWidth());"+
                "}"
            ]
        },
        offsetWidth:{
            $desc:"Gets(the first element) or sets(all elements) the offset width(includes the padding and border).",
            $rtn:"Gets: Number; Sets:[self].",
            $paras:[
                "value [Optional] : Number."
            ],
            $snippet:[
                "var id='linb.temp.w4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var n=linb(id); n.offsetWidth(60).offsetHeight(60); alert(n.width()+':'+n.innerWidth()+':'+n.offsetWidth()+':'+n.outerWidth()+':'+n.scrollWidth());"+
                "}"
            ]
        },
        outerWidth:{
            $desc:"Gets(the first element) or sets(all elements) the outer width(includes the padding, border and margin).",
            $rtn:"Gets: Number; Sets:[self].",
            $paras:[
                "value [Optional] : Number."
            ],
            $snippet:[
                "var id='linb.temp.w5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var n=linb(id); n.outerWidth(80).outerHeight(80); alert(n.width()+':'+n.innerWidth()+':'+n.offsetWidth()+':'+n.outerWidth()+':'+n.scrollWidth());"+
                "}"
            ]
        },

        height:{
            $desc:"Gets(the first element) or sets(all elements) the css height value.",
            $rtn:"Gets: Number; Sets:[self].",
            $paras:[
                "value [Optional] : Number."
            ],
            $snippet:[
                "var id='linb.temp.w6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var n=linb(id); n.width(20).height(20); alert(n.height()+':'+n.innerHeight()+':'+n.offsetHeight()+':'+n.outerHeight()+':'+n.scrollHeight());"+
                "}"
            ]
        },
        scrollHeight:{
            $desc:"Gets(the first element) the scroll height.",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.w7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var n=linb(id); n.width(20).height(20); alert(n.height()+':'+n.innerHeight()+':'+n.offsetHeight()+':'+n.outerHeight()+':'+n.scrollHeight());"+
                "}"
            ]
        },
        innerHeight:{
            $desc:"Gets(the first element) or sets(all elements) the inner height(includes the padding).",
            $rtn:"Gets: Number; Sets:[self].",
            $paras:[
                "value [Optional] : Number."
            ],
            $snippet:[
                "var id='linb.temp.w8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var n=linb(id); n.innerWidth(40).innerHeight(40); alert(n.height()+':'+n.innerHeight()+':'+n.offsetHeight()+':'+n.outerHeight()+':'+n.scrollHeight());"+
                "}"
            ]
        },
        offsetHeight:{
            $desc:"Gets(the first element) or sets(all elements) the offset height(includes the padding and border).",
            $rtn:"Gets: Number; Sets:[self].",
            $paras:[
                "value [Optional] : Number."
            ],
            $snippet:[
                "var id='linb.temp.w9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var n=linb(id); n.offsetWidth(60).offsetHeight(60); alert(n.height()+':'+n.innerHeight()+':'+n.offsetHeight()+':'+n.outerHeight()+':'+n.scrollHeight());"+
                "}"
            ]
        },
        outerHeight:{
            $desc:"Gets(the first element) or sets(all elements) the outer height(includes the padding, border and margin).",
            $rtn:"Gets: Number; Sets:[self].",
            $paras:[
                "value [Optional] : Number."
            ],
            $snippet:[
                "var id='linb.temp.w11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var n=linb(id); n.outerWidth(80).outerHeight(80); alert(n.height()+':'+n.innerHeight()+':'+n.offsetHeight()+':'+n.outerHeight()+':'+n.scrollHeight());"+
                "}"
            ]
        },
        clone:{
            $desc:"Creates copies of the set of elements.",
            $rtn:"linb.Dom object including the copied nodes.",
            $paras:[
                "deep [Optional] : Bool. This parameter indicates if the cloned node should include all child elementes of the original element. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.w11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div id='+id+' style=\"background:#ccc;border:solid 1px;padding:10px;\"><div style=\"background:#fff;border:solid 1px;padding:10px;\">inner<input /></div>outer</div> <br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var n=linb(id); n.parent().append(n.clone()).append(n.clone(true))"+
                "}"
            ]
        },
        css:{
            $desc:"Gets a css property on the first element, or sets a css property(or key/value object as css properties) to all elements.",
            $rtn:"Gets:String, property value; Sets:[self].",
            $paras:[
                "name [Required] : css property name or a key/value object as css properties.",
                "value [Optional] : css property value."
            ],
            $snippet:[
                "var n=linb('logo'); alert(n.css('background')); alert(n.css('overflow')); alert(n.css('top'));",
                "var n=linb('logo'); n.css('right','30px'); _.asyRun(function(){n.css('right','0')},1000)",
                "var n=linb('logo'); n.css({top:'30px',right:'30px'}); _.asyRun(function(){n.css({top:0,right:0})},1000)"
            ]
        },
        cssPos:{
            $desc:"Gets or sets css left and top properties on the first element.",
            $rtn:"Gets: {left:Number,top:Number}; Sets:[self].",
            $paras:[
                "pos [Optional] : {left:Number or String,top:Number or String}.",
                "triggerEvent [Optional] : Bool, indicates if the 'set' action trigger related event or not."

            ],
            $snippet:[
                "var n=linb('logo'); n.cssPos({left:100,top:100}); alert(_.serialize(n.cssPos())); n.cssPos({left:'auto',top:'auto'})"
            ]
        },
        cssSize:{
            $desc:"Gets or sets css width and height properties on the first element.",
            $rtn:"Gets:{width:Number,height:Number}; Sets:[self].",
            $paras:[
                "value [Optional] : {width:Number or String,height:Number or String}.",
                "triggerEvent [Optional] : Bool, indicates if the 'set' action trigger related event or not."
            ],
            $snippet:[
                "var n=linb('logo'), bak=n.cssSize(); n.cssSize({width:50,height:50}); alert(_.serialize(n.cssSize())); n.cssSize(bak)"
            ]
        },
        cssRegion:{
            $desc:"Gets or sets css region properties on the first element.",
            $rtn:"Gets:{left:Number,top:Number,width:Number,height:Number}; Sets:[self].",
            $paras:[
                "value [Optional] : {left:Number or String,top:Number or String,right:Number or String,bottom:Number or String,width:Number or String,height:Number or String}.",
                "triggerEvent [Optional] : Bool, indicates if the 'set' action trigger related event or not."
            ],
            $snippet:[
                "var n=linb('logo'),bak=n.cssRegion(); n.cssRegion({left:100,top:100,width:50,height:50}); alert(_.serialize(n.cssRegion())); bak.left=bak.top='auto'; n.cssRegion(bak);"
            ]
        },
        query:{
            $desc:"Searches for all elements that match the specified parameters.",
            $rtn:"linb.Dom object.",
            $paras:[
                "tagName [Optional] : DOM element tagName.",
                "property [Optional] : DOM element property name or function.",
                "expr [Optional] : DOM element property value or an regexp."
            ],
            $snippet:[
                "var id='linb.temp.query'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<div id=id1 style=\"border:solid 1px;padding:5px;\"><div style=\"border:solid 1px;padding:5px;\"> <input /><input /></div></div>  <button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var n=linb(id); alert(n.outerHTML());alert(n.query().get().length); alert(n.query('div').get().length); alert(n.query('div','id').get().length); alert(n.query('div','id',id).get().length); alert(n.query('*','id',/^id/).get().length); alert(n.query('*',function(o){return o.tagName=='INPUT'}).get().length);"+
                "}"
            ]
        },
        startDrag:{
            $desc:"Starts to drag the first element.",
            $rtn:"[self]",
            $paras:[
                "e [Required] : DOM [event] object.",
                "profile [Optional] : key/value object. Go <strong>linb.DragDrop.startDrag</strong> for the profile struct detail.",
                "dragKey [Optional] : String, dragKey for drag data.",
                "dragData [Optional] : Any, the dragged [data]."
            ],
            $snippet:[
                "var id='linb.temp.dd0'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\"><button id='+id+'>drag me</button>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id).onMousedown(function(p,e,s){linb([this]).startDrag(e)})"+
                "}"
            ],
            $memo:"Dependency: linb.DragDrop."
        },
        dragable:{
            $desc:"Enables/Disables the draggable functionality on the set of elements.",
            $rtn:"[self]",
            $paras:[
                "flag [Required] : Bool. [true]: enables draggable functionality; [false]: disables draggable functionality. Default is [true]",
                "profile [Optional] : key/value object. Go <strong>linb.DragDrop.startDrag</strong> for the profile struct detail.",
                "key [Optional] : String, the [key] for drag data.",
                "data [Optional] : Any, the dragged [data]."
            ],
            $snippet:[
                "var id='linb.temp.dd_a'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:80px;\">' + '<div id='+id+'a style=\"background:#ccc;position:absolute;border:solid 1px;padding:15px;left:10px;top:30px;\">1</div>' + '<div id='+id+'b style=\"background:#ccc;position:absolute;border:solid 1px;padding:15px;left:50px;top:30px;\">2</div>'+ '<div id='+id+'c style=\"background:#ccc;position:absolute;border:solid 1px;padding:15px;left:100px;top:30px;\">3</div>'+ '<div id='+id+'d style=\"background:#ccc;position:absolute;border:solid 1px;padding:15px;left:150px;top:30px;\">4</div>'+ '<div id='+id+'e style=\"background:#ccc;position:absolute;border:solid 1px;padding:15px;left:200px;top:30px;\">5</div>'+ '<div id='+id+'f style=\"background:#ccc;position:absolute;border:solid 1px;padding:15px;left:250px;top:30px;\">6</div>'+ '<div id='+id+'g style=\"background:#ccc;position:absolute;border:solid 1px;padding:15px;left:300px;top:30px;\">7</div>'+ '<div id='+id+'h style=\"background:#ccc;position:absolute;border:solid 1px;padding:15px;left:350px;top:30px;\">8</div>'+ '<div id='+id+'i style=\"background:#ccc;position:absolute;border:solid 1px;padding:15px;left:400px;top:30px;\">9</div>'+ ' <button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));" +
                "var a=[0,200,400,600,800,1000,1200,1400];"+
                "linb(id+'a').dragable(true,{dragType:'move'});" +
                "linb(id+'b').dragable(true,{dragType:'copy',targetReposition:false});"+
                "linb(id+'c').dragable(true,{dragType:'icon',shadowFrom:id+'c'});"+
                "linb(id+'d').dragable(true,{dragType:'shape',targetReposition:false});"+
                "linb(id+'e').dragable(true,{dragDefer:20,targetReposition:false});"+
                "linb(id+'f').dragable(true,{xMagneticLines:a,yMagneticLines:a,magneticDistance:50,targetReposition:false});"+
                "linb(id+'g').dragable(true,{widthIncrement:50,heightIncrement:50,targetReposition:false});"+
                "linb(id+'h').dragable(true,{verticalOnly:true,targetReposition:false});"+
                "linb(id+'i').dragable(true,{maxLeftOffset:50,maxTopOffset:50,maxRightOffset:50,maxBottomOffset:50,targetReposition:false});"+
                "}"
            ],
            $memo:"Dependency: linb.DragDrop."
        },
        dropable:{
            $desc:"Enables/Disables the dropable functionality on the set of elements.",
            $rtn:"[self]",
            $paras:[
                "flag [Required] : Bool. [true]: enables dropable functionality; [false]: disables dropable functionality. Default is [true]",
                "key [Required] : String, the [key] for dropable data. Default is 'default'."
            ],
            $snippet:[
                "var id='linb.temp.dd2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:150px;\">' + '<div style=\"position:absolute;border:solid 1px;padding:20px;left:10px;top:30px;\">dragable</div>' +'<div style=\"position:absolute;border:solid 1px;left:160px;top:30px;width:100px;height:100px;\">dropable</div>' + ' <button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var n=linb(id); n.first().dragable(true,{dragType:'icon'},'key1','data1').next().dropable(true,'key1').onDrop(function(){alert(linb.DragDrop.getProfile().dragData);})"+
                "}"
            ],
            $memo:"Dependency: linb.DragDrop."
        },
        empty:{
            $desc:"Removes all child nodes from the set of elements.",
            $rtn:"[self]",
            $paras:[
                "triggerGC [Optional] : Bool, indicates if trigger GC function."
            ],
            $snippet:[
                "var id='linb.temp.empty'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:20px;position:relative;height:150px;\">' + '<div id='+id+' style=\"position:absolute;border:solid 1px;padding:20px;left:10px;top:30px;\">content in div<br /><button onclick=\"linb(\\\''+id+'\\\').empty()\">Empty me</button></div>'+ '<button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "}"
            ]
        },
        remove:{
            $desc:"Removes the set of elements from DOM.",
            $rtn:"[self]",
            $paras:[
                "triggerGC [Optional] : Bool, indicates if trigger GC function."
            ],
            $snippet:[
                "var id='linb.temp.empty'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\">content in div'+ '<button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "}"
            ]
        },
        replace:{
            $desc:"Replaces the first element with a set of elements.",
            $rtn:"the target objectt.",
            $paras:[
                "target [Required] : linb.Dom object including the target elements.",
                "triggerGC [Optional] : Bool, indicates if trigger GC function."
            ],
            $snippet:[
                "var id='linb.temp.replace'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\"><div id='+id+' style=\"border:solid 1px;padding:5px;\"></div>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "_.asyRun(function(){ linb(id).replace(linb.create('a<input value=b />c<input value=d />e')) },1000)"+
                "}"
            ]
        },
        swap:{
            $desc:"Swaps the first element with the target element.",
            $rtn:"[self]",
            $paras:[
                "target [Required] : linb.Dom object including the target element."
            ],
            $snippet:[
                "var id='linb.temp.replace'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div  style=\"border:solid 1px;padding:10px;\"><div id='+id+'1  style=\"border:solid 1px;padding:5px;\">1</div><div id='+id+'2 style=\"border:solid 1px;padding:5px;\">2</div>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "_.asyRun(function(){ linb(id+'1').swap( linb(id+'2') ) },1000);_.asyRun(function(){ linb(id+'1').swap( linb(id+'2') ) },2000);"+
                "}"
            ]
        },
        setInlineBlock:{
            $desc:"For cross-browser setting the set of elements css display property to 'inline' mode. ",
            $rtn:"[self]",
            $snippet:[
                "var id='linb.temp.sib'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div  style=\"border:solid 1px;padding:10px;\"><div id='+id+'  style=\"border:solid 1px;padding:5px;\">1</div>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "_.asyRun(function(){ linb(id).setInlineBlock()  },1000);_.asyRun(function(){ linb(id).css('display','') },2000);"+
                "}"
            ]
        },
        setSelectable:{
            $desc:"Enables or disables selectable functionality on the set of elements.",
            $rtn:"[self]",
            $paras:[
                "value [Optional] : Bool. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ssable'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div  style=\"border:solid 1px;padding:10px;\"><div id='+id+'1  style=\"border:solid 1px;padding:5px;\">selectable</div><div id='+id+'2 style=\"border:solid 1px;padding:5px;\">not selectable</div>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id+'1').setSelectable(true);linb(id+'2').setSelectable(false);"+
                "}"
            ]
        },
        first:{
            $desc:"Get a set of elements containing the first child of each of the given set of elements.",
            $rtn:"linb.Dom object",
            $paras:[
                "index [Optional] : Number, iterator index."
            ],
            $snippet:[
                "var id='linb.temp.first'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\"><div style=\"border:solid 1px;padding:5px;\">1<div style=\"border:solid 1px;padding:5px;\">2<div style=\"border:solid 1px;padding:5px;\">3<div style=\"border:solid 1px;padding:5px;\">4</div></div></div>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id).first().css('background','#eee');linb(id).first(2).css('background','#ccc');linb(id).first(3).css('background','#888');linb(id).first(4).css('background','#444');"+
                "}"
            ]
        },
        parent:{
            $desc:"Get a set of elements containing the parent node of each of the given set of elements.",
            $rtn:"linb.Dom object",
            $paras:[
                "index [Optional] : Number, iterator index."
            ],
            $snippet:[
                "var id='linb.temp.parent'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\"><div style=\"border:solid 1px;padding:5px;\">1<div style=\"border:solid 1px;padding:5px;\">2<div style=\"border:solid 1px;padding:5px;\">3<div style=\"border:solid 1px;padding:5px;\" id='+id+' >4</div></div></div>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id).parent(4).css('background','#eee');linb(id).parent(3).css('background','#ccc');linb(id).parent(2).css('background','#888');linb(id).parent().css('background','#444');"+
                "}"
            ]
        },
        last:{
            $desc:"Get a set of elements containing the last child of each of the given set of elements.",
            $rtn:"linb.Dom object",
            $paras:[
                "index [Optional] : Number, iterator index."
            ],
            $snippet:[
                "var id='linb.temp.last'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\"><button onclick=\"linb(this).parent().remove()\">remove this example</button><div style=\"border:solid 1px;padding:5px;\">1<input /><div style=\"border:solid 1px;padding:5px;\">2<input /><div style=\"border:solid 1px;padding:5px;\">3<input /><div style=\"border:solid 1px;padding:5px;\">4</div></div></div></div></div>'));"+
                "linb(id).last().css('background','#eee');linb(id).last(2).css('background','#ccc');linb(id).last(3).css('background','#888');linb(id).last(4).css('background','#444');"+
                "}"
            ]
        },
        prev:{
            $desc:"Get a set of elements containing the previous siblings of each of the given set of elements.",
            $rtn:"linb.Dom object",
            $paras:[
                "index [Optional] : Number, iterator index."
            ],
            $snippet:[
                "var id='linb.temp.prev'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\"><div style=\"border:solid 1px;padding:5px;\">1</div><div style=\"border:solid 1px;padding:5px;\">2</div><div style=\"border:solid 1px;padding:5px;\">3</div><div style=\"border:solid 1px;padding:5px;\">4</div><button onclick=\"linb(this).parent().remove()\">remove this example</button></div>'));"+
                "linb(id).last().prev().css('background','#eee');linb(id).last().prev(2).css('background','#ccc');linb(id).last().prev(3).css('background','#888');linb(id).last().prev(4).css('background','#444');"+
                "}"
            ]
        },
        next:{
            $desc:"Get a set of elements containing the next siblings of each of the given set of elements.",
            $rtn:"linb.Dom object",
            $paras:[
                "index [Optional] : Number, iterator index."
            ],
            $snippet:[
                "var id='linb.temp.next'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\"><button onclick=\"linb(this).parent().remove()\">remove this example</button><div style=\"border:solid 1px;padding:5px;\">1</div><div style=\"border:solid 1px;padding:5px;\">2</div><div style=\"border:solid 1px;padding:5px;\">3</div><div style=\"border:solid 1px;padding:5px;\">4</div></div>'));"+
                "linb(id).first().next().css('background','#eee');linb(id).first().next(2).css('background','#ccc');linb(id).first().next(3).css('background','#888');linb(id).first().next(4).css('background','#444');"+
                "}"
            ]
        },
        focus:{
            $desc:"Sets focus to the first element, if it's can be focused.",
            $rtn:"[self]",
            $paras:[
                "force [Optional] : Bool, force to set focus."
            ],
            $snippet:[
                "var id='linb.temp.1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id).last().focus()"+
                "}"
            ]
        },
        leftBy:{
            $desc:"Changes the css left property by a specified offset value.",
            $rtn:"[self]",
            $paras:[
                "offset [Required] : Number, the offset value.",
                "triggerEvent [Optional] : Bool, indicates if the 'set' action trigger related event or not."
            ],
            $snippet:[
                "var id='linb.temp.leftBy'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"position:relative;height:50px;border:solid 1px;padding:10px;\"><input style=\"position:absolute;left:0;top:0;\" id='+id+' />' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "_.asyRun(function(){linb(id).leftBy(10)},500);_.asyRun(function(){linb(id).leftBy(10)},1000); _.asyRun(function(){linb(id).leftBy(10)},1500);_.asyRun(function(){linb(id).leftBy(10)},2000);"+
                "}"
            ]
        },
        topBy:{
            $desc:"Changes the css top property by a specified offset value.",
            $rtn:"[self]",
            $paras:[
                "offset [Required] : Number, the offset value.",
                "triggerEvent [Optional] : Bool, indicates if the 'set' action trigger related event or not."
            ],
            $snippet:[
                "var id='linb.temp.topBy'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"position:relative;height:50px;border:solid 1px;padding:10px;\"><input style=\"position:absolute;left:0;top:0;\" id='+id+' />' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "_.asyRun(function(){linb(id).topBy(10)},500);_.asyRun(function(){linb(id).topBy(10)},1000); _.asyRun(function(){linb(id).topBy(10)},1500);_.asyRun(function(){linb(id).topBy(10)},2000);"+
                "}"
            ]
        },
        widthBy:{
            $desc:"Changes the css width property by a specified offset value.",
            $rtn:"[self]",
            $paras:[
                "offset [Required] : Number, the offset value.",
                "triggerEvent [Optional] : Bool, indicates if the 'set' action trigger related event or not."
            ],
            $snippet:[
                "var id='linb.temp.widthBy'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"position:relative;height:50px;border:solid 1px;padding:10px;\"><input style=\"position:absolute;left:0;top:0;\" id='+id+' />' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "_.asyRun(function(){linb(id).widthBy(10)},500);_.asyRun(function(){linb(id).widthBy(10)},1000); _.asyRun(function(){linb(id).widthBy(10)},1500);_.asyRun(function(){linb(id).widthBy(10)},2000);"+
                "}"
            ]
        },
        heightBy:{
            $desc:"Changes the css height property by a specified offset value.",
            $rtn:"[self]",
            $paras:[
                "offset [Required] : Number, the offset value.",
                "triggerEvent [Optional] : Bool, indicates if the 'set' action trigger related event or not."
            ],
            $snippet:[
                "var id='linb.temp.heightBy'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"position:relative;height:50px;border:solid 1px;padding:10px;\"><input style=\"position:absolute;left:0;top:0;\" id='+id+' />' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "_.asyRun(function(){linb(id).heightBy(10)},500);_.asyRun(function(){linb(id).heightBy(10)},1000); _.asyRun(function(){linb(id).heightBy(10)},1500);_.asyRun(function(){linb(id).heightBy(10)},2000);"+
                "}"
            ]
        },
        hide:{
            $desc:"To hide the set of elements.",
            $rtn:"[self]",
            $snippet:[
                "linb('logo').hide(); _.asyRun(function(){linb('logo').show()},1000);"
            ]
        },
        show:{
            $desc:"To show the set of elements.",
            $rtn:"[self]",
            $paras:[
                "left [Optional] : Number, the css left value.",
                "top [Optional] : Number, the css top value."
            ],
            $snippet:[
                "linb('logo').hide(); _.asyRun(function(){linb('logo').show()},1000);"
            ]
        },
        text:{
            $desc:"Gets the text contents of the first element, or sets the text contents to the set of elements.",
            $rtn:"Gets: String, Sets: [self].",
            $paras:[
                "content [Optional] : String, text content."
            ],
            $snippet:[
                "var id='linb.temp.text'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\"><div style=\"padding:5px;border:solid 1px;\" id='+id+' ></div>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id).text('<input />'); alert(linb(id).text());"+
                "}"
            ]
        },
        html:{
            $desc:"Gets/sets the html contents (innerHTML) of the first element.",
            $rtn:"Gets: String, Sets: [self].",
            $paras:[
                "content [Optional] : String, innerHTML content.",
                "triggerGC [Optional] : Bool, indicates if trigger GC function."
            ],
            $snippet:[
                "var id='linb.temp.html1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\"><div style=\"padding:5px;border:solid 1px;\" id='+id+' ></div>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id).html('<input />'); alert(linb(id).html());"+
                "}"
            ]
        },
        outerHTML:{
            $desc:"Gets/sets the html contents (outerHTML) of the first element.",
            $rtn:"Gets: String, Sets: [self].",
            $paras:[
                "content [Optional] : String, outerHTML content.",
                "triggerGC [Optional] : Bool, indicates if trigger GC function."
            ],
            $snippet:[
                "var id='linb.temp.html1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\"><div style=\"padding:5px;border:solid 1px;\" id='+id+' ></div>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id).outerHTML('<div style=\"padding:5px;border:dashed 2px;\" id='+id+' ><input /></div>'); alert(linb(id).outerHTML());"+
                "}"
            ]
        },
        id:{
            $desc:"Gets(the first element) or sets(the set of elements) DOM id.",
            $rtn:"Gets: String; Sets: [self].",
            $paras:[
                "value [Optional] : String, DOM id value.",
                "ignoreCache [Optional] : Bool, indicates if ignore to reset cache. Default is [false]"
            ],
            $snippet:[
                "var n=linb('logo'); n.id('logo2'); alert(n.id()); n.id('logo');"
            ]
        },
        fixPng:{
            $desc: "To fix the png problem in IE 6.",
            $memo:"Only for IE6."
        },
        ieRemedy:{
            $desc: "To trigger DOM element inner redraw function in IE."+
                " For some old IE versions, that did not trigger layout when one dimension is changed (e.g. to change css height only with overflow='visible'.",
            $memo:"Only for IE."
        },
        scrollLeft:{
            $desc:"Gets(the first element) or sets(all elements) the scrollLeft value.",
            $rtn:"Gets: Number; Sets:[self].",
            $paras:[
                "value [Optional] : Number."
            ],
            $snippet:[
                "var id='linb.temp.scrollLeft'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"position:relative; border:solid 1px;padding:10px;\"><div style=\"overflow:auto; width:50px;height:50px;\" id='+id+' />aaaaaaaaaaaaa bbbbbbbbbbb cccccccccc dddddddd</div>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id).scrollLeft(linb(id).scrollWidth()); alert(linb(id).scrollLeft())"+
                "}"
            ]
        },
        scrollTop:{
            $desc:"Gets(the first element) or sets(all elements) the scrollTop value.",
            $rtn:"Gets: Number; Sets:[self].",
            $paras:[
                "value [Optional] : Number."
            ],
            $snippet:[
                "var id='linb.temp.scrollTop'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"position:relative; border:solid 1px;padding:10px;\"><div style=\"overflow:auto; width:50px;height:50px;\" id='+id+' />aaaaaaaaaaaaa bbbbbbbbbbb cccccccccc dddddddd</div>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id).scrollTop(linb(id).scrollHeight()); alert(linb(id).scrollTop())"+
                "}"
            ]
        },

        left:{
            $desc:"Gets(the first element) or sets(all elements) the css left value.",
            $rtn:"Gets: Number; Sets:[self].",
            $paras:[
                "value [Optional] : Number."
            ],
            $snippet:[
                "var id='linb.temp.left'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"position:relative;height:50px;border:solid 1px;padding:10px;\"><input style=\"position:absolute;left:0;top:0;\" id='+id+' />' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "_.asyRun(function(){linb(id).left(10)},1000);_.asyRun(function(){linb(id).left(20)},2000); _.asyRun(function(){linb(id).left(30)},3000);"+
                "}"
            ]
        },
        top:{
            $desc:"Gets(the first element) or sets(all elements) the css top value.",
            $rtn:"Gets: Number; Sets:[self].",
            $paras:[
                "value [Optional] : Number."
            ],
            $snippet:[
                "var id='linb.temp.top'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"position:relative;height:50px;border:solid 1px;padding:10px;\"><input style=\"position:absolute;left:0;top:0;\" id='+id+' />' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "_.asyRun(function(){linb(id).top(10)},1000);_.asyRun(function(){linb(id).top(20)},2000); _.asyRun(function(){linb(id).top(30)},3000);"+
                "}"
            ]
        },
        nextFocus:{
            $desc:"To get or set the next 'should be' focus(element).",
            $rtn:"linb.Dom object including the next focus DOM element.",
            $paras:[
                "downwards [Optional] : Bool, to indicate the 'next' is downwards([true]) or upwards([false]). Default is [true].",
                "includeChild [Optional] : Bool, to indicate if the function to search the children elements. Default is [true].",
                "setFocus [Optional] : Bool, to indicate if the function to set the focus to the result element. Default is [true]."
            ],
            $snippet:[
                "var id='linb.temp.nextFocus'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"position:relative;height:50px;border:solid 1px;padding:10px;\"><input value=upwards /><input id='+id+' /><button>downwards</button>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "_.asyRun(function(){linb(id).nextFocus()},1000);_.asyRun(function(){linb(id).nextFocus(false)},2000);"+
                "}"
            ]
        },
        offsetLeft:{
            $desc:"Gets the offsetLeft property of the first element.",
            $rtn:"Number",
            $snippet:[
                "alert(this.offsetLeft())"
            ]
        },
        offsetTop:{
            $desc:"Gets the offsetTop property of the first element.",
            $rtn:"Number",
            $snippet:[
            "alert(this.offsetTop())"
            ]
        },

        afterBlur:{},
        afterChange:{},
        afterClick:{
            $snippet:[
            "var id='linb.temp.event'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\"></p><button style=\"height:50px;\" id='+id+'>BUTTON element for testing.</button></p>' + '<br /><br /><button onclick=\"linb(\\\''+id+'\\\').onClick();\">fire event:[onclick] group functions</button> - <button onclick=\"linb(\\\''+id+'\\\').onClick(true);\">fire event: all functions</button> - <button onclick=\"linb(\\\''+id+'\\\').onClick(null,\\\'1#\\\');\">remove [onclick] 1#</button> - <button onclick=\"linb(\\\''+id+'\\\').beforeClick(null);\">remove all [beforeclick] functions</button> - <button onclick=\"linb(\\\''+id+'\\\').onClick(null,null,true);\">remove all functions</button><br /><br /><br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "linb(id).beforeClick(function(){alert('beforeclick 1#')},'1#').beforeClick(function(){alert('beforeclick 2#')},'2#').onClick(function(){alert('onclick 1#')},'1#').onClick(function(){alert('onclick 2#')},'2#').afterClick(function(){alert('afterclick 1#, this function return [false], the remaining functions will be ignored!'); return false;},'1#').afterClick(function(){alert('afterclick 2#')},'2#');"+
            "}"
            ]
        },
        popToTop:{
            $desc:"Pops the first element to the top zIndex into the specified parent element.",
            $rtn:"[self]",
            $paras:[
                "pos [Reqired] : {left:Number,top:Number} object(The css left and top value) or linb.Dom object(for getting position).",
                "type [Optional] : Number, from 1 to 4, pop position type. Default is 1.",
                "parent [Optional] : linb.Dom object. the parent element to hold the pop element. Default is [document.body]."
            ],
            $snippet:[
                "var id='linb.temp.p2p'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"position:relative; border:solid 1px;padding:10px;\"><button id='+id+' style=\"height:100px;width:100px;\">downwards</button>' + '<br /><br /><br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "_.asyRun(function(){if(linb.Dom.byId(id))linb(linb.create('<div style=\"border:solid 1px;background:#ccc;width:50px;height:50px;\">type 1</div>')).popToTop(linb(id),1,linb(id).parent());},500);"+
                "_.asyRun(function(){if(linb.Dom.byId(id))linb(linb.create('<div style=\"border:solid 1px;background:#aaa;width:50px;height:50px;\">type 2</div>')).popToTop(linb(id),2,linb(id).parent());},1000);"+
                "_.asyRun(function(){if(linb.Dom.byId(id))linb(linb.create('<div style=\"border:solid 1px;background:#888;width:50px;height:50px;\">type 3</div>')).popToTop(linb(id),3,linb(id).parent());},1500);"+
                "_.asyRun(function(){if(linb.Dom.byId(id))linb(linb.create('<div style=\"border:solid 1px;background:#666;width:50px;height:50px;\">type 4</div>')).popToTop(linb(id),4,linb(id).parent());},2000);"+
                "}"
            ]
        },
        setBlurTrigger:{
            $desc:"Sets or unsets a special function that will be triggered once when [click event] is fired out of the first element's region.",
            $rtn:"[self]",
            $paras:[
                "id [Required] : String, this trigger's id value.",
                "trigger [Required] : Function or [null] : trigger function.",
                "group [Optional] : linb.Dom object. this trigger's group object."
            ],
            $snippet:[
            "var id='linb.temp.sbt'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\"> <div id='+id+' style=\"border:solid 1px;padding:5px;width:50px;height:50px;\"> </div>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "linb(id).setBlurTrigger('ttt',function(){alert('out of my region');})"+
            "}",
            "var id='linb.temp.sbt'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\"> <div id='+id+'1 style=\"border:solid 1px;padding:5px;width:50px;height:50px;\"> </div><div id='+id+'2 style=\"border:solid 1px;padding:5px;width:50px;height:50px;\"> </div>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "linb(id+'1').setBlurTrigger('ttt',function(){alert('out of my region')},linb([id+'1',id+'2']))"+
            "}"
            ]
        },
        topZindex:{
            $desc:"Gets the minimum available zIndex value that can make the first element to be set to the most top layer; or set the first element to the most top layer directly.",
            $rtn:"Get: Number, Set:[self]",
            $paras:[
                "flag [Optional] : Bool, indicates whether or not it sets the first element to the most top layer directly. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.tzi'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:130px;\">' + '<div id='+id+'1 style=\"z-index:1;background:#ccc;position:absolute;border:solid 1px;padding:50px;left:10px;top:30px;\">1</div>' + '<div id='+id+'2 style=\"z-index:2;background:#aaa;position:absolute;border:solid 1px;padding:50px;left:50px;top:30px;\">2</div>'+ '<div id='+id+'3 style=\"z-index:3;background:#888;position:absolute;border:solid 1px;padding:50px;left:100px;top:30px;\">3</div>'+ '<div id='+id+'4 style=\"z-index:4;background:#444;position:absolute;border:solid 1px;padding:50px;left:150px;top:30px;\">4</div>'+ ' <button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));" +
                "var n=linb(id+'1');alert(n.css('zIndex')+':'+n.topZindex()); n.topZindex(true); alert(n.css('zIndex')+':'+n.topZindex());"+
                "}"
            ]
        },

        afterDblclick:{},
        afterDrag:{},
        afterDragbegin:{},
        afterDragenter:{},
        afterDragleave:{},
        afterDragover:{},
        afterDragstop:{},
        afterDrop:{},
        afterError:{},
        afterFocus:{},
        afterKeydown:{},
        afterKeypress:{},
        afterKeyup:{},
        afterLoad:{},
        afterLocation:{},
        afterMousedown:{},
        afterMousemove:{},
        afterMouseout:{},
        afterMouseover:{},
        afterMouseup:{},
        afterScroll:{},
        afterSelect:{},
        afterSize:{},
        afterSubmit:{},
        afterUnload:{},
        beforeBlur:{},
        beforeChange:{},
        beforeClick:{},
        beforeDblclick:{},
        beforeDrag:{},
        beforeDragbegin:{},
        beforeDragenter:{},
        beforeDragleave:{},
        beforeDragover:{},
        beforeDragstop:{},
        beforeDrop:{},
        beforeError:{},
        beforeFocus:{},
        beforeKeydown:{},
        beforeKeypress:{},
        beforeKeyup:{},
        beforeLoad:{},
        beforeLocation:{},
        beforeMousedown:{},
        beforeMousemove:{},
        beforeMouseout:{},
        beforeMouseover:{},
        beforeMouseup:{},
        beforeScroll:{},
        beforeSelect:{},
        beforeSize:{},
        beforeSubmit:{},
        beforeUnload:{},
        onBlur:{},
        onChange:{},
        onClick:{},
        onDblclick:{},
        onDrag:{},
        onDragbegin:{},
        onDragenter:{},
        onDragleave:{},
        onDragover:{},
        onDragstop:{},
        onDrop:{},
        onError:{},
        onFocus:{},
        onKeydown:{},
        onKeypress:{},
        onKeyup:{},
        onLoad:{},
        onLocation:{},
        onMousedown:{},
        onMousemove:{},
        onMouseout:{},
        onMouseover:{},
        onMouseup:{},
        onScroll:{},
        onSelect:{},
        onSize:{},
        onSubmit:{},
        onUnload:{}
    }
});

_.set(linb.Locale,["en","doc","linb","DragDrop"], {
    abort:{
        $desc:"to abort the current drag process if linb.DragDrop is working.",
        $snippet:[
            "var id='linb.temp.ddo1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:150px;\">' + '<div style=\"position:absolute;border:solid 1px;padding:20px;left:10px;top:30px;\">dragable</div>' +'<div style=\"position:absolute;border:solid 1px;left:160px;top:30px;width:100px;height:100px;\">dropable</div>' + ' <button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "var n=linb(id); n.first().dragable(true,{dragType:'icon'},'key1','data1').next().dropable(true,'key1').onDragenter(function(){linb.DragDrop.abort();linb.message('the current dd is aborted!')})"+
            "}"
        ]
    },
    getProfile:{
        $desc:"Gets the current drag process profile, that includes all the useful information.",
        $rtn:"key/value object.",
        $snippet:[
            "var id='linb.temp.ddo2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:150px;\">' + '<div style=\"position:absolute;border:solid 1px;padding:20px;left:10px;top:30px;\">dragable</div>' +'<div style=\"position:absolute;border:solid 1px;left:160px;top:30px;width:100px;height:100px;\">dropable</div>' + ' <button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "var n=linb(id); n.first().dragable(true,{dragType:'icon'},'key1','data1').next().dropable(true,'key1').onDrop(function(){alert(linb.Coder.formatText(_.serialize(linb.DragDrop.getProfile())))})"+
            "}"
        ]
    },
    setDragIcon:{
        $desc:"To change the dragIcon while dragging.",
        $paras:[
            "key [Optional] : String, the drag icon key. Default is 'move'"
        ],
        $snippet:[
            "var id='linb.temp.ddo3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\"><button id='+id+'>drag me</button>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "var numb; linb(id).onMousedown(function(p,e,s){numb=0;linb([this]).startDrag(e,{dragType:'icon'})}).onDrag(function(){numb++; if(numb<=200){if(numb==50)linb.DragDrop.setDragIcon('move');else if(numb==100)linb.DragDrop.setDragIcon('link');else if(numb==150)linb.DragDrop.setDragIcon('copy');else if(numb==200)linb.DragDrop.setDragIcon('none');}});"+
            "}"
        ],
        $memo:"Uses this function when the [dragType] is 'move' only."
    },
    setDropElement:{
        $desc:"To set the drop target DOM element.",
        $snippet:[
            "src [Required] : DOM element, the drop target."
        ],
        $snippet:[
            "var id='linb.temp.ddo4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:150px;\">' + '<div style=\"position:absolute;border:solid 1px;padding:20px;left:10px;top:30px;\">dragable</div>' +'<div style=\"position:absolute;border:solid 1px;left:160px;top:30px;width:100px;height:100px;\">dropable</div>' + ' <button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "var n=linb(id); n.first().dragable(true,{dragType:'icon'},'key1','data1');"+
            "n=n.first().next();"+
            "n.onDrop(function(){this.style.background='#fff';alert(linb.Coder.formatText(_.serialize(linb.DragDrop.getProfile())))});"+
            "\n//Must use 'before' here \n n.beforeMouseover(function(){linb.DragDrop.setDropElement(this);this.style.background='#ccc';}).beforeMouseout(function(){linb.DragDrop.setDropElement(null);this.style.background='#fff';});"+
            "}"
        ]
    },
    setDropFace:{
        $desc:"Set dropable appearance on the drop tareget.",
        $paras:[
            "target [Required] : DOM element or linb.Dom object.",
            "dragIcon [Optional] : String, the drag icon key. Default is 'move'."
        ],
        $snippet:[
            "var id='linb.temp.ddo4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:150px;\">' +'<div style=\"position:absolute;border:solid 1px;left:160px;top:30px;width:100px;height:100px;\">setDropFace</div>' + ' <button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "var n=linb(id).first().onMouseover(function(){linb.DragDrop.setDropFace(this,'copy')}).onMouseout(function(){linb.DragDrop.setDropFace()})"+
            "}"
        ]
    },
    startDrag:{
        $desc:"<p>Starts to drag the first element.",
        $rtn:"[self]",
        $paras:[
            "e [Required] : DOM [event] object.",
            "targetNode [Required] : DOM element or linb.Dom object.",
            "profile [Optional] : key/value object, for linb.DragDrop profile. Profile struct:" +
            "<div>{<ul>" +
            "<li><strong>dragType</strong>: 'move','copy','deep_copy','shape','icon', 'blank' or 'none', default is 'shape';</li>"+
            "<li><strong>shadowFrom</strong>: DOM element or linb.Dom object. It's valid when dragType=='icon';</li>"+
            "<li><strong>targetReposition</strong>: Bool, does dd reset the target position, default is [true];</li>"+

            "<li><strong>dragIcon</strong>: String, the drag icon image path, default is [linb.ini.path+'ondrag.gif'].</li>"+
            "<li><strong>magneticDistance</strong>: Number, the magnetic distance, default is 0;</li>"+
            "<li><strong>xMagneticLines</strong>: Array of Number, the magnetic line vlaues in horizontal dir, default is [];</li>"+
            "<li><strong>yMagneticLines</strong>: Array of Number, the magnetic line vlaues in vertical dir, default is [];</li>"+
            "<li><strong>widthIncrement</strong>: Number, the width increment in horizontal dir, default is 0;</li>"+
            "<li><strong>heightIncrement</strong>: Number, the height increment in vertical dir, default is 0;</li>"+
            "<li><strong>dragDefer</strong>: Number, when [linb.DragDrop.startDrag] is called, the real drag action will be triggered after [document.onmousemove] runs [dragDefer] times, default is 0;</li>"+

            "<li><strong>horizontalOnly</strong>:Bool, drag horizontal dir only, default is [false];</li>"+
            "<li><strong>verticalOnly</strong>: Bool, drag vertical dir only, default is [false];</li>"+
            "<li><strong>maxBottomOffset</strong>:Number, the offset between [the restricted bottom] and [the current mouse Y], for mouse restricted region, default is [null];</li>"+
            "<li><strong>maxLeftOffset</strong>:Number, the offset between [the restricted left] and [the current mouse X], for mouse restricted region, default is [null];</li>"+
            "<li><strong>maxRightOffset</strong>:Number, the offset between [the restricted right] and [the current mouse X], for mouse restricted region, default is [null];</li>"+
            "<li><strong>maxTopOffset</strong>: Number, the offset between [the restricted top] and [the current mouse Y], for mouse restricted region, default is [null];</li>"+

            "<li><strong>targetNode</strong>: DOM element or linb.Dom object, the drag target node;</li>"+
            "<li><strong>targetCSS</strong>: Number, the drag target node's css key/value object, default is [null];</li>"+
            "<li><strong>dragKey</strong>: String, the drag key, default is [null];</li>"+
            "<li><strong>dragData</strong>: Any, the drag data, default is [null];</li>"+
            "<li><strong>targetLeft</strong>: Number, the drag target node's css left, default is [null];</li>"+
            "<li><strong>targetTop</strong>: Number, the drag target node's css top, default is [null];</li>"+
            "<li><strong>targetWidth</strong>: Number, the drag target node's css width, default is [null];</li>"+
            "<li><strong>targetHeight</strong>: Number, the drag target node's css height, default is [null];</li>"+
            "<li><strong>targetOffsetParent</strong>: linb.Dom object, the drag target node offsetParent node, default is [null];</li>"+

            "<li><strong>dragCursor</strong>:  'none', 'move', 'link', or 'add', the drag cursor key; <strong>[readonly]</strong></li>"+
            "<li><strong>x</strong>: Number, current X value of mouse; <strong>[readonly]</strong></li>"+
            "<li><strong>y</strong>: Number, current Y value of mouse; <strong>[readonly]</strong></li>"+
            "<li><strong>ox</strong>: Number, original X value of mouse; <strong>[readonly]</strong></li>"+
            "<li><strong>oy</strong>: Number, original Y value of mouse; <strong>[readonly]</strong></li>"+
            "<li><strong>curPos</strong>: {left:Number,top:Number}, current css pos of the dragging node <strong>[readonly]</strong></li>"+
            "<li><strong>offset</strong>: {x:Number,y:Number}, offset from now to origin <strong>[readonly]</strong></li>"+
            "<li><strong>isWorking</strong>: Bool, is dd working or not? <strong>[readonly]</strong></li>"+
            "<li><strong>restrictedLeft</strong>: Number, the calculated restricted left value; <strong>[readonly]</strong></li>"+
            "<li><strong>restrictedRight</strong>: Number, the calculated restricted right value; <strong>[readonly]</strong></li>"+
            "<li><strong>restrictedTop</strong>: Number, the calculated restricted top value; <strong>[readonly]</strong></li>"+
            "<li><strong>restrictedBottom</strong>: Number, the calculated restricted bottom value; <strong>[readonly]</strong></li>"+
            "<li><strong>proxyNode</strong>: linb.Dom object, the proxy object; <strong>[readonly]</strong></li>"+
            "<li><strong>dropElement</strong>: String, the target drop element DOM id. <strong>[readonly]</strong></li>"+
            "</ul>}</div>",
            "dragKey [Optional] : String, dragKey for drag data.",
            "dragData [Optional] : Any, the dragged [data]."
        ],
        $snippet:[
            "var id='linb.temp.ddo9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div style=\"border:solid 1px;padding:10px;\"><button id='+id+'>drag me</button>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "linb(id).onMousedown(function(p,e,s){linb.DragDrop.startDrag(e,this,{dragType:'copy'})})"+
            "}"
        ]
    }
});

_.set(linb.Locale,["en","doc","linb","CSS"], {
    addStyleSheet:{
        $desc:"Adds a &lt;style> element to DOM &lt;head>.",
        $rtn:"style DOM element",
        $paras:[
            "txt [Required] : String, css text.",
            "id [Optional] : String, element id. If a style element with this id exists in &lt;head> already, the function will be ignored.",
            "backOf [Optional] : Bool, adds this style element at the back of &lt;head> or not. Default is false."
        ],
        $snippet:[
            "var id='linb.temp.add'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' class=testadded style=\"border:solid 1px;padding:10px;\">' + '<button onclick=\"linb.CSS.addStyleSheet(\\\'.testadded{background:#ccc;}\\\',\\\'testadded\\\')\">addStyleSheet</button> - '+ '<button onclick=\"alert(linb.CSS.get(\\\'id\\\',\\\'testadded\\\'))\">get</button> - '+  '<button onclick=\"linb.CSS.remove(\\\'id\\\',\\\'testadded\\\')\">remove</button>'+ '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "}"
        ]
    },
    remove:{
        $desc:"Removes a specified &lt;style> or &lt;link>  element from DOM &lt;head>.",
        $paras:[
            "property [Required] : String, property name of style element.",
            "value [Required] : String, property value of style element."
        ],
        $snippet:[
            "var id='linb.temp.rm'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' class=testadded style=\"border:solid 1px;padding:10px;\">' + '<button onclick=\"linb.CSS.addStyleSheet(\\\'.testadded{background:#ccc;}\\\',\\\'testadded\\\')\">addStyleSheet</button> - '+ '<button onclick=\"alert(linb.CSS.get(\\\'id\\\',\\\'testadded\\\'))\">get</button> - '+  '<button onclick=\"linb.CSS.remove(\\\'id\\\',\\\'testadded\\\')\">remove</button>'+ '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "}"
        ]
    },
    get:{
        $desc:"Gets a specified &lt;style> or &lt;link>  element from DOM &lt;head>.",
        $paras:[
            "property [Required] : String, property name of style element.",
            "value [Required] : String, property value of style element."
        ],
        $snippet:[
            "var id='linb.temp.get'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' class=testadded style=\"border:solid 1px;padding:10px;\">' + '<button onclick=\"linb.CSS.addStyleSheet(\\\'.testadded{background:#ccc;}\\\',\\\'testadded\\\')\">addStyleSheet</button> - '+ '<button onclick=\"alert(linb.CSS.get(\\\'id\\\',\\\'testadded\\\'))\">get</button> - '+  '<button onclick=\"linb.CSS.remove(\\\'id\\\',\\\'testadded\\\')\">remove</button>'+ '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "}"
        ]
    },
    setStyleRules:{
        $desc:"Sets a specified style rules.",
        $rtn:"[self]",
        $paras:[
            "selector [Required] : String, css expression without ',' in it.",
            "value [Optional] : key/value pairs. if it isn't specified, the function will remove the style selector.",
            "force [Optional] : if this parameter is true, it'll force to add the [selector] and [value] to a special styleSheet, even if that [selector] already exists in the previous styleSheet."
        ],
        $snippet:[
            "var id='linb.temp.ar'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' class=testadded style=\"border:solid 1px;padding:10px;\">' + '<button onclick=\"linb.CSS.setStyleRules(\\\'.testadded\\\',{background:\\\'#888\\\'})\">add rules</button> - '+'<button onclick=\"linb.CSS.setStyleRules(\\\'.testadded\\\',{background:\\\'#ccc\\\'})\">update rules</button> - '+'<button onclick=\"linb.CSS.setStyleRules(\\\'.testadded\\\')\">remove rules</button>'+ '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "}"
        ]
    },
    replaceLink:{
        $desc:"Replaces the specified &lt;style> or &lt;link> element(the one that has the [property] with [oValue]) with a new &lt;link> (sets href to [href]), and sets the specified [property] to [nValue].",
        $paras:[
            "href [Required] : String, the styleSheet file path.",
            "property [Required] : String, the specified property name.",
            "oValue [Required] : String, the original links's property value.",
            "nValue [Required] : String, the new links's property value."
        ],
        $snippet:[
            "//linb.CSS.replaceLink('http://xxx.com/a.css', 'id', 'oldid', 'newid');"
        ]
    },
    includeLink:{
        $desc:"Includes a specified [href] as a &lt;link> element into DOM &lt;head>.",
        $paras:[
            "href [Required] : String, the styleSheet file path.",
            "id [Optional] : String, the elment id value.",
            "front [Optional] : Bool, adds this &lt;link> element in the front of &lt;head> nor not. Default is false.",
            "attr [Optional] : key/value object, the &lt;link> element's attributes."
        ],
        $snippet:[
            "//linb.CSS.includeLink('http://xxx.com/a.css', 'id', flase, {title:'title'});"
        ]
    }
});

_.set(linb.Locale,["en","doc","linb","History"], {
    setCallback:{
        $desc:"Sets callback function thant will be triggered when the Fragement Identifier changed.",
        $rtn:"[self]",
        $paras:[
            "callback [Required] : Function, callback function."
        ],
        $snippet:[
            "//linb.History.setCallback(function(str){alert('Fragement Identifier is: '+str)})"
        ]
    },
    getFI:{
        $desc:"Gets the current Fragement Identifier string.",
        $rtn:"String",
        $snippet:[
            "//linb.History.setCallback(function(str){alert('Fragement Identifier is: '+str)})\n"+
            "//alert(linb.History.getFI());\n"+
            "//linb.History.setCallback(null)"
        ]
    },
    setFI:{
        $desc:"Sets the Fragement Identifier string.",
        $paras:[
            "fi [Required] : String, the Fragement Identifier string",
            "triggerCallback [Optional] : Bool, trigger callback function or not. Default is [true]."
        ],
        $snippet:[
            "//linb.History.setCallback(function(str){alert('Fragement Identifier is: '+str)});\n"+
            "//linb.History.setFI('#test');\n"+
            "//linb.History.setCallback(null)"
        ]
    }
});

_.set(linb.Locale,["en","doc","linb","Cookies"], {
    get:{
        $desc:"Gets a cookie with the given name.",
        $rtn:"String",
        $paras:[
            "name [Required] : String, the name of cookie."
        ],
        $snippet:[
            "var o=linb.Cookies; o.set('a','b',1); alert(o.get('a')); o.remove('a'); alert(o.get('a')); "
        ]
    },
    set:{
        $desc:"Creates a cookie with the given name, value, and other options.",
        $rtn:"[self]",
        $paras:[
            "name [Required] : String, the name of cookie.",
            "value [Required] : String, the value of cookie.",
            "days [Optional] : Number, the expiry days after which the cookie is no longer valid. Default is 0.",
            "path [Optional] : String, the directory where the cookie is active. Default is the path of the current URL.",
            "domain [Optional] : String, the domain name of your site. Default is the domain of the current URL.",
            "isSecure [Optional] : Bool, to indicate if the cookie may only be retrieved with a secure server. Default is [false]."
        ],
        $snippet:[
            "var o=linb.Cookies; o.set('a','b',1); alert(o.get('a')); o.remove('a'); alert(o.get('a')); "
        ]
    },
    remove:{
        $desc:"Removes a cookie with the given name.",
        $rtn:"[self]",
        $paras:[
            "name [Required] : String, the name of cookie."
        ],
        $snippet:[
            "var o=linb.Cookies; o.set('a','b',1); alert(o.get('a')); o.remove('a'); alert(o.get('a')); "
        ]
    }
});
_.set(linb.Locale,["en","doc","linb","Debugger"], {
    'log':{
        $desc:"Shows log information to a new window(Debugger window).",
        $snippet:[
            "//You can input multi parameters:\n"+
            "linb.Debugger.log(9,'a',[1,2],{a:1,b:2})"
        ]
    },
    trace:{
        $desc:"Shows an object's key/value pairs ,and the current function's trace information to the Debugger window.",
        $paras:[
            "obj [Optional] : Object."
        ],
        $snippet:[
            "linb.Debugger.trace({a:1,b:2})"
        ]
    },
    err:{
        $desc:"Shows an Error info to the Debugger window. The most common usage : 'window.onerror=linb.Debugger.err;'",
        $snippet:[
            "var old=window.onerror; \n window.onerror=linb.Debugger.err; \n throw new Error('a error!'); window.onerror=old;"
        ]
    }
});

_.set(linb.Locale,["en","doc","linb","Date"], {
    add:{
        $desc:"Returns a new datetime value based on adding an interval to the specified date.",
        $rtn:"the result Date object.",
        $paras:[
            "date [Required] : Date object, the specified date used to increment datepart.",
            "datepart [Required] : String, the parameter that specifies on which part of the date to calculate. 'ms','s','n','h','d','ww','m','q','y','de' or 'c'.",
            "count [Required] : Number, the value used to increment datepart."
        ],
        $snippet:[
            "var date=linb.Date,d=date.parse('1/1/2000'),arr=[];"+
            "arr.push(_.serialize(date.add(d, 'ms', 600)));"+
            "arr.push(_.serialize(date.add(d, 's', 1)));"+
            "arr.push(_.serialize(date.add(d, 'n', 1)));"+
            "arr.push(_.serialize(date.add(d, 'h', 1)));"+
            "arr.push(_.serialize(date.add(d, 'd', 1)));"+
            "arr.push(_.serialize(date.add(d, 'ww', 1)));"+
            "arr.push(_.serialize(date.add(d, 'm', 1)));"+
            "arr.push(_.serialize(date.add(d, 'q', 1)));"+
            "arr.push(_.serialize(date.add(d, 'y', 1)));"+
            "arr.push(_.serialize(date.add(d, 'de', 1)));"+
            "arr.push(_.serialize(date.add(d, 'c', 1)));"+
            "alert(arr.join('\\n'))"
        ]
    },
    diff:{
        $desc:"Returns the number of date and time boundaries crossed between two specified dates.",
        $paras:[
            "startdate [Required] : Date, the beginning date for the calculation.",
            "enddate [Required] : Date, the the ending date for the calculation.",
            "datepart [Required] : String, the parameter that specifies on which part of the date to calculate.  'ms','s','n','h','d','ww','m','q','y','de' or 'c'.",
            "firstDayOfWeek [Optional] : Number the first day of week. Default is 0."
        ],
        $snippet:[
            "var date=linb.Date,sd=date.parse('1/1/2000'),ed=new Date,arr=[];"+
            "arr.push(_.serialize(date.diff(sd, ed, 'ms')));"+
            "arr.push(_.serialize(date.diff(sd, ed, 's')));"+
            "arr.push(_.serialize(date.diff(sd, ed, 'n')));"+
            "arr.push(_.serialize(date.diff(sd, ed, 'h')));"+
            "arr.push(_.serialize(date.diff(sd, ed, 'd')));"+
            "arr.push(_.serialize(date.diff(sd, ed, 'ww')));"+
            "arr.push(_.serialize(date.diff(sd, ed, 'm')));"+
            "arr.push(_.serialize(date.diff(sd, ed, 'q')));"+
            "arr.push(_.serialize(date.diff(sd, ed, 'y')));"+
            "arr.push(_.serialize(date.diff(sd, ed, 'de')));"+
            "arr.push(_.serialize(date.diff(sd, ed, 'c')));"+
            "alert(arr.join('\\n'))"
        ]
    },
    get:{
        $desc:"Returns an integer representing the specified datepart of the specified date.",
        $rtn:"Number",
        $paras:[
            "date [Required] : Date object, the specified date.",
            "datepart [Required] : String, the parameter that specifies on which part of the date to calculate. 'ms','s','n','h','d','ww','m','q','y','de' or 'c'.",
            "firstDayOfWeek [Optional] : Number the first day of week. Default is 0."
        ],
        $snippet:[
            "var date=linb.Date,d=new Date();"+
            "alert('The millisecond of \"'+d+'\" is: '+date.get(d, 'ms'));"+
            "alert('The second of \"'+d+'\" is: '+date.get(d, 's'));"+
            "alert('The minute of \"'+d+'\" is: '+date.get(d, 'n'));"+
            "alert('The hour of \"'+d+'\" is: '+date.get(d, 'h'));"+
            "alert('The day of \"'+d+'\" is: '+date.get(d, 'd'));"+
            "alert('The week of \"'+d+'\" is: '+date.get(d, 'ww'));"+
            "alert('The week (first day of week is 1)  of \"'+d+'\" is: '+date.get(d, 'ww',1));"+
            "alert('The month of \"'+d+'\" is: '+date.get(d, 'm'));"+
            "alert('The quarter of \"'+d+'\" is: '+date.get(d, 'q'));"+
            "alert('The year of \"'+d+'\" is: '+date.get(d, 'y'));"+
            "alert('The decade of \"'+d+'\" is: '+date.get(d, 'de'));"+
            "alert('The century of \"'+d+'\" is: '+date.get(d, 'c'));"
        ]
    },
    getTimSpanStart:{
        $desc:"Gets the 'from' time of the given time span(e.g. 3 hours, 2 day, 1 week...).",
        $paras:[
            "date [Required] : Date object, a date to caculate the time span.",
            "datepart [Required] : String, the time span's datepart: 'ms','s','n','h','d','ww','m','q','y','de' or 'c'.",
            "count [Optional] : Number, how many [datepart]s in the time span. Default is 1.",
            "firstDayOfWeek [Optional] : Number the first day of week. Default is 0."
        ],
        $snippet:[
            "var date=linb.Date,d=new Date,arr=[];"+
            "arr.push(_.serialize(d));"+
            "arr.push(_.serialize(date.getTimSpanStart(d, 'ms')));"+
            "arr.push(_.serialize(date.getTimSpanStart(d, 's')));"+
            "arr.push(_.serialize(date.getTimSpanStart(d, 'n')));"+
            "arr.push(_.serialize(date.getTimSpanStart(d, 'h')));"+
            "arr.push(_.serialize(date.getTimSpanStart(d, 'd')));"+
            "arr.push(_.serialize(date.getTimSpanStart(d, 'ww')));"+
            "arr.push(_.serialize(date.getTimSpanStart(d, 'm')));"+
            "arr.push(_.serialize(date.getTimSpanStart(d, 'q')));"+
            "arr.push(_.serialize(date.getTimSpanStart(d, 'y')));"+
            "arr.push(_.serialize(date.getTimSpanStart(d, 'de')));"+
            "arr.push(_.serialize(date.getTimSpanStart(d, 'c')));"+
            "alert(arr.join('\\n'))"
        ]
    },
    getTimSpanEnd:{
        $desc:"Gets the 'to' time of the given time span(e.g. 3 hours, 2 day, 1 week...).",
        $paras:[
            "date [Required] : Date object, a date to caculate the time span.",
            "datepart [Required] : String, time span's datepart: 'ms','s','n','h','d','ww','m','q','y','de' or 'c'.",
            "count [Optional] : Number, how many [datepart]s in the time span. Default is 1.",
            "firstDayOfWeek [Optional] : Number the first day of week. Default is 0."
        ],
        $snippet:[
            "var date=linb.Date,d=new Date,arr=[];"+
            "arr.push(_.serialize(d));"+
            "arr.push(_.serialize(date.getTimSpanEnd(d, 'ms')));"+
            "arr.push(_.serialize(date.getTimSpanEnd(d, 's')));"+
            "arr.push(_.serialize(date.getTimSpanEnd(d, 'n')));"+
            "arr.push(_.serialize(date.getTimSpanEnd(d, 'h')));"+
            "arr.push(_.serialize(date.getTimSpanEnd(d, 'd')));"+
            "arr.push(_.serialize(date.getTimSpanEnd(d, 'ww')));"+
            "arr.push(_.serialize(date.getTimSpanEnd(d, 'm')));"+
            "arr.push(_.serialize(date.getTimSpanEnd(d, 'q')));"+
            "arr.push(_.serialize(date.getTimSpanEnd(d, 'y')));"+
            "arr.push(_.serialize(date.getTimSpanEnd(d, 'de')));"+
            "arr.push(_.serialize(date.getTimSpanEnd(d, 'c')));"+
            "alert(arr.join('\\n'))"
        ]
    },
    getText:{
        $desc:"Converts the specified date to a string representation.",
        $rtn:"String",
        $paras:[
            "date [Required] : Date object, the specified date.",
            "datepart [Required] : String, the result string's format.",
            "firstDayOfWeek [Optional] : Number the first day of week. Default is 0."
        ],
        $snippet:[
            "var arr=[],date=linb.Date,d=new Date;"+
            "arr.push(date.getText(d,'utciso'));"+
            "arr.push(date.getText(d,'iso'));"+
            "arr.push(date.getText(d,'ms'));"+
            "arr.push(date.getText(d,'s'));"+
            "arr.push(date.getText(d,'n'));"+
            "arr.push(date.getText(d,'h'));"+
            "arr.push(date.getText(d,'d'));"+
            "arr.push(date.getText(d,'w' ));"+
            "arr.push(date.getText(d,'ww'));"+
            "arr.push(date.getText(d,'m'));"+
            "arr.push(date.getText(d,'q' ));"+
            "arr.push(date.getText(d,'y'));"+
            "arr.push(date.getText(d,'de'));"+
            "arr.push(date.getText(d,'c'));"+
            "arr.push(date.getText(d,'hn'));"+
            "arr.push(date.getText(d,'dhn'));"+
            "arr.push(date.getText(d,'mdhn'));"+
            "arr.push(date.getText(d,'hns'));"+
            "arr.push(date.getText(d,'hnsms'));"+
            "arr.push(date.getText(d,'yq'));"+
            "arr.push(date.getText(d,'ym'));"+
            "arr.push(date.getText(d,'md'));"+
            "arr.push(date.getText(d,'ymd'));"+
            "arr.push(date.getText(d,'ymdh'));"+
            "arr.push(date.getText(d,'ymdhn'));"+
            "arr.push(date.getText(d,'ymdhns'));"+
            "arr.push(date.getText(d,'all'));"+
            "alert(arr.join('\\n'))"
        ]
    },
    getWeek:{
        $desc:"Gets the week of the year according to the given date.",
        $rtn:"Number",
        $paras:[
            "date [Required] : Date object, the given date.",
            "firstDayOfWeek [Optional] : Number the first day of week. Default is 0."
        ],
        $snippet:[
            "alert(linb.Date.getWeek(new Date))"
        ]
    },
    parse:{
        $desc:"Converts the specified string representation of a date and time to its [Date] object equivalent.",
        $rtn:"Date object",
        $paras:[
            "str [Required] : String, the given string."
        ],
        $snippet:[
            "alert(linb.Date.parse('1/1/1998'))",
            "alert(linb.Date.parse('Fri Sep 05 2008 11:46:11 GMT+0800'))",
            "alert(linb.Date.parse('2008-09-05T03:46:34.343Z'))",
            "alert(linb.Date.parse('2008-09-05T03:46:34.343+80:00'))"
        ]
    },
    offsetTimeZone:{
        $desc:"Offset date time to a given time zone, or offset back.",
        $paras:[
            "date [Required] : Date object, the target date.",
            "timeZone [Required] : integer Number, the given time zone value.",
            "back [Optional] : Bool, indicates whether or not is offsets back. Default is [false]."
        ],
        $snippet:[
            "var localDate = new Date, timezone9Date=linb.Date.offsetTimeZone(localDate, 9);"+
            "alert(localDate.toString() == linb.Date.offsetTimeZone(timezone9Date, 9, true))"
        ]
    }
});

_.set(linb.Locale,["en","doc","linb","absObj"], {
    getAll:{
        $desc:"Gets all instances of the current Class.",
        $rtn:"the current Class object",
        $snippet:[
            "alert(linb.UI.getAll().get().length)"
        ]
    },
    pickAlias:{
        $desc:"Picks an avialiable alias for the current Class.",
        $rtn:'String',
        $snippet:[
            "alert(linb.UI.Button.pickAlias())"
        ]
    },
    setDataModel:{
        $desc:"Sets a set of Model object to the current Class.",
        $rtn:"[self]",
        $paras:[
            "hash [Required] : key/value pairs"
        ],
        $snippet:[
            "var o=(new linb.UI.Button).render(); \n//no 'test' data[getTest function, setTest functon] yet\n alert(o.getTest); \n//Add 'test' data model to the Class\n linb.UI.Button.setDataModel({test:'default value'}); \n//Creates a new instance\n o=(new linb.UI.Button).render(); \n//call getTest here\n alert(o.getTest()); \n//Removes that 'test' data model from the Class\n linb.UI.Button.setDataModel({test:null})"
        ]
    },
    setEventHandlers:{
        $desc:"Sets a set of event Handlers object to the current Class.",
        $rtn:"[self]",
        $paras:[
            "hash [Required] : key/value pairs"
        ],
        $snippet:[
            "var o=new linb.UI.Button; \n//No 'onA' event handler yet\n alert(o.onA); \n//Sets 'onA' event handler to Class \n linb.UI.Button.setEventHandlers({onA:function(){}}); \n//Adds an 'onA' event function to the instance\n o.onA(function(){alert('a')}); \n//Fires the 'onA' event function\n o.onA(); \n//Removes the 'onA' event handler from Class\n linb.UI.Button.setEventHandlers({onA:null});"
        ]
    },
    prototype:{
        host:{
            $desc:"Sets the host object and alias to the first profile, or gets the host object of the first profile.",
            $rtn:'Sest: [self]; Gets: Object',
            $paras:[
                "host [Optional : Object, the host object.",
                "alias [Optional : String, the alias value."
            ],
            $snippet:[
                "var o=linb.UIProfile.getFromDomId('logo'); alert(o.host===SPA);",
                "var host={},o=new linb.UI.Button; o.host(host, 'aBtn'); alert(host.aBtn.KEY);"
            ]
        },
        alias:{
            $desc:"Sets or gets an alias to the first profile.",
            $rtn:'Sest: [self]; Gets: String',
            $paras:[
                "str [Optional] : String, the alias value."
            ],
            $snippet:[
                "var o=linb.UIProfile.getFromDomId('logo'); alert(o.alias); alert(o.host[o.alias].get(0)===o)",
                "var host={},o=new linb.UI.Button; o.host(host, 'aBtn'); alert(host.aBtn.KEY); o.alias('bBtn'); alert(host.aBtn);  alert(host.bBtn.KEY); "
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","absProfile"], {
    prototype:{
        getId:{
            $desc:"Gets the unique id.",
            $rtn:"String",
            $snippet:[
                "alert(linb.UIProfile.getFromDomId('logo').getId())"
            ]
        },
        link:{
            $desc:"To link the [target] parameter to an Object or Array with a given [id]. This action can be reversed by calling 'unLink' function with the same [id].",
            $rtn:"[self]",
            $paras:[
                "obj [Required] : Object or Array.",
                "id [Required] : String, link id.",
                "target [Optional] : Any, default is [self]."
            ],
            $snippet:[
                "var profile=new linb.Profile(), a1=[],a2=[],a3=[]; profile.link(a1,'a').link(a2,'b').link(a3,'c'); alert(a1+':'+a2+':'+a3); profile.unLink('a'); alert(a1+':'+a2+':'+a3); profile.unLinkAll(); alert(a1+':'+a2+':'+a3); "
            ],
            $memo:"Usually, we do not need to  call this function manually."

        },
        unLink:{
            $desc:"To unlink the linked Object or Array according to a given [id].",
            $rtn:"[self]",
            $paras:[
                "id [Required] : String, given id value."
            ],
            $snippet:[
                "var profile=new linb.Profile(), a1=[],a2=[],a3=[]; profile.link(a1,'a').link(a2,'b').link(a3,'c'); alert(a1+':'+a2+':'+a3); profile.unLink('a'); alert(a1+':'+a2+':'+a3); profile.unLinkAll(); alert(a1+':'+a2+':'+a3); "
            ],
            $memo:"Usually, we do not need to call this function manually."
        },
        unLinkAll:{
            $desc:"To unlink all the linked Objects or Arrays.",
            $rtn:"[self]",
            $snippet:[
                "var profile=new linb.Profile(), a1=[],a2=[],a3=[]; profile.link(a1,'a').link(a2,'b').link(a3,'c'); alert(a1+':'+a2+':'+a3); profile.unLink('a'); alert(a1+':'+a2+':'+a3); profile.unLinkAll(); alert(a1+':'+a2+':'+a3); "
            ],
            $memo:"Usually, we do not need to call this function manually."
        }
    }
});

_.set(linb.Locale,["en","doc","linb","Profile"], {
    constructor:{
        $desc:"Creates a profile object",
        $memo:"Usually, we do not need to create this Class manually."
    },
    prototype:{
        serialize:{
            $desc:"To serialize the current profile to a string representation.",
            $rtn:"String or Array",
            $paras:[
                "rtnString [Optional] : Bool. to indicate whether it returns String or Object. Default is true.",
                "keepHost [Optional] : Bool. to keep host object link or not. Default is false."
            ],
            $snippet:[
                "alert(linb.UIProfile.getFromDomId('logo').serialize());" +
                "alert(linb.UIProfile.getFromDomId('logo').serialize(false))"
            ]
        },
        getEvents:{
            $desc:"Collects all the event functions in the current profile, and returns it.",
            $rtn:"Array",
            $snippet:[
                "var p=linb.UIProfile.getFromDomId('logo'); p.setEvents({onA:_.fun(), onShowTips:function(){return false}}); alert(_.serialize(p.getEvents()))"
            ]
        },
        setEvents:{
            $desc:"Sets a set of event functions to the current profile.",
            $rtn:"[self]",
            $paras:[
                "events [Required] : key/value(Function) pairs. A set of event functions."
            ],
            $snippet:[
                "var p=linb.UIProfile.getFromDomId('logo'); p.setEvents({onA:_.fun(), onShowTips:function(){return false}}); alert(_.serialize(p.getEvents()))"
            ]
        },
        boxing:{
            $desc:"Packs the current profile to a linb.absBox object, and returns it.",
            $rtn:'linb.absBox object',
            $snippet:[
                "alert(linb.UIProfile.getFromDomId('logo').boxing().KEY)"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","UIProfile"], {
    constructor:{
        $desc:"Creates an UI profile object",
        $memo:"Usually, we do not need to create this Class manually."
    },
    getFromDomId:{
        $desc:"Gets an UI profile according to a given DOM element id.",
        $rtn:"linb.UIProfile",
        $paras:[
            "id [Required] : String, a DOM element id."
        ],
        $snippet:[
            "alert(linb.UIProfile.getFromDomId('logo').serialize());",
            "alert(linb.UIProfile.getFromDomId('linb.UI.TreeBar-CMD:a:l').serialize());"
        ]
    },
    prototype:{
        rendered:{
            $desc:"Indicates whether the UIProfile is rendered or not."
        },
        getRoot:{
            $desc:"Gets the root linb.Dom object.",
            $rtn:"linb.Dom element",
            $snippet:[
            "alert(linb.UIProfile.getFromDomId('logo').getRoot());"
            ]
        },
        getRootNode:{
            $desc:"Gets the root DOM element.",
            $rtn:"DOM element",
            $snippet:[
            "alert(linb.UIProfile.getFromDomId('logo').getRootNode());"
            ]
        },
        serialize:{
            $desc:"to serialize the current profile to a string representation.",
            $rtn:"String or Array",
            $paras:[
                "rtnString [Optional] : Bool. to indicate whether it return String or Object. Default is true.",
                "keepHost [Optional] : Bool. to keep host object link or not. Default is false."
            ],
            $snippet:[
                "alert(linb.UIProfile.getFromDomId('logo').serialize());" +
                "alert(linb.UIProfile.getFromDomId('logo').serialize(false))"
            ]
        },
        toHtml:{
            $desc:"To build HTML string from the current UIProfile, and returns it.",
            $rtn:"String",
            $snippet:[
                "alert(linb.UIProfile.getFromDomId('logo').toHtml())"
            ]
        },
        buildItems:{
            $desc:"To build HTML string from a set of items, and returns it.",
            $rtn:"String",
            $paras:[
                "key [Required] : String, template key.",
                "items [Required] : Array, a set of adjusted data."
            ],
            $snippet:[
                "var profile=linb.UI.TreeBar.getAll().get(0); alert(profile.buildItems('items', profile.box._prepareItems(profile,[{id:'_a',caption:'a'},{id:'_b',caption:'b'}])));"
            ]
        },
        getClass:{
            $desc:"Gets class name according to a given [key] string and a [tag] string.",
            $rtn:"String",
            $paras:[
                "key [Required] : String, key string.",
                "tag [Optional] : String, tag string."
            ],
            $snippet:[
                "alert(linb.UIProfile.getFromDomId('linb.UI.Panel:a:').getClass('HANDLE','-mouseover'))"
            ]
        },
        getDomId:{
            $desc:"Gets the profile's dom id string.",
            $rtn:"String",
            $snippet:[
                "alert(linb.UIProfile.getFromDomId('logo').getDomId())"
            ]
        },
        setDomId:{
            $desc:"Sets a specified dom id to the profile.",
            $rtn:"[self]",
            $paras:[
                "id [Required] : String, id string"
            ],
            $snippet:[
                "var profile=linb.UIProfile.getFromDomId('logo'); alert(profile.getDomId()); profile.setDomId('logo1'); alert(profile.getDomId());profile.setDomId('logo'); alert(profile.getDomId());"
            ]
        },
        queryItems:{
             $desc:"Query for the matched items in a deep Array.",
             $rtn:"Array of items",
             $paras:[
                "items [Required] : A deep array.",
                "fun [Required] : Function, query filter function.",
                "deep [Optional] : Bool, indicates whether or not it queries the sub items. Default is [false].",
                "single [Optional] : Bool, indicates whether or not it returns a single result. Default is [false]."
            ],
            $snippet:[
                "var profile=linb.UIProfile.getFromDomId('linb.UI.TreeBar:a:'), items=[{id:'a'},{id:'.b',sub:[{id:'aa'},{id:'.bb'}]}], filter=function(o,i){return o.id.indexOf('.')!=-1},results= profile.queryItems(items,filter);alert(results.length);results= profile.queryItems(items,filter,true);alert(results.length);results= profile.queryItems(items,filter,true,true);alert(results.length);results= profile.queryItems(items,filter,false,true);alert(results.length);",
                "var profile=linb.UIProfile.getFromDomId('linb.UI.TreeBar:a:'), items=profile.properties.items, filter=function(o,i){return o.id.indexOf('.')!=-1},results= profile.queryItems(items,filter);alert(results.length);results= profile.queryItems(items,filter,true);alert(results.length);results= profile.queryItems(items,filter,true,true);alert(results.length);results= profile.queryItems(items,filter,false,true);alert(results.length);"

            ]
        },
        getItemByDom:{
            $desc:"Gets a item object according to a specified DOM element or an id string.",
            $rtn:"key/value pairs.",
            $paras:[
                "src [Required] : DOM element or id string."
            ],
            $snippet:[
                "var pro=linb.UIProfile.getFromDomId('linb.UI.TreeBar:a:');alert(_.serialize( pro.getItemByDom('linb.UI.TreeBar-ITEM:a:a') ))"
            ],
            $memo:"For those [linb.absList] profiles only. Usually, we use this function in event callback function."
        },
        getItemIdByDom:{
            $desc:"Gets a item id according to a specified DOM element or an id string.",
            $rtn:"String",
            $paras:[
                "src [Required] : DOM element or id string."
            ],
            $snippet:[
                "var pro=linb.UIProfile.getFromDomId('linb.UI.TreeBar:a:');alert(_.serialize( pro.getItemIdByDom('linb.UI.TreeBar-ITEM:a:a') ))"
            ],
            $memo:"For those [linb.absList] profiles only. Usually, we use this function in event callback function."
        },
        getItemByItemId:{
            $desc:"Gets a item object according to a specified item id.",
            $rtn:"key/value pairs.",
            $paras:[
                "itemId [Required] :String, item id."
            ],
            $snippet:[
                "var pro=linb.UIProfile.getFromDomId('linb.UI.TreeBar:a:');alert(_.serialize( pro.getItemByItemId('Namespace') ))"
            ],
            $memo:"For those [linb.absList] profiles in only"
        },
        getSubIdByItemId:{
            $desc:"Gets the sub id (from DOM element id) according to a specified item id.",
            $rtn:"String",
            $paras:[
                "itemId [Required] :String, item id."
            ],
            $snippet:[
                "var pro=linb.UIProfile.getFromDomId('linb.UI.TreeBar:a:');alert(pro.getSubIdByItemId('Namespace') )"
            ],
            $memo:"For those [linb.absList] profiles only"
        },
        getSubNode:{
            $desc:"Gets one or a set of specified inner DOM elements (in the root DOM element) according to the given [key] and [subId].",
            $rtn:"linb.dom object",
            $paras:[
                "key [Required] : String, key string.",
                "subId [Optional] : String or [true]. [true] for getting all the sub nodes with the specified [key]."
            ],
            $snippet:[
                "alert(linb.UIProfile.getFromDomId('logo').getSubNode('KEY').id());"+
                "alert(linb.UIProfile.getFromDomId('linb.UI.TreeBar:a:').getSubNode('ITEM','a').id());"+
                "alert(linb.UIProfile.getFromDomId('linb.UI.TreeBar:a:').getSubNode('ITEM',true).get().length);"
            ],
            $memo:"The [subId] parameter is for those [linb.absList] profiles only"
        },
        getSubNodes:{
            $desc:"Gets a set of specified inner DOM elements(in the root DOM element) according to the given [arr] and [subId].",
            $rtn:"linb.dom object",
            $paras:[
                "arr [Required] : Array, a set of key string.",
                "subId [Optional] : String or [true]. [true] for getting all the sub nodes with the specified [key]."
            ],
            $snippet:[
                "var profile=linb.UIProfile.getFromDomId('linb.UI.TreeBar:a:'); alert(profile.getSubNodes(['KEY','BORDER']).get().length);"+
                "alert(profile.getSubNodes(['ITEM','BAR'],'a').get().length);"+
                "alert(profile.getSubNodes(['ITEM','BAR'],true).get().length);"
            ],

            $memo:"The [subId] parameter is for those [linb.absList] profiles only"
        },
        getSubNodeByItemId:{
            $desc:"Gets a specified inner DOM element(in the root DOM element) according to the given [key] and [itemId].",
            $rtn:"linb.dom object",
            $paras:[
                "key [Required] : String, key string.",
                "itemId [Optional] : String, the item id."
            ],
            $snippet:[
                "alert(linb.UIProfile.getFromDomId('linb.UI.TreeBar:a:').getSubNodeByItemId('ITEM','Class').id())"
            ],
            $memo:"For those [linb.absList] profiles only"
        },
        getKey:{
            $desc:"Gets the profile's main key from a given DOM id.",
            $rtn:"String",
            $paras:[
                "id [Required] :String, DOM id."
            ],
            $snippet:[
                "var pro=linb.UIProfile.getFromDomId('linb.UI.TreeBar:a:');alert(pro.getKey('linb.UI.TreeBar:a:') )"
            ]
        },
        getSubId:{
            $desc:"Gets the profile sub id string from a given DOM id.",
            $rtn:"String",
            $paras:[
                "id [Required] :String, item id."
            ],
            $snippet:[
                "var pro=linb.UIProfile.getFromDomId('linb.UI.TreeBar:a:');alert(pro.getSubId('linb.UI.TreeBar:a:ab') )"
            ]
        },
        clearCache:{
            $desc:"Clears the profile cache object.",
            $memo:"Usually, we do not need to call this function manually."
        },
        pickSubId:{
            $desc:"Picks a sub id string from the inner visual pool, according to a specified key.",
            $rtn:"String",
            $paras:[
                "key [Required] : String, key string."
            ],
            $snippet:[
                "var profile=linb.UIProfile.getFromDomId('linb.UI.TreeBar:a:'), id1=profile.pickSubId('items'), id2=profile.pickSubId('items');profile.reclaimSubId(id1,'items');var id3=profile.pickSubId('items');alert(id1+':'+id2+':'+id3);"
            ],
            $memo:"Usually, we do not need to call this function manually."
        },
        reclaimSubId:{
            $desc:"Reclaim a specified id string to the inner visual pool.",
            $paras:[
                "id [Required] : String, id string.",
                "key [Required] : String, key string."
            ],
            $snippet:[
                "var profile=linb.UIProfile.getFromDomId('linb.UI.TreeBar:a:'), id1=profile.pickSubId('items'), id2=profile.pickSubId('items');profile.reclaimSubId(id1,'items');var id3=profile.pickSubId('items');alert(id1+':'+id2+':'+id3);"
            ],
            $memo:"Usually, we do not need to call this function manually."
        },
        linkParent:{
            $desc:"Links to an UIProfile as parent UIProfile.",
            $rtn:"[self]",
            $paras:[
                "parentProfile [Required] : UIProfile, the parent UIProfile.",
                "linkId [Optional] : String, the link id."
            ],
            $memo:"Usually, we do not need to call this function manually."
        },
        unlinkParent:{
            $desc:"To unlink the parent UIProfile.",
            $rtn:"[self]",
            $memo:"Usually, we do not need to call this function manually."
        }
    }
});

_.set(linb.Locale,["en","doc","linb","Template"], {
    getFromDomId:{
        $desc:"Gets a template object according to a given DOM element id.",
        $rtn:"linb.Template",
        $paras:[
            "id [Required] : String, a DOM element id."
        ],
        $snippet:[
            "var id='linb.temp.2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var t=new linb.Template({'':'<div>{caption}</div>'},{id:'1',caption:'cap'}); t.setDomId('abc'); linb(id).append(t); alert(linb.Template.getFromDomId('abc').serialize());"+
            "}"
        ]
    },
    constructor:{
        $desc:"A template for creating interactive HTML.",
        $paras:[
            "template [Optional] : key/value pairs, a set of templates.",
            "properties [Optional] : key/value pairs, a set of properties.",
            "events [Optional] : key/value pairs, a set of events.",
            "domId [Optional] : String, target dom id."
        ],
        $snippet:[
            "var id='linb.temp.t1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
        "\n//Create a linb.Template, and append to dom directly.\n"+
        "var t=new linb.Template({'':'<div  onclick=[$e]>{pre} {items} {next}</div>',items:'<p onclick=[$e] onmouseover=[$e]>{id} : {caption}</p>'},{pre:'{{{',next:'}}}',items:[{id:1,caption:'a1'},{id:2,caption:'a2'}]},{onClick:function(p){alert(p.domId)},items:{onClick:function(p,e,s){alert(p.domId);}}}, 't_t');"+
            "linb(id).append(t);"+
            "}"
        ]
    },
    prototype:{
        rendered:{
            $desc:"Indicates whether the template is rendered or not."
        },
        getRootNode:{
            $desc:"Gets DOM element from the current template, if it's in DOM already.",
            $rtn:"DOM element",
            $snippet:[
            "var id='linb.temp.2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var t=new linb.Template({'':'<div>{caption}</div>'},{id:'1',caption:'cap'}); t.setDomId('t_2'); linb(id).append(t); alert(t.getRootNode());"+
            "}"
            ]
        },
        getItem:{
            $des:"To get item data from a dom element.",
            $rtn:"Oject",
            $paras:[
                "src [Required] : Dom element"
            ],
            $snippet:[
            "var id='linb.temp.0.1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "var t=new linb.Template({'':'<div>{items}</div>','items':'<span onclick=[$e]>{con}</span>'},{items:[{id:'a',con:'a'},{id:'b',con:'b'}]},{items:{onClick:function(p,e,src){alert(_.serialize(p.getItem(src)))}}}); t.setDomId('t_3'); linb(id).append(t);"+
            "}"
            ]
        },
        toHtml:{
            $desc:"To build HTML string from the current template, and returns it.",
            $rtn:"String",
            $paras:[
                "properties [Optional] : key/value(any) pairs."
            ],
            $snippet:[
                "var t=new linb.Template({'':'<div>{caption}</div>'},{id:'1',caption:'cap'}); alert(t.toHtml())"
            ]
        },
        serialize:{
            $desc:"To serialize the current object to a string representation.",
            $rtn:"String or Array",
            $snippet:[
                "var t=new linb.Template({'':'<div>{caption}</div>'},{id:'1',caption:'cap'}); alert(t.serialize())"
            ]
        },
        destroy:{
            $desc:"To destroy the current template."
        },
        getDomId:{
            $desc:"Gets DOM id from the current template.",
            $rtn:"String",
            $snippet:[
                "var t=new linb.Template({'':'<div>{caption}</div>'},{id:'1',caption:'cap'}); t.setDomId('t_1'); alert(t.getDomId())"
            ]
        },
        render:{
            $desc:"To render the current template to DOM element.",
            $rtn:"[self]",
            $snippet:[
            "var id='linb.temp.3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var t=new linb.Template({'':'<div>{caption}</div>'},{id:'1',caption:'cap'}); t.setDomId('t_3'); linb(id).append(t);"+
            "}"
            ]
        },
        renderOnto:{
            $desc:"To render the current template to DOM, and replace an existing DOM element.",
            $paras:[
                "node [Required] : DOM element or DOM id, the parent node."
            ],
            $snippet:[
            "var id='linb.temp.4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><div id=\"renderOnto\"></div><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var t=new linb.Template({'':'<div>{caption}</div>'},{id:'1',caption:'cap'}); t.setDomId('t_4'); t.renderOnto('renderOnto');"+
            "}"
            ]
        },
        setDomId:{
            $desc:"Set DOM id to the current template.",
            $rtn:'[self]',
            $paras:[
                "id [Required] : String, DOM id."
            ],
            $snippet:[
            "var id='linb.temp.5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var t=new linb.Template({'':'<div>{caption}</div>'},{id:'1',caption:'cap'}); t.setDomId('t_5'); linb(id).append(t);"+
            "}"
            ]
        },
        setEvents:{
            $desc:"Sets events to the current template.",
            $rtn:"[self]",
            $paras:[
                "key [Required] : String or Object.",
                "value [Optional] : Function, the event function."
            ],
            $snippet:[
            "var id='linb.temp.tt1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
        "\n// \n"+
    "var t=new linb.Template(); t.setTemplate({'':'<div  onclick=[$e]>{pre} {items} {next}</div>',items:'<p onclick=[$e] onmouseover=[$e]>{id} : {caption}</p>'}).setProperties({pre:'{{{',next:'}}}',items:[{id:1,caption:'a1'},{id:2,caption:'a2'}]}).setEvents('onClick',function(p){alert(p.domId)}).setEvents('items',{onClick:function(p,e,s){alert(p.domId);}}); linb(id).append(t);"+
            "}"
            ]
        },
        setProperties:{
            $desc:"Sets properties to the current template.",
            $rtn:"[self]",
            $paras:[
                "key [Required] : String or Object.",
                "value [Optional] : Any."
            ],
            $snippet:[
            "var id='linb.temp.tt2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
        "\n// \n"+
    "var t=new linb.Template(); t.setTemplate({'':'<div  onclick=[$e]>{pre} {items} {next}</div>',items:'<p onclick=[$e] onmouseover=[$e]>{id} : {caption}</p>'}).setProperties({pre:'{{{',next:'}}}'}).setProperties('items',[{id:1,caption:'a1'},{id:2,caption:'a2'}]).setEvents({onClick:function(p){alert(p.domId)},items:{onClick:function(p,e,s){alert(p.domId);}}}); linb(id).append(t);"+
            "}"
            ]
        },
        setTemplate:{
            $desc:"Sets template to the current template.",
            $rtn:"[self]",
            $paras:[
                "key [Required] : String or Object.",
                "value [Optional] : String, the template string."
            ],
            $snippet:[
            "var id='linb.temp.tt3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
        "\n// \n"+
    "var t=new linb.Template(); t.setTemplate('<div  onclick=[$e]>{pre} {items} {next}</div>').setTemplate('items','<p onclick=[$e] onmouseover=[$e]>{id} : {caption}</p>').setProperties({pre:'{{{',next:'}}}',items:[{id:1,caption:'a1'},{id:2,caption:'a2'}]}).setEvents({onClick:function(p){alert(p.domId)},items:{onClick:function(p,e,s){alert(p.domId);}}}); linb(id).append(t);"+
            "}"
            ]
        }
    }
});


_.set(linb.Locale,["en","doc","linb","Com"], {
    constructor:{
        $desc:"linb.Com constructor",
        $paras:[
            "properties [Optional] : key/value(any) pairs. the Com properties object. Default is {}.",
            "events [Optional] : key/value(Function) pairs. the Com event object. Default is {}.",
            "host [Optional] : object. the Com's host object. Default is itself."
        ],
        $snippet:[
            "var order=[], com = new linb.Com({"+
            "    $1:1"+
            "  },"+
            "  {"+
            "    beforeCreated:function(){order.push('beforeCreated'); linb.log('beforeCreated');},"+
            "    onCreated:function(){order.push('onCreated'); linb.log('onCreated');},"+
            "    onLoadBaseClass:function(c,t,key){order.push('onLoadBaseClass: '+key); linb.log('onLoadBaseClass: '+key); },"+
            "    onIniResource:function(){order.push('onIniResource'); linb.log('onIniResource');},"+
            "    beforeIniComponents:function(){order.push('beforeIniComponents'); linb.log('beforeIniComponents');},"+
            "    afterIniComponents:function(){order.push('afterIniComponents'); linb.log('afterIniComponents');},"+
            "    onLoadReqiredClass:function(c,t,key){order.push('onLoadReqiredClass: '+key); linb.log('onLoadReqiredClass: '+key);},"+
            "    onReady:function(){order.push('onReady'); linb.log('onReady');},"+
            "    onRender:function(com){order.push('onRender'); linb.log('onRender'); com.dialog1.setHtml(order.join('<br />'));}"+
            "  });"+
            "com.base=['linb.UI','linb.Date'];"+
            "com.required=['linb.UI.Dialog','linb.UI.Button'];"+
            "com.iniComponents=function(){order.push('iniComponents'); return (new linb.UI.Dialog()).host(this, 'dialog2').setWidth(150).setHeight(150).get() };"+
            "com.iniResource=function(){order.push('iniResource'); };"+
            "com.iniExComs=function(){order.push('iniExComs'); };"+

            "var abox=com.getComponents();"+
            "abox.merge((new linb.UI.Dialog()).host(com, 'dialog1'));"+
            "com.setComponents(abox);"+

            "com.show(function(com){"+
            "   order.push('onEnd'); "+
            "});",

            "Class('App1','linb.Com',{" +
            "    Instance:{" +
            "        base : ['linb.UI', 'linb.Date']," +
            "        required : ['linb.UI.Dialog', 'linb.UI.Button']," +
            "        events:{" +
            "            beforeCreated : function(com){" +
            "                com._info=[];" +
            "                com._info.push('beforeCreated');" +
            "                linb.log('beforeCreated');" +
            "            }," +
            "            onCreated : function(com){" +
            "                com._info.push('onCreated');" +
            "                linb.log('onCreated');" +
            "            }," +
            "            onLoadBaseClass : function(com, t, key){" +
            "                com._info.push('onLoadBaseClass: ' + key);" +
            "                linb.log('onLoadBaseClass: ' + key);" +
            "            }," +
            "            onIniResource : function(com){" +
            "                com._info.push('onIniResource');" +
            "                linb.log('onIniResource');" +
            "            }," +
            "            beforeIniComponents : function(com){" +
            "                com._info.push('beforeIniComponents');" +
            "                linb.log('beforeIniComponents');" +
            "            }," +
            "            afterIniComponents : function(com){" +
            "                com._info.push('afterIniComponents');" +
            "                linb.log('afterIniComponents');" +
            "            }," +
            "            onLoadReqiredClass : function(com, t, key){" +
            "                com._info.push('onLoadReqiredClass: ' + key);" +
            "                linb.log('onLoadReqiredClass: ' + key);" +
            "            }," +
            "            onReady : function(com){" +
            "                com._info.push('onReady');" +
            "                linb.log('onReady');" +
            "            }," +
            "            onRender : function(com){" +
            "                com._info.push('onRender');" +
            "                linb.log('onRender');" +
            "                com.dialog1.setHtml(com._info.join('<br />'));" +
            "            }" +
            "        }," +
            "        customAppend:function(parent,showId,threadid){" +
            "            this.dialog1.show(parent);" +
            "        }," +
            "        iniComponents : function(){" +
            "            this._info.push('iniComponents');\n" +
            "            // [[code created by jsLinb UI Builder\n" +
            "            var host=this, children=[], append=function(child){children.push(child.get(0))};" +
            "            append((new linb.UI.Dialog)" +
            "                .host(host,'dialog1')" +
            "                .setWidth(450)" +
            "                .setHeight(450)" +
            "            );" +
            "            return children;\n" +
            "            // ]]code created by jsLinb UI Builder\n" +
            "        }," +
            "        iniResource : function(){" +
            "            this._info.push('iniResource');" +
            "        }," +
            "        iniExComs : function(){" +
            "            this._info.push('iniExComs');" +
            "        }" +
            "    }" +
            "});" +
            "var com = new App1;" +
            "com.show();",

            "Class('App2','linb.Com',{" +
            "    Instance:{" +
            "        base : ['linb.UI']," +
            "        required : ['linb.UI.Dialog']," +
            "        events:{" +
            "            beforeCreated : '_trace'," +
            "            onCreated : '_trace'," +
            "            onLoadBaseClass : '_trace'," +
            "            onIniResource : '_trace'," +
            "            beforeIniComponents : '_trace'," +
            "            afterIniComponents : '_trace'," +
            "            onLoadReqiredClass : '_trace'," +
            "            onReady : '_trace'," +
            "            onRender : '_trace'," +
            "        }," +
            "        customAppend:function(parent,showId,threadid){" +
            "            this.dialog1.show(parent);" +
            "        }," +
            "        iniComponents : function(){" +
            "            this._info.push('iniComponents');\n" +
            "            // [[code created by jsLinb UI Builder\n" +
            "            var host=this, children=[], append=function(child){children.push(child.get(0))};" +
            "            append((new linb.UI.Dialog)" +
            "                .host(host,'dialog1')" +
            "                .setWidth(350)" +
            "                .setHeight(450)" +
            "            );" +
            "            return children;\n" +
            "            // ]]code created by jsLinb UI Builder\n" +
            "        }," +
            "        iniResource : function(){" +
            "            this._info.push('iniResource');" +
            "        }," +
            "        iniExComs : function(){" +
            "            this._info.push('iniExComs');" +
            "        }, " +
            "        _trace : function(com, threadid){" +
            "            com._info.push(com.$lastEvent);" +
            "        }" +
            "    }" +
            "});" +
            "var com = new App2;" +
            "com._info=[];"+
            "com.show(function(com){com.dialog1.setHtml(com._info.join('<br />'));});"
        ]
    },
    'load':{
        $desc:"Loads a linb.Com object code from remote file first, creates it, and returns it.",
        $paras:[
            "cls [Required] : String, the full class path name(e.g. 'linb.App').",
            "onEnd [Optional]: Function, arguments : [the current linb.Com object]. This function will be called after the process is end.",
            "lang [Optional] : String, language name.(e.g. 'en').",
            "showUI [Optional] : Bool, indicates whether or not it shows the Com UI. Default is true;"
        ],
        $snippet:[
            "////Uses the beblow line to load a specified application, and append its UI to 'document.body' if its UI exits. \n"+
            "//linb.Com.load('RootClassName',function(){alert('ok')},'en')\n",
            "linb.Com.load('App.Test1',function(){alert('ok')});",
            "linb.Com.load('App.Test1',function(com){com.show(function(){alert('ok')},SPA.mainLayout,'main')},null,false)"
        ]
    },
    prototype:{
        render:{
            $desc:'To render the inner UI Components',
            $rtn:"[self]",
            $demo:"You have to call this function after the com was created. And linb.Com.show will trigger this function automatically."
        },
        setComponents:{
            $desc:"Sets the current Com's Components.",
            $rtn:"[self]",
            $paras:[
                "obj [Reqired] : linb.absObj object."
            ],
            $snippet:[
                "linb.SC('App.Test1',function(){var com=new this; com.create(function(com){com.setComponents((new linb.UI.Button()).host(window,'btn') ); alert(com.getComponents().get(0).alias); });},false);"
            ]
        },
        getComponents:{
            $desc:"Gets all Components in a specified linb.Com object.",
            $rtn:"linb.absObj object",
            $snippet:[
                "Class('App1','linb.Com',{" +
                "   Instance:{"+
                "        iniComponents : function(){" +
                "            var host=this, children=[], append=function(child){children.push(child.get(0))};" +
                "            append((new linb.DataBinder)" +
                "                .host(host,'db1')" +
                "                .setName('db1')" +
                "            );" +
                "            append((new linb.UI.Dialog)" +
                "                .host(host,'dialog1')" +
                "                .setWidth(350)" +
                "                .setHeight(450)" +
                "            );" +
                "            return children;\n" +
                "        }" +
                "   }" +
                "});"+
                "var com=new App1;"+
                "com.create(function(com){alert(com.getComponents().get(0).alias);});"
            ]
        },
        getUIComponents:{
            $desc:"Gets all UI Components in a specified linb.Com object.",
            $rtn:"linb.UI object",
            $snippet:[
                "Class('App1','linb.Com',{" +
                "   Instance:{"+
                "        iniComponents : function(){" +
                "            var host=this, children=[], append=function(child){children.push(child.get(0))};" +
                "            append((new linb.DataBinder)" +
                "                .host(host,'db1')" +
                "                .setName('db1')" +
                "            );" +
                "            append((new linb.UI.Dialog)" +
                "                .host(host,'dialog1')" +
                "                .setWidth(350)" +
                "                .setHeight(450)" +
                "            );" +
                "            return children;\n" +
                "        }" +
                "   }" +
                "});"+
                "var com=new App1;"+
                "com.create(function(com){alert(com.getUIComponents().get(0).alias);});"
            ]
        },
        getEvents:{
            $desc:"Gets all events or a specified event from a Com object.",
            $rtn:"Object , String or Function",
            $paras:[
                "key [Optional] : String"
            ],
            $snippet:[
                "linb.SC('App.Test1',function(){var com=new this; com.create(function(com){alert(_.serialize(com.getEvents()))});},false);",
                "linb.SC('App.Test1',function(){var com=new this; com.create(function(com){alert(_.serialize(com.getEvents('onReady')))});},false);"
            ]
        },
        setEvents:{
            $desc:"Sets a set of event functions(or a specified event function with a key) to the Com object.",
            $rtn:"[self]",
            $paras:[
                "key [Required] : key/value(Function) pairs or String. A set of event functions or key.",
                "value [Optional] : Function, event function."
            ],
            $snippet:[
                "linb.SC('App.Test1',function(){var com=new this; com.create(function(com){com.setEvents('onA',function(){}); alert(com.getEvents('onA'))});},false);"
            ]
        },
        create:{
            $desc:"Creates the Com object in async mode.",
            $paras:[
                "onEnd [Optiona] : Function, the callback function, it will be executed once when the Com is created successfully.",
                "threadid [Optional] : String, the inner thread id."
            ],
            $snippet:[
                "linb.SC('App.Test1',function(){var com=new this; com.create(function(com){alert('created!')});},false);"
            ]
        },
        show:{
            $desc:"Shows the Com object.",
            $paras:[
                "onEnd [Optiona] : Function, the callback function, it will be executed once when the Com is created successfully.",
                "parent [Optional] : the parent DOM node or linb.UI object.",
                "subId [Optional] : String, this parameter valid when parent is linb.UI only. The sub id that Determines the [target] will be added to which sub DOM node. This parameter can be [false] too, that means the [target] will be appended to DOM only, no link created between the [target] UIProfiles and the parent UIProfile.",
                "threadid [Optional] : String, the inner thread id."
            ],
            $snippet:[
                "linb.SC('App.Test1',function(){var com=new this; com.show(function(){});},false);"
            ]
        },
        requestData:{
            $desc:"Executes a group of linb.absIO objects.",
            $paras:[
                "group [Require] : Array, a set of linb.absIO objects.",
                "onEnd [Optional]:  Function, the callback function, it will be executed after all the absIO were finished.",
                "threadid [Optional] : String, the inner thread id."
            ],
            $memo:"Usually, this function will be used in 'fillUI' function for requesting data from server and filling data into UI."
        },
        composeUI:{
            $desc:"Composes the current Com's UI.",
            $paras:[
                "onEnd [Optional]:  Function, the callback function, it must be called in the current composeUI function.",
                "threadid [Optional] : String, the inner thread id.",
                "flag [Optional] : Bool, a parameter for user to Determines whether or not  the current UI will be forced to compose."
            ],
            $memo:"For sub class overwriting."
        },
        fillUI:{
            $desc:"Fills the current Com's UI.",
            $paras:[
                "onEnd [Optional]:  Function, the callback function, it must be called in the current fillUI function.",
                "threadid [Optional] : String, the inner thread id.",
                "flag [Optional] : Bool, a parameter for user to Determines whether or not  the current UI will be forced to fill."
            ],
            $memo:"For sub class overwriting."
        },
        destroy:{
            $desc:"Destroys the current object.",
            $memo:"Usually, we do not need to call this function manually."
        },
        iniComponents:{
            $desc:"Creates the inner Components and return the set of Components(linb.absObj object).",
            $rtn:"Array, a set of linb.absObj objects.",
            $snippet:[
                "Class('App1','linb.Com',{" +
                "   Instance:{"+
                "        iniComponents : function(){" +
                "            var host=this, children=[], append=function(child){children.push(child.get(0))};" +
                "            append((new linb.DataBinder)" +
                "                .host(host,'db1')" +
                "                .setName('db1')" +
                "            );" +
                "            append((new linb.UI.Dialog)" +
                "                .host(host,'dialog1')" +
                "                .setWidth(350)" +
                "                .setHeight(450)" +
                "            );" +
                "            return children;\n" +
                "        }" +
                "   }" +
                "});"+
                "var com=new App1;"+
                "com.create(function(com){alert(com.getUIComponents().get(0).alias);});"
            ]
        },
        getProperties:{
            $desc:"Gets all Properties or a specified Properties from a Com object.",
            $rtn:"Any",
            $paras:[
                "key [Optional] : String"
            ],
            $snippet:[
                "linb.SC('App.Test1',function(){var com=new this; com.create(function(com){alert(_.serialize(com.getProperties()))});},false);",
                "linb.SC('App.Test1',function(){var com=new this; com.create(function(com){alert(com.getProperties('p1'))});},false);"
            ]
        },
        setProperties:{
            $desc:"Sets a set of Properties(or an specified Property with a key) to the current Com object.",
            $rtn:"[self]",
            $paras:[
                "key [Required] : key/value pairs or String. A set of Properties or key.",
                "value [Optional] : Any, a property value."
            ],
            $snippet:[
                "linb.SC('App.Test1',function(){var com=new this; com.create(function(com){com.setProperties('p3','p3 value'); alert(com.getProperties('p3'))});},false);"
            ]
        },
        setHost:{
            $desc:"Sets the host object to the Com object.",
            $rtn:"[self]",
            $paras:[
                "host [Requied] : Object, the host object.",
                "alias [Optional] : String, the alias name."
            ],
            $snippet:[
                "linb.SC('App.Test1',function(){var com=new this; com.create(function(com){com.setHost(window,'com_alias'); alert(com.getHost()===window); alert(window.com_alias)});},false);"
            ]
        },
        getHost:{
            $des:"Gets the host object.",
            $rtn:"Object",
            $snippet:[
                "linb.SC('App.Test1',function(){var com=new this; com.create(function(com){com.setHost(window,'com_alias'); alert(com.getHost()===window); alert(window.com_alias)});},false);"
            ]
        },
        
        beforeCreated:{
            $desc:'Fired before com is created.',
            $paras:[
                'com : linb.Com object.',
                'threadid : String, thread id.'
            ],
            $memo:'See constructor.'
        },
        onCreated:{
            $desc:'Fired when com is created.',
            $paras:[
                'com : linb.Com object.',
                'threadid : String, thread id.'
            ],
            $memo:'See constructor.'
        },
        onLoadBaseClass:{
            $desc:'Fired when com loads base classes.',
            $paras:[
                'com : linb.Com object.',
                'threadid : String, thread id.',
                'key: String, base class name.'
            ],
            $memo:'See constructor.'
        },
        onIniResource:{
            $desc:'Fired when com loads resources.',
            $paras:[
                'com : linb.Com object.',
                'threadid : String, thread id.',
                'key: String, base class name.'
            ],
            $memo:'See constructor.'
        },
        beforeIniComponents:{
            $desc:'Fired beofre com object initializes inner components.',
            $paras:[
                'com : linb.Com object.',
                'threadid : String, thread id.'
            ],
            $memo:'See constructor.'
        },
        afterIniComponents:{
            $desc:'Fired after com object initializes inner components.',
            $paras:[
                'com : linb.Com object.',
                'threadid : String, thread id.'
            ],
            $memo:'See constructor.'
        },
        onLoadRequiredClass:{
            $desc:'Fired when com loads requried Classes.',
            $paras:[
                'com : linb.Com object.',
                'threadid : String, thread id.',
                'key: String, class name.'
            ],
            $memo:'See constructor.'
        },
        onReady:{
            $desc:'Fired when com is ready.',
            $paras:[
                'com : linb.Com object.',
                'threadid : String, thread id.'
            ],
            $memo:'See constructor.'
        },
        onRender:{
            $desc:'Fired when com is added to DOM.',
            $paras:[
                'com : linb.Com object.',
                'threadid : String, thread id.'
            ],
            $memo:'See constructor.'
        }
    }
});


_.set(linb.Locale,["en","doc","linb","ComFactory"], {
    setProfile:{
        $desc:"Sets comfactory profile.",
        $rtn:'[self]',
        $paras:[
            "key [Required] : String or key/value pairs object.",
            "value [Optional] : String or key/value pairs object."
        ],
        $snippet:[
            "linb.ComFactory.setProfile({test1:'App.Test1',test2:'App.Test2'});"+
            "linb.ComFactory.setProfile('test1','App.Test1');"+
            "linb.ComFactory.setProfile({test1:{cls:'App.Test1'},test2:{cls:'App.Test2'}});"+
            "linb.ComFactory.setProfile('test1',{cls:'App.Test1',properties:{dlgCaption:'dialog caption'}});"+
            "alert(_.serialize(linb.ComFactory.getProfile()));"+
            "alert(linb.ComFactory.getProfile('test1'));"
        ]
    },
    getProfile:{
        $desc:"Gets comfactory profile.",
        $rtn:'String or key/value pairs object',
        $paras:[
            "key [Optional] : String."
        ],
        $snippet:[
            "linb.ComFactory.setProfile({test1:'App.Test1',test2:'App.Test2'});"+
            "alert(linb.ComFactory.getProfile());"+
            "alert(linb.ComFactory.getProfile('test1'));"
        ]
    },
    broadcast:{
        $desc:"Broadcasts a message(function) to all the Coms.",
        $paras:[
            "fun [Required] : Function, the function to broadcast."
        ],
        $snippet:[
            "linb.SC('App.Test1',function(){linb.ComFactory.setCom('test1', (new this));},false);"+
            "linb.SC('App.Test2',function(){linb.ComFactory.setCom('test2',(new this));},false);"+
            "linb.ComFactory.broadcast(function(i){alert(i + ' / ' + this.KEY)});"
        ]
    },
    destroyAll:{
        $desc:"Destroys all the Coms in ComFactory.",
        $snippet:[
            "linb.SC('App.Test1',function(){linb.ComFactory.setCom('test1',(new this));},false);"+
            "linb.SC('App.Test2',function(){linb.ComFactory.setCom('test2',(new this));},false);"+
            "linb.ComFactory.destroyAll();"+
            "alert(linb.ComFactory.getComFromCache('test'));"
        ]
    },
    getComFromCache:{
        $desc:"Gets a Com object from cache directly if it exists.",
        $rtn:"Com object or null",
        $paras:[
            "id [Required] : String, the Com id."
        ],
        $snippet:[
            "linb.SC('App.Test1',function(){linb.ComFactory.setCom('test1',(new this));},false);"+
            "linb.SC('App.Test2',function(){linb.ComFactory.setCom('test2',(new this));},false);"+
            "alert(linb.ComFactory.getComFromCache('test1').KEY);"
        ]
    },
    getCom :{
        $desc:"Gets a Com object from cache directly if it exists, or loads the Com code first, creates the Com and returns it.",
        $rtn:"Com object or null",
        $paras:[
            "id [Required] : String, the Com id.",
            "onEnd [Optional] : Function, the callback function, it will be executed once when the Com is created successfully.",
            "threadid [Optional] : String, the inner threadid",
            "singleton[Optional] : Bool, default is true. If singleton is false, that indicates ComFactory won't get it from the cache, and won't cache the result."
        ],
        $snippet:[
            "linb.ComFactory.destroyAll();"+
            "linb.ComFactory.setProfile({test1:'App.Test1',test2:'App.Test2'});"+
            "linb.ComFactory.getCom('test1',function(){alert('The Com loaded successfully.')});"
        ]
    },
    setCom:{
        $desc:"Sets the Com object to the cache with a specified id string.",
        $rtn:"[self]",
        $paras:[
            "id [Required] : String, the Com id.",
            "obj [Required] : Object, the Com object."
        ],
        $snippet:[
            "linb.SC('App.Test1',function(){linb.ComFactory.setCom('test1',(new this));},false);"+
            "linb.SC('App.Test2',function(){linb.ComFactory.setCom('test2',(new this));},false);"+
            "alert(linb.ComFactory.getComFromCache('test1').KEY);"
        ]
    },
    newCom :{
        $desc:"Creates a new Com Class if the Class exists, or loads the Com Class code first, creates it, and returns it.",
        $paras:[
            "cls [Required] : String, the Com Class path name.",
            "onEnd [Optional] : Function, the callback function, it will be executed once when the Com is created successfully.",
            "threadid [Optional] : String, the inner threadid"
        ],
        $snippet:[
            "linb.ComFactory.destroyAll();"+
            "linb.ComFactory.newCom('App.Test1',function(){alert('The com loaded successfully.')});"
        ]
    },
    prepareWidgets:{
        $desc:"Loads and creates all the Widgets in the background, those Widgets needs to be defined in the required proprety of the current Application Class.",
        $snippet:[
            "//linb.ComFactory.prepareWidgets();"
        ]
    },
    prepareComs:{
        $desc:"Loads and creates a set of Coms in the background, those Coms needs to be defined in the profile first.",
        $snippet:[
            "//linb.ComFactory.setProfile({test1:'App.Test1',test2:'App.Test2'});\n"+
            "//linb.ComFactory.prepareWidgets(['test1','test2']);"
        ]
    },
    storeCom:{
        $desc:"Stores a specified Com UI. (Detaches it from its parent Node, and saves it to a hidden div.)",
        $paras:[
            "id [Require] : the Com id in linb.ComFactory profile."
        ],
        $snippet:[
            "linb.ComFactory.destroyAll();"+
            "linb.ComFactory.setProfile('test1',{cls:'App.Test1',properties:{dlgCaption:'dialog caption'}});"+
            "linb.ComFactory.getCom('test1',function(){ this.showDlg(); _.asyRun(function(){linb.ComFactory.storeCom('test1')},1000); });"
        ]
    }
});

_.set(linb.Locale,["en","doc","linb","DomProfile"], {
});

_.set(linb.Locale,["en","doc","linb","DataBinder"], {
    constructor:{
        $desc:"Creates a databinder object."
    },
    destroyAll:{
        $desc:"To destroy all linb.DataBinder objects.",
        $snippet:[
            "//linb.DataBinder.destroyAll()"
        ]
    },
    getFromName:{
        $desc:"To get a linb.DataBinder object from it's name.",
        $rtn:'linb.DataBinder object.',
        $paras:[
            "name [Required] : String, the DataBinder name."
        ],
        $snippet:[
            "var db=new linb.DataBinder();db.setName('abc');"+
            "alert(db=linb.DataBinder.getFromName('abc'));"+
            "db.destroy();"+
            "alert(linb.DataBinder.getFromName('abc'));"
        ]
    },
    prototype:{
        checkValid:{
            $desc:"To checks if all the bound linb.absValue profiles are valid. For example: if user input some chars into a 'number only' linb.UI.Input(it is bound to the current databinder), this function will return [false].",
            $rtn:"Bool"
        },
        destroy:{
            $desc:"To destroy the current object.",
            $memo:"Usually, we do not need to call this function manually."
        },
        setName:{
            $desc:"Sets name property value to a the first databinder profile.",
            $rtn:'[self]',
            $paras:[
                "value [Required] : String, name string"
            ],
            $memo:"To see the 'getValue' snippets. "
        },
        getUI:{
            $desc:"Gets the bound UI object.",
            $rtn:'linb.UI object.',
            $memo:"To see the 'getValue' snippets. ",
            $snippet:[
                "var id='linb.temp.ui'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id).append(new linb.UI.Input({position:'relative',dataBinder:'abc'}));"+
                "alert(linb.DataBinder.getFromName('abc').getUI().serialize());"+
                "}"
            ]
        },
        getName:{
            $desc:"Return the name property of the first databinder profile.",
            $rtn:'String',
            $memo:"To see the 'getValue' snippets. "
        },
        getValue:{
            $desc:"Gets a key/value pairs object from the current databinder, that includes the values of all those bound linb.absValue profiles.",
            $rtn:"key/value pairs object.",
            $snippet:[
                "var id='linb.temp.cv'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var db1=new linb.DataBinder,i1=new linb.UI.Input({position:'relative'}), i2=new linb.UI.Input({position:'relative'}); db1.setName('db1'); i1.setValue('aaa').setDataBinder('db1').setDataField('i1'); i2.setValue('bbb').setDataBinder('db1').setDataField('i2');"+
                "linb(id).append(i1).append(i2);"+
                "alert(db1.getName());"+
                "alert(_.serialize(db1.getValue()));"+
                "_.asyRun(function(){"+
                "   db1.resetValue({i1:'111',i2:'222'});"+
                "   alert(_.serialize(db1.getValue()));"+
                "},3000);"+
                "}"
            ]
        },
        resetValue:{
            $desc:"Sets or resets the value of those bound linb.absValue profiles.",
            $rtn:"[self].",
            $paras:[
                "hash [Optional] : a key/value pairs object. If this parameter is not specified, the bound linb.absValue profiles will be set to their original values."
            ],
            $memo:"To see the 'getValue' snippets. "
        }
    }
});

_.set(linb.Locale,["en","doc","linb","Tips"], {
    AUTOHIDETIME:{
        $desc:"Indicates that how long(in ms) the tooltips will be hidden automatically after it's showed. This parameter is valid when MOABLE is [true].",
        $snippet:["alert(linb.Tips.AUTOHIDETIME)"]
    },
    DELAYTIME:{
        $desc:"Indicates that how long(in ms) the tooltips will be showed after the function 'linb.Tips.show' is called.",
        $snippet:["alert(linb.Tips.DELAYTIME)"]
    },
    MAXWIDTH:{
        $desc:"The max width of the tooltips.",
        $snippet:["alert(linb.Tips.MAXWIDTH)"]
    },
    MOVABLE:{
        $desc:"Indicates whether or not the tooltips is movable.",
        $snippet:["alert(linb.Tips.MOVABLE)"]
    },
    TIPSKEY:{
        $desc:"The tooltips key. Default is 'tips'.",
        $snippet:["alert(linb.Tips.TIPSKEY)"]
    },
    getTips:{
        $desc:"To get the tips string.",
        $snippet:[
            "linb.Tips.show({left:100,top:100}, 'a string');"+
            "alert(linb.Tips.getTips());"+
            "linb.Tips.hide();"+
            "alert(linb.Tips.getTips());"
        ]
    },
    hide:{
        $desc:"To hide the tooltips.",
        $snippet:[
            "linb.Tips.show({left:100,top:100}, 'a string'); _.asyRun(function(){linb.Tips.hide()},1000); _.asyRun(function(){linb.Tips.show({left:100,top:100}, {tips:'an object with a \\\'tips\\\' key'})},2000); _.asyRun(function(){linb.Tips.hide()},3000); _.asyRun(function(){linb.Tips.show({left:100,top:100}, {any:'an object with a customizable key'},'any')},4000);_.asyRun(function(){linb.Tips.hide()},5000);"
        ]
    },
    show:{
        $desc:"To show the tooltips.",
        $paras:[
            "pos [Required] : {left:Number,top:Number}, the position of the tooltips.",
            "item [Required] : String or Object, to provide the tooltips content.",
            "key [Optional] : String, the tips key. Default is 'tips'."
        ],
        $snippet:[
            "linb.Tips.show({left:100,top:100}, 'a string'); _.asyRun(function(){linb.Tips.hide()},1000); _.asyRun(function(){linb.Tips.show({left:100,top:100}, {tips:'an object with a \\\'tips\\\' key'})},2000); _.asyRun(function(){linb.Tips.hide()},3000); _.asyRun(function(){linb.Tips.show({left:100,top:100}, {any:'an object with a customizable key'},'any')},4000);_.asyRun(function(){linb.Tips.hide()},5000);"
        ]
    }
});

_.set(linb.Locale,["en","doc","linb","Coder"], {
    formatText:{
        $desc:"Converts a snippet of js/css/php/html code to more readable text format.",
        $rtn:"String",
        $paras:[
            "code [Required] : String, code snippet.",
            "type [Optional] : String, code type. Defalut is 'js'"
        ],
        $snippet:[
            "alert(linb.Coder.formatText('var a=function(){var a=1;var b=2;var c={a:1,b:2};};'))",
            "alert(linb.Coder.formatText('.cls{left:0;top:0}','css'))",
            "alert(linb.Coder.formatText('<div><p>1</p><p>2</p><p><span>3</span>4</p></div>','html'))",
            "alert(linb.Coder.formatText(' foreach ($d as $k => $v){print $k.$v;}','php'))"
        ]
    },
    formatHTML:{
        $desc:"Converts a snippet of js/css/php/html code to HTML format.",
        $rtn:"String",
        $paras:[
            "code [Required] : String, code snippet.",
            "type [Optional] : String, code type. Defalut is 'js'",
            "paras [Optional] : Array of String. Commands, e.g. ['plain','run']",
            "id [Optional] : String, the output HTML DOM id.",
            "height [Optional] : Number, the output HTML height."
        ],
        $snippet:[
            "var str=linb.Coder.formatHTML('var a=function(){var a=1;var b=2;var c={a:1,b:2};};alert(1);','js',['plain','run'],'i-d'); linb.UI.Dialog.alert('linb.Coder', str)",
            "var str=linb.Coder.formatHTML('.cls{left:0;top:0}','css'); linb.UI.Dialog.alert('linb.Coder', str)",
            "var str=linb.Coder.formatHTML('<div><p>1</p><p>2</p><p><span>3</span>4</p></div>','html'); linb.UI.Dialog.alert('linb.Coder', str)",
            "var str=linb.Coder.formatHTML(' foreach ($d as $k => $v){print $k.$v;}','php',['plain']); linb.UI.Dialog.alert('linb.Coder', str)"
        ]
    },
    formatAll:{
        $desc:"Converts a snippet of js/css/php/html code to more readable HTML format. Equals to formatText + formatHTML.",
        $rtn:"String",
        $paras:[
            "code [Required] : String, code snippet.",
            "type [Optional] : String, code type. Defalut is 'js'",
            "paras [Optional] : Array of String. Commands, e.g. ['plain','run']",
            "id [Optional] : String, the output HTML DOM id.",
            "height [Optional] : Number, the output HTML height."
        ],
        $snippet:[
            "var str=linb.Coder.formatAll('var a=function(){var a=1;var b=2;var c={a:1,b:2};};alert(1);','js',['plain','run'],'i-d'); linb.UI.Dialog.alert('linb.Coder', str)",
            "var str=linb.Coder.formatAll('.cls{left:0;top:0}','css'); linb.UI.Dialog.alert('linb.Coder', str)",
            "var str=linb.Coder.formatAll('<div><p>1</p><p>2</p><p><span>3</span>4</p></div>','html'); linb.UI.Dialog.alert('linb.Coder', str)",
            "var str=linb.Coder.formatAll(' foreach ($d as $k => $v){print $k.$v;}','php',['plain']); linb.UI.Dialog.alert('linb.Coder', str)"
        ]
    },
    replace:{
        $desc:"An wrapper for advance string replace.",
        $rtn:"String",
        $paras:[
            "str [Required] : string, the target string.",
            "reg [Required] : Array: [string, string] or [RegExp, string].",
            "replace [Optional] : String, the replace.",
            "ignore_case [Optional] : Bool, for RegExp symbol 'i'."
        ],
        $snippet:[
            'alert(linb.Coder.replace("aAa","a","*",true));'+
            'alert(linb.Coder.replace("aAa","a","*",false));'+
            'alert(linb.Coder.replace("aAa","a","*"));'+
            'alert(linb.Coder.replace("aAa",/a/,"*"));'+
            'alert(linb.Coder.replace("aAa",["a","*"]));'+
            'alert(linb.Coder.replace("aAa",[["a","*"]]));',
            'alert(linb.Coder.replace("aAa",[["a","*"],[/A/,"-"]]))',
            '//Use "$0" to protect "ab" in the string: \n alert(linb.Coder.replace("aba",[["ab","$0"],["a","*"]]))',
            'alert(linb.Coder.replace("aba ab a",[["ab","$0"],["a",function(s,i){return s[i].toUpperCase();}]]))'
        ]
    },
    applyById:{
        $desc:"Apply linb.Coder to all the specified elements with a given DOM id.",
        $paras:[
            "id [Required] : String, DOM id.",
            "formatAll [Optional] : Bool, use 'formatAll' or not (use 'formatHTML'), Default is [false]."
        ],
        $memo:"Generally, this function will not be used in a web application, but a HTML page with code to be highlighted."
    }
});


_.set(linb.Locale,["en","doc","linb","absList"], {
    prototype:{
        fireItemClickEvent:{
            $desc:"Fires click event on the specified item.",
            $paras:[
                "subId [Required] : String, the id value of target item."
            ],
            $snippet:[
                "var id='linb.temp.tabs6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                "_.asyRun(function(){o.fireItemClickEvent('b')},1000);"+
                "}"
            ]
        },
        updateItem:{
            $desc:"Updates the specified item(key or value) and the corresponding DOM Element.",
            $rtn:"String",
            $paras:[
                "id [Required] : String. The node id.",
                "options [Required] : object. a key/value pairs."
            ],
            $snippet:[
                "var id='linb.temp.absl0-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeBar({width:'auto',iniFold:true,height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c',sub:[{id:'cz',caption:'cz'}]}]});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.updateItem('b',{caption:'bbb', image:'img/img.gif', imagePos:'left -16px'})},1000);" +
                "}"
            ]
        },

        getItems:{
            $desc:"Gets the items proerpy from the current UI object.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.absl1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.List({position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]}))"+
                "_.asyRun(function(){alert(_.serialize(o.getItems()))});"+
                "}"
            ]
        },
        setItems:{
            $desc:"Sets the items property to the current UI object, and reflects it to DOM UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Array, the items.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.absl2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.List({position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]}))"+
                "_.asyRun(function(){o.setItems([{id:'aaa',caption:'bbb'}])});"+
                "}"
            ]
        },
        insertItems:{
            $desc:"Inserts a set of items to the current UI object.",
            $rtn:"[self]",
            $paras:[
                "arr [Required] : Array. A set of Item objects.",
                "base [Optional] : String. the base item id string.",
                "before [Optional] : Bool. Indicates whether it inserts the target items before the base, or after the base. Default is false;"
            ],
            $snippet:[
                "var id='linb.temp.absl3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.List({position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]}));"+
                "_.asyRun(function(){o.insertItems([{id:'a1',caption:'a1'}],'b',true)},1000);"+
                "_.asyRun(function(){o.insertItems([{id:'c1',caption:'c1'}],'c',false)},2000);"+
                "_.asyRun(function(){o.insertItems([{id:'a0',caption:'a0'}],null,true)},3000);"+
                "_.asyRun(function(){o.insertItems([{id:'c2',caption:'c2'}],null,false)},4000);"+
                "_.asyRun(function(){o.insertItems([{id:'h',caption:'h'},{id:'i',caption:'i'}])},5000);"+
                "}"
            ]
        },
        removeItems:{
            $desc:"Removes a set of items from the current UI object.",
            $rtn:"String",
            $paras:[
                "arr [Required] : Array. A set of id strings."
            ],
            $snippet:[
                "var id='linb.temp.absl4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.List({position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]}));"+
                "_.asyRun(function(){o.removeItems(['a','b'])},1000);"+
                "}"
            ]
        },
        clearItems:{
            $desc:"Removes all items from the current UI object.",
            $rtn:"String",
            $paras:[
                "key [Optional] : String. the template key which node includes all the items nodes. Defalt is 'ITEMS'."
            ],
            $snippet:[
                "var id='linb.temp.absl5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.List({position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]}));"+
                "_.asyRun(function(){o.clearItems()},1000);"+
                "}"
            ]
        },
        getListKey:{
            $desc:"Gets the list key property from the current UI object.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.abs6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb.UI.cacheData('test',[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]);"+
                "linb.UI.cacheData('test2',[{id:'aa',caption:'aa'},{id:'bb',caption:'bb'},{id:'cc',caption:'cc'}]);"+
                "var o;linb(id).prepend(o=new linb.UI.List({position:'relative',listKey:'test'}));"+
                "_.asyRun(function(){alert(o.getListKey())});"+
                "}"
            ]
        },
        setListKey:{
            $desc:"Sets the list key property to the current UI object.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String, the list key.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.abs7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb.UI.cacheData('test',[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]);"+
                "linb.UI.cacheData('test2',[{id:'aa',caption:'aa'},{id:'bb',caption:'bb'},{id:'cc',caption:'cc'}]);"+
                "var o;linb(id).prepend(o=new linb.UI.List({position:'relative',listKey:'test'}));"+
                "_.asyRun(function(){o.setListKey('test2')},1000);"+
                "}"
            ]
        },
        getItemByItemId:{
            $desc:"Gets a item object according to a specified item id.",
            $rtn:"key/value pairs.",
            $paras:[
                "itemId [Required] :String, item id."
            ],
            $snippet:[
                "var pro=linb.UIProfile.getFromDomId('linb.UI.TreeBar:a:').boxing();alert(_.serialize( pro.getItemByItemId('Namespace') ))"
            ]
        },
        getItemByDom:{
            $desc:"Gets a item object according to a specified DOM element or an id string.",
            $rtn:"key/value pairs.",
            $paras:[
                "src [Required] : DOM element or id string."
            ],
            $snippet:[
                "var pro=linb.UIProfile.getFromDomId('linb.UI.TreeBar:a:').boxing();alert(_.serialize( pro.getItemByDom('linb.UI.TreeBar-ITEM:a:a') ))"
            ]
        },
        getSubIdByItemId:{
            $desc:"Gets the sub id (from DOM element id) according to a specified item id.",
            $rtn:"String",
            $paras:[
                "itemId [Required] :String, item id."
            ],
            $snippet:[
                "var pro=linb.UIProfile.getFromDomId('linb.UI.TreeBar:a:').boxing();alert(pro.getSubIdByItemId('Namespace') )"
            ]
        },
        getSubNodeByItemId:{
            $desc:"Gets the sub DOM element) according to a specified item id.",
            $rtn:"String",
            $paras:[
                "itemId [Required] :String, item id."
            ],
            $snippet:[
                "var pro=linb.UIProfile.getFromDomId('linb.UI.TreeBar:a:').boxing();alert(pro.getSubNodeByItemId('Namespace') )"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","absValue"], {
    prototype:{
        getDataBinder:{
            $desc:"Gets the DataBinder property value on the first UIProfile",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.absv1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Input);"+
                "_.asyRun(function(){o.setDataBinder('db1'); alert(o.getDataBinder())},1000)"+
                "}"
            ]
        },
        setDataBinder:{
            $desc:"Sets the DataBinder property value on the each UIProfile.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.absv2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Input);"+
                "_.asyRun(function(){o.setDataBinder('db1'); alert(o.getDataBinder())},1000)"+
                "}"
            ]
        },
        getDataField:{
            $desc:"Gets the DataField property value on the first UIProfile",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.absv3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Input);"+
                "_.asyRun(function(){o.setDataField('field1'); alert(o.getDataField())},1000)"+
                "}"
            ]
        },
        setDataField:{
            $desc:"Sets the DataField property value on the each UIProfile.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.absv4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Input);"+
                "_.asyRun(function(){o.setDataField('field1'); alert(o.getDataField())},1000)"+
                "}"
            ]
        },

        getUIValue:{
            $desc:"Gets the 'UI value' on the first UIProfile",
            $rtn:"Any",
            $snippet:[
                "var id='linb.temp.absv7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Input({value:'ini'}));"+
                "_.asyRun(function(){alert(o.getUIValue())},1000)"+
                "}"
            ]
        },
        setUIValue:{
            $desc:"Sets the 'UI value' and the 'Control value' on the first UIProfile",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Any.",
                "force [Optional] : Bool. Force to execute the function even if the same UI value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.absv81'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Input({value:'ini'}));"+
                "_.asyRun(function(){o.setUIValue('ini2'); alert(o.getUIValue());},1000)"+
                "}"
            ],
            $memo:"There are two events will be triggered in this action: beforeUIValueSet and afterUIValueSet."
        },

        updateValue:{
            $desc:"Copies the 'UI value' to 'value' on the first UIProfile",
            $rtn:"[self]",
            $snippet:[
                "var id='linb.temp.absv82'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Input({value:'ini'}));"+
                "_.asyRun(function(){o.setUIValue('ini2').updateValue(); alert(o.getValue());},1000)"+
                "}"
            ]
        },
        getValue:{
            $desc:"Gets the 'value' on the first UIProfile",
            $rtn:"Any",
            $snippet:[
                "var id='linb.temp.absv9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Input({value:'ini'}));"+
                "_.asyRun(function(){alert(o.getValue())},1000)"+
                "}"
            ]
        },
        setValue:{
            $desc:"Sets the 'value', the 'UI value' and the 'Control value' on the first UIProfile",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Any.",
                "flag [Optional] : Bool, force to set the value even if the same value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.absv10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Input({value:'ini'}));"+
                "_.asyRun(function(){o.setValue('ini2'); alert(o.getValue());},1000)"+
                "}"
            ],
            $memo:"There are two events will be triggered in this action: beforeValueSet and afterValueSet."
        },
        checkValid:{
            $desc:"To check whether or not the current 'UI value' is valid.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.absv11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Input({value:'ini',valueFormat:'^-?\\\\d\\\\d*$'}));"+
                "_.asyRun(function(){alert(o.checkValid());},1000)"+
                "}"
            ]
        },
        isDirtied:{
            $desc:"To check whether or not the 'value' equals to the 'UI value'.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.absv13'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Input({value:'ini'}));"+
                "_.asyRun(function(){o.setUIValue('ini2');alert(o.isDirtied());},1000)"+
                "}"
            ]
        },
        resetValue:{
            $desc:"To reset the 'value', the 'UI value' and the 'Control value', no event will be triggered in this process.",
            $rtn:'[self]',
            $paras:[
                "value [Optional] : Any, the reset value. Default is ''."
            ],
            $snippet:[
                "var id='linb.temp.absv14'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Input({value:'ini'}));"+
                "o.setUIValue('ini2');_.asyRun(function(){o.resetValue('ini2');},1000)"+
                "}"
            ]
        },

        beforeUIValueSet:{
            $desc:"Fired before setUIValue is called. If returns false, setUIValue function will be ignored.",
            $paras:[
                "profile : linb.UIProfile.",
                "oldValue : the old UIValue.",
                "newValue : the new UIValue."
            ],
            $snippet:[
                "var id='linb.temp.absv15'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Input({value:'ini'}));"+
                "var arr=[];"+
                "o.beforeUIValueSet(function(p,o,v){arr.push('beforeUIValueSet: '+o+'->'+v)}).afterUIValueSet(function(p,o,v){arr.push('afterUIValueSet: '+o+'->'+v)}).beforeValueSet(function(p,o,v){arr.push('beforeValueSet: '+o+'->'+v)}).afterValueSet(function(p,o,v){arr.push('afterValueSet: '+o+'->'+v)});"+
                "_.asyRun(function(){o.setUIValue('ini2');},100);"+
                "_.asyRun(function(){o.setValue('ini3');},200);"+
                "_.asyRun(function(){alert(arr.join('\\n'));},220);"+
                "}"
            ]
        },
        afterUIValueSet:{
            $desc:"Fired after setUIValue is called.",
            $paras:[
                "profile : linb.UIProfile.",
                "oldValue : the old UIValue.",
                "newValue : the new UIValue."
            ],
            $snippet:[
                "var id='linb.temp.absv16'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Input({value:'ini'}));"+
                "var arr=[];"+
                "o.beforeUIValueSet(function(p,o,v){arr.push('beforeUIValueSet: '+o+'->'+v)}).afterUIValueSet(function(p,o,v){arr.push('afterUIValueSet: '+o+'->'+v)}).beforeValueSet(function(p,o,v){arr.push('beforeValueSet: '+o+'->'+v)}).afterValueSet(function(p,o,v){arr.push('afterValueSet: '+o+'->'+v)});"+
                "_.asyRun(function(){o.setUIValue('ini2');},100);"+
                "_.asyRun(function(){o.setValue('ini3');},200);"+
               "_.asyRun(function(){alert(arr.join('\\n'));},220);"+
                "}"
            ]
        },
        beforeValueSet:{
            $desc:"Fired before setValue is called. If returns false, setValue function will be ignored.",
            $paras:[
                "profile : linb.UIProfile.",
                "oldValue : the old UIValue.",
                "newValue : the new UIValue."
            ],
            $snippet:[
                "var id='linb.temp.absv17'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Input({value:'ini'}));"+
                "var arr=[];"+
                "o.beforeUIValueSet(function(p,o,v){arr.push('beforeUIValueSet: '+o+'->'+v)}).afterUIValueSet(function(p,o,v){arr.push('afterUIValueSet: '+o+'->'+v)}).beforeValueSet(function(p,o,v){arr.push('beforeValueSet: '+o+'->'+v)}).afterValueSet(function(p,o,v){arr.push('afterValueSet: '+o+'->'+v)});"+
                "_.asyRun(function(){o.setUIValue('ini2');},100);"+
                "_.asyRun(function(){o.setValue('ini3');},200);"+
               "_.asyRun(function(){alert(arr.join('\\n'));},220);"+
                "}"
            ]
        },
        afterValueSet:{
            $desc:"Fired after setValue is called.",
            $paras:[
                "profile : linb.UIProfile.",
                "oldValue : the old UIValue.",
                "newValue : the new UIValue."
            ],
            $snippet:[
                "var id='linb.temp.absv18'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Input({value:'ini'}));"+
                "var arr=[];"+
                "o.beforeUIValueSet(function(p,o,v){arr.push('beforeUIValueSet: '+o+'->'+v)}).afterUIValueSet(function(p,o,v){arr.push('afterUIValueSet: '+o+'->'+v)}).beforeValueSet(function(p,o,v){arr.push('beforeValueSet: '+o+'->'+v)}).afterValueSet(function(p,o,v){arr.push('afterValueSet: '+o+'->'+v)});"+
                "_.asyRun(function(){o.setUIValue('ini2');},100);"+
                "_.asyRun(function(){o.setValue('ini3');},200);"+
               "_.asyRun(function(){alert(arr.join('\\n'));},220);"+
                "}"
            ]
        },


        beforeDirtyMark:{
            $desc:"Fired when before _setDirtyMark is called.If returns false, the inner dirtyMark function will be ignored.",
            $paras:[
                "profile : linb.UIProfile.",
                 "dirty : it's dirty or not."
            ],
            $snippet:[
                "var id='linb.temp.absv19'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o1,o2;linb(id).prepend(o1=new linb.UI.Input({value:'111',position:'relative'})).prepend(o2=new linb.UI.Input({value:'111',position:'relative'}));"+
                "o1.beforeDirtyMark(function(p,dirty){p.getSubNode('INPUT').css('background',dirty?'#00ff00':'');return false;});"+
                "_.asyRun(function(){o1.setUIValue('ini');o2.setUIValue('ini');},1000);"+
                "_.asyRun(function(){o1.setUIValue('111');o2.setUIValue('111');},2000);"+
                "}"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","absPlus"], {
    prototype:{
        getDragKey:{
            $desc:"Gets the dragKey property value on the first UIProfile",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.d1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setDragKey('a'); alert(btn.getDragKey())},1000)"+
                "}"
            ]
        },
        setDragKey:{
            $desc:"Sets the dragKey property value on the first UIProfile",
            $rtn:"[self]",
            $snippet:[
                "var id='linb.temp.d2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setDragKey('a'); alert(btn.getDragKey())},1000)"+
                "}"
            ]
        },
        getDropKeys:{
            $desc:"Gets the dropKeys property value on the first UIProfile",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.d3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Block({position:'relative',border:true}));"+
                "_.asyRun(function(){btn.setDropKeys('a:b'); alert(btn.getDropKeys())},1000)"+
                "}"
            ]
        },
        setDropKeys:{
            $desc:"Sets the DropKeys property value on the first UIProfile",
            $rtn:"[self]",
            $snippet:[
                "var id='linb.temp.d4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Block({position:'relative',border:true}));"+
                "_.asyRun(function(){btn.setDropKeys('a:b'); alert(btn.getDropKeys())},1000)"+
                "}"
            ]
        },
        addPanel:{
            $desc:"Adds a panel to the current UI.",
            $paras:[
                "para [Required] : a key/value pairs.",
                "children [Required] : Array. the panel's children.",
                "item [Optional] : Object"
            ],
            $snippet:[
                "var id='linb.temp.d5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var panel, tabs;"+
                "linb(id).prepend(panel=new linb.UI.Panel({height:100,width:100,dock:'none',position:'relative'}));"+
                "panel.append(new linb.UI.Button);"+
                "linb(id).prepend(tabs=new linb.UI.Tabs({position:'relative',width:200, height:100, dock:'none',items:[{id:'a',caption:'a'},{id:'b',caption:'b'}]}));"+
                "_.asyRun(function(){tabs.addPanel(panel.getPanelPara(), panel.getPanelChildren()); panel.removePanel();},1000);"+
                "}"
            ]
        },
        removePanel:{
            $desc:"Removes a panel from the current UI.",
            $snippet:[
                "var id='linb.temp.d6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var panel, tabs;"+
                "linb(id).prepend(panel=new linb.UI.Panel({height:100,width:100,dock:'none',position:'relative'}));"+
                "panel.append(new linb.UI.Button);"+
                "linb(id).prepend(tabs=new linb.UI.Tabs({position:'relative',width:200, height:100, dock:'none',items:[{id:'a',caption:'a'},{id:'b',caption:'b'}]}));"+
                "_.asyRun(function(){tabs.addPanel(panel.getPanelPara(), panel.getPanelChildren()); panel.removePanel();},1000);"+
                "}"
            ]
        },
        getPanelPara:{
            $desc:"Gets panel parameters from the current UI.",
            $snippet:[
                "var id='linb.temp.d8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var panel, tabs;"+
                "linb(id).prepend(panel=new linb.UI.Panel({height:100,width:100,dock:'none',position:'relative'}));"+
                "panel.append(new linb.UI.Button);"+
                "linb(id).prepend(tabs=new linb.UI.Tabs({position:'relative',width:200, height:100, dock:'none',items:[{id:'a',caption:'a'},{id:'b',caption:'b'}]}));"+
                "_.asyRun(function(){tabs.addPanel(panel.getPanelPara(), panel.getPanelChildren()); panel.removePanel();},1000);"+
                "}"
            ]
        },
        getPanelChildren:{
            $desc:"Gets panel chldren from the current UI.",
            $snippet:[
                "var id='linb.temp.d9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var panel, tabs;"+
                "linb(id).prepend(panel=new linb.UI.Panel({height:100,width:100,dock:'none',position:'relative'}));"+
                "panel.append(new linb.UI.Button);"+
                "linb(id).prepend(tabs=new linb.UI.Tabs({position:'relative',width:200, height:100, dock:'none',items:[{id:'a',caption:'a'},{id:'b',caption:'b'}]}));"+
                "_.asyRun(function(){tabs.addPanel(panel.getPanelPara(), panel.getPanelChildren()); panel.removePanel();},1000);"+
                "}"
            ]
        },

        onHotKeydown:{
            $desc:"Fired when keyboard is down.",
            $paras:[
                "profile : linb.UIProfile.",
                "key : String, keyboard representation.",
                "control: Number, 1 or 0, indicates whether or not the 'control' key is pressed.",
                "shift: Number, 1 or 0, indicates whether or not the 'shift' key is pressed.",
                "alt: Number, 1 or 0, indicates whether or not the 'alt' key is pressed.",
                "e : DOM event object.",
                "src : the event source DOM element."
            ],
            $snippet:[
                "var id='linb.temp.c1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var w, arr;linb(id).prepend(w=new linb.UI.Widget({position:'relative'}));"+
                "w.setCustomStyle('KEY','border:solid 1px').getSubNode('BORDER').append(linb.create('<input />'));"+
                "w.onHotKeydown(function( profile, key, control, shift, alt, e, src ){arr=[];arr.push(['onHotKeydown',key,control,shift,alt])});"+
                "w.onHotKeypress(function( profile, key, control, shift, alt, e, src ){arr.push(['onHotKeypress',key,control,shift,alt]); });"+
                "w.onHotKeyup(function( profile, key, control, shift, alt, e, src ){arr.push(['onHotKeyup',key,control,shift,alt]);alert(arr);});"+
                "}"
            ]
        },
        onHotKeyup:{
            $desc:"Fired when keyboard is up.",
            $paras:[
                "profile : linb.UIProfile.",
                "key : String, keyboard representation.",
                "control: Number, 1 or 0, indicates whether or not the 'control' key is pressed.",
                "shift: Number, 1 or 0, indicates whether or not the 'shift' key is pressed.",
                "alt: Number, 1 or 0, indicates whether or not the 'alt' key is pressed.",
                "e : DOM event object.",
                "src : the event source DOM element."
            ],
            $snippet:[
                "var id='linb.temp.c2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var w, arr;linb(id).prepend(w=new linb.UI.Widget({position:'relative'}));"+
                "w.setCustomStyle('KEY','border:solid 1px').getSubNode('BORDER').append(linb.create('<input />'));"+
                "w.onHotKeydown(function( profile, key, control, shift, alt, e, src ){arr=[];arr.push(['onHotKeydown',key,control,shift,alt])});"+
                "w.onHotKeypress(function( profile, key, control, shift, alt, e, src ){arr.push(['onHotKeypress',key,control,shift,alt]); });"+
                "w.onHotKeyup(function( profile, key, control, shift, alt, e, src ){arr.push(['onHotKeyup',key,control,shift,alt]);alert(arr);});"+
                "}"
            ]
        },
        onHotKeypress:{
            $desc:"Fired when keyboard is pressed.",
            $paras:[
                "profile : linb.UIProfile.",
                "key : String, keyboard representation.",
                "control: Number, 1 or 0, indicates whether or not the 'control' key is pressed.",
                "shift: Number, 1 or 0, indicates whether or not the 'shift' key is pressed.",
                "alt: Number, 1 or 0, indicates whether or not the 'alt' key is pressed.",
                "e : DOM event object.",
                "src : the event source DOM element."
            ],
            $snippet:[
                "var id='linb.temp.c3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var w, arr;linb(id).prepend(w=new linb.UI.Widget({position:'relative'}));"+
                "w.setCustomStyle('KEY','border:solid 1px').getSubNode('BORDER').append(linb.create('<input />'));"+
                "w.onHotKeydown(function( profile, key, control, shift, alt, e, src ){arr=[];arr.push(['onHotKeydown',key,control,shift,alt])});"+
                "w.onHotKeypress(function( profile, key, control, shift, alt, e, src ){arr.push(['onHotKeypress',key,control,shift,alt]); });"+
                "w.onHotKeyup(function( profile, key, control, shift, alt, e, src ){arr.push(['onHotKeyup',key,control,shift,alt]);alert(arr);});"+
                "}"
            ]
        },
        onDragEnter:{
            $desc:"Fired when the user drags the object to a valid drop target.",
            $paras:[
                "profile : linb.UIProfile.",
                "e : DOM event object.",
                "src : the event source DOM element.",
                "key : String, the DragDrop key.",
                "data : Object, the DragDrop data.",
                "item : Object, the source item object."
            ],
            $snippet:[
                "var id='linb.temp.ab1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var block,btn1,btn2;linb(id).prepend(block=new linb.UI.Block({position:'relative',width:'200',border:true,dropKeys:['test']})).prepend(btn1=new linb.UI.Button({position:'relative'})).prepend(btn2=new linb.UI.Button({position:'relative'}));"+
                "btn2.get(0).$noDrop=true;"+
                "btn1.dragable('test',btn1.getDomId());"+
                "btn2.dragable('test','abc');"+
                "block.onDragEnter(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragEnter')});"+
                "block.onDragLeave(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragLeave')});"+
                "block.onDrop(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDrop')});"+
                "block.onDropMarkClear(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#fff')});"+
                "block.onDropMarkShow(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#ccc')});"+
                "block.onDropTest(function(p,e,n,k,d,i){return d!='abc';});"+
                "}"
            ]
        },
        onDragLeave:{
            $desc:"Fired when the user drags the object leave a valid drop target.",
            $paras:[
                "profile : linb.UIProfile.",
                "e : DOM event object.",
                "src : the event source DOM element.",
                "key : String, the DragDrop key.",
                "data : Object, the DragDrop data.",
                "item : Object, the source item object."
            ],
            $snippet:[
                "var id='linb.temp.ab2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var block,btn1,btn2;linb(id).prepend(block=new linb.UI.Block({position:'relative',width:'200',border:true,dropKeys:['test']})).prepend(btn1=new linb.UI.Button({position:'relative'})).prepend(btn2=new linb.UI.Button({position:'relative'}));"+
                "btn2.get(0).$noDrop=true;"+
                "btn1.dragable('test',btn1.getDomId());"+
                "btn2.dragable('test','abc');"+
                "block.onDragEnter(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragEnter')});"+
                "block.onDragLeave(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragLeave')});"+
                "block.onDrop(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDrop')});"+
                "block.onDropMarkClear(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#fff')});"+
                "block.onDropMarkShow(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#ccc')});"+
                "block.onDropTest(function(p,e,n,k,d,i){return d!='abc';});"+
                "}"
            ]

        },
        onDrop:{
            $desc:"Fired when the user drop the object to a valid drop target.",
            $paras:[
                "profile : linb.UIProfile.",
                "e : DOM event object.",
                "node : the source DOM element.",
                "src : the event source DOM element.",
                "key : String, the DragDrop key.",
                "data : Object, the DragDrop data.",
                "item : Object, the source item object."
            ],
            $snippet:[
                "var id='linb.temp.ab3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var block,btn1,btn2;linb(id).prepend(block=new linb.UI.Block({position:'relative',width:'200',border:true,dropKeys:['test']})).prepend(btn1=new linb.UI.Button({position:'relative'})).prepend(btn2=new linb.UI.Button({position:'relative'}));"+
                "btn2.get(0).$noDrop=true;"+
                "btn1.dragable('test',btn1.getDomId());"+
                "btn2.dragable('test','abc');"+
                "block.onDragEnter(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragEnter')});"+
                "block.onDragLeave(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragLeave')});"+
                "block.onDrop(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDrop')});"+
                "block.onDropMarkClear(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#fff')});"+
                "block.onDropMarkShow(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#ccc')});"+
                "block.onDropTest(function(p,e,n,k,d,i){return d!='abc';});"+
                "}"
            ]
        },
        onDropMarkClear:{
            $desc:"Fired when the user drags the object leave a valid drop target.",
            $paras:[
                "profile : linb.UIProfile.",
                "e : DOM event object.",
                "src : the event source DOM element.",
                "key : String, the DragDrop key.",
                "data : Object, the DragDrop data.",
                "item : Object, the source item object."
            ],
            $snippet:[
                "var id='linb.temp.ab4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var block,btn1,btn2;linb(id).prepend(block=new linb.UI.Block({position:'relative',width:'200',border:true,dropKeys:['test']})).prepend(btn1=new linb.UI.Button({position:'relative'})).prepend(btn2=new linb.UI.Button({position:'relative'}));"+
                "btn2.get(0).$noDrop=true;"+
                "btn1.dragable('test',btn1.getDomId());"+
                "btn2.dragable('test','abc');"+
                "block.onDragEnter(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragEnter')});"+
                "block.onDragLeave(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragLeave')});"+
                "block.onDrop(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDrop')});"+
                "block.onDropMarkClear(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#fff')});"+
                "block.onDropMarkShow(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#ccc')});"+
                "block.onDropTest(function(p,e,n,k,d,i){return d!='abc';});"+
                "}"
            ]
        },
        onDropMarkShow:{
            $desc:"Fired when the user drags the object to a valid drop target.",
            $paras:[
                "profile : linb.UIProfile.",
                "e : DOM event object.",
                "src : the event source DOM element.",
                "key : String, the DragDrop key.",
                "data : Object, the DragDrop data.",
                "item : Object, the source item object."
            ],
            $snippet:[
                "var id='linb.temp.ab5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var block,btn1,btn2;linb(id).prepend(block=new linb.UI.Block({position:'relative',width:'200',border:true,dropKeys:['test']})).prepend(btn1=new linb.UI.Button({position:'relative'})).prepend(btn2=new linb.UI.Button({position:'relative'}));"+
                "btn2.get(0).$noDrop=true;"+
                "btn1.dragable('test',btn1.getDomId());"+
                "btn2.dragable('test','abc');"+
                "block.onDragEnter(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragEnter')});"+
                "block.onDragLeave(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragLeave')});"+
                "block.onDrop(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDrop')});"+
                "block.onDropMarkClear(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#fff')});"+
                "block.onDropMarkShow(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#ccc')});"+
                "block.onDropTest(function(p,e,n,k,d,i){return d!='abc';});"+
                "}"
            ]
        },
        onDropTest:{
            $desc:"Fired when the user drags the object to a valid drop target.",
            $paras:[
                "profile : linb.UIProfile.",
                "e : DOM event object.",
                "src : the event source DOM element.",
                "key : String, the DragDrop key.",
                "data : Object, the DragDrop data.",
                "item : Object, the source item object."
            ],
            $snippet:[
                "var id='linb.temp.ab61'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var block,btn1,btn2;linb(id).prepend(block=new linb.UI.Block({position:'relative',width:'200',border:true,dropKeys:['test']})).prepend(btn1=new linb.UI.Button({position:'relative'})).prepend(btn2=new linb.UI.Button({position:'relative'}));"+
                "btn2.get(0).$noDrop=true;"+
                "btn1.dragable('test',btn1.getDomId());"+
                "btn2.dragable('test','abc');"+
                "block.onDragEnter(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragEnter')});"+
                "block.onDragLeave(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragLeave')});"+
                "block.onDrop(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDrop')});"+
                "block.onDropMarkClear(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#fff')});"+
                "block.onDropMarkShow(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#ccc')});"+
                "block.onDropTest(function(p,e,n,k,d,i){return d!='abc';});"+
                "}"
            ]
        },
        onStartDrag:{
            $desc:"Fired when the user start to drag.",
            $paras:[
                "profile : linb.UIProfile.",
                "e : DOM event object.",
                "src : the event source DOM element."
            ],
            $snippet:[
                "var id='linb.temp.ab661'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var list1,list2;linb(id).prepend(list1=new linb.UI.List({position:'relative',width:'200',border:true,dragKey:'test',items:['aa','bb','cc']})).prepend(list2=new linb.UI.List({position:'relative',width:'200',border:true,dragKey:'test',items:['aa','bb','cc']}));"+
                "list2.onStartDrag(function(p,e,n){return false;});"+
                "list1.onStartDrag(function(p,e,n){linb.message('onStartDrag');});"+
                "list1.onDragStop(function(p,e,n){linb.message('onDragStop');});"+
                "}"
            ]
        },
        onDragstop:{
            $desc:"Fired when the user stop the dragging process.",
            $paras:[
                "profile : linb.UIProfile.",
                "e : DOM event object.",
                "src : the event source DOM element."
            ],
            $snippet:[
                "var id='linb.temp.ab662'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var list1,list2;linb(id).prepend(list1=new linb.UI.List({position:'relative',width:'200',border:true,dragKey:'test',items:['aa','bb','cc']})).prepend(list2=new linb.UI.List({position:'relative',width:'200',border:true,dragKey:'test',items:['aa','bb','cc']}));"+
                "list2.onStartDrag(function(p,e,n){return false;});"+
                "list1.onStartDrag(function(p,e,n){linb.message('onStartDrag');});"+
                "list1.onDragStop(function(p,e,n){linb.message('onDragStop');});"+
                "}"
            ]
        },
        beforeClickEffect:{
            $desc:"Fired when the user click the specified element. If returns false, the default click effect will be ignored.",
            $paras:[
                "profile : linb.UIProfile.",
                "item : Object, the data item object.",
                "e : DOM event object.",
                "src : the source DOM element.",
                "type : String, 'mousedown'or 'mouseup'."
            ],
            $snippet:[
                "var id='linb.temp.ab7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).append(btn=new linb.UI.Button({position:'relative'}));"+
                "btn.beforeClickEffect(function(p,i,e,s,t){linb([s]).css('border',t=='mousedown'?'solid 1px;':'');return false;});"+
                "}"
            ]
        },
        beforeHoverEffect:{
            $desc:"Fired when the mouse hover the specified element. If returns false, the default mouse hover effect will be ignored.",
            $paras:[
                "profile : linb.UIProfile.",
                "item : Object, the data item object.",
                "e : DOM event object.",
                "src : the source DOM element.",
                "type : String, 'mouseover'or 'mouseout'."
            ],
            $snippet:[
                "var id='linb.temp.ab8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).append(btn=new linb.UI.Button({position:'relative'}));"+
                "btn.beforeHoverEffect(function(p,i,e,s,t){linb([s]).css('border',t=='mouseover'?'solid 1px;':'');return false;});"+
                "}"
            ]
        },
        beforeNextFocus:{
            $desc:"Fired when the mouse hover the specified element. If returns false, the default 'set focus to the next' action will be ignored.",
            $paras:[
                "profile : linb.UIProfile.",
                "e : DOM event object.",
                "shift: Bool, Shift keyboard is pressed or not.",
                "src : the source DOM element."
            ],
            $snippet:[
                "var id='linb.temp.ab9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).append(new linb.UI.Button({position:'relative'})).append(new linb.UI.Button({position:'relative'})).append(btn=new linb.UI.Button({position:'relative'})).append(new linb.UI.Button({position:'relative'}));"+
                "btn.beforeNextFocus(function(){return false;});"+
                "}"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","UI"], {
    buildCSSText:{
        $desc:"Builds CSS text from a key/value pairs object.",
        $rtn:"String",
        $paras:[
            "hash [Required] : key/value pairs."
        ],
        $snippet:[
            "alert(linb.UI.Button.buildCSSText({KEY:{left:linb.browser.ie?0:null,overflow:linb.browser.gek?'auto':null,'font-size':'12px'},BORDER:{'_line-height':10,'-moz-display':'none'}}));"+
            "alert(linb.UI.Button.buildCSSText({KEY:{left:linb.browser.ie?0:null,overflow:linb.browser.gek?'auto':null,'font-size':'12px'},BORDER:{'_line-height':10,'-moz-display':'none'}},'mac'));"
        ]
    },
    getTheme:{
        $desc:"Gets the theme key string.",
        $rtn:"String",
        $snippet:[
            "alert(linb.UI.getTheme());"
        ]
    },
    setTheme:{
        $desc:"Gets the theme key string.",
        $rtn:"[self]",
        $paras:[
            "key [Optional] : String, the theme key."
        ],
        $snippet:[
            "//linb.UI.setTheme('xp')"
        ]
    },
    adjustData:{
        $desc:"Adjusts an input key/value pairs to appropriate data format for building UI.",
        $rtn:"key/value pairs.",
        $paras:[
            "profile [Required] : the target profile",
            "hashIn [Required] : key/value pairs, the data to be adjusted.",
            "hashOut [Optional] : key/value pairs, the out data."
        ],
        $snippet:[
            "alert(_.serialize(linb.UI.adjustData(null, {a:1,b:2,c:'$date.MS',d:'@linb.ini.path',renderer:function(){return 'cap';}})))"
        ]
    },
    addTemplateKeys:{
        $desc:"Adds a set of template keys to the current UI Class.",
        $rtn:'[self]',
        $paras:[
            "arr [Required] : Array, a set of keys."
        ],
        $snippet:[
            "alert(_.serialize(linb.UI.Div.$Keys)); alert(_.serialize(linb.UI.Div.addTemplateKeys(['A','B']).$Keys))"
        ],
        $memo:"Generally, you don't need to use this function manually in the normal project."
    },
    getAppearance:{
        $desc:"Gets the appearance object.",
        $rtn:'object',
        $snippet:[
            "alert(_.serialize(linb.UI.Div.getAppearance()))"
        ],
        $memo:"Generally, you don't need to use this function manually in the normal project."
    },
    getTemplate:{
        $desc:"Gets template object according to a given cache id.",
        $rtn:'object',
        $paras:[
            "cacheId [Optional] : String."
        ],
        $snippet:[
            "alert(_.serialize(linb.UI.Div.getTemplate()))"
        ],
        $memo:"Generally, you don't need to use this function manually in the normal project."
    },
    getBehavior:{
        $desc:"Gets behavior object.",
        $rtn:'object',
        $snippet:[
            "alert(_.serialize(linb.UI.Link.getBehavior()))"
        ],
        $memo:"Generally, you don't need to use this function manually in the normal project."
    },
    setAppearance:{
        $desc:"Sets the appearance object.",
        $rtn:'[self]',
        $paras:[
            "hash [Required] : key/value pairs."
        ],
        $memo:"Generally, you don't need to use this function manually in the normal project."
    },
    setTemplate:{
        $desc:"Sets a template object to a specified cache id.",
        $rtn:'[self]',
        $paras:[
            "hash [Required] : key/value pairs.",
            "cacheId [Optional] : String."
        ],
        $memo:"Generally, you don't need to use this function manually in the normal project."
    },
    setBehavior:{
        $desc:"Sets behavior object.",
        $rtn:'[self]',
        $memo:"Generally, you don't need to use this function manually in the normal project."
    },
    cacheData:{
        $desc:"Sets the data in the cache at the specified key.",
        $rtn:'[self]',
        $paras:[
            "key [Required] : String, cache key.",
            "data [Optional] : Any. Default is [undifined], that indicates to remove the cacke at the specified key."
        ],
        $snippet:[
            "linb.UI.cacheData('a',1); alert(linb.UI.getCachedData('a')); linb.UI.cacheData('a')"
        ]
    },
    getCachedData:{
        $desc:"Gets the data in the cache at the specified key.",
        $rtn:"Any",
        $paras:[
            "key [Required] : String, cache key."
        ],
        $snippet:[
            "linb.UI.cacheData('a',1); alert(linb.UI.getCachedData('a')); linb.UI.cacheData('a')"
        ]
    },
    getDragData:{
        $desc:"Gets drag data from the specified profile.",
        $rtn:"Object",
        $paras:[
            "profile [Required] : the target profile",
            "node [Required] : the related DOM element."
        ],
        $memo:"Generally, you don't need to use this function manually. This function might be overwrote in the sub Class."
    },
    getDragKey:{
        $desc:"Gets drag key from the specified profile.",
        $rtn:"String",
        $paras:[
            "profile [Required] : the target profile",
            "node [Required] : the related DOM element."
        ],
        $memo:"Generally, you don't need to use this function manually. This function might be overwrote in the sub Class."
    },
    getDropKeys:{
        $desc:"Gets drop keys from the specified profile.",
        $rtn:"Array",
        $paras:[
            "profile [Required] : the target profile",
            "node [Required] : the related DOM element."
        ],
        $memo:"Generally, you don't need to use this function manually. This function might be overwrote in the sub Class."
    },
    unserialize:{
        $desc:"To unserialize a string representation or a set of profile representations to a linb.UI object.",
        $rtn:"linb.UI object",
        $paras:[
            "target [Required] : String or Array.",
            "keepSerialId [Optional] : Bool. to keep serila id or not. Default is [false]."
        ],
        $snippet:[
            "var s=linb.UIProfile.getFromDomId('logo').boxing().serialize(false); alert(_.serialize(s)); alert(linb.UI.unserialize(s))"
        ]
    },
    prototype:{
        busy:{
            $desc:"Shows busy layer(A special top zindex div covers the UI). ",
            $rtn:"[self]",
            $paras:[
                "message [Optional] : String, the busy description inner string.",
                "html [Optional] : String, the busy description html.",
                "key [Optional] : String, the busy div's parent key. Default is 'BORDER'."
            ],
            $snippet:[
                "var id='linb.temp.tl1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative'});"+
                "linb(id).prepend(o);"+
                "o.busy('Loading message');"+
                "_.asyRun(function(){o.free()},1000);"+
                "}"
            ]
        },
        free:{
            $desc:"Hide busy layer.",
            $rtn:"[self]",
            $snippet:[
                "var id='linb.temp.tl2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative'});"+
                "linb(id).prepend(o);"+
                "o.busy('Loading message');"+
                "_.asyRun(function(){o.free()},1000);"+
                "}"
            ]
        },
        resize:{
            $desc:"To trigger the control's onresize event.",
            $rtn:"[self]"
        },
        getChildren:{
            $desc:"Gets the current widget's children.",
            $rtn:"linb.UI object",
            $paras:[
                "subId [Optional] : String, the sub id."
            ],
            $snippet:[
                "var id='linb.temp.ui-1e'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var tabs;linb(id).prepend(tabs=linb.create({key:'linb.UI.Tabs',properties:{dock:'none',width:200,height:100,position:'relative',items:['a','b','c'],value:'a'},children:[[{key:'linb.UI.Button'},'a'],[{key:'linb.UI.Button'},'b'],[{key:'linb.UI.Button'},'c']]}));"+
                "_.asyRun(function(){alert(tabs.getChildren().get().length);alert(tabs.getChildren('a').get().length);},1000);"+
                "}"
            ]
        },
        toHtml:{
            $desc:"To build HTML string from the current object, and returns it.",
            $rtn:"String",
            $snippet:[
                "alert(linb.UIProfile.getFromDomId('logo').boxing().toHtml())"
            ]
        },
        getRenderer:{
            $desc:"Gets the renderer function from the first UIProfile.",
            $rtn:"Function",
            $snippet:[
                "var id='linb.temp.ui-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var link=new linb.UI.Link({position:'relative'});"+
                "link.setRenderer(function(item){return '['+item.caption+']'});"+
                "linb(id).prepend(link);"+
                "_.asyRun(function(){alert(link.getRenderer());},1000);"+
                "}"
            ]
        },
        setRenderer:{
            $desc:"Sets the renderer function to all the UIProfiles.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Function",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ui-2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var link=new linb.UI.Link({position:'relative'});"+
                "link.setRenderer(function(item){return '<span style=\"width:15px;height:15px;background:url(img/img.gif)\"></span> ['+item.caption+']'});"+
                "linb(id).prepend(link);"+
                "_.asyRun(function(){alert(link.getRenderer());},1000);"+
                "}"
            ]
        },
        getRoot:{
            $desc:"Gets root object(linb.Dom) of the UIProfile.",
            $rtn:"linb.Dom element",
            $snippet:[
            "alert(linb.UIProfile.getFromDomId('logo').boxing().getRoot());"
            ]
        },
        getRootNode:{
            $desc:"Gets the root DOM element of the UIProfile.",
            $rtn:"DOM element",
            $snippet:[
            "alert(linb.UIProfile.getFromDomId('logo').boxing().getRootNode());"
            ]
        },
        append:{
            $desc:"Appends a set of linb.UIProfile objects to the inside of the first profile.",
            $rtn:"[self]",
            $paras:[
                "target [Required] : a linb.UI ojbect(including a set of linb.UIProfile objects).",
                "subId [Optional] : String, the sub id that Determines the [target] will be added to which sub DOM node. This parameter can be [false] too, that means the [target] will be appended to DOM only, no link created between the [target] UIProfiles and the parent UIProfile."
            ],
            $snippet:[
                "var id='linb.temp.ui2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var block,btn1,btn2;linb(id).prepend(block=new linb.UI.Block({border:true}));"+
                "block.append(btn1=new linb.UI.Button({position:'relative'})).append(btn2=new linb.UI.Button({position:'relative'}), false);"+
                "alert(btn1.get(0).parent===block.get(0));alert(btn2.get(0).parent);"+
                "}"
            ]
        },
        removeChildren:{
            $desc:"Removes a set of linb.UIProfile objects from each UIProfile.",
            $rtn:"[self]",
            $paras:[
                "subId [Optional] : String, the sub id that Determines which profile will be removeed."
            ],
            $snippet:[
                "var id='linb.temp.ui2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var block,btn1,btn2;linb(id).prepend(block=new linb.UI.Block({border:true}));"+
                "block.append(btn1=new linb.UI.Button({position:'relative'})).append(btn2=new linb.UI.Button({position:'relative'}), false);"+
                "_.asyRun(function(){block.removeChildren()},1000)"+
                "}"
            ]
        },
        clone:{
            $desc:"Creates a copy of the set of UIProfiles.",
            $rtn:"linb.UI object including the copied UIProfiles.",
            $snippet:[
                "var id='linb.temp.ui3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var block,btn1,btn2;linb(id).prepend(block=new linb.UI.Block({position:'relative',border:true}));"+
                "block.append(btn1=new linb.UI.Button({position:'relative'})).append(btn2=new linb.UI.Button({position:'relative'}), false);"+
                "\n // Notice: here, only btn1 will be cloned :\n"+
                "linb(id).append(block.clone())"+
                "}"
            ]
        },
        destroy:{
            $desc:"To destroy current object.",
            $snippet:[
                "var id='linb.temp.ui4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var block;linb(id).prepend(block=new linb.UI.Block({position:'relative',border:true}));"+
                "_.asyRun(function(){block.destroy()},1000);"+
                "}"
            ]
        },
        dragable:{
            $desc:"Enables/disables the draggable functionality on the specified elements.",
            $rtn:"[self]",
            $paras:[
                "dragKey [Optional] : String, the dragKey for linb.DragDrop.",
                "dragData [Optional] : Object, the dragData for linb.DragDrop.",
                "key [Optional] : String, a template key in UIProfile that will Determines which elements will be the target elements. Default is 'KEY'."
            ],
            $snippet:[
                "var id='linb.temp.ui5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var block,btn;linb(id).prepend(block=new linb.UI.Block({position:'relative',border:true,dropKeys:['test']})).prepend(btn=new linb.UI.Button({position:'relative'}));"+
                "block.onDrop(function(profile, e, node, key, data){var btn=linb.UIProfile.getFromDomId(data).boxing();profile.boxing().append(btn); btn.dragable(false)});"+
                "btn.dragable('test',btn.getDomId());"+
                "}"
            ]
        },
        getLeft:{
            $desc:"Gets the left(corresponding to the CSS value of the root DOM element) property value on the first UIProfile",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.ui10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setLeft(20); alert(btn.getLeft())},1000)"+
                "}"
            ]
        },
        setLeft:{
            $desc:"Sets the left(corresponding to the CSS value of the root DOM element) property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ui11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setLeft(20); alert(btn.getLeft())},1000)"+
                "}"
            ]
        },
        getRight:{
            $desc:"Gets the right(corresponding to the CSS value of the root DOM element) property value on the first UIProfile",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.ui12'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setRight(20); alert(btn.getRight())},1000)"+
                "}"
            ]
        },
        setRight:{
            $desc:"Sets the right(corresponding to the CSS value of the root DOM element) property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ui13'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setRight(20); alert(btn.getRight())},1000)"+
                "}"
            ]
        },
        getTop:{
            $desc:"Gets the top(corresponding to the CSS value of the root DOM element) property value on the first UIProfile",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.ui14'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setTop(20); alert(btn.getTop())},1000)"+
                "}"
            ]
        },
        setTop:{
            $desc:"Sets the top(corresponding to the CSS value of the root DOM element) property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ui15'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setTop(20); alert(btn.getTop())},1000)"+
                "}"
            ]
        },
        getBottom:{
            $desc:"Gets the bottom(corresponding to the CSS value of the root DOM element) property value on the first UIProfile",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.ui16'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setTop('auto').setBottom(20); alert(btn.getBottom())},1000)"+
                "}"
            ]
        },
        setBottom:{
            $desc:"Sets the bottom(corresponding to the CSS value of the root DOM element) property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ui17'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setTop('auto').setBottom(20); alert(btn.getBottom())},1000)"+
                "}"
            ]
        },
        getWidth:{
            $desc:"Gets the width(corresponding to the CSS value of the root DOM element) property value on the first UIProfile",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.ui18'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setWidth(100); alert(btn.getWidth())},1000)"+
                "}"
            ]
        },
        setWidth:{
            $desc:"Sets the width(corresponding to the CSS value of the root DOM element) property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
             $paras:[
                "value [Required] : nonnegative Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
           $snippet:[
                "var id='linb.temp.ui19'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setWidth(100); alert(btn.getWidth())},1000)"+
                "}"
            ]
        },
        getHeight:{
            $desc:"Gets the height(corresponding to the CSS value of the root DOM element) property value on the first UIProfile",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.ui20'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setHeight(100); alert(btn.getHeight())},1000)"+
                "}"
            ]
        },
        setHeight:{
            $desc:"Sets the height(corresponding to the CSS value of the root DOM element) property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : nonnegative Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ui21'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setHeight(100); alert(btn.getHeight())},1000)"+
                "}"
            ]
        },
        getDisplay:{
            $desc:"Gets the display(corresponding to the CSS value of the root DOM element) property value on the first UIProfile",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.ui22'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setDisplay('none'); alert(btn.getDisplay())},1000)"+
                "}"
            ]
        },
        setDisplay:{
            $desc:"Sets the display(corresponding to the CSS value of the root DOM element) property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : corresponding CSS value.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ui23'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setDisplay('none'); alert(btn.getDisplay())},1000)"+
                "}"
            ]
        },
        getVisibility:{
            $desc:"Gets the visibility(corresponding to the CSS value of the root DOM element) property value on the first UIProfile",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.ui24'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setVisibility('hidden'); alert(btn.getVisibility())},1000)"+
                "}"
            ]
        },
        setVisibility:{
            $desc:"Sets the visibility(corresponding to the CSS value of the root DOM element) property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : corresponding CSS value.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ui25'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setVisibility('hidden'); alert(btn.getVisibility())},1000)"+
                "}"
            ]
        },
        getZIndex:{
            $desc:"Gets the z-index(corresponding to the CSS value of the root DOM element) property value on the first UIProfile",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.ui26'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button).prepend(new linb.UI.Button({zIndex:10}));"+
                "_.asyRun(function(){btn.setZIndex(20); alert(btn.getZIndex())},1000)"+
                "}"
            ]
        },
        setZIndex:{
            $desc:"Sets the z-index(corresponding to the CSS value of the root DOM element) property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : corresponding CSS value.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ui27'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button).prepend(new linb.UI.Button({zIndex:10}));"+
                "_.asyRun(function(){btn.setZIndex(20); alert(btn.getZIndex())},1000)"+
                "}"
            ]
        },
        getPosition:{
            $desc:"Gets the position(corresponding to the CSS value of the root DOM element) property value on the first UIProfile",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.ui25'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setPosition('static'); alert(btn.getPosition())},1000)"+
                "}"
            ]
        },
        setPosition:{
            $desc:"Sets the position(corresponding to the CSS value of the root DOM element) property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : corresponding CSS value.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ui28'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setPosition('static'); alert(btn.getPosition())},1000)"+
                "}"
            ]
        },
        getTabindex:{
            $desc:"Gets the tabIndex(corresponding to the tabIndex property of the root DOM element) property value on the first UIProfile",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.ui29'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setTabindex('10'); alert(btn.getTabindex())},1000)"+
                "}"
            ]
        },
        setTabindex:{
            $desc:"Sets the tabIndex(corresponding to the tabIndex property of the root DOM element) property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ui30'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setTabindex('10'); alert(btn.getTabindex())},1000)"+
                "}"
            ]
        },
        getTag:{
            $desc:"Gets the tag value on the first UIProfile",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.ui40'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setTag('tag'); alert(btn.getTag())},1000)"+
                "}"
            ]
        },
        setTag:{
            $desc:"Sets the tag value on the each UIProfile.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ui41'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setTag('tag'); alert(btn.getTag())},1000)"+
                "}"
            ]
        },
        getTagVar:{
            $desc:"Gets the tagVar property value on the first UIProfile",
            $rtn:"Any",
            $snippet:[
                "var id='linb.temp.ui42'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setTagVar([1,2]); alert(btn.getTagVar())},1000)"+
                "}"
            ]
        },
        setTagVar:{
            $desc:"Sets the tagVar property value on the each UIProfile.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Any.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ui43'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setTagVar([1,2]); alert(btn.getTagVar())},1000)"+
                "}"
            ]
        },
        getTips:{
            $desc:"Gets the tips string value on the first UIProfile.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.ui44'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setTips('a b c d'); alert(btn.getTips())},1000)"+
                "}"
            ]
        },
        setTips:{
            $desc:"Sets the tips string value on the each UIProfile.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ui45'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setTips('a b c d'); alert(btn.getTips())},1000)"+
                "}"
            ]
        },
        getDisabled:{
            $desc:"Determines whether this UI control is disabled or not.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.ui46'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setDisabled(true); alert(btn.getDisabled())},1000)"+
                "}"
            ]
        },
        setDisabled:{
            $desc:"Specifys whether this UI control is disabled or not, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ui47'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setDisabled(true); alert(btn.getDisabled())},1000)"+
                "}"
            ]
        },
        getDock:{
            $desc:"Gets the dock property value on the first UIProfile",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.ui50'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "alert(btn.getDock())"+
                "}"
            ]
        },
        setDock:{
            $desc:"Sets the dock property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : 'none','top','bottom','left','right','center','middle','origin','width','height','fill','cover'.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ui51'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button({type:'custom',border:true}));"+
                "var arr=['none','top','bottom','left','right','center','middle','origin','width','height','fill','cover'];"+
                "linb.Thread(null,[function(id){if(!arr.length)return linb.Thread.abort(id); var type=arr.shift();btn.setDock(type).setCaption(type);}],1000,null,null,null,true).start();"+
                "}"
            ]
        },
        getDockFloat:{
            $desc:"Gets the dockFloat property value on the first UIProfile",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.ui52'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "alert(btn.getDockFloat())"+
                "}"
            ]
        },
        setDockFloat:{
            $desc:"Sets the dockFloat property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ui53'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var div1,btn2;linb(id).prepend(div1=new linb.UI.Div({dock:'top',height:20})).prepend(btn2=new linb.UI.Button({zIndex:10,type:'custom',border:true}));"+
                "div1.setDockFloat(true).setCustomStyle({KEY:'background:#00ff00'});"+
                "var arr=['none','top','bottom','left','right','center','middle','origin','width','height','fill','cover'];"+
                "linb.Thread(null,[function(id){if(!arr.length)return linb.Thread.abort(id); var type=arr.shift();btn2.setDock(type).setCaption(type);}],1000,null,null,null,true).start();"+
                "}",
                "var id='linb.temp.ui54'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var div1,btn2;linb(id).prepend(div1=new linb.UI.Div({dock:'top',height:20})).prepend(btn2=new linb.UI.Button({zIndex:10,type:'custom',border:true}));"+
                "div1.setDockFloat(false).setCustomStyle({KEY:'background:#00ff00'});"+
                "var arr=['none','top','bottom','left','right','center','middle','origin','width','height','fill','cover'];"+
                "linb.Thread(null,[function(id){if(!arr.length)return linb.Thread.abort(id); var type=arr.shift();btn2.setDock(type).setCaption(type);}],1000,null,null,null,true).start();"+
                "}"
            ]
        },
        getDockMargin:{
            $desc:"Gets dock margin on the first UIProfile",
            $rtn:"key/value pairs",
            $snippet:[
                "var id='linb.temp.ui60'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "alert(_.serialize(btn.getDockMargin()))"+
                "}"
            ]
        },
        setDockMargin:{
            $desc:"Sets dock margin on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : {left:Number,right:Number,top:Number,bottom:Number}.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ui61'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button({type:'custom',border:true}));"+
                "btn.setDockMargin({left:20,top:20,right:10,bottom:10});"+
                "var arr=['none','top','bottom','left','right','center','middle','origin','width','height','fill','cover'];"+
                "linb.Thread(null,[function(id){if(!arr.length)return linb.Thread.abort(id); var type=arr.shift();btn.setDock(type).setCaption(type);}],1000,null,null,null,true).start();"+
                "}",
                "var id='linb.temp.ui61-2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var div1,btn2;linb(id).prepend(div1=new linb.UI.Div({dock:'top',height:20})).prepend(btn2=new linb.UI.Button({zIndex:10}));"+
                "div1.setDockMargin({left:20,top:20,right:10,bottom:10}).setCustomStyle({KEY:'background:#00ff00'});"+
                "var arr=['none','top','bottom','left','right','center','middle','origin','width','height','fill','cover'];"+
                "linb.Thread(null,[function(id){if(!arr.length)return linb.Thread.abort(id); var type=arr.shift();btn2.setDock(type).setCaption(type);}],1000,null,null,null,true).start();"+
                "}"
            ]
        },
        getDockOrder:{
            $desc:"Gets dock order on the first UIProfile",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.ui70'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "alert(btn.getDockOrder())"+
                "}"
            ]
        },
        setDockOrder:{
            $desc:"Sets dock order on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ui72'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var div1,btn2;linb(id).prepend(div1=new linb.UI.Div({dock:'top',height:20})).prepend(btn2=new linb.UI.Button({zIndex:10}));"+
                "div1.setDockOrder(1).setDock('top').setCustomStyle({KEY:'background:#00ff00'});"+
                "btn2.setDockOrder(2).setDock('top');"+
                "_.asyRun(function(){div1.setDockOrder(3)},1000)"+
                "}"
            ]
        },
        getDockIgnore:{
            $desc:"Gets the dockIgnore property value on the first UIProfile",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.ui75'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button({dock:'fill',type:'custom',border:true}));"+
                "alert(btn.getDockIgnore())"+
                "}"
            ]
        },
        setDockIgnore:{
            $desc:"Sets the dockIgnore property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ui76'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button({dock:'fill',type:'custom',border:true}));"+
                "_.asyRun(function(){linb(id).width(200);},1000);"+
                "_.asyRun(function(){btn.setDockIgnore(true);linb(id).width(300);},2000);"+
                "_.asyRun(function(){btn.setDockIgnore(false);linb(id).width(400);},3000);"+
                "}"
            ]
        },
        getDockMinH:{
            $desc:"Gets dock minimal height on the first UIProfile",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.ui77'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button({dock:'fill',type:'custom',border:true}));"+
                "alert(btn.getDockMinH())"+
                "}"
            ]
        },
        getDockMinW:{
            $desc:"Gets dock minimal width on the first UIProfile",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.ui79'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button({dock:'fill',type:'custom',border:true}));"+
                "alert(btn.getDockMinW())"+
                "}"
            ]
        },
        setDockMinH:{
            $desc:"Sets dock minimal height on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ui81'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"overflow:visible;border:solid 1px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button({dock:'height',type:'custom',border:true}));"+
                "_.asyRun(function(){btn.setDockMinH(100);linb(id).height(80);},1000);"+
                "_.asyRun(function(){btn.setDockMinH(50);linb(id).height(50);},2000);"+
                "}"
            ]
        },
        setDockMinW:{
            $desc:"Sets dock minimal width on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ui82'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button({dock:'width'}));"+
                "_.asyRun(function(){btn.setDockMinW(300);linb(id).width(200);},1000);"+
                "_.asyRun(function(){btn.setDockMinW(50);linb(id).width(100);},2000);"+
                "}"
            ]
        },
        getDomId:{
            $desc:"Gets the first profile's dom id string.",
            $rtn:"String",
            $snippet:[
                "alert(linb.UIProfile.getFromDomId('logo').boxing().getDomId())"
            ]
        },
        getSubNode:{
            $desc:"Gets one or a set of specified inner DOM elements(in the corresponding DOM element of the first profile) according to the given [key] and [subId].",
            $rtn:"linb.dom object",
            $paras:[
                "key [Required] : String, key string.",
                "subId [Optional] : String or [true]. [true] for getting all the sub nodes with the specified [key]."
            ],
            $snippet:[
                "alert(linb.UIProfile.getFromDomId('logo').boxing().getSubNode('KEY').id());"+
                "alert(linb.UIProfile.getFromDomId('linb.UI.TreeBar:a:').boxing().getSubNode('ITEM','a').id());"+
                "alert(linb.UIProfile.getFromDomId('linb.UI.TreeBar:a:').boxing().getSubNode('ITEM',true).get().length);"
            ],
            $memo:"The [subId] parameter is for those [linb.absList] profiles only."
        },
        setDomId:{
            $desc:"Sets a specified dom id to the first profile.",
            $rtn:"[self]",
            $paras:[
                "id [Required] : String, id string"
            ],
            $snippet:[
                "var logo=linb.UIProfile.getFromDomId('logo').boxing(); alert(logo.getDomId()); logo.setDomId('logo1'); alert(logo.getDomId());logo.setDomId('logo'); alert(logo.getDomId());"
            ]
        },
        hide:{
            $desc:"To hide the set of UIProfile.",
            $rtn:"[self]",
            $snippet:[
                "var logo=linb.UIProfile.getFromDomId('logo').boxing(); logo.hide(); _.asyRun(function(){logo.show()},1000);"
            ]
        },
        show:{
            $desc:"To show the set of UIProfile.",
            $rtn:"[self]",
            $paras:[
                "left [Optional] : Number, the css left value.",
                "top [Optional] : Number, the css top value."
            ],
            $snippet:[
                "var logo=linb.UIProfile.getFromDomId('logo').boxing(); logo.hide(); _.asyRun(function(){logo.show()},1000);"
            ]
        },
        serialize:{
            $desc:"To serialize the current object to a string representation.",
            $rtn:"String or Array",
            $paras:[
                "rtnString [Optional] : Bool. to indicate whether or not it returns String or Object. Default is true.",
                "keepHost [Optional] : Bool. to keep host object link or not. Default is false."
            ],
            $snippet:[
                "alert(linb.UIProfile.getFromDomId('logo').boxing().serialize());" +
                "alert(linb.UIProfile.getFromDomId('logo').boxing().serialize(false))"
            ]
        },
        refreshDom:{
            $desc:"To rebuild the Dom elements of each UIProfile.",
            $rtn:"[self]",
            $snippet:[
                "var id='linb.temp.ui910'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button({dock:'width'}));"+
                "btn.get(0).properties.caption='new caption';"+
                "_.asyRun(function(){btn.refresh()},1000);"+
                "}"
            ],
            $memo:"This function refreshes Dom element only; 'refresh' fnction refreshes all the UIProfile."
        },
        refresh:{
            $desc:"To refresh the set of UIProfiles.",
            $rtn:"[self]",
            $snippet:[
                "var id='linb.temp.ui91'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button({dock:'width'}));"+
                "btn.get(0).properties.caption='new caption';"+
                "_.asyRun(function(){btn.refresh()},1000);"+
                "}"
            ]
        },
        render:{
            $desc:"To render the set of UIProfiles to DOM.",
            $rtn:"[self]",
            $paras:[
                "triggerLayOut [Optional] : Bool. triggers lay out or not. Default is [false]."
            ],
            $snippet:[
                "var btn=new linb.UI.Button; alert(btn.get(0).domNode); btn.render(); alert(btn.get(0).domNode); btn.destroy()"
            ]
        },
        renderOnto:{
            $desc:"To render the first UIProfile to DOM, and replace an existing DOM element.",
            $rtn:"[self]",
            $paras:[
                "node [Required] : String,DOM element, DOM id or linb.Dom object.",
                "host [Optional] : Object, the host object. Default is [window]."
            ],
            $snippet:[
                "var id='linb.temp.a1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id).append(linb.create('<button id=\"id_abc\">a b c d e f t</button>'));"+
                "(new linb.UI.Button()).renderOnto('id_abc');"+
                "alert(id_abc);"+
                "}"
            ]
        },
        setCustomStyle:{
            $desc:"Sets customized CSS object to the set of UIProfiles.",
            $rtn:"[self]",
            $paras:[
                "key [Optional] : String or Object. the template string key, or key/value pairs.",
                "value [Optional] : String, CSS string."
            ],
            $snippet:[
                "var id='linb.temp.a2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setCustomStyle('BORDER','background:#666')},1000);"+
                "_.asyRun(function(){btn.setCustomStyle({BORDER:null,KEY:'border:solid 2px',CAPTION:'font-size:14px'})},2000);"+
                "_.asyRun(function(){btn.setCustomStyle('KEY',null)},3000);"+
                "_.asyRun(function(){btn.setCustomStyle(null)},4000);"+
                "}"
            ]
        },
        setCustomClass:{
            $desc:"Sets customized CSS class to the set of UIProfiles.",
            $rtn:"[self]",
            $paras:[
                "key [Optional] : String or Object. the template string key, or key/value pairs.",
                "value [Optional] : String, Class string."
            ],
            $snippet:[
                "var id='linb.temp.a4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb.CSS.setStyleRules('.a-1',{background:'#666'}).setStyleRules('.a-2',{border:'solid 2px'}).setStyleRules('.a-3',{'font-size':'14px'});"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setCustomClass('BORDER','a-1')},1000);"+
                "_.asyRun(function(){btn.setCustomClass({BORDER:null,KEY:'a-2',CAPTION:'a-3'})},2000);"+
                "_.asyRun(function(){btn.setCustomClass('KEY',null)},3000);"+
                "_.asyRun(function(){btn.setCustomClass(null);},4000);"+
                "_.asyRun(function(){linb.CSS.setStyleRules('.a-1').setStyleRules('.a-2').setStyleRules('.a-3');},5000);"+
                "}"
            ]
        },
        setCustomBehavior:{
            $desc:"Sets customized behavior function to the set of UIProfiles.",
            $rtn:"[self]",
            $paras:[
                "key [Optional] : String or Object. the template string key, or key/value pairs.",
                "value [Optional] : Object, key/value pairs."
            ],
            $snippet:[
                "var id='linb.temp.a3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "btn.onClick(function(){alert(1); btn.setCustomBehavior('KEY',{onClick:function(){alert(2); btn.setCustomBehavior({KEY:{onClick:function(){alert(3); btn.setCustomBehavior(null)}}})}})});"+
                "}"
            ]
        },
        setCustomFunction:{
            $desc:"Sets customized functions to the set of UIProfiles. Those functions can be serialized.",
            $rtn:"[self]",
            $paras:[
                "key [Optional] : String or Object. the template string key, or key/value pairs.",
                "value [Optional] : Function, custom function."
            ],
            $snippet:[
                "var id='linb.temp.a5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "btn.setCustomFunction('showTips', function(profile, node, pos){linb.Tips.show(pos, 'hi tips');return true;});"+
                "btn.setCustomFunction('a', function(){var a;});"+
                "alert(btn.serialize(btn))"+
                "}",
                "var id='linb.temp.a6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.List({position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b'}]});"+
                "o.setCustomFunction('render',{items:function(profile,item){"+
                "    return new linb.Template({'':'<div style=\"border:solid 1px;\">{id}: {caption}</div>'},item);"+
                "}});"+
                "linb(id).append(o);"+
                "}"
            ]
        },
        beforeDestroy:{
            $desc:"Fired before the UIProfile is destroyed. If returns false, destroy function will be ignored.",
            $paras:[
                "profile : linb.UIProfile."
            ],
            $snippet:[
                "var id='linb.temp.b1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "btn.beforeDestroy(function(profile){alert('cancelled');return false});"+
                "_.asyRun(function(){btn.destroy()},1000)"+
                "}"
            ]
        },
        onDestroy:{
            $desc:"Fired when the UIProfile is destroyed.",
            $paras:[
                "profile : linb.UIProfile."
            ],
            $snippet:[
                "var id='linb.temp.b2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "btn.onDestroy(function(profile){alert('onDestroy');});"+
                "_.asyRun(function(){btn.destroy()},1000)"+
                "}"
            ]
        },
        onRender:{
            $desc:"Fired when the UIProfile renders.",
            $paras:[
                "profile : linb.UIProfile."
            ],
            $snippet:[
                "var id='linb.temp.b3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn=new linb.UI.Button;"+
                "btn.onRender(function(profile){alert('onRender')});"+
                "_.asyRun(function(){linb(id).prepend(btn)},1000)"+
                "}"
            ]
        },
        onLayout:{
            $desc:"Fired when ever the UIProfile lays out.",
            $paras:[
                "profile : linb.UIProfile."
            ],
            $snippet:[
                "var id='linb.temp.b4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\"><div id='+id+'1 style=\"height:20px;border:solid 1px;\"></div><div id='+id+'2 style=\"height:20px;border:solid 1px;\"></div>' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn=new linb.UI.Button;"+
                "btn.onLayout(function(profile){alert('onLayout')});"+
                "linb(id).prepend(btn);"+
                "_.asyRun(function(){linb(id+'1').prepend(btn)},1000);"+
                "_.asyRun(function(){linb(id+'2').prepend(btn)},2000);"+
                "}"
            ]
        },
        onShowTips:{
            $desc:"Fired when linb.Tips shows tips.",
            $paras:[
                "profile : linb.UIProfile.",
                "node : DOM node.",
                "pos : {left:Number, top:Number}"
            ],
            $snippet:[
                "var id='linb.temp.b5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "btn.onShowTips(function(profile, node, pos){linb.Tips.show(pos, 'hi tips');return true;});"+
                "}"
            ]
        }
    }
});
_.set(linb.Locale,["en","doc","linb","UI","Widget"], {
    constructor:{
        $desc:"Creates a linb.UI.Widget object."
    },
    prototype:{
        getBorder:{
            $desc:"Determines whether this widget has border.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.w1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Widget()).setBorder(true));"+
                "_.asyRun(function(){alert(o.getBorder())});"+
                "}"
            ]
        },
        setBorder:{
            $desc:"Specifys whether this widget has border, and reflects it to DOM UI",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.w2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Widget()).setBorder(true));"+
                "_.asyRun(function(){alert(o.getBorder())});"+
                "}"
            ]
        },
        getShadow:{
            $desc:"Determines whether this widget has shadow.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.w3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Widget()).setShadow(true));"+
                "_.asyRun(function(){alert(o.getShadow())});"+
                "}"
            ]
        },
        setShadow:{
            $desc:"Specifys whether this widget has shadow, and reflects it to DOM UI",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.w4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Widget()).setShadow(true));"+
                "_.asyRun(function(){alert(o.getShadow())});"+
                "}"
            ]
        },
        getResizer:{
            $desc:"Determines whether this widget could be resized by end user.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.w5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Widget()).setCustomStyle('KEY','background:#ccc').setResizer(true));"+
                "_.asyRun(function(){alert(o.getResizer())});"+
                "}"
            ]
        },
        setResizer:{
            $desc:"Specifys whether this widget could be resized by end user, and reflects it to DOM UI",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.w6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Widget()).setCustomStyle('KEY','background:#ccc').setResizer(true));"+
                "_.asyRun(function(){alert(o.getResizer())});"+
                "}"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","UI","Div"], {
    constructor:{
        $desc:"Creates a linb.UI.Div object."
    },
    prototype:{
        getHtml:{
            $desc:"Gets the html string from the current UI object.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.div1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Div({height:'auto',html:'<span>a</span>'}));"+
                "_.asyRun(function(){alert(o.getHtml())});"+
                "}"
            ]
        },
        setHtml:{
            $desc:"Sets the html string to the current UI object.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String, the html string.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.div2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Div).setHeight('auto').setHtml('<span>a</span>'));"+
                "_.asyRun(function(){o.setHtml('<span>b</span>')},1000);"+
                "}"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","UI","Pane"], {
    constructor:{
        $desc:"Creates a linb.UI.Pane object."
    }
});

_.set(linb.Locale,["en","doc","linb","UI","Tag"], {
    constructor:{
        $desc:"Creates a linb.UI.Tag object. linb.UI.Tag is a proxy UI class for 'Inversion of Control' in jsLinb.",
        $memo:"linb.UI.Tag is for embedding a target UI object(from linb.Com object) into an existing UI dynamically.",
        $links:[
            ["linb.ComFactory.getCom","#a=linb.ComFactory"]
        ]
    },
    replace:{
        $desc:"To replace the tagProfile with the profile.",
        $paras:[
            "tagProfile [Required] : the profile of linb.UI.Tag object.",
            "profile [Required] : the profile of the target UI object",
            "com [Optional] : linb.Com object, if the tagProfile is in a com objcet directly(no parent UIProfile), you have to specify this."
        ],
        $demo:"Generally, you don't need to use this function manually."
    },
    prototype:{
        getTagKey:{
            $desc:"Gets the tag key string.",
            $rtn:"String",
            $memo:"linb.ComFactory will find the target UI object in the matched linb.Com according to this tagKey."
        },
        setTagKey:{
            $desc:"Sets the tag key string.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String, the tag key.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $memo:"linb.ComFactory will find the target UI object in the matched linb.Com according to this tagKey."
        }
    }
});

_.set(linb.Locale,["en","doc","linb","UI","Link"], {
    constructor:{
        $desc:"Creates a linb.UI.Link object."
    },
    prototype:{
        getCaption:{
            $desc:"Gets the caption string from the current UI object.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.link1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Link()).setCaption('cap'));"+
                "_.asyRun(function(){alert(o.getCaption())});"+
                "}"
            ]
        },
        setCaption:{
            $desc:"Sets the caption string to the current UI object.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String, the caption.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.link2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Link()).setCaption('cap'));"+
                "_.asyRun(function(){alert(o.getCaption())});"+
                "}"
            ]
        },
        getTarget:{
            $desc:"Gets the target attribute from the current UI object.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.link3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Link()).setTarget('_top'));"+
                "_.asyRun(function(){alert(o.getTarget())});"+
                "}"
            ]
        },
        setTarget:{
            $desc:"Sets the target attribute to the current UI object.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String, the target.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.link4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Link()).setTarget('_top'));"+
                "_.asyRun(function(){alert(o.getTarget())});"+
                "}"
            ]
        },
        getHref:{
            $desc:"Gets the href attribute from the current UI object.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.link5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Link()).setHref('#'));"+
                "_.asyRun(function(){alert(o.getHref())});"+
                "}"
            ]
        },
        setHref :{
            $desc:"Sets the href attribute to the current UI object.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String, the href.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.link6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Link()).setHref('#'));"+
                "_.asyRun(function(){alert(o.getHref())});"+
                "}"
            ]
        },


        onClick:{
            $desc:"onClick event handler.",
            $paras:[
                "profile : linb.UIProfile object.",
                "e : DOM event object."
            ],
            $snippet:[
                "var id='linb.temp.link7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id).prepend((new linb.UI.Link()).setCaption('cap').onClick(function(profile){alert(profile.properties.caption)}));"+
                "}"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","UI","Border"], {});

_.set(linb.Locale,["en","doc","linb","UI","Shadow"], {});

_.set(linb.Locale,["en","doc","linb","UI","Resizer"], {});

_.set(linb.Locale,["en","doc","linb","UI","Block"], {
    constructor:{
        $desc:"Creates a linb.UI.Block object."
    },
    prototype:{
        getHtml:{
            $desc:"Gets the html string from the current UI object.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.blk1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Block({border:true,html:'<span>a</span>'}));"+
                "_.asyRun(function(){alert(o.getHtml())});"+
                "}"
            ]
        },
        setHtml:{
            $desc:"Sets the html string to the current UI object.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String, the html string.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.blk2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Block).setBorder(true).setHtml('<span>a</span>'));"+
                "_.asyRun(function(){o.setHtml('<span>b</span>')},1000);"+
                "}"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","UI","Label"], {
    constructor:{
        $desc:"Creates a linb.UI.Label object."
    },
    prototype:{
        getCaption :{
            $desc:"Gets the caption property value on the first UIProfile",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.lbl1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Label);"+
                "_.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                "}"
            ]
        },
        setCaption :{
            $desc:"Sets the caption property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.lbl2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Label);"+
                "_.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                "}"
            ]
        },
        getFontSize :{
            $desc:"Gets the FontSize property value on the first UIProfile",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.lbl3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Label);"+
                "_.asyRun(function(){btn.setFontSize ('14px'); alert(btn.getFontSize ())},1000)"+
                "}"
            ]
        },
        setFontSize :{
            $desc:"Sets the FontSize property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : corresponding CSS value.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.lbl4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Label);"+
                "_.asyRun(function(){btn.setFontSize ('14px'); alert(btn.getFontSize ())},1000)"+
                "}"
            ]
        },
        getFontWeight :{
            $desc:"Gets the FontWeight property value on the first UIProfile",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.lbl5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Label);"+
                "_.asyRun(function(){btn.setFontWeight('bold'); alert(btn.getFontWeight())},1000)"+
                "}"
            ]
        },
        setFontWeight :{
            $desc:"Sets the FontWeight property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : corresponding CSS value.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.lbl6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Label);"+
                "_.asyRun(function(){btn.setFontWeight('bold'); alert(btn.getFontWeight())},1000)"+
                "}"
            ]
        },
        getHAlign :{
            $desc:"Gets horizontal alignment",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.lbl7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Label({border:true,height:'50',width:'100'}));"+
                "_.asyRun(function(){btn.setHAlign('center'); alert(btn.getHAlign())},1000)"+
                "}"
            ]
        },
        setHAlign :{
            $desc:"Sets horizontal alignment, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : 'left', 'center' or 'right'.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.lbl8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Label({border:true,height:'50',width:'100'}));"+
                "_.asyRun(function(){btn.setHAlign('center'); alert(btn.getHAlign())},1000)"+
                "}"
            ]
        },
        getVAlign :{
            $desc:"Gets the VAlign property value on the first UIProfile",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.lbl9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Label({border:true,height:'50',width:'100'}));"+
                "_.asyRun(function(){btn.setVAlign('bottom'); alert(btn.getVAlign())},1000)"+
                "}"
            ]
        },
        setVAlign :{
            $desc:"Sets the VAlign property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : 'top', 'middle' or 'bottom'.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.lbl20'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Label({border:true,height:'50',width:'100'}));"+
                "_.asyRun(function(){btn.setVAlign('bottom'); alert(btn.getVAlign())},1000)"+
                "}"
            ]
        },
        getShadowText :{
            $desc:"Gets the ShadowText property value on the first UIProfile",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.lbl11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Label({border:true,height:'50',width:'100'}));"+
                "_.asyRun(function(){btn.setShadowText(true); alert(btn.getShadowText())},1000)"+
                "}"
            ]
        },
        setShadowText :{
            $desc:"Sets the ShadowText property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.lbl12'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Label({border:true,height:'50',width:'100'}));"+
                "_.asyRun(function(){btn.setShadowText(true); alert(btn.getShadowText())},1000)"+
                "}"
            ]
        },
        getImage :{
            $desc:"Gets the image property value on the first UIProfile",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.lbl13'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Label({height:50}));"+
                "_.asyRun(function(){btn.setImage('img/img.gif'); alert(btn.getImage())},1000)"+
                "}"
            ]
        },
        setImage :{
            $desc:"Sets the image property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] :String,  image path.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.lbl14'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Label({height:50}));"+
                "_.asyRun(function(){btn.setImage('img/img.gif'); alert(btn.getImage())},1000)"+
                "}"
            ]
        },
        getImagePos :{
            $desc:"Gets the image position property value on the first UIProfile",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.lbl15'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Label({height:50}));"+
                "_.asyRun(function(){btn.setImage('img/img.gif').setImagePos('left -16px'); alert(btn.getImagePos())},1000)"+
                "}"
            ]
        },
        setImagePos :{
            $desc:"Sets the image positon property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String, corresponding CSS value.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.lbl16'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Label({height:50}));"+
                "_.asyRun(function(){btn.setImage('img/img.gif').setImagePos('left -16px'); alert(btn.getImagePos())},1000)"+
                "}"
            ]
        }
    }
});
_.set(linb.Locale,["en","doc","linb","UI","ProgressBar"], {
    constructor:{
        $desc:"Creates a linb.UI.ProgressBar object."
    },
    prototype:{
        getCaptionTpl :{
            $desc:"Gets the caption template string.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.pb1-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.ProgressBar({value:'20'}));"+
                "_.asyRun(function(){o.setCaptionTpl('ongoing {value}%')},1000);"+
                "_.asyRun(function(){alert(o.getCaptionTpl())},2000);"+
                "}"
            ]
        },
        setCaptionTpl :{
            $desc:"Sets the caption template string.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.pb1-2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.ProgressBar({value:'20'}));"+
                "_.asyRun(function(){o.setCaptionTpl('ongoing {value}%')},1000);"+
                "_.asyRun(function(){alert(o.getCaptionTpl())},2000);"+
                "}"
            ]
        },
        getFillBG:{
            $desc:"Gets the fill backgournd property value on the first UIProfile",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.pb2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.ProgressBar({value:'20'}));"+
                "_.asyRun(function(){o.setFillBG('#00ff00')},1000);"+
                "_.asyRun(function(){alert(o.getFillBG())},1000);"+
                "}"
            ]
        },
        setFillBG:{
            $desc:"Sets the fill backgournd to the properties object of each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
             $paras:[
                "value [Required] : nonnegative Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
           $snippet:[
                "var id='linb.temp.pb3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.ProgressBar({value:'20'}));"+
                "_.asyRun(function(){o.setFillBG('#00ff00')},1000);"+
                "_.asyRun(function(){alert(o.getFillBG())},1000);"+
                "}"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","UI","Button"], {
    constructor:{
        $desc:"Creates a linb.UI.Button object."
    },
    prototype:{
        activate:{
            $desc:"Activates this button.",
            $rtn:"[self]",
            $snippet:[
                "var id='linb.temp.btn0'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.activate()},1000);"+
                "}"
            ]
        },
        getCaption :{
            $desc:"Gets this button caption text.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.btn1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                "}"
            ]
        },
        setCaption :{
            $desc:"Sets caption text to this button, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.btn2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                "}"
            ]
        },
        getHref :{
            $desc:"Gets the Href property value on the first UIProfile",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.btn3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setHref ('#'); alert(btn.getHref ())},1000)"+
                "}"
            ]
        },
        setHref :{
            $desc:"Sets the Href property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.btn4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setHref ('#'); alert(btn.getHref ())},1000)"+
                "}"
            ]
        },
        getType:{
            $desc:"Gets button type.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.btn5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setType('drop'); alert(btn.getType ())},1000)"+
                "}"
            ]
        },
        setType  :{
            $desc:"Sets button type.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : 'normal', 'drop', 'status' or 'custom'.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.btn6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button);"+
                "_.asyRun(function(){btn.setType('drop'); alert(btn.getType ())},1000)"+
                "}"
            ]
        },
        getHAlign :{
            $desc:"Gets horizontal alignment.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.btn7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button({border:true,height:'50',width:'100'}));"+
                "_.asyRun(function(){btn.setHAlign('center'); alert(btn.getHAlign())},1000)"+
                "}"
            ]
        },
        setHAlign :{
            $desc:"Sets horizontal alignment, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : 'left', 'center' or 'right'.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.btn8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button({border:true,height:'50',width:'100'}));"+
                "_.asyRun(function(){btn.setHAlign('center'); alert(btn.getHAlign())},1000)"+
                "}"
            ]
        },
        getVAlign :{
            $desc:"Gets vertical alignment.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.btn9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button({border:true,height:'50',width:'100'}));"+
                "_.asyRun(function(){btn.setVAlign('bottom'); alert(btn.getVAlign())},1000)"+
                "}"
            ]
        },
        setVAlign :{
            $desc:"Sets vertical alignment, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : 'top', 'middle' or 'bottom'.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.btn20'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button({border:true,height:'50',width:'100'}));"+
                "_.asyRun(function(){btn.setVAlign('bottom'); alert(btn.getVAlign())},1000)"+
                "}"
            ]
        },
        getImage :{
            $desc:"Gets image url.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.btn13'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button());"+
                "_.asyRun(function(){btn.setImage('img/img.gif'); alert(btn.getImage())},1000)"+
                "}"
            ]
        },
        setImage :{
            $desc:"Sets image url, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] :String,  image path.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.btn14'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button());"+
                "_.asyRun(function(){btn.setImage('img/img.gif'); alert(btn.getImage())},1000)"+
                "}"
            ]
        },
        getImagePos :{
            $desc:"Gets image postion.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.btn15'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button());"+
                "_.asyRun(function(){btn.setImage('img/img.gif').setImagePos('left -16px'); alert(btn.getImagePos())},1000)"+
                "}"
            ]
        },
        setImagePos :{
            $desc:"Sets image image postion, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String, corresponding CSS value.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.btn16'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Button());"+
                "_.asyRun(function(){btn.setImage('img/img.gif').setImagePos('left -16px'); alert(btn.getImagePos())},1000)"+
                "}"
            ]
        },

        onClick:{
            $desc:"Fired when button is clicked.",
            $paras:[
                "profile : linb.UIProfile object.",
                "e : DOM event object.",
                "src : DOM element.",
                "value : the value."
            ],
            $snippet:[
                "var id='linb.temp.btn17'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id).prepend((new linb.UI.Button()).onClick(function(profile){alert(profile.properties.caption)}));"+
                "}"
            ]
        },
        onClickDrop:{
            $desc:"Fired when button is clicked.",
            $paras:[
                "profile : linb.UIProfile object.",
                "e : DOM event object.",
                "src : DOM element.",
                "value : the value."
            ],
            $snippet:[
                "var id='linb.temp.btn17-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id).prepend((new linb.UI.Button({type:'drop'})).onClick(function(profile){alert('clicked button')}).onClickDrop(function(profile){alert('clicked drop button')}));"+
                "}"
            ]
        },
        onChecked:{
            $desc:"Fired when button is checked. linb.UI.Button object has this event handler only when button type is 'status' is [true].",
            $paras:[
                "profile : linb.UIProfile object.",
                "e : DOM event object.",
                "value : String, the value."
            ],
            $snippet:[
                "var id='linb.temp.btn18'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id).prepend((new linb.UI.Button({style:'status'})).onChecked(function(profile,e,value){alert(value)}));"+
                "}"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","UI","CheckBox"], {
    constructor:{
        $desc:"Creates a linb.UI.CheckBox object."
    }
});

_.set(linb.Locale,["en","doc","linb","UI","Input"], {
    constructor:{
        $desc:"Creates a linb.UI.Input object."
    },
    prototype:{
        activate:{
            $desc:"Activates the current input box.",
            $rtn:"[self]",
            $snippet:[
                "var id='linb.temp.input0'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Input);"+
                "_.asyRun(function(){o.activate()},1000)"+
                "}"
            ]
        },
        getDynCheck:{
            $desc:"Gets the 'dynamic check' property value on the first UIProfile",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.input3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(new linb.UI.Input({position:'relative',valueFormat:'^\\\\d*$'})).prepend(o=new linb.UI.Input({position:'relative',valueFormat:'^\\\\d*$'}));"+
                "o.setDynCheck(true);alert(o.getDynCheck());"+
                "}"
            ]
        },
        setDynCheck:{
            $desc:"Sets the 'dynamic check' property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.input4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(new linb.UI.Input({position:'relative',valueFormat:'^\\\\d*$'})).prepend(o=new linb.UI.Input({position:'relative',valueFormat:'^\\\\d*$'}));"+
                "o.setDynCheck(true);alert(o.getDynCheck());"+
                "}"
            ]
        },
        getMultiLines:{
            $desc:"Determines whether input box holds single line or multi line",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.input5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(new linb.UI.Input({position:'relative'})).prepend(o=new linb.UI.Input({position:'relative'}));"+
                "o.setMultiLines(true).setHeight(50);alert(o.getMultiLines());"+
                "}"
            ]
        },
        setMultiLines:{
            $desc:"Specifys whether input box holds single line or multi line, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.input6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(new linb.UI.Input({position:'relative'})).prepend(o=new linb.UI.Input({position:'relative'}));"+
                "o.setMultiLines(true).setHeight(50);alert(o.getMultiLines());"+
                "}"
            ]
        },
        getMask:{
            $desc:"Gets the mask property value. Mark is kind of input pattern/format and can restrict abusive input.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.input7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Input());"+
                "alert(o.setMask('(1111)11111111-111').getMask());"+
                "}"
            ]
        },
        setMask:{
            $desc:"Sets the mask property value, and reflects the value to UI. Mark is kind of input pattern/format and can restrict abusive input.<ul>Char represents:"+
                "<li>'~' : [+-]</li>"+
        		"<li>'1' : [0-9]</li>"+
        		"<li>'a' : [A-Za-z]</li>"+
        		"<li>'*' : [A-Za-z0-9]</li>"+
        		"<li>other : itself </li>"+
        		"</ul>",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.input8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Input());"+
                "alert(o.setMask('(1111)11111111-111').getMask());"+
                "}"
            ]
        },
        getReadonly:{
            $desc:"Gets the readonly property value on the first UIProfile",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.input9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Input({value:'ini'}));"+
                "alert(o.setReadonly(true).getReadonly())"+
                "}"
            ]
        },
        setReadonly:{
            $desc:"Sets the readonly property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.input10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Input({value:'ini'}));"+
                "alert(o.setReadonly(true).getReadonly())"+
                "}"
            ]
        },
        getTipsBinder:{
            $desc:"Gets the tipsBinder property value on the first UIProfile",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.input11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o,host={}; linb(id).prepend((new linb.UI.Div({position:'relative'})).host(host,'div')).prepend((o=new linb.UI.Input({position:'relative',valueFormat:'^\\\\d*$',dynCheck:true})).host(host,'input'));"+
                "o.setTipsBinder('div').setTipsErr('format err').setTipsOK('ok');"+
                "alert(o.getTipsBinder()+' : '+ o.getTipsErr() +' : '+ o.getTipsOK())"+
                "}"
            ]
        },
        setTipsBinder:{
            $desc:"Sets the tipsBinder property value on the each UIProfile.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.input12'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o,host={}; linb(id).prepend((new linb.UI.Div({position:'relative'})).host(host,'div')).prepend((o=new linb.UI.Input({position:'relative',valueFormat:'^\\\\d*$',dynCheck:true})).host(host,'input'));"+
                "o.setTipsBinder('div').setTipsErr('format err').setTipsOK('ok');"+
                "alert(o.getTipsBinder()+' : '+ o.getTipsErr() +' : '+ o.getTipsOK())"+
                "}"
            ]
        },
        getTipsErr:{
            $desc:"Gets the 'error tips' property value on the first UIProfile",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.input13'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o,host={}; linb(id).prepend((new linb.UI.Div({position:'relative'})).host(host,'div')).prepend((o=new linb.UI.Input({position:'relative',valueFormat:'^\\\\d*$',dynCheck:true})).host(host,'input'));"+
                "o.setTipsBinder('div').setTipsErr('format err').setTipsOK('ok');"+
                "alert(o.getTipsBinder()+' : '+ o.getTipsErr() +' : '+ o.getTipsOK())"+
                "}"
            ]
        },
        setTipsErr:{
            $desc:"Sets the 'error tips' property value on the each UIProfile.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.input14'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o,host={}; linb(id).prepend((new linb.UI.Div({position:'relative'})).host(host,'div')).prepend((o=new linb.UI.Input({position:'relative',valueFormat:'^\\\\d*$',dynCheck:true})).host(host,'input'));"+
                "o.setTipsBinder('div').setTipsErr('format err').setTipsOK('ok');"+
                "alert(o.getTipsBinder()+' : '+ o.getTipsErr() +' : '+ o.getTipsOK())"+
                "}"
            ]
        },
        getTipsOK:{
            $desc:"Gets the 'OK tips' property value on the first UIProfile",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.input15'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o,host={}; linb(id).prepend((new linb.UI.Div({position:'relative'})).host(host,'div')).prepend((o=new linb.UI.Input({position:'relative',valueFormat:'^\\\\d*$',dynCheck:true})).host(host,'input'));"+
                "o.setTipsBinder('div').setTipsErr('format err').setTipsOK('ok');"+
                "alert(o.getTipsBinder()+' : '+ o.getTipsErr() +' : '+ o.getTipsOK())"+
                "}"
            ]
        },
        setTipsOK:{
            $desc:"Sets the 'OK tips' property value on the each UIProfile.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.input16'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o,host={}; linb(id).prepend((new linb.UI.Div({position:'relative'})).host(host,'div')).prepend((o=new linb.UI.Input({position:'relative',valueFormat:'^\\\\d*$',dynCheck:true})).host(host,'input'));"+
                "o.setTipsBinder('div').setTipsErr('format err').setTipsOK('ok');"+
                "alert(o.getTipsBinder()+' : '+ o.getTipsErr() +' : '+ o.getTipsOK())"+
                "}"
            ]
        },
        getValueFormat:{
            $desc:"Gets value format of this input box. Format is pattern which can be accepted by input box.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.input17'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o; linb(id).prepend((o=new linb.UI.Input({position:'relative',dynCheck:true})));"+
                "alert(o.setValueFormat('^\\\\d*$').getValueFormat());"+
                "}"
            ]
        },
        setValueFormat:{
            $desc:"Sets value formate to this input box. Format is pattern which can be accepted by input box.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.input18'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o; linb(id).prepend((o=new linb.UI.Input({position:'relative',dynCheck:true})));"+
                "alert(o.setValueFormat('^\\\\d*$').getValueFormat());"+
                "}"
            ]
        },
        getType:{
            $desc:"Gets input box type. ",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.input19'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(new linb.UI.Input({position:'relative'})).prepend(o=new linb.UI.Input({position:'relative'}));"+
                "o.setType('password');alert(o.getType());"+
                "}"
            ]
        },
        setType:{
            $desc:"Sets the type property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : 'input' or 'password'. Default is 'input'.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.input20'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(new linb.UI.Input({position:'relative'})).prepend(o=new linb.UI.Input({position:'relative'}));"+
                "o.setType('password');alert(o.getType());"+
                "}"
            ]
        },

        onBlur:{
            $desc:"Fired when input box loses focus.",
            $paras:[
                "profile : linb.UIProfile object."
            ],
            $snippet:[
                "var id='linb.temp.input20'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Input({position:'relative'}));"+
                "o.onBlur(function(){alert('onBlur')});"+
                "}"
            ]
        },
        onFocus:{
            $desc:"Fired when input box gets focus.",
            $paras:[
                "profile : linb.UIProfile object."
            ],
            $snippet:[
                "var id='linb.temp.input20'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Input({position:'relative'}));"+
                "o.onFocus(function(){alert('onFocus')});"+
                "}"
            ]
        },
        beforeFormatCheck:{
            $desc:"Fired before validating value format. If returns false, the inner formatCheck function will be ignored.",
            $paras:[
                "profile : linb.UIProfile object.",
                "value: String, the value need to be checked."
            ],
            $snippet:[
                "var id='linb.temp.input21'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Input({position:'relative',dynCheck:true}));"+
                "o.beforeFormatCheck(function(p,v){if(v!=='a')return false;});"+
                "}"
            ]
        },
        beforeFormatMark:{
            $desc:"Fired before the UIProfile sets the format mark. If returns false, the inner formatMark function will be ignored.",
            $paras:[
                "profile : linb.UIProfile object.",
                "formatErr: Bool, is the format error."
            ],
            $snippet:[
                "var id='linb.temp.input21'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(new linb.UI.Input({position:'relative',valueFormat:'^\\\\d*$', dynCheck:true})).prepend(o=new linb.UI.Input({position:'relative',valueFormat:'^\\\\d*$', dynCheck:true}));"+
                "o.beforeFormatMark(function(p,v){p.getSubNode('INPUT').css('background',v?'#00ff00':''); return false;});"+
                "}"
            ]
        }
    }
});
_.set(linb.Locale,["en","doc","linb","UI","TextEditor"], {
    constructor:{
        $desc:"Creates a linb.UI.TextEditor object."
    },
    prototype:{
        activate:{
            $desc:"Activates the current UI object.",
            $rtn:"[self]",
            $snippet:[
                "var id='linb.temp.TextEditor0'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.TextEditor({dock:'fill'}));"+
                "_.asyRun(function(){o.activate()},1000)"+
                "}"
            ]
        },
        getReadonly:{
            $desc:"Determines whether editor is read-only or editable.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.TextEditor9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.TextEditor({dock:'fill'}));"+
                "alert(o.setReadonly(true).getReadonly())"+
                "}"
            ]
        },
        setReadonly:{
            $desc:"Sets editor read-only or editable, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.TextEditor10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.TextEditor({dock:'fill'}));"+
                "alert(o.setReadonly(true).getReadonly())"+
                "}"
            ]
        },


        onChange:{
            $desc:"Fired when end user changes text in this editor.",
            $paras:[
                "profile : linb.UIProfile object.",
                "oV : the old value.",
                "nV : the new value."
            ],
            $snippet:[
                "var id='linb.temp.input23'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.TextEditor({dock:'fill'}));"+
                "o.onChange(function(p,o,n){linb.message(o.length+'=>'+n.length)});"+
                "}"
            ]
        }
    }
});
_.set(linb.Locale,["en","doc","linb","UI","Group"], {
    constructor:{
        $desc:"Creates a linb.UI.Group object."
    },
    prototype:{
        activate:{
            $desc:"Activates the current UI object.",
            $rtn:"[self]",
            $snippet:[
                "var id='linb.temp.grp0'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Group);"+
                "_.asyRun(function(){btn.activate()},1000)"+
                "}"
            ]
        },
        getCaption :{
            $desc:"Gets caption text of this group",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.grp1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Group);"+
                "_.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                "}"
            ]
        },
        setCaption :{
            $desc:"Sets caption text to this group, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.grp2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Group);"+
                "_.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                "}"
            ]
        },
        getImage :{
            $desc:"Gets image url",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.grp3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Group({height:50}));"+
                "_.asyRun(function(){btn.setImage('img/img.gif'); alert(btn.getImage())},1000)"+
                "}"
            ]
        },
        setImage :{
            $desc:"Sets image url, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] :String,  image path.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.grp4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Group({height:50}));"+
                "_.asyRun(function(){btn.setImage('img/img.gif'); alert(btn.getImage())},1000)"+
                "}"
            ]
        },
        getImagePos :{
            $desc:"Gets image position",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.grp5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Group({height:50}));"+
                "_.asyRun(function(){btn.setImage('img/img.gif').setImagePos('left -16px'); alert(btn.getImagePos())},1000)"+
                "}"
            ]
        },
        setImagePos :{
            $desc:"Sets image position, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String, corresponding CSS value.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.grp6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Group({height:50}));"+
                "_.asyRun(function(){btn.setImage('img/img.gif').setImagePos('left -16px'); alert(btn.getImagePos())},1000)"+
                "}"
            ]
        },
        getToggle:{
            $desc:"Determines whether group collapses or not.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.fs3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Group);"+
                "_.asyRun(function(){btn.setToggle(false); alert(btn.getToggle ())},1000)"+
                "}"
            ]
        },
        setToggle :{
            $desc:"Specifys whether group collapses or not, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.fs4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Group);"+
                "_.asyRun(function(){btn.setToggle(false); alert(btn.getToggle ())},1000)"+
                "}"
            ]
        },
        getToggleBtn:{
            $desc:"Determines whether toggle button shows or not.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.fs3-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Group);"+
                "_.asyRun(function(){btn.setToggleBtn(false); alert(btn.getToggleBtn())},1000)"+
                "}"
            ]
        },
        setToggleBtn :{
            $desc:"Specifys whether toggle button shows or not, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.fs4-2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Group);"+
                "_.asyRun(function(){btn.setToggleBtn(false); alert(btn.getToggleBtn())},1000)"+
                "}"
            ]
        },


        onExpend:{
            $desc:"Fired when group expends.",
            $paras:[
                "profile : linb.UIProfile object."
            ],
            $snippet:[
                "var id='linb.temp.fs5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Group;"+
                "o.onExpend(function(){alert('onExpend')}).onFold(function(){alert('onFold')}).onIniPanelView(function(){alert('onIniPanelView')});"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        onFold:{
            $desc:"Fired when group collapses.",
            $paras:[
                "profile : linb.UIProfile object."
            ],
            $snippet:[
                "var id='linb.temp.fs6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Group;"+
                "o.onExpend(function(){alert('onExpend')}).onFold(function(){alert('onFold')}).onIniPanelView(function(){alert('onIniPanelView')});"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        onIniPanelView:{
            $desc:"Fired on panel is initialized.",
            $paras:[
                "profile : linb.UIProfile object."
            ],
            $snippet:[
                "var id='linb.temp.fs7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Group;"+
                "o.onExpend(function(){alert('onExpend')}).onFold(function(){alert('onFold')}).onIniPanelView(function(){alert('onIniPanelView')});"+
                "linb(id).prepend(o);"+
                "}"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","UI","ComboInput"], {
    constructor:{
        $desc:"Creates a linb.UI.ComboInput object."
    },
    prototype:{
        resetValue:{
            $desc:"To reset value, UI value and Control value, no event will be triggered in this process.",
            $rtn:'[self]',
            $paras:[
                "value [Optional] : Any, the reset value. Default is ''."
            ],
            $snippet:[
                "var id='linb.temp.ci1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.ComboInput({value:'ini'}));"+
                "o.setUIValue('ini2');_.asyRun(function(){o.resetValue('ini2');},1000)"+
                "}"
            ]
        },
        clearPopCache:{
            $desc:"Clears the popped UI cache.",
            $rtn:"[self]"
        },
        getUploadObj:{
            $desc:"Gest the object (picture or other binary file), that need to be uploaded.",
            $rtn:"linb.Dom object",
            $snippet:[
                "var id='linb.temp.ci2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.ComboInput({type:'upload'}));"+
                "o.afterUIValueSet(function(){alert(o.getUploadObj().value)});"+
                "}"
            ]
        },
        setType:{
            $desc:"Sets the type property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : 'none','combobox','listbox','upload','getter','helpinput','cmdbox','popbox','timepicker','datepicker', 'colorpicker' or 'spin'. Default is 'combobox'.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ci4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var label,o;linb(id).prepend(o=new linb.UI.ComboInput({position:'relative'})).prepend(label=new linb.UI.Label({position:'relative',width:100}));"+
                "var arr=['none','combobox','listbox','upload','getter','helpinput','cmdbox','popbox','timepicker','datepicker','colorpicker'];"+
                "linb.Thread(null,[function(id){if(!arr.length)return linb.Thread.abort(id); var type=arr.shift();o.setType(type);label.setCaption(type)}],1000,null,null,null,true).start();"+
                "}"
            ]
        },
        getItems:{
            $desc:"Gets the items from the current UI object.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.ci5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.ComboInput({position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]}));"+
                "_.asyRun(function(){alert(_.serialize(o.getItems()))});"+
                "}"
            ]
        },
        setItems:{
            $desc:"Sets the items property to the current UI object, and reflects it to DOM UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Array, the items.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ci6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.ComboInput({position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]}));"+
                "_.asyRun(function(){o.setItems([{id:'aaa',caption:'bbb'}])});"+
                "}"
            ]
        },
        getListKey:{
            $desc:"Gets the list key property from the current UI object.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.ci7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb.UI.cacheData('test',[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]);"+
                "linb.UI.cacheData('test2',[{id:'aa',caption:'aa'},{id:'bb',caption:'bb'},{id:'cc',caption:'cc'}]);"+
                "var o;linb(id).prepend(o=new linb.UI.ComboInput({position:'relative',listKey:'test'}));"+
                "_.asyRun(function(){alert(o.getListKey())});"+
                "}"
            ]
        },
        setListKey:{
            $desc:"Sets the list key property to the current UI object.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String, the lisk key.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ci7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb.UI.cacheData('test',[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]);"+
                "linb.UI.cacheData('test2',[{id:'aa',caption:'aa'},{id:'bb',caption:'bb'},{id:'cc',caption:'cc'}]);"+
                "var o;linb(id).prepend(o=new linb.UI.ComboInput({position:'relative',listKey:'test'}));"+
                "_.asyRun(function(){o.setListKey('test2')},1000);"+
                "}"
            ]
        },
        getSaveBtn:{
            $desc:"Determines whether save button shows up or not.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.ci8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o1,o2;linb(id).prepend(o1=new linb.UI.ComboInput({position:'relative'})).prepend(o2=new linb.UI.ComboInput({position:'relative',type:'none'}));"+
                "_.asyRun(function(){o1.setSaveBtn(true);o2.setSaveBtn(true); alert(o1.getSaveBtn())},1000)"+
                "}"
            ]
        },
        setSaveBtn:{
            $desc:"Specify whether save button shows up or not.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ci9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o1,o2;linb(id).prepend(o1=new linb.UI.ComboInput({position:'relative'})).prepend(o2=new linb.UI.ComboInput({position:'relative',type:'none'}));"+
                "_.asyRun(function(){o1.setSaveBtn(true);o2.setSaveBtn(true); alert(o1.getSaveBtn())},1000)"+
                "}"
            ]
        },
        getScale:{
            $desc:"Gets scale length. For style is 'spin' only.",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.ci11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o1,o2;linb(id).prepend(o1=new linb.UI.ComboInput({position:'relative',type:'spin'}));"+
                "_.asyRun(function(){o1.setScale(2);alert(o1.getScale())},1000)"+
                "}"
            ]
        },
        setScale:{
            $desc:"Sets scale length. For style is 'spin' only.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ci12'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o1,o2;linb(id).prepend(o1=new linb.UI.ComboInput({position:'relative',type:'spin'}));"+
                "_.asyRun(function(){o1.setScale(2);alert(o1.getScale())},1000)"+
                "}"
            ]
        },
        getIncrement:{
            $desc:"Gets increment value. For style is 'spin' only.",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.ci13'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o1,o2;linb(id).prepend(o1=new linb.UI.ComboInput({position:'relative',type:'spin'}));"+
                "_.asyRun(function(){o1.setIncrement(0.02);alert(o1.getIncrement())},1000)"+
                "}"
            ]
        },
        setIncrement:{
            $desc:"Sets increment value. For style is 'spin' only.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ci14'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o1,o2;linb(id).prepend(o1=new linb.UI.ComboInput({position:'relative',type:'spin'}));"+
                "_.asyRun(function(){o1.setIncrement(0.02);alert(o1.getIncrement())},1000)"+
                "}"
            ]
        },
        getMin:{
            $desc:"Gets min value. For style is 'spin' only.",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.ci15'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o1,o2;linb(id).prepend(o1=new linb.UI.ComboInput({position:'relative',type:'spin'}));"+
                "_.asyRun(function(){o1.setMin(-2);alert(o1.getMin())},1000)"+
                "}"
            ]
        },
        setMin:{
            $desc:"Sets min value. For style is 'spin' only.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ci16'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o1,o2;linb(id).prepend(o1=new linb.UI.ComboInput({position:'relative',type:'spin'}));"+
                "_.asyRun(function(){o1.setMin(-2);alert(o1.getMin())},1000)"+
                "}"
            ]
        },
        getMax:{
            $desc:"Gets max value. For style is 'spin' only.",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.ci17'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o1,o2;linb(id).prepend(o1=new linb.UI.ComboInput({position:'relative',type:'spin'}));"+
                "_.asyRun(function(){o1.setMax(2);alert(o1.getMax())},1000)"+
                "}"
            ]
        },
        setMax:{
            $desc:"Sets max value. For style is 'spin' only.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ci18'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o1,o2;linb(id).prepend(o1=new linb.UI.ComboInput({position:'relative',type:'spin'}));"+
                "_.asyRun(function(){o1.setMax(2);alert(o1.getMax())},1000)"+
                "}"
            ]
        },
        onFileDlgOpen:{
            $desc:"Fired when the file upload dialog is open.",
            $paras:[
                "profile : linb.UIProfile object.",
                "node : the input DOM element."
            ],
            $snippet:[
                "var id='linb.temp.ci99'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.ComboInput({type:'upload'}));"+
                "o.onFileDlgOpen(function(){alert('File upload dialog is open.')});"+
                "}"
            ]
        },
        onClickButton:{
            $desc:"Fired when the command button is clicked.",
            $paras:[
                "profile : linb.UIProfile object.",
                "pos : the mouse position.",
                "e : DOM event object.",
                "src : the command button DOM element."
            ],
            $snippet:[
                "var id='linb.temp.ci100'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o1,o2;linb(id).prepend(o1=new linb.UI.ComboInput({position:'relative',type:'cmdbox'}));"+
                "o1.onClickButton(function(p){p.boxing().setUIValue( 'onClickButton' )});"+
                "}"
            ]
        },
        onSave:{
            $desc:"Fired when the save button is clicked.",
            $paras:[
                "profile : linb.UIProfile object.",
                "node : the command button DOM element."
            ],
            $snippet:[
                "var id='linb.temp.ci101'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o1,o2;linb(id).prepend(o1=new linb.UI.ComboInput({position:'relative',saveBtn:true}));"+
                "o1.onSave(function(p){alert( p.boxing().getUIValue() )});"+
                "}"
            ]
        }
    }
});


_.set(linb.Locale,["en","doc","linb","UI","Stacks"], {
    constructor:{
        $desc:"Creates a linb.UI.Stacks object."
    }
});

_.set(linb.Locale,["en","doc","linb","UI","ButtonViews"], {
    constructor:{
        $desc:"Creates a linb.UI.ButtonViews object."
    },
    prototype:{
        setBarLocation:{
            $desc:"Sets the commands bar position, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : 'top','bottom','left' or 'right'. Default is 'top'.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.bv1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.ButtonViews({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "var arr=['top','bottom','left','right'];"+
                "linb.Thread(null,[function(id){if(!arr.length)return linb.Thread.abort(id); var type=arr.shift();o.setBarLocation(type);alert(o.getBarLocation())}],1000,null,null,null,true).start();"+
                "}"
            ]
        },
        getBarLocation:{
            $desc:"Gets the commands bar position.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.bv2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.ButtonViews({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "var arr=['top','bottom','left','right'];"+
                "linb.Thread(null,[function(id){if(!arr.length)return linb.Thread.abort(id); var type=arr.shift();o.setBarLocation(type);alert(o.getBarLocation())}],1000,null,null,null,true).start();"+
                "}"
            ]
        },
        setBarHAlign:{
            $desc:"Sets the commands bar horizontal alignment , and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : 'left', 'center' or 'right'. Default is 'left'.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.bv3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.ButtonViews({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "_.asyRun(function(){o.setBarHAlign('right'); alert(o.getBarHAlign());},1000);"+
                "}"
            ]
        },
        getBarHAlign:{
            $desc:"Gets the commands bar horizontal alignment.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.bv4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.ButtonViews({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "_.asyRun(function(){o.setBarHAlign('right'); alert(o.getBarHAlign());},1000);"+
                "}"
            ]
        },
        setBarVAlign:{
            $desc:"Sets the commands bar vertical alignment, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : 'top' or 'bottom'. Default is 'top'.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.bv3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.ButtonViews({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "_.asyRun(function(){o.setBarVAlign('bottom'); alert(o.getBarVAlign());},1000);"+
                "}"
            ]
        },
        getBarVAlign:{
            $desc:"Gets the commands bar vertical alignment.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.bv4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.ButtonViews({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "_.asyRun(function(){o.setBarVAlign('bottom'); alert(o.getBarVAlign());},1000);"+
                "}"
            ]
        },
        setBarSize:{
            $desc:"Sets the commands bar size, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.bv3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.ButtonViews({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "_.asyRun(function(){o.setBarSize(30); alert(o.getBarSize());},1000);"+
                "}"
            ]
        },
        getBarSize:{
            $desc:"Gets the commands bar size.",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.bv4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.ButtonViews({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "_.asyRun(function(){o.setBarSize(30); alert(o.getBarSize());},1000);"+
                "}"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","UI","RadioBox"], {
    constructor:{
        $desc:"Creates a linb.UI.RadioBox object."
    }
});


_.set(linb.Locale,["en","doc","linb","UI","ColorPicker"], {
    constructor:{
        $desc:"Creates a linb.UI.ColorPicker object."
    },
    getTextColor:{
        $desc:"Gets the text color that can be showd more well-marked in the specified background color.",
        $rtn:'String',
        $paras:[
            "value [Required] : String, like '#FFFFFF' ."
        ],
        $snippet:[
            "alert(linb.UI.ColorPicker.getTextColor('#00ff00'));alert(linb.UI.ColorPicker.getTextColor('#333333'));"
        ]
    },
    hex2rgb:{
        $desc:"Converts a normal HEX-color (like #FF00FF) into it's RGB values ([-16, 15, 240]).",
        $rtn:'Array',
        $paras:[
            "hex [Required] : String."
        ],
        $snippet:[
            "alert(linb.UI.ColorPicker.hex2rgb('#00ff00'))"
        ]
    },
    hsv2rgb:{
        $desc:"Converts a normal HSV-color (like [233, 1, 0.94]) into it's RGB values ([0, 28, 241]).",
        $rtn:'Array',
        $paras:[
            "h [Required] : Number. 0-360",
            "s [Required] : Number. 0-1",
            "v [Required] : Number. 0-1"
        ],
        $snippet:[
            "alert(linb.UI.ColorPicker.hsv2rgb(233, 1, 0.94))"
        ]
    },
    rgb2hsv:{
        $desc:"Converts a normal RGB values (like [0, 28, 241]) into it's HSV-color ([233, 1, 0.94]).",
        $rtn:'Array',
        $paras:[
            "r [Required] : Number. 0-255",
            "g [Required] : Number. 0-255",
            "b [Required] : Number. 0-255"
        ],
        $snippet:[
            "alert(linb.UI.ColorPicker.rgb2hsv(0, 28, 241))"
        ]
    },
    rgb2hex:{
        $desc:"Converts a normal RGB values (like [0, 28, 241]) into it's HEX-color (#001CF1).",
        $rtn:'Array',
        $paras:[
            "r [Required] : Number. 0-255",
            "g [Required] : Number. 0-255",
            "b [Required] : Number. 0-255"
        ],
        $snippet:[
            "alert(linb.UI.ColorPicker.rgb2hex(0, 28, 241))"
        ]
    },
    prototype:{
        getColorName:{
            $desc:"Gets color name from the ColorPicker object, if it exists.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.clr1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.ColorPicker({position:'relative',closeBtn:false}));"+
                "o.afterUIValueSet(function(){alert(o.getColorName())});"+
                "}"
            ]
        },
        getAdvance:{
            $desc:"Determines whether advanced chooser shows up on the right side.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.clr2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.ColorPicker({position:'relative',closeBtn:false}));"+
                "_.asyRun(function(){o.setAdvance(true);alert(o.getAdvance())},1000);"+
                "}"
            ]
        },
        setAdvance:{
            $desc:"Specify whether advanced chooser shows up on the right side, and reflects it to DOM UI.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.clr2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.ColorPicker({position:'relative',closeBtn:false}));"+
                "_.asyRun(function(){o.setAdvance(true);alert(o.getAdvance())},1000);"+
                "}"
            ]
        },
        getCloseBtn:{
            $desc:"Determines whether close button shows up or not.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.clr3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.ColorPicker({position:'relative'}));"+
                "_.asyRun(function(){o.setCloseBtn(false);alert(o.getCloseBtn())},1000);"+
                "}"
            ]
        },
        setCloseBtn:{
            $desc:"Specifys whether close button shows up or not, and reflects it to DOM UI.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.clr4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.ColorPicker({position:'relative'}));"+
                "_.asyRun(function(){o.setCloseBtn(false);alert(o.getCloseBtn())},1000);"+
                "}"
            ]
        },
        getDisplayBar:{
            $desc:"Determines whether display bar shows up or not.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.clr5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.ColorPicker({position:'relative'}));"+
                "_.asyRun(function(){o.setDisplayBar(false);alert(o.getDisplayBar())},1000);"+
                "}"
            ]
        },
        setDisplayBar:{
            $desc:"Specifys whether display bar shows up or not, and reflects it to DOM UI.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.clr6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.ColorPicker({position:'relative'}));"+
                "_.asyRun(function(){o.setDisplayBar(false);alert(o.getDisplayBar())},1000);"+
                "}"
            ]
        },
        getCmdBtns:{
            $desc:"Determines whether display bar shows up or not.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.clr7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.ColorPicker({position:'relative'}));"+
                "_.asyRun(function(){o.setCmdBtns(false);alert(o.getCmdBtns())},1000);"+
                "}"
            ]
        },
        setCmdBtns:{
            $desc:"Specifys whether display bar shows up or not, and reflects it to DOM UI.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.clr8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.ColorPicker({position:'relative'}));"+
                "_.asyRun(function(){o.setCmdBtns(false);alert(o.getCmdBtns())},1000);"+
                "}"
            ]
        },


        beforeClose:{
            $desc:"Fired before user click close button or cancel button. If returns false, close function will be ignored.",
            $paras:[
                "profile : linb.UIProfile object."
            ],
            $snippet:[
                "var id='linb.temp.clr9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.ColorPicker({position:'relative'}));"+
                "o.beforeClose(function(){return false;});"+
                "}"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","UI","DatePicker"], {
    constructor:{
        $desc:"Creates a linb.UI.DatePicker object."
    },
    prototype:{
        getCloseBtn:{
            $desc:"Determines whether close button shows up or not.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.dp1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.DatePicker({position:'relative'}));"+
                "_.asyRun(function(){o.setCloseBtn(false);alert(o.getCloseBtn())},1000);"+
                "}"
            ]
        },
        setCloseBtn:{
            $desc:"Specifys whether close button shows up or not, and reflects it to DOM UI.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.dp2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.DatePicker({position:'relative'}));"+
                "_.asyRun(function(){o.setCloseBtn(false);alert(o.getCloseBtn())},1000);"+
                "}"
            ]
        },
        getDateFrom:{
            $desc:"Gets the from date of the datepicker.",
            $rtn:"Date",
            $snippet:[
                "var id='linb.temp.dp2-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.DatePicker({position:'relative'}));"+
                "_.asyRun(function(){alert(o.getDateFrom())},1000);"+
                "}"
            ]
        },

        beforeClose:{
            $desc:"Fired before user click close button or Cancel button. If returns false, close function will be ignored.",
            $paras:[
                "profile : linb.UIProfile object."
            ],
            $snippet:[
                "var id='linb.temp.dp3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.DatePicker({position:'relative'}));"+
                "o.beforeClose(function(){alert('I stop you from closing it');return false;});"+
                "}"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","UI","TimePicker"], {
    constructor:{
        $desc:"Creates a linb.UI.TimePicker object."
    },
    prototype:{
        getCloseBtn:{
            $desc:"Determines whether close button shows up or not.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.tp1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.TimePicker({position:'relative'}));"+
                "_.asyRun(function(){o.setCloseBtn(false);alert(o.getCloseBtn())},1000);"+
                "}"
            ]
        },
        setCloseBtn:{
            $desc:"Specifys whether close button shows up or not., and reflects it to DOM UI.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.tp2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.TimePicker({position:'relative'}));"+
                "_.asyRun(function(){o.setCloseBtn(false);alert(o.getCloseBtn())},1000);"+
                "}"
            ]
        },
        beforeClose:{
            $desc:"Fired before user click close button or Cancel button. If returns false, close function will be ignored.",
            $paras:[
                "profile : linb.UIProfile object."
            ],
            $snippet:[
                "var id='linb.temp.tp3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.TimePicker({position:'relative'}));"+
                "o.beforeClose(function(){return false;});"+
                "}"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","UI","Range"], {
    constructor:{
        $desc:"Creates a linb.UI.Range object."
    },
    prototype:{
        getCaptionTpl :{
            $desc:"Gets the caption text template.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.rg1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Range);"+
                "_.asyRun(function(){o.setCaptionTpl('from [{fromvalue}]{unit} to [{tovalue}]{unit}'); alert(o.getCaptionTpl())},1000)"+
                "}"
            ]
        },
        setCaptionTpl :{
            $desc:"Sets the caption text template, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.rg2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Range);"+
                "_.asyRun(function(){o.setCaptionTpl('from [{fromvalue}]{unit} to [{tovalue}]{unit}'); alert(o.getCaptionTpl())},1000)"+
                "}"
            ]
        },
        getMax:{
            $desc:"Gets the maximal value",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.rg3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Range);"+
                "_.asyRun(function(){o.setMax(200); alert(o.getMax())},1000)"+
                "}"
            ]
        },
        setMax:{
            $desc:"Sets the maximal value, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.rg4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Range);"+
                "_.asyRun(function(){o.setMax(200); alert(o.getMax())},1000)"+
                "}"
            ]
        },
        getMin:{
            $desc:"Gets the minimal value.",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.rg5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Range);"+
                "_.asyRun(function(){o.setMin(50); alert(o.getMin())},1000)"+
                "}"
            ]
        },
        setMin:{
            $desc:"Sets the mimimal value, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.rg6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Range);"+
                "_.asyRun(function(){o.setMin(50); alert(o.getMin())},1000)"+
                "}"
            ]
        },
        getSingleValue:{
            $desc:"Gets the Singleproperty value on the first UIProfile",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.rg7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Range);"+
                "_.asyRun(function(){o.setSingleValue(true); alert(o.getSingleValue())},1000)"+
                "}"
            ]
        },
        setSingleValue:{
            $desc:"Sets the Singleproperty value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.rg8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Range);"+
                "_.asyRun(function(){o.setSingleValue(true); alert(o.getSingleValue())},1000)"+
                "}"
            ]
        },
        getSteps:{
            $desc:"Gets the step value.",
            $rtn:"nonnegative Number",
            $snippet:[
                "var id='linb.temp.rg9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Range);"+
                "_.asyRun(function(){o.setSteps(10); alert(o.getSteps())},1000)"+
                "}"
            ]
        },
        setSteps:{
            $desc:"Sets the step value, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : nonnegative Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.rg10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Range);"+
                "_.asyRun(function(){o.setSteps(10); alert(o.getSteps())},1000)"+
                "}"
            ]
        },
        getUnit:{
            $desc:"Gets the Unit property value on the first UIProfile",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.rg11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Range);"+
                "_.asyRun(function(){o.setUnit('%'); alert(o.getUnit())},1000)"+
                "}"
            ]
        },
        setUnit:{
            $desc:"Sets the Unit property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.rg12'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Range);"+
                "_.asyRun(function(){o.setUnit('%'); alert(o.getUnit())},1000)"+
                "}"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","UI","List"], {
    constructor:{
        $desc:"Creates a linb.UI.List object."
    },
    prototype:{
        activate:{
            $desc:"Activates the current UI object.",
            $rtn:"[self]",
            $snippet:[
                "var id='linb.temp.list0'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.List({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "_.asyRun(function(){o.activate()},1000)"+
                "}"
            ]
        },
        adjustSize:{
            $desc:"To adjust list width and height automatically.",
            $rtn:"[self]",
            $snippet:[
                "var id='linb.temp.list3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.List({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "_.asyRun(function(){o.adjustSize()},1000)"+
                "}"
            ]
        },
        getMaxHeight:{
            $desc:"Gets maximal height.",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.list4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.List({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "alert(o.setMaxHeight(40).getMaxHeight());_.asyRun(function(){o.adjustSize()},1000)"+
                "}"
            ]
        },
        setMaxHeight:{
            $desc:"Sets minimal height, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.list5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.List({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "alert(o.setMaxHeight(40).getMaxHeight());_.asyRun(function(){o.adjustSize()},1000)"+
                "}"
            ]
        },
        getSelMode:{
            $desc:"Gets selection mode",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.list6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.List({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "_.asyRun(function(){alert(o.setSelMode('multi').getSelMode());},1000)"+
                "}"
            ]
        },
        setSelMode:{
            $desc:"Sets selection mode, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String. 'none', 'multi' or 'single'.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.list7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.List({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "_.asyRun(function(){alert(o.setSelMode('multi').getSelMode());},1000)"+
                "}"
            ]
        },

        onItemSelected:{
            $desc:"Fired when list item is selected.",
            $paras:[
                "profile : linb.UIProfile object.",
                "item: list item object.",
                "src: the related DOM element."
            ],
            $snippet:[
                "var id='linb.temp.list8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.List({selMode:'none',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "o.onItemSelected(function(p,item,s){alert(item.id);});"+
                "}"
            ]
        },
        onDblclick:{
            $desc:"Fired when list item was dblclicked.",
            $paras:[
                "profile : linb.UIProfile object.",
                "item: list item object.",
                "src: the related DOM element."
            ],
            $snippet:[
                "var id='linb.temp.list9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.List({selMode:'none',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "o.onDblclick(function(p,item,s){alert(item.id);});"+
                "}"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","UI","LinkList"], {
    constructor:{
        $desc:"Creates a linb.UI.LinkList object."
    },
    prototype:{
        getItemMargin:{
            $desc:"Gets the item margin property value on the first UIProfile",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.llist1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.LinkList({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "_.asyRun(function(){alert(o.setItemMargin(10).getItemMargin());},1000)"+
                "}"
            ]
        },
        setItemMargin:{
            $desc:"Sets the ItemMargin property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.llist2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.LinkList({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "_.asyRun(function(){alert(o.setItemMargin(10).getItemMargin());},1000)"+
                "}"
            ]
        },

        onItemClick:{
            $desc:"Fired when list item is clicked.",
            $paras:[
                "profile : linb.UIProfile object.",
                "item: list item object.",
                "src: the related DOM element."
            ],
            $snippet:[
                "var id='linb.temp.llist8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.LinkList({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "o.onItemClick(function(p,item,s){alert(item.id);});"+
                "}"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","UI","Gallery"], {
    constructor:{
        $desc:"Creates a linb.UI.Gallery object."
    },
    prototype:{
        getStatus:{
            $desc:"Gets a specified item image status.",
            $paras:[
                "subId [Required] : String, the sub Id."
            ],
            $rtn:"String. 'ini', 'error' or 'loaded'.",
            $snippet:[
                "var id='linb.temp.ga001'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "_.asyRun(function(){alert(o.getStatus('c'));});"+
                "_.asyRun(function(){alert(o.getStatus('c'));},3000);"+
                "}"
            ]
        },
        getImgHeight:{
            $desc:"Gets item image height",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.ga1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "_.asyRun(function(){alert(o.setItemHeight(40).setImgHeight(30).getImgHeight());},1000)"+
                "}"
            ]
        },
        setImgHeight:{
            $desc:"Sets item image heiht, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ga2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "_.asyRun(function(){alert(o.setItemHeight(40).setImgHeight(30).getItemMargin());},1000)"+
                "}"
            ]
        },
        getImgWidth:{
            $desc:"Gets item image width",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.ga3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "_.asyRun(function(){alert(o.setItemWidth(40).setImgWidth(40).getImgWidth());},1000)"+
                "}"
            ]
        },
        setImgWidth:{
            $desc:"Sets item image width, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.da4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "_.asyRun(function(){alert(o.setItemWidth(40).setImgWidth(40).getItemMargin());},1000)"+
                "}"
            ]
        },
        getItemWidth:{
            $desc:"Gets item width.",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.ga5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "_.asyRun(function(){alert(o.setItemWidth(40).getItemWidth());},1000)"+
                "}"
            ]
        },
        setItemWidth:{
            $desc:"Sets item width, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ga6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "_.asyRun(function(){alert(o.setItemWidth(40).getItemMargin());},1000)"+
                "}"
            ]
        },
        getItemHeight:{
            $desc:"Gets item height",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.ga7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "_.asyRun(function(){alert(o.setItemHeight(40).getItemHeight());},1000)"+
                "}"
            ]
        },
        setItemHeight:{
            $desc:"Sets item height, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ga8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "_.asyRun(function(){alert(o.setItemHeight(40).getItemMargin());},1000)"+
                "}"
            ]
        },
        getItemMargin:{
            $desc:"Gets item margin.",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.ga9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "_.asyRun(function(){alert(o.setItemMargin(10).getItemMargin());},1000)"+
                "}"
            ]
        },
        setItemMargin:{
            $desc:"Sets item margin, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ga10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "_.asyRun(function(){alert(o.setItemMargin(10).getItemMargin());},1000)"+
                "}"
            ]
        },
        getItemPadding:{
            $desc:"Gets item padding",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.ga11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "_.asyRun(function(){alert(o.setItemPadding(10).getItemPadding());},1000)"+
                "}"
            ]
        },
        setItemPadding:{
            $desc:"Sets item padding, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ga12'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                "_.asyRun(function(){alert(o.setItemPadding(10).getItemPadding());},1000)"+
                "}"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","UI","IconList"], {
    constructor:{
        $desc:"Creates a linb.UI.IconList object."
    },
    prototype:{
        getStatus:{
            $desc:"Gets a specified image status.",
            $paras:[
                "subId [Required] : String, the sub Id."
            ],
            $rtn:"String. 'ini', 'error' or 'loaded'.",
            $snippet:[
                "var id='linb.temp.ga001'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.IconList({height:'auto',items:[{id:'a',image:'img/logo.gif',caption:'a a'},{id:'b',image:'img/logo.gif',caption:'b b'},{id:'c',image:'img/logo.gif',caption:'c c'}]}));"+
                "_.asyRun(function(){alert(o.getStatus('c'));});"+
                "_.asyRun(function(){alert(o.getStatus('c'));},3000);"+
                "}"
            ]
        },
        getItemWidth:{
            $desc:"Gets the ItemWidth property value on the first UIProfile",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.ga5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.IconList({height:'auto',items:[{id:'a',image:'img/logo.gif',caption:'a a'},{id:'b',image:'img/logo.gif',caption:'b b'},{id:'c',image:'img/logo.gif',caption:'c c'}]}));"+
                "_.asyRun(function(){alert(o.setItemWidth(40).getItemWidth());},1000)"+
                "}"
            ]
        },
        setItemWidth:{
            $desc:"Sets the ItemWidth property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ga6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.IconList({height:'auto',items:[{id:'a',image:'img/logo.gif',caption:'a a'},{id:'b',image:'img/logo.gif',caption:'b b'},{id:'c',image:'img/logo.gif',caption:'c c'}]}));"+
                "_.asyRun(function(){alert(o.setItemWidth(40).getItemWidth());},1000)"+
                "}"
            ]
        },
        getItemHeight:{
            $desc:"Gets the ItemHeight property value on the first UIProfile",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.ga7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.IconList({height:'auto',items:[{id:'a',image:'img/logo.gif',caption:'a a'},{id:'b',image:'img/logo.gif',caption:'b b'},{id:'c',image:'img/logo.gif',caption:'c c'}]}));"+
                "_.asyRun(function(){alert(o.setItemHeight(40).getItemHeight());},1000)"+
                "}"
            ]
        },
        setItemHeight:{
            $desc:"Sets the ItemHeight property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ga8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.IconList({height:'auto',items:[{id:'a',image:'img/logo.gif',caption:'a a'},{id:'b',image:'img/logo.gif',caption:'b b'},{id:'c',image:'img/logo.gif',caption:'c c'}]}));"+
                "_.asyRun(function(){alert(o.setItemHeight(40).getItemHeight());},1000)"+
                "}"
            ]
        },
        getItemMargin:{
            $desc:"Gets the ItemMargin property value on the first UIProfile",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.ga9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.IconList({height:'auto',items:[{id:'a',image:'img/logo.gif',caption:'a a'},{id:'b',image:'img/logo.gif',caption:'b b'},{id:'c',image:'img/logo.gif',caption:'c c'}]}));"+
                "_.asyRun(function(){alert(o.setItemMargin(10).getItemMargin());},1000)"+
                "}"
            ]
        },
        setItemMargin:{
            $desc:"Sets the ItemMargin property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ga10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.IconList({height:'auto',items:[{id:'a',image:'img/logo.gif',caption:'a a'},{id:'b',image:'img/logo.gif',caption:'b b'},{id:'c',image:'img/logo.gif',caption:'c c'}]}));"+
                "_.asyRun(function(){alert(o.setItemMargin(10).getItemMargin());},1000)"+
                "}"
            ]
        },
        getItemPadding:{
            $desc:"Gets the ItemPadding property value on the first UIProfile",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.ga11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.IconList({height:'auto',items:[{id:'a',image:'img/logo.gif',caption:'a a'},{id:'b',image:'img/logo.gif',caption:'b b'},{id:'c',image:'img/logo.gif',caption:'c c'}]}));"+
                "_.asyRun(function(){alert(o.setItemPadding(10).getItemPadding());},1000)"+
                "}"
            ]
        },
        setItemPadding:{
            $desc:"Sets the ItemPadding property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.ga12'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.IconList({height:'auto',items:[{id:'a',image:'img/logo.gif',caption:'a a'},{id:'b',image:'img/logo.gif',caption:'b b'},{id:'c',image:'img/logo.gif',caption:'c c'}]}));"+
                "_.asyRun(function(){alert(o.setItemPadding(10).getItemPadding());},1000)"+
                "}"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","UI","Panel"], {
    constructor:{
        $desc:"Creates a linb.UI.Panel object."
    },
    prototype:{
        getBarHeight :{
            $desc:"Gets handle height",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.panel31'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Panel);"+
                "_.asyRun(function(){btn.setBarHeight(30); alert(btn.getBarHeight ())},1000)"+
                "}"
            ]
        },
        setBarHeight :{
            $desc:"Sets handle height, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.panel32'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Panel);"+
                "_.asyRun(function(){btn.setBarHeight(30); alert(btn.getBarHeight ())},1000)"+
                "}"
            ]
        },
        getHref :{
            $desc:"Gets panel href",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.panel33'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Panel);"+
                "_.asyRun(function(){btn.setHref('#'); alert(btn.getHref ())},1000)"+
                "}"
            ]
        },
        setHref :{
            $desc:"Sets panel href, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.panel34'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Panel);"+
                "_.asyRun(function(){btn.setHref('#'); alert(btn.getHref ())},1000)"+
                "}"
            ]
        },
        getCloseBtn :{
            $desc:"Determines whether close button shows up or not.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.panel35'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Panel);"+
                "_.asyRun(function(){btn.setCloseBtn(true); alert(btn.getCloseBtn ())},1000)"+
                "}"
            ]
        },
        setCloseBtn :{
            $desc:"Specifys whether close button shows up or not, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.panel36'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Panel);"+
                "_.asyRun(function(){btn.setCloseBtn(true); alert(btn.getCloseBtn ())},1000)"+
                "}"
            ]
        },
        getLandBtn :{
            $desc:"Determines whether landing button shows up or not.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.panel37'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Panel);"+
                "_.asyRun(function(){btn.setLandBtn(true); alert(btn.getLandBtn ())},1000)"+
                "}"
            ]
        },
        setLandBtn :{
            $desc:"Specifys whether landing button shows up or not, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.panel38'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Panel);"+
                "_.asyRun(function(){btn.setLandBtn(true); alert(btn.getLandBtn ())},1000)"+
                "}"
            ]
        },
        getOptBtn :{
            $desc:"Determines whether option button shows up or not",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.panel39'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Panel);"+
                "_.asyRun(function(){btn.setOptBtn(true); alert(btn.getOptBtn ())},1000)"+
                "}"
            ]
        },
        setOptBtn :{
            $desc:"Specifys whether option button shows up or not, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.panel40'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Panel);"+
                "_.asyRun(function(){btn.setOptBtn(true); alert(btn.getOptBtn ())},1000)"+
                "}"
            ]
        },
        getToggleBtn :{
            $desc:"Determines whether toggle button shows up or not.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.panel41'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Panel);"+
                "_.asyRun(function(){btn.setToggleBtn(true); alert(btn.getToggleBtn ())},1000)"+
                "}"
            ]
        },
        setToggleBtn :{
            $desc:"Specifys whether toggle button shows up or not, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.panel42'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Panel);"+
                "_.asyRun(function(){btn.setToggleBtn(true); alert(btn.getToggleBtn ())},1000)"+
                "}"
            ]
        },
        getCaption :{
            $desc:"Gets caption text.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.panel1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Panel);"+
                "_.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                "}"
            ]
        },
        setCaption :{
            $desc:"Sets caption text, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.panel2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Panel);"+
                "_.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                "}"
            ]
        },
        getImage :{
            $desc:"Gets the image url",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.panel3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Panel({height:50}));"+
                "_.asyRun(function(){btn.setImage('img/img.gif'); alert(btn.getImage())},1000)"+
                "}"
            ]
        },
        setImage :{
            $desc:"Sets the image url, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] :String,  image path.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.panel4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Panel({height:50}));"+
                "_.asyRun(function(){btn.setImage('img/img.gif'); alert(btn.getImage())},1000)"+
                "}"
            ]
        },
        getImagePos :{
            $desc:"Gets image image position",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.panel5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Panel({height:50}));"+
                "_.asyRun(function(){btn.setImage('img/img.gif').setImagePos('left -16px'); alert(btn.getImagePos())},1000)"+
                "}"
            ]
        },
        setImagePos :{
            $desc:"Sets image position, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String, corresponding CSS value.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.panel6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Panel({height:50}));"+
                "_.asyRun(function(){btn.setImage('img/img.gif').setImagePos('left -16px'); alert(btn.getImagePos())},1000)"+
                "}"
            ]
        },
        getToggle:{
            $desc:"Gets the toggle property value on the first UIProfile",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.panel7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Panel({html:'content'}));"+
                "_.asyRun(function(){btn.setToggle(false); alert(btn.getToggle ())},1000)"+
                "}"
            ]
        },
        setToggle :{
            $desc:"Sets the toggle property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.panel8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var btn;linb(id).prepend(btn=new linb.UI.Panel({html:'content'}));"+
                "_.asyRun(function(){btn.setToggle(false); alert(btn.getToggle ())},1000)"+
                "}"
            ]
        },

        onExpend:{
            $desc:"Fired when panel expends.",
            $paras:[
                "profile : linb.UIProfile object."
            ],
            $snippet:[
                "var id='linb.temp.panel9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Panel({toggleBtn:true,html:'content'});"+
                "o.onExpend(function(){alert('onExpend')}).onFold(function(){alert('onFold')}).onIniPanelView(function(){alert('onIniPanelView')});"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        onFold:{
            $desc:"Fired when panel collapses.",
            $paras:[
                "profile : linb.UIProfile object."
            ],
            $snippet:[
                "var id='linb.temp.panel10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Panel({toggleBtn:true,html:'content'});"+
                "o.onExpend(function(){alert('onExpend')}).onFold(function(){alert('onFold')}).onIniPanelView(function(){alert('onIniPanelView')});"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        onIniPanelView:{
            $desc:"Fired when panel is initialized.",
            $paras:[
                "profile : linb.UIProfile object."
            ],
            $snippet:[
                "var id='linb.temp.panel11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Panel({toggleBtn:true,html:'content'});"+
                "o.onExpend(function(){alert('onExpend')}).onFold(function(){alert('onFold')}).onIniPanelView(function(){alert('onIniPanelView')});"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        onClickBar:{
            $desc:"Fired when panel handler is clicked.",
            $paras:[
                "profile : linb.UIProfile object.",
                "src: the related DOM element."
            ],
            $snippet:[
                "var id='linb.temp.panel12'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Panel({position:'relative',closeBtn:true,html:'content'}));"+
                "o.onClickBar(function(){alert('onClickBar')});"+
                "}"
            ]
        },
        beforeClose:{
            $desc:"Fired before user click close button or Cancel button. If returns false, close function will be ignored.",
            $paras:[
                "profile : linb.UIProfile object.",
                "src: the related DOM element."
            ],
            $snippet:[
                "var id='linb.temp.panel13'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Panel({position:'relative',closeBtn:true,html:'content'}));"+
                "o.beforeClose(function(){return false;});"+
                "}"
            ]
        },
        onShowOptions :{
            $desc:"Fired when user click the option button.",
            $paras:[
                "profile : linb.UIProfile object.",
                "e: DOM event object.",
                "src: the related DOM element."
            ],
            $snippet:[
                "var id='linb.temp.panel14'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Panel({position:'relative',optBtn:true,html:'content'}));"+
                "o.onShowOptions(function(){alert('onShowOptions');});"+
                "}"
            ]
        }

    }
});

_.set(linb.Locale,["en","doc","linb","UI","PageBar"], {
    constructor:{
        $desc:"Creates a linb.UI.PageBar object."
    },
    prototype:{
        setPage:{
            $desc:"Sets the current PageBar to the specified page.",
            $rtn:"[self]",
            $paras:[
                "value: Number. page number."
            ],
            $snippet:[
                "var id='linb.temp.pb0'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.PageBar({value:'1:3:300'})));"+
                "_.asyRun(function(){o.setPage(100);},1000);"+
                "}"
            ]
        },
        getCaption:{
            $desc:"Gets the caption string from the current UI object.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.pb1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.PageBar({value:'1:3:300'})).setCaption('Page =>'));"+
                "_.asyRun(function(){alert(o.getCaption())});"+
                "}"
            ]
        },
        setCaption:{
            $desc:"Sets the caption string to the current UI object.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String, the caption.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.pb2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.PageBar({value:'1:3:300'})).setCaption('Page =>'));"+
                "_.asyRun(function(){alert(o.getCaption())});"+
                "}"
            ]
        },
        getNextMark:{
            $desc:"Gets the NextMark string from the current UI object.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.pb3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.PageBar({value:'1:3:300'})).setNextMark('next'));"+
                "_.asyRun(function(){alert(o.getNextMark())});"+
                "}"
            ]
        },
        setNextMark:{
            $desc:"Sets the NextMark string to the current UI object.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String, the NextMark.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.pb4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.PageBar({value:'1:3:300'})).setNextMark('next'));"+
                "_.asyRun(function(){alert(o.getNextMark())});"+
                "}"
            ]
        },
        getPrevMark:{
            $desc:"Gets the PrevMark string from the current UI object.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.pb5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.PageBar({value:'1:3:300'})).setPrevMark('prev'));"+
                "_.asyRun(function(){alert(o.getPrevMark('{'))});"+
                "}"
            ]
        },
        setPrevMark:{
            $desc:"Sets the PrevMark string to the current UI object.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String, the PrevMark.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.pb6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.PageBar({value:'1:3:300'})).setPrevMark('prev'));"+
                "_.asyRun(function(){alert(o.getPrevMark())});"+
                "}"
            ]
        },
        getTextTpl:{
            $desc:"Gets the TextTpl string from the current UI object.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.pb7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.PageBar({value:'1:3:300'})).setTextTpl('[*]'));"+
                "_.asyRun(function(){alert(o.getTextTpl())});"+
                "}"
            ]
        },
        setTextTpl:{
            $desc:"Sets the TextTpl string to the current UI object.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String, the TextTpl.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.pb8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.PageBar({value:'1:3:300'})).setTextTpl('[*]'));"+
                "_.asyRun(function(){alert(o.getTextTpl())});"+
                "}"
            ]
        },
        getUriTpl:{
            $desc:"Gets the UriTpl string from the current UI object.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.pb9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.PageBar({value:'1:3:300'})).setUriTpl('#aaa=*'));"+
                "_.asyRun(function(){alert(o.getUriTpl())});"+
                "}"
            ]
        },
        setUriTpl:{
            $desc:"Sets the UriTpl string to the current UI object.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String, the UriTpl.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.pb10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.PageBar({value:'1:3:300'})).setUriTpl('#aaa=*'));"+
                "_.asyRun(function(){alert(o.getUriTpl())});"+
                "}"
            ]
        },


        onClick:{
            $desc:"onClick event handler.",
            $paras:[
                "profile : linb.UIProfile object.",
                "src : DOM element."
            ],
            $snippet:[
                "var id='linb.temp.pb11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "linb(id).prepend((new linb.UI.PageBar({value:'1:3:300'})).onClick(function(profile,src){profile.boxing().setPage(src.href.split('#')[1]||1)}));"+
                "}"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","UI","Layout"], {
    constructor:{
        $desc:"Creates a linb.UI.Layout object."
    },
    prototype:{
        append:{
            $desc:"Appends a set of linb.UIProfile objects to the inside of the first profile.",
            $rtn:"[self]",
            $paras:[
                "target [Required] : a linb.UI ojbect(including a set of linb.UIProfile objects).",
                "subId [Optional] : String, the sub id that Determines the [target] will be added to which sub DOM node. This parameter can be [false] too, that means the [target] will be appended to DOM only, no link created between the [target] UIProfiles and the parent UIProfile."
            ],
            $snippet:[
                "var id='linb.temp.lo0'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Layout({items:[{id:'main'},{id:'after',size:50}]})));"+
                "_.asyRun(function(){o.append(new linb.UI.Button,'after');},1000);"+
                "}"
            ]
        },
        getPanel:{
            $desc:"Gets the panel DOM according to the specified subId.",
            $rtn:"linb.Dom object",
            $paras:[
                "subId [Optional] : String, the sub id that Determines the result. Default is 'main'."
            ],
            $snippet:[
                "var id='linb.temp.lo1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Layout({items:[{id:'main'},{id:'after',size:50}]})));"+
                "_.asyRun(function(){o.getPanel('after').append(linb.create('afgter',true));},1000);"+
                "}"
            ]
        },
        getType:{
            $desc:"Gets layout type. Could be 'vertical' or 'horizontal' ",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.lo2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Layout({items:[{id:'main'},{id:'after',size:50}]})));"+
                "_.asyRun(function(){o.append(new linb.UI.Button).setType('horizontal'); alert(o.getType())},1000);"+
                "}"
            ]
        },
        setType:{
            $desc:"Sets layout type, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : 'vertical' or 'horizontal'.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.lo3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Layout({items:[{id:'main'},{id:'after',size:50}]})));"+
                "_.asyRun(function(){o.append(new linb.UI.Button).setType('horizontal'); alert(o.getType())},1000);"+
                "}"
            ]
        },
        setItems:{
            $desc:"Sets layout items, and reflects it to DOM UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Array, the items."
            ],
            $snippet:[
                "var id='linb.temp.lo4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Layout()));"+
                "o.append(new linb.UI.Button).append(new linb.UI.Link, 'before').append(new linb.UI.Input, 'after');"+
                "_.asyRun(function(){o.setType('horizontal').setItems([{id:'before', pos:'before', 'size':50, min:50, max:200}, {id:'main', min:10}, {id:'after', pos:'after', size:50}, {id:'c', pos:'after', cmd:true, size:50}])},1000);"+
                "}"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","UI","Tabs"], {
    constructor:{
        $desc:"Creates a linb.UI.Tabs object."
    },
    getDropKeys:{
        $desc:"Gets the drop keys from the specified profile.",
        $rtn:"Array",
        $paras:[
            "profile [Required] : the target profile",
            "node [Required] : the related DOM element."
        ],
        $memo:"Generally, you don't need to use this function manually. This function might be overwrote in the sub Class."
    },
    prototype:{
        append:{
            $desc:"Appends a set of linb.UIProfile objects inside this tab.",
            $rtn:"[self]",
            $paras:[
                "target [Required] : a linb.UI ojbect(including a set of linb.UIProfile objects).",
                "subId [Optional] : String, the sub id that Determines the [target] will be added to which sub DOM node. This parameter can be [false] too, that means the [target] will be appended to DOM only, no link created between the [target] UIProfiles and the parent UIProfile."
            ],
            $snippet:[
                "var id='linb.temp.tabs0'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}],value:'a'})));"+
                "_.asyRun(function(){o.append(new linb.UI.Button,'a');},1000);"+
                "}"
            ]
        },
        setItems:{
            $desc:"Sets the items property to the current UI object, and reflects it to DOM UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Array, the items."
            ],
            $snippet:[
                "var id='linb.temp.tabs2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto'})));"+
                "_.asyRun(function(){o.setItems([{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}])},1000);"+
                "}"
            ]
        },
        removeItems:{
            $desc:"Removes a set of items from the current UI object.",
            $rtn:"String",
            $paras:[
                "arr [Required] : Array. A set of id strings."
            ],
            $snippet:[
                "var id='linb.temp.tabs4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                "_.asyRun(function(){o.removeItems(['a','b'])},1000);"+
                "}"
            ]
        },
        clearItems:{
            $desc:"Removes all items from the current UI object.",
            $rtn:"String",
            $paras:[
                "key [Optional] : String. the template key which node includes all the items nodes. Defalt is 'ITEMS'."
            ],
            $snippet:[
                "var id='linb.temp.tabs5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                "_.asyRun(function(){o.clearItems()},1000);"+
                "}"
            ]
        },
        getDynRender:{
            $desc:"Gets the dynRender property, that indicates each page in the tabs will render its' children dynamically or not.",
            $rtn:'Bool'
        },
        setDynRender:{
            $desc:"Sets the dynRender property.",
            $rtn:'Bool',
            $memo:"This function should be used before the tabs was rendered."
        },
        getHAlign :{
            $desc:"Gets horizontal alignment.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.tabs7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                "alert(o.getHAlign());_.asyRun(function(){o.setHAlign('center')},1000);"+
                "}"
            ]
        },
        setHAlign :{
            $desc:"Sets horizontal alignment, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : 'left', 'center' or 'right'.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.tabs8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                "alert(o.getHAlign());_.asyRun(function(){o.setHAlign('right')},1000);"+
                "}"
            ]
        },
        getHasPanel :{
            $desc:"Gets the hasPanel property value on the first UIProfile",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.tabs9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                "alert(o.getHasPanel());_.asyRun(function(){o.setHasPanel(false)},1000);"+
                "}"
            ]
        },
        setHasPanel :{
            $desc:"Sets the hasPanel property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.tabs10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                "alert(o.getHasPanel());_.asyRun(function(){o.setHasPanel('kk')},1000);"+
                "}"
            ]
        },
        getDropKeysPanel :{
            $desc:"Gets the DropKeysPanel property value on the first UIProfile",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.tabs11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                "_.asyRun(function(){o.setDropKeysPanel('drap key for panel');alert(o.getDropKeysPanel());},1000);"+
                "}"
            ]
        },
        setDropKeysPanel :{
            $desc:"Sets the DropKeysPanel property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.tabs12'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                "_.asyRun(function(){o.setDropKeysPanel('drap key for panel');alert(o.getDropKeysPanel());},1000);"+
                "}"
            ]
        },
        getCurPanel:{
            $desc:"Gets the current active panel DOM.",
            $rtn:"linb.Dom object",
            $snippet:[
                "var id='linb.temp.tabs13'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}],value:'a'})));"+
                "_.asyRun(function(){alert(o.getCurPanel().id())},1000);"+
                "}"
            ]
        },
        getPanel:{
            $desc:"Gets the panel DOM according to the specified sub id.",
            $rtn:"linb.Dom object",
            $paras:[
                "subId [Optional] : String, the sub id that Determines the result."
            ],
            $snippet:[
                "var id='linb.temp.tabs14'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                "_.asyRun(function(){alert(o.getPanel('b').id())},1000);"+
                "}"
            ]
        },
        markItemCaption:{
            $desc:"Marks the specified tab's caption.",
            $rtn:"linb.Dom object",
            $paras:[
                "subId [Required] : String, the sub id that Determines the result.",
                "mark [Required] : Bool, to mark is not not. ",
                "force [Optional]: Bool, force to mark it. Default is false."
            ],
            $snippet:[
                "var id='linb.temp.tabs15'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                "_.asyRun(function(){o.markItemCaption('b',true)},1000);"+
                "}"
            ]
        },

        addPanel:{
            $desc:"Adds a panel to the current UI.",
            $paras:[
                "para [Required] : a key/value pairs.",
                "children [Required] : Array. the panel's children.",
                "item [Optional] : Object"
            ],
            $snippet:[
                "var id='linb.temp.tabs16'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var panel, tabs;"+
                "linb(id).prepend(panel=new linb.UI.Panel({height:100,width:100,dock:'none',position:'relative'}));"+
                "panel.append(new linb.UI.Button);"+
                "linb(id).prepend(tabs=new linb.UI.Tabs({position:'relative',width:200, height:100, dock:'none',items:[{id:'a',caption:'a'},{id:'b',caption:'b'}]}));"+
                "_.asyRun(function(){tabs.addPanel(panel.getPanelPara(), panel.getPanelChildren()); panel.removePanel();},1000);"+
                "}"
            ]
        },
        removePanel:{
            $desc:"Removes a panel from the current UI.",
            $paras:[
                "domId [Optional] : String, the DOM element id that Determines which panel will be removed."
            ],
            $snippet:[
                "var id='linb.temp.tabs17'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var tabs;"+
                "linb(id).prepend(tabs=new linb.UI.Tabs({position:'relative',width:200, height:100, dock:'none',items:[{id:'a',caption:'a'},{id:'b',caption:'b'}]}));"+
                "_.asyRun(function(){tabs.removePanel(tabs.getSubNode('ITEM','b').id())},1000);"+
                "}"
            ]
        },
        getPanelPara:{
            $desc:"Gets panel parameters from the current UI.",
            $snippet:[
                "var id='linb.temp.tabs18'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var panel, tabs;"+
                "linb(id).prepend(panel=new linb.UI.Panel({height:100,width:100,dock:'none',position:'relative'}));"+
                "panel.append(new linb.UI.Button);"+
                "linb(id).prepend(tabs=new linb.UI.Tabs({position:'relative',width:200, height:100, dock:'none',items:[{id:'a',caption:'a'},{id:'b',caption:'b'}]}));"+
                "_.asyRun(function(){tabs.addPanel(panel.getPanelPara(), panel.getPanelChildren()); panel.removePanel();},1000);"+
                "}"
            ]
        },
        getPanelChildren:{
            $desc:"Gets panel chldren from the current UI.",
            $snippet:[
                "var id='linb.temp.tabs19'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var panel, tabs;"+
                "linb(id).prepend(panel=new linb.UI.Panel({height:100,width:100,dock:'none',position:'relative'}));"+
                "panel.append(new linb.UI.Button);"+
                "linb(id).prepend(tabs=new linb.UI.Tabs({position:'relative',width:200, height:100, dock:'none',items:[{id:'a',caption:'a'},{id:'b',caption:'b'}]}));"+
                "_.asyRun(function(){tabs.addPanel(panel.getPanelPara(), panel.getPanelChildren()); panel.removePanel();},1000);"+
                "}"
            ]
        },

        beforePageClose:{
            $desc:"Fired before user clicked the close button on a tab. If returns false, the tab won't be closed.",
            $paras:[
                "profile : linb.UIProfile object.",
                "item: the current item.",
                "value : the value."
            ],
            $snippet:[
                "var id='linb.temp.tabs21'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a',closeBtn:true},{id:'b',caption:'b b',closeBtn:true},{id:'c',caption:'c c'}]})));"+
                "o.beforePageClose(function(p,item){if(item.id=='a')return false;})"+
                "}"
            ]
        },
        afterPageClose:{
            $desc:"Fired after user clicked the close button on a tab.",
            $paras:[
                "profile : linb.UIProfile object.",
                "item: the current item."
            ],
            $snippet:[
                "var id='linb.temp.tabs22'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a',closeBtn:true},{id:'b',caption:'b b',closeBtn:true},{id:'c',caption:'c c'}]})));"+
                "o.afterPageClose(function(p,item){alert(item.id);})"+
                "}"
            ]
        },
        onItemSelected:{
            $desc:"Fired when a tab is selected.",
            $paras:[
                "profile : linb.UIProfile object.",
                "item: item object.",
                "src: the related DOM element."
            ],
            $snippet:[
                "var id='linb.temp.tabs23'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a',closeBtn:true},{id:'b',caption:'b b',closeBtn:true},{id:'c',caption:'c c'}]})));"+
                "o.onItemSelected(function(p,item){alert(item.id);})"+
                "}"
            ]
        },
        onCaptionActive:{
            $desc:"Fired when user click the current tab's caption.",
            $paras:[
                "profile : linb.UIProfile object.",
                "item: item object.",
                "src: the related DOM element."
            ],
            $snippet:[
                "var id='linb.temp.tabs24'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a',closeBtn:true},{id:'b',caption:'b b',closeBtn:true},{id:'c',caption:'c c'}]})));"+
                "o.onCaptionActive(function(p,item){alert(item.id);})"+
                "}"
            ]
        },
        onShowOptions :{
            $desc:"Fired when user click the option button.",
            $paras:[
                "profile : linb.UIProfile object.",
                "item: list item object.",
                "e: DOM event object.",
                "src: the related DOM element."
            ],
            $snippet:[
                "var id='linb.temp.tabs25'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a',optBtn:true,closeBtn:true},{id:'b',caption:'b b',optBtn:true,closeBtn:true},{id:'c',caption:'c c',optBtn:true}],value:'a'})));"+
                "o.onShowOptions(function(p,item){alert(item.id);})"+
                "}"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","UI","Calendar"], {
    constructor:{
        $desc:"Creates a linb.UI.Calendar object."
    }
});

_.set(linb.Locale,["en","doc","linb","UI","ToolBar"], {
    constructor:{
        $desc:"Creates a linb.UI.ToolBar object."
    },
    prototype:{
        getHAlign :{
            $desc:"Gets horizontal alignment",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.tool1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.ToolBar({items:[{id:'ga', sub:[{id:'ga1',caption:'ga1'},{id:'ga2',caption:'ga2'}]},{id:'gb',sub:[{id:'gb1',caption:'gb1'},{id:'gb2',object:new linb.UI.ComboInput({type:'colorpicker'})}]}]})));"+
                "alert(o.getHAlign());_.asyRun(function(){o.setHAlign('right')},1000);"+
                "}"
            ]
        },
        setHAlign :{
            $desc:"Sets horizontal alignment, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : 'left', 'center' or 'right'.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.tool2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.ToolBar({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',object:new linb.UI.ComboInput({type:'colorpicker'})}]})));"+
                "alert(o.getHAlign());_.asyRun(function(){o.setHAlign('right')},1000);"+
                "}"
            ]
        },
        getHandler:{
            $desc:"Determines whether this tool bar has a handler",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.tool3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.ToolBar({items:[{id:'ga', sub:[{id:'ga1',caption:'ga1'},{id:'ga2',caption:'ga2'}]},{id:'gb',sub:[{id:'gb1',caption:'gb1'},{id:'gb2',object:new linb.UI.ComboInput({type:'timepicker'})}]}]})));"+
                "alert(o.getHandler());_.asyRun(function(){o.setHandler(false)},1000);"+
                "}"
            ]
        },
        setHandler :{
            $desc:"Specifys whether this tool bar has a handler, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.tool4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.ToolBar({items:[{id:'ga', sub:[{id:'ga1',caption:'ga1'},{id:'ga2',caption:'ga2'}]},{id:'gb',sub:[{id:'gb1',caption:'gb1'},{id:'gb2',object:new linb.UI.ComboInput({type:'timepicker'})}]}]})));"+
                "alert(o.getHandler());_.asyRun(function(){o.setHandler(false)},1000);"+
                "}"
            ]
        },
        showGroup:{
            $desc:"Shows or hides the specified toolbar group.",
            $rtn:"[self]",
            $paras:[
                "grpId [Required] : String.",
                "value [Required] : Bool. Default is true"
            ],
            $snippet:[
                "var id='linb.temp.tool5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.ToolBar({items:[{id:'ga', sub:[{id:'ga1',caption:'ga1'},{id:'ga2',caption:'ga2'}]},{id:'gb',sub:[{id:'gb1',caption:'gb1'},{id:'gb2',object:new linb.UI.ComboInput({type:'timepicker'})}]}]})));"+
                "_.asyRun(function(){o.showGroup('ga',false)},1000);"+
                "}"
            ]
        },
        showItem:{
            $desc:"To show/hide the specified item.",
            $rtn:"[self]",
            $paras:[
                "itemId [Required] : String.",
                "value: [Optional] : Bool. Default is true."
            ],
            $snippet:[
                "var id='linb.temp.tool7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.ToolBar({items:[{id:'ga', sub:[{id:'ga1',caption:'ga1'},{id:'ga2',caption:'ga2'}]}]})));"+
                "_.asyRun(function(){o.showItem('ga2',false)},1000);"+
                "}"
            ]

        },
        onClick:{
            $desc:"Fired when an tool bar item is clicked.",
            $paras:[
                "profile : linb.UIProfile object.",
                "item : Object.",
                "group : Object.",
                "e : DOM event object.",
                "src : DOM element."
            ],
            $snippet:[
                "var id='linb.temp.tool8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=(new linb.UI.ToolBar({items:[{id:'ga', sub:[{id:'ga1',caption:'ga1'},{id:'ga2',caption:'ga2'}]}]})));"+
                "o.onClick(function(p,i,j){alert(j.id+'->'+i.id)})"+
                "}"
            ]
        }

    }
});


_.set(linb.Locale,["en","doc","linb","UI","PopMenu"], {
    constructor:{
        $desc:"Creates a linb.UI.PopMenu object."
    },
    prototype:{
        pop:{
            $desc:"Pops this menu.",
            $rtn:"[self]",
            $paras:[
                "obj [Required] : {left:Nubmer,top:Number} or a DOM element.",
                "type [Optional] : Number, from 1 to 4, pop position type. Default is 1.",
                "parent [Optional} : DOM element or linb.Dom object. The popmenu's parent element."
            ],
            $snippet:[
                "var id='linb.temp.pm0'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">Click blank to pop up menu.' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=(new linb.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}));"+
                "linb(id).onClick(function(p,e,s){var p1=linb.Event.getPos(e), p2=linb([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s); })"+
                "}"
            ]
        },
        hide:{
            $desc:"Hides the the first UIProfile",
            $rtn:"[self]",
            $paras:[
                "triggerEvent [Optional] : triggers onHide event or not."
            ],
            $snippet:[
                "var id='linb.temp.pm1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">Click blank to pop up menu.' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=(new linb.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}));"+
                "linb(id).onClick(function(p,e,s){var p1=linb.Event.getPos(e), p2=linb([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s); _.asyRun(function(){o.hide()},3000);})"+
                "}"
            ]
        },
        getAutoHide:{
            $desc:"Determines whether this popup menu hides automatically after showing up for several seconds.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.pm2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">Click blank to pop up menu.' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=(new linb.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true}]}));"+
                "o.setAutoHide(true);"+
                "alert(o.getAutoHide());"+
                "linb(id).onClick(function(p,e,s){var p1=linb.Event.getPos(e), p2=linb([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s); })"+
                "}"
            ]
        },
        setAutoHide:{
            $desc:"Specifys whether this popup menu hides automatically , and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.pm3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">Click blank to pop up menu.' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=(new linb.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',tips:'item c'},{id:'d',object:new linb.UI.CheckBox}]}));"+
                "o.setAutoHide(true);"+
                "alert(o.getAutoHide());"+
                "linb(id).onClick(function(p,e,s){var p1=linb.Event.getPos(e), p2=linb([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s); })"+
                "}"
            ]
        },
        getHideAfterClick:{
            $desc:"Determines whether this popup menu hides automatically after being clicked.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.pm4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">Click blank to pop up menu.' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=(new linb.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true}]}));"+
                "o.setHideAfterClick(false);"+
                "alert(o.getHideAfterClick());"+
                "linb(id).onClick(function(p,e,s){var p1=linb.Event.getPos(e), p2=linb([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s); })"+
                "}"
            ]
        },
        setHideAfterClick:{
            $desc:"Specifys whether this popup menu hides automatically after being clicked, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.pm5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">Click blank to pop up menu.' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=(new linb.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',tips:'item c'},{id:'d',object:new linb.UI.CheckBox}]}));"+
                "o.setHideAfterClick(false);"+
                "alert(o.getHideAfterClick());"+
                "linb(id).onClick(function(p,e,s){var p1=linb.Event.getPos(e), p2=linb([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s); })"+
                "}"
            ]
        },

        beforeHide:{
            $desc:"Fired before the menu hides. If returns false, hide function will be ignored.",
            $paras:[
                "profile : linb.UIProfile"
            ],
            $snippet:[
                "var id='linb.temp.pm31'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">Click blank to pop up menu.' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=(new linb.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}));"+
                "o.beforeHide(function(){alert('before hide')});"+
                "linb(id).onClick(function(p,e,s){var p1=linb.Event.getPos(e), p2=linb([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s);})"+
                "}"
            ]
        },
        onHide:{
            $desc:"Fired when the menu hides.",
            $paras:[
                "profile : linb.UIProfile"
            ],
            $snippet:[
                "var id='linb.temp.pm11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">Click blank to pop up menu.' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=(new linb.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}));"+
                "o.onHide(function(){alert('hidden')});"+
                "linb(id).onClick(function(p,e,s){var p1=linb.Event.getPos(e), p2=linb([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s);})"+
                "}"
            ]
        },
        onMenuSelected:{
            $desc:"Fired when a menu item is selected.",
            $paras:[
                "profile : linb.UIProfile",
                "item : Object.",
                "src : DOM element."
            ],
            $snippet:[
                "var id='linb.temp.pm12'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">Click blank to pop up menu.' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=(new linb.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}));"+
                "o.onMenuSelected(function(p,item){if(item.type=='checkbox')alert(item.value); else alert(item.id); });"+
                "linb(id).onClick(function(p,e,s){var p1=linb.Event.getPos(e), p2=linb([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s);})"+
                "}"
            ]
        },
        onShowSubMenu:{
            $desc:"Fired when a sub menu shows.",
            $paras:[
                "profile : linb.UIProfile",
                "item : Object.",
                "src : DOM element."
            ],
            $snippet:[
                "var id='linb.temp.pm13'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">Click blank to pop up menu.' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=(new linb.UI.PopMenu({autoHide:true, items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:true},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}));"+
                "var cp=(new linb.UI.ColorPicker).render(true);"+
                "cp.beforeClose(function(){cp.hide();return false;})"+
                ".afterUIValueSet(function(p,old,n){o.onMenuSelected(o.get(0),{id:'b',value:n}); o.hide();});"+
                "o.onShowSubMenu(function(p,item,src){"+
                "if(item.id=='b'){return cp;}"+
                "})"+
                ".onMenuSelected(function(p,i){alert(i.id+':'+i.value)});"+
                "linb(id).onClick(function(p,e,s){var p1=linb.Event.getPos(e), p2=linb([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s);})"+
                "}"
            ]
        }
    }
});


_.set(linb.Locale,["en","doc","linb","UI","MenuBar"], {
    constructor:{
        $desc:"Creates a linb.UI.MenuBar object."
    },
    prototype:{
        clearPopCache:{
            $desc:"Clears all cached pop menus."
        },
        hide:{
            $desc:"Hides the the first UIProfile"
        },
        getParentID:{
            $desc:"Gets the parent DOM element's id for pop menus.",
            $rtn:"String"
        },
        setParentID:{
            $desc:"Sets the parent DOM element id for pop menus.",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ]
        },
        getAutoShowTime:{
            $desc:"Determines after how many seconds menu shows up automatically.",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.menu2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=(new linb.UI.MenuBar({items:[{id:'id',caption:'menu',sub:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}]}));"+
                "linb(id).prepend(o);"+
                "alert(o.getAutoShowTime());"+
                "_.asyRun(function(){o.setAutoShowTime(0)});"+
                "}"
            ]
        },
        setAutoShowTime:{
            $desc:"Specifys after how many seconds menu shows up automatically, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.menu3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=(new linb.UI.MenuBar({items:[{id:'id',caption:'menu',sub:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}]}));"+
                "linb(id).prepend(o);"+
                "alert(o.getAutoShowTime());"+
                "_.asyRun(function(){o.setAutoShowTime(1000)});"+
                "}"
            ]
        },
        getHandler:{
            $desc:"Determines whether menu bar has a hanlder.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.menu4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=(new linb.UI.MenuBar({items:[{id:'id',caption:'menu',sub:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}]}));"+
                "linb(id).prepend(o);"+
                "alert(o.getHandler());"+
                "_.asyRun(function(){o.setHandler(false)});"+
                "}"
            ]
        },
        setHandler:{
            $desc:"Specifys whether menu bar has a hanlder, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.menu5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=(new linb.UI.MenuBar({items:[{id:'id',caption:'menu',sub:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}]}));"+
                "linb(id).prepend(o);"+
                "alert(o.getHandler());"+
                "_.asyRun(function(){o.setHandler(false)});"+
                "}"
            ]
        },


        onMenuSelected:{
            $desc:"Fired when a menu item is selected.",
            $paras:[
                "profile : linb.UIProfile",
                "popProfile: linb.UIProfile, the current popmenu's profile.",
                "item : Object.",
                "src : DOM element."
            ],
            $snippet:[
                "var id='linb.temp.pm12'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=(new linb.UI.MenuBar({items:[{id:'id',caption:'menu',sub:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}]}));"+
                "o.onMenuSelected(function(pm,p,item){if(item.type=='checkbox')linb.message(item.value); else linb.message(item.id); });"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        onShowSubMenu:{
            $desc:"Fired when a sub menu is showed.",
            $paras:[
                "profile : linb.UIProfile.",
                "popProfile: linb.UIProfile, the current popmenu's profile.",
                "item : Object.",
                "src : DOM element."
            ],
            $snippet:[
                "var id='linb.temp.menu13'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=(new linb.UI.MenuBar({parentID:id,autoShowTime:0,items:[{id:'id',caption:'menu',sub:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:true},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}]}));"+
                "var cp=(new linb.UI.ColorPicker).render(true);"+
                "cp.beforeClose(function(){cp.hide();return false;})"+
                ".afterUIValueSet(function(p,old,n){o.onMenuSelected(o.get(0),null,{id:'b',value:n}); o.hide();});"+
                "o.onShowSubMenu(function(pm, p,item,src){"+
                "if(item.id=='b'){cp.reBoxing().popToTop(src,2,linb(id));return cp;}"+
                "})"+
                ".onMenuSelected(function(pm,p,i){linb.message(i.id+':'+i.value)});"+
                "linb(id).prepend(o);"+
                "}"
            ]
        }
    }
});


_.set(linb.Locale,["en","doc","linb","UI","Dialog"], {
    constructor:{
        $desc:"Creates a linb.UI.Dialog object."
    },
    alert:{
        $desc:"To show an alert dialog.",
        $rtn:"linb.Dialog object",
        $paras:[
            "title [Optional] : String, the title string.",
            "content [Optional] : String, the content string.",
            "onOK [Optional] : Function, the OK callback function."
        ],
        $snippet:[
            "linb.UI.Dialog.alert('title','content',function(){alert('ok')})",
            "linb.UI.Dialog.alert('title','content content content content content content content content content content content content ',function(){alert('ok')})"
        ]
    },
    confirm:{
        $desc:"To show an confirm dialog.",
        $rtn:"linb.Dialog object",
        $paras:[
            "title [Optional] : String, the title string.",
            "content [Optional] : String, the content string.",
            "onYes [Optional] : Function, the Yes callback function.",
            "onNo [Optional] : Function, the No callback function."
        ],
        $snippet:[
            "linb.UI.Dialog.confirm('title','content',function(){alert('yes')},function(){alert('no')})",
            "linb.UI.Dialog.confirm('title','content content content content content content content content content content content content ',function(){alert('yes')},function(){alert('no')})"
        ]
    },
    pop:{
        $desc:"To show an message dialog.",
        $rtn:"linb.Dialog object",
        $paras:[
            "title [Optional] : String, the title string.",
            "content [Optional] : String, the content string.",
            "cmdStr [Optional] : String, the command button string.",
            "left [Optional] : Number, left value.",
            "top [Optional] : Number, top value."
        ],
        $snippet:[
            "linb.UI.Dialog.pop('title','content')",
            "linb.UI.Dialog.pop('title','content content content content content content content content content content content content ','I knew it!')"
        ]
    },
    prompt:{
        $desc:"To show an prompt dialog.",
        $rtn:"linb.Dialog object",
        $paras:[
            "title [Optional] : String, the title string.",
            "caption [Optional] : String, the caption string.",
            "content [Optional] : String, the content string.",
            "onYes [Optional] : Function, the Yes callback function.",
            "onNo [Optional] : Function, the No callback function."
        ],
        $snippet:[
            "linb.UI.Dialog.prompt('title','caption', 'content content ',function(str){alert(str)})"
        ]
    },
    prototype:{
        close:{
            $desc:"To close the dialog.",
            $rtn:"[self]",
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); _.asyRun(function(){dlg.close();},1000);"
            ]
        },
        show:{
            $desc:"To show the dialog.",
            $rtn:"[self]",
            $paras:[
                "parent [Optional] : linb.Dom object. the parent node. Default is linb('body').",
                "modal [Optional] : Bool, shows in modal mode or not Default is false.",
                "left [Optional] Number, the left position.",
                "top [Optional] Number, the top position."
            ],
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100);",
                "var dlg=(new linb.UI.Dialog).show(null,true, 100,100);",
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); (new linb.UI.Dialog).show(dlg.reBoxing(),true, 100,100);"
            ]
        },
        hide:{
            $desc:"To hide the dialog.",
            $rtn:"[self]",
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); _.asyRun(function(){dlg.hide();},1000); _.asyRun(function(){dlg.show();},2000);"
            ]
        },
        getCaption:{
            $desc:"Gets the Caption property value on the first UIProfile",
            $rtn:"String",
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getCaption());_.asyRun(function(){dlg.setCaption('c cc c');},1000);"
            ]
        },
        setCaption:{
            $desc:"Sets the Caption property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getCaption());_.asyRun(function(){dlg.setCaption('c cc c');},1000);"
            ]
        },
        getCloseBtn:{
            $desc:"Determines whether this control has a close button",
            $rtn:"Bool",
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getCloseBtn());_.asyRun(function(){dlg.setCloseBtn(false);},1000); _.asyRun(function(){dlg.close();},2000);"
            ]
        },
        setCloseBtn:{
            $desc:"Specifys whether this control has a close button, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getCloseBtn());_.asyRun(function(){dlg.setCloseBtn(false);},1000);_.asyRun(function(){dlg.close();},2000);"
            ]
        },

        getMinBtn:{
            $desc:"Determines whether this control has a min button",
            $rtn:"Bool",
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getMinBtn());_.asyRun(function(){dlg.setMinBtn(false);},1000);"
            ]
        },
        setMinBtn:{
            $desc:"Specifys whether this control has a min button, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getMinBtn());_.asyRun(function(){dlg.setMinBtn(false);},1000);"
            ]
        },
        getMaxBtn:{
            $desc:"Determines whether this control has a max button",
            $rtn:"Bool",
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getMaxBtn());_.asyRun(function(){dlg.setMaxBtn(false);},1000);"
            ]
        },
        setMaxBtn:{
            $desc:"Specifys whether this control has a max button, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getMaxBtn());_.asyRun(function(){dlg.setMaxBtn(false);},1000);"
            ]
        },
        getPinBtn:{
            $desc:"Determines whether this control has a pin button",
            $rtn:"Bool",
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getPinBtn());_.asyRun(function(){dlg.setPinBtn(false);},1000);"
            ]
        },
        setPinBtn:{
            $desc:"Specifys whether this control has a pin button, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getPinBtn());_.asyRun(function(){dlg.setPinBtn(false);},1000);"
            ]
        },
        getLandBtn:{
            $desc:"Determines whether this control has a landing button",
            $rtn:"Bool",
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getLandBtn());_.asyRun(function(){dlg.setLandBtn(true);},1000);"
            ]
        },
        setLandBtn:{
            $desc:"Specifys whether this control has a landing button, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getLandBtn());_.asyRun(function(){dlg.setLandBtn(true);},1000);"
            ]
        },
        getOptBtn:{
            $desc:"Determines whether this control has an option button",
            $rtn:"Bool",
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getOptBtn());_.asyRun(function(){dlg.setOptBtn(true);},1000);"
            ]
        },
        setOptBtn:{
            $desc:"Specifys whether this control has an option button, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getOptBtn());_.asyRun(function(){dlg.setOptBtn(true);},1000);"
            ]
        },
        getMovable:{
            $desc:"Determines whether end user can move this dialog by drag and drop.",
            $rtn:"Bool",
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getMovable());_.asyRun(function(){dlg.setMovable(false);},1000);"
            ]
        },
        setMovable:{
            $desc:"Specifys whether end user can move this dialog by drag and drop, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getMovable());_.asyRun(function(){dlg.setMovable(false);},1000);"
            ]
        },
        getImage :{
            $desc:"Gets image url.",
            $rtn:"String",
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getImage());_.asyRun(function(){dlg.setImage('img/img.gif');},1000);"
            ]
        },
        setImage :{
            $desc:"Sets image url, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] :String,  image path.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getImage());_.asyRun(function(){dlg.setImage('img/img.gif');},1000);"
            ]
        },
        getImagePos :{
            $desc:"Gets image position",
            $rtn:"String",
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getImagePos());_.asyRun(function(){dlg.setImage('img/img.gif').setImagePos('left -16px');},1000);"
            ]
        },
        setImagePos :{
            $desc:"Sets image position, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String, corresponding CSS value.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); alert(dlg.getImagePos());_.asyRun(function(){dlg.setImage('img/img.gif').setImagePos('left -16px');},1000);"
            ]
        },
        getHtml:{
            $desc:"Gets dialog inside html",
            $rtn:"String",
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); _.asyRun(function(){dlg.setHtml('<p>content</p>');alert(dlg.getHtml());},1000);"
            ]
        },
        setHtml:{
            $desc:"Sets dialog inside html, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); _.asyRun(function(){dlg.setHtml('<p>content</p>');alert(dlg.getHtml());},1000);"
            ]
        },
        getStatus:{
            $desc:"Gets dialog status. Could be 'normal', 'min' or 'max'.",
            $rtn:"String",
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); _.asyRun(function(){dlg.setStatus('min');alert(dlg.getStatus());},1000);"
            ]
        },
        setStatus:{
            $desc:"Sets dialog status, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String. 'normal', 'min' or 'max'.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); _.asyRun(function(){dlg.setStatus('max');alert(dlg.getStatus());},1000);"
            ]
        },
        getMinHeight:{
            $desc:"Gets dialog minimal height.",
            $rtn:"Number",
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); "+
                "dlg.setMinHeight(200).setMinWidth(200);"+
                "alert(dlg.getMinHeight()+':'+dlg.getMinWidth());"
            ]
        },
        setMinHeight:{
            $desc:"Sets dialog minimal height, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); "+
                "dlg.setMinHeight(200).setMinWidth(200);"+
                "alert(dlg.getMinHeight()+':'+dlg.getMinWidth());"
            ]
        },
        getMinWidth:{
            $desc:"Gets dialog minimal width",
            $rtn:"Number",
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); "+
                "dlg.setMinHeight(200).setMinWidth(200);"+
                "alert(dlg.getMinHeight()+':'+dlg.getMinWidth());"
            ]
        },
        setMinWidth:{
            $desc:"Sets dialog minimal width, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var dlg=(new linb.UI.Dialog).show(null,false, 100,100); "+
                "dlg.setMinHeight(200).setMinWidth(200);"+
                "alert(dlg.getMinHeight()+':'+dlg.getMinWidth());"
            ]
        },
        getFromRegion:{
            $desc:"Gets a region where dialog pops up from.",
            $rtn:"Object",
            $snippet:[
                "var dl=(new linb.UI.Dialog);"+
                "dl.setFromRegion({left:0,top:0,width:10,height:10});"+
                "alert(_.serialize(dl.getFromRegion()));"+
                "dl.show(null,false, 200,200);"
            ]
        },
        setFromRegion:{
            $desc:"Sets a region where dialog pops up from, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Object.{left:Number,top:Number,width:Number,height:Number}",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var dl=(new linb.UI.Dialog);"+
                "dl.setFromRegion({left:0,top:0,width:10,height:10});"+
                "alert(_.serialize(dl.getFromRegion()));"+
                "dl.show(null,false, 200,200);"
            ]
        },
        onShow:{
            $desc:"Fires when the dialog shows.",
            $paras:[
                "profile : linb.UIProfile"
            ],
            $snippet:[
                "var dlg,btn; dlg=new linb.UI.Dialog; dlg.append(btn=new linb.UI.Button);"+
                "dlg.onShow(function(){btn.activate();});"+
                "dlg.show(null,false, 100,100);"
            ]
        },
        beforeClose:{
            $desc:"Fired before user click close button or Cancel button. If returns false, close function will be ignored.",
            $paras:[
                "profile : linb.UIProfile object."
            ],
            $snippet:[
                "var dlg=new linb.UI.Dialog; "+
                "dlg.beforeClose(function(){return false;});"+
                "dlg.show(null,false, 100,100);"+
                "_.asyRun(function(){dlg.close();},3000);"
            ]
        },
        onShowOptions :{
            $desc:"Fired when user click the option button.",
            $paras:[
                "profile : linb.UIProfile object.",
                "e: DOM event object.",
                "src: the related DOM element."
            ],
            $snippet:[
                "var dlg=new linb.UI.Dialog({optBtn:true}); "+
                "dlg.onShowOptions(function(){alert('onShowOptions');});"+
                "dlg.show(null,false, 100,100);"
            ]
        }

    }
});

_.set(linb.Locale,["en","doc","linb","UI","Image"], {
    constructor:{
        $desc:"Creates a linb.UI.Image object."
    },
    prototype:{
        getMaxHeight:{
            $desc:"Gets image max height",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.img1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Image({src:'img/logo.gif'}));"+
                "alert(o.setMaxHeight(500).getMaxHeight());"+
                "}"
            ]
        },
        setMaxHeight:{
            $desc:"Sets image max height, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.img2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Image({src:'img/logo.gif'}));"+
                "alert(o.setMaxHeight(500).getMaxHeight());"+
                "}"
            ]
        },
        getMaxWidth:{
            $desc:"Gets image max width",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.img3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Image({src:'img/logo.gif'}));"+
                "alert(o.setMaxWidth(500).getMaxWidth());"+
                "}"
            ]
        },
        setMaxWidth:{
            $desc:"Sets image max width, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.img4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Image({src:'img/logo.gif'}));"+
                "alert(o.setMaxWidth(500).getMaxWidth());"+
                "}"
            ]
        },
        getSrc:{
            $desc:"Gets image src",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.img5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Image({position:'relative',src:'img/logo.gif'}));"+
                "_.asyRun(function(){alert(o.setSrc('img/linb.box.gif').getSrc())},1000);"+
                "_.asyRun(function(){o.setMaxHeight(200)},1500);"+
                "}"
            ]
        },
        setSrc:{
            $desc:"Sets image src, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.img6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Image({position:'relative',src:'img/logo.gif'}));"+
                "_.asyRun(function(){alert(o.setSrc('img/linb.box.gif').getSrc())},1000);"+
                "_.asyRun(function(){o.setMaxHeight(200)},1500);"+
                "}"
            ]
        },
        getRate:{
            $desc:"Gets the rate (the real image size / the showed image size)",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.img7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Image({position:'relative',src:'img/linb.box.gif',maxHeight:200}));"+
                "_.asyRun(function(){alert(o.getRate())},1000);"+
                "}"
            ]
        },

        onError:{
            $desc:"Fired when the image does not exist.",
            $paras:[
                "profile : linb.UIProfile object."
            ],
            $snippet:[
                "var id='linb.temp.img15'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Image({position:'relative',maxHeight:200}));"+
                "o.onError(function(){alert('the image does not exist')});"+
                "o.setSrc('img/lo-go.gif')"+
                "}"
            ]
        },
        beforeLoad:{
            $desc:"Fired before the src property is set.",
            $paras:[
                "profile : linb.UIProfile object."
            ],
            $snippet:[
                "var id='linb.temp.img16'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Image({position:'relative',maxHeight:200}));"+
                "o.beforeLoad(function(){alert('beforeLoad')}).afterLoad(function(p,src,w,h){linb.message('width:'+w+' height:'+h,src)});"+
                "o.setSrc('img/logo.gif');"+
                "}"
            ]
        },
        afterLoad:{
            $desc:"Fired after the image is loaded successfully.",
            $paras:[
                "profile : linb.UIProfile object.",
                "path : String, src path.",
                "width : Number, image width",
                "height : Number, image height"
            ],
            $snippet:[
                "var id='linb.temp.img17'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o;linb(id).prepend(o=new linb.UI.Image({position:'relative', maxHeight:200}));"+
                "o.beforeLoad(function(){alert('beforeLoad')}).afterLoad(function(p,src,w,h){linb.message('width:'+w+' height:'+h,src)});"+
                "o.setSrc('img/logo.gif');"+
                "}"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","UI","FoldingList"], {
    constructor:{
        $desc:"Creates a linb.UI.FoldingList object."
    },
    prototype:{
        getCmds:{
            $desc:"Gets the cmds property value on the first UIProfile",
            $rtn:"Array",
            $snippet:[
                "var id='linb.temp.fl1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.FoldingList({width:'auto',height:'auto',position:'relative',items:[{id:'a',title:'title 1',caption:'cap a'},{id:'b',title:'title b', caption:'cap b'},{id:'c',caption:'c'}]});"+
                "o.setCmds([{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]);"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){alert(_.serialize(o.getCmds()))},1000)"+
                "}"
            ]
        },
        setCmds:{
            $desc:"Sets the cmds property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Array.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.fl2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.FoldingList({width:'auto',height:'auto',position:'relative',items:[{id:'a',title:'title 1',caption:'cap a'},{id:'b',title:'title b', caption:'cap b'},{id:'c',caption:'c'}]});"+
                "o.setCmds([{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]);"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){alert(_.serialize(o.getCmds()))},1000)"+
                "}"
            ],
            $memo:"You have to use this function before the UIProfile is rendered."
        },
        getActiveLast :{
            $desc:"Gets the ActiveLast property value on the first UIProfile",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.fl5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.FoldingList({width:'auto',height:'auto',position:'relative',items:[{id:'a',title:'title 1',caption:'cap a'},{id:'b',title:'title b', caption:'cap b'},{id:'c',caption:'c'}]});"+
                "o.setActiveLast(true); alert(o.getActiveLast());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        setActiveLast :{
            $desc:"Sets the ActiveLast property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.fl6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.FoldingList({width:'auto',height:'auto',position:'relative',items:[{id:'a',title:'title 1',caption:'cap a'},{id:'b',title:'title b', caption:'cap b'},{id:'c',caption:'c'}]});"+
                "o.setActiveLast(true); alert(o.getActiveLast());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        toggle:{
            $desc:"Toggles the list item according to the specified item id.",
            $rtn:"[self]",
            $paras:[
                "id [Required] :String, item id."
            ],
            $snippet:[
                "var id='linb.temp.fl7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.FoldingList({width:'auto',height:'auto',position:'relative',items:[{id:'a',title:'title 1',caption:'cap a'},{id:'b',title:'title b', caption:'cap b'},{id:'c',caption:'c'}]});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.toggle('a')},1000)"+
                "}"
            ]
        },
        fillContent:{
            $desc:"Fills the specified item content according to the given item id.",
            $rtn:"[self]",
            $paras:[
                "id [Required] :String, item id.",
                "obj [Required]: linb.Dom object or linb.UI object. If obj is null, it will empty the specified item."
            ],
            $snippet:[
                "var id='linb.temp.fl8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.FoldingList({width:'auto',height:'auto',position:'relative',items:[{id:'a',caption:'a1',tips:'a1 tips',text:'text1'},{id:'b',caption:'a2',text:'text2',tips:'a2 tips'}]});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.toggle('a')},1000);"+
                "_.asyRun(function(){o.fillContent('a', new linb.UI.Button({position:'relative'}))},1200);"+
                "}"
            ]
        },

        onShowOptions :{
            $desc:"Fired when user click the option button.",
            $paras:[
                "profile : linb.UIProfile object.",
                "item: list item object.",
                "e: DOM event object.",
                "src: the related DOM element."
            ],
            $snippet:[
                "var id='linb.temp.fl9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.FoldingList({width:'auto',height:'auto',optBtn:true, position:'relative',items:[{id:'a',title:'title 1',caption:'cap a'},{id:'b',title:'title b', caption:'cap b'},{id:'c',caption:'c'}]});"+
                "linb(id).prepend(o);"+
                "o.onShowOptions(function(){alert('onShowOptions');});"+
                "}"
            ]
        },

        onClickButton:{
            $desc:"Fired when an inner command is clicked.",
            $paras:[
                "profile : linb.UIProfile object.",
                "item: list item object.",
                "cmdKey: String, the command key.",
                "src: the related DOM element."
            ],
            $snippet:[
                "var id='linb.temp.fl10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.FoldingList({width:'auto',height:'auto',position:'relative',items:[{id:'a',title:'title 1',caption:'cap a'},{id:'b',title:'title b', caption:'cap b'},{id:'c',caption:'c'}]});"+
                "o.setCmds([{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]);"+
                "linb(id).prepend(o);"+
                "o.onClickButton(function(p,item,cmdKey){alert(item.id +':'+cmdKey)});"+
                "}"
            ]
        },

        onGetContent:{
            $desc:"Fired when the UI need to build inner content.",
            $paras:[
                "profile : linb.UIProfile object.",
                "item: list item object.",
                "callback : Function, callback function.",
                "threadid : String, the shell thread id."
            ],
            $snippet:[
                "var id='linb.temp.fl11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.FoldingList({width:'auto',height:'auto',position:'relative',items:[{id:'Button',title:'a1',tips:'a1 tips'},{id:'CheckBox',title:'a2',tips:'a2 tips'}]});"+
                "o.setCmds([{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]);"+
                "linb(id).prepend(o);"+
                "o.onGetContent(function(p,item){return new linb.UI[item.id]({position:'relative'})});"+
                "}"
            ]
        }
    }
});


_.set(linb.Locale,["en","doc","linb","UI","Poll"], {
    constructor:{
        $desc:"Creates a linb.UI.Poll object."
    },
    prototype:{
        getCmds:{
            $desc:"Gets the cmds property value on the first UIProfile",
            $rtn:"Array",
            $snippet:[
                "var id='linb.temp.pool1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Poll({width:'auto',height:'auto',title:'a survey',selMode:'multi', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%',editable:true}]});"+
                "o.setCmds([{id:'new', caption:'new'}, {id:'edit', caption:'edit'}]);"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){alert(_.serialize(o.getCmds()))},1000)"+
                "}"
            ]
        },
        setCmds:{
            $desc:"Sets the cmds property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Array.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.pool2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Poll({width:'auto',height:'auto',title:'a survey', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%',editable:true},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                "o.setCmds([{id:'new', caption:'new'}, {id:'edit', caption:'edit'}]);"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){alert(_.serialize(o.getCmds()))},1000)"+
                "}"
            ],
            $memo:"You have to use this function before the UIProfile is rendered."
        },

        fillContent:{
            $desc:"Fills the specified item content according to the given item id.",
            $rtn:"[self]",
            $paras:[
                "id [Required] :String, item id.",
                "obj [Required]: linb.Dom object or linb.UI object. If obj is null, it will empty the specified item."
            ],
            $snippet:[
                "var id='linb.temp.poll3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Poll({width:'auto',height:'auto',title:'a survey', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.fillContent('a', new linb.UI.Button({position:'relative'}))},1000);"+
                "}"
            ]
        },
        getBindEditor:{
            $desc:"Gets the bind editor",
            $rtn:"linb.UIProfile object",
            $snippet:[
                "var id='linb.temp.poll4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Poll({editable:true, width:'auto',height:'auto',title:'a survey', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){alert(o.getBindEditor())},2000);"+
                "}"
            ]
        },
        getRemoveText:{
            $desc:"Gets the remove text property value on the first UIProfile",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.pool5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Poll({width:'auto',height:'auto',editable:true,selMode:'multi',title:'a survey', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                "alert(o.getRemoveText());o.setRemoveText('remove me');"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        setRemoveText:{
            $desc:"Sets the remove text property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.pool6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Poll({width:'auto',height:'auto',editable:true,title:'a survey', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                "alert(o.getRemoveText());o.setRemoveText('remove me');"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        getEditorType:{
            $desc:"Gets the editorType property value on the first UIProfile",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.pool7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Poll({width:'auto',height:'auto',editable:true,title:'a survey', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                "alert(o.getEditorType());"+
                "o.setEditorType('colorpicker');"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        setEditorType:{
            $desc:"Sets the editorType property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : 'none','combobox','listbox','upload','getter','helpinput','cmdbox','popbox','timepicker','datepicker' or 'colorpicker'. Default is 'none'.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.pool8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Poll({width:'auto',height:'auto',editable:true,selMode:'multi',title:'a survey', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                "alert(o.getEditorType());"+
                "o.setEditorType('colorpicker');"+
                "linb(id).prepend(o);"+
                "}"
            ],
            $memo:"You have to use this function before the UIProfile is rendered."
        },
        getEditable:{
            $desc:"Gets the Editable property value on the first UIProfile",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.pool9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Poll({width:'auto',height:'auto',title:'a survey', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                "alert(o.getEditable());"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setEditable(true)},1000)"+
                "}"
            ]
        },
        setEditable:{
            $desc:"Sets the Editable property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.pool10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Poll({width:'auto',height:'auto',title:'a survey',newOption:'new', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                "alert(o.getEditable());"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setEditable(true)},1000)"+
                "}"
            ]
        },
        getNewOption:{
            $desc:"Gets the NewOption property value on the first UIProfile",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.pool11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Poll({width:'auto',height:'auto',title:'a survey',selMode:'multi', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                "alert(o.getNewOption());"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setNewOption('Add an option')},1000)"+
                "}"
            ]
        },
        setNewOption:{
            $desc:"Sets the NewOption property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.pool12'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Poll({width:'auto',height:'auto',title:'a survey',toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                "alert(o.getNewOption());"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setNewOption('Add an option')},1000)"+
                "}"
            ]
        },
        getToggle:{
            $desc:"Gets the Toggle property value on the first UIProfile",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.pool13'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Poll({width:'auto',height:'auto',title:'a survey', position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                "alert(o.getToggle());"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setToggle(true)},1000)"+
                "}"
            ]
        },
        setToggle:{
            $desc:"Sets the Toggle property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.pool14'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Poll({width:'auto',height:'auto',selMode:'multi',title:'a survey', position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                "alert(o.getToggle());"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setToggle(true)},1000)"+
                "}"
            ]
        },
        getTitle:{
            $desc:"Gets the Title property value on the first UIProfile",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.pool15'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Poll({width:'auto',height:'auto',title:'a survey', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                "alert(o.getTitle());"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setTitle('haha')},1000)"+
                "}"
            ]
        },
        setTitle:{
            $desc:"Sets the Title property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.pool16'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Poll({width:'auto',height:'auto',title:'a survey',selMode:'multi',toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                "alert(o.getTitle());"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setTitle('haha')},1000)"+
                "}"
            ]
        },
        getNoTitle:{
            $desc:"Gets the NoTitle property value on the first UIProfile",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.pool19'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Poll({width:'auto',height:'auto',title:'a survey', position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                "alert(o.getNoTitle());"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setNoTitle(true)},1000)"+
                "}"
            ]
        },
        setNoTitle:{
            $desc:"Sets the NoTitle property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.pool20'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Poll({width:'auto',height:'auto',title:'a survey', position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                "alert(o.getNoTitle());"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setNoTitle(true)},1000)"+
                "}"
            ]
        },

        onGetContent:{
            $desc:"Fired when the UI need to build inner content.",
            $paras:[
                "profile : linb.UIProfile object.",
                "item: list item object.",
                "callback : Function, callback function.",
                "threadid : String, the shell thread id."
            ],
            $snippet:[
                "var id='linb.temp.pool30'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Poll({width:'auto',height:'auto',title:'a survey', position:'relative',toggle:true,items:[{id:'Button',caption:'option 1',percent:0.5,message:'50%'},{id:'CheckBox',caption:'option 2',percent:0.8,message:'80%'}]});"+
                "o.setCmds([{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]);"+
                "linb(id).prepend(o);"+
                "o.onGetContent(function(p,item){return new linb.UI[item.id]({position:'relative'})});"+
                "}"
            ]
        },
        onClickButton:{
            $desc:"Fired when an inner command is clicked.",
            $paras:[
                "profile : linb.UIProfile object.",
                "key: String, the command key.",
                "src: the related DOM element."
            ],
            $snippet:[
                "var id='linb.temp.pool31'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Poll({width:'auto',height:'auto',title:'a survey', position:'relative',toggle:true,items:[{id:'Button',caption:'option 1',percent:0.5,message:'50%'},{id:'CheckBox',caption:'option 2',percent:0.8,message:'80%'}]});"+
                "o.setCmds([{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]);"+
                "linb(id).prepend(o);"+
                "o.onClickButton(function(p,cmdKey){alert(cmdKey)});"+
                "}"
            ]
        },

        beforeOptionAdded:{
            $desc:"Fired wbefore a new item will be added.",
            $paras:[
                "profile : linb.UIProfile object.",
                "value: String."
            ],
            $snippet:[
                "var id='linb.temp.pool41'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Poll({width:'auto',height:'auto',editable:true,title:'a survey',newOption:'new', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                "o.beforeOptionAdded(function(p,s){linb.message('beforeOptionAdded'+':'+s)});"+
                "o.beforeOptionChanged(function(p,i,s){linb.message('beforeOptionChanged'+':'+s)});"+
                "o.beforeOptionRemoved(function(p){linb.message('beforeOptionRemoved')});"+
                "o.beforeTitleChanged(function(p,s){linb.message('beforeTitleChanged'+':'+s)});"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        beforeOptionChanged:{
            $desc:"Fired a specified item will be changed",
            $paras:[
                "profile : linb.UIProfile object.",
                "item: list item object.",
                "value: String."
            ],
            $snippet:[
                "var id='linb.temp.pool42'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Poll({width:'auto',height:'auto',editable:true,title:'a survey',newOption:'new', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                "o.beforeOptionAdded(function(p,s){linb.message('beforeOptionAdded'+':'+s)});"+
                "o.beforeOptionChanged(function(p,i,s){linb.message('beforeOptionChanged'+':'+s)});"+
                "o.beforeOptionRemoved(function(p){linb.message('beforeOptionRemoved')});"+
                "o.beforeTitleChanged(function(p,s){linb.message('beforeTitleChanged'+':'+s)});"+

                "linb(id).prepend(o);"+
                "}"
            ]
        },
        beforeOptionRemoved:{
            $desc:"Fired before a specified item will be removed.",
            $paras:[
                "profile : linb.UIProfile object."
            ],
            $snippet:[
                "var id='linb.temp.pool43'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Poll({width:'auto',height:'auto',editable:true,title:'a survey',newOption:'new', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                "o.beforeOptionAdded(function(p,s){linb.message('beforeOptionAdded'+':'+s)});"+
                "o.beforeOptionChanged(function(p,i,s){linb.message('beforeOptionChanged'+':'+s)});"+
                "o.beforeOptionRemoved(function(p){linb.message('beforeOptionRemoved')});"+
                "o.beforeTitleChanged(function(p,s){linb.message('beforeTitleChanged'+':'+s)});"+

                "linb(id).prepend(o);"+
                "}"
            ]
        },
        beforeTitleChanged:{
            $desc:"Fired before the title will be changed.",
            $paras:[
                "profile : linb.UIProfile object.",
                "value: String."
            ],
            $snippet:[
                "var id='linb.temp.pool44'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Poll({width:'auto',height:'auto',editable:true,title:'a survey',newOption:'new', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                "o.beforeOptionAdded(function(p,s){linb.message('beforeOptionAdded'+':'+s)});"+
                "o.beforeOptionChanged(function(p,i,s){linb.message('beforeOptionChanged'+':'+s)});"+
                "o.beforeOptionRemoved(function(p){linb.message('beforeOptionRemoved')});"+
                "o.beforeTitleChanged(function(p,s){linb.message('beforeTitleChanged'+':'+s)});"+

                "linb(id).prepend(o);"+
                "}"
            ]
        },
        onCustomEdit:{
            $desc:"Fired when the inline editor is activated.",
            $paras:[
                "profile : linb.UIProfile object.",
                "node: the corresponding Caption DOM element.",
                "flag: Number, 1:edit item; 2:add item; other:edit title.",
                "value: String.",
                "item: list item object."
            ],
            $snippet:[
                "var id='linb.temp.pool45'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.Poll({width:'auto',height:'auto',editable:true, title:'a survey',newOption:'new', toggle:true, position:'relative',items:[{id:'a',caption:'option 1',percent:0.5,message:'50%'},{id:'b',caption:'option 2',percent:0.8,message:'80%'}]});"+
                "o.onCustomEdit(function(profile, node, flag, value, item, callback){"+
                "if(flag==1||flag==2){var p=new linb.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b'}]});p.pop(node);p.onMenuSelected(function(p,i){callback(i.caption)}); return p;};"+
                "});"+
                "linb(id).prepend(o);"+
                "}"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","UI","TreeBar"], {
    constructor:{
        $desc:"Creates a linb.UI.TreeBar object."
    },
    prototype:{
        getAnimCollapse :{
            $desc:"Determines whether to show animate when a tree node collapses.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.tb1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'ba',caption:'caption ba'},{id:'bb',caption:'caption bb'}]},{id:'c',caption:'c'}]});"+
                "o.setAnimCollapse(true); alert(o.getAnimCollapse());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        setAnimCollapse :{
            $desc:"Specifys whether to show animate when a tree node collapses, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.tb2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'ba',caption:'caption ba'},{id:'bb',caption:'caption bb'}]},{id:'c',caption:'c'}]});"+
                "o.setAnimCollapse(true); alert(o.getAnimCollapse());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        getGroup :{
            $desc:"Gets the Group property value on the first UIProfile",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.tb3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'ba',caption:'caption ba'},{id:'bb',caption:'caption bb'}]},{id:'c',caption:'c'}]});"+
                "o.setGroup(true); alert(o.getGroup());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        setGroup :{
            $desc:"Sets the Group property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.tb4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'ba',caption:'caption ba'},{id:'bb',caption:'caption bb'}]},{id:'c',caption:'c'}]});"+
                "o.setGroup(true); alert(o.getGroup());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        getDynDestory:{
            $desc:"Gets the DynDestory property value on the first UIProfile",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.tb5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:true},{id:'c',caption:'c',sub:true}]});"+
                "o.setDynDestory(true); alert(o.getDynDestory());"+
                "o.onGetContent(function(profile,item){var id=item.id;return [{id: id+'a',caption:'caption'},{id:id+'b',caption:'caption'}]});"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        setDynDestory :{
            $desc:"Sets the DynDestory property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.tb6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:true},{id:'c',caption:'c',sub:true}]});"+
                "o.setDynDestory(true); alert(o.getDynDestory());"+
                "o.onGetContent(function(profile,item){var id=item.id;return [{id: id+'a',caption:'caption'},{id:id+'b',caption:'caption'}]});"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        getIniFold :{
            $desc:"Determines whether parent node collapses initially",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.tb7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'ba',caption:'caption ba'},{id:'bb',caption:'caption bb'}]},{id:'c',caption:'c'}]});"+
                "o.setIniFold(true); alert(o.getIniFold());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        setIniFold :{
            $desc:"Specifys whether parent node collapses initially, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.tb8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'ba',caption:'caption ba'},{id:'bb',caption:'caption bb'}]},{id:'c',caption:'c'}]});"+
                "o.setIniFold(false); alert(o.getIniFold());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        getSelMode :{
            $desc:"Gets selection mode. Could be 'none', 'single' or 'multi'.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.tb9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'ba',caption:'caption ba'},{id:'bb',caption:'caption bb'}]},{id:'c',caption:'c'}]});"+
                "o.setSelMode('none'); alert(o.getSelMode());"+
                "o.onItemSelected(function(profile,item){linb.message(item.id)});"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        setSelMode :{
            $desc:"Sets selection mode, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String. 'none', 'single' or 'multi'. Default is 'single'",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.tb10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'ba',caption:'caption ba'},{id:'bb',caption:'caption bb'}]},{id:'c',caption:'c'}]});"+
                "o.setSelMode('multi'); alert(o.getSelMode());"+
                "o.afterUIValueSet(function(profile,o,n){linb.message(n)});"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        getSingleOpen:{
            $desc:"Determines whether only one node is allowed to expand at one time",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.tb11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:true},{id:'c',caption:'c',sub:true}]});"+
                "o.setSingleOpen(true); alert(o.getSingleOpen());"+
                "o.onGetContent(function(profile,item){var id=item.id;return [{id: id+'a',caption:'caption'},{id:id+'b',caption:'caption'}]});"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        setSingleOpen :{
            $desc:"Specify whether only one node is allowed to expand at one time, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.tb12'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:true},{id:'c',caption:'c',sub:true}]});"+
                "o.setSingleOpen(true); alert(o.getSingleOpen());"+
                "o.onGetContent(function(profile,item){var id=item.id;return [{id: id+'a',caption:'caption'},{id:id+'b',caption:'caption'}]});"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        insertItems:{
            $desc:"Inserts a set of items to the current UI object.",
            $rtn:"[self]",
            $paras:[
                "arr [Required] : Array. A set of Item objects.",
                "pid [Optional] : String. The parent node id.",
                "base [Optional] : String. The base item id string.",
                "before [Optional] : Bool. Indicats whether it inserts the target items before the base, or after the base. Default is false;"
            ],
            $snippet:[
                "var id='linb.temp.tb13'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeBar({width:'auto',iniFold:false,height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'bz',caption:'bz'}]},{id:'c',caption:'c',sub:[{id:'cz',caption:'cz'}]}]});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.insertItems([{id: 'ba',caption:'caption'},{id:'bb',caption:'caption'}],'b',null,true)},1000);"+
                "_.asyRun(function(){o.insertItems([{id: 'ca',caption:'caption'},{id:'cb',caption:'caption'}],'c',null,false)},2000);"+
                "_.asyRun(function(){o.insertItems([{id:'aaa',caption:'a0'}],null,'b',false)},3000);"+
                "_.asyRun(function(){o.insertItems([{id:'bbb',caption:'b0'}],null,'b',true)},4000);"+
                "}"
            ]
        },
        openToNode:{
            $desc:"Opens the specified node even if it's in the deeper layer.",
            $rtn:"String",
            $paras:[
                "id [Required] : String. The node id."
            ],
            $snippet:[
                "var id='linb.temp.tb14'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeBar({width:'auto',iniFold:true,height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b',sub:[{id:'bb',caption:'bb',sub:[{id: 'bba',caption:'bba'},{id:'bbb',caption:'bbb',sub:[{id:'bbba',caption:'bbba'}]}]}]},{id:'c',caption:'c',sub:[{id:'cz',caption:'cz'}]}]});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.openToNode('bbba')},1000);"+
                "}"
            ]
        },
        selectItem:{
            $desc:"Selects the specified node, and fire the [onItemSelected] event.",
            $rtn:"String",
            $paras:[
                "id [Required] : String. The node id."
            ],
            $snippet:[
                "var id='linb.temp.tb15'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeBar({width:'auto',iniFold:true,height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c',sub:[{id:'cz',caption:'cz'}]}]});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.selectItem('b')},1000);"+
                "}"
            ]
        },
        toggleNode:{
            $desc:"Expends or folds the specified node.",
            $rtn:"String",
            $paras:[
                "id [Required] : String. The node id.",
                "expend [Optional] : Bool. true=>expend;false=>fold.",
                "recursive [Optional] : Bool. it's recursive or not."
            ],
            $snippet:[
                "var id='linb.temp.tb17'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeBar({width:'auto',iniFold:true,height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b',sub:[{id:'bb',caption:'bb',sub:[{id: 'bba',caption:'bba'},{id:'bbb',caption:'bbb',sub:[{id:'bbba',caption:'bbba'}]}]}]},{id:'c',caption:'c',sub:[{id:'cz',caption:'cz'}]}]});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.toggleNode('b',true,true)},1000);"+
                "_.asyRun(function(){o.toggleNode('bb',false,true)},2000);"+
                "_.asyRun(function(){o.toggleNode('bb',true,false)},3000);"+
                "}"
            ]
        },


        onGetContent:{
            $desc:"Fired when the UI needs to build a sub items.",
            $paras:[
                "profile : linb.UIProfile object.",
                "item: list item object.",
                "callback : Function, callback function.",
                "threadid : String, the shell thread id."
            ],
            $snippet:[
                "var id='linb.temp.tb18'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:true},{id:'c',caption:'c',sub:true}]});"+
                "o.onGetContent(function(profile,item,callback,threadid){var id=item.id, data=[{id: id+'a',caption:'caption'},{id:id+'b',caption:'caption '+id}]; if(id=='b')return data; else callback(data);});"+
                "o.onItemSelected(function(profile,item,src){linb.message(item.id)});"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        onItemSelected:{
            $desc:"Fired when a specified item is clicked.",
            $paras:[
                "profile : linb.UIProfile object.",
                "item: list item object.",
                "src: the related DOM element."
            ],
            $snippet:[
                "var id='linb.temp.tb20'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:true},{id:'c',caption:'c',sub:true}]});"+
                "o.onItemSelected(function(profile,item,src){linb.message(item.id)});"+
                "linb(id).prepend(o);"+
                "}"
            ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","UI","TreeGrid"], {
    constructor:{
        $desc:"Creates a linb.UI.TreeGrid object."
    },
    getCellPro:{
        $desc:"Gets the spcefied cell's property value according to the given property key.",
        $rtn:"String",
        $paras:[
            "profile [Required] : the linb.UIProfile of TreeGrid.",
            "cell [Required] : the cell object.",
            "key [Required] : String, the target property key."
        ],
        $snippet:[
            "var id='linb.temp.grid0'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
            "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
            "o.setActiveMode('cell').afterCellActive(function(profile, cell){linb.message(profile.box.getCellPro(profile,cell,'type'))});"+
            "linb(id).prepend(o);"+
            "}"
        ]
    },
    prototype:{
        getActiveMode :{
            $desc:"Determines grid active mode.",
            $rtn:"String. 'cell' or 'row'. ",
            $snippet:[
                "var id='linb.temp.grid1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setActiveMode('cell'); alert(o.getActiveMode());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        setActiveMode :{
            $desc:"Sets grid active mode, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String. 'cell', 'row'.Default is 'row'.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.grid2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,altRowsBg:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setActiveMode('row'); alert(o.getActiveMode());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        editCellbyRowCol:{
            $desc:"To bind a specified cell to a specified editor by row id and col id.",
            $paras:[
                "rowId [Required] : String, the row id.",
                "colId [Required] : String, the col id."
            ],
            $snippet:[
                "var id='linb.temp.grid3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.editCellbyRowCol('row2','col2')},1000);"+
                "}"
            ]
        },
        getAltRowsBg :{
            $desc:"Determines whether to show rows in stripe.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.grid4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setAltRowsBg(true); alert(o.getAltRowsBg());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        setAltRowsBg :{
            $desc:"Specifys whether to show rows in stripe., and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.grid5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setAltRowsBg(true); alert(o.getAltRowsBg());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        getAnimCollapse :{
            $desc:"Gets the Animate property value on the first UIProfile",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.grid6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setAnimCollapse(true); alert(o.getAnimCollapse());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        setAnimCollapse :{
            $desc:"Sets the Animate property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.grid7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setAnimCollapse(true); alert(o.getAnimCollapse());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        getCellbyRowCol:{
            $desc:"Gets the cell object according to its row id and col id.",
            $rtn:"Ojbect",
            $paras:[
                "rowId [Required] : String, row id.",
                "colId [Requried] : String, column id."
            ],
            $snippet:[
                "var id='linb.temp.grid7.1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "linb(id).prepend(o);"+
                "alert(o.getCellbyRowCol('row2','col2').value);"+
                "}"
            ]
        },
        getColHidable:{
            $desc:"Determines whether columns are hidable.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.grid8.2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setColHidable(true); alert(o.getColHidable());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        setColHidable :{
            $desc:"Specifys whether columns are hidable, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.grid9.2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setColHidable(true); alert(o.getColHidable());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        getColMovable :{
            $desc:"Determines whether columns are movable.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.grid8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setColMovable(false); alert(o.getColMovable());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        setColMovable :{
            $desc:"Specifys whether columns are movable, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.grid9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setColMovable(true); alert(o.getColMovable());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        getColResizer :{
            $desc:"Determines whether columns are resizable.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.grid10'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setColResizer(false); alert(o.getColResizer());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        setColResizer :{
            $desc:"Specifys whether columns are resizable, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.grid11'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setColResizer(true); alert(o.getColResizer());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        getColSortable :{
            $desc:"Determines whether columns are sortable.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.grid12'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setColSortable(false); alert(o.getColSortable());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        setColSortable :{
            $desc:"Specify whether columns are sortable, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.grid13'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setColSortable(true); alert(o.getColSortable());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        getEditable :{
            $desc:"Determines whether grid are editable or read-only.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.grid14'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setEditable(false); alert(o.getEditable());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        setEditable :{
            $desc:"Sets grid to editable or read-only., and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.grid15'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setEditable(true); alert(o.getEditable());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        getHeaderHeight :{
            $desc:"Get grid header height.",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.grid16'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setHeaderHeight(40); alert(o.getHeaderHeight());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        setHeaderHeight :{
            $desc:"Set grid header height, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.grid17'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setHeaderHeight(40); alert(o.getHeaderHeight());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        getRowHeight :{
            $desc:"Get grid row height.",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.grid18'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setRowHeight(40); alert(o.getRowHeight());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        setRowHeight :{
            $desc:"Sets grid row height, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.grid19'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setRowHeight(40); alert(o.getRowHeight());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        getIniFold :{
            $desc:"Gets the IniFold property value on the first UIProfile",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.grid20'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setIniFold(false); alert(o.getIniFold());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        setIniFold :{
            $desc:"Sets the IniFold property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.grid21'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setIniFold(true); alert(o.getIniFold());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        getRowResizer :{
            $desc:"Determines whether row can be resized by end user.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.grid22'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setRowResizer(false); alert(o.getRowResizer());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        setRowResizer :{
            $desc:"Specify whether row can be resized by end user, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.grid23'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setRowResizer(true); alert(o.getRowResizer());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        getRowHandler :{
            $desc:"Determines whether row has handle in the front.",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.grid124'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setRowHandler(false); alert(o.getRowHandler());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        setRowHandler :{
            $desc:"Specify whether row has handle in the front., and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.grid125'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setRowHandler(true); alert(o.getRowHandler());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        getSelMode :{
            $desc:"Gets grid selection mode.",
            $rtn:"String",
            $snippet:[
                "var id='linb.temp.grid126'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setSelMode('none'); alert(o.getSelMode());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        setSelMode :{
            $desc:"Sets grid selection mode, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String. 'none', 'single' or 'multi'. Default is 'single'.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.grid127'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setSelMode('multi'); alert(o.getSelMode());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        insertRows:{
             $desc:"Inserts a set of rows to the current grid.",
             $rtn:"[self]",
             $paras:[
                "arr [Required] : Array. A set of Item objects.",
                "pid [Optional] : String, the parent id.",
                "base [Optional] : String. the base row id string.",
                "before [Optional] : Bool. Indicats whether it inserts the target rows before the base, or after the base. Default is false;"
             ],
            $snippet:[
                "var id='linb.temp.grid128'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,iniFold:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.insertRows([{id : 'row_1',cells:['cell_1',1,true,'label1']},{id : 'row_11',cells:['cell_11',1,true,'label1']}],'row4',null,true)},1000);"+
                "_.asyRun(function(){o.insertRows([{id : 'row_2',cells:['cell_2',1,true,'label1']}],'row4',null,false)},2000);"+
                "_.asyRun(function(){o.insertRows([{id : 'row_3',cells:['cell_3',1,true,'label1']}],null,'row2',false)},3000);"+
                "_.asyRun(function(){o.insertRows([{id : 'row_4',cells:['cell_4',1,true,'label1']}],null,'row2',true)},4000);"+
                "}"
            ]
        },
        toggleRow:{
            $desc:"Expends or folds the specified row. It makes sense with rows containing children only.",
            $rtn:"String",
            $paras:[
                "id [Required] : String. The node id.",
                "expend [Optional] : Bool. true=>expend;false=>fold."
            ],
            $snippet:[
                "var id='linb.temp.grid129'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.toggleRow('row4',true)},1000);"+
                "}"
            ]
        },
        updateCell:{
            $desc:"Updates a specified cell's value.",
            $rtn:"[self]",
            $paras:[
                "cellId [Required] : String, the cell id.",
                "hash [Required] : key/value object, the keys/values to be updated."
            ],
            $snippet:[
                "var id='linb.temp.grid130'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.updateCell('c_a',{value:'a a a a'})},1000);"+
                "}"
            ]
        },
        updateCellByRowCol:{
            $desc:"Updates a specified cell's value according to row id and col id.",
            $rtn:"[self]",
            $paras:[
                "rowId [Required] : String, the corresponding row id.",
                "colId [Required] : String, the corresponding col id.",
                "hash [Required] : key/value object, the keys/values to be updated."
            ],
            $snippet:[
                "var id='linb.temp.grid131'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.updateCellByRowCol('row1','col1',{value:'b b b b'})},1000);"+
                "}"
            ]
        },
        getRowDragable :{
            $desc:"Determines whether rows are dragable by end user",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.grid32'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setRowDragable(false); alert(o.getRowDragable());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        setRowDragable :{
            $desc:"Specifys whether rows are dragable by end user, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.grid33'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setRowDragable(true); alert(o.getRowDragable());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        getRows :{
            $desc:"Gets the all rows of this grid",
            $rtn:"object",
            $snippet:[
                "var id='linb.temp.grid32'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "_.asyRun(function(){o.setRows([{id : 'row_1',cells:['cell_1',1,true,'label1']},{id : 'row_11',cells:['cell_11',1,true,'label1']}]); alert(o.getRows().length)});"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        setRows :{
            $desc:"Set rows of this grid, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : object.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.grid33'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "_.asyRun(function(){o.setRows([{id : 'row_1',cells:['cell_1',1,true,'label1']},{id : 'row_11',cells:['cell_11',1,true,'label1']}]); alert(o.getRows().length)});"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        getHeader :{
            $desc:"Get grid header object",
            $rtn:"object",
            $snippet:[
                "var id='linb.temp.grid34'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "_.asyRun(function(){alert(o.getHeader().length)});"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        setHeader :{
            $desc:"Set grid header with a header object, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : object.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.grid35'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "_.asyRun(function(){alert(o.getHeader().length)});"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        getRowbyRowId  :{
            $desc:"Gets a row item object according to a given row id.",
            $rtn:"Object",
            $paras:[
                "rowId [Required] : String."
            ],
            $snippet:[
                "var id='linb.temp.grid36'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){alert(o.getRowbyRowId('row2'))});"+
                "}"
            ]
        },
        getRowNumbered :{
            $desc:"Gets the RowNumbered property value on the first UIProfile",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.grid37'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setRowNumbered(true); alert(o.getRowNumbered());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        setRowNumbered :{
            $desc:"Sets the RowNumbered property value on the each UIProfile, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.grid38'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setRowNumbered(true); alert(o.getRowNumbered());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        getShowHeader :{
            $desc:"Determiness whether grid header shows up or not",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.grid39'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false, position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setShowHeader(false); alert(o.getShowHeader());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        setShowHeader :{
            $desc:"Specifys whether grid header shows up or not, and reflects the value to UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.grid40'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setShowHeader(false); alert(o.getShowHeader());"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        resetGridValue:{
            $desc:"Resets all cells' value in the grid, and clears all dirty marks.",
            $rtn:"[self]",
            $snippet:[
                "var id='linb.temp.grid41'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "linb(id).prepend(o);"+
                "o.updateCellByRowCol('row1','col1',{value:'a'}).updateCellByRowCol('row1','col2',{value:5}).updateCellByRowCol('row2','col2',{value:8});"+
                "_.asyRun(function(){o.resetGridValue()},1000);"+
                "}"
            ]
        },
        resetRowValue:{
            $desc:"Resets all cells' value in a row, and clears those dirty marks.",
            $rtn:"[self]",
            $paras:[
                "rowId [Required] : String, the row id string."
            ],
            $snippet:[
                "var id='linb.temp.grid41-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "linb(id).prepend(o);"+
                "o.updateCellByRowCol('row1','col1',{value:'a'}).updateCellByRowCol('row1','col2',{value:5}).updateCellByRowCol('row2','col2',{value:8});"+
                "_.asyRun(function(){o.resetRowValue('row1')},1000);"+
                "}"
            ]
        },
        showColumn :{
            $desc:"Shows/hides a specified column.",
            $rtn:"[self]",
            $paras:[
                "colId [Required] : String. the column id.",
                "flag [Optional] : Bool. Determiness to show or hide the specified column. Default is true(to show)."
            ],
            $snippet:[
                "var id='linb.temp.grid42'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.showColumn('col1',false)},1000);"+
                "_.asyRun(function(){o.showColumn('col1')},2000);"+
                "}"
            ]
        },
        removeAllRows:{
            $desc:"Removes all rows.",
            $rtn:"[self]",
            $snippet:[
                "var id='linb.temp.grid43'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.removeAllRows()},1000);"+
                "}"
            ]
        },
        removeRows:{
            $desc:"Removes the specified rows.",
            $rtn:"[self]",
            $paras:[
                "ids [Required] : Array or String, row id string, or a set of row id strings."
            ],
            $snippet:[
                "var id='linb.temp.grid44'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.removeRows(['row1','row2'])},1000);" +
                "}"
            ]
        },

        beforeCellActive:{
            $desc:"Fired before the cell is activated. If returns false, the activation will be ignored.",
            $paras:[
                "profile : linb.UIProfile object.",
                "cell : the cell object."
            ],
            $snippet:[
                "var id='linb.temp.grid50'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setActiveMode('cell');"+
                "linb(id).prepend(o);"+
                "o.beforeCellActive(function(p,c){return false;});" +
                "}"
            ]
        },
        beforeRowActive:{
            $desc:"Fired before the row is activated. If returns false, the activation will be ignored.",
            $paras:[
                "profile : linb.UIProfile object.",
                "row : the row object."
            ],
            $snippet:[
                "var id='linb.temp.grid51'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setActiveMode('row');"+
                "linb(id).prepend(o);"+
                "o.beforeRowActive(function(p,c){return false;});" +
                "}"
            ]
        },
        afterCellActive:{
            $desc:"Fired after the cell is activated.",
            $paras:[
                "profile : linb.UIProfile object.",
                "cell : the cell object."
            ],
            $snippet:[
                "var id='linb.temp.grid52'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setActiveMode('cell');"+
                "linb(id).prepend(o);"+
                "o.afterCellActive(function(p,c){linb.message(c.value);});" +
                "}"
            ]
        },
        afterRowActive:{
            $desc:"Fired after the row is activated.",
            $paras:[
                "profile : linb.UIProfile object.",
                "row : the row object."
            ],
            $snippet:[
                "var id='linb.temp.grid53'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setActiveMode('row');"+
                "linb(id).prepend(o);"+
                "o.afterRowActive(function(p,c){linb.message(c.id);});" +
                "}"
            ]
        },
        beforeColMoved:{
            $desc:"Fired before the column is moved. If returns false, the move action will be ignored.",
            $paras:[
                "profile : linb.UIProfile object.",
                "colId : the moved column id.",
                "toId : [colId] will be moved to the front of which column."
            ],
            $snippet:[
                "var id='linb.temp.grid54'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setColMovable(true);"+
                "linb(id).prepend(o);"+
                "o.beforeColMoved(function(p,colId){if(colId=='col1')return false;});" +
                "o.afterColMoved(function(p,colId,toId){linb.message(colId +' is moved to the the front of '+ toId)});" +
                "}"
            ]
        },
        afterColMoved:{
            $desc:"Fired after the column is moved.",
            $paras:[
                "profile : linb.UIProfile object.",
                "colId : the moved column id.",
                "toId : [colId] will be moved to the front of which column."
            ],
            $snippet:[
                "var id='linb.temp.grid55'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setColMovable(true);"+
                "linb(id).prepend(o);"+
                "o.beforeColMoved(function(p,colId){if(colId=='col1')return false;});" +
                "o.afterColMoved(function(p,colId,toId){linb.message(colId +' is moved to the the front of '+ toId)});" +
                "}"
            ]
        },
        beforeColDrag:{
            $desc:"Fired before the column is draged. If returns false, the drag action will be ignored.",
            $paras:[
                "profile : linb.UIProfile object.",
                "colId : the column id."
            ],
            $snippet:[
                "var id='linb.temp.grid56'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setColMovable(true);"+
                "linb(id).prepend(o);"+
                "o.beforeColDrag(function(p,colId){if(colId=='col1')return false;});" +
                "}",
                "var id='linb.temp.grid57'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s); hash.header[0].colMovable=false; o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setColMovable(true);"+
                "linb(id).prepend(o);"+
                "}"
           ],
            $memo:"Equals to set 'colMovable' to false in the specified column in header array."
        },

        onGetContent:{
            $desc:"Fired when treegrid need to get content to build a set of sub rows.",
            $paras:[
                "profile : linb.UIProfile object.",
                "row : the parent row.",
                "callback : Function, callback function.",
                "threadid : String, the shell thread id."
            ],
            $snippet:[
                "var id='linb.temp.grid57'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);hash.rows[3].sub=hash.rows[4].sub=true;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "linb(id).prepend(o);"+
                "o.onGetContent(function(p,row){return row.id=='row4'?[['a',1,true,{type:'checkbox',value:true}]]:[['b',3,false,'#555555']];});" +
                "}"
           ]
        },
        onRowSelected:{
            $desc:"Fired when a row is selected.",
            $paras:[
                "profile : linb.UIProfile object.",
                "row: row object.",
                "src: the related DOM element."
            ],
            $snippet:[
                "var id='linb.temp.grid58'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "linb(id).prepend(o);"+
                "o.onRowSelected(function(p,row){linb.message(row.id)});" +
                "}"
           ]
        },
        onDblClickRow:{
            $desc:"Fired when a row is dblclicked.",
            $paras:[
                "profile : linb.UIProfile object.",
                "row: row object.",
                "e: the DOM event object.",
                "src: the related DOM element."
            ],
            $snippet:[
                "var id='linb.temp.grid59'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "linb(id).prepend(o);"+
                "o.onDblClickRow(function(p,row){linb.message(row.id)});" +
                "}"
           ]
        },
        onClickButton :{
            $desc:"Fired when a cell which type is 'getter/popbox/cmdbox' is clicked.",
            $paras:[
                "profile : linb.UIProfile object.",
                "cell: the cell object.",
                "proEditor: the editor profile object, if the editor exists.",
                "pos: the click event mouse position.",
                "e: the DOM event object.",
                "src: the related DOM element."
            ],
            $snippet:[
                "var id='linb.temp.grid60'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);hash.header[0].type='button';hash.header[1].type='cmdbox';hash.header[2].type='popbox';o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setEditable(true);"+
                "linb(id).prepend(o);"+
                "o.onClickButton(function(p,cell){linb.message(cell.value)});" +
                "}"
           ]
        },
        onClickCell:{
            $desc:"Fired when a cell(type is 'label/button' or not editable) is clicked.",
            $paras:[
                "profile : linb.UIProfile object.",
                "cell: the cell object.",
                "e: the DOM event object.",
                "src: the related DOM element."
            ],
            $snippet:[
                "var id='linb.temp.grid60-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);hash.header[0].type='button';o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "linb(id).prepend(o);"+
                "o.onClickButton(function(p,cell){linb.message(cell.value)});" +
                "}"
           ]
        },
        onDblClickCell:{
            $desc:"Fired when a cell(type is 'label/button' or not editable) is double clicked.",
            $paras:[
                "profile : linb.UIProfile object.",
                "cell: the cell object.",
                "e: the DOM event object.",
                "src: the related DOM element."
            ],
            $snippet:[
                "var id='linb.temp.grid60-2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);hash.header[0].type='button';o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "linb(id).prepend(o);"+
                "o.onDblClickCell(function(p,cell){linb.message(cell.value)});" +
                "}"
           ]
        },
        beforeIniEditor: {
            $desc:"Fired before a specified cell will be changed to edit mode(attach an editor to it). If returns false, tha action will be cancelled.",
            $paras:[
                "profile : linb.UIProfile object.",
                "cell : the cell object."
            ],
            $snippet:[
                "var id='linb.temp.grid61-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:true,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "linb(id).prepend(o);"+
                "o.beforeIniEditor(function(p,cell){if(cell._col.id!='col2')return false;});" +
                "}"
           ]
        },
        beforeCellUpdated: {
            $desc:"Fired before a specified cell is update. If returns false, the update action will be ignored.",
            $paras:[
                "profile : linb.UIProfile object.",
                "cell : the cell object.",
                "hash [Required] : key/value object, the keys/values to be updated."
            ],
            $snippet:[
                "var id='linb.temp.grid61'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "linb(id).prepend(o);"+
                "o.beforeCellUpdated(function(){linb.message('Cant update cell!');return false;});" +
                "_.asyRun(function(){o.updateCellByRowCol('row1','col1','abc')},1000);"+
                "}"
           ]
        },
        afterCellUpdated: {
            $desc:"Fired before a specified cell is update. If returns false, the update action will be ignored.",
            $paras:[
                "profile : linb.UIProfile object.",
                "cell : the cell object.",
                "hash [Required] : key/value object, the keys/values to be updated."
            ],
            $snippet:[
                "var id='linb.temp.grid62'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TreeGrid({editable:false,position:'relative'});"+
                "linb.Ajax('App/js/grid.js','',function(s){var hash=_.unserialize(s);o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "linb(id).prepend(o);"+
                "o.afterCellUpdated(function(p,cell,hash){linb.message('cell updated!');});" +
                "_.asyRun(function(){o.updateCellByRowCol('row1','col1','abc')},1000);"+
                "_.asyRun(function(){o.updateCellByRowCol('row1','col2',{type:'checkbox',value:false})},2000);"+
                "}"
           ]
        }
    }
});

_.set(linb.Locale,["en","doc","linb","UI","TimeLine"], {
    constructor:{
        $desc:"Creates a linb.UI.TimeLine object."
    },
    prototype:{
        getTimeRange:{
            $desc:"Gets the current time range of the timeline .",
            $rtn:"Array",
            $snippet:[
                "var id='linb.temp.tl2-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative'});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){linb.message(o.getTimeRange())},1000);"+
                "}"
            ]
        },
        addTasks:{
            $desc:"Adds a set of tasks to the current UI object.",
            $rtn:"[self]",
            $paras:[
                "arr [required] : Array, a set of Object."
            ],
            $snippet:[
                "var id='linb.temp.tl3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.addTasks([{id:'task1',caption:'task 1',from:(new Date).getTime(), to:(new Date).getTime()+1000*60*60*4 }])},1000);"+
                "}"
            ]
        },
        removeTasks:{
            $desc:"Removes a set of tasks to the current UI object.",
            $rtn:"[self]",
            $paras:[
                "arr [required] : Array, a set of id string."
            ],
            $snippet:[
                "var id='linb.temp.tl3-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                "linb(id).prepend(o);"+
                "o.addTasks([{id:'task1',caption:'task 1',from:(new Date).getTime(), to:(new Date).getTime()+1000*60*60*4 }]);"+
                "_.asyRun(function(){o.removeTasks(['task1'])},1000);"+
                "}"
            ]
        },
        getCloseBtn:{
            $desc:"Gets the close button property value on the first UIProfile",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.tl4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setCloseBtn(true);alert(o.getCloseBtn())},1000);"+
                "}"
            ]
        },
        setCloseBtn:{
            $desc:"Sets the close button property value on the first UIProfile, and reflects it to DOM UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.tl5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setCloseBtn(true);alert(o.getCloseBtn())},1000);"+
                "}"
            ]
        },
        getZoomable:{
            $desc:"Gets the zoomable property value on the first UIProfile",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.tl4-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setZoomable(false);alert(o.getZoomable())},1000);"+
                "}"
            ]
        },
        setZoomable:{
            $desc:"Sets the zoomable property value on the first UIProfile",
            $rtn:"[self]",
            $snippet:[
                "var id='linb.temp.tl4-2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setZoomable(true);alert(o.getZoomable())},1000);"+
                "}"
            ]
        },
        getIncrement:{
            $desc:"Gets the task increment in pixes.",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.tl4-3'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setIncrement(30);alert(o.getIncrement())},1000);"+
                "}"
            ]
        },
        setIncrement:{
            $desc:"Sets the task increment in pixes.",
            $rtn:"[self]",
            $snippet:[
                "var id='linb.temp.tl4-4'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setIncrement(30);alert(o.getIncrement())},1000);"+
                "}"
            ]
        },
        getTaskHeight:{
            $desc:"Gets the task height property value.",
            $rtn:"Number",
            $snippet:[
                "var id='linb.temp.tl4-5'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setTaskHeight(36);alert(o.getTaskHeight())},1000);"+
                "}"
            ]
        },
        setTaskHeight:{
            $desc:"Sets the TaskHeight property value, and reflects it to DOM UI.",
            $rtn:"[self]",
            $snippet:[
                "var id='linb.temp.tl4-6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setTaskHeight(36);alert(o.getTaskHeight())},1000);"+
                "}"
            ]
        },
        getOptBtn:{
            $desc:"Gets the option button property value on the first UIProfile",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.tl6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setOptBtn(true);alert(o.getOptBtn())},1000);"+
                "}"
            ]
        },
        setOptBtn:{
            $desc:"Sets the option button property value on the first UIProfile, and reflects it to DOM UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.tl7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setOptBtn(true);alert(o.getOptBtn())},1000);"+
                "}"
            ]
        },
        getDateBtn:{
            $desc:"Gets the date button property value on the first UIProfile",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.tl6'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setDateBtn(false);alert(o.getDateBtn())},1000);"+
                "}"
            ]
        },
        setDateBtn:{
            $desc:"Sets the date button property value on the first UIProfile, and reflects it to DOM UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.tl7'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setDateBtn(false);alert(o.getDateBtn())},1000);"+
                "}"
            ]
        },
        getDftTaskName:{
            $desc:"Gets the default task name property value on the first UIProfile",
            $rtn:"Bool",
            $snippet:[
                "var id='linb.temp.tl8'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setDftTaskName('TASK');alert(o.getDftTaskName())},1000);"+
                "_.asyRun(function(){o.addTasks([{from:(new Date).getTime(), to:(new Date).getTime()+1000*60*60*4 }])},1500);"+
                "}"
            ]
        },
        setDftTaskName:{
            $desc:"Sets the  default task name property value on the first UIProfile, and reflects it to DOM UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.tl9'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setDftTaskName('TASK');alert(o.getDftTaskName())},1000);"+
                "_.asyRun(function(){o.addTasks([{from:(new Date).getTime(), to:(new Date).getTime()+1000*60*60*4 }])},1500);"+
                "}"
            ]
        },
        getFixWidth:{
            $desc:"Gets the FixWidth property value on the first UIProfile",
            $rtn:"Bool",
            $memo:"If you set the FixWidth property to [false], the widget UI will be refreshed once when the widget width is changed."
        },
        setFixWidth:{
            $desc:"Sets the FixWidth property value on the first UIProfile, and reflects it to DOM UI.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $memo:"If you set the FixWidth property to [false], the widget UI will be refreshed once when the widget width is changed."
        },
        getDateStart:{
            $desc:"Gets the date start property value on the first UIProfile",
            $rtn:'Date Ojbect',
            $snippet:[
                "var id='linb.temp.tl20'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                "linb(id).prepend(o);"+
                "alert(o.getDateStart());"+
                "_.asyRun(function(){o.setDateStart(linb.Date.add(new Date,'d',1))},1000);"+
                "}"
            ]
        },
        setDateStart:{
            $desc:"Gets the date start property value on the first UIProfile",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Date Object.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.tl21'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative', multiTasks:true});"+
                "linb(id).prepend(o);"+
                "alert(o.getDateStart());"+
                "_.asyRun(function(){o.setDateStart(linb.Date.add(new Date,'d',1))},1000);"+
                "}"
            ]
        },
        getMultiTasks:{
            $desc:"Gets the multiTasks property value on the first UIProfile",
            $rtn:'Date Ojbect',
            $snippet:[
                "var id='linb.temp.tl22'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative'});"+
                "linb(id).prepend(o);"+
                "alert(o.getMultiTasks());"+
                "}"
            ]
        },
        setMultiTasks:{
            $desc:"Gets the multiTasks property value on the first UIProfile",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Date Object.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.tl23'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative'});"+
                "linb(id).prepend(o);"+
                "alert(o.getMultiTasks());"+
                "_.asyRun(function(){o.setMultiTasks(true)},1000);"+
                "}"
            ]
        },
        getMinDate:{
            $desc:"Gets the min date property value on the first UIProfile",
            $rtn:'Date Ojbect',
            $snippet:[
                "var id='linb.temp.tl24'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative'});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setMinDate(linb.Date.add(new Date,'d',-2));alert(o.getMinDate());},1000);"+
                "}"
            ]
        },
        setMinDate:{
            $desc:"Gets the min date property value on the first UIProfile",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Date Object.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.tl25'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative'});"+
                "linb(id).prepend(o);"+
                "alert(o.getMinDate());"+
                "_.asyRun(function(){o.setMinDate(linb.Date.add(new Date,'d',-2));alert(o.getMinDate());},1000);"+
                "}"
            ]
        },
        getMaxDate:{
            $desc:"Gets the max date property value on the first UIProfile",
            $rtn:'Date Ojbect',
            $snippet:[
                "var id='linb.temp.tl26'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative'});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setMaxDate(linb.Date.add(new Date,'d',3));alert(o.getMaxDate());},1000);"+
                "}"
            ]
        },
        setMaxDate:{
            $desc:"Gets the max date property value on the first UIProfile",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Date Object.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.tl27'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative'});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setMaxDate(linb.Date.add(new Date,'d',3));alert(o.getMaxDate());},1000);"+
                "}"
            ]
        },
        getReadonly:{
            $desc:"Gets the Readonly property value on the first UIProfile",
            $rtn:'Bool',
            $snippet:[
                "var id='linb.temp.tl28'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative'});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setReadonly(true);alert(o.getReadonly());},1000);"+
                "}"
            ]
        },
        setReadonly:{
            $desc:"Gets the Readonly property value on the first UIProfile",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.tl29'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative'});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setReadonly(true);alert(o.getReadonly());},1000);"+
                "}"
            ]
        },
        getShowTips:{
            $desc:"Gets the ShowTips property value on the first UIProfile",
            $rtn:'Bool',
            $snippet:[
                "var id='linb.temp.tl30'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative'});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setShowTips(false);alert(o.getShowTips());},1000);"+
                "}"
            ]
        },
        setShowTips:{
            $desc:"Gets the ShowTips property value on the first UIProfile",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.tl31'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative'});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setShowTips(false);alert(o.getShowTips());},1000);"+
                "}"
            ]
        },
        getShowBar:{
            $desc:"Gets the ShowBar property value on the first UIProfile",
            $rtn:'Bool',
            $snippet:[
                "var id='linb.temp.tl32'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative'});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setShowBar(false);alert(o.getShowBar());},1000);"+
                "}"
            ]
        },
        setShowBar:{
            $desc:"Gets the ShowBar property value on the first UIProfile",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.tl33'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative'});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setShowBar(false);alert(o.getShowBar());},1000);"+
                "}"
            ]
        },
        getShowBigLabel:{
            $desc:"Gets the ShowBigLabel property value on the first UIProfile",
            $rtn:'Bool',
            $snippet:[
                "var id='linb.temp.tl34'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative'});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setShowBigLabel(false);alert(o.getShowBigLabel());},1000);"+
                "}"
            ]
        },
        setShowBigLabel:{
            $desc:"Gets the ShowBigLabel property value on the first UIProfile.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Bool.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.tl35'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative'});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setShowBigLabel(false);alert(o.getShowBigLabel());},1000);"+
                "}"
            ]
        },
        getTimeSpanKey:{
            $desc:"Gets the TimeSpanKey property value on the first UIProfile",
            $rtn:'String. ',
            $snippet:[
                "var id='linb.temp.tl36'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative'});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setTimeSpanKey('1 w');alert(o.getTimeSpanKey());},1000);"+
                "}"
            ]
        },
        setTimeSpanKey:{
            $desc:"Gets the TimeSpanKey property value on the first UIProfile.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : String. '10 ms','100 ms','1 s','10 s', '1 n','5 n', '10 n', '30 n', '1 h','2 h', '6 h', '1 d', '1 w', '15 d', '1 m', '1 q', '1 y', '1 de' or '1 c'.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.tl37'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative'});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setTimeSpanKey('1 w');alert(o.getTimeSpanKey());},1000);"+
                "}"
            ]
        },
        getUnitPixs:{
            $desc:"Gets the UnitPixs property value on the first UIProfile",
            $rtn:'Number. ',
            $snippet:[
                "var id='linb.temp.tl38'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative'});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setUnitPixs(20);alert(o.getUnitPixs());},1000);"+
                "}"
            ]
        },
        setUnitPixs:{
            $desc:"Gets the UnitPixs property value on the first UIProfile.",
            $rtn:"[self]",
            $paras:[
                "value [Required] : Number.",
                "flag [Optional] : Bool, force to set the property value even if the same property value already exists. Default is [false]."
            ],
            $snippet:[
                "var id='linb.temp.tl39'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative'});"+
                "linb(id).prepend(o);"+
                "_.asyRun(function(){o.setUnitPixs(36);alert(o.getUnitPixs());},1000);"+
                "}"
            ]
        },
        visibleTask:{
            $desc:"To make the single task visible.",
            $rtn:"[self]",
            $snippet:[
                "var id='linb.temp.tl41'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative'});"+
                "linb(id).prepend(o);"+
                "o.setValue(linb.Date.add(new Date,'h',-3).getTime()+':'+linb.Date.add(new Date,'h',3).getTime());"+
                "_.asyRun(function(){o.visibleTask();},1000);"+
                "}"
            ],
            $memo:" 'visibleTask' is valid only when the 'multiTasks' is false."
        },
        iniContent:{
            $desc:"Triggers the current widget to load tasks.",
            $rtn:"[self]",
            $snippet:[
                "var id='linb.temp.tl53-1'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative',multiTasks:true});"+
                "linb(id).prepend(o);"+
                "o.onGetContent(function(p,from,to,minMs,type){linb.message(from.getTime()+':'+to.getTime()+':'+minMs+':'+type);});"+
                "_.asyRun(function(){o.iniContent()},1000);"+
                "}"
            ]
        },

        beforeDragTask:{
            $desc:"Fired before user start to drag a task. If returns false, the defalut drag action will be ignored.",
            $paras:[
                "profile : linb.UIProfile object.",
                "task : the task object.",
                "e: DOM event object.",
                "src: the related DOM element."
            ],
            $snippet:[
                "var id='linb.temp.tl50-2'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative',closeBtn:true});"+
                "linb(id).prepend(o);"+
                "o.beforeDragTask(function(){return false;});"+
                "}"
            ]
        },
        beforeClose:{
            $desc:"Fired before user click close button or Cancel button. If returns false, close function will be ignored.",
            $paras:[
                "profile : linb.UIProfile object.",
                "src: the related DOM element."
            ],
            $snippet:[
                "var id='linb.temp.tl50'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative',closeBtn:true});"+
                "linb(id).prepend(o);"+
                "o.beforeClose(function(){return false;});"+
                "}"
            ]
        },
        onShowOptions :{
            $desc:"Fired when user click the option button.",
            $paras:[
                "profile : linb.UIProfile object.",
                "e: DOM event object.",
                "src: the related DOM element."
            ],
            $snippet:[
                "var id='linb.temp.tl51'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative',optBtn:true});"+
                "linb(id).prepend(o);"+
                "o.onShowOptions(function(){alert('onShowOptions');});"+
                "}"
            ]
        },
        onClickTask:{
            $desc:"Fired when user click the task block.",
            $paras:[
                "profile : linb.UIProfile object.",
                "task : the task object.",
                "e: DOM event object.",
                "src: the related DOM element."
            ],
            $snippet:[
                "var id='linb.temp.tl52'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative',multiTasks:true});"+
                "o.addTasks([{id:'task1',caption:'task 1',from:(new Date).getTime(), to:(new Date).getTime()+1000*60*60*4 }]);"+
                "linb(id).prepend(o);"+
                "o.onClickTask(function(p,task){alert('onClick:'+task.id);});"+
                "}"
            ]
        },
        onGetContent:{
            $desc:"Fired when the UI need to build new tasks.",
            $paras:[
                "profile : linb.UIProfile object.",
                "from : Date, the 'from' time.",
                "to : Date, the 'to' time.",
                "minMs : Number, the min ms count.",
                "type : String, 'left', 'right' or 'inner'.",
                "callback : Function, callback function.",
                "threadid : String, the shell thread id."
            ],
            $snippet:[
                "var id='linb.temp.tl53'; if(!linb.Dom.byId(id)){this.prepend(linb.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"linb(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new linb.UI.TimeLine({position:'relative',multiTasks:true});"+
                "o.onGetContent(function(p,from,to,minMs,type){linb.message(from.getTime()+':'+to.getTime()+':'+minMs+':'+type);});"+
                "linb(id).prepend(o);"+
                "}"
            ]
        },
        beforeDelTasks:{
            $desc:"Fired before a specified task is deleted. If returns false, the action will be ignored.",
            $paras:[
                "profile : linb.UIProfile object.",
                "arr : Array. A set of id strings."
            ]
        },
        beforeNewTasks:{
            $desc:"Fired before a specified task is added. If returns false, the action will be ignored.",
            $paras:[
                "profile : linb.UIProfile object.",
                "tasks: Array. A set of tasks."
            ]
        },
        beforeTaskUpdated:{
            $desc:"Fired before a specified task is updated. If returns false, the action will be ignored.",
            $paras:[
                "profile : linb.UIProfile object.",
                "tasks: Array. A set of tasks.",
                "from : Date, the 'from' time.",
                "to: Date, the 'to' time."
            ]
        }
    }
});