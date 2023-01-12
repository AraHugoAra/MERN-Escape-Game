import { Button, Typography } from "@mui/material"
import dayjs from 'dayjs';

const RoomPlanning = ({ planning, roomId, setUpdating }) => {
    const frenchDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
    const englishDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    const user = localStorage.getItem('user')
    const userParsed = JSON.parse(user)

    async function putFetch(body) {
        try {
            await fetch(`http://localhost:3000/rooms/update/${roomId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(body)
            })
            setUpdating(u => !u)
        }
        catch(error) {
            console.log('Updating error: ', error)
            setUpdating(u => !u)
        }
    }

    async function postFetch(body) {
        const token = userParsed.token
        try {
            await fetch(`http://localhost:3000/bookings/add/`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify(body)
            })
        }
        catch(error) {
            console.log('POST booking error: ', error)
        }
    }

    function handleBooking(day, time, userParsed) {
        if(userParsed === null) return
        const putBody = {
            day: day.day,
            morning: day.morning,
            afternoon: day.afternoon
        }
        time === "morning" && (
            putBody.morning = false
        )
        time === "afternoon" && (
            putBody.afternoon = false
        )
        const postBody = {
            userId: userParsed.userId,
            roomId: roomId,
            time: time,
            date: dayjs().format('YYYY-MM-DD')
        }
        if(userParsed.userId) {
            putFetch(putBody)
            postFetch(postBody)
        }
    }

    return(
            <div>
                <Typography variant="h6">Disponibilités</Typography>
                <ul className="planning-week">
                    {planning.map((day,index) => (
                        <li className="planning-day" key={day.day}>
                            <Typography>
                                {frenchDays[englishDays.indexOf(dayjs(`2023-07-${1+index}`).format(`dddd`))]}
                                {" "}
                                {dayjs(`2023-07-${1+index}`).format(`DD/MM`)}
                            </Typography>
                            <div className="planning-buttons">
                                <Button 
                                    sx={{ mx: 1 }}
                                    variant="contained"
                                    color="success"
                                    disabled={!day.morning}
                                    onClick={() => handleBooking(day, "morning", userParsed)}
                                >
                                    Matin
                                </Button>
                                <Button
                                    sx={{ mx: 1 }}
                                    color="success"
                                    variant="contained"
                                    disabled={!day.afternoon}
                                    onClick={() => handleBooking(day, "afternoon", userParsed)}
                                >
                                    Aprèm
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
    )
}

export default RoomPlanning