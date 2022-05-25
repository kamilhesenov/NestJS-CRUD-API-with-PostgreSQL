import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsOptional} from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsOptional()
    readonly firstName: string;

    @ApiProperty()
    @IsOptional()
    readonly lastName: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly password: string;
}
