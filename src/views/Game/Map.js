import React, { useState, useEffect } from 'react';
import { Stage, Layer, Rect, Star } from 'react-konva';

function Room({ x, y }) {
    return (
        <Rect
            x={x}
            y={y}
            width={57}
            height={57}
            fill="#fff"
            stroke="#000"
            strokeWidth={1}
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

for (let i = 0; i < 100; i++) {
    initializeArr.push('x')
}

export default function Map() {
    const [rooms, setRooms] = useState(initializeArr)    
    const mapSquareRoot = Math.sqrt(rooms.length)
    const [tiles, setTiles] = useState([])    

    useEffect(() => {
        let position = { x: 0, y: 0 }
        let counter = 0
        setTiles(rooms.map((room, index) => {
            if (index > 0) {
                position.x = position.x + 57
            }
            if (counter < mapSquareRoot) {
                counter++
            } else {
                counter = 1
                position = { x: 0, y: position.y+57 }
            }            
            console.log(position, index, counter)
            return (
                <>
                    <Room x={position.x} y={position.y} />
                    {index === 95 && <PlayerIcon x={position.x + 28.5} y={position.y + 28.5} />}
                </>
            )
        }))
    }, [mapSquareRoot, rooms])

    return (
        <Stage width={570} height={570}>
            <Layer>
                {tiles}
            </Layer>
        </Stage>
    )};