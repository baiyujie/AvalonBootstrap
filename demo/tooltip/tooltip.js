require("../../css/bootstrap/bootstrap.css");
require("../../css/demo.css");
require("../../src/avalonbootstrap");
var vmodel = avalon.define({
	$id : "page",
	$tooltip1 : {
		position : "bottom",content : "wefwefewf"
	},
	$tooltip2 : {
		content:"<span ms-tooltip='{content : \"hdggrrr\"}'>tooltip</span>",position:'bottom',
		type:'popover',title:'gergergerg',
		triggerOn : 'click'
	},
	change : function () {
		// avalon(document.body).appendHTML("<div :controller='test'>{{@a}}</div>");
		// if(avalon.vmodels.test){
		// 	avalon.vmodels.test.a = Math.random();
		// 	return;
		// }
		// var div = document.createElement("div");
		// div.setAttribute("ms-controller","test");
		// div.innerHTML = '{{@a}}';
		// document.body.appendChild(div);
		// var vm = avalon.define({
		// 	$id : "test",
		// 	a : "wewewdsdsd"
		// });
		// avalon.scan(div,vm);
	}
});