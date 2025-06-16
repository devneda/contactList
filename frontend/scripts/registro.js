import axios from 'axios';
import { notifyError, notifyOk} from '../scripts/dialogUtils.js';
import { el } from '../scripts/documentUtils.js';

window.addContact = function() {
    const name = el('name').value;
    const lastname = el('lastname').value;
    const phone = el('phone').value;
    const email = el('email').value;
    const birthday = el('birthday').value;
    let compamyId = 1;
    //const image = el('image').files[0];

    // Validacion de datos si ha insertado nombre del contacto
    if ( name === '' ) {
        notifyError('El nombre de un campo obligatorio');
        return;
    }

    //Implementacion operacion para registrar un contacto y subir una imagen
    // const formData = new FormData();
    // formData.append('name', name);
    // formData.append('lastname', lastname);
    // formData.append('phone', phone);
    // formData.append('email', email);
    // formData.append('birthday', birthday);
    // if ( image ) {
    //     formData.append('image', image);
    // }
    
    const contact = {
        'name':  name,
        'lastname': lastname,
        'phone': phone,
        'email': email,
        'birthday': birthday,
        'companyId': companyId
    }

    axios.post('http://localhost:8080/contacts', contact)
        .then((response) => {
            notifyOk('Los datos se han registrado correctamente');
            el('name').value = '';
            el('lastname').value = '';
            el('phone').value = '';
            el('email').value = '';
            el('birthday').value = '';
            el('companyId').value = '';
        })
        .catch((error) => {
            notifyError('Se ha producido un error al enviar los datos')
        })
}