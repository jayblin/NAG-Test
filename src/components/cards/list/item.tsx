import { Card, CardContent, CardMedia, Skeleton, Typography } from "@mui/material";
import { FC } from "react";
import useSWR from 'swr'
import { PokeminDetail, Pokemon } from "../../../types";
import { capitalizeFirstLetter, fetcher, isItemResponse } from "../../../utils";

interface Props {
	pokemon: Pokemon;
}

const TypographySkeleton: FC = () => (
  <Skeleton
    sx={{
      display: 'inline-block',
      width: '30px',
    }}
  />
)

const CardsItem: FC<Props> = ({pokemon}) => {
	const {url, name} = pokemon;
  const { data, error } = useSWR<PokeminDetail>(url, fetcher);
  if (error) console.log(error) // Лучше показать ошибку в карточке
  const pokemonName = capitalizeFirstLetter(name);
  const hasData = isItemResponse(data);
  const imgHeight = 100;

  return <Card sx={{ height: '100%' }}>
    {hasData ? (
      <CardMedia
        component="img"
        height={imgHeight}
        image={data.sprites.front_default ? data.sprites.front_default : 'no-image-icon-6.png'}
        alt={name}
        sx={{
          width: 'initial',
          maxWidth: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          objectFit: 'initial',
        }}
      />
    ) : (
      <Skeleton
        height={imgHeight}
        sx={{
          transform: 'none',
        }}
      />
    )}

    <CardContent>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        noWrap
        sx={{
          overflow: 'hidden',
        }}
        title={pokemonName}
      >
        {pokemonName}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <b>weight:</b> {hasData ? data.weight + ' ед.': <TypographySkeleton />}
      </Typography>
      <Typography variant="body2" color="text.secondary">
      <b>height:</b> {hasData ? data.height + ' ед.' : <TypographySkeleton />}
      </Typography>
    </CardContent>
  </Card>
}

export default CardsItem;
