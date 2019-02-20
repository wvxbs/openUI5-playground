sap.ui.define([
  'jquery.sap.global',
  'sap/ui/core/Fragment',
  'sap/ui/core/mvc/Controller',
  'sap/ui/model/json/JSONModel',
  'sap/m/MessageToast'
], function (JQuery, Fragment, Controller, JSONModel, MessageToast) {
  return Controller.extend('sap.ui.core.tutorial.odatav4.controller.shellDemo', {
    onInit : function () {

    },

    handlePressConfiguration : function () {
      var oItem = oEvent.getSource()
      var oShell = this.ById('myShell')
      var bState = oShell.getShowPane()
      oShell.setShowPanel(!bState)
      oItem.showShowMarker(!bState)
      oItem.setSelected(!bState)
      
    },

    handleLogoffPress : function () {

    },

    handlePressHome : function () {

    },

    handleUserItemPressed : function () {

    },

    handleSearchPressed : function () {

    }
  })
})
