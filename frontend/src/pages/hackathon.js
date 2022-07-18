import React, { useState, useEffect } from 'react'
import {
    useParams,
  } from "react-router-dom"

const Hackathon = () => {
    const id = useParams().id

    return (
        <div>
        <h1>Hackathon ID: {id}</h1>
        </div>
    )
}

export default Hackathon;