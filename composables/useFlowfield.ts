import { createGlobalState } from "@vueuse/core"
import { Vector3 } from "three"
import { mapRange } from "~/utils"

type FlowfieldVector = {
    position: { x: number, y: number, z: number }
    direction: { x: number, y: number, z: number }
}

type State = {
    flowfield: FlowfieldVector[]
    particlesCount: number
    cols: number
    rows: number,
    scale: number,
    activeIndex?: number
}

export const useFlowfield = createGlobalState(() => {


    const state = reactive<State>({
        flowfield: [],
        particlesCount: 20,
        cols: 0,
        rows: 0,
        scale: 20,
        activeIndex: 0
    })

    function initFlowfield(cols: number, rows: number) {
        const flowfield: FlowfieldVector[] = []
        
        state.cols = Math.floor(cols / state.scale)
        state.rows = Math.floor(rows / state.scale)

        console.log(state.cols, state.rows)

        for (let y = 0; y <= state.rows; y++) {
            for (let x = 0; x < state.cols; x++) {
                const index = x + y * state.cols
                const angle = Math.PI  / 2
                const position = new Vector3(
                    mapRange(x, 0, state.cols, -state.cols * state.scale / 2, state.cols * state.scale / 2),
                    mapRange(y, 0, state.rows, -state.rows * state.scale / 2, state.rows * state.scale / 2),
                    0
                )
                const direction = position.clone().sub(new Vector3(0, 0, 0)).normalize().multiplyScalar(-1).applyAxisAngle(new Vector3(0, 0, 1), angle)
                flowfield[index] = {
                    position: { 
                        x: position.x,
                        y: position.y,
                        z: position.z
                    },
                    direction: { 
                        x: direction.x,
                        y: direction.y,
                        z: direction.z
                    }
                }
            }
        }

        state.flowfield = flowfield
        console.log(state.flowfield.length)
    }

    return { state, initFlowfield }
})