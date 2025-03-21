import { SignupForm } from "@/components/auth/Signup-form";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left side - Branding */}
      <div className="hidden md:flex flex-col bg-gradient-purple p-8 text-white justify-between">
        <div>
          <Link
            href="/"
            className="text-gradient-purple font-bold text-3xl text-white bg-clip-text"
          >
            X-tube
          </Link>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold">Join X-tube today!</h1>
          <p className="text-xl opacity-90 text-muted-dark">
            Create an account to unlock all features and join our growing
            community of creators and viewers.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="font-semibold text-lg">Create & Upload</h3>
              <p className="opacity-80 text-sm text-muted-dark">
                Share your unique content with the world
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="font-semibold text-lg">Build Your Audience</h3>
              <p className="opacity-80 text-sm text-muted-dark">
                Grow your subscriber base and reach more viewers
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="font-semibold text-lg">Personalized Feed</h3>
              <p className="opacity-80 text-sm text-muted-dark">
                Get content recommendations based on your interests
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="font-semibold text-lg">Interact & Engage</h3>
              <p className="opacity-80 text-sm text-muted-dark">
                Comment, like, and share your favorite videos
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm opacity-80">
            © 2023 X-tube. All rights reserved.
          </p>
          <ThemeToggle />
        </div>
      </div>

      {/* Right side - Signup Form */}
      <div className="flex flex-col justify-center p-6 md:p-12">
        <div className="md:hidden flex justify-between items-center mb-8">
          <Link href="/" className="text-gradient-purple font-bold text-2xl">
            X-tube
          </Link>
          <ThemeToggle />
        </div>

        <div className="space-y-2 text-center md:text-left mb-8">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground">
            Fill in your details to get started with X-tube
          </p>
        </div>

        <SignupForm />

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary hover:underline">
            Sign in
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
