<script>
	import Color from './color'
	import { onMount } from 'svelte'

	import { getDimension } from './dimensions'

	export let color = Color.hex('#00fff00')
	export let dimension = 'hsl.h'
	export let detail = 100

	export let width = null
	export let height = null

	let canvas
	let ctx
	let cWidth
	let cHeight

	onMount(() => {
		ctx = canvas.getContext('2d')
	})

	$: dim = getDimension(dimension)

	$: value = color.get(dim.scale, dim.dim) * dim.data.scale
	$: sliderPos = cWidth * (value - dim.data.extent[0]) / (dim.data.extent[1] - dim.data.extent[0])

	$: {
		if (ctx) {
			ctx.imageSmoothingEnabled = false
			ctx.clearRect(0, 0, cWidth, cHeight)

			let d = Math.min(detail, cWidth)
			let xStep = cWidth / d
			let range = dim.data.extent[1] - dim.data.extent[0]

			const colBase = color.to(dim.scale)

			for(let i = 0; i < d; i++) {
				const v = (i / d * range + dim.data.extent[0]) / dim.data.scale
				const col = colBase.alter(dim.scale, dim.dim, v)
				ctx.fillStyle = col.toHex()
				ctx.fillRect(i * xStep, 0, xStep, cHeight)
			}

			ctx.fillStyle = '#ffffff'
			ctx.fillRect(sliderPos - 1, 0, 3, cHeight)

			ctx.fillStyle = '#000000'
			ctx.fillRect(sliderPos, 0, 1, cHeight)
		}
	}

	function onMouse(e) {
		if (e.buttons === 1) {
			let x = e.layerX

			let v = (x / cWidth) * (dim.data.extent[1] - dim.data.extent[0]) + dim.data.extent[0]
			color = color.alter(dim.scale, dim.dim, v / dim.data.scale)
		}
	}
</script>

<div class='scrollbar' bind:clientWidth={cWidth} bind:clientHeight={cHeight}>
	<canvas bind:this={canvas} width={width} height={height} on:mousedown={onMouse} on:mousemove={onMouse}>
</div>

<style>
	.scrollbar, canvas {
		display: inline-block;
		padding: 0;
		margin: 0;
		line-height: 0;
	}

	canvas {
		border: 1px solid #000;
		border-radius: 2px;
		cursor: col-resize;
	}
</style>
