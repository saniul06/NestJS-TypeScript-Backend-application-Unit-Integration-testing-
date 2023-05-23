import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report-dto';
import { User } from '../users/user.entity';
import { GetEstimateDto } from './dtos/get-extimate.dto';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) { }

    create(attrs: CreateReportDto, user: User) {

        console.log('user is: ', user)
        const report = this.repo.create({ ...attrs, user });
        return this.repo.save(report);
    }

    async reportApproval(id: number, approved: boolean) {
        const report = await this.repo.findOneBy({ id });
        if (!report) {
            throw new NotFoundException("Report not found");
        }
        report.approved = approved;
        return this.repo.save(report);
    }

    async createEstimate(query: GetEstimateDto) {
        const { make, model, year, lat, lng, mileage } = query;
        return this.repo.createQueryBuilder()
            .select("AVG(price)", "price")
            .where("make = :make", { make })
            .andWhere("model = :model", { model })
            .andWhere("lat - :lat BETWEEN -5 AND 5", { lat })
            .andWhere("lng - :lng BETWEEN -5 AND 5", { lng })
            .andWhere("year - :year BETWEEN -3 AND 3", { year })
            .andWhere("approved IS TRUE")
            .orderBy("ABS(mileage - :mileage)", "DESC")
            .setParameters({ mileage })
            .limit(3)
            .getRawOne()
    }
}
