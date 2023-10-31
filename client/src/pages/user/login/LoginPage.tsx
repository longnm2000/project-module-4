import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import Swal, { SweetAlertOptions } from "sweetalert2";
const defaultTheme = createTheme();

const schema = yup.object().shape({
    email: yup
        .string()
        .required("Email không được để trống")
        .matches(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/, "Email không hợp lệ")
        .max(100, "Email không dài quá 100 ký tự"),
    password: yup
        .string()
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        .max(50, "Mật khẩu không quá 50 ký tự")
        .required("Vui lòng nhập mật khẩu"),
});

export default function LoginPage() {
    const navigate = useNavigate();
    const apiURL = import.meta.env.VITE_API_URL;
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data: object) => {
        try {
            const res: AxiosResponse = await axios.post(`${apiURL}/auth/sign-in`, data);
            console.log(res.data);

            switch (res.status) {
                case 200:
                    await Swal.fire({
                        icon: "success",
                        title: "Đăng nhập thành công!",
                        text: "Chuyển sang trang chủ",
                        timer: 2000
                    } as SweetAlertOptions);
                    localStorage.setItem("access_token", res.data.access_token)
                    navigate("/");
                    break;
                case 401:
                    await Swal.fire({
                        icon: "error",
                        title: "Mật khẩu không chính xác!",
                        timer: 2000
                    } as SweetAlertOptions);
                    break;
                case 403:
                    await Swal.fire({
                        icon: "error",
                        title: "Tài khoản bị khoá!",
                        timer: 2000
                    } as SweetAlertOptions);
                    break;
                case 404:
                    await Swal.fire({
                        icon: "error",
                        title: "Tài khoản không tồn tại!",
                        timer: 2000
                    } as SweetAlertOptions);
                    break;
                default:
                    break;

            }
        } catch (error: unknown) {
            Swal.fire({
                icon: "error",
                title: "Có lỗi xảy ra",
                text: error,
            } as SweetAlertOptions);
        }
    };
    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" sx={{ height: "100vh" }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage:
                                "url(https://source.unsplash.com/random?wallpapers)",
                            backgroundRepeat: "no-repeat",
                            backgroundColor: (t) =>
                                t.palette.mode === "light"
                                    ? t.palette.grey[50]
                                    : t.palette.grey[900],
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={5}
                        component={Paper}
                        elevation={6}
                        square
                    >
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Đăng nhập
                            </Typography>
                            <Box
                                component="form"
                                noValidate
                                onSubmit={handleSubmit(onSubmit)}
                                sx={{ mt: 1 }}
                            >
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            margin="normal"
                                            label="Email"
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Mật khẩu"
                                            type="password"
                                            error={!!errors.password}
                                            helperText={errors.password?.message}
                                            margin="normal"
                                        />
                                    )}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Đăng nhập
                                </Button>
                                <Grid container justifyContent={"flex-end"}>
                                    <Grid item>
                                        <Button component={Link} to={"/register"}>
                                            Không có tài khoản? Đăng ký
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    );
}