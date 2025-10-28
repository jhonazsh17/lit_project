import { LitElement, css, html } from "lit";

export class NhFooter extends LitElement {
    static properties = {
        year: "2024"
    };

    static styles = css`
        footer {
            text-align: center;
            margin-top: 20px;
            padding: 10px;
            border-top: 1px solid #ccc;
        }
    `;

    constructor() {
        super();
        this.year = new Date().getFullYear();
    }

    render() {
        return html`
            <footer>
                <p>&copy; <b>${this.year}</b> PagaGente. Todos los derechos reservados.</p>
            </footer>
        `;
    }
}

customElements.define("nh-footer", NhFooter);