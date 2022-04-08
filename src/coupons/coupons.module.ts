import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { CouponsController } from './coupons.controller';
import { CouponsService } from './coupons.service';
import { CouponSchema } from './coupon.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Coupon', schema: CouponSchema }])
  ],
  controllers: [CouponsController],
  providers: [CouponsService]
})
export class CouponsModule { }
