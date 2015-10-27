/**
 *  define convert protocol
 *  f(..., callback)
 *        callback
 *                  err ... 
 */
let toPromise = (f, context) => (...y) => new Promise((resolve, reject) => {
    let callback = function(err, ...res) {
        if (err) {
            return reject.apply(undefined, err);
        }
        resolve.apply(undefined, res);
    }
    y.push(callback);
    try {
        f.apply(context, y);
    } catch (err) {
        reject(err);
    }
});

export default toPromise;