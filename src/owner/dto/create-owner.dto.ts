import { ApiProperty } from "@nestjs/swagger";
import { Pet } from "generated/prisma";
import { CreatePetDto } from "./create-pet.dto";

export class CreateOwnerDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty({ type: [CreatePetDto] })
    pets: CreatePetDto[];
}
