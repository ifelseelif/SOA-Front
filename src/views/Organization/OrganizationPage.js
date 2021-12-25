import ExtendedTable from "../../components/ExtendedTable";
import { organizationEnums, organizationFields } from "../../data/organizations/organizationEnums";
import { DialogProvider } from "../../components/DialogContext";
import OrganizationDialog from "./OrganizationDialog";
import React from "react";
import { OrganizationType } from "../../data/organizations/organizationType";


function OrganizationPage() {

    const getValueProperties = (row) => {
        return [row.id, row.name, row.fullName, row.type, row.postalAddress.zipCode,
            row.postalAddress.town.x, row.postalAddress.town.y, row.postalAddress.town.z]
    }

    const rawToOrganization = (row) => {
        return {
            id: row.id,
            name: row.name,
            postalAddress: {
                zipCode: row.postalAddress.zipCode,
                town: {
                    x: row.postalAddress.town.x,
                    y: row.postalAddress.town.y,
                    z: row.postalAddress.town.z
                }
            },
            fullName: row.fullName,
            type: row.type
        }
    }

    return (
        <DialogProvider>
            <OrganizationDialog url="/organizations"/>
            <ExtendedTable name="Organizations"
                           fields={ organizationFields }
                           convertRowToObejct={ rawToOrganization }
                           url="/organizations"
                           enums={ OrganizationType }
                           getValueProperties={ getValueProperties }
                           properties={ organizationEnums }/>
        </DialogProvider>
    )
}

export default OrganizationPage