import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { FormControl, InputLabel } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebase";
import Swal, { SweetAlertOptions } from "sweetalert2";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

interface Product {
    manufacturerId: string;
    name: string;
    detail: string;
    description: string;
    size: number;
    resolutionId: string;
    refreshRateId: string;
    quantity: number;
    price: number;
}

interface Manufacturer {
    manufacturerId: number;
    name: string;
}

interface Resolution {
    resolutionId: number;
    resolutionValue: string;
}

interface RefreshRate {
    refreshrateId: number;
    refreshrateValue: number;
}


const schema = yup.object().shape({
    manufacturerId: yup.string().required("Manufacturer is required"),
    name: yup
        .string()
        .max(255, "string must not be longer than 255 characters")
        .required("Name is required"),
    detail: yup
        .string()
        .max(255, "string must not be longer than 255 characters")
        .required("Detail is required"),
    description: yup
        .string()
        .max(1000, "string must not be longer than 1000 characters")
        .required("Description is required"),
    size: yup
        .number()
        .min(10, "Min is 10")
        .required("Screen Size is required"),
    resolutionId: yup.string().required("Screen Resolution is required"),
    refreshRateId: yup
        .string()
        .required("Refresh Rate is required"),
    quantity: yup
        .number()
        .min(1, "Min is 1")
        .required("Quantity is required")
        .positive()
        .integer(),
    price: yup
        .number()
        .min(1, "Min is 1")
        .required("Price is required")
        .positive(),
});

