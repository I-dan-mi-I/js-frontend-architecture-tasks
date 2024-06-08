import uniqueId from 'lodash/uniqueId.js';

// BEGIN
const app = () => {
    const state = {
        lists: {},
        tasks: [],
        nowSelectedList: null
    }

    let listTopicsContainer = document.querySelector('div[data-container="lists"]');
    let tasksContainer = document.querySelector('div[data-container="tasks"]');

    let listForm = document.querySelector('form[data-container="new-list-form"]');
    let taskForm = document.querySelector('form[data-container="new-task-form"]');

    const init = () => {
        let id = uniqueId();
        let topic = "General";
        state.nowSelectedList = id;
        state.lists[id] = topic;
        render();
    }

    /**
     * @param {string} topic
     */
    const addList = (topic) => {
        let currentTopics = Object.values(state.lists);
        if (currentTopics.includes(topic))
            return false;
        let id = uniqueId();
        state.lists[id] = topic;
        return true;
    }

    /**
     * @param {string} value
     */
    const addTask = (value) => {

        let nowSelected = state.nowSelectedList;

        if (nowSelected === null)
            return;

        if (!Object.keys(state.lists).includes(nowSelected))
            return;

        state.tasks.push({
            value: value,
            listId: nowSelected
        })
    }

    /**
     * @param {Event} event
     */
    const changeTopic = (event) => {

        event.preventDefault();

        /**
         * @type {HTMLAnchorElement}
         */
        let link = event.target;
        state.nowSelectedList = link.dataset.listId;
        render();

    }

    const render = () => {
        listTopicsContainer.innerHTML = '';
        tasksContainer.innerHTML = ''

        let listTopicLinks = document.createElement("ul");
        Object.entries(state.lists).forEach(([id, topic]) => {
            let element = document.createElement("li");

            if (id === state.nowSelectedList) {
                let selectedTopic = document.createElement("b");
                selectedTopic.textContent = topic;
                element.append(selectedTopic);
            }
            else {
                let topicLink = document.createElement("a");
                topicLink.href = `#${topic.toLowerCase()}`;
                topicLink.dataset.listId = id;
                topicLink.textContent = topic;
                topicLink.addEventListener('click', changeTopic);
                element.append(topicLink);
            }

            listTopicLinks.append(element);
        })
        listTopicsContainer.append(listTopicLinks);

        let filteredTasks = state.tasks.filter((task) => task.listId === state.nowSelectedList)
        let tasks = document.createElement('ul');
        filteredTasks.forEach(({value}) => {
            let element = document.createElement("li");
            element.textContent = value;
            tasks.append(element);
        })

        if (tasks.childNodes.length !== 0)
            tasksContainer.append(tasks);
    }

    taskForm.addEventListener('submit', (event) => {

        event.preventDefault();

        let formData = new FormData(event.target);
        let task = formData.get("name");
        addTask(task);
        render();
        taskForm.reset();
    });

    listForm.addEventListener('submit', (event) => {

        event.preventDefault();

        let formData = new FormData(event.target);
        let topic = formData.get("name");
        let result = addList(topic);
        if (result)
            render();
        listForm.reset();
    });

    init();
}

export default app;
// END