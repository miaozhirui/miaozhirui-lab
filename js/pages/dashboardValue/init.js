/**
 * Created by gujun on 12/23/14.
 */
/**
 * Created by gujun on 12/23/14.
 */
define(function(require){
    var tab = $('.change-charts-ul');

    function init(){
        bindTabChange();
    }

    function bindTabChange(){
        tab.on('click','a',function(e){
           tab.find('a.current').removeClass('current');
           $(e.target).addClass('current');

           switch( $(e.target).data('tabindex')){
               case 'summary' : initSummary();break;
               case 'technology' : initTechnology();break;
               case 'territorial' : initTerritorial();break;
               case 'technology' : initTechnologyl();break;
               case 'generality' : initGenerality();break;
           }
        });
    }

    function initSummary(){

    }

    function initTechnology(){

    }

    function initTerritorial(){

    }

    function initTechnologyl(){

    }

    function initGenerality(){

    }

    init();
});
