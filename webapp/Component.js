sap.ui.define([
	'sap/ui/core/UIComponent',
	'sap/ui/core/tutorial/odatav4/model/models'
], function(UIComponent, models) {
	'use strict'

	return UIComponent.extend('sap.ui.core.tutorial.odatav4.Component', {

		metadata: {
			manifest: 'json'
		},

		/**
		 * @public
		 * @override
		 */
		init: function() {
			UIComponent.prototype.init.apply(this, arguments)
			this.setModel(models.createDeviceModel(), 'device')
		}
	})
})