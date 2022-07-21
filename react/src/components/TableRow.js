import React, { useEffect, useState } from "react"
import {MdDeleteForever, MdCancel, MdEdit } from 'react-icons/md';

export default function TableRow({dataRow, editMode, setEditMode, cancelEdit, editId, setEditId, tid}) {
    const [row, setRow] = useState([])

    const edit = () => {
        setEditId(tid)
        setEditMode(true)
    }
    const cancel = () => {
        setEditMode(false)
    }
    const del = () => {

    }

    useEffect(() => {
        let compiled = []
        for (let x in dataRow) {
            compiled.push(dataRow[x])
        }
        setRow(compiled)
    }, [dataRow])
    
    return (
        <tr>
            {row.map((cell, i) => <td key={i}>{cell}</td>)}
            {(tid === editId && editMode) ?
                <td onClick={cancel} className='rowEdit'><MdCancel /></td> :
                <td onClick={edit} className='rowEdit'><MdEdit /></td>}
            <td onClick={del} className='rowDelete'><MdDeleteForever /></td>
        </tr>
    )
}