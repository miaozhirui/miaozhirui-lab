/**
 * Created by gujun on 12/30/14.
 */

define(function(require){
    require('ko');
    require('ko.autocomplate');
    var when = require('when');
    var postData = {};
    function init(){
        var model = new EditHomePageModel();
        ko.applyBindings(model,$('.home-container')[0]);
    }

    function EditHomePageModel(){
        var model  = this;
        model.search = ko.observable('').extend({ throttle: 300 });
        model.searchValue = ko.observable('aaa');
        model.companyId = ko.observable('');
        model.companyInfo = ko.observable({
            "companyId":'',
            "assigneeName": '',
            "patentNum": '',
            "subNum": ''
        });


        model.selectItemCallback = function(data) {
            console.log(data);
            postData = data;
        }

        model.analyse = function(data,element){
            $('.index-no-company').hide();
            if($('.index-input').val()=='' || $('.index-input').data('id')==''){
                $('.index-no-company').show();
                $('.index-no-company span').text('Please select one company!');
                return;
            }
            if($(element.target).hasClass('disabled')){ console.log(2);return;}

            model.savePost(postData).then(function(data){
                if(data.status == 'ok'){
                    location.href = "/?v=dashboardOverView";
                }
            });
        }

        model.savePost = function(postData){
            var defer = when.defer();
            $.ajax({
                type : 'post',
                data : JSON.stringify(postData),
                url : 'http://127.0.0.1:3000/saveCompany/',
                success : function(data){
                    defer.resolve(data);
                },
                error : function(){
                    defer.reject();
                }
            });
            return defer.promise;
        }
    }



    init();
});