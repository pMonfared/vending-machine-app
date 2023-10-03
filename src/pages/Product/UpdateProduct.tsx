import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import {
  Product,
  useProductManagement,
} from "../../hooks/useProductManagement";
import { useAppSelector } from "../../hooks";
import { Grid } from "@mui/material";

const UpdateProduct: React.FC<{}> = () => {
  const { id } = useParams();
  const [error, setError] = React.useState("");
  const [productName, setProductName] = useState("");
  const [cost, setCost] = useState<number>(0);
  const [amountAvailable, setAmountAvailable] = useState<number>(0);
  const productHook = useProductManagement();
  const navigate = useNavigate();

  const products = useAppSelector(
    (state: any) => state.productManagment.products
  );

  useEffect(() => {
    function fetchProduct() {
      const product = products?.find((p: Product) => p._id === id);
      if (product) {
        setProductName(product?.productName);
        setCost(product?.cost);
        setAmountAvailable(product?.amountAvailable);
      }
    }

    fetchProduct();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id) return;

    try {
      await productHook.editProduct(id, {
        productName,
        cost,
        amountAvailable,
      });

      navigate("/products");
    } catch (err: any) {
      console.log(err);
      setError(`${err?.response?.statusText}: ${err?.response?.data?.message}`);
    }
  };

  return (
    <Box className="update-product-page">
      <Typography variant="h3">Update Product</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="productName"
          label="Name"
          type="text"
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
        />
        <TextField
          id="cost"
          label="Cost"
          type="number"
          value={cost}
          onChange={(event) => setCost(parseInt(event.target.value))}
        />
        <TextField
          id="amountAvailable"
          label="Available amount"
          type="number"
          value={amountAvailable}
          onChange={(event) => setAmountAvailable(parseInt(event.target.value))}
        />
        <Grid item xs={12}>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </Grid>
        <Button variant="contained" type="submit">
          Update Product
        </Button>
      </form>
    </Box>
  );
};

export default UpdateProduct;
