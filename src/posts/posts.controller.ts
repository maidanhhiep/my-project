import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query, UseGuards, } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as _Post } from './post.model'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) { }
    @UseGuards(JwtAuthGuard)
    @Get()
    async getPosts() {
        const posts = await this.postsService.getPosts();
        return JSON.stringify(posts)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':postId')
    async getPost(@Param('postId') postId) {
        const post = await this.postsService.getPost(postId)
        return post
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addPost(@Body() body: _Post) {
        const post = await this.postsService.addPost(body);
        return post;
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deletePost(@Query() query) {
        const post = await this.postsService.deletePost(query.postId);
        return post;
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':postId')
    async updatePost(
        @Param('postId') postId,
        @Body() body: _Post
    ) {
        const post = await this.postsService.updatePost(postId, body)
        return post
    }
}
