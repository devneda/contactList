import axios from 'axios';
import { notifyError, notifyOk} from '../scripts/dialogUtils.js';
import { el } from '../scripts/documentUtils.js';

window.fillCompanies = function() {
    const params = new URLSearchParams(window.location.search);
    const companyId = params.get('id');

    if (!companyId) {
        notifyError('No se proporcionó un ID de Empresa');
        return;
    }

    axios.get(`http://localhost:8080/companies/${companyId}`)
        .then((response) => {
            const company = response.data;
            el('companyName').value = company.companyName;
            el('cif').value = company.cif;
            el('address').value = company.address;
            el('city').value = company.city;
            el('phone').value = company.phone;
            el('email').value = company.email;
            window.currentcompanyId = companyId;
        })
        .catch((error) => {
            notifyError('Error al obtener los datos del contacto');
        });
};

window.modifyCompany = function() {
    const companyData = {
        "companyName": el('companyName').value,
        "cif": el('cif').value,
        "address": el('address').value,
        "city": el('city').value,
        "phone": el('phone').value,
        "email": el('email').value
    };

    axios.put(`http://localhost:8080/companies/${window.currentcompanyId}`, companyData)
        .then((response) => {
            window.location.href = './empresa.html';
            notifyOk('Los datos se han actualizado correctamente');
        })
        .catch((error) => {
            notifyError('Se ha producido un error al enviar los datos');
        });
};