const fs = require('fs');
const process = require('process');
const axios = require('axios').default;

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log("ERROR = ", err);
            process.exit(1);
        } else {
            console.log(data);
        }
    })
}

async function webCat (url) {
    try {
        const response = await axios.get(url);
        console.log(response);
    } catch (error) {
        console.log("ERROR = ", error);
        process.exit(1);    
    }
}

// decide which to run
if (process.argv[2].startsWith('http')) {
    webCat(process.argv[2])
} else {
    cat(process.argv[2])
}

