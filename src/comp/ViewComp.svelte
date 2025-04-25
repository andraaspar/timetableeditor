<script lang="ts">
	import type { IView } from "../model/IView"

	interface Props {
		_view: IView
		_merge?: () => void
		_split?: (isRow: boolean) => void
	}
	let { _view = $bindable(), _split }: Props = $props()
	let split = $state("")
	$effect(() => {
		if (split) {
			_split?.(split === "v")
			split = ""
		}
	})
</script>

<div class="view-menu">
	<select bind:value={_view.type}>
		<option value="timetable" label="Timetable"></option>
		<option value="teachers" label="Teachers"></option>
	</select>
	{#if _split}
		<select bind:value={split} class="menu">
			<option value="" label="Split" hidden></option>
			<option value="h" label="Horizontally"></option>
			<option value="v" label="Vertically"></option>
		</select>
	{/if}
</div>
<div class="view-content">
	{#if _view.type === "timetable"}
		Timetable!
	{:else if _view.type === "teachers"}
		Teachers!
	{/if}
</div>

<style>
	.view-menu {
		flex: 0 0 auto;
		display: flex;
		background-color: var(--background-color--menu);
		border-bottom: var(--border--1);
		overflow: hidden;
		padding: var(--rem--1);
		gap: var(--rem--1);
	}
	.view-content {
		flex: 1 0 0;
		display: flex;
		flex-flow: column;
		overflow: auto;
	}
</style>
