import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ChatPage } from "./pages/ChatPage";
import WasteManagementCommunityChat from "./pages/communityChat";
import SignInPage from "./pages/auth/SignIn";
import SignUpPage from "./pages/auth/SignUp";
import QRScannerPage from "./pages/QRScannerPage";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";

const queryClient = new QueryClient();

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

const LanguageSwitcher = () => {
  const { currentLanguage, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="fixed bottom-28 right-4 z-50 flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"
      title={currentLanguage === 'en' ? 'অসমীয়ালৈ সলনি কৰক' : 'Switch to English'}
    >
      <span className="text-lg font-medium">
        {currentLanguage === 'en' ? 'অ' : 'EN'}
      </span>
    </button>
  );
};

const App = () => {
  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <LanguageSwitcher />
              <Routes>
                {/* Public routes */}
                <Route path="/sign-in/*" element={<SignInPage />} />
                <Route path="/sign-up/*" element={<SignUpPage />} />

                {/* Protected routes */}
                <Route
                  path="/"
                  element={
                    <>
                      <SignedIn>
                        <Index />
                      </SignedIn>
                      <SignedOut>
                        <RedirectToSignIn />
                      </SignedOut>
                    </>
                  }
                />
                <Route
                  path="/chat"
                  element={
                    <>
                      <SignedIn>
                        <ChatPage />
                      </SignedIn>
                      <SignedOut>
                        <RedirectToSignIn />
                      </SignedOut>
                    </>
                  }
                />
                <Route
                  path="/community"
                  element={
                    <>
                      <SignedIn>
                        <WasteManagementCommunityChat />
                      </SignedIn>
                      <SignedOut>
                        <RedirectToSignIn />
                      </SignedOut>
                    </>
                  }
                />
                <Route
                  path="/scan-qr"
                  element={
                    <>
                      <SignedIn>
                        <QRScannerPage />
                      </SignedIn>
                      <SignedOut>
                        <RedirectToSignIn />
                      </SignedOut>
                    </>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </ClerkProvider>
  );
};

export default App;
