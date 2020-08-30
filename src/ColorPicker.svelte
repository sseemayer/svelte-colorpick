<script>
	import ScrollBar from './Scrollbar.svelte'
	import Matrix from './Matrix.svelte'
	import DimInput from './DimInput.svelte'
	import HexInput from './HexInput.svelte'

	export let color = '#ff9900'
	export let selectedDimension = 'hue'

	export let showMatrix = true
	export let showSliders = {
		hue: true,
		saturation: true,
		lightness: true,

		red: true,
		green: true,
		blue: true,
	}
	export let showHex = true
	export let showNumeric = true
	export let showLabels = true

	export let selectDimensions = true

	export let matrixWidth = 300
	export let matrixHeight = 200
	export let scrollbarHeight = 20

	let dimX = null
	let dimY = null

	const dims = [
		{
			group: 'hsl',
			dims: ['hue', 'saturation', 'lightness'],
		},
		{
			group: 'rgb',
			dims: ['red', 'green', 'blue'],
		},
	]

	$: {
		if (selectedDimension === 'hue') {
			dimX = 'saturation'
			dimY = 'lightness'
		} else if (selectedDimension === 'saturation') {
			dimX = 'hue'
			dimY = 'lightness'
		} else if (selectedDimension === 'lightness') {
			dimX = 'hue'
			dimY = 'saturation'
		} else if (selectedDimension === 'red') {
			dimX = 'green'
			dimY = 'blue'
		} else if (selectedDimension === 'green') {
			dimX = 'red'
			dimY = 'blue'
		} else if (selectedDimension === 'blue') {
			dimX = 'red'
			dimY = 'green'
		}
	}

	$: sliderWidth = matrixWidth - (selectDimensions ? 25 : 0) - (showLabels ? 25 : 0) - (showNumeric ? 65 : 0)
	$: textboxWidth = matrixWidth - (showLabels ? 50 : 0)
</script>

<div class='color-picker'>
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
					<label for={dim}>{dim.substr(0, 1).toUpperCase()}</label>
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


<style>
	.color-picker {
		display: inline-block;
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
