import { useState, useEffect } from "react";
import {
  useLocation,
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Container,
  Autocomplete,
} from "@mui/material";

import { citiesDatabase } from "@/services/api";

const Home: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [loadingCities, setLoadingCities] = useState<boolean>(false);

  const [data, setData] = useState({
    changes: [""],
    from: "",
    to: "",
    date: "",
    passengers: 1,
  });

  const parseQueryParams = () => {
    const queryParams = Object.fromEntries(searchParams.entries());
    setData({
      from: queryParams.from || "",
      changes: queryParams.changes?.split(", ") || [""],
      to: queryParams.to || "",
      date: queryParams.date || "",
      passengers: parseInt(queryParams.passengers || "1", 10),
    });
  };

  useEffect(() => {
    parseQueryParams();
  }, [location.search]);

  const handleSubmit = () => {
    navigate({
      pathname: "results",
      search: createSearchParams({
        ...data,
        passengers: data.passengers.toString(),
      }).toString(),
    });
  };

  const handleCityInputChange = (
    event: React.ChangeEvent<object>,
    value: string
  ) => {
    if (value) {
      setLoadingCities(true);
      // API call for city suggestions
      setTimeout(() => {
        const suggestions = citiesDatabase
          .filter((city) =>
            city.name.toLowerCase().includes(value.toLowerCase())
          )
          .map((city) => city.name);

        setFilteredCities(suggestions);
        setLoadingCities(false);
      }, 300);
    } else {
      setFilteredCities([]);
    }
  };

  return (
    <div>
      <Container>
        <Typography variant="h4">Search Form</Typography>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <Autocomplete
              id="From"
              options={filteredCities}
              loading={loadingCities}
              onInputChange={handleCityInputChange}
              value={data.from}
              onChange={(event, value) =>
                setData({ ...data, from: value || "" })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="From"
                  required
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
              )}
            />
            <TextField
              fullWidth
              label="Change cities"
              sx={{ marginBottom: 2 }}
              value={data.changes.join(", ")}
              onChange={(e) =>
                setData({ ...data, changes: e.target.value.split(", ") })
              }
            />
            <Autocomplete
              id="To"
              options={filteredCities}
              loading={loadingCities}
              onInputChange={handleCityInputChange}
              value={data.to}
              onChange={(event, value) =>
                setData({ ...data, to: value || "" })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="To"
                  required
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
              )}
            />
            <TextField
              label="Date of Trip"
              type="date"
              value={data.date}
              onChange={(e) => setData({ ...data, date: e.target.value })}
              required
              fullWidth
              sx={{ marginBottom: 2 }}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Number of Passengers"
              type="number"
              value={data.passengers}
              onChange={(e) =>
                setData({
                  ...data,
                  passengers: parseInt(e.target.value, 10),
                })
              }
              required
              fullWidth
              variant="outlined"
              inputProps={{ min: 1 }}
              sx={{ marginBottom: 2 }}
            />
            <Button variant="contained" color="primary" type="submit">
              Search
            </Button>
          </form>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
