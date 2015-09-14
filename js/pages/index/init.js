<<<<<<< HEAD
define(function(require){
	 $('a').attr('target', '_blank');
		$('a').on('focus', function() {
		$(this).trigger('blur')
	})
})
=======
define(function(require) {
  require('./test1.js');
  require('./test2.js');
  require('./test3.js');
    $('a').attr('target', '_blank');
    $('a').on('focus', function() {
        $(this).trigger('blur')
    })

    
})
>>>>>>> e1f39bb6dedb88d74d744d0e25601d93c5ad0a5d
