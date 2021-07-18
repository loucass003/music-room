import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'
import { configService } from 'src/config/config.service'

@Controller('/auth/google')
export class GoogleAuthController {
  @Get()
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    return
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Res() res: Response) {
    console.log((res as any).prototype)
    res.redirect(configService.getOAuthRedirection())
  }
}
