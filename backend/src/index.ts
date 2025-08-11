import express, { Request, Response } from 'express';
import axios from 'axios';
import { JSDOM } from 'jsdom';

const app = express();
const PORT = 3000;

// API
app.get('/api/scrape', async (req: Request, res: Response) => {
    const { keyword } = req.query;

    if (!keyword || typeof keyword !== 'string') {
        return res.status(400).json({ error: 'Keyword is required.' });
    }

    const amazonUrl = `https://www.amazon.com.br/s?k=${encodeURIComponent(keyword)}`;

    try {
        // Fetch Amazon page
        const { data } = await axios.get(amazonUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
                'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'Upgrade-Insecure-Requests': '1',
            },
        });

        console.log('1. Request to Amazon successful. Parsing HTML...');

        // 2. Parse HTML/JSDOM
        const dom = new JSDOM(data);
        const document = dom.window.document;

        // I found the selector by DevTools but this can change anytime.
        const productElements = document.querySelectorAll('.s-result-item');

        console.log(`2. Elements found with the main selector: ${productElements.length}`);

        const products: any[] = [];

        // 3. Extracting data
        productElements.forEach((product, index) => {
            if (index === 0) {
                console.log('3. Entering the loop to extract product data...');
            }

            try {
                // !!! Always verify the selector
                const titleElement = product.querySelector('.a-link-normal > h2 > span');
                const ratingElement = product.querySelector('.a-icon-alt');
                const reviewsElement = product.querySelector('.a-size-base.s-underline-text');
                const imageElement = product.querySelector('.s-image');

                const title = titleElement?.textContent?.trim() ?? null;
                const rating = ratingElement?.textContent?.split(' ')[0] ?? null;
                const reviews = reviewsElement?.textContent?.trim() ?? null;
                const imageUrl = imageElement?.getAttribute('src') ?? null;

                // Add to the array only if we have managed to extract a valid title
                if (title) {
                    products.push({ title, rating, reviews, imageUrl });
                }

            } catch (e: any) {
                console.error(`Error processing product in index ${index}:`, e.message);
            }
        });

        console.log(`4. Extraction complete. Total number of products in the array: ${products.length}`);

        //Retorn JSON Data
        res.json(products);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to scrape Amazon.' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});