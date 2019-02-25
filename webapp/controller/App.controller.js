sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/model/Sorter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, MessageBox, Sorter, Filter, FilterOperator, FilterType, JSONModel) {
	"use strict"

	return Controller.extend("sap.ui.core.tutorial.odatav4.controller.App", {
		onInit : function () {
			var oMessageManager = sap.ui.getCore().getMessageManager(),
				oMessageModel = oMessageManager.getMessageModel(),
				oMessageModelBinding = oMessageModel.bindList("/", undefined, [],
					new Filter("technical", FilterOperator.EQ, true)),
				oViewModel = new JSONModel({
					busy : false,
					hasUIChanges : false,
					usernameEmpty : true,
					order : 0
				})

				this.getSplitAppObj().setHomeIcon({
				'phone':'phone-icon.png',
				'tablet':'tablet-icon.png',
				'icon':'desktop.ico'
			})

			this.getView().setModel(oViewModel, "appView")
			this.getView().setModel(oMessageModel, "message")

			oMessageModelBinding.attachChange(this.onMessageBindingChange, this)
			this._bTechnicalErrors = false
		},

		getSplitAppObj : function() {
			var result = this.byId("SplitAppDemo");
			if (!result) {
				Log.info("SplitApp object can't be found");
			}
			return result;
		},

		onCreate : function () {
			var oList = this.byId("peopleList"),
				oBinding = oList.getBinding("items"),
				// Create a new entry through the table's list binding
				oContext = oBinding.create({
					"UserName" : "",
					"FirstName" : "",
					"LastName" : "",
					"Age" : "18"
				})

			oContext.created().then(function () {
				oBinding.refresh()
			})

			this._setUIChanges(true)
			this.getView().getModel("appView").setProperty("/usernameEmpty", true)

			oList.getItems().some(function (oItem) {
				if (oItem.getBindingContext() === oContext) {
					oItem.focus()
					oItem.setSelected(true)
					return true
				}
			})
		},

		onDelete : function () {
			var oSelected = this.byId("peopleList").getSelectedItem()

			if (oSelected) {
				oSelected.getBindingContext().delete("$auto").then(function () {
					MessageToast.show(this._getText("deletionSuccessMessage"))
				}.bind(this), function (oError) {
					MessageBox.error(oError.message)
				})
			}
		},

		/**
		 * Lock UI when changing data in the input controls
		 * @param {sap.ui.base.Event} oEvt - Event data
		 */
		onInputChange : function (oEvt) {
			if (oEvt.getParameter("escPressed")) {
				this._setUIChanges()
			} else {
				this._setUIChanges(true)
				// Check if the username in the changed table row is empty and set the appView property accordingly
				if (oEvt.getSource().getParent().getBindingContext().getProperty("UserName")) {
					this.getView().getModel("appView").setProperty("/usernameEmpty", false)
				}
			}
		},

		/**
		 * Refresh the data.
		 */
		onRefresh : function () {
			var oBinding = this.byId("peopleList").getBinding("items")

			if (oBinding.hasPendingChanges()) {
				MessageBox.error(this._getText("refreshNotPossibleMessage"))
				return
			}
			oBinding.refresh()
			MessageToast.show(this._getText("refreshSuccessMessage"))
		},

		/**
		 * Reset any unsaved changes.
		 */
		onResetChanges : function () {
			this.byId("peopleList").getBinding("items").resetChanges()
			this._bTechnicalErrors = false // If there were technical errors, cancelling changes resets them.
			this._setUIChanges(false)
		},

		/**
		 * Reset the data source.
		 */
		onResetDataSource : function () {
			var oModel = this.getView().getModel(),
				oOperation = oModel.bindContext("/ResetDataSource(...)")

			oOperation.execute().then(function () {
					oModel.refresh()
					MessageToast.show(this._getText("sourceResetSuccessMessage"))
				}.bind(this), function (oError) {
					MessageBox.error(oError.message)
				}
			)
		},

		/**
		 * Save changes to the source.
		 */
		onSave : function () {
			var fnSuccess = function () {
				this._setBusy(false)
				MessageToast.show(this._getText("changesSentMessage"))
				this._setUIChanges(false)
			}.bind(this)

			var fnError = function (oError) {
				this._setBusy(false)
				this._setUIChanges(false)
				MessageBox.error(oError.message)
			}.bind(this)

			this._setBusy(true) // Lock UI until submitBatch is resolved.
			this.getView().getModel().submitBatch("peopleGroup").then(fnSuccess, fnError)
			this._bTechnicalErrors = false // If there were technical errors, a new save resets them.
		},

		/**
		 * Search for the term in the search field.
		 */
		onSearch : function () {
			var oView = this.getView(),
				sValue = oView.byId("searchField").getValue(),
				oFilter = new Filter("LastName", FilterOperator.Contains, sValue)

			oView.byId("peopleList").getBinding("items").filter(oFilter, FilterType.Application)
		},

		/**
		 * Sort the table according to the last name.
		 * Cycles between the three sorting states "none", "ascending" and "descending"
		 */
		onSort : function () {
			var oView = this.getView(),
				aStates = [undefined, "asc", "desc"],
				aStateTextIds = ["sortNone", "sortAscending", "sortDescending"],
				sMessage,
				iOrder = oView.getModel("appView").getProperty("/order")

			// Cycle between the states
			iOrder = (iOrder + 1) % aStates.length
			var sOrder = aStates[iOrder]

			oView.getModel("appView").setProperty("/order", iOrder)
			oView.byId("peopleList").getBinding("items").sort(sOrder && new Sorter("LastName", sOrder === "desc"))

			sMessage = this._getText("sortMessage", [this._getText(aStateTextIds[iOrder])])
			MessageToast.show(sMessage)
		},

		onMessageBindingChange : function (oEvent) {
			var aContexts = oEvent.getSource().getContexts(),
				aMessages,
				bMessageOpen = false

			if (bMessageOpen || !aContexts.length) {
				return
			}

			// Extract and remove the technical messages
			aMessages = aContexts.map(function (oContext) {
				return oContext.getObject()
			})
			sap.ui.getCore().getMessageManager().removeMessages(aMessages)

			this._setUIChanges(true)
			this._bTechnicalErrors = true
			MessageBox.error(aMessages[0].message, {
				id : "serviceErrorMessageBox",
				onClose : function () {
					bMessageOpen = false
				}
			})

			bMessageOpen = true
		},


		/**
		 * Convenience method for retrieving a translatable text.
		 * @param {string} sTextId - the ID of the text to be retrieved.
		 * @param {Array} [aArgs] - optional array of texts for placeholders.
		 * @returns {string} the text belonging to the given ID.
		 */
		_getText : function (sTextId, aArgs) {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sTextId, aArgs)
		},

		/**
		 * @param {boolean} [bHasUIChanges]
		 */
		_setUIChanges : function (bHasUIChanges) {
			if (this._bTechnicalErrors) {
				// If there is currently a technical error, then force 'true'.
				bHasUIChanges = true
			} else if (bHasUIChanges === undefined) {
				bHasUIChanges = this.getView().getModel().hasPendingChanges()
			}
			var oModel = this.getView().getModel("appView")
			oModel.setProperty("/hasUIChanges", bHasUIChanges)
		},

		/**
		 * Set busy flag in View Model
		 * @param {boolean} bIsBusy - set or clear busy
		 */
		_setBusy : function (bIsBusy) {
			var oModel = this.getView().getModel("appView")
			oModel.setProperty("/busy", bIsBusy)
		},

		onPressDetailBack : function() {
			this.getSplitAppObj().backDetail();
		},

		onPressMasterBack : function() {
			this.getSplitAppObj().backMaster();
		},

		onListItemPress : function(oEvent) {
			var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();

			this.getSplitAppObj().toDetail(this.createId(sToPageId));
		},
	})
})
