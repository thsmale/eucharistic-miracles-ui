import React from 'react';
import {
  Box,
  DataTable,
  Text,
} from 'grommet';
import { useNavigate } from 'react-router';
import { colorMap } from './data/miracles';

export const MiraclesDataTable = () => {
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
          navigate(`${datum.endpoint}`, { state: { path: datum.path }})
        }}
        primaryKey={'path'}
        sortable={false}
        verticalAlign={{ body : 'top' }}
      />
    </Box>
  )
}