<script>
	import chroma from 'chroma-js'
	export let color = '#00ff00'

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
	value={value}
	on:change={onChange}
/>

<style>
	input {
		font-family: monospace;
		font-size: 120%;
		width: 267px;
		margin: 0;
	}
</style>
