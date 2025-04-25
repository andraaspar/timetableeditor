<script lang="ts">
	import { jsonClone } from "../fun/jsonClone"
	import type { IContainer } from "../model/IContainer"
	import SplitComp from "./SplitComp.svelte"
	import ViewComp from "./ViewComp.svelte"

	interface Props {
		_isFirst?: boolean
		_parentIsRow?: boolean
		_container: IContainer
		_merge?: (index: 0 | 1) => void
	}
	let {
		_container = $bindable(),
		_isFirst,
		_parentIsRow,
		_merge,
	}: Props = $props()

	function split(isRow: boolean) {
		let first = jsonClone(_container)
		first.percent = 50
		let second = jsonClone(_container)
		delete second.percent
		_container.split = {
			first,
			isRow,
			second,
		}
		delete _container.view
	}
	function merge(index: 0 | 1) {
		const it = index === 0 ? _container.split!.first : _container.split!.second
		if (it.split) {
			_container.split = it.split
			delete _container.view
		} else if (it.view) {
			_container.view = it.view
			delete _container.split
		}
	}

	let elem: HTMLDivElement
	let isDragging = $state(false)
	let dragStartCursor = 0
	let dragStartPercent = 0
	function dragStart(e: PointerEvent) {
		if (e.currentTarget !== e.target || isDragging) return
		dragStartCursor = _parentIsRow ? e.pageX : e.pageY
		dragStartPercent = _container.percent ?? 0
		isDragging = true
	}
	function dragMove(e: PointerEvent) {
		const deltaPx = (_parentIsRow ? e.pageX : e.pageY) - dragStartCursor
		const rect = elem.parentElement!.getBoundingClientRect()
		const deltaPercent =
			(deltaPx / (_parentIsRow ? rect.width : rect.height)) * 100
		_container.percent = Math.max(
			0,
			Math.min(100, dragStartPercent + deltaPercent),
		)
	}
	function dragEnd(e: PointerEvent) {
		isDragging = false
		if (_container.percent! < 1) {
			_merge?.(1)
		} else if (_container.percent! > 99) {
			_merge?.(0)
		}
	}
</script>

<svelte:window
	onpointermove={isDragging ? dragMove : undefined}
	onpointercancel={isDragging ? dragEnd : undefined}
	onpointerup={isDragging ? dragEnd : undefined}
/>
<div
	bind:this={elem}
	class={[
		"container",
		_isFirst && _parentIsRow && "border-right",
		_isFirst && !_parentIsRow && "border-bottom",
	]}
	style:--flex={_container.percent == null
		? `1 0 0`
		: `0 0 ${_container.percent}%`}
	onpointerdown={dragStart}
>
	{#if _container.view}
		<ViewComp bind:_view={_container.view} _split={split} />
	{:else if _container.split}
		<SplitComp bind:_split={_container.split} _merge={merge} />
	{/if}
</div>

<style>
	.container {
		box-sizing: content-box;
		flex: var(--flex);
		display: flex;
		flex-flow: column;
		overflow: hidden;

		&.border-right {
			border-right: var(--border--2);
			cursor: e-resize;
		}
		&.border-bottom {
			border-bottom: var(--border--2);
			cursor: s-resize;
		}
		:global(& > *) {
			cursor: auto;
		}
	}
</style>
