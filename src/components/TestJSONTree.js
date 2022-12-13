// Import
import {
    JsonTree,
    ADD_DELTA_TYPE,
    REMOVE_DELTA_TYPE,
    UPDATE_DELTA_TYPE,
    DATA_TYPES,
    INPUT_USAGE_TYPES,
} from 'react-editable-json-tree'
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Button from '@material-ui/core/Button';
import BasicModal from './TestModal'
import FileUpload from './FileUpload'


const downloadFile = ({ data, fileName, fileType }) => {
  // Create a blob with the data we want to download as a file
  const blob = new Blob([data], { type: fileType })
  // Create an anchor element and dispatch a click event on it
  // to trigger a download
  const a = document.createElement('a')
  a.download = fileName
  a.href = window.URL.createObjectURL(blob)
  const clickEvt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  })
  a.dispatchEvent(clickEvt)
  a.remove()
}

export default function JSONTreeDemo() {
  const [showModal,setShowModal] = React.useState(false)
  const [refresh, setRefresh] = React.useState(false)
  const [modal, setModal] = React.useState(<BasicModal></BasicModal>)
  const [fileName, setFileName] = React.useState('mgeneratefile')
  // Have to maintain a copy of the JSON export so that we can serialize the export strings as JSON without turning them into editable Objects
  const [exportCopyJson, setExportCopyJson] = React.useState({
    error: new Error('error'),
    text: 'text',
    int: 100,
    boolean: true,
    null: null,
    objectField: {
        text: 'objectText',
        int: 211,
        boolean: true,
    },
    arrayField: [
        1,
        {
            string: 'test',
        },
    ],
})
  const [sourceJson, setSourceJson] = React.useState(
    {
        error: new Error('error'),
        text: 'text',
        int: 100,
        boolean: true,
        null: null,
        objectField: {
            text: 'objectText',
            int: 211,
            boolean: true,
        },
        arrayField: [
            1,
            {
                string: 'test',
            },
        ],
    }
  )

  const handleJsonUpload = (event) => {
    setSourceJson(event.jsonData)
    const clone = {...event.jsonData}
    setExportCopyJson(clone)
    setFileName(`${event.fileName}_mgenerate`)
  }

  const handleExportJson = e => {
    e.preventDefault()
    downloadFile({
      data: JSON.stringify(exportCopyJson),
      fileName: `${fileName}.json`,
      fileType: 'text/json',
    })
  }

  const updateData = (event) => {
    var newJson = sourceJson
    var root = newJson;
    var rootExportCopy = exportCopyJson
    event.keyPath.forEach(function(path) {
      root = root[path];
      rootExportCopy = rootExportCopy[path];
    });
    
    try {
      root[event.keyName] = event.value
      rootExportCopy[event.keyName] = JSON.parse(event.value)
    }
    catch {
      console.log('Changed field is not a JSON value (not complex)')
      root[event.keyName] = event.value
      rootExportCopy[event.keyName] = event.value
    }
    
    setSourceJson(newJson)
    setExportCopyJson(exportCopyJson)
    setShowModal(false)
    setRefresh(!refresh)

  }

  const toggleModalWithData = (usage, keyPath, deep, keyName, data, dataType) => {
    console.log(keyName)
    const modal = (
        <BasicModal
        usage={usage}
        keyPath={keyPath}
        deep={deep}
        keyName={keyName}
        data={data}
        dataType={dataType}
        oldJson={sourceJson}
        onChange={updateData}
        ></BasicModal>
    )
    setModal(modal)
    setShowModal(true)
    
  }

  return (
    <div style={{display:'flex', flexDirection:'column', textAlign:'left', alignItems:'flex-start'}}>
      <FileUpload onChange={handleJsonUpload}> </FileUpload>
        {showModal ? (modal) : (<div></div>)}
        <JsonTree data={sourceJson}
        inputElement={
            (usage, keyPath, deep, keyName, data, dataType) =>         
            <div 
            style={{height:'10',width:'10',textAlign:'center',position:'relative',backgroundColor:'gray'}} 
            onClick={()=> toggleModalWithData(usage, keyPath, deep, keyName, data, dataType)}>
                Edit
            </div>
            }
          cancelButtonElement={
            <button>Confirm</button>
          }
          editButtonElement={
            <div></div>
          }

        />
        
        <Button style={{height:'30px', width:'100%', backgroundColor:'lightGreen', margin:'10px'}} onClick={handleExportJson}> Download</Button>
    </div>

  )
}
