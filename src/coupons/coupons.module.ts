import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { CouponsController } from './coupons.controller';
import { CouponsService } from './coupons.service';
import { CouponSchema } from './coupon.model';
import { StoresModule } from '../stores/stores.module';

@Module({
  imports: [
    forwardRef(() => StoresModule),
    MongooseModule.forFeature([{ name: 'Coupon', schema: CouponSchema }])
  ],
  controllers: [CouponsController],
  providers: [CouponsService]
})
export class CouponsModule { }
