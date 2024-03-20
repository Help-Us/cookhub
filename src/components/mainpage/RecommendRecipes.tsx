import React from 'react';
import { Recipe } from '@/types';
import Link from 'next/link';

interface RecommendedRecipesProps {
  recipes: Recipe[];
}

// export const revalidate = 10;

const RecommendedRecipes: React.FC<RecommendedRecipesProps> = ({ recipes }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {recipes.length > 0 && (
        recipes.map((recipe) => ( // index 대신 recipe의 고유 id를 key로 사용합니다.
          <Link key={recipe.id} href={`/detail/${recipe.id}`} passHref>
            <div className="p-4 rounded-lg border-2 border-pink cursor-pointer hover:shadow-md"> {/* 여기서 a 태그로 감싸는 것은 Next.js에서 Link 내부에 실제 클릭 가능한 요소를 명시하기 위함입니다. */}
              <div className='mb-2'>
                  <div className="badge badge-ghost">{recipe.type}</div>
                  <div className="badge badge-outline">{recipe.how}</div>
              </div>
              {recipe.image && <img src={recipe.image} alt="Recipe" style={{ width: '300px', height: '300px' }} className="w-full h-auto"/>}
              <h3 className='text-brown font-bold mt-2'>{recipe.name}</h3>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default RecommendedRecipes;
