import { Button } from "./Button";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative pt-28 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full filter blur-3xl animate-pulse-subtle"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full filter blur-3xl animate-pulse-subtle"></div>
      </div>

      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-muted mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
            <span className="text-sm font-medium">{t('home.hero.tagline')}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {t('home.hero.title')}
          </h1>

          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {t('home.hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button size="lg" className="w-full sm:w-auto">
              {t('home.hero.startScanning')}
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              {t('home.hero.viewMap')}
            </Button>
          </div>

          <div className="mt-16 relative animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10"></div>
            
            <div className="mx-auto relative overflow-hidden rounded-xl shadow-xl max-w-3xl">
              <div className="aspect-[16/9] bg-muted rounded-xl overflow-hidden">
                <div className="flex items-center justify-center h-full">
                  <div className="p-8 text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                      </svg>
                    </div>
                    <p className="text-lg font-medium mb-2">{t('home.hero.demo.title')}</p>
                    <p className="text-sm text-muted-foreground">{t('home.hero.demo.preview')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
