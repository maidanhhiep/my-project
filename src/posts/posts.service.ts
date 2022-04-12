import { HttpException, Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.model';
import { StoresService } from 'src/stores/stores.service';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel('Post') private postModel: Model<Post>,
        @Inject(forwardRef(() => StoresService)) private readonly storesService: StoresService
    ) { }

    async getPosts(reqData: Post) {
        try {
            const post = await this.postModel.find(reqData);
            if (!post || (post && post.length == 0)) {
                throw new Error('404 | Post does not exist')
            }
            return post;
        } catch (error) {
            return error
        }
    }

    getPost(postId: String): Promise<any> {
        let id = postId;
        return new Promise(resolve => {
            const post = this.postModel.findById(id);
            if (!post) {
                throw new HttpException('Post does not exist', 404)
            }
            resolve(post);
        });
    }

    async addPost(reqData: Post) {
        console.log(reqData);
        const newPost = new this.postModel(reqData);
        try {
            const store = await this.storesService.getStores({ store_name: reqData.forStore })
            if (!store || (store && store.status == 404)) {
                throw new HttpException('Store does not exist', 404)
            }
            const post = await newPost.save();
            return post;
        } catch (error) {
            return (error);
        }
    }

    async deletePost(postId: String) {
        let id = postId;
        try {
            const result = this.postModel.remove({ _id: id });
            return result;
        } catch (error) {
            return error;
        }
    }

    async updatePost(postId: String, reqData: Post) {
        let id = postId;
        try {
            const result = await this.postModel.update({ _id: id }, reqData);
            return result;
        } catch (error) {
            console.log(error)
            return error;
        }
    }
}
