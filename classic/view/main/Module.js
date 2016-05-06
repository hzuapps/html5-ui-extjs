/**
 * 模块界面。
 */
Ext.define('Infoaas.view.main.Module', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-module',

    requires: [
        'Infoaas.view.main.ModuleController'
    ],

    controller: 'module',

    layout: 'border',
    border: false,

    items: [{
        id: 'menu-module',
        region: 'west',
        title: '首页', 
        titleAlign: 'center',
        width: Ext.isThemeClassic() ? 90 : 120,  
        minWidth: Ext.isThemeClassic() ? 90 : 120,
        maxWidth: Ext.isThemeClassic() ? 90 : 120,
        split: true,

        dockedItems: [{
            xtype: 'toolbar',
            dock: 'left',
            width: Ext.isThemeClassic() ? 89 : 119,
            defaults: {
                width:Ext.isThemeClassic() ? 84 : 104,
                scale: 'medium',
                iconAlign: 'top',
                enableToggle: true,
                toggleGroup: 'features',
                listeners: {
                    'toggle' : 'onFeatureButtonToggle'
                }
            },
            // 模块下的特性菜单
            items: [{
                id: 'feature-loading',
                text: '加载中',
                icon: 'resources/icons/access_time_24.png'
            }]
        }],

        html: '&nbsp;'
    }, {
        title: '1',
        id: 'feature-content',
        region: 'center',
        xtype : 'container',
        layout: 'card',
        border: false,
        items: [{
            id: "content-loading",
            title: "请稍候",
            border: false,
            html : '<center><img src="resources/images/loading.gif" /></center>'
        }]
    }]
});
