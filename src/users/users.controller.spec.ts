import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUserService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUserService = {
      findOne: async (id: number) => Promise.resolve({ id, email: "emai.com", password: "pass" } as User),
      find: () => Promise.resolve([{ id: 22, email: "aa@a.com", password: "ssss" }] as User[]),
      remove: (id: number) => Promise.resolve({} as User),
      update: (id: number) => Promise.resolve({} as User),

    }
    fakeAuthService = {
      signin: async (email: string, password: string) => Promise.resolve({ id: 22, email: "e@e.com", password: "aaaa" } as User),
      signup: async (email: string, password: string) => Promise.resolve({} as User)
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("findUser with the given id", async () => {
    const user = await controller.findUser('22');
    expect(user).toBeDefined();
  })

  it("findUser throws an error if user with given id is not found", async () => {
    fakeUserService.findOne = async () => null;
    await expect(controller.findUser('22')).rejects.toThrow(NotFoundException)
  })

  it("find all users with the given email", async () => {
    const users = await controller.findAllUsers("aa@a.com")
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('aa@a.com');
  })

  it("signin update session object and return user", async () => {
    const body = {
      email: "a@a.com",
      password: "aaaa"
    };
    const session: any = {};
    const user = await controller.signin(body, session);
    console.log('user is: ', user)
    expect(user).toBeDefined();
    expect(session.userId).toBeDefined();
  })
});
