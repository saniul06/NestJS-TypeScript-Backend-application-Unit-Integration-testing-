import { Controller, Post, Body, Param, Get, Query, Delete, Patch, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService) { }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        const { email, password } = body;
        return this.authService.signup(email, password);
    }

    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const user = await this.usersService.findOne(parseInt(id));
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user
    }

    @Get('/')
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Body() body: UpdateUserDto, @Param('id') id: string) {
        return this.usersService.update(parseInt(id), body)
    }
}
