import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserEntity} from "../entities/user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) {
    }

    findAll(): Promise<UserEntity[]> {
        return this.usersRepository.find();
    }


    async findUserId(id: number) {
        const user = await this.usersRepository.findOne(id);
        if (user === undefined) throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
        return user;
    }


    async create(createUserDto: CreateUserDto) {
        const userDb = await this.findByEmail(createUserDto.email);
        if (userDb) throw new HttpException(`${createUserDto.email} already existed`, HttpStatus.BAD_REQUEST);

        const user = new UserEntity();
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;
        user.email = createUserDto.email;
        user.password = createUserDto.password;
        const newUser = await this.usersRepository.save(user);
        const {password, ...userResponse} = newUser
        return userResponse;

    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const {affected} = await this.usersRepository.update(id, updateUserDto);
        if (!affected) throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        return `User wit ${id} id updated`;
    }

    async delete(id: number) {
        const {affected} = await this.usersRepository.delete(id);
        if (!affected) throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
        return `User with ${id} id deleted`;
    }

    findByEmail(email: string) {
        return this.usersRepository.findOne({email})
    }
}
