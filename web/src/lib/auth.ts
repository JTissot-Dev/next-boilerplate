import React from 'react';
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import resend from "./email";
import EmailVerification from "@/features/auth/emails/email-verification";
import ResetPassword from '@/features/auth/emails/reset-password';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [user.email],
        subject: 'Réinitialisez votre mot de passe',
        react: React.createElement(ResetPassword, {
          userName: user.name,
          resetUrl: url,
        }),
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const redirectUrl = url
        .replace("callbackURL=/", "callbackURL=/login?verified=1");

      await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [user.email],
        subject: 'Verifiez votre adresse email',
        react: React.createElement(EmailVerification, {
          userName: user.name,
          verificationUrl: redirectUrl,
        }),
      });
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});