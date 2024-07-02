import { HttpException, Injectable } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tags.entity';
import { CreateCourseDTO } from './DTO/create-course.dto';
import { updateCourseDTO } from './DTO/update-course.dto';

@Injectable()
export class CoursesService {
  constructor() {}

  @InjectRepository(Course)
  private readonly courseRepository: Repository<Course>;

  @InjectRepository(Tag)
  private readonly tagRepository: Repository<Tag>;

  async findAll() {
    return await this.courseRepository.find({ relations: ['tags'] });
  }

  async findOne(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['tags'],
    });

    if (!course) {
      throw new HttpException(`Course ID ${id} not found`, 404);
    }

    return course;
  }

  async create(createCourseDTO: CreateCourseDTO) {
    const tags = await Promise.all(
      createCourseDTO.tags.map((name) => this.preloadTagByName(name)),
    );
    const newCourse = this.courseRepository.create({
      ...createCourseDTO,
      tags,
    });

    return await this.courseRepository.save(newCourse);
  }

  async update(id: string, updateCourseDTO: updateCourseDTO) {
    const tags =
      updateCourseDTO.tags &&
      (await Promise.all(
        updateCourseDTO.tags.map((name) => this.preloadTagByName(name)),
      ));
    const course = await this.courseRepository.preload({
      ...updateCourseDTO,
      id,
      tags,
    });

    if (!course) {
      throw new HttpException(`Course ID ${id} not found`, 404);
    }

    return await this.courseRepository.save(course);
  }

  async remove(id: string) {
    const course = await this.courseRepository.findOne({
      where: {
        id,
      },
    });

    if (!course) {
      throw new HttpException(`Course ID ${id} not found`, 404);
    }

    return await this.courseRepository.remove(course);
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { name } });

    if (tag) {
      return tag;
    }

    return this.tagRepository.create({ name });
  }
}
