<script>
	import dimensions from './dimensions'

	export let color = '#00ff00'
	export let dimension = 'hue'

	$: dim = dimensions[dimension]
	$: value = dim.getValue(color)
	$: roundedValue = Math.round(value)

	function onChange(e) {
		let v = +e.target.value
		color = dim.setValue(color, v).hex()
	}
</script>

<input
	type="number"
	value={roundedValue}
	min={dim.extents[0]}
	max={dim.extents[1]}
	on:change={onChange}
/>

<style>
	input[type=number] {
		display: inline-block;
		margin: 0 0 0 5px;
		padding: 5px 0 5px 5px;
		width: 60px;
		height: 30px;
	}
</style>
