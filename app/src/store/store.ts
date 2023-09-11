import { configureStore } from "@reduxjs/toolkit";
import bmiSlice from "../slice/bmiCalculator";
import dataExerciseSlice from "../slice/dataExerciseSlice";
import userSlice from "../slice/userSlice";
import modalSlice from "../slice/modalSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        bmi: bmiSlice,
        dataApi: dataExerciseSlice,
        modal:modalSlice
    }
});

export type AppDispatch = typeof store.dispatch

