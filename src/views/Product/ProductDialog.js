import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import { UnitOfMeasures } from "../../data/products/unitOfMeasures";
import MenuItem from "@mui/material/MenuItem";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import React, { useState } from "react";
import Api from "../../api/api";
import api from "../../api/api";
import { useDialog } from "../../components/DialogContext";

const ProductDialog = (props) => {
    const [openDialogError, setOpenDialogError] = useState(false)
    const [error, setError] = useState("")

    const dialogContext = useDialog();

    function getProduct() {
        return dialogContext.row
    }


    function handleUpdateDialog() {
        setOpenDialogError(false)
        const data = getProduct()

        Api.Update(props.url, data)
            .then((result) => {
                if (result.status !== 200) {
                    let messageBody = api.GetObject(result)
                    messageBody.then(c => {
                        setOpenDialogError(true)
                        setError(c.Body.message)
                    })
                } else {
                    dialogContext.hide()
                }
            })
            .catch(() => {
                setOpenDialogError(true)
                setError("Something went wrong")
            })
    }

    function handleAdd() {
        setOpenDialogError(false)
        const data = getProduct()

        Api.Add(props.url, data)
            .then((result) => {
                if (result.status === 200) {
                    dialogContext.hide()
                } else {
                    let messageBody = api.GetObject(result)
                    messageBody.then(c => {
                        setOpenDialogError(true)
                        setError(c.Body.message)
                    })
                }
            })
            .catch(() => {
                setOpenDialogError(true)
                setError("Something went wrong")
            })
    }

    function handleChangeManufacturerId(event) {
        const updatedRow = dialogContext.row
        if (updatedRow.manufacturer == null) updatedRow.manufacturer = {}
        updatedRow.manufacturer.id = event.target.value
        dialogContext.updateRow(updatedRow)
    }

    const handleChangeSelectDialog = (event) => {
        const updatedRow = dialogContext.row
        updatedRow.unitOfMeasure = event.target.value
        dialogContext.updateRow(updatedRow)
    };

    function handleChangeManufactureCost(event) {
        const updatedRow = dialogContext.row
        updatedRow.manufactureCost = event.target.value
        dialogContext.updateRow(updatedRow)
    }

    function handleChangePrice(event) {
        const updatedRow = dialogContext.row
        updatedRow.price = event.target.value
        dialogContext.updateRow(updatedRow)
    }

    function handleChangeCoordinateY(event) {
        const updatedRow = dialogContext.row
        if (updatedRow.coordinates == null) updatedRow.coordinates = {}
        updatedRow.coordinates.y = event.target.value
        dialogContext.updateRow(updatedRow)
    }

    function handleChangeCoordinateX(event) {
        const updatedRow = dialogContext.row
        if (updatedRow.coordinates == null) updatedRow.coordinates = {}
        updatedRow.coordinates.x = event.target.value
        dialogContext.updateRow(updatedRow)
    }

    function handleChangeDate(event) {
        const updatedRow = dialogContext.row
        updatedRow.creationDate = event.target.value
        dialogContext.updateRow(updatedRow)
    }

    function handleChangeName(event) {
        const updatedRow = dialogContext.row
        updatedRow.name = event.target.value
        dialogContext.updateRow(updatedRow)
    }

    return (
        <Dialog open={ dialogContext.visible } onClose={ () => dialogContext.hide() }>
            <DialogTitle>{ dialogContext.isUpdate ? "Обновление" : "Добавление" } продукта</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Здесь вы можете { dialogContext.isUpdate ? "обновить" : "добавить" } продукт
                </DialogContentText>
                <TextField onChange={ handleChangeName } value={ dialogContext.row.name } sx={ { mt: 1, mb: 1 } }
                           fullWidth
                           id="dialog-product-name" label="Name" variant="outlined"/>
                <div>
                    <TextField type="number" onChange={ handleChangeCoordinateX } sx={ { mr: 1 } } id="dialog-product-x"
                               label="coordinate x" variant="outlined"
                               value={ dialogContext.row.coordinates == null ? '' : dialogContext.row.coordinates.x }/>
                    <TextField type="number" onChange={ handleChangeCoordinateY } sx={ { ml: 1 } } id="dialog-product-y"
                               label="coordinate y" variant="outlined"
                               value={ dialogContext.row.coordinates == null ? '' : dialogContext.row.coordinates.y }/>
                </div>
                <TextField onChange={ handleChangeManufacturerId } fullWidth sx={ { mt: 1, mb: 1 } }
                           id="dialog-product-manufacturer-id" label="manufacturer id"
                           type="number" variant="outlined"
                           value={ dialogContext.row.manufacturer == null ? '' : dialogContext.row.manufacturer.id }/>
                <div>
                    <TextField onChange={ handleChangePrice } sx={ { mr: 1 } } id="dialog-product-price" label="price"
                               type="number"
                               variant="outlined" value={ dialogContext.row.price }/>
                    <TextField onChange={ handleChangeManufactureCost } sx={ { ml: 1 } }
                               id="dialog-product-manufactureCost" type="number" label="manufacture cost"
                               variant="outlined" value={ dialogContext.row.manufactureCost }/>
                </div>
                <TextField fullWidth sx={ { mt: 1 } }
                           id="outlined-select-unitOfMeasure "
                           select
                           label="Unit Of Measure "
                           value={ dialogContext.row.unitOfMeasure }
                           onChange={ handleChangeSelectDialog }>
                    { UnitOfMeasures.map((option) => (
                        <MenuItem key={ option.value } value={ option.value }>
                            { option.label }
                        </MenuItem>
                    )) }
                </TextField>
                { dialogContext.isUpdate &&
                <TextField onChange={ handleChangeDate } value={ dialogContext.row.creationDate }
                           sx={ { mt: 1, mb: 1 } }
                           fullWidth type="date"
                           InputLabelProps={ {
                               shrink: true,
                           } }
                           id="dialog-product-name" label="Date" variant="outlined"/>
                }
                <Collapse sx={ { mt: 2 } } in={ openDialogError }>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={ () => {
                                    setOpenDialogError(false);
                                } }
                            >
                                <CloseIcon fontSize="inherit"/>
                            </IconButton>
                        }
                        sx={ { mb: 2 } }
                        severity="error"
                    >
                        { error }
                    </Alert>
                </Collapse>
            </DialogContent>
            <DialogActions>
                <Button onClick={ () => dialogContext.hide() }>Cancel</Button>
                {
                    dialogContext.isUpdate ? <Button onClick={ handleUpdateDialog }>Update</Button> :
                        <Button onClick={ handleAdd }>Add</Button>
                }
            </DialogActions>
        </Dialog>
    )
}

export default ProductDialog