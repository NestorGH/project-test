import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";


export class CreatePetDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsInt()
    age: number;

    @ApiProperty()
    @IsString()
    species: string;

    @ApiProperty()
    @IsString()
    breed: string;
}