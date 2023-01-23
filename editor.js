let autodrawEl=document.getElementById('autodraw');
let timeEl=document.getElementById('time');
let autodrawInterval;

function updateAutodraw() {
    clearInterval(autodrawInterval);
    if (autodrawEl.checked) autodrawInterval=setInterval(()=>{
        draw()
    },timeEl.value*1000)
}

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
        value: 
`function pix(x,y) {
    return [x,y,0];
}`,
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true
    });
    
    timeEl.addEventListener('change',()=>{
        updateAutodraw()
    })
    autodrawEl.addEventListener('change',()=>{
        updateAutodraw()
    })
});