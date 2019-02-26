sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("sap.ui.core.tutorial.odatav4.controller.Startpage", {
		onInit: function () {},
		
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
		}
	});
});
