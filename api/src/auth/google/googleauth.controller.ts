import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'
import { configService } from 'src/config/config.service'
import { promisify } from 'util'

@Controller('/auth/google')
export class GoogleAuthController {
  @Get()
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    return
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Res() res: Response, @Req() req: Request) {
    console.log(req.user)
    promisify(req.logIn).call(req, req.user!)
    res.redirect(configService.getOAuthRedirection())
  }
}
