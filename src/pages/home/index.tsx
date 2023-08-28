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
  Paper,
  CircularProgress,
  IconButton,
  Chip,
  InputAdornment,
} from "@mui/material";
import {
  Add as AddIcon,
  LocationOn as LocationOnIcon,
  Remove as RemoveIcon,
  CircleOutlined as CircleIcon,
} from "@mui/icons-material";

import { citiesDatabase } from "@/services/api";
import { Dots } from "@/assets";

import Row from "@/components/Row";

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
        changes: data.changes.join(", "),
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

  const handleAddChangesCityField = () => {
    setData({ ...data, changes: [...data.changes, ""] });
  };

  const handleChangesCityChange = (index: number, value: string) => {
    const updatedChanges = [...data.changes];
    updatedChanges[index] = value;
    setData({ ...data, changes: updatedChanges });
  };

  const handleRemoveChangesCityField = (index: number) => {
    const updatedChanges = data.changes.filter((_, i) => i !== index);
    setData({ ...data, changes: updatedChanges });
  };

  return (
    <Container component={Paper} style={{ padding: "20px", maxWidth: "600px" }}>
      <Row
        input={
          <Typography variant="h4" color="secondary.main">
            Search Form
          </Typography>
        }
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <Grid container alignItems="center">
              <Row
                input={
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
                      />
                    )}
                  />
                }
                leftIcon={<LocationOnIcon color={"primary"} />}
              />
              {data.changes.map((city, index) => (
                <Row
                  input={
                    <Autocomplete
                      id={`Changes-${index}`}
                      options={filteredCities}
                      loading={loadingCities}
                      onInputChange={(_, value) =>
                        handleCityInputChange(_, value)
                      }
                      value={city}
                      onChange={(_, value) =>
                        handleChangesCityChange(index, value || "")
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={`Changes City ${index + 1}`}
                          variant="outlined"
                          fullWidth
                        />
                      )}
                    />
                  }
                  leftIcon={
                    <>
                      <Dots
                        style={{
                          position: "absolute",
                          top: "-55px",
                          transform: "translate(-50%, 0)",
                        }}
                      />
                      <CircleIcon
                        style={{
                          position: "absolute",
                          top: "-8px",
                          width: "12px",
                          height: "12px",
                          transform: "translate(-50%, 0)",
                        }}
                        color="primary"
                      />
                      <Dots
                        style={{
                          position: "absolute",
                          bottom: "-54px",
                          transform: "translate(-50%, 0)",
                        }}
                      />
                    </>
                  }
                  rightIcon={
                    <IconButton
                      onClick={() => handleRemoveChangesCityField(index)}
                    >
                      <RemoveIcon />
                    </IconButton>
                  }
                />
              ))}
              <Row
                input={
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
                      />
                    )}
                  />
                }
                leftIcon={<LocationOnIcon color="primary" />}
              />
              <Row
                input={
                  <Button
                    variant="text"
                    size="small"
                    startIcon={<AddIcon color="secondary" />}
                    onClick={handleAddChangesCityField}
                  >
                    <Typography
                      variant="subtitle2"
                      textTransform={"capitalize"}
                      color="secondary"
                    >
                      Add destination
                    </Typography>
                  </Button>
                }
              />
              <Row
                input={
                  <TextField
                    label="Date of Trip"
                    type="date"
                    value={data.date}
                    onChange={(e) => setData({ ...data, date: e.target.value })}
                    required
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                }
              />
              <Row
                input={
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
                  />
                }
              />
            </Grid>
            <Button variant="contained" color="secondary" type="submit">
              Search
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
