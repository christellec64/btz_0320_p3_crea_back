const chai = require("chai");
const chaiHtpp = require("chai-http");
let should = chai.should();
let server = require("../index");
const sequelize = require("../sequelize");
const TypePost = require("../models/TypePost");

  //npm install chai-http, chai && mocha
  // npm test pour lancer les tests

    //test create
  chai.use(chaiHtpp);
  describe("Types_Posts", () => {
  before(async () => {
        await sequelize.sync({ force: true });
        await TypePost.create({
        labelFr: "partenariat",
        labelEs: "partenarias",
        labelEus: "partenariak",
        });
      });
   
  //test request all 
  describe("Get all Types_Posts", () => {
    it("should return an array of types posts", async () => {
      try {
        const res = await chai.request(server).get("/user/post/type_post");
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
      } catch (err) {
        throw err;
      }
    });
  });
    
  // test request one
  describe("Get all one type post", () => {
    it("should return an array of one type post", async () => {
      try {
        const res = await chai.request(server).get("/user/post/type_post/:id");
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
      } catch (err) {
        throw err;
      }
    });
  });
    
  // test post one  
  describe("Post one type post", () => {
    it("should post a new type of posts", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/user/post/type_post")
          .send({
            labelFr: "partenariat",
            labelEs: "partenarias",
            labelEus: "partenariak",
          });
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys(["labelFr", "labelEs", "labelEus"]);
      } catch (err) {
        throw err;
      }
});

    // test put
    describe("Put one type post", () => {
        it("should put a new type of posts", async () => {
          try {
            const res = await chai
              .request(server)
              .put("/user/post/type_post/:id")
              .send({
                labelFr: "partenariat",
                labelEs: "partenarias",
                labelEus: "partenariak",
              });
            res.should.have.status(201);
            res.body.should.be.a("object");
            res.body.should.have.keys(["labelFr", "labelEs", "labelEus"]);
          } catch (err) {
            throw err;
          }
        });

    // test delete    
    describe("Delete one type post", () => {
            it("should delete one type of posts", async () => {
              try {
                const res = await chai
                  .request(server)
                  .delete("/user/post/type_post/:id")
                  .send(
                   "element deleted"
                  );
                res.should.have.status(201);
                res.body.should.be.a("object");
                res.body.should.have.keys(["labelFr", "labelEs", "labelEus"]);
              } catch (err) {
                throw err;
              }
            });
     //test de fail to create   
    it("Should fail to create", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/user/post/type_post")
          .send({ labelFr: "" });
        res.should.have.status(422);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    )};
});
