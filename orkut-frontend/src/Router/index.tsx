import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Profile from '../pages/Profile'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'



export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignIn />}/>
                <Route path='/SignUp' element={<SignUp />}/>
                <Route path='/Profile/:id' element={<Profile/>}/>
            </Routes>
        </BrowserRouter>
    )
}
