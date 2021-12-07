import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { fetchHotelsCom, isArrayNull, handleNullObj } from 'lib'
import hotelsData from '../hotelsData'
import { HotelItem } from 'components'

import './Hotels.css'

const Hotels = () => {
    const location = useLocation()
    const { destinationId, checkIn, checkOut, adultsNumber } = location.state
    console.log(destinationId, checkIn, checkOut, adultsNumber)

    const [hotels, setHotels] = useState([])
    const [mapObj, setMapObj] = useState(null)

    useEffect(async () => {
        const hotelsList = await getHotels()
        setHotels(hotelsList)
        const m = L.map('map')
        setMapObj(m)
    }, [])

    const getHotels = async () => {
        // const data = await fetchHotelsCom(`https://hotels-com-provider.p.rapidapi.com/v1/hotels/search?checkin_date=${checkIn}&checkout_date=${checkOut}&sort_order=STAR_RATING_HIGHEST_FIRST&destination_id=${destinationId}&adults_number=${adultsNumber}&locale=ko_KR&currency=KRW`)
        // console.log(data)

        const { searchResults: { results } } = hotelsData
        console.log(results)

        return results
    }


    const displayLocation = (lat, lon, msg) => {
        console.log('inside:', mapObj)

        if (mapObj) {
            const map = mapObj.setView([lat, lon], 13)

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map)

            L.marker([lat, lon]).addTo(map)
                .bindPopup(msg)
                .openPopup()
        }
    }

    return (
        <div className='Hotels-container'>
            <div id="map"></div>
            <p className='resu'>{`총 ${hotels.length}건이 검색되었습니다.`}</p>
            <hr />
            {!isArrayNull(hotels) && hotels.map(hotel => {
                const { name, address, coordinate } = handleNullObj(hotel)
                const { streetAddress, locality, countryName } = handleNullObj(address)
                const { lat, lon } = handleNullObj(coordinate)
                const msg = `${name}<br/>${streetAddress}, ${locality}, ${countryName}`
                displayLocation(lat, lon, msg)
                return (
                    <HotelItem hotel={hotel} key={hotel.id} />
                )
            })}
        </div>
    )
}

export default Hotels