import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Authentication - X-tube",
  description: "Sign in or create an account on X-tube",
};

export default function AuthLayout({ children }) {
  return <div className={inter.className}>{children}</div>;
}
