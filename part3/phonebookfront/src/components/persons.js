import {useState, useEffect} from 'react'
import axios from 'axios'
const url = 'http://localhost:3001/persons'

const load = () => {
    const request = axios.get(url)
    return request.then(res => res.data)
}

const addName = object => {
    const request = axios.post(url, object)
    return request.then(res => res.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${url}/${id}`, newObject)
    return request.then(res => res.data)
}

const remove = id => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(res => res.data)
}

export default {
    load,
    addName,
    update,
    remove,
}