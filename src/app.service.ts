import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Jan and World!'
  }

  somethingElse(): string {
    return 'It works!'
  }
}
