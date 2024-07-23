import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import categoryApi from '../../../services/categoryApi';
import { useNavigate } from 'react-router-dom';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import HeroSection from '../../../components/HeroSection';
import TypographyTitle from '../../../components/Typography/TypographyTitle';
import TypographyHeader from '../../../components/Typography/TypographyHeader';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useSelector } from 'react-redux';
import ListBlog from '../../Admin/Blog/Publish/ListBlog';
import LoadingComponent from '../../../components/LoadingComponent';
import blogApi from '../../../services/blogApi';

const Home = () => {
  const [listCategory, setListCategory] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation('home');
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const [listBlogHomePage, setListBlogHomePage] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCategory = async () => {
      try {
        setLoading(true);
        let params = {
          Top: 4,
          IsHomePage: true,
        };
        const res = await categoryApi.GetAllCategory();
        setListCategory(res);
        const res1 = await blogApi.Gets(params);
        setListBlogHomePage(res1);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    getCategory();
  }, []);

  useEffect(() => {
    if (currentUser != null) {
      const role = currentUser?.role;
      if (role === 'Freelancer') {
        navigate('/home');
      } else if (role === 'Recruiter') {
        navigate('/recruiter');
      }
    }
  }, [currentUser, navigate]);

  const handleClick = (id) => {
    navigate(`/category/${id}`);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <HeroSection />
      <Box m={3}>
        {loading && <LoadingComponent loading={loading} />}

        <Box mb={3}>
          <TypographyHeader title={t('popular_category')} />
          <Carousel
            responsive={responsive}
            swipeable={true}
            draggable={true}
            infinite={true}
            partialVisible={false}
          >
            {listCategory?.map((item, index) => {
              return (
                <div className="slider" key={index}>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card
                      onClick={() => handleClick(item?.id)}
                      sx={{
                        maxWidth: 345,
                        textDecoration: 'none',
                        cursor: 'pointer',
                        borderRadius: 2,
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                        },
                        '&:focus': {
                          outline: 'none',
                          boxShadow: '0 0 0 4px rgba(0, 123, 255, 0.5)',
                        },
                        '&:active': {
                          transform: 'scale(0.95)',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={item?.image}
                      />
                      <CardContent>
                        <TypographyTitle title={item?.categoryName} />
                      </CardContent>
                    </Card>
                  </Grid>
                </div>
              );
            })}
          </Carousel>
        </Box>
        <Divider />

        <Box mt={3}>
          <TypographyHeader title={t('website_can_help_you_about_?')} />
          <Box display="flex">
            <Box flex="1" p={3}>
              <CardMedia
                component="img"
                height="350"
                image="https://cdn.tgdd.vn/Files/2021/07/09/1366892/top-8-loai-tranh-phong-thuy-cho-nguoi-menh-kim-hut-tai-loc-may-man-202107091426133314.jpg"
              />
            </Box>
            <Box flex="1" p={3}>
              <Typography
                variant="h6"
                display="flex"
                alignItems="center"
                mb={2}
              >
                <CheckBoxOutlinedIcon sx={{ color: 'green', mr: 1 }} /> Example
                context
              </Typography>
              <Typography
                variant="h6"
                display="flex"
                alignItems="center"
                mb={2}
              >
                <CheckBoxOutlinedIcon sx={{ color: 'green', mr: 1 }} /> Example
                context
              </Typography>
              <Typography
                variant="h6"
                display="flex"
                alignItems="center"
                mb={2}
              >
                <CheckBoxOutlinedIcon sx={{ color: 'green', mr: 1 }} /> Example
                context
              </Typography>
              <Typography
                variant="h6"
                display="flex"
                alignItems="center"
                mb={2}
              >
                <CheckBoxOutlinedIcon sx={{ color: 'green', mr: 1 }} /> Example
                context
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box mt={3}>
          <TypographyHeader
            title={t('explore_more_features_with_membership')}
          />
          <Box display="flex">
            <Box flex="1" p={3}>
              <Typography
                variant="h6"
                display="flex"
                alignItems="center"
                mb={2}
              >
                New feature with membership
              </Typography>
              <Typography
                variant="h6"
                display="flex"
                alignItems="center"
                mb={2}
              >
                New feature with membership
              </Typography>
              <Typography
                variant="h6"
                display="flex"
                alignItems="center"
                mb={2}
              >
                New feature with membership
              </Typography>
              <Typography
                variant="h6"
                display="flex"
                alignItems="center"
                mb={2}
              >
                New feature with membership
              </Typography>
            </Box>
            <Box flex="1" p={3}>
              <CardMedia
                component="img"
                height="350"
                image="https://cdn.tgdd.vn/Files/2021/07/09/1366892/top-8-loai-tranh-phong-thuy-cho-nguoi-menh-kim-hut-tai-loc-may-man-202107091426133314.jpg"
              />
            </Box>
          </Box>
        </Box>

        <Box mt={3}>
          <TypographyHeader title="Tin tức" />
          <ListBlog listBlog={listBlogHomePage} />
        </Box>
      </Box>
    </>
  );
};

export default Home;
