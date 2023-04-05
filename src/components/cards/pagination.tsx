import { Pagination, paginationClasses } from "@mui/material";
import { ChangeEvent, FC } from "react";

interface Props {
  disabled: boolean,
  pagesQty: number,
  onChange: ((event: ChangeEvent<unknown>, page: number) => void) | undefined,
}

const CardsPagination: FC<Props> = ({ disabled, pagesQty, onChange: handleChange }) => (
  <Pagination
    sx={theme => ({
      [`.${paginationClasses.ul}`]: {
        marginTop: theme.spacing(2),
        justifyContent: 'center',
      }
    })}
    disabled={disabled}
    count={pagesQty}
    onChange={handleChange}
  />
);

export default CardsPagination;
