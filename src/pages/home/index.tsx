import { TextField, Button } from '@mui/material';
import { useState } from 'react';

const Home: React.FC = () => {
  const [data, setData] = useState({ change: [''], from: '' })
  const handleSubmit = () => {}
  
  return (
    <div>
      <h1>Search Form</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="From"
          value={data}
          onChange={e => setData({ ...data, from: e.target.value })}
          required
        />
        <TextField
          label="Change cities"
          value={data.change.join(', ')}
          onChange={e => setData({ ...data, change: e.target.value.split(', ') })}
        />
        <Button variant="contained" color="primary" type="submit">
          Search
        </Button>
      </form>
    </div>
  );
};

export default Home;
