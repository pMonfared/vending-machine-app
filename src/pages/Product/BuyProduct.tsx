import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Product } from "../../hooks/useProductManagement";

const BuyProduct: React.FC<{
  isOpen: boolean;
  product?: Product;
  onClose?: () => void;
}> = ({ isOpen, product, onClose }) => {
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState<number>(0);

  React.useEffect(() => {
    console.log("IsOpen", isOpen);
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  const handlePurchase = () => {
    setAmount(0);
  };

  return (
    <div>
      <Dialog open={open || false} onClose={handleClose}>
        <DialogTitle>Purchase {product?.productName}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To buy to this product, please choose Quantity amount here.
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
            onChange={(event) => setAmount(parseInt(event.target.value))}
          />
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
