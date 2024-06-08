import keyBy from 'lodash/keyBy.js';
import has from 'lodash/has.js';
import isEmpty from 'lodash/isEmpty.js';
import * as yup from 'yup';
import onChange from 'on-change';
import axios from 'axios';

const routes = {
    usersPath: () => '/users',
};

const schema = yup.object().shape({
    name: yup.string().trim().required(),
    email: yup.string().required('email must be a valid email').email(),
    password: yup.string().required().min(6),
    passwordConfirmation: yup.string()
        .required('password confirmation is a required field')
        .oneOf(
            [yup.ref('password'), null],
            'password confirmation does not match to password',
        ),
});

// Этот объект можно использовать для того, чтобы обрабатывать ошибки сети.
// Это необязательное задание, но крайне рекомендуем попрактиковаться.
const errorMessages = {
    network: {
        error: 'Network Problems. Try again.',
    },
};

// Используйте эту функцию для выполнения валидации.
// Выведите в консоль её результат, чтобы увидеть, как получить сообщения об ошибках.
const validate = (fields) => {
    try {
        schema.validateSync(fields, {abortEarly: false});
        return {};
    } catch (e) {
        return keyBy(e.inner, 'path');
    }
};

// BEGIN
const app = () => {

    const container = document.querySelector('[data-container="sign-up"]');
    const form = document.querySelector('[data-form="sign-up"]');
    const submitButton = form.querySelector('input[type="submit"]');
    const state = {
        signUpForm: {
            data: {
                name: '',
                email: '',
                password: '',
                passwordConfirmation: '',
            },
            errors: {},
        },
    };

    const watchedState = onChange(state, (path, value, previousValue) => {
        if (path.startsWith('signUpForm.data')) {
            const errors = validate(watchedState.signUpForm.data);
            watchedState.signUpForm.errors = errors;
            const isValid = Object.keys(errors).length === 0;

            submitButton.disabled = !isValid;

            Object.keys(watchedState.signUpForm.data).forEach((fieldName) => {
                const input = form.querySelector(`[name="${fieldName}"]`);
                const errorMessage = errors[fieldName] ? errors[fieldName].message : '';
                let feedback = input.parentElement.querySelector(".invalid-feedback");

                if (errorMessage) {
                    input.classList.add('is-invalid');

                    if (feedback === null) {
                        feedback = document.createElement("div");
                        feedback.classList.add("invalid-feedback");
                        feedback.textContent = errorMessage;
                        input.parentElement.append(feedback);
                    }
                } else {
                    input.classList.remove('is-invalid');

                    if (feedback !== null)
                        input.parentElement.removeChild(feedback);
                }
            });
        }
    });

    form.addEventListener('input', (event) => {
        const {name, value} = event.target;
        watchedState.signUpForm.data[name] = value;
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        submitButton.disabled = true;

        try {
            await axios.post(routes.usersPath(), watchedState.signUpForm.data);
            container.innerHTML = 'User Created!';
        } catch (error) {
            console.error(errorMessages.network.error);
            submitButton.disabled = false;
        }
    });

}
export default app;
// END
