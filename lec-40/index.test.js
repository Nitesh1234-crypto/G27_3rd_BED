const app= require("./index");
const request = require("supertest");


describe("POST /sum",()=>{
    it("it should return the addition of two number",async()=>{
      let response = await request(app).post("/sum").send({
        a:1,
        b:2
      })
        expect(response.body.data).toBe(3)
    })
    it( "should return invalid argument if one of the parameter in not present or undefined",async ()=>{
        let response= await request(app).post("/sum").send({
            a:1
        })
        expect(response.body.message).toBe("Invalid argument");
    })
  
})