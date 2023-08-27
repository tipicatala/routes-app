import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { calculateDistance, Distance } from "@/services/api";

const Results: React.FC = () => {
  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());

  const [resultData, setResultData] = useState<
    | {
        totalDistance: number;
        distances: Distance[];
      }
    | null
    | Record<string, never>
  >({});

  console.log(queryParams, searchParams)

  useEffect(() => {
    const selectedCities = queryParams.changes
      ? [queryParams.from, ...queryParams.changes, queryParams.to]
      : [queryParams.from, queryParams.to];

    calculateDistance(selectedCities)
      .then((data) => setResultData(data))
      .catch((error) => {
        console.error(error);
        setResultData(null);
      });
  }, [queryParams]);

  return (
    <Container component={Paper} style={{ padding: "20px" }}>
      <Typography variant="h4">Search Results</Typography>
      {!resultData ? (
        <Typography variant="body1">
          An error occurred while calculating distances.
        </Typography>
      ) : Object.keys(resultData).length ? (
        <div>
          <Typography variant="h6">Search Criteria:</Typography>
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
          <Typography variant="h6">Distances:</Typography>
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
      ) : (
        "loading..."
      )}
    </Container>
  );
};

export default Results;
