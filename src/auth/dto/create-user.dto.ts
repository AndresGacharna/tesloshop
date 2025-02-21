import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class CreateUserDto{
    

    @ApiProperty({
            description: 'Email is required from the user to create an account',
    
        })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'It must be at least 6 character and have a Uppercase, lowercase letter and a number',

    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @ApiProperty({
        description: 'Name of the person, it must be at least 1 character',

    })
    @IsString()
    @MinLength(1)
    fullName: string;
}