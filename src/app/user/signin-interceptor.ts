// import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
// import { Injectable } from '@angular/core';


// @Injectable()
// export class SigninInterceptor implements HttpInterceptor {
//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     const token = localStorage.getItem('token');
//     const authreq = req.clone({
//       headers: req.headers.set('authorization', token)
//     });
//     return next.handle(authreq);
//   }
// }
