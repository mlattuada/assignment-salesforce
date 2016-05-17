public with sharing class CRUDContactControllerExt {

    public CRUDContactControllerExt(AssignmentController stdController) { }

    @RemoteAction
    public static Contact getContactById(Id id) {
        return CRUDContactService.GetContactByID(id);
    }

    @RemoteAction
    public static List<Contact> listContacts() {
        return CRUDContactService.GetContacts();
    }

    @RemoteAction
    public static Id upsertContact(Id id, String firstName, String lastName, String userName, String password) {
        return CRUDContactService.UpsertContact(id, firstName, lastName, userName, password);
    }

    @RemoteAction
    public static Id deleteContact(Id id) {
        return CRUDContactService.DeleteContact(id);
    }
}