import React from 'react';
import { MessageCircle} from 'lucide-react';
import { Link } from 'react-router-dom';

export const CommunityButton: React.FC = () => {
  return (
    <Link
  to="/Community"
  className="fixed bottom-24 right-4 md:right-12 w-14 h-14 bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:bg-green-500 transition-colors "
  aria-label="Open AI Chat"
>
  {/* Animated Aura */}
  <span className="absolute w-full h-full bg-green-500  rounded-full blur-2xl animate-aura"></span>

  {/* Button Icon */}
  <MessageCircle className="w-6 h-6 text-white" />
</Link>


  );
{/* Tailwind Custom Animation */}
<style>
  {`
    @keyframes aura {
      0% {
        transform: scale(1);
        opacity: 0.6;
      }
      50% {
        transform: scale(1.5);
        opacity: 0.3;
      }
      100% {
        transform: scale(2);
        opacity: 0;
      }
    }

    .animate-aura {
      animation: aura 2s infinite ease-out;
    }
  `}
</style>
};