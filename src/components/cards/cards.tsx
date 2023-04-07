import { ChangeEvent, FC, useEffect, useState } from 'react';
import useSWR from 'swr';
import { Box, CircularProgress, Typography, useMediaQuery, useTheme } from '@mui/material';
import { fetcher, isListResponse } from '../../utils';
import CardsList from './list/list';
import CardsPagination from './pagination';
import { IListResponse } from '../../types';

const Cards: FC = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));

  enum CardsLimit {
    xs = 4,
    sm = 6,
    md = 8,
    lg = 12,
  }

  const getCardsLimit = () => {
    if (lg) return CardsLimit.lg;
    if (md) return CardsLimit.md;
    if (sm) return CardsLimit.sm;
    return CardsLimit.xs;
  }
  const [page, setPage] = useState(0);
  const cardsLimit = getCardsLimit();
  const { data, error, isLoading } = useSWR<IListResponse>(`https://pokeapi.co/api/v2/pokemon/?offset=${page}&limit=${cardsLimit}`, fetcher);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isListResponse(data)) {
      setCount(data.count)
    }
  }, [data]);

  const pagesQty = Math.ceil(count / getCardsLimit());

  const handleChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage((value - 1) * cardsLimit);
  };

  return (
    <Box sx={{
      position: 'relative',
    }}>
      <CardsList isLoading={isLoading} cardsLimit={cardsLimit} data={data} />
      <CardsPagination
        disabled={isLoading}
        onChange={handleChange}
        pagesQty={pagesQty}
      />
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
