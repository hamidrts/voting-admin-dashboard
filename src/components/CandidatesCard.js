import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CandidatesCard({ candidate }) {
  return (
    <Card sx={{ maxWidth: 150 }}>
      <CardMedia
        component="img"
        height="100"
        image={candidate.pic}
        alt={candidate.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {candidate.name} {candidate.family}
        </Typography>
      </CardContent>
    </Card>
  );
}
