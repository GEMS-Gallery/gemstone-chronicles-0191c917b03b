import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import { backend } from 'declarations/backend';
import ChangelogEntry from './components/ChangelogEntry';
import AddChangelogEntry from './components/AddChangelogEntry';

type ChangelogEntryType = {
  id: bigint;
  date: bigint;
  title: string;
  description: string;
  tags: string[];
  sections: [string, string[]][];
};

const App: React.FC = () => {
  const [entries, setEntries] = useState<ChangelogEntryType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const result = await backend.getChangelogEntries();
      setEntries(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching changelog entries:', error);
      setLoading(false);
    }
  };

  const handleAddEntry = async (newEntry: Omit<ChangelogEntryType, 'id' | 'date'>) => {
    try {
      setLoading(true);
      const result = await backend.addChangelogEntry(
        newEntry.title,
        newEntry.description,
        newEntry.tags,
        newEntry.sections
      );
      if ('ok' in result) {
        await fetchEntries();
      } else {
        console.error('Error adding changelog entry:', result.err);
      }
    } catch (error) {
      console.error('Error adding changelog entry:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          GEMS Changelog
        </Typography>
        <AddChangelogEntry onAddEntry={handleAddEntry} />
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          entries.map((entry) => (
            <ChangelogEntry key={Number(entry.id)} entry={entry} />
          ))
        )}
      </Box>
    </Container>
  );
};

export default App;