import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Store } from './store.model';

@Injectable()
export class StoresService {
    constructor(@InjectModel('Store') private storeModel: Model<Store>) { }

    getStores(): Promise<any> {
        return new Promise(resolve => {
            const store = this.storeModel.find();
            resolve(store);
        })
    }

    getStore(storeId: String): Promise<any> {
        return new Promise(resolve => {
            const id = storeId;
            const store = this.storeModel.findById(id);
            if (!store) {
                throw new HttpException('Store does not exist', 404)
            }
            resolve(store);
        })
    }

    async addStore(reqData: Store) {
        console.log(reqData);
        const newStore = new this.storeModel(reqData);
        try {
            const store = await newStore.save();
            return store;
        } catch (error) {
            return (error);
        }
    }

    async deleteStore(storeId: String) {
        let id = storeId;
        try {
            const result = this.storeModel.remove({ _id: id });
            return result;
        } catch (error) {
            return error;
        }
    }

    async updateStore(storeId: String, reqData: Store) {
        let id = storeId;
        try {
            const result = await this.storeModel.update({ _id: id }, reqData);
            return result;
        } catch (error) {
            console.log(error)
            return error;
        }
    }
}
