
import * as mongoose from 'mongoose'

export const KeywordSchema = new mongoose.Schema({
    keyword: { type: String, required: true },
    keyword_slug: { type: String, required: true, index: true },
    keyword_cat: { type: String },
    keyword_ads: { type: String },
    keyword_couponupto: { type: String },
    view: { type: Number },
    k_related: { type: String },
    k_related_html: { type: Array },
    coupon_ids: { type: Array },
    tracked: { type: Number, index: true },
    entity_id: { type: mongoose.Schema.Types.ObjectId, index: true, default: null },
    hash_r: { type: String, required: true, unique: true, index: true },
    isQuestion: { type: Boolean, default: false, index: true },
    emails: { type: Array, default: [] },
    phones: { type: Array, default: [] },
    addresses: { type: Array, },
    tag_id: { type: mongoose.Schema.Types.ObjectId, default: null, index: true },
    also_ask: { type: Array },
    forStore: { type: String, required: true, index: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

export interface Keyword {
    keyword?: String;
    keyword_slug?: String;
    keyword_cat?: String;
    keyword_ads?: String;
    keyword_couponupto?: String;
    view?: Number;
    k_related?: String;
    k_related_html?: Array<any>;
    coupon_ids?: Array<any>;
    tracked?: Number;
    entity_id?: String;
    hash_r?: String;
    isQuestion?: Boolean;
    emails?: Array<any>;
    phones?: Array<any>;
    addresses?: Array<any>;
    tag_id?: String;
    also_ask?: Array<any>;
    forStore?: String;
}