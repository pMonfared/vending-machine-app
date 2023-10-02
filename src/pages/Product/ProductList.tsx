import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useProductManagement } from "./../../hooks/useProductManagement";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

interface Product {
  _id: string;
  productName: string;
  cost: number;
  amountAvailable: number;
  // Add other fields as needed
}

const ProductList: React.FC<{}> = () => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const useProduct = useProductManagement();

  const fetchProducts = async () => {
    await useProduct.fetchAllProducts();
  };

  const deleteProduct = async (id: string) => {
    await useProduct.removeProduct(id);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setProducts(useProduct.products);
    console.log("refreshed", Math.random());
  }, [useProduct.products]);

  return (
    <Box className="product-list-page">
      <Typography variant="h3">Product List</Typography>
      <Link to="/products/add">Add new Product</Link>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Available</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.cost}</TableCell>
                <TableCell>{product.amountAvailable}</TableCell>

                <TableCell>
                  <Link to={`/products/edit/${product._id}`}>Edit</Link> |
                  <Button onClick={() => deleteProduct(product._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductList;
