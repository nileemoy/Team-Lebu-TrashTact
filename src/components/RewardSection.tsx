import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { Button } from "./Button";
import RewardsExtender from "./RewardsExtender";

const RewardSection = () => {
  return (
    <section id="rewards" className="py-20">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Earn Rewards for Sustainable Actions</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Get points for proper waste disposal and redeem them for exclusive rewards from our partners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="border-none shadow-md bg-gradient-to-br from-primary/80 to-primary text-white">
            <CardHeader>
              <div className="flex justify-between items-center mb-4">
                <CardTitle className="text-white">Your Points</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end space-x-2 mb-4">
                <span className="text-4xl font-bold">1,250</span>
                <span className="text-lg opacity-80 mb-1">pts</span>
              </div>
              <div className="text-sm opacity-80 mb-6">
                You've properly disposed 23 items this month!
              </div>
              <Button
                className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/40"
              >
                View Activity
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Environmental Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">CO₂ Saved</span>
                    <span className="text-sm font-medium">4.2 kg</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Water Saved</span>
                    <span className="text-sm font-medium">28 liters</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Energy Saved</span>
                    <span className="text-sm font-medium">12.5 kWh</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Milestone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-secondary-foreground"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Community Guru</h4>
                    <p className="text-sm text-muted-foreground">Dispose 50 items properly</p>
                  </div>
                </div>
                
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <span className="text-sm font-medium">23/50 items</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '46%' }}></div>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Keep going! Reach this milestone to unlock premium partner rewards.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/50 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Available Rewards</h3>
          <RewardsExtender />
        </div>
      </div>
    </section>
  );
};

export default RewardSection;
