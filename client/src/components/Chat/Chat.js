import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import './Chat.css';
let socket;
const endpoint = 'app.chattank.com:5001';




// class Chat extends React.Component {
// 
  // constructor(props) {//step 1 initialize state
    // super(props);
    // 
    // this.state = {name: '', room: '', users: '', message: '', messages: []};
  // }
// 
  // updateState = () => {//setState
    //this.setState({name: this.state.name, room: this.state.room, users: this.state.users, message: this.state.message, messages: this.state.messages});
    //
    //this.setState( prevState => { return {name: prevState.name, room: prevState.room, users: prevState.users, message: prevState.message, messages: prevState.messages} } );
  // }
// 
  // render(){//render required
    // return (
      // <div className="outerContainer">
        {/* <div className="container"> */}
            {/* <InfoBar room={room} /> */}
            {/* <Messages messages={messages} name={name} /> */}
            {/* <Input message={message} setMessage={setMessage} sendMessage={sendMessage} /> */}
        {/* </div> */}
        {/* <TextContainer users={users}/> */}
      {/* </div> */}
    // )
  // }







//   componentDidMount() {
//     document.title = `Room ${this.state.name}`;
//   }



//   



//   componentDidUpdate() {
//     document.title = `Room ${this.state.name}`;
//   }


//   useEffect(() => {
//     const { name, room } = queryString.parse(location.search);
//     socket = io(endpoint);
//     this.setState({ room });
//     this.setState({ name });

//     socket.emit('join', { name, room }, (error) => {  if(error) { console.log(error); } });
//     return () => { socket.emit('disconnect'); socket.off(); }
//   }, [this.props.location.search]);

//   useEffect(() => {
//     socket.on('message', (message) => {  

//       this.props.setMessages([...messages, message ]); 
    
//     });
//     socket.on('roomData', ({ users }) => { 
      
//       this.props.setUsers(users); 
    
//     })
//     return () => { socket.emit('disconnect'); socket.off(); }
//   }, [messages])

//   const sendMessage = (event) => {
//     event.preventDefault();
//     if(message) {
//       socket.emit('sendMessage', message, () => this.props.setMessage(''));
//     }
//   }


//}


//1 render
//2 componentDidMount
//3 componentDidUpdate

//4 componentDidUnmount... leave page?




const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(endpoint);
    setRoom(room);
    setName(name)
    socket.emit('join', { name, room }, (error) => {  if(error) { console.log(error); } });
    return () => { socket.emit('disconnect'); socket.off(); }
  }, [location.search]);

  useEffect(() => {
    socket.removeListener('message');
    socket.on('message', (message) => {       
      setMessages([...messages, message ]); //update messages forces rebind of this useEffect
    });
    socket.removeListener('roomData');
    socket.on('roomData', ({ users }) => { setUsers(users); })
  }, [messages]);


  const sendMessage = (event) => {
    event.preventDefault();
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;