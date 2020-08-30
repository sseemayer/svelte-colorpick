<script>
	import {default as ColorPicker, ScrollBar, Matrix, DimInput, HexInput} from 'svelte-colorpick'

	let color = '#ff9900'

	let dimSel = 'hue'
	let dimX = 'saturation'
	let dimY = 'lightness'

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
		if (dimSel === 'hue') {
			dimX = 'saturation'
			dimY = 'lightness'
		} else if (dimSel === 'saturation') {
			dimX = 'hue'
			dimY = 'lightness'
		} else if (dimSel === 'lightness') {
			dimX = 'hue'
			dimY = 'saturation'
		} else if (dimSel === 'red') {
			dimX = 'green'
			dimY = 'blue'
		} else if (dimSel === 'green') {
			dimX = 'red'
			dimY = 'blue'
		} else if (dimSel === 'blue') {
			dimX = 'red'
			dimY = 'green'
		}

	}
</script>

<Matrix
	bind:color={color}
	dimensionX={dimX}
	dimensionY={dimY}
	width="315"
	height="200"
/>

{#each dims as dimGroup}
<div class="slider-group">
	{#each dimGroup.dims as dim}
		<div class="slider">
			<input type="radio" bind:group={dimSel} value={dim} id={dim}>
			<label for={dim}>{dim.substr(0, 1).toUpperCase()}</label>
			<ScrollBar width="200" height="30" dimension={dim} bind:color={color}/>
			<DimInput bind:color={color} dimension={dim}/>
		</div>
	{/each}
</div>
{/each}

<div class="slider-group">
	<div class="text">
		<label for="hex">Hex:</label>
		<HexInput bind:color={color} id="hex"/>
	</div>
</div>


<style>
	.slider-group {
		margin: 0 0 10px 0;
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
		padding: 0;
		width: 50px;
	}

	input[type=radio] {
		display: inline-block;
		margin: 0 5px 0 0;
		width: 20px;
	}
</style>
