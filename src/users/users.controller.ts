import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {ApiTags} from "@nestjs/swagger";
import {UpdateUserDto} from "./dto/update-user.dto";

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Get()
    findAllUsers() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findById(@Param('id', new ParseIntPipe()) id: number) {
        return this.usersService.findUserId(id);
    }

    @Delete(':id')
    deleteById(@Param('id', new ParseIntPipe()) id: number) {
        return this.usersService.delete(id);
    }

    @Put(':id')
    updateUser(@Param('id', new ParseIntPipe()) id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }
}
