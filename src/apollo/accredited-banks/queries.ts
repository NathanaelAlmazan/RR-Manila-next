import { gql } from "@apollo/client";

export const REVENUE_DISTRICT_OFFICES = gql`
    query RevenueDistrictOffices {
        revenueDistrictOffices {
            rdo_no
            rdo_name
        }
    }
`;

export const ACCREDITED_BANKS_BY_RDO = gql`
    query AccreditedBanksByRdo($rdo: Int!) {
        accreditedBanksByRdo(rdo: $rdo) {
            bank_no
            rdo_no
            bank_branch
            bank_abbr
            bldg_no
            street
            district
            city
            bank_details {
                bank_logo
                bank_name
            }
        }
    }
`;

export const BANK_ADDRESSES = gql`
    query BankAddresses($query: String!) {
        bankAddresses(query: $query)
    }
`;

export const ACCREDITED_BANKS_BY_ADDRESS = gql`
    query AccreditedBanksByAddress($address: String!) {
        accreditedBanksByAddress(address: $address) {
            bank_no
            rdo_no
            bank_branch
            bank_abbr
            bldg_no
            street
            district
            city
            bank_details {
                bank_logo
                bank_name
            }
        }
    }
`;