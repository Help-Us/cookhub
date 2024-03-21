import React, { useState, useEffect } from 'react';
import { Recipe } from '@/types';
import Link from 'next/link';

interface ClippingRecipesProps {
  recipes: Recipe[];
}

const ClippingRecipe: React.FC<ClippingRecipesProps> = ({ recipes }) => {
  // 현재 보여지는 레시피의 인덱스를 관리합니다.
  const [currentIndex, setCurrentIndex] = useState(0);

  // 자동으로 슬라이드를 넘기는 로직입니다.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % recipes.length);
    }, 3000); // 3초마다 실행

    // 컴포넌트가 언마운트될 때 인터벌을 정리합니다.
    return () => clearInterval(interval);
  }, [recipes.length]);

  return (
    <div className="flex justify-center items-center w-1200 mb-5 overflow-hidden">
      <div className="flex w-full">
        {recipes.map((recipe, index) => (
          <Link key={recipe.id} href={`/detail/${recipe.id}`} passHref>
            <div
              className={`card w-96 bg-base-100 shadow-xl cursor-pointer border border-[color:var(--borderColor2)] transition-transform duration-500 ease-in-out ${
                index === currentIndex ? 'scale-100' : 'scale-0'
              }`}
            >
              <div className="card-body">
                <h1 className="text-[color:var(--titleColor)] text-xl">{recipe.name}</h1>
                <p className="line-clamp-2 text-[color:var(--contentColor)]">{recipe.tip}</p>
                <div className='mb-2'>
                  <div className="badge badge-ghost">{recipe.type}</div>
                  <div className="badge badge-outline">{recipe.how}</div>
                </div>
              </div>
              <figure>
                {recipe.image && (
                  <img src={recipe.image} alt="Recipe" style={{ width: '400px', height: '300px' }} className="w-full h-auto"/>
                )}
              </figure>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ClippingRecipe;
