import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Divider,
} from "@mui/material";
import {
  calculateDistance,
  Distance,
  City,
  citiesDatabase,
} from "@/services/api";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS for proper styling

const Results: React.FC = () => {
  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());

  const [resultData, setResultData] = useState<{
    totalDistance: number;
    distances: Distance[];
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const selectedCities = queryParams.changes
      ? [queryParams.from, ...queryParams.changes.split(", "), queryParams.to]
      : [queryParams.from, queryParams.to];

    calculateDistance(selectedCities)
      .then((data) => {
        setResultData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setResultData(null);
        setLoading(false);
      });
  }, [queryParams]);

  return (
    <Container
      component={Paper}
      style={{
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography color="text.primary" variant="h4">
        Search Results
      </Typography>
      {loading ? (
        <CircularProgress style={{ marginTop: "20px", color: "#FF6A88" }} />
      ) : !resultData ? (
        <Typography variant="body1" color="error">
          An error occurred while calculating distances.
        </Typography>
      ) : (
        <>
          <div style={{ marginTop: "20px" }}>
            <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
              Search Criteria:
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary={`From: ${queryParams.from}`} />
              </ListItem>
              {queryParams.changes && (
                <ListItem>
                  <ListItemText
                    primary={`Change Cities: ${queryParams.changes}`}
                  />
                </ListItem>
              )}
              <ListItem>
                <ListItemText primary={`Destination: ${queryParams.to}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Date of Trip: ${queryParams.date}`} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Number of Passengers: ${queryParams.passengers}`}
                />
              </ListItem>
            </List>
          </div>
          <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
          <div>
            <Typography
              variant="h6"
              color="primary"
              sx={{
                fontWeight: "bold",
                marginTop: "20px",
              }}
            >
              Distances:
            </Typography>
            <List>
              {resultData.distances.map((distance, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`Distance from ${distance.from} to ${
                      distance.to
                    }: ${distance.distance.toFixed(2)} km`}
                  />
                </ListItem>
              ))}
              <ListItem>
                <ListItemText
                  primary={`Total Distance: ${resultData.totalDistance.toFixed(
                    2
                  )} km`}
                />
              </ListItem>
            </List>
          </div>
          <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
          <div>
            <Typography
              variant="h6"
              sx={{
                color: "text.primary",
                fontWeight: "bold",
                marginTop: "20px",
              }}
            >
              Route Map:
            </Typography>
            <MapContainer
              style={{ height: "400px", marginTop: "10px", width: "500px" }}
              center={[48.8566, 2.3522]} // default center (Paris)
              zoom={5}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {/* Render route line */}
              <Polyline
                positions={resultData.distances.map((distance) => {
                  const fromCity = citiesDatabase.find(
                    (city) => city.name === distance.from
                  );
                  const toCity = citiesDatabase.find(
                    (city) => city.name === distance.to
                  );
                  return [
                    [fromCity?.lat || 0, fromCity?.lon || 0],
                    [toCity?.lat || 0, toCity?.lon || 0],
                  ];
                })}
                color="#007BFF"
              />
            </MapContainer>
          </div>
        </>
      )}
    </Container>
  );
};

export default Results;
