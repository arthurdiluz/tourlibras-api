import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateProfessorDto } from '../dtos/professor/create-professor.dto';
import { CreateStudentDto } from '../dtos/student/create-student.dto';
import { FindUserDto } from '../dtos/find-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { hashString } from 'src/common/helpers/hashString';
import { removeKeys } from 'src/common/helpers/removeKeys';
import { JwtSignInDto } from 'src/modules/auth/dtos/jwt/jwt-sign-in.dto';
import { ROLE, Professor, Student } from '@prisma/client';
import { verify } from 'argon2';
import { S3Service } from 'src/common/aws/services/aws.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly s3Service: S3Service,
  ) {}

  async create({ password, role, ...body }: CreateUserDto) {
    const user = await this.userRepository.create({
      data: {
        password: await hashString(password),
        profilePhoto: '',
        role,
        ...body,
      },
      include: role === 'STUDENT' ? { Student: true } : { Professor: true },
    });

    await this.linkUserToRole(user.id, user.role);

    return removeKeys(user, ['password']);
  }

  async createProfessor({
    grammar,
    password,
    ...userBody
  }: CreateProfessorDto) {
    const professor = await this.userRepository.create({
      data: {
        Professor: { create: { grammar } },
        password: await hashString(password),
        ...userBody,
      },
      include: { Professor: true },
    });

    return removeKeys(professor, ['password']);
  }

  async createStudent({
    professorId,
    password,
    ...userBody
  }: CreateStudentDto) {
    const student = await this.userRepository.create({
      data: {
        Student: {
          create: professorId
            ? { Professor: { connect: { id: professorId } } }
            : {},
        },
        password: await hashString(password),
        ...userBody,
      },
      include: { Student: { include: { Professor: true } } },
    });

    return removeKeys(student, ['password']);
  }

  async find({ fullName, ...body }: FindUserDto) {
    const users = await this.userRepository.findMany({
      where: {
        fullName: { contains: fullName, mode: 'insensitive' },
        ...body,
      },
    });

    return users.map((user) => removeKeys(user, ['password']));
  }

  async findById(userId: number) {
    const user = await this.userRepository.findUnique({
      where: { id: userId },
      include: {
        Professor: { select: { id: true } },
        Student: { select: { id: true } },
      },
    });

    if (!user) return null;

    return removeKeys(user, ['password']);
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findUnique({ where: { email } });

    if (!user) return null;

    return removeKeys(user, ['password']);
  }

  async update(id: number, { password, ...body }: UpdateUserDto) {
    const user = await this.userRepository.update({
      where: { id },
      data: {
        updatedAt: new Date(),
        password: await hashString(password),
        ...body,
      },
    });

    return removeKeys(user, ['password']);
  }

  async delete(userId: number) {
    const user = await this.userRepository.delete({ where: { id: userId } });
    return removeKeys(user, ['password']);
  }

  async isValidCredentials({ email, password }: JwtSignInDto) {
    const user = await this.userRepository.findUnique({
      where: { email },
    });

    return user && (await verify(user.password, password));
  }

  async linkUserToRole(
    userId: number,
    role: ROLE,
  ): Promise<Student | Professor> {
    await this.userRepository.update({ where: { id: userId }, data: { role } });

    switch (role) {
      case 'STUDENT':
        return this.userRepository.addStudentRole(userId);
      case 'PROFESSOR':
        return this.userRepository.addProfessorRole(userId);
      default:
        throw new BadRequestException(`Invalid role`);
    }
  }

  async uploadProfilePicutre(
    id: number,
    file: Express.Multer.File,
    path: string,
  ) {
    const key = await this.s3Service.upload(file, path);

    if (!key) {
      throw new InternalServerErrorException(`Could not upload file to AWS`);
    }

    return await this.userRepository.update({
      where: { id },
      data: { profilePhoto: key },
    });
  }
}
