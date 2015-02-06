/**
 * Created by Binlin
 * Date: 14-12-05
 * Time: PM 13：19
 * 官网第一屏动画
 */
	;(function($) {
		$.fn.extend({
			"animations":function(options){
				//设置默认值
				options=$.extend({
					size : 1.5,//图片尺寸
					min_move :30,
					max_move : 350,//图片位移系数
					opacitys : 1,//图片最大透明度
					layerTime : 0.6,//运动系数
					thisClassnames : "partA"//指定层
				},options);

				var animationData = {
					//"frame_reset" :{top:options.move, opacity:0},
					"frame1" :{top:10, opacity:options.opacitys},
					"frame2" :{top:0, opacity:0}
				}; 


				function rd(n,m){//产生随机数
					    var c = m-n+1;  
					    return Math.floor(Math.random() * c + n);
					}
 
				function animatImgs(){
					$('.'+options.thisClassnames).children('li').each(function(){
						if(!$(this).is(":animated")){
							var resetLocal = (rd(options.min_move,options.max_move));
							$(this).removeClass('overturn').animate({top:resetLocal,opacity:0},resetLocal * layTime * options.layerTime,"swing");
							var min_num = 1;//随机数最小
							var max_num = 25;//随机数最大
							var min_time = 40;//随机时间系数最小
							var max_time = 60;//随机时间系数最大
							var min_left = 40;//随机时间系数最小
							var max_left = 700;//随机时间系数最大
							var norotateds = 0;//判断是否翻转
							var rotateds = 1;//0不翻转1翻转
							//var max_time_start = 20;
							var ramdomNum = (rd(min_num,max_num));//随机图像
							//var layTimestart = (rd(min_num,max_time_start));//生成时间系数（1-10）
							var layTime = (rd(min_time,max_time));//运动随机时间系数（40-60)
							var left_val = (rd(min_left,max_left));//随机图像
							var rotatedNum = (rd(norotateds,rotateds));//0不翻转1翻转
							var flag = $("#getRandomNum").val();
							if(ramdomNum == flag){
									ramdomNum =  (rd(min_num,max_num))
								}
							$("#getRandomNum").val(ramdomNum);
							var path = "images/icons_"+ramdomNum+".png";//获取随机图片
							var _Imgs = $(this).find('img');
							_Imgs.attr('src',path).css('width',options.size * 110);
							var rate = resetLocal / (resetLocal * layTime * options.layerTime);
							if(rotatedNum == 1){//随机数，0不翻转1翻转
								var animate_object = $(this).addClass('overturn').show();
							}else if(rotatedNum == 0){
								var animate_object = $(this).show();
							}
							animate_object.
								css('left',left_val).
								animate(animationData.frame1, resetLocal * layTime * options.layerTime, 'linear').
								animate(animationData.frame2, 10/rate, 'linear');
						}	
					});
				}
				animatImgs();
				setInterval(animatImgs,options.layerTime * 400);
			}
		});
	})(jQuery);

$(function(){
	$('.partA').animations();
	$('.partB').animations({size:1,opacitys:0.7,min_move:50,max_move:300,layerTime:1.1,thisClassnames:'partB'});
	$('.partC').animations({size:0.6,opacitys:0.6,min_move:70,max_move:270,layerTime:1.6,thisClassnames:'partC'});
	$('.partD').animations({size:0.4,opacitys:0.5,min_move:90,max_move:220,layerTime:2,thisClassnames:'partD'});
});
