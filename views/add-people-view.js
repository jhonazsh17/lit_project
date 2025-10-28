import { LitElement, html } from "lit";
import "../components/nh-register-form.js";

export class AddPeopleView extends LitElement {
    render() {
        return html`
            <section>
                <h3>Sumate a PagaGente</h3>
                <p>
                    Únete a nuestra plataforma para facilitar tus pagos y transacciones. </br>
                    Regístrate hoy mismo y comienza a disfrutar de nuestros servicios.
                </p>
                <nh-register-form></nh-register-form>
            </section>
        `;
    }
};

customElements.define("add-people-view", AddPeopleView);