import React from 'react';
import { Recipe } from '@/types';
import Link from 'next/link';

interface RecommendedRecipesProps {
  recipes: Recipe[];
}
// export const revalidate = 10;

const RecommendedRecipe: React.FC<RecommendedRecipesProps> = ({ recipes }) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 w-1200 mb-5">
          {recipes.map((recipe) => (
            <Link key={recipe.id} href={`/detail/${recipe.id}`} passHref>
              <div className="card w-96 bg-base-100 shadow-xl cursor-pointer border border-[color:var(--borderColor2)] transition duration-300 ease-in-out hover:border-[color:var(--subColor4)] hover:shadow-2xl">
                <div className="card-body">
                  <h1 className="text-[color:var(--titleColor)] text-xl">{recipe.name}</h1>
                  <p className="line-clamp-2 text-[color:var(--contentColor)]">{recipe.tip}</p>
                  <div className='mb-2'>
                    <div className="badge badge-ghost">{recipe.type}</div>
                    <div className="badge badge-outline">{recipe.how}</div>
                  </div>
                </div>
                <figure>{recipe.image && <img src={recipe.image} alt="Recipe" style={{ width: '400px', height: '300px' }} className="w-full h-auto"/>}</figure>
              </div>
            </Link>
          ))}
        </div>
    </div>
  );
}

export default RecommendedRecipe;
