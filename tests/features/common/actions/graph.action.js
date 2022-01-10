import {
  getRowsGeometry,
  getFieldsGeometry,
  getNamedRowsGeometry,
  getNamedFieldsGeometry
} from './table.action'

// import { DataFrame } from 'pandas-js'

import numjs from 'numjs'
import { expect } from 'chai'

function differenciator(array0, array1, deviation) {
  console.log(array0, array1)
  let diff = []
  for (let item0 of array0) {
    let diffsMap = []
    for (let item1 of array1) {
      let connection = Math.abs(item1 - item0) < deviation ? 1 : 0
      diffsMap.push(connection)
    }
    diff.push(diffsMap)
  }
  return diff
}

function diffMapper(array0, array1, deviation) {
  let tmpDiff = numjs.abs(
    numjs.subtract(
      numjs.dot(numjs.ones(array0.shape).T, array1),
      numjs.dot(array0.T, numjs.ones(array1.shape))
    )
  )

  for (let i = 0; i < tmpDiff.shape[0]; i++) {
    for (let j = 0; j < tmpDiff.shape[1]; j++) {
      tmpDiff.set(i, j, tmpDiff.get(i, j) < deviation ? 1 : 0)
    }
  }

  return tmpDiff
}

const action = {
  checkNodesConnections: async function(driver, graphComponent) {
    let nodesGeometry = await getRowsGeometry(driver, graphComponent.nodesTable)

    let connectorsGeometry = [
      ...(await getFieldsGeometry(
        driver,
        graphComponent.nodesTable,
        'top_hendler'
      )),
      ...(await getFieldsGeometry(
        driver,
        graphComponent.nodesTable,
        'bottom_hendler'
      ))
    ]
    const maxConnectorSide = Math.max(
      ...[
        ...connectorsGeometry.map(item => item.height),
        ...connectorsGeometry.map(item => item.width)
      ]
    )

    let arrowGeometry = await getRowsGeometry(
      driver,
      graphComponent.grafConnections
    )

    const topNodePoints = nodesGeometry.map(item => {
      return {
        x: item.x + item.width / 2,
        y: item.y
      }
    })
    const bottomNodePoints = nodesGeometry.map(item => {
      return {
        x: item.x + item.width / 2,
        y: item.y + item.height
      }
    })

    const arrowsNodeLeftEdges = arrowGeometry.map(item => {
      return {
        x: item.x
      }
    })
    const arrowsNodeRightEdges = arrowGeometry.map(item => {
      return {
        x: item.x + item.width
      }
    })

    const arrowsNodeLeftEdgesX = await arrowsNodeLeftEdges.map(item => item.x)
    const topNodePointsX = await topNodePoints.map(item => item.x)
    const leftEdgesConnections = differenciator(
      arrowsNodeLeftEdgesX,
      topNodePointsX,
      maxConnectorSide
    )
    console.log('\n', leftEdgesConnections)

    const arrowsNodeRightEdgesX = await arrowsNodeRightEdges.map(item => item.x)
    let rightEdgesConnections = differenciator(
      arrowsNodeRightEdgesX,
      topNodePointsX,
      maxConnectorSide
    )
    console.log('\n', rightEdgesConnections)

    const bottomNodeEdges = await bottomNodePoints.map(item => item.y)
    const topArrowEdges = await arrowGeometry.map(item => item.y)
    const startArrowsEdges = differenciator(
      topArrowEdges,
      bottomNodeEdges,
      maxConnectorSide
    )
    console.log('\n', startArrowsEdges)

    const topNodeEdges = await topNodePoints.map(item => item.y)
    const bottomArrowEdges = await arrowGeometry.map(
      item => item.y + item.height
    )
    const endArrowsEdges = differenciator(
      bottomArrowEdges,
      topNodeEdges,
      maxConnectorSide
    )
    console.log('\n', endArrowsEdges)

    let startPoints = []
    for (let i = 0; i < topArrowEdges.length; i++) {
      let tmpMult = []
      for (let j = 0; j < bottomNodeEdges.length; j++) {
        tmpMult.push(
          startArrowsEdges[i][j] * leftEdgesConnections[i][j] +
            startArrowsEdges[i][j] * rightEdgesConnections[i][j]
        )
      }
      startPoints.push(tmpMult)
    }

    const summarizer = (previousValue, currentValue) =>
      previousValue + currentValue
    console.log(
      '\n',
      startPoints
        .map(item => item.reduce(summarizer, 0))
        .every(item => item > 0),
      startPoints.map(item => item.reduce(summarizer, 0))
    )
  },
  checkNodesConnectionsNPandas: async function(driver, graphComponent) {
    const nodesGeometry = await getNamedRowsGeometry(
      driver,
      graphComponent.nodesTable
    )

    let arrowsGeometry = await getNamedRowsGeometry(
      driver,
      graphComponent.grafConnections,
      'path'
    )

    const topConnectorsGeometry = await getNamedFieldsGeometry(
      driver,
      graphComponent.nodesTable,
      'top_hendler'
    )

    const bottomConnectorsGeometry = await getNamedFieldsGeometry(
      driver,
      graphComponent.nodesTable,
      'bottom_hendler'
    )

    const maxConnectorSide = numjs
      .array([
        ...Array.from(topConnectorsGeometry.get('height')),
        ...Array.from(topConnectorsGeometry.get('width')),
        ...Array.from(bottomConnectorsGeometry.get('height')),
        ...Array.from(bottomConnectorsGeometry.get('width'))
      ])
      .max()

    const nodeTopEdges = numjs.array([Array.from(nodesGeometry.get('y'))])
    const nodeBottomEdges = numjs.add(
      [Array.from(nodesGeometry.get('y'))],
      [Array.from(nodesGeometry.get('height'))]
    )
    const arrowTopEdges = numjs.array([Array.from(arrowsGeometry.get('y'))])
    const arrowBottomEdges = numjs.add(
      [Array.from(arrowsGeometry.get('y'))],
      [Array.from(arrowsGeometry.get('height'))]
    )

    let startArrowsEdges = diffMapper(
      arrowTopEdges,
      nodeBottomEdges,
      maxConnectorSide / 2
    )
    let endArrowsEdges = diffMapper(
      arrowBottomEdges,
      nodeTopEdges,
      maxConnectorSide / 2
    )

    const nodeMidlePoints = numjs.add(
      [Array.from(nodesGeometry.get('x'))],
      [Array.from(nodesGeometry.get('width')).map(item => item / 2)]
    )
    const arrowsNodeLeftEdgesX = numjs.array([
      Array.from(arrowsGeometry.get('x'))
    ])
    const arrowsNodeRightEdgesX = numjs.add(
      [Array.from(arrowsGeometry.get('x'))],
      [Array.from(arrowsGeometry.get('width'))]
    )
    let leftEdgesConnections = diffMapper(
      arrowsNodeLeftEdgesX,
      nodeMidlePoints,
      maxConnectorSide / 2
    )
    let righEdgesConnections = diffMapper(
      arrowsNodeRightEdgesX,
      nodeMidlePoints,
      maxConnectorSide / 2
    )

    const startMarks = numjs.add(
      numjs.multiply(startArrowsEdges, leftEdgesConnections),
      numjs.multiply(startArrowsEdges, righEdgesConnections)
    )
    for (let i = 0; i < arrowsNodeRightEdgesX.length; i++) {
      expect(numjs.sum(startMarks.slice([i]))).equal(true, 'Arrow not started')
    }

    const endMarks = numjs.add(
      numjs.multiply(endArrowsEdges, leftEdgesConnections),
      numjs.multiply(endArrowsEdges, righEdgesConnections)
    )
    for (let i = 0; i < arrowsNodeRightEdgesX.length; i++) {
      expect(numjs.sum(endMarks.slice([i]))).equal(true, 'Arrow not ended')
    }
  }
}

module.exports = action
