import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsEntity } from './entity/students.entity';
import { CreateDto } from './students-dto/create-dto/create-dto';
import { UpdateDto } from './students-dto/update-dto/update-dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  findAll(): Promise<StudentsEntity[]> {
    return this.studentsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number): Promise<string | StudentsEntity> {
    return this.studentsService.findOne(id);
  }
  @Patch(':id')
  updateStudent(
    @Param('id') id: string,
    @Body() updateDto: UpdateDto,
  ): string | UpdateDto {
    return this.updateStudent(id, updateDto);
  }
  @Post()
  createStudent(@Body() createDto: CreateDto): Promise<StudentsEntity> {
    const created = this.studentsService.create(createDto);
    return created;
  }
}
