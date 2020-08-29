<script>
	import { onMount } from 'svelte'

	import dimensions from './dimensions'

	export let color = '#00ff00'
	export let value = null
	export let dimension = 'hue'
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

	$: dim = dimensions[dimension]

	$: {
		value = Math.round(dim.getValue(color))
	}

	$: sliderPos = cWidth * (value - dim.extents[0]) / (dim.extents[1] - dim.extents[0])
	

	$: {
		if (ctx) {
			ctx.clearRect(0, 0, cWidth, cHeight)

			let xStep = cWidth / detail
			let range = dim.extents[1] - dim.extents[0]
			for(let i = 0; i < detail; i++) {
				ctx.fillStyle = dim.setValue(color, i / detail * range + dim.extents[0])
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
			let x = e.layerX - 1

			value = Math.round((x / cWidth) * (dim.extents[1] - dim.extents[0]) + dim.extents[0])

			color = dim.setValue(color, value).hex()
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

	.scrollbar {
		border: 1px solid #000;
	}
</style>
