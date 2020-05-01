import React, { useState, useEffect } from 'react';
import useImage from 'use-image';
import { Stage, Layer, Line, Star, Rect } from 'react-konva';
import stone from '../../img/stone.jpg'
import { useSelector } from 'react-redux'

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

export default function Map() {
    const { currentRoom, map } = useSelector(state => state.game)
    const [background] = useImage(stone);
    const [tiles, setTiles] = useState([]);

    useEffect(() => {
        let position = { x: 0, y: 0 }
        let counter = 0
            
        const mapSquareRoot = Math.sqrt(map.length);
        const tileSize = 570 / mapSquareRoot;

        setTiles(map.map((room, index) => {
            
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
                    {!room.east && <Wall x={position.x} y={position.y} tileSize={tileSize} direction="east"/>}
                    {!room.north && <Wall x={position.x} y={position.y} tileSize={tileSize} direction="north"/>}
                    {!room.south && <Wall x={position.x} y={position.y} tileSize={tileSize} direction="south"/>}
                    {!room.west && <Wall x={position.x} y={position.y} tileSize={tileSize} direction="west"/>}
                    {currentRoom.title === room.title  && <PlayerIcon x={position.x + (tileSize / 2)} y={position.y + (tileSize / 2)} />}
                    {/* {console.log(index)} */}
                </>
            )
        }))
    }, [map, currentRoom])

    return (
        <Stage width={570} height={570}>
            <Layer>
                <Rect width={570} height={570} fillPatternImage={background} />
                {tiles}
            </Layer>
        </Stage>
    )};