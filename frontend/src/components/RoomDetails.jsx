import { NavLink, useParams } from "react-router-dom";

// import bddesc from "../../../backend/bddesc"

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import RoomPlanning from "./RoomPlanning";
import { Container } from "@mui/system";
import useFetch from "../utils/useFetch";
import Loader from "./Loader";

const RoomDetails = () => {
  let { roomId } = useParams();
  const [updating, setUpdating] = React.useState(false);
  const { data, loading, error } = useFetch(
    `http://localhost:3000/rooms/${roomId}`,
    updating
  );

  return (
    <>
      {loading || error ? (
        <Loader />
      ) : (
        <Container sx={{ maxWidth: "xs" }}>
          <Card sx={{ maxWidth: 1000, m: 3 }}>
            <CardMedia
              image={data.room[0].img}
              component="img"
              title={data.room[0].name}
              sx={{ maxHeight: 400 }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {data.room[0].name}
              </Typography>
              <Typography sx={{ mb: 2 }} variant="body2" color="text.secondary">
                {data.room[0].description}
              </Typography>
              <RoomPlanning
                planning={data.room[0].planning}
                roomId={roomId}
                setUpdating={setUpdating}
              />
            </CardContent>
            <CardActions>
              <Button size="small">
                <NavLink to="/" className="link-blue">
                  Retour
                </NavLink>
              </Button>
            </CardActions>
          </Card>
        </Container>
      )}
    </>
  );
};

export default RoomDetails;
