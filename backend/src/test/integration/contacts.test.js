const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
//const chaiHttp = require('chai-http');

const app = require('../../app').app;

chai.use(chaiHttp);
chai.should();

describe('contacts' , () => {
    describe('GET /contacts', () => {
        it('should get all contacts', (done) => {
            chai.request(app)
                .get('/contacts')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    // Se esperan propiedades (columnas) de la respuesta
                    expect(response.body[0]).to.have.property('id');
                    expect(response.body[0]).to.have.property('name');
                    expect(response.body[0]).to.have.property('lastname');
                    
                    // Se espera que los primeros datos de la respuesta sean estos 
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
                    expect(response.body).to.have.property('companyId')
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
                    expect(response.body.status).to.have.equal('bad-request');
                    expect(response.body.message).to.have.equal('Faltan campos obligatorios');                    
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
                    expect(response.body.status).to.have.equal('bad-request');
                    expect(response.body.message).to.have.equal('El campo phone debe contener solo números');                    
                    done();
                });
        });
    });
});