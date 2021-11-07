import ExtendedTable from "../../components/ExtendedTable";
import { organizationEnums, organizationFields } from "../../data/organizations/organizationEnums";
import { DialogProvider } from "../../components/DialogContext";
import OrganizationDialog from "./OrganizationDialog";
import React from "react";
import { OrganizationType } from "../../data/organizations/organizationType";


function OrganizationPage() {

    const getValueProperties = (row) => {
        return [row.id[0], row.name[0], row.fullName[0], row.type[0], row.postalAddress[0].zipCode[0],
            row.postalAddress[0].town[0].x[0], row.postalAddress[0].town[0].y[0], row.postalAddress[0].town[0].z[0]]
    }

    const rawToOrganization = (row) => {
        return {
            id: row.id[0],
            name: row.name[0],
            postalAddress: {
                zipCode: row.postalAddress[0].zipCode[0],
                town: {
                    x: row.postalAddress[0].town[0].x[0],
                    y: row.postalAddress[0].town[0].y[0],
                    z: row.postalAddress[0].town[0].z[0]
                }
            },
            fullName: row.fullName[0],
            type: row.type[0]
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