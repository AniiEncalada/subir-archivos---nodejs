var FilePreviews = require('filepreviews');

const fp = new FilePreviews({
    debug: true,
    apiKey: 'CopJLaz6csmqrqs62XkTzhiCecmdXq',
    apiSecret: 'WI2XwT9VJF2WzIiNNT3PanNbTiyQbz'
})

const options = {
    pages: "all",
    format: "png"
}

fp.generate('/archivo/0c005b2c-5bae-4c6a-9d4a-43f8a3b0477a.pdf', options, (err, result) => {
    if (err) {
        console.log(err)
        return new Error(err);
    }
    console.log(result)
});