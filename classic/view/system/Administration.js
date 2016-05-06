/**
 * 系统管理界面。
 */
Ext.define('Infoaas.view.system.Administration', {
    extend: 'Ext.panel.Panel',
    xtype: 'system-administration',

    requires: [
        //'Infoaas.view.system.SettingsController'
    ],

    //controller: 'settings',

    //layout: 'border',
    title: "数据管理",
    closable: true,

    items: [{        
        bodyPadding: 5,
        html : "TODO 系统数据管理"
    }],

    listeners: {
        'close' : function(comp) {
            var main = comp.up('app-main');
            main.getController().redirectBack();
        }
    }
});
