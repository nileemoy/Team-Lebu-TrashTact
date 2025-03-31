import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="flex items-center justify-center space-x-2 mb-20 relative">
          <div className="w-full mt-32 absolute">
          <img
              src="/logo.png"
              alt="TrashTact logo"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout; 