import { ApiProperty } from "@nestjs/swagger";
import { Pet } from "generated/prisma";
import { CreatePetDto } from "./create-pet.dto";
import { IsArray, IsEmail, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateOwnerDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty({ type: [CreatePetDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePetDto)
    pets: CreatePetDto[];
}
