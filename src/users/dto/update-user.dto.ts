import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsOptional} from "class-validator";

export class UpdateUserDto {
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
}
