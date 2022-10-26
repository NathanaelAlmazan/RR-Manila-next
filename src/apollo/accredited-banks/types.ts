export type AccreditedBanks = {
    bank_no: number,
    rr_no: number,
    rdo_no: number,
    bank_code: string,
    bank_abbr: string,
    bank_branch: string,
    bldg_no: string,
    street: string,
    district: string,
    city: string,
    bank_details: BankDetails
    rdo_details: RevenueDistrictOffice
}

export type RevenueDistrictOffice = {
    rdo_no: number,
    rdo_name: string,
    accredited_banks: AccreditedBanks[]
}

export type BankDetails = {
    bank_abbr: string,
    bank_name: string,
    bank_logo: string
    bank_locations: AccreditedBanks[]
}