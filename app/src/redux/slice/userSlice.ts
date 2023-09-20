import { createSlice } from '@reduxjs/toolkit'
import { addRoutine, loginUser, registerUser } from '../thunk'
import { DataUser } from '../../interface'

const initialState: DataUser = {
  username: '',
  isLogged: null,
  token: '',
  isLoading: false,
  errorMessage: { name: '', isError: false },
  routine: []
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isLogged = true
      state.username = action.payload.username
      state.token = action.payload.token
      state.routine = action.payload.routine
      localStorage.setItem('loggedAppUser', JSON.stringify(action.payload))
    },
    setLogged: (state, action) => {
      state.isLogged = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },

    setError: (state) => {
      state.errorMessage.name = ''
      state.errorMessage.isError = false
    },
    setRoutine: (state, action) => {
      state.routine = action.payload
    },
    logOut: (state) => {
      window.localStorage.removeItem('loggedAppUser')
      state.errorMessage = { name: '', isError: false }
      state.username = ''
      state.token = ''
      state.routine = []
      state.isLogged = null
    },
    addExerciseToRoutine: (state, action) => {
      const item = state.routine.findIndex((item) => (item.id === action.payload.id))
      let updatedRoutine
      // verifica no existe el dia en la rutina
      if (item === -1) {
        updatedRoutine = [...state.routine, action.payload]
      } else {
        // Si existe busca el dia que se va agregar el nuevo ejercio y lo agrega
        updatedRoutine = [...state.routine].map((item) => {
          if (item.day === action.payload.day) return action.payload
          return item
        })
      }

      const user = window.localStorage.getItem('loggedAppUser')
      if (user) {
        const newInfo = JSON.parse(user)
        const newArray = {
          ...newInfo,
          routine: updatedRoutine
        }
        window.localStorage.setItem('loggedAppUser', JSON.stringify(newArray))
      }

      state.routine = updatedRoutine
    },
    deleteExerciseFromState: (state, action) => {
      const updatedRoutine = state.routine.map(item => {
        if (item.day === action.payload.name) {
          // Si la condicion se cumple, filtramos item.exersiceItem y lo asignamos a item.exersiceItem
          item.exersiceItem = item.exersiceItem.filter(exercise => exercise.id !== action.payload.id)
        }
        return item // Devolvemos el elemento modificado o sin cambios
      })

      const user = window.localStorage.getItem('loggedAppUser')
      if (user) {
        const newInfo = JSON.parse(user)
        const newArray = {
          ...newInfo,
          routine: updatedRoutine
        }
        window.localStorage.setItem('loggedAppUser', JSON.stringify(newArray))
      }
      state.routine = updatedRoutine
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.errorMessage.name = ''
      state.errorMessage.isError = false
      state.isLoading = true
    })
    builder.addCase(loginUser.fulfilled, (state) => {
      state.errorMessage.name = ''
      state.isLoading = false
    })

    builder.addCase(loginUser.rejected, (state, action) => {
      state.errorMessage.name = String(action.error.message)
      state.errorMessage.isError = true
      state.isLoading = false
    })

    builder.addCase(registerUser.pending, (state) => {
      state.errorMessage.name = ''
      state.errorMessage.isError = false
      state.isLoading = true
    })
    builder.addCase(registerUser.fulfilled, (state) => {
      state.isLoading = false
    })

    builder.addCase(registerUser.rejected, (state, action) => {
      state.errorMessage.name = String(action.error.message)
      state.errorMessage.isError = true
      state.isLoading = false
    })

    builder.addCase(addRoutine.pending, (state) => {
      state.errorMessage.name = ''
      state.errorMessage.isError = false
      state.isLoading = true
    })
    builder.addCase(addRoutine.fulfilled, (state) => {
      state.isLoading = false
    })

    builder.addCase(addRoutine.rejected, (state, action) => {
      state.errorMessage.name = String(action.error.message)
      state.errorMessage.isError = true
      state.isLoading = false
    })
  }

})

export const {
  logOut,
  setUser,
  addExerciseToRoutine,
  deleteExerciseFromState,
  setError,
  setRoutine,
  setLogged,
  setIsLoading
} = userSlice.actions

export default userSlice.reducer
