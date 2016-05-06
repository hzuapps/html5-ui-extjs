/**
 * 模块界面。
 */
Ext.define('Infoaas.view.home.Notifications', {
    extend: 'Ext.grid.Panel',
    xtype: 'home-notifications',

    requires: [
        'Ext.grid.*'
    ],

    //controller: 'module',

    title: "系统消息",

    store : Ext.create('Ext.data.Store', {
        storeId: 'simpsonsStore',
        fields:[ 'name', 'email', 'phone'],
        data: [
            { name: 'Lisa', email: 'lisa@simpsons.com', phone: '555-111-1224' },
            { name: 'Bart', email: 'bart@simpsons.com', phone: '555-222-1234' },
            { name: 'Homer', email: 'homer@simpsons.com', phone: '555-222-1244' },
            { name: 'Marge', email: 'marge@simpsons.com', phone: '555-222-1254' }
        ]
    }),

    columns: [
        { text: 'Name', dataIndex: 'name' },
        { text: 'Email', dataIndex: 'email', flex: 1 },
        { text: 'Phone', dataIndex: 'phone' }
    ]
});
