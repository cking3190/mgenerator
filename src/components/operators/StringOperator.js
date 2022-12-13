import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import CustomString from './string-sub-operators/CustomString'
import OneOfList from './string-sub-operators/OneOfList'
import Typography from '@mui/material/Typography'




export default function StringOperator(props) {

    const [operator, setOperator] = React.useState('$year');
    const [chanceString, setChanceString] = React.useState('')
    const persist = props.persist ? true : false

    const handleChange = (event) => {
      setOperator(event.target.value);
      setChanceString(event.target.value)
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
    
    const stringOperatorOptions = 
    [
        {displayVal:"Random Year",operator : "$year",component: (<div></div>)},
        {displayVal:"Random Name",operator : "$name",component: (<div></div>)},
        {displayVal:"Random Age",operator : "$age",component: (<div></div>)},
        {displayVal:"Random Email",operator : "$email",component: (<div></div>)},
        {displayVal:"Random Paragraph of Text",operator : "$paragraph",component: (<div></div>)},
        {displayVal:"Random Sentence of Text",operator : "$sentence",component: (<div></div>)},
        {displayVal:"Integer between 1 and 200", operator : `{"$integer": {"min": 0, "max": 200}}`, component :(<div></div>)},
        {displayVal:"Random Address",operator : "$address",component: (<div></div>)},
        {displayVal:"Random Postal Code",operator : "$postcode",component: (<div></div>)},
        {displayVal:"Custom String",operator : "##CUSTOM", component: (<CustomString onChange={handleComponent}></CustomString>)},
        {displayVal:"One Of List", operator: "##ONEOF",component: (<OneOfList onChange={handleComponent}></OneOfList>)}
    ]
    

  return (
    <div>
   
    <div style={{marginBottom:'20px', maxHeight:'100px',margin:'20px', overflow:'scroll', backgroundColor:'lightGrey'}}>{chanceString}</div>
      <FormControl>
    <InputLabel id="demo-simple-select-label">Select String Generator</InputLabel>
        <Select
            style={{margin:'20px'}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={operator}
            label="Operator"
            onChange={handleChange}
        >   
        {stringOperatorOptions.map((option) => {
            return (<MenuItem value={option['operator']}>{option['displayVal']}</MenuItem>)
        })}
    </Select>
    {stringOperatorOptions.filter((o)=> o.operator == operator)[0].component}
    <Button variant="contained" style={{height:'30px', width:'50px', backgroundColor:'lightGreen'}} onClick={handleSubmit}>Submit</Button>
    </FormControl>
    </div>
  );
}