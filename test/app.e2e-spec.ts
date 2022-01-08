import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

const gql = '/graphql';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // afterAll(async () => {
  //   await app.close();
  // });

  describe(gql, () => {
    describe('login', () => {
      it('should get the user info', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({
            query:
              'mutation {login(input: {email: "saeed@yahoo.com", password: "saeed"}){user {id firstName lastName}}}',
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.login).toEqual({
              user: {
                id: 2,
                firstName: 'saeed',
                lastName: 'et',
              },
            });
          });
      });
    });
  });
  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });
});
