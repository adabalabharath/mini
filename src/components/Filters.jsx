import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Rating from "@mui/material/Rating";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  priceFilter,
  genderFilter,
  setSizeFilter,
  ratingFilter,
  clearFilters,
  sortProducts,
} from "../redux/action";
import { useSearchParams } from "react-router-dom";
import Button from "@mui/material/Button";

const Filters = ({ highest }) => {
  const state = useSelector((store) => store.filters);
  const { price, rating, gender, size, sort } = state;
  const [value, setValue] = useState([price.start || 0, price.end || highest]);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(priceFilter(newValue));
  };

  useEffect(() => {
    setValue([price.start ?? 0, price.end ?? highest]);
  }, [highest, price.start, price.end]);

  const handleGenderChange = (g) => {
    const genders = gender.includes(g)
      ? gender.filter((x) => x != g)
      : [...gender, g];
    dispatch(genderFilter(genders));
  };

  const handleSize = (s) => {
    const sizes = size.includes(s) ? size.filter((x) => x != s) : [...size, s];
    dispatch(setSizeFilter(sizes));
  };

  const handlePriceChange = (event) => {
    const newValue = Number(event.target.value);
    const newPrice = [value[0], newValue];
    dispatch(priceFilter(newPrice));
    setValue([value[0], newValue]);
  };

  const handleRating = (rate) => {
    dispatch(ratingFilter(rate));
  };

  const clearAll = () => {
    setValue([0, highest]);
    dispatch(clearFilters);
  };
  const sortOrder = (order) => {
    dispatch(sortProducts(order));
  };

  const applyFilters = () => {
    const params = {};

    if (gender.length > 0) {
      params.gender = gender.join(",");
    }

    if (size.length > 0) {
      params.size = size.join(",");
    }

    if (rating) {
      params.rating = rating;
    }

    if (price.start !== null && price.end !== null) {
      params.priceStart = price.start;
      params.priceEnd = price.end;
    }
    sort === "asc" ? (params.sort = "ASC") : (params.sort = "DESC");
    setSearchParams(
      (prev) => {
        const current = Object.fromEntries(prev.entries());

        if (JSON.stringify(current) !== JSON.stringify(params)) {
          return params;
        }
        return prev;
      },
      { replace: true }
    );
  };
  useEffect(() => {
    applyFilters();
  }, [state]);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        p: 1,
        boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid item sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Filters
        </Typography>
        <Button
          sx={{
            p: 0,
            color: "black",
            border: "1px solid black",
            textTransform: "none",
          }}
          variant="outlined"
          size="small"
          disabled={
            gender.length == 0 &&
            price.start == null &&
            price.end == null &&
            rating == null &&
            size.length == 0
          }
          onClick={clearAll}
        >
          Clear All
        </Button>
      </Grid>
      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
        Gender
      </Typography>
      <Divider />

      <Grid item container direction="column" spacing={1}>
        <Grid item m={0}>
          <Box display={"flex"} alignItems="center">
            <Checkbox
              size="small"
              onChange={() => handleGenderChange("male")}
              sx={{
                "&.Mui-checked": {
                  color: "black",
                },
              }}
              checked={gender.includes("male")}
            />
            <Typography variant="caption">Male</Typography>
          </Box>
          <Box display={"flex"} alignItems="center">
            <Checkbox
              size="small"
              onChange={() => handleGenderChange("female")}
              sx={{
                "&.Mui-checked": {
                  color: "black",
                },
              }}
              checked={gender.includes("female")}
            />
            <Typography variant="caption">Female</Typography>
          </Box>
          <Box display={"flex"} alignItems="center">
            <Checkbox
              size="small"
              onChange={() => handleGenderChange("others")}
              sx={{
                "&.Mui-checked": {
                  color: "black",
                },
              }}
              checked={gender.includes("others")}
            />
            <Typography variant="caption">other</Typography>
          </Box>
        </Grid>
      </Grid>
      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
        Price range
      </Typography>
      <Box sx={{ m: 2, px: 1 }}>
        <Slider
          value={value}
          min={0}
          step={1000}
          max={highest}
          size="small"
          onChange={handleChange}
          valueLabelDisplay="on"
          sx={{
            "& .MuiSlider-valueLabel": {
              backgroundColor: "white",
              color: "black",
              border: "1px solid #ccc",
              boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
            },
            "& .MuiSlider-thumb": {
              color: "black",
            },
            "& .MuiSlider-track": {
              color: "black",
            },
            "& .MuiSlider-rail": {
              color: "#d0d0d0",
            },
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Button
          onClick={() => sortOrder("asc")}
          disabled={sort == "asc"}
          sx={{
            textTransform: "none",
            border: sort == "asc" ? "1px solid transparent" : "1px solid black",
            color: "black",
            maxWidth: "100px",
          }}
        >
          Sort by Asc
        </Button>
        <Button
          onClick={() => sortOrder("des")}
          disabled={sort == "des"}
          sx={{
            textTransform: "none",
            border: sort == "des" ? "1px solid transparent" : "1px solid black",
            color: "black",
            maxWidth: "100px",
          }}
        >
          Sort by Des
        </Button>
      </Box>
      <Grid item container direction="column" spacing={1}>
        <RadioGroup value={value} onChange={handlePriceChange}>
          {highest > 2000 && (
            <FormControlLabel
              value={2000}
              control={
                <Radio
                  size="small"
                  checked={price?.end === 2000 ? true : false}
                  sx={{
                    "&.Mui-checked": { color: "black" },
                  }}
                />
              }
              label={<Typography variant="caption">upto 2000</Typography>}
            />
          )}
          {highest > 5000 && (
            <FormControlLabel
              value={5000}
              control={
                <Radio
                  size="small"
                  checked={price?.end === 5000 ? true : false}
                  sx={{ "&.Mui-checked": { color: "black" } }}
                />
              }
              label={<Typography variant="caption">upto 5000</Typography>}
            />
          )}
          {highest > 7000 && (
            <FormControlLabel
              value={7000}
              control={
                <Radio
                  size="small"
                  checked={price?.end === 7000 ? true : false}
                  sx={{ "&.Mui-checked": { color: "black" } }}
                />
              }
              label={<Typography variant="caption">upto 7000</Typography>}
            />
          )}
          {highest > 10000 && (
            <FormControlLabel
              value={10000}
              control={
                <Radio
                  size="small"
                  checked={price?.end === 10000 ? true : false}
                  sx={{ "&.Mui-checked": { color: "black" } }}
                />
              }
              label={<Typography variant="caption">upto 10000</Typography>}
            />
          )}
        </RadioGroup>
      </Grid>

      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
        ratings
      </Typography>
      <Divider />

      <Grid item container direction="column" spacing={1}>
        <Grid item m={0}>
          <Box display={"flex"} alignItems="center">
            <Checkbox
              size="small"
              checked={rating === 4 ? true : false}
              onChange={() => handleRating(4)}
              sx={{
                "&.Mui-checked": {
                  color: "black",
                },
              }}
            />
            <Rating
              name="read-only"
              value={4}
              readOnly
              size="small"
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "black",
                },
              }}
            />
            <Typography variant="caption" mt={0.7}>
              &nbsp;& above
            </Typography>
          </Box>
          <Box display={"flex"} alignItems="center">
            <Checkbox
              size="small"
              checked={rating === 3 ? true : false}
              onChange={() => handleRating(3)}
              sx={{
                "&.Mui-checked": {
                  color: "black",
                },
              }}
            />
            <Rating
              name="read-only"
              value={3}
              readOnly
              size="small"
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "black",
                },
              }}
            />
            <Typography variant="caption" mt={0.7}>
              &nbsp;& above
            </Typography>
          </Box>
          <Box display={"flex"} alignItems="center">
            <Checkbox
              size="small"
              checked={rating === 2 ? true : false}
              onChange={() => handleRating(2)}
              sx={{
                "&.Mui-checked": {
                  color: "black",
                },
              }}
            />
            <Rating
              name="read-only"
              value={2}
              readOnly
              size="small"
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "black",
                },
              }}
            />
            <Typography variant="caption" mt={0.7}>
              &nbsp;& above
            </Typography>
          </Box>
          <Box display={"flex"} alignItems="center">
            <Checkbox
              size="small"
              checked={rating === 1 ? true : false}
              onChange={() => handleRating(1)}
              sx={{
                "&.Mui-checked": {
                  color: "black",
                },
              }}
            />
            <Rating
              name="read-only"
              value={1}
              readOnly
              size="small"
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "black",
                },
              }}
            />
            <Typography variant="caption" mt={0.7}>
              &nbsp;& above
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
        Size
      </Typography>
      <Divider />

      <Grid item container direction="column" spacing={1}>
        <Grid item m={0}>
          <Box display={"flex"} alignItems="center">
            <Checkbox
              size="small"
              onChange={() => handleSize("xl")}
              sx={{
                "&.Mui-checked": {
                  color: "black",
                },
              }}
              checked={size.includes("xl")}
            />
            <Typography variant="caption">x-Large</Typography>
          </Box>
          <Box display={"flex"} alignItems="center">
            <Checkbox
              size="small"
              onChange={() => handleSize("l")}
              sx={{
                "&.Mui-checked": {
                  color: "black",
                },
              }}
              checked={size.includes("l")}
            />
            <Typography variant="caption">Large</Typography>
          </Box>
          <Box display={"flex"} alignItems="center">
            <Checkbox
              size="small"
              onChange={() => handleSize("m")}
              sx={{
                "&.Mui-checked": {
                  color: "black",
                },
              }}
              checked={size.includes("m")}
            />
            <Typography variant="caption">Medium</Typography>
          </Box>
          <Box display={"flex"} alignItems="center">
            <Checkbox
              size="small"
              onChange={() => handleSize("s")}
              sx={{
                "&.Mui-checked": {
                  color: "black",
                },
              }}
              checked={size.includes("s")}
            />
            <Typography variant="caption">Small</Typography>
          </Box>
          <Box display={"flex"} alignItems="center">
            <Checkbox
              size="small"
              onChange={() => handleSize("xs")}
              sx={{
                "&.Mui-checked": {
                  color: "black",
                },
              }}
              checked={size.includes("xs")}
            />
            <Typography variant="caption">x-Small</Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Filters;
