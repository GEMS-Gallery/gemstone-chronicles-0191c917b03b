import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Button, TextField, Chip, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

type AddChangelogEntryProps = {
  onAddEntry: (entry: {
    title: string;
    description: string;
    tags: string[];
    sections: [string, string[]][];
  }) => void;
};

const AddChangelogEntry: React.FC<AddChangelogEntryProps> = ({ onAddEntry }) => {
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: '',
      description: '',
      tags: [''],
      sections: [{ title: '', items: [''] }],
    },
  });

  const tags = watch('tags');
  const sections = watch('sections');

  const onSubmit = (data: any) => {
    const formattedData = {
      ...data,
      tags: data.tags.filter((tag: string) => tag.trim() !== ''),
      sections: data.sections
        .filter((section: { title: string; items: string[] }) => section.title.trim() !== '')
        .map((section: { title: string; items: string[] }) => [
          section.title,
          section.items.filter((item: string) => item.trim() !== ''),
        ]),
    };
    onAddEntry(formattedData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: 4 }}>
      <Controller
        name="title"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField {...field} label="Title" fullWidth margin="normal" required />
        )}
      />
      <Controller
        name="description"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            required
          />
        )}
      />
      <Box sx={{ mb: 2 }}>
        {tags.map((_, index) => (
          <Controller
            key={index}
            name={`tags.${index}`}
            control={control}
            render={({ field }) => (
              <Chip
                {...field}
                label={field.value || 'Add tag'}
                onClick={() => {
                  const newTag = prompt('Enter tag name:');
                  if (newTag) {
                    setValue(`tags.${index}`, newTag);
                  }
                }}
                onDelete={() => {
                  const newTags = [...tags];
                  newTags.splice(index, 1);
                  setValue('tags', newTags);
                }}
                sx={{ mr: 1, mb: 1 }}
              />
            )}
          />
        ))}
        <IconButton onClick={() => setValue('tags', [...tags, ''])}>
          <Add />
        </IconButton>
      </Box>
      {sections.map((_, sectionIndex) => (
        <Box key={sectionIndex} sx={{ mb: 2 }}>
          <Controller
            name={`sections.${sectionIndex}.title`}
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Section Title" fullWidth margin="normal" />
            )}
          />
          {sections[sectionIndex].items.map((_, itemIndex) => (
            <Box key={itemIndex} sx={{ display: 'flex', alignItems: 'center' }}>
              <Controller
                name={`sections.${sectionIndex}.items.${itemIndex}`}
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Item" fullWidth margin="normal" />
                )}
              />
              <IconButton
                onClick={() => {
                  const newSections = [...sections];
                  newSections[sectionIndex].items.splice(itemIndex, 1);
                  setValue('sections', newSections);
                }}
              >
                <Remove />
              </IconButton>
            </Box>
          ))}
          <Button
            onClick={() => {
              const newSections = [...sections];
              newSections[sectionIndex].items.push('');
              setValue('sections', newSections);
            }}
          >
            Add Item
          </Button>
        </Box>
      ))}
      <Button
        onClick={() => {
          setValue('sections', [...sections, { title: '', items: [''] }]);
        }}
      >
        Add Section
      </Button>
      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Add Changelog Entry
        </Button>
      </Box>
    </Box>
  );
};

export default AddChangelogEntry;