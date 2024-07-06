import React, { useState } from 'react';
import { Box, Typography, IconButton, Tooltip, TextField, InputAdornment, Button, Menu, MenuItem } from '@mui/material';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { DataGrid } from '@mui/x-data-grid';

const ReportList = ({ reports, totalReports, pageSize, page, pageChange, pageSizeChange, typeDes, setTypeDes, onOpenModal, loading, setLoading }) => {
  const [search, setSearch] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const columns = [
    { field: 'nameCreatedBy', headerName: 'Created By', width: 150, flex: 1 },
    {
      field: 'reportInformation',
      headerName: 'Report Information',
      width: 200,
      flex: 1,
      renderCell: (params) => {
        const { reportToUrl, bidName, projectName } = params.row;
        return (
          <Typography>
            {reportToUrl ? `URL user: ${reportToUrl}` :
              bidName ? `Bid Name: ${bidName}` :
                projectName ? `Project Name: ${projectName}` :
                  'No Information'}
          </Typography>
        );
      }
    },
    { field: 'reportName', headerName: 'Report Name', width: 200, flex: 1 },
    { field: 'description', headerName: 'Description', width: 300, flex: 1 },
    {
      field: 'isApproved',
      headerName: 'Status',
      width: 150,
      flex: 1,
      renderCell: (params) => (
        params.value ? (
          <Typography>Đã Duyệt <CheckCircleOutlineIcon color='success' /></Typography>
        ) : (
          <Typography>Chờ Duyệt <ErrorOutlineIcon color='warning' /></Typography>
        )
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title="Đánh dấu là đã xử lý">
          <span>
            <IconButton onClick={() => onOpenModal(params.row.id)} disabled={params.row.isApproved === true}>
              <FactCheckIcon />
            </IconButton>
          </span>
        </Tooltip>
      )
    }
  ];

  const [paginationModel, setPaginationModel] = useState({
    page: page,
    pageSize: pageSize,
  });

  const handleRoleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTypeSelect = async (typeDes) => {
    setTypeDes(typeDes);
    setLoading(true);
    handleMenuClose();
  };

  return (
    <Box component="main" className="p-4" sx={{ width: '100%', overflow: 'auto' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography sx={{ fontSize: "1.5rem", fontWeight: "600" }}>Report List</Typography>
      </Box>
      <TextField
        label="Search reporter"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                aria-controls="type-menu"
                aria-haspopup="true"
                onClick={handleRoleButtonClick}
                endIcon={<ArrowDropDownIcon />}
              >
                {typeDes || 'Type'}
              </Button>
              <Menu
                id="type-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleTypeSelect('user')}>Report User</MenuItem>
                <MenuItem onClick={() => handleTypeSelect('bid')}>Report Bid</MenuItem>
                <MenuItem onClick={() => handleTypeSelect('project')}>Report Project</MenuItem>
                <MenuItem onClick={() => handleTypeSelect('All')}>All</MenuItem>
              </Menu>
            </InputAdornment>
          ),
        }}
      />
      <Box height={400} width="100%">
        <DataGrid
          rows={reports}
          columns={columns}
          rowCount={totalReports}
          paginationModel={paginationModel}
          onPaginationModelChange={(newModel) => {
            setPaginationModel(newModel);
            pageChange(newModel.page);
            pageSizeChange(newModel.pageSize);
          }}
          paginationMode="server"
          keepNonExistentRowsSelected
          disableRowSelectionOnClick
          loading={loading}
          pageSizeOptions={[5, 10, 15, 20]}
          slotProps={{
            pagination: {
              labelRowsPerPage: "Số lượng report trên 1 trang",
              labelDisplayedRows: ({ from, to, count }) => {
                return `${from.toLocaleString('en')}-${to.toLocaleString('en')} trên ${count.toLocaleString('en')} report`
              }
            }
          }}
          localeText={{
            footerRowSelected: (count) =>
              count !== 1
                ? `Đã chọn ${count.toLocaleString()} report`
                : `Đã chọn ${count.toLocaleString()} report`,
          }}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
              borderBottom: '1px solid #ddd',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #ddd',
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: '#f5f5f5',
              borderTop: '1px solid #ddd',
            },
            '& .MuiDataGrid-row': {
              '&:nth-of-type(even)': {
                backgroundColor: '#f9f9f9',
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default ReportList;
