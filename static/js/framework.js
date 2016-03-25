//关闭自动填表
function noautoform() {
    var autoform = document.getElementsByTagName("form");
    for(var i = 0; i < autoform.length; i++)
        autoform[i].setAttribute("autocomplete", "off");
};
noautoform();