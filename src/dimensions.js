import chroma from 'chroma-js'

let dimensions = {}
let lastHue = null

const keysHsl = ['hslH', 'hslS', 'hslL']
for (let i = 0; i < keysHsl.length; i++) {
	const k = keysHsl[i]
	const scale = i === 0 ? 1 : 100
	dimensions[k] = {
		getValue (color) {
			return chroma(color).hsl()[i] * scale || 0
		},
		setValue (color, value) {
			let colorHsl = chroma(color).hsl()
			if (isNaN(colorHsl[0])) {
				colorHsl[0] = lastHue
			} else {
				lastHue = colorHsl[0]
			}
			colorHsl[i] = value / scale
			return chroma.hsl(...colorHsl)
		},
		extents: [0, i === 0 ? 359 : 100]
	}
}

const keysRgb = ['rgbR', 'rgbG', 'rgbB']
for (let i = 0; i < keysRgb.length; i++) {
	const k = keysRgb[i]
	dimensions[k] = {
		getValue (color) {
			return chroma(color).rgb()[i] || 0
		},
		setValue (color, value) {
			let colorRgb = chroma(color).rgb()
			colorRgb[i] = value
			return chroma.rgb(...colorRgb)
		},
		extents: [0, 255]
	}

}

export default dimensions
