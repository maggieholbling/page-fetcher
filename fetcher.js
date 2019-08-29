const request = require('request');
const fs = require('fs');

const fetcher = (url, localPath) => {
  request(url, (error, response, body) => {
    const text = body;
    if (error) throw error;
    if (response.statusCode !== 200) return console.log(`Error: ${response.statusCode}`);
    
    write(localPath, text);
  });
};

const write = (localFilePath, content) => {
  

  fs.writeFile(localFilePath, content, function (err) {
    if (err) return console.log(`Cannot write to file ${localFilePath}`);
    const stats = fs.statSync(localFilePath);
    const fileSizeInBytes = stats.size;
    console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${localFilePath}`);
  });
}

fetcher(...process.argv.slice(2));