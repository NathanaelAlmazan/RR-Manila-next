import { gql } from "@apollo/client";

export const CREATE_CITIZEN_CHARTER = gql`
    mutation CreateCitizenCharter($charter: CitizenCharterInput!) {
        createCitizenCharter(charter: $charter) {
            charter_uid
        }
    }
`

export const CREATE_TAXPAYERS = gql`
    mutation CreateTaxpayerRequirements($taxpayer: TaxpayerInput!) {
        createTaxpayerRequirements(taxpayer: $taxpayer) {
            taxpayer_id
            taxpayer_name
        }
    }
`

export const CREATE_ADDITIONAL = gql`
    mutation Mutation($req: AdditionalRequirementInput!) {
        createAdditionalRequirements(req: $req) {
            add_req_id
            condition
        }
    }
`

export const CREATE_CLIENT_STEPS = gql`
    mutation CreateClientProcess($process: [ClientProcessInput!]!) {
        createClientProcess(process: $process) {
            process_step
        }
    }
`

export const CREATE_AGENT_STEPS = gql`
    mutation CreateAgentProcess($process: [AgentProcessInput!]!) {
        createAgentProcess(process: $process) {
            process_step
        }
    }
`