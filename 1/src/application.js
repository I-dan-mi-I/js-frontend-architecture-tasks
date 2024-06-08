// BEGIN
const init = () => {

    const resultField = document.querySelector("#result");
    const form = document.querySelector("form");
    const inputLine = form.querySelector('[name="number"]');
    const resetButton = document.evaluate("//button[contains(text(),'reset')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    inputLine.focus();

    let sum = 0;

    const syncVarWithElement = () => {
        resultField.textContent = `${sum}`;
    }


    form.addEventListener('submit', (event) => {

        event.preventDefault();

        let value = parseInt(inputLine.value);

        if (!isNaN(value))
            sum += value;

        form.reset()

    })

    form.addEventListener('reset', () => {
        syncVarWithElement();
        inputLine.focus();
    })

    resetButton.addEventListener('click', () => {
        sum = 0;
        form.reset();
    })

}
export default init;
// END