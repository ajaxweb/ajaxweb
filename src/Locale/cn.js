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
(linb.Locale.cn||(linb.Locale.cn={})).VisualJS={
    message:"系统消息!",
    noMessage:"尚无任何消息!",
    soon:'即将实现',
    ok:'确认',
    cancel:'取消',
    notsave:'尚未保存',
    notsave2:'您即将关闭的窗口尚未保存，是否放弃修改并继续关闭操作?',
    notsave3:'当前工程中还有未保存的文件，是否要继续操作?',
    checkOK:'代码没有语法错误!',
    en:'英文',
    cn:'中文',
    langTips:'改变语言',
    
    builder:{
        open:'打开',
        openTips:'打开一个jsLinb类文件',
        save:'保存',
        saveTips:'保存或下载',
        run:'运行',
        runTips:'在debug页面中运行当前jsLinb类',
        dftTheme:'默认界面主题',
        dftThemeTips:'切换界面主题',
        originalFile:"文件来自：",
        issave2server:'这会覆盖服务器上的原始文件，请确认是否继续？',
        save2serverOK:'服务器上的原始文件已经被覆盖！',
        nosavefirst:'打开新的文件意味着放弃当前文件的所有更改（您是否已经保存当前文件？），请确认是否继续？',

        savetoserver:'保存文件到服务器上的原始文件',
        savetolocal:"保存 jsLinb 类文件(.js)到本地",
        saveashtml:"保存一个可以运行的网页文件(.html)到本地",
        saveaszip:"保存可以发布的文件包(.zip)到本地",
        
        themeDft:'默认界面主题',
        themeAqua:'Aqua 界面主题',
        themeVista:'Vista 界面主题',
        
        noexist:"$0 不存在!"
    },
    
    menu:{
        file:'文件',
        newproject:'新建工程',
        openproject:'打开工程',
        closeproject:'关闭工程',
        save:'保存',
        saveall:'保存所有',

        tools: '工具',
        command:'命令窗口',
        spy:'控件浏览',

        build: '生成',
        debug: '运行程序',
        release: '打包下载',
        setting: '编译设置',

        help: '帮助',
        forum: '到论坛...',
        license:'授权许可',
        gpllicense:'LGPL 开源许可',
        clicense: '商业许可',
        purchase:'购买商业许可',
        about: '关于...'
    },

    tool:{
        newp:'新建一个工程',
        open:'打开一个存在的工程',
        save:'保存当前文件',
        saveall:'保存所有更改过的文件',
        command:'打开命令窗口',
        spy:'打开控件 spy 窗口',
        debug:'运行当前程序',
        release:'打包并下载当前程序代码' ,
        ec: '转换语言到英文',
        manual:'用户手册',
        api:'API参考',        
        demo:'示例',
        flash:'Flash 视频介绍'
    },
    tool2:{
        'new':'新建文件到工程',
        del: '从工程中删除文件',
        refresh:'刷新工程文件',
        refreshOK:'工程文件刷新成功!'
    },

    pm:{
        title:'工程管理窗口',
        html:'HTML 文件',
        js:'jsLinb 类文件'
    },
    ps:{
        noselected:'请先选择一个工程',
        noprj:'尚未打开工程!',
        getting:'正在得到工程列表...',
        saved:'$0 个文件保存成功!',
        noSaved:'没有要保存的文件!'
    },

    projectPro:{
        name:"工程名称 :",
        'class':"类名 :",
        pagefile:"页面文件为 :",
        classfile:"类文件为 :",
        onlyword:'仅允许输入由 3 到 15 个有效字符组成的英文单词！'  ,
        invalid :'请确认输入的有效性!'
    },

    dialog:{
        newone: '新建一个工程...',
        select:'请选择一个要打开的工程...'
    },
    pageEditor:{
        formatted:'格式化的代码'
    },
    classEditor:{
        nv:'文件视图',
        sv:'类视图',
        dv:'设计器',
        nvtips:'编辑代码文件',
        svtips:'类节点方式编辑代码文件',
        dvtips:'在设计器中编辑',
        codeerr:'代码不能解析，存在错误: $0'
    },
    pageEditor:{
        format: "格式代码",
        check:"语法检查",
        'reset':"恢复上次",
        formattips:"在窗口中查看格式化后的代码",
        checktips:"对代码进行语法检查",
        resettips:"重新恢复代码到上次保存的状态"
    },
    classtool:{
        err1:'代码格式不正确，请检查代码!',
        err2:'代码格式不正确，请检查代码!',
        err3:'代码格式不正确，请检查代码!',
        err4:'代码格式不正确，请检查代码!',
        noClass:'该文件不是一个 jsLinb 类文件！'
    },
    designer:{
        toolsbox:'组件窗口',
        configwnd:'组件配置窗口',
        
        emptyContent:'正在清空内容...',
        prepare:'准备类...',
        createContent:'刷新设计界面...',
        loading:'正在加载 ',
        comCodeErr:'在函数 "iniComponents" 中存在错误，请返回检查代码!',
        nameExists:'别名 "$0" 已经存在，不能重复命名!',
        domIdExists:'DOM id "$0" 已经存在!',
        domIdValid:'DOM id 只能是数字或英文字母',
        confirmdel:'删除?',
        confirmdel2:"您是否确认删除选中的$0个控件?",
        wlist: '组件树',
        weditor:'组件编辑器',
        gridcol1: '键',
        gridcol2: '值',
        colneOK:'$0 个控件克隆成功!',
        openwidgets:'打开/折叠控件列表',
        dragwidget:'可以拖拽这个控件到设计窗口中!',
        openapi:'可双击鼠标查看 API 文档',
        tool:{
            viewsize:"视图大小",
            tocode:"序列化到 javascript 代码",
            tojson:"序列化到 JSON 代码",
            left: '左对齐',
            center:'居中对齐',
            right:'右对齐',
            top:'顶部对齐',
            middle:'中间对齐',
            bottom:'底部对齐',
            width:'使宽度相同',
            wh:'使大小相同',
            height:'使高度相同',
            toplayer: '置于顶层',
            bottomlayer: '置于底层',
            gridxy: '对齐到网格',
            gridwh: '按网格调整大小',
            clone:'克隆选中控件',
            'delete': '删除选中控件'
        }
    },
    addfile:{
        caption:'新建文件（夹）到工程...',
        sel:'选择目标文件夹',
        filename:'文件名',
        filenameformat:'自允许 2 到 9 个字符',
        add:'新建',
        'iDir':'文件夹',
        'iHtml':'HTML 文件',
        'iCSS':'CSS 文件',
        'iJs':'JS 文件',
        'iPhp':'PHP 文件',
        'target':'目标文件(夹)',
        filetype:'文件类型',
        notarget:'没有待生成的目标文件...'
    },
    delfile:{
        caption:'从工程中删除文件（夹）...',
        sel:'选择目标文件夹',
        notarget:'没有待删除的目标文件...',
        confirmdel:'删除?',
        confirmdel2:"您是否确认删除选中的$0个文件（夹）?"
   }
}
