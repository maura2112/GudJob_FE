import React from 'react';
import {
  Box,
  Container,
  Divider,
  LinearProgress,
  Typography,
  Alert,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import ProjectDescription from '../../../components/ProjectDescription';
import TypographyTitle from '../../../components/Typography/TypographyTitle';
import { formatCurrency } from '../../../utils/formatCurrency';

const ShowList = ({ listProject }) => {
  const navigate = useNavigate();

  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <Box bgcolor="#F8F8FF" borderRadius="5px" p={3}>
      <Box display="flex" mb={2}>
        <Typography mr={1}> Tổng số dự án : </Typography>
        <TypographyTitle title={listProject?.totalItemsCount} />
      </Box>
      <Divider />
      {(listProject === undefined || listProject == null) && <LinearProgress />}

      {listProject?.items?.length === 0 && (
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
          <Alert severity="info">Hiện tại chưa có bản ghi nào .</Alert>
        </Container>
      )}
      {listProject?.items?.length !== 0 &&
        listProject?.items?.map((project, index) => (
          <Box key={index} mt={1} className="project-item">
            <Box
              mb={3}
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
                '&:hover': { backgroundColor: '#f0f0f0' },
              }}
              onClick={() => handleDetail(project?.id)}
            >
              <Box display="flex">
                <Box>
                  <Box display="flex" alignItems="center">
                    <TypographyTitle title={project?.title} color="#3366FF" />
                    <Box
                      sx={{
                        display: 'inline-block',
                        padding: '2px 4px',
                        backgroundColor: project?.projectStatus?.statusColor,
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        marginLeft: '8px',
                      }}
                    >
                      <Typography fontSize="10px">
                        {' '}
                        {project?.projectStatus?.statusName}{' '}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography fontWeight="bold" fontSize="14px">
                    Ngân sách : {formatCurrency(project?.minBudget)} -{' '}
                    {formatCurrency(project?.maxBudget)}
                  </Typography>
                  <Typography fontWeight="bold" fontSize="14px">
                    Thời gian : {project?.duration} ngày
                  </Typography>
                </Box>
                <Box ml="auto">
                  <Typography fontWeight="bold" fontSize="14px">
                    Tổng : {project?.totalBids} đấu thầu
                  </Typography>
                  <Typography fontWeight="bold" fontSize="14px">
                    Trung bình : {formatCurrency(project?.averageBudget)}
                  </Typography>
                </Box>
              </Box>
              <Box mt={1}>
                <Box m={2}>
                  <ProjectDescription description={project?.description} />
                </Box>
                <Typography fontWeight="bold" fontSize="14px">
                  Kỹ năng yêu cầu
                </Typography>
                <Box display="flex" flexWrap="wrap">
                  {project?.skill?.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        mt: 1,
                        borderRadius: '10px',
                        padding: '5px',
                        display: 'inline-block',
                        ml: 2,
                        border: '1px solid blue',
                      }}
                    >
                      <Typography fontSize="15px"> {item} </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box mt={1} display="flex">
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <StarIcon sx={{ color: '#FFD700', fontSize: '20px' }} />
                  <Typography>5.0</Typography>
                </Box>
                <Box ml="auto">
                  <Typography>{project?.timeAgo}</Typography>
                </Box>
              </Box>
              <Box mt={1}>
                <Typography fontSize="10px">
                  Ngày tạo : {project?.createdDate}
                </Typography>
              </Box>
            </Box>
            <Divider />
          </Box>
        ))}
    </Box>
  );
};

export default ShowList;
