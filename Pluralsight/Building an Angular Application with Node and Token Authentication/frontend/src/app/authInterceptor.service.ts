import { Injectable, Injector } from '@angular/core'
import { HttpInterceptor } from '@angular/common/http'
import { AuthService } from './auth.service'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    
    //nemuzeme injectnout AuthService, protoze AuthService injektuje HttpClient a tim by jsme vytvorili circular reference
    //jde obejit Injectorem
    constructor(private injector: Injector) {}

    //pouzije se pro kazdy http request aby jsme predali token
    intercept(req, next) {
        var auth = this.injector.get(AuthService)
        var authRequest = req.clone({
            headers: req.headers.set('Authorization', 'token ' + auth.token)
        })
        return next.handle(authRequest)
    }
}