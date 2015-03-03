/**
 * Created by gujun on 12/23/14.
 */
/**
 * Created by gujun on 12/23/14.
 */
define(function(require){

    var chart  = require('./chart/chart');
    var chartData = require('./chart/lineData');
    var treeMapData = require('./chart/treeMapData');
    var tab = $('.change-charts-ul');

    function init(){
        bindTabChange();
        initSummary();
    }

    function bindTabChange(){
        tab.on('click','a',function(e){
           tab.find('a.current').removeClass('current');
           $(e.target).addClass('current');

           switch( $(e.target).data('tabindex')){
               case 'summary' : initSummary();break;
               case 'technologyImpact' : technologyImpact();break;
               case 'territorial' : initTerritorial();break;
               case 'technologyScope' : technologyScope();break;
               case 'generality' : initGenerality();break;
           }
        });
    }

    function initSummary(){
        $('.charts-1').empty();
        $('.charts-2').empty();
        chart.createlinesChart('.charts-1', chartData);
    }

    function technologyImpact(){
        $('.charts-1').empty();
        $('.charts-2').empty();
        chart.createlinesChart('.charts-1', chartData);
    }

    function initTerritorial(){
        $('.charts-1').empty();
        $('.charts-2').empty();
        chart.createlinesChart('.charts-1', chartData);
        var worldPnData = {CHN: 5, USA: 10};
        chart.createWorldMap('.charts-2', worldPnData);
    }

    function technologyScope(){
        $('.charts-1').empty();
        $('.charts-2').empty();
        chart.createlinesChart('.charts-1', chartData);
        chart.createTreemap('.charts-2',treeMapData);
    }

    function initGenerality(){
        $('.charts-1').empty();
        $('.charts-2').empty();
    }

    init();
});
