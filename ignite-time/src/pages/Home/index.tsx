import React, { useContext } from 'react';
import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { 
  HomeConteiner, 
  StartCountdownButton, 
  StopCountdownButton, } 
from './styles';
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';
import { CyclesContext } from '../../contexts/CyclesContext';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe uma tarefa'),
  minutesAmount: zod .number()
  .min(5, 'O ciclo precisa ser de de no minimo 5 minutos.')
  .max(60, 'O ciclo precisa ser de de no máximo 60 minutos.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)
  
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    }
  })

  const { handleSubmit, watch } = newCycleForm
  const task = watch('task')
  const isSubmitDisable = !task

  
    return (
        <HomeConteiner>
          <form onSubmit={handleSubmit(createNewCycle)} action="">
          
              <FormProvider {...newCycleForm}>
                <NewCycleForm />
              </FormProvider>

              <Countdown />

          {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisable} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
          </form>
        </HomeConteiner>
    )
}