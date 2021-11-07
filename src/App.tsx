import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SpecialPage from "./views/Special/SpecialPage";
import OrganizationPage from "./views/Organization/OrganizationPage";
import ProductPage from "./views/Product/ProductPage";

function App() {
    const [containerType, setContainerType] = useState('products')

    function changeContainerType(contType: string) {
        setContainerType(contType)
    }

    return (<div className='wrapper'>
            <ButtonGroup size="large" variant="text" aria-label="text button group">
                <Button onClick={ () => {
                    changeContainerType('organization')
                } } sx={ { pl: 5, pr: 5 } }>Organizations</Button>
                <Button onClick={ () => {
                    changeContainerType('products')
                } } sx={ { pl: 5, pr: 5 } }>Products</Button>
                <Button onClick={ () => {
                    changeContainerType('special')
                } } sx={ { pl: 5, pr: 5 } }>Special features</Button>
            </ButtonGroup>
            { containerType === 'products' && <ProductPage/> }
            { containerType === 'organization' && <OrganizationPage/> }
            { containerType === 'special' && <SpecialPage/> }
        </div>);
}

export default App;
