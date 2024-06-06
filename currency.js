let rate1=document.querySelector(".curr1");
let rate2=document.querySelector(".curr2");
let resultBtn=document.querySelector(".result");
let selects=document.querySelectorAll(".options select");
let sel1=selects[0];
let sel2=selects[1];
let inputs=document.querySelectorAll(".input input");
let inpt1=inputs[0];
let inpt2=inputs[1];

let rates={};
let requestURL="https://v6.exchangerate-api.com/v6/a87941ebb3660bd6cba82f20/latest/USD";
fetchRates();
async function fetchRates(){
    let res=await fetch(requestURL);
    res=await res.json()
    rates=res.conversion_rates;
    finding();

}

function finding(){
    let val="";
    Object.keys(rates).forEach(code=>{
        let str=`<option value="${code}">${code}</option>`;
        val+=str;
    });
    selects.forEach((s)=>(s.innerHTML=val));

}
function convert(val,fromcurr,tocurr){
    let v=(val/rates[fromcurr])*rates[tocurr];
    let v1=v.toFixed(3);
    return v1==0.0?v.toFixed(5):v1;
}

function displayRate(){
    let v1=sel1.value;
    let v2=sel2.value;
    let val=convert(1,v1,v2);
    rate1.innerHTML=`1 ${v1} equals`;
    rate2.innerHTML=`${val} ${v2}`;
}
resultBtn.addEventListener("click",()=>{
    let fromcurr=sel1.value;
    let fromval=(inpt1.value);
    let tocurr=sel2.value;
    let cVal=convert(fromval,fromcurr,tocurr);
    inpt2.value=cVal;

});

selects.forEach(s=>s.addEventListener("change",displayRate)); 
document.querySelector(".swap").addEventListener("click",()=>{
    let in1=inpt1.value;
    let in2=inpt2.value;
    let op1=sel1.value;
    let op2=sel2.value;

    inpt2.value=in1;
    inpt1.value=in2;
    sel2.value=op1;
    sel1.value=op2;
    displayRate();

})
