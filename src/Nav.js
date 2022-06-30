import React, { useEffect, useState } from 'react'
import './Nav.css'

function Nav() {
    const [show, handleShow] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 150) {
                handleShow(true)
            } else handleShow(false)
        })

        return () => {
            window.removeEventListener("scroll", window)
        }
    }, [])

    return (
        <div className={`nav ${show && "nav--black"}`}>
            <img 
                className='nav--logo'
                src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
                alt='logo'
            />
            <img 
                className='nav--avatar'
                src='./avatar.png'
                alt='logo'
            /> 
        </div>
    )
}

export default Nav