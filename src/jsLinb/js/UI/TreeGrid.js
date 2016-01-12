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
//rowMap => row_SerialIdMapItem
//rowMap2 => row_ItemIdMapSerialId
//colMap => header_SerialIdMapItem
//colMap2 => header_ItemIdMapSerialId
//cellMap => cells_SerialIdMapItem
Class("linb.UI.TreeGrid",["linb.UI","linb.absValue"],{
    Instance:{
        _setCtrlValue:function(value){
            return this.each(function(profile){
                if(!profile.domNode)return;

                var box = profile.boxing(),
                    uiv = box.getUIValue(),
                    p = profile.properties,
                    k = p.activeMode=='row'?'CELLS':'CELL',
                    getN = function(k,i){return profile.getSubNode(k,i)},
                    getI = function(i){
                        var map1=profile.rowMap2;
                        if(p.activeMode=='row')
                            return map1[i];
                        else{
                            if(!i)return;
                            var r=i.split('|');
                            return _.get(profile.rowMap,[map1[r[0]],'_cells',r[1]]);
                        }
                    };

                if(p.selMode=='single'){
                    var itemId = getI(uiv);
                    if(uiv && itemId)
                        getN(k,itemId).tagClass('-checked',false);

                    itemId = getI(value);
                    if(itemId)
                        getN(k,itemId).tagClass('-checked');

                    //scroll
                    if(itemId){
                        var o = getN(k,itemId);
                        if(o){
                            var top = o.offsetTop(),
                            items = getN('SCROLL'),
                            sh=items.scrollHeight(),
                            st=items.scrollTop(),
                            hh=items.height()
                            ;
                            if(sh > hh)
                                if(top<st || top>st+hh)
                                    items.scrollTop(top);

                        }
                    }
                }else if(p.selMode=='multi'){
                    uiv = uiv?uiv.split(';'):[];
                    value = value?value.split(';'):[];
                    //check all
                    _.arr.each(uiv,function(o){
                        if(_.arr.indexOf(value,o)==-1)
                            getN(k, getI(o)).tagClass('-checked',false)
                    });
                    _.arr.each(value,function(o){
                        if(_.arr.indexOf(uiv,o)==-1)
                            getN(k, getI(o)).tagClass('-checked')
                    });
                }
            });
        },
        /*insert rows to dom
        arr is formatted properties
        pid,base are item id
        before: insert before?
        */
        _insertRowsToDom:function(profile, arr, pid, base, before){
            //if parent not open, return
            if(pid){
                var parent = profile.rowMap[pid];
                if(parent && !parent._created)return;
            }

            var obj,hw,
                hw=profile.getSubNode('HCELL0').width();
            //give width at here
            _.arr.each(arr,function(o){
                o._row0DfW = hw-o._layer*profile.properties.$subMargin;
                _.arr.each(o.cells,function(v,i){
                    v.width=v._col.width;
                })
            });

            //build dom
            var nodes = _.str.toDom(profile.buildItems('rows', arr));
            //get base dom
            if(!base){
                //no base add to parent
                if(pid){
                    obj = profile.getSubNode('SUB', pid);
                }else{
                    obj = profile.getSubNode('BODY');
                }
                if(before)
                    obj.prepend(nodes);
                else
                    obj.append(nodes);
            }else{
                //
                obj = profile.getSubNode('ROW', base);
                if(before)
                    obj.addPrev(nodes);
                else{
                    nodes.get().reverse();
                    obj.addNext(nodes);
                }
            }

            //add sub
            _.arr.each(arr,function(o){
                o.open=false;
            });

            //clear rows cache
            delete profile.$allrowscache;
        },
        _refreshHeader:function(header){
            var profile=this.get(0),
                pro=profile.properties,
                rows = _.copy(pro.rows),
                arr = profile.box._prepareHeader(profile, header),
                nodes = _.str.toDom(profile.buildItems('header', arr));

            pro.header = header;
            this.removeAllRows();
            profile.getSubNode('HCELL', true).remove(false);
            profile.getSubNode('HCELLS').append(nodes);
            this.insertRows(rows);
            profile.box._ajdustBody(profile);
        },
        //pid,base are id
        insertRows:function(arr, pid, base ,before){
            var c=this.constructor, profile=this.get(0), pro=profile.properties, row_m=profile.rowMap2, t;
            base = row_m[base];
            if(base){
                t=profile.rowMap[base];
                if(t)pid=t._pid;
            }
            //prepareData(add links)
            var rows = c._prepareItems(profile, arr, pid),
                tar,
                b=profile.rowMap;

            pid = row_m[pid];
            if(!pid)
                tar = (pro.rows || (pro.rows=[]));
            else
                tar = (b[pid].sub || (b[pid].sub=[]));
            if(!base)
                _.arr.insertAny(tar,arr, before?0:-1);
            else{
                var index = _.arr.subIndexOf(tar,'_serialId', base);
                _.arr.insertAny(tar,arr, before?index:(index+1));
            }

            //insert
            this._insertRowsToDom(profile, rows, pid, base, before);

            if(!pro.iniFold)
                profile.boxing()._toggleRows(rows, true);

            profile.box._asy(profile,false);
            return this;
        },
        //delete row according to id
        /*
            linb.UI.TreeGrid.getAll().removeRows(['2','5'])
        */
        removeRows:function(ids){
            var self=this,
                profile=self.get(0),
                p=profile.properties,
                cell=profile.cellMap,
                nodes=[],v;

            //get array
            ids = _.isArr(ids)?ids:[ids];
            _.arr.each(ids,function(id){
                //get item id
                if(!(id=profile.rowMap2[id]))return;

                //get row
                var row;
                if(row = profile.rowMap[id]){
                    var tdids = row._cells,
                        rowid = row.id,
                        temp;
                    //for sub delete
                    if(row.sub){
                        var arr=[];
                        _.arr.each(row.sub,function(o){
                            arr.push(o.id)
                        });
                        self.removeRows(arr);
                    }

                    ////delete and clear links
                    _.each(tdids,function(o,i){
                        //clear colMap/properties.header
                        delete cell[o]._col._cells[rowid];
                        //clear cellMap
                        delete cell[o];
                        profile.reclaimSubId(o.slice(2), 'cell');
                    });

                    //clear properties.row array
                    if(temp= row._pid?(temp=profile.rowMap[profile.rowMap2[row._pid]])?temp.sub:null:profile.properties.rows)
                        _.filter(temp,function(o){
                            return o._serialId != id;
                        });

                    //clear profile.rowMap2
                    delete profile.rowMap2[rowid];
                    //clear rowMap
                    delete profile.rowMap[id];

                    nodes.push(profile.getSubNode('ROW', id).get(0));
                }
                    profile.reclaimSubId(id.slice(2), 'row');
            });
            // clear value
            if(v=p.value){
                if((v=v.split(';')).length>1){
                    _.filter(v,function(o){
                        return _.arr.indexOf(arr,o)==-1;
                    });
                    p.value=v.join(';');
                }else{
                    if(_.arr.indexOf(arr,p.value)!=-1)
                        p.value=null;
                }
            }
            linb(nodes).remove();
            profile.box._asy(profile,false);
            return self;
        },
        removeAllRows:function(){
            var profile=this.get(0);
            for(var i in profile.cellMap)
                profile.reclaimSubId(i.slice(2), 'cell');
            for(var i in profile.rowMap)
                profile.reclaimSubId(i.slice(2), 'row');
            _.each(profile.colMap,function(o){
                o._cells={};
            });

            profile.rowMap={};
            profile.cellMap={};
            profile.rowMap2={};

            profile.properties.rows.length=0;

            profile.getSubNode('BODY').empty();
            profile.getSubNode('SCROLL').scrollTop(0).scrollLeft(0);

            return this;
        },

        updateCellByRowCol:function(rowId, colId, hash){
            var t,self=this,con=self.constructor;
            if(t=con._getCellId(self.get(0), rowId, colId))
                con._updCell(self.get(0), t, hash);
            return self;
        },
        updateCell:function(cellId, hash){
            var self=this;
            self.constructor._updCell(self.get(0),cellId,hash);
            return self;
        },
        _toggleRows:function(rows, expend){
            var self=this;
            if(rows && rows.length)
                _.arr.each(rows,function(o){
                    if(o.sub && o.sub.length && !o.iniFold && !o._checked)
                        self.toggleRow(o.id, expend);
                });
        },
        toggleRow:function(id, expend){
            var profile = this.get(0),
            row = profile.rowMap[profile.rowMap2[id]];
            if(row && !row._checked)
                profile.box._setSub(profile, row, expend);
        },
        editCellbyRowCol:function(rowId, colId){
            var profile=this.get(0),con=profile.box;
            return con._editCell(profile, con._getCellId(profile, rowId, colId));
        },
        getCellbyRowCol:function(rowId, colId){
            var profile=this.get(0),v;
            v=_.get(profile.rowMap,[profile.rowMap2[rowId], '_cells',colId]);
            return v?profile.cellMap[v]:null;
        },
        getRowbyRowId:function(rowId){
            var profile=this.get(0),v=profile.rowMap2[rowId];
            return v?profile.rowMap[v]:null;
        },
        resetGridValue:function(){
            return this.each(function(profile){
                _.each(profile.cellMap,function(v){
                    v._$value=v.value;
                });
                profile.getSubNode('CELLA',true).removeClass('ui-dirty');
            })
        },
        resetRowValue:function(rowId){
            var profile=this.get(0),row=this.getRowbyRowId(rowId),arr=[];
            _.each(row.cells,function(o){
                if(o._$value!==o.value){
                    o._$value=o.value;
                    arr.push(profile.getSubNode('CELLA',o._serialId).get(0));
                }
            });
            linb(arr).removeClass('ui-dirty');
        },
        showColumn:function(colId, flag){
            return this.each(function(profile){
                var map=profile.colMap2,
                    cols=profile.colMap,
                    col,
                    sid,
                    cells,
                    n=[];
                if(col=cols[sid=map[colId]]){
                    n.push(profile.getSubNode('HCELL',sid).get(0));
                    _.each(col._cells,function(id){
                        n.push(profile.getSubNode('CELL',id).get(0));
                    });
                    linb(n).css('display',(col.visibility=(flag===false?false:true))?'':'none');
                }
            });
        }
    },
    Initialize:function(){
        this.addTemplateKeys(['ALT','PROGRESS']);
    },
    Static:{
        Templates:{
            tagName : 'div',
            style:'{_style}',
            BORDER:{
                tagName : 'div',
                BOX:{
                    tagName:'div',
                    HEADER:{
                        $order:0,
                        tagName:'div',
                        style:"{showHeader}",
                        //for scroll performance
                        HI:{
                            tagName:'div',
                            style:'width:10000px;',
                            HCELLS:{
                                tagName:'div',
                                style:'height:{headerHeight}px;',
                                /*the first col (row handler) in table header*/
                                HCELL0:{
                                    $order:0,
                                    style:'{rowHandlerDisplay};width:{_row0DfW}px;',
                                    HCELL0A:{
                                        HHANDLER:{
                                            tagName:'div',
                                            style:'{colDDDisplay}'
                                        },
                                        ROWHANDLER:{
                                            tagName:'div',
                                            style:'{rowDDDisplay}'
                                        }
                                    }
                                },
                                OTHERHCELLS:{
                                    $order:1,
                                    tagName:'text',
                                    text:'{header}'
                                }
                            }
                        }
                    },
                    SCROLL:{
                        $order:1,
                        tagName:'div',
                        className:'ui-content ',
                        BODY:{
                            tagName:'div',
                            text:'{rows}'
                        }
                    },
                    FOOTER:{
                        $order:2
                    },
                    COLLIST:{
                        tagName:'div'
                    }
                }
            },
            $dynamic : {
                /*the other header in table header*/
                header:{
                    HCELL:{
                        className:'{headerClass}',
                        style:"width:{width}px;{headerStyle}",
                        HCELLA:{
                            text:"{caption}",
                            SORT:{
                                style:'{sortDisplay}'
                            },
                            HHANDLER : {
                                $order:2,
                                tagName:'div',
                                style:'{colDDDisplay}'
                            }
                        }
                    }
                },
                rows:{
                    ROW:{
                        tagName:'div',
                        PREVIEW:{
                            $order:1,
                            tagName:'div',
                            style:'{previewDisplay}',
                            text:'{preview}'
                        },
                        CELLS:{
                            $order:2,
                            tagName:'div',
                            className:'{rowCls} {rowClass}',
                            style:'height:{rowHeight}px;{rowStyle}',
                            FIRSTCELL:{
                                $order:0,
                                style:'{rowHandlerDisplay};width:{_row0DfW}px;',
                                FIRSTCELLA:{
                                    TOGGLE:{$order:1,
                                        className:'uicmd-toggle',
                                        style:'{display}'
                                    },
                                    ROWHANDLER:{
                                        tagName:'div',
                                        style:'{rowDDDisplay}'
                                    },
                                    FIRSTCELLNO:{
                                        text:' '
                                    }
                                }
                            },
                            OTHERCELLS:{
                                tagName:'text',
                                $order: 1,
                                text:'{caption}{cells}'
                            }
                        },
                        SUB:{
                            $order:3,
                            tagName:'div'
                        },
                        SUMMARY:{
                            $order:4,
                            tagName:'div',
                            style:'{summaryDisplay}',
                            text:'{summary}'
                        }
                    }
                },
                'rows.cells':function(profile,template,v,tag,result){
                    var me=arguments.callee,map=me._m||(me._m={'checkbox':'.checkbox','button':'.button','progress':'.progress'});
                    linb.UI.$doTemplate(profile,template,v,tag+(map[v.type]||'.input'),result)
                 },
                'rows.cells.input':{
                    CELL:{
                        style:'width:{width}px;{cellDisplay};{cellStyle}',
                        className:'{cellCls} {cellClass}',
                        CELLA:{
                            tagName:'a',
                            style:'{bgcolor};{color};',
                            href :linb.$href,
                            tabindex: '{_tabindex}',
                            text:"{caption}"
                        }
                    }
                },
                'rows.cells.button':{
                    CELL:{
                        style:'width:{width}px;{cellDisplay};{cellStyle}',
                        className:'{cellCls} {cellClass}',
                        CELLA:{
                            tagName:'button',
                            tabindex: '{_tabindex}',
                            text:"{caption}"
                        }
                    }
                },
                'rows.cells.checkbox':{
                    CELL:{
                        style:'width:{width}px;{cellDisplay};{cellStyle}',
                        className:'{cellCls} {cellClass}',
                        CELLA:{
                            tagName:'a',
                            href :linb.$href,
                            tabindex: '{_tabindex}',
                            CHECKBOX:{
                                className:'{checkboxCls}'
                            }
                        }
                    }
                },
                'rows.cells.progress':{
                    CELL:{
                        style:'width:{width}px;{cellDisplay};{cellStyle}',
                        className:'{cellCls} {cellClass}',
                        CELLA:{
                            tagName:'a',
                            href :linb.$href,
                            tabindex: '{_tabindex}',
                            PROGRESS:{
                                tagName:'div',
                                style:'width:{progress};',
                                text:'{caption}'
                            }
                        }
                    }
                }
            }
        },
        Appearances:{
            KEY:{
                //in firefox, a can focused with display:block
                display:'block',
                position:'absolute',
                overflow:'hidden'
            },
            BOX:{
                display:'block',
                position:'relative',
                overflow:'hidden'
            },

            HEADER:{
                background:  linb.UI.$bg('head.gif', ' #EBEADB repeat-x left bottom'),
                position:'relative',
                overflow:'hidden'
            },
            HI:{
                position:'relative'
            },
            SCROLL:{
                overflow:'auto',
                position:'relative'
            },
            COLLIST:{
                position:'absolute',
                'z-index':'10',
                left:0,
                top:0,
                cursor:'pointer',
                visibility:'hidden',
                background:  linb.UI.$bg('collist.gif', ' #EBEADB no-repeat center bottom'),
                border:'1px solid',
                'border-color':  '#fff #ACA899 #ACA899 #fff'
            },
            BODY:{
                overflow:'visible',
                position:'absolute',
                'background-color':' #fff',
                left:0,
                top:'0',
                'font-size':0,
                'line-height':0,
                'border-bottom': '1px solid #ACA899'
            },
            'SORT, SORT-checked':{
                width:'15px',
                height:'15px'
            },
            SORT:{
                background: linb.UI.$bg('cmds.gif', ' no-repeat -191px top', true),
                position:'absolute',
                right:'2px',
                bottom:'2px'
            },
            'HCELL-mouseover SORT':{
                $order:1,
                'background-position': '-191px -15px'
            },
            'HCELL-mousedown SORT':{
                $order:2,
                'background-position': '-191px -30px'
            },
            'SORT-checked':{
                $order:3,
                'background-position': '-206px top'
            },
            'HCELL-mouseover SORT-checked':{
                $order:4,
                'background-position': '-206px -15px'
            },
            'HCELL-mousedown SORT-checked':{
                $order:5,
                'background-position': '-206px -30px'
            },
            HHANDLER:{
                position:'absolute',
                //if set z-index, disappearing in opera
                //'z-index':'10',
                background: linb.browser.ie?'url('+linb.ini.file_bg+')':null,
                width:'4px',
                top:'0',
                right:'0',
                height:'100%',
                cursor:'e-resize',
                'font-size':0,
                'line-height':0
            },
            'HCELLS, CELLS':{
                //for ie6 height change trigger
                'overflow-y': linb.browser.ie6 ?'hidden':'',
                position:'relative',
                'white-space': 'nowrap',
                'font-size':'12px',
                'line-height':'18px'
            },
            HCELLS:{
                'padding-bottom':'2px'
            },
            'CELLS-group':{
                $order:1,
                'font-weight':'bold',
                color:'#3764A0',
                'border-right': '1px solid #ACA899'
            },
            'PREVIEW,SUMMARY':{
                position:'relative',
                display:'none',
                'padding-left':'16px',
                'border-right': '1px solid #ACA899'
            },
            PREVIEW:{
                'border-bottom': '1px dashed #ACA899'
            },
            SUMMARY:{
                'border-top': '1px dashed #ACA899'
            },
           'CELLS-mouseover':{
                $order:4,
                'background':linb.UI.$bg('row-over.gif', ' #D9E8FB repeat-x left top')
            },
            'CELL-disabled':{
                 $order:8,
                 'background-color':'#EBEADB'
            },
            'CELL-disabled CELLA':{
                 $order:8,
                 color:'#999'
            },
            'CELLS-active, CELL-active':{
                 $order:5,
                 background:linb.UI.$bg('row-active.gif', ' #FDFDFD repeat-x left top')
            },
            'CELLS-checked, CELL-checked':{
                 $order:6,
                background:linb.UI.$bg('row-checked.gif', ' #A7F2FE repeat-x left top')
            },
            'HCELL0, FIRSTCELL, GROUPCAP':{
               height:'100%',
                'font-weight':'bold',
                'font-size':'12px',
                'line-height':'20px',
                'vertical-align':'top'
            },
            FIRSTCELL:{
                'padding-left':'1px',
                'padding-right':'1px'
            },
            'HCELL0A, FIRSTCELLA':{
                '-moz-box-flex':'1',
                '-moz-user-select':'none',
                display:'block',
                position:'relative',
                overflow:'hidden',
                height:'100%'
            },
            FIRSTCELLA:{
                'text-align': 'left',
                'padding-left':'4px'
            },
            TDFCAPTION:{
                'font-weight':'bold'
            },
            ROWHANDLER:{
                position:'absolute',
                'height':'4px',
                left:'0px',
                width:'100%',
                bottom:'0px',
                cursor:'n-resize',
                'z-index':10,
                'font-size':0,
                'line-height':0
            },
            'HCELL0, HCELL':{
               height:'100%',
               'border-left':'1px solid #fff',
               'border-right':'1px solid #ACA899',
               padding:0,
               'vertical-align':'top',
                'font-size':'12px',
                'line-height':'14px'
            },
            'HCELL-mouseover':{
                background:  linb.UI.$bg('head-over.gif', ' #FAF9F4 repeat-x left bottom')
            },
            ROW:{
                '_position':'relative',
                zoom:linb.browser.ie?1:null,
                'border-top': '1px solid #ACA899',
                'font-size':0,
                'line-height':0
            },
           CELL:{
                //firefox:height:100% without overflow:hidden
                'padding-left':'1px',
                'border-right':'1px solid #ACA899',
                height:'100%',
                position:'relative',
                overflow:linb.browser.ie6?'hidden':'',
                'font-size':'12px',
                'line-height':'20px',
                'vertical-align':'top'
            },
            'ALT':{
                'background-color':'#f1f1f1'
            },
            //
            'CELL-label a':{
                color: '#000'
            },
            'CELL-input':{
            },
            'CELL-number':{
                'text-align':'right'
            },
            'CELL-checkbox':{
                'text-align':'center'
            },
            'CELL-button CELLA':{
                width:'100%'
            },
            'CELL-mouseover':{
                $order:5,
                background:linb.UI.$bg('row-over.gif', ' #D9E8FB repeat-x left top')
            },
            HCELLA:{
                position:'relative'
            },
            'HCELLA, CELLA':{
                display:'block',
                overflow:'hidden',
                '-moz-box-flex':'1',
                '-moz-user-select':'none',
                height:'100%',
                //ie need this
                width:linb.browser.ie?'100%':''
            },
            'CELLA-inline':{
                $order:5,
                display:'inline',
                '-moz-box-flex':0
            },
            'HCELLA, HCELL0A':{
                'text-align': 'center',
                'font-weight': 'bold'
            },
            CHECKBOX:{
               cursor:'pointer',
               width:'16px',
               height:'16px',
               background: linb.UI.$bg('cmds.gif', ' no-repeat -112px top', true)
            },
            PROGRESS:{
                height:'100%',
                'background-color':'#00ffff',
                'text-align':'center',
                overflow:'visible',
                opacity:0.7,
                '*filter':'alpha(opacity=70)'
            },
            'CELL-mouseover CHECKBOX':{
                $order:1,
                'background-position': '-112px -17px'
            },
            'CELL-mousedown CHECKBOX':{
                $order:2,
                'background-position': '-112px -34px'
            },
            'CHECKBOX-checked':{
                $order:3,
                'background-position': '-96px top'
            },
            'CELL-mouseover CHECKBOX-checked':{
                $order:4,
                'background-position': '-96px -17px'
            },
            'CELL-mousedown CHECKBOX-checked':{
                $order:5,
                'background-position': '-96px -34px'
            },
            SUB:{
                //for ie bug: relative , height='auto' will disppear
                '*zoom':'1',
                '_position':'relative',
                'border-left': '1px solid #ACA899',
                'margin-left':'15px',
                display:'none'
            },
            FIRSTCELLNO:{
                'font-weight':'normal'
            }
        },
        Behaviors:{
            HoverEffected:{TOGGLE:'TOGGLE', HCELL:'HCELL'},
            ClickEffected:{TOGGLE:'TOGGLE', CELL:'CELL', HCELL:'HCELL'},
            DropableKeys:['SCROLL','CELLS','TOGGLE'],
            DragableKeys:['FIRSTCELL'],

            onSize:function(profile,e){
                var o = profile.root;
                linb.UI.$tryResize(profile, e.width?o.width():null, o.height?o.height():null);
            },
            HCELL0A:{
                onClick:function(profile,e,src){
                    profile.getSubNode('COLLIST').onClick(true);
                }
            },
            //key navigator
            SCROLL:{
                onScroll:function(profile, e, src){
                    var l=src.scrollLeft||0;
                    if(profile.$sl!=l)
                        profile.getSubNode('HEADER').get(0).scrollLeft=profile.$sl=l;
                }
            },
            //colomn resizer
            HHANDLER:{
                onMousedown:function(profile, e, src){
                    var p=profile.properties,
                    o=linb(src),
                    minW =o.parent(2).width()-p._minColW,
                    scroll = profile.getSubNode('SCROLL'),
                    maxW = scroll.offset().left + scroll.width() - linb.Event.getPos(e).left - 4,
                    id = profile.getSubId(src.id),
                    col = profile.colMap[id];

                    if(p.disabled)return false;
                    if(col && col.disabled)return false;

                    o.startDrag(e, {
                        horizontalOnly:true,
                        dragType:'blank',
                        dragDefer:2,
                        maxLeftOffset:minW,
                        maxRightOffset:maxW,
                        targetReposition:false
                    });
                    linb([src.parentNode.parentNode]).onMouseout(true,{$force:true}).onMouseup(true);
                },
                onDragbegin:function(profile, e, src){
                    linb.DragDrop.getProfile().proxyNode
                    .css({
                        height:profile.root.height()+'px',
                        width:'4px',
                        backgroundColor:'#ddd',
                        cursor:'e-resize'
                    });
                },
                onDrag:function(profile, e, src){
                    var d=linb.DragDrop,p=d.getProfile(),b=0;
                    if(p.x<=p.restrictedLeft || p.x>=p.restrictedRight)b=true;
                    if(b){
                        if(!profile._limited){
                            p.proxyNode.css('backgroundColor','#ff6600');
                            profile._limited=true;
                        }
                    }else{
                        if(profile._limited){
                            p.proxyNode.css('backgroundColor','#ddd');
                            profile._limited=0;
                        }
                    }
                },
                onDragstop:function(profile, e, src){
                    var o=linb(src).parent(2),
                        w=o.width() + linb.DragDrop.getProfile().offset.x,
                        col=profile.colMap[profile.getSubId(src.id)];
                    o.width(w);
                    if(col)col.width=w;

                    //collect cell id
                    var ids=[],ws=[];
                    if(_.str.startWith(src.parentNode.id,profile.keys.HCELL0A))
                        profile.box._asy0(profile,w);
                    else{
                        var cells = profile.colMap[profile.getSubId(src.id)]._cells;
                        _.each(cells,function(o){
                            ids.push(profile.getSubNode(profile.keys.CELL,o).id())
                        });
                        linb(ids).width(w);
                    }

                    profile.getSubNode('SCROLL').onScroll();
                    profile.box._ajdustBody(profile);
                    profile._limited=0;
                },
                onClick:function(){
                    return false
                },
                onDblclick:function(profile, e, src){
                    //for row0
                    if(profile.getKey(src.parentNode.id)==profile.keys['HCELL0A']){
                        profile.box._asy0(profile,true);
                        return;
                    }
                    //for other rows
                    var p = profile.properties,
                        sid = profile.getSubId(src.id),
                        header = profile.colMap[sid],
                        cells=header._cells,
                        cls=profile.getClass('CELLA','-inline'),
                        n,ns=[],ws=[],w;
                    _.each(cells,function(o){
                        n=profile.getSubNode('CELLA',o);
                        ns.push(n.get(0));
                        ws.push(n.addClass(cls).width());
                    });
                    ws.push(p._minColW);
                    w=parseInt(Math.max.apply(null,ws));
                    if(w>p._maxColW)w=p._maxColW;
                    linb(ns).parent().width(w);
                    linb(src.parentNode.parentNode).width(header.width=w);
                    linb(ns).removeClass(cls);

                    profile.box._ajdustBody(profile);
                    return false;
                }
            },
            //row resizer
            ROWHANDLER:{
                onMousedown:function(profile, e, src){
                    var p=profile.properties,
                    row = profile.rowMap[profile.getSubId(src.id)],
                    o=linb(src),
                    minH =o.parent(3).height()-p._minRowH,
                    scroll = profile.getSubNode('SCROLL'),
                    maxH = scroll.offset().top + scroll.height() - linb.Event.getPos(e).top - 4;

                    if(p.disabled || (row&&row.disabled))return false;
                    o.startDrag(e, {
                        verticalOnly:true,
                        dragType:'blank',
                        dragDefer:2,
                        maxTopOffset:minH,
                        maxBottomOffset:maxH ,
                        targetReposition:false
                    });
                    linb([src.parentNode.parentNode]).onMouseout(true,{$force:true}).onMouseup(true);
                },
                onDragbegin:function(profile, e, src){
                    linb.DragDrop.getProfile().proxyNode
                    .css({
                        width:profile.root.width()+'px',
                        height:'4px',
                        backgroundColor:'#ddd',
                        cursor:'n-resize'
                    });
                },
                onDrag:function(profile, e, src){
                    var d=linb.DragDrop,p=d.getProfile(),b=0;
                    if(p.y<=p.restrictedTop || p.y>=p.restrictedBottom)b=true;
                    if(b){
                        if(!profile._limited){
                            p.proxyNode.css('backgroundColor','#ff6600');
                            profile._limited=true;
                        }
                    }else{
                        if(profile._limited){
                            p.proxyNode.css('backgroundColor','#ddd');
                            profile._limited=0;
                        }
                    }
                },
                onDragstop:function(profile, e, src){
                    var o=linb(src).parent(3),
                        h=o.height()+linb.DragDrop.getProfile().offset.y,
                        row = profile.rowMap[profile.getSubId(src.id)]

                    //for ie's weird bug
                    if(linb.browser.ie && h%2==1)h+=1;
                    o.height(h);
                    if(_.str.startWith(src.parentNode.id,profile.keys.HCELL0A)){
                        profile.properties.headerHeight=h;
                        linb.UI.$tryResize(profile,null,profile.root.height());
                    }else
                        row.height=h;
                    profile._limited=0;
                },
                onDblclick:function(profile, e, src){
                    var p = profile.properties,
                        sid = profile.getSubId(src.id),
                        row = profile.rowMap[sid],
                        cells=profile.getSubNode('CELLS', sid),
                        h = cells.height('auto').height();
                    cells.height(row.height=h);
                    return false;
                }
            },
            //mark click for tree build
            TOGGLE:{
                onClick:function(profile, e, src){
                    var
                    p = profile.properties,
                    row = profile.rowMap[profile.getSubId(src.id)]
                    ;
                    if(p.disabled || row.disabled)return false;
                    if(!row.sub)return false;

                    profile.box._setSub(profile, row, !row._checked);

                    return false;
                }
            },
            //HCELL handler dragdrop
            HCELL:{
                onClick:function(profile, e, src){
                    var p=profile.properties,
                    id = profile.getSubId(src.id),
                    col = profile.colMap[id];
                    linb(src).first().focus();
                    if(p.disabled || col.disabled)return false;
                    if(!(('colSortable' in col)?col.colMovable:p.colSortable))return;

                    var order = col._order || false,
                    type = col.type || 'input',
                    index = _.arr.indexOf(p.header,col),
                    me=arguments.callee,
                    fun = me.fun||(me.fun = function(profile, root, index, type, order){
                        var rows,parent,self=arguments.callee;
                        if(root){
                            rows = root.sub;
                            parent = profile.getSubNode('SUB', root._serialId).get(0);
                        }else{
                            root={_created:true};
                            rows = profile.properties.rows;
                            parent = profile.getSubNode('BODY').get(0);
                        }
                        //sor sub first
                        var a1=[], a2=[], a3=[] ,a4=[], t,ff;
                        _.arr.each(rows,function(row){
                            if(row.sub && row.sub.length>1)
                                self(profile, row, index, type, order);
                             //for short input
                             a1[a1.length]=(t=row.cells)?(t=t[index])?t.value:'':row[index];
                             a2[a2.length]=a2.length;
                        });
                        switch(type){
                            case 'number':
                                ff=function(n){return parseFloat(n)||0};
                                break;
                            case 'date':
                                ff=function(n){return new Date(n).getTime()||0};
                                break;
                            default:
                                ff=function(n){return n||''};
                        }
                        a2.sort(function(x,y){
                           x=ff(a1[x]); y=ff(a1[y]);
                           return (x>y?1:x==y?0:-1)*(order?1:-1);
                        });
                        //sort memory array
                        //sort domnode
                        var b = root._created, bak=_.copy(rows), c;
                        if(b)
                            a1=parent.childNodes;
                        _.arr.each(a2,function(o,i){
                            rows[i]=bak[o];
                            if(b)a3[i]=a1[o];
                        });
                        if(b){
                            _.arr.each(a3,function(o,i){
                                parent.appendChild(o);
                                if(i%2)
                                    a4[a4.length]=o;
                            });

                        }

                    });

                    fun(profile, '', index, type, order);

                    //show sort mark
                    profile.getSubNode('SORT', true).css('display','none');
                    var node = profile.getSubNode('SORT', col._serialId).css('display','');
                    node.tagClass('-checked', !(col._order = !col._order));

                    profile.box._asy(profile,false);

                    //clear rows cache
                    delete profile.$allrowscache;
                    return false;
                },
                onMousedown:function(profile, e, src){
                    var p=profile.properties;
                    if(p.disabled || !p.colMovable)return;
                    var col=profile.colMap[profile.getSubId(src.id)];
                    if(!(('colMovable' in col)?col.colMovable:1))return;

                    //fire before event
                    if(false === profile.boxing().beforeColDrag(profile, col.id))return;

                    var pos=linb.Event.getPos(e),
                        o = linb(src),
                        itemId = profile.getSubId(src.id);

                    o.startDrag(e,{
                        dragType:'icon',
                        shadowFrom:src,
                        dragCursor:'pointer',
                        targetLeft:pos.left+12,
                        targetTop:pos.top+12,
                        targetReposition:false,
                        dragDefer: 2,
                        dragKey:profile.$id + ":col",
                        dragData:o.id()
                    });
                },
                onDragbegin:function(profile, e, src){
                    linb(src).onMouseout(true,{$force:true}).onMouseup(true);
                },
                beforeMouseover:function(profile, e, src){
                    if(false===profile.box._colDragCheck(profile,src))return;
                    linb.DragDrop.setDropElement(src).setDropFace(src,'move');
                },
                beforeMouseout:function(profile, e, src){
                    linb.DragDrop.setDropElement(null).setDropFace(null,'none');
                    if(false===profile.box._colDragCheck(profile,src))return;
                },
                onDrop:function(profile, e, src){
                    if(false===profile.box._colDragCheck(profile,src))return;

                    //check dragData
                    var p=profile.properties,
                    data=linb.DragDrop.getProfile().dragData,
                    fromId = data && profile.getSubId(data),
                    toId = profile.getSubId(src.id);

                    //get properties
                    var
                    map=profile.colMap,
                    fromTh=map[fromId],
                    toTh=map[toId]
                    ;

                    //fire before event
                    if(false === profile.boxing().beforeColMoved(profile,fromTh.id, toTh.id))return;

                    //remove dragover appearance
                    linb.DragDrop.setDropFace(src,'none');

                    //get index in HCELL array
                    var fromIndex = _.arr.subIndexOf(p.header,'_serialId',fromId),
                    toIndex = _.arr.subIndexOf(p.header,'_serialId',toId)
                    ;
                    //if same or same position, return
                    if(fromIndex===toIndex|| fromIndex===toIndex-1)return;


                    //reposition header dom node
                    profile.getSubNode('HCELL', toId).addPrev(linb.DragDrop.getProfile().dragData);
                    //reposition cell dom nodes
                    _.each(toTh._cells, function(o,i){
                        profile.getSubNode('CELL',o).addPrev(profile.getSubNode('CELL',fromTh._cells[i]));
                    });

                    //update memory
                    //HCELL position
                    //keep refrence, and remove
                    var temp=p.header[fromIndex];
                    _.arr.removeFrom(p.header,fromIndex);
                    //insert to right pos
                    _.arr.insertAny(p.header,temp,toIndex);
                    //cell position rowMap
                    var allitems = profile.queryItems(p.rows, true, true);
                    _.arr.each(allitems,function(o){
                        //for those non-prepared data
                        o=o.cells?o.cells:o;
                        if(!o || o.constructor!=Array)return;
                        temp=o[fromIndex];
                        _.arr.removeFrom(o,fromIndex);
                        _.arr.insertAny(o,temp,toIndex);
                    });

                    //fire after event
                    profile.boxing().afterColMoved(profile, fromTh.id, toTh.id);

                    //clear rows cache
                    delete profile.$allrowscache;
                },
                onMouseover:function(profile,e,src){
                    if(profile.properties.disabled || !profile.properties.colHidable)return;
                    var col=profile.colMap[profile.getSubId(src.id)];
                    if(!(('colHidable' in col)?col.colHidable:1))return;

                    _.resetRun(profile.$id+':collist',null);
                    var region={},
                        o=linb([src]),
                        pos=o.offset(null,profile.getSubNode('BOX')),
                        size=o.cssSize();
                    if(size.width<16)return;
                    region.height=size.height;var col=profile.colMap[profile.getSubId(src.id)];
                    region.width=14;
                    region.left=pos.left;
                    region.top=pos.top;
                    profile.getSubNode('COLLIST').cssRegion(region).css('visibility','visible');
                },
                onMouseout:function(profile,e,src){
                    if(profile.properties.disabled || !profile.properties.colHidable)return;
                    var col=profile.colMap[profile.getSubId(src.id)];
                    if(!(('colHidable' in col)?col.colHidable:1))return;

                    _.resetRun(profile.$id+':collist',function(){
                        profile.getSubNode('COLLIST').css({visibility:'hidden',left:0,top:0});
                    });
                }
            },
            COLLIST:{
                onMouseover:function(profile,e,src){
                    _.resetRun(profile.$id+':collist',null);
                },
                onMouseout:function(profile,e,src){
                    _.resetRun(profile.$id+':collist',function(){
                        linb([src]).css('visibility','hidden');
                    });
                },
                onClick:function(profile,e,src){
                    if(!profile.properties.colHidable)return;
                    if(!profile.$col_pop){
                        var items=[],pop;
                        _.arr.each(profile.properties.header,function(o){
                            if(('colHidable' in o)?o.colHidable:1)
                                items.push({id:o.id,caption:o.caption,type:'checkbox',value:true});
                        });
                        pop=profile.$col_pop=new linb.UI.PopMenu({hideAfterClick:false,items:items}).render(true);
                        pop.onMenuSelected(function(p,i,s){
                            var b=1;
                            _.arr.each(p.properties.items, function(o){
                                if(o.value!==false)
                                    return b=false;
                            });
                            if(!b){
                                profile.boxing().showColumn(i.id, i.value);
                                profile.box._ajdustBody(profile);
                            }else{
                                p.getSubNodeByItemId('CHECKBOX',i.id).tagClass('-checked');
                                i.value=true;
                            }
                        })
                    }
                    profile.$col_pop.pop(src);
                }
            },
            CELLS:{
                afterMouseover:function(profile, e, src){
                    if(profile.properties.activeMode=='row')
                        linb([src]).tagClass('-mouseover');
                },
                afterMouseout:function(profile, e, src){
                    if(profile.properties.activeMode=='row')
                        linb([src]).tagClass('-mouseover',false);
                },
                onDblclick:function(profile, e, src){
                    var p = profile.properties,
                        row = profile.rowMap[profile.getSubId(src.id)];
                    if(p.disabled || row.disabled)return false;
                    if(profile.onDblClickRow)profile.boxing().onDblClickRow(profile, row, e, src);
                    return false;
                },
                onClick:function(profile){
                    var p = profile.properties,
                        row = profile.rowMap[profile.getSubId(this.id)];
                    if(row.group)
                        profile.getSubNode('TOGGLE',row._serialId).onClick();
                }
            },
            CELL:{
                afterMouseover:function(profile, e, src){
                    if(profile.properties.activeMode=='cell')
                        linb([src]).tagClass('-mouseover');
                },
                afterMouseout:function(profile, e, src){
                    if(profile.properties.activeMode=='cell')
                        linb([src]).tagClass('-mouseover',false);
                }
            },
            CELLA:{
                onDblclick:function(profile, e, src){
                    var cell = profile.cellMap[profile.getSubId(src.id)];
                    if(!cell)return;
                    var box=profile.box,
                        getPro=box.getCellPro,
                        type=getPro(profile, cell, 'type'),
                        disabled=getPro(profile, cell, 'disabled'),
                        editable=getPro(profile, cell, 'editable');

                    if(!disabled && (!editable || (type=='button'||type=='label')))
                        profile.boxing().onDblClickCell(profile, cell, e, src);
                },
                onClick:function(profile, e, src){
                    var cell = profile.cellMap[profile.getSubId(src.id)];
                    if(!cell)return;
                    var p = profile.properties,
                        box=profile.box,
                        getPro=box.getCellPro,
                        type=getPro(profile, cell, 'type'),
                        disabled=getPro(profile, cell, 'disabled'),
                        event=getPro(profile, cell, 'event'),
                        mode = p.activeMode, 
                        editable=getPro(profile, cell, 'editable'),
                        id;

                    if(!disabled && (!editable || (type=='button'||type=='label'))){
                        if(typeof event == 'function' && false===event.call(profile._host||profile, profile, cell, null,null,e,src)){}
                        else
                            profile.boxing().onClickCell(profile, cell, e, src);
                        if(type=='button')
                            return false;
                    }
                    if(!disabled &&type=='checkbox')
                        if(editable)
                            box._updCell(profile, cell, !cell.value);
                    if(!p.editable){
                        if(mode=='cell'){
                            if(getPro(profile, cell, 'disabled'))
                                return false;
                            id = linb(src).parent().id();
                            box._sel(profile, 'cell', src, id, e);
                        }else if(mode=='row'){
                            if(p.disabled || cell._row.disabled)
                                return false;
                            id = linb(src).parent(2).id();
                            box._sel(profile, 'row', src, id, e);
                        }
                    }
                    //ie6: if 'a' has a child 'span', you click 'span' will not tigger to focus 'a'
                    src.focus();
                    return false;
                },
                onFocus:function(profile, e, src){
                    var p = profile.properties,
                        box=profile.box,
                        getPro=box.getCellPro,
                        cell = profile.cellMap[profile.getSubId(src.id)],
                        mode = p.activeMode, id;

                    if(getPro(profile, cell, 'editable')){
                        if(getPro(profile, cell, 'disabled'))
                            return false;
                        box._editCell(profile, cell._serialId);
                        _.asyRun(function(){
                            linb([src.parentNode,src.parentNode.parentNode]).onMouseout(true,{$force:true});
                        });
                    }
                    if(!p.editable){
                        if(mode=='cell'){
                            id = linb(src).parent().id();
                            box._activeCell(profile, id);
                        }else if(mode=='row'){
                            id = linb(src).parent(2).id();
                            box._activeRow(profile, id);
                        }
                    }
                },
                onKeydown:function(profile, e, src){
                    var keys=linb.Event.getKey(e),
                        key = keys[0],
                        shift=keys[2],
                        cur = linb(src),
                        body = profile.getSubNode('BODY'),
                        first = body.nextFocus(true, true, false),
                        last = body.nextFocus(false, true, false);
                    switch(key){
                    //tab to next/pre
                    case 'tab':
                        if(shift){
                            if(src!=first.get(0)){
                                first.focus();
                                return false;
                            }
                        }else{
                            if(src!=last.get(0)){
                                last.focus();
                                return false;
                            }
                        }
                        break;
                    case 'left':
                        if(cur.get(0)==first.get(0))
                            last.focus();
                        else
                            cur.nextFocus(false);
                        return false;
                        break;
                    case 'right':
                        if(cur.get(0)==last.get(0))
                            first.focus();
                        else
                            cur.nextFocus();
                        return false;
                        break;
                    case 'up':
                        if(cur.get(0)==first.get(0)){
                            last.focus();
                            return;
                        }
                   case 'down':
                        //get no.
                        var count=1,
                            temp = cur.parent().get(0),
                            max=temp.parentNode.childNodes.length;
                        while(temp=temp.previousSibling)count++;

                        //get row
                        temp=cur.parent(2).get(0);

                        //get all rows(include header)
                        if(!profile.$allrowscache){
                            var all=profile.getSubNode('CELLS',true).get();
                            //filter dispaly==none
                            _.filter(all,function(o){
                                return !!o.offsetWidth;
                            });
                            profile.$allrowscache = all;
                        }

                        //get index
                        var index = _.arr.indexOf(profile.$allrowscache,temp),
                            rowLen = profile.$allrowscache.length;

                        //adjust index
                        if(key=='up'){
                            index--;
                            if(index==-1){
                                index = rowLen-1;
                                count--;
                                if(count==0)count=max;
                            }
                        }else{
                            index++;
                            if(index==rowLen){
                                index=0;
                                count++;
                                if(count==max+1)count=1;
                            }
                        }

                        //get node
                        node = linb(profile.$allrowscache[index]).first().next(count-1).first();
                        if(!node.isEmpty())
                            node.focus();
                        return false;
                        break;
                    }
                }
            },
            FIRSTCELL:{
                onClick:function(profile, e, src){
                    var p = profile.properties,
                        row = profile.rowMap[profile.getSubId(this.id)];
                    if(!row.group)
                        profile.getSubNode('TOGGLE',row._serialId).onClick();
                }
            }
        },
        DataModel:{
            listKey:null,
            tabindex:{
                action:function(value){
                    this.root.query('A').attr('tabIndex',value);
                }
            },
            selMode:{
                ini:'none',
                listbox:['single','none','multi']
            },
            dock:'fill',

            altRowsBg: {
                ini:false,
                action:function(value){
                    var ns=this;
                    if(ns.domNode){
                        var altCls = ns.getClass('ALT'),
                            nodes = ns.getSubNode('CELLS',true),alt,j;
                        nodes.removeClass(altCls);
                        if(value){
                            alt=[];
                            j=0;
                            nodes.each(function(o,i){
                                if(o.offsetHeight){
                                    o=linb([o]);
                                    if((j++)%2==1){
                                        if(!o.hasClass(altCls))o.addClass(altCls);
                                    }else{
                                        if(o.hasClass(altCls))o.removeClass(altCls);
                                    }
                                }
                            });
                            linb(alt).addClass(altCls);
                        }
                    }
                }
            },
            rowNumbered:{
                ini:false,
                action:function(value){
                    var ns=this;
                    if(ns.domNode){
                        var nodes = ns.getSubNode('FIRSTCELLNO',true),i=0,map=ns.rowMap,row,ol=0,l=0,a1=[],a2=[],tag='',temp;
                        nodes.each(function(o){
                                o.innerHTML='';
                                if(o.parentNode.offsetHeight){
                                    row=map[ns.getSubId(o.id)];
                                    l=row._layer;
                                    if(l>ol){
                                        a1.push(i);
                                        a2.push(tag);
                                        tag=tag+i+'.';
                                        i=0;
                                    }else if(l<ol){
                                        while(l<ol--){
                                            i=a1.pop();
                                            tag=a2.pop();
                                        }
                                    }
                                    i++;
                                    ol=l;
                                    o.appendChild(document.createTextNode(tag+i));
                                }
                        });
                    }
                }
            },
            editable:false,

            $subMargin:16,

            iniFold:true,
            animCollapse:false,

            left:0,
            top:0,
            position:'absolute',
            width:300,
            height:200,

            _minColW:5,
            _maxColW:300,
            _minRowH:20,
            _row0DfW: 32,
            showHeader:{
                ini:true,
                action:function(value){
                    this.getSubNode('HEADER').css('display',value?'':'none');
                }
            },
            headerHeight:{
                ini:20,
                action:function(v){
                    this.getSubNode('HCELLS').height(v);
                    linb.UI.$tryResize(this, this.root.width(), this.root.height());
                }
            },
            rowHeight:{
                ini:20,
                action:function(v){
                    this.getSubNode('CELLS', true).height(v);
                }
            },
            _colDfWidth: 80,

            rowHandler:{
                ini:true,
                action:function(value){
                    this.getSubNode('HCELL0').css('display',value?'':'none');
                    this.getSubNode('FIRSTCELL',true).css('display',value?'':'none');
                }
            },
            rowResizer:{
                ini:true,
                action:function(value){
                    this.getSubNode('ROWHANDLER',true).css('display',value?'':'none');
                }
            },

            colHidable:false,
            colResizer:{
                ini:true,
                action:function(value){
                    this.getSubNode('HHANDLER',true).css('display',value?'':'none');
                }
            },
            colSortable:{
                ini:true,
                action:function(value){
                    this.getSubNode('SORT',true).css('display',value?'':'none');
                }
            },
            colMovable:false,

            header:{
                ini:{},
                set:function(value){
                    return this.each(function(o){
                        if(o.domNode){
                            o.boxing()._refreshHeader(value);
                        }else
                            o.properties.header = value;
                    });
                }
            },
            rows:{
                //for default merge
                ini:{},
                set:function(value){
                    return this.each(function(o){
                        if(o.domNode)
                            o.boxing().removeAllRows().insertRows(value);
                        else
                            o.properties.rows = value;
                    });
                }
            },
            activeMode:{
                ini:'row',
                listbox:['row','cell'],
                action:function(value){
                    if(this.domNode){
                        var profile=this;
                        if(profile.$activeCell)
                            linb(profile.$activeCell).tagClass('-active',false);
                        if(profile.$activeRow)
                            linb(profile.$activeRow).tagClass('-active',false);
                    }
                }
            }
        },
        EventHandlers:{
            onGetContent:function(profile, row, callback, threadid){},
            onRowSelected:function(profile, row, src){},

            beforeColDrag:function(profile, colId){},
            beforeColMoved:function(profile, colId, toId){},
            afterColMoved:function(profile, colId, toId){},

            beforeRowActive:function(profile, row){},
            afterRowActive:function(profile, row){},
            beforeCellActive:function(profile, cell){},
            afterCellActive:function(profile, cell){},

            beforeIniEditor:function(profile, cell){},
            beforeCellUpdated:function(profile, cell, options){},
            afterCellUpdated:function(profile, cell, options){},

            onDblClickRow:function(profile, row, e, src){},
            onClickButton:function(profile, cell, proEditor, pos, e, src){},
            onClickCell:function(profile, cell, e, src){},
            onDblClickCell:function(profile, cell, e, src){}
        },
        RenderTrigger:function(){
            var ns=this, pro=ns.properties,ins=ns.boxing();
            ns.$cache_editor={};
            if(!pro.iniFold)
                ins._toggleRows(pro.rows, true);
            ns.box._asy(ns);
        },
        _asy:function(profile, flag){
            var pro=profile.properties,b=profile.boxing(),id=profile.$id;
            if(pro.altRowsBg)_.resetRun(id+"1",function(){b.setAltRowsBg(true,true)});
            if(pro.rowNumbered)_.resetRun(id+"2",function(){b.setRowNumbered(true,true)});
            if(flag!==false){
                if(pro.rowHandler)
                    this._asy0(profile);
                else
                    profile.box._ajdustBody(profile);
            }
        },
        _asy0:function(profile, flag){
            var pro=profile.properties,id=profile.$id,ww=pro.$subMargin,map=profile.rowMap;
            _.resetRun(id+"3",function(){
                var n,w,b,hcell=profile.getSubNode('HCELL0');
                if(typeof flag=='number')
                    w=flag;
                else{
                    _.arr.each(pro.rows,function(o){
                        if(o.sub){b=true;return false;}
                    });
                    //if it's a treegrid
                    if(b){
                        var ns=[],ws=[],
                            cells=profile.getSubNode('FIRSTCELLA',true),
                            cls=profile.getClass('CELLA','-inline');
                        cells.each(function(o){
                            if(o.parentNode.offsetWidth>0){
                                n=map[profile.getSubId(o.id)];
                                if(n){
                                    ns.push(o);
                                    ws.push(linb([o]).addClass(cls).width() + n._layer*ww);
                                }
                            }
                        });
                        ws.push(pro._minColW);
                        w=parseInt(Math.max.apply(null,ws))+ww;
                        linb(ns).removeClass(cls);
                        if(flag!==true && hcell.width()>w)
                            w=null;
                    }
                }

                //set width
                if(w){
                    hcell.width(w);
                    profile.getSubNode('FIRSTCELL',true).each(function(o){
                        n=map[profile.getSubId(o.id)];
                        o.style.width=w-n._layer*ww+'px';
                    });
                }
                profile.box._ajdustBody(profile);
            });
        },
        _onStartDrag:function(profile, e, src){
            var pos=linb.Event.getPos(e);
            profile.$_ond=src.parentNode;
            linb([src]).startDrag(e, {
                dragType:'icon',
                shadowFrom:src.parentNode,
                targetLeft:pos.left+12,
                targetTop:pos.top+12,
                dragCursor:'pointer',
                dragDefer:2,
                dragKey: profile.box.getDragKey(profile, src),
                dragData: profile.box.getDragData(profile, src)
            });
            return false;
        },
        _onDropTest:function(profile, e, src, key, data, item){
            var fid=data&&data.domId, tid=src.id, fp=data&&data.profile,t;
            if(fp && fp.$id==profile.$id){
                if(fid && profile.getSubId(fid)==profile.getSubId(tid))
                    return false;
                t=profile.$_ond;
                if(_.get(src,['parentNode','previousSibling'])==t)return false;
                do{
                    if(src==t)return false;
                }while(src && (src=src.parentNode) && src!==document && src!==window)
            }
        },
        _onDragstop:function(profile, e, src, key, data, item){
            delete profile.$_ond;
        },
        _onDrop:function(profile, e, src, key, data, item){
            linb.DragDrop.setDragIcon('none');
            if(!data.profile || !data.profile[profile.KEY])return;
            var k=profile.getKey(src.id),
                po=data.profile,
                ps=data.domId,
                oitem,
                ks=profile.keys,
                t=linb.absObj.$specialChars,
                b=profile.boxing(),

                orow= po.rowMap[po.getSubId(ps)],
                row= profile.rowMap[profile.getSubId(src.id)];

            //remove
            orow=_.clone(orow,function(o,i){return !t[(i+'').charAt(0)]});
            po.boxing().removeRows([orow.id]);

            //add
            if(k==ks.SCROLL)
                b.insertRows([orow], null, null, false);
            else if(k==ks.TOGGLE)
                b.insertRows([orow], row.id, null, false);
            else if(k==ks.CELLS)
                b.insertRows([orow], row._pid, row.id, true);
            return false;
        },

        _beforeSerialized:function(profile){
            var o=arguments.callee.upper.call(this, profile),
                pp=profile.properties,
                map=linb.absObj.$specialChars,
                t;
            o.properties.header = _.clone(pp.header, function(o,i){return !map[(i+'').charAt(0)]});
            o.properties.rows = _.clone(pp.rows, function(o,i){return !map[(i+'').charAt(0)]});
            if(o.properties.header.length===0)delete o.properties.header;
            if(o.properties.rows.length===0)delete o.properties.rows;
            return o;
        },
        _clsCache:{},

        _colDragCheck:function(profile, src){
            var dd = linb.DragDrop.getProfile(), key=dd.dragKey, data=dd.dragData,
                col=profile.colMap[profile.getSubId(src.id)];
                if(!(('colMovable' in col)?col.colMovable:1))return false;

            if(!key || !data || key!=(profile.$id+":col"))return false;
            if(data==src.id || data==src.previousSibling.id)return false;
        },
        _prepareData:function(profile){
            var data = arguments.callee.upper.call(this, profile),NONE='display:none';
            profile.rowMap2 = {};
            profile.rowMap = {};
            profile.cellMap = {};

            var pro=profile.properties;

            data.showHeader=pro.showHeader?'':NONE;
            data.colDDDisplay=pro.colResizer?'':NONE;
            data.rowDDDisplay=pro.rowResizer?'':NONE;
            data.rowHandlerDisplay=pro.rowHandler?'':NONE;

            if(pro.header && pro.header.constructor != Array)
                pro.header = [];
            if(pro.rows && pro.rows.constructor != Array)
                pro.rows = [];

            data.header=this._prepareHeader(profile, pro.header);

            arguments.callee.upper.call(this, profile);

            data.rows = this._prepareItems(profile, pro.rows);
            return data;
        },
        _prepareHeader:function(profile, arr){
            var a = profile.colMap2 = {},
                b = profile.colMap = {},
                SubID=linb.UI.$tag_subId,
                pro=profile.properties,
                header=[], temp, t,
                NONE='display:none';
            _.arr.each(arr,function(o,i){
                temp='h_'+profile.pickSubId('header');
                if(typeof o=='string')
                    o=arr[i]={id:o};
                //#
                o._cells={};
                o[SubID]=temp;
                b[temp]=o;
                o.width = o.width||pro._colDfWidth;

                t={
                    sortDisplay : NONE,
                    rowHandlerDisplay : pro.rowHandler?'':NONE
                };
                t[SubID]=temp;
                t._tabindex=pro.tabindex;

                t.colDDDisplay = (('colResizer' in o)?o.colResizer:pro.colResizer)?'':'display:none';

                if(!o.type)o.type='label';
                if(!o.caption)o.caption=o.id;
                linb.UI.adjustData(profile, o, t);

                // id to dom item id
                a[o.id]=temp;
                // dom item id to properties item
                header.push(t);
            });
            return header;
        },
        _renderCell:function(profile,cell,node){
            var getPro=profile.box.getCellPro,
                dom=node['linb.Dom'],
                ncell=dom?cell:node,
                type=getPro(profile, cell, 'type'),
                t1='',
                t2='',
                caption,
                capOut=(!dom)&&node.caption,
                reg1=/</g,
                me=arguments.callee,
                dcls=me._dcls||(me._dcls=profile.getClass('CELL', '-disabled')),
                //1. $caption in cell (for special set)
                //2. caption in ncell(if [ncell] is not [cell], the [caption] maybe is the result of cell.renderer)
                //3. renderer in cell
                //4. default caption function
                //5. value in cell
                //6. ""
                ren=me._ren||(me._ren=function(profile,cell,ncell,fun){return typeof cell.$caption=='string'? cell.$caption: typeof ncell.caption =='string'?ncell.caption: typeof cell.renderer=='function'? cell.renderer(cell) : typeof fun=='function'?fun(cell.value):cell.value || ""}),
                f1=me._f1=(me._f1=function(v){return linb.Date.getText(new Date(parseInt(v)), 'ymd')}),
                f2=me._f2=(me._f2=function(v){return (v.split('\n')[0]||"").replace(/ /g,'&nbsp;').replace(reg1,'&lt;')}),
                f3=me._f3=(me._f3=function(v){return v*1000/10+'%'})
            ;

            switch(type){
                case 'number':
                    cell.value=parseFloat(cell.value)||0;
                    caption= capOut ||ren(profile,cell,ncell);
                    if(dom)node.html(caption||cell.value,false);
                break;
                case 'datepicker':
                    cell.value=new Date(parseInt(cell.value)).getTime();
                    caption= capOut || ren(profile,cell,ncell,f1);
                    if(dom)
                        node.html(caption, false);
                break;
                case 'textarea':
                    caption= capOut ||ren(profile,cell,ncell,f2);
                    if(dom)
                        node.html(caption,false);
                break;
                case 'colorpicker':
                    caption= capOut ||ren(profile,cell,ncell);
                    t1=linb.UI.ColorPicker.getTextColor(cell.value);
                    if(dom){
                        node.html(caption,false);
                        node.css('color',t1).css('backgroundColor',cell.value);
                    }else{
                        node.color='color:'+t1+';';
                        node.bgcolor='background-color:'+cell.value+';';
                    }
                break;
                case 'checkbox':
                    cell.value=!!cell.value;
                    caption=cell.value+'';
                    if(dom)
                        node.first().tagClass('-checked', cell.value);
                    else
                        node.checkboxCls = profile.getClass('CHECKBOX', cell.value?'-checked':'');
                break;
                case 'progress':
                    cell.value=parseFloat(cell.value)||0;
                    cell.value=Math.min(Math.max(cell.value,0),1);
                    caption= capOut ||ren(profile,cell,ncell,f3);
                    if(dom){
                        node.first().html(caption, false).width(caption);
                    }else
                        node.progress=caption;

                break;
                default:
                    caption= capOut ||ren(profile,cell,ncell);
                    if(dom)node.html(caption||cell.value,false);
            }

            cell._$tips=caption;

            var t2=getPro(profile, cell, 'disabled');
            if(!dom){
/*
cellStyle
cellClass

renderer
type
disabled
editable
editorListKey
editorListItems
editorFormat
editorReadonly
value
caption
*/
                node.cellCls=profile.getClass('CELL', '-'+type) + (t2?(' '+dcls):'');
                node.type=type;
                node.value=cell.value;
                node.caption=caption;

                node.cellStyle=getPro(profile, cell, 'cellStyle');
                node.cellClass=getPro(profile, cell, 'cellClass');

            }else{
                if(t2) node.addClass(dcls);
                else node.removeClass(dcls);
            }
        },
        _prepareItems:function(profile, arr, pid){
            var self=this,
                pro=profile.properties,
                a = profile.rowMap2,
                b = profile.rowMap,
                d = profile.cellMap,
                _layer=pid?b[a[pid]]?(b[a[pid]]._layer+1):0:0,
                SubID=linb.UI.$tag_subId,
                me=arguments.callee,
                ider = me._id||(me._id=new _.id()),
                rows=[],
                temp,cells,t,row,headCell,
                NONE='display:none';

            for(var i=0,l=arr.length;i<l;i++){
                temp='r_'+profile.pickSubId('row');

                if(arr[i].constructor==Array)
                    arr[i]={cells:arr[i]};
                //make sure the row id
                if(!arr[i].id || a[arr[i].id]){
                    while(a[t=ider.next()]);
                    arr[i].id=t;
                }

                row = arr[i];
                //#
                row._pid = pid;
                row._cells={};
                row._layer=_layer;
                row[SubID]=temp;
                row._tabindex=pro.tabindex;

                b[temp]=row;

                t={id: row.id};

                if(row.group)
                    t.rowCls = profile.getClass('CELLS','-group');

                if(row.summary)
                    t.summaryDisplay='display:block;';
                if(row.preview)
                    t.previewDisplay='display:block;';

                t.rowHeight=row.height||pro.rowHeight;
                t._row0DfW=pro._row0DfW;

                t.rowHandlerDisplay=pro.rowHandler?'':NONE;
                t.rowDDDisplay=(('rowResizer' in row)?row.rowResizer:pro.rowResizer)?'':NONE;

                cells = t.cells = [];

                t[SubID]=temp;
                t.display = row.sub?'':NONE;

                // id to dom item id
                a[row.id]=temp;

                // for cells
                if(row.group)
                    row.cells=null;

                if(row.cells)
                    _.arr.each(row.cells,function(g,j){
                        headCell=pro.header[j];

                        var n={};
                        //check input
                        if(typeof g=='object' && g.constructor == Object){}
                        else{
                            g = row.cells[j] = {value:g};
                            n.value=g;
                        }
                        //cell/cell link to row
                        g._row = row;
                        //cell/cell link to header
                        g._col=headCell;
                        g[SubID]='c_'+profile.pickSubId('cell');

                        self._adjustCell(profile, g, n);

                        cells.push(n);

                        // cell only link its' dom item id to properties item
                        d[n[SubID]]=g;

                        // row link to cell/cell
                        row._cells[headCell.id]=n[SubID];
                        // header link to cell/cell
                        headCell._cells[row.id]=n[SubID];
                    });

                linb.UI.adjustData(profile, row, t);

                rows.push(t);
            }
            return rows;
        },
        _adjustCell:function(profile, cell, uicell){
            var self=this,
                pro=profile.properties,
                col=cell._col,
                renderer;
            if(renderer=self.getCellPro(profile, cell, 'cellRenderer'))
                cell.renderer=renderer;

            //first
            linb.UI.adjustData(profile, cell, uicell);
            //next
            cell._$value=cell.value;

            if(!uicell.width)uicell.width=col.width;
            uicell._tabindex=pro.tabindex;
            uicell.cellDisplay=col.visibility===false?'display:none;':'';

            self._renderCell(profile, cell, uicell);
        },
        _setSub:function(profile, item, flag){
            var id=profile.domId,
                pro=profile.properties,
                key1 = profile.keys.TOGGLE,
                key2 = profile.keys.SUB,
                serialId = profile.rowMap2[item.id],
                markNode = profile.getSubNode('TOGGLE', serialId),
                subNs = profile.getSubNode('SUB', serialId)
                ;

            if(linb.Thread.isAlive(profile.key+profile.id)) return;
            //close
            if(item._checked){
                if(!flag){
                    var h = subNs.height(),fun=function(){
                        subNs.css({display:'none',height:'auto',overflow:''});
                    };

                    if(pro.animCollapse)
                        subNs.animate({'height':[h,0]},function(){subNs.css({height:h+'px',overflow:'hidden'})},function(){fun()}, 100, 5, 'inexp', profile.key+profile.id).start();
                    else
                        fun();
                    markNode.tagClass('-checked', false);
                    item._checked = false;
                    profile.box._asy(profile);
                }
            }else{
                //open
                if(flag){
                    var openSub = function(profile, item, id, markNode, subNs, sub){
                        var b=profile.boxing(),
                            p = profile.properties;
                        //created
                        if(!item._created){
                            delete item.sub;
                            //before insertRows
                            item._created=true;
                            subNs.css('display','none');

                            if(typeof sub=='string')
                                subNs.html(item.sub=sub,false);
                            else if(sub.constructor==Array)
                                b.insertRows(sub, item.id);
                            else if(sub['linb.Template']||sub['linb.UI'])
                                subNs.append(item.sub=sub.render(true));

                            //set checked items
                            b._setCtrlValue(b.getUIValue(), true);
                        }

                        var h = subNs.height(true),fun=function(){
                            subNs.css({height:'auto',overflow:'',display:'block'});
                        };
                        if(p.animCollapse)
                            subNs.animate({'height':[0,h]},function(){subNs.css({height:'0',overflow:'hidden',display:'block'})},function(){fun()}, 100, 5, 'outexp', profile.key+profile.id).start();
                        else
                            fun();

                        markNode.tagClass('-checked').tagClass('-mouseover');
                        item._checked = true;
                        profile.box._asy(profile);
                    };

                    var sub = item.sub, callback=function(sub){
                        openSub(profile, item, id, markNode, subNs, sub);
                    },t;
                    if((t=typeof sub)=='string'||t=='object')
                        callback(sub);
                    else if(profile.onGetContent){
                        linb.Thread(null,[
                            function(threadId){
                                var r = profile.boxing().onGetContent(profile, item, callback,threadId);
                                if(r) callback(r);
                            }
                        ],null,null,
                        //set busy status to UI
                        function(threadId){markNode.tagClass('-busy')},
                        //set free status to UI
                        function(){markNode.tagClass('-busy',false)}
                        ).start();
                    }
                }
            }
            //clear rows cache
            delete profile.$allrowscache;
        },
        _getCellId:function(profile, rowId, colId){
            return _.get(profile.rowMap,[profile.rowMap2[rowId], '_cells',colId]);
        },
        _updCell:function(profile, cellId, hash){
            var box=profile.box,
                sc=linb.absObj.$specialChars,
                cell,node;

            if(typeof cellId == 'string')
                cell = profile.cellMap[cellId];
            else{
                cell = cellId;
                cellId = cell._serialId;
            }
            if(!cell)return;

            if(typeof hash!='object')hash={value:hash};
            hash=_.filter(hash,function(o,i){return !sc[i.charAt(0)] || i=='$caption' });

            if(false === profile.boxing().beforeCellUpdated(profile, cell, hash))
                return;

            //special for caption
            delete cell.caption;
            if(cell.caption!==undefined){
                hash.caption=hash.caption;
                delete hash.caption;
            }
            _.merge(cell,hash,'all');

            node=profile.getSubNode('CELLA', cellId);

            if('type' in hash){
                var uicell={};
                box._adjustCell(profile, cell, uicell);
                node.parent().replace(_.str.toDom(profile.buildItems('rows.cells', [uicell])));
            }else
                box._renderCell(profile, cell, node);

            profile.boxing().afterCellUpdated(profile,cell, hash);

            //if update value
            if('value' in hash){
                cell.$dirty=true;
                if(cell.value===cell._$value)
                    node.removeClass('ui-dirty');
                else
                    node.addClass('ui-dirty');
            }
        },
        _ensureValue:function(profile,value){
            if(profile.properties.selMode=='multi'){
                var arr = (value||"").split(';');
                arr.sort();
                return arr.join(';');
            }else
                return value;
        },
        _sel:function(profile, type, src, id, e){
            var properties=profile.properties;
            if(properties.activeMode!=type)return;

            var targetId = profile.getSubId(id),
                map = type=='cell'?profile.cellMap:profile.rowMap,
                box=profile.boxing(),
                targetItem=map[targetId],
                ks=linb.Event.getKey(e),
                sid=type=='cell'?(targetItem._row.id+'|'+targetItem._col.id):targetItem.id,
                mode=properties.selMode,
                rt,rt2;
            switch(mode){
            case 'none':
                rt=box.onRowSelected(profile, targetItem, src);
                break;
            case 'multi':
                var value = box.getUIValue(),
                    arr = value?value.split(';'):[];
                if(arr.length&&(ks[1]||ks[2])){
                    //for select
                    rt2=false;
                    //todo: give cell multi selection function
                    if(ks[2] && type=='row'){
                        if(profile.$firstV._pid!=targetItem._pid)return false;
                        var items=properties.rows;
                        if(targetItem._pid){
                            var pitem=map[targetItem._pid];
                            if(pitem)items=pitem.sub;
                        }
                        var i1=_.arr.subIndexOf(items,'id',profile.$firstV.id),
                            i2=_.arr.subIndexOf(items,'id',targetItem.id),
                            i;
                        arr.length=0;
                        for(i=Math.min(i1,i2);i<=Math.max(i1,i2);i++)
                            arr.push(items[i].id);
                    }else{
                        if(_.arr.indexOf(arr,sid)!=-1)
                            _.arr.removeValue(arr,sid);
                        else
                            arr.push(sid);
                    }

                    arr.sort();
                    value = arr.join(';');

                    //update string value only for setCtrlValue
                    if(box.getUIValue() == value)
                        rt=false;
                    else{
                        box.setUIValue(value);
                        if(box.getUIValue() == value)
                            rt=box.onRowSelected(profile, targetItem, src);
                    }
                    break;
                }
            case 'single':
                if(box.getUIValue() == sid)
                    rt=false;
                else{
                    profile.$firstV=targetItem;
                    box.setUIValue(sid);
                    if(box.getUIValue() == sid)
                        rt=box.onRowSelected(profile, targetItem, src)||rt2;
                }
                break;
            }
            return rt;

        },
        _activeCell:function(profile, id){
            if(profile.properties.activeMode!='cell')return;

            var targetId = profile.getSubId(id),
                map = profile.cellMap,
                targetCell=map[targetId];

            if(profile.beforeCellActive && (false===profile.boxing().beforeCellActive(profile, targetCell)))return;

            if(profile.$activeCell)
                linb(profile.$activeCell).tagClass('-active', false);
            linb(profile.$activeCell=id).tagClass('-active');

            profile.boxing().afterCellActive(profile, targetCell);
        },
        _activeRow:function(profile, id){
            if(profile.properties.activeMode!='row')return;

            var targetId = profile.getSubId(id),
                map = profile.rowMap,
                targetRow=map[targetId];

            //before event
            if(profile.beforeRowActive && (false===profile.boxing().beforeRowActive(profile, targetRow)))return;

            if(profile.$activeRow)
               linb(profile.$activeRow).tagClass('-active', false);
            linb(profile.$activeRow = id).tagClass('-active');

            //after event
            profile.boxing().afterRowActive(profile, targetRow);

        },
        getCellPro:function(profile, cell, key){
            var t=cell;
            return (key in t)?t[key]:((t=cell._row)&&(key in t))? t[key]:((t=cell._col)&&(key in t))?t[key]:((t=profile.properties)&&(key in t))?t[key]:null;
        },
        _editCell:function(profile, cellId){
            var cell = typeof cellId == 'string' ?  profile.cellMap[cellId] : cellId,
                box=profile.box,
                getPro=box.getCellPro,
                type, cellNode, editor;
            if(!cell)return;

            if(profile.beforeIniEditor&&false===profile.boxing().beforeIniEditor(profile, cell))
                return;

            if(editor=profile.$curEditor){
                editor.getRoot().setBlurTrigger(profile.$id);
                if(editor)_.tryF(editor.undo);
                profile.$curEditor=null;
            }

            type=getPro(profile, cell, 'type');
            cellNode = profile.getSubNode('CELL', cellId);
            if(type=='checkbox'){
                cellNode.first().focus();
                return;
            }else if(type=='button'||type=='label')
                return;

            //get cell node and pos/size
            var grid = this,
                baseNode = profile.getSubNode('SCROLL'),
                absPos=cellNode.offset(null, baseNode),
                size = cellNode.cssSize(),
                editorFormat = getPro(profile, cell,'editorFormat'),
                editorReadonly = getPro(profile, cell,'editorReadonly'),
                t;

            //get from cache
            if(profile.$cache_editor[type]){
                editor=profile.$cache_editor[type];
            }else{
                editor=new linb.UI.ComboInput({left:-1000,top:-1000,position:'absolute',visibility:'hidden',zIndex:100});
                switch(type){
                    case 'number':
                        editor.setType('none').setCustomStyle('INPUT',"text-align:right;");
                        break;
                    case 'progress':
                        editor.setType('none').setValueFormat("^(0([\\.]\\d*[0-9]+)|0|1)$").setCustomStyle('INPUT',"text-align:right;");
                        break;
                    case 'input':
                        editor.setType('none');
                        break;
                    case 'textarea':
                        editor.setType('none').setMultiLines(true).setSaveBtn(true).onSave(function(p){
                            p.boxing().hide();
                        });
                        _.tryF(editor.setResizer,[true],editor);
                        break;
                    case 'listbox':
                    case 'combobox':
                    case 'helpinput':
                    case 'timepicker':
                    case 'datepicker':
                    case 'colorpicker':
                        editor.setType(type);
                        break;
                    case 'getter':
                    case 'popbox':
                    case 'cmdbox':
                        editor.setType(type)
                        .onClickButton(function(pro, pos, e, src){
                            var cell=pro.$cell,event=getPro(profile, cell, 'event');
                            if(getPro(profile, cell, 'disabled'))
                                return false;
                            if(typeof event == 'function' && false===event.call(profile._host||profile, profile, cell, pro, pos,e,src)){}
                            else
                                profile.boxing().onClickButton(profile, pro.$cell, pro, pos, e, src);
                        });
                        break;
                }
                baseNode.append(editor);
                profile.$cache_editor[type] = editor;
            }

            profile.$curEditor=editor;
            editor.get(0).$cell = cell;

            switch(type){
                case 'listbox':
                case 'combobox':
                case 'helpinput':
                    //set properties
                    if(t=getPro(profile, cell,'editorListKey'))
                        editor.setListKey(t);
                    else if(t=getPro(profile, cell,'editorListItems'))
                        editor.setItems(t);
                    break;
            }
            //$editorValue must be set in beforeIniEditor
            editor.setValue(cell.$editorValue||cell.value,true);
            delete cell.$editorValue;

            //$tag
            if(cell.$tag){
                if(editor.setCaption)editor.setCaption(cell.$tag);
                else if(editor.setValue)editor.setValue(cell.$tag);
            }
            if(editor.setReadonly)editor.setReadonly(!!editorReadonly);
            if(editorFormat){
                if(typeof editorFormat == 'function'){
                    if(editor.beforeFormatCheck)editor.beforeFormatCheck(editorFormat);
                }else{
                    if(editor.setValueFormat)editor.setValueFormat(editorFormat);
                }
            }
            editor.undo=function(){
                if(!editor)return;
                editor.afterUIValueSet(null).beforeNextFocus(null);
                if(editor.beforeFormatCheck)editor.beforeFormatCheck(null);
                if(editor.setValueFormat)editor.setValueFormat('');
                editor.setValue('',true);
                //don't use disply:none, firfox has many bugs about Caret or renderer
                editor.reBoxing().hide();
                editor=null;
            };

            //editor change value, update cell value
            editor
            .afterUIValueSet(function(pro,oV,nV){
                grid._updCell(profile, cellId, {value:nV, $caption:pro.$caption});
            })
            .beforeNextFocus(function(pro, key, shift, e){
                editor.undo();
                var hash=linb.Event.getEventPara(e);
                if(hash.keyCode=='enter')hash.keyCode='down';

                profile.getSubNode('CELLA', cell._serialId).onKeydown(true,hash);
                //prevent
                return false;
            });

            editor.getRoot().setBlurTrigger(profile.$id, function(){
                if(editor)editor.undo();
                return false;
            });
            //show editor
            if(type=='textarea'){
                editor.setWidth(Math.max(200,size.width+3)).setHeight(Math.max(100,size.height+2))
                .resize()
                .reBoxing()
                .popToTop(cellNode, 4, baseNode);
            }else{
                editor.setWidth(size.width+3).setHeight(size.height+2).resize();
                editor.reBoxing().show((absPos.left-1) + 'px',(absPos.top-1) + 'px');
            }
            _.asyRun(function(){
                _.tryF(editor&&editor.activate,[],editor);
            });
        },
        _ajdustBody:function(profile){
            if(linb.browser.ie6||linb.browser.ie7)
                _.resetRun(profile.$id+'4',function(){
                    var body=profile.getSubNode('BODY'),
                    lastcol=profile.getSubNode('HCELLS').last().get(0);
                    body.width(body.get(0).offsetHeight?lastcol.offsetWidth+lastcol.offsetLeft:0);
                });
        },
        _showTips:function(profile, node, pos){
            if(profile.onShowTips)
                return profile.boxing().onShowTips(profile, node, pos);

            var ks=profile.keys,item,hcell=ks.HCELL+':',sid,id,pid;
            if(profile.properties.disabled)return;

            id=node.id;
            pid=node.parentNode.id;
            sid=profile.getSubId(id);

            if(pid.indexOf(ks.HCELL+':')==0 || pid.indexOf(ks.HCELLA+':')==0 ||id.indexOf(ks.HCELL+':')==0)
                item = profile.colMap[sid];
            else if(id.indexOf(ks.CELL+':')==0 || pid.indexOf(ks.CELL+':')==0 || pid.indexOf(ks.CELLA+':')==0)
                item = profile.cellMap[sid];

            if(item){
                linb.Tips.show(pos, {tips:('tips' in item)?item.tips:(item._$tips||item.caption)});
            }else
                linb.Tips.hide();
            return true;
        },
        _onresize:function(profile,width,height){
            profile.getSubNode('BORDER').cssSize({ width :width, height :height});
            var t1=profile.getSubNode('HEADER'),
                t2=profile.getSubNode('SCROLL'),
                rh=0;
            profile.getSubNode('BOX').cssSize({width: width, height:height});
            if(width)t1.width(width);
            if(height)rh=t1.offsetHeight();
            t2.cssSize({width:width, height: height?(height-rh):null});
            _.asyRun(function(){t2.onScroll()});
        }
   }
});
