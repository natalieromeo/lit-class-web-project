// Standalone fallback object array layer utilized if local CORS architectural environment policies interrupt JSON fetch routine
const fallbackDatabase = {
    "Motivations": [
        {
            "theorist": "Linda Hutcheon",
            "concept": "Socio-Economic & Franchise Motives",
            "page": "86-90",
            "evidence": "Socioeconomic motives are obvious: adapting a bestseller or a hit play provides a ready-made audience and reduces the massive financial risk inherent in modern cultural industries.",
            "notes": "The capital-driven impulses that mandate adaptation. Utilizing pre-sold audiences in major media serves as a risk-mitigation strategy, converting established intellectual properties into predictable revenue streams."
        },
        {
            "theorist": "Linda Hutcheon & Julie Sanders",
            "concept": "Political & Subversive Decolonization",
            "page": "92-95",
            "evidence": "Political motives are equally strong: adapters of canonical works often seek to subvert the authority of the original, de-mythologizing it or relocating its values to expose historic prejudices.",
            "notes": "Adapting as an act of political reclamation. Creators deliberately appropriate canonical patriarchal, Eurocentric, or colonial source texts to 'write back' to power, subverting the ideological structures of the original."
        },
        {
            "theorist": "Gary R. Bortolotti & Linda Hutcheon",
            "concept": "Narrative Survival & Biological Proliferation",
            "page": "2007 Study",
            "evidence": "The function of adapting from novel to film may be to reach people who don't read novels anymore; the story must now be told in a more culturally acceptable and accessible way.",
            "notes": "Borrowing from evolutionary biology, stories behave like species; their transposition to new media is an adaptive mechanism to replicate, colonize, and survive in new cultural habitats."
        }
    ],
    "Techniques": [
        {
            "theorist": "Linda Hutcheon",
            "concept": "Semantic-Syntactic Transcoding",
            "page": "16, 33",
            "evidence": "Adaptation is a formal transcoding... involving a shift of medium, genre, or context. It requires translating semantic symbols into the syntactic structures unique to the new medium.",
            "notes": "The core mechanical methodology of adaptation. Adapters must decode both the semantic tier and the syntactic tier to translate them into a new system."
        },
        {
            "theorist": "Erika Huszár",
            "concept": "Proppean Functional Narrative Transfer",
            "page": "2026 Criticism",
            "evidence": "What is actually transferred from novel to film is something rather similar to the narrative functions described by early 20th century formalist Vladimir Propp.",
            "notes": "A critique of simple textual transfer. Huszár argues that novel-to-film adaptation does not rely on direct structural transfer, but rather on deep, formalist narrative functions akin to Vladimir Propp's morphology of folktales."
        }
    ],
    "Cultural Contexts": [
        {
            "theorist": "Linda Hutcheon",
            "concept": "Indigenization & Localized Relocation",
            "page": "148-153",
            "evidence": "Indigenization is a process of translating a narrative so thoroughly into a new cultural frame that the original context is overwritten by local associations, politics, and values.",
            "notes": "The complex process of translating a narrative contextually to fit the geographical, cultural, religious, or political codes of a new territory."
        }
    ],
    "Fidelity": [
        {
            "theorist": "Kyle William Bishop",
            "concept": "The Infidelity Spectrum (Faithful to Adulterous)",
            "page": "2026 Framework",
            "evidence": "Instead of simply approaching adaptations in terms of their intertextuality, I propose approaching adaptations in terms of a spectrum of fidelity, one that extends from 'faithful' to 'promiscuous' to 'adulterous'.",
            "notes": "Instead of binary fidelity, Bishop proposes a structured vocabulary of textual infidelity ranging from 'faithful' to 'promiscuous' to 'adulterous'."
        }
    ],
    "Intertextuality": [
        {
            "theorist": "Julie Sanders",
            "concept": "Appropriation vs. Adaptation Boundaries",
            "page": "Adaptation and Appropriation",
            "evidence": "Adaptation signals a relationship with an informing source; appropriation affects a more decisive journey away from the text into an independent cultural space.",
            "notes": "Adaptation preserves the explicit identity of its source, whereas appropriation takes the text, strips it of original markers, and relocates it into an independent work."
        }
    ]
};

