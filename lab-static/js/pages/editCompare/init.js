/**
 * Created by gujun on 12/24/14.
 */
define(function(require){
    require('ko');
    require('jquery.tree');
    var when = require('when');
    function init(){
        var model = new EditCompareModel();
        ko.applyBindings(model,$('.edit-compare-main')[0]);
    }

    function EditCompareModel(){
        var model = this;
        zPREFACE.DATA.assignee ={
            "id": 23,
            'assigneeName':'Samsung INC',
            'assigneeId': 123,
            'subNum': 456,
            'patentNum':1123
        };
        zPREFACE.DATA.competitor = [
            {
                'competitorName': 'SONY CORP',
                'patentNum': '134,567',
                'competitorId':111,
                "subNum": 327
            },
            {
                'competitorName':'SAMSUNG CORP',
                'patentNum':'112,333',
                'competitorId':112,
                "subNum": 327
            },
            {
                'competitorName':'PHILIPS CORP',
                'patentNum':'100,333',
                'competitorId':113,
                "subNum": 327

            },
            {
                'competitorName':'TOSHIBA CORP',
                'patentNum':'53,333',
                'competitorId':114,
                "subNum": 327
            },
            {
                'competitorName':'Apple CORP',
                'patentNum':'531,333',
                'competitorId':115,
                "subNum": 327
            },
            {
                'competitorName':'Cisco CORP',
                'patentNum':'131,333',
                'competitorId':116,
                "subNum": 327
            }];
        var compareList =  zPREFACE.DATA.competitor;

        compareList.push({
            'addbtn':true
        });

        var searchData =  {
            'type' : 'compare',
            'data': [],
            'callback':function(data){
                var tempData = {
                    'competitorName':data.competitorName,
                    'patentNum':data.patentNum,
                    'competitorId':data.competitorId,
                    "subNum": data.subNum
                };
                model.addRow(data,true);

            }
        };
        model.compareList = ko.observableArray(compareList);
        model.removeList = ko.observableArray([]);
        model.errorMsg = ko.observable('');
        model.showSearch = ko.observable(false);

        model.removeCompare = function(item){
            model.compareList.remove(item);
            if(model.checkAdded(item,'remove')){
                model.removeList.push(item);
            }
            model.addEmptyRow();
            model.checkMin();
        }


        model.addNewCompare = function(){
            $('.edit-compare-search-input').val('');
            $('.edit-compare-tree').hide();
            model.showSearch(true);
        }

        model.showSearchTree = function(){
            $('.edit-compare-tree').empty();
            if (model.checkQuery()) {
                model.searchCompany().then(function(data) {
                    if(data.data.company.length < 1){
                        alert('no');
                    }else{
                        searchData.data = data;
                        searchData.query = $('.edit-compare-search-input').val();
                        $('.edit-compare-tree').tree(searchData);
                    }


                });
            }

                //$('.edit-compare-tree').show();
            //});

        }

        model.checkQuery = function(){
            if($('.edit-compare-search-input').val() == ''){
                $('.edit-compare-search-input').addClass('edit-compare-search-error');
                return false;
            }
            $('.edit-compare-search-input').removeClass('edit-compare-search-error');
            return true;
        }

        model.recoverCompare = function(item){
            if(!model.checkMax())return;
            if(!model.checkAdded(item))return;
            model.removeList.remove(item);
            model.addRow(item);
        }

        model.addRow = function(data,hide){
            if(!model.checkMax())return;
            if(!model.checkAdded(data))return;
            model.checkMin();
            model.removeEmptyRow();
            model.compareList().pop();
            model.compareList.push(data);
            model.compareList.push({
                'addbtn': true
            });
            model.addEmptyRow();
            if(hide == true){
                model.showSearch(false);
                $('edit-compare-search-input').val('');
                $('.edit-compare-tree').empty();
            }
        }

        model.addEmptyRow = function(){
            while(model.compareList().length<7){
                model.compareList.push({
                    'competitorName':'',
                    'patentNum':'',
                    'competitorId':'',
                    'holder':true
                });
            }
        }

        model.removeEmptyRow = function(){
            _.remove(model.compareList(),function(item){
                return item.holder == true;
            });
        }

        model.checkMax = function(){
            var tempList = _.filter(model.compareList(),function(item){
                return !item.holder&&!item.addbtn;
            });
            if(tempList.length>=6){
                model.errorMsg('Maximum limit of 6 comparable companies. Please delete before adding New companies');
                return false;
            }else{
                model.errorMsg('');
                return true;
            }
        }

        model.checkMin = function(){
            var tempList = _.filter(model.compareList(),function(item){
                return !item.holder;
            });
            if(tempList.length < 4){
                model.errorMsg('Please select a minimum of 3 comparable companies to generate the analysis');
                console.log('here');
                return false;
            }else{
                model.errorMsg('');
                return true;
            }
        }

        model.hideSearch = function(){
            model.showSearch(false);
        }

        model.checkAdded = function(data,type){
            var selectedList = model.compareList();
            if(type == 'remove'){
                selectedList = model.removeList();
            }
            var tempList = _.filter(selectedList,function(item){
                return !item.holder&&!item.addbtn;
            });
            if(type == 'remove'){
                if(_.filter(tempList,function(item){
                        return item.competitorId == data.competitorId;
                    }).length > 0){
                    return false;
                }else{
                    return true;
                }
            }else{
                if(_.filter(tempList,function(item){
                        return item.competitorId == data.competitorId;
                    }).length > 0){
                    model.errorMsg('You have already added this comparable company!');
                    return false;
                }else{
                    model.errorMsg('');
                    return true;
                }
            }

        }

        model.searchCompany = function(){
            var defer = when.defer();
            $.ajax({
                type: 'get',
                url: 'http://127.0.0.1:3000/searchCompany/' + $('.edit-compare-search-input').val() + '/-1',
                success: function (data) {
                    defer.resolve(data);
                },
                error: function(){
                    defer.reject();
                }
            });
            return defer.promise;
        }

        model.saveCompare = function(data,e){
            if($(e.target).hasClass('disabled'))return;
            model.savePost().then(function(data){
                if(data.status == 'ok'){
                    location.href = "/?v=dashboardOverView";
                }
            });
        }

        model.savePost = function(){
            var defer = when.defer();
            var tempList = _.filter(model.compareList(),function(item){
                return !item.holder&&!item.addbtn;
            });
            var data = {};
            data.assignee = zPREFACE.DATA.assignee;
            data.competitor = tempList;

            $.ajax({
                type : 'post',
                data : JSON.stringify(data),
            //    [{"name": "SONY CORP", "count": "134,567", "id": 1}, {
            //    "name": "SAMSUNG CORP",
            //    "count": "112,333",
            //    "id": 2
            //    }, {"name": "PHILIPS CORP", "count": "100,333", "id": 3}, {
            //    "name": "TOSHIBA CORP",
            //    "count": "53,333",
            //    "id": 4
            //    }, {"name": "Apple CORP", "count": "531,333", "id": 5}, {"name": "Cisco CORP", "count": "131,333", "id": 6}]
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

        model.lessThanThree = function(){
            var tempList = _.filter(model.compareList(),function(item){
                return !item.holder&&!item.addbtn;
            });
            return tempList.length < 3;
        }

    }



    init();
});