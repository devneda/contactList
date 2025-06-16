import axios from 'axios';
import { notifyError, notifyOk} from '../scripts/dialogUtils.js';
import { el } from '../scripts/documentUtils.js';
const baseURL =
    window.location.hostname === 'localhost'
        ? 'http://localhost:8080/api'
        : '/api';

window.fillContacts = function() {
    const params = new URLSearchParams(window.location.search);
    const contactId = params.get('id');

    if (!contactId) {
        notifyError('No se proporcionó un ID de contacto');
        return;
    }

    axios.get(`${baseURL}/contacts/${contactId}`)
        .then((response) => {
            const contact = response.data;
            el('name').value = contact.name;
            el('lastname').value = contact.lastname;
            el('phone').value = contact.phone;
            el('email').value = contact.email;
            el('birthday').value = contact.birthday;
            window.currentContactId = contactId;
        })
        .catch((error) => {
            notifyError('Error al obtener los datos del contacto');
        });
};

window.modifyContact = function() {
    const contactData = {
        name: el('name').value,
        lastname: el('lastname').value,
        phone: el('phone').value,
        email: el('email').value,
        birthday: el('birthday').value
    };

    console.log('Datos enviados al backend:', contactData);

    axios.put(`${baseURL}/contacts/${window.currentContactId}`, contactData)
        .then((response) => {
            window.location.href = './index.html';
            notifyOk('Los datos se han actualizado correctamente');
        })
        .catch((error) => {
            notifyError('Se ha producido un error al enviar los datos');
        });
};