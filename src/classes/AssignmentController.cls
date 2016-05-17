public with sharing class AssignmentController {
	public AssignmentController() {
	}

	@RemoteAction
	public static String logIn(String username, String password) {
		return LoginService.AuthenticateUser(username, password);
	}

	@RemoteAction
	public static Boolean validateToken(String username, String token) {
		return LoginService.ValidateToken(username, token);
	}
}