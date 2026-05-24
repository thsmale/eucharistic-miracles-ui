import { useEffect } from 'react';
import {
  Accordion,
  AccordionPanel,
  Box,
  List,
  Text,
} from 'grommet';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setIndexes, setCountries } from '../redux/accordion';
import { handleGroupSort } from '../data/miracles';
import {
  type MiracleMetadata,
  type MiracleMetadataGroupByCountry,
} from '../data/types';

type Props = {
  miracles: MiracleMetadata[];
}

// TODO: Slapped this together last minute for mobile users, refactor...
export const MiraclesAccordion = ({ miracles }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const sortValue = useAppSelector(state => state.sort);
  const openPanels = useAppSelector(state => state.accordion.indexes);
  const openCountries = useAppSelector(state => state.accordion.countries);

  useEffect(() => {
    /**
     * Maintain order of open AccordionPanels
     * When filers or search are applied
     * Say you have Argentina and Italy open with no filters/search
     * Then user only wants to see Miracles for Italy and Spain
     * We will want Italy to remain open
     */
    if (miracles.length === 0) return;
    const indexes: number[] = [];
    Object.entries(groupByCountrySorted).map(([country], index) => {
      if (openCountries.includes(country)) {
        indexes.push(index);
      }
    })
    dispatch(setIndexes(indexes))
  }, [miracles])

  if (miracles.length === 0) {
    return null;
  }

  const groupByCountry: MiracleMetadataGroupByCountry = miracles.reduce<Record<string, MiracleMetadata[]>>((acc, miracle) => {
    const { country } = miracle;
    if (!acc[country]) {
      acc[country] = [miracle];
    } else {
      acc[country].push(miracle);
    }
    return acc;
  }, {});

  const groupByCountrySorted: MiracleMetadataGroupByCountry = handleGroupSort(structuredClone(groupByCountry), sortValue);

  return (
    <Accordion
      activeIndex={openPanels}
      animate={false}
      fill
      multiple={true}
      onActive={(indexes) => {
        // 1. Get the list of countries currently selected in the UI
        const curDisplayedCountries = Object.keys(groupByCountrySorted);
        const curOpenCountries = indexes.map(index => curDisplayedCountries[index]);

        // 2. Identify which of the currently displayed countries are NO LONGER selected
        const closedCountries = curDisplayedCountries.filter(
          country => !curOpenCountries.includes(country)
        );

        // 3. Filter out the closed countries from the global list, 
        // then append any newly selected countries that aren't already there.
        const updatedOpenCountries = openCountries
          .filter(country => !closedCountries.includes(country))
          .concat(curOpenCountries.filter(country => !openCountries.includes(country)));

        dispatch(setCountries(updatedOpenCountries));
        dispatch(setIndexes(indexes));
      }}
    >
      {Object.entries(groupByCountrySorted).map(([country, miracles]) => {
        return (
          <AccordionPanel label={country} key={country}>
            <List
              aria-label={`Miracles for ${country}`}
              data={miracles}
              action={item => <Text key={item.path}>{item.year}</Text>}
              onClickItem={e => {
                const { endpoint, path } = e.item;
                navigate(endpoint, { state: { path }})
              }}
            >
              {datum => (
                <Box key={datum.path} direction="row" gap="xsmall" align="center">
                  <Text weight={500} color='text-strong'>{datum.city}</Text>
                </Box>
              )}
            </List>
          </AccordionPanel>
        )
      })}
    </Accordion>
  );
};
