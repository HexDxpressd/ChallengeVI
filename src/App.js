import Table from './components/table';
import './App.css'
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function App() {
  return (
    <div className="App">
        <Box sx={{ flexGrow: 1, p: 6 }}>
          <Grid>
            <Grid item xs={12}>
              <Table></Table>
            </Grid>
          </Grid>
        </Box>
    </div>
  );
}

export default App;
