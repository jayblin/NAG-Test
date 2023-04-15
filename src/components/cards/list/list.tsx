import { FC } from "react";
import { Card, Grid } from "@mui/material";
import CardsItem from "./item";
import { ListResponse } from "../../../types";
import { isListResponse } from "../../../utils";

interface Props {
  isLoading: boolean,
  cardsLimit: number,
  data: ListResponse,
}

const CardsList: FC<Props> = ({ isLoading, cardsLimit, data }) => {
  const noDataArray = new Array(cardsLimit).fill(undefined);

  return (
    <Grid container spacing={2}>
      {
        !isLoading &&
        data.results.map((pokemon) => {
          return (
            <Grid item xs={6} sm={4} md={3} lg={2} key={pokemon.name}>
              <CardsItem {...pokemon} />
            </Grid>
          )
        })
      }
      {
        isLoading && (
          noDataArray.map((item, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
              <Card sx={{height: '220.438px'}} />
            </Grid>
          ))
        )
      }
    </Grid>
  );

}

export default CardsList;
