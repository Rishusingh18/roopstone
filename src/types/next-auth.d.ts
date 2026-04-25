import { DefaultSession } from "next-auth";

type UserRole = "super_admin" | "editor" | "marketing";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    role?: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: UserRole;
  }
}
