<script>
	import Color from './color'
	import { dimensions } from './dimensions.js'

	import ScrollBar from './Scrollbar.svelte'
	import Matrix from './Matrix.svelte'
	import DimInput from './DimInput.svelte'
	import HexInput from './HexInput.svelte'

	export let color = Color.hex('#ff9900')

	if (typeof color === 'string') {
		color = Color.hex(color)
	}

	export let selectedDimension = 'hsl.h'

	export let collapse = false
	export let handleWidth = 32
	export let handleHeight = 32

	export let showMatrix = true
	export let showSliders = {
		"hsl.h": true,
		"hsl.s": true,
		"hsl.l": true,

		"hcl.h": true,
		"hcl.c": true,
		"hcl.l": true,

		"rgb.r": true,
		"rgb.g": true,
		"rgb.b": true,
	}
	export let showHex = true
	export let showNumeric = true
	export let showLabels = true

	export let selectDimensions = true

	export let matrixWidth = 300
	export let matrixHeight = 200
	export let scrollbarHeight = 20

	let collapsed = true

	let dimX = null
	let dimY = null

	$: {
		if (selectedDimension === 'hsl.h') {
			dimX = 'hsl.s'
			dimY = 'hsl.l'
		} else if (selectedDimension === 'hsl.s') {
			dimX = 'hsl.h'
			dimY = 'hsl.l'
		} else if (selectedDimension === 'hsl.l') {
			dimX = 'hsl.h'
			dimY = 'hsl.s'
		} else if (selectedDimension === 'hcl.h') {
			dimX = 'hcl.c'
			dimY = 'hcl.l'
		} else if (selectedDimension === 'hcl.c') {
			dimX = 'hcl.h'
			dimY = 'hcl.l'
		} else if (selectedDimension === 'hcl.l') {
			dimX = 'hcl.h'
			dimY = 'hcl.c'
		} else if (selectedDimension === 'rgb.r') {
			dimX = 'rgb.g'
			dimY = 'rgb.b'
		} else if (selectedDimension === 'rgb.g') {
			dimX = 'rgb.r'
			dimY = 'rgb.b'
		} else if (selectedDimension === 'rgb.b') {
			dimX = 'rgb.r'
			dimY = 'rgb.g'
		}
	}

	$: sliderWidth = matrixWidth - (selectDimensions ? 25 : 0) - (showLabels ? 25 : 0) - (showNumeric ? 65 : 0)
	$: textboxWidth = matrixWidth - (showLabels ? 50 : 0)
</script>

<div class='color-picker {collapse ? "collapse" : ""}'>


	{#if collapse && !collapsed}
		<div class='color-picker-background' on:click={() => collapsed = true}/>
	{/if}

	{#if collapse}
	<div class="color-picker-handle" style='width: {handleWidth}px; height: {handleHeight}px; background: {color.toHex()};' on:click={() => collapsed = false}></div>
	{/if}

	<div class='color-picker-controls {collapse && collapsed ? "collapsed" : ""}'>
		{#if showMatrix}
		<Matrix
			bind:color={color}
			dimensionX={dimX}
			dimensionY={dimY}
			width={matrixWidth}
			height={matrixHeight}
		/>
		{/if}

		{#if showSliders}
		{#each Object.keys(dimensions) as scale}
		<div class="group">
			{#each Object.keys(dimensions[scale]) as dim}
				{#if showSliders[`${scale}.${dim}`]}
				<div class="slider">
					{#if selectDimensions}
						<input type="radio" bind:group={selectedDimension} value="{scale}.{dim}" id="{scale}-{dim}">
					{/if}
					{#if showLabels}
						<label for="{scale}-{dim}">{dim.toUpperCase()}</label>
					{/if}
					<ScrollBar width={sliderWidth} height={scrollbarHeight} dimension="{scale}.{dim}" bind:color={color}/>

					{#if showNumeric}
						<DimInput bind:color={color} dimension="{scale}.{dim}"/>
					{/if}
				</div>
				{/if}
			{/each}
		</div>
		{/each}
		{/if}

		{#if showHex}
		<div class="group">
			<div class="text">
				{#if showLabels}
				<label for="hex">Hex</label>
				{/if}
				<HexInput bind:color={color} width={textboxWidth} id="hex"/>
			</div>
		</div>
		{/if}
	</div>
</div>


<style>
	.color-picker {
		display: inline-block;
		position: relative;
	}

	.color-picker-handle {
		border: 1px solid #666;
		border-radius: 5px;
		cursor: pointer;
	}

	.color-picker-background {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.2);
	}

	.color-picker.collapse .color-picker-controls {
		position: absolute;
		top: -5px;
		left: -5px;

		background: #fff;
		border: 1px solid #666;
		border-radius: 5px;
		box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.4);
		padding: 5px;
	}

	.color-picker.collapse .color-picker-controls.collapsed {
		display: none;
	}

	.group {
		margin: 5px 0 0 0;
	}

	.slider, .text {
		display: flex;
		align-items: center;
	}

	label {
		display: inline;
		vertical-align: middle;
		margin: 0;
	}

	.slider label {
		padding: 0 5px 0 0;
		width: 20px;
	}

	.text label {
		padding: 0 5px 0 0;
		width: 45px;
		text-align: right;
	}

	input[type=radio] {
		display: inline-block;
		margin: 0 5px 0 0;
		width: 20px;
	}
</style>
