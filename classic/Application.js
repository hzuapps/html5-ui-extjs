/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('Infoaas.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Infoaas',

    stores: [
        // TODO: add global / shared stores here
    ],

    appFolder: 'classic',
    
    launch: function () {
        // TODO - Launch the application
        Ext.Loader.enabled = true;
        //console.dir('Theme is ' + Ext.themeName);
        setTimeout(function(){
            if (Ext.get('loading')) {
                Ext.get('loading').remove();
                Ext.get('loading-mask').fadeOut({remove:true});
            }
        }, 250);
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('应用已更新', '是否重新加载应用？',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
