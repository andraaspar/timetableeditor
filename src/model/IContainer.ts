import type { ISplit } from "./ISplit"
import type { IView } from "./IView"

export interface IContainer {
	view?: IView
	split?: ISplit
	percent?: number
}
