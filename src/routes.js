const express = require('express');
const router = express.Router();
const qr = require('qrcode');
const Session = require('./models/session');

router.get('/', async (req, res) => {
    res.render('index');
});


router.post('/scan', async (req, res) => {
    const session = new Session();
    await session.save();
    if(!session) res.sendStatus(400);
    qr.toDataURL(req.protocol + '://' + req.get('host') + '/' + session.id, (err, src) => {
        if(err) res.sendStatus(400);
        res.render('scan', { src: src });
    });
});

router.get('/:id', async (req, res) => {
    const session = await Session.findOne({ id : req.params.id });
    if (session == null) return res.sendStatus(404);
    session.verified = true;
    await session.save();
    res.redirect(`/${session.id}/board`);
});

router.post('/:id/board', async (req, res) => {
    const session = await Session.findOne({'id': req.params.id});
    if (session == null) return res.sendStatus(404);
    session.code = req.body.code;
    await session.save();
    res.render('board', { session: session });
});

router.get('/:id/board', async (req, res) => {
    const session = await Session.findOne({ id : req.params.id });
    if (session == null) return res.sendStatus(404);
    res.render('board', { session: session });
});

module.exports = router