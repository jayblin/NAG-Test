import { FC } from "react";
import { Grid, Skeleton } from "@mui/material";
import CardsItem from "./item";
import { IListResponse } from "../../../types";
import { isListResponse } from "../../../utils";

interface Props {
  isLoading: boolean,
  cardsLimit: number,
  data: IListResponse | undefined,
}

const CardsList: FC<Props> = ({ isLoading, cardsLimit, data }) => {
  const hasData = isListResponse(data);
  const noDataArray = new Array(cardsLimit).fill(undefined);

  return (
    <Grid container spacing={2}>
      {
        hasData &&
        data.results.map((pokemon) => {
          const { name, url } = pokemon;
          return (
            <Grid item xs={6} sm={4} md={3} lg={2} key={name}>
              <CardsItem name={name} url={url} />
            </Grid>
          )
        })
      }
      {
        isLoading && (
          noDataArray.map((item, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
              <Skeleton height="220px" />
            </Grid>
          ))
        )
      }
    </Grid>
  );

}

export default CardsList;
