import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './DTO/create-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Get('list')
  findAll() {
    return this.courseService.findAll();
  }

  /* @Get('list/:id')
  findOne(@Param() params) {
    return `Curso id: ${params.id}`;
  } */

  @Get('list/:id')
  findOne(@Param('id') id: number) {
    return this.courseService.findOne(id);
  }

  @Post()
  create(@Body() createCourseDTO: CreateCourseDTO) {
    return this.courseService.create(createCourseDTO);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body) {
    return this.courseService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    this.courseService.remove(id);
  }
}
