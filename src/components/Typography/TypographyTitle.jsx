import { Typography } from '@mui/material'
import React from 'react'

const TypographyTitle = ({ title,color,marginT }) => {
    return (
        <Typography
        sx={{
            mt :marginT,
            fontSize: '18px',
            fontWeight: 'bold',
            color: {color},
        }}
        >{title}</Typography>
    )
}

export default TypographyTitle
