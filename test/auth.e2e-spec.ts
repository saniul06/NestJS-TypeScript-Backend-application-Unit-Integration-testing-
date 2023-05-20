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
});
