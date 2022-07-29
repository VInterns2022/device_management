import React, {useState,useEffect,useRef, Fragment} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/system';
import ReconnectingWebSocket from 'reconnecting-websocket';


const DeviceStatusComponent = (props) => {

    // var ws = new WebSocket("ws://localhost:8888/websocket");
    // ws.onmessage = function(evt) {console.log("</br>" + evt.data);};

    const [message, setMessage] = useState();
    useEffect(()=>{
        return()=>{

            const ws = new ReconnectingWebSocket(props.url)
            ws.addEventListener('message', function (event) {
                console.log('Message from server ', event.data);
                setMessage(event.data);
            });

            ws.addEventListener('open', function (event) {
                console.log('connected');
            });
            
        }
        
    },[props.url]);
    
    if(message!=null){
        alert(message);
    }
    
    const data = [
      { id: 1, ModalNumber: 286735, DeviceStatus: 'Online', Frequency: 24 },
      { id: 2, ModalNumber: 283735, DeviceStatus: 'Offline', Frequency: 45  },
      { id: 3, ModalNumber: 256735, DeviceStatus: 'Online', Frequency: 56 },
      { id: 4, ModalNumber: 686735, DeviceStatus: 'Online', Frequency: 67  },
      { id: 5, ModalNumber: 286835, DeviceStatus: 'Offline', Frequency: 84  },
      { id: 6, ModalNumber: 196735, DeviceStatus: 'Offline', Frequency: 23  },
      { id: 7, ModalNumber: 726235, DeviceStatus: 'Online', Frequency: 54 },
      { id: 8, ModalNumber: 986745, DeviceStatus: 'Offline', Frequency: 64  },
      { id: 9, ModalNumber: 256234, DeviceStatus: 'Online', Frequency: 66  },
      { id: 10, ModalNumber: 983775, DeviceStatus: 'Online', Frequency: 74  },
    ];

    const [rows,setRows] = useState(data);
    const[addFormData,setAddFormData] = useState({
        id:"",
        ModalNumber:"",
        DeviceStatus:"",
        Frequency:""
    });
    const [popFormData,setPopFormData] = useState({
        id:"",
        ModalNumber:"",
        DeviceStatus:"",
        Frequency:""
    });

    const handleDeleteClick1 = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const columns = [
        {
            field: 'id', 
            headerName: 'ID', 
            type: 'number',
            width: 90 
        },
        {
            field: 'ModalNumber',
            headerName: 'ModalNumber',
            type: 'number',
            width: 150,
            editable: true,
        },
        {
            field: 'DeviceStatus',
            headerName: 'Device Status',
            width: 150,
            type: 'singleSelect',
            valueOptions: ['Online', 'Offline'],
            editable: true,
        },
        {
            field: 'Frequency',
            headerName: 'Frequency',
            type: 'number',
            width: 150,
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            getActions: ({ id }) => {
                return [
                    <button type = 'submit' onClick={handleDeleteClick1(id)}>
                        Delete
                    </button>
                ];
            }
        }
    ]

    const handleAddFormChange = (event) => {
        event.preventDefault();
        console.log('***handleAddFormChange***')
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = {...addFormData};
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };

    const handleAddFormSubmit = (event) => {
        event.preventDefault();
        console.log('***handleSubmitFormChange***')
        const newRow = {
          id: addFormData.id,
          ModalNumber: addFormData.ModalNumber,
          DeviceStatus: addFormData.DeviceStatus,
          Frequency: addFormData.Frequency
        };
        const newRows = [...rows, newRow];
        setRows(newRows);

    };

    return (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid sx={{ 
            m: 5,
            borderRadius: 3, 
          }}
            editMode="row"
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
          />
          <h2> Add a Device </h2>
          <form onSubmit = {handleAddFormSubmit}>
            <input 
              type="number" 
              name="id" 
              required="required" 
              placeholder="Device ID"
              onChange={handleAddFormChange}
            />

            <input 
              type="number" 
              name="ModalNumber" 
              required="required" 
              placeholder="Modal Number"
              onChange={handleAddFormChange}
            />
            
            <select name="DeviceStatus" onChange={handleAddFormChange}>
              <option value="Online">--Device Status--</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>

            <input 
              type="number" 
              name="Frequency" 
              required="required" 
              placeholder="Frequency"
              onChange={handleAddFormChange}
            />
            <button type="submit"> Add </button>
          </form>
          <box>
            <h3>{message}</h3>
          </box>
        </div>
    );
}

export default DeviceStatusComponent;