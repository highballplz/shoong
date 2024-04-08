import { useState, useRef } from 'react';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import TermsCheckbox from './TermsCheckbox';
import pb from '../../api/pocketbase';
import { useLoaderData, useNavigate } from 'react-router-dom';
import debounce from '@/utils/debounce';
import useValidation from './useValidation';
import useCheckbox from './useCheckbox';
// import express from 'express';
// import phone from 'phone';
// import Twilio from './Twilio';

// export default function Register() {
//   return (
//     <div>
//       hello<br></br>hello<br></br>hello<br></br>hello<br></br>hello<br></br>
//       hello<br></br>hello<br></br>
//     </div>
//   );
// }

export default function Register() {
  /* -------------------------------------------------------------------------- */
  /*                                    커스텀훅                                    */
  /* -------------------------------------------------------------------------- */

  const users = useLoaderData();
  const userEmails = users.map((user) => user.email);

  const [
    formData,
    isValidatedList,
    isOnceList,
    isEmailUnique,
    handleInputChange,
  ] = useValidation(userEmails);

  const [
    checkList,
    checkedList,
    handleCheckboxChange,
    agreeAllButtonStyle,
    handleAgreeAll,
  ] = useCheckbox();

  /* -------------------------------------------------------------------------- */
  /*                                   회원가입 버튼                                  */
  /* -------------------------------------------------------------------------- */

  const [isRegisterButtonDisabled, setIsRegisterButtonDisabled] =
    useState(false);

  //회원가입 버튼 활성화
  function activateRegisterButton() {
    let filled = false;
    filled = Object.values(formData).reduce((prev, cur) => !!prev && !!cur);

    filled &&
    // isEmailCheckButtonDisabled &&
    agreeAllButtonStyle.bg === 'bg-primary'
      ? setIsRegisterButtonDisabled(false)
      : setIsRegisterButtonDisabled(true);
  }

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

  /* -------------------------------------------------------------------------- */
  /*                                     마크업                                    */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="flex flex-col items-center justify-center bg-white py-35pxr">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-6"
      >
        <div className="name flex flex-col">
          <Input
            name="name"
            defaultValue={formData.name}
            onChange={debounce(handleInputChange)}
            type="text"
            placeholder="김슝 / Shoong Kim"
            customClassNames="h-9 mt-1"
            bgClassName="bg-gray-100"
            isLabeled
            label="이름"
            mt={16}
          />

          <p //name 인풋 박스 비워져있는데 한 번이라도 입력한 적 있으면 nameFillMessage 보여주기
            className="mt-1 pl-2 text-xs text-red-500"
            style={{
              display:
                formData.name === '' && isOnceList.current.name ? '' : 'none',
            }}
          >
            이름을 입력해주세요
          </p>
          <p //name 인풋 박스 채워졌는데 이름 형식 안 지켰으면 nameValidationMessage 보여주기
            className="mt-1 pl-2 text-xs text-red-500"
            style={{
              display:
                formData.name !== '' && !isValidatedList.name ? '' : 'none',
            }}
          >
            이름 형식으로 입력해주세요
          </p>
        </div>

        <div className="email flex flex-col">
          <Input
            name="email"
            defaultValue={formData.email}
            onChange={debounce(handleInputChange)}
            type="text"
            placeholder="shoong@gmail.com"
            customClassNames="h-9 mt-1"
            bgClassName="bg-gray-100"
            isLabeled
            label="이메일"
          />

          <p //email 인풋 박스 비워져있는데 한 번이라도 입력한 적 있으면 emailFillMessage 보여주기
            className="mt-1 pl-2 text-xs text-red-500"
            style={{
              display:
                formData.email === '' && isOnceList.current.email ? '' : 'none',
            }}
          >
            이메일을 입력해주세요
          </p>
          <p //email 인풋 박스 채워졌는데 이메일 형식 안 지켰으면 emailValidationMessage 보여주기
            className="mt-1 pl-2 text-xs text-red-500"
            style={{
              display:
                formData.email !== '' && !isValidatedList.email ? '' : 'none',
            }}
          >
            이메일 형식으로 입력해주세요
          </p>
          <p //email 이메일 형식 지켜서 잘 입력했는데 이미 가입된 이메일이면 emailValidationMessage 보여주기
            className="mt-1 pl-2 text-xs text-red-500"
            style={{
              display: isValidatedList.email && !isEmailUnique ? '' : 'none',
            }}
          >
            이미 가입된 이메일입니다.
          </p>

          <Button type="button" isSmall customClassNames="self-end mt-2">
            인증하기
          </Button>
        </div>

        <div className="pwd flex flex-col">
          <Input
            name="pwd"
            defaultValue={formData.pwd}
            onChange={debounce(handleInputChange)}
            type="password"
            customClassNames="h-9 mt-1"
            placeholder="비밀번호 입력"
            bgClassName="bg-gray-100"
            isLabeled
            label="비밀번호"
          />

          <p //pwd 길이 10자 안 되는데 한 번이라도 입력한 적 있으면 pwdFillMessage 보여주기
            className="mt-1 pl-2 text-xs text-red-500"
            style={{
              display:
                formData.pwd.length < 10 && isOnceList.current.pwd
                  ? ''
                  : 'none',
            }}
          >
            최소 10자 이상 입력해주세요.
          </p>
          <p //pwd 길이 10자 넘었는데 패스워드 형식 안 지켰으면 pwdValidationMessage 보여주기
            className="mt-1 pl-2 text-xs text-red-500"
            style={{
              display:
                formData.pwd.length >= 10 && !isValidatedList.pwd ? '' : 'none',
            }}
          >
            영문/숫자/특수문자(공백 제외)만 허용, 2개 이상 조합
          </p>
          <Input
            name="pwdConfirm"
            defaultValue={formData.pwdConfirm}
            onChange={debounce(handleInputChange)}
            type="password"
            placeholder="비밀번호 재확인"
            customClassNames="h-9 mt-2"
            bgClassName="bg-gray-100"
          />

          <p //pwdConfirm 인풋 박스 비워져있는데 한 번이라도 입력한 적 있으면 pwdConfirmFillMessage 보여주기
            className="mt-1 pl-2 text-xs text-red-500"
            style={{
              display:
                formData.pwdConfirm === '' && isOnceList.current.pwdConfirm
                  ? ''
                  : 'none',
            }}
          >
            비밀번호를 한 번 더 입력해주세요.
          </p>
          <p //pwdConfirm 인풋 박스 채워졌는데 pwd랑 안 똑같으면 pwdConfirmValidationMessage 보여주기
            className="mt-1 pl-2 text-xs text-red-500"
            style={{
              display:
                formData.pwdConfirm !== '' && !isValidatedList.pwdConfirm
                  ? ''
                  : 'none',
            }}
          >
            동일한 비밀번호를 입력해주세요.
          </p>
        </div>

        <div className="phone flex flex-col">
          <Input
            name="phone"
            value={formData.phone}
            //debounce 적용하려면 value 대신 defaultValue 써야 되는데 그렇게 되면 숫자만 입력되게 만들지를 못함..
            onChange={handleInputChange}
            type="text"
            placeholder="01012345678"
            customClassNames="h-9 mt-1"
            bgClassName="bg-gray-100"
            isLabeled
            label="휴대폰 번호"
            maxLength="11"
          />

          <p //phone 인풋 박스 비워져있는데 한 번이라도 입력한 적 있으면 phoneFillMessage 보여주기
            className="mt-1 pl-2 text-xs text-red-500"
            style={{
              display:
                formData.phone === '' && isOnceList.current.phone ? '' : 'none',
            }}
          >
            휴대폰번호를 입력해주세요.
          </p>

          <Button
            type="button"
            isSmall
            customClassNames="self-end mt-2 w-96pxr"
          >
            인증번호 받기
          </Button>
        </div>

        <Input
          name="birth"
          defaultValue={formData.birth}
          onChange={debounce(handleInputChange)}
          type="text"
          placeholder="생년월일"
          customClassNames="h-9 mt-1"
          bgClassName="bg-gray-100"
          isLabeled
          label="생년월일"
        />

        <div className="agree mb-4 flex w-full flex-col">
          <div className="self-start text-xs font-extrabold text-neutral-700">
            이용 약관 동의
          </div>

          <Button
            type="button"
            onClick={handleAgreeAll}
            bgClassName={agreeAllButtonStyle.bg}
            textColorClassName={agreeAllButtonStyle.text}
            customClassNames="h-9 mt-1"
          >
            네, 모두 동의합니다.
          </Button>

          <div className="mt-3 flex flex-col gap-3 px-2">
            <TermsCheckbox
              name={checkList[0]}
              checkedList={checkedList}
              onChange={handleCheckboxChange}
            >
              [필수] 만 14세 이상입니다.
            </TermsCheckbox>

            <TermsCheckbox
              name={checkList[1]}
              checkedList={checkedList}
              onChange={handleCheckboxChange}
            >
              [필수] 서비스 이용약관 동의 {'>'}
            </TermsCheckbox>

            <TermsCheckbox
              name={checkList[2]}
              checkedList={checkedList}
              onChange={handleCheckboxChange}
            >
              [필수] 개인정보 처리방침 동의 {'>'}
            </TermsCheckbox>

            <TermsCheckbox
              name={checkList[3]}
              checkedList={checkedList}
              onChange={handleCheckboxChange}
            >
              [선택] 마케팅 수신 동의
            </TermsCheckbox>
          </div>
        </div>

        <Button type="submit" isDisabled={isRegisterButtonDisabled}>
          가입하기
        </Button>
      </form>
    </div>
  );
}
