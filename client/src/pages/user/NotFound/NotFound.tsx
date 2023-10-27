import { Grid, Typography } from '@mui/material';
function NotFoundPage() {
    return (
        <>
            <Grid>
                <Grid item>
                    <Typography
                        align="center"
                        fontWeight={"bold"}
                        fontSize={100}
                        marginTop={20}
                    >
                        404
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography align="center" fontSize={40}>
                        Page Not Found
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default NotFoundPage