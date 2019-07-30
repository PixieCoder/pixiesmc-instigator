import _ from 'lodash';
import createSession from './actions/createSession';

const main = document.getElementById('main');
const session = createSession(main);
const welcome = `Instigator`;
const welcomeTemplate = _.template('<h1><%= welcome %></h1>');
const wElm = welcomeTemplate({welcome});

main.innerHTML = wElm;
