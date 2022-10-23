require.config({ paths: { vs: 'monaco/min/vs' } });
require(['vs/editor/editor.main'], function () {
    window.editor = monaco.editor.create(document.getElementById('code'), {
        value: 
`function pix(x,y) {
    return [x,y,0];
}`,
        language: 'javascript',
        theme: 'vs-dark',
    });
    setInterval(function(){
        if (document.getElementById('autodraw').checked) {
            draw();
        }
    },1000/2)
});