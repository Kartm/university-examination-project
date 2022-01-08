import { Body, ConflictException, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { AuthUser } from '../../shared/decorators/auth-user.decorator';
import { Roles } from '../../shared/decorators/roles.decorators';
import { User } from '../users/interfaces/user.interface';

import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService,
        private usersService: UsersService) { }

    @Post('signin')
    async signIn(@Body() body: SigninUserDto): Promise<{ token: string }> {
        const user = await this.authService.signIn(body.email, body.password);

        if (!user)
            throw new NotFoundException("No user found");

        const token = await this.authService.createToken(user);

        return {
            token
        };
    }

    @Post('signup')
    async signUp(@Body() createUserDto: CreateUserDto): Promise<{ success: boolean }> {
        const emailConflict = await this.usersService.findOne({ email: createUserDto.email });

        if (emailConflict)
            throw new ConflictException("email");

        const user = await this.authService.signUp(createUserDto);

        if (user) {
            return {
                success: true
            };
        }

        return {
            success: false
        };
    }

    @Get('refresh-token')
    @Roles("user", "premium", "admin")
    async refreshToken(@AuthUser() user: JwtPayload): Promise<{ me: User, token: string }> {
        const me = await this.usersService.findMe(user.id);
        const token = await this.authService.createToken(me);

        return {
            me,
            token
        };
    }

    @Get('email-free/:email')
    async emailFree(@Param() params): Promise<{ success: boolean }> {
        const user = await this.usersService.findOne({ email: params.email });

        if (!user) {
            return {
                success: true
            };
        }

        return {
            success: false
        };
    }
}
