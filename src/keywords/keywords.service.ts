import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Keyword } from './keyword.model';

@Injectable()
export class KeywordsService {
    constructor(@InjectModel('Keyword') private keywordModel: Model<Keyword>) { }

    getKeywords(): Promise<any> {
        return new Promise(resolve => {
            const keyword = this.keywordModel.find();
            resolve(keyword);
        })
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
