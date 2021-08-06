import { getRepository } from "typeorm";
import faker from "faker"
import bcrypt from "bcrypt"

import User from "../../src/entities/User";
import  Session  from "../../src/entities/Sessions";
import jwt from "jsonwebtoken"

export function createNewUser () {
  const newpass=faker.internet.password()
  const user = {
    email: faker.internet.email(),
    password: newpass,
    confirmPassword: newpass
  };
  return user;
}

export async function registerUser(){
  const password = faker.internet.password()
  const repository = getRepository(User)
  const user = repository.create({
      email: faker.internet.email(),
      password: bcrypt.hashSync(password,10)
  });
  await repository.save(user)
  return {
    email:user.email,
    password
  };
}
export async function findByName(email:string){
  const user = await getRepository(User).findOne({where:{email}})
  return user;
}

export async function logUser(id:number){
  const repository = getRepository(Session)
  const newSession = repository.create();
  newSession.userId = id
  const session = await repository.insert(newSession)
  const data = session.identifiers[0];
  const chaveSecreta = process.env.JWT_SECRET;
  const configuracoes = { expiresIn: 60*60*24*30 } 
  return 'Bearer '+jwt.sign(data, chaveSecreta, configuracoes);
}
