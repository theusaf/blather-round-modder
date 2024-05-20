import { JWTPayload } from "jose";

export interface UserLoginDetails {
  sub: string;
}

export interface UserLogin extends UserLoginDetails {
  loggedIn: boolean;
}

export type JWTUserLogin = JWTPayload & UserLoginDetails;
