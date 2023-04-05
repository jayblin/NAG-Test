import { Box } from "@mui/material";
import { FC } from "react";

interface Props {
  children: JSX.Element,
}

const MainLayout: FC<Props> = ({ children }) => {
    return <Box sx={{
      maxWidth: '1940px',
      minWidth: '320px',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>
      {children}
    </Box>

}

export default MainLayout;
