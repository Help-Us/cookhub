import React from 'react';
import { Recipe } from '@/types';

interface RecommendedRecipesProps {
  recipes: Recipe[];
}

// export const revalidate = 10;

const RecommendedRecipes: React.FC<RecommendedRecipesProps> = ({ recipes }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {recipes.length > 0 && (
        recipes.map((recipe, index) => (
          <div key={index} className="p-4 rounded-lg border-2 border-pink">
            <div className='mb-2'>
                <div className="badge badge-ghost">{recipe.type}</div>
                <div className="badge badge-outline ">{recipe.how}</div>
            </div>
            {recipe.image && <img src={recipe.image} alt="Recipe" style={{ width: '300px', height: '300px' }} className="w-full h-auto"/>}
            <h3 className='text-brown font-bold mt-2'>{recipe.name}</h3>
          </div>
        ))
      )}
    </div>
  );
}

export default RecommendedRecipes;
