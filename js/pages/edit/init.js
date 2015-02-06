/**
 * Created by gujun on 12/22/14.
 */
define(function(require){
    require('jquery.tree');
    var data = {
        'data': [
            {
                name: 'samsung',
                num: '111',
                children: [
                    {
                        name: 'sansung-1',
                        num: '12',
                        children: [
                            {
                                name: 'samsung-11',
                                num: '2',
                                children: [{
                                    name: 'samsung-111',
                                    num: '2'
                                }]
                            },
                            {
                                name: 'samsung-12',
                                num: '2'
                            },
                            {
                                name: 'samsung-13',
                                num: '2'
                            },
                            {
                                name: 'samsung-14',
                                num: '2'
                            },{
                                name: 'samsung-15',
                                num: '2'
                            }

                        ]
                    },
                    {
                        name: 'sansung-2',
                        num: '12'
                    }
                ]
            },
            {
                name: 'apple',
                num: '111'
            }
        ],
        appendDiv : $('.content')
    };
    var progressBar = $('.edit-step li a');


    function init(){
        bindProgress();
        $('.tree').tree(data);
    }

    function bindProgress(){
        progressBar.click(function(e){
            progressBar.children('div').removeClass('edit-progress-on');
            $(e.target).addClass('edit-progress-on');
            $(e.target).closest('ul').find('li').removeClass('edit-progress-on');
            $(e.target).closest('li').addClass('edit-progress-on');
        });
    }


    init();
});