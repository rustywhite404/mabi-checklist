import React, { useEffect, useMemo, useState } from 'react';
import {
  Box, CssBaseline, Checkbox, Typography, Button,
  createTheme, ThemeProvider, Accordion, AccordionSummary,
  AccordionDetails, Chip, useMediaQuery, Table,
  TableBody, TableCell, TableContainer, TableHead,
  TableRow, Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import checklistData from './checklistData';
import blueprintData from './blueprintData';
import dailyTasksData from './dailyTasksData';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const CHECKLIST_KEY = 'muiChecklist';
const EXPIRY_KEY = 'muiChecklistExpiry';
const EXPANDED_KEY = 'muiChecklistExpanded';
const MANUAL_COLLAPSED_KEY = 'muiChecklistManualCollapsed';

const columnStyles = {
  gives: { width: '35%', fontFamily: '"Noto Sans KR", sans-serif' },
  receives: { width: '35%', fontFamily: '"Noto Sans KR", sans-serif' },
  limit: { width: '15%', textAlign: 'center', fontFamily: '"Noto Sans KR", sans-serif' },
  check: { width: '15%', textAlign: 'center', fontFamily: '"Noto Sans KR", sans-serif' }
};

const blueprintColumnStyles = {
  npc: { width: '30%', fontFamily: '"Noto Sans KR", sans-serif' },
  gives: { width: '35%', fontFamily: '"Noto Sans KR", sans-serif' },
  receives: { width: '35%', fontFamily: '"Noto Sans KR", sans-serif' }
};

function App() {
  const [checked, setChecked] = useState({});
  const [expandedState, setExpandedState] = useState({});
  const [manualCollapsed, setManualCollapsed] = useState({});
  const [blueprintExpanded, setBlueprintExpanded] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isNarrowPC = useMediaQuery('(max-width:850px)');
  const [dailyTasksChecked, setDailyTasksChecked] = useState<boolean[][]>([]);
  const [dailyTasksExpanded, setDailyTasksExpanded] = useState(true);
  const DAILY_TASKS_EXPANDED_KEY = 'dailyTasksExpanded';
  const [hasAutoCollapsedOnce, setHasAutoCollapsedOnce] = useState(false);

  const theme = useMemo(() => createTheme({
    typography: {
      fontFamily: '"GangwonEdu_OTFBoldA", sans-serif',
      fontSize: 14,
      h5: { fontFamily: '"GangwonEdu_OTFBoldA", sans-serif' },
      body2: { fontSize: isMobile ? '0.85rem' : '0.875rem' }
    },
    components: {
      MuiAccordion: {
        styleOverrides: {
          root: { '&::before': { backgroundColor: 'transparent' } }
        }
      },
      MuiChip: {
        styleOverrides: {
          label: { fontFamily: '"Noto Sans KR", sans-serif' }
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

  const getItemKey = (region, item) => `${region}-${item.npc}-${item.gives}-${item.receives}`;

  const isAllDailyTasksComplete = () => {
    return dailyTasksChecked.every(row => row.every(cell => cell));
  };

  
  const isGroupComplete = (group, currentChecked = checked) =>
    group.items.every(item => currentChecked[getItemKey(group.region, item)]);

  const updateExpansionBasedOnCheck = (updatedChecked) => {
    const newExpanded = {};
    checklistData.forEach((group) => {
      const complete = isGroupComplete(group, updatedChecked);
      if (manualCollapsed[group.region]) {
        newExpanded[group.region] = false;
      } else {
        newExpanded[group.region] = !complete;
      }
    });
    setExpandedState(newExpanded);
    localStorage.setItem(EXPANDED_KEY, JSON.stringify(newExpanded));
  };

  useEffect(() => {
    const savedExpiry = localStorage.getItem(EXPIRY_KEY);
    const savedExpanded = JSON.parse(localStorage.getItem(EXPANDED_KEY) || '{}');
    const savedManualCollapsed = JSON.parse(localStorage.getItem(MANUAL_COLLAPSED_KEY) || '{}');
    const currentExpiry = getExpiryDate();

    const saved = localStorage.getItem('dailyTasksChecked');
    if (saved) {
      setDailyTasksChecked(JSON.parse(saved));
    } else {
      // dailyTasksData.map을 이용해 초기값 설정
      setDailyTasksChecked(dailyTasksData.map(group => [...group.row]));
    }

    const savedDailyTasksExpanded = localStorage.getItem(DAILY_TASKS_EXPANDED_KEY);
    if (savedDailyTasksExpanded !== null) {
      setDailyTasksExpanded(savedDailyTasksExpanded === 'true');
    }

    if (savedExpiry !== currentExpiry) {
      localStorage.removeItem(CHECKLIST_KEY);
      localStorage.setItem(EXPIRY_KEY, currentExpiry);
      setChecked({});
      const initialExpanded = {};
      checklistData.forEach((group) => {
        initialExpanded[group.region] = true;
      });
      setExpandedState(initialExpanded);
      setManualCollapsed({});
      localStorage.removeItem(MANUAL_COLLAPSED_KEY);

      const newDailyTasks = dailyTasksData.map(group => group.row.map(() => false));
      setDailyTasksChecked(newDailyTasks);
      localStorage.setItem('dailyTasksChecked', JSON.stringify(newDailyTasks));
    } else {
      const savedChecked = JSON.parse(localStorage.getItem(CHECKLIST_KEY) || '{}');
      setChecked(savedChecked);
      const initialExpanded = {};
      checklistData.forEach((group) => {
        const groupComplete = isGroupComplete(group, savedChecked);
        initialExpanded[group.region] = !groupComplete;
      });
      setExpandedState(savedExpanded);
      setManualCollapsed(savedManualCollapsed);
    }
  }, []);

  useEffect(() => {
    const allComplete = dailyTasksChecked.every(row => row.every(cell => cell));
  
    // 수동으로 접은 적이 없고, 아직 자동 접힘 한 번도 안 했을 때만 자동 접힘
    if (
      allComplete &&
      !manualCollapsed['dailyTasks'] &&
      !hasAutoCollapsedOnce
    ) {
      setDailyTasksExpanded(false);
      localStorage.setItem(DAILY_TASKS_EXPANDED_KEY, 'false');
      setHasAutoCollapsedOnce(true);
    }
  }, [dailyTasksChecked]);


  const handleCheck = (key) => {
    const updated = { ...checked, [key]: !checked[key] };
    setChecked(updated);
    localStorage.setItem(CHECKLIST_KEY, JSON.stringify(updated));
    updateExpansionBasedOnCheck(updated);
  };

  const handleDailyTaskToggle = (rowIdx: number, colIdx: number) => {
    const updated = [...dailyTasksChecked];
    updated[rowIdx][colIdx] = !updated[rowIdx][colIdx];
    setDailyTasksChecked(updated);
    localStorage.setItem('dailyTasksChecked', JSON.stringify(updated));
  };
  

  const handleReset = () => {
    setChecked({});
    localStorage.removeItem(CHECKLIST_KEY);
  
    const resetExpanded = {};
    checklistData.forEach((group) => {
      resetExpanded[group.region] = true;
    });
    setExpandedState(resetExpanded);
    setManualCollapsed({});
    localStorage.setItem(EXPANDED_KEY, JSON.stringify(resetExpanded));
    localStorage.removeItem(MANUAL_COLLAPSED_KEY);
  
    // ✅ 숙제 체크리스트도 초기화 (순서 보장)
    const newDailyTasks = dailyTasksData.map(group => group.row.map(() => false));
    setDailyTasksChecked(newDailyTasks);
    localStorage.setItem('dailyTasksChecked', JSON.stringify(newDailyTasks));
  
    // ✅ 리셋 날짜도 초기화
    const newExpiry = getExpiryDate();
    localStorage.setItem(EXPIRY_KEY, newExpiry);
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
      <style>{`
        #root { width: 100%; }
        @font-face {
          font-family: 'GangwonEdu_OTFBoldA';
          src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/GangwonEdu_OTFBoldA.woff') format('woff');
          font-weight: normal;
          font-style: normal;
        }

        .custom-check {
  width: 22px;
  height: 22px;
  border-radius: 50%; 
  background-color: #e0e0e0;
  border: 2px solid #aaa;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
}

        .custom-check[data-checked="true"] {
          background-color: #4caf50;
          border-color: #388e3c;
        }

        .custom-check[data-checked="true"]::after {
          content: '✔';
          position: absolute;
          top: -2px;
          left: 4px;
          font-size: 16px;
          color: white;
        }

      `}</style>
      <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="start" sx={{ background: 'linear-gradient(to bottom right, #ffe9ec, #cde9f6)', p: isMobile ? 1 : 4 }}>
        <Box sx={{ p: isMobile ? 2 : 5, borderRadius: 4, maxWidth: isNarrowPC ? '100%' : 700, width: '100%', backgroundColor: '#fff', boxShadow: 3 }}>
          <Box display="flex" flexDirection="column" gap={1.5} mb={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" fontWeight={700} fontSize={{ xs: '1.1rem', sm: '1.5rem' }}>
                📋 오늘의 물물교환 체크리스트
              </Typography>
              <Button
                onClick={handleReset}
                variant="outlined"
                color="secondary"
                size="small"
                sx={{
                  minWidth: 0,
                  padding: 1,
                  borderRadius: '50%',
                  backgroundColor: '#f6f3f9',
                  '&:hover': { backgroundColor: '#e6e0f0' }
                }}
              >
                <RestartAltIcon fontSize="small" />
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary" fontSize={13}>
              *매일 오전 6시에 자동으로 리셋됩니다.
            </Typography>
          </Box>
          
          <Accordion
  expanded={dailyTasksExpanded}
  onChange={(_, expanded) => {
    setDailyTasksExpanded(expanded);
    localStorage.setItem(DAILY_TASKS_EXPANDED_KEY, String(expanded));
  
    const updatedManual = {
      ...manualCollapsed,
      dailyTasks: !expanded
    };
    setManualCollapsed(updatedManual);
    localStorage.setItem(MANUAL_COLLAPSED_KEY, JSON.stringify(updatedManual));
  
    setHasAutoCollapsedOnce(false); // ✅ 수동 조작 시 플래그 초기화
  }}
  disableGutters
  sx={{ borderRadius: 2, backgroundColor: '#fefefe' }}
>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography
      fontWeight={700}
      color={isAllDailyTasksComplete() ? "#bbb" : "#555"}
      sx={isAllDailyTasksComplete() ? { textDecoration: 'line-through' } : {}}
    >
      📌 오늘의 숙제
    </Typography>
  </AccordionSummary>
  <AccordionDetails>
    <TableContainer>
      <Table size="small">
      <TableBody>
  {dailyTasksData.map((taskGroup, rowIdx) => (
    <TableRow key={rowIdx}>
      <TableCell sx={{ fontWeight: 'bold' }}>{taskGroup.header}</TableCell>
      <TableCell>
        <Box display="flex" justifyContent="flex-end" gap={1}>
          {(dailyTasksChecked[rowIdx] || []).map((isChecked, colIdx) => (
            <Box
              key={colIdx}
              sx={{ cursor: 'pointer' }}
              onClick={() => handleDailyTaskToggle(rowIdx, colIdx)}
            >
              {isChecked ? (
                <CheckCircleIcon sx={{ color: '#4caf50' }} />
              ) : (
                <RadioButtonUncheckedIcon sx={{ color: '#ccc' }} />
              )}
            </Box>
          ))}
        </Box>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

      </Table>
    </TableContainer>
  </AccordionDetails>
</Accordion>
          <Divider sx={{ my: 4 }} />

          {checklistData.map((group) => {
            const regionKey = group.region;
            const groupComplete = isGroupComplete(group);
            const isExpanded = expandedState[regionKey] ?? true;
            return (

              
              <Accordion
                key={regionKey}
                expanded={isExpanded}
                onChange={(_, expanded) => {
                  const updatedState = { ...expandedState, [regionKey]: expanded };
                  setExpandedState(updatedState);
                  localStorage.setItem(EXPANDED_KEY, JSON.stringify(updatedState));

                  const updatedManual = {
                    ...manualCollapsed,
                    [regionKey]: !expanded
                  };
                  setManualCollapsed(updatedManual);
                  localStorage.setItem(MANUAL_COLLAPSED_KEY, JSON.stringify(updatedManual));
                }}
                disableGutters
                sx={{ mb: 3, borderRadius: 2, backgroundColor: '#fefefe' }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    fontWeight={600}
                    color="#888"
                    sx={groupComplete ? { textDecoration: 'line-through', color: '#bbb' } : {}}
                  >
                    {regionKey}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {Object.entries(groupByNPC(group.items)).map(([npc, items]) => (
                    <Box key={npc} mb={3}>
                      {!isMobile && (
                        <Typography fontSize={16} fontWeight={700} mb={1}>{npc}</Typography>
                      )}
                      {isMobile ? (
                <Box>
                  {items.map((item) => {
                    const key = getItemKey(regionKey, item);
                    const isChecked = checked[key] || false;

                    return (
                      <Box
                        key={key}
                        mb={1.5}
                        p={1.5}
                        border={1}
                        borderColor="#ddd"
                        borderRadius={2}
                        sx={{
                          opacity: isChecked ? 0.5 : 1,
                          backgroundColor: isChecked ? '#f5f5f5' : 'white',
                          cursor: 'pointer',
                          position: 'relative'
                        }}
                        onClick={() => handleCheck(key)}
                      >
                        <Box position="absolute" top={10} right={10} display="flex" alignItems="center" gap={1}>
                          <Chip label={item.limit} size="small" />
                          <Checkbox
                            size="small"
                            checked={isChecked}
                            onClick={(e) => e.stopPropagation()}
                            onChange={() => handleCheck(key)}
                          />
                        </Box>
                        <Typography fontWeight={600} mb={0.5}>{item.gives}</Typography>
                        <Typography>→ {item.receives}</Typography>
                        <Typography variant="caption" color="text.secondary">NPC: {item.npc}</Typography>
                      </Box>
                    );
                  })}
                </Box>
              ) :  (
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
                              {items.map((item) => {
                                const key = getItemKey(regionKey, item);
                                const isChecked = checked[key] || false;
                                return (
                                  <TableRow key={key} sx={{ opacity: isChecked ? 0.5 : 1 }}>
                                    <TableCell sx={{ ...columnStyles.gives, py: 0.25 }}>{item.gives}</TableCell>
                                    <TableCell sx={{ ...columnStyles.receives, py: 0.25 }}>{item.receives}</TableCell>
                                    <TableCell align="center" sx={{ ...columnStyles.limit, py: 0.25 }}>
                                      <Chip label={item.limit} size="small" />
                                    </TableCell>
                                    <TableCell align="center" sx={{ ...columnStyles.check, py: 0.25 }}>
                                      <Checkbox
                                        size="small"
                                        checked={isChecked}
                                        onChange={() => handleCheck(key)}
                                      />
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
            );
          })}

          <Divider sx={{ my: 4 }} />

          <Accordion
            expanded={blueprintExpanded}
            onChange={(_, expanded) => setBlueprintExpanded(expanded)}
            disableGutters
            sx={{ borderRadius: 2, backgroundColor: '#fefefe' }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={700} color="#555">
                📘 3레벨 설계도 교환정보
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {blueprintData.map((group) => (
                <Box key={group.region} mb={3}>
                  <Typography fontWeight={600} mb={1}>{group.region}</Typography>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={blueprintColumnStyles.npc}>NPC</TableCell>
                          <TableCell sx={blueprintColumnStyles.gives}>주는 물품</TableCell>
                          <TableCell sx={blueprintColumnStyles.receives}>받는 물품</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {group.items.map((item, idx) => (
                          <TableRow key={`${group.region}-${item.npc}-${idx}`}>
                            <TableCell sx={blueprintColumnStyles.npc}>{item.npc}</TableCell>
                            <TableCell sx={blueprintColumnStyles.gives}>{item.gives}</TableCell>
                            <TableCell sx={blueprintColumnStyles.receives}>{item.receives}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>

          <Box mt={5} textAlign="center">
            <Typography variant="caption" color="text.secondary">
              ⓒ 칼릭스 : 베인 2025 All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
