import * as React from 'react';
import {Backdrop, CircularProgress} from '@mui/material';

export default function SimpleBackdrop(props) {
    return (
      <div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={props.loading}
          onClick={props.loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }