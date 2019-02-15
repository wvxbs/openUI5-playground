sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageToast',
    'sap/m/MessageBox',
    'sap/ui/model/Sorter',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/ui/model/FilterType'
], function(Controller, JSONModel, MessageToast, MessageBox, Sorter, Filter, FilterOperator, FilterType) {
    'use strict'

    return Controller.extend('sap.ui.demo.sidebar.controller.App', {
        onInit : function () {
            var JSONData = {
                busy : false,
                order : 0
            }
            var oModel = new JSONModel(oJSONData)
            this.getView().setModel(oModel, 'appView')

        },

        onRefresh : function() {
            var oBinding = this.byId('peopleList').getBinding('items')

            if(oBinding.hasPendingChanges()) {
                MessageBox.error(this._getText('refreshSuccessMessage'))
            }
            oBinding.refresh()

            MessageToast.show(this._getText('refreshSuccessMessage'))

        },

        onSearch() : function() {
          var oView = this.getView(),
          sValue = oView.byId('searchField').getValue()
        }

        _getText : function (sTextId, aArgs) {
            return this.getOwnerComponent().getModel('i18n').getResourceBundle().getText(sTextId, aArgs)
        }
    })
})
