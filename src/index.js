/// <reference types="@fastly/js-compute" />

import { Router } from "@fastly/expressly";

const router = new Router();

router.get("/api/btc", async (req, res) => {
  try {
    // Forward the request directly to the Binance API
    const binanceResponse = await fetch(
      "https://api.binance.com/api/v3/depth",
      { method: "GET", backend: "my-origin" }
    );

    // Pass the entire Response object through to res.send()
    res.send(binanceResponse);
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
