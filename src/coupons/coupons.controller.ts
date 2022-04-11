import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query, UseGuards, } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { Coupon } from './coupon.model'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('coupons')
export class CouponsController {
    constructor(private couponsService: CouponsService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getCoupons() {
        const coupons = await this.couponsService.getCoupons();
        return JSON.stringify(coupons)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':couponId')
    async getCoupon(@Param('couponId') couponId) {
        const coupon = await this.couponsService.getCoupon(couponId)
        return coupon
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addCoupon(@Body() body: Coupon) {
        const coupon = await this.couponsService.addCoupon(body);
        return coupon;
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteCoupon(@Query() query) {
        const coupon = await this.couponsService.deleteCoupon(query.couponId);
        return coupon;
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':couponId')
    async updateCoupon(
        @Param('couponId') couponId,
        @Body() body: Coupon
    ) {
        const coupon = await this.couponsService.updateCoupon(couponId, body)
        return coupon
    }
}
