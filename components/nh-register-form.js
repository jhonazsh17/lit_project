import { LitElement, html, css } from "lit";

export class NhRegisterForm extends LitElement {
    static properties = {
        inputs: { type: Array }
    };

    constructor() {
        super();
        this.inputs = [
            { label: "Nombres", type: "text", id: "name", name: "name", required: true },
            { label: "Apellidos", type: "text", id: "lastName", name: "lastName", required: true },
            { label: "Ocupación", type: "text", id: "occupation", name: "occupation", required: true },
        ];
    }

    goRegister(e) {
        const newPerson = {
            name: this.renderRoot?.querySelector('#name').value,
            lastName: this.renderRoot?.querySelector('#lastName').value,
            occupation: this.renderRoot?.querySelector('#occupation').value,
            modality: this.renderRoot?.querySelector('#modality').value,
        }

        const registerEvent = new CustomEvent('register-person', {
            detail: { newPerson },
            bubbles: true,
            composed: true
        });
        window.dispatchEvent(registerEvent);
    }

    render() {
        return html`
            <div>
                ${this.inputs.map(input => html`
                    <label for="${input.id}">${input.label}:</label><br />
                    <input type="${input.type}" id="${input.id}" name="${input.name}" ?required=${input.required} /><br /><br />
                `)}
                <select name="modality" id="modality" required>
                    <option value="" disabled selected>Selecciona una modalidad</option>
                    <option value="cash">Efectivo</option>
                    <option value="digital">Digital</option>
                    <option value="both">Ambas</option>
                </select><br /><br />
                <button @click=${(e) => this.goRegister(e)}>Registrarse</button>
            </div>
        `;
    }
}

customElements.define("nh-register-form", NhRegisterForm);