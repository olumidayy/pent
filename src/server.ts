import config from './config';
import Logger from './common/logger';
import server from './app';

server.listen(config.port, () => Logger.info(`
    🚀 Server ready at: http://localhost:${config.port}${config.api.prefix}
`));
