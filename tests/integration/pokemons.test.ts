import supertest from "supertest";

import app from "../../src/app";
import { assignPokemon, getPokemonById, populatePokemons } from "../factories/pokemonsFactory";
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
    });
});

describe('POST /my-pokemons/:id/add',()=>{
    it('should answer with status 401 for invalid token',async ()=>{
        const result = await supertest(app).post('/my-pokemons/1/add').set('authorization', 'Bearer shjahsja')   
        expect(result.status).toEqual(401)
    })
    it('should answer with status 400 for invalid id',async ()=>{
        const user = await registerUser();
        const completeUser = await findByName(user.email);
        const token = await logUser(completeUser.id);
        const result = await supertest(app).post('/my-pokemons/-1/add').set('authorization',token);
        expect(result.status).toEqual(400);
    })
    it('should answer with status 200 for valid params',async ()=>{
        const user = await registerUser();
        const completeUser = await findByName(user.email);
        const token = await logUser(completeUser.id);
        await populatePokemons(3)
        const result = await supertest(app).post('/my-pokemons/1/add').set('authorization',token);
        expect(result.status).toEqual(200);
    })
    it('should add the user in pokemon.users array for valid params',async ()=>{
        const user = await registerUser();
        const completeUser = await findByName(user.email);
        const token = await logUser(completeUser.id);
        await populatePokemons(3)
        await supertest(app).post('/my-pokemons/1/add').set('authorization',token);
        const pokemon = await getPokemonById(1)
        expect(pokemon.users[0].id).toEqual(completeUser.id);
    })
})

describe('POST /my-pokemons/:id/remove',()=>{
    it('should answer with status 401 for invalid token',async ()=>{
        const result = await supertest(app).post('/my-pokemons/1/remove').set('authorization', 'Bearer shjahsja')   
        expect(result.status).toEqual(401)
    })
    it('should answer with status 400 for invalid id',async ()=>{
        const user = await registerUser();
        const completeUser = await findByName(user.email);
        const token = await logUser(completeUser.id);
        const result = await supertest(app).post('/my-pokemons/-1/remove').set('authorization',token);
        expect(result.status).toEqual(400);
    })
    it('should answer with status 200 for valid params',async ()=>{
        const user = await registerUser();
        const completeUser = await findByName(user.email);
        const token = await logUser(completeUser.id);
        await populatePokemons(3)
        await assignPokemon(1,completeUser.id);
        const result = await supertest(app).post('/my-pokemons/1/remove').set('authorization',token);
        expect(result.status).toEqual(200);
    })
    it('should remove the user in pokemon.users array for valid params',async ()=>{
        const user = await registerUser();
        const completeUser = await findByName(user.email);
        const token = await logUser(completeUser.id);
        await populatePokemons(3)
        await assignPokemon(1,completeUser.id);
        const pokemonBefore = await getPokemonById(1)
        expect(pokemonBefore.users[0].id).toEqual(completeUser.id);
        await supertest(app).post('/my-pokemons/1/remove').set('authorization',token);
        const pokemon = await getPokemonById(1)
        expect(pokemon.users.length).toEqual(0);
    })
})