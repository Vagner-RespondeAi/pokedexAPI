import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { nextTick } from "process";
import User from "../entities/User";
import * as pokemonService from "../services/pokemonService";

export async function getAll(req:Request,res:Response,next:NextFunction){
    try{
        const user = res.locals.user as User
        const pokemons = await pokemonService.getAll(user);
        res.send(pokemons)
    }
    catch(e){
        next(e)
    }
}

export async function registerUserPokemons(req:Request,res:Response,next:NextFunction){
    try{
        const id:number =  Number(req.params.id);
        const user = res.locals.user as User;
        const idSchema = Joi.number().integer().positive();
        if(idSchema.validate(id).error) return res.sendStatus(400);
        await pokemonService.registerUserPokemons(id,user)
        res.sendStatus(200)
    }
    catch(e){
        next(e)
    }
}