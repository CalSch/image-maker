let defaultCode=`function pix(x,y) {
    return [x,y,0];
}`

let autodrawEl=document.getElementById('autodraw');
let timeEl=document.getElementById('time');
let autodrawInterval;

function updateAutodraw() {
    clearInterval(autodrawInterval);
    if (autodrawEl.checked) autodrawInterval=setInterval(()=>{
        draw()
    },timeEl.value*1000)
}
let autosaveTimeout=0;

require.config({ paths: { vs: 'monaco/min/vs' } });
require(['vs/editor/editor.main'], async function () {
    // compiler options
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES5,
        // lib:[],
        allowNonTsExtensions: true
    });
    // Change auto-complete
    let libSource = await (await fetch('lib.d.ts')).text()
    let libUri = 'ts:lib.d.ts';
    monaco.languages.typescript.javascriptDefaults.addExtraLib(libSource, libUri);
    // When resolving definitions and references, the editor will try to use created models.
    // Creating a model for the library allows "peek definition/references" commands to work with the library.
    monaco.editor.createModel(libSource, 'typescript', monaco.Uri.parse(libUri));
    
    window.editor = monaco.editor.create(document.getElementById('code'), {
        value: "loading",
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true
    });

    document.getElementById("code").addEventListener("keydown",(ev)=>{
        clearTimeout(autosaveTimeout);
        autosaveTimeout=setTimeout(()=>{
            console.log("saving...");
            save();
        },1000);
    },true)

    let f=()=>{
        if (emmetOn) {
            load();
        } else {
            setTimeout(f,100)
        }
    };
    f()
    
    timeEl.addEventListener('change',()=>{
        updateAutodraw()
    })
    autodrawEl.addEventListener('change',()=>{
        updateAutodraw()
    })
});

// function save(fileName) {
//     localStorage.setItem(`file-${fileName}`,editor.getValue());
// }

// function load(fileName) {
//     let files=[];
//     for (let i=0;i<localStorage.length;i++) {
//         if (localStorage.key(i).startsWith("file-"))
//             files.push(localStorage.key(i));
//     }
//     fileName=`file-${fileName}`;
//     if (files.indexOf(fileName)!==-1) {
//         editor.setValue(localStorage.getItem(fileName));
//     }
// }

/**
 * @typedef {{
 *  name: string,
 *  code: string,
 * }} Tab
 */
/**
 * @type {Tab[]}
 */
let tabs=[];
let currentTab=0;

function addTab(name,code) {
    tabs.push({
        name,code
    })
}

function renderTabs() {
    let tabsEl=document.getElementById("tabs");
    while (tabsEl.childElementCount!==0) {
        tabsEl.removeChild(tabsEl.children[0])
    }
    tabsEl.innerHTML=""

    let i=0
    for (let tab of tabs) {
        let el=Emmet(`div.tab${currentTab===i?".active":""}(onclick="tabClick('${tab.name}')") > p{${tab.name}} + div.close(onclick="tabClose('${tab.name}')"){x}`)
        tabsEl.appendChild(el);
        i++;
    }
}

function newTab() {
    let name=prompt(`Tab name:`);
    if (name===null) return;

    addTab(name,defaultCode);
    renderTabs();
    tabClick(name);
    save();
}

function tabClose(name) {
    let c=confirm(`Are you sure you want to delete ${name}?`)
    if (!c) return;

    let i=0;
    for (let t of tabs) {
        if (t.name===name) {
            tabs.splice(i,1)
            break;
        }
        i++
    }

    if (tabs.length===0) {

    }

    renderTabs()
    tabClick(tabs[Math.min(currentTab,tabs.length-1)].name)
    save();
}

function tabClick(name) {
    let i=0;
    for (let t of tabs) {
        if (t.name==name) {
            editor.setValue(t.code);
            currentTab=i;
            break;
        }
        i++;
    }

    renderTabs()
}

function save() {
    if (tabs[currentTab])
        tabs[currentTab].code=editor.getValue();
    localStorage.setItem("image-maker-tabs",JSON.stringify(tabs))
}

let emmetOn=false;

function emmetLoad() {
    emmetOn=true;
}

function load() {
    tabs=JSON.parse(localStorage.getItem("image-maker-tabs"))||[];

    for (let i=0;i<localStorage.length;i++) {
        let name=localStorage.key(i)
        if (name.startsWith("file-")) {
            tabs.push({name:name.replace("file-",""),code:localStorage.getItem(name)});
            localStorage.removeItem(name);
        }
    }    

    tabClick(tabs[0].name)
    renderTabs();
}