import _ from 'lodash';

const main = document.getElementById('main');
const welcome = `Instigator`;
const welcomeTemplate = _.template('<h1><%= welcome %></h1>');
const wElm = welcomeTemplate({ welcome });

main.innerHTML = wElm;
