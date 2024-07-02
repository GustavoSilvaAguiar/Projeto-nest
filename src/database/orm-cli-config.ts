import { dataSourceOptions } from './database.module';
import { DataSource } from 'typeorm';
import { CreateCoursesTable1719336789660 } from 'src/migrations/1719336789660-CreateCoursesTable';
import { CreateTagsTable1719339182405 } from 'src/migrations/1719339182405-CreateTagsTable';
import { CreateCoursesTagsTable1719341751071 } from 'src/migrations/1719341751071-CreateCoursesTagsTable';
import { AddCoursesIdToCoursesTagsTable1719941465004 } from 'src/migrations/1719941465004-AddCoursesIdToCoursesTagsTable';
import { AddTagsIdToCoursesTagsTable1719942459319 } from 'src/migrations/1719942459319-AddTagsIdToCoursesTagsTable';

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
