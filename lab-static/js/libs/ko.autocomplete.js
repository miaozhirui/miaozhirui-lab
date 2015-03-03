/*
 About the author: http://www.andreasgustafsson.se
 */
var viewModel = new SearchResultViewModel();
var focusedItem = -1;
ko.bindingHandlers.autoComplete = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        allBindingsAccessor().valueUpdate = 'afterkeydown';
        var settings = allBindingsAccessor().settings || {};
        var ul = '<ul  class="knockout-autoComplete" data-bind="foreach: searchResults">\
            <li data-bind=" click : $parent.select.bind($data), css : {\'autocomplete-selected\' : focus}">\
                <div>\
                <span style="float:left" data-bind="text: label"></span>\
                <span style="float:right" data-bind="text: patentNum"></span>\
                <span style="display:none;float:right" data-bind="text: childCount"></span>\
                </div>\
            </li>\
            </ul>';
        $(element).after(ul);

        viewModel.setElement(element);
        viewModel.setSelectFunction(settings.selectCallback);
        ko.applyBindings(viewModel, $(element).next('ul')[0]);
        ko.bindingHandlers.value.init(element, valueAccessor, allBindingsAccessor);
    },
    update: function (element, valueAccessor, allBindingsAccessor) {

        $(element).attr('data-id','');
        $('.index-no-company').hide();
        var value = valueAccessor();
        var settings = allBindingsAccessor().settings || {};
        viewModel.searchResults.removeAll();
        if (value().length > 0) {
            $('.index-search').addClass('disabled');
            $('.index-loading-icon').show();
            console.log('setting',settings.url);
            $.ajax({
                type : 'get',
                url: settings.url +value()+'/-1',

                success: function (data) {
                    if(data.data.company.length<=0){
                        $('.index-no-company span').text('No company found. Please retry with another company name');
                        $('.index-no-company').show();
                    }
                    var mapped = ko.utils.arrayMap(data.data.company, function (item) {
                        return { label: item.name, value: item.id, patentNum: item.patentNum, childCount:item.childCount, focus: ko.observable(false) };
                    });
                    $('.index-loading-icon').hide();

                    viewModel.searchResults(mapped);
                }
            });
        }

    }
};
function SearchResultViewModel() {
    var self = this;
    self.searchResults = ko.observableArray([]);
    self.element = null;
    self.selectFunction = null;
    self.setSelectFunction = function (selectFunction) {
        if (selectFunction) {
            self.selectFunction = selectFunction;
        }
    };
    self.setElement = function (element) {
        if (element) {
            self.element = element;
        }
    };
    self.toggleSelected = function (index) {
        var item = viewModel.searchResults()[index];
        if (item) {
            item.focus(!item.focus());
        }
    };
    self.select = function (data) {
        self.searchResults([]);
        $(self.element).val(data.label);
        $('.index-search').removeClass('disabled');
        var tempData = {
            "assigneeId": data.value,
            "assigneeName": data.label,
            "patentNum":  data.patentNum,
            "subNum": data.childCount
        }
        $(self.element).attr('data-id',data.value);
        $(self.element).attr('data-assigneeName',data.label);
        $(self.element).attr('data-patentNum',data.patentNum);
        $(self.element).attr('data-subNum',data.childCount);

        self.selectFunction(tempData);
    };
}