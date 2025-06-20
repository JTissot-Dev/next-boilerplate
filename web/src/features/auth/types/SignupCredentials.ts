import { Prettify } from "better-auth";

type SignupCredentials = Prettify<{
  email: string;
  name: string;
  password: string;
  image?: string | undefined;
  callbackURL?: string | undefined;
}>;

export default SignupCredentials;
