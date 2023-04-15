import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { Box, CircularProgress, Typography, useMediaQuery, useTheme } from '@mui/material';
import { fetcher, isListResponse } from '../../utils';
import CardsList from './list/list';
import CardsPagination from './pagination';
import { ListResponse } from '../../types';

const Cards: FC = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  const cardsLimit = (() => {
    if (lg) return 12;
    if (md) return 8;
    if (sm) return 6;
    return 4;
  })();

  const [page, setPage] = useState(0);
  const { data, error, isLoading } = useSWR<ListResponse>(
	`https://pokeapi.co/api/v2/pokemon/?offset=${page}&limit=${cardsLimit}`,
	fetcher
  );

  const handleChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage((value - 1) * cardsLimit);
  };

  const shouldDisplay = !error && isListResponse(data);

  return (
    <Box sx={{
      position: 'relative',
    }}>
		{shouldDisplay &&
			<CardsList
				isLoading={isLoading}
				cardsLimit={cardsLimit}
				data={data}
			/>
		}
		{shouldDisplay &&
			<CardsPagination
				disabled={isLoading}
				onChange={handleChange}
				data={data}
				limit={cardsLimit}
			/>
		}
      {
        isLoading && (
          <CircularProgress
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(50%, 50%)',
            }}
          />
        )
      }
      {
        error && (
          <Typography
            component="div"
            variant="h3"
            sx={{
              textAlign: 'center'
            }}
          >
            Данные не удалось загрузить :(
          </Typography>
        )
      }
    </Box>
  )

}

export default Cards;
