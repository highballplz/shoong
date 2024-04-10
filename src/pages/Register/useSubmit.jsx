import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import pb from '../../api/pocketbase';
import useCheckbox from './useCheckbox';
import useValidation from './useValidation';

export default function useSubmit(
  formData,
  isValidatedList,
  isEmailUnique,
  checkList,
  checkedList
) {
  /* -------------------------------------------------------------------------- */
  /*                                   회원가입 버튼                                  */
  /* -------------------------------------------------------------------------- */

  const [isRegisterButtonDisabled, setIsRegisterButtonDisabled] =
    useState(true);

  const isAllFilled = Object.values({ ...formData }).reduce(
    (acc, cur) => acc && cur
  );
  const isAllValidated = Object.values({ ...isValidatedList }).reduce(
    (acc, cur) => acc && cur
  );

  const requiredCheckList = [...checkList].slice(0, 3);
  const isRequiredChecked = requiredCheckList.reduce(
    (acc, cur) => acc && checkedList.includes(cur),
    true
  );

  console.log(isValidatedList);

  useEffect(() => {
    if (isAllFilled && isAllValidated && isEmailUnique && isRequiredChecked) {
      setIsRegisterButtonDisabled(false);
    } else {
      setIsRegisterButtonDisabled(true);
    }
    console.log('++++++++++++++');
  }, [isAllFilled, isAllValidated, isEmailUnique, isRequiredChecked]);

  /* -------------------------------------------------------------------------- */
  /*                                     제출                                     */
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
