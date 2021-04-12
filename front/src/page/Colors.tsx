import React from 'react';
import { selectColor, colorsSelector } from "../redux/colorsSlice";
import { useAppSelector, useAppDispatch } from '../redux/hooks';


const Colors: React.FC = () => {

    const {current} = useAppSelector(colorsSelector);
    const dispatch = useAppDispatch();

    return (
        <div>
            <p>{current}</p>
            <p>
                <span onClick={() => dispatch(selectColor('red'))} >Red</span>
                <span onClick={() => dispatch(selectColor('green'))} >Green</span>
                <span onClick={() => dispatch(selectColor('blue'))} >Blue</span>
            </p>
        </div>
    )
}

export default Colors;
