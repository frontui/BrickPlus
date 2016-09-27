/**
 * 引入perfect-scrollbar
 */
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

    //辅助导航
    // function assistList() {
    //     var btn = $('#assistListMore'),
    //         list = $('#systemAssistNavList');

    //     $(btn).click(
    //         function () {
    //             $(list).toggleClass('more-assist');
    //             $(this).toggleClass('hide-list');
    //             $(this).text($(this).text()=="收起"?"更多":"收起");
    //         }
    //     );
    // };
    // assistList();


    //返回页面顶部
    $(window).scroll(function() {
        if($(window).scrollTop() >= 150){
            $('.actgotop').fadeIn(400);
        }else{
            $('.actgotop').fadeOut(400);
        }
    });
    $('.actgotop').click(function(){$('html,body').animate({scrollTop: '0'}, 400);});

    // 左侧菜单滚动条
    $('#side-scrollbar').perfectScrollbar();

    // 路由异步加载
    var $tabTemplate = $('.tabs-btn[data-template]');
    function loadContent(el) {
      var $that = $(el);
      var url = $that.data('template');
      var $target = $that.attr('data-target') ? $($that.attr('data-target')) : $($that.attr('href'))
      if(!!url && !!$target.length) {
        $target.slideUp()
        $target.load(url, function() {
          $target.stop(false, true).slideDown()
        })
      }
    }
    $tabTemplate.on('show.ui.tab', function(e) {
      loadContent(e.target)
    })
    loadContent($tabTemplate.eq(0))
});

//系统打开左侧导航交互
// function sas() {
//     $('#systemAside').toggleClass('fold');
//     $('#systemContainer').toggleClass('fold-for-aside');
// }

//系统打开辅助导航交互
// function san() {
//     $('#systemContainer').toggleClass('fold-for-assist-nav');
//     $('#systemAssistNav').toggleClass('show');
// }
