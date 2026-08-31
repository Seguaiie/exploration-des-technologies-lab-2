import { useEffect, useMemo, useState } from 'react';
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';
import StraightenRoundedIcon from '@mui/icons-material/StraightenRounded';
import {
  Alert, Box, Button, Chip, CircularProgress, Container, FormControl,
  IconButton, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography
} from '@mui/material';

const categoryIcons = { length: '↔', volume: '◒', mass: '⚖', temperature: '°' };

function formatNumber(value) {
  return new Intl.NumberFormat('fr-CA', { maximumSignificantDigits: 10 }).format(value);
}

export default function App() {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('length');
  const [value, setValue] = useState('1');
  const [from, setFrom] = useState('ft');
  const [to, setTo] = useState('m');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [converting, setConverting] = useState(false);

  const category = useMemo(
    () => categories.find((item) => item.id === categoryId),
    [categories, categoryId]
  );

  useEffect(() => {
    fetch('/api/categories')
      .then((response) => {
        if (!response.ok) throw new Error('Impossible de joindre le serveur.');
        return response.json();
      })
      .then(setCategories)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  function selectCategory(nextId) {
    const next = categories.find((item) => item.id === nextId);
    setCategoryId(nextId);
    setFrom(next.units[0].id);
    setTo(next.units[1].id);
    setResult(null);
    setError('');
  }

  async function handleConvert(event) {
    event?.preventDefault();
    if (value.trim() === '' || !Number.isFinite(Number(value))) {
      setError('Veuillez saisir un nombre valide.');
      return;
    }
    setConverting(true);
    setError('');
    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: categoryId, value: Number(value), from, to })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setResult(data.result);
    } catch (requestError) {
      setError(requestError.message || 'La conversion a échoué.');
    } finally {
      setConverting(false);
    }
  }

  function swapUnits() {
    setFrom(to);
    setTo(from);
    if (result !== null) {
      setValue(String(result));
      setResult(null);
    }
  }

  const fromUnit = category?.units.find((unit) => unit.id === from);
  const toUnit = category?.units.find((unit) => unit.id === to);

  return (
    <Box className="app-background" sx={{ minHeight: '100vh', py: { xs: 4, md: 8 } }}>
      <Box className="aurora aurora-one" aria-hidden="true" />
      <Box className="aurora aurora-two" aria-hidden="true" />
      <Box className="aurora aurora-three" aria-hidden="true" />
      <Box className="orbital orbital-one" aria-hidden="true" />
      <Box className="orbital orbital-two" aria-hidden="true" />
      <Box className="noise-layer" aria-hidden="true" />
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack alignItems="center" spacing={1} mb={4} textAlign="center">
          <Box sx={{ width: 54, height: 54, borderRadius: 3, bgcolor: 'primary.main', color: 'white', display: 'grid', placeItems: 'center', boxShadow: '0 12px 28px #5b4ae844' }}>
            <StraightenRoundedIcon />
          </Box>
          <Typography variant="h3" component="h1">Convertisseur</Typography>
          <Typography color="text.secondary">Des conversions rapides, simples et précises.</Typography>
        </Stack>

        <Paper elevation={0} sx={{ p: { xs: 2.5, sm: 4 }, border: '1px solid', borderColor: 'divider', boxShadow: '0 24px 70px rgba(38, 29, 88, .10)' }}>
          {loading ? (
            <Box sx={{ py: 12, textAlign: 'center' }}><CircularProgress /></Box>
          ) : (
            <Box component="form" onSubmit={handleConvert}>
              <Typography variant="overline" color="text.secondary">Type de mesure</Typography>
              <Stack direction="row" gap={1} flexWrap="wrap" mt={1} mb={4}>
                {categories.map((item) => (
                  <Chip
                    key={item.id}
                    label={`${categoryIcons[item.id]}  ${item.label}`}
                    color={item.id === categoryId ? 'primary' : 'default'}
                    variant={item.id === categoryId ? 'filled' : 'outlined'}
                    onClick={() => selectCategory(item.id)}
                    sx={{ px: 1, height: 40, fontWeight: 700 }}
                  />
                ))}
              </Stack>

              {category && <Stack spacing={2.5}>
                <TextField
                  label="Valeur à convertir"
                  value={value}
                  onChange={(event) => { setValue(event.target.value); setResult(null); }}
                  inputMode="decimal"
                  fullWidth
                  autoFocus
                />
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems="center">
                  <FormControl fullWidth>
                    <InputLabel>De</InputLabel>
                    <Select label="De" value={from} onChange={(event) => { setFrom(event.target.value); setResult(null); }}>
                      {category.units.map((unit) => <MenuItem key={unit.id} value={unit.id}>{unit.label} ({unit.symbol})</MenuItem>)}
                    </Select>
                  </FormControl>
                  <IconButton onClick={swapUnits} aria-label="Inverser les unités" color="primary" sx={{ bgcolor: 'action.hover', flexShrink: 0 }}>
                    <SwapVertRoundedIcon sx={{ transform: { sm: 'rotate(90deg)' } }} />
                  </IconButton>
                  <FormControl fullWidth>
                    <InputLabel>Vers</InputLabel>
                    <Select label="Vers" value={to} onChange={(event) => { setTo(event.target.value); setResult(null); }}>
                      {category.units.map((unit) => <MenuItem key={unit.id} value={unit.id}>{unit.label} ({unit.symbol})</MenuItem>)}
                    </Select>
                  </FormControl>
                </Stack>
                <Button type="submit" variant="contained" size="large" disabled={converting} sx={{ py: 1.5 }}>
                  {converting ? <CircularProgress size={24} color="inherit" /> : 'Convertir'}
                </Button>
              </Stack>}

              {error && <Alert severity="error" sx={{ mt: 2.5 }}>{error}</Alert>}
              {result !== null && (
                <Box sx={{ mt: 3, p: 3, borderRadius: 3, bgcolor: '#eeecff', textAlign: 'center' }} aria-live="polite">
                  <Typography color="text.secondary" variant="body2">Résultat</Typography>
                  <Typography variant="h4" fontWeight={800} color="primary.main" sx={{ my: 0.5, wordBreak: 'break-word' }}>
                    {formatNumber(result)} {toUnit?.symbol}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatNumber(Number(value))} {fromUnit?.symbol} = {formatNumber(result)} {toUnit?.symbol}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Paper>
        <Typography textAlign="center" color="text.secondary" variant="caption" display="block" mt={3}>
          Les gallons US et impériaux sont distingués pour éviter toute ambiguïté.
        </Typography>
      </Container>
    </Box>
  );
}
