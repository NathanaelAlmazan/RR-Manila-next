
export interface CitizenCharter {
    charter_uid: string;
    title: string;
    description: string;
    classification: string;
    total_fee: number;
    total_duration: string;
    office_division: OfficeDivision[];
    transactions: Transaction[];
    registries: Registry[];
    taxpayer_requirements: TaxpayerRequirements[];
    additional_requirements: AdditionalRequirement[];
    agent_process: AgentProcess[];
    client_process: ClientProcess[];
} 

export interface OfficeDivision {
    code: string;
    name: string;
}

export interface Transaction {
    type: string;
    name: string;
}

export interface Registry {
    classification: string;
    register_office: string;
}

export interface Requirement {
    req_name: string;
    req_desc: string;
    notes: string | null;
    additional: boolean;
    sources: Sources[];
}

export interface Sources {
    src_name: string;
    src_desc: string | null;
}

export interface TaxpayerRequirements {
    taxpayer_name: string;
    requirements: Requirement[];
}

export interface AdditionalRequirement {
    condition: string;
    requirements: Requirement[];
}

export interface ClientProcess {
    process_step: number;
    charter_uid: string;
    step_desc: string;
    notes: string | null;
    fees: number | null;
    duration: string;
    personnel: string;
}

export interface AgentProcess {
    process_step: number;
    charter_uid: string;
    step_desc: string;
    duration: string;
    personnel: string;
}