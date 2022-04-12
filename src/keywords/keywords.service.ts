import { HttpException, Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Keyword } from './keyword.model';
import { StoresService } from 'src/stores/stores.service';

@Injectable()
export class KeywordsService {
    constructor(
        @InjectModel('Keyword') private keywordModel: Model<Keyword>,
        @Inject(forwardRef(() => StoresService)) private readonly storesService: StoresService
    ) { }

    async getKeywords(reqData: Keyword) {
        try {
            const keyword = await this.keywordModel.find(reqData);
            if (!keyword || (keyword && keyword.length == 0)) {
                throw new Error('404 | Keyword does not exist')
            }
            return keyword;
        } catch (error) {
            return error
        }
    }

    getKeyword(keywordId: String): Promise<any> {
        return new Promise(resolve => {
            const id = keywordId;
            const keyword = this.keywordModel.findById(id);
            if (!keyword) {
                throw new HttpException('Keyword does not exist', 404)
            }
            resolve(keyword);
        })
    }

    async addKeyword(reqData: Keyword) {
        console.log(reqData);
        const newKeyword = new this.keywordModel(reqData);
        try {
            const store = await this.storesService.getStores({ store_name: reqData.forStore })
            if (!store || (store && store.status == 404)) {
                throw new HttpException('Store does not exist', 404)
            }
            const keyword = await newKeyword.save();
            return keyword;
        } catch (error) {
            return (error);
        }
    }

    async deleteKeyword(keywordId: String) {
        let id = keywordId;
        try {
            const result = this.keywordModel.remove({ _id: id });
            return result;
        } catch (error) {
            return error;
        }
    }

    async updateKeyword(keywordId: String, reqData: Keyword) {
        let id = keywordId;
        try {
            const result = await this.keywordModel.update({ _id: id }, reqData);
            return result;
        } catch (error) {
            console.log(error)
            return error;
        }
    }
}
