public with sharing class CRUDContactService {
	public CRUDContactService() {
	}

	public static Contact GetContactByID(Id id) {
		try {
            return [select Id, FirstName, LastName, Username__c, Password__c from Contact where Id = :id];
        } catch (DmlException e) {
            return null;
        }
	}

	public static List<Contact> GetContacts() {
        try {
            return [select Id, FirstName, LastName, Username__c, Password__c from Contact];
        } catch (DmlException e) {
            return null;
        }
	}

	public static Id UpsertContact(Id id, String firstName, String lastName, String userName, String password) {
        try {
        	String MD5Password = EncodingUtil.convertToHex(Crypto.generateDigest('MD5', Blob.valueOf(password)));
            Contact c = new Contact(
                Id = id,
                FirstName = firstName, 
                LastName = lastName, 
                Username__c = userName,
                Password__c= MD5Password
            );
            upsert c;
            return c.Id;
        } catch (DmlException e) {
            return null;
        }
    }

    public static Id DeleteContact(Id id) {
    	try {
            Contact c = GetContactByID(id);
            delete c;
            return c.Id;
        } catch (DmlException e) {
            return null;
        }
    }
}