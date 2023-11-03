import { useState, useEffect } from "react";
import {
    Box,
    Button,
    Container,
    Grid,
    OutlinedInput,
    TextField,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Swal from "sweetalert2";
import numeral from "numeral";
import DeleteIcon from "@mui/icons-material/Delete";
import HeaderComp from "../../../components/header/HeaderComp";
import FooterComp from "../../../components/footer/FooterComp";

const schema = yup.object().shape({
    shippingAddress: yup.string().required("Địa chỉ giao hàng không được trống"),
});

interface DecodedToken {
    data: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    };
    iat: number;
    exp: number;
}
interface CartItem {
    productId: string;
    userId: string;
    productName: string;
    price: number;
    image: string;
    quantity: number;
}

interface OrderData {
    shippingAddress: string;
}

function CartPage() {

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        setCartItems(storedCartItems);
    }, []);

    let decoded: DecodedToken | null = null;
    if (localStorage.getItem("access_token")) {
        decoded = jwtDecode(localStorage.getItem("access_token") || "");

    }

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const axiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
        },
    });

    const handleQuantityChange = (index: number, newQuantity: number) => {
        if (newQuantity >= 1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[index].quantity = newQuantity;
            setCartItems(updatedCartItems);

            localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        }
    };

    const handleRemoveItem = (index: number) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);

        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    };

    const getTotalPrice = cartItems.reduce((total, item) => {
        if (decoded?.data.id === item.userId) {
            return total + item.quantity * item.price;
        }
        return total;
    }, 0);

    const handlePlaceOrder = async (data: OrderData) => {
        console.log(data);

        const orderDetailsArray = cartItems.filter(
            (item) => decoded?.data.id === item.userId
        );
        try {
            console.log(orderDetailsArray);
            const response = await axiosInstance.post(
                "http://localhost:3000/api/v1/orders",
                {
                    totalAmount: getTotalPrice,
                    shippingAddress: data.shippingAddress,
                    orderDetails: orderDetailsArray,
                }
            );
            console.log(response.data);
            if (response.status === 201) {
                Swal.fire({
                    icon: "success",
                    title: "Đặt hàng thành công",
                    timer: 2000,
                }).then(() => {
                    setCartItems([]);
                    localStorage.removeItem("cartItems");
                });
            } else if (response.status === 203) {
                Swal.fire({
                    icon: "error",
                    title: "Tài khoản đã bị khoá",
                    timer: 2000,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <HeaderComp />
            <Box className="bg-color-green" marginTop={10}>
                {cartItems.filter((e) => e.userId === decoded?.data.id).length > 0 &&
                    decoded !== null ? (
                    <Container>
                        <Typography fontWeight={"bold"} paddingY={3}>
                            Có {cartItems.filter((e) => e.userId === decoded?.data.id).length}{" "}
                            sản phẩm trong giỏ hàng
                        </Typography>
                        <hr />
                        {cartItems.map((item: CartItem, i: number) => {
                            if (decoded?.data.id === item.userId)
                                return (
                                    <Grid
                                        key={i}
                                        container
                                        className="bg-color-white"
                                        marginY={2}
                                        borderRadius={2}
                                    >
                                        <Grid
                                            item
                                            display={"flex"}
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                            md={2}
                                        >
                                            <img
                                                src={item.image}
                                                alt=""
                                                width={"80px"}
                                                height={"auto"}
                                            />
                                        </Grid>
                                        <Grid item md={4} paddingY={1}>
                                            <Typography variant="h5" fontWeight={"bold"}>
                                                {item.productName}
                                            </Typography>

                                        </Grid>
                                        <Grid item md={3}>
                                            <Box
                                                height={"100%"}
                                                display={"flex"}
                                                justifyContent={"center"}
                                                alignItems={"center"}
                                            >
                                                <Box
                                                    display={"flex"}
                                                    justifyContent={"center"}
                                                    alignItems={"center"}
                                                    gap={1}
                                                >
                                                    <Button
                                                        disabled={item.quantity === 1}
                                                        onClick={() =>
                                                            handleQuantityChange(i, item.quantity - 1)
                                                        }
                                                        size="large"
                                                        variant="contained"
                                                    >
                                                        <i className="fa-solid fa-minus"></i>
                                                    </Button>

                                                    <OutlinedInput
                                                        type="text"
                                                        className="form-control rounded-0"
                                                        value={item.quantity}
                                                        size="small"
                                                        onChange={(e) =>
                                                            handleQuantityChange(i, parseInt(e.target.value))
                                                        }
                                                        readOnly
                                                    />
                                                    <Button
                                                        style={{ height: "100%" }}
                                                        variant="contained"
                                                        size="large"
                                                        onClick={() =>
                                                            handleQuantityChange(i, item.quantity + 1)
                                                        }
                                                    >
                                                        <i className="fa-solid fa-plus"></i>
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item md={3}>
                                            <Box
                                                height={"100%"}
                                                display={"flex"}
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                                width={"100%"}
                                                paddingY={2}
                                            >
                                                <Box display={"flex"} flexDirection={"column"} gap={2}>
                                                    <Typography color={"error"} className="text-danger">
                                                        {numeral(item.quantity * item.price).format("0, ")}{" "}
                                                        đ
                                                    </Typography>
                                                    <Button
                                                        onClick={() => handleRemoveItem(i)}
                                                        variant="contained"
                                                        color="error"
                                                    >
                                                        <DeleteIcon />
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                );
                        })}

                        <Grid>
                            <Grid item>
                                <Typography fontWeight={"bold"} fontSize={24} marginBottom={2}>
                                    Tổng tiền: {numeral(getTotalPrice).format("0, ")} VND
                                </Typography>
                            </Grid>
                        </Grid>
                        <form onSubmit={handleSubmit(handlePlaceOrder)}>
                            <Box padding={2} bgcolor={"white"} borderRadius={2}>
                                <Controller
                                    name="shippingAddress"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            style={{ width: "100%" }}
                                            type="text"
                                            label="Địa chỉ"
                                            className="form-control"
                                            error={!!errors?.shippingAddress}
                                            helperText={errors?.shippingAddress?.message}
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.shippingAddress && (
                                    <span className="text-danger">{ }</span>
                                )}
                            </Box>
                            <Box display="flex" justifyContent="center" paddingY={3}>
                                <Button variant="contained" type="submit" color="error">
                                    Hoàn tất đặt hàng
                                </Button>
                            </Box>
                        </form>
                    </Container>
                ) : (
                    <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        paddingY={3}
                    >
                        <Box textAlign={"center"}>
                            <img
                                src="https://fptshop.com.vn/estore-images/empty-cart.png"
                                alt=""
                                width={"500px"}
                            />
                            <Typography textAlign={"center"} marginBottom={3}>
                                Không có sản phẩm trong giỏ hàng
                            </Typography>
                            <Button variant="contained" component={Link} to={"/"}>
                                Trang chủ
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
            <FooterComp />
        </>
    );
}

export default CartPage;
