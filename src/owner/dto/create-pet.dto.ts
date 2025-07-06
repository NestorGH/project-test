import { ApiProperty } from "@nestjs/swagger";


export class CreatePetDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    age: number;

    @ApiProperty()
    species: string;

    @ApiProperty()
    breed: string;
}