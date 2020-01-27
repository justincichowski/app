import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';


class Join extends Component {
    state = {name: '', room: ''}
    render(){
        return (
            <div className="joinOuterContainer">
                <div className="joinInnerContainer">
                    <h1 className="heading">Join</h1>
                    <div><input placeholder="" className="joinInput" type="text" onChange={e => this.setState({ name: e.target.value })} /></div>
                    <div><input placeholder="" className="joinInput mt-20" type="text" onChange={e => this.setState({ room: e.target.value })} /></div>
                    <Link onClick={event => (!this.state.name || !this.state.room) ? event.preventDefault() : null} to={'/chat?name='+this.state.name+'&room='+this.state.room+''}>
                    <button className="button mt-20" type="submit">Sign In</button>
                    </Link>
                </div>
            </div>
        )
    }
}



// const Join = () => {
//     const [name, setName] = useState('');
//     const [room, setRoom] = useState('');
//     return (
//         <div className="joinOuterContainer">
//             <div className="joinInnerContainer">
//                 <h1 className="heading">Join</h1>
//                 <div><input placeholder="" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
//                 <div><input placeholder="" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
//                 <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={'/chat?name='+name+'&room='+room+''}>
//                 <button className="button mt-20" type="submit">Sign In</button>
//                 </Link>
//             </div>
//         </div>
//     )
// }



export default Join;