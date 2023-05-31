import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ConflictException } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { DataSource, LessThan, MoreThan } from 'typeorm';
import { Car } from './entities/car.entity';
import { Rental } from './entities/rental.entity';

@Controller('api/cars')
export class CarsController {
  constructor(private readonly carsService: CarsService, private dataSource: DataSource) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @Post()
  async rent(@Param('id') id:number){
    const carRepo = this.dataSource.getRepository(Car);
    const rentalRepo = this.dataSource.getRepository(Rental);

    const rental = new Rental;
    rental.start_date= new Date;
    rental.end_date= new Date;
    rental.end_date.setDate(rental.start_date.getDate()+7)

    const car = await carRepo.findOneBy({id})
    if(!car){
      throw new NotFoundException("Nem található")
    }

    const letezo = await rentalRepo.findBy({
      car:car,
      start_date: LessThan(rental.start_date),
      end_date: MoreThan(rental.end_date),
    })

    if(letezo.length>0){
      throw new ConflictException("Már ki van bérelve")
    }

    return rentalRepo.save(rental);
  }

  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(+id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(+id);
  }
}
