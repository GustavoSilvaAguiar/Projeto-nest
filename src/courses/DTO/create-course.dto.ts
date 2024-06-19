import { IsString } from 'class-validator';

export class CreateCourseDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString({ each: true })
  tags: string[];
}
