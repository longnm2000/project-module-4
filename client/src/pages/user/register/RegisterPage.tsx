import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
    FormControl,
    InputLabel,
    MenuItem,
    FormHelperText,
    Select,
} from "@mui/material";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios, { AxiosError, AxiosResponse } from "axios";
import Swal, { SweetAlertOptions } from "sweetalert2";

const defaultTheme = createTheme();

const schema = yup.object().shape({
    lastName: yup.string().required("Họ là bắt buộc"),
    firstName: yup.string().required("Tên là bắt buộc"),
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
    phone: yup
        .string()
        .matches(/^\d{10}$/, "Số điện thoại phải có 10 chữ số")
        .required("Vui lòng nhập số điện thoại"),

    gender: yup.number().required("Vui lòng chọn giới tính"),
});

export default function RegisterPage() {
    const navigate = useNavigate();
    const apiURL = import.meta.env.VITE_API_URL;
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: object) => {
        axios
            .post(`${apiURL}/auth/sign-up`, data)
            .then((res: AxiosResponse) => {
                if (res.status === 201) {
                    Swal.fire({
                        icon: "success",
                        title: "Đăng nhập thành công!",
                        text: "Tự động chuyển về trang đăng nhập",
                        timer: 2000,
                    } as SweetAlertOptions).then(() => navigate("/login"));
                } else if (res.status === 200) {
                    Swal.fire({
                        icon: "error",
                        title: "Email đã được sử dụng!",
                        timer: 2000,
                    } as SweetAlertOptions);
                }
            })
            .catch((err: AxiosError) => Swal.fire({
                icon: "error",
                title: "Có lỗi xảy ra",
                text: err.message,
            } as SweetAlertOptions));
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Đăng ký
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="lastName"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Họ"
                                            error={!!errors.lastName}
                                            helperText={errors.lastName?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="firstName"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Tên"
                                            error={!!errors.firstName}
                                            helperText={errors.firstName?.message}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Email"
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name="gender"
                                    control={control}
                                    defaultValue={0}
                                    render={({ field }) => (
                                        <FormControl fullWidth error={!!errors.gender}>
                                            <InputLabel>Giới tính</InputLabel>
                                            <Select
                                                {...field}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Giới tính"
                                            >
                                                <MenuItem value={0}>Nam</MenuItem>
                                                <MenuItem value={1}>Nữ</MenuItem>
                                                <MenuItem value={2}>Khác</MenuItem>
                                            </Select>
                                            {errors?.gender ? (
                                                <FormHelperText>Vui lòng chọn giới tính</FormHelperText>
                                            ) : (
                                                <></>
                                            )}
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="phone"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Số điện thoại"
                                            error={!!errors.phone}
                                            helperText={errors.phone?.message}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Đăng ký
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button component={Link} to={"/login"}>
                                    Có tài khoản? Đăng nhập
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}