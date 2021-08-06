import { Request, Response } from "express";
import User from "../entities/User";
import * as pokemonService from "../services/pokemonService";

export async function getAll(req:Request,res:Response){
    const user = res.locals.user as User
    const pokemons = await pokemonService.getAll(user);
    res.send(pokemons)
}