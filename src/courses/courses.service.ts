import { HttpException, Injectable } from '@nestjs/common';
import { Course } from './courses.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'NestJS',
      description: 'Curso sobre fundamentos do framework NestJS',
      tags: ['node.js', 'nestJS', 'javascript', 'typescript'],
    },
    {
      id: 2,
      name: 'Vue.js',
      description: 'Curso sobre fundamentos do framework Vue.js',
      tags: ['vue 2', 'vue 3', 'javascript', 'typescript'],
    },
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: number) {
    const course = this.courses.find((course: Course) => course.id === id);

    if (!course) {
      throw new HttpException(`Course ID ${id} not found`, 404);
    }

    return course;
  }

  create(createCourseDTO: any) {
    const newCourse: Course = {
      id: this.courses.length + 1,
      ...createCourseDTO,
    };
    this.courses.push(newCourse);
    return newCourse;
  }

  update(id: number, updateCourseDTO: any) {
    const existingCourse = this.findOne(id);
    if (existingCourse) {
      const index = this.courses.findIndex((course) => course.id === id);
      this.courses[index] = {
        id,
        ...updateCourseDTO,
      };
    }
  }

  remove(id: number) {
    const index = this.courses.findIndex((course) => course.id === id);

    if (index >= 0) {
      this.courses.splice(index, 1);
    }
  }
}
