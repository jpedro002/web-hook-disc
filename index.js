const fs = require('fs');
const path = require('path');

const pathToWrite = path.join(__dirname , 'index.html')

const data = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Olá Node</h1>
    <h2>Olá Mundo</h2>
</body>
</html>
`
console.log('oi');
console.log(pathToWrite)
fs.writeFileSync(pathToWrite, data);
