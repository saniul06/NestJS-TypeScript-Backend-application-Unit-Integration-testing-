import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report-dto';
import { CurrentUser } from '../users/decorators/current.user.decorator';
import { User } from '../users/user.entity';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';

@Controller('reports')
export class ReportsController {

    constructor(private reportService: ReportsService) { }

    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    @Post('/')
    async createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportService.create(body, user);
    }
}
