import http from 'http';

http.createServer()
  .on('request', (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify({
      id: 1,
      name: 'Supreme T-Shirt',
      brand: 'Supreme',
      price: 99.99,
      options: [
        { color: 'blue' },
        { size: 'XL' }
      ]
    }));
  })
  .listen(3000);