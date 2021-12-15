"use strict"
let inputWord = document.querySelector('input[name="inputWord"]');
let timer = document.getElementById('timer');
let spiner = document.getElementById('spiner');
let lang = document.querySelector('select[name="lang"]');
let words = document.getElementById('words');
let footer = document.querySelector('#speedTestAria footer')
let speedTestAria = document.getElementById('speedTestAria');
let resultTestArea = document.getElementById('resultTestArea');
let paragraf = document.querySelector('#words p');
let resume = document.getElementById('resume');
let resultMessage = document.getElementById('resultMessage');/*'#resultTestArea:nth-child(2)'*/
let t = '';
let charCodeInput = '';
let i = 0;
let n = 0;
let temp = '';
let countCorrectWords = 0;
let allWords = 0;
let correctChar = 0;
let resultWordArray = new Array(60);
let nextSiblingChild = paragraf.firstElementChild;
const wordsFarsi = ['عرصه','پاییز','زبان','پدر','یافتن','نفت','شروع','وزیر','داستان','آواز','خرد','برخورد','فراخ','گرفتاری','ترجمه',
'پیراهن','پزشک','تمایل','نبرد','شادی','بانو','اسباب','نی','صندلی','نوشیدنی','سوهان','آمار','بیکار','عامیانه','ریاضی',
'هند','شرکت','غذا','سلسله','همهمه','تیغ','هوا','متفاوت','فیل','بهداشت','راز','آموزش','داستان','بریدن','پیشانی',
'غذا','مغازه','درباره','عشق','آخرین','غروب','پوشاک','شادی','تجزیه','اسب','آزادی','تنگی','کوه','غمگین','کارگردان',
'انقباض','نوشیدنی','نرگس','مجلس','درد','دولت','کارخانه','صلاحدید','فرش','نمایش','نی','سلام','گیاه','گویش','شهرک',
'آب','توانایی','اطلسی','آلو','رمز','کبریت','لیاقت','مرهم','مروارید','کج','دندان','گویش','چشمه','نوشتن','بهار',
'ساخت','شقایق','پیشانی','رهایی','قالب','مستعد','عامیانه','آخرین','ماشین','صالحیه','گلیم','دقیقه','پرینتر','خانواده','خودکار'];
const wordsLatin = ['next','too','until','sound','made','need','when','hard','some','always','of','our','could','while','without',
'back','own','miss','just','it','hand','mother','father','below','was','again','does','between','land','up'
,'paper','after','too','sentence','were','do','begin','start','so','want','school','them','follow','quick','after'
,'on','both','also','near','song','which','men','right','tell','came','why','important','only','water','each'
,'go','watch','answer','another','enough','old','keep','add','would','side','up','Typing','clean','andrestand','wear',
'song','mounth','Day','ours','often','close','windows','diffrent','because','father','never','much','help','very','had'
,'two','talk','other','watch','state','cut','often','my','some','list','script','America','For','took','idea'];

speedTestAria.addEventListener('contextmenu',(event)=>{/*جلوگیری از کلیک راست و غیر فعال شدن دکمه کپی برای جلوگیری از تقلب */
   event.preventDefault();
});
inputWord.focus();/*هنگام لود اولیه صفحه فوکوس در تکس باکس ورودی است */
function fainalResult(){
    let wrongwords = allWords - countCorrectWords;
    let htmlText = `<table border="1"><caption>نتیجه عملکرد شما در چالش سرعت تایپ</caption>
                           <tr>
                               <th colspan="2">سرعت تایپ شما <span class="green"> ${Math.round(correctChar/5)} </span> کلمه در دقیقه است. </th>
                           </tr> 
                           <tr>
                               <th>کل کلمات</th>
                               <td>${allWords} </td>
                           </tr>
                           <tr class="green">
                               <th> کلمات صحیح:</th>
                               <td>${countCorrectWords} </td>
                           </tr>
                           <tr class="red">
                                <th> کلمات غلط:</th>
                                <td>${wrongwords} </td>
                           </tr>   
                           <tr >
                                <th>  تعداد کلید صحیح:</th>
                                <td>${correctChar}</td>
                           </tr>                                                         
                    <table/>`;
    resultMessage.innerHTML = htmlText;            
}

function randomWords(wordsArray){
    let resultWordSet = new Set();/**جلوگیری از تولید کلمات تکراری */
    for( let i = 0 ; i < 60 ; i++){
            resultWordSet.add(wordsArray[Math.floor(Math.random()*105)]);
               i = resultWordSet.size - 1;/**برای اینکه دقیقا تعداد 50 کلمه داخل مجموعه ذخیره شود */
                }
    return  resultWordSet ;  
}

function loadWords(){      
    if( lang.value === 'en'){
        resultWordArray = Array.from(randomWords(wordsLatin));
    }else{
        resultWordArray = Array.from(randomWords(wordsFarsi));      
    }
   
    paragraf.innerHTML = '';   
    correctChar = 0;
    allWords = 0;
    countCorrectWords = 0; 
    i = 0;
    n = 0;
    let j = 0;
    let ten = 10;
    for(let i = 0 ; i< 6 ; i++){
        for ( j  ; j < ten ; j++) {
                paragraf.innerHTML += `<span>${resultWordArray[j]} </span>`;        
         }
         paragraf.innerHTML += `<br/>`;
         ten += 10;
    }  
    nextSiblingChild =  paragraf.firstElementChild;
    nextSiblingChild.classList.add('bgWords');
}

loadWords();

