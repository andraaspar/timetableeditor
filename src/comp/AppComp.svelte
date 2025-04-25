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

	let fileMenu = $state("")
	$effect(() => {
		if (fileMenu === "open") {
			alert("Open!")
		}
		fileMenu = ""
	})
</script>

<div class="main-menu">
	<select bind:value={fileMenu} class="menu">
		<option value="" label="File" hidden></option>
		<option value="open" label="Open"></option>
	</select>
</div>
<ContainerComp bind:_container={container} />

<style>
	.main-menu {
		display: flex;
		padding: var(--rem--1);
		gap: var(--rem--1);
		border-bottom: var(--border--1);
		background-color: var(--background-color--menu);
	}
</style>
