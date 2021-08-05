import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import User from "./User";

@Entity("pokemons")
export default class Pokemon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;
    
    @Column()
    number:number;

    @Column()
    image:string

    @Column()
    weight:string

    @Column()
    height:string

    @Column()
    baseExp:string

    @Column()
    description:string

    @ManyToMany(() => User,user=>user.pokemons)
    @JoinTable()
    users: User[];

}
