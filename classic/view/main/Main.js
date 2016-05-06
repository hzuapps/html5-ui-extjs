/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Infoaas.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'Ext.layout.container.*',

        'Infoaas.view.main.MainController',
        'Infoaas.view.main.MainModel',

        'Infoaas.view.main.Module',

        'Infoaas.view.main.List'
    ],

    controller: 'main',
    viewModel: 'main',

    layout: 'border',
    border: false,

    items: [{
        region: 'north',
        xtype : 'container',
        height: 56,
        //split: true,
        //bodyPadding: 3,
        style: 'background-color:#000;',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        defaults: {
            layout: {
                type: 'hbox',
                align: 'stretch'
            }
        },
        items : [{
            xtype: 'container',
            width: 125,
            items: [{
                xtype: 'label',
                padding: '18 0 0 5',
                cls: 'logo-label',
                text : 'INFOaaS'
            }]
        }, {
            id: 'menu-navi',
            xtype: 'container',
            flex: 1,
            defaults: {
                xtype: 'button',
                iconAlign: 'left',
                scale : 'large',
                margin: '8 8 8 5',
                enableToggle: true,
                toggleGroup: 'navibuttons',
                listeners: {
                    'toggle' : 'onNaviButtonToggle'
                }
            },
            items: []
        }, {
            id: 'menu-guest',
            xtype: 'container',
            defaults: {
                xtype: 'button',
                iconAlign: 'left',
                scale : 'large',
                margin: '8 0 8 5'
            },
            items: [{
                id: 'login',
                xtype: 'button',
                icon: 'resources/icons/person_outline_32.png',
                text: '登录',
                handler: 'onLoginClick'
            }]
        }, {
            id: 'menu-user',
            xtype: 'container',
            width: 400,
            hidden: true,
            defaults: {
                xtype: 'button',
                iconAlign: 'left',
                scale : 'large',
                margin: '8 0 8 5'
            },
            items: [{
                xtype: 'container',
                flex : 1
            }, {
                id: 'administration',
                hidden: true,
                xtype: 'button',
                text : '管理',
                icon : 'resources/icons/apps_32.png',
                handler: 'onAdministrationClick'
            }, {
                id: 'notifications',
                xtype: 'button',
                icon: 'resources/icons/message_32.png'
            }, {
                id: 'user',
                xtype: 'splitbutton',
                icon: 'resources/icons/person_outline_32.png',
                text: '用户名',
                menu: [{
                    text: '编辑',
                    handler: 'onUserEdit'
                }, {
                    text: '退出',
                    handler: 'onLogoutClick'
                }]
            }, {
                id: 'settings',
                xtype: 'button',
                icon: 'resources/icons/settings_32.png',
                handler: 'onSettingsClick'
            }, {
                id: 'themes',
                xtype: 'button',
                icon: 'resources/icons/palette_32.png',
                menu: [{
                    id: 'triton',
                    text: "默认（蓝）",
                    handler: 'onThemeSelect'
                }, {
                    id: 'neptune',
                    text: "海神（深蓝）",
                    handler: 'onThemeSelect'
                }, {
                    id: 'crisp',
                    text: "香脆（浅灰）",
                    handler: 'onThemeSelect'
                }, {
                    id: 'classic',
                    text: "经典（蓝）",
                    handler: 'onThemeSelect' /*
                }, {
                    id: 'gray',
                    text: "经典（灰）",
                    handler: 'onThemeSelect'
                }, {
                    id: 'aria',
                    text: "高对比",
                    handler: 'onThemeSelect'*/
                }]
            }]
        }]
    }, {
        region: 'center',
        xtype: 'app-module',
        border: false
    }, {
        region: 'south',
        xtype : 'container',
        height: 42,
        layout: {            
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            flex: 1,
            xtype: 'container',
            padding: '10 0 0 0',
            html: '<center>&copy; 2016 版权所有 INFOaaS.net</center>'
        }]
    }],

    listeners: {
        'render': 'onViewportRender'
    }
});
