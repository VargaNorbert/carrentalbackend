import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateCarDto {
    @IsNotEmpty()
    @IsString()
    license_plate_number:string;

    @IsNotEmpty()
    @IsString()
    brand:string;

    @IsNotEmpty()
    @IsString()
    model:string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    daily_price:number;
}
