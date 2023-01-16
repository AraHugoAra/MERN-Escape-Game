import React, { useState } from "react";
// import bddesc from '../../../backend/bddesc';
import useFetch from "../utils/useFetch";
import Loader from "./Loader";
import RoomCard from "./RoomCard";

const Home = () => {
  const { data, loading, error } = useFetch("http://localhost:3000/rooms");

  return (
    <>
      {loading || error ? (
        <Loader />
      ) : (
        <ul className="home-list">
          {data.rooms.map((room) => (
            <li key={room._id}>
              <RoomCard
                image={room.img}
                description={room.description}
                title={room.name}
                id={room._id}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Home;
