/**
 * wrap node http.request method
 */

let request = (options = {}) => new Promise((resolve, reject) => {
    let req = http.request(options, (res) => {
        let chunks = [];
        res.on('data', function(chunk) {
            chunks.push(chunk);
        });
        res.on('end', function() {
            let body = chunks.join('');
            resolve(body);
        });
    });
    req.on('error', function(e) {
        reject(e);
    });
    // write data to request body
    req.write(options.body);
    req.end();
});

export default request;
