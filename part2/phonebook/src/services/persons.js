import axios from 'axios'
const baseUrl = '/api/persons'

const getData = () => {
    return axios.get(baseUrl)
}

const createContact = (contact) => {
    return axios.post(baseUrl, contact)
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
