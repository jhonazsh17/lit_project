import { LitElement, html, css } from "lit";

export class NhListItem extends LitElement {
    static properties = {
        name: { type: String },
        lastName: { type: String },
        occupation: { type: String },
        modalities: { type: Array }
    };
    static styles = css`
        h3 {
            margin: 0;
        }
        .list-item-content {
            border: 1px solid #ccc;
            padding: 20px;
            border-radius: 6px;
        }
        .list-item__chip {
            display: inline-block;
            border-radius: 8px;
            padding: 2px 6px;
            font-size: 0.7em;
            font-weight: bold;
        }
        .list-item__chip--cash {
            background-color: #f0ad4e;
            color: white;
        }
        .list-item__chip--digital {
            background-color: #5bc0de;
            color: white;
        }
    `;
    constructor() {
        super();
    }
    render() {
        return html`
            <div class="list-item-content">
                <h3>${this.name} ${this.lastName}</h3>
                <div>
                    Ocupación: ${this.occupation}
                </div>
                <div>
                    Modalidad: ${
                        this.modalities.map(
                            modality => html`
                                <span class="list-item__chip ${modality.value === 'cash' ? 'list-item__chip--cash' : 'list-item__chip--digital'}">
                                    ${modality.name}
                                </span>
                            `
                        )
                    }
                </div>
            </div>
            
        `;
    }
}

customElements.define('nh-list-item', NhListItem);