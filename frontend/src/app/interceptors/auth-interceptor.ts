import { HttpInterceptorFn } from '@angular/common/http';

const CLE_TOKEN = 'asm_token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem(CLE_TOKEN);

  const authReq = req.clone({
    setHeaders: {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });

  return next(authReq);
};
