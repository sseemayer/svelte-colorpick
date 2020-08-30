<script>
	import { onMount } from 'svelte'

	import dimensions from './dimensions'

	export let color = '#00ff00'
	export let dimensionX = 'lightness'
	export let dimensionY = 'saturation'
	export let detailX = 100
	export let detailY = 100

	export let width = null
	export let height = null

	let canvas
	let ctx
	let cWidth
	let cHeight

	onMount(() => {
		ctx = canvas.getContext('2d')
	})

	$: dimX = dimensions[dimensionX]
	$: dimY = dimensions[dimensionY]

	$: valueX = Math.round(dimX.getValue(color))
	$: valueY = Math.round(dimY.getValue(color))

	$: sliderPosX = cWidth * (valueX - dimX.extents[0]) / (dimX.extents[1] - dimX.extents[0])
	$: sliderPosY = cHeight - cHeight * (valueY - dimY.extents[0]) / (dimY.extents[1] - dimY.extents[0])

	$: {
		if (ctx) {
			ctx.clearRect(0, 0, cWidth, cHeight)
			ctx.imageSmoothingEnabled = false

			let dX = Math.min(detailX, cWidth)
			let dY = Math.min(detailY, cHeight)
			let xStep = cWidth / dX
			let yStep = cHeight / dY
			let rangeX = dimX.extents[1] - dimX.extents[0]
			let rangeY = dimY.extents[1] - dimY.extents[0]
			for (let y = 0; y < dY; y++) {
				const colY = dimY.setValue(color, y / detailY * rangeY + dimY.extents[0])
				for(let x = 0; x < dX; x++) {
					ctx.fillStyle = dimX.setValue(colY, x / detailX * rangeX + dimX.extents[0])
					ctx.fillRect(x * xStep, cHeight - y * yStep - 2, xStep, yStep)
				}
			}

			ctx.fillStyle = '#ffffff'
			ctx.fillRect(sliderPosX - 2, sliderPosY - 2, 5, 5)

			ctx.fillStyle = '#000000'
			ctx.fillRect(sliderPosX - 1, sliderPosY - 1, 3, 3)
		}
	}

	function onMouse(e) {
		if (e.buttons === 1) {
			let x = e.layerX - 1
			let y = cHeight - e.layerY + 1

			let vX = Math.round((x / cWidth) * (dimX.extents[1] - dimX.extents[0]) + dimX.extents[0])
			let vY = Math.round((y / cHeight) * (dimY.extents[1] - dimY.extents[0]) + dimY.extents[0])

			const colX = dimX.setValue(color, vX)
			color = dimY.setValue(colX, vY).hex()
		}
	}
</script>

<div class='matrix' bind:clientWidth={cWidth} bind:clientHeight={cHeight}>
	<canvas bind:this={canvas} width={width} height={height} on:mousedown={onMouse} on:mousemove={onMouse}>
</div>

<style>
	.matrix, canvas {
		display: inline-block;
		padding: 0;
		margin: 0;
		line-height: 0;
	}

	.matrix {
		border: 1px solid #000;
	}
</style>
