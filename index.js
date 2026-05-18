const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');
const app = express();
const helmet = require('helmet');
const compression = require('compression');

const PORT = process.env.PORT || 7898;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests
});

app.set('trust proxy', 1);
app.use(helmet());
app.use(compression());
app.use(limiter);
app.use(
  helmet.hsts({
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  })
);

app.use('/assets', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const lang = req.acceptsLanguages('fa', 'en') || 'en';
    res.redirect('/' + lang);
});

app.get('/en', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

app.get('/fa', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index-fa.html'));
});

app.get('/images/Gitea.svg', (req, res) => {
    res.sendFile(path.join(__dirname, 'images', 'Gitea.svg'));
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'html', '404.html'));
});

app.use((req, res, next) => {
  if (!req.secure) {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running at https://rohamnodoust.ir`);
});
