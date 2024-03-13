import { useState } from 'react';
import PhocaItem from '../PhocaItem/PhocaItem';
import { useRef } from 'react';
import { useEffect } from 'react';
import SortingBar from '../SortingBar/SortingBar';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

/**
 * @param {{
 *  phocaImgSrc?: string,
 *  logoImgSrc?: string,
 *  groupName?: string,
 *  memberName?: string,
 *  imgClass?: string,
 *  infoClass?: string,
 *  groupClass?: string,
 *  memberClass?: string,
 *  title?: string,
 *  titleClass?: string,
 *  likeCount?: number,
 *  linkClass?: string,
 *  logoImgClass?: string,
 *  biasData?: Array,
 * }} props
 * @returns
 */

export default function PhocaContainerBias({
  phocaImgSrc,
  logoImgSrc,
  groupName,
  memberName,
  title,
  likeCount,
  imgClass = 'mb-2 w-150pxr h-215pxr rounded-xl relative',
  infoClass = 'flex flex-col items-start mb-1',
  groupClass = 'text-sb01 font-sb01 text-gray500',
  memberClass = 'text-sb01 font-sb01 text-contentSecondary',
  titleClass = 'w-150pxr overflow-hidden whitespace-nowrap truncate text-m03 font-m03 text-gray600 text-left ',
  linkClass = 'flex flex-col items-center justify-center cursor-pointer hover:scale-95 transition-transform duration-300 w-158pxr h-312pxr bg-gray-100 rounded-xl',
  logoImgClass = 'w-8 h-8 rounded-full object-cover mt-0.5',
  biasData,
}) {
  const moreRef = useRef(null);
  const [phoca, SetPhoca] = useState(biasData);
  const [phocaNumber, setPhocaNumber] = useState(12);
  const [filter, setFilter] = useState('전체');

  const handleMore = () => {
    if (phocaNumber >= phoca.length) {
      moreRef.current.style.display = 'none';
      toast.error('더 이상 없습니다');
    } else toast.success('더 보기');
    setPhocaNumber((num) => num + 12);
  };

  useEffect(() => {
    SetPhoca(biasData);
    setFilter('최신순');
    setPhocaNumber(12);
    moreRef.current.style.display = 'block';
  }, [biasData]);

  return (
    <>
      <SortingBar
        phoca={phoca}
        SetPhoca={SetPhoca}
        filter={filter}
        setFilter={setFilter}
        biasData={biasData}
      />

      <div className="mb-7 mt-7 flex justify-center">
        <ul className="col-gap-8 grid h-400pxr grid-cols-2 gap-4 overflow-y-scroll md:grid-cols-3 lg:grid-cols-6">
          {phoca.map((group, groupIndex) => {
            if (groupIndex < phocaNumber) {
              return (
                <li key={group.id} className="relative m-0 w-44 list-none p-0">
                  <PhocaItem
                    phocaImgSrc={`https://shoong.pockethost.io/api/files/photoCards/${group.id}/${group.cardImg}`}
                    logoImgSrc={`https://shoong.pockethost.io/api/files/photoCards/${group.id}/${group.logoImage}`}
                    groupName={group.groupName}
                    memberName={group.memberName}
                    title={group.title}
                    likeCount={group.likeCount}
                    titleClass={titleClass}
                    imgClass={imgClass}
                    infoClass={infoClass}
                    groupClass={groupClass}
                    memberClass={memberClass}
                    linkClass={linkClass}
                    logoImgClass={logoImgClass}
                    phocaId={group.id}
                  />
                </li>
              );
            }
          })}
        </ul>
      </div>

      <Toaster />

      <button
        ref={moreRef}
        onClick={handleMore}
        className=" m-auto mb-5 rounded-full bg-primary px-4 py-1 duration-200 hover:scale-105 hover:bg-purple-400"
      >
        더 보기
      </button>
    </>
  );
}
