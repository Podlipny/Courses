import { Resolver, Mutation, Args, Query, Parent, ResolveField } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { CreateStudentInput } from './create-student.input';
import { StudentService } from './student.service';
import { LessonService } from 'src/lesson/lesson.service';
import { Student } from './student.entity';

@Resolver(of => StudentType)
export class StudentResolver {
  constructor(
    private studentService: StudentService,
    // private lessonsService: LessonService,
  ) {}

  @Query(returns => StudentType)
  async student(
    @Args('id') id: string,
  ) {
    return this.studentService.getStudent(id);
  }

  @Query(returns => [StudentType])
  async students() {
    return this.studentService.getStudents();
  }

  @Mutation(returns => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput
  ) {
    return this.studentService.createStudent(createStudentInput);
  }
}