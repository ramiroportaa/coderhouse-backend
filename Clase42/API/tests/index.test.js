import supertest from "supertest";
import chai from "chai";
import productGenerator from "./productGenerator.faker.js";

const expect = chai.expect;

let request;

describe("Test de productos", ()=>{
    before(()=>{
        request = supertest("http://localhost:8080");
    })

    it("debería traer todos los productos en la BD y status 200", async ()=>{
        const res = await request.get("/api/productos");
        expect(res.status).to.eql(200);
    })

    // it("debería traer un objeto con el producto 'chaqueta'", ()=>{
    //     const data = {};
    //     assert.deepStrictEqual(data, {})
    // })

    // it("debería dar error con status 404 al traer producto con ID inexistente", ()=>{
    //     const data = {};
    //     assert.strictEqual(data.status, 404)
    // })

    // beforeEach(()=>{
    //     //login de usuario admin para poder entrar a los metodos POST, PUT y DELETE
    // })
})