"use client"
import {createContext,useContext, useState, useEffect} from 'react'
import {toast } from 'react-hot-toast'
import {useRouter} from 'next/navigation'

    const baseURL = process.env.NEXT_PUBLIC_BASE_URL
    const currency = process.env.NEXT_PUBLIC_CURRENCY

export const AppContext = createContext();

export const AppProvider = ({ children}) => {
    const router = useRouter()


    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [isOwner, setIsOwner] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [pickupDate, setPickupDate] = useState('')
    const [returnDate, setReturnDate] = useState('')
    const[cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)  

        //function to check if user id logged in
    const fetchUser = async () => {
    try {
        const res = await fetch(`${baseURL}/api/user/data`, {
            method: 'GET',
            headers: {
                'Authorization': token || '',
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        if (data.success) {
            setUser(data.user);
            setIsOwner(data.user.role === 'owner');
        } else {
            setUser(null);
            setIsOwner(false);
        }
    } catch (error) {
        console.log('Fetch user failed:', error);
        toast.error(error.message || 'Failed to fetch user');
        setUser(null);
        setIsOwner(false);
    } finally {
        setLoading(false); // Always end loading
    }
}


        //function to fetch all cars from the server
        const fetchCars = async () => {
            try {
                const res= await fetch(`${baseURL}/api/user/cars`, {
                    method:'GET',
                    headers:{
                        'Authorization': token || '',
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json()
                data.success ? setCars(data.cars) : toast.error(data.message)

            } catch (error) {
                console.log('Fetch cars failed:', error);
                toast.error(error.message || 'Failed to fetch cars')
            }
        }

        //function to log the user
        const logout = () => {
            localStorage.removeItem('token')
            setToken(null)
            setUser(null)
            setIsOwner(false)
            toast.success('You have been logged out')
        }



        // useEffect to retrieve the token from localStorage
        useEffect(() => {
            const token = localStorage.getItem('token')
            if(token){
            setToken(token)
            }
        },[])

        useEffect(() => {
            fetchCars()
        },[])

        //useEffect to fetch user data when token is available
        useEffect(() => {
            if (token) {
                fetchUser()
            }
        },[token])

const value = {
    baseURL, router, currency, user, setUser, token, setToken, isOwner, setIsOwner,
    fetchUser, showLogin, setShowLogin, logout, fetchCars, cars, setCars,
    pickupDate, setPickupDate, returnDate, setReturnDate, loading  // include loading
}


    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}