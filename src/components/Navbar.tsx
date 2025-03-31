import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import { UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { useLanguage } from "../contexts/LanguageContext";

const Navbar = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);
  

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-52 h-auto absolute mt-8 left-0">
            <img
              src="/logo.png"
              alt="TrashTact logo"
              className="w-full h-auto object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          
          <a
            href="#scanner"
            className="text-foreground/80 hover:text-primary smooth-transition"
          >
            {t('nav.scanner')}
          </a>
          <a
            href="#map"
            className="text-foreground/80 hover:text-primary smooth-transition"
          >
            {t('nav.map')}
          </a>
          <a
            href="#rewards"
            className="text-foreground/80 hover:text-primary smooth-transition"
          >
            {t('nav.rewards')}
          </a>
          <a
            href="#features"
            className="text-foreground/80 hover:text-primary smooth-transition"
          >
            {t('nav.features')}
          </a>
          <SignedOut>
            <Link to="/sign-in">
              <Button variant="outline" size="sm">
                {t('common.signIn')}
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button size="sm">{t('common.signUp')}</Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/sign-in" />
          </SignedIn>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/90 backdrop-blur-md shadow-md p-4 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <a
              href="#features"
              className="text-foreground/80 hover:text-primary smooth-transition px-4 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.features')}
            </a>
            <a
              href="#scanner"
              className="text-foreground/80 hover:text-primary smooth-transition px-4 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.scanner')}
            </a>
            <a
              href="#map"
              className="text-foreground/80 hover:text-primary smooth-transition px-4 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.map')}
            </a>
            <a
              href="#rewards"
              className="text-foreground/80 hover:text-primary smooth-transition px-4 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.rewards')}
            </a>
            <div className="flex flex-col space-y-2 pt-2 border-t">
              <SignedOut>
                <Link to="/sign-in" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    {t('common.signIn')}
                  </Button>
                </Link>
                <Link to="/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full">{t('common.signUp')}</Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <div className="flex justify-center">
                  <UserButton afterSignOutUrl="/sign-in" />
                </div>
              </SignedIn>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
