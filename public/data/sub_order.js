// var oor = 1;
var oorflag = true;
$('.x_third_pay').addClass('x_add_border');

$('.x_third_span').on('click', function() {
	if(oorflag) {
		// 无勾
		$(this).css('background', 'url("/public/images/zfbsaomiao2.png") no-repeat 0px -79px');
		$('.x_third_pay').removeClass('x_add_border');
		oorflag = false;

	}else{
		// 有勾
		$(this).css('background', 'url("/public/images/zfbsaomiao2.png") no-repeat 0px -49px');
		$('.x_bank_span').css('background', 'url("/public/images/zfbsaomiao2.png") no-repeat 0px -79px');
		$('.x_third_pay').addClass('x_add_border');
		$('.x_payment_yhk').removeClass('x_payment_yhka');
		oorflag = true;
		eerflag = true;
	}
	
})
var eerflag = true;
$('.x_bank_span').on('click', function() {
	if(eerflag) {
		// 点击后有勾
		$(this).css('background', 'url("/public/images/zfbsaomiao2.png") no-repeat 0px -49px');
		$('.x_third_pay').removeClass('x_add_border');
		oorflag = false;
		// 有勾后第三方无勾
		$('.x_third_span').css('background', 'url("/public/images/zfbsaomiao2.png") no-repeat 0px -79px');
		$('.x_payment_yhk').addClass('x_payment_yhka');
		$('.x_bank_den').css('display', 'block');
		$('.x_bank_title').children().on('click', function() {
			$(this).css('border', )
		});
		eerflag = false;
		
	}else{
		// 无勾
		$(this).css('background', 'url("/public/images/zfbsaomiao2.png") no-repeat 0px -79px');
		$('.x_payment_yhk').removeClass('x_payment_yhka');
		eerflag = true;
	}
});