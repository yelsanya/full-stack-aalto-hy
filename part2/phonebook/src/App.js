import { useState, useEffect } from 'react'
import db from './services/persons'

const Notification = (props) => {
    if (props.notification.message === null) {
        return null
    }
    return (
        <div className={props.notification.type}>
            {props.notification.message}
        </div>
    )
}

const Delete = (props) => {
    const deleter = () => {
        if (window.confirm(`Delete ${props.contact.name}`)){
            db.deleteContact(props.contact.id)
            props.setContacts(props.contacts.reduce((newContacts, contact) => {
                if (contact.id !== props.contact.id){
                    newContacts.push(contact)
                }
                return newContacts
            }, []))
        }
    }
    return (
        <button onClick={deleter}>
            delete
        </button>
    )
}

const Contacts = (props) => {
  return (
      <>
          <h2>Numbers</h2>
          <ul>
            {props.filteredContacts.map(contact =>
              <li key={contact.id}>
                  {contact.name} {contact.number}
                  <Delete contact={contact} contacts={props.contacts} setContacts={props.setContacts}/>
              </li>
            )}
          </ul>
      </>
  )
}

const Filter = (props) => {
    return (
        <>
          filter shown with: <input value={props.newFilter} onChange={props.handler}/>
        </>
    )
}

const NewContact = (props) => {
    return (
        <>
            <h2> Add a new</h2>
            <form onSubmit={props.addNumber}>
                <div>
                    name: <input id="name" value={props.newContact.name} onChange={props.handler}/>
                    <br/>
                    number: <input id="number" value={props.newContact.number} onChange={props.handler}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newContact, setNewContact] = useState({name:'', number:''})
  const [newFilter, setNewFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [notification, setNotification] = useState({message: null, type: "success"})



  const getData = () => {
      db.getData().then(response => {
          console.log(response)
          setPersons(response.data)
      })
  }

  const addNumber = (event) => {
    event.preventDefault()
    for ( let i = 0; i < persons.length; i++){
        if (persons[i].name === newContact.name &&
            window.confirm(`${newContact.name} is already added to phonebook, replace the old number?`)){
            db.updateContact(persons[i].id, newContact).then()
                .catch(() => {
                    setNotification({
                        message: `Information of '${newContact.name}' has already been removed from server`,
                        type: "error"
                    })
                    setTimeout(() => {
                        setNotification({
                            message: null,
                            type: "success"
                        })
                    }, 5000)
                    getData()
                })
            let newPersons = [...persons]
            newPersons[i].number = newContact.number
            setPersons(newPersons)
            return
        }
        else if (persons[i].number === newContact.number){
            window.alert(`${newContact.number} is already in the phonebook`)
            return
        }
    }
    db.createContact(newContact).then(response => {
        console.log(response.data)
        setPersons([...persons, response.data])
    })
    setNotification({type: "success", message: `Added ${newContact.name}`})
    setTimeout(() => {
        setNotification({type: "success", message: null})
    }, 5000)
  }

  const handleContactChange = (event) => {
    if (event.target.id === 'name'){
        setNewContact({name: event.target.value, number: newContact.number})
    }
    else if (event.target.id === 'number'){
        setNewContact({name: newContact.name, number: event.target.value})
    }

  }

  const handleFilterChange = (event) => {
      setNewFilter(event.target.value)
  }

  useEffect(() => setFilteredPersons(newFilter === ''
        ? persons
        : persons.filter(person => person.name.includes(newFilter))
      )
  , [newFilter, persons])
  useEffect(()=> getData(),[])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
      <Filter newFilter={newFilter} handler={handleFilterChange}/>
      <NewContact addNumber={addNumber} newContact={newContact} handler={handleContactChange}/>
      <Contacts filteredContacts={filteredPersons} contacts={persons} setContacts={setPersons}/>
    </div>
  )
}

export default App