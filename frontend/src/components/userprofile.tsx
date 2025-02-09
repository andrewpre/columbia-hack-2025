import React from 'react';
import Progress from './ui/progress';
import Card from './ui/card';
// import CardContent from './ui/cardcontent';
import { CircleUserRound } from 'lucide-react';

// interface AchievementProps {
//   achievements: string[];
// }

const UserProfile: React.FC = () => {
  return (
    <div className="bg-blue-500 p-8 text-white grid grid-cols-3 gap-8">
      {/* Left Section */}
      <div className="col-span-2">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Card className="w-32 h-32 flex items-center justify-center">
              <CircleUserRound className="w-24 h-24 text-white" />
            </Card>
            <div className="absolute overlap-user-level bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              20
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">User's Name</h2>
            <p className="text-sm">Date Joined</p>
            <div className="flex items-center gap-2 mt-2 text-md font-bold">
              <span>50/100 Exp</span>
              <div className="relative w-40">
                <Progress value={50} className="h-2 bg-gray-300" />
                <div className="absolute progress-bar-level-position bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  21
                </div>
              </div>
              <Card className="w-32 h-16 flex items-center justify-center">
            <span className="text-black">Daily Streak</span>
          </Card>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">Recently Earned Achievements:</h3>
          <div className="flex gap-4">
            {Array(5).fill('Achievement').map((ach, index) => (
              <Card key={index} className="w-24 h-24 flex items-center justify-center">
                <span className="text-black text-center">{ach}</span>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div>
        <h3 className="text-xl font-bold mb-2">Continue Learning:</h3>
        <Card className="w-full h-64 flex items-center justify-center">
          <span className="text-black">Content Placeholder</span>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
