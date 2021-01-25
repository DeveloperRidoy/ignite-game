import axios from 'axios';

const Axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    params: {
        key: process.env.NEXT_PUBLIC_API_KEY,
        page_size:10
    }
})

export default Axios

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth() + 1
const currentDate = new Date().getDate()

const currentFormattedYear = `${currentYear}-${currentMonth < 10 ? '0'+currentMonth : currentMonth}-${currentDate < 10 ? '0'+currentDate : currentDate}`

const prevFormattedYear = `${currentYear - 1}-${currentMonth < 10 ? '0' + currentMonth : currentMonth}-${currentDate < 10 ? '0' + currentDate : currentDate}`

const nextFormattedYear = `${currentYear + 1}-${currentMonth < 10 ? '0' + currentMonth : currentMonth}-${currentDate < 10 ? '0' + currentDate : currentDate}`

export const popularGames = `/games?dates=${prevFormattedYear},${currentFormattedYear}&ordering=-rating`
export const upcomingGames = `/games?dates=${currentFormattedYear},${nextFormattedYear}&ordering=-added`
export const newGames = `/games?dates=${prevFormattedYear},${currentFormattedYear}&ordering=-released,-rating`
export const gameDetails = (id) => `/games/${id}`
export const gamescreenshots = (id) => `/games/${id}/screenshots`
export const searchGames = (name) =>  `/games?search=${name}`