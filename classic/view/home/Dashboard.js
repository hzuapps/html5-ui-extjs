/**
 * 模块界面。
 */
Ext.define('Infoaas.view.home.Dashboard', {
    extend: 'Ext.panel.Panel',
    xtype: 'home-dashboard',

    requires: [
        'Ext.chart.*'
    ],

    //controller: 'module',

    title: "仪表板",

    layout: {            
        type: 'hbox',
        align: 'stretch'
    },

    items : [{
        flex: 1,
        xtype: 'cartesian',
        margin: 5,
        reference: 'chart',
        width: '100%',
        //height: 500,
        interactions: {
            type: 'panzoom',
            zoomOnPanGesture: true
        },
        animation: {
            duration: 200
        },
        store: Ext.create('Ext.data.Store', {
            fields: ['month', 'data1', 'data2', 'data3', 'data4', 'other'],
            data: [
                { month: 'Jan', data1: 20, data2: 37, data3: 35, data4: 4, other: 4 },
                { month: 'Feb', data1: 20, data2: 37, data3: 36, data4: 5, other: 2 },
                { month: 'Mar', data1: 19, data2: 36, data3: 37, data4: 4, other: 4 },
                { month: 'Apr', data1: 18, data2: 36, data3: 38, data4: 5, other: 3 },
                { month: 'May', data1: 18, data2: 35, data3: 39, data4: 4, other: 4 },
                { month: 'Jun', data1: 17, data2: 34, data3: 42, data4: 4, other: 3 },
                { month: 'Jul', data1: 16, data2: 34, data3: 43, data4: 4, other: 3 },
                { month: 'Aug', data1: 16, data2: 33, data3: 44, data4: 4, other: 3 },
                { month: 'Sep', data1: 16, data2: 32, data3: 44, data4: 4, other: 4 },
                { month: 'Oct', data1: 16, data2: 32, data3: 45, data4: 4, other: 3 },
                { month: 'Nov', data1: 15, data2: 31, data3: 46, data4: 4, other: 4 },
                { month: 'Dec', data1: 15, data2: 31, data3: 47, data4: 4, other: 3 }
            ]
        }),
        insetPadding: 40,
        innerPadding: {
            left: 40,
            right: 40
        },
        sprites: [{
            type: 'text',
            text: 'Line Charts - Basic Line',
            fontSize: 22,
            width: 100,
            height: 30,
            x: 40, // the sprite x position
            y: 20  // the sprite y position
        }, {
            type: 'text',
            text: 'Data: Browser Stats 2012',
            fontSize: 10,
            x: 12,
            y: 470
        }, {
            type: 'text',
            text: 'Source: http://www.w3schools.com/',
            fontSize: 10,
            x: 12,
            y: 485
        }],
        axes: [{
            type: 'numeric',
            position: 'left',
            grid: true,
            minimum: 0,
            maximum: 24,
            renderer: function (axis, label, layoutContext) {
                // Custom renderer overrides the native axis label renderer.
                // Since we don't want to do anything fancy with the value
                // ourselves except appending a '%' sign, but at the same time
                // don't want to loose the formatting done by the native renderer,
                // we let the native renderer process the value first.
                return layoutContext.renderer(label) + '%';
            }
        }, {
            type: 'category',
            position: 'bottom',
            grid: true,
            label: {
                rotate: {
                    degrees: -45
                }
            }
        }],
        series: [{
            type: 'line',
            xField: 'month',
            yField: 'data1',
            style: {
                lineWidth: 2
            },
            marker: {
                radius: 4,
                lineWidth: 2
            },
            label: {
                field: 'data1',
                display: 'over'
            },
            highlight: {
                fillStyle: '#000',
                radius: 5,
                lineWidth: 2,
                strokeStyle: '#fff'
            },
            tooltip: {
                trackMouse: true,
                showDelay: 0,
                dismissDelay: 0,
                hideDelay: 0,
                renderer: function (tooltip, record, item) {
                    tooltip.setHtml(record.get('month') + ': ' + record.get('data1') + '%');
                }
            }
        }],
        listeners: {
            itemhighlightchange: function (chart, newHighlightItem, oldHighlightItem) {
                if (newHighlightItem) {
                    newHighlightItem.series.setStyle({
                        lineWidth: 4
                    });
                }
                if (oldHighlightItem) {
                    oldHighlightItem.series.setStyle({
                        lineWidth: 2
                    });
                }
            }
        }
    }, {
        flex: 1,
        xtype: 'cartesian',
        margin: 5,
        reference: 'chart',
        store: Ext.create('Ext.data.Store', {
            fields: [
                'month',
                'high',
                'low',
                {
                    name: 'highF',
                    calculate: function (data) {
                        return data.high * 1.8 + 32;
                    }
                },
                {
                    name: 'lowF',
                    calculate: function (data) {
                        return data.low * 1.8 + 32;
                    }
                }
            ],
            data: [
                { month: 'Jan', high: 14.7, low: 5.6  },
                { month: 'Feb', high: 16.5, low: 6.6  },
                { month: 'Mar', high: 18.6, low: 7.3  },
                { month: 'Apr', high: 20.8, low: 8.1  },
                { month: 'May', high: 23.3, low: 9.9  },
                { month: 'Jun', high: 26.2, low: 11.9 },
                { month: 'Jul', high: 27.7, low: 13.3 },
                { month: 'Aug', high: 27.6, low: 13.2 },
                { month: 'Sep', high: 26.4, low: 12.1 },
                { month: 'Oct', high: 23.6, low: 9.9  },
                { month: 'Nov', high: 17  , low: 6.8  },
                { month: 'Dec', high: 14.7, low: 5.8  }
            ]
        }),
        insetPadding: {
            top: 40,
            bottom: 40,
            left: 20,
            right: 40
        },
        interactions: {
            type: 'itemedit',
            tooltip: {
                //renderer: 'onEditTipRender'
            }//,
            //renderer: 'onColumnEdit'
        },
        axes: [{
            type: 'numeric',
            position: 'left',
            minimum: 30,
            titleMargin: 20,
            title: {
                text: 'Temperature in °F'
            },
            listeners: {
                //rangechange: 'onAxisRangeChange'
            }
        }, {
            type: 'category',
            position: 'bottom'
        }],
        animation: Ext.isIE8 ? false : true,
        series: {
            type: 'bar',
            xField: 'month',
            yField: 'highF',
            style: {
                minGapWidth: 20
            },
            highlight: {
                strokeStyle: 'black',
                fillStyle: 'gold'
            },
            label: {
                field: 'highF',
                display: 'insideEnd'//,
                //renderer: 'onSeriesLabelRender'
            }
        },
        sprites: {
            type: 'text',
            text: 'Redwood City Climate Data',
            fontSize: 22,
            width: 100,
            height: 30,
            x: 40, // the sprite x position
            y: 20  // the sprite y position
        },
        listeners: {
            //afterrender: 'onAfterRender',
            //beginitemedit: 'onBeginItemEdit',
            //enditemedit: 'onEndItemEdit'
        }
    }]
});
