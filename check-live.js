const http = require('http');
http.get('http://127.0.0.1:3000', (res) => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    console.log('Watch with sound:', body.includes('Watch with sound'));
    console.log('Film section id:', body.includes('film'));
    console.log('Anatomy of:', body.includes('Anatomy of'));
    console.log('handleStartInlineFilm:', body.includes('handleStartInlineFilm'));
  });
});

