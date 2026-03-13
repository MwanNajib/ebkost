import { Metadata } from "next";
import SignInClient from "./sign-in-client";

export const metadata: Metadata = {
  title: "Sign In - EbKost",
  description: "Masuk ke akun EbKost Anda untuk memesan kamar kost terbaik",
};

const SignInPage = () => {
  return <SignInClient />;
};

export default SignInPage;
