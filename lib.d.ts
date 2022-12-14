declare class Color {
	r:number;
	g:number;
	b:number;

	constructor (r:number,g:number,b:number);
	constructor (c:number[]);
	constructor (c:Color);
	constructor ();
}

declare let width:number;
declare let height:number;

declare function pix(x:number, y:number): Color;
declare function hsl(h:number, s:number, l:number): Color;
declare function lum(v:number): Color;

declare function log(at:string,message:string);
declare function clear();