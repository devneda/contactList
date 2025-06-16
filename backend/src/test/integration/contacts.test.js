const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

process.argv.push('--config', 'config.local.yaml');

const app = require('../../app').app;

chai.use(chaiHttp);
chai.should();

describe('contacts', () => {
    
    describe('GET /contacts', () => {
        it('should get all contacts', (done) => {
            chai.request(app)
                .get('/contacts')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');

                    expect(response.body[0]).to.have.property('id');
                    expect(response.body[0]).to.have.property('name');
                    expect(response.body[0]).to.have.property('lastname');
                    expect(response.body[0]).to.have.property('phone');
                    expect(response.body[0]).to.have.property('email');
                    expect(response.body[0]).to.have.property('birthday');
                    expect(response.body[0]).to.have.property('companyId');

                    expect(response.body[0].name).to.equal('Carlos');
                    expect(response.body[1].name).to.equal('Lucía');
                    done();
                });
        });
    });

    describe('POST /contacts', () => {
        it('should register a new contact', (done) => {
            chai.request(app)
                .post('/contacts')
                .send({
                    name: 'IntegrationName test',
                    lastname: 'IntegrationLastname test',
                    phone: '123456789',
                    email: 'example@example.dev',
                    birthday: '1995-10-10',
                    companyId: 1
                })
                .end((error, response) => {
                    response.should.have.status(201);
                    expect(response.body).to.have.property('id');
                    expect(response.body).to.have.property('name');
                    expect(response.body).to.have.property('lastname');
                    expect(response.body).to.have.property('phone');
                    expect(response.body).to.have.property('email');
                    expect(response.body).to.have.property('birthday');
                    expect(response.body).to.have.property('companyId');
                    done();
                });
        });

        it('validation should fail because name is mandatory', (done) => {
            chai.request(app)
                .post('/contacts')
                .send({
                    lastname: 'IntegrationLastname test',
                    phone: '1234567',
                    email: 'example@example.dev',
                    birthday: '1995-10-10'
                })
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body.status).to.equal('bad-request');
                    expect(response.body.message).to.equal('Faltan campos obligatorios');
                    done();
                });
        });

        it('validation should fail because phone must be a number', (done) => {
            chai.request(app)
                .post('/contacts')
                .send({
                    name: 'IntegrationName test 2',
                    lastname: 'IntegrationLastname test',
                    phone: '12345678L',
                    email: 'example@example.dev',
                    birthday: '1995-10-10',
                    companyId: 1
                })
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body.status).to.equal('bad-request');
                    expect(response.body.message).to.equal('El campo phone debe contener solo números');
                    done();
                });
        });
    });

    describe('PUT /contacts', () => {
        it('should update a contact', (done) => {
            chai.request(app)
                .put('/contacts/3')
                .send({
                    name: 'Miguel',
                    lastname: 'Pérez',
                    phone: '987654321',
                    email: 'example@example.com',
                    birthday: '1995-10-10',
                    companyId: 2
                })
                .end((error, response) => {
                    response.should.have.status(204);
                    done();
                });
        });
        it('should fail to update a contact with empty data', (done) => {
            chai.request(app)
                .put('/contacts/3')
                .send({})
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body.message).to.equal('Datos vacíos');
                    done();
                });
        });
    });
    describe('DELETE /contacts', () => {
        it('should delete a contact', (done) => {
            chai.request(app)
                .delete('/contacts/3')
                .end((error, response) => {
                    response.should.have.status(204);
                    done();
                });
        });

        it('should fail to delete a contact that does not exist', (done) => {
            chai.request(app)
                .delete('/contacts/L1')
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body.status).to.equal('bad-request');
                    expect(response.body.message).to.equal('El id del contacto debe ser un número entero positivo');
                    done();
                });
        });
    });
});
