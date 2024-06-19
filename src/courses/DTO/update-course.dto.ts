import { IsString } from 'class-validator';

export class updateCourseDTO {
  @IsString()
  name?: string;

  @IsString()
  description?: string;

  @IsString({ each: true })
  tags?: string[];
}
