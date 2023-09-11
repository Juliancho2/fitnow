import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DataUser, setRoutine } from '../slice/userSlice';

interface RootState {
    user: DataUser
}


const useDrag = (dayActive:string) => {
    const userState = useSelector((state: RootState) => state.user);
    const { routine } = userState;
    const dispatch = useDispatch();

    const startDrag = (evt: React.DragEvent<HTMLDivElement>, item: { id: string }) => {
        evt.dataTransfer.setData('itemID', item.id);
    };
    const draggingOver = (evt: React.DragEvent<HTMLDivElement>) => {
        evt.preventDefault();
    };

    const onDrop = (evt: React.DragEvent<HTMLDivElement>) => {
        evt.preventDefault();
        const itemID = evt.dataTransfer.getData('itemID');

        const updatedRoutine = routine.map((routineItem) => {
            if (routineItem.day === dayActive) {
                const updatedExerciseItem = routineItem.exersiceItem.map((item) => {
                    if (item.id === itemID) {
                        return { ...item, complete: !item.complete };
                    }
                    return item;
                });
                return { ...routineItem, exersiceItem: updatedExerciseItem };
            }
            return routineItem;
        });

        dispatch(setRoutine(updatedRoutine));
    };

    return {startDrag,draggingOver,onDrop}
}

export default useDrag
