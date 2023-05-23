import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report-dto';
import { CurrentUser } from '../users/decorators/current.user.decorator';
import { User } from '../users/user.entity';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApprovedReportDto } from './dtos/approved-report.dto';
import { RoleGuard } from '../guards/role.guard';
import { GetEstimateDto } from './dtos/get-extimate.dto';

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

    @UseGuards(AuthGuard)
    @Get()
    async getEstimate(@Query() query: GetEstimateDto) {
        const list = await this.reportService.createEstimate(query);
        return { length: list.length, list };
    }
}
