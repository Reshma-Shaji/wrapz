const https = require('https');
https.get('https://www.figma.com/design/gJaJy5ZWCJeP3f707cfoLD/Untitled?node-id=1-3', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const titleMatch = data.match(/<meta property="og:title" content="([^"]+)"/);
    const descMatch = data.match(/<meta property="og:description" content="([^"]+)"/);
    const imgMatch = data.match(/<meta property="og:image" content="([^"]+)"/);
    console.log("Title:", titleMatch ? titleMatch[1] : null);
    console.log("Desc:", descMatch ? descMatch[1] : null);
    console.log("Img:", imgMatch ? imgMatch[1] : null);
  });
});

