import React, { useContext } from "react";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../..";

export function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext)
    const { register } = useFormContext()

    return (
        <FormContainer>
        <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput 
        id="task" 
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register('task')} />

        <label htmlFor="minuteAmount">durante</label>
        <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            disabled={!!activeCycle}
            {...register('minutesAmount', { valueAsNumber: true })}
        />

        <span>minutos.</span>
    </FormContainer>
    )
}