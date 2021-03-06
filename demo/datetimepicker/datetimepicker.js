require("../../css/bootstrap/bootstrap.css");
require("../../css/demo.css");
require("../../src/avalonbootstrap");
avalon.define({
  $id : "page",
  d1 : "",
  d2 : "",
  $config1 : {
    $id : "datetimepicker1",
    is : "ms-datetimepicker",
    left : 15,
    onChoose : function(val){
    	avalon.vmodels.page.d1 = val; 
    }
  },
  showD1 : function(){
  	avalon.vmodels.datetimepicker1.open();
  },
  $config2 : {
  	$id : "datetimepicker2",
    is : "ms-datetimepicker",
    left : 15,
    format : "yyyy-MM-dd",
    onChoose : function(val){
    	avalon.vmodels.page.d2 = val; 
    }
  },
  showD2 : function(){
  	avalon.vmodels.datetimepicker2.open();
  }
});
