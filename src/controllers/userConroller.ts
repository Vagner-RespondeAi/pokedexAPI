import { Request, Response } from "express";
import registerUserSchema from "../schemas/registerUserSchema";
import NewUser from "../interfaces/newUser";
import * as userService from "../services/userService";
import User from "../entities/User";


export async function signUp(req:Request,res:Response){
  const newUser = req.body as NewUser
  if(registerUserSchema.validate(newUser).error) return res.sendStatus(400)
  const result = await userService.signUp(newUser)
  if(!result) return res.sendStatus(409)
  res.sendStatus(201)
}

export async function signIn(req:Request,res:Response){
  const newUser = req.body as User;
  if(registerUserSchema.validate(newUser).error) return res.sendStatus(400)
  const token = await userService.signIn(req.body);
  if(!token) res.sendStatus(401)
  res.send({token})
}