import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { CreateCoursesTable1719336789660 } from 'src/migrations/1719336789660-CreateCoursesTable';
import { CreateTagsTable1719339182405 } from 'src/migrations/1719339182405-CreateTagsTable';
import { CreateCoursesTagsTable1719341751071 } from 'src/migrations/1719341751071-CreateCoursesTagsTable';
import { AddCoursesIdToCoursesTagsTable1719941465004 } from 'src/migrations/1719941465004-AddCoursesIdToCoursesTagsTable';
import { AddTagsIdToCoursesTagsTable1719942459319 } from 'src/migrations/1719942459319-AddTagsIdToCoursesTagsTable';
import { Course } from 'src/courses/entities/courses.entity';
import { Tag } from 'src/courses/entities/tags.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Course, Tag],
  synchronize: false,
};

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateCoursesTable1719336789660,
    CreateTagsTable1719339182405,
    CreateCoursesTagsTable1719341751071,
    AddCoursesIdToCoursesTagsTable1719941465004,
    AddTagsIdToCoursesTagsTable1719942459319,
  ],
});
