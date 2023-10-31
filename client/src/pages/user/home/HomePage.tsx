import FooterComp from "../../../components/footer/FooterComp"
import HeaderComp from "../../../components/header/HeaderComp"
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import CardComp from "../../../components/card/CardComp";
function HomePage() {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/monitors");
            if (response.data) {
                setData(response.data.products);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <HeaderComp />
            <Typography variant="h4" marginBottom={2}>
                MÀN HÌNH NỔI BẬT
            </Typography>
            <Grid container spacing={2} paddingBottom={3}>
                {data.map((e, i) => (
                    <Grid item key={i} xs={12} sm={6} md={3}>
                        <CardComp product={e} />
                    </Grid>
                ))}
            </Grid>
            <FooterComp />
        </>
    )
}

export default HomePage