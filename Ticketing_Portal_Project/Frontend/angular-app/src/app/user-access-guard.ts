import { CanActivateFn } from '@angular/router';

export const userAccessGuard: CanActivateFn = (route, state) => {

  const empId = sessionStorage.getItem("empId");
  const role = sessionStorage.getItem("role");

  if (!empId || !role) {
    return false;
  }
  const allowedRoles = route.data?.['roles'];
  if (!allowedRoles) {
    return true;
  }
  if (role === "ADMIN") {
    return true;
  }
  
  return allowedRoles.includes("EMPLOYEE");
};
