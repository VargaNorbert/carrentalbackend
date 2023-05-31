import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { DataSource } from 'typeorm';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {

  constructor( private dataSource: DataSource){}

  create(createCarDto: CreateCarDto) {
    return this.dataSource.getRepository(Car).save(createCarDto);
  }

  findAll() {
    return this.dataSource.getRepository(Car).find();
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
