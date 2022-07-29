import React from 'react';
import './App.css';
import DeviceStatusComponent from './components/DeviceStatusComponent'

function App() {
  const url = "ws://localhost:8888/websocket"
  //const [openConnection]=useState(true)
  return (
    <React.Fragment>
      <DeviceStatusComponent url = {url}/>
    </React.Fragment>
  );
}

export default App;
