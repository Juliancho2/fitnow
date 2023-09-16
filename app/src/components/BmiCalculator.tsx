import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bmiCalculator, ParamsBmiCalculator } from '../redux/thunk';
import SpinnerComponent from './SpinnerComponent';
import { RootState } from '../interface';
import { AppDispatch } from '../redux/store/store';
import { setDataBmiReset } from '../redux/slice/bmiCalculator';
import BtnAction from './BtnAction';

type Props={
  color:string
}

const BmiCalculator = ({color}:Props) => {
  const [dataCalculator, setDataCalculator] = useState<ParamsBmiCalculator>({
    height: '',
    weight: '',
  });
  const dispatch = useDispatch<AppDispatch>();
  const { bmi, loading, error } = useSelector((state: RootState) => state.bmi);

  useEffect(()=>{
    return ()=>{
      dispatch(setDataBmiReset())
    }
    
  },[])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setDataCalculator({
      ...dataCalculator,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(bmiCalculator(dataCalculator));
    setDataCalculator({
      height: '',
      weight: '',
    })
  };

  return (
    <div className={`flex flex-col justify-center items-center w-full min-h-[50vh] p-20 relative ${color}`}>
      <div className="flex flex-col justify-center items-center w-full max-w-[700px] min-h-[300px] gap-2 z-10">
        <div className="w-full max-w-[400px] mb-20">
          <h3 className="text-4xl font-bold text-[#1F2937] text-center mb-10">
            (BMI) Calculator
          </h3>
          <p className="text-2xl text-[#4d4d4d] text-center">
            To calculate the Body Mass Index of an individual based on their height and weight.
          </p>
        </div>
        <form className="flex flex-col items-center gap-4 w-full" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col gap-10 flex-1 min-h-[85px] w-full max-w-[400px]">
            <input
              required
              onChange={handleChange}
              type="number"
              name="height"
              value={dataCalculator.height}
              placeholder="Height (Cm)"
              className="inline-block w-full h-[35px] border border-gray-300 outline-none p-3 rounded-md"
            />
            <input
              required
              onChange={handleChange}
              type="number"
              name="weight"
              value={dataCalculator.weight}
              placeholder="Weight (Kg)"
              className="inline-block w-full [h-35px] outline-none  p-3 border border-gray-300 rounded-md"
            />
          </div>
          <BtnAction type='submit'>Calculate</BtnAction>
        </form>
        {loading && <SpinnerComponent styles='border-4 border-blue-400 animate-spin w-6 h-8 rounded-full mx-auto'/>}
        {!error && !loading && bmi && (
          <div className="w-full flex flex-col items-center  mt-10 bg-[#f3f3f3 ] p-15">
            <h3 className="text-4xl font-normal text-[#ec9737d1] mb-10">Your BMI is:</h3>
            <p className="text-3xl">{bmi}</p>
            <div className="mt-20">
              <img src="https://surgisculpt.com/wp-content/uploads/2022/05/BMI-chart.png" alt="" className="w-[500px]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BmiCalculator;
