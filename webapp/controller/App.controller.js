sap.ui.define([
  'jquery.sap.global',
	 'sap/m/MessageToast',
  	'sap/ui/core/Fragment',
  	'sap/ui/core/mvc/Controller',
  	'sap/ui/model/Filter',
  	'sap/ui/model/json/JSONModel',
  	'sap/base/Log'
], function(JQuery, MessageToast, Fragment, Controller, Filter, JSONModel, log) {
    return Controller.extend('sap.ui.core.tutorial.odatav4.controller.App', {

      onInit : function () {

      },

      getSplitAppObj : function() {
        var result = this.byId("SplitAppDemo");
        if (!result) {
          Log.info("SplitApp object can't be found");
        }
        return result;
      },

      onB1Press : function () {
        this.getSplitAppObj().to(this.createId('query'))
      },

      onB2Press : function () {
        this.getSplitAppObj().to.this.createId('wow')
      },
    })
})
