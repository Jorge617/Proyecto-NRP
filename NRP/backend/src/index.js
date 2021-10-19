const app = require('./app');
require('./database');
const npr = require('./npr')
async function main() {
    await app.listen(app.get('port'));
    console.log('Server on port', app.get('port'));
    
    
    npr.calcularPrioridad();
}

main();

