import { IsLatitude, IsLongitude, IsNumber, IsString, Min } from "class-validator";

export class CreateReportDto {
    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1930)
    year: number;

    @IsLatitude()
    lat: number;

    @IsLongitude()
    lng: number;

    @IsNumber()
    @Min(0)
    mileage: number;

    @IsNumber()
    @Min(0)
    price: number;
}