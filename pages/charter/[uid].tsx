// next
import { GetStaticPaths, GetStaticProps } from 'next';
// mui
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
// project components
import MainLayout from 'src/layout';
import SearchBar from "src/components/SearchBar";
import {
    CharterHeader,
    CharterDetails,
    ChecklistOfRequirements,
    CharterProcess,
    RelatedCharter
} from 'src/sections/CitizenCharter';
// apollo
import apolloClient from "src/apollo";
import { 
  GET_CITIZEN_CHARTER,
  GET_CITIZEN_CHARTER_UID_LIST,
  GET_RELATED_CHARTERS
} from "src/apollo/citizen-charter/queries"
import { 
  CitizenCharter
} from "src/apollo/citizen-charter/types";

export default function CitizenCharterPage(
    { citizenCharter, relatedCitizenCharters }: 
    { citizenCharter: CitizenCharter, relatedCitizenCharters: CitizenCharter[] }
) {
    const { 
        title, 
        description, 
        total_duration, 
        total_fee,
        taxpayer_requirements,
        additional_requirements,
        agent_process,
        client_process,
        office_division,
        classification,
        registries,
        transactions
    } = citizenCharter;

    return (
        <MainLayout>
            <Container maxWidth="md">
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%'
                }}>
                    <Box sx={{ width: 400, mt: { xs: 5, sm: 0 } }}>
                        <SearchBar 
                            placeholder="Search a charter"
                            onSearchChange={() => console.log("search")}
                        />
                    </Box>
                </Box>
                <CharterHeader
                    title={title}
                    description={description}
                    processDuration={total_duration}
                    processFee={total_fee}
                />
                <CharterDetails 
                    officeDivision={office_division}
                    classification={classification}
                    registries={registries}
                    transType={transactions}
                />
                <ChecklistOfRequirements 
                    taxpayers={taxpayer_requirements}
                    additional={additional_requirements}
                />
                <CharterProcess 
                    agentProcess={agent_process}
                    clientProcess={client_process}
                />
                <RelatedCharter relatedCharters={relatedCitizenCharters} />
            </Container>
        </MainLayout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const { data: { citizenCharterUidList }} = await apolloClient.query({
        query: GET_CITIZEN_CHARTER_UID_LIST
    })

    const uidList: string[] = citizenCharterUidList
    
    return {
        paths: uidList.map(path => ({
            params: {
                uid: path
            }
        })),
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { data: { citizenCharter }} = await apolloClient.query({
        query: GET_CITIZEN_CHARTER,
        variables: {
            uid: params?.uid
        }
    })

    const { data: { relatedCitizenCharters }} = await apolloClient.query({
        query: GET_RELATED_CHARTERS,
        variables: {
            uid: params?.uid
        }
    })

    return {
        props: {
            citizenCharter,
            relatedCitizenCharters
        }
    }
}