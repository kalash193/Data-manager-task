import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'

type Row = {
  id: string
  name: string
  email: string
  age: number
  role: string
  [key: string]: any
}

const initialRows: Row[] = [
  { id: uuid(), name: 'Alice', email: 'alice@example.com', age: 29, role: 'Designer' },
  { id: uuid(), name: 'Bob', email: 'bob@example.com', age: 33, role: 'Engineer' },
  { id: uuid(), name: 'Carol', email: 'carol@example.com', age: 24, role: 'PM' },
  { id: uuid(), name: 'Dave', email: 'dave@example.com', age: 41, role: 'CTO' }
]

const dataSlice = createSlice({
  name: 'data',
  initialState: { rows: initialRows },
  reducers: {
    setRows(state, action: PayloadAction<Row[]>) {
      state.rows = action.payload
    },
    addRows(state, action: PayloadAction<Row[]>) {
      state.rows = [...action.payload, ...state.rows]
    }
  }
})

const loadColumns = () => {
  try {
    const stored = localStorage.getItem('columns_core')
    if (stored) return JSON.parse(stored)
  } catch (e) {}
  return [
    { key: 'name', label: 'Name', visible: true },
    { key: 'email', label: 'Email', visible: true },
    { key: 'age', label: 'Age', visible: true },
    { key: 'role', label: 'Role', visible: true }
  ]
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: { columns: loadColumns() },
  reducers: {
    setColumns(state, action: PayloadAction<any[]>) {
      state.columns = action.payload
      try {
        localStorage.setItem('columns_core', JSON.stringify(action.payload))
      } catch (e) {}
    }
  }
})

export const { setRows, addRows } = dataSlice.actions
export const { setColumns } = uiSlice.actions

export const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    ui: uiSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
