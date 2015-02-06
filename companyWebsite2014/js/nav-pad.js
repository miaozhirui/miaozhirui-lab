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
    var padding_top ;

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

    //$('.nav-content').attr('href','');

    navContent.css({
        'position':'absolute',
        'left': 0,
        'top': 0
    });

   $('#nav li a').click(function(){
    //alert($(this).next('.child').height())
    if($(this).next('.child').height() == "0"){
      var link_path = $(this).attr('href');
      $('#link-path-place').val(link_path);
      $(this).attr('href','javascript:void(0)');
      clearTimeout(timerHandler);
       children.stop();
       children.clearQueue();
       children.animate({
           height:maxHeight + 'px',
           paddingTop:padding_top + 'px'
       },time);
       $(this).parent().siblings().children('a').removeClass('location');
       $(this).addClass('location');
       navContent.addClass('box-shadow');
     }else if($(this).next('.child').height() == "75"){
      var rel_path = $('#link-path-place').val();
      window.location.href = rel_path;
      timerHandler = setTimeout(function(){
           children.animate({
               height:0 ,
               paddingTop: 0
           },time);
           navContent.removeClass('box-shadow');
       },timeDelay);
     }
       
   })
   // ,function(){
   //     timerHandler = setTimeout(function(){
   //         children.animate({
   //             height:0 ,
   //             paddingTop: 0
   //         },time);
   //         navContent.removeClass('box-shadow');
   //     },timeDelay);
   // });
})();