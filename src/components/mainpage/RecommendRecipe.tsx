import React from 'react';
import { Recipe } from '@/types';
import Link from 'next/link';

interface RecommendedRecipesProps {
  recipes: Recipe[];
  searched : boolean;
}
// export const revalidate = 10;

const RecommendedRecipe: React.FC<RecommendedRecipesProps> = ({ recipes, searched }) => {
  // 검색된 데이터의 수 계산
  const searchResultCount = recipes.length;
  return (
    <div>
      {/* 검색된 데이터의 수를 표시하는 부분 */}
      {searched && (
        <p className="text-sm text-gray-500 mb-3">{searchResultCount}건의 데이터가 검색되었습니다.</p>
      )}

      {searched && searchResultCount === 0 ? (
        // 검색은 되었는데 검색된 결과가 없을 때
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">검색된 결과가 없습니다.</p>
        </div>
      ) : (
        // 검색 결과가 있을 때
        <div className="grid grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <Link key={recipe.id} href={`/detail/${recipe.id}`} passHref>
              <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{recipe.name}</h2>
                  <p className="line-clamp-2">{recipe.tip}</p>
                  <div className='mb-2'>
                    <div className="badge badge-ghost">{recipe.type}</div>
                    <div className="badge badge-outline">{recipe.how}</div>
                  </div>
                </div>
                {/* <figure>{recipe.image && <img src={recipe.image} alt="Recipe" style={{ width: '400px', height: '300px' }} className="w-full h-auto"/>}</figure> */}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecommendedRecipe;
