<script>
	import chroma from 'chroma-js'
	export let color = '#00ff00'
	export let id = null
	export let width = null

	$: value = chroma(color).hex()

	function onChange(e) {
		let v = e.target.value
		if (chroma.valid(v)) {
			color = chroma(v).hex()
		} else {
			e.target.value = value
		}
	}
</script>

<input
	id={id}
	value={value}
	on:change={onChange}
	style='width: {width}px;'
/>

<style>
	input {
		font-family: monospace;
		font-size: 120%;
		margin: 0;
		padding: 5px;
	}
</style>
