import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material'
import { useState } from 'react';
import dayjs from 'dayjs'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const History = () => {
    const user = localStorage.getItem('user')
    const userParsed = JSON.parse(user)
    const userId = userParsed.userId
    const [ bookings, setBookings ] = useState(null)
    const [ rooms, setRooms ] = useState(null)
    const [ loading, setLoading ] = useState(true)

    const englishTime = ["morning", "afternoon"]
    const frenchTime = ["matin", "après-midi"]
    const frenchDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
    const englishDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]


    const getBookings = async () => {
        try {
            const response = await fetch('http://localhost:3000/bookings/sort/user', {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': userId
            }})
            const json = await response.json()
            setBookings(json.bookings)
        }
        catch(error) {
            console.log('getHistory error: ', error)
        }
    }

    const getRooms = async () => {
        try {
            const response = await fetch('http://localhost:3000/rooms')
            const json = await response.json()
            // console.log('getR', json.rooms)
            setRooms(json.rooms)
        }
        catch(error) {
            console.log('get Rooms error')
        }
    }

    const getHistory = () => {
        setLoading(true)
        getBookings()
        getRooms()
    }

    useEffect(() => {
        getHistory()
    }, [])

    useEffect(() => {
        (rooms && bookings) && setLoading(false)
    }, [rooms, bookings])

    const getRoomName = (roomId) => {
        const roomName = rooms.filter(room => room._id === roomId)
        return roomName[0].name
    }

    return (
        <Container sx={{ maxWidth : "xs"}}>
            <Typography variant="h5">
                Historique de vos réservations
            </Typography>
            {!loading && (
                <List>
                    {bookings.map(booking => (
                    <ListItem key={booking._id}>
                        <ListItemText
                        primary={`${getRoomName(booking.roomId)}`}
                        secondary={
                            `${frenchTime[englishTime.indexOf(booking.time)]} - ${frenchDays[englishDays.indexOf(dayjs(booking.date).format('dddd'))]} ${dayjs(booking.date).format('DD/MM')}`
                        }
                        />
                    </ListItem>
                    ))}
                </List>
            )}
        </Container>
    );
}

export default History;

// <>
//             <ul>
//                 {bookings.map(booking => (
//                     <li key={booking._id}>
//                         {getRoomName(booking.roomId)}
//                         {frenchTime[englishTime.indexOf(booking.time)]}
//                         {frenchDays[englishDays.indexOf(dayjs(booking.date).format('dddd'))]}
//                         {dayjs(booking.date).format('DD/MM')}
//                     </li>
//                 ))}
//             </ul>