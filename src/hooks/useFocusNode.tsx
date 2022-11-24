import React, { useState, useEffect } from 'react'
import useConfig from 'store/useConfig'
import { searchQuery, cleanupHighlight, highlightMatchedNodes } from 'utils/search'

export const useFocusNode = () => {
  const setConfig = useConfig(state => state.setConfig)
  const zoomPanPinch = useConfig(state => state.zoomPanPinch)
  const [selectedNode, setSelectedNode] = useState(0)
  const [content, setContent] = useState({ value: '', debounced: '' })

  const skip = () => setSelectedNode(current => current + 1)

  useEffect(() => {
    setConfig('performanceMode', !content.value.length)
    const debounce = setTimeout(() => {
      setContent(val => ({ ...val, debounce: content.value }))
    }, 800)

    return () => clearTimeout(debounce)
  }, [content.value, setConfig])

  useEffect(() => {
    if (!zoomPanPinch) return
    const ref = zoomPanPinch.instance.wrapperComponent

    const matchedNodes: NodeListOf<Element> = searchQuery(
      `span[data-key*='${content.debounced}' i]`
    )
    const matchedNode: Element | null = matchedNodes[selectedNode] || null

    cleanupHighlight()

    if (ref && matchedNode && matchedNode.parentElement) {
      const newScale = 1
      const x = Number(matchedNode.getAttribute('data-x'))
      const y = Number(matchedNode.getAttribute('data-y'))

      const newPositionX =
        (ref.offsetLeft - x) * newScale +
        ref.clientWidth / 2 -
        matchedNode.getBoundingClientRect().width / 2
      const newPositionY =
        (ref.offsetLeft - y) * newScale +
        ref.clientHeight / 2 -
        matchedNode.getBoundingClientRect().height / 2

      highlightMatchedNodes(matchedNodes, selectedNode)

      zoomPanPinch?.setTransform(newPositionX, newPositionY, newScale)
    } else {
      setSelectedNode(0)
    }

    return () => {
      if (!content.value) setSelectedNode(0)
    }
  }, [content.debounced, content.value, selectedNode, zoomPanPinch])

  return [content, setContent, skip] as const
}