// Internal static mapping structure routing resource link workflows to repository assets paths
const pdfLibraryDatabase = [
    {
        "title": "A Theory of Adaptation",
        "author": "Linda Hutcheon",
        "fileName": "linda_hutcheon_a_theory_of_adaptationbookfi-org1.pdf",
        "description": "Foundational textbook mapping parameters across multi-sensory and interactive performance modes."
    },
    {
        "title": "Frankenstein's Adaptive Chain",
        "author": "Kyle William Bishop",
        "fileName": "frankenstein infidelity.pdf",
        "description": "Critical framework exploring structural disloyalty via the fidelity, promiscuity, and adultery lexicon."
    },
    {
        "title": "On the Origin of Adaptations",
        "author": "Gary R. Bortolotti & Linda Hutcheon",
        "fileName": "Bortolotti-OriginAdaptationsRethinking-2007.pdf",
        "description": "Interdisciplinary scholarship modeling narrative survival dynamics against evolutionary biological matrices."
    },
    {
        "title": "Adaptation and Appropriation",
        "author": "Julie Sanders",
        "fileName": "Adaptation And Appropriation PDF.pdf",
        "description": "Taxonomical literature defining critical boundaries between visible adaptations and hidden appropriations."
    }
];

let currentDatabase = fallbackDatabase;
let activeTab = "Motivations";

// Lifecycle hooks
window.addEventListener('DOMContentLoaded', () => {
    fetchDatabase();
});

// JSON asynchronous lookup fetch query pipeline 
function fetchDatabase() {
    fetch('data/theories.json')
        .then(response => {
            if (!response.ok) throw new Error('Network file access error or sandbox restriction.');
            return response.json();
        })
        .then(data => {
            currentDatabase = data;
            initPortal();
        })
        .catch(() => {
            console.log("Initialized runtime fail-safe data framework profile layer maps.");
            initPortal();
        });
}

function initPortal() {
    renderTabs();
    renderActiveCategory();
    renderPdfLibrary();
}

function renderTabs() {
    const container = document.getElementById('tabsContainer');
    if (!container) return;
    container.innerHTML = '';
    
    Object.keys(currentDatabase).forEach(category => {
        const button = document.createElement('button');
        button.className = `tab-transition text-sm px-5 py-2.5 rounded-lg font-medium tracking-wide transition ${
            activeTab === category 
            ? 'bg-teal-500/15 text-teal-400 border border-teal-500/30' 
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
        }`;
        button.innerText = category;
        button.onclick = () => switchTab(category);
        container.appendChild(button);
    });
}

function switchTab(category) {
    activeTab = category;
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
    renderTabs();
    renderActiveCategory();
}

function renderActiveCategory() {
    const heading = document.getElementById('activeTabHeading');
    const badge = document.getElementById('cardCount');
    if (heading) heading.innerText = `${activeTab}`;
    
    const entries = currentDatabase[activeTab] || [];
    if (badge) badge.innerText = `${entries.length} entries found`;
    
    renderCards(entries);
}

