import { LoginForm } from "@/components/auth/Login-form";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left side - Branding */}
      <div className="hidden md:flex flex-col card bg-gradient-purple card-hover p-8 text-white justify-between">
        <div>
          <Link
            href="/"
            className=" font-bold text-3xl bg-white bg-clip-text"
          >
            X-tube
          </Link>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold">Welcome back!</h1>
          <p className="text-xl opacity-90 text-muted-dark">
            Sign in to continue your journey with X-tube - where content
            creation meets social interaction.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="font-semibold text-lg">Share Your Videos</h3>
              <p className="opacity-80 text-sm text-muted-dark">
                Upload and share your content with the world
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="font-semibold text-lg ">Connect with Others</h3>
              <p className="opacity-80 text-sm text-muted-dark">
                Follow creators and build your community
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="font-semibold text-lg ">Discover Content</h3>
              <p className="opacity-80 text-sm text-muted-dark">
                Find videos tailored to your interests
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="font-semibold text-lg">Engage & Interact</h3>
              <p className="opacity-80 text-sm text-muted-dark">
                Like, comment, and share your favorite content
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm opacity-80 text-muted-dark">
            © 2023 X-tube. All rights reserved.
          </p>
          <ThemeToggle />
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex flex-col justify-center p-6 md:p-12">
        <div className="md:hidden flex justify-between items-center mb-8">
          <Link href="/" className="text-gradient-purple font-bold text-2xl">
            X-tube
          </Link>
          <ThemeToggle />
        </div>

        <div className="space-y-2 text-center md:text-left mb-8">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>

        <LoginForm />

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>

        <div className="md:hidden text-center mt-8">
          <p className="text-xs text-muted-foreground">
            © 2023 X-tube. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
