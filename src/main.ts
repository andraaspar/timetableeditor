import { mount } from "svelte"
import AppComp from "./comp/AppComp.svelte"
import "./css/style.css"

mount(AppComp, {
	target: document.getElementById("app")!,
})
