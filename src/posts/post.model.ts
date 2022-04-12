
import * as mongoose from 'mongoose'

export const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    excerpt: { type: String },
    slug: { type: String, index: true },
    status: { type: String, index: true },
    tags: { type: Array, index: true },
    categories: { type: Array, index: true },
    medias: { type: Number },
    content: { type: String },
    type: { type: String },
    id: { type: Number, index: true, unique: true },
    forStore: { type: String, required: true, index: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

export interface Post {
    title?: String;
    excerpt?: String;
    slug?: String;
    status?: String;
    tags?: Array<any>;
    categories?: Array<any>;
    medias?: Number;
    content?: String;
    type?: String;
    id?: Number;
    forStore?: String;
}