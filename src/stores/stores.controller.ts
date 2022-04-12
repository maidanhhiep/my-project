import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query, UseGuards, } from '@nestjs/common';
import { StoresService } from './stores.service';
import { Store } from './store.model'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('stores')
export class StoresController {
    constructor(private storesService: StoresService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getStores(@Query() query) {
        const stores = await this.storesService.getStores(query);
        return JSON.stringify(stores)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':storeId')
    async getStore(@Param('storeId') storeId) {
        const store = await this.storesService.getStore(storeId)
        return store
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addStore(@Body() body: Store) {
        const store = await this.storesService.addStore(body);
        return store;
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteStore(@Query() query) {
        const store = await this.storesService.deleteStore(query.storeId);
        return store;
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':storeId')
    async updateStore(
        @Param('storeId') storeId,
        @Body() body: Store
    ) {
        const store = await this.storesService.updateStore(storeId, body)
        return store
    }
}
