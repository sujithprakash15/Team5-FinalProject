import { CanActivateFn } from '@angular/router';

export const userAccessGuard: CanActivateFn = (route, state) => {
  let username = sessionStorage.getItem("username");
  if(username)
    return true;
  else
    return false;
};
