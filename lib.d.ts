/**
 * Image Maker Library
 * @author CalSch
 */

/**
 * A class that represents an RGB color
 */
declare class Color {
	r:number;
	g:number;
	b:number;

	constructor (r:number,g:number,b:number);
	/**
	 * @param c A list of RGB values like this: [r,g,b]
	 */
	constructor (c:number[]);
	constructor (c:Color);
	constructor ();
}

/** The width of the image */
declare let width:number;
/** The height of the image */
declare let height:number;

/**
 * The time when it started drawing
 * @readonly
 */
declare let startTime:number;

/** A shorthand for [255,255,255] @constant @category Colors */
declare const WHITE  :Color;
/** A shorthand for [0,0,0] @constant @category Colors */
declare const BLACK  :Color;
/** A shorthand for [255,0,0] @constant @category Colors */
declare const RED    :Color;
/** A shorthand for [0,255,0] @constant @category Colors */
declare const GREEN  :Color;
/** A shorthand for [0,0,255] @constant @category Colors */
declare const BLUE   :Color;
/** A shorthand for [0,255,255] @constant @category Colors */
declare const CYAN   :Color;
/** A shorthand for [255,0,255] @constant @category Colors */
declare const MAGENTA:Color;
/** A shorthand for [255,255,0] @constant @category Colors */
declare const YELLOW :Color;

/**
 * The function defined by the user. It is called for each pixel on the image
 * @param x The x position
 * @param y The y position
 */
declare function pix(x:number, y:number): Color;

/**
 * Returns a color from HSL values
 * @param h The hue value from 0-1
 * @param s The saturation value from 0-1
 * @param l The lightness value from 0-1
 */
declare function hsl(h:number, s:number, l:number): Color;
/**
 * Returns a shade of grey based on the lightness
 * @param v Lightess (0-255)
 */
declare function lum(v:number): Color;

/**
 * Logs a message like this:
 * `Log at ${at}: ${message}`
 * @param at A description of where the log is being called from
 * @param message The message to be logged
 */
declare function log(at:string,message:string);
/** Clears the logging area */
declare function clear();

/**
 * Linear interpolation between 2 values
 * @param a The starting value
 * @param b The ending value
 * @param t The amount to interpolate
 * @example
 * // Returns a
 * lerp(a,b,0)
 * 
 * // Returns b
 * lerp(a,b,1)
 * 
 * // Returns 5
 * lerp(0,10,0.5)
 * 
 * // Returns 2.5
 * lerp(0,10,0.25)
 * 
 * // Returns 10
 * lerp(5,15,0.5)
 */
declare function lerp(a:number,b:number,t:number):number;
/**
 * Lerps between 2 colors
 * @param a The starting color
 * @param b The ending color
 * @param t The amount to interpolate
 * @see lerp
 */
declare function lerpColor(a:Color,b:Color,t:number):Color;
