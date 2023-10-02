import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useProductManagement } from "./../../hooks/useProductManagement";

const CreateProduct: React.FC<{}> = () => {
  const [amountAvailable, setAmountAvailable] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);
  const [productName, setProductName] = useState("");
  const productHook = useProductManagement();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await productHook.addProduct({
        amountAvailable,
        cost,
        productName,
      });

      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className="create-product-page">
      <Typography variant="h3">Create Product</Typography>
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
        <Button variant="contained" type="submit">
          Create Product
        </Button>
      </form>
    </Box>
  );
};

export default CreateProduct;
