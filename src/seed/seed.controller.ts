import { Controller, Get, } from '@nestjs/common';

import { ValidRoles } from 'src/auth/interfaces';
import { Auth } from 'src/auth/decorators';

import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  //@Auth(ValidRoles.admin, ValidRoles.superUser)
  executedSeed(){
    return this.seedService.runSeed()
  }

}
