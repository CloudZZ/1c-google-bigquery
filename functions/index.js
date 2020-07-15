const functions = require('firebase-functions');
crypto = require('crypto')

exports.sign = functions.https.onRequest((req, res) => {
    if (req.method !== 'POST')
        return res.status(400).json({
            code: '400',
            message: 'Bad request: only POST allowed'
        });
    if (!req.body.pem)
        return res.status(400).json({
            code: '400',
            message: 'Bad request: no pem passed'
        });
    if (!req.body.body)
        return res.status(400).json({
            code: '400',
            message: 'Bad request: no body to sign passed'
        });

    try {
        // 1c command to replace:
        // КомандаСистемы("openssl dgst -sha256 -sign my.pem < body.txt | openssl base64 > signed.txt",Корень);

        const signer = crypto.createSign("RSA-SHA256");
        signer.update(Buffer.from(req.body.body));
        const sign = signer.sign(Buffer.from(req.body.pem, 'base64'), 'base64');
        return res.status(200).json({
            code: '200',
            message: sign
        });


    } catch (err) {
        return res.status(500).json({
            code: '500',
            message: 'Internal error: ' + err.toString()
        });
    }
});
