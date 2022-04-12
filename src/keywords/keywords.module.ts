import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KeywordSchema } from './keyword.model';
import { KeywordsController } from './keywords.controller';
import { KeywordsService } from './keywords.service';
import { StoresModule } from 'src/stores/stores.module';

@Module({
  imports: [
    forwardRef(() => StoresModule),
    MongooseModule.forFeature([{ name: 'Keyword', schema: KeywordSchema }])
  ],
  controllers: [KeywordsController],
  providers: [KeywordsService]
})
export class KeywordsModule { }
