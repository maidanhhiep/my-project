import { Injectable, HttpException, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coupon } from './coupon.model'
import { StoresService } from 'src/stores/stores.service';

@Injectable()
export class CouponsService {
    constructor(
        @InjectModel('Coupon') private couponModel: Model<Coupon>,
        @Inject(forwardRef(() => StoresService)) private readonly storesService: StoresService
    ) { }

    async getCoupons(reqData: Coupon) {
        try {
            const coupon = await this.couponModel.find(reqData)
            if (!coupon || (coupon && coupon.length == 0)) {
                throw new HttpException('Coupon does not exist', 404)
            }
            return coupon;
        } catch (error) {
            return error
        }
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
            const store = await this.storesService.getStores({ store_name: reqData.forStore })
            console.log(111, JSON.stringify(store))
            if (!store || (store && store.status == 404)) {
                throw new Error('404 | Store does not exist')
            }
            const coupon = await newCoupon.save();
            return coupon;
        } catch (error) {
            return (error);
        }
    }

    async deleteCoupon(couponId: String) {
        let id = couponId;
        try {
            const result = await this.couponModel.remove({ _id: id });
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
