const fs = require('fs')
const filename = process.argv[2];
let programArray=[],couponArray=[]
,noOfDeg=0,amount=0.00,
lowestDegree='',discount=0.00,couponApp='None',proMemberShip=0,
subtotal=0.00,proDis=0.00,proFees=0.00,enrollFees=0.00;
   

fs.readFile(filename, "utf8", (err, data) => {
    if(err){
        console.log(err);
        return
    }
    let dataInput=data.split("\n");
    for(let i=0;i<dataInput.length;i++){
        if((/ADD_PROGRAMME/g).test(dataInput[i])){
            let int = dataInput[i].split(" ");
            let obj={
                program: int[1],
                no: int[2]
            }
            programArray.push(obj)
        }
        else if((/APPLY_COUPON/g).test(dataInput[i])){
            let coupon= dataInput[i].split(" ")
            couponArray.push(coupon[1])
        }
        else if((/ADD_PRO_MEMBERSHIP/g).test(dataInput[i])){
            proMemberShip=1
        }        
    }
    programArray.forEach((program)=>{
        noOfDeg+=Number(program.no)
    })
    for(let i=0;i<programArray.length;i++){
        if(programArray[i].program=='CERTIFICATION'){
            if(proMemberShip==1){
                proFees=200;
                proDis+=(3000*Number(programArray[i].no)*0.02)
                amount+=(3000*Number(programArray[i].no))-(3000*Number(programArray[i].no)*0.02)
            }
            else{
                amount+=3000*Number(programArray[i].no)
            }
        }
        else if(programArray[i].program=='DEGREE'){
            if(proMemberShip==1){
                proFees=200;
                proDis+=(5000*Number(programArray[i].no)*0.03)
                amount+=(5000*Number(programArray[i].no))-(5000*Number(programArray[i].no)*0.03)
            }else{
                amount+=5000*Number(programArray[i].no)
            }
           
        }
        else{
            if(proMemberShip==1){
                proFees=200;
                proDis+=(2500*Number(programArray[i].no)*0.01)
                low=(2500)-(2500*0.01)
                amount+=(2500*Number(programArray[i].no))-(2500*Number(programArray[i].no)*0.01)
            }
            else{
                amount+=2500*Number(programArray[i].no)
            }
        }
    }
    if(proMemberShip==1){
        amount=amount+200;
        subtotal=amount
    }
    else{
        subtotal=amount;
    }
    
    function lowestDeg(){
        if(data.indexOf('DIPLOMA')!==-1){
            lowestDegree='DIPLOMA'
        }
        else if(data.indexOf('CERTIFICATION')!==-1){
            lowestDegree='CERTIFICATION'
        }
        else{
            lowestDegree='DEGREE'
        }
    }
    lowestDeg()
    if(noOfDeg>=4){
        if(lowestDegree=='DIPLOMA'){
            if(proMemberShip==1){
                low=2500-(2500*0.01)
                amount-=low;
                discount=low;
            }
            else{
                amount-=2500;
                discount=2500;
            }
        }
        else if(lowestDegree=='CERTIFICATION'){
            amount-=3000;
            discount=3000;
        }
        else{
            amount-=5000;
            discount=5000;
        }
        couponApp='B4G1';
    }
    else{
        if(amount>=10000){
            for(let i=0;i<couponArray.length;i++){
              if((/DEAL_G20/g).test(couponArray[i])){
                couponApp=couponArray[i]
                discount=amount*0.2;
                amount=amount*0.8;
              }
            }
        }
        else if(noOfDeg>=2){
            for(let i=0;i<couponArray.length;i++){
                if((/DEAL_G5/g).test(couponArray[i])){
                  couponApp=couponArray[i]
                  discount=amount*0.05;
                  amount=amount*0.95;
                }
              }
        }
    }

    if(amount<6666){
        enrollFees=500;
        amount+=500
    }
    function addZeroes(num) {
        //console.log(typeof num)
        var num = Number(num);
        if (isNaN(num)) {
            return 0;
        }
        if (String(num).split(".").length < 2 || String(num).split(".")[1].length<=2 ){
            num=Number(num);
            num = num.toFixed(2);
        }
        return num;
    }
    console.log(`SUB_TOTAL\u00A0${addZeroes(subtotal)}`)
    console.log(`COUPON_DISCOUNT \u00A0${couponApp}\u00A0${addZeroes(discount)}`)
    console.log(`TOTAL_PRO_DISCOUNT\u00A0${addZeroes(proDis)}`)
    console.log(`PRO_MEMBERSHIP_FEE\u00A0${addZeroes(proFees)}`)
    console.log(`ENROLLMENT_FEE\u00A0${addZeroes(enrollFees)}`)
    console.log(`TOTAL\u00A0${addZeroes(amount)}`)
    return

})
