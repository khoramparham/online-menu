import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enum/role.enum';
import { notAccessException } from '../exceptions/notAccess.exception';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.get<Role[]>(
            'roles',
            context.getHandler(),
        );
        if (!requiredRoles) return true;
        const { user } = await context.switchToHttp().getRequest();
        if (requiredRoles.includes(user.role)) {
            return true;
        } else {
            throw new notAccessException();
        }
    }
}
