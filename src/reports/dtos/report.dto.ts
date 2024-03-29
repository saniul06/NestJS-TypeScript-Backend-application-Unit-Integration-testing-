import { Expose, Transform } from "class-transformer";
import { User } from "../../users/user.entity";

export class ReportDto {
    @Expose()
    id: number;

    @Expose()
    make: string;

    @Expose()
    model: string;

    @Expose()
    year: number;

    @Expose()
    price: number;

    @Expose()
    lat: number;

    @Expose()
    lng: number;

    @Expose()
    mileage: number;

    @Expose()
    approved: boolean;

    // @Expose()
    // @Transform(({ obj }) => {
    //     const { user, ...rest } = obj;
    //     const { password, ...others } = user;
    //     return others;
    // })
    @Expose()
    @Transform(({ obj }) => obj.user.id)
    userid: number;
}