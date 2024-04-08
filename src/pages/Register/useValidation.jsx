import { useState, useRef } from 'react';
import { useLoaderData } from 'react-router-dom';
import { nameReg, emailReg, pwdReg } from './RegularExpressions';

export default function useValidation(userEmails) {
  /* -------------------------------------------------------------------------- */
  /*                    formData, isValidatedList, isOnceList                   */
  /* -------------------------------------------------------------------------- */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pwd: '',
    pwdConfirm: '',
    phone: '',
    birth: '',
  });

  const [isValidatedList, setIsValidatedList] = useState({
    name: false,
    email: false,
    pwd: false,
    pwdConfirm: false,
  });

  const isOnceList = useRef({
    name: false,
    email: false,
    pwd: false,
    pwdConfirm: false,
    phone: false,
    birth: false, //안 씀
  });

  const [isEmailUnique, setIsEmailUnique] = useState(true);

  /* -------------------------------------------------------------------------- */
  /*                              handleInputChange                             */
  /* -------------------------------------------------------------------------- */

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((formData) => ({
      ...formData,
      [name]:
        name !== 'phone'
          ? value
          : value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'),
    }));

    isOnceList.current[name] = true; //적어도 한 번은 입력 시도되었음을 기억.

    if (name === 'name') {
      isValidatedList.name = nameReg(value); //value가 이름 형식이면 isValidatedList.name을 true로 설정.
    } else if (name === 'email') {
      isValidatedList.email = emailReg(value); //value가 이메일 형식이면 isValidatedList.email을 true로 설정.
      setIsEmailUnique(true);
      if (userEmails.includes(value)) setIsEmailUnique(false); //formData.email가 아니라 value로 검사해야 함.
    } else if (name === 'pwd') {
      isValidatedList[name] = pwdReg(value); //value가 적합한 패스워드 형식이면 isValidatedList.pwd을 true로 설정.
      isValidatedList.pwdConfirm = value === formData.pwdConfirm; //value가 pwdConfirm과 같은면 isValidatedList.pwdConfrim을 true로 설정.
    } else if (name === 'pwdConfirm') {
      isValidatedList[name] = value === formData.pwd; //value가 pwd와 같은면 isValidatedList.pwdConfrim을 true로 설정.
    }

    // activateRegisterButton();
  };

  /* -------------------------------------------------------------------------- */
  /*                              handleEmailCheck                              */
  /* -------------------------------------------------------------------------- */

  return [
    formData,
    isValidatedList,
    isOnceList,
    isEmailUnique,
    handleInputChange,
  ];
}
