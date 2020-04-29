import React, { useState, useEffect } from 'react';
import { Stage, Layer, Rect, Line, Star } from 'react-konva';

function Room({ x, y, tileSize }) {
    return (
        <Rect
            x={x}
            y={y}
            width={tileSize}
            height={tileSize}
            fill="#fff"
            stroke="#888"
            strokeWidth={1}
        />
    )
}

function Wall({ x, y, tileSize, direction }) {    
    return (
        <Line
            points={
                direction === "west" ?
                    [x, y, x, y + tileSize]
                : direction === "east" ?
                    [x + tileSize, y, x + tileSize, y + tileSize]
                : direction === "north" ?
                    [x, y, x + tileSize, y]
                : direction === "south" ?
                    [x, y + tileSize, x + tileSize, y + tileSize]
                : null
            }
            stroke="#000"
            strokeWidth={8}
        />
    )
}

function PlayerIcon({ x, y }) {
    return (
        <Star
            x={x}
            y={y}
            numPoints={5}
            outerRadius={20}
            innerRadius={10}
            fill="#000"
        />
    )
}

const initializeArr = []

for (let i = 0; i < 25; i++) {
    initializeArr.push('x')
}

export default function Map() {
    const [rooms, setRooms] = useState(initializeArr)    
    const mapSquareRoot = Math.sqrt(rooms.length)
    const tileSize = 570 / mapSquareRoot
    const [tiles, setTiles] = useState([])    

    useEffect(() => {
        let position = { x: 0, y: 0 }
        let counter = 0
        setTiles(rooms.map((room, index) => {
            if (index > 0) {
                position.x = position.x + tileSize
            }
            if (counter < mapSquareRoot) {
                counter++
            } else {
                counter = 1
                position = { x: 0, y: position.y + tileSize }
            }
            return (
                <>
                    
                    <Room x={position.x} y={position.y} tileSize={tileSize} />
                    {index === 12 && <PlayerIcon x={position.x + (tileSize / 2)} y={position.y + (tileSize / 2)} />}
                </>
            )
        }))
    }, [mapSquareRoot, tileSize, rooms])

    return (
        <Stage width={570} height={570}>
            <Layer>
                {tiles}
            </Layer>
        </Stage>
    )};