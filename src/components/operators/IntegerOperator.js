import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';

const stringOperatorOptions = 
[
    {displayVal:"Random Year",operator : "$year"},
    {displayVal:"Random Ip",operator : "$ip"},
    {displayVal:"Custom String",operator : "##CUSTOM"},
]

export default function StringOperator(props) {

    const [operator, setOperator] = React.useState('');
    const [chanceString, setChanceString] = React.useState('')
    const [length, setLength] = React.useState([10, 20])
    const [alpha, setalpha] = React.useState(true)
    const [casing, setCasing] = React.useState(true)
    const [numeric, setNumeric] = React.useState(true)
    const persist = props.persist ? true : false

    React.useEffect(() => {
        // if (persist) {
        //     props.onChange(operator)
        // }
        if (operator === '##CUSTOM') {
            var operatorString = `{
                "$string":
                {
                    "length": ${length},
                    "casing": ${casing},
                    "alpha": ${alpha},
                    "numeric": ${numeric}
                }
            }`
            setChanceString(operatorString)

        }
        else {
            setChanceString(operator)
        }
        

    
      }, [operator, length, casing, alpha, numeric])

    const handleChange = (event) => {
      setOperator(event.target.value);
    };
    
    const handlePersist = () => {
        console.log(`here ${operator}`)

    }
    
    const handleSubmit = () => {
        props.onChange(chanceString)
    }

    const handleLengthChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
        return;
    }

    if (activeThumb === 0) {
        setLength([Math.min(newValue[0], length[1] - 0), length[1]]);
    } else {
        setLength([length[0], Math.max(newValue[1], length[0] + 0)]);
    }
    };

    

  return (
    <div>
    <div>{chanceString}</div>
      <FormControl>
    <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
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
    {/* {operator == "##CUSTOM" ? <div><StringOperator persist={true} onChange={handlePersist}></StringOperator></div> : <div></div>} */}
    {operator == "##CUSTOM" ? <div>
        <Box width={300}>
            <Slider
            getAriaLabel={() => 'Minimum distance'}
            value={length}
            onChange={handleLengthChange}
            valueLabelDisplay="auto"
            disableSwap
        />
        </Box>

    </div> : <div></div>}
    <Button onClick={handleSubmit}></Button>
    </FormControl>
    </div>
  );
}