import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report-dto';
import { CurrentUser } from '../users/decorators/current.user.decorator';
import { User } from '../users/user.entity';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApprovedReportDto } from './dtos/approved-report.dto';
import { RoleGuard } from '../guards/role.guard';

@Controller('reports')
export class ReportsController {

    constructor(private reportService: ReportsService) { }

    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    @Post('/')
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportService.create(body, user);
    }

    @UseGuards(RoleGuard)
    // @Serialize(ReportDto)
    @Patch("/:id")
    async approvedReport(@Param("id") id: string, @Body() body: ApprovedReportDto, @CurrentUser() user: User) {
        return this.reportService.reportApproval(parseInt(id), body.approved);
    }
}
