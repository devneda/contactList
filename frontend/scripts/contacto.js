import axios from 'axios';
import { el } from '../scripts/documentUtils.js';
import { notifyOk, notifyError } from '../scripts/dialogUtils.js'

window.cargarContacto = function() {
    const params = new URLSearchParams(window.location.search);
    const contactId = params.get('id');
    
    if (!contactId) {
        notifyError('No se ha proporcionado ID del contacto');
        return;
    };

    axios.get(`http://localhost:8080/contacts/${contactId}`)
        .then((response) => {
            const contact = response.data;
            el('name').textContent = contact.name;
            el('lastname').textContent = contact.lastname;
            el('phone').textContent = contact.phone;
            el('email').textContent = contact.email;
            el('birthday').textContent = contact.birthday
        })
        .catch(error => {
            notifyError('Error al cargar el contacto');
            console.error(error);
        });
    
};