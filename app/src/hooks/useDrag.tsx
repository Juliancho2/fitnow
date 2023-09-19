import { useDispatch, useSelector } from 'react-redux'
import { setRoutine } from '../redux/slice/userSlice'
import { DataFromApiExercise, RootState } from '../interface'
import { DropResult } from '@hello-pangea/dnd'

const useDrag = (dayActive:string) => {
  const dispatch = useDispatch()
  const { routine } = useSelector((state: RootState) => state.user)

  const reorder = (list:DataFromApiExercise[], startIndex:number, endIndex:number) => {
    const result = [...list]
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const handleDrapAndDrop = (result:DropResult) => {
    if (!result.destination) return
    if (result.source.index === result.destination.index && result.source.droppableId ===
            result.destination.droppableId
    ) return

    const updatedRoutine = routine.map((routineItem) => {
      if (routineItem.day === dayActive && result.source.droppableId !== result.destination?.droppableId) {
        const updatedExerciseItem = routineItem.exersiceItem.map((item) => {
          if (item.id === result.draggableId) {
            return { ...item, complete: !item.complete }
          }
          return item
        })
        return { ...routineItem, exersiceItem: updatedExerciseItem }
      }
      return routineItem
    })

    const itemIndex = updatedRoutine.findIndex(item => item.day === dayActive)
    const res = reorder(updatedRoutine[itemIndex].exersiceItem, result.source.index, result.destination.index)
    const modifiqueIndex = { ...updatedRoutine[itemIndex], exersiceItem: res }
    const newRoutine = updatedRoutine.map(item => {
      if (item.id === modifiqueIndex.id) return modifiqueIndex
      return item
    })
    dispatch(setRoutine(newRoutine))
  }

  return { handleDrapAndDrop }
}

export default useDrag
