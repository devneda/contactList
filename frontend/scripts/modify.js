import axios from 'axios';
import { notifyError, notifyOk} from '../scripts/dialogUtils.js';
import { el } from '../scripts/documentUtils.js';

window.fillContacts = function() {
    const params = new URLSearchParams(window.location.search);
    const contactId = params.get('id');

    if (!contactId) {
        notifyError('No se proporcionó un ID de contacto');
        return;
    }

    axios.get(`http://localhost:8080/contacts/${contactId}`)
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

    axios.put(`http://localhost:8080/contacts/${window.currentContactId}`, contactData)
        .then((response) => {
            window.location.href = './index.html';
            notifyOk('Los datos se han actualizado correctamente');
        })
        .catch((error) => {
            notifyError('Se ha producido un error al enviar los datos');
        });

    // Me da problemas modificar los datos con FormData (multer), si no quiero subir un archivo, le pasaré un JSON normal al backend
    /* const formData = new FormData();
    formData.append('name', name);
    formData.append('lastname', lastname);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('birthday', birthday);
    console.log('Datos recibidos en el frontend:', formData)
    axios.put(`http://localhost:8080/contacts/${window.currentContactId}`, formData)
        .then((response) => {
            notifyOk('Los datos se han actualizado correctamente');
            window.location.href = '../src/index.html'
        })
        .catch((error) => {
            notifyError('Se ha producido un error al enviar los datos');
        }); */
};