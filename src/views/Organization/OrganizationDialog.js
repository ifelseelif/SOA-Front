import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
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
import { OrganizationProperties } from "../../data/organizations/organizationEnums";
import { OrganizationType } from "../../data/organizations/organizationType";

const OrganizationDialog = (props) => {
    const [openDialogError, setOpenDialogError] = useState(false)
    const [error, setError] = useState("")

    const dialogContext = useDialog();

    function handleAdd() {
        setOpenDialogError(false)
        const organization = getOrganization()
        Api.Add(props.url, organization)
            .then((result) => {
                if (result.status === 200) {
                    dialogContext.hide()
                } else {
                    let messageBody = api.GetObject(result)
                    messageBody.then(c => {
                        setOpenDialogError(true)
                        setError(c.message)
                    })
                }
            })
            .catch(() => {
                setOpenDialogError(true)
                setError("Something went wrong")
            })
    }

    function getOrganization() {
        return dialogContext.row
    }

    function handleUpdateDialog() {
        setOpenDialogError(false)
        const organization = getOrganization()
        Api.Update(props.url, organization)
            .then((result) => {
                if (result.status !== 200 ) {
                    let messageBody = api.GetObject(result)
                    messageBody.then(c => {
                        setOpenDialogError(true)
                        setError(c.message)
                    })
                }else{
                    dialogContext.hide()
                }
            })
            .catch(() => {
                setOpenDialogError(true)
                setError("Something went wrong")
            })
    }

    function handleChangeInput(event, type) {
        const updatedRow = dialogContext.row
        switch (type) {
            case OrganizationProperties.name:
                updatedRow.name = event.target.value
                break
            case OrganizationProperties.fullName:
                updatedRow.fullName = event.target.value
                break
            case OrganizationProperties.type:
                updatedRow.type = event.target.value
                break
            case OrganizationProperties.zipCode:
                if (updatedRow.postalAddress == null) updatedRow.postalAddress = {}
                updatedRow.postalAddress.zipCode = event.target.value
                break
            case OrganizationProperties.x:
                if (updatedRow.postalAddress == null) updatedRow.postalAddress = {}
                if (updatedRow.postalAddress.town == null) updatedRow.postalAddress.town = {}
                updatedRow.postalAddress.town.x = event.target.value
                break
            case OrganizationProperties.y:
                if (updatedRow.postalAddress == null) updatedRow.postalAddress = {}
                if (updatedRow.postalAddress.town == null) updatedRow.postalAddress.town = {}
                updatedRow.postalAddress.town.y = event.target.value
                break
            case OrganizationProperties.z:
                if (updatedRow.postalAddress == null) updatedRow.postalAddress = {}
                if (updatedRow.postalAddress.town == null) updatedRow.postalAddress.town = {}
                updatedRow.postalAddress.town.z = event.target.value
                break
        }
        dialogContext.updateRow(updatedRow)
    }

    return (
        <Dialog open={ dialogContext.visible } onClose={ () => dialogContext.hide() }>
            <DialogTitle>{ dialogContext.isUpdate ? "Обновление" : "Добавление" } организации</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Здесь вы можете { dialogContext.isUpdate ? "обновить" : "добавить" } организацию
                </DialogContentText>
                <TextField onChange={ (event) => handleChangeInput(event, OrganizationProperties.name) }
                           value={ dialogContext.row.name }
                           sx={ { mt: 1, mb: 1 } } fullWidth
                           id="dialog-product-name" label="Name" variant="outlined"/>
                <div>
                    <TextField type="number"
                               onChange={ (event) => handleChangeInput(event, OrganizationProperties.x) }
                               sx={ { mr: 1 } } id="dialog-product-x"
                               label="town x" variant="outlined"
                               value={ dialogContext.row.postalAddress == null || dialogContext.row.postalAddress.town == null ? 0 : dialogContext.row.postalAddress.town.x }/>
                    <TextField type="number"
                               onChange={ (event) => handleChangeInput(event, OrganizationProperties.y) }
                               sx={ { ml: 1 } } id="dialog-product-y"
                               label="town y" variant="outlined"
                               value={ dialogContext.row.postalAddress == null || dialogContext.row.postalAddress.town == null ? 0 : dialogContext.row.postalAddress.town.y }/>
                </div>

                <div>
                    <TextField type="number"
                               onChange={ (event) => handleChangeInput(event, OrganizationProperties.z) }
                               sx={ { mt: 1, mr: 1 } } id="dialog-product-y"
                               label="town z" variant="outlined"
                               value={ dialogContext.row.postalAddress == null || dialogContext.row.postalAddress.town == null ? 0 : dialogContext.row.postalAddress.town.z }/>
                    <TextField onChange={ (event) => handleChangeInput(event, OrganizationProperties.zipCode) }
                               sx={ { mt: 1, ml: 1 } }
                               id="dialog-product-manufactureCost" type="number" label="zip code"
                               variant="outlined"
                               value={ dialogContext.row.postalAddress == null ? 0 : dialogContext.row.postalAddress.zipCode }/>
                </div>
                <TextField onChange={ (event) => handleChangeInput(event, OrganizationProperties.fullName) } fullWidth
                           sx={ { mt: 1, mb: 1 } }
                           id="dialog-product-manufacturer-id" label="full name"
                           variant="outlined" value={ dialogContext.row.fullName }/>

                <TextField fullWidth sx={ { mt: 1 } }
                           id="outlined-select-unitOfMeasure "
                           select
                           label="type"
                           value={ dialogContext.row.type }
                           onChange={ (event) => handleChangeInput(event, OrganizationProperties.type) }>
                    { OrganizationType.map((option) => (
                        <MenuItem key={ option.value } value={ option.value }>
                            { option.label }
                        </MenuItem>
                    )) }
                </TextField>
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

export default OrganizationDialog