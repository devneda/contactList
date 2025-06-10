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
                    expect(response.body[1].name).to.equal('Ainhoa');
                    done();
                });
        });
    });
});