import { SignIn } from "@clerk/clerk-react";
import AuthLayout from "@/components/auth/AuthLayout";

const SignInPage = () => {
  return (
    <AuthLayout>
      <div className="space-y-6 ">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground ">
            Enter your credentials to access your account
          </p>
        
          <SignIn
            routing="path"
            path="/sign-in"
            appearance={{
              elements: {
                rootBox: "mx-auto ",
                card: "shadow-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "bg-white border border-input hover:bg-accent hover:text-accent-foreground",
                socialButtonsBlockButtonText: "text-sm font-medium",
                socialButtonsBlockButtonArrow: "hidden",
                formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
                formFieldLabel: "text-sm font-medium",
                formFieldInput: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                footerActionLink: "text-primary hover:text-primary/90",
              },
            }}
          />
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignInPage; 