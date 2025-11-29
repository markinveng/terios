import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { DecodedIdToken } from 'firebase-admin/auth';
import { FirebaseAdminService } from './firebase-admin.service';

type RequestWithUser = {
  headers: Record<string, string | string[] | undefined>;
  user?: DecodedIdToken;
};

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private readonly firebaseAdmin: FirebaseAdminService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<RequestWithUser>();

    const authHeader = req.headers['authorization'];
    if (typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or invalid Authorization header',
      );
    }

    const token = authHeader.slice('Bearer '.length);

    try {
      const decoded = (await this.firebaseAdmin
        .auth()
        .verifyIdToken(token)) as DecodedIdToken;

      req.user = decoded;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid Firebase ID token');
    }
  }
}
