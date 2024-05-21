import { JWTPayload } from "jose";

export interface UserLoginDetails {
  sub: string;
}

export interface UserLogin extends Partial<UserLoginDetails> {
  loggedIn: boolean;
}

export type JWTUserLogin = JWTPayload & UserLoginDetails;
