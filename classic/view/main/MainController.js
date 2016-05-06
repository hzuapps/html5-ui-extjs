/**
 * 主界面Main的视图控制器。
 */
Ext.define('Infoaas.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    listen : {
        controller : {
            '#' : {
                unmatchedroute : 'onRouteChange'
            }
        }
    },

    routes: {
        ':path': 'onRouteChange'
    },

    /********************************************************/
    // 单页应用：URL带页内地址时（#module/feature）             
    /********************************************************/
    onRouteChange:function(path){
        var me = this; 
        var main = me.getView();
        //console.dir('onRouteChange()->'+path);

        /********************************************************/
        // 参数：me.routeParams，保存路径所带的模块、特性、参数等      
        /********************************************************/
        me.routeParams = me.parseRoute(path);

        // 加载导航菜单
        if (!me.currentNaviButton) { // 导航按钮未点下
            me.loadNaviMenu('byRoute'); // 加载时会点下相应的按钮
        } 

        // 打开特性界面
        if (me.routeParams.feature) {
            me.openView('byRoute'); //console.dir('onRouteChange()->openView');
        } else { // 只有模块名，没有特性
            me.loadModuleMenu(); // 加载模块的特性
        }

        // 加载用户工具栏
        me.loadUserMenu();
        
    },

    /********************************************************/
    // 根据URL解析应用信息，格式：module/feature?back=123&param 
    /********************************************************/
    parseRoute : function(path) {
        var me = this;
        var route = {};
        var pos = path.indexOf('/');
        if (pos > 0) {
            route.module = path.substring(0, pos);
            var feature = path.substring(pos); //console.dir(feature);
            pos = feature.indexOf('?');
            if (pos > 0) {
                route.feature = feature.substring(1, pos);
                var params = feature.substring(pos+1); //console.dir(params);
                route.params = getAllQueryVariables(params);
            } else { // 没有参数
                route.feature = feature.substring(1);
            }
        } else { // 只有模块
            route.module = path;
        }
        return route;
    },

    /********************************************************/
    // 将解析的路由信息转换为URL字符串，用于跳转界面。 
    /********************************************************/
    getRouteAsString : function() {
        var me = this;
        var path = '';
        // 可能是首页，没有Route
        if (me.routeParams && me.routeParams.module) {
            path += me.routeParams.module;
            if (me.routeParams.feature) {
                path += '/'+me.routeParams.feature;
            }
            var params = me.routeParams.params;
            if (params) {
                path += '?';
                for(var prop in params) {
                    if (params.hasOwnProperty(prop)) {
                        path += prop+'='+params[prop]+'&';
                    }
                }
            }
        }
        return path;
    },

    /********************************************************/
    // 界面初次构建（发生在routeChange之前）
    /********************************************************/
    onViewportRender : function(comp) {
        //console.dir('Viewport render');
        var me = this;

        // 加载导航菜单
        me.loadNaviMenu();

        // 加载用户菜单
        me.loadUserMenu();
    },

    /********************************************************/
    // 用户点击或程序切换导航按钮，访问该模块的内容
    /********************************************************/
    onNaviButtonToggle: function (button, isPressed) {
        var me = this;
        if (isPressed) { // 按钮按下
            var module = button.id.replace('navi-','');
            // 记录当前访问的模块按钮
            me.currentNaviButton = button; 
            // 按钮点下时，先加载模块菜单
            me.loadModuleMenu(module);
            // 检查是否有路由信息
            if (!me.routeParams) { // 首页
                // 首页访问，没有路由，则之前是首页
                if (module != 'home') {
                    me.redirectTo(module); // 触发路由变化
                }                
            } else if (me.routeParams.module == module) {
                // 路由触发，模块相同，不需要处理
            } else { // 有路由，且不相同，跳转到该路径
                me.redirectTo(module); // 触发路由变化
            }
        }
    },

    /********************************************************/
    // 判断路径中的模块与当前导航按钮是否不同
    /********************************************************/
    isNaviButtonChange : function() {
        var me = this;
        var module = me.routeParams ? me.routeParams.module : 'home';
        var currentId = me.currentNaviButton ? me.currentNaviButton.id : '';
        return currentId && currentId != 'navi-'+module;
    },

    /********************************************************/
    // 判断路径中的模块是否在导航菜单中
    /********************************************************/
    isNavigatable : function() {
        var me = this;
        var module = me.routeParams ? me.routeParams.module : '';
        return module && me.getNaviButton(module);
    },

    onThemeSelect : function(item) {
        var me = this;
        var theme = item.id; console.dir(theme);
        var defaultTheme = 'triton';
        Ext.themeName = me.getQueryParam('theme') || defaultTheme;
        if (theme !== defaultTheme) {
            me.setParam({ theme: theme });
        } else {
            me.removeParam('theme');
        }
    },

    onSettingsClick: function(btn) {
        var me = this;
        var back = me.getRouteAsString();
        if (me.currentNaviButton) {
            me.currentNaviButton.toggle(false);
            me.currentNaviButton = null;
        }
        me.redirectTo('system/settings?back='+back);
    },

    onAdministrationClick: function(btn) {
        var me = this;
        var back = me.getRouteAsString();
        if (me.currentNaviButton) {
            me.currentNaviButton.toggle(false);
            me.currentNaviButton = null;
        }
        me.redirectTo('system/administration?back='+back);
    },

    onLoginClick : function(btn) {
        var me = this;
        me.currentModule = 'system';
        if(me.currentNaviButton) {
            me.currentNaviButton.toggle(false);
            me.currentNaviButton = null;
        }
        // Login URL
        var url = 'system/login';
        var back = me.getRouteAsString();
        if (back) {
            url += '?back='+back;
        }
        me.redirectTo(url);
    },

    onLogoutClick : function(item) {
        var me = this;
        me.user = undefined;
        // TODO 
        me.isNaviMenuReady = false;
        me.currentNaviButton = '';
        me.redirectTo('home');
    },

    onUserEdit : function(item) {
        var me = this;
        //console.dir('onUserEdit()->'+me.user.username);
        // TODO
    },

    /********************************************************/
    // 根据用户登录状态加载和显示导航按钮
    /********************************************************/
    loadNaviMenu : function() {
        var me = this;
        var view = me.getView();        

        /********************************************************/
        // 参数 me.isNaviMenuReady：   表示导航栏是否加载
        // 参数 me.user：              记录登录用户的信息
        /********************************************************/
        if (!me.isNaviMenuReady || me.user ) { //（从）未加载用户或登录之后 
            view.mask(); // 锁定界面
            var naviMenu = me.getNaviMenu();
            var url = Api.menu.navi.get;
            if (me.user) { // 用户登录之后，静态时获取不同的菜单
                url = Api.menu.navi[me.user.username] || Api.menu.navi.get;
            }
            Ext.Ajax.request({
                url: url,
                success: function(response, opts) {
                    // 先清除原有按钮
                    naviMenu.removeAll();
                    // 再解析并添加新按钮
                    var obj = Ext.decode(response.responseText);
                    var items = obj.menu;
                    for (var i=0;i<items.length;i++) {
                        var item = naviMenu.add(items[i]);
                    }               
                    // 检查主菜单按钮状态
                    me.toggleNaviMenu();
                    // 标准导航菜单状态
                    me.isNaviMenuReady = true;
                    view.unmask(); // 释放界面
                },
                failure: function(response, opts) {
                    console.log('服务器错误代码：' + response.status);
                }
            });
        } else { // 直接检查主菜单按钮状态
            me.toggleNaviMenu();
        }
    },

    /********************************************************/
    // 检查主菜单按钮的状态，根据参数点亮按钮
    /********************************************************/
    toggleNaviMenu : function() {
        var me = this;
        var naviMenu = me.getNaviMenu();
        var module = me.routeParams ? me.routeParams.module : 'home';
        var button = naviMenu.down('#navi-'+module);
        if (button) { 
            //console.dir('toggle button');
            button.toggle(true);
            //me.currentNaviButton = button;
        } else { // 非导航栏所显示的任何一个模板，如system
            if (me.currentNaviButton) { 
                //console.dir('remove current navi');
                me.currentNaviButton.toggle(false);
                me.currentNaviButton = null;
            }            
        }     
    },

    getNaviMenu : function() {
        var me = this;
        var view = me.getView();
        return view.down('#menu-navi');
    },

    getNaviButton : function(module) {
        var me = this;
        return me.getNaviMenu().down('#navi-'+module);
    },

    /********************************************************/
    // 加载与用户相关的按钮
    /********************************************************/
    loadUserMenu : function() {
        var me = this;
        var view = me.getView();
        var guestMenu = view.down('#menu-guest');
        var userMenu  = view.down('#menu-user');
        //console.dir('loadUserMenu()->'+me.user);
        if (!me.user) { // 未登录
            guestMenu.show();
            userMenu.hide();
        } else { // 已登录
            guestMenu.hide();
            userMenu.show();
            // 检查菜单是否更新
            if (!me.user.isMenuReady) {
                // 设置用户信息
                var userBtn = userMenu.down('#user');
                userBtn.setText(me.user.nickname);
                // 控制管理按钮
                var adminBtn = userMenu.down('#administration');
                if (me.user.isAdmin) {
                    adminBtn.show();
                } else {
                    adminBtn.hide();
                }
                // 用户菜单准备就绪
                me.user.isMenuReady = true;
                // 设置检查用户状态的轮循方法
                // TODO
            }
        }
    },

    /********************************************************/
    // 加载该模块的特性列表
    /********************************************************/
    loadModuleMenu: function() {
        var me = this;
        var view = me.getView();
        var panel = view.down('#menu-module'); 
        var module = me.routeParams ? me.routeParams.module : 'home';
        /********************************************************/
        // 参数 me.currentModuleMenu 记录当前的模块菜单
        /********************************************************/
        if (module == me.currentModuleMenu) {
            return; // 该模块菜单当前已显示，不需要加载
        }
        panel.show(); //console.dir('loadModuleMenu()->show');// 应该显示 
        panel.mask(); //console.dir('loadModuleMenu->'+module);
        var toolbar = panel.getDockedItems('toolbar[dock="left"]')[0];
        Ext.Ajax.request({
            url: Api.menu.module[module]?Api.menu.module[module]:Api.menu.module.get,
            params: {module: module},
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                var items = obj.menu;
                // 有新的功能菜单项
                if (items && items.length>0) {
                    toolbar.removeAll(); 
                    // 显示模块的功能菜单项
                    var toggleItem = null;
                    var firstItem = null;
                    for (var i=0;i<items.length;i++) {
                        var item = toolbar.add(items[i]);
                        if (me.routeParams&&me.routeParams.feature) {
                            if (items[i].id=='feature-'+me.routeParams.feature) {
                                toggleItem = item;
                            }
                        } 
                        if (i===0) {
                            firstItem = item;
                        }
                    }
                    if (toggleItem) {
                        toggleItem.toggle(true);
                    } else { // 打开第一个
                        firstItem.toggle(true);
                    }
                    //console.dir('loadModuleMenu()-> module='+module);
                    if (module == 'home') { 
                        // 记录首页的第一个特性
                        me.homeFirstFeature = firstItem.id.replace('feature-','');
                        //console.dir('loadModuleMenu()-> 1st='+me.homeFirstFeature);
                    }
                }
                panel.unmask(); 
                me.currentModuleMenu = module;
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },

    /********************************************************/
    // 根据参数打开界面：trigger 为触发的来源
    /********************************************************/
    openView : function(trigger, module, feature) {
        var me = this; 
        // 从参数中取得模块及特性名称
        if (!module) {
            module = me.routeParams ? (me.routeParams.module || 'home') : 'home';
        }
        if (!feature) {
            feature = me.routeParams ? me.routeParams.feature : '';
        }
        //console.dir('openView->'+module+':'+feature);
        if (module && feature) { // 打开界面
            var view = me.getView();
            var mView = view.down('app-module');
            // 检查主菜单是否有该模块
            //console.dir('openView->'+me.getNaviButton(module));
            var maximum = me.getNaviButton(module) ? false : true;
            var mController = mView.getController();
            var viewId = module+'-'+feature; //console.dir('max='+maximum);
            mController.openFeatureView(viewId, maximum);
        }
    },

    redirectToFeature : function(feature) {
        var me = this; //console.dir('redirectToFeature()->'+feature);
        if (!me.routeParams) { // 没有路径参数，是首页
            //console.dir('redirectToFeature()-> 1st='+me.homeFirstFeature);
            /********************************************************/
            // 参数 me.homeFirstFeature 首页的第1个特性，可以不显示在URL中
            /********************************************************/
            if (!me.homeFirstFeature||me.homeFirstFeature==feature) { // 直接打开
                //console.dir('redirectToFeature()->open home first feature');
                me.openView('byToggle', 'home', feature); 
            } else { // 非第1个特性时，转发到该特性的URL
                //console.dir('redirectToFeature()->redirect home feature');
                me.redirectTo('home'+'/'+feature); 
            }            
        } else if (feature != me.routeParams.feature) { 
            // 有不同的路径参数，则跳转
            //console.dir('redirectToFeature()->redirect view');
            me.redirectTo(me.routeParams.module+'/'+feature); 
        } else { // 相同，则为当前要打开的界面，直接打开
            me.openView('byToggle'); // 参数已存
            //console.dir('redirectToFeature()->open view');
        }        
    },

    redirectBack : function() {
        var me = this;
        me.currentModule = null;
        me.currentNaviButton = null;
        if (me.routeParams.params) {
            me.redirectTo(me.routeParams.params.back);
        } else {
            me.redirectTo('home/dashboard');
        }
    },

    setParam : function(param) {
        var queryString = Ext.Object.toQueryString(
            Ext.apply(Ext.Object.fromQueryString(location.search), param)
        );
        location.search = queryString;
    },

    removeParam : function(paramName) {
        var params = Ext.Object.fromQueryString(location.search);

        delete params[paramName];

        location.search = Ext.Object.toQueryString(params);
    },

    getQueryParam : function(name, queryString) {
        var match = RegExp(name + '=([^&]*)').exec(queryString || location.search);
        return match && decodeURIComponent(match[1]);
    }
});
