import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CandidateCard({
  candidName,
  family,
  pic,
  achivement,
  handleDelete,
  handleUpdate,
  id,
}) {
  return (
    <Card sx={{ maxWidth: 200, minWidth: 200 }}>
      <CardMedia component="img" height="140" image={pic} alt={candidName} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {candidName} {family}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {achivement}
        </Typography>
      </CardContent>
      <CardActions>
        <Button id={id} onClick={handleDelete} size="small">
          Delete
        </Button>
        <Button id={id * 2} onClick={handleUpdate} size="small">
          Update
        </Button>
      </CardActions>
    </Card>
  );
}
