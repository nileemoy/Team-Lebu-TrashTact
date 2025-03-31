import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Reward {
  id: number;
  name: string;
  points: number;
  description: string;
}

const rewards: Reward[] = [
  {
    id: 1,
    name: 'Eco-Friendly Water Bottle',
    points: 100,
    description: 'Reusable water bottle made from recycled materials'
  },
  {
    id: 2,
    name: 'Recycling Bin',
    points: 200,
    description: 'Home recycling bin with separate compartments'
  },
  {
    id: 3,
    name: 'Compost Starter Kit',
    points: 300,
    description: 'Everything you need to start composting at home'
  },
  {
    id: 4,
    name: 'Zero Waste Kit',
    points: 500,
    description: 'Reusable bags, containers, and utensils'
  }
];

const RewardsExtender = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userPoints, setUserPoints] = useState(250); // Initial points

  // Listen for points updates from QR scanner
  useEffect(() => {
    const handlePointsUpdate = (event: CustomEvent) => {
      setUserPoints(prev => prev + event.detail.points);
    };

    window.addEventListener('pointsUpdate', handlePointsUpdate as EventListener);
    return () => {
      window.removeEventListener('pointsUpdate', handlePointsUpdate as EventListener);
    };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Your Rewards</h2>
            <p className="text-sm text-gray-600">Available Points: {userPoints}</p>
          </div>
          <Link
            to="/scan-qr"
            className="bg-[#3D6F3D] text-white p-2 rounded-lg hover:bg-[#2F5F2F]"
            aria-label="Scan QR Code"
          >
            <QrCode className="w-5 h-5" />
          </Link>
        </div>

        <div className={`space-y-4 ${isExpanded ? '' : 'max-h-32 overflow-hidden'}`}>
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-800">{reward.name}</h3>
                  <p className="text-sm text-gray-600">{reward.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-[#3D6F3D]">{reward.points} pts</p>
                  <button
                    className={`text-sm px-3 py-1 rounded-full ${
                      userPoints >= reward.points
                        ? 'bg-[#3D6F3D] text-white'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                    disabled={userPoints < reward.points}
                  >
                    Redeem
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-4 flex items-center justify-center text-[#3D6F3D] hover:text-[#2F5F2F]"
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="ml-1 w-4 h-4" />
            </>
          ) : (
            <>
              View All Rewards <ChevronDown className="ml-1 w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default RewardsExtender; 