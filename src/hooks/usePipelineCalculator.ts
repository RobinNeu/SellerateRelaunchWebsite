import { useState, useCallback } from 'react'

export const usePipelineCalculator = () => {
  const [dealSize, setDealSize] = useState(15000)
  const [meetings, setMeetings] = useState(8)

  const pipelineValue = dealSize * meetings

  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value)
  }, [])

  return {
    dealSize,
    setDealSize,
    meetings,
    setMeetings,
    pipelineValue,
    formatCurrency
  }
}

