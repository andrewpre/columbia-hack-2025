import React from 'react';
import Progress from './ui/progress';
import Card from './ui/card';
import ContinueCard from './ui/continueCard';
// import CardContent from './ui/cardcontent';
import { CircleUserRound } from 'lucide-react';

// interface AchievementProps {
//   achievements: string[];
// }

const UserProfile: React.FC = ({user}) => {

  const options = {
    year: 'numeric',
    month: 'long',  // 'long' gives full month name; use 'short' for abbreviated (e.g., Feb)
  };
  const date = new Date(user.dateCreated);
  const formattedDate = date.toLocaleString('en-US', options);
  console.log(user)
  return (
    <div className="bg-blue-500 text-white grid grid-cols-3 gap-8">
      {/* Left Section */}
      <div className="col-span-2" style={{alignContent:'center'}}>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Card className="w-32 h-32 flex items-center justify-center">
              <CircleUserRound className="w-24 h-24 text-white" />
            </Card>
            <div className="absolute overlap-user-level bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              {user.level||1}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.username||"Demo User"}</h2>
            <p className="text-sm">{formattedDate}</p>
            <div className="flex items-center gap-2 mt-2 text-md font-bold">
              <span>{user.currentXp}/{user.level*15} Exp</span>
              <div className="relative w-40">
                <Progress value={Math.round((user.currentXp / (user.level * 15)) * 100)} className="h-2 bg-gray-300" />
                <div className="absolute progress-bar-level-position bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {user.level+1||1}
                </div>
              </div>

            </div>
          </div>

        </div>
        </div>


      {/* Right Section */}
      <div>
        <ContinueCard title="Topic 1: Alphabet Signing" lesson="Lesson 1: A B C" />
      </div>
    </div>
  );
};

export default UserProfile;
