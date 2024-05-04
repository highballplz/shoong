import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function useAnimation(currentPageNumber) {
  useGSAP(() => {
    gsap.to(`form`, {
      x: -300 * currentPageNumber, //w-265 + gap-35
    });
  }, [currentPageNumber]);
}
