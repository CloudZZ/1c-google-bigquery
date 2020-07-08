const functions = require('firebase-functions');
const openssl = require('openssl-nodejs')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

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
        // КомандаСистемы("openssl dgst -sha256 -sign my.pem < body.txt > sign2",Корень);
        openssl(['dgst', '-sha256', '-sign',
            {
                name: 'my.pem',
                buffer: Buffer.from(req.body.pem, 'base64')
            },
            {
                name: 'body.txt',
                buffer: Buffer.from(req.body.body)
            }
        ], (err, buffer) => {
            console.log(err.toString(), buffer.toString(), "err: ", err.toString());
            if (err.length)
                return res.status(500).json({
                    code: '500',
                    message: 'Internal OpenSSL error: ' + err.toString()
                });
            return res.status(200).json({
                code: '200',
                message: Buffer.from(buffer.join("")).toString('base64')
            });
        });
    } catch (err) {
        return res.status(500).json({
            code: '500',
            message: 'Internal error: ' + err.toString()
        });
    }
  return undefined;
});
