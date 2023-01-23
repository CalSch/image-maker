let logEl=document.getElementById('log')
let c=document.getElementById('img')
let ctx=c.getContext('2d');

function error(where,e) {
    logEl.innerHTML+=`<span style="color:red">Error at ${where}: ${e}</span>\n`
}
function log(where,e) {
    logEl.innerHTML+=`<span style="color:blue">Log at ${where}: ${e}</span>\n`
}
function clear() {
    logEl.innerHTML=""
}

async function draw() {
    clear()
    let width=100;
    let height=100;
    let startTime=Date.now()

    // eval(await fetch('img-'))
    try {
        eval(editor.getValue());
    } catch(e) {
        error("definition",e)
    }
    c.width=width;
    c.height=height;
    for (let y=0;y<height;y++) {
        let err=false;
        for (let x=0;x<width;x++) {
            let c;
            try {
                c=new Color(pix(x,y));
            } catch(e) {
                error(`pix(${x},${y})`,e)
                err=true;
                break;
            }
            ctx.fillStyle=`rgba(${c.r},${c.g},${c.b},${c[3]===undefined ? 1 : c[3]})`
            ctx.fillRect(x,y,1,1)
        }
        if (err) break;
    }

    log("end",`Took ${Date.now()-startTime} miliseconds`)
}