function renderCards(entries) {
    const container = document.getElementById('theoryCardsContainer');
    if (!container) return;
    container.innerHTML = '';

    if (entries.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12 border border-dashed border-slate-800 rounded-xl bg-slate-950/20">
                <p class="text-slate-500 text-sm">No matching elements localized within active view layer.</p>
            </div>`;
        return;
    }

    entries.forEach(item => {
        const card = document.createElement('div');
        card.className = "bg-slate-950/40 border border-slate-800/80 rounded-xl p-5 hover:border-slate-700 transition space-y-4 shadow-sm";
        card.innerHTML = `
            <div class="flex justify-between items-start gap-4">
                <div>
                    <h4 class="text-base font-semibold text-slate-200">${item.concept}</h4>
                    <p class="text-xs text-teal-400 font-medium mt-0.5">${item.theorist} <span class="text-slate-500 mx-1.5">•</span> p. ${item.page}</p>
                </div>
                <button onclick="sendToNotebook('${item.theorist}', '${item.concept}', '${item.page}', \`${item.evidence.replace(/'/g, "\\'")}\`)" 
                        class="text-xxs uppercase tracking-wider text-slate-400 border border-slate-800 hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-400 px-2.5 py-1 rounded transition shrink-0">
                    Send to Notebook
                </button>
            </div>
            <blockquote class="text-sm italic text-slate-300 border-l-2 border-slate-700 pl-3 leading-relaxed">
                "${item.evidence}"
            </blockquote>
            <p class="text-xs text-slate-400 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/50">${item.notes}</p>
        `;
        container.appendChild(card);
    });
}

function renderPdfLibrary() {
    const container = document.getElementById('pdfLibraryContainer');
    if (!container) return;
    container.innerHTML = '';

    pdfLibraryDatabase.forEach(pdf => {
        const element = document.createElement('div');
        element.className = "bg-slate-950/20 border border-slate-800/60 rounded-xl p-4 flex flex-col justify-between hover:bg-slate-950/40 transition group";
        element.innerHTML = `
            <div class="space-y-2">
                <div class="p-2 bg-slate-900 border border-slate-800 rounded-lg w-fit group-hover:border-cyan-500/20 transition">
                    <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                </div>
                <div>
                    <h4 class="text-sm font-semibold text-slate-200 group-hover:text-cyan-400 transition truncate">${pdf.title}</h4>
                    <p class="text-xxs font-medium text-slate-500">${pdf.author}</p>
                </div>
                <p class="text-xxs text-slate-400 line-clamp-2 pt-1 leading-normal">${pdf.description}</p>
            </div>
            <div class="mt-4">
                <a href="assets/${pdf.fileName}" target="_blank" 
                   class="w-full text-center block text-xxs uppercase tracking-wider font-semibold bg-slate-900 border border-slate-800 hover:border-teal-500/40 hover:bg-teal-500/10 hover:text-teal-400 py-2 rounded transition">
                    Open Document
                </a>
            </div>
        `;
        container.appendChild(element);
    });
}

function handleSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    if (!query) {
        renderActiveCategory();
        return;
    }

    let filteredResults = [];
    Object.values(currentDatabase).flat().forEach(entry => {
        if (entry.concept.toLowerCase().includes(query) || 
            entry.theorist.toLowerCase().includes(query) || 
            entry.evidence.toLowerCase().includes(query) || 
            entry.notes.toLowerCase().includes(query)) {
            filteredResults.push(entry);
        }
    });

    document.getElementById('activeTabHeading').innerText = `Search Results: "${query}"`;
    document.getElementById('cardCount').innerText = `${filteredResults.length} parameters found`;
    renderCards(filteredResults);
}

function sendToNotebook(author, concept, page, evidence) {
    const pad = document.getElementById('notebookTextArea');
    if (!pad) return;
    const formatStr = `[${author} - ${concept} (p. ${page})]\n"${evidence}"\n\n`;
    pad.value += formatStr;
}

function clearNotebook() {
    const pad = document.getElementById('notebookTextArea');
    if (pad) pad.value = '';
}

function copyNotebookText() {
    const pad = document.getElementById('notebookTextArea');
    if (!pad || !pad.value) return;
    navigator.clipboard.writeText(pad.value);
    
    const origPlaceholder = pad.placeholder;
    pad.placeholder = "Copied to clipboard successfully!";
    setTimeout(() => { pad.placeholder = origPlaceholder; }, 2000);
}