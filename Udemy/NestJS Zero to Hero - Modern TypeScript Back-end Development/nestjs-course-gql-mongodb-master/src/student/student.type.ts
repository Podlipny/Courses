import { ObjectType, Field } from '@nestjs/graphql';
import { LessonType } from '../lesson/lesson.type';

@ObjectType('Student')
export class StudentType {
  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}