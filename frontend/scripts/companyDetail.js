import axios from 'axios';
import { el } from '../scripts/documentUtils.js';
import { notifyOk, notifyError } from '../scripts/dialogUtils.js'

window.cargarCompany = function() {
    const params = new URLSearchParams(window.location.search);
    const companyId = params.get('id');
    
    if (!companyId) {
        notifyError('No se ha proporcionado ID del contacto');
        return;
    };

    axios.get(`http://localhost:8080/companies/${companyId}`)
        .then((response) => {
            const company = response.data;
            el('companyName').textContent = company.companyName;
            el('cif').textContent = company.cif;
            el('address').textContent = company.address;
            el('city').textContent = company.city;
            el('phone').textContent = company.phone;
            el('email').textContent = company.email;
        })
        .catch(error => {
            notifyError('Error al cargar la Empresa');
            console.error(error);
        });
    
};