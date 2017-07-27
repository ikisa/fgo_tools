$(document).foundation();


$(function(){
    "use strict";

    console.log("start.");

    // 初期表示
    $("#apcalc").addClass("welcomepage");
    $(".container.welcomepage").removeClass("hide");







    // 各ページのreadyを動かす
    $.each(readyArray, function(index, func){
    	func();
    });


    // event binding
    $(".menu a").on("click", function(){
    	$(".container").addClass("hide");
    	$("#" + $(this).data("menuid")).removeClass("hide");
    });




    console.log("end.");
});
