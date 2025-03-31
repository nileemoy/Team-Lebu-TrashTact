import { useState, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const QRScannerPage = () => {
  const { t } = useLanguage();
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [points, setPoints] = useState<number>(0);
  const [earnedPoints, setEarnedPoints] = useState<number>(0);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("reader");
    
    const startScanner = async () => {
      try {
        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 }
          },
          (decodedText) => {
            // Generate random points between 0-50
            const randomPoints = Math.floor(Math.random() * 51);
            setEarnedPoints(randomPoints);
            setPoints(prev => prev + randomPoints);
            
            // Dispatch points update event
            const event = new CustomEvent('pointsUpdate', {
              detail: { points: randomPoints }
            });
            window.dispatchEvent(event);
          },
          (error) => {
            console.warn(error);
          }
        );
      } catch (err) {
        console.error("Error starting scanner:", err);
      }
    };

    startScanner();

    return () => {
      html5QrCode.stop().catch(err => console.error("Error stopping scanner:", err));
    };
  }, []);

  return (
    <div className="min-h-screen bg-green-100 flex flex-col">
      <div className="p-4 border-b border-[#2A3D2A]">
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-black" />
          </Link>
          <h1 className="text-xl text-black font-semibold">{t('common.scanQR')}</h1>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{t('scanner.title')}</h2>
            <p className="text-sm text-gray-600 mt-1">{t('rewards.points.scan')}: {points}</p>
          </div>

          <div id="reader" className="w-full overflow-hidden rounded-lg"></div>
        </div>
      </div>

      {/* Success Popup */}
      {earnedPoints > 0 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 transform transition-all">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-green-600 font-medium text-lg">{t('common.success')}</p>
              <p className="text-2xl font-bold text-[#3D6F3D] mt-2">+{earnedPoints}</p>
              <p className="text-sm text-gray-600 mt-1">{t('rewards.points.scan')}</p>
              <button
                onClick={() => setEarnedPoints(0)}
                className="mt-6 bg-[#3D6F3D] text-white px-6 py-2 rounded-lg hover:bg-[#2F5F2F] transition-colors w-full"
              >
                {t('scanner.startCamera')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRScannerPage; 