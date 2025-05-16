'use client';

import { Box, Pagination as MuiPagination, FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

interface PaginationProps {
  count: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export default function Pagination({ count, page, limit, onPageChange, onLimitChange }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(page);
  const [itemsPerPage, setItemsPerPage] = useState(limit);
  
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    onPageChange(value);
  };
  
  const handleLimitChange = (e: SelectChangeEvent<number>) => {
    const newLimit = Number(e.target.value);
    setItemsPerPage(newLimit);
    onLimitChange(newLimit);
    // Reset to page 1 when changing limit
    setCurrentPage(1);
    onPageChange(1);
  };
  
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        my: 2,
        flexWrap: 'wrap',
        gap: 2
      }}
    >
      <MuiPagination 
        count={Math.ceil(count / limit)}
        page={currentPage} 
        onChange={handlePageChange}
        color="primary"
        size="medium"
        shape="rounded"
        showFirstButton
        showLastButton
        sx={{
          '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'primary.dark',
            }
          }
        }}
      />
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <FormControl size="small" variant="outlined">
          <Select
            value={itemsPerPage}
            onChange={handleLimitChange}
            displayEmpty
            sx={{ minWidth: 80 }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
