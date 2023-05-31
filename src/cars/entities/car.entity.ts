import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rental } from "./rental.entity";

@Entity('cars')
export class Car {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    license_plate_number:string;

    @Column()
    brand:string;

    @Column()
    model:string;

    @Column()
    daily_price:number;

    @OneToMany(()=> Rental, (rental)=>rental.car)
    rentals: Rental[];
}
