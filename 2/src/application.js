import axios from "axios";
import e from 'express';

const routes = {
    tasksPath: () => '/api/tasks',
};

// BEGIN
const app = async () => {

    const tasksList = document.querySelector("#tasks");
    const form = document.querySelector("form");

    /**
     * @param {string} name
     */
    const addToList = (name, putToHead = true) => {
        let child = document.createElement("li");
        child.classList.add("list-group-item");
        child.textContent = name;
        if (putToHead)
          tasksList.prepend(child);
        else
          tasksList.append(child)
    }

    const loadFromBackend = async () => {
        const response = await axios.get(routes.tasksPath());

        if (response.status !== 200)
            return;

        if (!response.data.hasOwnProperty('items'))
            return;

        response.data.items.forEach(({name}) => {
            addToList(name, false);
        })
    }

    /**
     * @param {Event} event
     */
    const addToBackend = async (event) => {

        event.preventDefault();

        let formData = new FormData(event.target);
        let value = formData.get("name")

        const response = await axios.post(routes.tasksPath(), {
            name: value
        });

        if (response.status !== 201)
            return;

        form.reset();
        addToList(value);
    }

    await loadFromBackend();

    form.addEventListener('submit', addToBackend);
}

export default app;
// END