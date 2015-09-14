define(function(require) {
  require('./test1.js');
  require('./test2.js');
  require('./test3.js');
    $('a').attr('target', '_blank');
    $('a').on('focus', function() {
        $(this).trigger('blur')
    })

    
})