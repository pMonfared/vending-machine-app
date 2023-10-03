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
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Header from "../../components/Common/Header";
import BuyProduct from "./BuyProduct";

interface Product {
  _id: string;
  productName: string;
  cost: number;
  amountAvailable: number;
  // Add other fields as needed
}

const ProductList: React.FC<{}> = () => {
  const navigate = useNavigate();

  const [buyProductDialogIsOpen, setBuyProductDialogIsOpen] =
    React.useState<boolean>(false);
  const [buyTheProduct, setBuyProduct] = React.useState<Product>();

  const [products, setProducts] = useState<Array<Product>>([]);
  const useProduct = useProductManagement();
  const auth = useAuth();

  const fetchProducts = async () => {
    await useProduct.fetchAllProducts();
  };

  const deleteProduct = async (id: string) => {
    await useProduct.removeProduct(id);
  };

  const buyProduct = (id: string) => {
    if (auth.deposit === 0) {
      navigate("/deposit");
    } else {
      setBuyProduct(products.find((p) => p._id === id));
      setBuyProductDialogIsOpen(true);
    }
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
        <div style={{ marginTop: 10, marginLeft: 10 }}>
          <Button
            color="primary"
            type="button"
            variant="contained"
            onClick={() => navigate("/products/add")}
          >
            Add new Product
          </Button>
        </div>
      )}

      <BuyProduct
        isOpen={buyProductDialogIsOpen}
        onClose={() => {
          setBuyProductDialogIsOpen(false);
          setBuyProduct(undefined);
        }}
        product={buyTheProduct}
      />

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
                <TableRow key={product?._id}>
                  <TableCell>{product?.productName}</TableCell>
                  <TableCell>{product?.cost}</TableCell>
                  <TableCell>{product?.amountAvailable}</TableCell>

                  {auth.user.role === "seller" && (
                    <TableCell>
                      <Link to={`/products/edit/${product?._id}`}>Edit</Link> |
                      <Button onClick={() => deleteProduct(product?._id)}>
                        Delete
                      </Button>
                    </TableCell>
                  )}

                  {auth.user.role === "buyer" && (
                    <TableCell>
                      <Button onClick={() => buyProduct(product?._id)}>
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
