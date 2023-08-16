import React from 'react';
import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeConteiner, Separator } from './styles';

export function Home() {
    return (
        <HomeConteiner>
          <form action="">
            <FormContainer>
                <label htmlFor="task">Vou trabalhar em</label>
                <input id="task" />

                <label htmlFor="minuteAmount">durante</label>
                <input type="number" id='minuteAmount' />

                <span>minutes.</span>
            </FormContainer>

          <CountdownContainer>
            <span>0</span>
            <span>0</span>
            <Separator>:</Separator>
            <span>0</span>
            <span>0</span>
          </CountdownContainer>

          <button type='submit'>
            <Play size={24}/>
            Start</button>
          </form>
        </HomeConteiner>
    )
}