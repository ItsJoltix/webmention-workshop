import './style.css';
import axios from 'axios';
import * as cheerio from 'cheerio';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="card">
      <button id="button" type="button">Click me</button>
    </div>
  </div>
`;

document.querySelector<HTMLButtonElement>('#button')!.addEventListener('click', async () => {
    try {
        // Step 1: Fetch the HTML of the target website
        const response = await axios.get('https://webmention-client.vercel.app/');
        const html = response.data;

        // Step 2: Parse the HTML to find the Webmention endpoint
        const $ = cheerio.load(html);

        const webmentionEndpoint = $('link[rel="webmention"]').attr('href')
            || $('a[rel="webmention"]').attr('href'); // Also check <a> tags as a fallback

        if (webmentionEndpoint) {
            const absoluteEndpoint = new URL(webmentionEndpoint, 'https://webmention-client.vercel.app/').toString();
            console.log('Webmention endpoint gevonden:', absoluteEndpoint);

            // Step 3: Send the Webmention POST request
            const source = 'https://your-source-url.com'; // Replace with your source URL
            const target = 'https://webmention-client.vercel.app/'; // Replace with your target URL

            const postResponse = await axios.post(absoluteEndpoint, new URLSearchParams({ source, target }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            if (postResponse.status === 202) {
                console.log('Webmention verzonden:', postResponse.data);
            } else {
                console.warn('Webmention mislukt:', postResponse.status, postResponse.data);
            }
        } else {
            console.warn('Geen Webmention endpoint gevonden op de website.');
        }
    } catch (error: any) {
        console.error('Fout bij het verzenden van Webmention:', error.response?.data || error.message);
    }
});
