import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import uuid from 'react-uuid'


export default function OneOfList(props) {
    const [inputText, setInputText] = React.useState('')
    const [randomIdNumber, setRandomIdNumber] = React.useState(1)

    const submitList = () => {
        try {
            const elements = inputText.split(',').map((s) => `"${s.trim()}"`)
            props.onChange(`{"$choose": {"from": [${elements}]}}`)
        }
        catch (error) {
            console.log(error)
            console.log('list is bad')
        }
    }

    const generateRandomIds = () => {
        var randomIds = []
        for(var i = 0; i < randomIdNumber; i++){
            randomIds.push(`"${uuid()}"`)
        }
        props.onChange(`{"$choose": {"from": [${randomIds}]}}`)
    }


  return (
    <div style={{display:'flex', flexDirection:'row'}}>
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <TextField onChange={(event) => setInputText(event.target.value)} id="filled-basic" label="Enter comma separated values" variant="filled"> {inputText} </TextField>
            <Button variant='filled' onClick={submitList}>Parse List</Button>
            </Box>
            <Box>
                <TextField onChange={(event) => setRandomIdNumber(event.target.value)}> How Many Unique IDs</TextField>
                <Button variant="contained" onClick={() => generateRandomIds()}> Generate Random IDs </Button>
            </Box>

    </div>
  );
}