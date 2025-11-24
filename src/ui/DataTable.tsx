'use client'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../store/simpleStore'
import TableView from './TableView'

export default function DataTable() {
  return (
    <Provider store={store}>
      <TableView />
    </Provider>
  )
}
