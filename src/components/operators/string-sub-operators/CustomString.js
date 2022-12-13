import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'


export default function CustomString(props) {
    const [length, setLength] = React.useState(10)
    const [alpha, setAlpha] = React.useState(true)
    const [casing, setCasing] = React.useState(true)
    const [numeric, setNumeric] = React.useState(true)

    React.useEffect(() => {
        var operatorString = `{
            "$string":
            {
                "length": ${length},
                "casing": ${casing ? '"upper"' : '"lower"'},
                "alpha": ${alpha},
                "numeric": ${numeric}
            }
        }`
        props.onChange(operatorString)

    
      }, [length, casing, alpha, numeric])

      


    const handleLengthChange = (event, newValue) => {
        setLength(newValue);
      };
    

  return (
    <div>
        <Box width={300}>
        <FormGroup>
            <Slider defaultValue={length} onChange={handleLengthChange} aria-label="Default" valueLabelDisplay="auto" />
            <FormControlLabel control={        
                    <Checkbox
                    checked={alpha}
                    onChange={()=> setAlpha(!alpha)}
                    inputProps={{ 'aria-label': 'controlled' }}
                    />} label="Alpha" />
                    <FormControlLabel control={        <Checkbox
                    checked={numeric}
                    onChange={()=> setNumeric(!numeric)}
                    inputProps={{ 'aria-label': 'controlled' }}
                    />} label="Numeric" />
                    <FormControlLabel control={        <Checkbox
                    checked={casing}
                    onChange={()=> setCasing(!casing)}
                    inputProps={{ 'aria-label': 'controlled' }}
                    />} label="Casing" />
                    </FormGroup>
        </Box>

    </div>
  );
}