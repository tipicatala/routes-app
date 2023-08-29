import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Typography, CircularProgress, Divider } from "@mui/material";
import { calculateDistance, Distance, citiesDatabase } from "@/services/api";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS for proper styling

import CriteriaSection from "@/components/CriterialSection";
import DistancesSection from "@/components/DistancesSection";

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
    <>
      <Typography
        color="secondary"
        variant="h5"
        textTransform={"uppercase"}
        fontWeight={"bold"}
      >
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
          <CriteriaSection
            from={queryParams.from}
            changes={queryParams.changes}
            to={queryParams.to}
            date={queryParams.date}
            passengers={queryParams.passengers}
          />
          <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
          <DistancesSection {...resultData} />
          <Divider sx={{ margin: "20px 0" }} />
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
              center={[47, 2.3522]} // approximate center of France
              zoom={5}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {/* Render route line */}
              <Polyline
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
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
    </>
  );
};

export default Results;
