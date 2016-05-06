/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('Infoaas.Api', {
    staticUrl : {
        profile: 'classic',
        menu: {
            navi: {
                get: 'resources/json/menu_navi.json',
                zengsn: 'resources/json/menu_navi_zengsn.json'
            },
            module: {
                get: 'resources/json/menu_module.json',
                home: 'resources/json/menu_module_home.json',
                system: 'resources/json/menu_module_system.json',
                content: 'resources/json/menu_module_content.json'
            }
        },
        feature: {
            get: 'resources/json/feature.json',
            // 前端开发提供2个静态演示界面
            'home-dashboard': 'resources/json/feature-home-dashboard.json',
            'home-notifications': 'resources/json/feature-home-notifications.json',
            // 系统模块
            'system-administration': 'resources/json/feature-system-administration.json',
            'system-settings': 'resources/json/feature-system-settings.json',
            'system-login': 'resources/json/feature-system-login.json'
        },
        login: {
            get: 'resources/json/login.json',
            post: 'resources/json/login.json'
        }
    },
    dynamicUrl: {
        profile: 'classic',
        menu: {
            navi: {
                get: 'resources/json/menu_navi.json'
            },
            module: {
                get: 'resources/json/menu_module.json'
            }
        },
        feature: { 
            // 后端时特性作为参数传入
            get: 'resources/json/feature.json'
        },
        login: {
            get: 'resources/json/login.json',
            post: 'resources/json/login.json'
        }
    },
    isDev  : function() {
        //return window.location.toString().indexOf('1841')>-1;
        return true;
    },
    getUrl : function() {
        return this.isDev() ? this.staticUrl : this.dynamicUrl;
    }  
});

var Api = Ext.create('Infoaas.Api').getUrl();

Ext.isThemeClassic = function() {
    return Ext.themeName === 'classic' || Ext.themeName === 'gray';
}

//console.dir(Api);
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}
function getAllQueryVariables(query) {
    var query = query?query:window.location.search.substring(1);
    var vars = query.split('&'); //console.dir(query);
    var variables = {}; //console.dir(vars);
    for (var i = 0; i < vars.length; i++) {
        //console.dir(vars[i]);
        if (vars[i].indexOf('=')>-1) {
            var pair = vars[i].split('=');
            var key = decodeURIComponent(pair[0]);
            var value = decodeURIComponent(pair[1]);
            variables[key] = value;
        } else {
            var key = decodeURIComponent(vars[i]);
            variables[key] = '';
        }
    }
    return variables;
}