import {LitElement, css, html} from 'lit';

export class NhHeader extends LitElement {
    static properties = {
        title: "",
        links: []
    };

    static styles = css`
        header {
            text-align: center;
        }
    `;

    constructor() {
        super();
        this.title = "PagaGente";
        this.subtitle = "Hacer tus pagos es importante, ¡Hazlo ya!";
        this.links = [
            { name: "Inicio", value: "home" },
            { name: "Sumate", value: "join" }
        ]
    }

    goView(e, view) {
        console.log('Cambiando a la vista:', view, e);
        const changeViewEvent = new CustomEvent('change-view', {
            detail: { view },
            bubbles: true,
            composed: true
        })
        this.dispatchEvent(changeViewEvent);
    }

    render() {
        return html`
            <header>
                <h1>${this.title}</h1>
                <h3>${this.subtitle}</h3>
                <nav>
                    ${ this.links.map(
                        link => html`<button @click=${(e) => this.goView(e, link.value)}>${link.name}</button>&nbsp;`
                    )}
                </nav>
            </header>
            <br />
        `;
    }
}

customElements.define('nh-header', NhHeader);