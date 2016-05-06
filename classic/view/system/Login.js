/**
 * 系统设置界面。
 */
Ext.define('Infoaas.view.system.Login', {
    extend: 'Ext.form.Panel',
    xtype: 'system-login',

    requires: [
        'Ext.form.*'
    ],

    title: "登录帐号",
    bodyPadding: 10,
    closable: true,

    fieldDefaults: {
        labelAlign: 'right'
    },

    items: [{        
        xtype: 'textfield',
        fieldLabel: '帐号'
    }, {        
        xtype: 'textfield',
        fieldLabel: '密码'
    }, {
        xtype: 'fieldcontainer',
        fieldLabel: ' ',
        labelSeparator: ' ',
        items: [{
            xtype: 'button',
            text: '登录',
            handler: function(btn) {
                var panel = btn.up('system-login');
                panel.mask('正在登录……');
                // 发送登录请求
                Ext.Ajax.request({
                    url: Api.login.post,

                    success: function(response, opts) {
                        var obj = Ext.decode(response.responseText);
                        // 将登录信息保存到Main中
                        var main = btn.up('app-main');
                        main.getController().user = obj.user;
                        // 关闭登录窗口
                        panel.unmask();
                        panel.close();
                    },

                    failure: function(response, opts) {
                        console.log('server-side failure with status code ' + response.status);
                    }
                });
            }
        }]
    }],

    listeners: {
        'close' : function(comp) {
            var main = comp.up('app-main');
            main.getController().redirectBack();
        }
    }
});
