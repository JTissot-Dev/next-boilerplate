import { Prettify } from "better-auth";

type LoginCredentials = Prettify<{
  password: string;
  email: string;
  callbackURL?: string | undefined;
  rememberMe?: boolean | undefined;
}>;

export default LoginCredentials;
