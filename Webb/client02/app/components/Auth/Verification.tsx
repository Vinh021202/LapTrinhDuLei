import { Style } from '@/app/style/stylelogin';
import { useActivationMutation } from '@/redux/features/auth/authApi';
import React, { FC, useEffect, useRef, useState } from 'react'
import {toast} from 'react-hot-toast';
import { VscWorkspaceTrusted} from 'react-icons/vsc';
import { useSelector } from 'react-redux';

type Props = {
  setRoute: (route:string) => void;
}

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification:FC<Props> = ({setRoute}) => {
  const {token} = useSelector((state:any) => state.auth);
  const [activation,{isSuccess,error}] = useActivationMutation();
  const [invalidError, setInvaliError] = useState<boolean>(false);

  useEffect(() =>{
    if(isSuccess){
      toast.success("Account activated successfully");
      setRoute("Login");
    };
    if(error){
      if("data" in error){
        const errorData = error as any;
        toast.error(errorData.data.message);
        setInvaliError(true);
      }else{
        console.log('An error occured',error);
      }
    }
  },[isSuccess, error]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const verifictionHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if(verificationNumber.length !== 4){
       setInvaliError(true);
       return;
    }
    await activation({
      activation_token: token,
      activation_code: verificationNumber,
    });
  };

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0:"",
    1:"",
    2:"",
    3:"",
  });

  const handleInputChange = (index:number, value:string) => {
    setInvaliError(false);
    const newVerifyNumber = {...verifyNumber, [index]:value}
    setVerifyNumber(newVerifyNumber);

    if(value === "" && index > 0){
      inputRefs[index -1 ].current?.focus();
    }else if(value.length === 1 && index <3) {
      inputRefs[index + 1].current?.focus();
    }
  }
  return (
    <div>
      <h1 className={`${Style.title}`}>
          Xác minh tài khoản của bạn
      </h1>
      <br />
      <div className="w-full flex items-center justify-center mt-2">
          <div className="w-[80px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center">
              <VscWorkspaceTrusted size={40} /> 
          </div>
          </div>
          <br />
          <br />
          <div className="110px:w-[70%] m-auto flex items-center justify-around" >
              {Object.keys(verifyNumber).map((key,index) => (
                <input type="number"
                      key={key}
                      ref={inputRefs[index]}
                      className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins text-center 
                        ${invalidError ? "shake border-red-500": "dark:border-white border-[#0000004a]" }` }
                      placeholder=''
                      maxLength={1}
                      value={verifyNumber[key as keyof VerifyNumber]}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                 />
              ))}

          </div>
      <br />
          <br />
          <div className="w-full flex justify-center">
              <button className={`${Style.button}`} onClick={verifictionHandler}> 
                Xác minh OTP
              </button>
          </div>
          <br />
          <h5 className='text-center pt-4 font-Poppins text-[14px] text-black dark:text-white'>
            Quay lại để đăng nhập? {""}
              <span className="text-[#2190ff] pl-1 cursor-pointer" onClick={() => setRoute("Login")}>
              Đăng nhập
              </span>
          </h5>
    </div>
  )
}

export default Verification
