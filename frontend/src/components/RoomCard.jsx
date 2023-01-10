import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';

const RoomCard = ({image, title, description, id}) => {
  return (
    <Card sx={{ maxWidth: 345, m: 1 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link sx={{ textDecoration: "none" }} href={`/room/${id}`}>
            Réserver
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}

export default RoomCard;
