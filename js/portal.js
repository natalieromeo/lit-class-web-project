// Standalone fallback object array layer utilized if local CORS architectural environment policies interrupt JSON fetch routine
const fallbackDatabase = {
    "Motivations": [
        { "theorist": "Linda Hutcheon", "concept": "The Economic and Legal Impulses", "page": "86-87", "evidence": "Adaptation is a commercial necessity in Hollywood; a proven property reduces financial risk and provides a pre-sold audience.", "notes": "Explores how financial stability drives the entertainment industry to rely heavily on adaptations." },
        { "theorist": "Linda Hutcheon", "concept": "Cultural and Personal Desires", "page": "92", "evidence": "The desire to adapt can also be a personal one: a response to a work that has intensely engaged the adapter's imagination.", "notes": "Highlights the artistic, psychological, and interpretive motivations behind reworking a canonical text." }
    ],
    "Techniques": [
        { "theorist": "Robert Stam", "concept": "Translational Mutation", "page": "Online Corpus", "evidence": "The text becomes a hotbed of semiotic transformation, shifting from verbal signs to visual and acoustic markers.", "notes": "Focuses on the precise technical shifts required when translating literature to a multi-sensory cinematic canvas." },
        { "theorist": "Linda Hutcheon", "concept": "Showing vs. Telling", "page": "22", "evidence": "Moving from the telling mode (literature) to the showing mode (film, theater) involves a radical shift in artistic execution.", "notes": "A core technical distinction detailing how interior monologues are exteriorized into visual performance." }
    ],
    "Cultural Contexts": [
        { "theorist": "Siobhan O'Flynn", "concept": "Transmedia Adaptation", "page": "Online Corpus", "evidence": "Modern digital environments require works to mutate organically across platforms, shaped by participatory audience metrics.", "notes": "Examines how twenty-first-century digital platforms change how cultural narratives are consumed and adapted." },
        { "theorist": "Linda Hutcheon", "concept": "Indigenization", "page": "150", "evidence": "When a story travels to a new culture, it is indigenized—freighted with local political, social, and aesthetic values.", "notes": "Essential for studying how global texts are localized into foreign historical frameworks." }
    ],
    "Fidelity": [
        { "theorist": "Robert Stam", "concept": "Beyond Fidelity Discourse", "page": "Online Corpus", "evidence": "Fidelity criticism is profoundly moralistic, treating the literary text as a sacred original and the film as a subversion.", "notes": "Argues against evaluating adaptations based solely on how 'faithful' they are to the source material." },
        { "theorist": "Linda Hutcheon", "concept": "Adaptation as Autonomous Work", "page": "6", "evidence": "An adaptation is a derivation, but it is also an independent, distinct, and self-contained creative entity.", "notes": "Encourages analyzing adaptations on their own artistic merits rather than treating them as lesser copies." }
    ],
    "Intertextuality": [
        { "theorist": "Robert Stam", "concept": "The Intertextual Network", "page": "Online Corpus", "evidence": "Films do not just adapt single books; they enter an endless intertextual web of previous films, cultural tropes, and historical discourses.", "notes": "Explains that adaptations are built from a mosaic of cultural references rather than a isolated linear source." },
        { "theorist": "Linda Hutcheon", "concept": "The Palimpsestic Experience", "page": "21", "evidence": "We experience adaptations as palimpsests through our memory of other works, viewing the new text through the shadow of the old.", "notes": "Focuses on the audience's psychological experience of reading or watching an adaptation while constantly recalling the original." }
    ]
};

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
    if (heading) heading.innerText = `${activeTab} Frameworks`;
    
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
    alert("Notebook data copied to clipboard successfully!");
}
