import React from 'react';
import { Recipe } from '@/types';
import Link from 'next/link';

interface RecommendedRecipesProps {
  recipes: Recipe[];
}

const RecommendedRecipe: React.FC<RecommendedRecipesProps> = ({ recipes }) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 w-1200 mb-5">
          {recipes.map((recipe) => (
            <Link key={recipe.id} href={`/detail/${recipe.id}`} passHref>
              <div className="card w-96 h-64 bg-base-100 shadow-xl cursor-pointer transition duration-500 ease-in-out hover:shadow-2xl hover:bg-gray-800 overflow-hidden rounded-lg relative transform hover:-translate-y-1 hover:scale-102">
                <div className="absolute inset-0 bg-cover bg-center transition duration-500 ease-in-out" style={{ backgroundImage: `url(${recipe.image})` }}></div>
                <div className="card-body bg-opacity-30 bg-black text-white absolute bottom-0 w-full p-4 transition duration-500 ease-in-out hover:bg-opacity-40">
                  <h1 className="text-xl font-bold mb-2">{recipe.name}</h1>
                  <div className='mb-1'>
                    {recipe.type && <div className="badge badge-ghost">{recipe.type}</div>}
                    {recipe.how && <div className="badge badge-outline">{recipe.how}</div>}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
    </div>
  );
}

export default RecommendedRecipe;
