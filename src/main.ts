import './style.css'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div>
    <h2>Blogpost van Arno zijn website</h2>
    <p>Kijk hoe cool deze blogpost is, wow!</p>
    <a href="https://webmention-client.vercel.app/blogpost1/">Zie hier!</a>
</div>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
