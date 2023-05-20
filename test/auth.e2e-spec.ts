import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
// import { setupApp } from '../src/app-setup';

describe('Authentication system (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        // setupApp(app);
        await app.init();
    });

    it('/singup (POST)', () => {
        const email = "b@b.com";
        const session = {};
        return request(app.getHttpServer())
            .post('/auth/signup')
            .send({ email, password: "bbbb" })
            .expect(201)
            .then(res => {
                const { id, email, password } = res.body;
                expect(id).toBeDefined();
                expect(email).toEqual(email);
            })
    });

    it("sign up a new user and then get back the user", async () => {
        const email = "a@a.com";
        const res = await request(app.getHttpServer())
            .post("/auth/signup")
            .send({ email, password: "aaaa" })
            .expect(201)
        const cookie = res.get("Set-Cookie");

        const { body } = await request(app.getHttpServer())
            .get("/auth/whoami")
            .set("Cookie", cookie)
            .expect(200)

        expect(body.email).toEqual(email);
    })
});
