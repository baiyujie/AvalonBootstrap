require("../../css/bootstrap/bootstrap.css");
require("../../css/demo.css");
require("../../src/avalonbootstrap");
require("./index.css");
var navData = [{
	title : "UI组件",
	_selected : true,
	children : [{
		title : "accordion"
	},{
		title : "autocomplete"
	},{
		title : "dialog"
	},{
		title : "dropdown"
	},{
		title : "tab"
	},{
		title : "table"
	},{
		title : "tree"
	}] 
},{
	title : "扩展指令",
	children : [{
		title : "tooltip"
	}]
}];
var demoData = [];
var pageObj = (function(navData){
	var re = {};
	avalon.each(navData,function(i,v){
		avalon.each(v.children,function(i,v){
			re[v.title] = demoData.length;
			demoData.push({
				name : v.title,
				html : "加载中...",
				$init : false
			});
		})
	});
	return re;
})(navData);
function getSingleSpaces(space){
	var len = 0;
	for(var j=0;j<space.length;j++){
		var ch = space[j];
		if(ch === "\t"){
			len += 2;
		}else if(ch === " "){
			len++;
		}
	}
	return new Array(len + 1).join(" ");
}
function dealDemoHtml(html){
	var div = document.createElement("div");
	div.innerHTML = html;
	var divs = div.getElementsByTagName('pre');
	for(var i=0,ii;ii=divs[i++];){
		if(avalon(ii).hasClass("demo-code")){
			var str = ii.innerHTML;
			/*.replace(/[<>]/g,function(s){
				if(s === '<')	return "&lt;";
				if(s === '>') return "&gt;";
			});*/
			var arr = str.split("\n");
			var spaces = arr[0].match(/^\s+/);
			var singleSpaces = getSingleSpaces(spaces[0]);
			for(var j=0;j<arr.length;j++){
				spaces = arr[j].match(/^\s+/);
				var s = getSingleSpaces(spaces[0]).replace(singleSpaces,"");
				arr[j] = arr[j].replace(/^\s+/,s);
			}
			var textNode = document.createTextNode(arr.join("\n"));
			ii.innerHTML = '';
			ii.appendChild(textNode);
			// ii.innerHTML = arr.join("<br>");
		}
	}
	return div.innerHTML;
}
var vmodel = avalon.define({
	$id : "body",
	curIndex : -1,
	demoData : demoData,
	dealHashChange : function(func){
		var page = location.hash.substring(1);
		var target = pageObj[page];
		if(target === undefined){
			page = 'accordion';
			target = 0;
		}
		this.curIndex = target;
		var demo = this.demoData[target];
		if(!demo.$init){
			require(["../_components/"+page],function(html){

				demo.html = dealDemoHtml(html);
				demo.$init = true;
			});
		}
		// var iframe = document.querySelector("#page");
		// if(iframe){
		// 	iframe.src = page + ".html";
		// }else{
		// 	document.querySelector("#center").innerHTML = "<iframe src='" + page + 
		// 		".html'  id='page' name='page' frameborder='0' scrolling='no'></iframe>";
		// }
		avalon.vmodels.nav.findItem(function(item,i){
			if(item.title === page){
				this.data[i]._selected = true;
				this.selectItem(item);
				return true;
			}
		});
	},
	$navOpts : {
		is : "ms-accordion",
		$id : 'nav',
		$multipleSel : true,
		onSelectItem : function(item){
			location.hash = item.title;
		},
		data : navData
	}
});
vmodel.$watch("onReady",function(){
	var vm = this;
	setInterval(function(){
		var page = document.querySelector("#page");
		if(page && page.contentWindow){
			try{
				var h = page.contentWindow.document.body.offsetHeight;
				page.style.height = h + "px";
			}catch(ex){}
		}
	},200);
	window.onhashchange = function(){
		vm.dealHashChange();
	};
	vm.dealHashChange();
});