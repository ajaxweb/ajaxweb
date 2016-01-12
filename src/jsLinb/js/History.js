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
Class("linb.History",null,{
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
});
