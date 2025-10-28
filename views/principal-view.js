import { LitElement, html, css } from "lit";
import "../components/nh-list-item.js";

export class PrincipalView extends LitElement {

    static properties = {
        people: { type: Array },
        peopleAux: { type: Array },
        modalities: { type: Array },
        selectedModality: { type: String },
        searchTerm: { type: String }
    };

    static styles = css`
        .list {
            list-style-type: none;
            padding: 0;
        }
        .list-item {
            padding-bottom: 10px;
        }
    `;

    constructor() {
        super();
        this.modalities = [
            { value: "all", label: "Ambas modalidades" },
            { value: "cash", label: "Efectivo" },
            { value: "digital", label: "Digital" }
        ];
        this.people = [];
        this.peopleAux = [];
        this.loadData();
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('register-person', (e) => {
            const newPerson = e.detail.newPerson;
            this.peopleAux = [...this.peopleAux, {
                name: newPerson.name,
                lastName: newPerson.lastName,
                occupation: newPerson.occupation,
                modalities: newPerson.modality === 'both' 
                    ? [{ value: 'cash', name: 'Efectivo' }, { value: 'digital', name: 'Digital' }]
                    : newPerson.modality === 'cash'
                        ? [{ value: 'cash', name: 'Efectivo' }]
                        : [{ value: 'digital', name: 'Digital' }]
            }];
            this.people = this.peopleAux;
        });
    }   

    loadData() {
        fetch('../data/people.json')
            .then(response => response.json())
            .then(data => {
                console.log('Datos cargados desde people.json:', data);
                this.people = data.people;
                this.peopleAux = data.people;
            })
            .catch(error => {
                console.error('Error al cargar los datos de people.json:', error);
            });
    }

    search(event) {
        this.searchTerm = event.target.value.toLowerCase();
        console.log('Término de búsqueda:', this.selectedModality);

        this.people = this.peopleAux;

        if (this.searchTerm) {
            this.people = this.peopleAux.filter(person => {
                return person.name.toLowerCase().includes(this.searchTerm) ||
                    person.lastName.toLowerCase().includes(this.searchTerm);
            });
        }

        if (this.selectedModality && this.selectedModality !== "all") {
            this.people = this.people.filter(person => 
                person.modalities.filter(modality => modality.value === this.selectedModality).length > 0
            );
        }
        
    }

    filterByModality(event) {
        this.selectedModality = event.target.value;
        this.people = this.peopleAux;

        if (this.selectedModality && this.selectedModality !== "all") {
            this.people = this.peopleAux.filter(person => 
                person.modalities.filter(modality => modality.value === this.selectedModality).length > 0
            );
        }

        if (this.searchTerm) {
            this.people = this.people.filter(person => {
                return person.name.toLowerCase().includes(this.searchTerm) ||
                    person.lastName.toLowerCase().includes(this.searchTerm);
            });
        }
    }

    render() {
        return html`
            <main>
                <section>
                    <input type="text" placeholder="Buscar..." @input=${this.search} />
                    <select @change=${this.filterByModality}>
                        ${this.modalities.map(modality => html`
                            <option value="${modality.value}">${modality.label}</option>
                        `)}q
                    </select>
                    <ul class="list">
                        ${this.people.map(person => html`
                            <li class="list-item">
                                <nh-list-item
                                    name="${person.name}"
                                    lastName="${person.lastName}"
                                    occupation="${person.occupation}"
                                    .modalities=${person.modalities}>
                                </nh-list-item>
                            </li>
                        `)}                    
                    </ul>
                </section>
            </main>
        `;
    }
}
customElements.define("principal-view", PrincipalView);