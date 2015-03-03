/**
 * Created by gujun on 12/22/14.
 */



$.fn.tree = function(options, context) {
        var self = this;
        options = options||{};
        var tableHead = '<div class="table-header">\
                        <div class="table-header-name">Company Name</div>\
                        <div class="table-header-count">Patent Count</div>\
                        <div class="table-header-action">Action</div>\
                    </div>';
        var mainRow = '<div class="row-content">\
                    <div class="main-row row">\
                    $${arrow}\
                    <div class="name"><a class="name-btn">${name}</a></div>\
                    <div class="num"><span>${num}</span></div>\
                    <div class="child" style="display: none"><span>${childNum}</span></div>\
                    <div class="add"><a class="btn-26 add-btn" data-id=${id}>${action}</a></div></div></div>';

        var childRow = '<div class="child-row row">\
                    $${arrow}\
                    <div class="name"><a class="name-btn">${name}</a></div>\
                    <div class="num"><span>${num}</span></div>\
                    <div class="child" style="display: none"><span>${childNum}</span></div>\
                    <div class="add"><a class="btn-26 add-btn" data-id=${id}>${action}</a></div></div>';

        var arrowHtml = '<div class="arrow arrowUp"></div>';
        var noArrowHtml = '<div class="no-arrow"></div>';

        var generateRow = function(type,rowData){
            var action = options.type=="company"?'select':'Add';
            if(!rowData){console.log('no company found');return 'no company found';}
            if(type == 'main'){
                var html = '';
                var childHtml = '';

                $(rowData.company).each(function(key,value){
                    var htmlTpl = mainRow;
                    //if(value.childCount && value.childCount > 0){
                        var rowHtml = juicer(htmlTpl, {
                            name: value.name,
                            num: value.patentNum,
                            childNum : value.childCount,
                            arrow: (value.childCount && value.childCount > 0)?arrowHtml:noArrowHtml,
                            id:value.id,
                            action:action
                        });
                        rowHtml = '<div>' + rowHtml + '</div>';
                    //}else{
                    //    var rowHtml = juicer(htmlTpl, {
                    //        name: value.name,
                    //        num: value.patentNum,
                    //        childNum : value.childCount,
                    //        arrow: noArrowHtml,
                    //        id:value.id,
                    //        action:action
                    //    });
                    //    rowHtml = '<div>' + rowHtml + '</div>';
                    //}

                    html = html + rowHtml;
                });
                return html;

            }else if(type == 'child'){
                var html = '';
                var childHtml = '';
                $(rowData.company).each(function(key,value){
                    var htmlTpl = childRow;
                    //if(value.childCount && value.childCount > 0){
                        //childHtml = generateRow('child',value.children);
                        var rowHtml = juicer(htmlTpl, {
                            name: value.name,
                            num: value.patentNum,
                            childNum : value.childCount,
                            arrow: (value.childCount && value.childCount > 0)?arrowHtml:noArrowHtml,
                            id:value.id,
                            action:action

                        });
                        rowHtml = '<div class="child-section"><div class="row-content">' + rowHtml   + '</div></div>';
                    //}else{
                    //    var rowHtml = juicer(htmlTpl, {
                    //        name: value.name,
                    //        num: value.patentNum,
                    //        childNum : value.childCount,
                    //        arrow : noArrowHtml,
                    //        id:value.id,
                    //        action:action
                    //    });
                    //    rowHtml = '<div class="child-section">' + rowHtml + '</div>';
                    //}

                    html = html + rowHtml;

                });
                return html;
            }



        }

        var bindEvent = function(){
            $('body').on('click','.name-btn','.arrow',function(e) {
                var arrow = $(e.target).closest('.row').find('.arrow');

                var targetRow = $('.add [data-id = ' + $(e.target).closest('.row').find('.add-btn').data('id') + ']').closest('.row');
                if (targetRow.closest('.row-content').next('.child-section').length <= 0) {
                    searchCompany($(e.target).closest('.row').find('.add-btn').data('id')).done(function (data) {
                        var html = generateRow('child', data.data);
                        $(html).insertAfter(targetRow.closest('.row-content'));
                        $(e.target).closest('.row-content').siblings('.child-section').toggle();
                        arrow.toggleClass('arrowUp');
                        arrow.toggleClass('arrowDown');
                    });

                }else{
                    arrow.toggleClass('arrowUp');
                    arrow.toggleClass('arrowDown');
                    $(e.target).closest('.row-content').siblings('.child-section').toggle();
                }


            });
            //$('body').on('click','.arrow',function(e){
            //    var arrow = $(e.target).closest('.row').find('.arrow');
            //    arrow.toggleClass('arrowUp');
            //    arrow.toggleClass('arrowDown');
            //    if($(e.target).closest('.row').siblings('.child-section')){
            //        $(e.target).closest('.row').siblings('.child-section').toggle();
            //    }
            //});

            $('body').on('click','.add-btn',function(e){
                if(options.type=='company'){
                    var tempData = {
                        'assigneeName': $(e.target).closest('.row').find('.name-btn').text(),
                        'subNum': $(e.target).closest('.row').find('.child span').text(),
                        'patentNum': $(e.target).closest('.row').find('.num span').text(),
                        'assigneeId':$(e.target).data('id')
                    };
                    options.callback(tempData);
                }else if(options.type='compare'){
                    var tempData = {
                        'competitorName': $(e.target).closest('.row').find('.name-btn').text(),
                        'patentNum': $(e.target).closest('.row').find('.num span').text(),
                        'competitorId':$(e.target).data('id'),
                        'subNum': $(e.target).closest('.row').find('.child span').text()
                    }
                    options.callback(tempData);
                }
            })

        }

        var searchCompany = function(parentId){
            return $.ajax({
                type: 'get',
                url: 'http://127.0.0.1:3000/searchCompany/' + options.query + '/' +parentId
            })
        }

        //searchCompany(options.query,-1).done(function(data){
        //    if(options.data.company.length < 1){
        //        var html = '<div class="company-tree-no-result">\
        //                        <span>No Company found. Please retry another company name.</span>\
        //                    </div>';
        //        bindEvent();
        //        $(self).empty();
        //        $(self).append(html);
        //        $(self).show();
        //    }else{
        var html =  generateRow('main',options.data.data);
        bindEvent();
        $(self).empty();
        $(self).append(tableHead + html);
        $(self).show();
            //}
        //}).fail(function(){
        //    var tempData = {
        //        "data":{
        //            "parentId":"-1",
        //            "company":[
        //                {"id": 1, "name": "SAMSUNG INC", "childCount": 31, "patentNum": 1132},
        //                {"id": 2,"name": "SAMSUNG INC", "childCount": 12,"patentNum": 1000 },
        //                {"id": 3, "name": "SAMSUNG INC", "childCount": 0, "patentNum": 2000}]
        //        }
        //    };
        //    var html =  generateRow('main',tempData.data);
        //    bindEvent();
        //    $(self).empty();
        //    $(self).append(tableHead + html);
        //    $(self).show();
        //});

        //$.ajax({
        //       type: 'get',
        //       url: 'http://127.0.0.1:3000/searchCompany/'
        //   }).done(function(data){
        //    html =  generateRow('main',data.data.company);
        //    bindEvent();
        //    $(self).append(tableHead + html);
        //});

        return this;
    }

