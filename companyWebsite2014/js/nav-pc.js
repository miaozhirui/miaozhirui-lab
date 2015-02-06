/**
 * Created with JetBrains WebStorm.
 * User: patsnap
 * Date: 13-11-29
 * Time: 下午5:19
 * To change this template use File | Settings | File Templates.
 */
;(function(){
    //header
    var navContent = $('#header');
    //header的高度
    var height ;
    //需要显示的子元素
    var children = $('#nav .child');
    //动画时间
    var time = 200;
    //延时时长
    var timeDelay = 200;
    //延时的trigger
    var timerHandler = 0;
    //最大高度
    var maxHeight = 0;
    //padding
    var padding_top;

    children.each(function(){
        var _height = $(this).height();
        padding_top = parseInt($(this).css('paddingTop'));
        if(_height > maxHeight){
            maxHeight = _height;
        }
        $(this).height(0).css('paddingTop',0);
    });

    height = navContent.outerHeight();
    var filling = $('<div>').height(height);
    filling.insertBefore(navContent);

    navContent.css({
        'position':'absolute',
        'left': 0,
        'top': 0
    });

   $('#nav').hover(function(){
       clearTimeout(timerHandler);
       children.stop();
       children.clearQueue();
       children.animate({
           height:maxHeight + 'px',
           paddingTop:padding_top + 'px'
       },time);
       navContent.addClass('box-shadow');
   },function(){
       timerHandler = setTimeout(function(){
           children.animate({
               height:0 ,
               paddingTop: 0
           },time);
           navContent.removeClass('box-shadow');
       },timeDelay);
   });
})();