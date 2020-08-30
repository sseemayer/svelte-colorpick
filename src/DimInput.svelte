<script>
	import dimensions from './dimensions'

	export let color = '#00ff00'
	export let dimension = 'hue'
	export let value = null


	$: dim = dimensions[dimension]

	let roundedValue

	$: {
		value = dim.getValue(color)
		roundedValue = Math.round(value)
	}

	function onChange(e) {
		let v = +e.target.value
		color = dim.setValue(color, v)
	}
</script>

<input type="number" value={roundedValue} on:change={onChange}/>

