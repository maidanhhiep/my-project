import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KeywordSchema } from './keyword.model';
import { KeywordsController } from './keywords.controller';
import { KeywordsService } from './keywords.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Keyword', schema: KeywordSchema }])
  ],
  controllers: [KeywordsController],
  providers: [KeywordsService]
})
export class KeywordsModule { }
