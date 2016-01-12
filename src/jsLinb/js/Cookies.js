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
});
