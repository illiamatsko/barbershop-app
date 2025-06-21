import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this["$connect"](); // або this['$connect']() якщо TS жаліється
  }

  async onModuleDestroy() {
    await this["$disconnect"]();
  }
}
