import { createGlobalState } from "@vueuse/core"
import { Vector3 } from "three"
import { perlinNoise2D } from "~/utils/noises"

type FlowfieldVector = {
    direction: { x: number, y: number, z: number }
}

type State = {
    flowfield: FlowfieldVector[]
    particlesCount: number
    cols: number
    rows: number,
    scale: number,
    xOff: number,
    yOff: number,
    zOff: number
}

export const useFlowfield = createGlobalState(() => {


    const state = reactive<State>({
        flowfield: [],
        particlesCount: 50,
        cols: 0,
        rows: 0,
        scale: 20,
        xOff: .1,
        yOff: .1,
        zOff: 0.00003
    })

    function initFlowfield(width: number, height: number) {
        const flowfield: FlowfieldVector[] = []
        
        state.cols = Math.floor(width / state.scale)
        state.rows = Math.floor(height / state.scale)

        let yOff = 0
        let zOff = 0
        for (let y = 0; y < state.rows; y++) {
            let xOff = 0
            for (let x = 0; x < state.cols; x++) {
                const noise = perlinNoise2D(xOff, yOff, zOff)
                const index = x + y * state.cols
                const angle = Math.PI * noise * 8
                const direction = new Vector3(Math.cos(angle), Math.sin(angle), 0).normalize()
                flowfield[index] = {
                    direction: { 
                        x: direction.x,
                        y: direction.y,
                        z: direction.z
                    }
                }
                xOff += state.xOff
            }
            yOff += state.yOff
            zOff += state.zOff
        }

        state.flowfield = flowfield
    }

    function updateFlowfield() {
        let yOff = 0
        for (let y = 0; y < state.rows; y++) {
            let xOff = 0
            for (let x = 0; x < state.cols; x++) {
                const noise = perlinNoise2D(xOff, yOff, state.zOff)
                const index = x + y * state.cols
                const angle = 4*Math.PI * noise
                const direction = new Vector3(Math.cos(angle), Math.sin(angle), 0)
                state.flowfield[index].direction = {
                    x: direction.x,
                    y: direction.y,
                    z: direction.z
                }
                xOff += state.xOff
            }
            yOff += state.yOff
            state.zOff += 0.0003
        }
    }



    return { state, initFlowfield, updateFlowfield }
})