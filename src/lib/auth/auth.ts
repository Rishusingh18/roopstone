// src/lib/auth/auth.ts

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db/client';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Fetch user from DB
        const { data: user, error } = await db
          .from('users')
          .select('*')
          .eq('email', credentials.email)
          .single();

        if (error || !user || !user.is_active) return null;

        // Verify password
        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password_hash
        );

        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.full_name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      // If using Google, ensure user exists in our DB or create with default role
      if (account?.provider === 'google') {
        const { data: existingUser } = await db
          .from('users')
          .select('*')
          .eq('email', user.email)
          .single();

        if (!existingUser) {
          // Auto-provision user on first sign-in with 'marketing' role (least privilege)
          const { error } = await db.from('users').insert({
            email: user.email,
            full_name: user.name,
            role: 'marketing',
            password_hash: 'OAUTH_USER', // Placeholder
            is_active: true,
          });

          if (error) {
            console.error('Failed to provision OAuth user:', error);
            return false;
          }
        } else if (!existingUser.is_active) {
          return false;
        }
        
        // Update user object for token callback
        user.role = existingUser?.role || 'marketing';
      }
      return true;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
});
