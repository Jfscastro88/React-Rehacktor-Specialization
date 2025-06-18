// This file contains the configuration for the application, including API keys and base URLs.
export const rawgIO = {
  base_url: 'https://api.rawg.io/api/games?key=INSERISCI_KEY&dates=2024-01-01,2024-12-31&page=1',
  api_key: import.meta.env.VITE_RAWG_API_KEY
};