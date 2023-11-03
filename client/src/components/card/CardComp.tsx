
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import numeral from "numeral";
import "./CardComp.css";
interface Product {
    productId: string;
    name: string;
    source: string;
    price: number;
    size: number;
    refreshrateValue: number;
    resolutionValue: number;
    manufacturerName: string;
}
function CardProduct({ product }: { product: Product }) {


    return (
        <Link to={`/monitors/${product.productId}`} className="card-link">
            <Card className="card-product">
                <CardMedia
                    component="img"
                    alt={product.name}
                    image={product.source}
                    title={product.name}
                />
                <CardContent>
                    <Typography variant="h6" component="div">
                        {product.name}
                    </Typography>
                    <Typography variant="h6" color="red">
                        {numeral(product.price).format("0, ")} VND
                    </Typography>
                    <Typography>
                        <b>Kích thước:</b> {product.size} inches
                    </Typography>
                    <Typography>
                        <b>Tần số quét:</b> {product.refreshrateValue} HZ
                    </Typography>

                    <Typography>
                        <b>Độ phần giải:</b> {product.resolutionValue}
                    </Typography>
                    <Typography>
                        <b>Nhãn hiệu:</b> {product.manufacturerName}
                    </Typography>

                </CardContent>
            </Card>
        </Link>
    );
}

export default CardProduct;
