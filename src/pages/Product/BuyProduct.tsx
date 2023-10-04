import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Product,
  useProductManagement,
} from "../../hooks/useProductManagement";
import { Grid } from "@mui/material";

const BuyProduct: React.FC<{
  isOpen: boolean;
  product?: Product;
  onClose?: () => void;
}> = ({ isOpen, product, onClose }) => {
  const productHook = useProductManagement();

  const [error, setError] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState<number>(0);

  React.useEffect(() => {
    setOpen(isOpen);
    setAmount(0);
    if (product?.amountAvailable === 0) {
      setError("Product is out of stock");
    } else setError("");
  }, [isOpen, product]);

  const handleClose = () => {
    setOpen(false);
    setError("");
    setAmount(0);
    if (onClose) onClose();
  };

  const handlePurchase = async () => {
    try {
      if (product) {
        if (amount <= 0) {
          setError("Please enter more than 0");
          return;
        }

        if (product.amountAvailable === 0) {
          setError("Product is out of stock");
          return;
        }

        if (amount > product.amountAvailable) {
          setError(
            "You can't buy more than product available amount: " +
              product.amountAvailable
          );
          return;
        }
        await productHook.purchaseProduct(product._id, amount);
        setAmount(0);
        handleClose();
      }
    } catch (err: any) {
      console.log(err);
      setError(`${err?.response?.statusText}: ${err?.response?.data?.message}`);
    }
  };

  return (
    <div>
      <Dialog open={open || false} onClose={handleClose}>
        <DialogTitle>Purchase {product?.productName}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To buy to this product, please enter Quantity here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="Quantity"
            label="Quantity"
            type="number"
            fullWidth
            variant="standard"
            value={amount}
            onChange={(event) => {
              setAmount(parseInt(event.target.value));
              setError("");
            }}
          />
          <Grid item xs={12}>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePurchase}>Purchase</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BuyProduct;
