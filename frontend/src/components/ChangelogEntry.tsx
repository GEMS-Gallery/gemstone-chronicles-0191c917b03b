import React, { useState } from 'react';
import { Box, Typography, Chip, Collapse, IconButton } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

type ChangelogEntryProps = {
  entry: {
    id: bigint;
    date: bigint;
    title: string;
    description: string;
    tags: string[];
    sections: [string, string[]][];
  };
};

const ChangelogEntry: React.FC<ChangelogEntryProps> = ({ entry }) => {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }));
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Box className="changelog-entry">
      <Box className="changelog-date">
        <Typography variant="body2">{formatDate(entry.date)}</Typography>
      </Box>
      <Box className="changelog-content">
        <Typography variant="h6" className="changelog-title">
          {entry.title}
        </Typography>
        <Typography variant="body1" className="changelog-description">
          {entry.description}
        </Typography>
        <Box sx={{ mb: 2 }}>
          {entry.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              className={`tag tag-${tag.toLowerCase()}`}
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Box>
        {entry.sections.map(([sectionTitle, items]) => (
          <Box key={sectionTitle} className="changelog-section">
            <Typography
              variant="subtitle1"
              className={`changelog-section-title ${expandedSections[sectionTitle] ? '' : 'collapsed'}`}
              onClick={() => toggleSection(sectionTitle)}
            >
              {sectionTitle}
              <IconButton size="small" sx={{ ml: 1 }}>
                {expandedSections[sectionTitle] ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Typography>
            <Collapse in={expandedSections[sectionTitle]}>
              <ul className="changelog-list">
                {items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </Collapse>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ChangelogEntry;