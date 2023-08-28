import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

interface CriteriaSectionProps {
  from: string;
  changes?: string;
  to: string;
  date: string;
  passengers: string;
}

const CriteriaSection: React.FC<CriteriaSectionProps> = ({
  from,
  changes,
  to,
  date,
  passengers,
}) => (
  <div style={{ marginTop: "20px" }}>
    <Typography variant="h6">Search Criteria:</Typography>
    <List>
      <ListItem>
        <ListItemText primary={`From: ${from}`} />
      </ListItem>
      {changes && (
        <ListItem>
          <ListItemText primary={`Change Cities: ${changes}`} />
        </ListItem>
      )}
      <ListItem>
        <ListItemText primary={`Destination: ${to}`} />
      </ListItem>
      <ListItem>
        <ListItemText primary={`Date of Trip: ${date}`} />
      </ListItem>
      <ListItem>
        <ListItemText primary={`Number of Passengers: ${passengers}`} />
      </ListItem>
    </List>
  </div>
);

export default CriteriaSection;
