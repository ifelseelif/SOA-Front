import ExtendedTable from "../../components/ExtendedTable";
import { productFields, productProperties } from "../../data/products/productProperties";
import ProductDialog from "./ProductDialog";
import { DialogProvider } from "../../components/DialogContext";
import React from "react";
import { UnitOfMeasures } from "../../data/products/unitOfMeasures";

function ProductPage() {

    const getValueProperties = (row) => {
        return [row.id[0], row.name[0], row.coordinates[0].x[0], row.coordinates[0].y[0], row.creationDate[0],
            row.manufactureCost[0], row.price[0], row.unitOfMeasure[0], row.manufacturer[0].id[0]]
    }

    const rawToProduct = (row) => {
        return {
            id : row.id[0],
            name : row.name[0],
            coordinates : {
                x: row.coordinates[0].x[0],
                y: row.coordinates[0].y[0]
            },
            creationDate : row.creationDate[0],
            price : row.price[0],
            manufactureCost : row.manufactureCost[0],
            unitOfMeasure : row.unitOfMeasure[0],
            manufacturer : {
                id : row.manufacturer[0].id[0]
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