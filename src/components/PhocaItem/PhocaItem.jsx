import React from 'react';
import PhocaImg from './PhocaImg';
import ArtistInfo from './ArtistInfo';
import PhocaTitle from './PhocaTitle';
import { Link } from 'react-router-dom';
// import { Link, redirect, useOutletContext } from 'react-router-dom';
import ArtistLogo from './ArtistLogo';
import PhocaLikeCount from './PhocaLikeCount';

import pb from '@/api/pocketbase';
import { useState, useEffect } from 'react';

/**
 * @param {{
 *   title: string,
 *   altText: string,
 *   likes: number,
 *   imgUrl : string
 * }} props
 * @returns {JSX.Element}
 */

export default function PhocaItem({ title, altText, likes, imgUrl }) {
  return (
    <li
      className="list-none m-0 p-0 w-44 h-[353px] relative"
      style={{ width: '11rem', height: '22rem' }}
    >
      <a
        to="/"
        aria-label={`${title} 카드 디테일 페이지로 이동`}
        className="flex flex-col"
      >
        <PhocaImg />
        <div className="flex gap-2">
          <ArtistLogo imgUrl={imgUrl} altText={altText} />
          <ArtistInfo />
        </div>
        <div className="flex flex-col items-start">
          <PhocaTitle title={title} />
          <PhocaLikeCount likes={likes} />
        </div>
      </a>
    </li>
  );
}
