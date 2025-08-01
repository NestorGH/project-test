import { ApiProperty } from "@nestjs/swagger";
import { PetEntity } from "./pet.entity";

export class OwnerEntity {
    @ApiProperty()
    id: number;
    
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty({ type: [PetEntity] })
    pets: PetEntity[];

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
