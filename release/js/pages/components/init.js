define(function(a){a("ko"),ko.components.register("my-component",{viewModel:function(a){function b(a){this.name=ko.observable(a.name),this.age=ko.observable(a.age),this.hight=ko.observable(a.hight)}this.data=_.map(a,function(a){return new b(a)})},template:'<div data-bind="foreach: data">                            <div>                            <span data-bind="text: name"></span>                            <span data-bind="style: {color: age() > 20 ? &quot;red &quot;: &quot blue &quot }">111</span>                            <span data-bind="text: hight"></span>                            </div>                         </div>'}),$.ajax("/js/ajax/components.json",{dateType:"json",success:function(a){var b=JSON.stringify({component:a});$("#component").attr("data-bind",b),ko.applyBindings()},error:function(a){console.log(a)}})});