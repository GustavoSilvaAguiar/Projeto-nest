/* eslint-disable @typescript-eslint/no-unused-vars */
import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Course } from './entities/courses.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Tag } from './entities/tags.entity';
import { CoursesModule } from './courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

describe('CoursesController', () => {
  let app: INestApplication;
  let module: TestingModule;
  let data: any;
  let courses: Course[];

  const dataSourceTest: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5441,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Course, Tag],
    synchronize: true,
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        CoursesModule,
        TypeOrmModule.forRootAsync({
          useFactory: async () => {
            return dataSourceTest;
          },
        }),
      ],
    }).compile();

    app = module.createNestApplication();

    await app.init();

    data = {
      name: 'Node.js',
      description: 'Node.js description',
      tags: ['node.js', 'ts', 'js'],
    };
  });

  beforeEach(async () => {
    const dataSource = await new DataSource(dataSourceTest).initialize();
    const repository = dataSource.getRepository(Course);

    courses = await repository.find();

    await dataSource.destroy();
  });

  afterAll(async () => {
    await module.close();
  });

  describe('POST /courses', () => {
    it('should create a course', async () => {
      const res = await request(app.getHttpServer())
        .post('/courses')
        .send(data)
        .expect(201);
      expect(res.body.id).toBeDefined();
      expect(res.body.name).toEqual(data.name);
      expect(res.body.description).toEqual(data.description);
    });
  });

  describe('GET /courses', () => {
    it('should list all courses', async () => {
      const res = await request(app.getHttpServer())
        .get('/courses/list')
        .expect(200);
      expect(res.body[0].id).toBeDefined();
      expect(res.body[0].name).toEqual(data.name);
      expect(res.body[0].description).toEqual(data.description);

      res.body.map((item) =>
        expect(item).toEqual({
          id: item.id,
          name: item.name,
          description: item.description,
          created_at: item.created_at,
          tags: [...item.tags],
        }),
      );
    });
  });

  describe('GET /courses/list/:id', () => {
    it('should list one course by id', async () => {
      const res = await request(app.getHttpServer())
        .get(`/courses/list/${courses[0].id}`)
        .expect(200);
      expect(res.body.id).toBeDefined();
      expect(res.body.name).toEqual(courses[0].name);
      expect(res.body.description).toEqual(courses[0].description);
    });
  });

  describe('PUT /courses/:id', () => {
    it('should update one course by id', async () => {
      const updateData = {
        name: 'Vue.js',
        description: 'vue.js description',
        tags: ['node.js', 'ts', 'js', 'vue'],
      };

      const res = await request(app.getHttpServer())
        .patch(`/courses/${courses[0].id}`)
        .send(updateData)
        .expect(200);
      expect(res.body.id).toBeDefined();
      expect(res.body.name).toEqual(updateData.name);
      expect(res.body.description).toEqual(updateData.description);
    });
  });

  describe('DELETE /courses/:id', () => {
    it('should delete one course by id', async () => {
      const res = await request(app.getHttpServer())
        .delete(`/courses/${courses[0].id}`)
        .expect(200)
        .expect({});
    });
  });
});
