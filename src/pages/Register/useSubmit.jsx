import { useEffect, useState } from 'react';
import pb from '../../api/pocketbase';

export default function useSubmit(
  formData,
  isValidatedList,
  isEmailUnique,
  checkList,
  checkedList
) {
  /* -------------------------------------------------------------------------- */
  /*                  유효성 검사 등을 다 통과해야 회원가입 버튼 활성화                    */
  /* -------------------------------------------------------------------------- */

  const [isRegisterButtonDisabled, setIsRegisterButtonDisabled] =
    useState(true);

  const isAllFilled = Object.values(formData).reduce((acc, cur) => acc && cur);
  const isAllValidated = Object.values(isValidatedList).reduce(
    (acc, cur) => acc && cur
  );

  const requiredCheckList = checkList.slice(0, 3);
  const isRequiredChecked = requiredCheckList.reduce(
    (acc, cur) => acc && checkedList.includes(cur),
    true
  );

  //setIsRegisterButtonDisabled를 useEffect에 안 넣고 그냥 상태 변경해버리면 무한 루프에 빠짐.
  useEffect(() => {
    if (isAllFilled && isAllValidated && isEmailUnique && isRequiredChecked) {
      setIsRegisterButtonDisabled(false);
    } else {
      setIsRegisterButtonDisabled(true);
    }
  }, [isAllFilled, isAllValidated, isEmailUnique, isRequiredChecked]);

  /* -------------------------------------------------------------------------- */
  /*                               handleSubmit                                 */
  /* -------------------------------------------------------------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: formData.email,
      emailVisibility: true,
      password: formData.pwd,
      passwordConfirm: formData.pwdConfirm,
      birth: formData.birth,
      phoneNumber: formData.phone,
      name: formData.name,
      collectBook: ['9mbahw8twzvbrwr'],
    };

    try {
      await pb.collection('users').create(data);
    } catch (error) {
      alert('입력사항을 다시 확인해주세요.');
    }
  };

  return [isRegisterButtonDisabled, handleSubmit];
}
