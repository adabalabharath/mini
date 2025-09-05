import Drawer from "@mui/material/Drawer";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

const Buy = ({ products }) => {
  const [drawer, setDrawer] = useState(false);
  const [qty,setQty]=useState(1)
   const [size,setSize]=useState(9)
  return (
    <Drawer anchor="bottom" open={drawer} onClose={() => setDrawer(false)}>
      <Typography>Select items to buy</Typography>

     
    </Drawer>
  );
};

export default Buy;
