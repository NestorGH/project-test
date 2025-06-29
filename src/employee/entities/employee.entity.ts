import { ApiProperty } from '@nestjs/swagger';

export class EmployeeEntity {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty({ example: 'ENGINEER' })
    role: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

}