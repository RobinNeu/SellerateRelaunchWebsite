import { usePipelineCalculator } from '../../hooks/usePipelineCalculator'
import './PipelineCalculator.css'

export const PipelineCalculator = () => {
  const { dealSize, setDealSize, meetings, setMeetings, pipelineValue, formatCurrency } = usePipelineCalculator()

  return (
    <div className="calculator">
      <div>
        <label className="calculator-label">
          <span>Ø Dealgröße</span>
          <span className="calculator-value">{formatCurrency(dealSize)}</span>
        </label>
        <input 
          type="range" 
          min="5000" 
          max="100000" 
          step="5000" 
          value={dealSize} 
          className="calculator-slider" 
          onChange={(e) => setDealSize(Number(e.target.value))}
        />
      </div>
      <div>
        <label className="calculator-label">
          <span>Valide Erstgespräche / Monat</span>
          <span className="calculator-value">{meetings}</span>
        </label>
        <input 
          type="range" 
          min="1" 
          max="20" 
          value={meetings} 
          className="calculator-slider" 
          onChange={(e) => setMeetings(Number(e.target.value))}
        />
      </div>
      <div className="calculator-result-row">
        <div className="calculator-result-label">Potentieller Pipeline-Effekt</div>
        <div className="calculator-result-value">{formatCurrency(pipelineValue)}</div>
      </div>
    </div>
  )
}

