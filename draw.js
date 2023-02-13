let logEl=document.getElementById('log')
/** @type {HTMLCanvasElement} */
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
    let imageData=ctx.createImageData(c.width,c.height);
    let i=0;
    for (let y=0;y<height;y++) {
        let err=false;
        for (let x=0;x<width;x++) {
            i+=4;
            let c;
            try {
                c=new Color(pix(x,y));
            } catch(e) {
                error(`pix(${x},${y})`,e)
                err=true;
                break;
            }
            // ctx.fillStyle=`rgba(${c.r},${c.g},${c.b},${c[3]===undefined ? 1 : c[3]})`
            // ctx.fillRect(x,y,1,1)
            imageData.data[i+0]=c.r;
            imageData.data[i+1]=c.g;
            imageData.data[i+2]=c.b;
            imageData.data[i+3]=255;
        }
        if (err) break;
    }
    ctx.putImageData(imageData,0,0)

    log("end",`Took ${Date.now()-startTime} miliseconds`)
    
    document.getElementById("icon").href=c.toDataURL();
}