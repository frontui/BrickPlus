$(function (){
    //Dom准备就绪加载 BrickPlus Logo 动画样式
    $('#BrickPlusLogo').addClass('move');

    //BrickPlus 侧导航状态动画
    $('.bricks-aside-ul-wrap ul li.current').addClass('animation-icon');

    //BrickPlus 内容框(bricks-content-wrap)动画
    $('.bricks-content-wrap').addClass('tab-panel-animated-bricks');

    //关闭自动填表
    function noautoform() {
        var autoform = document.getElementsByTagName("form");
        for(var i = 0; i < autoform.length; i++)
            autoform[i].setAttribute("autocomplete", "off");
    };
    noautoform();
});