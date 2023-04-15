import { Pagination, paginationClasses } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { ListResponse } from "../../types";

interface Props {
  disabled: boolean,
  data: ListResponse|undefined,
  onChange: ((event: ChangeEvent<unknown>, page: number) => void) | undefined,
  limit: number,
}

const ulClass = `.${paginationClasses.ul}`;

const CardsPagination: FC<Props> = ({
	disabled,
	data,
	onChange: handleChange,
	limit,
}) => {
  const count = data?.count ?? 0;
  const pagesQty = Math.ceil(count / limit);

	return (
	  <Pagination
		sx={theme => ({
		  [ulClass]: {
			marginTop: theme.spacing(2),
			justifyContent: 'center',
		  }
		})}
		disabled={disabled}
		count={pagesQty}
		onChange={handleChange}
	  />
	)
};

export default CardsPagination;
