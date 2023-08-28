import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { Distance } from "@/services/api";

interface DistancesSectionProps {
  distances: Distance[];
  totalDistance: number;
}

const DistancesSection: React.FC<DistancesSectionProps> = ({
  distances,
  totalDistance,
}) => (
  <div>
    <Typography variant="h6">Distances:</Typography>
    <List>
      {distances.map((distance, index) => (
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
          primary={`Total Distance: ${totalDistance.toFixed(2)} km`}
        />
      </ListItem>
    </List>
  </div>
);

export default DistancesSection;
