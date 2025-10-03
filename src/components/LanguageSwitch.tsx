import React from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { useLanguage } from '../contexts/LanguageContext';
import type { Language } from '../i18n/translations';

export const LanguageSwitch: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleChange = (event: SelectChangeEvent<Language>) => {
    setLanguage(event.target.value as Language);
  };

  return (
    <FormControl 
      size="small"
      sx={{
        minWidth: 100,
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'transparent',
          color: 'inherit',
          '& fieldset': {
            borderColor: 'rgba(148, 163, 184, 0.3)',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(148, 163, 184, 0.5)',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'rgba(59, 130, 246, 0.5)',
          },
        },
        '& .MuiSelect-select': {
          paddingTop: '8px',
          paddingBottom: '8px',
          fontSize: '14px',
        },
        '& .MuiSvgIcon-root': {
          color: 'inherit',
        }
      }}
    >
      <Select
        value={language}
        onChange={handleChange}
        aria-label={t.selectLanguage}
      >
        <MenuItem value="zh">🇨🇳 中文</MenuItem>
        <MenuItem value="en">🇺🇸 English</MenuItem>
      </Select>
    </FormControl>
  );
};
