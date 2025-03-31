import { SignUp } from "@clerk/clerk-react";
import AuthLayout from "@/components/auth/AuthLayout";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your details to create your account
          </p>
        </div>
        <SignUp
          routing="path"
          path="/sign-up"
          appearance={{
            elements: {
              rootBox: "mx-auto",
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
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-primary hover:text-primary/90 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUpPage; 