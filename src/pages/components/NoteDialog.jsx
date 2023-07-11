import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { useGetProductByCategoryQuery } from "state/api/productApi";

const NoteDialog = ({
  open,
  handleClose,
  orderDetail,
  setOrderDetail,
  item,
}) => {
  const { data: toppings = [] } = useGetProductByCategoryQuery(
    "64999531154aae279a13e756"
  );
  const [note, setNote] = useState("");
  const [topping, setTopping] = useState([]);
  const [extraCharge, setExtraCharge] = useState(0);

  const handleToppingChange = (event) => {
    const {
      target: { value },
    } = event;
    let extra = toppings.map((x) => {
      if (x.productName === value[0]) return x.price;
    });
    setExtraCharge(Number(extraCharge) + Number(extra));
    setTopping(typeof value === "string" ? value.split(",") : value);

    console.log(value);
    console.log(extraCharge);
  };

  const handleSave = () => {
    setOrderDetail(
      orderDetail.map((x) =>
        x.productName === item.productName
          ? {
              ...x,
              note: note,
              topping: topping.join(","),
              price: Number(x.price) + Number(extraCharge),
            }
          : x
      )
    );
    setNote("");
    setTopping([]);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Ghi chú</DialogTitle>
      <DialogContent>
        <FormControl margin="dense">
          <FormLabel>Mức đường</FormLabel>
          <RadioGroup row onChange={(e) => setNote(e.target.value)}>
            <FormControlLabel value="0% đường" control={<Radio />} label="0%" />
            <FormControlLabel
              value="25% đường"
              control={<Radio />}
              label="25%"
            />
            <FormControlLabel
              value="50% đường"
              control={<Radio />}
              label="50%"
            />
            <FormControlLabel
              value="75% đường"
              control={<Radio />}
              label="75%"
            />
            <FormControlLabel
              value="100% đường"
              control={<Radio />}
              label="100%"
            />
          </RadioGroup>
        </FormControl>
        <FormControl margin="dense" fullWidth>
          <InputLabel id="demo-multiple-name-label">Topping</InputLabel>
          <Select
            multiple
            value={topping}
            onChange={handleToppingChange}
            input={<OutlinedInput label="Topping" />}
          >
            {toppings.map((x) => (
              <MenuItem key={x._id} value={x.productName}>
                {x.productName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={handleClose}>
          Thoát
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteDialog;
