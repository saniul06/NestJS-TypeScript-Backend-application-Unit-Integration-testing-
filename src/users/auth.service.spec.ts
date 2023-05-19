import { Test } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";

describe('AuthService', () => {
    let service: AuthService;
    let fakeUserService: Partial<UsersService>;
    beforeEach(async () => {
        const usersList: User[] = [];
        // Create a fake copy of user service
        fakeUserService = {
            find: async (email: string) => {
                const user = usersList.filter(user => user.email === email);
                return Promise.resolve(user);
            },
            create: async (email: string, password: string) => {
                const user = { id: Math.floor(Math.random() * 99), email, password } as User;
                usersList.push(user);
                return Promise.resolve(user)
            }
        }
        const module = await Test.createTestingModule({
            providers: [AuthService, {
                provide: UsersService,
                useValue: fakeUserService
            }]
        }).compile();
        service = module.get(AuthService);
    })

    it('can create an instance of auth service', async () => {
        expect(service).toBeDefined();
    })

    it("Create new user with salted and hashed password", async () => {
        const user = await service.signup('a@a.com', 'asdf');
        const { password } = user;
        expect(password).not.toEqual('asdf')
        const [salt, hash] = password.split(".");
        expect(salt).toBeDefined();
        expect(salt).toBeDefined();
    })

    it('throws an error if user signs up with email that is in use', async () => {
        // fakeUserService.find = () =>
        //     Promise.resolve([{ id: 1, email: 'aa', password: '1' } as User]);
        await service.signup('asdf@asdf.com', 'asdf')
        await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
            BadRequestException,
        );
    });

    it("throws error if signin is called with unused email", async () => {
        await expect(
            service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
        ).rejects.toThrow(NotFoundException);
    });

    it("sing in correctly", async () => {
        await service.signup("aaaa", "aaa")
        const user = await service.signin("aaaa", "aaa")
        expect(user).toBeDefined();
    })

    it("throw error if an invalid password is provided on signin", async () => {
        // fakeUserService.find = async () => Promise.resolve([{ id: 1, email: "aaa", password: "aaa" } as User])
        await service.signup("aaa", "aaa")
        await expect(service.signin("aaa", "pass")).rejects.toThrow(BadRequestException)
    })
})

