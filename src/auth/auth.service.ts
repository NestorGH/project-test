import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async signIn(username: string, pass: string): Promise<{ access_token: string }> {

        const user = await this.userService.findOneName(username);
        const isMatch = await bcrypt.compare(pass, user.password);

        if (isMatch) {
            const payload = { sub: user.id, username: user.name };
            // Generate JWT token
            return {
                access_token: await this.jwtService.signAsync(payload),
            };

        } else {
            throw new UnauthorizedException('Invalid credentials');
        }

    }
}
