
import * as mongoose from 'mongoose'

export const StoreSchema = new mongoose.Schema({
    store_name: { type: String, required: true },
    slug_store: { type: String, required: true, unique: true, index: true },
    store_aff: { type: String },
    store_cat: { type: String },
    store_image: { type: String },
    store_excerpt: { type: String },
    rich_content: { type: String },
    store_domain: { type: String },
    created_by: { type: String },
    view: { type: Number, default: 0 },
    update_at: { type: Number },
    active_stt: { type: Number, default: 1 },
    connect_id: { type: String, default: null },
    approved: { type: String, index: true },
    net_type: { type: String, index: true },
    bing_cp: { type: Boolean, index: true, default: false },
    merchant_id: { type: Number, index: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

export interface Store {
    store_name?: String;
    slug_store?: String;
    store_aff?: String;
    store_cat?: String;
    store_image?: String;
    store_excerpt?: String;
    rich_content?: String;
    store_domain?: String;
    created_by?: String;
    view?: Number;
    update_at?: Number;
    active_stt?: Number;
    connect_id?: String;
    approved?: String;
    net_type?: String;
    bing_cp?: Boolean;
    merchant_id?: Number;
}