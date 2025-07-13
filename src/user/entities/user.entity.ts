import { ApiProperty } from "@nestjs/swagger";

export class UserEntity {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    password: string;

    @ApiProperty({ example: 'ENGINEER' })
    role: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
