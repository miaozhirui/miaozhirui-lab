/**
 * Created by gujun on 12/22/14.
 */
$.fn.tree = function(options, context) {
    options = options||{};
    var mainRow = '<div class="main-row row">\
                    $${arrow}\
                    <div class="name"><a class="name-btn">${name}</a></div>\
                    <div class="num"><span>${num}</span></div>\
                    <div class="add"><a class="btn-26 add-btn">Add</a></div></div>';

    var childRow = '<div class="child-row row">\
                    $${arrow}\
                    <div class="name"><a class="name-btn">${name}</a></div>\
                    <div class="num"><span>${num}</span></div>\
                    <div class="add"><a class="btn-26 add-btn">Add</a></div></div>';

    var arrowHtml = '<div class="arrow">+</div>';
    var noArrowHtml = '<div class="arrow"></div>';

    var generateRow = function(type,rowData){

        if(type == 'main'){
            var html = '';
            var childHtml = '';
            $(rowData).each(function(key,value){
                var htmlTpl = mainRow;
                if(value.children && value.children.length > 0){
                    childHtml = generateRow('child',value.children);
                    var rowHtml = juicer(htmlTpl, {
                        name: value.name,
                        num: value.num,
                        arrow: arrowHtml
                    });
                    rowHtml = '<div>' + rowHtml  + childHtml  + '</div>';
                }else{
                    var rowHtml = juicer(htmlTpl, {
                        name: value.name,
                        num: value.num,
                        arrow : noArrowHtml
                    });
                    rowHtml = '<div>' + rowHtml + '</div>';
                }

                html = html + rowHtml;
            });
            return html;

        }else if(type == 'child'){
            var html = '';
            var childHtml = '';
            $(rowData).each(function(key,value){
                var htmlTpl = childRow;

                if(value.children && value.children.length > 0){
                    childHtml = generateRow('child',value.children);
                    var rowHtml = juicer(htmlTpl, {
                        name: value.name,
                        num: value.num,
                        arrow: arrowHtml
                    });
                    rowHtml = '<div class="child-section">' + rowHtml  + childHtml  + '</div>';
                }else{
                    var rowHtml = juicer(htmlTpl, {
                        name: value.name,
                        num: value.num,
                        arrow : noArrowHtml
                    });
                    rowHtml = '<div class="child-section">' + rowHtml + '</div>';
                }

                html = html + rowHtml;

            });
            console.log(html);
            return html;
        }



    }

    var bindEvent = function(){
        $('body').on('click','.name-btn',function(e){
            console.log('click');
            if($(e.target).closest('.row').siblings('.child-section')){
                $(e.target).closest('.row').siblings('.child-section').toggle();
            }
        });

        $('body').on('click','.add-btn',function(e){
            var tpl = '<div><span>${name}</span></div>';
            var html = juicer(tpl,{
                        name : $(e.target).closest('.row').find('.name-btn').text()
                        });
            $(options.appendDiv).append(html);
        })

    }


    //mian logic
    var  html = generateRow('main',options.data);
    bindEvent();
    $(this).append(html);


    return this;
}