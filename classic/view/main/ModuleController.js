/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Infoaas.view.main.ModuleController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.module',

    onFeatureButtonToggle: function (button, isPressed) {
        var me = this;
        if (isPressed) {
            //var container = button.up();
            var feature = button.id.replace('feature-',''); 
            //console.dir('onFeatureButtonToggle()->'+feature);
            var mainController = me.getMainController();
            mainController.redirectToFeature(feature);
        }
    },

    openFeatureView : function(feature, maximum) {
        var me = this;
        var panel = me.getFeatureContentPanel();

        // 显示特性菜单
        var menuPanel = me.getFeaturenMenuPanel();
        if (maximum) { // 最大化，隐藏特性菜单
            menuPanel.hide(); // 隐藏
        } else if (menuPanel.isHidden()) {
            menuPanel.show(); // 显示 
        }

        // 先直接显示，如果已经添加则
        var card = me.showFeatureView(feature);
        if (card) {  // 已经存在，
            return;  // 则直接显示。
        }

        panel.mask();
        var url = Api.feature[feature] // 静态演示
                    ? Api.feature[feature] : Api.feature.get;
        Ext.Ajax.request({
            url: url,
            params: {feature: feature},
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText) || {};
                var config = obj.feature;
                if (!config) {
                    me.showFailureContent('加载失败！');
                } else { // 读取到配置，开始加载界面
                    // 检查类名 viewClass
                    if (!config.viewClass) {
                        me.showFailureContent('界面的类名为空！');
                    } else if (config.viewPath) {
                        Ext.Loader.setPath(config.viewClass, config.viewPath);
                    }
                    // 加载类文件
                    Ext.require(config.viewClass, function() {
                        me.showFeatureView(feature, config);
                    });
                }
                panel.unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },

    showFeatureView : function(feature, config) {
        var me = this;
        var panel = me.getFeatureContentPanel();
        var cardId = 'content-'+feature;
        var card = panel.down("#"+cardId);
        if (!card && config) { // 不存在且有配置才添加
            if (config.xtype) {
                card = Ext.applyIf(config, {
                    id: cardId
                });
            } else { // 未指定xtype时直接创建
                card = Ext.create(config.viewClass, {
                    id: cardId
                });
            }
            card = panel.add(card);
        }
        if (card) { // 显示为当前界面
            panel.setActiveItem(card);
        }
        return card;
    },

    showFailureContent : function(message) {
        var me = this;
        var panel = me.getFeatureContentPanel();
        var loading = panel.down('#content-loading');
        loading.setTitle(message);
        panel.setActiveItem(loading);
    },

    getLoadingItem : function() {
        return {
            id: 'feature-loading',
            text: '加载中',
            icon: 'resources/icons/access_time_24.png'
        };
    },

    getFeaturenMenuPanel : function() {
        var me = this;
        var view = me.getView();
        return view.down('#menu-module');
    },

    getFeatureContentPanel : function() {
        var me = this;
        var view = me.getView();
        return view.down('#feature-content');
    },

    getMainController : function() {
        var me = this;
        var view = me.getView();
        var main = view.up('app-main');
        return main.getController();
    }
});
