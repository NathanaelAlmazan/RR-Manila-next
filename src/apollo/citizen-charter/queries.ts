import { gql } from "@apollo/client";

export const GET_CITIZEN_CHARTER = gql`
    query CitizenCharter($uid: String!) {
        citizenCharter(uid: $uid) {
            charter_uid
            title
            description
            total_duration
            classification
            total_fee
            office_division {
                code
                name
            }
            transactions {
                name
                type
            }
            registries {
                classification
                register_office
            }
            taxpayer_requirements {
                taxpayer_name
                requirements {
                    additional
                    notes
                    req_name
                    req_desc
                    sources {
                        src_desc
                        src_name
                    }
                }
            }
            additional_requirements {
                condition
                requirements {
                    additional
                    notes
                    req_desc
                    req_name
                    sources {
                        src_desc
                        src_name
                    }
                }
            }
            agent_process {
                step_desc
                process_step
                personnel
                duration
            }
            client_process {
                duration
                fees
                notes
                personnel
                process_step
                step_desc
            }
        }
    }
`

export const GET_CITIZEN_CHARTER_UID_LIST = gql`
    query CitizenCharterList {
        citizenCharterList {
            charter_uid
        }  
    }
    
`

export const GET_CITIZEN_CHARTER_LIST = gql`
    query CitizenCharterList {
        citizenCharterList {
            title
            total_fee
            total_duration
            description
            charter_uid
        }
    }
    
`

export const GET_TRANSACTION_TYPES = gql`
    query Transactions {
        transactions {
            name
            type
        }
    }
`

export const GET_OFFICES_DIVISION = gql`
    query Transactions {
        officesDivision {
            code
            name
        }
    }
`

export const GET_RELATED_CHARTERS = gql`
    query RelatedCitizenCharters($uid: String!) {
        relatedCitizenCharters(uid: $uid) {
            charter_uid
            title
            total_fee
            total_duration
        }
    }
`

export const GET_SEARCH_SUGGESTIONS = gql`
    query Query($query: String!) {
        charterSearchSuggestions(query: $query)
    }
`

export const SEARCH_CITIZEN_CHARTER = gql`
    query SearchCitizenCharter($query: String!) {
        searchCitizenCharter(query: $query) {
            charter_uid
            title
            total_duration
            total_fee
            description
            registries {
                register_office
            }
            taxpayer_requirements {
                requirements {
                    req_name
                }
            }
            client_process {
                step_desc
            }
        }
    }
`