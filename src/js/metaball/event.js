/**
 * Created by funfungo on 16/7/18.
 */
$(document).on("click",function (event) {
    var $target = $(event.target);
    if($target.hasClass("page__control-show")){
        var text = $target.text();
        $("#" + text).toggle();
    }else if($target.hasClass("control__item")){
        var index = $target.text() - 1;
        $(".page").hide();
        $(".page").eq(index).show();
        $(".control__item").removeClass("current");
        $(".control__item").eq(index).addClass("current");
        if (pageAni !== "null"){
            cancelAnimationFrame(pageAni);
        }
        if(index == 1){
            page2.init();
        }else if(index == 3){
            page4.init();
        }
    }else if($target.hasClass("page__control-item")){
        var id = $target.attr("id");
        if(id == "page2-grid"){
            if(page2.activeGrid){
                page2.activeGrid = false;
            }else {
                page2.activeGrid = true;
            }
        }else if(id == "page2-circle"){
            if(page2.activeCircle){
                page2.activeCircle = false;
            }else {
                page2.activeCircle = true;
            }
        }else if(id == "page2-highlight"){
            if(page2.activeHighlight){
                page2.activeHighlight = false;
            }else {
                page2.activeHighlight = true;
            }
        }else if(id == "page2-gridDown"){
            if(pageAni){
                cancelAnimationFrame(pageAni);
                pageAni = null;
            }
            if(page2.cubeSize == 10){
                page2.cubeSize = 50;
            }else {
                page2.cubeSize = 10;
            }
            page2.init();

        }else if(id == "page4-stop"){
            if(pageAni){
                cancelAnimationFrame(pageAni);
                pageAni = null;
                $("#page4-stop").text("start");
            }else {
                pageAni = requestAnimationFrame(page4.update);
                $("#page4-stop").text("stop");
            }
        }else if(id == "page4-gridDown"){
            if(pageAni){
                cancelAnimationFrame(pageAni);
                pageAni = null;
            }
            if(page4.cubeSize == 10){
                page4.cubeSize = 50;
            }else {
                page4.cubeSize = 10;
            }
            page4.init();
        }else if(id=="page4-grid"){
            if(page4.activeGrid){
                page4.activeGrid = false;
            }else {
                page4.activeGrid = true;
            }
        }else if( id == "page4-circle" ){
            if(page4.activeCircle){
                page4.activeCircle = false;
            }else {
                page4.activeCircle = true;
            }
        }else if( id == "page4-modify" ){
            if(page4.activeModify){
                page4.activeModify = false;
            }else {
                page4.activeModify = true;
            }
        }
    }
});