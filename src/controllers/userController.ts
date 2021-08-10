import { NextFunction, Request, Response } from "express";
import registerUserSchema from "../schemas/registerUserSchema";
import NewUser from "../interfaces/newUser";
import * as userService from "../services/userService";
import User from "../entities/User";
import userSchema from "../schemas/userSchema";

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const newUser = req.body as NewUser;
    if (registerUserSchema.validate(newUser).error) return res.sendStatus(400);
    const result = await userService.signUp(newUser);
    if (!result) return res.sendStatus(409);
    return res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.body as User;
    if (userSchema.validate(user).error) return res.sendStatus(400);
    const token = await userService.signIn(user);
    if (!token) return res.sendStatus(401);
    res.send({ token });
  } catch (e) {
    next(e);
  }
}
