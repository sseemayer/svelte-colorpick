<script>
	import { onMount } from 'svelte'

	let canvas
	let ctx
	let cWidth
	let cHeight

	let currentTab = 'hsl'

	let value = '#ff0000'
	let hue = 0
	let saturation = 1.0
	let luminance = 0.5

	onMount(() => {
		ctx = canvas.getContext('2d')
	})

	$: {
		if (ctx) {
			ctx.clearRect(0, 0, cWidth, cHeight)
			ctx.strokeStyle = '#ff0000'
			ctx.beginPath()
			ctx.moveTo(0, 0)
			ctx.lineTo(cWidth, cHeight)
			ctx.stroke()
		}
	}
</script>

<div class='color-picker'>

	<div bind:clientWidth={cWidth} bind:clientHeight={cHeight} class='canvas'><canvas bind:this={canvas}/></div>

	<ul class='tabbar'>

	</ul>

	{#if currentTab === 'hsl'}
	<div class='tab'>

	</div>
	{/if}

</div>

<style>
	.canvas, canvas {
		display: inline-block;
		padding: 0;
		margin:0;
	}
</style>
