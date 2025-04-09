import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  CssBaseline,
  Checkbox,
  Typography,
  Button,
  createTheme,
  ThemeProvider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  useMediaQuery,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grow
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import checklistData from './checklistData';

const CHECKLIST_KEY = 'muiChecklist';
const EXPIRY_KEY = 'muiChecklistExpiry';

const columnStyles = {
  gives: { width: '35%', fontFamily: '"Noto Sans KR", sans-serif' },
  receives: { width: '35%', fontFamily: '"Noto Sans KR", sans-serif' },
  limit: { width: '15%', textAlign: 'center', fontFamily: '"Noto Sans KR", sans-serif' },
  check: { width: '15%', textAlign: 'center', fontFamily: '"Noto Sans KR", sans-serif' }
};

function App() {
  const [checked, setChecked] = useState({});
  const isMobile = useMediaQuery('(max-width:600px)');
  const isNarrowPC = useMediaQuery('(max-width:850px)');

  const theme = useMemo(() =>
    createTheme({
      typography: {
        fontFamily: '"GangwonEdu_OTFBoldA", sans-serif',
        fontSize: 14,
        h5: {
          fontFamily: '"GangwonEdu_OTFBoldA", sans-serif'
        },
        body2: {
          fontSize: isMobile ? '0.85rem' : '0.875rem'
        }
      },
      components: {
        MuiAccordion: {
          styleOverrides: {
            root: {
              '&::before': {
                backgroundColor: 'transparent'
              }
            }
          }
        },
        MuiChip: {
          styleOverrides: {
            label: {
              fontFamily: '"Noto Sans KR", sans-serif'
            }
          }
        }
      }
    }), [isMobile]);

  const getExpiryDate = () => {
    const now = new Date();
    const resetTime = new Date();
    resetTime.setHours(6, 0, 0, 0);
    if (now < resetTime) resetTime.setDate(resetTime.getDate() - 1);
    return resetTime.toDateString();
  };

  useEffect(() => {
    const savedExpiry = localStorage.getItem(EXPIRY_KEY);
    const currentExpiry = getExpiryDate();
    if (savedExpiry !== currentExpiry) {
      localStorage.removeItem(CHECKLIST_KEY);
      localStorage.setItem(EXPIRY_KEY, currentExpiry);
      setChecked({});
    } else {
      const saved = JSON.parse(localStorage.getItem(CHECKLIST_KEY) || '{}');
      setChecked(saved);
    }
  }, []);

  const handleCheck = (key) => {
    const updated = { ...checked, [key]: !checked[key] };
    setChecked(updated);
    localStorage.setItem(CHECKLIST_KEY, JSON.stringify(updated));
  };

  const handleReset = () => {
    setChecked({});
    localStorage.removeItem(CHECKLIST_KEY);
  };

  const groupByNPC = (items) => {
    return items.reduce((acc, item) => {
      if (!acc[item.npc]) acc[item.npc] = [];
      acc[item.npc].push(item);
      return acc;
    }, {});
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <style>
        {`
          #root { width: 100%; }
          @font-face {
            font-family: 'GangwonEdu_OTFBoldA';
            src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/GangwonEdu_OTFBoldA.woff') format('woff');
            font-weight: normal;
            font-style: normal;
          }
        `}
      </style>
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="start"
        sx={{ background: 'linear-gradient(to bottom right, #ffe9ec, #cde9f6)', p: isMobile ? 1 : 4 }}
      >
        <Box sx={{ p: isMobile ? 2 : 5, borderRadius: 4, maxWidth: isNarrowPC ? '100%' : 700, width: '100%', backgroundColor: '#fff', boxShadow: 3 }}>
          <Box display="flex" flexDirection="column" gap={1.5} mb={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" fontWeight={700}>📋 오늘의 교환 체크리스트</Typography>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleReset}
                sx={{ textTransform: 'none', fontWeight: 600 }}
              >
                전체 리셋
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary" fontSize={13}>
              *매일 오전 6시에 자동으로 리셋됩니다.
            </Typography>
          </Box>

          {checklistData.map((group) => (
            <Accordion key={group.region} defaultExpanded disableGutters sx={{ mb: 3, borderRadius: 2, backgroundColor: '#fefefe' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600} color="#888">{group.region}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {Object.entries(groupByNPC(group.items)).map(([npc, items]) => (
                  <Box key={npc} mb={3}>
                    {!isMobile && (
                      <Typography fontSize={16} fontWeight={700} mb={1}>{npc}</Typography>
                    )}
                    {isMobile ? (
                      <Stack spacing={1}>
                        {items.map((item, index) => {
                          const key = `${npc}-${index}`;
                          const isChecked = checked[key] || false;
                          return (
                            <Grow in timeout={300} key={key}>
                              <Box display="flex" justifyContent="space-between" alignItems="center" p={1.5} borderRadius={2} sx={{ backgroundColor: isChecked ? '#e0e0e0' : '#f9f9f9', opacity: isChecked ? 0.6 : 1, border: '1px solid #ddd' }}>
                                <Box>
                                  <Typography fontSize='0.95rem' fontWeight={500} fontFamily='"Noto Sans KR", sans-serif'>
                                    {item.gives} → {item.receives}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    NPC: {npc}
                                  </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" gap={1}>
                                  <Chip label={item.limit} size="small" />
                                  <Checkbox size="small" checked={isChecked} onChange={() => handleCheck(key)} />
                                </Box>
                              </Box>
                            </Grow>
                          );
                        })}
                      </Stack>
                    ) : (
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell sx={columnStyles.gives}>주는 물품</TableCell>
                              <TableCell sx={columnStyles.receives}>받는 물품</TableCell>
                              <TableCell sx={columnStyles.limit}>제한</TableCell>
                              <TableCell sx={columnStyles.check}>교환</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {items.map((item, index) => {
                              const key = `${npc}-${index}`;
                              const isChecked = checked[key] || false;
                              return (
                                <TableRow key={key} sx={{ opacity: isChecked ? 0.5 : 1 }}>
                                  <TableCell sx={columnStyles.gives}>{item.gives}</TableCell>
                                  <TableCell sx={columnStyles.receives}>{item.receives}</TableCell>
                                  <TableCell align="center" sx={columnStyles.limit}>
                                    <Chip label={item.limit} size="small" />
                                  </TableCell>
                                  <TableCell align="center" sx={columnStyles.check}>
                                    <Checkbox size="small" checked={isChecked} onChange={() => handleCheck(key)} />
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )}
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
