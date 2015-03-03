/**
 * Created by gujun on 12/22/14.
 */
define(function(require){
    require('jquery.tree');
    var when = require('when');
    require('ko');

    zPREFACE.DATA.companyInfo ={
        "id": 23,
        'assigneeName':'Samsung INC',
        'assigneeId': 123,
        'subNum': 456,
        'patentNum':1123
    };

    function init(){
        var model = new EditCompanyModel();
        $('.edit-search-input').val(zPREFACE.DATA.companyInfo.assigneeName);
        ko.applyBindings(model,$('.container')[0]);
    }

    var EditCompanyModel = function(){
        var model = this;

        var originData = {
            'type' : 'company',
            'data' : [],
            'callback' : function(data){
                model.companyInfo(data);
            }
        };

        model.companyInfo = ko.observable(zPREFACE.DATA.companyInfo);
        model.noResult = ko.observable(false);
        model.itemId = ko.observable(zPREFACE.DATA.companyInfo.id);
        model.search =  function(){
            if(model.checkQuery()) {
                model.searchData().then(function (data) {
                    if(data.data.company.length < 1){
                        model.noResult(true);
                    }else{
                        model.noResult(false);
                        originData.data = data;
                        originData.query = encodeURIComponent($('.edit-search-input').val());
                        $('.edit-tree').tree(originData);
                    }
                });
            }

        }

        model.searchData = function(){
            var defer = when.defer();
            $.ajax({
                type: 'get',
                url: 'http://127.0.0.1:3000/searchCompany/' + $('.edit-search-input').val() + '/-1',
                success: function (data) {
                    defer.resolve(data);
                },
                error: function(){
                    defer.reject();
                }
            });
            return defer.promise;
        }

        model.saveCompany = function(){
            model.savePost().then(function(data){
                //{
                //    "status" : "ok",
                //    "error" : {
                //                    "errorCode": 403,
                //                    "errorMsg" : "session time out!"
                //              }
                //}
                if(data.status == 'ok'){
                    location.href = "/?v=editCompare";
                }
            });
        }

        model.savePost = function(){
            var defer = when.defer();
            var data =  model.companyInfo();
            data.id =  model.itemId();
            $.ajax({
                type : 'post',
                data : data,
                url : 'http://127.0.0.1:3000/saveCompany/',
                success : function(data){
                    defer.resolve(data);
                },
                error : function(){
                    var data =
                        {
                            "status" : "ok",
                            "error" : {
                                            "errorCode": 403,
                                            "errorMsg" : "session time out!"
                                      }
                        };
                    defer.resolve(data);
                }
            });
            return defer.promise;
        }

        model.checkQuery = function(){
            if($('.edit-search-input').val() == ''){
                $('.edit-search-input').addClass('edit-search-error');
                return false;
            }
            $('.edit-search-input').removeClass('edit-search-error');
            return true;
        }
    }


    init();
});