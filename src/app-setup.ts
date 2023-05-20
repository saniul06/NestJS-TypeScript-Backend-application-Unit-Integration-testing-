import { ValidationPipe } from "@nestjs/common"
const cookieSession = require('cookie-session')


export const setupApp = (app: any) => {
    app.use(cookieSession({
        keys: ['sklfjksdf']
    }))
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true
        })
    )
}