import React from 'react';
import { Play } from "phosphor-react";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { 
  CountdownContainer, 
  FormContainer, 
  HomeConteiner, 
  MinutesAmountInput, 
  Separator, 
  StartCountdownButton, 
  TaskInput } 
from './styles';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe uma tarefa'),
  minutesAmount: zod .number()
  .min(5, 'O ciclo precisa ser de de no minimo 5 minutos.')
  .max(60, 'O ciclo precisa ser de de no máximo 60 minutos.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    }
  })


  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log(data);
    reset()
  } 

  const task = watch('task')
  const isSumbitDisabled = !task
  
    return (
        <HomeConteiner>
          <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
            <FormContainer>
                <label htmlFor="task">Vou trabalhar em</label>
                <TaskInput id="task" placeholder="Dê um nome para o seu projeto"{...register('task')} />

                <label htmlFor="minuteAmount">durante</label>
                <MinutesAmountInput
                    type="number"
                    id="minutesAmount"
                    placeholder="00"
                    step={5}
                    min={5}
                    max={60}
                    {...register('minutesAmount', { valueAsNumber: true })}
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

          <StartCountdownButton disabled={isSumbitDisabled} type='submit'>
            <Play size={24}/>
            Começar
          </StartCountdownButton>
          </form>
        </HomeConteiner>
    )
}