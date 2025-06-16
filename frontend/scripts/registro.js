import axios from 'axios';
import { notifyError, notifyOk} from '../scripts/dialogUtils.js';
import { el } from '../scripts/documentUtils.js';
const baseURL =
    window.location.hostname === 'localhost'
        ? 'http://localhost:8080/api'
        : '/api';

window.addContact = function() {
    const name = el('name').value;
    const lastname = el('lastname').value;
    const phone = el('phone').value;
    const email = el('email').value;
    const birthday = el('birthday').value;
    let companyId = 1;

    // Validacion de datos si ha insertado nombre del contacto
    if ( name === '' ) {
        notifyError('El nombre de un campo obligatorio');
        return;
    }

    const contact = {
        'name':  name,
        'lastname': lastname,
        'phone': phone,
        'email': email,
        'birthday': birthday,
        'companyId': companyId
    }

    axios.post(`${baseURL}/contacts`, contact)
        .then((response) => {
            notifyOk('Los datos se han registrado correctamente');
            el('name').value = '';
            el('lastname').value = '';
            el('phone').value = '';
            el('email').value = '';
            el('birthday').value = '';
        })
        .catch((error) => {
            notifyError('Se ha producido un error al enviar los datos')
        })
}

window.addCompany = function() {
    const companyName = el('companyName').value;
    const cif = el('cif').value;
    const address = el('address').value;
    const city = el('city').value;
    const phone = el('phone').value;
    const email = el('email').value;

    // Validacion de datos si ha insertado nombre del contacto
    if ( companyName === '' ) {
        notifyError('La razón social es un campo obligatorio.');
        return;
    }

    const company = {
        'companyName':  companyName,
        'cif': cif,
        'address': address,
        'city': city,
        'phone': phone,
        'email': email
    }

    axios.post(`${baseURL}/companies`, company)
        .then((response) => {
            notifyOk('Los datos se han registrado correctamente');
            el('companyName').value = '';
            el('cif').value = '';
            el('address').value = '';
            el('city').value = '';
            el('phone').value = '';
            el('email').value = '';
        })
        .catch((error) => {
            notifyError('Se ha producido un error al enviar los datos')
        })
}


window.mostrarFormulario = function(tipo){
    const container = document.getElementById('formulario-container');
    if (tipo === 'contacto') {
        container.innerHTML = `
            <form>
                <div class="mb-3">
                    <label for="name" class="form-label">Nombre</label>
                    <input class="form-control" type="text" id="name"/>
                </div>
                <div class="mb-3">
                    <label for="lastname" class="form-label">Apellidos</label>
                    <input class="form-control" type="text" id="lastname"/>
                </div>
                <div class="mb-3">
                    <label for="phone" class="form-label">Teléfono</label>
                    <input class="form-control" type="text" id="phone"/>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Correo electrónico</label>
                    <input class="form-control" type="text" id="email"/>
                </div>
                <div class="mb-3">
                    <label for="birthday" class="form-label">Cumpleaños</label>
                    <input class="form-control" type="date" id="birthday"/>
                </div>
                <button type="button" class="btn btn-primary" onclick="addContact()">Registrar</button>
            </form>
        `;
    } else if (tipo === 'empresa') {
        container.innerHTML = `
            <form>
                <div class="mb-3">
                    <label for="companyName" class="form-label">Razón social</label>
                    <input class="form-control" type="text" id="companyName"/>
                </div>
                <div class="mb-3">
                    <label for="cif" class="form-label">CIF</label>
                    <input class="form-control" type="text" id="cif"/>
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">Dirección</label>
                    <input class="form-control" type="text" id="address"/>
                </div>
                <div class="mb-3">
                    <label for="city" class="form-label">Localidad</label>
                    <input class="form-control" type="text" id="city"/>
                </div>
                <div class="mb-3">
                    <label for="phone" class="form-label">Teléfono</label>
                    <input class="form-control" type="text" id="phone"/>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input class="form-control" type="text" id="email"/>
                </div>
                <button type="button" class="btn btn-primary" onclick="addCompany()">Registrar</button>
            </form>
        `;
    }
}
