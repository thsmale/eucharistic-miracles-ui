import React, { useState } from 'react';
import {
  Box,
  DataTable,
  Text,
} from 'grommet';
import { useNavigate } from 'react-router';
import { colorMap } from './data/miracles';

interface SortObject {
  direction: 'asc' | 'desc',
  external: boolean,
  property: string,
};

export const MiraclesDataTable = () => {
  const [sort, setSort] = useState<SortObject>({
    direction: 'asc',
    external: true,
    property: 'country',
  })
  const navigate = useNavigate();

  return (
    <Box overflow="auto">
      <DataTable
        aria-describedby='eucharistic-miracles-list'
        columns={[
          {
            property: 'country',
            header: <Text>Country</Text>,
          },
          {
            property: 'city',
            header: <Text>City</Text>,
          },
          {
            property: 'year',
            header: <Text>Year</Text>,
          },
          {
            property: 'categories',
            header: <Text>Categories</Text>,
            render: datum => {
              if (datum.categories.length > 0) {
                return (
                  <Box direction="row" gap="xsmall">
                    {datum.categories.map(category => (
                      <Box
                        background={colorMap[category]}
                        round='medium'
                        align='center'
                        width='xsmall'
                        key={`${datum.path}-${category}`}
                      >
                        {category}
                      </Box>
                    ))}
                  </Box>
                );
              }
              return (
                <Box>--</Box>
              )
            }
          }
        ]}
        onClickRow={({ datum }) => {
          navigate(`${datum.country}/${datum.city}`, { state: { path: datum.path }})
        }}
        onSort={({ property, direction }) => {
          const sortObj: SortObject = {
            direction,
            external: true,
            property,
          }
          setSort(sortObj);
        }}
        sort={sort}
        primaryKey={'path'}
        sortable={true}
        verticalAlign={{ body : 'top' }}
      />
    </Box>
  )
}