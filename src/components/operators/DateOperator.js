import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import CustomString from './string-sub-operators/CustomString'
import Typography from '@mui/material/Typography'




export default function DateOperator(props) {

    const [operator, setOperator] = React.useState('$year');
    const [chanceString, setChanceString] = React.useState('')
    const [length, setLength] = React.useState(10)
    const [alpha, setAlpha] = React.useState(true)
    const [casing, setCasing] = React.useState(true)
    const [numeric, setNumeric] = React.useState(true)
    const persist = props.persist ? true : false

    const handleChange = (event) => {
      setOperator(event.target.value);
      setChanceString(operator)
    };
    
    const handlePersist = () => {
        console.log(`here ${operator}`)
    }
    
    const handleSubmit = () => {
        props.onChange(chanceString)
    }

    const handleComponent = (event) => {
        setChanceString(event)
    }
    
    const operatorOptions = 
    [
        {displayVal:"Random Year",operator : "$year",component: (<div></div>)},
        {displayVal:"Random Ip",operator : "$ip",component: (<div></div>)},
        {displayVal:"Custom String",operator : "##CUSTOM", component: (<CustomString onChange={handleComponent}></CustomString>)},
        {displayVal:"One Of List", operator: "##ONEOF",component: (<div></div>)}
    ]
    

  return (
    <div>
    <Typography variant='h4' style={{display:'flex'}}> Generate String</Typography>
    <div style={{marginBottom:'20px'}}>{chanceString}</div>
      <FormControl>
    <InputLabel id="demo-simple-select-label">Select String Generator</InputLabel>
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
    {operatorOptions.filter((o)=> o.operator == operator)[0].component}
    <Button style={{height:'30px', width:'50px', backgroundColor:'lightGreen'}} onClick={handleSubmit}>Submit</Button>
    </FormControl>
    </div>
  );
}