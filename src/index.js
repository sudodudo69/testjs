/// <reference types="@fastly/js-compute" />

import { Router } from "@fastly/expressly";
import axios from 'axios';

const router = new Router();

// Proxy requests to Binance API and expose result at /api/btc
router.get('/api/btc', async (req, res) => {
  try {
    // Make a request to the Binance API
    const binanceResponse = await axios.get('https://api.binance.com/api/v3/depth', {
      params: {
        limit: 10,
        symbol: 'BTCUSDT',
      },
    });

    // Forward Binance API response to the client
    res.json(binanceResponse.data);
  } catch (error) {
    console.error('Error fetching Binance API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Use middleware to set a header
router.use((req, res) => {
  res.set("x-powered-by", "expressly");
});

router.listen();
