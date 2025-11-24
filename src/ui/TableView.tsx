'use client'
import React from 'react'
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  TableSortLabel, TablePagination, Button, Stack
} from '@mui/material'
import ToolbarActions from './ToolbarActions'
import ManageColumnsModal from './ManageColumnsModal'
import { useAppSelector } from '../store/hooks'

type Order = 'asc' | 'desc'

export default function TableView() {
  const rows = useAppSelector(s => s.data.rows)
  const columns = useAppSelector(s => s.ui.columns)
  const visibleCols = columns.filter((c: any) => c.visible)

  const [orderBy, setOrderBy] = React.useState('name')
  const [order, setOrder] = React.useState<Order>('asc')
  const [page, setPage] = React.useState(0)
  const [search, setSearch] = React.useState('')
  const rowsPerPage = 10
  const [openCols, setOpenCols] = React.useState(false)

  const filtered = rows.filter(r => {
    if (!search) return true
    const q = search.toLowerCase()
    return Object.values(r).some(v => String(v).toLowerCase().includes(q))
  })

  const sorted = filtered.sort((a: any, b: any) => {
    const av = a[orderBy] ?? ''
    const bv = b[orderBy] ?? ''
    if (av < bv) return order === 'asc' ? -1 : 1
    if (av > bv) return order === 'asc' ? 1 : -1
    return 0
  })

  return (
    <div>
      <ToolbarActions
        onOpenColumns={() => setOpenCols(true)}
        search={search}
        onSearch={setSearch}
      />

      <Table size="small">
        <TableHead>
          <TableRow>
            {visibleCols.map((col: any) => (
              <TableCell key={col.key}>
                <TableSortLabel
                  active={orderBy === col.key}
                  direction={order}
                  onClick={() => {
                    const isAsc = orderBy === col.key && order === 'asc'
                    setOrder(isAsc ? 'desc' : 'asc')
                    setOrderBy(col.key)
                  }}
                >
                  {col.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {sorted
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row: any) => (
              <TableRow key={row.id}>
                {visibleCols.map((col: any) => (
                  <TableCell key={col.key}>{row[col.key]}</TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={sorted.length}
        page={page}
        onPageChange={(_, p) => setPage(p)}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
      />

      <ManageColumnsModal open={openCols} onClose={() => setOpenCols(false)} />
    </div>
  )
}
