import React, { useState, useEffect } from "react"

export default function TableFormCell({cell, datum, reg, editMode}) {
    const [value, setValue] = useState('')

    useEffect(() => {
        let new_val = (editMode) ? datum : ''
        setValue(new_val)
    }, [datum, editMode])

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    if (cell !== undefined) {
        if (cell.COLUMN_KEY === 'PRI') {
            return (
                <td><input type='submit' value={editMode ? 'Update': 'Add New'} /></td>
            )
        } else if (cell.COLUMN_KEY === 'MUL') {
            return (
                <td>
                    <select>
                        <option value='NULL'>Null</option>
                    </select>
                </td>
            )
        } else if (reg.char.test(cell.COLUMN_TYPE) || cell.COLUMN_TYPE === 'date') {
            return (
                <td><input type='text' maxlength={cell.CHARACTER_MAXIMUM_LENGTH} onChange={handleChange} value={value} /></td>
            )
        } else if (reg.text.test(cell.COLUMN_TYPE)) {
            return (
                <td><textarea maxlength={cell.CHARACTER_MAXIMUM_LENGTH} onChange={handleChange} value={value}></textarea></td>
            )
        } else if (reg.int.test(cell.COLUMN_TYPE) || reg.dec.test(cell.COLUMN_TYPE)) {
            return (
                <td><input type='number' maxlength={cell.CHARACTER_MAXIMUM_LENGTH} value={value} /></td>
            )
        }
    } else {
        return (
            <td>Null</td>
        )
    }
}