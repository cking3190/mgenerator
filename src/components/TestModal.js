import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import StringOperator from './operators/StringOperator'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import GeoSpatialOperator from './operators/GeospatialOperator';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(true);
  const [operator, setOperator] = React.useState('string')
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdateData = () => {
    props.onChange({
        'keyName': props.keyName,
        'value':150
    })
    
  }

  const handleSetOperator = (event) => {
    setOperator(event.target.value);
  };

  const handleCreateString = (event) => {
    props.onChange({
      'keyName': props.keyName,
      usage: props.usage,
      keyPath: props.keyPath,
      deep: props.deep,
      keyName: props.keyName,
      data: props.data,
      dataType: props.dataType,
      'value':event
  })
  setOpen(false)
  }

  const availableOperators = 
  [
      {displayVal:"String Operator",key : "string",component: (<div><StringOperator onChange={handleCreateString}></StringOperator></div>)},
      {displayVal:"Integer Operator",key : "int", component: (<div></div>)},
      {displayVal:"Geospatial Operator",key : "geo", component: (<GeoSpatialOperator onChange={handleCreateString}></GeoSpatialOperator>)},
  ]
  

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <InputLabel id="demo-simple-select-label">Select String Generator</InputLabel>
          <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={operator}
                label="Operator"
                onChange={handleSetOperator}
            >   
            {availableOperators.map((option) => {
                return (<MenuItem value={option['key']}>{option['displayVal']}</MenuItem>)
            })}
        </Select>
        {availableOperators.filter((o)=> o.key == operator)[0].component}
        </Box>
      </Modal>
    </div>
  );
}