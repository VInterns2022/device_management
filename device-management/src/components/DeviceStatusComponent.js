import React, {useState, Fragment} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/system';



const DeviceStatusComponent = (props) => {
    const data = [
      { id: 1, ModalNumber: 286735, DeviceStatus: 'Online' },
      { id: 2, ModalNumber: 283735, DeviceStatus: 'Offline' },
      { id: 3, ModalNumber: 256735, DeviceStatus: 'Online' },
      { id: 4, ModalNumber: 686735, DeviceStatus: 'Online' },
      { id: 5, ModalNumber: 286835, DeviceStatus: 'Offline' },
      { id: 6, ModalNumber: 196735, DeviceStatus: 'Offline' },
      { id: 7, ModalNumber: 726235, DeviceStatus: 'Online' },
      { id: 8, ModalNumber: 986745, DeviceStatus: 'Offline' },
      { id: 9, ModalNumber: 256234, DeviceStatus: 'Online' },
      { id: 10, ModalNumber: 983775, DeviceStatus: 'Online' },
    ];

    const [rows,setRows] = useState(data);
    const[addFormData,setAddFormData] = useState({
        id:"",
        ModalNumber:"",
        DeviceStatus:""
    });
    const [popFormData,setPopFormData] = useState({
        id:"",
        ModalNumber:"",
        DeviceStatus:""
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

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = {...addFormData};
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        const newRow = {
          id: addFormData.id,
          ModalNumber: addFormData.ModalNumber,
          DeviceStatus: addFormData.DeviceStatus
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
            
            <button type="submit"> Add </button>
          </form>
        </div>
    );
}

export default DeviceStatusComponent;