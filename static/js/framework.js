$(function (){
    //Dom准备就绪加载 BrickPlus Logo 动画样式
    $('#BrickPlusLogo').addClass('move');

    //BrickPlus 侧导航状态动画
    $('.bricks-aside-ul-wrap ul li.current').addClass('animation-icon');

    //BrickPlus 内容框(bricks-content-wrap)动画
    $('.bricks-content-wrap').addClass('tab-panel-animated-bricks');

    //BrickPlus 内容框(bricks-content-wrap)动画
    function bricksUserCtrlOpen() {
        var buwIcon = $("#buw > a");
        var buwMenuBtn = document.getElementsByClassName('bum');
        var buwMenu = document.getElementsByClassName('bricks-user-menu');

        $(buwIcon).click(
            function () {
                $(this).addClass('animation');
                $(buwMenu).show();
            }
        );

        $(buwMenuBtn).click(
            function () {
                $(buwIcon).removeClass('animation');
                $(buwMenu).hide();
            }
        );

        /*$("body").bind("click",function(){
            $(buwIcon).removeClass("animation");
            $(buwMenu).hide();
        })*/
    };
    bricksUserCtrlOpen();

    //关闭自动填表
    function noautoform() {
        var autoform = document.getElementsByTagName("form");
        for(var i = 0; i < autoform.length; i++)
            autoform[i].setAttribute("autocomplete", "off");
    };
    noautoform();

    //返回页面顶部
    $(window).scroll(function() {
        if($(window).scrollTop() >= 150){
            $('.actgotop').fadeIn(400);
        }else{
            $('.actgotop').fadeOut(400);
        }
    });
    $('.actgotop').click(function(){$('html,body').animate({scrollTop: '0'}, 400);});
});
