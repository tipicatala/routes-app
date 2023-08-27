import {
  Grid,
} from "@mui/material";

interface Row {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  input: React.ReactNode;
}


const Row = ({ leftIcon, input, rightIcon }: Row) => {
  return (
    <Grid container alignItems="center" marginBottom={2}>
      <Grid item width={40} textAlign={"center"} marginRight={1}>
        {leftIcon}
      </Grid>
      <Grid item xs>
        {input}
      </Grid>
      <Grid item width={40} textAlign={"center"}>
        {rightIcon}
      </Grid>
    </Grid>
  );
};
export default Row;
