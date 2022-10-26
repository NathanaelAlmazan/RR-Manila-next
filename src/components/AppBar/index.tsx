import * as React from 'react';
// mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function AppBar() {
  return (
    <Stack 
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ my: 2 }}
    >
        <Stack>
            <Typography variant="h6" color="error">
                Bureau of Internal Revenue
            </Typography>
            <Typography variant="subtitle2">
                Manila Revenue Region
            </Typography>
        </Stack>
        <Stack direction="row">

        </Stack>
    </Stack>
  )
}

export default AppBar