const fs = require('fs');

fs.readFile('../app/styles/icons.css', 'utf8', (error, data) => {
  if (error) {
    throw error;
  }

  const regex = /icon-.+:before/g;
  const result = data.match(regex);
  const icons = result.map((iconResult) => iconResult.replace(':before', ''));

  fs.writeFile('./icons.txt', JSON.stringify(icons), (error) => {
    if (error) {
      throw error;
    }
    console.log('Done!');
  });
});
