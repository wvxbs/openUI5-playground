sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageToast',
    'sap/m/MesssaBox'
], function(Controller, JSONModel, MessageToast, MesssaBox) {
    'use strict'
    
    return Controller.extend('sap.ui.demo.sidebar.controller.App', {
        onInit : function () {
            var JSONData = {
                busy : false
            }
            var oModel = new JSONModel(oJSONData)
            this.getView().setModel(oModel, 'appView')

        },

        onRefresh : function() {
            var oBinding = this.byId('peopleList').getBinding('itens')

            if(oBinding.hasPendingChanges()) {
                MessageBox.error(this._getText('refreshSuccessMessage'))
            }
            oBinding.refresh()

            MessageToast.show(this._getText('refreshSuccessMessage'))
            
        },

        _getText : function () {
            return this.getOwnerComponent().getModel('i18n').getResourceBundle().getText(sTextId, args)
        }
    })
})