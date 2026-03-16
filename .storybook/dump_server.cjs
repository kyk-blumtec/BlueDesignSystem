const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      fs.writeFileSync('C:/Users/USER/BlueDesignSystem/.storybook/sidebar_html.txt', body);
      res.end('ok');
      console.log('Got HTML DOM payload, wrote to sidebar_html.txt');
      process.exit(0);
    });
  } else {
    res.end('send post');
  }
}).listen(3002, () => console.log('Listening on 3002 for Storybook DOM dump...'));
