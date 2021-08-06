import supertest from "supertest";

import app from "../../src/app";
import { assignPokemon, populatePokemons } from "../factories/pokemonsFactory";
import { createNewUser, findByName, logUser, registerUser } from "../factories/userFactory";
import { clearDatabase, endConnection, startConnection } from "../utils/database";

beforeAll(startConnection);
afterAll(endConnection);
beforeEach(clearDatabase);

describe('GET /pokemons',()=>{
    it('should answer with status 401 for invalid token',async ()=>{
     const result = await supertest(app).get('/pokemons').set('authorization', 'Bearer shjahsja')   
     expect(result.status).toEqual(401)
    })
    it('should answer with status 200 for valid token',async ()=>{
        const user = await registerUser();
        const completeUser = await findByName(user.email)
        const token = await logUser(completeUser.id)
        const result = await supertest(app).get('/pokemons').set('authorization', token)   
        expect(result.status).toEqual(200)
    }) 
    it('should answer with inMypokemons true for mypokemons registered',async ()=>{
        const user = await registerUser();
        const completeUser = await findByName(user.email)
        const token = await logUser(completeUser.id)
        await populatePokemons(3)
        await assignPokemon(1,completeUser.id);
        const result = await supertest(app).get('/pokemons').set('authorization', token)   
        expect(result.body[0].inMyPokemons).toEqual(true)
    }) 
    it('should answer with inMypokemons false for pokemons unregistered',async ()=>{
        const user = await registerUser();
        const completeUser = await findByName(user.email)
        const token = await logUser(completeUser.id)
        await populatePokemons(3)
        const result = await supertest(app).get('/pokemons').set('authorization', token)   
        expect(result.body[0].inMyPokemons).toEqual(false)
    })
})