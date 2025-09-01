import Grid from '@mui/material/Grid'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import React, { useEffect, useState } from 'react'
import Filters from './Filters'
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import TuneIcon from "@mui/icons-material/Tune";
import Drawer from '@mui/material/Drawer'
const ShopWomen = () => {
  const [femaleProducts,setFemaleProducts]=useState([])
  const [drawerFilters, setDrawerFilters] = useState(false);
  const data =useSelector((store)=>store.products)
    useEffect(() => {
      const women=data.filter(x=>x.gender=='female')
      setFemaleProducts(women);
    }, [data]);
  return (
   <Grid container sx={{ mt: 2, justifyContent: "space-between" }}>
      <Grid size={2} sx={{ display: { xs: "none", md: "block" } }}>
        <Filters />
      </Grid>
      <Grid
        size={{ xs: 12, sm: 12, md: 10 }}
        sx={{
          display: "flex",
          flexWrap: "wrap",

          justifyContent: "space-between",
        }}
      >
        <Grid
          size={12}
          sx={{
            display: {
              xs: "block",
              md: "none",
              lg: "none",
              textAlign: "center",
            },
          }}
        >
          <Button
            variant="filled"
            fullWidth
            sx={{ textTransform: "none" }}
            onClick={() => setDrawerFilters(true)}
          >
            <TuneIcon /> Apply Filters
          </Button>
          <Drawer
            anchor="left"
            open={drawerFilters}
            onClose={() => setDrawerFilters(false)}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <Filters />
          </Drawer>
        </Grid>
        {femaleProducts?.map((product) => (
          <Grid
            size={{ xs: 5.4, sm: 5.4, md: 2 }}
            key={product.id}
            sx={{ textAlign: "center", border: "1px solid black", m: 1 }}
          >
            <img
              src={product.imageUrl}
              alt={product.productName}
              style={{ maxWidth: "100%" }}
            />
            <Typography variant="subtitle2">{product.productName}</Typography>
            <Typography variant="subtitle2">
              Price: {product.price}/-
            </Typography>
            <Typography variant="subtitle2">
              Rating:{" "}
              <Rating
                value={product.rating}
                readOnly
                size="small"
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "black",
                  },
                }}
              />
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default ShopWomen