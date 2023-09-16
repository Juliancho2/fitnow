import React, { useEffect, useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import { useDispatch } from 'react-redux';
import { setClose } from '../redux/slice/modalSlice';

type Props={
    mode:string
}

const ModalAuth = ({mode}:Props) => {
  const [isLoggin, setIsLoggin] = useState(false);
  const dispatch=useDispatch()

  useEffect(() => {
    if (mode === 'login') {
      setIsLoggin(true);
    } else if (mode === 'signup') {
      setIsLoggin(false);
    }

    return ()=>{
      dispatch(setClose())
    }
  }, []);

  return (
    <div className="fixed  top-0 left-0 flex justify-center items-center w-full h-full z-40 bg-black bg-opacity-50">
      {isLoggin ? <Login setIsLoggin={setIsLoggin} /> : <SignUp setIsLoggin={setIsLoggin} />}
    </div>
  );
};

export default ModalAuth;
