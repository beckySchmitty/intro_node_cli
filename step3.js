const fs = require('fs');
const process = require('process');
const axios = require('axios').default;

function cat(path, filename) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log("ERROR = ", err);
            process.exit(1);
        } else {
            if (filename) {
                writeNew(data, filename);
            } else {
                console.log(data);
        }}
    })
}

async function webCat (url, filename) {
    try {
        const response = await axios.get(url);
        if (filename) {
            writeNew(response.data, filename)
        } else {console.log(response);}
    } catch (error) {
        console.log("ERROR = ", error);
        process.exit(1);    
    }
}

function writeNew(content, filename) {
    fs.writeFile(filename, `${content}`, 'utf8', (err) => {
        if (err) {
            console.log(err);
            process.kill(1);
        }
        console.log('Wrote that line!');
})};

// call funs to write
if (process.argv[2].startsWith('--out')) {
        process.argv[4].startsWith('http') ? webCat(process.argv[4], process.argv[3]) : cat(process.argv[4], process.argv[3]);
} else {
        if (process.argv[2].startsWith('http')) {
        webCat(process.argv[2]);
    } else {
        cat(process.argv[2]);
    }
}