const path = require('path');
const router = require('express').Router();

router.get('*', (req, res) => {
    const dev = path.join(__dirname, '..', 'dist', 'index.html');
    const route = dev;
    res.sendFile(route);
});

module.exports = router;