import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactFlow, { ReactFlowProvider } from 'react-flow-renderer'

import MlReactFlowNode from './MlReactFlowNode'
import MlReactFlowEdge from './MlReactFlowEdge'

import { ML_EDGE, ML_NODE } from '../../constants'

import './mlReactFlow.scss'

const edgeTypes = {
  [ML_EDGE]: MlReactFlowEdge
}

const nodeTypes = {
  [ML_NODE]: MlReactFlowNode
}

const MlReactFlow = ({ alignTriggerItem, elements, onElementClick }) => {
  const domChangeHandler = () => {
    const edgesWrapper = document.querySelector('.react-flow__edges > g')
    const selectedEdges = edgesWrapper.getElementsByClassName('selected')

    edgesWrapper.append(...selectedEdges)
  }

  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [observer] = useState(new MutationObserver(domChangeHandler))

  useEffect(() => {
    setTimeout(() => {
      if (reactFlowInstance) {
        reactFlowInstance.fitView()
        const { position, zoom } = reactFlowInstance.toObject()

        reactFlowInstance.setTransform({ x: position[0], y: 50, zoom: zoom })
      }
    }, 100)
  }, [reactFlowInstance, alignTriggerItem])

  useEffect(() => {
    return () => {
      if (observer instanceof MutationObserver) {
        observer.disconnect()
      }
    }
  }, [observer])

  const onLoad = reactFlowInstance => {
    const edgesWrapper = document.querySelector('.react-flow__nodes')

    if (edgesWrapper) {
      observer.observe(edgesWrapper, {
        subtree: true,
        attributes: true
      })
    }

    setReactFlowInstance(reactFlowInstance)
  }

  return (
    <ReactFlowProvider>
      <ReactFlow
        edgeTypes={edgeTypes}
        elements={elements}
        elementsSelectable={false}
        multiSelectionKeyCode={null}
        nodeTypes={nodeTypes}
        nodesConnectable={false}
        nodesDraggable={false}
        onElementClick={onElementClick}
        onLoad={onLoad}
        selectionKeyCode={null}
      />
    </ReactFlowProvider>
  )
}

MlReactFlow.defaultProps = {
  alignTriggerItem: '',
  onElementClick: () => {}
}

MlReactFlow.propTypes = {
  alignTriggerItem: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  elements: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onElementClick: PropTypes.func
}

export default React.memo(MlReactFlow)
