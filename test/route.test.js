let mongoose = require("mongoose");
let Zombie = require('../model/zombie');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);

// describe('Zombies', () => {
//     beforeEach((done) => {
//         Zombie.remove({}, (err) => {
//             done();
//         });
//     });
describe('/GET zombies', () => {
    it('it should GET all the zombies', (done) => {
        chai.request(server)
            .get('/api/v1/zombies')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

                done();
            });
    });
})
// });

describe('/POST zombie', () => {
    it('it should add with name', (done) => {
        let name = {
            name: 'iglo'
        };
        chai.request(server)
            .post('/api/v1/zombies')
            .send(name)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

                done();
            });
    })
})

describe('/POST zombie', () => {
    it('it shouldnt add  name-to short', (done) => {
        let name = {
            name: 'ig'
        };
        chai.request(server)
            .post('/api/v1/zombies')
            .send(name)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');

                done();
            });
    })
})


describe('/GET details', () => {
    it('details', (done) => {
        chai.request(server)
            .get('/api/v1/zombies/617953b8ce453009fcb4ded0')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

                done();
            });
    });
})

describe('/GET details', () => {
    it('wrong id', (done) => {
        chai.request(server)
            .get('/api/v1/zombies/617953b8ce453009fcb4ded9')
            .end((err, res) => {
                res.should.have.status(500);


                done();
            });
    });
})


describe('/DELETE/:id book', () => {
    it('it should DELETE a book given the id', (done) => {
        let zombie = new Zombie({
            name: "Kramer"
        });
        zombie.save((err, zombie) => {
            chai.request(server)
                .delete('/api/v1/zombies/' + zombie._id)
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });
    });
});

describe('/GET inventory', () => {
    it('wrong id ', (done) => {
        chai.request(server)
            .get('/api/v1/zombies/617953b8ce453009fcb4ded9/items')
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
})


describe('/GET inventory', () => {
    it('empty inventory  correct id', (done) => {
        chai.request(server)
            .get('/api/v1/zombies/617953b8ce453009fcb4ded0/items')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.zombie.should.have.property("items").be.a("array");
                done();
            });
    });
})