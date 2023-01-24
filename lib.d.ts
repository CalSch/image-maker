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
declare let startTime:number;

declare const WHITE  :Color;
declare const BLACK  :Color;
declare const RED    :Color;
declare const GREEN  :Color;
declare const BLUE   :Color;
declare const CYAN   :Color;
declare const MAGENTA:Color;
declare const YELLOW :Color;

declare function pix(x:number, y:number): Color;

/**
 * Returns a color from HSL values
 * @param h The hue value from 0-360
 * @param s The saturation value from 0-1
 * @param l The lightness value from 0-1
 */
declare function hsl(h:number, s:number, l:number): Color;
/**
 * Returns a shade of grey based on the lightness
 * @param v Lightess (0-255)
 */
declare function lum(v:number): Color;

declare function log(at:string,message:string);
declare function clear();

declare function lerp(a:number,b:number,t:number):number;
declare function lerpColor(a:Color,b:Color,t:number):Color;