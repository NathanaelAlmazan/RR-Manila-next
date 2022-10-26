import * as React from 'react';
// next
import { GetStaticProps } from 'next';
// mui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// project components
import MainLayout from 'src/layout';
import SearchBar from "src/components/SearchBar"
import { 
  BankList, 
  BankTags, 
  DistrictList,
  PinnedBanks
} from 'src/sections/AccreditedBanks';
// apollo
import apolloClient from "src/apollo";
import { useLazyQuery } from "@apollo/client";
import { 
  REVENUE_DISTRICT_OFFICES, 
  ACCREDITED_BANKS_BY_RDO,
  ACCREDITED_BANKS_BY_ADDRESS
} from "src/apollo/accredited-banks/queries";
import { 
  AccreditedBanks, 
  RevenueDistrictOffice 
} from "src/apollo/accredited-banks/types";


function mapBankDistrict(accreditedBanks: AccreditedBanks[]) {
  const districts: number[] = [];
  accreditedBanks.forEach(bank => {
      if (!districts.includes(bank.rdo_no)) {
          districts.push(bank.rdo_no)
      }
  })
  return districts;
}

function mapBankNames(accreditedBanks: AccreditedBanks[]) {
  const bankNames: string[] = [];
  accreditedBanks.forEach(bank => {
      if (!bankNames.includes(bank.bank_abbr)) {
          bankNames.push(bank.bank_abbr)
      }
  })
  return bankNames;
}

export default function Home(
  { districtOffices, accreditedBanks } : 
  { districtOffices: RevenueDistrictOffice[], accreditedBanks: AccreditedBanks[], searchSuggestions: string[] }
) {
  const [banks, setBanks] = React.useState(accreditedBanks);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [pinnedBanks, setPinnedBanks] = React.useState<AccreditedBanks[]>([]);
  const [getBanksByRdo] = useLazyQuery(ACCREDITED_BANKS_BY_RDO);
  const [getSearchResults] = useLazyQuery(ACCREDITED_BANKS_BY_ADDRESS);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const pinned = localStorage.getItem('pinnedBanks');
      if (pinned) setPinnedBanks(JSON.parse(pinned));
    }
  }, [])

  React.useEffect(() => {
    if (pinnedBanks.length > 0) {
      localStorage.setItem('pinnedBanks', JSON.stringify(pinnedBanks));
    } else {
      localStorage.removeItem('pinnedBanks');
    }
  }, [pinnedBanks])

  const handleSelectTag = (tag: string) => {
    const index = selectedTags.indexOf(tag);
    if (index > -1) setSelectedTags(state => state.filter(s => s !== tag))
    else setSelectedTags(state => [...state, tag])
  }

  const handleChangeRdo = async (rdo: number) => {
    const result = await getBanksByRdo({ variables: { rdo } })
    setBanks(result.data.accreditedBanksByRdo)
  }

  const handleSearchChange = (searchQuery: string | null) => {
    if (searchQuery) {
        getSearchResults({ variables: { address: searchQuery }})
            .then(result => {
                setBanks(result.data.accreditedBanksByAddress);
            })
    } else {
        setBanks(accreditedBanks)
    }
  }

  const handlePinnedBanks = (bank: AccreditedBanks) => {
    if (pinnedBanks.find(b => b.bank_no === bank.bank_no)) {
      setPinnedBanks(state => state.filter(b => b.bank_no !== bank.bank_no))
    } else {
      setPinnedBanks(state => [...state, bank])
    }
  }

  return (
    <MainLayout>
      <Container maxWidth="lg">
        <Grid container>
          <Grid 
            item 
            xs={12} 
            sm={7} 
            md={8}
            order={{ xs: 2, sm: 1, }}
          >
            <BankList 
              selected={selectedTags}
              accreditedBanks={banks}
              onPinBank={handlePinnedBanks}
            />
            <Box
              sx={{ 
                display: { xs: 'flex', sm: 'none' },
                backgroundColor: (theme) => theme.palette.grey[200]
              }}
            >
              <PinnedBanks 
                pinned={pinnedBanks}
                onUnpinBank={handlePinnedBanks}
              />
            </Box>
          </Grid>
          <Grid 
            item 
            xs={12} 
            sm={5} 
            md={4}
            order={{ xs: 1, sm: 2 }}
            sx={{ 
              backgroundColor: (theme) => theme.palette.grey[200],
              pt: 5
            }}
          >
            <SearchBar
              placeholder="Search a location"
              onSearchChange={handleSearchChange}
            />
            <DistrictList 
              selected={mapBankDistrict(banks)}
              districtOffices={districtOffices} 
              onSelect={handleChangeRdo}
            />
            <BankTags 
              selected={selectedTags}
              onSelect={handleSelectTag} 
              banks={mapBankNames(banks)} 
            />
            <Box
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              <PinnedBanks 
                pinned={pinnedBanks}
                onUnpinBank={handlePinnedBanks}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { data: { revenueDistrictOffices } } = await apolloClient.query({
      query: REVENUE_DISTRICT_OFFICES
  });

  const { data: { accreditedBanksByRdo } } = await apolloClient.query({
      query: ACCREDITED_BANKS_BY_RDO,
      variables: {
          rdo: 29
      }
  });

  return {
      props: {
          districtOffices: revenueDistrictOffices,
          accreditedBanks: accreditedBanksByRdo
      },
      revalidate: 60 * 60 * 6
  }
} 