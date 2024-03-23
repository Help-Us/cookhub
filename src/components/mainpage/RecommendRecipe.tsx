import React from 'react';
import { Recipe } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import defaultImage from "@/assets/images/Cookhub_Logo.png";

interface RecommendedRecipesProps {
  recipes: Recipe[];
}

const RecommendedRecipe: React.FC<RecommendedRecipesProps> = ({ recipes }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = defaultImage.src; // e.target 대신 e.currentTarget 사용 권장
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 w-1200 mb-5">
          {recipes.map((recipe) => (
            <Link key={recipe.id} href={`/detail/${recipe.id}`} passHref>
              <div className="card w-96 bg-base-100 shadow-xl cursor-pointer border border-[color:var(--borderColor2)] transition duration-300 ease-in-out hover:border-[color:var(--borderColor1)] hover:shadow-2xl">
                <div className="card-body">
                  <h1 className="text-[color:var(--titleColor)] text-xl font-bold">{recipe.name}</h1>
                  <p className="line-clamp-2 text-[color:var(--contentColor)]">
                    {recipe.tip ? recipe.tip : "제공된 정보가 없습니다"}
                  </p>
                  <div className='mb-2'>
                    {recipe.type && <div className="badge badge-ghost">{recipe.type}</div>}
                    {recipe.how && <div className="badge badge-outline">{recipe.how}</div>}
                  </div>
                </div>
                <figure>
                {/* 이미지가 없거나 로드에 실패하면 defaultImage를 사용 */}
                {recipe.image ? (
                  <img src={recipe.image} alt="Recipe" style={{ width: '400px', height: '300px' }} className="w-full h-auto" onError={handleImageError}/>
                ) : (
                  <Image src={defaultImage} alt="Default" style={{ width: '400px', height: '300px' }} className="w-full h-auto"/>
                )}
              </figure>
              </div>
            </Link>
          ))}
        </div>
    </div>
  );
}

export default RecommendedRecipe;
