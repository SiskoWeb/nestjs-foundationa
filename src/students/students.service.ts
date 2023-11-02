import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StudentsEntity } from './entity/students.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateDto } from './students-dto/create-dto/create-dto';
import { UpdateDto } from './students-dto/update-dto/update-dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentsEntity)
    private readonly studentRepository: Repository<StudentsEntity>,
  ) {} // to calll db

  // private students: StudentsEntity[] = [
  //   { id: 2, name: 'yassine', age: 28 },
  //   { id: 1, name: 'hamda', age: 28 },
  // ];

  async findAll(): Promise<StudentsEntity[]> {
    return this.studentRepository.find();
  }

  async findOne(id: number) {
    // const student = this.stu.find((i) => i.id === +id);
    const student = this.studentRepository.findOne({ where: { id } });

    if (!student)
      // throw new NotFoundException(`no student belong this id ${id}`);
      throw new HttpException(
        `no student belong this id ${id}`,
        HttpStatus.NOT_FOUND,
      );

    return student;
  }

  async create(createStudentBto: CreateDto): Promise<StudentsEntity> {
    const studentCreated = this.studentRepository.create({
      ...createStudentBto,
    });
    return this.studentRepository.save(studentCreated);
  }

  async update(
    id: number,
    updateStudentDto: UpdateDto,
  ): Promise<StudentsEntity> {
    const isExist = await this.studentRepository.preload({
      id,
      ...updateStudentDto,
    });

    if (!isExist)
      throw new HttpException(
        `no student belong this id ${id}`,
        HttpStatus.NOT_FOUND,
      );

    const studentUpdated = await this.studentRepository.save({
      ...updateStudentDto,
    });

    return studentUpdated;
  }
  async remove(id: number): Promise<void> {
    await this.studentRepository.delete(id);
  }
}
