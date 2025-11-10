import { Container } from 'inversify';
import bindControllers from './controllers';
import bindServices from './services';
import bindRepositories from './repositories';

const container = new Container();

bindControllers(container);
bindServices(container);
bindRepositories(container);

export default container;
