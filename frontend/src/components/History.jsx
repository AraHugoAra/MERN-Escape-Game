import React, { useEffect } from "react";
import { Button, Container, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const History = () => {
  const user = localStorage.getItem("user");
  const userParsed = JSON.parse(user);
  const userId = userParsed.userId;
  const [bookings, setBookings] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const englishTime = ["morning", "afternoon"];
  const frenchTime = ["matin", "après-midi"];
  const frenchDays = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];
  const englishDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const getBookings = async () => {
    try {
      const response = await fetch("http://localhost:3000/bookings/sort/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: userId,
        },
      });
      const json = await response.json();
      setBookings(json.bookings);
    } catch (error) {
      console.log("getHistory error: ", error);
    }
  };

  const getRooms = async () => {
    try {
      const response = await fetch("http://localhost:3000/rooms");
      const json = await response.json();
      // console.log('getR', json.rooms)
      setRooms(json.rooms);
    } catch (error) {
      console.log("get Rooms error");
    }
  };

  const getHistory = () => {
    setLoading(true);
    getBookings();
    getRooms();
  };

  useEffect(() => {
    getHistory();
  }, [updating]);

  useEffect(() => {
    rooms && bookings && setLoading(false);
  }, [rooms, bookings]);

  const getRoom = (roomId) => {
    const room = rooms.filter((room) => room._id === roomId);
    return room[0];
  };

  const deleteBooking = async (body) => {
    try {
      await fetch("http://localhost:3000/bookings/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: body,
        }),
      });
    } catch (error) {
      console.log("Delete error: ", error);
    }
  };

  const updateRooms = async (putBody, roomId) => {
    try {
      await fetch(`http://localhost:3000/rooms/update/${roomId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(putBody),
      });
    } catch (error) {
      console.log("updateRooms error: ", error);
    }
  };

  const handleDelete = async (putBody, deleteBody) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const bookingDay = dayjs(putBody.date).format("dddd");
    const indexDay = days.indexOf(bookingDay);
    const roomId = putBody.roomId;

    const JSDate = new Date();
    const JSDay = JSDate.getDay();
    let indexJS;
    if (JSDay + indexDay < 7) {
      indexJS = JSDay + indexDay;
    } else {
      indexJS = 0;
    }
    let bodyDayIndex;
    if (indexJS + 1 < 7) {
      bodyDayIndex = indexJS + 1;
    } else {
      bodyDayIndex = 0;
    }

    const body = {
      day: days[bodyDayIndex].toLowerCase(),
      morning: true,
      afternoon: true,
    };
    putBody.time === "morning"
      ? (body.afternoon = getRoom(roomId).planning[indexJS].afternoon)
      : (body.morning = getRoom(roomId).planning[indexJS].morning);
    await updateRooms(body, roomId);
    await deleteBooking(deleteBody);
    setUpdating((u) => !u);
  };

  return (
    <Container
      sx={{ maxWidth: "xs", minHeight: "80vh", textAlign: "center", py: 2 }}
    >
      <Typography variant="h5" sx={{ my: 4 }}>
        Historique de vos réservations
      </Typography>
      {!loading && !bookings.length && (
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "3rem",
          }}
        >
          <Typography variant="p">Vous n'avez encore rien réservé.</Typography>
          <Button variant="contained">
            <Link className="link-white" to="/">
              Commencer à réserver
            </Link>
          </Button>
        </Container>
      )}
      {!loading ? (
        <List>
          {bookings.map((booking) => (
            <div key={booking._id}>
              <ListItem>
                <ListItemText
                  primary={`${getRoom(booking.roomId).name}`}
                  secondary={`${
                    frenchTime[englishTime.indexOf(booking.time)]
                  } - ${
                    frenchDays[
                      englishDays.indexOf(dayjs(booking.date).format("dddd"))
                    ]
                  } ${dayjs(booking.date).format("DD/MM")}`}
                />
              </ListItem>
              <IconButton
                onClick={() =>
                  handleDelete(
                    {
                      time: booking.time,
                      date: booking.date,
                      roomId: booking.roomId,
                    },
                    booking._id
                  )
                }
              >
                <DeleteForeverIcon />
              </IconButton>
            </div>
          ))}
        </List>
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default History;
