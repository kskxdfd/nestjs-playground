import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('official')
export class OfficialController {
  @Post('/statusCodeSample')
  @HttpCode(HttpStatus.OK)
  statusCodeSample() {
    return 'statusCodeSample';
  }
}
