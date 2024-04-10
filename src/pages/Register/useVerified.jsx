// 참고자료
// https://www.youtube.com/watch?v=pw58zxqxHOk&list=PLqFvlDFoiZ-0ixIS8D4JTHRuVy_rkfROY&index=5

import pb from '@/api/pocketbase';
import { useState, useEffect } from 'react';

export default function useVerified() {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    async function checkVerified() {
      const id = pb.authStore.model.id;

      const userData = await pb.collection('users').getOne(id);
      setIsVerified(userData.verified);
    }

    const isLoggedIn = pb.authStore.isValid;
    if (isLoggedIn) {
      checkVerified();
    }
  }, []);

  async function requestVerification(email) {
    // const email = pb.authStore.model.email;
    const response = await pb.collection('users').requestVerification(email);
    if (response) {
      alert('인증메일이 보내졌습니다. 메일함을 확인해주세요.');
    }
  }

  return { isVerified, requestVerification };
}
