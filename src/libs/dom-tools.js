export function showBackButtons(onClick) {
    document.querySelectorAll(".back-button")
        .forEach(button => {
            button.classList.remove("hidden");
            button.onclick = onClick;
        });
}

export function hideBackButtons() {
    document.querySelectorAll(".back-button")
        .forEach(button => {
            button.classList.add("hidden");
        });
}

export function updateNotificationHelpers(status){
    setDisplayed('#notifications-unavailable', status === 'unavailable');
    setDisplayed('#ask-notifications-permission', status === 'default');
    setDisplayed('#notifications-denied', status === 'denied');
}

export function setPage({ id, title, content }) {
    document.getElementById("page-title").textContent = title;
    document.getElementById("main-container").innerHTML = content;

    setViewportClass(id);
}

function setViewportClass(id) {
    const viewport = document.body;
    const [original, ...classes] = viewport.classList;

    viewport.classList.remove(...classes);
    viewport.classList.add(id);
}

export function createAdvices(texts) {
    const ul = document.createElement('ul');
    ul.id = 'tiles';
    ul.classList.add('tiles');

    texts
    .map(createAdvice)
    .forEach(li => ul.append(li));

    return ul;
}

function createAdvice(advice) {
    const { id, title,  text } = advice;

    const bandeau = document.createElement('img');
    const imageWrapper = document.createElement('div');
    const article = document.createElement('article');
    const tile = document.createElement('li');
    const h2 = document.createElement('h2');
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const contentWrapper = document.createElement('div');

    bandeau.src = '../images/home/bandeau.png';
    bandeau.alt = 'Background';

    imageWrapper.style = `background-image: url(../images/home/illus/${id}.png)`;

    article.className = 'advice';
    wrapper.className = 'advice-wrapper';
    imageWrapper.className = 'img';
    contentWrapper.className = 'content-wrapper';
    content.className = 'content';

    h2.textContent = title;
    content.innerHTML = text;

    wrapper.append(bandeau);
    wrapper.append(article);

    article.append(h2);
    article.append(contentWrapper);
    contentWrapper.append(imageWrapper);
    contentWrapper.append(content);

    tile.className = 'tile';
    tile.append(wrapper);

    return tile;
}

export function setDisplayed(query, displayed) {
    document.querySelectorAll(query)
        .forEach(elm => {
            if (displayed) {
                elm.classList.remove('undisplayed');
            } else {
                elm.classList.add('undisplayed');
            }
        });
}

export function hideElement(elm) {
    elm.classList.add('transparent');
    elm.classList.remove('faded');
    elm.classList.remove('opaque');
}

export function showElement(elm) {
    elm.classList.remove('transparent');
    elm.classList.remove('faded');
    elm.classList.add('opaque');
}

export function fadeElement(elm) {
    elm.classList.remove('transparent');
    elm.classList.remove('opaque');
    elm.classList.add('faded');
}

export function showAllStepTexts(container) {
    applyToAllStepPart(container, '.step-text', showElement);
}

export function fadeAllStepTexts(container) {
    applyToAllStepPart(container, '.step-text', fadeElement);
}

export function hideAllStepTexts(container) {
    applyToAllStepPart(container, '.step-text', hideElement);
}

export function hideAllStepIcons(container) {
    applyToAllStepPart(container, '.step-icon', hideElement);
}

export function hideAllStepImages(container) {
    applyToAllStepPart(container, '.step-image', hideElement);
}

export function showStepTextUntil(step, stepCount, container, fadeBefore) {
    container = container || "";
    if (typeof fadeBefore === 'undefined') fadeBefore = true;

    let i = 0;
    const applyBefore = fadeBefore ? fadeStepText : showStepText;
    // previous steps
    while (i < step) {
        applyBefore(i, container);
        i += 1;
    }

    // current step
    showStepText(step, container);
    i += 1;

    // next steps
    while (i < stepCount) {
        hideStepText(i, container);
        i += 1;
    }
}

function applyToAllStepPart(container, part, fun) {
    let root = document;
    if (container){
        root = document.querySelector(container);
    }
    root.querySelectorAll(`.step${part}`).forEach(fun);
    root.querySelectorAll(`.step ${part}`).forEach(fun);
}

function applyToStepPart(step, container, part, fun) {
    let root = document;
    if (container){
        root = document.querySelector(container);
    }
    root.querySelectorAll(`.step.step-${step}${part}`).forEach(fun);
    root.querySelectorAll(`.step.step-${step} ${part}`).forEach(fun);
}

export function fadeStepText(step, container) {
    applyToStepPart(step, container, '.step-text', fadeElement);
}

export function showStepText(step, container) {
    applyToStepPart(step, container, '.step-text', showElement);
}

export function hideStepText(step, container) {
    applyToStepPart(step, container,  '.step-text',hideElement);
}

export function showStepIcon(step, container) {
    applyToStepPart(step, container, '.step-icon', showElement)
}

export function hideStepIcon(step, container) {
    applyToStepPart(step, container, '.step-icon', hideElement)
}

export function showStepImage(step, container) {
    applyToStepPart(step, container, '.step-image', showElement)
}

export function hideStepImage(step, container) {
    applyToStepPart(step, container, '.step-image', hideElement)
}

export function showStepImageOnly(step, container) {
    hideAllStepImages(container);
    showStepImage(step, container);
}

export function showStepIconOnly(step, container) {
    hideAllStepIcons(container);
    showStepIcon(step, container);
}
