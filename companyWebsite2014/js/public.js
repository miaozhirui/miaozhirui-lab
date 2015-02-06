/**
 * Created by Binlin
 * Date: 14-12-05
 * Time: PM 13：19
 * 监听滚动条出发不同动画
 */
$(function(){
	$(window).scroll(function(){
		var thisTop = $(this);
		var sideLi = $(".nav-point li");//侧边导航点
		var listenTop = thisTop.scrollTop();
		var popupLi = $(".popups-dia li");
		var greenMoun = $(".green-moun");//蓝山
		var blueMoun = $(".blue-moun");//绿山
		var becomeBig = $(".wp2-bg-son i");//第二屏需要放大节点
		if(listenTop >= 0 && listenTop < 620){
			sideLi.removeClass("current").eq(0).addClass("current");
			becomeBig.removeClass("become-big");
		}else if(listenTop >= 620 && listenTop <= 1140){
			sideLi.removeClass("current").eq(1).addClass("current");
			becomeBig.addClass("become-big");
			if(!greenMoun.is(":animated")){
				greenMoun.animate({'opacity':'0'},200,function(){
				$(this).css('left','-100%')
			});
			blueMoun.animate({'opacity':'0'},200,function(){
				$(this).css('left','-100%')
			});
			popupLi.css({'top':'','left':'','opacity':'0'})
			}
		}else if(listenTop > 1240 && listenTop <= 1860){
			becomeBig.removeClass("become-big");//初始第二屏动画
			sideLi.removeClass("current").eq(2).addClass("current");
			var judgeLeft = $(".blue-moun").css("left");
			//alert(judgeLeft);
			if((!blueMoun.is(":animated")) && (judgeLeft != '0px')){
				//alert(1);
				blueMoun.css('opacity','1').animate({'left':'5%'},400)
			.animate({'left':'0'},100,function(){
				greenMoun.css('opacity','1').animate({'left':'10%'},400)
				.animate({'left':'5%'},100);
				});
				setTimeout(function(){
					popupLi.eq(0).animate({
						'top':'70',
						'left':'10%',
						'opacity':'1'
					},600)
				},1000);
				setTimeout(function(){
					popupLi.eq(1).animate({
						'top':'150',
						'left':'21%',
						'opacity':'1'
					},600)
				},1200);
				setTimeout(function(){
					popupLi.eq(2).animate({
						'top':'75',
						'left':'31%',
						'opacity':'1'
					},600)
				},1400);
				setTimeout(function(){
					popupLi.eq(3).animate({
						'top':'120',
						'left':'45%',
						'opacity':'1'
					},600)
				},1600);
				setTimeout(function(){
					popupLi.eq(4).animate({
						'top':'-50',
						'left':'65%',
						'opacity':'1'
					},600)
				},1800);
				setTimeout(function(){
					popupLi.eq(5).animate({
						'top':'120',
						'left':'76%',
						'opacity':'1'
					},600)
				},2000);
				setTimeout(function(){
					popupLi.eq(6).animate({
						'top':'70',
						'left':'85%',
						'opacity':'1'
					},600)
				},2200);
			}
			
		}else if(listenTop > 1860 && listenTop <= 2200){
			if(!greenMoun.is(":animated")){
				greenMoun.animate({'opacity':'0'},200,function(){
				$(this).css('left','-100%')
			});
			blueMoun.animate({'opacity':'0'},200,function(){
				$(this).css('left','-100%')
			});
			popupLi.css({'top':'','left':'','opacity':'0'})
			}
			
			sideLi.removeClass("current").eq(3).addClass("current");
			//listenTop
			//$('.ic4-computer').animate({'left',''})
		}
		else{//alert(1)
		}
	});
})