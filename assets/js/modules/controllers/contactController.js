angular.module('Controllers')
    .controller('ContactController', ['$scope', '$routeParams', 'ContactService', function ($scope, $routeParams, ContactService) {

		$scope.contact = {};
		$scope.rollbackContact = {};
		$scope.actionCreate = false;

		$scope.opSubmit = false;

		$scope.upsert = function(){
			if(validateContact($scope.contact)) {
				$scope.opSubmit = true;
				ContactService.UpsertContact($scope.contact).then(
					function(result){
						if(result) {
							showMessage('Upserted record Id: '.concat(result), 'success');
							$scope.contact.Id = result;
							if($scope.actionCreate) {
								$scope.contacts.push($scope.contact);
								$scope.contact = {};
							}
						}
					},
					function(error) {
						showMessage(error, 'danger');
						angular.copy($scope.rollbackContact, $scope.contact);
					}).finally(function(){
						$scope.opSubmit = false;
					});
			} else {
				showMessage('Invalid fom data...', 'warning');
			}
		};

		$scope.delete = function(id) {
			$scope.opSubmit = true;
			ContactService.DeleteContact(id).then(function(result) {
				if(result) {
					showMessage('Deleted record Id: '.concat(result), 'success');
					for(var i = 0; i < $scope.contacts.length; i++) {
						if($scope.contacts[i].Id == result){
							$scope.contacts.splice(i, 1);
							break;
						}
					}
				}
			},
			function(error) {
				showMessage(error, 'danger');
			}).finally(function(){
				$scope.opSubmit = false;
			});
		};

		var validateContact = function(contact) {
			return true;
		};

		var loadContactData = function(id) {
			var found = false;
			for(var i = 0; i < $scope.contacts.length; i++) {
				if($scope.contacts[i].Id == id){
					$scope.contact = $scope.contacts[i];
					found = true;
					break;
				}
			}
			if(!found) {
				ContactService.GetContactByID(id).then(function(result) {
					if(result) {
						$scope.contact = result
					}
				});
			}
			angular.copy($scope.contact, $scope.rollbackContact);
		};

		var showMessage = function(message, type) {
			$scope.message = message;
			$scope.messageType = type;
		};

        if($routeParams.id) {
        	loadContactData($routeParams.id);
        } else {
        	$scope.actionCreate = true;
        }
}]);