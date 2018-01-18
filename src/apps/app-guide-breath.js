import {showStepUntil, showStepOnly, setDisplayed} from '../libs/dom-tools';
import {warmUp, cancelWait, wait} from "../libs/app-helpers";
import co from 'co';

const breathStepCount = 3;
const breathStepTimeout = 2 * 1000; // in ms

function* exercise(){
    yield* warmUp();

    setDisplayed('.app-warm-up', false);
    setDisplayed('#breath-guide', true);
    yield wait(breathStepTimeout);

    for (let step = 1; step < breathStepCount; step++) {
        showStepUntil(step, breathStepCount, '#breath-guide .app-instructions', true);
        showStepOnly(step, '#breath-guide .app-illustrations');
        yield wait(breathStepTimeout);
    }

    while (true) {


        yield wait(breathStepTimeout);
    }
}

const app = {
    title: "Apprentissage de la bonne respiration",
    content: require('../views/app-guide-breath.html'),
    setup: function () {
        co(exercise());
    },
    exit: function () {
        cancelWait();
    }
};

export default app;