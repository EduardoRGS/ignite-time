import React from 'react';
import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeConteiner, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from './styles';

export function Home() {
    return (
        <HomeConteiner>
          <form action="">
            <FormContainer>
                <label htmlFor="task">Vou trabalhar em</label>
                <TaskInput id="task" placeholder="Dê um nome para o seu projeto" />

                <label htmlFor="minuteAmount">durante</label>
                <MinutesAmountInput
                    type="number"
                    id="minutesAmount"
                    placeholder="00"
                    step={5}
                    min={5}
                    max={60}
                />

                <span>minutos.</span>
            </FormContainer>

          <CountdownContainer>
            <span>0</span>
            <span>0</span>
            <Separator>:</Separator>
            <span>0</span>
            <span>0</span>
          </CountdownContainer>

          <StartCountdownButton disabled type='submit'>
            <Play size={24}/>
            Start
          </StartCountdownButton>
          </form>
        </HomeConteiner>
    )
}