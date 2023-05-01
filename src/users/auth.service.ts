import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);


@Injectable()
export class AuthService {
    constructor(private userService: UsersService) { }
    async signup(email: string, password: string) {
        const users = await this.userService.find(email);
        if (users.length) {
            throw new BadRequestException("Email already in use");
        }
        const salt = randomBytes(8).toString('hex');

        const hash = await scrypt(password, salt, 32) as Buffer;

        const hashedPassword = salt + "." + hash.toString('hex');
        const user = await this.userService.create(email, hashedPassword);
        return user;
    }

    async signin(email: string, password: string) {
        const [user] = await this.userService.find(email);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        const { password: userPassword } = user;
        const [salt, hashedPassword] = userPassword.split(".");
        const hash = await scrypt(password, salt, 23) as Buffer;
        if (hash.toString('hex') !== hashedPassword) {
            throw new BadRequestException("Password doesn't matched")
        }
        return user;
    }
}