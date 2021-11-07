import React, { createContext, useContext, useReducer } from 'react'

const SHOW_DIALOG_ADD = 'show_add'
const SHOW_DIALOG_UPDATE = 'show_update'
const HIDE_DIALOG = 'hide'
const UPDATE_ROW = 'update_row'

const DialogContext = createContext()

export const useDialog = () => {
    return useContext(DialogContext)
}

const reducer = (state, action) => {
    switch (action.type) {
        case SHOW_DIALOG_ADD:
            return { ...state, isUpdate: false, row: {}, visible: true }
        case SHOW_DIALOG_UPDATE:
            return { ...state, row: action.row, isUpdate: true, visible: true }
        case HIDE_DIALOG:
            return { ...state, visible: false }
        case UPDATE_ROW:
            return { ...state, row: action.row }
        default:
            return state
    }
}

export const DialogProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, {
        visible: false,
        isUpdate: false,
        row: {}
    })

    const showAdd = () => dispatch({ type: SHOW_DIALOG_ADD })
    const showUpdate = row => dispatch({ type: SHOW_DIALOG_UPDATE, row })
    const updateRow = row => dispatch({ type: UPDATE_ROW, row })
    const hide = () => dispatch({ type: HIDE_DIALOG })

    return (
        <DialogContext.Provider value={ {
            visible: state.visible,
            isUpdate: state.isUpdate,
            row: state.row,
            showAdd, updateRow, showUpdate, hide
        } }>
            { children }
        </DialogContext.Provider>
    )
}