import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  initializeApp,
  getApp,
  getApps,
  App,
  applicationDefault,
  cert,
} from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';

@Injectable()
export class FirebaseAdminService implements OnModuleInit {
  private app!: App;

  onModuleInit(): void {
    if (!getApps().length) {
      const projectId = process.env.FIREBASE_PROJECT_ID;
      const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
      const rawKey = process.env.FIREBASE_PRIVATE_KEY ?? '';

      const privateKey = rawKey.replace(/\\n/g, '\n');

      const credential =
        projectId && clientEmail && privateKey
          ? cert({ projectId, clientEmail, privateKey })
          : applicationDefault();

      this.app = initializeApp({
        projectId,
        credential,
      });
    } else {
      this.app = getApp();
    }
  }

  auth(): Auth {
    return getAuth(this.app);
  }
}
