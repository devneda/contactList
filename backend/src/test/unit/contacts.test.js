const httpMocks = require('node-mocks-http');
const { describe, it, expect, afterEach } = require('@jest/globals');

jest.mock('../../service/contacts');

const contactController = require('../../controller/contact');

const contactService = require('../../service/contacts');

const mockedFindContacts = jest.spyOn(contactService, 'findContacts');
const mockedRegisterContact = jest.spyOn(contactService, 'registerContact');
const { mockContactArray, mockContactToRegister, mockContactResponse } = require('./mocks/contacts');

afterEach(() => {
    jest.clearAllMocks();
});

describe('contacts', () => {
    it('GET /api/contacts should get a contact list', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();
        request.app = {};
        request.app.conf = {};
        request.path = '/api/contacts';

        const mockedCityList = jest.fn(async () => {
            return mockContactArray;
        });
        mockedFindContacts.mockImplementation(mockedCityList);

        await contactController.getContacts(request, response);
        expect(mockedFindContacts).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(200);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData().length).toEqual(5);
    });

    it('POST /api/contacts should register a new contact', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();
        request.app = {};
        request.app.conf = {};
        request.path = '/api/contacts';
        request.body = mockContactToRegister;

        // CORRECTO: usar el spy ya creado arriba
        mockedRegisterContact.mockResolvedValue(mockContactResponse);

        await contactController.postContact(request, response);

        expect(mockedRegisterContact).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(201);
        expect(response._isEndCalled()).toBeTruthy();

        const responseData = response._getJSONData();
        expect(responseData.id).toEqual(1);
        expect(responseData.name).toEqual('Prueba1');
        expect(responseData.lastname).toEqual('Apellido Mock');
        expect(responseData.phone).toEqual('987654321');
        expect(responseData.email).toEqual('prueba@example1.com');
        expect(responseData.birthday).toEqual('1999-09-09');
        expect(responseData.companyId).toEqual(2);
    });

    it('GET /api/contacts/:id should return a contact by ID', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest({ params: { id: '1' } });

        const mockContact = { id: 1, name: 'Juan' };
        const mockedFindContact = jest.spyOn(contactService, 'findContact').mockResolvedValue(mockContact);

        await contactController.getContactById(request, response);

        expect(mockedFindContact).toHaveBeenCalledWith('1');
        expect(response.statusCode).toBe(200);
        expect(response._getJSONData()).toEqual(mockContact);
    });

    it('GET /api/contacts/:id should return 404 if contact not found', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest({ params: { id: '99' } });

        jest.spyOn(contactService, 'findContact').mockResolvedValue(undefined);

        await contactController.getContactById(request, response);

        expect(response.statusCode).toBe(404);
        expect(response._getJSONData().message).toMatch(/not found/i);
    });

    it('GET /api/contacts/name/:name should return a contact by name', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest({ params: { name: 'Juan' } });

        const mockContact = { id: 1, name: 'Juan' };
        jest.spyOn(contactService, 'findContactByName').mockResolvedValue(mockContact);

        await contactController.getContactByName(request, response);

        expect(response.statusCode).toBe(200);
        expect(response._getJSONData()).toEqual(mockContact);
    });

    it('GET /api/contacts/name/:name should return 404 if not found', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest({ params: { name: 'Desconocido' } });

        jest.spyOn(contactService, 'findContactByName').mockResolvedValue(undefined);

        await contactController.getContactByName(request, response);

        expect(response.statusCode).toBe(404);
        expect(response._getJSONData().message).toMatch(/not found/i);
    });

    it('PUT /api/contacts/:id should update a contact', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest({
            method: 'PUT',
            params: { id: '1' },
            body: {
                name: 'NuevoNombre'
            }
        });

        const mockedModify = jest.spyOn(contactService, 'modifyContact').mockResolvedValue();

        await contactController.putContact(request, response);

        expect(mockedModify).toHaveBeenCalledWith('1', 'NuevoNombre', undefined, undefined, undefined, undefined, undefined);
        expect(response.statusCode).toBe(204);
    });

    it('PUT /api/contacts/:id should return 400 if all fields are missing', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest({
            method: 'PUT',
            params: { id: '1' },
            body: {}
        });

        await contactController.putContact(request, response);

        expect(response.statusCode).toBe(400);
        expect(response._getJSONData().message).toMatch(/vacíos/i);
    });

    it('DELETE /api/contacts/:id should delete contact', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest({ params: { id: '2' } });

        jest.spyOn(contactService, 'removeContact').mockResolvedValue(true);

        await contactController.deleteContact(request, response);

        expect(response.statusCode).toBe(204);
    });

    it('DELETE /api/contacts/:id should return 400 for invalid ID', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest({ params: { id: 'abc' } });

        await contactController.deleteContact(request, response);

        expect(response.statusCode).toBe(400);
        expect(response._getJSONData().message).toMatch(/número entero positivo/i);
    });

    it('DELETE /api/contacts/:id should return 404 if contact not found', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest({ params: { id: '999' } });

        jest.spyOn(contactService, 'removeContact').mockResolvedValue(false);

        await contactController.deleteContact(request, response);

        expect(response.statusCode).toBe(404);
        expect(response._getJSONData().message).toMatch(/not found/i);
    });

});