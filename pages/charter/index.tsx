import React from 'react';
// next
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
// mui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// project components
import MainLayout from 'src/layout';
import SearchBar from "src/components/SearchBar";
import { SearchResultCard } from 'src/sections/CitizenCharter';
// apollo
import apolloClient from "src/apollo";
import { useLazyQuery } from "@apollo/client";
import { 
  GET_CITIZEN_CHARTER_LIST,
  GET_SEARCH_SUGGESTIONS,
  SEARCH_CITIZEN_CHARTER
} from "src/apollo/citizen-charter/queries";
import { 
  CitizenCharter
} from "src/apollo/citizen-charter/types";

export default function CitizenCharterList(
    { citizenCharterList }: { citizenCharterList: CitizenCharter[] }
) {
    const router = useRouter();
    const [charterList, setCharterList] = React.useState<CitizenCharter[]>(citizenCharterList);
    const [getSearchResults] = useLazyQuery(SEARCH_CITIZEN_CHARTER);

    React.useEffect(() => {
        if (router.query.search) {
            getSearchResults({ variables: { query: router.query.search }})
                .then(result => {
                    setCharterList(result.data.searchCitizenCharter)
                })
        }
    }, [getSearchResults, router])

    const handleSearchQueryChange = (searchQuery: string | null) => {
        if (searchQuery) {
            getSearchResults({ variables: { query: searchQuery }})
                .then(result => {
                    setCharterList(result.data.searchCitizenCharter)
                })
        } else {
            setCharterList(citizenCharterList)
        }
    }

    return (
        <MainLayout>
            <Container maxWidth="md">
                <Box sx={{ pt: { xs: 8, md: 5 }, mb: 1 }}>
                    <SearchBar 
                        placeholder='Search a charter'
                        onSearchChange={handleSearchQueryChange}
                        queryDocument={GET_SEARCH_SUGGESTIONS}
                        queryObject="charterSearchSuggestions"
                        searchQuery={router.query.search as string}
                    />
                </Box>
                <Typography variant='subtitle2'>
                    {`About ${charterList.length} results found.`}
                </Typography>
                <Grid container spacing={2} sx={{ mb: 8 }}>
                    <Grid item xs={12}>
                        {charterList.map(charter => (
                            <SearchResultCard key={charter.charter_uid} charter={charter} />
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </MainLayout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const { data: { citizenCharterList }} = await apolloClient.query({
        query: GET_CITIZEN_CHARTER_LIST
    })

    return {
        props: {
            citizenCharterList
        }
    }
}