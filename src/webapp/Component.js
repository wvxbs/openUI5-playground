sap.ui.define([
    'sap/ui/core/UIComponent'
], function (UIComponent) {
    'use strict'

    return UIComponent.extend('playground.Component', {
        metadata: {

        },

        /**
		* The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		* @public
		* @override
		*/

        init: function () {
            UIComponent.prototype.init.apply(this, arguments)

            this.setModel(models.createDeviceModel(), 'device')

            this.getRouter().initalize()
        }
    })
})