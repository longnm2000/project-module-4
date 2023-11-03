import { useEffect, useState } from "react";

import { Container, Typography, Box, Button } from "@mui/material";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import numeral from "numeral";
import HeaderComp from "../../../components/header/HeaderComp";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
interface Order {
    orderId: number;
    userId: number;
    totalAmount: string;
    shippingAddress: string;
    status: number;
    orderDate: string;
}

interface OrderDetail {
    orderId: number;
    userId: number;
    totalAmount: string;
    shippingAddress: string;
    status: number;
    orderDate: string;
    orderdetailId: number;
    productId: number;
    productName: string;
    price: string;
    image: string;
    quantity: number;
    lastName: string;
    firstName: string;
}



function OrderHistoryPage() {
    const [data, setData] = useState<Order[]>([]);
    const [orderDetail, setOrderDetail] = useState<OrderDetail[]>([]);
    const [show, setShow] = useState(false);
    let decoded: DecodedToken | null = null;
    if (localStorage.getItem("access_token")) {
        decoded = jwtDecode(localStorage.getItem("access_token") || "");

    }
    const fetchData = async () => {
        if (decoded) {
            const response = await axios.get(
                `http://localhost:3000/api/v1/orders/user/${decoded?.data?.id}`
            );
            setData(response.data);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    console.log(data);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDetail = async (id: number) => {
        handleShow();
        const response = await axios.get(
            `http://localhost:3000/api/v1/orders/${id}`
        );
        setOrderDetail(response.data);
    };
    return (
        <>
            <HeaderComp />
            <Box className="bg-color-green" paddingY={3} marginTop={8}>
                <Dialog
                    open={show}
                    onClose={handleClose}
                    fullScreen
                    aria-labelledby="contained-modal-title-vcenter"
                    PaperProps={{
                        sx: {
                            borderRadius: "8px",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                        },
                    }}
                >
                    <DialogTitle
                        sx={{
                            backgroundColor: "#f0f0f0",
                            borderBottom: "1px solid #ddd",
                            padding: "16px",
                        }}
                    >
                        Order Detail
                    </DialogTitle>
                    <DialogContent sx={{ padding: "16px" }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell align="right">Tên sản phẩm</TableCell>
                                        <TableCell align="right">Hình ảnh</TableCell>
                                        <TableCell align="right">Số lượng</TableCell>
                                        <TableCell align="right">Giá sản phẩm</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderDetail?.map((item: OrderDetail, i: number) => (
                                        <TableRow
                                            key={i}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell>{i + 1}</TableCell>
                                            <TableCell component="th" scope="row">
                                                {item.productName}
                                            </TableCell>
                                            <TableCell align="right"><img src={item.image} width={"100px"} /></TableCell>
                                            <TableCell align="right">{item.quantity}</TableCell>
                                            <TableCell align="right">{numeral(item.price).format("0, ")}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </DialogContent>

                    <DialogActions>
                        <Button variant="contained" onClick={handleClose}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
                <Container>
                    <Typography variant="h5" marginTop={2}>
                        LỊCH SỬ MUA HÀNG
                    </Typography>
                    <Box>
                        {data?.map((e, i) => (
                            <Box
                                key={i}
                                marginY={2}
                                className="bg-color-white"
                                padding={2}
                                borderRadius={2}
                            >
                                <Typography>
                                    Thời gian đặt hàng:{" "}
                                    {moment(e.orderDate).format("DD-MM-YYYY HH:mm:ss")}.
                                </Typography>
                                <Typography>Địa chỉ giao hàng: {e.shippingAddress}</Typography>
                                <Typography>
                                    Tổng tiền: {numeral(e.totalAmount).format("0,")} VND
                                </Typography>
                                <Typography>
                                    Tình trạng:{" "}
                                    {e.status === 0
                                        ? "Đang xử lý"
                                        : e.status === 1
                                            ? "Đang giao hàng"
                                            : e.status === 2
                                                ? "Đã giao hàng"
                                                : "Đã bị huỷ"}
                                </Typography>
                                <Box>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleDetail(e.orderId)}
                                    >
                                        Xem chi tiết
                                    </Button>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default OrderHistoryPage;
