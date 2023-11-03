import {
    Box,
    Breadcrumbs,
    Button,
    Container,
    Grid,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import axios from "axios";
import numeral from "numeral";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import SliderComp from "../../../components/slider/SliderComp";
import HeaderComp from "../../../components/header/HeaderComp";
import FooterComp from "../../../components/footer/FooterComp";


interface ProductData {
    name: string;
    price: number;
    detail: string;
    size: number;
    refreshrateValue: number;
    resolutionValue: string;
    quantity: number;
    manufacturerName: string;
    description: string;
}
interface Image {
    pictureId: number;
    productId: number;
    source: string;
    type: number;
}

interface CartItem {
    productId: string;
    userId: string;
    productName: string;
    price: number;
    image: string;
    quantity: number;
}

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


function DetailPage() {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<ProductData | null>(null);
    const [images, setImages] = useState<Image[]>([]);


    const fetchData = async () => {
        const response = await axios.get(`http://localhost:3000/api/v1/monitors/${id}`);
        const imagesResponse = await axios.get(`http://localhost:3000/api/v1/pictures/${id}`);
        setData(response.data);
        setImages(imagesResponse.data);
    };
    console.log(data);

    useEffect(() => {
        fetchData();
    }, []);

    let decoded: DecodedToken | null = null;
    if (localStorage.getItem("access_token")) {
        decoded = jwtDecode(localStorage.getItem("access_token") || "");

    }

    const productAvatar = images?.find((e) => e.type === 1);

    const handleAddToCart = () => {

        if (localStorage.getItem("access_token") && decoded && data && id) {
            const cartItem = {
                productId: id,
                userId: decoded.data.id,
                productName: data.name,
                price: +data.price,
                image: productAvatar?.source || "adwwa",
                quantity: 1,
            };
            console.log(cartItem);
            const existingCartItems: CartItem[] = JSON.parse(localStorage.getItem("cartItems") || "[]");

            const itemIndex = existingCartItems.findIndex(
                (item: CartItem) => item.productId === cartItem.productId
            );
            console.log(itemIndex);

            if (itemIndex !== -1) {
                existingCartItems[itemIndex].quantity += 1;
            } else {
                existingCartItems.push(cartItem);
            }

            localStorage.setItem("cartItems", JSON.stringify(existingCartItems));

            Swal.fire({
                icon: "success",
                title: "Sản phẩm đã được thêm vào giỏ hàng",
                timer: 1000,
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Bạn phải đăng nhập để thêm sản phẩm vào giỏ hàng",
                timer: 1000,
            });
        }
    };

    return (
        <>
            <HeaderComp />
            <div className="bg-color-green">
                <Container>
                    <Box paddingY={2} marginTop={10}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Button component={Link} to={"/"}>
                                Trang chủ
                            </Button>
                            <Button component={Link} to={"/laptop"}>
                                Màn hình
                            </Button>
                            <Button component={Link} to={`/laptop/${id}`}>
                                {data?.name}
                            </Button>
                        </Breadcrumbs>
                    </Box>
                    <Grid container spacing={2} paddingBottom={2}>
                        <Grid item md={6} xs={12}>
                            <Box>
                                {/* <SliderProductImage images={data?.images} /> */}
                                <SliderComp images={images} />
                            </Box>
                        </Grid>
                        <Grid item md={6}>
                            <Box>
                                <Typography variant="h3">{data?.name}</Typography>
                                <Typography
                                    color={"error"}
                                    fontSize={23}
                                    fontWeight={"bold"}
                                    marginY={2}
                                >
                                    Giá bán: {numeral(data?.price || 0).format("0, ")} VND
                                </Typography>
                                <Box>
                                    <Button
                                        onClick={handleAddToCart}
                                        variant="contained"
                                        color="error"
                                    >
                                        Thêm vào giỏ hàng
                                    </Button>
                                </Box>
                                <Box
                                    bgcolor={"white"}
                                    padding={2}
                                    marginTop={3}
                                    borderRadius={2}
                                >
                                    <Typography variant="h6">Thông tin sản phẩm:</Typography>
                                    <List>
                                        <ListItem>
                                            <ListItemText primary={"Thông tin: " + data?.detail} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={"Kích thước: " + data?.size + " Inches"} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={"Tần số quét: " + data?.refreshrateValue + " Hz"} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={`Độ phân giải: ${data?.resolutionValue || ""}`} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={`Số lượng: ${data?.quantity || 0}`} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={`Nhà sản xuất: ${data?.manufacturerName || ""}`} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={"Miêu tả: " + data?.description} />
                                        </ListItem>
                                    </List>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <FooterComp />
        </>
    );
}

export default DetailPage;
