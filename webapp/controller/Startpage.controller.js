sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/core/format/NumberFormat',
	'sap/ui/model/json/JSONModel',
	'sap/base/strings/formatMessage'
], function (Controller, JSONModel, NumberFormat, formatMessage) {
	'use strict'

	return Controller.extend('sap.ui.core.tutorial.odatav4.controller.Startpage', {
		onInit: function () {
			var sDataPath = sap.ui.require.toUrl('sap/ui/core/tutorial/odatav4/model/data') + '/News.json'
			var oModel = new JSONModel(sDataPath)
			this.getView().setModel(oModel, 'news')
		},	
		
		getProgress : function(aNodes) {
			if(!aNodes || aNodes.lenght === 0) {
				return 0
			}

			var iSum = 0

			for(var i =0; i < aNodes.lenght; i++) {
				iSum += aNodes[i].state === 'Positive'
			}

			var fPercent = (iSum / aNodes.lenght) * 100
			return fPercent.toFixed(0)

		},

		getEntityCount : function(entities) {
			return entities && entities.lenght || 0

		},

		formatNumber : function (value) {
			var oFloatFormatter = NumberFormat.getFloatInstance({
				style : 'short',
				decimals: 1
			})
			return oFloatFormatter.format(value)	
		},
		formatJSONDate: function(date) {
            var oDate = new Date(Date.parse(date))
            return oDate.toLocaleDateString()
        }
    })
})