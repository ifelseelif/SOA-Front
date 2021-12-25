import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateIcon from '@mui/icons-material/Create';
import Collapse from '@mui/material/Collapse';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Container from '@mui/material/Container';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import pageSizes from "../data/common/pageSizes";
import { conditions } from "../data/common/conditions";
import { useDialog } from "./DialogContext";
import api from "../api/api";


const ExtendedTable = (props) => {
    const [tableData, setTableData] = useState([])
    const [openTableError, setOpenTableError] = useState(false)
    const [error, setError] = useState("")

    const [page, setPage] = useState(0)
    const [amountProduct, setAmountProduct] = useState(10)

    const [condition, setCondition] = useState('>')
    const [property, setProperty] = useState('id')
    const [typeValueInput, setTypeValueInput] = useState('number')
    const [value, setValue] = useState('')

    const [filters, setFilters] = useState([])
    const [sort, setSorts] = useState([])

    const dialogContext = useDialog();

    function updateTable() {
        let params = {}
        filters.forEach(elem => {
            params[elem.propertyName] = elem.condition + ";" + elem.value
        })
        params['pageIndex'] = page
        params['pageSize'] = amountProduct

        setOpenTableError(false)
        let sorts = []
        sort.forEach(elem => sorts.push(['sort', elem.name + ';' + elem.order]))
        fetch("/soa-1/api" + props.url + '?' + new URLSearchParams(params) + "&" + new URLSearchParams(sorts), {
            method: 'GET'
        }).then((data) => {
            let messageBody = api.GetObject(data)
            if (data.status !== 200) {
                setOpenTableError(true)
                messageBody.then(c => {
                    setError(c.message)
                    setOpenTableError(true)
                })
            } else {
                messageBody.then(c => {
                    if (c.ArrayList === '') {
                        setTableData([])
                        return
                    }
                    setTableData(c)
                })
            }
        })
    }

    useEffect(() => {
        updateTable()
    }, [])


    const handleChangeSelectAmountPages = (event) => {
        setAmountProduct(event.target.value);
    }

    function handleDelete(id) {
        api.Delete(props.url, id)
            .then((data) => {
                if (data.status !== 200) {
                    let messageBody = api.GetObject(data)
                    messageBody.then(c => {
                        setOpenTableError(true)
                        setError(c.message)
                    })
                } else {
                    updateTable()
                }
            })
            .catch(() => {
                setOpenTableError(true)
                setError("Something went wrong")
            })
    }

    function handlePage(event) {
        setPage(event.target.value)
    }

    function decrementPage() {
        setPage(page - 1)
        updateTable()
    }

    function incrementPage() {
        setPage(page + 1)
        updateTable()
    }

    function handleChangeProperty(event) {
        setProperty(event.target.value)
        setTypeValueInput(props.fields.find(elem => elem.value === event.target.value).inputType)
    }

    function handleChangeSelectCondition(event) {
        setCondition(event.target.value)
    }

    function handleValue(event) {
        setValue(event.target.value)
    }

    function addFilter() {
        setFilters((filters) => {
            filters.push({
                propertyName: property,
                condition: condition,
                value: value,
                key: filters.length
            })
            return filters
        })
        updateTable()
    }

    function deleteAllFilters() {
        setFilters([])
        updateTable()
    }

    function deleteAllSorts() {
        setSorts([])
        updateTable()
    }

    function deleteFilter(elem) {
        setFilters(filters.filter((value) => {
            return value.key !== elem.key
        }))
        updateTable()
    }

    function deleteSort(elem) {
        setSorts(sort.filter((value) => {
            return value.key !== elem.key
        }))
        updateTable()
    }

    function addSort(name, order) {
        sort.push({
            name: name,
            order: order,
            key: sort.length
        })
        setSorts(sort)
        updateTable()
    }

    function printData() {
        return true
    }

    function handleShowUpdateDialog(row) {
        let properties = props.convertRowToObejct(row);
        dialogContext.showUpdate(properties)
    }

    return (
        <div>
            <h1>{ props.name }
                <IconButton aria-label="desc" size="large" onClick={ () => dialogContext.showAdd() }>
                    <AddIcon fontSize="large"/>
                </IconButton>
                <IconButton aria-label="upload" size="large" onClick={ updateTable }>
                    <CallReceivedIcon fontSize="large"/>
                </IconButton>
            </h1>
            <Collapse in={ openTableError }>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={ () => {
                                setOpenTableError(false);
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
            <TableContainer component={ Paper }>
                <Table sx={ { minWidth: 650 } } aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {
                                props.properties.map(property => {
                                    if (property.value === props.properties.at(-1).value) {
                                        return (
                                            <TableCell align="center">{ property.label }</TableCell>
                                        )
                                    }

                                    return (
                                        <TableCell align="center">{ property.label }
                                            <IconButton aria-label="asc" size="small"
                                                        onClick={ () => addSort(property.value, 'asc') }>
                                                <ExpandLessIcon fontSize="inherit"/>
                                            </IconButton>
                                            <IconButton aria-label="desc" size="small"
                                                        onClick={ () => addSort(property.value, 'desc') }>
                                                <ExpandMoreIcon fontSize="inherit"/>
                                            </IconButton>
                                        </TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { printData() &&
                        tableData.map((row) => (
                            <TableRow
                                key={ row.id[0] }
                                sx={ { '&:last-child td, &:last-child th': { border: 0 } } }
                            >
                                { props.getValueProperties(row).map(property => {
                                    return (<TableCell align="center">{ property }</TableCell>)
                                }) }

                                <TableCell align="center">
                                    <IconButton aria-label="delete" size="small" onClick={ () => handleDelete(row.id) }>
                                        <DeleteIcon fontSize="inherit"/>
                                    </IconButton>
                                    <IconButton aria-label="update" size="small"
                                                onClick={ () => handleShowUpdateDialog(row) }>
                                        <CreateIcon fontSize="inherit"/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )) }
                    </TableBody>
                </Table>
            </TableContainer>


            <Container sx={ { mt: 2 } }>
                <IconButton aria-label="desc" size="large" onClick={ decrementPage }>
                    <ArrowBackIosNewIcon fontSize="large"/>
                </IconButton>
                <TextField
                    id="outlined-number"
                    label="page"
                    type="number"
                    value={ page }
                    onChange={ handlePage }
                    sx={ { width: '12ch' } }
                    InputLabelProps={ {
                        shrink: true,
                    } }
                />
                <IconButton aria-label="desc" size="large" onClick={ incrementPage }>
                    <ArrowForwardIosIcon fontSize="large"/>
                </IconButton>

                <TextField
                    id="outlined-select-amount-page "
                    select
                    sx={ { width: '16ch' } }
                    label="page size"
                    value={ amountProduct }
                    onChange={ handleChangeSelectAmountPages }>
                    { pageSizes.map((option) => (
                        <MenuItem key={ option.value } value={ option.value }>
                            { option.label }
                        </MenuItem>
                    )) }
                </TextField>
            </Container>

            <Container sx={ { mt: 2 } }>
                <h2>Create Filters</h2>
                <TextField
                    id="outlined-select-amount-page "
                    select
                    sx={ { width: '20ch' } }
                    label="property"
                    value={ property }
                    onChange={ handleChangeProperty }>
                    { props.fields.map((option) => (
                        <MenuItem key={ option.value } value={ option.value }>
                            { option.label }
                        </MenuItem>
                    )) }
                </TextField>
                <TextField
                    id="outlined-select-amount-page "
                    select
                    sx={ { ml: 2, width: '15ch' } }
                    label="condition"
                    value={ condition }
                    onChange={ handleChangeSelectCondition }>
                    { conditions.map((option) => (
                        <MenuItem key={ option.value } value={ option.value }>
                            { option.label }
                        </MenuItem>
                    )) }
                </TextField>
                { typeValueInput === 'enum'
                    ? <TextField
                        id="outlined-select-unitOfMeasure "
                        select
                        label="value"
                        value={ value }
                        sx={ { width: '20ch', ml: 2 } }
                        onChange={ handleValue }>
                        { props.enums.map((option) => (
                            <MenuItem key={ option.value } value={ option.value }>
                                { option.label }
                            </MenuItem>)) }
                    </TextField>
                    :
                    <TextField
                        id="outlined-number"
                        label="value"
                        type={ typeValueInput }
                        value={ value }
                        onChange={ handleValue }
                        sx={ { width: '20ch', ml: 2 } }
                        InputLabelProps={ {
                            shrink: true,
                        } }/>
                }
                <IconButton sx={ { ml: 2 } } aria-label="desc" size="large" onClick={ addFilter }>
                    <AddIcon fontSize="inherit"/>
                </IconButton>
                <IconButton sx={ { ml: 2 } } aria-label="desc" size="large" onClick={ deleteAllFilters }>
                    <DeleteSweepIcon fontSize="inherit"/>
                </IconButton>
                <List>
                    { filters.map(elem => {
                        return (
                            <ListItem key={ elem.key }
                                      sx={ { borderRadius: 16, borderColor: 'primary.main', border: 1 } }
                                      secondaryAction={
                                          <IconButton edge="end" aria-label="delete"
                                                      onClick={ () => deleteFilter(elem) }>
                                              <DeleteIcon/>
                                          </IconButton>
                                      }
                            >
                                <ListItemText
                                    primary={ `id : ${ elem.key } property : [ ${ elem.propertyName } ] \t condition : [${ elem.condition }] \t value : [${ elem.value }]` }
                                />
                            </ListItem>)
                    }) }
                </List>
            </Container>

            <Container sx={ { mt: 2 } }>
                <div>
                    <h2>Orders
                        <IconButton sx={ { ml: 2 } } aria-label="desc" size="large" onClick={ deleteAllSorts }>
                            <DeleteSweepIcon fontSize="inherit"/>
                        </IconButton>
                    </h2>
                </div>
                <List>
                    { sort.map(elem => {
                        return (
                            <ListItem key={ elem.key }
                                      sx={ { borderRadius: 16, borderColor: 'primary.main', border: 1 } }
                                      secondaryAction={
                                          <IconButton edge="end" aria-label="delete" onClick={ () => deleteSort(elem) }>
                                              <DeleteIcon/>
                                          </IconButton>
                                      }
                            >
                                <ListItemText
                                    primary={ `id : ${ elem.key } property : [ ${ elem.name } ] \t ${ elem.order }` }
                                />
                            </ListItem>)
                    }) }
                </List>
            </Container>
        </div>
    )
}


export default ExtendedTable