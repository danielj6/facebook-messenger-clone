import React, {useState, useEffect} from 'react';
import './App.css';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core'; 

function App() {
  // useState   = variables in REACT 
  // useEffect  = run code on a condition in REACT 
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    
    /* we already got this on db useEffect

    {username: 'Jose', text:'que pasa tio'}, 
    {username: 'Juan', text: 'que te den'}
    */
  ]);
  const [userName, setUserName] = useState('');

  // runs once the app component loads
  useEffect(() => {
     db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
       setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
     })
    
    }, [])

  useEffect(() => {
    setUserName(prompt('Please enter your name'));
  }, [])

  const sendMessage = (event) => {
    // all the logic to send a mesage goes here

    event.preventDefault();

    db.collection('messages').add({
      text      : input,
      username  : userName,
      timestamp : firebase.firestore.FieldValue.serverTimestamp()  
    })

    // Already got this in db.colletion
    /*
    setMessages([...messages, { username: userName, text: input }]);
    */
    setInput('');
  }

  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"/>
      <h1>Welcome {userName}</h1>

      <form class="app__form">

        <FormControl class="app__formControl">
          {/* <InputLabel>Enter a message</InputLabel> */}
          <Input class="app__input" placeholder='Enter a message...' value={input} onChange={event => setInput(event.target.value)} />
          <IconButton class="app__iconButton" disabled= {!input} color="primary" variant='contained' type='submit' onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {
          messages.map(({ id, message }) => (
            <Message key={id} username={userName} message={message} />
          ))
        }      
      </FlipMove>      
 
    </div>
  );
}

export default App;
