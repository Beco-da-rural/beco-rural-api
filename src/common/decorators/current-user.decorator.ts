/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { JwtPayload } from '@app/modules/auth/jwt-payload';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
/**
 * Extrai o payload jwt da requisição atual
 * @returns JwtPayload | undefined
 */
export const CurrentUser = createParamDecorator((_: undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user: JwtPayload | undefined = request.user;
  return user;
});
