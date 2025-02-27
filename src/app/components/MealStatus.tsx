import React from 'react';

interface MealDetails {
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
}

interface MealStatusProps {
  meals: MealDetails;
}

const MealStatus: React.FC<MealStatusProps> = ({ meals }) => {
  return (
    <div className="mt-6">
      <h4 className="text-lg font-medium text-gray-300 mb-3">Meal Status</h4>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#1d2029] p-4 rounded-lg border border-gray-800 text-center">
          <div className="text-gray-400 text-xs uppercase mb-1">Breakfast</div>
          <div className={`font-medium ${meals.breakfast ? 'text-green-400' : 'text-red-400'}`}>
            {meals.breakfast ? 'Taken' : 'Not Taken'}
          </div>
        </div>
        <div className="bg-[#1d2029] p-4 rounded-lg border border-gray-800 text-center">
          <div className="text-gray-400 text-xs uppercase mb-1">Lunch</div>
          <div className={`font-medium ${meals.lunch ? 'text-green-400' : 'text-red-400'}`}>
            {meals.lunch ? 'Taken' : 'Not Taken'}
          </div>
        </div>
        <div className="bg-[#1d2029] p-4 rounded-lg border border-gray-800 text-center">
          <div className="text-gray-400 text-xs uppercase mb-1">Dinner</div>
          <div className={`font-medium ${meals.dinner ? 'text-green-400' : 'text-red-400'}`}>
            {meals.dinner ? 'Taken' : 'Not Taken'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealStatus;
