import React, { useState } from "react";
import { Button, TextField, Container, Grid } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

import { useNavigate } from "react-router-dom";
import Header from "../../components/Common/Header";

function Deposit() {
  const [amount, setAmount] = useState<number>(5);
  const [error, setError] = React.useState("");

  const auth = useAuth();
  const navigate = useNavigate();

  const handleDeposit = async () => {
    const depositAmount = amount;

    if (depositAmount > 0) {
      try {
        await auth.addDeposit(depositAmount);
        setAmount(0);
        setError("");
      } catch (err: any) {
        console.log(err);
        setError(
          `${err?.response?.statusText}: ${err?.response?.data?.message}`
        );
      }
    }
  };

  const handleResetDeposit = async () => {
    try {
      await auth.resetDeposit();
      setAmount(0);
      setError("");
    } catch (err: any) {
      console.log(err);
      setError(`${err?.response?.statusText}: ${err?.response?.data?.message}`);
    }
  };

  return (
    <div>
      <Header title="Deposit Money" />
      <Container component="main" maxWidth="xs">
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="amount"
            label="Deposit Amount"
            name="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleDeposit}
          >
            Deposit
          </Button>

          <Grid item xs={12}>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </Grid>

          <Button
            style={{ marginTop: 10 }}
            type="button"
            fullWidth
            variant="contained"
            color="warning"
            onClick={handleResetDeposit}
          >
            Reset Deposit
          </Button>

          <Button
            style={{ marginTop: 10 }}
            type="button"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default Deposit;
