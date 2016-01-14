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
Class("linb.UI.jsTree", "linb.UI",{
    Instance:{
		test:function(){
			
			jsonString = [{				
				'x' : [{
						"##value##" : "x1",
						"##value1##" : "x2",
						'y' : [{
								"##value##" : "x1",
								"##value1##" : "x2"
						}],		
						'z' : [{
								"##value##" : "x1",
								"##value1##" : "x2",
								'v' : [{
										"##value##" : "x1",
										"##value1##" : "x2"
								}]	
						}]	
				}]								
			}];

			this.insertItems(jsonString);
		},
		
		iterate:function(arr)
		{
			if(typeof arr=="object"){
				var jsTreeCtrl=this;
				var x="";
				for(ele in arr)
				{
					key=ele;
					value=arr[ele];
					
					if(key.indexOf("##value") > -1)
					{
						if(value!="")
							x=x+"<li>"+value+"</li>";
					}
					else
					{
						if(!isNaN(key) && isFinite(key))
							x=x+jsTreeCtrl.iterate(value);
						else
							x=x+"<li>"+key+"<ul>"+jsTreeCtrl.iterate(value)+"</ul></li>";
					}
				}
				return x;
			}
			else{
				if(arr!="")
					var x="<li>"+arr+"</li>";
				return x;
			}
		},
		
		insertItems:function(arr){
			var domId=this.getDomId();
			var ret="<ul>"+this.iterate(arr)+"</ul>";
			
			$(document.getElementById(domId)).html(ret);
			$(document.getElementById(domId)).jstree();
        }

	},
	
	Initialize:function(){
	},

    Static:{
        Templates:{
            tagName:'div',
            style:'{_style}',
			name:'divJsTree',
            border:"0",
            width:"{width}",
            height:"{height}",
        }
	}
});


