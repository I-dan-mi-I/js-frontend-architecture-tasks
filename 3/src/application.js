// BEGIN
/**
 * @param {Object[]} _laptops
 */
const app = (_laptops) => {

    const form = document.querySelector("form");
    const resultBlock = document.querySelector(".result");
    const laptops = _laptops;

    let formState = {
        processor_eq: '',
        memory_eq: '',
        frequency_gte: '',
        frequency_lte: '',
    }

    const render = () => {
        resultBlock.innerHTML = '';

        let filtered = laptops.filter((laptop) => {

            if (formState.processor_eq != '' && formState.processor_eq !== laptop.processor)
                return false;

            if (formState.memory_eq != '' && parseInt(formState.memory_eq) !== laptop.memory)
                return false;

            if (formState.frequency_gte != '' && laptop.frequency < parseFloat(formState.frequency_gte))
                return false;

            if (formState.frequency_lte != '' && laptop.frequency > parseFloat(formState.frequency_lte))
                return false;

            return true;

        })

        filtered.forEach((laptop) => {

            resultBlock.append(`<section>
    <p>${laptop.model}</p>
    <ul>
        <li>frequency ${laptop.frequency}</li>
        <li>memory ${laptop.memory}</li>
        <li>processor ${laptop.processor}</li>
    </ul>
</section>`)
            
        })
    }

    /**
     * @param {Event} event
     */
    const callback = (event) => {
        /**
         * @type {HTMLInputElement}
         */
        let element = event.target;
        formState[element.name] = element.value;

        render();
    }

    form.addEventListener('input', callback);
    form.addEventListener('change', callback);

    render();
}

export default app;
// END