/*****************************************************************************************/
lang.addEventListener('change',function(){/*چیدمان متناسب با تغییر زبان  */
    loadWords();
    inputWord.focus();
    clearInterval(t);     
    inputWord.value = '';
    inputWord.addEventListener('keypress',startTimer);
    if(lang.value === 'en' ){
        words.classList.remove('directionRTL');
        words.classList.add('directionLTR');
        footer.classList.remove('directionRTL');
        footer.classList.add('directionLTR');
        inputWord.classList.remove('floatRight');
        inputWord.classList.add('floatLeft');
        timer.classList.remove('floatRight');
        timer.classList.add('floatLeft');
        spiner.classList.remove('floatRight');
        spiner.classList.add('floatLeft');
        timer.innerHTML = '1:00';
        inputWord.setAttribute('placeholder','Start Typing...'); 
    }
    else {
        words.classList.remove('directionLTR');
        words.classList.add('directionRTL');
        footer.classList.remove('directionLTR');
        footer.classList.add('directionRTL');
        inputWord.classList.remove('floatLeft');
        inputWord.classList.add('floatRight');
        timer.classList.remove('floatLeft');
        timer.classList.add('floatRight');
        spiner.classList.remove('floatLeft');
        spiner.classList.add('floatRight');
        timer.innerHTML = changeNumbers('۱:۰۰');
        inputWord.setAttribute('placeholder','نوشتن را شروع کنید...'); 
    }
});

spiner.addEventListener('click',function(){/*با زدن دکمه اسپینر لغات تازه تری نمایش داده می شود */
    if(lang.value === 'en'){
        timer.innerHTML = '1:00';        
    }else{
        timer.innerHTML = changeNumbers('1:00');
    }
    clearInterval(t);
    loadWords();
    inputWord.value = '';
    inputWord.focus();
    charCodeInput = '';
    inputWord.addEventListener('keypress',startTimer);
});
resume.addEventListener('click',()=>{    
                resultTestArea.classList.add('hidden');
                speedTestAria.classList.remove('hidden');
                loadWords();
                inputWord.value = '';
                inputWord.focus();
                charCodeInput = '';
                inputWord.addEventListener('keypress',startTimer);
                if(lang.value === 'en'){
                    timer.innerHTML = '1:00';        
                }else{
                    timer.innerHTML = changeNumbers('1:00');
                }

});
function recogCharKey(event){    
    if(charCodeInput === ''){
        if(event.charCode === 32 || event.charCode === 13 ){/**تشخیص کلید اینتر و اسپیس */  
            event.preventDefault();  
             return false;
        }else return true;
    }else return true;
}

inputWord.addEventListener('keypress',startTimer);
inputWord.addEventListener('keypress',testWords);


function startTimer(event){/*باشروع تایپ زمانسنج شروع به شمردن می کند */ 
    if(recogCharKey(event)){
    let time = 59; 
    if(lang.value === 'fa')
        timer.innerHTML =changeNumbers(time--);  
    else
         timer.innerHTML =time--;       
    t = setInterval(() => {
        if(lang.value === 'fa')
            timer.innerHTML =changeNumbers(time--);  
        else
            timer.innerHTML =time--;  
        if(time < 0){
                clearInterval(t);
                speedTestAria.classList.add('hidden');
                resultTestArea.classList.remove('hidden');
                fainalResult(); 
            }
    }, 1000);  
      inputWord.removeEventListener('keypress',startTimer);    
    }
}
function testWords(event){ 
    if(recogCharKey(event)){ 
        if(paragraf == null){/**زمانی که کل کلمات تمام شود */
            return 
        }             
        charCodeInput = inputWord.value; 
        countCorrectChar(event.key); 
        if( event.charCode === 32){   
            let nodeBR =document.querySelector('#words p br'); 
            event.preventDefault();
            inputWord.value = '';   
            allWords++; 
            n = 0;             
                     
            if(resultWordArray[i++].trim() === String(charCodeInput).trim()) {
                countCorrectWords++;
                nextSiblingChild.classList.remove('bgWords');
                nextSiblingChild.classList.add('green');
                nextSiblingChild = nextSiblingChild.nextElementSibling;
                if(nextSiblingChild.isEqualNode(nodeBR)){/**برای رد شدن از تگ br */ 
                    if(paragraf.lastChild === nextSiblingChild)
                        return;
                    nextSiblingChild = nextSiblingChild.nextElementSibling;
                    for(let i = 0 ; i<11 ;i++)/**حذف خط اول پاراگراف */
                        paragraf.removeChild(paragraf.firstChild);                                                            
                }                
               nextSiblingChild.classList.add('bgWords');
            }else{
                nextSiblingChild.classList.remove('bgWords');
                nextSiblingChild.classList.add('red');
                nextSiblingChild =  nextSiblingChild.nextElementSibling;
                if(nextSiblingChild.isEqualNode(nodeBR)){
                    if(paragraf.lastChild === nextSiblingChild){
                        paragraf = null;
                        return;
                    }
                    nextSiblingChild = nextSiblingChild.nextElementSibling;
                    for(let i = 0 ; i<11 ;i++)
                        paragraf.removeChild(paragraf.firstChild);                                    
                }
                nextSiblingChild.classList.add('bgWords');
            } 
            charCodeInput = ''; 
        }    
    }
}
function countCorrectChar(eventKey){/**تعداد کاراکتر های صحیح را می شمرد */
   temp = resultWordArray[i];
   if(eventKey === temp[n]){      
       correctChar++;
       n++;
   } else n++;  
}

/*****************************************************************************************/
/*کد تبدیل اعداد لاتین به فارسی */
function changeNumbers(input){
    input = String(input);
    const farsiDigits = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
    let output = '';
    for(let i=0 ; i<input.length ; i++){
        if(input[i]>=0 && input[i]<=9)
           output += farsiDigits[input[i]];
           else
             output += input[i];             
    }
    return output;
}
/*******************************************************************************************/





