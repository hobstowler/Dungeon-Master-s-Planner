import React, { useState, useEffect } from "react"

import TableFormCell from "./TableFormCell"

export default function DetailTableForm({meta, rowData, regex, editId, setEditId, setError, refreshData, detailInfo}) {
    const [metadata, setMetadata] = useState([])
    const [data, setData] = useState([])
    console.log(rowData)

    const cancelEdit = () => {
        //setEditMode(false)
        setEditId(-1)
    }

    const changeData = (i, new_val) => {
        let new_data = data
        new_data[i] = new_val
        setData(new_data)
    }
    const addData = () => {
        let dataToSend = {}
        for (let i = 1; i < metadata.length; i++) {
            if (data[i] !== undefined) {
                dataToSend[metadata[i].COLUMN_NAME] = data[i]
            }
        }
        dataToSend[detailInfo.columnName] = detailInfo.id
        console.log(dataToSend)
        fetch(`${metadata[0].TABLE_NAME}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSend)
        })
            .then(response => {
                if (response.status === 201) {
                    refreshData()
                }
            })
    }
    const updateData = () => {
        let id = metadata[0].TABLE_NAME.slice(0,metadata[0].TABLE_NAME.length-1) + 's ID'
        id = id.replaceAll('_', ' ')
        console.log(id)
        let dataToSend = {'id': rowData[id]}
        dataToSend[detailInfo.columnName] = detailInfo.id
        for (let i = 1; i < metadata.length; i++) {
            dataToSend[metadata[i].COLUMN_NAME] = data[i]
        }
        fetch(`${metadata[0].TABLE_NAME}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSend)
        })
            .then(response => {
                if (response.status === 200) {
                    refreshData()
                    cancelEdit()
                }
                return response.json()
            })
            .then(json => {
                console.log(json)
                setError(JSON.stringify(json.error))
            })
    }
    const resetData = () => {
        if (editId => 0) {
            let compiled = []
            for (let x in rowData) {
                compiled.push(rowData[x])
            }
            setData(compiled)
        } else {
            setData([])
        }
    }

    useEffect(() => {
        resetData()},[editId])
    useEffect(() => {
        if (meta !== undefined) {
            setMetadata(meta)
            resetData()
        }
    }, [meta, rowData])

    return (
        <tr>
            {metadata.map((cell, i) =>
                <TableFormCell
                    cell={cell}
                    changeData={changeData}
                    updateData={updateData}
                    addData={addData}
                    datum={data[i]}
                    data={data}
                    regex={regex}
                    editId={editId}
                    key={i}
                    i={i}
                    mainTableName={metadata.length > 0 ? metadata[0].TABLE_NAME : ''} />
            )}
            {editId >= 0 ? <td colSpan={2} id='formCancel' onClick={cancelEdit}>Cancel</td> : <td></td>}
        </tr>
    )
}