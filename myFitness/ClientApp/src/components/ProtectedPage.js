import { Grid } from "@mui/material";
import NavHeader from "./NavHeader";

const ProtectedPage = ({ protectedElement }) => {
  return (
    <>
      <Grid item md={12} className="nav-header">
        <NavHeader />
      </Grid>
      <Grid
        item
        className="nav-menu"
        sx={{
          backgroundColor: "initial",
          display: "inlineBlock",
          minHeight: "800px",
        }}
      >
        {/* <NavMenu /> */}
        <Grid item id="content-container" className="case-display">
          {protectedElement}
        </Grid>
      </Grid>
    </>
  );
};

export default ProtectedPage;