export default function AddProductPage() {
    const navigate = useNavigate();
    const [manufacturer, setManufacturer] = useState<Manufacturer[]>([]);
    const [resolution, setResolution] = useState<Resolution[]>([]);
    const [refreshRate, setRefreshRate] = useState<RefreshRate[]>([])
    // const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrlAvatar, setImageUrlAvatar] = useState<string | null>(null);
    // const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    const [optionalImages, setOptionalImages] = useState<string[]>([]);
    // const handleImageChange = (e) => {
    //   setSelectedImage(e.target.files[0]);
    //   setSelectedImageUrl(URL.createObjectURL(e.target.files[0]));
    // };

    const fetchData = async () => {
        const manufacturerRes = await axios.get("http://localhost:3000/api/v1/manufacturers");
        const resolutionRes = await axios.get("http://localhost:3000/api/v1/resolutions")
        const refreshRateRes = await axios.get("http://localhost:3000/api/v1/refreshrates")
        setManufacturer(manufacturerRes.data);
        setResolution(resolutionRes.data);
        setRefreshRate(refreshRateRes.data);
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // if (!selectedImage) return;
        const selectedImage = e.target.files?.[0];
        // let selectedImageUrl = URL.createObjectURL(e.target.files[0]);
        if (selectedImage) {
            const storageRef = ref(storage, `images/${selectedImage.name}`);
            uploadBytes(storageRef, selectedImage)
                .then((snapshot) => getDownloadURL(snapshot.ref))
                .then((url) => {
                    setImageUrlAvatar(url);
                    // setSelectedImageUrl(null);
                    Swal.fire({
                        icon: "success",
                    });
                })
                .catch((error) => {
                    console.error("Error uploading image:", error);
                });
        }
    };

    const handleMultipleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        const uploadPromises = [];
        if (files && files.length > 0) {
            // Rest of your code
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const storageRef = ref(storage, `images/${file.name}`);
                const uploadTask = uploadBytes(storageRef, file);
                uploadPromises.push(uploadTask);
            }

            Promise.all(uploadPromises)
                .then((snapshots) => {
                    const downloadUrls: string[] = [];

                    snapshots.forEach((snapshot) => {
                        getDownloadURL(snapshot.ref).then((url) => {
                            downloadUrls.push(url);

                            // Kiểm tra xem đã tải lên tất cả ảnh chưa và xử lý sau khi tải lên hoàn thành.
                            if (downloadUrls.length === files.length) {
                                // downloadUrls chứa các đường dẫn tải về của tất cả các ảnh.
                                console.log(downloadUrls);
                                setOptionalImages(downloadUrls);
                                Swal.fire({
                                    icon: "success",
                                });
                            }
                        });
                    });
                })
                .catch((error) => {
                    console.error("Error uploading images:", error);
                });
        }

    };

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: Product) => {
        console.log(data);

        if (!imageUrlAvatar) {
            Swal.fire({
                icon: "error",
                title: "Avatar is not null",
                timer: 2000,
            });
            return;
        } else {
            if (imageUrlAvatar) {
                const newProduct = { ...data, avatar: imageUrlAvatar, optionalImages };
                console.log(newProduct);
                try {
                    const response: AxiosResponse = await axios.post(
                        "http://localhost:3000/api/v1/monitors",
                        newProduct
                    );
                    console.log(response.status);

                    if (response.status === 201) {
                        Swal.fire({
                            icon: "success",
                            title: "Add product successfully",
                            timer: 2000,
                        });
                        navigate("/admin/products");
                    }
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: error,
                    } as SweetAlertOptions);
                }
            }
        }
    };


    return (
        <ThemeProvider theme={defaultTheme}>

            <Container>
                <Button onClick={() => navigate(-1)} variant="contained" sx={{
                    marginTop: 8,
                    marginBottom: 3
                }}>
                    Back
                </Button>
                <Box

                >
                    <Typography component="h1" variant="h5">
                        Add a product
                    </Typography>

                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box marginTop={2}>
                                    <Controller
                                        defaultValue=""
                                        name="name"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                variant="outlined"
                                                fullWidth
                                                label="Name"
                                                error={!!errors?.name}
                                                helperText={errors?.name?.message}
                                            />
                                        )}
                                    />
                                </Box>
                                <Box marginTop={2}>
                                    <Controller
                                        defaultValue=""
                                        name="detail"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                variant="outlined"
                                                fullWidth
                                                label="Detail"
                                                error={!!errors?.detail}
                                                helperText={errors?.detail?.message}
                                            />
                                        )}
                                    />
                                </Box>


                                <Box marginTop={2}>
                                    {" "}
                                    <Controller
                                        defaultValue={0}
                                        name="size"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                variant="outlined"
                                                fullWidth
                                                label="Screen size"
                                                error={!!errors?.size}
                                                helperText={errors?.size?.message}
                                            />
                                        )}
                                    />
                                </Box>

                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                {" "}
                                <Box marginTop={2}>
                                    {" "}
                                    <Controller
                                        defaultValue=""
                                        name="manufacturerId"
                                        control={control}
                                        render={({ field }) => (
                                            <FormControl fullWidth error={!!errors.manufacturerId}>
                                                <InputLabel>Manufacturer</InputLabel>
                                                <Select {...field} label="Manufacturer">
                                                    {manufacturer?.map((e, i) => (
                                                        <MenuItem key={i} value={e.manufacturerId}>
                                                            {e.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {errors.manufacturerId ? (
                                                    <Typography color={"error"} fontSize={"12px"}>
                                                        {errors.manufacturerId.message}
                                                    </Typography>
                                                ) : (
                                                    <></>
                                                )}
                                            </FormControl>
                                        )}
                                    />
                                </Box>
                                <Box marginTop={2}>
                                    {" "}
                                    <Controller
                                        defaultValue=""
                                        name="resolutionId"
                                        control={control}
                                        render={({ field }) => (
                                            <FormControl fullWidth error={!!errors.resolutionId}>
                                                <InputLabel>Resolution</InputLabel>
                                                <Select {...field} label="Resolution">
                                                    {resolution?.map((e, i) => (
                                                        <MenuItem key={i} value={e.resolutionId}>
                                                            {e.resolutionValue}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {errors.resolutionId ? (
                                                    <Typography color={"error"} fontSize={"12px"}>
                                                        {errors.resolutionId.message}
                                                    </Typography>
                                                ) : (
                                                    <></>
                                                )}
                                            </FormControl>
                                        )}
                                    />
                                </Box>


                                <Box marginTop={2}>
                                    {" "}
                                    <Controller
                                        defaultValue=""
                                        name="refreshRateId"
                                        control={control}
                                        render={({ field }) => (
                                            <FormControl fullWidth error={!!errors.refreshRateId}>
                                                <InputLabel>Refresh Rate</InputLabel>
                                                <Select {...field} label="Refresh Rate">
                                                    {refreshRate?.map((e, i) => (
                                                        <MenuItem key={i} value={e.refreshrateId}>
                                                            {e.refreshrateValue}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {errors.refreshRateId ? (
                                                    <Typography color={"error"} fontSize={"12px"}>
                                                        {errors.refreshRateId.message}
                                                    </Typography>
                                                ) : (
                                                    <></>
                                                )}
                                            </FormControl>
                                        )}
                                    />
                                </Box>

                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>




                                <Box marginTop={2}>
                                    {" "}
                                    <Controller
                                        defaultValue={0}
                                        name="quantity"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                variant="outlined"
                                                fullWidth
                                                label="Quantity"
                                                error={!!errors?.quantity}
                                                helperText={errors?.quantity?.message}
                                            />
                                        )}
                                    />
                                </Box>
                                <Box marginTop={2}>
                                    {" "}
                                    <Controller
                                        defaultValue={0}
                                        name="price"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                variant="outlined"
                                                fullWidth
                                                label="Price"
                                                error={!!errors?.price}
                                                helperText={errors?.price?.message}
                                            />
                                        )}
                                    />
                                </Box>
                                <Box marginTop={2}>
                                    <Controller
                                        defaultValue=""
                                        name="description"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                variant="outlined"
                                                fullWidth
                                                label="Description"
                                                error={!!errors?.description}
                                                helperText={errors?.description?.message}
                                            />
                                        )}
                                    />
                                </Box>


                            </Grid>
                        </Grid>
                        <Box>
                            <Typography variant="h4">Avatar</Typography>
                            <input type="file" onChange={handleAvatarUpload} />

                            {/* {imageUrlAvatar ? (
                <img src={imageUrlAvatar} alt="" width={"350px"} />
              ) : (
                <></>
              )} */}
                        </Box>
                        <Box>
                            <Typography variant="h4">Optional Images</Typography>
                            <input
                                type="file"
                                name="optional-image"
                                id="optional-image"
                                multiple
                                onChange={handleMultipleImageUpload}
                            />
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            ADD
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
}
