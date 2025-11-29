import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { DecodedIdToken } from 'firebase-admin/auth';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  // firebaseUser からアプリ用 User を取得 or 作成
  async findOrCreateByFirebaseUid(firebaseUser: DecodedIdToken) {
    const { uid, email, phone_number } = firebaseUser;

    // 既存ユーザー検索（firebaseUid でユニーク検索）
    const existing = await this.prisma.user.findUnique({
      where: { firebaseUid: uid },
    });
    if (existing) return existing;

    // 新規作成
    return this.prisma.user.create({
      data: {
        firebaseUid: uid,
        email: email ?? `${uid}@example.local`,
        phoneNumber: phone_number ?? null,
        isPhoneVerified: !!phone_number,
      },
    });
  }
}