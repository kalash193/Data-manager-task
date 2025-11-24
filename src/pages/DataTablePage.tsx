'use client'
import React from 'react'
import { Container, Paper, Box, Typography } from '@mui/material'
import DataTable from '../ui/DataTable'

export default function DataTablePage() {
  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Dynamic Data Table — Core</Typography>
        </Box>
        <DataTable />
      </Paper>
    </Container>
  )
}
