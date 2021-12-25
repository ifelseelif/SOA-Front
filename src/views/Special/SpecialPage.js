import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { Collapse } from "@mui/material";
import api from "../../api/api";


function SpecialPage() {
    const [manufactureCost, setManufactureCost] = useState(0);
    const [error, setError] = useState('')
    const [showError, setShowError] = useState(false)
    const [isOk, setIsOk] = useState(false)

    function execute() {
        setShowError(false)
        setIsOk(false)
        fetch("/soa-1/api/special/?manufactureCost=" + manufactureCost, { method: 'DELETE' })
            .then((data) => {
                if (data.status === 200) {
                    setIsOk(true)
                } else {
                    let messageBody = api.GetObject(data)
                    messageBody.then(c => {
                        setShowError(true)
                        setIsOk(false)
                        setError(c.message)
                    })
                }
            })
            .catch(() => {
                setShowError(true)
                setIsOk(false)
                setError("Something went wrong, try again later")
            })
    }

    function handleChangeManufactureCost(e) {
        setManufactureCost(e.target.value)
    }

    return (
        <div>
            <h1>Special page
            </h1>
            <p>Здесь вы можете испробовать дополнительные возможности</p>
            <Container>
                <p>Здесь вы можете удалить все объекты, значение поля manufactureCost которого эквивалентно
                    заданному.</p>
                <Collapse in={ showError }>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={ () => {
                                    setShowError(false);
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
                <TextField
                    value={ manufactureCost }
                    onChange={ handleChangeManufactureCost }
                    sx={ { ml: 1 } }
                    id="dialog-product-manufactureCost" type="number" label="manufacture cost"
                    variant="outlined">
                </TextField>
                <IconButton
                    onClick={ execute }
                    aria-label="upload" size="large">
                    <PlayCircleOutlineIcon fontSize="large"/>
                </IconButton>
                { isOk && <h3>Ok</h3> }
            </Container>
        </div>
    )
}

export default SpecialPage