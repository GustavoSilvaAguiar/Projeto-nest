import { CoursesController } from './courses.controller';

describe('CoursesController', () => {
  let controller: CoursesController;

  beforeEach(async () => {
    controller = new CoursesController();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
