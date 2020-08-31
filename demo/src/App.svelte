<script>
	import {default as ColorPicker, dimensions} from 'svelte-colorpick'


	let color = '#ff9900'
	let collapse = false

	let settings;

	let presets = {
		full: {
			selectedDimension: 'hsl.h',

			tabbed: true,
			selectedTab: 'hsl',

			showMatrix: true,
			showSlidersGlobal: true,
			showHex: true,
			showNumeric: true,
			showLabels: true,

			showSliders: {
				"hsl.h": true,
				"hsl.s": true,
				"hsl.l": true,

				"hcl.h": true,
				"hcl.c": true,
				"hcl.l": true,

				"lab.l": true,
				"lab.a": true,
				"lab.b": true,

				"rgb.r": true,
				"rgb.g": true,
				"rgb.b": true,
			},

			selectDimensions: true,

			matrixWidth: 300,
			matrixHeight: 200,
			scrollbarHeight: 20,
		},

		hsl: {
			selectedDimension: 'hsl.h',

			tabbed: false,
			selectedTab: 'hsl',

			showMatrix: true,
			showSlidersGlobal: true,
			showHex: true,
			showNumeric: true,
			showLabels: true,

			showSliders: {
				"hsl.h": true,
				"hsl.s": true,
				"hsl.l": true,
			},

			selectDimensions: true,

			matrixWidth: 300,
			matrixHeight: 200,
			scrollbarHeight: 20,
		},

		hcl: {
			selectedDimension: 'hcl.h',

			tabbed: false,
			selectedTab: 'hcl',

			showMatrix: true,
			showSlidersGlobal: true,
			showHex: true,
			showNumeric: true,
			showLabels: true,

			showSliders: {
				"hcl.h": true,
				"hcl.c": true,
				"hcl.l": true,
			},

			selectDimensions: true,

			matrixWidth: 300,
			matrixHeight: 200,
			scrollbarHeight: 20,
		},

		miniLab: {
			selectedDimension: 'lab.l',

			tabbed: false,
			selectedTab: 'lab',

			showMatrix: true,
			showSlidersGlobal: true,
			showHex: false,
			showNumeric: true,
			showLabels: true,

			showSliders: {
				"lab.l": true,
			},

			selectDimensions: false,

			matrixWidth: 200,
			matrixHeight: 200,
			scrollbarHeight: 20,
		},

		miniHsl: {
			selectedDimension: 'hsl.h',

			tabbed: false,
			selectedTab: 'hsl',

			showMatrix: true,
			showSlidersGlobal: true,
			showHex: false,
			showNumeric: false,
			showLabels: false,

			showSliders: {
				"hsl.h": true,
			},

			selectDimensions: false,

			matrixWidth: 150,
			matrixHeight: 150,
			scrollbarHeight: 10,
		},

		miniHcl: {
			selectedDimension: 'hcl.h',

			tabbed: false,
			selectedTab: 'hcl',

			showMatrix: true,
			showSlidersGlobal: true,
			showHex: false,
			showNumeric: false,
			showLabels: false,

			showSliders: {
				"hcl.h": true,
			},

			selectDimensions: false,

			matrixWidth: 150,
			matrixHeight: 150,
			scrollbarHeight: 10,
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

		collapse={collapse}
		tabbed={settings.tabbed}
		selectedTab={settings.selectedTab}

		selectedDimension={settings.selectedDimension}

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
	<h2>Mode</h2>
	<div>
		<input id='collapse' type='checkbox' bind:checked={collapse}/>
		<label for='collapse'>collapse</label>
	</div>
	<h2>Settings</h2>
	<div>
		<input id='tabbed' type='checkbox' bind:checked={settings.tabbed}/>
		<label for='tabbed'>tabbed</label>
	</div>
	<div>
		<input id='showMatrix' type='checkbox' bind:checked={settings.showMatrix}/>
		<label for='showMatrix'>showMatrix</label>
	</div>
	<div>
		<input id='showSliders' type='checkbox' bind:checked={settings.showSlidersGlobal}/>
		<label for='showSliders'>showSliders</label>
	</div>
	{#if settings.showSlidersGlobal}
		{#each Object.keys(dimensions) as scale}
			<div class="indent"><span class="dimension">{scale}</span>

				{#each Object.keys(dimensions[scale]) as dim}
					<div class="indent">
						<input id='showSliders-{scale}-{dim}' type='checkbox' bind:checked={settings.showSliders[`${scale}.${dim}`]}/>
						<label for='showSliders-{scale}-{dim}'>{scale}.{dim}</label>
					</div>
				{/each}
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
		line-height: 0;
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
