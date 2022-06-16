import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const ListThought = props => {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(0.5),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Box sm={{ width: 500, minHeight: 393 }}>
            <Masonry columns={4} spacing={2}>
                <Item key={props.item.id} sx={ 150 }>
                    {props.item.title}
                    {props.item.content}
                </Item>
            </Masonry>
        </Box>
    )
}

export default ListThought