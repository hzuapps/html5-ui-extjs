/**
 * 系统设置界面。
 */
Ext.define('Infoaas.view.system.Settings', {
    extend: 'Ext.panel.Panel',
    xtype: 'system-settings',

    requires: [
        //'Infoaas.view.system.SettingsController'
    ],

    //controller: 'settings',

    //layout: 'border',
    title: "帐号设置",
    closable: true,

    items: [{        
        bodyPadding: 5,
        html : "用户帐号设置!"
    }]
});
