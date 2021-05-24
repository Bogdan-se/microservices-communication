import { Module } from '@nestjs/common';

import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [DashboardModule],
})
export class AppModule {}
