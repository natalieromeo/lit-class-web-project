# Adaptation Theory Companion Portal

An interactive, responsive single-page web application designed for Digital Humanities research, text analysis, and the critical indexing of novel-to-film adaptation frameworks. 

This companion portal provides scholars, educators, and students with an organized environment to explore foundational adaptation frameworks, extract cross-referenced theoretical evidence, and compile structured textual research dynamically.

---

## 🚀 Features

- **Categorized Theoretical Frameworks**: Dynamically maps core adaptation indices across five critical methodological fields:
  - **Motivations**: Explores socio-economic, franchise, personal, political, and biological impulses driving narrative replication.
  - **Techniques**: Examines the mechanics of semantic-syntactic transformations and narrative transfers from literature to multi-sensory formats.
  - **Cultural Contexts**: Evaluates the processes of indigenization, localized relocation, and historical contextual shifts.
  - **Fidelity**: Re-examines traditional fidelity discourse through modern relational, autonomous, and structural frameworks.
  - **Intertextuality**: Traces open dialogic networks, palimpsestic audience experiences, and taxonomic boundaries between adaptation and appropriation.
- **Dynamic Live Search**: Real-time evaluation pipeline searching across theorists, conceptual keywords, primary textual evidence, and research notes simultaneously.
- **Active Research Notebook Console**: Interactive, scratch-pad workspace tracking and compiling critical citations instantly. Researchers can click "Send to Notebook" on any theory card to format, assemble, and copy a curated index record to their clipboard.
- **Academic Source Library Grid**: A repository-linked document framework containing relative anchors configured with `target="_blank"` attributes to seamlessly launch primary source PDFs from the project's asset directory into distinct browser environments.

---

## 🛠️ Architecture & Core Components

The platform is designed as a modular, client-side application built with web technologies and optimized for high-performance deployment:

* **`index.html`**: The semantic skeleton of the workspace application. It sets up an optimized layout utilizing **Tailwind CSS** configuration utilities to render dark-mode interfaces, responsive viewport layers, container grids, and persistent panels.
* **`css/styles.css`**: Manages micro-interactions, custom scrollbar tracks for the note compilation textareas, multi-line clamp boundaries, and explicit cubic-bezier transition curves for dynamic navigation states.
* **`js/portal.js`**: Orchestrates the logical application state and dynamic DOM generation. It initiates an asynchronous runtime fetch query pipeline to import structured documentation data and falls back to a fail-safe static object dictionary layer if sandboxed CORS restrictions are present.
* **`data/theories.json`**: The core data layer hosting the structured academic parameters. Each object maintains explicit key definitions tracking the `theorist`, `concept`, `page` number, exact primary `evidence` text, and critical `notes`.

---

## 📂 Repository Directory Layout

```text
├── assets/                  # Primary source PDF library files
├── css/
│   └── styles.css           # Layout utility states & scrollbar adjustments
├── data/
│   └── theories.json        # Core JSON academic theory database
├── js/
│   └── portal.js            # Dynamic DOM manipulation & event pipeline
├── index.html               # Main workspace dashboard entrypoint
└── README.md                # Project documentation repository file
