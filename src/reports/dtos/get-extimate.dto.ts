import { Transform } from "class-transformer";
import { IsLatitude, IsLongitude, IsNumber, IsString, Min } from "class-validator";

export class GetEstimateDto {
    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1930)
    @Transform(({ value }) => parseInt(value))
    year: number;

    @Transform(({ value }) => parseFloat(value))
    @IsLatitude()
    lat: number;

    @Transform(({ value }) => parseFloat(value))
    @IsLongitude()
    lng: number;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(0)
    mileage: number;
}