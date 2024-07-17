var y=Object.defineProperty;var d=(t,e,s)=>e in t?y(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var r=(t,e,s)=>d(t,typeof e!="symbol"?e+"":e,s);import"./modulepreload-polyfill-B5Qt9EMX.js";function p(t){const e=new Uint32Array(1),n=crypto.getRandomValues(e)[0]/4294967296;return Math.floor(n*t+1)}function a(t){return t.reduce((e,s)=>e+s,0)}class b{constructor(e){r(this,"playerElement");this.playerElement=e}update(e){const s=a(e);this.playerElement.innerHTML=`${e.join(", ")} (Total: ${s})`}}class m{constructor(e){r(this,"playerElement");this.playerElement=e}update(e){e&&this.playerElement.classList.add("winner")}}class E{constructor(e){r(this,"historyElement");this.historyElement=e}update(e){const s=this.historyElement.innerHTML;this.historyElement.innerHTML=s?`${s}, ${e}`:`${e}`}}class l{constructor(){r(this,"subscribers",[])}subscribe(e){this.getSubscriberIndex(e)===-1&&this.subscribers.push(e)}unsubscribe(e){const s=this.getSubscriberIndex(e);s!==-1&&this.subscribers.splice(s,1)}notify(e){this.subscribers.forEach(s=>s.update(e))}getSubscriberIndex(e){return this.subscribers.findIndex(s=>s===e)}}class $ extends l{constructor(s){super();r(this,"playersCount");r(this,"currentPlayerIndex",0);this.playersCount=s}next(){const s=this.currentPlayerIndex;this.currentPlayerIndex=(this.currentPlayerIndex+1)%this.playersCount,this.notify(s)}}class f{constructor(){r(this,"diceResults",[]);r(this,"results$",new l);r(this,"winStatus$",new l)}addDiceResult(e){this.diceResults.push(e),this.results$.notify(this.diceResults)}update(e){this.addDiceResult(e)}}class w extends l{constructor(s){super();r(this,"sidesCount");this.sidesCount=s}roll(){const s=p(this.sidesCount);return this.notify(s),s}}class C{constructor(e){r(this,"players");r(this,"turnGenerator$");r(this,"diceGenerator$");r(this,"historyPublisher$");r(this,"historyDisplayer");r(this,"isGameEnded",!1);this.players=new Array(e.playersCount).fill(null).map(()=>new f),this.turnGenerator$=new $(e.playersCount),this.diceGenerator$=new w(e.diceSidesCount),this.historyPublisher$=new l,this.historyDisplayer=new E(e.historyElement),this.players.forEach((s,n)=>{const i=new b(e.playerElements[n]),u=new m(e.playerElements[n]);s.results$.subscribe(i),s.winStatus$.subscribe(u),s.results$.subscribe({update:h=>{this.checkWinStatus(h,s)}})}),this.turnGenerator$.subscribe({update:s=>{if(this.isGameEnded)return;const n=this.players[s];this.players.forEach(u=>this.diceGenerator$.unsubscribe(u)),this.diceGenerator$.subscribe(n);const i=this.diceGenerator$.roll();this.historyPublisher$.notify(i)}}),this.historyPublisher$.subscribe(this.historyDisplayer)}playTurn(){this.turnGenerator$.next()}checkWinStatus(e,s){a(e)>=21?(this.isGameEnded=!0,s.winStatus$.notify(!0),this.players.forEach(i=>this.diceGenerator$.unsubscribe(i))):s.winStatus$.notify(!1)}}const G=document.querySelectorAll(".player-result"),c=Array.from(G),x=c.length,I=document.getElementsByClassName("history-rolls")[0],S=6,g={playersCount:x,diceSidesCount:S,playerElements:c,historyElement:I},P=new C(g);var o;(o=document.getElementById("roll-dice"))==null||o.addEventListener("click",()=>{P.playTurn()});
