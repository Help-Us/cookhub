import React from 'react';
import { Recipe } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import defaultImage from "@/assets/images/Cookhub_Logo.png";

interface RecommendedRecipesProps {
  recipes: Recipe[];
}

const RecommendedRecipe: React.FC<RecommendedRecipesProps> = ({ recipes }) => {
  const renderBadgeByType = (type: string) => {
    switch (type) {
      case '반찬':
        return <div className="badge badge-ghost">{type}</div>;
      case '국&찌개':
        return <div className="badge badge-secondary">{type}</div>;
      case '후식':
        return <div className="badge badge-primary">{type}</div>;
      case '일품':
        return <div className="badge badge-accent">{type}</div>;
      case '밥':
        return <div className="badge badge-neutral">{type}</div>;
      case '기타':
        return <div className="badge">{type}</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 w-1200 mb-5">
        {recipes.map((recipe) => (
          <Link key={recipe.id} href={`/detail/${recipe.id}`} passHref>
            <div className="card w-96 h-64 bg-base-100 shadow-xl cursor-pointer transition duration-500 ease-in-out hover:shadow-2xl hover:bg-gray-800 overflow-hidden rounded-lg relative transform hover:-translate-y-1 hover:scale-102">
              <div className="relative w-full h-full">
                <Image
                  src={recipe.image || defaultImage.src} // 이미지 URL이 없는 경우 기본 이미지
                  alt={recipe.name}
                  layout="fill"
                  objectFit="cover"
                  onError={(e) => {
                    e.currentTarget.src = defaultImage.src; // 로딩 실패 시 기본 이미지
                  }}
                />
              </div>
              <div className="card-body bg-opacity-30 bg-black text-white absolute bottom-0 w-full p-4 transition duration-500 ease-in-out hover:bg-opacity-40">
                <h1 className="text-xl font-bold mb-2">{recipe.name}</h1>
                <div className='mb-1'>
                  {recipe.type && renderBadgeByType(recipe.type)}
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
