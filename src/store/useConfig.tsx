import { defaultJson } from 'constants/data'
import { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch'
import { CanvasDirection } from 'reaflow'
import create from 'zustand'

const initialStates = {
  json: defaultJson,
  cursorMode: 'move' as 'move' | 'navigation',
  layout: 'RIGHT' as CanvasDirection,
  expand: true,
  foldNodes: false,
  hideEditor: false,
  performanceMode: true,
  disableLoading: false,
  zoomPanPinch: undefined as ReactZoomPanPinchRef | undefined
}

type Config = typeof initialStates

interface ConfigActions {
  setJson: (json: string) => void
  setConfig: (key: keyof Config, config: unknown) => void
  getJson: () => string
  zoomIn: () => void
  zoomOut: () => void
  centerView: () => void
}

const useConfig = create<Config & ConfigActions>()((set, get) => ({
  ...initialStates,
  getJson: () => get().json,
  setJson: (json: string) => set({ json }),
  zoomIn: () => {
    const zoomPanPinch = get().zoomPanPinch
    if (zoomPanPinch) {
      zoomPanPinch.setTransform(
        zoomPanPinch?.state.positionX,
        zoomPanPinch?.state.positionY,
        zoomPanPinch?.state.scale + 0.4
      )
    }
  },
  zoomOut: () => {
    const zoomPanPinch = get().zoomPanPinch
    if (zoomPanPinch) {
      zoomPanPinch.setTransform(
        zoomPanPinch?.state.positionX,
        zoomPanPinch?.state.positionY,
        zoomPanPinch?.state.scale + 0.4
      )
    }
  },
  centerView: () => {
    const zoomPanPinch = get().zoomPanPinch
    const canvas = document.querySelector('.jsoncrack-canvas') as HTMLElement
    if (zoomPanPinch && canvas) {
      zoomPanPinch.zoomToElement(canvas)
    }
  },
  setConfig: (setting: keyof Config, value: unknown) => set({ [setting]: value })
}))

export default useConfig
