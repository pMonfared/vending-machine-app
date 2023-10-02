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

interface Product {
  _id: number;
  productName: string;
  cost: number;
  // Add other fields as needed
}

const ProductList: React.FC<{}> = () => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const useProduct = useProductManagement();

  useEffect(() => {
    async function fetchProducts() {
      await useProduct.fetchAllProducts();
      setProducts(useProduct.products);
    }

    fetchProducts();
  }, [useProduct]);

  return (
    <Box className="product-list-page">
      <Typography variant="h3">Product List</Typography>
      <Link to="/products/add">Add new Product</Link>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product._id}</TableCell>
                <TableCell>{product.productName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductList;
