export const categories = {
  length: {
    label: 'Longueur',
    units: [
      { id: 'mm', label: 'Millimètres', symbol: 'mm', factor: 0.001 },
      { id: 'cm', label: 'Centimètres', symbol: 'cm', factor: 0.01 },
      { id: 'm', label: 'Mètres', symbol: 'm', factor: 1 },
      { id: 'km', label: 'Kilomètres', symbol: 'km', factor: 1000 },
      { id: 'in', label: 'Pouces', symbol: 'po', factor: 0.0254 },
      { id: 'ft', label: 'Pieds', symbol: 'pi', factor: 0.3048 },
      { id: 'yd', label: 'Verges', symbol: 'vg', factor: 0.9144 },
      { id: 'mi', label: 'Milles', symbol: 'mi', factor: 1609.344 }
    ]
  },
  volume: {
    label: 'Volume',
    units: [
      { id: 'ml', label: 'Millilitres', symbol: 'mL', factor: 0.001 },
      { id: 'l', label: 'Litres', symbol: 'L', factor: 1 },
      { id: 'm3', label: 'Mètres cubes', symbol: 'm³', factor: 1000 },
      { id: 'floz_us', label: 'Onces liquides (US)', symbol: 'fl oz', factor: 0.0295735295625 },
      { id: 'cup_us', label: 'Tasses (US)', symbol: 'tasse', factor: 0.2365882365 },
      { id: 'gal_us', label: 'Gallons (US)', symbol: 'gal US', factor: 3.785411784 },
      { id: 'gal_imp', label: 'Gallons impériaux', symbol: 'gal imp', factor: 4.54609 }
    ]
  },
  mass: {
    label: 'Masse',
    units: [
      { id: 'mg', label: 'Milligrammes', symbol: 'mg', factor: 0.000001 },
      { id: 'g', label: 'Grammes', symbol: 'g', factor: 0.001 },
      { id: 'kg', label: 'Kilogrammes', symbol: 'kg', factor: 1 },
      { id: 'oz', label: 'Onces', symbol: 'oz', factor: 0.028349523125 },
      { id: 'lb', label: 'Livres', symbol: 'lb', factor: 0.45359237 },
      { id: 't', label: 'Tonnes métriques', symbol: 't', factor: 1000 }
    ]
  },
  temperature: {
    label: 'Température',
    units: [
      { id: 'c', label: 'Celsius', symbol: '°C' },
      { id: 'f', label: 'Fahrenheit', symbol: '°F' },
      { id: 'k', label: 'Kelvin', symbol: 'K' }
    ]
  }
};

const temperatureToCelsius = {
  c: (value) => value,
  f: (value) => (value - 32) * 5 / 9,
  k: (value) => value - 273.15
};

const celsiusToTemperature = {
  c: (value) => value,
  f: (value) => value * 9 / 5 + 32,
  k: (value) => value + 273.15
};

export function convert(categoryId, value, fromId, toId) {
  const category = categories[categoryId];
  if (!category) throw new Error('Catégorie inconnue.');

  const from = category.units.find((unit) => unit.id === fromId);
  const to = category.units.find((unit) => unit.id === toId);
  if (!from || !to) throw new Error('Unité inconnue pour cette catégorie.');

  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) throw new Error('La valeur doit être un nombre valide.');

  if (categoryId === 'temperature') {
    return celsiusToTemperature[toId](temperatureToCelsius[fromId](numericValue));
  }

  return numericValue * from.factor / to.factor;
}

export function publicCategories() {
  return Object.entries(categories).map(([id, category]) => ({
    id,
    label: category.label,
    units: category.units.map(({ factor, ...unit }) => unit)
  }));
}
