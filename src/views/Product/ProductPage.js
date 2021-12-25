import ExtendedTable from "../../components/ExtendedTable";
import { productFields, productProperties } from "../../data/products/productProperties";
import ProductDialog from "./ProductDialog";
import { DialogProvider } from "../../components/DialogContext";
import React from "react";
import { UnitOfMeasures } from "../../data/products/unitOfMeasures";

function ProductPage() {

    const getValueProperties = (row) => {
        return [row.id, row.name, row.coordinates.x, row.coordinates.y, row.creationDate,
            row.manufactureCost, row.price, row.unitOfMeasure, row.manufacturer.id]
    }

    const rawToProduct = (row) => {
        return {
            id : row.id,
            name : row.name,
            coordinates : {
                x: row.coordinates.x,
                y: row.coordinates.y
            },
            creationDate : row.creationDate,
            price : row.price,
            manufactureCost : row.manufactureCost,
            unitOfMeasure : row.unitOfMeasure,
            manufacturer : {
                id : row.manufacturer.id
            }
        }
    }

    return (
        <DialogProvider>
            <ProductDialog url="/products"
            />
            <ExtendedTable name="Products"
                           convertRowToObejct={ rawToProduct }
                           url="/products"
                           fields={ productFields }
                           enums={ UnitOfMeasures }
                           getValueProperties={ getValueProperties }
                           properties={ productProperties }
            />
        </DialogProvider>
    )
}

export default ProductPage