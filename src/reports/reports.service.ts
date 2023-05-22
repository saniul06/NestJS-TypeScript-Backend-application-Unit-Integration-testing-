import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report-dto';
import { User } from '../users/user.entity';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) { }

    create(attrs: CreateReportDto, user: User) {

        console.log('user is: ', user)
        const report = this.repo.create({ ...attrs, user });
        return this.repo.save(report);
    }
}
