import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query, UseGuards, } from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { Keyword } from './keyword.model'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('keywords')
export class KeywordsController {
    constructor(private keywordsService: KeywordsService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getKeywords(@Query() query) {
        const keywords = await this.keywordsService.getKeywords(query);
        return JSON.stringify(keywords)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':keywordId')
    async getKeyword(@Param('keywordId') keywordId) {
        const keyword = await this.keywordsService.getKeyword(keywordId)
        return keyword
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addKeyword(@Body() body: Keyword) {
        const keyword = await this.keywordsService.addKeyword(body);
        return keyword;
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteKeyword(@Query() query) {
        const keyword = await this.keywordsService.deleteKeyword(query.keywordId);
        return keyword;
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':keywordId')
    async updateKeyword(
        @Param('keywordId') keywordId,
        @Body() body: Keyword
    ) {
        const keyword = await this.keywordsService.updateKeyword(keywordId, body)
        return keyword
    }
}
