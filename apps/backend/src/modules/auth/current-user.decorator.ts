import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/auth';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): DecodedIdToken => {
    const req = ctx.switchToHttp().getRequest<{ user?: DecodedIdToken }>();
    // req.user がない可能性も型的にはあるので fallback
    return req.user as DecodedIdToken;
  },
);
