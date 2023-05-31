import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "./car.entity";

@Entity('rentals')
export class Rental {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    start_date:Date;

    @Column()
    end_date:Date;

    @ManyToOne(()=> Car, (car)=>car.rentals)
    car:Car;
}