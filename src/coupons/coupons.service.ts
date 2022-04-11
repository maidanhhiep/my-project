import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coupon } from './coupon.model'

@Injectable()
export class CouponsService {
    constructor(@InjectModel('Coupon') private couponModel: Model<Coupon>) { }

    getCoupons(): Promise<any> {
        return new Promise(resolve => {
            const coupon = this.couponModel.find()
            resolve(coupon);
        });
    }

    getCoupon(couponId: String): Promise<any> {
        let id = couponId;
        return new Promise(resolve => {
            const coupon = this.couponModel.findById(id);
            if (!coupon) {
                throw new HttpException('Coupon does not exist', 404)
            }
            resolve(coupon);
        });
    }

    async addCoupon(reqData: Coupon) {
        console.log(reqData);
        const newCoupon = new this.couponModel(reqData);
        try {
            const coupon = await newCoupon.save();
            return coupon;
        } catch (error) {
            return (error);
        }
    }

    async deleteCoupon(couponId: String) {
        let id = couponId;
        try {
            const result = this.couponModel.remove({ _id: id });
            return result;
        } catch (error) {
            return error;
        }
    }

    async updateCoupon(couponId: String, reqData: Coupon) {
        let id = couponId;
        try {
            const result = await this.couponModel.update({ _id: id }, reqData);
            return result;
        } catch (error) {
            console.log(error)
            return error;
        }
    }
}
