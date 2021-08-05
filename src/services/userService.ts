import { getRepository } from "typeorm";
import bcrypt from "bcrypt"

import User from "../entities/User";
import NewUser from "../interfaces/newUser";

export async function signUp (newUser:NewUser) {
  const repository =  getRepository(User)
  const alredyRegistered = await repository.findOne({where:{email:newUser.email}})
  if(!!alredyRegistered) return false
  await repository.insert({
    email:newUser.email,
    password: bcrypt.hashSync(newUser.password,10)
  })
  return true;
}
