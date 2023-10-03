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
import Header from "../../components/Common/Header";
import { PurchasedProduct } from "../../reducers/productManagementSlice";

const PurchasedProductList: React.FC<{}> = () => {
  const [products, setProducts] = useState<Array<PurchasedProduct>>([]);
  const useProduct = useProductManagement();

  const fetchMyPurchasedProducts = async () => {
    await useProduct.fetchAllMyPurchasedProducts();
  };

  useEffect(() => {
    fetchMyPurchasedProducts();
  }, []);

  useEffect(() => {
    setProducts(useProduct.myPurchasedProducts);
  }, [useProduct.myPurchasedProducts]);

  return (
    <Box className="product-list-page">
      <Header title="Purchased Products" />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>TotalCost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products.map((product) => (
                <TableRow key={product?.productId}>
                  <TableCell>{product?.productName}</TableCell>
                  <TableCell>{product?.quantity}</TableCell>
                  <TableCell>{product?.price}</TableCell>
                  <TableCell>{product?.totalCost}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PurchasedProductList;
