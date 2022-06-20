import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';

export interface ChipData {
  id?: number;
  label?: string;
  category?: string;
  value?: any;
}
interface Props{
    chipData:any,
    handleDelete:any
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray(props:Props) {
 

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
        boxShadow:'none'
        // backgroundColor:none
      }}
      component="ul"
    >
      {props.chipData.map((data:any) => {
        // debugger
       

       
       return data.value!==null?(
            <ListItem>
              <Chip
                sx={{borderRadius:"0px"}}
                label={data.value}
                onDelete={props.handleDelete(data.category,data.value,data.id)}
              />
            </ListItem>
          ):null
        
      })}
    </Paper>
  );
}
