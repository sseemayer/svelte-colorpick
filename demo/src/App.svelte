<script>
	import ColorPicker from 'svelte-colorpick'

	let color = '#ff9900'

	let settings;

	let presets = {
		full: {
			showMatrix: true,
			showSlidersGlobal: true,
			showHex: true,
			showNumeric: true,
			showLabels: true,

			showSliders: {
				hue: true,
				saturation: true,
				lightness: true,

				red: true,
				green: true,
				blue: true,
			},

			selectDimensions: true,

			matrixWidth: 300,
			matrixHeight: 200,
			scrollbarHeight: 30,
		},

		hsl: {
			showMatrix: true,
			showSlidersGlobal: true,
			showHex: true,
			showNumeric: true,
			showLabels: true,

			showSliders: {
				hue: true,
				saturation: true,
				lightness: true,

				red: false,
				green: false,
				blue: false,
			},

			selectDimensions: true,

			matrixWidth: 300,
			matrixHeight: 200,
			scrollbarHeight: 30,
		},

		mini: {
			showMatrix: true,
			showSlidersGlobal: true,
			showHex: false,
			showNumeric: false,
			showLabels: false,

			showSliders: {
				hue: true,
				saturation: false,
				lightness: false,

				red: false,
				green: false,
				blue: false,
			},

			selectDimensions: false,

			matrixWidth: 150,
			matrixHeight: 150,
			scrollbarHeight: 20,
		},
	}

	function applyPreset (name) {
		settings = JSON.parse(JSON.stringify(presets[name]))
	}

	applyPreset('full')

</script>

<h1>svelte-colorpick</h1>

<div class="demo">
	<ColorPicker
		bind:color={color}
		showMatrix={settings.showMatrix}
		showSliders={settings.showSlidersGlobal && settings.showSliders}
		showHex={settings.showHex}
		showLabels={settings.showLabels}
		showNumeric={settings.showNumeric}
		selectDimensions={settings.selectDimensions}

		matrixWidth={settings.matrixWidth}
		matrixHeight={settings.matrixHeight}
		scrollbarHeight={settings.scrollbarHeight}
	/>
</div>

<div class='settings-panel'>
	<h2>Settings</h2>

	<div>
		<input id='showMatrix' type='checkbox' bind:checked={settings.showMatrix}/>
		<label for='showMatrix'>showMatrix</label>
	</div>
	<div>
		<input id='showSliders' type='checkbox' bind:checked={settings.showSlidersGlobal}/>
		<label for='showSliders'>showSliders</label>
	</div>
	{#if settings.showSlidersGlobal}
		{#each Object.keys(settings.showSliders) as dim}
			<div class="indent">
				<input id='showSliders-{dim}' type='checkbox' bind:checked={settings.showSliders[dim]}/>
				<label for='showSliders-{dim}'>{dim}</label>
			</div>
		{/each}
	{/if}
	<div>
		<input id='showHex' type='checkbox' bind:checked={settings.showHex}/>
		<label for='showHex'>showHex</label>
	</div>
	<div>
		<input id='showLabels' type='checkbox' bind:checked={settings.showLabels}/>
		<label for='showLabels'>showLabels</label>
	</div>
	<div>
		<input id='showNumeric' type='checkbox' bind:checked={settings.showNumeric}/>
		<label for='showNumeric'>showNumeric</label>
	</div>

	<div>
		<input id='selectDimensions' type='checkbox' bind:checked={settings.selectDimensions}/>
		<label for='selectDimensions'>selectDimensions</label>
	</div>
	
	<div>
		<label for='matrixWidth'>matrix</label>
		<input id='matrixWidth' type='number' min=100 max=600 bind:value={settings.matrixWidth}/>x
		<input id='matrixHeight' type='number' min=100 max=600 bind:value={settings.matrixHeight}/>
	</div>

	<div>
		<label for='scrollbarHeight'>scroll</label>
		<input id='scrollbarHeight' type='number' min=10 max=100 bind:value={settings.scrollbarHeight}/>
	</div>


	<h3>Presets</h3>
	{#each Object.keys(presets) as preset}
		<button on:click={() => applyPreset(preset)}>{preset}</button>
	{/each}

</div>


<style>
	.demo {
		background: #fff;
		display: inline-block;
		box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.4);
		border-radius: 5px;
		padding: 5px;
	}

	.settings-panel {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		width: 300px;
	}

	.indent {
		margin-left: 30px;
	}

	input[type=checkbox], label {
		display: inline-block;
	}

	#matrixWidth, #matrixHeight, #scrollbarHeight {
		width: 80px;
	}
</style>
