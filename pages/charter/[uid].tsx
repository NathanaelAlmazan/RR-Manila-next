// next
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
// mui
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// project components
import MainLayout from 'src/layout';
import SearchBar from "src/components/SearchBar";
import {
    CharterHeader,
    CharterDetails,
    ChecklistOfRequirements,
    CharterProcess,
    RelatedCharter,
    FrequentlyAskedQuestions,
    CharterRegistry
} from 'src/sections/CitizenCharter';
// apollo
import apolloClient from "src/apollo";
import { 
  GET_CITIZEN_CHARTER,
  GET_CITIZEN_CHARTER_UID_LIST,
  GET_RELATED_CHARTERS,
  GET_SEARCH_SUGGESTIONS
} from "src/apollo/citizen-charter/queries";
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
    const router = useRouter();

    const handleSearchQuery = (searchQuery: string | null) => {
        if (searchQuery) {
            router.push({
                pathname: '/charter',
                query: { search: searchQuery }
            })
        }
    }

    return (
        <MainLayout>
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={7} md={8}>
                        <Box sx={{
                            display: { xs: 'flex', sm: 'none' },
                            width: 300,
                            mt: 8
                        }}>
                            <SearchBar 
                                placeholder="Search a charter"
                                onSearchChange={handleSearchQuery}
                                queryDocument={GET_SEARCH_SUGGESTIONS}
                                queryObject="charterSearchSuggestions"
                            />
                        </Box>
                        <CharterHeader
                            title={title}
                            description={description}
                            processDuration={total_duration}
                            processFee={total_fee}
                        />
                        <Box sx={{
                            display: { xs: 'flex', sm: 'none' },
                            justifyContent: 'center',
                            width: '100%',
                            my: 3
                        }}>
                            <FrequentlyAskedQuestions charter={citizenCharter} />
                        </Box>
                        <Box sx={{
                            display: { xs: 'flex', sm: 'none' },
                            justifyContent: 'center',
                            width: '100%',
                            my: 3
                        }}>
                            <CharterDetails 
                                officeDivision={office_division}
                                classification={classification}
                                transType={transactions}
                            />
                        </Box>
                        <CharterRegistry registries={registries} />
                        <ChecklistOfRequirements 
                            taxpayers={taxpayer_requirements}
                            additional={additional_requirements}
                        />
                        <CharterProcess 
                            agentProcess={agent_process}
                            clientProcess={client_process}
                        />
                        <RelatedCharter relatedCharters={relatedCitizenCharters} />
                    </Grid>
                    <Grid item xs={12} sm={5} md={4}>
                        <Box sx={{ 
                            backgroundColor: (theme) => theme.palette.grey[200], 
                            p: 2,
                            display: { xs: 'none', sm: 'flex' },
                            justifyContent: 'center',
                            flexDirection: 'column'
                        }}>
                            <Box sx={{ mt: 8 }}>
                                <SearchBar 
                                    placeholder="Search a charter"
                                    onSearchChange={handleSearchQuery}
                                    queryDocument={GET_SEARCH_SUGGESTIONS}
                                    queryObject="charterSearchSuggestions"
                                />
                            </Box>
                            <Box sx={{ width: '100%', mt: 2 }}>
                                <FrequentlyAskedQuestions charter={citizenCharter} />
                            </Box>
                            <Box sx={{ width: '100%', mt: 2 }}>
                                <CharterDetails 
                                    officeDivision={office_division}
                                    classification={classification}
                                    transType={transactions}
                                />
                            </Box>

                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </MainLayout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const { data: { citizenCharterList }} = await apolloClient.query({
        query: GET_CITIZEN_CHARTER_UID_LIST
    })

    const uidList: CitizenCharter[] = citizenCharterList
    
    return {
        paths: uidList.map(path => ({
            params: {
                uid: path.charter_uid
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