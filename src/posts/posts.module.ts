import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './post.model';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { StoresModule } from 'src/stores/stores.module';

@Module({
  imports: [
    forwardRef(() => StoresModule),
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }])
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
