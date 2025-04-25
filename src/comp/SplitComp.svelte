<script lang="ts">
	import type { ISplit } from "../model/ISplit"
	import ContainerComp from "./ContainerComp.svelte"

	interface Props {
		_split: ISplit
		_merge: (index: 0 | 1) => void
	}
	let { _split = $bindable(), _merge }: Props = $props()
</script>

<div class={["split", _split.isRow && "row"]}>
	<ContainerComp
		bind:_container={_split.first}
		_isFirst={true}
		_parentIsRow={_split.isRow}
		_merge={_merge}
	/>
	<ContainerComp
		bind:_container={_split.second}
		_parentIsRow={_split.isRow}
		_isFirst={false}
	/>
</div>

<style>
	.split {
		flex: 1 0 0;
		overflow: hidden;
		display: flex;
		flex-flow: column;

		&.row {
			flex-flow: row;
		}
	}
</style>
