<script>
	import ScrollBar from './Scrollbar.svelte'
	import Matrix from './Matrix.svelte'
	import DimInput from './DimInput.svelte'
	import HexInput from './HexInput.svelte'

	export let color = '#ff9900'
	export let selectedDimension = 'hslH'

	export let collapse = false
	export let handleWidth = 32
	export let handleHeight = 32

	export let showMatrix = true
	export let showSliders = {
		hslH: true,
		hslS: true,
		hslL: true,

		rgbR: true,
		rgbG: true,
		rgbB: true,
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

	const dims = [
		{
			group: 'hsl',
			dims: ['hslH', 'hslS', 'hslL'],
		},
		{
			group: 'rgb',
			dims: ['rgbR', 'rgbG', 'rgbB'],
		},
	]

	$: {
		if (selectedDimension === 'hslH') {
			dimX = 'hslS'
			dimY = 'hslL'
		} else if (selectedDimension === 'hslS') {
			dimX = 'hslH'
			dimY = 'hslL'
		} else if (selectedDimension === 'hslL') {
			dimX = 'hslH'
			dimY = 'hslS'
		} else if (selectedDimension === 'rgbR') {
			dimX = 'rgbG'
			dimY = 'rgbB'
		} else if (selectedDimension === 'rgbG') {
			dimX = 'rgbR'
			dimY = 'rgbB'
		} else if (selectedDimension === 'rgbB') {
			dimX = 'rgbR'
			dimY = 'rgbG'
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
	<div class="color-picker-handle" style='width: {handleWidth}px; height: {handleHeight}px; background: {color};' on:click={() => collapsed = false}></div>
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
		{#each dims as dimGroup}
		<div class="group">
			{#each dimGroup.dims as dim}
				{#if showSliders[dim]}
				<div class="slider">
					{#if selectDimensions}
						<input type="radio" bind:group={selectedDimension} value={dim} id={dim}>
					{/if}
					{#if showLabels}
						<label for={dim}>{dim.substr(3, 1).toUpperCase()}</label>
					{/if}
					<ScrollBar width={sliderWidth} height={scrollbarHeight} dimension={dim} bind:color={color}/>

					{#if showNumeric}
					<DimInput bind:color={color} dimension={dim}/>
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
