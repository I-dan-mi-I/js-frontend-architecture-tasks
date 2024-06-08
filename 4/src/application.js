// BEGIN
/**
 * @param {object[]} elements
 */
const app = (elements) => {

    let buttonsContainer = document.querySelector(".container");

    const state = {
        elements: elements.slice(),
        visualState: elements.map((element) => {
            return {
                elementId: element.id,
                active: false
            }
        })
    }

    const nowActive = () => {
        let activeId;

        for (const element of state.visualState) {
            if (!element.active)
                continue;
            activeId = element.elementId;
            break;
        }

        return activeId
    }

    const render = () => {
        let tab = buttonsContainer.querySelector("div[data-element-id]");
        if (tab !== null)
            buttonsContainer.removeChild(tab);

        let activeId = nowActive();

        if (activeId === undefined)
            return;

        let description;
        for (const element of state.elements) {
            if (element.id !== activeId)
                continue;
            description = element.description;
            break;
        }

        if (description === undefined)
            return;

        tab = document.createElement("div");
        tab.textContent = description;
        tab.dataset.elementId = `${activeId}`;
        buttonsContainer.append(tab);
    }

    /**
     * @param {Event} event
     */
    const buttonCallback = (event) => {

        const setVisualState = (id, status) => {
            for (const element of state.visualState) {
                if (element.elementId !== id)
                    continue;
                element.active = status;
                return;
            }
        }

        /**
         * @type {HTMLButtonElement}
         */
        let button = event.target;

        let selectedId = parseInt(button.dataset.elementId);
        let activeId = nowActive();

        if (activeId !== undefined)
            setVisualState(activeId, false);
        if (activeId !== selectedId)
            setVisualState(selectedId, true);

        render();
    }

    const addButtons = () => {

        if (buttonsContainer.childNodes.length !== 0)
            return;

        state.elements.forEach((element) => {
            let button = document.createElement("button");
            button.classList.add("btn", "btn-primary");
            button.textContent = element.name;
            button.dataset.elementId = `${element.id}`;
            button.addEventListener('click', buttonCallback);
            buttonsContainer.append(button);
        })
    }

    addButtons();

}

export default app;
// END