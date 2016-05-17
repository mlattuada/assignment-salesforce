angular.module('Services').service('ContactService', ['$q', function ($q) {

	const ERROR_MESSAGE = 'Something went wrong at the server...';

	var defaultCallback = function(result, deferred) {
		if(result) {
			deferred.resolve(result);
		}
		deferred.reject(ERROR_MESSAGE);
	};	

	this.GetContacts = function() {
		var deferred = $q.defer();
		CRUDContactControllerExt.listContacts(function(result) { defaultCallback(result, deferred); });
		return deferred.promise;
	};

	this.GetContactByID = function(id) {
		var deferred = $q.defer();
		CRUDContactControllerExt.getContactById(id, function(result) { defaultCallback(result, deferred); });
		return deferred.promise;
	};

	this.DeleteContact = function(id) {
		var deferred = $q.defer();
		CRUDContactControllerExt.deleteContact(id, function(result) { defaultCallback(result, deferred); });
		return deferred.promise;
	};

	this.UpsertContact = function(contact) {
		var deferred = $q.defer();
		CRUDContactControllerExt.upsertContact(
			contact.Id || null,
			contact.FirstName,
			contact.LastName,
			contact.Username__c,
			contact.Password__c,
			function(result) { defaultCallback(result, deferred); });
		return deferred.promise;
	};

}]);
