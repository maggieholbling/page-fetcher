const request = require('request');
const fs = require('fs');

const fetcher = (url, localPath) => {
  request(url, (error, response, body) => {
    const text = body;
    if (error) throw error;
    if (response.statusCode !== 200) return console.log(`Error: ${response && response.statusCode}`);
    
    write(localPath, text);
  });
};

const write = (localFilePath, content) => {
  const stats = fs.statSync(localFilePath);
  const fileSizeInBytes = stats.size;

  fs.writeFile(localFilePath, content, function (err) {
    if (err) throw err;
    console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${localFilePath}`);
  });
}

fetcher(...process.argv.slice(2));