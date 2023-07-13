import axios from 'axios'
const baseUrl = 'http://172.20.154.175:3001/persons'

const getData = () => {
    return axios.get(baseUrl)
}

const createContact = (contact) => {
    axios.post(baseUrl, contact)
        .then(response => {
            console.log(response)
        })
}

const deleteContact = (id) => {
    axios.delete(baseUrl+`/${id}`)
        .then(response => {
            console.log(response)
        })
}

const updateContact = (id, contact) => {
    return axios.put(baseUrl + `/${id}`, contact)
        .then(response => {
            console.log(response)
        })
}

export default {
  getData: getData,
  createContact: createContact,
  deleteContact: deleteContact,
  updateContact: updateContact
}
