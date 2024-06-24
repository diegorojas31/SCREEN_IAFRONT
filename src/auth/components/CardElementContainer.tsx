import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const CardElementContainer = styled(Box)(({ theme }) => ({
  border: '1px solid rgba(255, 255, 255, 0.23)',
  borderRadius: '4px',
  overflow: 'hidden',
  backgroundColor: '#1C2D48',
  padding: '10px 12px',
  '&:hover': {
    borderColor: 'rgba(255, 255, 255, 0.87)',
  },
  '&.Mui-focused': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.dark}`,
  }
}));