export function relativePosition (e) {
	let clientX = e.clientX
	let clientY = e.clientY

	let offsetX = 0
	let offsetY = 0

	let target = e.target
	while (target) {
		offsetX += target.offsetLeft
		offsetY += target.offsetTop
		target = target.offsetParent
	}

	return {
		clientX,
		clientY,
		offsetX,
		offsetY,
		relativeX: clientX - offsetX,
		relativeY: clientY - offsetY,
	}
}
