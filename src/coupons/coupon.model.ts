
import * as mongoose from 'mongoose'
export const CouponSchema = new mongoose.Schema({
    coupon_name: { type: String, required: true },
    coupon_slug: { type: String, required: true, index: true, unique: true },
    coupon_excerpt: { type: String },
    coupon_code: { type: String },
    code_status: { type: Number },
    off_sale: { type: Number },
    off_type: { type: String, },
    code_type: { type: String, },
    expired_date: { type: Number, },
    aff_link: { type: String },
    go_link: { type: String },
    order_index: { type: Number, default: 0 },
    created_by: { type: String, index: true },
    for_keyword: { type: mongoose.Schema.Types.ObjectId, index: true },
    for_entity: { type: mongoose.Schema.Types.ObjectId, index: true },
    forStore: { type: String, required: true, index: true },
    hash_r: { type: String, required: true, index: true, unique: true, },
    like_up: { type: Number, default: 0, index: true },
    like_down: { type: Number, default: 0, index: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
CouponSchema.set('toJSON', { getters: true });
export interface Coupon {
    coupon_name?: String;
    coupon_slug?: String;
    forStore?: String;
    hash_r?: String;
    coupon_excerpt?: String;
    coupon_code?: String;
    code_status?: Number;
    off_sale?: Number;
    off_type?: String;
    code_type?: String;
    expired_date?: Number;
    aff_link?: String;
    go_link?: String;
    order_index?: Number;
    created_by?: String;
    for_keyword?: String;
    for_entity?: String;
    like_up?: Number;
    like_down?: Number;
}