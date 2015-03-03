/**
 * Created by gujun on 12/30/14.
 */
define(function(require,exports){
    require('d3');
    require('juicer');


    var makeRawData = function(collection) {
        var data = {
            config: {
                axis:[
                    {name: 'year', title: 'Application Year', axis: 'x'},
                    {name: 'value', title: 'Patent Count', axis: 'y'}
                ],
                currentSeries: 'google',
                currentY: 2014
            },
            items: []
        };

        //length = xArr.length;

        _.each(collection, function(item, index) {
            var nodes = item.nodes = [];
            var length = item.xSeries.length;
            for(var i = 0; i < length; i++) {
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

    exports.processData = function(data) {
        var config = data.config;
        var xs = [], max = 0, nodes;
        var xName = _.find(config.axis, {axis: 'x'}).name,
            yName = _.find(config.axis, {axis: 'y'}).name,
            xTitle = _.find(config.axis, {axis: 'x'}).title,
            yTitle = _.find(config.axis, {axis: 'y'}).title;

        _.each(data.items, function(item, i) {
            nodes = item.nodes;
            if(config.currentSeries == item.name) {
                item.current = true;
            }
            _.each(nodes, function(node) {
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

    exports.createlinesChart = function(selector, dataObject) {
        var opts = {
            width: 1000,
            height: 350,
            top: 30,
            right: 30,
            left: 30,
            bottom: 30
        }

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

        console.log(x.range(), y.range());

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
                x: function(d) {
                    return  x(d) - xStep / 2;
                },
                y: yMax,
                width: xStep,
                height: y(0) - yMax
            })
            .style({
                fill: function(d, i) {
                    return i%2 ? 'white' : '#f8f8f8';
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
            .x(function(d) {
                return x(d.x);
            })
            .y(function(d) {
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
                'class':  function(d) {
                    return 'line' + (d.current ? ' current' : '');
                },
                'name': function(d) {
                    return d.name;
                }
            });

        var linePaths = plots
            .append('path')
            .attr({
                'd': function(d) {
                    return line(d.nodes);
                }
            })
            .style({
                'stroke': function(d) {
                    return d.color;
                }
            });

        //draw mark
        var markers = plots
            .selectAll('circle')
            .data(function(d) {
                return d.nodes
            })
            .enter()
            .append('circle')
            .attr({
                'position': function(d) {
                    return x(d.x) + ',' + y(d.y);
                },
                cx: function(d) {
                    return x(d.x);
                },
                cy: function(d) {
                    return y(d.y);
                },
                class: function(d) {
                    return 'marker' + (d.current ? ' current' : '');
                },
                r: 4
            })
            .style({
                stroke: function(d) {
                    return d.color;
                },
                fill: function(d) {
                    return d.color;
                }
            })
            .on('click', function(d) {
                console.log(d);
            })

        //init tooltip
        var currentTip = new Tooltip(container.node(), {
            id: 'current-tip',
            transition: true
        });
        var mouseTip = new Tooltip(container.node(), {
            id:'mouse-tip'
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
                class: function(d) {
                    return 'legend-item selected' + (d.current ? ' current' : '');
                }
            })
            .html(function(d) {
                var html = juicer(legendItemTpl, d);
                return html;
            })
            .style({
                width: function(d) {
                    return d.current ? 'auto' : (opts.width / 2 - 10) + 'px';
                },
                padding: '5px'
            });

        legendItem.on('click', function(d) {
            if(d.current) {
                return;
            }
            var d3this = d3.select(this);
            var select = true;
            if(d3this.attr('class').match(/selected/)) {
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
            .on('mouseenter', function() {

            })
            .on('mousemove', function() {
                var currentMouse = d3.mouse(canvas.node()),
                    currentX = currentMouse[0],
                    currentY = currentMouse[1];

                if(currentY > y(0) || currentY < yMax) {
                    return;
                }
                var xIndex = (_.sortedIndex(x.range(), currentX - xStep / 2));
                var key = x.domain()[xIndex];
                if(!key || key == lastPositionX) {
                    return;
                }
                setCurrent(key);
            })
            .on('mouseleave', function(d) {
                setCurrent(dataObject.currentY);
                //markers.classed('selected', false);
                //d3.select(this).select('line').style('visibility', 'hidden');
            }
        );

        markers.on('mouseover', function(d) {
            if(d3.select(this).attr('class').match(/current/)) {
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

            markers.each(function(d) {
                var d3this = d3.select(this);
                if(d.x == key) {
                    d3this.classed('selected', true);
                    if(d3this.attr('class').match(/current/)) {
                        console.log(currentTip);
                        currentTip.update(d, [x(d.x) + 10, y(d.y)]).show();
                    }
                }
            });
        }

        //action
        setCurrent(dataObject.currentY);
        return canvas.node();
    }

    //tooltip
    var Tooltip = function(container, opts) {
        this.id = opts.id;
        this.tpl = opts.tpl ||
        '<div style="border-color:${color};"><p class="tooltip-header">${name}<span>${x}</span></p>\
        <p class="tooltip-sub">${yTitle}: ${y}</p>';
        this.data = opts.data || {};
        this.$container = $(container);
        this.position = opts.position || [0,0];
        this.transition = opts.transition;
        this.init();
    }

    Tooltip.prototype = {
        constructor: Tooltip,
        init: function() {
            this.$el = $('<div class="tooltip"></div>');
            this.$el.attr('id', this.id);
            this.$container.append(this.$el);
            this.$el.hide();
            this.update(this.data, [0,0]);
        },
        setTpl: function(tpl) {
            this.tpl = tpl;
            return this;
        },
        show: function() {
            this.$el.show();
            return this;
        },
        hide: function() {
            this.$el.hide();
            return this;
        },
        update: function(data, position) {
            this.content = juicer(this.tpl, data);
            this.$el.html(this.content);

            if(this.transition) {
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

    //create raw data
    var data = makeRawData([
        {
            name: 'google',
            xSeries: [2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014],
            yDomain: [12, 78],
            color: 'blue'
        },
        {
            name: 'apple',
            xSeries: [2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014],
            yDomain: [5, 97],
            color: 'red'
        },
        {
            name: 'htc',
            xSeries: [2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014],
            yDomain: [3, 25],
            color: 'green'
        }
    ]);
    console.log('data',data);

    //process rawdata
    //var dataObject = processData(chartData);
    //console.log('dataObject',dataObject);
    //
    ////create chart
    //createlinesChart('.charts-wrap', dataObject);

});

