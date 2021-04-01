let { app } = require('../../index');
const { main } = require('../../index');
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);

describe('Testing API REST', function(){  

    describe('login as a user: ',()=>{
        it('should login', (done) => {
        chai.request(app)
        .post('/login')
        .send({ cuenta: "37747947969500", password: "123456789"})
        .end( function(err,res){
            if (err){
                console.log(err);
            } else {
                console.log(res.body)
                expect(res).to.have.status(202);
                done();
            }
        });
        });
        });

        describe('login as a user: ',()=>{
            it(`Shouldn't login`, (done) => {
            chai.request(app)
            .post('/login')
            .send({ cuenta: "37747947969500", password: "123456781"})
            .end( function(err,res){
                if (err){
                    console.log(err);
                } else {
                    console.log(res.body)
                    expect(res).to.have.status(404);
                    done();
                }
            });
            });
            });

});