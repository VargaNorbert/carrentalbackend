import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import { faker } from '@faker-js/faker';
import { Car } from './cars/entities/car.entity';
import { Rental } from './cars/entities/rental.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Post('SEED')
  async seed(){
    const carRepo = this.dataSource.getRepository(Car);
    const rentalRepo = this.dataSource.getRepository(Rental);

    for(let i=0; i<15; i++){
      const rental = new Rental;

      rental.start_date= faker.date.recent();
      rental.end_date = faker.date.soon({days : 30});
      rental.car = await carRepo.findOneBy({id:i+1})

      await rentalRepo.save(rental);
    }
  }
}
