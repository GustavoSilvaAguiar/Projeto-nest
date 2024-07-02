/* eslint-disable @typescript-eslint/no-unused-vars */
import { randomUUID } from 'crypto';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './DTO/create-course.dto';
import { updateCourseDTO } from './DTO/update-course.dto';

describe('CoursesService unit tests', () => {
  let service: CoursesService;
  let id: string;
  let created_at: Date;
  let expectOutputTags: any;
  let expectOutputCourses: any;
  let mockCourseRepository: any;
  let mockTagRepository: any;

  beforeEach(async () => {
    service = new CoursesService();
    id = randomUUID();
    created_at = new Date();
    expectOutputTags = [
      {
        id,
        name: 'nest.js',
        created_at,
      },
    ];
    expectOutputCourses = [
      {
        id,
        name: 'test',
        description: 'test description',
        created_at,
        tags: expectOutputTags,
      },
    ];

    mockCourseRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
    };

    mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a course', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const createCourseDTO: CreateCourseDTO = {
      name: 'test',
      description: 'test description',
      tags: ['nest.js'],
    };

    const newCourse = await service.create(createCourseDTO);

    expect(mockCourseRepository.save).toHaveBeenCalled();

    expect(expectOutputCourses).toStrictEqual(newCourse);
  });

  it('should list all courses', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const courses = await service.findAll();

    expect(mockCourseRepository.find).toHaveBeenCalled();

    expect(expectOutputCourses).toStrictEqual(courses);
  });

  it('should list one course by Id', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const courses = await service.findOne(id);

    expect(mockCourseRepository.findOne).toHaveBeenCalled();

    expect(expectOutputCourses).toStrictEqual(courses);
  });

  it('should update a course', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const updateCourseDTO: updateCourseDTO = {
      name: 'test',
      description: 'test description',
      tags: ['nest.js'],
    };

    const course = await service.update(id, updateCourseDTO);

    expect(mockCourseRepository.save).toHaveBeenCalled();

    expect(expectOutputCourses).toStrictEqual(course);
  });

  it('should remove one course by Id', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const course = await service.remove(id);

    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(mockCourseRepository.remove).toHaveBeenCalled();

    expect(expectOutputCourses).toStrictEqual(course);
  });
});
