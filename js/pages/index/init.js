define(function(require){
	 $('a').attr('target', '_blank');
		$('a').on('focus', function() {
		$(this).trigger('blur')
	})
})
