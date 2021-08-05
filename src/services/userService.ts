import { getRepository } from "typeorm";
import bcrypt from "bcrypt"
import  jwt  from "jsonwebtoken";

import User from "../entities/User";
import NewUser from "../interfaces/newUser";
import  Session  from "../entities/Sessions";

export async function signUp (newUser:NewUser) {
  const repository =  getRepository(User);
  const alredyRegistered = await repository.findOne({where:{email:newUser.email}});
  if(!!alredyRegistered) return false;
  await repository.insert({
    email:newUser.email,
    password: bcrypt.hashSync(newUser.password,10)
  });
  return true;
}

export async function signIn(user:User):Promise<string>{
  const repository =  getRepository(User);
  const alredyRegistered = await repository.findOne({where:{email:user.email}});
  if(!alredyRegistered || !bcrypt.compareSync(user.password,alredyRegistered.password)) return null;
  const session = await getRepository(Session).insert({userId:alredyRegistered.id})
  const data = session.identifiers[0];
  const chaveSecreta = process.env.JWT_SECRET;
  const configuracoes = { expiresIn: 60*60*24*30 } 
  return jwt.sign(data, chaveSecreta, configuracoes);
}