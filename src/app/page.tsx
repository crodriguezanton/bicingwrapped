import { AnimatedGradientBackground } from "~/components/AnimatedGradientBackground";

import LoginForm from "~/components/login-form";

export default function LoginPage() {
  return (
    <AnimatedGradientBackground>
      <div className="flex h-screen flex-col items-center justify-center bg-black/50 backdrop-blur-md">
        <div className="mx-auto max-w-md px-4">
          <LoginForm />
        </div>
      </div>
    </AnimatedGradientBackground>
  );
}
