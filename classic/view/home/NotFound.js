/**
 * 模块界面。
 */
Ext.define('Infoaas.view.home.NotFound', {
    extend: 'Ext.panel.Panel',
    xtype: 'home-notfound',

    requires: [
        //'Infoaas.view.main.ModuleController'
    ],

    //controller: 'module',

    //layout: 'border',

    items: [{
        title: "特性不存在",
        bodyPadding: 5,
        html : "Feature not found!"
    }]
});
