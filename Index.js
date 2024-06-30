const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./Modules/replacetemplate');

const tempOverview = fs.readFileSync(`${__dirname}/final/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/final/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/final/templates/template-product.html`, 'utf-8');

let dataObj;
try {
    const data = fs.readFileSync(`${__dirname}/final/dev-data/data.json`, 'utf-8');
    dataObj = JSON.parse(data);
} catch (error) {
    console.error('Error reading or parsing data file:', error);
    dataObj = []; // Default to an empty array in case of error
}

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'});
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        console.log("Generated cards HTML:", cardsHtml);
    
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        console.log("Final HTML output:", output);
    
        res.end(output);
    } else if (pathname === '/project') {
        const project = dataObj.find(p => p.id === query.id);
        if (project) {
            res.writeHead(200, {'Content-type': 'text/html'});
            const output = replaceTemplate(tempProduct, project);
            res.end(output);
        } else {
            res.writeHead(404, {'Content-type': 'text/html'});
            res.end('<h1>Project not found!</h1>');
        }
    } else if (pathname === '/api') {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});

