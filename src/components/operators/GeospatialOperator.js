import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'




export default function GeoSpatialOperator(props) {

    const [operator, setOperator] = React.useState('us');
    const [chanceString, setChanceString] = React.useState('')

    const handleChange = (event) => {
      setOperator(event.target.value);
      setChanceString(event.target.value)
    };
    
    const handleSubmit = () => {
        props.onChange(chanceString)
    }

    const handleComponent = (event) => {
        setChanceString(event)
    }
    
    const operatorOptions = 
    [
        {displayVal:"Within United States",
        operator : '{"position": {"$coordinates": {"long_lim": [26.1, 49.0], "lat_lim": [-124.6, -69.7]}}}',
        component: (<div></div>)},
        {displayVal:"Within European Union",
        operator : '{"position": {"$coordinates": {"long_lim": [35.4, 60.5], "lat_lim": [-15.9, 35.2]}}}',
        component: (<div></div>)}
    ]
    

  return (
    <div>
    <Typography variant='h4' style={{display:'flex'}}> Generate String</Typography>
    <div style={{marginBottom:'20px'}}>{chanceString}</div>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Select Geospatial Generator</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={operator}
                label="Operator"
                onChange={handleChange}
            >   
            {operatorOptions.map((option) => {
                return (<MenuItem value={option['operator']}>{option['displayVal']}</MenuItem>)
            })}
        </Select>
        <Button style={{height:'30px', width:'50px', backgroundColor:'lightGreen'}} onClick={handleSubmit}>Submit</Button>
    </FormControl>
    </div>
  );
}