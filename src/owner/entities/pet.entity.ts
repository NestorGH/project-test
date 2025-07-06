import { ApiProperty } from "@nestjs/swagger";

export class PetEntity {
    @ApiProperty()
    id: number;
    
    @ApiProperty()
    name: string;

    @ApiProperty()
    age: number;

    @ApiProperty()
    species: string;

    @ApiProperty()
    breed: string;

    @ApiProperty()
    ownerId: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
