let mongoose = require("mongoose");
let Zombie = require('../model/zombie');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);

describe('Zombies', () => {
    beforeEach((done) => {
        Zombie.remove({}, (err) => {
            done();
        });
    });

    describe('/GET zombies', () => {
        it('it should GET all the zombies', (done) => {
            let zombie = new Zombie({
                name: "Costanza"
            });
            zombie.save((err, zombie) => {
                chai.request(server)
                    .get('/api/v1/zombies')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.zombies.should.be.a('array');
                        res.body.zombies.length.should.be.eql(1);
                        res.body.zombies[0].should.have.property('items').eql([]);

                        console.log(res.body);
                        done();
                    });
            });
        })
    });

    describe('/POST zombie', () => {
        it('it should add with name', (done) => {
            let name = {
                name: 'iglo'
            };
            chai.request(server)
                .post('/api/v1/zombies')
                .send(name)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('zombie');
                    res.body.zombie.should.have.property('name');
                    res.body.zombie.should.have.property('name').eql("iglo");
                    res.body.zombie.should.have.property('createdAt');
                    done();
                });
        })
    })

    describe('/POST zombie', () => {
        it('it shouldnt add  name-to short', (done) => {
            let name = {
                name: 'Jy'
            };
            chai.request(server)
                .post('/api/v1/zombies')
                .send(name)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');

                    done();
                });
        })
    })


    describe('/GET details', () => {
        it('Correct ID zombie details', (done) => {
            let zombie = new Zombie({
                name: "Costanza",
                // items:[{id:1, name:"knfie" }, {id:2, name:"sword"}]
            });
            zombie.save((err, zombie) => {
                chai.request(server)
                    .get('/api/v1/zombies/' + zombie._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.zombie.should.have.property('name');
                        res.body.zombie.should.have.property('name').eql("Costanza");
                        res.body.zombie.should.have.property('createdAt');

                        done();
                    });
            });
        });

    })


    describe('/GET details', () => {
        it('wrong id', (done) => {
            let zombie = new Zombie({
                name: "Kramer"
            });
            zombie.save((err, zombie) => {

                chai.request(server)
                    .get('/api/v1/zombies/' + zombie._id + 1)
                    .end((err, res) => {
                        res.should.have.status(500);





                        done();
                    });
            });
        })
    })


    // describe('/DELETE/:id book', () => {
    //     it('it should DELETE a book given the id', (done) => {
    //         let zombie = new Zombie({
    //             name: "Kramer"
    //         });
    //         zombie.save((err, zombie) => {
    //             chai.request(server)
    //                 .delete('/api/v1/zombies/' + zombie._id)
    //                 .end((err, res) => {
    //                     res.should.have.status(200);

    //                     done();
    //                 });
    //         });
    //     });
    // });




    describe('/GET inventory', () => {
        it('empty inventory  correct id', (done) => {
            it('wrong id ', (done) => {
                let zombie = new Zombie({
                    name: "pete"
                    // items:[{id:1, name:"knfie" }, {id:2, name:"sword"}]

                });
                zombie.save((err, zombie) => {
                    chai.request(server)
                        .get('/api/v1/zombies/' + zombie._id + '/items')
                        .end((err, res) => {
                            res.should.have.status(200);
                            // res.body.should.be.a('object');
                            // res.body.zombie.should.have.property("items").be.a("array");
                            done();
                        });
                });
            })
        });
    });

})