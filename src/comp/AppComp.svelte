<script lang="ts">
	import ContainerComp from "./ContainerComp.svelte"

	interface Props {}
	let {}: Props = $props()

	let container = $state({ view: { type: "teachers" } })
	try {
		let containerInit = localStorage.getItem("tteViewConfig")
		if (containerInit) container = JSON.parse(containerInit)
	} catch (e) {}
	$effect(() => {
		try {
			localStorage.setItem("tteViewConfig", JSON.stringify(container))
		} catch (e) {
			console.error(e)
		}
	})
</script>

<ContainerComp bind:_container={container} />
