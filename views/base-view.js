import { LitElement, html, css } from "lit";
import "../components/nh-header.js";
import "../components/nh-footer.js";
import "./principal-view.js";
import "./add-people-view.js";

export class BaseView extends LitElement {
    static styles = css`
        main {
            padding: 0 20px;
            width: 50%;
            margin: 0 auto;
        }
    `;

    static properties = {
        currentView: { type: String }
    };

    constructor() {
        super();
        this.currentView = 'home';
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('register-person', (e) => {
            this.change({ detail: { view: 'home' } });
        });
    }

    change(e) {
        this.currentView = e.detail.view;
    }

    render() {
        return html`
            <nh-header @change-view=${this.change}></nh-header>
            <main>
                ${
                    this.currentView === 'home' 
                    ? html`<principal-view></principal-view>` : 
                    this.currentView === 'join'
                    ? html`<add-people-view></add-people-view>` : ''
                }
            </main>
            <nh-footer></nh-footer>
        `;
    }
}

customElements.define("base-view", BaseView);