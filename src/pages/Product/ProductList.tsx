import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useProductManagement } from "./../../hooks/useProductManagement";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Header from "../../components/Common/Header";

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
  const auth = useAuth();

  const fetchProducts = async () => {
    await useProduct.fetchAllProducts();
  };

  const deleteProduct = async (id: string) => {
    await useProduct.removeProduct(id);
  };

  const buyProduct = async (id: string) => {
    console.log("buy ", id);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setProducts(useProduct.products);
  }, [useProduct.products]);

  return (
    <Box className="product-list-page">
      <Header title="Products" />
      {auth.user.role === "seller" && (
        <Link to="/products/add">Add new Product</Link>
      )}
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
            {products &&
              products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>{product.cost}</TableCell>
                  <TableCell>{product.amountAvailable}</TableCell>

                  {auth.user.role === "seller" && (
                    <TableCell>
                      <Link to={`/products/edit/${product._id}`}>Edit</Link> |
                      <Button onClick={() => deleteProduct(product._id)}>
                        Delete
                      </Button>
                    </TableCell>
                  )}

                  {auth.user.role === "buyer" && (
                    <TableCell>
                      <Button onClick={() => buyProduct(product._id)}>
                        Buy
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductList;
