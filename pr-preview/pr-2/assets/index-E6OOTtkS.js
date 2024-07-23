var h=Object.defineProperty;var d=(r,e,t)=>e in r?h(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var s=(r,e,t)=>d(r,typeof e!="symbol"?e+"":e,t);import"./modulepreload-polyfill-B5Qt9EMX.js";function y(r){const e=new Uint32Array(1),n=crypto.getRandomValues(e)[0]/4294967296;return Math.floor(n*r+1)}function o(r){return r.reduce((e,t)=>e+t,0)}class b{constructor(e){s(this,"playerElement");this.playerElement=e}update(e){const t=o(e);this.playerElement.innerHTML=`${e.join(", ")} (Total: ${t})`}}class p{constructor(e){s(this,"playerElement");this.playerElement=e}update(e){e&&this.playerElement.classList.add("winner")}}class m{constructor(e){s(this,"historyElement");this.historyElement=e}update(e){const t=this.historyElement.innerHTML;this.historyElement.innerHTML=t?`${t}, ${e}`:`${e}`}}class i{constructor(){s(this,"subscribers",[])}subscribe(e){this.getSubscriberIndex(e)===-1&&this.subscribers.push(e)}unsubscribe(e){const t=this.getSubscriberIndex(e);t!==-1&&this.subscribers.splice(t,1)}notify(e){this.subscribers.forEach(t=>t.update(e))}getSubscriberIndex(e){return this.subscribers.findIndex(t=>t===e)}}class E extends i{constructor(t){super();s(this,"playersCount");s(this,"currentPlayerIndex",0);this.playersCount=t}next(){const t=this.currentPlayerIndex;this.currentPlayerIndex=(this.currentPlayerIndex+1)%this.playersCount,this.notify(t)}}class ${constructor(){s(this,"diceResults",[]);s(this,"results$",new i);s(this,"winStatus$",new i)}addDiceResult(e){this.diceResults.push(e),this.results$.notify(this.diceResults)}update(e){this.addDiceResult(e)}}class G extends i{constructor(t){super();s(this,"sidesCount");this.sidesCount=t}roll(){const t=y(this.sidesCount);return this.notify(t),t}}class f{constructor(e){s(this,"players");s(this,"turnGenerator$");s(this,"diceGenerator$");s(this,"historyPublisher$");s(this,"historyDisplayer");s(this,"isGameEnded");s(this,"rollDiceButton");s(this,"bondedPlayTurn");this.players=new Array(e.playersCount).fill(null).map(()=>new $),this.turnGenerator$=new E(e.playersCount),this.diceGenerator$=new G(e.diceSidesCount),this.historyPublisher$=new i,this.historyDisplayer=new m(e.historyElement),this.isGameEnded=!1,this.rollDiceButton=e.diceButtonElement,this.bondedPlayTurn=this.playTurn.bind(this),this.players.forEach((t,n)=>{const l=new b(e.playerElements[n]),u=new p(e.playerElements[n]);t.results$.subscribe(l),t.winStatus$.subscribe(u),t.results$.subscribe({update:c=>{this.evaluateGameResult(c,t)}})}),this.turnGenerator$.subscribe({update:t=>{if(this.isGameEnded)return;const n=this.players[t];this.players.forEach(u=>this.diceGenerator$.unsubscribe(u)),this.diceGenerator$.subscribe(n);const l=this.diceGenerator$.roll();this.historyPublisher$.notify(l)}}),this.historyPublisher$.subscribe(this.historyDisplayer)}playTurn(){this.turnGenerator$.next()}startGame(){var e;(e=this.rollDiceButton)==null||e.addEventListener("click",this.bondedPlayTurn)}evaluateGameResult(e,t){const n=o(e);this.checkGameEnd(n),t.winStatus$.notify(n>=21)}checkGameEnd(e){var t;e>=21&&(this.isGameEnded=!0,this.players.forEach(n=>this.diceGenerator$.unsubscribe(n)),(t=this.rollDiceButton)==null||t.removeEventListener("click",this.bondedPlayTurn))}}const w=document.querySelectorAll(".player-result"),a=Array.from(w),x=a.length,C=document.getElementById("history-rolls"),I=document.getElementById("roll-dice"),P=6,T=new f({playersCount:x,diceSidesCount:P,playerElements:a,historyElement:C,diceButtonElement:I});T.startGame();