public with sharing class LoginService {
	public LoginService() {
	}

	public static String AuthenticateUser(String username, String password) {
		String MD5Password = GenerateMD5From(password);
		try {
			Contact c = [select Id, FirstName, LastName, Username__c, Password__c from Contact where Username__c = :username and Password__c = :MD5Password];
			String token = GenerateToken(c.Username__c);
			c.Auth_Token__c = token;
			update c;
			return c.Auth_Token__c;
		} catch (DmlException e) {
			return null;
		}
	}

	public static Boolean ValidateToken(String username, String token) {
		try {
			Contact c = [select Auth_Token__c from Contact where Username__c = :username];
			if(c.Auth_Token__c == token) {
				return true;
			}
		} catch(DmlException e) {
			return false;
		}
		return false;
	}

	private static String GenerateToken(String username) {
		return GenerateMD5From(username);
	}

	private static String GenerateMD5From(String data) {
		return EncodingUtil.convertToHex(Crypto.generateDigest('MD5', Blob.valueOf(data)));
	}
}