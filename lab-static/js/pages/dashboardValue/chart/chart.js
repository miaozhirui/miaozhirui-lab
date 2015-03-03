
define(function(require,exports) {
    require('d3');
    require('juicer');
    var makeRawData = function (collection) {
        var data = {
            config: {
                axis: [
                    {name: 'year', title: 'Application Year', axis: 'x'},
                    {name: 'value', title: 'Patent Count', axis: 'y'}
                ],
                currentSeries: 'google',
                currentY: 2014
            },
            items: []
        };

        //length = xArr.length;

        _.each(collection, function (item, index) {
            var nodes = item.nodes = [];
            var length = item.xSeries.length;
            for (var i = 0; i < length; i++) {
                nodes.push({
                    year: item.xSeries[i],
                    value: generateY(item.yDomain)
                });
            }
            data.items.push(item);
        });

        function generateY(domain) {
            return domain[0] + Math.floor(Math.random() * (domain[1] - domain[0]));
        }

        return data;
    }

    exports.createlinesChart = function (selector, data) {
        var opts = {
            width: 960,
            height: 500,
            top: 30,
            right: 30,
            left: 80,
            bottom: 30
        }

        //process rawdata
        var dataObject = processData(data);
        console.log(dataObject);

        //draw svg canvas
        var container = d3.select(selector);
        var canvas = d3.select(selector).append('svg');

        canvas.attr({
            class: 'lines-chart',
            width: opts.width + opts.left + opts.right,
            height: opts.height + opts.top + opts.bottom
        });

        //init scale
        var x = d3.scale.ordinal()
            .domain(dataObject.keys)
            .rangePoints([opts.left, opts.width + opts.left], 1);

        var y = d3.scale.linear()
            .domain(dataObject.value)
            .nice()
            .range([opts.height + opts.top, opts.top]);

        var xStep = x.range()[1] - x.range()[0];
        var yMax = y.range()[1];

        //console.log(x.range(), y.range());

        //init axis
        var xAxis = d3.svg.axis()
            .scale(x)
            .tickPadding(8);
        //.tickSize(-opts.height);

        var yAxis = d3.svg.axis()
            .scale(y)
            .tickPadding(5)
            .tickSize(-opts.width)
            .orient('left');

        //draw background
        var bgs = canvas.append('g')
            .attr({
                class: 'bgs'
            });

        var bg = bgs.selectAll('g')
            .data(dataObject.keys)
            .enter()
            .append('g')
            .attr({
                class: 'bg'
            });

        bg.append('rect')
            .attr({
                x: function (d) {
                    return x(d) - xStep / 2;
                },
                y: yMax,
                width: xStep,
                height: y(0) - yMax
            })
            .style({
                fill: function (d, i) {
                    return i % 2 ? 'white' : '#f8f8f8';
                }
            });

        //draw axis
        //axis x title
        canvas.append('text')
            .text(dataObject.title.y)
            .attr({
                class: 'y-title',
                x: 0,
                y: 0,
                dy: '1em'
            });

        canvas.append('g')
            .attr({
                class: 'xAxis',
                transform: 'translate(0,' + (opts.height + opts.top) + ')'
            })
            .call(xAxis);

        canvas.append('g')
            .attr({
                class: 'yAxis',
                transform: 'translate(' + opts.left + ',0)'
            })
            .call(yAxis);

        //init line
        var line = d3.svg.line()
            //.interpolate('basic')
            .x(function (d) {
                return x(d.x);
            })
            .y(function (d) {
                return y(d.y);
            });

        //draw tipline
        var tipline = canvas.append('line')
            .attr({
                x1: x(_.last(dataObject.keys)),
                y1: y(0),
                x2: x(_.last(dataObject.keys)),
                y2: yMax
            })
            .style({
                'stroke-dasharray': '5,5'
            });

        //draw line
        var plotContainer = canvas.append('g')
            .attr({
                'class': 'plot-container'
            });

        var plots = plotContainer.selectAll('g')
            .data(dataObject.items)
            .enter()
            .append('g')
            .attr({
                'class': function (d) {
                    return 'line' + (d.current ? ' current' : '');
                },
                'name': function (d) {
                    return d.name;
                }
            });

        var linePaths = plots
            .append('path')
            .attr({
                'd': function (d) {
                    return line(d.nodes);
                }
            })
            .style({
                'stroke': function (d) {
                    return d.color;
                }
            });

        //draw mark
        var markers = plots
            .selectAll('circle')
            .data(function (d) {
                return d.nodes
            })
            .enter()
            .append('circle')
            .attr({
                'position': function (d) {
                    return x(d.x) + ',' + y(d.y);
                },
                cx: function (d) {
                    return x(d.x);
                },
                cy: function (d) {
                    return y(d.y);
                },
                class: function (d) {
                    return 'marker' + (d.current ? ' current' : '');
                },
                r: 4
            })
            .style({
                stroke: function (d) {
                    return d.color;
                },
                fill: function (d) {
                    return d.color;
                }
            })
            .on('click', function (d) {
                console.log(d);
            })

        //init tooltip
        var currentTip = new Tooltip(container.node(), {
            id: 'current-tip'
        });
        var mouseTip = new Tooltip(container.node(), {
            id: 'mouse-tip',
            transition: false
        });

        //legend
        var legendItemTpl = '<span class="indicator" style="background:${color};"></span>${name}';
        var legend = container.append('div')
            .attr({
                class: 'legend'
            })
            .style({
                width: (opts.width) + 'px',
                'margin-left': opts.left + 'px'
            });

        var legendItem = legend.selectAll('p')
            .data(dataObject.items)
            .enter()
            .append('p')
            .attr({
                class: function (d) {
                    return 'legend-item selected' + (d.current ? ' current' : '');
                }
            })
            .html(function (d) {
                var html = juicer(legendItemTpl, d);
                return html;
            })
            .style({
                width: function (d) {
                    return d.current ? 'auto' : (opts.width / 2 - 10) + 'px';
                },
                padding: '5px'
            });

        legendItem.on('click', function (d) {
            if (d.current) {
                return;
            }
            var d3this = d3.select(this);
            var select = true;
            if (d3this.attr('class').match(/selected/)) {
                select = false;
            }
            d3.select(this).classed('selected', select);
            plotContainer.select('.line[name="' + d.name + '"]')
                .transition()
                .style({
                    opacity: (select ? 1 : 0)
                });
        })

        //event
        var lastPositionX = 0;
        container
            .on('mouseenter', function () {

            })
            .on('mousemove', function () {
                var currentMouse = d3.mouse(canvas.node()),
                    currentX = currentMouse[0],
                    currentY = currentMouse[1];

                if (currentY > y(0) || currentY < yMax) {
                    return;
                }
                var xIndex = (_.sortedIndex(x.range(), currentX - xStep / 2));
                var key = x.domain()[xIndex];
                if (!key || key == lastPositionX) {
                    return;
                }
                setCurrent(key);
            })
            .on('mouseleave', function (d) {
                setCurrent(dataObject.currentY);
                //markers.classed('selected', false);
                //d3.select(this).select('line').style('visibility', 'hidden');
            }
        );

        markers.on('mouseover', function (d) {
            if (d3.select(this).attr('class').match(/current/)) {
                return;
            }
            mouseTip.update(d, [x(d.x) + 10, y(d.y)]).show();
        });

        function setCurrent(key) {
            lastPositionX = key;
            markers.classed('selected', false);
            tipline
                //.transition()
                //.ease('linear')
                //.duration(200)
                .attr({
                    x1: x(key),
                    x2: x(key)
                });

            mouseTip.hide();

            markers.each(function (d) {
                var d3this = d3.select(this);
                if (d.x == key) {
                    d3this.classed('selected', true);
                    if (d3this.attr('class').match(/current/)) {
                        //console.log(currentTip);
                        currentTip.update(d, [x(d.x) + 10, y(d.y)]).show();
                    }
                }
            });
        }

        function processData(data) {
            var config = data.config;
            var xs = [], max = 0, nodes;
            var xName = _.find(config.axis, {axis: 'x'}).name,
                yName = _.find(config.axis, {axis: 'y'}).name,
                xTitle = _.find(config.axis, {axis: 'x'}).title,
                yTitle = _.find(config.axis, {axis: 'y'}).title;

            _.each(data.items, function (item, i) {
                nodes = item.nodes;
                if (config.currentSeries == item.name) {
                    item.current = true;
                }
                _.each(nodes, function (node) {
                    node.x = node[xName];
                    node.y = node[yName];
                    node.color = item.color;
                    node.name = item.name;
                    node.current = item.current;
                    node.xTitle = xTitle;
                    node.yTitle = yTitle;
                });
                xs = xs.concat(_.pluck(nodes, xName));
                //min = d3.min(min, d3.min(_.pluck(nodes, 'y')));
                max = Math.max(max, d3.max(_.pluck(nodes, yName)));
            });
            return {
                items: data.items,
                keys: _.unique(xs),
                value: [0, max],
                title: {
                    x: xTitle,
                    y: yTitle
                },
                currentSeries: config.currentSeries,
                currentY: config.currentY
            };
        }

        //action
        setCurrent(dataObject.currentY);
        return canvas.node();
    }

    exports.createTreemap = function (selector, treemapData) {
        var opts = {
            width: 960,
            height: 500,
            top: 30,
            right: 30,
            left: 80,
            bottom: 30
        };

        var color = d3.scale.category20c();

        var treemap = d3.layout.treemap()
            .size([opts.width, opts.height])
            .sticky(true)
            .value(function (d) {
                return d.size;
            });

        var treemapContainer = d3.select(selector)
            .style({
                //width: opts.width + opts.left + opts.right + 'px',
                height: opts.height + opts.top + opts.bottom + 'px'
            });

        var treemapCanvas = treemapContainer.append('div')
            .attr({
                class: 'treemap-chart'
            })
            .style({
                'cursor': 'default',
                'position': 'relative',
                'left': opts.left + 'px',
                'top': opts.top + 'px'
            })
        .style("width", (opts.width) + "px");
        //.style("height", (opts.height + opts.top + opts.bottom) + "px");


        var node = treemapCanvas.datum(treemapData)
            .selectAll(".node")
            .data(treemap.nodes)
            .enter().append("div")
            .attr({
                'class': function (d) {
                    return (d.children && d.children.length) ? 'node' : 'node leaf-node';
                },
                'parent': function (d) {
                    return d.parent ? d.parent.name : '';
                }
            })
            .call(position)
            .style({
                'background': function (d, i) {
                    var thiscolor, thisdata = d;
                    if (!d.parent || d.depth == '1') {
                        thiscolor = color(d.name);
                    } else {
                        depth = d.depth * 1;
                        while (d.depth * 1 > 1) {
                            d = d.parent;
                        }
                        thiscolor = d3.rgb(color(d.name)).darker(depth - d.depth - 1);
                    }
                    thisdata.color = thiscolor;
                    return thiscolor;
                    //return treemap._getColorByIPC(d.name);
                    //return d.children && d.children.length ? color(d.name) : '#fff';
                }
            })
            .on('mouseover', function (d) {
                tooltip.update(d, [d.x, d.y - 40]).show();
            })
            .text(function (d) {
                return d.children ? null : d.name;
            });

        treemapCanvas.on('mouseleave', function (d) {
            tooltip.hide();
        });

        /*d3.selectAll("input").on("change", function change() {
         var value = this.value === "count" ? function() { return 1; } : function(d) { return d.size; };

         node
         .data(treemap.value(value).nodes)
         .transition()
         .duration(1500)
         .call(position);
         });*/

        var tooltip = new Tooltip(treemapCanvas.node());
        tooltip.setTpl('<div style="border-color:${color};"><p class="tooltip-header">${name}<span>${size}</span></p></div>');

        function position() {
            this.style("left", function (d) {
                return d.x + "px";
            })
                .style("top", function (d) {
                    return d.y + "px";
                })
                .style("width", function (d) {
                    return Math.max(0, d.dx - 1) + "px";
                })
                .style("height", function (d) {
                    return Math.max(0, d.dy - 1) + "px";
                });
        }
    }

    exports.createWorldMap = function (selector, worldMapData) {
        var opts = {
            width: 600,
            height: 350,
            top: 30,
            right: 100,
            left: 30,
            bottom: 30
        };

        var domain = [0, d3.max(_.values(worldMapData))];

        var colorScale = d3.scale.quantize()
            .domain(domain)
            .range(["#FFFFFF", "#DAEBFF", "#A7D0FF", "#59A4FF", "#328AFF", "#2274F8"]);

        var mapScale = opts.width / 6.36;
        var proj = d3.geo.equirectangular().scale(mapScale).translate([opts.width / 2 + opts.left, opts.height / 2 + opts.top]).precision(.1);
        //var proj = d3.geo.mercator().center([0,70]).scale(120);
        var path = d3.geo.path().projection(proj);
        var t = proj.translate(); // the projection's default translation
        var s = proj.scale(); // the projection's default scale

        var container = d3.select(selector)
        var map = container.append("svg")
            .attr({
                width: opts.width + opts.left + opts.right + 'px',
                height: opts.height + opts.top + opts.bottom + 'px'
            });

        var axes = map.append("g").attr("id", "axes");
        var world = map.append("g").attr("id", "world");
        var countries;

        d3.json('json/worldcountries.json', function (worldJson) {
            countries = world.selectAll("g")
                .data(worldJson.features)
                .enter().append("g")
                .attr({
                    'id': function (d) {
                        //console.log(d);
                        //var arr = d.geometry.coordinates[0].reverse();//.slice(0,301);
                        //console.log(arr);
                        return d.id;
                    },
                    'class': 'country'
                });

            countries.append("path")
                .attr({
                    "d": path,
                    "class": 'area'
                })
                .style({
                    fill: '#fff',
                    stroke: '#e5e5e5'
                });

            renderData(worldMapData);
            drawLegend();
        });

        var renderData = function (data) {
            countries
                .each(function (d, i) {
                    d.value = data[d.id] || 0;
                })
                .on('mouseover', function (d, i) {
                    d3.select(this).select('path')
                        .classed('hover', true);

                    var position = d3.mouse(container.node());
                    tooltip.update(d, [position[0] + 5, position[1]]).show();
                })
                .on('mouseleave', function () {
                    d3.select(this).select('path')
                        .classed('hover', false);

                    tooltip.hide();
                })

            countries.selectAll('path')
                .style({
                    fill: function (d) {
                        return colorScale(d.value);
                    }
                });
        }
        var drawLegend = function () {
            var quantyList = colorScale.range();
            var rectWidth = 20, rectHeight = 20, startX = opts.width + opts.left + 20, startY = 200 - rectHeight * quantyList.length / 2, fontSize = 10;

            var legend = map.append('g')
                .attr({
                    'id': 'legend',
                    'transform': 'translate(' + startX + ',' + startY + ')'
                })
                .selectAll('g')
                .data(quantyList).enter().append('g')
                .attr({
                    'transform': function (d, i) {
                        return 'translate(0,' + (quantyList.length - i - 1) * rectHeight + ')';
                    }
                });

            legend.append('rect')
                .attr({
                    'width': rectWidth,
                    'height': rectHeight,
                    'fill': function (d, i) {
                        return d;
                    }
                });

            legend.append('text')
                .attr({
                    'x': rectWidth + 5,
                    'y': rectHeight * 0.5 + fontSize * 0.5
                })
                .style({
                    'font-size': fontSize + 'px',
                    'fill': '#555'
                })
                .text(function (d, i) {
                    return Math.round(colorScale.invertExtent(d)[0]) + '+';
                });
        }

        var tooltip = new Tooltip(container.node());
        tooltip.setTpl('\
			<div style="border-color:#ccc;">\
				<p class="tooltip-header">${properties.name}(${id})</p>\
				<p class="tooltip-sub">Count: ${value}</p>\
			</div>\
		')
    }

    //tooltip
    var Tooltip = function (container, opts) {
        var defaults = {
            data: {},
            tpl: '<div style="border-color:${color};"><p class="tooltip-header">${name}<span>${x}</span></p><p class="tooltip-sub">${yTitle}: ${y}</p>',
            position: [0, 0],
            transition: true
        };
        opts = _.extend(defaults, opts);
        this.id = opts.id;
        this.tpl = opts.tpl;
        this.data = opts.data;
        this.$container = $(container);
        this.position = opts.position
        this.transition = opts.transition
        this.init();
    }

    Tooltip.prototype = {
        constructor: Tooltip,
        init: function () {
            this.$el = $('<div class="tooltip"></div>');
            this.$el.attr('id', this.id);
            this.$container.append(this.$el);
            this.$el.hide();
            this.update(this.data, [0, 0]);
        },
        setTpl: function (tpl) {
            this.tpl = tpl;
            return this;
        },
        show: function () {
            this.$el.show();
            return this;
        },
        hide: function () {
            this.$el.hide();
            return this;
        },
        update: function (data, position) {
            this.content = juicer(this.tpl, data);
            this.$el.html(this.content);

            if (this.transition) {
                d3.select(this.$el[0])
                    .transition()
                    .style({
                        left: position[0] + 'px',
                        top: position[1] + 'px'
                    });
            } else {
                d3.select(this.$el[0])
                    //.transition()
                    .style({
                        left: position[0] + 'px',
                        top: position[1] + 'px'
                    });
            }

            return this;
        }
    }

    //create raw data for line
    var data = makeRawData([
        {
            name: 'google',
            xSeries: [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014],
            yDomain: [12, 78],
            color: 'blue'
        },
        {
            name: 'apple',
            xSeries: [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014],
            yDomain: [5, 97],
            color: 'red'
        },
        {
            name: 'htc',
            xSeries: [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014],
            yDomain: [3, 25],
            color: 'green'
        }
    ]);
    console.log(data);

    //create lineschart
    //createlinesChart('#line-chart', data);
    //
    ////create treemap
    //d3.json('json/treemap.json', function (e, treemapData) {
    //    //treemapData = data;
    //    createTreemap('#treemap-chart', treemapData);
    //});
    //
    //var worldPnData = {CHN: 5, USA: 10};
    //createWorldMap('#worldmap-chart', worldPnData);


});