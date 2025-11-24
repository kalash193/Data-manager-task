'use client'
import React from 'react'
import { Box, TextField, Button, Stack } from '@mui/material'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import DownloadIcon from '@mui/icons-material/Download'
import Papa from 'papaparse'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { addRows } from '../store/simpleStore'
import { saveAs } from 'file-saver'

export default function ToolbarActions({ onOpenColumns, search, onSearch }: any) {
  const columns = useAppSelector(s => s.ui.columns)
  const rows = useAppSelector(s => s.data.rows)
  const visible = columns.filter((c: any) => c.visible)
  const dispatch = useAppDispatch()

  const handleImport = (file: File | null) => {
    if (!file) return
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        if (res.data) {
          const data = (res.data as any[]).map(r =>
            ({ ...r, id: String(Math.random()).slice(2) })
          )
          dispatch(addRows(data))
        }
      },
      error: (err) => alert('CSV parse error: ' + err.message)
    })
  }

  const handleExport = () => {
    const keys = visible.map((c: any) => c.key)
    const data = rows.map((r: any) => {
      const o: any = {}
      keys.forEach((k: any) => o[k] = r[k] ?? '')
      return o
    })

    const csv = Papa.unparse(data)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, 'export.csv')
  }

  return (
    <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
      <Stack direction="row" spacing={1}>
        <TextField
          size="small"
          placeholder="Global search..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />

        <Button variant="outlined" onClick={onOpenColumns}>
          Columns
        </Button>

        <label>
          <input
            type="file"
            accept=".csv"
            style={{ display: 'none' }}
            onChange={(e) =>
              handleImport(e.target.files ? e.target.files[0] : null)
            }
          />
          <Button variant="outlined" startIcon={<UploadFileIcon />}>
            Import CSV
          </Button>
        </label>

        <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExport}>
          Export CSV
        </Button>
      </Stack>

      <Stack direction="row" spacing={1}>
        <Button onClick={() => {
          localStorage.removeItem('columns_core')
          window.location.reload()
        }}>
          Reset Columns
        </Button>
      </Stack>
    </Box>
  )
}
