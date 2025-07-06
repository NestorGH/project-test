import { ApiProperty, PartialType } from '@nestjs/swagger';
import { UpdatePetDto } from './update-pet.dto';
import { CreateOwnerDto } from './create-owner.dto';

export class UpdateOwnerDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty({ type: [UpdatePetDto] })
    pets: UpdatePetDto[];
}