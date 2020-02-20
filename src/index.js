import _ from 'lodash'

//style management
import './style.css';

//data import
import Icon from './icon.png';
import Data from './data.xml';

//output management
import printMe from './print.js';

//import with prefetch
//import(/* webpackPrefetch: true */ 'LoginModal') => <link rel="prefetch" href="login-modal-chunk.js">;

//import with preload (preload is done at the same time as the parent load)
import(/* webpackPreload: true */ 'ChartingLibrary');

function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');
    element.innerHTML = _.join(['hello', 'webpack'], ' ');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    //add css example
    element.classList.add('hello');
    element.appendChild(btn);

    //add image example
    const myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);

    //data loader inclusion(xml, csv, json)
    console.log(Data);

    return element;
}

let element = component(); // Store the element to rerender on print.js changes
document.body.appendChild(element);

if (module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('Accepting the updated printMe module!');
         printMe();
         document.body.removeChild(element);
         element = component(); // Rerender the "component" to update the click handler
         document.body.appendChild(element);
    })
}