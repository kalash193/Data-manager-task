'use client'
import React from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, FormGroup, FormControlLabel, Checkbox, TextField
} from '@mui/material'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { setColumns } from '../store/simpleStore'

export default function ManageColumnsModal({ open, onClose }: any) {
  const dispatch = useAppDispatch()
  const columns = useAppSelector(s => s.ui.columns)
  const [local, setLocal] = React.useState(columns)
  const [newKey, setNewKey] = React.useState('')
  const [newLabel, setNewLabel] = React.useState('')

  React.useEffect(() => setLocal(columns), [columns, open])

  const toggle = (key: string, checked: boolean) => {
    setLocal(local.map((c: any) =>
      c.key === key ? { ...c, visible: checked } : c
    ))
  }

  const handleSave = () => {
    dispatch(setColumns(local))
    onClose()
  }

  const handleAdd = () => {
    if (!newKey.trim()) return
    const next = [...local, { key: newKey, label: newLabel || newKey, visible: true }]
    setLocal(next)
    setNewKey('')
    setNewLabel('')
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Manage Columns</DialogTitle>

      <DialogContent>
        <FormGroup>
          {local.map((c: any) => (
            <FormControlLabel
              key={c.key}
              control={
                <Checkbox
                  checked={c.visible}
                  onChange={(e) => toggle(c.key, e.target.checked)}
                />
              }
              label={c.label}
            />
          ))}
        </FormGroup>

        <div style={{ marginTop: 12 }}>
          <TextField
            label="Key"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            size="small"
            sx={{ mr: 1 }}
          />
          <TextField
            label="Label"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            size="small"
            sx={{ mr: 1 }}
          />
          <Button onClick={handleAdd}>Add Column</Button>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}
