import React, { createContext, useState } from 'react';
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

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe uma tarefa'),
  minutesAmount: zod .number()
  .min(5, 'O ciclo precisa ser de de no minimo 5 minutos.')
  .max(60, 'O ciclo precisa ser de de no máximo 60 minutos.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCyclesAsFiished: () => void
  setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const task = watch('task')
  const isSubmitDisable = !task

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    reset()
  } 

  function markCurrentCyclesAsFiished() {
    setCycles((state) => 
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  
    return (
        <HomeConteiner>
          <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
            <CyclesContext.Provider 
            value={{ 
              activeCycle, 
              activeCycleId, 
              markCurrentCyclesAsFiished, 
              amountSecondsPassed, 
              setSecondsPassed }}>

              <FormProvider {...newCycleForm}>
                <NewCycleForm />
              </FormProvider>

              <Countdown />
              
            </CyclesContext.Provider>

          {activeCycle ? (
          <StopCountdownButton onClick={markCurrentCyclesAsFiished} type="button">
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