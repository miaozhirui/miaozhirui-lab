define(function(require) {
    $('.box div').each(function(i, ele) {
        var $ele = $(ele);
        $ele.addClass('transition');
    });
})