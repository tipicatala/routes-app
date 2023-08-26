import { useState, useEffect } from "react";
import {
  useLocation,
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";

const Home: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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

  return (
    <div>
      <Typography variant="h4">Search Form</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="From"
          value={data.from}
          onChange={(e) => setData({ ...data, from: e.target.value })}
          required
        />
        <TextField
          label="Change cities"
          value={data.changes.join(", ")}
          onChange={(e) =>
            setData({ ...data, changes: e.target.value.split(", ") })
          }
        />
        <TextField
          label="To"
          value={data.to}
          onChange={(e) => setData({ ...data, to: e.target.value })}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Search
        </Button>
      </form>
    </div>
  );
};

export default Home;
